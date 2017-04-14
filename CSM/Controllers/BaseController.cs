using CSM.BLL;
using CSM.Common;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.NetworkInformation;
using System.Net.Sockets;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;


namespace CSM.Controllers
{
    public class BaseController : Controller
    {
        // GET: Base
        CSM.BLL.ServAlarmRecordBLL servAlarmRecordBLL = new BLL.ServAlarmRecordBLL();
        CSM.BLL.BaseRegionConfigBLL baseRegionConfigBll = new BLL.BaseRegionConfigBLL();
        BaseMapConfigBLL baseMapConfigBLL = new BaseMapConfigBLL();
        ServPersonInfoBLL servPersonInfoBLL = new ServPersonInfoBLL();
        ServPurviewManageBLL servPurviewManageBLL = new ServPurviewManageBLL();
        static string ssoIp = System.Configuration.ConfigurationManager.AppSettings["SSOServerIP"];
        JavaScriptSerializer json = new JavaScriptSerializer();
        public LoginUser loginUser { get; set; }
        //重写OnActionExecuting
        protected override void OnActionExecuting(ActionExecutingContext e)
        {
            //判断token是否有值
            if (Session["Token"] != null)
            {
                if (loginUser == null)
                {
                    loginUser = Session["Token"] as LoginUser;
                }
                if (loginUser != null)
                {
                    //判断是否有权限和读取地图配置
                    QueryPersonPurview(loginUser.PersonId, e);
                    Session["Token"] = loginUser;
                    Session.Timeout = 30;
                }
                else
                {
                    Response.Redirect(CSM.Utils.SSOTools.TokenReplace());
                    e.Result = Redirect("Login/Login");
                }
            }
            else
            {
                //判断请求的url中是否带有token
                if (Request.QueryString["token"] != null)
                {
                    //持有令牌
                    if (Request.QueryString["token"] != "$token$")
                    {
                        string tokenValue = Request.QueryString["token"];
                        object o = WebServiceHelper.InvokeWebservice("http://" + ssoIp + "/PassportService.asmx", "PassportService", "TokenGetCert", new object[] { tokenValue });
                        string a = json.Serialize(o);
                        LoginUser user = json.Deserialize<LoginUser>(a);
                        if (user != null)
                        {
                            Session["Token"] = user;
                            //判断是否有权限和读取地图配置
                            QueryPersonPurview(user.PersonId, e);
                        }
                        else
                        {
                            //登陆页面去登陆
                            Response.Redirect(CSM.Utils.SSOTools.TokenReplace());
                            e.Result = Redirect("Login/Login");
                        }
                    }
                    else
                    {
                        //登陆页面去登陆
                        Response.Redirect(CSM.Utils.SSOTools.TokenReplace());
                        e.Result = Redirect("Login/Login");
                    }
                }
                else
                {
                    //登陆页面去登陆
                    Response.Redirect(CSM.Utils.SSOTools.TokenUrl());
                    e.Result = Redirect("Login/Login");
                    return;
                }
            }
            ViewData["logoImg"] = GetLogo();
        }
        /// <summary>
        /// 查询用户权限
        /// </summary>
        /// <param name="personId"></param>
        public void QueryPersonPurview(int personId, ActionExecutingContext e)
        {
            try
            {
                //根据人员id查询人员所有用的园区权限
                List<ServRolePurviewModel> rolePruList = servPersonInfoBLL.GetRegionPurByPersonId(personId);
                if (rolePruList.Count == 0)//没有园区权限则直接跳转到没有权限页面
                {
                    Response.Redirect("/NotPurview.html");
                    e.Result = new EmptyResult();
                }
                else
                {
                    int regionId = 0;//园区id
                                     //根据人员id获取人员信息
                    ServPersonInfoModel personModel = servPersonInfoBLL.GetPersonInfoByPersonId(personId);
                    //判断人员是否有默认主控园区
                    if (personModel.ext1 != "" && personModel.ext1 != null)
                    {//没有设置主控园区则使用有权限的第一条数据
                        ServRolePurviewModel purModel = rolePruList.FirstOrDefault(n => n.region_id == Convert.ToInt32(personModel.ext1));
                        //判断用户设置的主控园区是否存在
                        if (purModel != null)
                        {
                            regionId = Convert.ToInt32(personModel.ext1);
                        }
                    }
                    else
                    {
                        regionId = rolePruList[0].region_id;
                    }
                    //用园区id和人员角色id查询权限
                    List<ServPurviewInfoModel> purviewList = servPersonInfoBLL.GetPurviewInfoByRoleIdAndRegionId(personModel.role_id, regionId);
                    if (regionId == 0)//超级管理员拥有所有的园区切换权限
                    {
                        //获取当前配置的园区
                        ViewData["MasterRegion"] = baseRegionConfigBll.GetAllRegionConfig();
                    }
                    else
                    {
                        //根据园区id集合获取园区
                        ViewData["MasterRegion"] = baseRegionConfigBll.GetRegionConfig(rolePruList);
                    }
                    //当前用户的权限
                    ViewData["personPurviewList"] = purviewList;
                    ViewData["personPurviewListJson"] = json.Serialize(purviewList);
                    //用户信息
                    ViewData["UserInfoModel"] = personModel;
                    ViewData["UserInfoJson"] = json.Serialize(personModel);
                    ReadingConfig();//读取配置
                    SetRegionCookie(regionId);//设置主控园区cookie
                    //读取视频平台配置
                    ReadVideoConfig();
                    //ViewData["AllRegion"] = json.Serialize(baseRegionConfigBll.GetAllRegionConfig());
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 设置园区cookie
        /// </summary>
        /// <param name="regionId"></param>
        public void SetRegionCookie(int regionId)
        {
            try
            {
                //判断主控园区cookie
                HttpCookie regionIdCookie = Request.Cookies["mainControlRegionId"];
                if (regionId == 0)//超级管理员
                {
                    List<BaseRegionConfigModel> regionList = baseRegionConfigBll.GetAllRegionConfig();
                    if (regionList.Count > 0)
                    {
                        regionId = regionList[0].id;
                    }
                }
                BaseRegionConfigModel regionModel = baseRegionConfigBll.GetRegionConfigById(regionId);
                //园区idcookie
                if (regionIdCookie == null)
                {
                    regionIdCookie = new HttpCookie("mainControlRegionId");
                    regionIdCookie.Value = regionId.ToString();
                    Response.SetCookie(regionIdCookie);
                }
                else
                {
                    if (regionIdCookie.Value == "0")
                    {
                        regionIdCookie.Value = regionId.ToString();
                        Response.SetCookie(regionIdCookie);
                    }
                }
                //判断cookie中的园区id是否还存在（如果园区被删除，则重新给cookie赋值）
                int regionID = Convert.ToInt32(regionIdCookie.Value);
                BaseRegionConfigModel regionModel1 = baseRegionConfigBll.GetRegionConfigById(regionID);
                if (regionModel1 == null)
                {
                    regionIdCookie.Value = regionId.ToString();
                    Response.SetCookie(regionIdCookie);
                }
                if (regionModel != null)
                {
                    ViewData["regionModel"] = regionModel;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 读取配置
        /// </summary>
        /// <returns></returns>
        public void ReadingConfig()
        {
            JavaScriptSerializer tojson = new JavaScriptSerializer();
            //websocket开关 1：开，else：关
            ViewData["WebsocketIsOpen"] = System.Configuration.ConfigurationManager.AppSettings["WebsocketIsOpen"];
            //websocket 地址
            ViewData["WebsocketServer"] = tojson.Serialize(System.Configuration.ConfigurationManager.AppSettings["WebsocketServer"].ToString());
            ViewData["NotPoliceNum"] = servAlarmRecordBLL.GetNotPoliceNum();
            //今日告警
            ViewData["AlarmNum"] = servAlarmRecordBLL.GetAlarmNumToday();
            //获取报警操作的基准时间长
            ViewData["TL1"] = System.Configuration.ConfigurationManager.AppSettings["TL1"];
            ViewData["TL2"] = System.Configuration.ConfigurationManager.AppSettings["TL2"];
            //主客户端ip
            ViewData["MianIP"] = tojson.Serialize(System.Configuration.ConfigurationManager.AppSettings["MianIP"]);
            ViewData["LocalIP"] = tojson.Serialize(CSM.Utils.IPHelper.GetClientIPv4());
            //当前客户端是否是主控
            ViewData["IsMain"] = tojson.Serialize(System.Configuration.ConfigurationManager.AppSettings["MianIP"] == IPHelper.GetClientIPv4() ? true : false);
            //页面路径标示
            ViewData["url"] = tojson.Serialize(GetURL());
            //读取视频下载路径
            ViewData["VideoDownLoadPath"] = json.Serialize(System.Configuration.ConfigurationManager.AppSettings["VideoDownLoadPath"]);
        }
        /// <summary>
        /// 读取视频配置
        /// </summary>
        /// <param name="regionId"></param>
        public void ReadVideoConfig()
        {
            int regionId = 0;
            HttpCookie cookie = Request.Cookies["mainControlRegionId"];
            if (cookie != null)
            {
                regionId = Convert.ToInt32(cookie.Value);
            }
            ViewData["platformRegionId"] = regionId;
            VideoConfigCustom custom = baseMapConfigBLL.GetVideoConfigByRegionId(regionId);
            ViewData["serverIP"] = json.Serialize(custom.serverIP == null ? "" : custom.serverIP);
            ViewData["userName"] = json.Serialize(custom.userName == null ? "" : custom.userName);
            ViewData["userPwd"] = json.Serialize(custom.userPwd == null ? "" : custom.userPwd);
            ViewData["videoPlatform"] = json.Serialize(custom.videoPlatform);

        }
        /// <summary>
        /// 获取未确警条数
        /// </summary>
        /// <returns></returns>
        public JsonResult NotPoliceNum()
        {
            try
            {
                return Json(servAlarmRecordBLL.GetNotPoliceNum());
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        //请求页面路径
        public string GetURL()
        {
            string url = Request.Url.AbsolutePath;
            return url;
        }
        /// <summary>
        /// 保存报警请求
        /// </summary>
        /// <param name="AlarmInfo"></param>
        public void SaveAlarmInfo(string AlarmInfo)
        {
            Session["AlarmInfo"] = AlarmInfo;
        }
        /// <summary>
        /// 保存母版页计划任务信息
        /// </summary>
        /// <param name="scheduleInfo"></param>
        public void SaveScheduleInfo(string scheduleInfo)
        {
            Session["scheduleInfo"] = scheduleInfo;
        }
        /// <summary>
        /// 得到logo
        /// </summary>
        /// <returns></returns>
        public BaseRegionConfigModel GetLogo()
        {
            int regionID = 0;
            if (Request.QueryString["regionID"] != null)//页面带条件刷新
            {
                regionID = int.Parse(Request.QueryString["regionID"]);
            }
            HttpCookie cookie = Request.Cookies["mainControlRegionId"];
            if (cookie != null && Request.QueryString["regionID"] == null)//cookie主控园区id
            {
                //Request.Cookies.Get()
                if (cookie.Value != "")
                {
                    regionID = int.Parse(Server.HtmlEncode(cookie.Value));
                }
            }
            List<BaseRegionConfigModel> baseRegionConfigModelList = baseMapConfigBLL.GetAllRegionConfig();
            BaseRegionConfigModel regionImgModel = new BaseRegionConfigModel();
            for (int i = 0; i < baseRegionConfigModelList.Count; i++)
            {
                if (baseRegionConfigModelList[i].id == regionID)
                {
                    regionImgModel = baseRegionConfigModelList[i];
                    break;
                }
            }
            return regionImgModel;
        }

        /// <summary>
        /// 根据园区id获取园区信息
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public JsonResult GetRegion(int regionId)
        {
            try
            {
                BaseRegionConfigModel RegionInfo = baseRegionConfigBll.GetRegionConfigById(regionId);
                return Json(new { status = 0, msg = RegionInfo }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 根据角色判断是否拥有园区以及地图页面的权限
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public JsonResult GetPersonMapAndRegionPurviewByRole(int roleId, int regionId)
        {
            try
            {
                bool bl = servPurviewManageBLL.GetPersonMapAndRegionPurviewByRole(roleId, regionId);
                return Json(new { status = 0, msg = bl }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
    }
}