using CSM.BLL;
using CSM.Common;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Utils;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace CSM.Controllers
{
    public class LoginController : Controller
    {
        public static readonly string ssoIp = ConfigurationManager.AppSettings["SSOServerIP"];
        ServPersonInfoBLL servPersonInfoBLL = new ServPersonInfoBLL();
        JavaScriptSerializer tojson = new JavaScriptSerializer();
        // GET: Viedo
        public ActionResult Login()
        {
            ViewData["SSOServerIP"] = tojson.Serialize(ssoIp);
            Session["Token"] = null;
            return View();
        }
        /// <summary>
        /// 添加超级管理员账户
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="userPwd"></param>
        /// <returns></returns>
        public JsonResult AdminLogin(string userName, string userPwd)
        {
            try
            {
                if (userName == "loadmin" && userPwd == "loadmin")
                {
                    ApiPersonInfoModel personInfo = new ApiPersonInfoModel();
                    personInfo.Name = "超级管理员";
                    personInfo.Admin = userName;
                    personInfo.PassWord = userPwd;
                    bool result = servPersonInfoBLL.AddSuperAdmin(personInfo);
                    return Json(new { status = 0, msg = result });
                }
                else
                {
                    return Json(new { status = 2, msg = "" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        public void Logout()
        {
            try
            {
                if (Session["Token"] == null)
                {
                    Response.Redirect("/Login/Login");
                }
                LoginUser user = Session["Token"] as LoginUser;
                if (user.PersonId == -1)
                {
                    Session.Abandon();
                    Response.Redirect("/Login/Login");
                }
                else
                {
                    if (Request.QueryString["token"] == null)
                    {
                        //Session["Token"] = null;
                        //获取令牌
                        Response.Redirect("http://" + ssoIp + "/gettoken.aspx?backurl=" + Server.UrlEncode(Request.Url.AbsoluteUri + "?token=$token$"));
                        //Response.Redirect(CSM.Utils.SSOTools.TokenReplace());
                    }
                    else
                    {
                        if (Request.QueryString["token"] != "$token$")
                        {
                            string tokenValue = Request.QueryString["token"];
                            object o = WebServiceHelper.InvokeWebservice("http://" + ssoIp + "/PassportService.asmx", "PassportService", "TokenClear", new object[] { tokenValue });
                            Session.Abandon();
                            Response.Redirect("/Login/Login");
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}