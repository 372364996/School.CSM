using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CSM.BLL;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using static CSM.Common.EnumClass;
using CSM.Common;
using System.IO;
using System.Web.Script.Serialization;
using CSM.Model.SubSystemModel;
using CSM.Utils;

namespace CSM.Controllers
{
    public class ConfigController : BaseController
    {
        BaseMapConfigBLL baseMapConfigBLL = new BaseMapConfigBLL();
        MapRegisterBLL mapRegisterBLL = new MapRegisterBLL();
        ServDeviceInfoBLL servDeviceInfoBLL = new BLL.ServDeviceInfoBLL();
        BaseAreaLevelBLL bAreaLevelBLL = new BaseAreaLevelBLL();
        ServAreaInfoBLL servAreaInfoBLL = new ServAreaInfoBLL();
        BaseEventTypeBLL baseEventTypeBLL = new BaseEventTypeBLL();
        ServFileInfoBLL servFileInfoBLL = new ServFileInfoBLL();
        ServPersonInfoBLL servPersonInfoBLL = new ServPersonInfoBLL();
        // GET: Config 
        //基础配置
        public ActionResult Index()
        {
            JavaScriptSerializer tojson = new JavaScriptSerializer();
            List<BaseRegionConfigModel> baseRegionConfigModelList = baseMapConfigBLL.GetAllRegionConfig();
            int regionID = 0;
            if (baseRegionConfigModelList.Count > 0)
            {
                regionID = baseRegionConfigModelList[0].id;
            }
            ViewData["NowMapType"] = baseMapConfigBLL.GetRegionConfigModelByID(regionID);
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


            ////当前地图引擎
            //ViewData["NowMapType"] = baseMapConfigBLL.GetMapEngine(Server.MapPath("../ConfigFile/map/mapConfig.xml"));
            //所有行业
            ViewData["AllIndustry"] = baseMapConfigBLL.GetAllIndustry();
            //默认行业
            ViewData["IndustryDefault"] = baseMapConfigBLL.GetDefaultIndustry(Server.MapPath("../ConfigFile/map/mapConfig.xml"));
            ////默认视频配置
            //ViewData["videoPlatform"] = baseMapConfigBLL.GetDefaulstVideoPlatform(Server.MapPath("/ConfigFile/video/videoConfig.xml"));
            //所有视频平台
            //ViewData["videoPlatformList"] = EnumClass.GetEnumModelList<EnumClass.VideoPlatform>();
            return View();
        }

        //地图配置
        public ActionResult Map()
        {
            JavaScriptSerializer tojson = new JavaScriptSerializer();
            List<BaseRegionConfigModel> baseRegionConfigModelList = baseMapConfigBLL.GetAllRegionConfig();
            int regionID = 0;
            if (baseRegionConfigModelList.Count > 0)
            {
                regionID = baseRegionConfigModelList[0].id;
            }
            ViewData["NowMapType"] = baseMapConfigBLL.GetRegionConfigModelByID(regionID);
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
            ViewData["RegionImage"] = FileHelper.GetFolderFileName(Server.MapPath("/images/map/region/regionImg"), "../images/map/region/regionImg/");
            ViewData["LogoImage"] = FileHelper.GetFolderFileName(Server.MapPath("/images/map/region/logoImg"), "../images/map/region/logoImg/");
            ViewData["Map2DConfig"] = tojson.Serialize(newMapConfig2D);
            ViewData["Map25DConfig"] = tojson.Serialize(newMapConfig25D);
            ViewData["DeleteRegion"] = baseMapConfigBLL.GetDeleteRegion();
            //ViewData["MapConfig"] = baseMapConfigBLL.GetMapConfig();
            ViewData["RegionConfig"] = baseMapConfigBLL.GetAllRegionConfig();
            ViewData["NewMapConfig"] = baseMapConfigBLL.GetAllNewMapConfig();
            //ViewData["NowMapType"] = baseMapConfigBLL.GetMapEngine(Server.MapPath("../ConfigFile/map/mapConfig.xml"));

            return View();
        }

        //大屏配置
        public ActionResult LargeScreen()
        {
            LargeScreenBLL bll = new LargeScreenBLL();
            ViewData["Region"] = bll.GetAllShowRegion();
            // ViewData["GalleryType"] = EnumClass.GetEnumModelList<EnumClass.GalleryType>();
            return View();
        }

        //LED配置
        public ActionResult LED()
        {
            LEDBLL ledBll = new LEDBLL();
            ViewData["Region"] = ledBll.GetAllShowRegion();
            return View();
        }
        //应急电话
        public ActionResult EmergencyPhone()
        {
            EmergencyPhoneBLL phone = new EmergencyPhoneBLL();
            ViewData["Region"] = phone.GetAllShowRegion();
            return View();
        }

        //设备注册
        public ActionResult DeviceRegistration()
        {
            JavaScriptSerializer tojson = new JavaScriptSerializer();
            List<BaseRegionConfigModel> baseRegionConfigModelList = baseMapConfigBLL.GetAllRegionConfig();
            int regionID = Request.QueryString["regionID"] == null ? 0 : int.Parse(Request.QueryString["regionID"]);

            if (regionID == 0)
            {

                if (baseRegionConfigModelList.Count > 0)
                {
                    regionID = baseRegionConfigModelList[0].id;
                }
            }
            ViewData["NowMapType"] = baseMapConfigBLL.GetRegionConfigModelByID(regionID);
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
            string configPath = "/ConfigFile/map/mapConfig.xml";
            //ViewData["NowMapType"] = baseMapConfigBLL.GetMapEngine(Server.MapPath(configPath));//当前地图配置
            //二位地图配置
            //BaseMapConfigModel mapConfi2D = baseMapConfigBLL.GetNowMapConfig(Server.MapPath(configPath), (int)MapType.二维);
            //ViewData["Map2DConfig"] = tojson.Serialize(mapConfi2D);
            ////2.5D地图配置
            //BaseMapConfigModel mapConfi25D = baseMapConfigBLL.GetNowMapConfig(Server.MapPath(configPath), (int)MapType.二点五维);
            //ViewData["Map25DConfig"] = tojson.Serialize(mapConfi25D);
            //默认行业
            BaseIndustryModel industryModel = baseMapConfigBLL.GetDefaultIndustry(Server.MapPath(configPath));
            //2D地图配置id
            ViewData["Map2DConfigId"] = regionID;
            ////25D地图配置id
            ViewData["Map25DConfigId"] = regionID;
            //当前行业id
            ViewData["NowIndustryId"] = tojson.Serialize(industryModel.id);
            //获取Serv_Device_Info中设备的全部数据(需要园区id)
            ViewData["AllDeviceInfo"] = tojson.Serialize(servDeviceInfoBLL.GetDeviceInfoAndIconUrl(regionID, industryModel.id));
            //基础设备类型
            ViewData["BaseDeviceType"] = baseMapConfigBLL.GetBaseDeviceTypeByIndustryId(industryModel.id);
            //子系统类型
            ViewData["SubSystem"] = EnumClass.GetEnumModelList<SubSystem>();
            //设备状态
            ViewData["DeviceStates"] = EnumClass.GetEnumModelList<DeviceStates>();
            //所有复合设备
            ViewData["PartsDevice"] = mapRegisterBLL.GetAllCompoundDevice(industryModel.id);
            //覆盖角度
            ViewData["CameraCoverRange"] = EnumClass.GetEnumModelList<CameraCoverRange>();
            //设备朝向
            ViewData["CameraTowards"] = EnumClass.GetEnumModelList<CameraTowards>();
            //覆盖半径
            ViewData["CameraVisualRange"] = EnumClass.GetEnumModelList<CameraVisualRange>();
            return View();
        }

        //系统日志
        public ActionResult SystemLog()
        {
            return View();
        }

        //设备列表
        public ActionResult DeviceList()
        {
            //默认行业
            BaseIndustryModel industryModel = baseMapConfigBLL.GetDefaultIndustry(Server.MapPath("../ConfigFile/map/mapConfig.xml"));
            JavaScriptSerializer tojson = new JavaScriptSerializer();
            ViewData["SubSystemJS"] = tojson.Serialize(EnumClass.GetEnumModelList<SubSystem>());
            //基础设备类型
            ViewData["BaseDeviceType"] = baseMapConfigBLL.GetBaseDeviceTypeByIndustryId(industryModel.id);
            //子系统类型
            ViewData["SubSystem"] = EnumClass.GetEnumModelList<SubSystem>();
            //设备状态
            ViewData["DeviceStates"] = EnumClass.GetEnumModelList<DeviceStates>();
            //所有复合设备
            ViewData["PartsDevice"] = mapRegisterBLL.GetAllCompoundDevice(industryModel.id);
            //覆盖角度
            ViewData["CameraCoverRange"] = EnumClass.GetEnumModelList<CameraCoverRange>();
            //设备朝向
            ViewData["CameraTowards"] = EnumClass.GetEnumModelList<CameraTowards>();
            //覆盖半径
            ViewData["CameraVisualRange"] = EnumClass.GetEnumModelList<CameraVisualRange>();
            //分组类型
            ViewData["GroupType"] = EnumClass.GetEnumModelList<GroupType>();
            return View();
        }
        //事件配置
        public ActionResult EventType()
        {
            return View();
        }

        //告警灯配置
        public ActionResult AlarmLamp()
        {
            return View();
        }

        //基础数据
        public ActionResult BaseData()
        {

            return View();
        }

        //区域管理
        public ActionResult Area()
        {
            JavaScriptSerializer tojson = new JavaScriptSerializer();
            List<BaseRegionConfigModel> baseRegionConfigModelList = baseMapConfigBLL.GetAllRegionConfig();
            int regionID = Request.QueryString["regionID"] == null ? 0 : int.Parse(Request.QueryString["regionID"]);

            if (regionID == 0)
            {

                if (baseRegionConfigModelList.Count > 0)
                {
                    regionID = baseRegionConfigModelList[0].id;
                }
            }
            ViewData["NowMapType"] = baseMapConfigBLL.GetRegionConfigModelByID(regionID);
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

            //JavaScriptSerializer tojson = new JavaScriptSerializer();
            ViewData["imageFile"] = servFileInfoBLL.getAllFileInfo();
            ViewData["areaPopupImage"] = FileHelper.GetFolderFileName(Server.MapPath("/images/map/areaMapIcon/popup_image"), "../images/map/areaMapIcon/popup_image/");
            ////当前地图引擎
            //ViewData["NowMapType"] = baseMapConfigBLL.GetMapEngine(Server.MapPath("/ConfigFile/map/mapConfig.xml"));
            ////当前2D地图的配置
            //BaseMapConfigModel mapConfi2D = baseMapConfigBLL.GetNowMapConfig(Server.MapPath("/ConfigFile/map/mapConfig.xml"), (int)MapType.二维);
            //ViewData["Map2DConfig"] = tojson.Serialize(mapConfi2D);
            ////当前2.5地图的配置
            //BaseMapConfigModel mapConfi25D = baseMapConfigBLL.GetNowMapConfig(Server.MapPath("/ConfigFile/map/mapConfig.xml"), (int)MapType.二点五维);
            //ViewData["Map25DConfig"] = tojson.Serialize(mapConfi25D);
            //区域级别
            ViewData["AreaLevel"] = bAreaLevelBLL.GetEntities();
            //区域类型
            

            ViewData["AreaType"] = baseMapConfigBLL.GetAreaTypeTool(Server.MapPath("/ConfigFile/map/mapConfig.xml"));
            //默认行业
            BaseIndustryModel industryModel = baseMapConfigBLL.GetDefaultIndustry(Server.MapPath("../ConfigFile/map/mapConfig.xml"));
            //获取Serv_Area_Info中区域的全部数据（需要园区id）
            ViewData["AreaInfo"] = tojson.Serialize(servAreaInfoBLL.GetAreaInfoAndBuilding(regionID, industryModel.id));


            ViewData["Persons"] = servPersonInfoBLL.GetPersonInfoList();
            return View();
        }
        //区域类别
        public ActionResult AreaType()
        {
            ViewData["IndustryType"] = baseMapConfigBLL.GetAllIndustry();
            //获取激活图标地址
            ViewData["activeImage"] = FileHelper.GetFolderFileName(Server.MapPath("/images/map/areaMapIcon/active_image"), "../images/map/areaMapIcon/active_image/");
            //获取所有未激活图标地址
            ViewData["unactiveImage"] = FileHelper.GetFolderFileName(Server.MapPath("/images/map/areaMapIcon/unactive_image"), "../images/map/areaMapIcon/unactive_image/");
            return View();
        }

        //行业管理
        public ActionResult Industry()
        {
            return View();
        }

        //视频配置
        public ActionResult VideoConfig()
        {
            ViewData["videoPlatformList"] = EnumClass.GetEnumModelList<EnumClass.VideoPlatform>();
            return View();
        }

        //设备类型管理
        public ActionResult DeviceType()
        {
            ViewData["baseDeviceType"] = baseMapConfigBLL.GetAllBaseDeviceType();
            ViewData["baseDeviceTypeJson"] = JsonHelper.ObjectToString<List<EnumModel>>(baseMapConfigBLL.GetAllBaseDeviceType());
            ViewData["IndustryType"] = baseMapConfigBLL.GetAllIndustry();
            //获取激活图标地址
            ViewData["activeImage"] = FileHelper.GetFolderFileName(Server.MapPath("/images/map/deviceMapIcon/active_image"), "../images/map/deviceMapIcon/active_image/");
            //获取所有未激活图标地址
            ViewData["unactiveImage"] = FileHelper.GetFolderFileName(Server.MapPath("/images/map/deviceMapIcon/unactive_image"), "../images/map/deviceMapIcon/unactive_image/");
            //获取所有的地图正常图标地址
            ViewData["normalImage"] = FileHelper.GetFolderFileName(Server.MapPath("/images/map/deviceMapIcon/normal_image"), "../images/map/deviceMapIcon/normal_image/");
            //获取所有的地图错误图标地址
            ViewData["errorImage"] = FileHelper.GetFolderFileName(Server.MapPath("/images/map/deviceMapIcon/error_image"), "../images/map/deviceMapIcon/error_image/");
            //获取所有地图闪光图标地址
            ViewData["flashImage"] = FileHelper.GetFolderFileName(Server.MapPath("/images/map/deviceMapIcon/flash_image"), "../images/map/deviceMapIcon/flash_image/");
            //弹出框图片地址
            ViewData["popupImage"] = FileHelper.GetFolderFileName(Server.MapPath("/images/map/deviceMapIcon/popup_image"), "../images/map/deviceMapIcon/popup_image/");
            return View();
        }

        //楼内图管理
        public ActionResult BuildingMap()
        {
            JavaScriptSerializer tojson = new JavaScriptSerializer();
            List<BaseRegionConfigModel> baseRegionConfigModelList = baseMapConfigBLL.GetAllRegionConfig();
            int regionID = Request.QueryString["regionID"] == null ? 0 : int.Parse(Request.QueryString["regionID"]);

            if (regionID == 0)
            {

                if (baseRegionConfigModelList.Count > 0)
                {
                    regionID = baseRegionConfigModelList[0].id;
                }
            }
            ViewData["NowMapType"] = baseMapConfigBLL.GetRegionConfigModelByID(regionID);
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

            //JavaScriptSerializer tojson = new JavaScriptSerializer();
            //ViewData["NowMapType"] = baseMapConfigBLL.GetMapEngine(Server.MapPath("/ConfigFile/map/mapConfig.xml"));//当前地图配置
            ViewData["floorBuildingArea"] = tojson.Serialize(servAreaInfoBLL.GetFloorBuildingAreaInfoCustom());
            ////当前2D地图的配置
            //BaseMapConfigModel mapConfi2D = baseMapConfigBLL.GetNowMapConfig(Server.MapPath("/ConfigFile/map/mapConfig.xml"), (int)MapType.二维);
            //默认行业
            BaseIndustryModel industryModel = baseMapConfigBLL.GetDefaultIndustry(Server.MapPath("../ConfigFile/map/mapConfig.xml"));
            //获取Serv_Device_Info中设备的全部数据(需要园区id)
            ViewData["AllDeviceInfo"] = tojson.Serialize(servDeviceInfoBLL.GetDeviceInfoAndIconUrl(regionID, industryModel.id));
            //当前行业id
            ViewData["NowIndustryId"] = tojson.Serialize(industryModel.id);
            //2D地图配置id
            ViewData["Map2DConfigId"] = regionID;
            return View();
        }




        /* #region 地图配置
         /// <summary>
         /// 获取所有地图配置数据  2016.12.01 张丰刚
         /// </summary>
         /// <returns></returns>
         public JsonResult GetAllMapConfig()
         {

             try
             {
                 List<BaseMapConfigModel> list = new List<BaseMapConfigModel>();
                 list = baseMapConfigBLL.GetMapConfig();
                 return Json(list);
             }
             catch (Exception ex)
             {
                 return Json(new { state = 1, message = ex.Message });
             }

         }
         /// <summary>
         /// 根据id获取地图配置
         /// </summary>
         /// <param name="id"></param>
         /// <returns></returns>
         public JsonResult GetMapConfigByID(int id)
         {

             try
             {
                 BaseMapConfigModel model = new BaseMapConfigModel();
                 model = baseMapConfigBLL.GetModelByID(id);
                 return Json(model);
             }
             catch (Exception ex)
             {
                 return Json(new { state = 1, message = ex.Message });
             }

         }
         /// <summary>
         /// 添加地图配置 2016.12.01 张丰刚
         /// </summary>
         /// <param name="regionCode">园区编号</param>
         /// <param name="regionName">园区名称</param>
         /// <param name="regionType">园区类型</param>
         /// <param name="mapEngine">地图引擎</param>
         /// <param name="mapType">地图类型</param>
         /// <param name="mapSrc">地图地址</param>
         /// <param name="mapCenter">地图中心点</param>
         /// <param name="mapLeftBottom">地图左下角坐标</param>
         /// <param name="mapRightTop">地图右上角坐标</param>
         /// <param name="IsLoad">是否默认加载</param>
         /// <returns></returns>
         public JsonResult AddMapConfig(string regionName, string regionCode, int regionType, int mapEngine, int mapType, string mapSrc, string mapCenter, string mapLeftBottom, string mapRightTop)//, int IsLoad
         {
             try
             {
                 bool _result = false;
                 string _message = "";
                 if (regionType == (int)RegionType.主园区 && mapType == (int)MapType.二维)
                 {
                     //提取传过来的数据中的mapEngine地图引擎，regionType区域类型（主/副）,mapType地图类型（2D/2.5D）
                     BaseMapConfigModel model = baseMapConfigBLL.GetMapConfigByMapType(mapEngine, regionType, mapType);
                     if (model != null)
                     {
                         return Json(new { result = _result, message = "添加失败，一个地图引擎下只能有一个主园区" });
                     }
                 }
                 //二维的regioncode验证
                 if (mapType == (int)MapType.二维)
                 {
                     //提取传过来的数据中的mapEngine地图引擎，regionCode园区编号,mapType地图类型（2D/2.5D）
                     BaseMapConfigModel model = baseMapConfigBLL.GetMapConfigByRegionCode(mapEngine, regionCode, mapType, regionType);
                     if (model != null)
                     {
                         return Json(new { result = _result, message = "添加失败，该地图引擎的该园区编号已经注册过2D地图了！" });
                     }
                 }
                 if (mapType == (int)MapType.二点五维)
                 {
                     //提取传过来的数据中的mapEngine地图引擎，regionCode园区编号,mapType地图类型（2D/2.5D）
                     BaseMapConfigModel model = baseMapConfigBLL.GetMapConfigByRegionCode(mapEngine, regionCode, mapType, 2);
                     if (model != null)
                     {
                         return Json(new { result = _result, message = "添加失败，该地图引擎的该园区已经注册过2.5D地图了！" });
                     }
                 }

                 BaseMapConfigModel mapConfigModel = new BaseMapConfigModel();
                 mapConfigModel.region_code = regionCode;
                 mapConfigModel.region_name = regionName;
                 mapConfigModel.region_type = regionType;
                 mapConfigModel.map_engine = mapEngine;
                 mapConfigModel.map_type = mapType;
                 mapConfigModel.map_src = mapSrc;
                 mapConfigModel.map_center = mapCenter;
                 mapConfigModel.map_bounds = mapLeftBottom + "|" + mapRightTop;

                 int id = baseMapConfigBLL.AddMapConfig(mapConfigModel);
                 if (id != 0)
                 {
                     _result = true;
                     _message = "地图配置添加成功";
                 }
                 return Json(new { result = _result, message = _message });
             }
             catch (Exception ex)
             {
                 return Json(new { state = 1, message = ex.Message });
             }


         }
         /// <summary>
         /// 修改地图配置 2016.12.01 张丰刚
         /// </summary>
         /// <param name="id">主键</param>
         /// <param name="regionCode">园区编号</param>
         /// <param name="regionName">园区名称</param>
         /// <param name="regionType">园区类别</param>
         /// <param name="mapType">地图类别</param>
         /// <param name="mapSrc">地图地址</param>
         /// <param name="mapCenter">地图中心点</param>
         /// <param name="mapBounds">地图边框点位</param>
         /// <returns></returns>
         public JsonResult UpdateMapConfig(int mapConfigID, string regionName, string regionCode, int regionType, int mapEngine, int mapType, string mapSrc, string mapCenter, string mapLeftBottom, string mapRightTop)
         {
             try
             {
                 bool _result = false;
                 //验证主园区
                 if (regionType == (int)RegionType.主园区 && mapType == (int)MapType.二维)
                 {
                     BaseMapConfigModel model = baseMapConfigBLL.GetMapConfigByMapType(mapEngine, regionType, mapType);
                     if (model != null)
                     {
                         if (mapConfigID != model.id)
                         {
                             return Json(new { result = _result, message = "修改失败，一个地图引擎只能有一个主园区,若您想重设主园区，请先设置已有主园区为副园区，再修改！" });
                         }

                     }
                 }
                 //二维的regioncode验证
                 if (mapType == (int)MapType.二维)
                 {
                     //提取传过来的数据中的mapEngine地图引擎，regionCode园区编号,mapType地图类型（2D/2.5D）
                     BaseMapConfigModel model = baseMapConfigBLL.GetMapConfigByRegionCode(mapEngine, regionCode, mapType, regionType);
                     if (model != null)
                     {
                         return Json(new { result = _result, message = "添加失败，该地图引擎的该园区编号已经注册过2D地图了！" });
                     }
                 }
                 if (mapType == (int)MapType.二点五维)
                 {
                     //提取传过来的数据中的mapEngine地图引擎，regionCode园区编号,mapType地图类型（2D/2.5D）
                     BaseMapConfigModel model = baseMapConfigBLL.GetMapConfigByRegionCode(mapEngine, regionCode, mapType, 2);
                     if (model != null)
                     {
                         return Json(new { result = _result, message = "添加失败，该地图引擎的该园区已经注册过2.5D地图了！" });
                     }
                 }
                 BaseMapConfigModel mapConfigModel = new BaseMapConfigModel();
                 mapConfigModel.id = mapConfigID;
                 mapConfigModel.region_code = regionCode;
                 mapConfigModel.region_name = regionName;
                 mapConfigModel.region_type = regionType;
                 mapConfigModel.map_type = mapType;
                 mapConfigModel.map_engine = mapEngine;
                 mapConfigModel.map_src = mapSrc;
                 mapConfigModel.map_center = mapCenter;
                 mapConfigModel.map_bounds = mapLeftBottom + "|" + mapRightTop;
                 _result = baseMapConfigBLL.UpdateMapConfig(mapConfigModel);
                 return Json(new { result = _result, message = "修改成功" });
             }
             catch (Exception ex)
             {
                 return Json(new { state = 1, message = ex.Message });
             }


         }
         /// <summary>
         /// 删除地图配置
         /// </summary>
         /// <param name="id">主键ID</param>
         /// <returns></returns>
         public JsonResult DelteMapConfig(int id)
         {

             try
             {
                 bool result = false;
                 result = baseMapConfigBLL.DelteMapConfig(id);
                 return Json(result);
             }
             catch (Exception ex)
             {
                 return Json(new { state = 1, message = ex.Message });
             }

         }
         /// <summary>
         /// 修改默认地图引擎
         /// </summary>
         /// <param name="mapEngion"></param>
         /// <returns></returns>
         public JsonResult UpdateMapSwitch(int mapEngion)
         {
             try
             {
                 bool result = false;
                 result = baseMapConfigBLL.SetMapEngine(Server.MapPath("../ConfigFile/map/mapConfig.xml"), mapEngion.ToString());
                 return Json(result);
             }
             catch (Exception ex)
             {
                 return Json(new { state = 1, message = ex.Message });
             }
         }
         #endregion*/

        #region 地图新配置
        /// <summary>
        /// 添加园区
        /// </summary>
        /// <param name="regionCode">园区编号</param>
        /// <param name="regionName">园区名称</param>
        /// <param name="mapEngine">园区默认地图引擎</param>
        /// <param name="regionType">园区类型:本地非本地</param>
        /// <param name="regionImage">园区展示按钮图片</param>
        /// <param name="initialMapType">园区初始加载地图类型</param>
        /// <returns></returns>
        public string AddRegion(string regionCode, string regionName, int mapEngine, int regionType, string regionImage, int initialMapType, string logoImage)
        {
            regionImage = regionImage.Split('/')[regionImage.Split('/').Length - 1];
            logoImage = logoImage.Split('/')[logoImage.Split('/').Length - 1];
            int _state = -1;
            string _msg = "";
            try
            {
                BaseRegionConfigModel baseRegionConfigModel = new BaseRegionConfigModel();
                baseRegionConfigModel.region_code = regionCode;
                baseRegionConfigModel.region_name = regionName;
                baseRegionConfigModel.map_engine = mapEngine;
                baseRegionConfigModel.region_type = regionType;
                baseRegionConfigModel.is_show = 1;//园区默认显示，删除的时候设为0
                baseRegionConfigModel.initial_map_type = initialMapType;//初始加载地图类型
                baseRegionConfigModel.region_image = regionImage;
                baseRegionConfigModel.logo_image = logoImage;
                if (regionImage != "" && logoImage != "")
                {
                    HttpFileCollectionBase files = Request.Files; //接收文件

                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFileBase file = files[i];
                        string uploadFileName = files.Keys[i];//当前上传控件的name值

                        byte[] content = new byte[file.ContentLength];
                        file.InputStream.Read(content, 0, content.Length);

                        //检查文件是否存在 不存在则创建
                        string localPath = "";
                        if (uploadFileName == "regionImageUpload")
                        {
                            localPath = System.IO.Path.Combine(HttpRuntime.AppDomainAppPath, "images/map/region/regionImg");
                        }
                        if (uploadFileName == "logoImageUpload")
                        {
                            localPath = System.IO.Path.Combine(HttpRuntime.AppDomainAppPath, "images/map/region/logoImg");
                        }

                        FileHelper.CheckDirectory(localPath);
                        //截取字符串 获取图片名称
                        string[] FilePath = file.FileName.Split('\\');
                        //生成图片名称
                        string ImageName = FilePath[FilePath.Length - 1];
                        string newFilePath = Path.Combine(localPath, ImageName);
                        ////创建文件名 ，如果有重复的 加上副本
                        newFilePath = FileHelper.CreateFileName(newFilePath);
                        //如果不存在这个文件再保存
                        //if (System.IO.File.Exists(newFilePath) == false)
                        //{
                        //    FileHelper.Save(newFilePath, content);
                        //}
                        FileHelper.Save(newFilePath, content);
                        if (uploadFileName == "regionImageUpload")
                        {
                            baseRegionConfigModel.region_image = ImageName;
                        }
                        if (uploadFileName == "logoImageUpload")
                        {
                            baseRegionConfigModel.logo_image = ImageName;
                        }


                    }

                }

                int id = baseMapConfigBLL.AddRegion(baseRegionConfigModel);
                if (id > 0)
                {
                    _state = 0;
                    _msg = "园区添加成功";
                }

                if (id == 0)
                {
                    _state = 0;
                    _msg = "添加失败，园区编号已存在！";
                }
                else if (id == -1)
                {
                    _state = -1;
                    _msg = "添加失败，园区名称已存在！";
                }
                else if (id == -2)
                {
                    _state = -2;
                    _msg = "添加失败，回收站有相同园区编号的园区，请回收使用！";
                }
                else if (id == -3)
                {
                    _state = -2;
                    _msg = "添加失败，回收站有相同园区名称的园区，请回收使用！";
                }
                return _state + "|" + _msg;
            }
            catch (Exception ex)
            {
                return 0 + "|" + ex.Message;
            }
        }
        /// <summary>
        /// 删除园区，将园区的isshow的属性设置为0
        /// </summary>
        /// <param name="regionID"></param>
        /// <returns></returns>
        public JsonResult DeleteRegionConfig(int regionID)
        {
            int _state = -1;
            string _msg = "";
            try
            {
                BaseRegionConfigModel baseRegionConfigModel = new BaseRegionConfigModel();
                bool result = baseMapConfigBLL.DeleteRegionConfig(regionID);
                if (result == true)
                {
                    _state = 0;
                    _msg = "园区删除成功";
                    return Json(new { state = _state, msg = _msg });
                }
                else
                {
                    _state = 1;
                    _msg = "园区删除失败";
                    return Json(new { state = _state, msg = _msg });
                }
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 回收删除园区id的字符串,如:1,2,3,4,5,
        /// </summary>
        /// <param name="regionIdArray"></param>
        /// <returns></returns>
        public JsonResult recycleRegion(string regionIdArray)
        {
            int num = 0;
            try
            {
                num = baseMapConfigBLL.recycleRegion(regionIdArray);
                return Json(new { state = 0, msg = "成功恢复" + num + "条数据！" });
            }
            catch (Exception ex)
            {

                return Json(new { state = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 更新园区信息
        /// </summary>
        /// <returns></returns>
        public string UpdateRegionInfo(int regionID, string regionName, string regionCode, string regionImage, string logoImage)
        {
            regionImage = regionImage.Split('/')[regionImage.Split('/').Length - 1];
            logoImage = logoImage.Split('/')[logoImage.Split('/').Length - 1];
            int _state = -1;
            string _msg = "";
            try
            {
                //判断是否上传图片
                if (regionImage != "" && logoImage != "")
                {
                    HttpFileCollectionBase files = Request.Files; //接收文件
                    for (int i = 0; i < files.Count; i++)
                    {
                        HttpPostedFileBase file = files[i];
                        string uploadFileName = files.Keys[i];//当前上传控件的name值

                        byte[] content = new byte[files[0].ContentLength];
                        file.InputStream.Read(content, 0, content.Length);
                        //检查文件是否存在 不存在则创建
                        string localPath = "";
                        if (uploadFileName == "UnewRegionImageUpload")
                        {
                            localPath = System.IO.Path.Combine(HttpRuntime.AppDomainAppPath, "images/map/region/regionImg");
                        }
                        if (uploadFileName == "UnewLogoImageUpload")
                        {
                            localPath = System.IO.Path.Combine(HttpRuntime.AppDomainAppPath, "images/map/region/logoImg");
                        }
                        FileHelper.CheckDirectory(localPath);
                        //截取字符串 获取图片名称
                        string[] FilePath = file.FileName.Split('\\');
                        //生成图片名称
                        string ImageName = FilePath[FilePath.Length - 1];
                        string newFilePath = Path.Combine(localPath, ImageName);
                        //创建文件名 ，如果有重复的 加上副本
                        newFilePath = FileHelper.CreateFileName(newFilePath);
                        ////如果不存在这个文件再保存
                        //if (System.IO.File.Exists(newFilePath) == false)
                        //{
                        //    FileHelper.Save(newFilePath, content);
                        //}
                        FileHelper.Save(newFilePath, content);
                        if (uploadFileName == "UnewRegionImageUpload")
                        {
                            regionImage = ImageName;
                        }
                        if (uploadFileName == "UnewLogoImageUpload")
                        {
                            logoImage = ImageName;
                        }

                    }
                }
                bool result = baseMapConfigBLL.UpdateRegionInfo(regionID, regionName, regionCode, regionImage, logoImage);
                if (result == true)
                {
                    _state = 0;
                    _msg = "园区信息更新成功";
                }
                else
                {
                    _state = 1;
                    _msg = "园区信息更新失败";
                }
                return _state + "|" + _msg;
            }
            catch (Exception ex)
            {

                return 0 + "|" + ex.Message;
            }
        }
        /// <summary>
        /// 通过园区编号获取园区
        /// </summary>
        /// <param name="regionCode">园区编号</param>
        public BaseRegionConfigModel GetRegionByRegionCode(string regionCode)
        {
            BaseRegionConfigModel baseRegionConfigModel = new BaseRegionConfigModel();
            try
            {
                baseRegionConfigModel = baseMapConfigBLL.GetRegionByRegionCode(regionCode);
            }
            catch (Exception)
            {

                throw;
            }
            return baseRegionConfigModel;
        }
        /// <summary>
        /// 通过园区名称获取园区
        /// </summary>
        /// <param name="regionName">园区名称</param>
        public BaseRegionConfigModel GetRegionByRegionName(string regionName)
        {
            BaseRegionConfigModel baseRegionConfigModel = new BaseRegionConfigModel();
            try
            {
                baseRegionConfigModel = baseMapConfigBLL.GetRegionByRegionCode(regionName);
            }
            catch (Exception)
            {

                throw;
            }
            return baseRegionConfigModel;
        }
        /// <summary>
        /// 添加地图配置
        /// </summary>
        /// <param name="regionId">所配置地图的园区ID</param>
        /// <param name="mapName">地图配置名称</param>
        /// <param name="mapEngine">地图引擎</param>
        /// <param name="mapType">地图类型2D/25D</param>
        /// <param name="mapSrc">地图地址</param>
        /// <param name="mapCenter">地图中心</param>
        /// <param name="mapBounds">地图边界</param>
        /// <returns></returns>
        public JsonResult AddNewMapConfig(int regionId, string mapName, int mapEngine, int mapType, string mapSrc, string mapCenter, string mapBounds)
        {
            int _state = -1;
            string _msg = "";
            try
            {
                BaseNewMapConfigModel baseNewMapConfigModel = new BaseNewMapConfigModel();
                baseNewMapConfigModel.region_id = regionId;
                baseNewMapConfigModel.map_name = mapName;
                baseNewMapConfigModel.map_engine = mapEngine;
                baseNewMapConfigModel.map_type = mapType;
                baseNewMapConfigModel.map_src = mapSrc;
                baseNewMapConfigModel.map_center = mapCenter;
                baseNewMapConfigModel.map_bounds = mapBounds;

                int id = baseMapConfigBLL.AddNewMapConfig(baseNewMapConfigModel);
                if (id != 0)
                {
                    _state = 0;
                    _msg = "添加地图配置成功！";
                }
                else
                {
                    string engineName = mapEngine == 1 ? "超图" : "DGIS";
                    string typeName = mapType == 1 ? "2D" : "2.5D";
                    _state = 1;
                    _msg = "添加地图配置失败！当前园区已经添加过" + engineName + typeName + "配置了";
                }
                return Json(new { state = _state, msg = _msg });
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 更新地图信息
        /// </summary>
        /// <param name="mapConfigID"></param>
        /// <param name="mapName"></param>
        /// <param name="mapCenter"></param>
        /// <param name="mapBounds"></param>
        /// <param name="mapSrc"></param>
        /// <returns></returns>
        public JsonResult UpdateNewMapConfigInfo(int mapConfigID, string mapName, string mapCenter, string mapBounds, string mapSrc)
        {
            try
            {
                int _state = -1;
                string _msg = "";
                try
                {
                    bool result = baseMapConfigBLL.UpdateNewMapConfigInfo(mapConfigID, mapName, mapCenter, mapBounds, mapSrc);
                    if (result == true)
                    {
                        _state = 0;
                        _msg = "地图配置信息更新成功";
                        return Json(new { state = _state, msg = _msg });
                    }
                    else
                    {
                        _state = 1;
                        _msg = "地图配置更新失败";
                        return Json(new { state = _state, msg = _msg });
                    }
                }
                catch (Exception ex)
                {

                    return Json(new { state = 1, msg = ex.Message });
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
        /// <summary>
        /// 通过园区ID获取地图配置
        /// </summary>
        /// <param name="regionID">园区ID</param>
        /// <returns></returns>
        public JsonResult GetAllNewMapConfigByRegionID(int regionID)
        {
            List<BaseNewMapConfigModel> modelList = new List<BaseNewMapConfigModel>();
            try
            {
                modelList = baseMapConfigBLL.GetAllNewMapConfigByRegionID(regionID);

            }
            catch (Exception ex)
            {

                throw;
            }
            return Json(modelList);

        }
        /// <summary>
        /// 更新园区默认地图引擎和地图类型
        /// </summary>
        /// <param name="regionID"></param>
        /// <param name="mapEngine"></param>
        /// <param name="mapType"></param>
        public JsonResult UpdateRegionEngineAndType(int regionID, int mapEngine, int mapType)
        {
            int _state = -1;
            string _msg = "";
            try
            {
                bool result = baseMapConfigBLL.UpdateRegionEngineAndType(regionID, mapEngine, mapType);
                if (result == true)
                {
                    _state = 0;
                    _msg = "修改成功！";

                    return Json(new { state = _state, msg = _msg });
                }
                else
                {
                    _state = 1;
                    _msg = "修改失败！";
                    return Json(new { state = _state, msg = _msg });
                }
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, msg = ex.Message });
            }
        }
        #endregion

        #region 行业配置
        /// <summary>
        /// 获取行业配置列表
        /// </summary>
        /// <param name="pageIndex">当前页码</param>
        /// <param name="pageSize">每页行数</param>
        /// <returns></returns>
        public JsonResult GetIndustry(int pageIndex, int pageSize)
        {

            //下面写获取拼装完行业配置集合
            try
            {
                List<BaseIndustryModel> list = new List<BaseIndustryModel>();
                int total = 0;
                list = baseMapConfigBLL.GetAllIndustry(pageIndex, pageSize, out total);
                return Json(new { status = 0, msg = new { rows = list, total = total } });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }

        /// <summary>
        /// 修改行业配置
        /// </summary>
        /// <param name="industryID">行业id</param>
        /// <param name="industryName">行业名称</param>
        /// <param name="industryCode">行业编号</param>
        /// <param name="industryContent">行业描述</param>
        /// <returns></returns>
        public JsonResult UpdateIndustry(int industryID, string industryName, string industryCode, string industryContent)
        {
            try
            {
                bool result = false;
                //具体实现 调用BaseMapConfigBLL下UpdateIndustry
                BaseIndustryModel industry = new BaseIndustryModel();
                industry.id = industryID;
                industry.industry_name = industryName;
                industry.industry_code = industryCode;
                industry.content = industryContent;
                result = baseMapConfigBLL.UpdateIndustry(industry);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }

        }
        /// <summary>
        /// 新增行业配置
        /// </summary>
        /// <param name="industryName">行业名称</param>
        /// <param name="industryCode">行业编号</param>
        /// <param name="industryContent">行业描述</param>
        /// <returns></returns>
        public JsonResult AddIndustry(string industryName, string industryCode, string industryContent)
        {
            try
            {
                bool result = false;
                //具体实现 调用BaseMapConfigBLL下AddIndustry
                BaseIndustryModel industry = new BaseIndustryModel();
                industry.industry_name = industryName;
                industry.industry_code = industryCode;
                industry.content = industryContent;
                result = baseMapConfigBLL.AddIndustry(industry);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 删除行业配置
        /// </summary>
        /// <param name="industryID"></param>
        /// <returns></returns>
        public JsonResult DeleteIndustry(int industryID)
        {
            try
            {
                bool result = false;
                //具体实现 调用BaseMapConfigBLL下DeleteIndustry
                result = baseMapConfigBLL.DeleteIndustry(industryID);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }

        }
        /// <summary>
        /// 设置默认行业配置
        /// </summary>
        /// <param name="industryID"></param>
        /// <returns></returns>
        public JsonResult SetIndustryDefault(int industryID)
        {
            try
            {
                bool result = false;
                result = baseMapConfigBLL.SetDefaultIndustry(Server.MapPath("../ConfigFile/map/mapConfig.xml"), industryID);
                return Json(new { status = 1, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        #endregion

        #region 设备类型配置
        /// <summary>
        /// 获取所有自定义设备类型
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllDeviceDefined(int industry, int pageIndex, int pageSize)
        {
            try
            {
                List<ServDefinedDeviceModel> list = new List<ServDefinedDeviceModel>();
                int total = 0;
                list = baseMapConfigBLL.GetAllDeviceDefinedCustom(industry, pageIndex, pageSize, out total);
                return Json(new { status = 0, msg = new { rows = list, total = total } });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }

        }
        /// <summary>
        /// 得到当前行业全部的已经注册的设备，不然楼内图注册的时候，数据是从viewdata取得的，不是更新后的
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllDeviceInfo(int regionID)
        {
            try
            {
                string configPath = "/ConfigFile/map/mapConfig.xml";
                //BaseMapConfigModel mapConfi2D = baseMapConfigBLL.GetNowMapConfig(Server.MapPath(configPath), (int)MapType.二维);
                //默认行业
                BaseIndustryModel industryModel = baseMapConfigBLL.GetDefaultIndustry(Server.MapPath(configPath));
                //具体实现 调用BaseMapConfigBLL下GetAllDeviceDefined
                List<DeviceInfoCustom> list = new List<DeviceInfoCustom>();
                list = servDeviceInfoBLL.GetDeviceInfoAndIconUrl(regionID, industryModel.id);
                return Json(new { status = 0, msg = list });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }

        }
        /// <summary>
        /// 查询自定义类型的子级
        /// </summary>
        /// <param name="pid"></param>
        /// <returns></returns>
        public JsonResult GetChildDeviceDefinedByPid(int pid)
        {
            try
            {
                List<ServDefinedDeviceModel> list = baseMapConfigBLL.GetChildDeviceDefinedByPid(pid);
                return Json(new { status = 0, msg = list });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 根据id获取自定义设备类型
        /// </summary>
        /// <param name="deviceDefinedID"></param>
        /// <returns></returns>
        public JsonResult GetDeviceDefinedByID(int deviceDefinedID)
        {
            try
            {
                ServDefinedDeviceModel deviceDefined = baseMapConfigBLL.GetDeviceDefinedByID(deviceDefinedID);
                return Json(new { status = 0, msg = deviceDefined });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }

        /// <summary>
        /// 添加自定义设备类型
        /// </summary>
        /// <param name="deviceTypeName">类型名称</param>
        /// <param name="enabled">是否启用</param>
        /// <param name="activeImage">激活图标</param>
        /// <param name="unActiveImage">未激活图标</param>
        /// <param name="normalImage">地图正常图标</param>
        /// <param name="errorImage">地图错误图标</param>
        /// <param name="flashImage">地图闪光图标</param>
        /// <param name="definedContent">备注</param>
        /// <param name="popupImageUpload">弹出框图片上传</param>
        /// <param name="popupImageName">弹出框图片名称</param>
        /// <param name="baseDeviceType">所包含基础设备</param>
        /// <param name="industryTypeID">行业id</param>
        /// <param name="definedDevicePid">pid</param>
        /// <returns></returns>
        public JsonResult AddDeiveDefined(string deviceTypeName, string activeImage, string unActiveImage, string normalImage, string errorImage, string flashImage, string popupImage, int enabled, string definedContent, int baseDeviceType, int industryTypeID, int definedDevicePid)
        {
            try
            {
                #region 上传文件
                //判断是否上传图片
                HttpFileCollectionBase files = Request.Files; //接收文件
                for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFileBase file = files[i];

                    string uploadFileName = files.Keys[i];//当前上传控件的name值
                    switch (uploadFileName)
                    {
                        case "activeImageUpload"://激活
                            if (activeImage == "1")
                            {
                                string path = "images/map/deviceMapIcon/active_image";
                                activeImage = "../" + path + "/" + UpLoadImage(file, path);
                            }
                            break;
                        case "unActiveImageUpload"://未激活
                            if (unActiveImage == "1")
                            {
                                string path = "images/map/deviceMapIcon/unactive_image";
                                unActiveImage = "../" + path + "/" + UpLoadImage(file, path);
                            }
                            break;
                        case "normalImageUpload"://正常
                            if (normalImage == "1")
                            {
                                string path = "images/map/deviceMapIcon/normal_image";
                                normalImage = "../" + path + "/" + UpLoadImage(file, path);
                            }
                            break;
                        case "errorImageUpload"://错误
                            if (errorImage == "1")
                            {
                                string path = "images/map/deviceMapIcon/error_image";
                                errorImage = "../" + path + "/" + UpLoadImage(file, path);
                            }
                            break;
                        case "flashImageUpload"://闪光
                            if (flashImage == "1")
                            {
                                string path = "images/map/deviceMapIcon/flash_image";
                                flashImage = "../" + path + "/" + UpLoadImage(file, path);
                            }
                            break;
                        case "popupImageUpload"://弹窗图片
                            if (popupImage == "1")
                            {
                                string path = "images/map/deviceMapIcon/popup_image";
                                popupImage = "../" + path + "/" + UpLoadImage(file, path);
                            }
                            break;
                        default:
                            break;
                    }
                }
                #endregion
                ServDefinedDeviceModel deviceDefinedmodel = new ServDefinedDeviceModel();
                deviceDefinedmodel.defined_device_name = deviceTypeName;
                deviceDefinedmodel.enabled = enabled;
                deviceDefinedmodel.active_image = activeImage;
                deviceDefinedmodel.unactive_image = unActiveImage;
                deviceDefinedmodel.normal_image = normalImage;
                deviceDefinedmodel.error_image = errorImage;
                deviceDefinedmodel.flash_image = flashImage;
                deviceDefinedmodel.popup_image = popupImage;
                deviceDefinedmodel.defined_device_content = definedContent;
                deviceDefinedmodel.base_device_type_id = baseDeviceType;
                deviceDefinedmodel.pid = definedDevicePid;
                deviceDefinedmodel.industry_id = industryTypeID;
                int result = baseMapConfigBLL.AddDeviceDefined(deviceDefinedmodel);
                return Json(result, "text/html");
            }
            catch (Exception ex)
            {
                return Json(ex.Message, "text/html");
            }
        }
        /// <summary>
        /// 上传文件
        /// </summary>
        /// <param name="file"></param>
        /// <param name="content"></param>
        /// <param name="path"></param>
        /// <returns></returns>
        public string UpLoadImage(HttpPostedFileBase file, string path)
        {
            try
            {
                //转化成字节数组
                byte[] content = new byte[file.ContentLength];
                file.InputStream.Read(content, 0, content.Length);
                //截取字符串 获取图片名称
                string[] FilePath = file.FileName.Split('\\');
                //检查文件是否存在 不存在则创建
                string localPath = System.IO.Path.Combine(HttpRuntime.AppDomainAppPath, path);
                FileHelper.CheckDirectory(localPath);
                //生成图片名称
                string ImageName = FilePath[FilePath.Length - 1];
                string newFilePath = Path.Combine(localPath, ImageName);
                //创建文件名 ，如果有重复的 加上副本
                newFilePath = FileHelper.CreateFileName(newFilePath);
                string newImageName = newFilePath.Split('\\')[newFilePath.Split('\\').Length - 1];
                FileHelper.Save(newFilePath, content);
                return newImageName;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 修改自定义设备类型
        /// </summary>
        /// <param name="deviceDefinedID"></param>
        /// <param name="defined_device_name"></param>
        /// <param name="enabled"></param>
        /// <param name="active_image"></param>
        /// <param name="unactive_image"></param>
        /// <param name="normal_image"></param>
        /// <param name="error_image"></param>
        /// <param name="flash_image"></param>
        /// <param name="popup_image"></param>
        /// <param name="defined_device_content"></param>
        /// <param name="deivceTypeIDList"></param>
        /// <param name="industryTypeID">行业id</param>
        /// <param name="definedDevicePid">pid</param>
        /// <returns></returns>
        public JsonResult UpdateDeviceDefined(int deviceDefinedID, string deviceTypeName, string activeImage, string unActiveImage, string normalImage, string errorImage, string flashImage, string popupImage, int enabled, string definedContent, int baseDeviceType, int industryTypeID, int definedDevicePid)
        {
            try
            {
                #region 上传文件
                HttpFileCollectionBase files = Request.Files; //接收文件
                for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFileBase file = files[i];

                    string uploadFileName = files.Keys[i];//当前上传控件的name值
                    switch (uploadFileName)
                    {
                        case "activeImageUpload"://激活
                            if (activeImage == "1")
                            {
                                string path = "images/map/deviceMapIcon/active_image";
                                activeImage = "../" + path + "/" + UpLoadImage(file, path);
                            }
                            break;
                        case "unActiveImageUpload"://未激活
                            if (unActiveImage == "1")
                            {
                                string path = "images/map/deviceMapIcon/unactive_image";
                                unActiveImage = "../" + path + "/" + UpLoadImage(file, path);
                            }
                            break;
                        case "normalImageUpload"://正常
                            if (normalImage == "1")
                            {
                                string path = "images/map/deviceMapIcon/normal_image";
                                normalImage = "../" + path + "/" + UpLoadImage(file, path);
                            }
                            break;
                        case "errorImageUpload"://错误
                            if (errorImage == "1")
                            {
                                string path = "images/map/deviceMapIcon/error_image";
                                errorImage = "../" + path + "/" + UpLoadImage(file, path);
                            }
                            break;
                        case "flashImageUpload"://闪光
                            if (flashImage == "1")
                            {
                                string path = "images/map/deviceMapIcon/flash_image";
                                flashImage = "../" + path + "/" + UpLoadImage(file, path);
                            }
                            break;
                        case "popupImageUpload"://弹窗图片
                            if (popupImage == "1")
                            {
                                string path = "images/map/deviceMapIcon/popup_image";
                                popupImage = "../" + path + "/" + UpLoadImage(file, path);
                            }
                            break;
                        default:
                            break;
                    }
                }
                #endregion
                ServDefinedDeviceModel deviceDefinedmodel = new ServDefinedDeviceModel();
                deviceDefinedmodel.id = deviceDefinedID;
                deviceDefinedmodel.defined_device_name = deviceTypeName;
                deviceDefinedmodel.enabled = enabled;
                deviceDefinedmodel.active_image = activeImage;
                deviceDefinedmodel.unactive_image = unActiveImage;
                deviceDefinedmodel.normal_image = normalImage;
                deviceDefinedmodel.error_image = errorImage;
                deviceDefinedmodel.flash_image = flashImage;
                deviceDefinedmodel.popup_image = popupImage;
                deviceDefinedmodel.defined_device_content = definedContent;
                deviceDefinedmodel.base_device_type_id = baseDeviceType;
                deviceDefinedmodel.pid = definedDevicePid;
                deviceDefinedmodel.industry_id = industryTypeID;

                int result = baseMapConfigBLL.UpdateDeviceDefined(deviceDefinedmodel);
                return Json(result, "text/html");
            }
            catch (Exception ex)
            {
                return Json(ex.Message, "text/html");
            }

        }
        /// <summary>
        /// 删除自定义设备类型
        /// </summary>
        /// <param name="deviceDefinedID"></param>
        /// <returns></returns>
        public JsonResult DeleteDeviceDefined(int deviceDefinedID)
        {
            try
            {
                bool result = false;
                result = baseMapConfigBLL.DeleteDeviceDefined(deviceDefinedID);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }

        }
        #endregion

        #region 区域类型配置
        /// <summary>
        /// 获取区域类型
        /// </summary>
        /// <param name="industryID">行业id</param>
        /// <param name="pageIndex">起始页码</param>
        /// <param name="pageSize">每页条数</param>
        /// <returns></returns>
        public JsonResult GetAllAreaType(int industryID, int pageIndex, int pageSize)
        {
            try
            {
                int total = 0;
                List<BaseAreaTypeModel> areaTypeList = baseMapConfigBLL.GetAllAreaType(industryID, pageIndex, pageSize, out total);
                return Json(new { status = 0, msg = new { rows = areaTypeList, total = total } });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }

        }
        /// <summary>
        /// 添加区域类型
        /// </summary>
        /// <param name="areaTypeName">类型名称</param>
        /// <param name="activeImage">激活图标</param>
        /// <param name="unActiveImage">未激活图标</param>
        /// <param name="typeStatus">状态</param>
        /// <param name="definedContent">备注</param>
        /// <returns></returns>
        public JsonResult AddAreaType(string areaTypeName, string activeImage, string unActiveImage, int typeStatus, string content, int industryID)
        {
            try
            {
                bool result = false;
                HttpFileCollectionBase files = Request.Files; //接收文件
                for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFileBase file = files[i];

                    string uploadFileName = files.Keys[i];//当前上传控件的name值
                    switch (uploadFileName)
                    {
                        case "activeImageUpload"://激活
                            if (activeImage == "1")
                            {
                                string path = "images/map/areaMapIcon/active_image";
                                activeImage = "../" + path + "/" + UpLoadImage(file, path);
                            }
                            break;
                        case "unActiveImageUpload"://未激活
                            if (unActiveImage == "1")
                            {
                                string path = "images/map/areaMapIcon/unactive_image";
                                unActiveImage = "../" + path + "/" + UpLoadImage(file, path);
                            }
                            break;
                        default:
                            break;
                    }
                }
                BaseAreaTypeModel areaTypeModel = new BaseAreaTypeModel();
                areaTypeModel.type_name = areaTypeName;
                areaTypeModel.type_status = typeStatus;
                areaTypeModel.active_image = activeImage;
                areaTypeModel.unactive_image = unActiveImage;
                areaTypeModel.content = content;
                areaTypeModel.industry_id = industryID;
                result = baseMapConfigBLL.AddAreaType(areaTypeModel);
                int res = 0;
                if (result)
                {
                    res = 1;
                }
                else
                {
                    res = 0;
                }
                return Json(res, "text/html");
            }
            catch (Exception ex)
            {
                return Json(ex.Message, "text/html");
            }

        }
        /// <summary>
        /// 修改区域类型
        /// </summary>
        /// <param name="areaTypeID"></param>
        /// <param name="areaTypeName"></param>
        /// <param name="activeImage"></param>
        /// <param name="unActiveImage"></param>
        /// <param name="typeStatus"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        public JsonResult UpdateAreaType(int areaTypeID, string areaTypeName, string activeImage, string unActiveImage, int typeStatus, string content)
        {
            try
            {
                bool result = false;
                HttpFileCollectionBase files = Request.Files; //接收文件
                for (int i = 0; i < files.Count; i++)
                {
                    HttpPostedFileBase file = files[i];

                    string uploadFileName = files.Keys[i];//当前上传控件的name值
                    switch (uploadFileName)
                    {
                        case "activeImageUpload"://激活
                            if (activeImage == "1")
                            {
                                string path = "images/map/areaMapIcon/active_image";
                                activeImage = "../" + path + "/" + UpLoadImage(file, path);
                            }
                            break;
                        case "unActiveImageUpload"://未激活
                            if (unActiveImage == "1")
                            {
                                string path = "images/map/areaMapIcon/unactive_image";
                                unActiveImage = "../" + path + "/" + UpLoadImage(file, path);
                            }
                            break;
                        default:
                            break;
                    }
                }
                BaseAreaTypeModel areaTypeModel = new BaseAreaTypeModel();
                areaTypeModel.id = areaTypeID;
                areaTypeModel.type_name = areaTypeName;
                areaTypeModel.type_status = typeStatus;
                areaTypeModel.active_image = activeImage;
                areaTypeModel.unactive_image = unActiveImage;
                areaTypeModel.content = content;
                result = baseMapConfigBLL.UpdateAreaType(areaTypeModel);
                int res = 0;
                if (result)
                {
                    res = 1;
                }
                else
                {
                    res = 0;
                }
                return Json(res, "text/html");
            }
            catch (Exception ex)
            {
                return Json(ex.Message, "text/html");
            }

        }
        /// <summary>
        /// 删除区域类型
        /// </summary>
        /// <param name="areaTypeID"></param>
        /// <returns></returns>
        public JsonResult DeleteAreaType(int areaTypeID, int industryID)
        {
            try
            {
                bool result = false;
                BaseAreaTypeModel model = new BaseAreaTypeModel();
                model.id = areaTypeID;
                model.industry_id = industryID;
                result = baseMapConfigBLL.DeleteAreaType(model);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }

        }
        #endregion


        #region 视频配置
        /// <summary>
        /// 根据园区id获取视频配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public JsonResult GetVideoConfig(int regionId)
        {
            try
            {
                VideoConfigCustom model = baseMapConfigBLL.GetVideoConfigByRegionId(regionId);
                return Json(new { status = 0, msg = model });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 修改视频配置
        /// </summary>
        /// <param name="videoPlatform"></param>
        /// <param name="serverIP"></param>
        /// <param name="userName"></param>
        /// <param name="userPwd"></param>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public JsonResult UpdateVideoConfig(int videoPlatform, string serverIP, string userName, string userPwd, int regionId)
        {
            try
            {
                bool result = false;
                VideoConfigCustom videoConfig = new VideoConfigCustom();
                videoConfig.videoPlatform = videoPlatform;
                videoConfig.serverIP = serverIP;
                videoConfig.userName = userName;
                videoConfig.userPwd = userPwd;
                videoConfig.regionId = regionId;
                result = baseMapConfigBLL.UpdateVideoConfig(videoConfig);
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }
        /// <summary>
        /// 修改默认视频配置
        /// </summary>
        /// <param name="videoPlatformID"></param>
        /// <returns></returns>
        public JsonResult submitVideoPlatform(int videoPlatformID)
        {
            try
            {
                bool result = baseMapConfigBLL.UpdateVideoPlatformDefault(videoPlatformID, Server.MapPath("/ConfigFile/video/videoConfig.xml"));
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }
        #endregion



        #region  事件配置
        /// <summary>
        /// 获取父级事件
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public JsonResult GetRootEventList(int pageIndex, int pageSize)
        {
            try
            {
                int totalNumber = 0;
                //  List<BaseEventTypeModel> eventList = baseEventTypeBLL.GetEventPages(pageIndex, pageSize,out totalNumber);
                List<BaseEventAndVideoTime> eventList = baseEventTypeBLL.GetRootEventAndVideoTimePages(pageIndex, pageSize, out totalNumber);
                EasyUIDataGruidModel<List<BaseEventAndVideoTime>> retList = new EasyUIDataGruidModel<List<BaseEventAndVideoTime>>();
                retList.total = totalNumber;
                retList.rows = eventList;
                return Json(retList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "根级事件列表查询失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 获取子级事件
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult GetChildEventList(int pid)
        {
            try
            {
                List<BaseEventTypeModel> list = baseEventTypeBLL.GetChildEventType(pid);
                return Json(list, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "查询子级事件列表失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 根据PID删除事件
        /// </summary>
        /// <param name="pid"></param>
        /// <returns></returns>
        public JsonResult DeleteEventListByPid(int pid)
        {
            try
            {
                EventRet ret = baseEventTypeBLL.DeleteEventByPid(pid);
                return Json(new { state = ret.state, message = ret.message }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "删除事件失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 根据id删除事件
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult DeleteEventById(int id)
        {
            try
            {
                int res = baseEventTypeBLL.DeleteEventById(id);
                if (res > 0)
                {
                    return Json(new { state = 0, message = "删除事件成功！" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { state = 1, message = "删除事件失败！" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "删除事件失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 新增子级事件
        /// </summary>
        /// <param name="pid"></param>
        /// <param name="eventName"></param>
        /// <param name="eventCode"></param>
        /// <param name="eventContent"></param>
        /// <returns></returns>
        public JsonResult AddChildEvent(int pid, string eventName, string eventCode, string eventContent)
        {
            try
            {
                EventRet ret = baseEventTypeBLL.AddChildEvent(pid, eventName, eventCode, eventContent);
                return Json(new { state = ret.state, message = ret.message }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "新增事件失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 新增父级事件
        /// </summary>
        /// <param name="eventName"></param>
        /// <param name="eventContent"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <returns></returns>
        public JsonResult AddRootEvent(string eventName, string eventContent, int startTime, int endTime)
        {
            try
            {
                EventRet ret = baseEventTypeBLL.AddRootEvent(eventName, eventContent, startTime, endTime);
                return Json(new { state = ret.state, message = ret.message }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "新增事件失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 修改子级事件
        /// </summary>
        /// <returns></returns>
        public JsonResult UpdateChildEvent(int pid, int id, string eventName, string eventCode, string eventContent)
        {
            try
            {
                EventRet ret = baseEventTypeBLL.UpdateChildEvent(pid, id, eventName, eventCode, eventContent);
                return Json(new { state = ret.state, message = ret.message }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "修改子级事件失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 修改父级事件
        /// </summary>
        /// <param name="eventName"></param>
        /// <param name="eventContent"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult UpdateRootEvent(string eventName, string eventContent, int startTime, int endTime, int id)
        {
            try
            {
                EventRet ret = baseEventTypeBLL.UpdateRootEvent(eventName, eventContent, startTime, endTime, id);
                return Json(new { state = ret.state, message = ret.message }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "修改事件失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 删除父级事件
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult DeleteRootEvent(int id)
        {
            try
            {
                EventRet ret = baseEventTypeBLL.DeleteRootEvent(id);
                return Json(new { state = ret.state, message = ret.message }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "删除父级事件失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion


        #region  LED配置
        /// <summary>
        /// 发送LED信息
        /// </summary>
        /// <param name="regionCode"></param>
        /// <param name="location"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        public JsonResult SendLEDMessage(string regionCode, int location, string content)
        {
            try
            {
                LEDBLL bll = new LEDBLL();
                RetMsgModel retModel = bll.SendLEDMessage(regionCode, location, content);
                return Json(new { status = retModel.status, msg = retModel.message });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "LED信息发送失败！" + ex.Message });
            }
        }
        #endregion


        #region 报警灯配置
        /// <summary>
        /// 分页获取园区
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public JsonResult GetRegionPages(int pageIndex, int pageSize)
        {
            try
            {
                RelayBLL bll = new RelayBLL();
                int totalNumber = 0;
                List<BaseRegionConfigModel> list = bll.GetBaseRegionPages(pageIndex, pageSize, out totalNumber);
                EasyUIDataGruidModel<List<BaseRegionConfigModel>> retList = new EasyUIDataGruidModel<List<BaseRegionConfigModel>>();
                retList.total = totalNumber;
                retList.rows = list;
                return Json(new { status = 0, msg = retList });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "获取园区失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 根据园区ID获取报警灯配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public JsonResult GetAlarmLampByRegionId(int regionId)
        {
            try
            {
                RelayBLL bll = new RelayBLL();
                List<BaseRelayConfigModel> list = bll.GetAlarmLampByRegion(regionId);
                return Json(new { status = 0, msg = list });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "获取报警灯失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 根据园区ID删除报警灯配置
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult DeleteAlarmLampByRegionId(int regionId)
        {
            try
            {
                RelayBLL bll = new RelayBLL();
                bool bl = bll.DeleteBaseRelayConfigByRegionId(regionId);
                return bl == true ? Json(new { status = 0, msg = "删除报警灯成功！" }) : Json(new { status = 1, msg = "删除报警灯失败！" });
                //  return Json(new { status = 0, msg = "删除报警灯成功！" });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "删除报警灯失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 根据报警灯ID删除报警灯配置
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult DeleteAlarmLampById(int id)
        {
            try
            {
                RelayBLL bll = new RelayBLL();
                bool bl = bll.DeleteRelayById(id);
                return bl == true ? Json(new { status = 0, msg = "删除报警灯成功！" }) : Json(new { status = 1, msg = "删除报警灯失败！" });
                // return Json(new { status = 0, msg = "删除报警灯成功！" });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "删除报警灯失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 新增报警灯
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="controlId"></param>
        /// <param name="color"></param>
        /// <returns></returns>
        public JsonResult AddAlarmLamp(int regionId, int controlId, string color)
        {
            try
            {
                RelayBLL bll = new RelayBLL();
                bool bl = bll.AddRelayConfig(color, (int)EnumClass.RelayType.四色灯, controlId, regionId);
                return bl == true ? Json(new { status = 0, msg = "新增报警灯成功！" }) : Json(new { status = 1, msg = "新增报警灯失败！" });
                //return Json(new { status = 0, msg = "新增报警灯成功！" });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "新增报警灯失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 修改报警灯
        /// </summary>
        /// <param name="id"></param>
        /// <param name="regionId"></param>
        /// <param name="controlId"></param>
        /// <param name="color"></param>
        /// <returns></returns>
        public JsonResult UpdateAlarmLamp(int id, int regionId, int controlId, string color)
        {
            try
            {
                RelayBLL bll = new RelayBLL();
                bool bl = bll.UpdateBaseRelayConfigById(id, color, (int)EnumClass.RelayType.四色灯, controlId, regionId);
                return bl == true ? Json(new { status = 0, msg = "修改报警灯成功！" }) : Json(new { status = 1, msg = "修改报警灯失败！" });
                // return Json(new { status = 0, msg = "修改报警灯成功！" });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "修改报警灯失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 报警灯信息发送
        /// </summary>
        /// <param name="regionCode"></param>
        /// <param name="controlId"></param>
        /// <param name="op"></param>
        /// <returns></returns>
        public JsonResult SendRelayMessage(string regionCode, int controlId, int op)
        {
            try
            {
                RelayBLL bll = new RelayBLL();
                RetMsgModel retModel = bll.SendRelayMessage(regionCode, controlId, op);
                return Json(new { status = retModel.status, msg = retModel.message });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "报警灯信息发送失败！" + ex.Message });
            }
        }
        #endregion


        #region  大屏配置
        /// <summary>
        /// 初始化加载大屏配置页面
        /// </summary>
        /// <returns></returns>
        public JsonResult GalleryInit()
        {
            try
            {
                LargeScreenBLL screenBll = new LargeScreenBLL();
                LargeScreenCustom custom = screenBll.GetInitLargeScreenConfig();
                return Json(new { status = 0, msg = custom });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "初始化获取大屏配置失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 根据园区ID加载大屏配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public JsonResult GetGalleryByRegionId(int regionId)
        {
            try
            {
                LargeScreenBLL screenBll = new LargeScreenBLL();
                LargeScreenCustom custom = screenBll.GetLargeScreenConfig(regionId);
                return Json(new { status = 0, msg = custom });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "初始化获取大屏配置失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 更新大屏配置
        /// </summary>
        /// <param name="configId"></param>
        /// <param name="column"></param>
        /// <param name="row"></param>
        /// <param name="width"></param>
        /// <param name="height"></param>
        /// <param name="code"></param>
        /// <param name="galleryCode"></param>
        /// <param name="galleryName"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public JsonResult UpdateGalleryConfig(int configId, int regionId, int column, int row, int width, int height, string code, string galleryCode, string galleryName, string type)
        {
            try
            {
                LargeScreenBLL screenBll = new LargeScreenBLL();
                bool bl = screenBll.UpdateGalleryConfig(configId, regionId, column, row, width, height, code, galleryCode, galleryName, type);
                return bl == true ? Json(new { status = 0, msg = "修改大屏配置成功！" }) : Json(new { status = 1, msg = "修改大屏配置失败！" });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "修改大屏配置失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 新增大屏配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="column"></param>
        /// <param name="row"></param>
        /// <param name="width"></param>
        /// <param name="height"></param>
        /// <param name="code"></param>
        /// <param name="galleryCode"></param>
        /// <param name="galleryName"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public JsonResult AddGalleryConfig(int regionId, int column, int row, int width, int height, string code, string galleryCode, string galleryName, string type)
        {
            try
            {
                LargeScreenBLL screenBll = new LargeScreenBLL();
                int res = screenBll.AddGalleryConfig(regionId, column, row, width, height, code, galleryCode, galleryName, type);
                return res > 0 ? Json(new { status = res, msg = "新增大屏配置成功！" }) : Json(new { status = -1, msg = "新增大屏配置失败！" });
            }
            catch (Exception ex)
            {
                return Json(new { status = -1, msg = "新增大屏配置失败！" + ex.Message });
            }
        }
        #endregion

        #region  全部关闭（LED，报警灯）
        //public JsonResult CloseLEDAndRelay(string regionCode, int location, string content, int controlId, int op)
        //{

        //}

        #endregion
        #region  websocket配置
        /// <summary>
        /// 获取websocket配置信息
        /// </summary>
        /// <returns></returns>
        public JsonResult GetWebsocketInfo()
        {
            try
            {
                WebSocketConfigBLL bll = new WebSocketConfigBLL();
                WebSocketConfigCustom model = bll.GetWebSocketInfo();
                return Json(new { status = 0, msg = model });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "获取websocket信息失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 修改websocket状态信息
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        public JsonResult ChangeWebsocketStatus(int status)
        {
            try
            {
                WebSocketConfigBLL bll = new WebSocketConfigBLL();
                bool bl = bll.UpdateWebsocketStatus(status);
                if (bl == true)
                {
                    return Json(new { status = 0, msg = "修改websocket状态成功！" });
                }
                else
                {
                    return Json(new { status = 1, msg = "修改websocket状态失败！" });
                }

            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "修改websocket状态失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 修改websocket服务地址
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        public JsonResult ChangeWebsocketServer(string address)
        {
            try
            {
                WebSocketConfigBLL bll = new WebSocketConfigBLL();
                bool bl = bll.UpdateWebsocketServer(address);
                if (bl == true)
                {
                    return Json(new { status = 0, msg = "修改websocket地址成功！" });
                }
                else
                {
                    return Json(new { status = 1, msg = "修改websocket地址失败！" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "修改websocket地址失败！" + ex.Message });
            }
        }
        #endregion

        #region  转发层配置
        /// <summary>
        /// 获取转发层地址
        /// </summary>
        /// <returns></returns>
        public JsonResult GetInterfaceAddress()
        {
            try
            {
                InterfaceAddressBLL bll = new InterfaceAddressBLL();
                string address = bll.GetInterfaceAddress();
                return Json(new { status = 0, msg = address });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "获取转发层地址失败！" + ex.Message });
            }

        }
        /// <summary>
        /// 修改转发层地址
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        public JsonResult UpdateInterfaceAddress(string address)
        {
            try
            {
                InterfaceAddressBLL bll = new InterfaceAddressBLL();
                bool bl = bll.UpdateInterfaceAddress(address);
                return bl == true ? Json(new { status = 0, msg = "修改转发层地址成功！" }) : Json(new { status = 1, msg = "修改转发层地址失败！" });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "修改转发层地址失败！" + ex.Message });
            }


        }
        #endregion

        #region  应急电话配置
        /// <summary>
        /// 母版页获取应急电话
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public JsonResult GetPhoneTreeByRegionIdInHome(int regionId)
        {
            try
            {
                EmergencyPhoneBLL bll = new EmergencyPhoneBLL();
                int config = -1;
                List<EmergencyPhoneCustom> treeList = bll.GetEmergencyConfig(regionId, out config);
                return Json(new { status = 0, msg = treeList });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "获取应急电话配置失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 根据园区获取应急电话配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="regionName"></param>
        /// <returns></returns>
        public JsonResult GetPhoneTreeByRegionId(int regionId, string regionName)
        {
            try
            {
                EmergencyPhoneBLL bll = new EmergencyPhoneBLL();
                List<EmergencyPhoneTree> treeList = bll.GetPhoneByRegionId(regionId, regionName);
                return Json(new { status = 0, msg = treeList });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "获取应急电话配置失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 新增电话组
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="groupName"></param>
        /// <returns></returns>
        public JsonResult AddGroupByRegionId(int regionId, string groupName)
        {
            try
            {
                EmergencyPhoneBLL bll = new EmergencyPhoneBLL();
                EventRet ret = bll.AddGroupNameByRegionId(regionId, groupName);
                return Json(new { status = ret.state, msg = ret.message });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "新增应急电话组失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 修改电话组
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="oldGroupName"></param>
        /// <param name="newGroupName"></param>
        /// <returns></returns>
        public JsonResult UpdateGroupByRegionId(int regionId, string oldGroupName, string newGroupName)
        {
            try
            {
                EmergencyPhoneBLL bll = new EmergencyPhoneBLL();
                EventRet ret = bll.UpdateGroupNameByRegionId(regionId, oldGroupName, newGroupName);
                return Json(new { status = ret.state, msg = ret.message });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "修改应急电话组失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 删除电话组
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="groupName"></param>
        /// <returns></returns>
        public JsonResult DeleteGroupByRegionId(int regionId, string groupName)
        {
            try
            {
                EmergencyPhoneBLL bll = new EmergencyPhoneBLL();
                EventRet ret = bll.DeleteGroupByRegionId(regionId, groupName);
                return Json(new { status = ret.state, msg = ret.message });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "删除应急电话组失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 新增电话
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="groupName"></param>
        /// <param name="telePhoneName"></param>
        /// <param name="telePhoneNum"></param>
        /// <returns></returns>
        public JsonResult AddTelePhoneByGroupName(int regionId, string groupName, string telePhoneName, string telePhoneNum)
        {
            try
            {
                EmergencyPhoneBLL bll = new EmergencyPhoneBLL();
                EventRet ret = bll.AddTelePhoneByGroupName(regionId, groupName, telePhoneName, telePhoneNum);
                return Json(new { status = ret.state, msg = ret.message });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "新增电话名称失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 修改电话
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="groupName"></param>
        /// <param name="oldTelephoneName"></param>
        /// <param name="newTelephoneName"></param>
        /// <param name="newTelephoneNum"></param>
        /// <returns></returns>
        public JsonResult UpdateTelePhoneByGroupName(int regionId, string groupName, string oldTelephoneName, string newTelephoneName, string newTelephoneNum)
        {
            try
            {
                EmergencyPhoneBLL bll = new EmergencyPhoneBLL();
                EventRet ret = bll.UpdateTelePhoneByGroupName(regionId, groupName, oldTelephoneName, newTelephoneName, newTelephoneNum);
                return Json(new { status = ret.state, msg = ret.message });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "修改电话名称失败！" + ex.Message });
            }
        }
        /// <summary>
        /// 删除电话
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="groupName"></param>
        /// <param name="telePhoneName"></param>
        /// <returns></returns>
        public JsonResult DeleteTelephoneByGroupName(int regionId, string groupName, string telePhoneName)
        {
            try
            {
                EmergencyPhoneBLL bll = new EmergencyPhoneBLL();
                EventRet ret = bll.DeleteTelephoneByGroupName(regionId, groupName, telePhoneName);
                return Json(new { status = ret.state, msg = ret.message });
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改应急电话配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="info"></param>
        /// <returns></returns>
        public JsonResult UpdatePhoneTree(int regionId, string info)
        {
            try
            {
                EmergencyPhoneBLL bll = new EmergencyPhoneBLL();
                return Json(new { status = 0, msg = "" });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "修改应急电话配置失败！" + ex.Message });
            }
        }
        #endregion

    }
}



