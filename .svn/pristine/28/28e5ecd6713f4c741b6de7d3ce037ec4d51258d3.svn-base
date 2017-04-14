using CSM.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CSM.BLL;
using CSM.Model.QueryModel;
using System.Web.Script.Serialization;
using static CSM.Common.EnumClass;
using CSM.Common;
using CSM.Model.CustomModel;
using CSM.Model.SubSystemModel;
using CSM.Utils;

namespace CSM.Controllers
{
    public class MapController : BaseController
    {
        ServAreaInfoBLL servAreaInfoBLL = new BLL.ServAreaInfoBLL();
        BaseAreaLevelBLL baseAreaLevelBLL = new BaseAreaLevelBLL();
        ServDeviceInfoBLL servDeviceInfoBLL = new BLL.ServDeviceInfoBLL();
        BaseMapConfigBLL baseMapConfigBLL = new BaseMapConfigBLL();
        MapRegisterBLL mapRegisterBLL = new MapRegisterBLL();
        ServVideoDownloadBLL servVideoDownloadBLL = new ServVideoDownloadBLL();//视频下载bll
        DeviceInfoBLL deviceInfoBLL = new DeviceInfoBLL();
        BaseEventTypeBLL eventTypeBll = new BaseEventTypeBLL();
        LargeScreenBLL largeScreenBLL = new LargeScreenBLL();
        ServPlanRecordBLL servPlanRecordBLL = new ServPlanRecordBLL();
        // GET: Map
        public ActionResult Index()
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




            JavaScriptSerializer tojson = new JavaScriptSerializer();
            List<BaseRegionConfigModel> baseRegionConfigModelList = baseMapConfigBLL.GetAllRegionConfig();
            
            
            
            string type;
            int groupId;
            ViewData["VideoInfo"] = tojson.Serialize(-1);// new List<Model.ServDeviceInfoModel>();
            if (Request.QueryString["type"] != null)//页面带条件刷新
            {
                type = Request.QueryString["type"].ToString();
                if (type == "monitor")
                {
                    if (Request.QueryString["groupId"] != null)//页面带条件刷新
                    {
                        groupId = int.Parse(Request.QueryString["groupId"]);
                        ViewData["VideoInfo"] = tojson.Serialize( GetVideoPatrolDevice(groupId));
                    }
                }
            }

 
            
            
            //int regionID = Request.QueryString["regionID"] == null ? 0 : int.Parse(Request.QueryString["regionID"]);
            //if (regionID == 0)
            //{

            //    if (baseRegionConfigModelList.Count > 0)
            //    {
            //        regionID = baseRegionConfigModelList[0].id;
            //    }
            //}

            ViewData["NowMapType"] = baseMapConfigBLL.GetRegionConfigModelByID(regionID);
            ViewData["InitMapType"] = baseMapConfigBLL.GetRegionInitMapTypeByID(regionID);
            BaseNewMapConfigModel newMapConfig2D = null;
            BaseNewMapConfigModel newMapConfig25D = null;
            List<BaseNewMapConfigModel> newMapConfigModelList = baseMapConfigBLL.GetDefalutNewMapConfigByRegionID(regionID);
            for (int i = 0; i < newMapConfigModelList.Count; i++)
            {
                if (newMapConfigModelList[i].map_type == (int)CSM.Common.EnumClass.MapType.二维)
                {
                    newMapConfig2D = newMapConfigModelList[i];
                }
                else if (newMapConfigModelList[i].map_type == (int)CSM.Common.EnumClass.MapType.二点五维)
                {
                    newMapConfig25D = newMapConfigModelList[i];
                }
            }
            ViewData["Map2DConfig"] = tojson.Serialize(newMapConfig2D);
            ViewData["Map25DConfig"] = tojson.Serialize(newMapConfig25D);


            ViewData["AllRegion"] = baseRegionConfigModelList;
            ViewData["regionID"] = regionID;
            string regionImg = "";
            for (int i = 0; i < baseRegionConfigModelList.Count; i++)
            {
                if (baseRegionConfigModelList[i].id == regionID)
                {
                    regionImg = baseRegionConfigModelList[i].region_image;
                    break;
                }
            }
            //ViewData["regionImg"] = tojson.Serialize(regionImg);
            //当前地图类型
            //ViewData["NowMapType"] = baseMapConfigBLL.GetMapEngine(Server.MapPath("/ConfigFile/map/mapConfig.xml"));//获取地图配置中当前的地图类型
            //当前2D地图的配置
            //BaseMapConfigModel mapConfi2D = baseMapConfigBLL.GetNowMapConfig(Server.MapPath("/ConfigFile/map/mapConfig.xml"), (int)MapType.二维);
            //ViewData["Map2DConfig"] = tojson.Serialize(mapConfi2D);
            //当前2.5地图的配置
            //BaseMapConfigModel mapConfi25D = baseMapConfigBLL.GetNowMapConfig(Server.MapPath("/ConfigFile/map/mapConfig.xml"), (int)MapType.二点五维);
            //ViewData["Map25DConfig"] = tojson.Serialize(mapConfi25D);
            //默认行业
            BaseIndustryModel industryModel = baseMapConfigBLL.GetDefaultIndustry(Server.MapPath("/ConfigFile/map/mapConfig.xml"));
            //获取Serv_Device_Info中设备的全部数据(需要园区id,行业id)
            //ViewData["AllDeviceInfo"] = tojson.Serialize(servDeviceInfoBLL.GetDeviceInfoAndIconUrl(regionID, industryModel.id));
            ViewData["AllDeviceInfo"] = JsonHelper.ObjectToString<List<DeviceInfoCustom>>(servDeviceInfoBLL.GetDeviceInfoAndIconUrl(regionID, industryModel.id));
            //获取Serv_Area_Info中区域的全部数据（需要园区id）
            ViewData["AreaInfo"] = tojson.Serialize(servAreaInfoBLL.GetAreaInfoAndBuilding(regionID, industryModel.id));
            //自定义设备类型
            //ViewData["DefinedDevices"] = tojson.Serialize(baseMapConfigBLL.GetAllDeviceDefined(Server.MapPath("/ConfigFile/map/mapConfig.xml")));
            //获取自定义类型表和基本类型表的对应关系表
            //ViewData["TypeDefined"] = tojson.Serialize(baseMapConfigBLL.GetAllDeviceDefinedDevice());
            //地图左侧设备工具栏
            ViewData["leftDeviceTool"] = baseMapConfigBLL.GetDefinedDeviceTypeTool(industryModel.id);
            //ViewData["leftDeviceToolJson"] = tojson.Serialize(ViewData["leftDeviceTool"]);
            //地图右侧区域工具栏
            ViewData["rightAreaTool"] = baseMapConfigBLL.GetAreaTypeTool(Server.MapPath("/ConfigFile/map/mapConfig.xml"));
            ViewData["floorBuildingArea"] = tojson.Serialize(servAreaInfoBLL.GetFloorBuildingAreaInfoCustom());
            //获取确警结论
            ViewData["confirmAlarmResultList"] = EnumClass.GetEnumModelList<EnumClass.ConfirmAlarmResult>();

            //加载父级事件
            ViewData["parentEventList"] = eventTypeBll.GetChildEventType(-1);
            return View();
        }
        /// <summary>
        /// 取得当前地图引擎类型的配置
        /// </summary>
        /// <returns></returns>
        //public JsonResult getMapConfig()
        //{
        //    List<BaseMapConfigModel> mapConfigList = baseMapConfigBLL.GetMapConfig();
        //    return Json(mapConfigList, JsonRequestBehavior.AllowGet);
        //}
        /// <summary>
        /// 取得配置表中当前地图的类型
        /// </summary>
        /// <returns></returns>
        //public JsonResult getMapType()
        //{
        //    int mapType = baseMapConfigBLL.GetMapEngine(Server.MapPath("/ConfigFile/map/mapConfig.xml"));
        //    return Json(mapType, JsonRequestBehavior.AllowGet);
        //}
        //public ActionResult Test()
        //{
        //    BaseMapConfigBLL bll = new BaseMapConfigBLL();
        //    BaseMapConfigModel model = bll.GetModelByID(1);
        //    return Json(model, JsonRequestBehavior.AllowGet);
        //}

        public ActionResult Add()
        {
            BaseAreaLevelBLL BLL = new BaseAreaLevelBLL();
            BaseAreaLevelModel model = new BaseAreaLevelModel();
            //model.id =2;
            //model.level_name ="办公区";
            //model.level_status =1;
            //model.content = "办公区";
            //model.level_color ="#000";
            ////int id = BLL.AddEntity(model);
            ////var obj = BLL.DelEntity(1);
            var obj = BLL.UpdateEntity(model);
            return Json(obj, JsonRequestBehavior.AllowGet);

        }


        public ActionResult GetBaseAreaLevelList()
        {
            BaseAreaLevelBLL BLL = new BaseAreaLevelBLL();
            BaseAreaLevelQuery Query = new BaseAreaLevelQuery();
            List<BaseAreaLevelModel> BaseAreaLevelList = new List<BaseAreaLevelModel>();
            //查询全部
            // BaseAreaLevelList = BLL.GetEntities(Query);
            //分页查询
            var page = 1;
            var limit = 2;
            int total_number = 0;
            BaseAreaLevelList = BLL.GetPageAreaLevel(Query, page, limit, out total_number);
            var temp = new { total = total_number, rows = BaseAreaLevelList.OrderByDescending(n => n.id).ToList() };
            return Json(temp, JsonRequestBehavior.AllowGet);

        }


        /// <summary>
        /// 得到AreaInfo区域表中的所有的数据
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllAreaInfo()
        {
            return Json(servAreaInfoBLL.GetEntities(), JsonRequestBehavior.AllowGet);
        }
        ///// <summary>
        ///// 获取ServDeviceInfo设备表中所有的数据
        ///// </summary>
        ///// <returns></returns>
        //public JsonResult GetAllDeviceInfo()
        //{
        //    return Json(servDeviceInfoBLL.GetEntities(), JsonRequestBehavior.AllowGet);
        //}

        /// <summary>
        /// 获取AreaLevel区域级别表中的所有数据
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllAreaLevel()
        {
            return Json(baseAreaLevelBLL.GetEntities(), JsonRequestBehavior.AllowGet);
        }
        /// <summary>
        /// 读取报警信息
        /// </summary>
        /// <returns></returns>
        public JsonResult ReadAlarmInfo()
        {
            try
            {
                var AlarmInfo = Session["AlarmInfo"];
                Session["AlarmInfo"] = null;
                if (AlarmInfo == null)
                {
                    return Json("");
                }
                else
                {
                    return Json(AlarmInfo);
                }


            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 获取计划任务信息
        /// </summary>
        /// <returns></returns>
        public JsonResult GetScheduleInfo()
        {
            try
            {
                var scheduleInfo = Session["scheduleInfo"];
                Session["scheduleInfo"] = null;
                if (scheduleInfo == null)
                {
                    return Json(new { status = 1, msg = "未获取到计划任务缓存信息" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = 0, msg = scheduleInfo }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 视频下载（往视频下载记录表中插入一条需要下载的记录
        /// </summary>
        /// <param name="deviceCode"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <returns></returns>
        public JsonResult VideoDownload(string deviceCode, string startTime, string endTime)
        {
            try
            {
                ServVideoInfoModel model = new ServVideoInfoModel();
                //根据设备code获取设备
                ServDeviceInfoModel servDeviceInfo = deviceInfoBLL.GetDeviceInfoByDeviceCode(deviceCode);
                if (servDeviceInfo == null)
                {
                    return Json(new { state = 1, message = "该设备不存在" });
                }
                model.video_name = servDeviceInfo.device_name + DateTime.Now.ToString();
                model.video_path = "";
                model.video_type = (int)VideoDownLoadType.自定义下载;
                model.video_start_time = Convert.ToDateTime(startTime);
                model.video_end_time = Convert.ToDateTime(endTime);
                model.device_name = servDeviceInfo.device_name;
                model.device_code = servDeviceInfo.device_code;
                model.platform_id = 1;
                model.create_time = DateTime.Now;
                model.download_status = (int)VideoDownLoadStatus.未开始下载;
                bool result = servVideoDownloadBLL.VideoDownloadWrite(model);
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }
        #region  人工上报  
        /// <summary>
        /// 新增设备告警(未含位置信息，区域信息)
        /// </summary>
        /// <param name="eventType"></param>
        /// <param name="device_code"></param>
        /// <param name="alarm_location"></param>
        /// <param name="area_id"></param>
        /// <param name="alarm_level"></param>
        /// <param name="report_time"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        public JsonResult InformAlarm(string deviceCode, int eventType, int alarmLevel, string content)
        {
            try
            {
                MapAlarmBLL mapAlarmBll = new MapAlarmBLL();
                if (mapAlarmBll.AddInformAlarm(eventType, deviceCode, alarmLevel, content))
                {
                    return Json(new { status = 0, msg = "告警上报成功！" });
                }
                else
                {
                    return Json(new { status = 1, msg = "告警上报失败！" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }

        /// <summary>
        /// 页面发送模拟报警至转发层
        /// </summary>
        /// <param name="alarmLevel"></param>
        /// <param name="deviceCode"></param>
        /// <param name="content"></param>
        /// <param name="eventCode"></param>
        /// <returns></returns>
        public JsonResult DeviceAlarm(string alarmName, int alarmLevel, string deviceCode, string content, string eventCode)
        {
            try
            {
                MapAlarmBLL mapAlarmBll = new MapAlarmBLL();
                #region 旧版
                //if (mapAlarmBll.AddDeviceAlarm(alarmName, alarmLevel, deviceCode, content, eventCode))
                //{
                //    return Json(new { status = 0, msg = "页面报警成功！" });
                //}
                //else
                //{
                //    return Json(new { status = 1, msg = "页面报警失败！" });
                //}
                #endregion

                #region 新版
                RetMsgModel retModel = mapAlarmBll.AddMapDeviceAlarm(alarmName, alarmLevel, deviceCode, content, eventCode);
                return Json(new { status = retModel.status, msg = retModel.message });
                #endregion
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 根据父级事件ID获取子级事件
        /// </summary>
        /// <param name="pEventId"></param>
        /// <returns></returns>
        public JsonResult GetChildEventList(int pEventId)
        {
            try
            {
                BaseEventTypeBLL eventTypeBll = new BaseEventTypeBLL();
                List<BaseEventTypeModel> eventList = eventTypeBll.GetChildEventType(pEventId);
                return Json(new { status = 0, msg = eventList });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        #endregion


        #region 新的地图配置
        public JsonResult GetRegionAndMapConfig()
        {
            try
            {
                List<RegionConfigJoinMapConfig> regionConfigJoinMapConfig = baseMapConfigBLL.GetRegionAndMapConfig();
                return Json(regionConfigJoinMapConfig);
            }
            catch (Exception)
            {

                throw;
            }

        }
        #endregion

        /// <summary>
        /// 根据园区id 获取可用大屏
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public JsonResult GetBigscreenNum(int regionId)
        {
            try
            {
                LargeScreenCustom Bigscreen = largeScreenBLL.GetLargeScreenConfig(regionId);
                List<ScreenConfig> RegionInfo = new List<ScreenConfig>();
                if (Bigscreen != null)
                {
                    var BigscreenList = Bigscreen.screenList;
                    for (var i = 0; i < BigscreenList.Count; i++)
                    {
                        if (BigscreenList[i].galleryType == (int)EnumClass.GalleryType.快速上大屏)
                        {
                            RegionInfo.Add(BigscreenList[i]);
                        }
                    }
                }
                return Json(new { status = 0, msg = RegionInfo }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 事件预案获取摄像头
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public JsonResult GetCorrelationCamera(int Id, string Distance)
        {
            try
            {
                List<ServDeviceInfoModel> CameraInfo = servDeviceInfoBLL.GetDeviceNearCameraByDeviceId(Id, Convert.ToInt32(Distance));
                return Json(new { status = 0, msg = CameraInfo }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 告警视屏下载
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public JsonResult AlarmScreenDownload(string deviceName, string deviceCode, string Event, string alarmTime)
        {
            try
            {

                List<ServVideoInfoModel> ServVideoInfolist = new List<ServVideoInfoModel>();
                ServAlarmVideoTimeModel ServAlarmVideoTime = servVideoDownloadBLL.GetAlarmVideoTime(Event);
                DateTime aTime = Convert.ToDateTime(alarmTime);
                string[] devicename = deviceName.Split(',');
                string[] devicecode = deviceCode.Split(',');
                for (int a = 0; a < devicename.Length; a++)
                {
                    ServVideoInfoModel ServVideoInfo = new ServVideoInfoModel();
                    ServVideoInfo.video_type = (int)EnumClass.VideoDownLoadType.报警;
                    if (ServAlarmVideoTime != null)
                    {
                        ServVideoInfo.video_start_time = aTime.AddSeconds(-ServAlarmVideoTime.start_time);
                        ServVideoInfo.video_end_time = aTime.AddSeconds(ServAlarmVideoTime.end_time);
                    }
                    else
                    {
                        ServVideoInfo.video_start_time = aTime.AddSeconds(-10);
                        ServVideoInfo.video_end_time = aTime.AddSeconds(10);
                    }
                    ServVideoInfo.device_name = devicename[a];
                    ServVideoInfo.device_code = devicecode[a];
                    ServVideoInfo.download_status = (int)EnumClass.VideoDownLoadStatus.未开始下载;
                    ServVideoInfo.platform_id = (int)EnumClass.VideoPlatform.宇视;
                    ServVideoInfo.create_time = DateTime.Now;
                    ServVideoInfo.video_name = "";
                    ServVideoInfo.video_path = "";
                    ServVideoInfolist.Add(ServVideoInfo);

                }
                bool result = servVideoDownloadBLL.AddvideoDownload(ServVideoInfolist);
                return Json(new { status = 0, msg = result }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 将预案执行记录添加到预案处置项执行结果表中
        /// </summary>
        /// <param name="deviceName"></param>
        /// <param name="deviceCode"></param>
        /// <param name="Event"></param>
        /// <param name="alarmTime"></param>
        /// <returns></returns>
        public JsonResult AddPlanItemResult(int recordId, int itemType, bool itemResult, int handleitemId, string confirmType)
        {
            try
            {
                ServPlanItemResultModel servPlanItemResult = new ServPlanItemResultModel();
                if (confirmType == "确警前")
                {
                    servPlanItemResult.confirm_type = (int)EnumClass.PlanHandleTime.确警前;
                }
                else
                {
                    servPlanItemResult.confirm_type = (int)EnumClass.PlanHandleTime.确警后;
                }
                servPlanItemResult.execute_time = DateTime.Now;
                servPlanItemResult.handleitem_id = handleitemId;
                if (itemResult == true)
                {
                    servPlanItemResult.item_result = (int)EnumClass.PlanItemResult.成功;
                }
                else
                {
                    servPlanItemResult.item_result = (int)EnumClass.PlanItemResult.失败;
                }
                servPlanItemResult.plan_record_id = recordId;
                servPlanItemResult.item_type = itemType;
                bool result = servPlanRecordBLL.AddPlanItemResult(servPlanItemResult);
                return Json(new { status = 0, msg = result }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 根据设备类型id获取设备类型名称
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public JsonResult DeviceTypeName(int Id)
        {

            try
            {
                string deviceType = Enum.GetName(typeof(BaseDeviceType), Id);
                return Json(new { status = 0, msg = deviceType }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }

        public JsonResult keepAliveSession()
        {
            try
            {
                return Json(new { status = 0, msg = "" });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        /// <summary>
        /// 根据设备组获取视频巡更的设备
        /// </summary>
        /// <returns></returns>
        public List<Model.CustomModel.VideoInGroupModel> GetVideoPatrolDevice(int groupid)
        {

            List<Model.CustomModel.VideoInGroupModel> videoinfo = new List<Model.CustomModel.VideoInGroupModel>();

            BLL.ServDeviceGroupBLL groupbll = new ServDeviceGroupBLL();
            BLL.ServAreaInfoBLL areabll = new ServAreaInfoBLL();

            List<Model.CustomModel.VideoInGroupModel> viewinfolist = groupbll.GetVideoInfoByGroupIdint(groupid);
            foreach (Model.CustomModel.VideoInGroupModel viewmodel in viewinfolist)
            {
                if (viewmodel.is_inbuilding != -1)
                {
                    Model.ServFloorInfoModel floormodel = new ServFloorInfoModel();
                    floormodel = areabll.GetBuildingInfoByid(viewmodel.is_inbuilding);
                    viewmodel.ext1 = floormodel.floor_name.ToString();
                    viewmodel.ext2 = floormodel.floor_code.ToString();
                    viewmodel.ext3 = floormodel.building_id.ToString();
                    viewmodel.ext4 = floormodel.point1;
                    viewmodel.ext5 = floormodel.point2;
                    viewmodel.ext6 = floormodel.floor_src_2d;
                    viewmodel.ext7 = floormodel.floor_src_25d;
                    viewmodel.ext8 = floormodel.rank.ToString();
                    viewmodel.ext9 = floormodel.id.ToString();
                }
            }

            return viewinfolist;

        }

        /// <summary>
        /// 获取楼内图信息
        /// </summary>
        /// <param name="deviceId"></param>
        /// <returns></returns>
        public JsonResult GetMapBuildingInfo(int is_inbuilding)
        {
            try
            {
                BLL.ServAreaInfoBLL areabll = new ServAreaInfoBLL();
                Model.ServFloorInfoModel floormodel = new ServFloorInfoModel();
                floormodel = areabll.GetBuildingInfoByid(is_inbuilding);
                return Json(new { status = 0, msg = floormodel }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}