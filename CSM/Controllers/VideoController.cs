using CSM.BLL;
using CSM.Common;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using static CSM.Common.EnumClass;

namespace CSM.Controllers
{
    public class VideoController : BaseController
    {
        BaseMapConfigBLL baseMapConfigBLL = new BaseMapConfigBLL();
        ServDeviceGroupBLL servDeviceGroupBLL = new ServDeviceGroupBLL();
        ServVideoDownloadBLL servVideoDownloadBLL = new ServVideoDownloadBLL();
        // GET: Viedo
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult VideoDownload()
        {
            JavaScriptSerializer tojson = new JavaScriptSerializer();
            ViewData["downLoadStatus"] = EnumClass.GetEnumModelList<VideoDownLoadStatus>();
            ViewData["downLoadStatusJS"] = tojson.Serialize(EnumClass.GetEnumModelList<VideoDownLoadStatus>());
            ViewData["videoDownloadType"] = tojson.Serialize(EnumClass.GetEnumModelList<VideoDownLoadType>());
            return View();
        }
        public ActionResult VideoGroup()
        {
            return View();
        }
        /// <summary>
        /// 获取自定义设备分组
        /// </summary>
        /// <returns></returns>
        public JsonResult GetDefinedGroupTree(int regionId)
        {
            try
            {
                BaseIndustryModel industryModel = baseMapConfigBLL.GetDefaultIndustry(Server.MapPath("../ConfigFile/map/mapConfig.xml"));
                ServDeviceGroupInfoQuery query = new ServDeviceGroupInfoQuery();
                query.group_type = (int)GroupType.视频轮播;
                query.region_id = regionId;
                List<DeviceGroupTreeCustom> groupTreeList = servDeviceGroupBLL.GetDefinedGroupTree(query);
                return Json(new { status = 0, msg = groupTreeList });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 获取所有的摄像头
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllCameraTree(int regionId)
        {
            try
            {
                BaseIndustryModel industryModel = baseMapConfigBLL.GetDefaultIndustry(Server.MapPath("../ConfigFile/map/mapConfig.xml"));
                List<DeviceGroupTreeCustom> list = servDeviceGroupBLL.GetAllCameraList(industryModel.id, regionId);
                return Json(new { status = 0, msg = list });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 添加视频分组
        /// </summary>
        /// <param name="groupName"></param>
        /// <returns></returns>
        public JsonResult AddCarmeraGroup(int id, string groupName, int pid,int regionId)
        {
            try
            {
                bool result = false;
                //验证分组名称是否存在
                bool res = servDeviceGroupBLL.VerifyGroupName(groupName, (int)GroupType.视频轮播, 1);
                if (!res)
                {
                    return Json(new { status = 2, msg = res });
                }
                if (id == -3)//新增分组
                {
                    ServDeviceGroupInfoModel model = new ServDeviceGroupInfoModel();
                    model.group_name = groupName;
                    model.group_status = 1;
                    model.group_type = (int)GroupType.视频轮播;
                    model.pid = pid;
                    model.device_id = -1;
                    model.device_type = 1;
                    model.region_id = regionId;
                    result = servDeviceGroupBLL.AddDeviceGroup(model);
                }
                else//修改分组
                {
                    ServDeviceGroupInfoModel model = new ServDeviceGroupInfoModel();
                    model.id = id;
                    model.group_name = groupName;
                    result = servDeviceGroupBLL.UpdateGroupName(model);
                }
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 删除设备分组
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult DeleteCarmeraGroup(int id)
        {
            try
            {
                bool result = servDeviceGroupBLL.DeleteGroupById(id);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 删除设备组和设备的关联
        /// </summary>
        /// <param name="deviceId"></param>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public JsonResult RemoveDevice(int deviceId, int groupId)
        {
            try
            {
                bool result = servDeviceGroupBLL.DeleteDeviceAndGroupBind(deviceId, groupId);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 绑定设备和组
        /// </summary>
        /// <param name="deviceIds"></param>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public JsonResult BindGroupAndDevice(string deviceIds, int groupId,int rank,string regCode)
        {
            try
            {
                bool result = servDeviceGroupBLL.AddDeviceGroupRelateEX(deviceIds, groupId,rank);
                if (regCode != "")
                {
                    result = servDeviceGroupBLL.UpdateGroupSwitchCodeById(groupId, regCode);
                }
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 修改分组设备排序
        /// </summary>
        /// <param name="groupId">组id</param>
        /// <param name="idrank">新排序</param>
        /// <returns></returns>
        public JsonResult UpdateGroupDeviceRank(int groupId, string devices)
        {
            try
            {
                bool result = servDeviceGroupBLL.UpdateGroupDeviceRank(groupId, devices);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 根据分组id修改轮切组编码
        /// </summary>
        /// <param name="groupId"></param>
        /// <param name="resCode"></param>
        /// <returns></returns>
        public JsonResult UpdateGroupRegCodeById(int groupId,string resCode)
        {
            try
            {
                bool result = servDeviceGroupBLL.UpdateGroupSwitchCodeById(groupId, resCode);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 获取视频下载列表
        /// </summary>
        /// <param name="pageIndex">开始页码</param>
        /// <param name="pageSize">每页行数</param>
        /// <param name="deviceName">摄像头名称</param>
        /// <param name="downloadStatus">下载状态</param>
        /// <param name="startTime">开始时间</param>
        /// <param name="endTime">结束时间</param>
        /// <returns></returns>
        public JsonResult GetVideoDownloadList(int pageIndex, int pageSize, string deviceName, int downloadStatus, string startTime, string endTime)
        {
            try
            {
                int total = 0;
                ServVideoInfoQuery query = new ServVideoInfoQuery();
                query.pageIndex = pageIndex;
                query.pageSize = pageSize;
                query.device_name = deviceName;
                query.download_status = downloadStatus;
                query.video_start_time = startTime;
                query.video_end_time = endTime;
                List<ServVideoInfoModel> list = servVideoDownloadBLL.GetVideoDownlonadList(query, out total);
                return Json(new { status = 0, msg = new { rows = list, total = total } });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 根据园区id分页获取视频分组
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public JsonResult GetVideoGroupData(int pageIndex,int pageSize,int regionId)
        {
            try
            {
                ServDeviceGroupInfoQuery query = new ServDeviceGroupInfoQuery();
                query.pageIndex = pageIndex;
                query.pageSize = pageSize;
                query.region_id = regionId;
                query.group_type = (int)GroupType.视频轮播;
                int total = 0;
                List<ServDeviceGroupInfoModel> list = servDeviceGroupBLL.GetAllVideoGroupByRegionId(query, out total);
                return Json(new { status = 0, msg = new {total=total,rows=list } });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 根据设备分组id获取分组下的所有设备
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public JsonResult GetDeviceByGroupId(int groupId)
        {
            try
            {
                List<ServDeviceInfoModel> deviceList = servDeviceGroupBLL.GetDeviceInfoByGroupId(groupId);
                return Json(new { status = 0, msg = deviceList });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
    }
}