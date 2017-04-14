using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CSM.Model.CustomModel;
using CSM.BLL;
using CSM.Model;
using CSM.Model.QueryModel;
using static CSM.Common.EnumClass;
using CSM.Common;
using System.IO;

namespace CSM.Controllers
{
    public class RegisterController : BaseController
    {
        private MapRegisterBLL mapRegisterBLL = new MapRegisterBLL();
        private BaseMapConfigBLL baseMapConfigBLL = new BaseMapConfigBLL();
        ServAreaInfoBLL servAreaInfoBLL = new ServAreaInfoBLL();
        ServDeviceInfoBLL servDeviceInfoBLL = new ServDeviceInfoBLL();
        // GET: Register
        public ActionResult Index()
        {
            return View();
        }
        #region 设备注册
        /// <summary>
        /// 获取未注册设备列表2d
        /// </summary>
        /// <returns></returns>
        public JsonResult Get2DNotRegisterDevice()
        {
            try
            {
                List<TempDeviceCustom> list = mapRegisterBLL.GetUnRegisterDevice();
                return Json(list);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }
        /// <summary>
        /// 获取25D设备注册设备树
        /// </summary>
        /// <param name="industryId">行业id</param>
        /// <param name="map2DConfigId">2D地图配置id</param>
        /// <returns></returns>
        public JsonResult Get2dDeviceToRegister25dDevice(int industryId, int regionID)
        {
            try
            {
                List<DeviceInfoCustom> ToRegister25dDeviceTree = servDeviceInfoBLL.GetDeviceInfoAndIconUrlToRegister25d(regionID, industryId);
                return Json(ToRegister25dDeviceTree);

            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }
        /// <summary>
        /// 设备注册2D
        /// </summary>
        /// <param name="device_name">设备名称</param>
        /// <param name="device_code">设备编码</param>
        /// <param name="device_type">设备类型</param>
        /// <param name="subsystem_id">子系统</param>
        /// <param name="device_status">设备状态</param>
        /// <param name="cover_range">覆盖角度</param>
        /// <param name="camera_towards">设备朝向</param>
        /// <param name="visual_range">覆盖角度</param>
        /// <param name="is_inbuilding">是否楼内</param>
        /// <param name="lonLat">坐标</param>
        /// <param name="isParts">是否复合设备</param>
        /// <param name="regionID">园区id</param>
        /// <param name="jishihuifang">及时回放</param>
        /// <param name="duolubofang">多路播放</param>
        /// <param name="shangdaqiang">上大墙</param>
        /// <param name="lishihuifang">历史回放</param>
        /// <param name="deviceTempID">设备临时表id</param>
        /// <param name="industryId">行业id</param>
        /// <returns></returns>
        public JsonResult AddDevice2D(string device_name, string device_code, int device_type, int subsystem_id, int device_status, int cover_range, int camera_towards, int visual_range, int is_inbuilding, string lonLat, int isParts, int regionID, string jishihuifang, string duolubofang, string shangdaqiang, string lishihuifang, int deviceTempID, int industryId)
        {
            try
            {
                ServDeviceInfoQuery deviceInfo = new ServDeviceInfoQuery();
                if (device_code != "")
                {
                    //验证设备code是否已经存在
                    ServDeviceInfoModel deviceInfoModel = mapRegisterBLL.GetDeviceInfoByDeviceCode(device_code);
                    if (deviceInfoModel != null)
                    {
                        return Json(new { state = 2, message = "该设备code已存在" });
                    }
                    deviceInfo.device_code = device_code;
                }
                else
                {
                    deviceInfo.device_code = device_code;
                }
                deviceInfo.is_parts = isParts;
                deviceInfo.device_name = device_name;
                deviceInfo.device_type = device_type;
                deviceInfo.subsystem_id = subsystem_id;
                deviceInfo.longitude = lonLat.Split(',')[1];
                deviceInfo.latitude = lonLat.Split(',')[0];
                deviceInfo.register_time = DateTime.Now.ToString();
                deviceInfo.search_code = "";
                deviceInfo.local_longitude = null;
                deviceInfo.local_latitude = null;
                deviceInfo.device_status = device_status;
                deviceInfo.update_status_time = "";
                deviceInfo.cover_range = cover_range;
                deviceInfo.camera_towards = camera_towards;
                deviceInfo.visual_range = visual_range;
                deviceInfo.asset_code = "";
                deviceInfo.org_id = 0;
                deviceInfo.manufactor = "";
                deviceInfo.asset_model = "";
                deviceInfo.create_time = "";
                deviceInfo.guarantee_time = "";
                deviceInfo.asset_status = 0;
                deviceInfo.asset_ip = "";
                deviceInfo.port = "";
                deviceInfo.mac_code = "";
                deviceInfo.serial_number = "";
                deviceInfo.manager_id = 0;
                deviceInfo.is_inbuilding = is_inbuilding;
                deviceInfo.room_id = 0;
                deviceInfo.region_id = regionID;
                deviceInfo.area_id = 0;
                deviceInfo.ext1 = jishihuifang;
                deviceInfo.ext2 = duolubofang;
                deviceInfo.ext3 = shangdaqiang;
                deviceInfo.ext4 = lishihuifang;
                //根据设备类型查询设备图标地址
                ServDefinedDeviceModel definedDevice = mapRegisterBLL.GetDeviceIcon(industryId, device_type);
                string path = definedDevice == null ? "" : definedDevice.normal_image;
                ServDeviceInfoModel model = mapRegisterBLL.AddDevice2D(deviceInfo, deviceTempID);
                return Json(new { id = model.id, device_code = model.device_code, iconPath = path });
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }
        /// <summary>
        /// 设备修改
        /// </summary>
        /// <param name="deviceID">设备id</param>
        /// <param name="device_name">设备名称</param>
        /// <param name="device_code">设备编码</param>
        /// <param name="device_type">设备类型</param>
        /// <param name="subsystem_id">子系统</param>
        /// <param name="device_status">设备状态</param>
        /// <param name="cover_range">覆盖角度</param>
        /// <param name="camera_towards">设备朝向</param>
        /// <param name="visual_range">覆盖角度</param>
        /// <param name="is_inbuilding">是否楼内</param>
        /// <param name="lonLat">2D坐标</param>
        /// <param name="lonLat25D">25D坐标</param>
        /// <param name="isParts">是否复合设备</param>
        /// <param name="regionID">园区id</param>
        /// <param name="jishihuifang">及时回放</param>
        /// <param name="duolubofang">多路播放</param>
        /// <param name="shangdaqiang">上大墙</param>
        /// <param name="lishihuifang">历史回放</param>
        /// <param name="deviceTempID">设备临时表id</param>
        /// <param name="industryId">行业id</param>
        /// <returns></returns>
        public JsonResult UpdateDevice2D(int deviceID, string device_name, string device_code, int device_type, int subsystem_id, int device_status, int cover_range, int camera_towards, int visual_range, int is_inbuilding, string lonLat, string lonLat25D, int isParts, int regionID, string jishihuifang, string duolubofang, string shangdaqiang, string lishihuifang, int industryId)
        {
            try
            {
                ServDeviceInfoQuery deviceInfo = new ServDeviceInfoQuery();
                deviceInfo.id = deviceID;
                deviceInfo.device_code = device_code;
                deviceInfo.is_parts = isParts;
                deviceInfo.device_name = device_name;
                deviceInfo.device_type = device_type;
                deviceInfo.subsystem_id = subsystem_id;
                deviceInfo.longitude = lonLat.Split(',')[1];
                deviceInfo.latitude = lonLat.Split(',')[0];
                deviceInfo.local_longitude = lonLat25D.Split(',')[1];
                deviceInfo.local_latitude = lonLat25D.Split(',')[0];
                if (deviceInfo.local_latitude == "" || deviceInfo.local_longitude == "" || deviceInfo.local_latitude == "null" || deviceInfo.local_longitude == "null" || deviceInfo.local_latitude == "undefined" || deviceInfo.local_longitude == "undefined")
                {
                    deviceInfo.local_latitude = null;
                    deviceInfo.local_longitude = null;
                }
                deviceInfo.search_code = "";
                deviceInfo.device_status = device_status;
                deviceInfo.update_status_time = "";
                deviceInfo.cover_range = cover_range;
                deviceInfo.camera_towards = camera_towards;
                deviceInfo.visual_range = visual_range;
                deviceInfo.asset_code = "";
                deviceInfo.org_id = 0;
                deviceInfo.manufactor = "";
                deviceInfo.asset_model = "";
                deviceInfo.create_time = "";
                deviceInfo.guarantee_time = "";
                deviceInfo.asset_status = 0;
                deviceInfo.asset_ip = "";
                deviceInfo.port = "";
                deviceInfo.mac_code = "";
                deviceInfo.serial_number = "";
                deviceInfo.manager_id = 0;
                deviceInfo.is_inbuilding = is_inbuilding;
                deviceInfo.room_id = 0;
                deviceInfo.region_id = regionID;
                deviceInfo.area_id = 0;
                deviceInfo.ext1 = jishihuifang;
                deviceInfo.ext2 = duolubofang;
                deviceInfo.ext3 = shangdaqiang;
                deviceInfo.ext4 = lishihuifang;
                //根据设备类型查询设备图标地址
                ServDefinedDeviceModel definedDevice = mapRegisterBLL.GetDeviceIcon(industryId, device_type);
                string path = definedDevice == null ? "" : definedDevice.normal_image;
                bool result = mapRegisterBLL.UpdateDeviceInfo2D(deviceInfo);
                return Json(new { result = result, iconPath = path });
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }
        /// <summary>
        /// 注册2.5D的设备
        /// </summary>
        /// <param name="id">id</param>
        /// <param name="local_longitude">25D坐标</param>
        /// <param name="local_latitude">25D坐标</param>
        /// <returns></returns>
        public JsonResult registerDevice25D(int id, string local_longitude, string local_latitude)
        {
            try
            {
                ServDeviceInfoModel model = new ServDeviceInfoModel();
                model.id = id;
                model.local_longitude = local_longitude;
                model.local_latitude = local_latitude;
                bool result = mapRegisterBLL.registerDevice25D(model);
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }
        /// <summary>
        /// 删除设备
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public JsonResult DeleteDeviceByCode(string code)
        {
            try
            {
                bool result = mapRegisterBLL.DeleteDeviceByCode(code);
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }
        /// <summary>
        /// 更新视频宇视平台的设备
        /// </summary>
        /// <param name="strXml"></param>
        /// <returns></returns>
        public JsonResult UpdateUnRegisterDevice(string strXml,string serverIP,int regionId)
        {
            try
            {
                int total = 0;
                strXml = strXml.Replace("&lt;", "<");
                // Mxml = Mxml.Replace("</ResList>", "");
                strXml = strXml.Replace("&ld;", "=");
                mapRegisterBLL.UpdateUnRegisterDevice(strXml, serverIP,regionId, out total);
                return Json(new { status = 0, msg = total });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        #endregion

        #region 区域注册
        public JsonResult GetAreaInfo(int regionID)
        {
            try
            {
                //BaseMapConfigModel mapConfi2D = baseMapConfigBLL.GetNowMapConfig(Server.MapPath("/ConfigFile/map/mapConfig.xml"), (int)MapType.二维);
                //默认行业
                BaseIndustryModel baseIndustryModel = baseMapConfigBLL.GetDefaultIndustry(Server.MapPath("../ConfigFile/map/mapConfig.xml"));
                List<AreaInfoCustom> areaList = servAreaInfoBLL.GetAreaInfoAndBuilding(regionID, baseIndustryModel.id);
                return Json(areaList);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }
        /// <summary>
        /// 获取区域树结构
        /// </summary>
        /// <param name="region_id">园区id</param>
        /// <returns></returns>
        public JsonResult GetAreaTree(int region_id)
        {
            try
            {
                List<AreaInfoTreeCustom> areaTreeList = mapRegisterBLL.GetAreaInfoTree(region_id, Server.MapPath("../ConfigFile/map/mapConfig.xml"));
                return Json(areaTreeList);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }
        /// <summary>
        /// 注册区域
        /// </summary>
        /// <param name="area_name">区域名称</param>
        /// <param name="area_location">区域坐标</param>
        /// <param name="area_level">区域级别</param>
        /// <param name="area_type">区域类型</param>
        /// <param name="person_id">人员id</param>
        /// <param name="map_type">地图类型</param>
        /// <param name="is_show">是否显示</param>
        /// <param name="content">备注</param>
        /// <param name="grid_id">网格id</param>
        /// <param name="region_id">园区id</param>
        /// <param name="area_image">弹出框图片</param>
        /// <param name="area_type_id">楼宇类型id</param>
        /// <param name="building_name">楼宇名称</param>
        /// <param name="alias">楼宇别名</param>
        /// <param name="manager_id">负责人</param>
        /// <param name="create_time">建筑年代</param>
        /// <param name="building_type">结构类型</param>
        /// <param name="above_ground_area">地上面积</param>
        /// <param name="under_ground_area">地下面积</param>
        /// <param name="floor_num">楼层数</param>
        /// <returns></returns>
        public string AddArea(string area_name, string area_location, int area_level, int area_type, int person_id, int map_type, bool is_show, string content, int grid_id, int region_id, string area_image, int area_type_id, string building_name, string alias, int manager_id, string create_time, string building_type, string above_ground_area, string under_ground_area, int floor_num)
        {
            try
            {
                area_image = area_image.Split('/')[area_image.Split('/').Length - 1];
                //判断是否上传图片
                if (area_image != "")
                {
                    HttpFileCollectionBase files = Request.Files; //接收文件
                                                                  //转化成字节数组
                    if (files.Count > 0)
                    {
                        byte[] filecontent = new byte[files[0].ContentLength];
                        files[0].InputStream.Read(filecontent, 0, filecontent.Length);
                        //检查文件是否存在 不存在则创建
                        string localPath = System.IO.Path.Combine(HttpRuntime.AppDomainAppPath, "images/map/areaMapIcon/popup_image");
                        FileHelper.CheckDirectory(localPath);
                        //截取字符串 获取图片名称
                        string[] FilePath = files[0].FileName.Split('\\');
                        //生成图片名称
                        string ImageName = FilePath[FilePath.Length - 1];
                        string newFilePath = Path.Combine(localPath, ImageName);
                        ////创建文件名 ，如果有重复的 加上副本
                        //newFilePath = FileHelper.CreateFileName(newFilePath);
                        //如果不存在这个文件再保存
                        if (System.IO.File.Exists(newFilePath) == false)
                        {
                            FileHelper.Save(newFilePath, filecontent);
                        }
                        //FileHelper.Save(newFilePath, content);
                        area_image = ImageName;
                    }


                }
                bool result = false;
                ServAreaInfoModel servAreaInfoModel = new ServAreaInfoModel();
                servAreaInfoModel.area_name = area_name;
                servAreaInfoModel.area_location = area_location;
                servAreaInfoModel.area_level = area_level;
                servAreaInfoModel.area_type = area_type;
                servAreaInfoModel.person_id = person_id;
                servAreaInfoModel.map_type = map_type;
                servAreaInfoModel.is_show = is_show;
                servAreaInfoModel.content = content;
                servAreaInfoModel.grid_id = grid_id;
                servAreaInfoModel.region_id = region_id;
                servAreaInfoModel.area_image = area_image;
                ServBuildingInfoModel servBuildingInfoModel = new ServBuildingInfoModel();
                servBuildingInfoModel.building_name = building_name;
                servBuildingInfoModel.alias = alias;
                servBuildingInfoModel.manager_id = manager_id;
                servBuildingInfoModel.create_time = create_time;
                servBuildingInfoModel.building_type = building_type;
                servBuildingInfoModel.above_ground_area = above_ground_area;
                servBuildingInfoModel.under_ground_area = under_ground_area;
                servBuildingInfoModel.floor_num = floor_num;
                ServBuildingAreaTypeModel servBuildingAreaTypeModel = new ServBuildingAreaTypeModel();
                servBuildingAreaTypeModel.area_type_id = area_type_id;
                result = mapRegisterBLL.AddArea(servAreaInfoModel, servBuildingInfoModel, servBuildingAreaTypeModel);
                if (result == true)
                {
                    return "0|" + "添加成功";
                }
                else
                {
                    return "1|" + "添加失败";
                }

            }
            catch (Exception ex)
            {
                return "1|" + ex.Message;
            }

        }
        /// <summary>
        /// 修改区域
        /// </summary>
        /// <param name="area_id">区域id</param>
        /// <param name="area_name">区域名称</param>
        /// <param name="area_location">区域坐标</param>
        /// <param name="area_level">区域级别</param>
        /// <param name="area_type">区域类型</param>
        /// <param name="person_id">人员编号</param>
        /// <param name="map_type">地图类型</param>
        /// <param name="is_show">是否显示</param>
        /// <param name="content">备注</param>
        /// <param name="grid_id">网格id</param>
        /// <param name="region_id">园区id</param>
        /// <param name="area_image">弹出框图片</param>
        /// <param name="area_type_id">楼宇类型id</param>
        /// <param name="building_name">楼宇名称</param>
        /// <param name="alias">楼宇别名</param>
        /// <param name="manager_id">负责人</param>
        /// <param name="create_time">建筑年代</param>
        /// <param name="building_type">类型结构</param>
        /// <param name="above_ground_area">地上面积</param>
        /// <param name="under_ground_area">地下面积</param>
        /// <param name="floor_num">楼层数</param>
        /// <returns></returns>
        public string UpdateArea(int area_id, string area_name, string area_location, string area_25D_location, int area_level, int area_type, int person_id, int map_type, bool is_show, string content, int grid_id, int region_id, string area_image, int area_type_id, string building_name, string alias, int manager_id, string create_time, string building_type, string above_ground_area, string under_ground_area, int floor_num)
        {
            try
            {
                area_image = area_image.Split('/')[area_image.Split('/').Length - 1];
                //判断是否上传图片
                if (area_image != "")
                {
                    HttpFileCollectionBase files = Request.Files; //接收文件
                                                                  //转化成字节数组
                    if (files.Count > 0)
                    {
                        byte[] filecontent = new byte[files[0].ContentLength];
                        files[0].InputStream.Read(filecontent, 0, filecontent.Length);
                        //检查文件是否存在 不存在则创建
                        string localPath = System.IO.Path.Combine(HttpRuntime.AppDomainAppPath, "images/map/areaMapIcon/popup_image");
                        FileHelper.CheckDirectory(localPath);
                        //截取字符串 获取图片名称
                        string[] FilePath = files[0].FileName.Split('\\');
                        //生成图片名称
                        string ImageName = FilePath[FilePath.Length - 1];
                        string newFilePath = Path.Combine(localPath, ImageName);
                        ////创建文件名 ，如果有重复的 加上副本
                        //newFilePath = FileHelper.CreateFileName(newFilePath);
                        //如果不存在这个文件再保存
                        if (System.IO.File.Exists(newFilePath) == false)
                        {
                            FileHelper.Save(newFilePath, filecontent);
                        }
                        //FileHelper.Save(newFilePath, content);
                        area_image = ImageName;
                    }


                }
                bool result = false;
                ServAreaInfoModel servAreaInfoModel = new ServAreaInfoModel();
                servAreaInfoModel.id = area_id;
                servAreaInfoModel.area_name = area_name;
                servAreaInfoModel.area_location = area_location;
                servAreaInfoModel.area_25D_location = area_25D_location;
                servAreaInfoModel.area_level = area_level;
                servAreaInfoModel.area_type = area_type;
                servAreaInfoModel.person_id = person_id;
                servAreaInfoModel.map_type = map_type;
                servAreaInfoModel.is_show = is_show;
                servAreaInfoModel.content = content;
                servAreaInfoModel.grid_id = grid_id;
                servAreaInfoModel.region_id = region_id;
                servAreaInfoModel.area_image = area_image;
                ServBuildingInfoModel servBuildingInfoModel = new ServBuildingInfoModel();
                //servBuildingInfoModel.id = building_id;
                servBuildingInfoModel.building_name = building_name;
                servBuildingInfoModel.alias = alias;
                servBuildingInfoModel.manager_id = manager_id;
                servBuildingInfoModel.create_time = create_time;
                servBuildingInfoModel.building_type = building_type;
                servBuildingInfoModel.above_ground_area = above_ground_area;
                servBuildingInfoModel.under_ground_area = under_ground_area;
                servBuildingInfoModel.floor_num = floor_num;
                servBuildingInfoModel.area_id = area_id;
                ServBuildingAreaTypeModel servBuildingAreaTypeModel = new ServBuildingAreaTypeModel();
                servBuildingAreaTypeModel.area_type_id = area_type_id;
                //servBuildingAreaTypeModel.building_id = building_id;
                result = mapRegisterBLL.UpdateArea(servAreaInfoModel, servBuildingInfoModel, servBuildingAreaTypeModel);
                if (result == true)
                {
                    return "0|" + "更新成功";
                }
                else
                {
                    return "1|" + "更新失败";
                }
            }
            catch (Exception ex)
            {
                return "1|" + ex.Message;
            }
        }
        /// <summary>
        /// 删除区域
        /// </summary>
        /// <param name="area_id">区域id</param>
        /// <returns></returns>
        public JsonResult DeleteArea(int area_id)
        {
            try
            {
                bool result = mapRegisterBLL.DeleteArea(area_id);
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }
        /// <summary>
        /// 区域注册2.5D的区域
        /// </summary>
        /// <param name="id">区域的id</param>
        /// <param name="area_25D_location">区域的2.5D坐标</param>
        /// <returns></returns>
        public JsonResult RegisterArea25D(int id, string area_25D_location)
        {
            try
            {
                bool result = mapRegisterBLL.RegisterArea25D(id, area_25D_location);
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }
        #endregion

        #region 楼内图注册
        /// <summary>
        /// 获取所有楼宇拼装树
        /// </summary>
        /// <returns></returns>
        public JsonResult GetBuildingTree(int industryId, int regionID)
        {
            try
            {
                List<BuildingInfoTreeCustom> treeList = mapRegisterBLL.GetBuildingTree(industryId, regionID);
                return Json(treeList);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }
        /// <summary>
        /// 根据楼层号验证该层是否已经注册
        /// </summary>
        /// <param name="floorNum"></param>
        /// <returns></returns>
        public JsonResult VerifyFloorNum(int floorNum, int buildingID, int floorID)
        {
            try
            {
                bool result = mapRegisterBLL.VerifyFloorNum(floorNum, buildingID, floorID, Server.MapPath("/ConfigFile/map/mapConfig.xml"));
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }
        /// <summary>
        /// 注册楼内图
        /// </summary>
        /// <param name="floorName">楼层名称</param>
        /// <param name="leftBottom">左下角坐标</param>
        /// <param name="rightTop">右上角坐标</param>
        /// <param name="floorUrl">楼内图地址</param>
        /// <param name="floorNum">楼层号</param>
        /// <param name="buildingID">楼宇id</param>
        /// <param name="buildingName">楼宇名称</param>
        /// <returns></returns>
        public JsonResult AddFloorInfo(string floorName, string leftBottom, string rightTop, string floorUrl, int floorNum, int buildingID, string buildingName, int nowMapType)
        {
            try
            {
                ServFloorInfoModel floorInfoModel = new ServFloorInfoModel();
                string floorImageName = "";
                //int mapEgnine = baseMapConfigBLL.GetMapEngine(Server.MapPath("/ConfigFile/map/mapConfig.xml"));//当前地图配置
                if (nowMapType == (int)MapEngine.DGIS)
                {
                    //判断是否上传图片
                    if (floorUrl != "")
                    {
                        HttpFileCollectionBase files = Request.Files; //接收文件
                        //转化成字节数组
                        if (files.Count > 0)
                        {
                            byte[] content = new byte[files[0].ContentLength];
                            files[0].InputStream.Read(content, 0, content.Length);
                            //检查文件是否存在 不存在则创建
                            //string localPath = System.IO.Path.Combine(HttpRuntime.AppDomainAppPath, "images/map/buildingImage/" + buildingName);//这里是以建筑名称创建的文件夹
                            string localPath = System.IO.Path.Combine(HttpRuntime.AppDomainAppPath, "images/map/buildingImage/" + buildingID.ToString());//这里是以建筑的id创建的文件夹,为了跟超图能切换
                            FileHelper.CheckDirectory(localPath);
                            //截取字符串 获取图片名称
                            string[] FilePath = files[0].FileName.Split('\\');
                            //生成图片名称
                            string ImageName = FilePath[FilePath.Length - 1];
                            floorImageName = ImageName;//xx.jpg/xx.png
                            #region 去掉文件的后缀名
                            int pointIndex = floorImageName.LastIndexOf(".");//获得.的位置
                            floorImageName = floorImageName.Substring(0, pointIndex);//获得去掉文件后缀名的字符串
                            #endregion
                            string newFilePath = Path.Combine(localPath, ImageName);
                            //创建文件名 ，如果有重复的 加上副本
                            newFilePath = FileHelper.CreateFileName(newFilePath);
                            FileHelper.Save(newFilePath, content);
                            floorInfoModel.floor_src_2d = floorImageName;
                        }

                    }
                }
                else//超图
                {
                    floorInfoModel.floor_src_2d = floorUrl;
                }

                floorInfoModel.floor_name = floorName;
                floorInfoModel.building_id = buildingID;
                floorInfoModel.point1 = leftBottom;
                floorInfoModel.point2 = rightTop;



                floorInfoModel.rank = floorNum;
                int id = mapRegisterBLL.AddFloorInfo(floorInfoModel, buildingName);
                if (id != 0)
                {
                    return Json("添加成功", "text/x-json");
                }
                else
                {
                    return Json("添加失败", "text/x-json");
                }
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }
        /// <summary>
        /// 修改楼层
        /// </summary>
        /// <param name="floorID">楼层id</param>
        /// <param name="floorName">楼层名称</param>
        /// <param name="leftBottom">左下角坐标</param>
        /// <param name="rightTop">右上角坐标</param>
        /// <param name="floorUrl">楼内图地址</param>
        /// <param name="floorNum">楼层号</param>
        /// <param name="buildingID">楼宇id</param>
        /// <param name="buildingName">楼宇名称</param>
        /// <returns></returns>
        public JsonResult UpdateFloorInfo(int floorID, string floorName, string leftBottom, string rightTop, string floorUrl, int floorNum, int buildingID, string buildingName, int nowMapType)
        {
            try
            {
                string floorImageName = floorUrl.Split('/')[floorUrl.Split('/').Length - 1];
                //int mapEgnine = baseMapConfigBLL.GetMapEngine(Server.MapPath("/ConfigFile/map/mapConfig.xml"));//当前地图配置
                if (nowMapType == (int)MapEngine.DGIS)
                {
                    //判断是否上传图片
                    if (floorUrl != "")
                    {
                        HttpFileCollectionBase files = Request.Files; //接收文件
                        //转化成字节数组
                        if (files.Count > 0)
                        {
                            byte[] content = new byte[files[0].ContentLength];
                            files[0].InputStream.Read(content, 0, content.Length);
                            //检查文件是否存在 不存在则创建
                            string localPath = System.IO.Path.Combine(HttpRuntime.AppDomainAppPath, "images/map/buildingImage/" + buildingName);
                            FileHelper.CheckDirectory(localPath);
                            //删除原有图片
                            string floorUrlName = floorUrl.Split('/')[floorUrl.Split('/').Length - 1];
                            FileHelper.DeleteFile(localPath + "/" + floorUrlName);
                            //截取字符串 获取图片名称
                            string[] FilePath = files[0].FileName.Split('\\');
                            //生成图片名称
                            string ImageName = FilePath[FilePath.Length - 1];
                            floorImageName = ImageName;
                            #region 去掉文件的后缀名
                            int pointIndex = floorImageName.LastIndexOf(".");//获得.的位置
                            floorImageName = floorImageName.Substring(0, pointIndex);//获得去掉文件后缀名的字符串
                            #endregion
                            string newFilePath = Path.Combine(localPath, ImageName);
                            //创建文件名 ，如果有重复的 加上副本
                            newFilePath = FileHelper.CreateFileName(newFilePath);
                            FileHelper.Save(newFilePath, content);
                        }

                    }
                }
                ServFloorInfoModel floorInfoModel = new ServFloorInfoModel();
                floorInfoModel.id = floorID;
                floorInfoModel.floor_name = floorName;
                floorInfoModel.building_id = buildingID;
                floorInfoModel.floor_src_2d = floorImageName;
                floorInfoModel.point1 = leftBottom;
                floorInfoModel.point2 = rightTop;
                floorInfoModel.rank = floorNum;
                bool result = mapRegisterBLL.UpdateFloorInfo(floorInfoModel, buildingName);
                if (result)
                {
                    return Json("修改成功", "text/x-json");
                }
                else
                {
                    return Json("修改失败", "text/x-json");
                }
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }


        public JsonResult UpdateRank(string building_id, string idrank)
        {
            try
            {
                string[] array = idrank.Split(',');
                bool result = mapRegisterBLL.UpdateRank(building_id, array);
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }


        }
        /// <summary>
        /// 删除楼层
        /// </summary>
        /// <param name="floorID">楼层id</param>
        /// <returns></returns>
        public JsonResult DeleteFloorInfo(int floorID)
        {
            try
            {
                string path = Server.MapPath("/");
                bool result = mapRegisterBLL.DeleteFloorInfo(floorID, Server.MapPath("/ConfigFile/map/mapConfig.xml"), path);
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message });
            }
        }
        #endregion
    }
}