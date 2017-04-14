using CSM.Model.CustomModel;
using CSM.Model;
using CSM.BLL;
using CSM.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

namespace CSM.Controllers
{
    public class ScheduleController : BaseController
    {

        private ServScheduleBLL servScheduleBll = new ServScheduleBLL();
        private ServScheduleResultBLL scheduleResultBll = new ServScheduleResultBLL();
        JavaScriptSerializer tojson = new JavaScriptSerializer();
        /// <summary>
        /// 计划任务（上大屏）
        /// </summary>
        /// <returns></returns>
        // GET: Schedule
        public ActionResult Index()
        {
            BaseMapConfigBLL baseMapConfigBLL = new BaseMapConfigBLL();

            // ViewData["region"] = servScheduleBll.GetLocalRegion();  //获取本地园区
            ViewData["region"] = servScheduleBll.GetAllRegion(); //获取所有园区
                                                                 //  ViewData["CameraPatrolDeviceGroup"] = servScheduleBll.GetCameraPatrolDeviceGroupInfoByRegion();//获取视频巡更设备分组
            return View();
        }
        /// <summary>
        /// 资产巡检页面
        /// </summary>
        /// <returns></returns>
        public ActionResult AssetInspection()
        {
            ViewData["region"] = servScheduleBll.GetAllRegion();
            return View();
        }
        /// <summary>
        /// 计划任务结果
        /// </summary>
        /// <returns></returns>
        public ActionResult ScheduleResult()
        {
            //ViewData["region"] = servScheduleBll.GetLocalRegion();  //获取本地园区
            ViewData["region"] = servScheduleBll.GetAllRegion(); //获取所有园区
            ViewData["scheduleType"] = EnumClass.GetEnumModelList<EnumClass.ScheduleType>();//获取计划任务类型
            return View();
        }

        /// <summary>
        /// 获取视频巡更列表
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="scheduleName"></param>
        /// <param name="regionId"></param>
        /// <param name="scheduleState"></param>
        /// <param name="validStartTime"></param>
        /// <param name="validEndTime"></param>
        /// <returns></returns>
        public JsonResult GetCameraScheduleList(int pageIndex, int pageSize, string scheduleName, int regionId, int scheduleState, string validStartTime, string validEndTime)
        {
            try
            {
                int totalNumber = 0;
                List<RetCameraPatrolSchedule> list = servScheduleBll.GetCameraPatrolSchedule(pageIndex, pageSize, scheduleName, regionId, (int)EnumClass.ScheduleType.视频轮播, scheduleState, validStartTime, validEndTime, out totalNumber);
                EasyUIDataGruidModel<List<RetCameraPatrolSchedule>> retList = new EasyUIDataGruidModel<List<RetCameraPatrolSchedule>>();
                retList.total = totalNumber;
                retList.rows = list;
                //  return Json(retList, JsonRequestBehavior.AllowGet);
                return Json(new { status = 0, msg = list }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //log 
                return Json(new { status = 1, msg = "视频巡更列表查询失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 添加视频轮播计划任务
        /// </summary>
        /// <param name="scheduleName"></param>
        /// <param name="regionId"></param>
        /// <param name="deviceGroupId"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="timeType"></param>
        /// <param name="frequency"></param>
        /// <param name="cameraPatrolType"></param>
        /// <param name="galleryCode"></param>
        /// <param name="galleryInterval"></param>
        /// <param name="contentText"></param>
        /// <returns></returns>
        public JsonResult AddCameraPatrolSchedule(string scheduleName, int regionId, int deviceGroupId, string startTime, string endTime, string startExecuteTime, string endExecuteTime, string periodExpression, int cameraPatrolType, string galleryCode, int galleryInterval, string contentText, int spanTime, string scheduleDate)
        {
            try
            {
                bool bl = servScheduleBll.AddSchedule(scheduleName, regionId, (int)EnumClass.ScheduleType.视频轮播, endTime, startTime, deviceGroupId, startExecuteTime, periodExpression, cameraPatrolType, galleryCode, galleryInterval, contentText, spanTime, scheduleDate);
                if (bl == true)
                {
                    return Json(new { status = 0, msg = "添加视频轮播计划成功！" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = 1, msg = "添加视频轮播计划失败！" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = 2, msg = "添加视频轮播计划失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 修改视频轮播计划任务
        /// </summary>
        /// <param name="id"></param>
        /// <param name="scheduleName"></param>
        /// <param name="regionId"></param>
        /// <param name="deviceGroupId"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="timeType"></param>
        /// <param name="frequency"></param>
        /// <param name="cameraPatrolType"></param>
        /// <param name="galleryCode"></param>
        /// <param name="galleryInterval"></param>
        /// <param name="contentText"></param>
        /// <returns></returns>
        public JsonResult UpdateCameraPatrolSchedule(int id, string scheduleName, int regionId, int deviceGroupId, string startTime, string endTime, string startExecuteTime, string endExecuteTime, string periodExpression, int cameraPatrolType, string galleryCode, int galleryInterval, string contentText, int spanTime, string scheduleDate)
        {
            try
            {
                bool bl = servScheduleBll.UpdateScheduleById(id, scheduleName, regionId, (int)EnumClass.ScheduleType.视频轮播, endTime, startTime, deviceGroupId, startExecuteTime, periodExpression, cameraPatrolType, galleryCode, galleryInterval, contentText, spanTime, scheduleDate);
                if (bl == true)
                {
                    return Json(new { status = 0, msg = "修改视频轮播计划成功！" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = 1, msg = "修改视频轮播计划失败！" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = 2, msg = "修改视频轮播计划失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 更改计划任务状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="state"></param>
        /// <returns></returns>
        public JsonResult UpdateScheduleState(int id, int state)
        {
            string message = "";
            try
            {
                bool bl = servScheduleBll.UpdateScheduleState(id, state);
                if (bl == true)
                {
                    if (state == -1)
                    {
                        message = "删除成功！";
                    }
                    else
                    {
                        message = "修改状态成功！";
                    }
                    return Json(new { status = 0, msg = message }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    if (state == -1)
                    {
                        message = "数据库删除失败！";
                    }
                    else
                    {
                        message = "数据库修改失败！";
                    }
                    return Json(new { status = 1, msg = message }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                if (state == -1)
                {
                    message = "删除失败！";
                }
                else
                {
                    message = "修改状态失败！";
                }
                return Json(new { status = 1, msg = message + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 修改计划任务截止时间
        /// </summary>
        /// <param name="id"></param>
        /// <param name="month"></param>
        /// <param name="endTime"></param>
        /// <returns></returns>
        public JsonResult UpdateScheduleDeadLine(int id, int month, DateTime endTime)
        {
            try
            {
                bool bl = servScheduleBll.DelayDeadLine(id, month, endTime);
                return bl == true ? Json(new { status = 0, msg = "修改截止时间成功！" }, JsonRequestBehavior.AllowGet) : Json(new { status = 0, msg = "数据库修改截止时间失败！" }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "修改截止时间失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 根据园区ID获取视频巡更设备分组和大屏配置
        /// </summary>
        /// <param name="region"></param>
        /// <returns></returns>
        public JsonResult GetCameraPatrolDeviceGroupInfoByRegion(int region)
        {
            try
            {
                var list = servScheduleBll.GetDeviceGroupAndGalleryByRegion(region);
                //return Json(list, JsonRequestBehavior.AllowGet);
                return Json(new { status = 0, msg = list }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "根据园区编号获取设备分组失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 根据设备组ID获取设备 
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public JsonResult GetCameraPatrolDeviceByGroupId(int groupId)
        {
            try
            {
                List<CameraPatrolDevice> list = servScheduleBll.GetCameraPatrolDeviceByGroupId(groupId);
                return Json(new { status = 0, msg = list }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "根据设备分组ID获取设备失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 修改轮切资源编码
        /// </summary>
        /// <param name="scheduleId"></param>
        /// <param name="switchCode"></param>
        /// <returns></returns>
        public JsonResult UpdateSwitchCode(int scheduleId, string switchCode)
        {
            try
            {
                bool bl = servScheduleBll.UpdateSwitchCode(scheduleId, switchCode);
                if (bl == true)
                {
                    return Json(new { status = 0, msg = "修改轮切资源组成功" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = 1, msg = "修改轮切资源组失败" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "修改轮切资源编码失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 获取轮切摄像头组信息
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public JsonResult GetDeviceGroup(int groupId)
        {
            try
            {
                ServDeviceGroupInfoModel deviceGroup = servScheduleBll.GetDeviceGroupInfoByGroupId(groupId);
                return Json(new { status = 0, msg = deviceGroup }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "获取设备分组信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        #region  执行结果
        /// <summary>
        /// 计划任务结果分页查询
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="regionId"></param>
        /// <param name="scheduleType"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <returns></returns>
        public JsonResult GetScheduleResultPages(int pageIndex, int pageSize, int regionId, int scheduleType, string startTime, string endTime)
        {
            try
            {
                int totalNumber = 0;
                List<RetScheduleResult> list = scheduleResultBll.GetScheduleResultByPage(pageIndex, pageSize, regionId, scheduleType, startTime, endTime, out totalNumber);
                EasyUIDataGruidModel<List<RetScheduleResult>> retList = new EasyUIDataGruidModel<List<RetScheduleResult>>();
                retList.total = totalNumber;
                retList.rows = list;
                return Json(new { status = 0, msg = list }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "计划任务执行结果查询失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion


        #region   资产巡检
        /// <summary>
        /// 资产巡检列表查询
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="assetType"></param>
        /// <param name="regionId"></param>
        /// <param name="validStartTime"></param>
        /// <param name="validEndTime"></param>
        /// <returns></returns>
        public JsonResult GetAssetInspectionList(int pageIndex, int pageSize, int assetType, int regionId, string startTime, string endTime)
        {
            try
            {
                int totalNumber = 0;
                List<RetCameraPatrolSchedule> list = servScheduleBll.GetAssetInspectionByPage(pageIndex, pageSize, assetType, regionId, startTime, endTime, out totalNumber);
                EasyUIDataGruidModel<List<RetCameraPatrolSchedule>> retList = new EasyUIDataGruidModel<List<RetCameraPatrolSchedule>>();
                retList.total = totalNumber;
                retList.rows = list;
                return Json(new { status = 0, msg = list }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "资产巡检结果查询失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 添加视频轮播计划任务
        /// </summary>
        /// <param name="scheduleName"></param>
        /// <param name="regionId"></param>
        /// <param name="deviceGroupId"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="timeType"></param>
        /// <param name="frequency"></param>
        /// <param name="cameraPatrolType"></param>
        /// <param name="galleryCode"></param>
        /// <param name="galleryInterval"></param>
        /// <param name="contentText"></param>
        /// <returns></returns>
        public JsonResult AddAssetInspectionSchedule(string scheduleName, int regionId, int scheduleType, string startTime, string endTime, string startExecuteTime, string periodExpression, string contentText,int spanTime,string scheduleDate)
        {
            try
            {
                bool bl = servScheduleBll.AddSchedule(scheduleName, regionId, scheduleType, endTime, startTime, -1, startExecuteTime, periodExpression, -1, "", -1, contentText, spanTime, scheduleDate);
                if (bl == true)
                {
                    return Json(new { status = 0, msg = "添加巡检计划成功！" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = 1, msg = "添加巡检计划失败！" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = 2, msg = "添加巡检计划失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 修改视频轮播计划任务
        /// </summary>
        /// <param name="id"></param>
        /// <param name="scheduleName"></param>
        /// <param name="regionId"></param>
        /// <param name="deviceGroupId"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="timeType"></param>
        /// <param name="frequency"></param>
        /// <param name="cameraPatrolType"></param>
        /// <param name="galleryCode"></param>
        /// <param name="galleryInterval"></param>
        /// <param name="contentText"></param>
        /// <returns></returns>
        public JsonResult UpdateAssetInspectionSchedule(int id, string scheduleName, int regionId, int scheduleType, string startTime, string endTime, string startExecuteTime, string periodExpression, string contentText, int spanTime, string scheduleDate)
        {
            try
            {
                bool bl = servScheduleBll.UpdateScheduleById(id, scheduleName, regionId, scheduleType, endTime, startTime, -1, startExecuteTime, periodExpression, -1, "", -1, contentText, spanTime, scheduleDate);
                if (bl == true)
                {
                    return Json(new { status = 0, msg = "修改巡检计划成功！" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = 1, msg = "修改巡检计划失败！" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = 2, msg = "修改巡检计划失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

        #region   上大屏配置
        /// <summary>
        /// 根据园区ID获取大屏配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public JsonResult GetGalleryConfigByRegionId(int regionId)
        {
            try
            {
                LargeScreenBLL bll = new LargeScreenBLL();
                List<ScreenConfig> screenList = bll.GetFastGalleryConfigByRegionId(regionId);
                return Json(new { status = 0, msg = screenList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "获取大屏配置失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

    }
}