using CSM.BLL;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using static CSM.Common.EnumClass;

namespace CSM.Controllers
{
    public class DeviceInfoController : BaseController
    {
        DeviceInfoBLL deviceInfoBLL = new DeviceInfoBLL();
        BaseMapConfigBLL baseMapConfigBLL = new BaseMapConfigBLL();
        ServDeviceGroupBLL servDeviceGroupBLL = new ServDeviceGroupBLL();
        // GET: DeviceInfo
        public ActionResult Index()
        {
            return View();
        }

        #region 设备列表
        /// <summary>
        /// 获取设备列表
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="deviceName">设备名称</param>
        /// <param name="deviceCode">设备编码</param>
        /// <returns></returns>
        public JsonResult GetDeviceInfo(int pageIndex, int pageSize, string deviceName, string deviceCode,int deviceType,int regionId)
        {
            try
            {
                int total = 0;
                List<ServDeviceInfoModel> deviceList = deviceInfoBLL.GetDeviceInfoList(deviceName, deviceCode, regionId, deviceType, pageIndex, pageSize, out total);
                return Json(new { status = 0, msg = new { rows = deviceList, total = total } });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 根据id获取设备数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult GetDeviceInfoById(int id)
        {
            try
            {
                ServDeviceInfoModel device = deviceInfoBLL.GetDeviceInfoById(id);
                return Json(new { status = 0, msg = device });
            }
            catch (Exception ex)
            {

                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 根据设备code查询设备
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public JsonResult GetDeviceInfoByDeviceCode(string code)
        {
            try
            {
                ServDeviceInfoModel device = deviceInfoBLL.GetDeviceInfoByDeviceCode(code);
                return Json(new { status = 0, msg = device });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 修改设备信息
        /// </summary>
        /// <param name="deviceID"></param>
        /// <param name="device_name"></param>
        /// <param name="device_code"></param>
        /// <param name="device_type"></param>
        /// <param name="subsystem_id"></param>
        /// <param name="device_status"></param>
        /// <param name="cover_range"></param>
        /// <param name="camera_towards"></param>
        /// <param name="visual_range"></param>
        /// <param name="isParts"></param>
        /// <param name="jishihuifang"></param>
        /// <param name="duolubofang"></param>
        /// <param name="shangdaqiang"></param>
        /// <param name="lishihuifang"></param>
        /// <returns></returns>
        public JsonResult UpdateDeviceInfo(int deviceID, string device_name, string device_code, int device_type, int subsystem_id, int device_status, string cover_range, string camera_towards, string visual_range, int isParts, string jishihuifang, string duolubofang, string shangdaqiang, string lishihuifang)
        {
            try
            {
                ServDeviceInfoModel model = new ServDeviceInfoModel();
                model.id = deviceID;
                model.device_name = device_name;
                model.device_code = device_code;
                model.device_type = device_type;
                model.subsystem_id = subsystem_id;
                model.device_status = device_status;
                if ((int)SubSystem.视频子系统 == subsystem_id)
                {
                    model.cover_range = Convert.ToInt32(cover_range);
                    model.camera_towards = Convert.ToInt32(camera_towards);
                    model.visual_range = Convert.ToInt32(visual_range);
                }
                model.is_parts = isParts;
                model.ext1 = jishihuifang;
                model.ext2 = duolubofang;
                model.ext3 = shangdaqiang;
                model.ext4 = lishihuifang;
                model.update_status_time = DateTime.Now;
                bool result = deviceInfoBLL.UpdateDeviceInfo(model);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        #endregion

        #region 设备分组树
        /// <summary>
        /// 获取设备分组树
        /// </summary>
        /// <returns></returns>
        public JsonResult GetDeviceGroupInfo(int regionId,int pageType)
        {
            try
            {
                BaseIndustryModel industryModel = baseMapConfigBLL.GetDefaultIndustry(Server.MapPath("../ConfigFile/map/mapConfig.xml"));
                ServDeviceGroupInfoQuery query = new ServDeviceGroupInfoQuery();
                query.group_type = (int)GroupType.设备分组;
                query.region_id = regionId;
                List<DeviceGroupTreeCustom> groupTreeList = servDeviceGroupBLL.GetDeviceGroupTree(query, industryModel.id, pageType);
                return Json(new { status = 0, msg = groupTreeList });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 添加分组
        /// </summary>
        /// <param name="name"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public JsonResult AddDeviceGroup(string name, int type)
        {
            try
            {
                List<BaseRegionConfigModel> baseRegionConfigModelList = baseMapConfigBLL.GetAllRegionConfig();
                int regionID = 0;
                if (baseRegionConfigModelList.Count > 0)
                {
                    regionID = baseRegionConfigModelList[0].id;
                }
                bool result = false;
                ServDeviceGroupInfoModel model = new ServDeviceGroupInfoModel();
                model.group_name = name;
                model.group_type = type;
                model.pid = -1;
                model.group_status = 1;
                model.device_type = 1;
                model.device_id = -1;
                model.region_id = regionID;
                result = servDeviceGroupBLL.AddDeviceGroup(model);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 添加设备和组的绑定
        /// </summary>
        /// <param name="deviceIds"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult AddDeviceGroupRelate(string deviceIds, int id)
        {
            try
            {
                bool result = servDeviceGroupBLL.AddDeviceGroupRelate(deviceIds, id);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 根据设备组id获取设备列表
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public JsonResult GetDeviceInfoByGroupId(int groupId)
        {
            try
            {
                BaseIndustryModel industryModel = baseMapConfigBLL.GetDefaultIndustry(Server.MapPath("../ConfigFile/map/mapConfig.xml"));
                List<ServDeviceInfoModel> deviceList = deviceInfoBLL.GetDeviceInfoByGroupId(groupId, industryModel.id);
                return Json(new { status = 0, msg = deviceList });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        #endregion

    }
}