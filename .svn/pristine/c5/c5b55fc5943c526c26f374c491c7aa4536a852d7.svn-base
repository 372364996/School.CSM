using CSM.BLL;
using CSM.Common;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using static CSM.Common.EnumClass;

namespace CSM.Controllers
{
    public class PlanController : BaseController
    {
        ServDevicePlanBLL devicePlanBll = new ServDevicePlanBLL();
        ServDeviceInfoBLL deviceInfoBll = new ServDeviceInfoBLL();
        BaseMapConfigBLL baseMapConfigBLL = new BaseMapConfigBLL();
        JavaScriptSerializer tojson = new JavaScriptSerializer();
        BaseRelayConfigBLL baseRelayConfigBLL = new BaseRelayConfigBLL();
        ServPlanRegulationBLL servPlanRegulationBLL = new ServPlanRegulationBLL();
        BaseEventTypeBLL baseEventTypeBLL = new BaseEventTypeBLL();
        ServEventPlanBLL ServEventPlanBLL = new ServEventPlanBLL();
        BaseRegionConfigBLL baseRegionConfigBLL = new BaseRegionConfigBLL();
        ServPlanRecordBLL servPlanRecordBLL = new ServPlanRecordBLL();
       
        // GET: Plan 预案主页
        public ActionResult Index()
        {
            JavaScriptSerializer tojson = new JavaScriptSerializer();
            string deviceId = Request.QueryString["deviceId"];
            if (string.IsNullOrEmpty(deviceId))
                deviceId = "0";
            ViewData["deviceId"] =tojson.Serialize(deviceId);
            return View();
        }

        // GET: 设备预案创建页面
        public ActionResult DeviceCreate()
        {
            JavaScriptSerializer tojson = new JavaScriptSerializer();
            List<BaseRegionConfigModel> baseRegionConfigModelList = baseMapConfigBLL.GetAllRegionConfig();
            int regionID = 0;
            string regionId = Request.QueryString["regionId"];
            if (string.IsNullOrEmpty(regionId))
                regionId = "0";
            ViewData["regionId"] = tojson.Serialize(regionId);
            if (Request.QueryString["regionId"] != null)//页面带条件刷新
            {
                regionID = int.Parse(Request.QueryString["regionId"]);
            }
            HttpCookie cookie = Request.Cookies["mainControlRegionId"];
            if (cookie != null && Request.QueryString["regionId"] == null)//cookie主控园区id
            {
                if (cookie.Value != "")
                {
                    regionID = int.Parse(Server.HtmlEncode(cookie.Value));
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
            ViewData["DevicePlanDefaultOptions"] = EnumClass.GetEnumModelList<CSM.Common.EnumClass.DevicePlanDefaultOptions>();
            ViewData["DevicePlanConfirmOptions"] = EnumClass.GetEnumModelList<CSM.Common.EnumClass.DevicePlanConfirmOptions>();
            //默认行业
            BaseIndustryModel industryModel = baseMapConfigBLL.GetDefaultIndustry(Server.MapPath("/ConfigFile/map/mapConfig.xml"));
            //获取Serv_Device_Info中设备的全部数据(需要园区id,行业id)
            ViewData["AllDeviceInfo"] = tojson.Serialize(deviceInfoBll.GetDeviceInfoAndIconUrl(regionID, industryModel.id));
            string deviceId = Request.QueryString["deviceId"];
            if (string.IsNullOrEmpty(deviceId))
                deviceId = "0";
            ViewData["deviceId"] = tojson.Serialize(deviceId);
            string deviceType = Request.QueryString["deviceType"];
            if (string.IsNullOrEmpty(deviceType))
                deviceType = "0";
            ViewData["deviceType"] = tojson.Serialize(deviceType);
            return View();
        }

        // GET: 事件预案创建页面
        public ActionResult EventCreate()
        {
            ViewData["EventPlanDefaultOptionsList"] = EnumClass.GetEnumModelList<CSM.Common.EnumClass.EventPlanDefaultOptions>();
            ViewData["EventPlanConfirmOptions"] = EnumClass.GetEnumModelList<CSM.Common.EnumClass.EventPlanConfirmOptions>();
            ViewData["CameraPosition"] = EnumClass.GetEnumModelList<CSM.Common.EnumClass.CameraPosition>();
            ViewData["PlanLevel"] = EnumClass.GetEnumModelList<CSM.Common.EnumClass.PlanLevel>();
            return View();
        }

        // GET: 事件预案列表
        public ActionResult EventList()
        {
            return View();
        }
        /// <summary>
        /// 设备预案批量注册
        /// </summary>
        /// <returns></returns>
        public ActionResult DeviceBatchCreate()
        {
            JavaScriptSerializer tojson = new JavaScriptSerializer();
            ViewData["DevicePlanDefaultOptions"] = EnumClass.GetEnumModelList<CSM.Common.EnumClass.DevicePlanDefaultOptions>();
            ViewData["DevicePlanConfirmOptions"] = EnumClass.GetEnumModelList<CSM.Common.EnumClass.DevicePlanConfirmOptions>();
            BaseIndustryModel industryModel = baseMapConfigBLL.GetDefaultIndustry(Server.MapPath("/ConfigFile/map/mapConfig.xml"));
            string deviceId = Request.QueryString["deviceId"];
            if (string.IsNullOrEmpty(deviceId))
                deviceId = "0";
            ViewData["deviceId"] = tojson.Serialize(deviceId);
            string deviceType = Request.QueryString["deviceType"];
            if (string.IsNullOrEmpty(deviceType))
                deviceType = "0";
            ViewData["deviceType"] = tojson.Serialize(deviceType);
            string regionId = Request.QueryString["regionId"];
            if (string.IsNullOrEmpty(regionId))
                regionId = "0";
            ViewData["regionId"] = tojson.Serialize(regionId);
            string inbuildingId = Request.QueryString["inbuildingId"];
            if (string.IsNullOrEmpty(inbuildingId))
                inbuildingId = "0";
            ViewData["inbuildingId"] = tojson.Serialize(inbuildingId);
            return View();
        }
        //事件预案修改
        public ActionResult EventPlanModify()
        {
            string ModifyEventPlanId = Request.QueryString["Id"];
            if (string.IsNullOrEmpty(ModifyEventPlanId))
                ModifyEventPlanId = "0";
            ViewData["Id"] = ModifyEventPlanId;
            ViewData["EventPlanDefaultOptionsList"] = EnumClass.GetEnumModelList<CSM.Common.EnumClass.EventPlanDefaultOptions>();
            ViewData["EventPlanConfirmOptions"] = EnumClass.GetEnumModelList<CSM.Common.EnumClass.EventPlanConfirmOptions>();
            ViewData["CameraPosition"] = EnumClass.GetEnumModelList<CSM.Common.EnumClass.CameraPosition>();
            ViewData["PlanLevel"] = EnumClass.GetEnumModelList<CSM.Common.EnumClass.PlanLevel>();
            return View();
        }
        //设备预案修改
        public ActionResult Modify()
        {
            JavaScriptSerializer tojson = new JavaScriptSerializer();
            List<BaseRegionConfigModel> baseRegionConfigModelList = baseMapConfigBLL.GetAllRegionConfig();
            int regionID = 0;
            HttpCookie cookie = Request.Cookies["mainControlRegionId"];
            if (cookie != null)//cookie主控园区id
            {
                if (cookie.Value != "")
                {
                    regionID = int.Parse(Server.HtmlEncode(cookie.Value));
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
            string ModifyDevicePlanId = Request.QueryString["Id"];
            if (string.IsNullOrEmpty(ModifyDevicePlanId))
            ModifyDevicePlanId = "0";
            ViewData["Id"] = ModifyDevicePlanId;
            ViewData["DevicePlanDefaultOptions"] = EnumClass.GetEnumModelList<CSM.Common.EnumClass.DevicePlanDefaultOptions>();
            ViewData["DevicePlanConfirmOptions"]= EnumClass.GetEnumModelList<CSM.Common.EnumClass.DevicePlanConfirmOptions>();
            //默认行业
            BaseIndustryModel industryModel = baseMapConfigBLL.GetDefaultIndustry(Server.MapPath("/ConfigFile/map/mapConfig.xml"));
            //获取Serv_Device_Info中设备的全部数据(需要园区id,行业id)
            ViewData["AllDeviceInfo"] = tojson.Serialize(deviceInfoBll.GetDeviceInfoAndIconUrl(regionID, industryModel.id));
            return View();
        }
        // GET: 预案条例
        public ActionResult PlanOrdinanceList()
        {
            return View();
        }
        /// <summary>
        /// 预案处置项执行结果
        /// </summary>
        /// <returns></returns>
        public ActionResult PlanItemResult()
        {
            ViewData["PlanType"] = EnumClass.GetEnumModelList<CSM.Common.EnumClass.PlanType>();
            return View();
        }

        /// <summary>
        /// 获取预案设备列表
        /// </summary>
        /// <param name="pageIndex">页数</param>
        /// <param name="pageSize">每页有多少行</param>
        /// <param name="planName">预案名称</param>
        /// <param name="createTime">创建时间</param>
        /// <param name="endTime">结束时间</param>
        /// <returns></returns>
        public ActionResult GetDevicePlanList(int pageIndex, int pageSize, string planName, string createTime, string endTime,int[] eventRegion)
        {
            ServDevicePlanQuery devicePlanQuery = new ServDevicePlanQuery();
            if (planName != "")
            {
                devicePlanQuery.plan_name = planName;
            }
            if (createTime != "")
            {
                devicePlanQuery.create_time = createTime;
            }
            if (endTime != "")
            {
                devicePlanQuery.Endtime = endTime;
            }
            if (eventRegion != null && eventRegion.Length > 0)
            {
                devicePlanQuery.eventRegion = eventRegion;
            }
            else
            {
                devicePlanQuery.eventRegion = null;
            }
            int totalNumber = 0;
            List<DevicePlanModel> devicePlanInfoList = new List<DevicePlanModel>();
            try
            {
                devicePlanInfoList = devicePlanBll.GetEntities(devicePlanQuery, pageIndex, pageSize, out totalNumber);
                var temp = new { total = totalNumber, rows = devicePlanInfoList.OrderByDescending(n => n.id).ToList() };
                return Json(temp);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 删除设备预案信息
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public JsonResult DelDevicePlanByID(string Id)
        {
            try
            {
                bool result = false;
                string[] Array = Id.Split(',');
                foreach (string f in Array)
                {
                    result = devicePlanBll.DelteDevicePlan(Convert.ToInt32(f));
                }
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 设备预案检测时间是否被占用
        /// </summary>
        /// <param name="devicePlanId"></param>
        /// <param name="deviceId"></param>
        /// <param name="planTime"></param>
        /// <param name="executionCycle"></param>
        /// <param name="addEndTime"></param>
        /// <returns></returns>
        public JsonResult IsCheckTimeOccupied(int devicePlanId, int deviceId,  string planTime, string executionCycle, string addEndTime)
        {
            try
            {
                List<DevicePlanModel> result = devicePlanBll.IsCheckTimeOccupied(devicePlanId, deviceId, planTime, executionCycle, addEndTime);
                if (result.Count() > 0)
                {
                    return Json(new { status = 0, msg = result }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = 0, msg = true }, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }

        /// <summary>
        /// 获取基本设备类型
        /// </summary>
        /// <returns></returns>
        public JsonResult GetDeviceType()
        {
            try
            {
               
                //默认行业
                BaseIndustryModel industryModel = baseMapConfigBLL.GetDefaultIndustry(Server.MapPath("/ConfigFile/map/mapConfig.xml"));
                List<BaseDeviceTypeModel> result = baseMapConfigBLL.GetBaseDeviceTypeByIndustryId(industryModel.id);
                return Json(result);
               
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 获取设备名称
        /// </summary>
        /// <returns></returns>
        public JsonResult GetDevice(int deviceType,int regionId)
        {
            try
            {

                List<ServDeviceInfoModel> result = deviceInfoBll.GetAllDevice(deviceType, regionId);
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 获取设备名称
        /// </summary>
        /// <returns></returns>
        public JsonResult GetDeviceInfo(int deviceType, int regionId,int inbuildingId)
        {
            try
            {

                List<ServDeviceInfoModel> result = deviceInfoBll.GetAllDeviceInfo(deviceType, regionId, inbuildingId);
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 获取四色灯
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public JsonResult GetFourColourLamp(int regionId)
        {
            try
            {

                List<BaseRelayConfigModel> result = baseRelayConfigBLL.GetFourColorLight(regionId);
                return Json(new { status = 0, msg = result }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 获取摄像头设备
        /// </summary>
        /// <returns></returns>
        public JsonResult GetCameraInfo(int regionId)
        {
            try
            {
                //默认行业
                BaseIndustryModel industryModel = baseMapConfigBLL.GetDefaultIndustry(Server.MapPath("../ConfigFile/map/mapConfig.xml"));
                //根据当前设备，行业，当前设备所在的园区查询摄像头
                List<ServDeviceInfoModel> result = deviceInfoBll.GetCameraInfo(industryModel.id, regionId);
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        //设备预案注册
        public JsonResult InsetDevicePlanData(string planName, int planLevel, int deviceId,string addCreateTime, string addEndTime, string cameraId, string defaultCbk, string cnfirmCbk, string defaultName, string defaultPhone, string cnfirmName,  string cnfirmPhone,string cnfirmIsCall, string cnfirmIsMessage, string defaultIsCall, string defaultIsMessage, int fourColorLight,string executionCycle)
        {
            try
            {
                ServDevicePlanModel entity = new ServDevicePlanModel();
                //确警前处置项
                List<ServPlanHandleItemModel> defaultPlanHandleItemList = new List<ServPlanHandleItemModel>();
                //确警后处置项
                List<ServPlanHandleItemModel> cnfirmPlanHandleItemList = new List<ServPlanHandleItemModel>();
                //确警前人员信息
                List<ServPlanPersonModel> defaultPersonList = new List<ServPlanPersonModel>();
                //确警后人员信息
                List<ServPlanPersonModel> cnfirmPlanPersonList = new List<ServPlanPersonModel>();
                List<ServPlanHandleItemCameraModel> servPlanHandleItemCameraList = new List<Model.ServPlanHandleItemCameraModel>();
                int p_id = 1000;
                ServDevicePlanModel devicePlan = devicePlanBll.GetLastDevicePlan();
                if (devicePlan != null)
                {
                    p_id = Convert.ToInt32(devicePlan.plan_code);
                }
                //向Serv_Device_Plan添加预案基础信息
                entity.plan_code = p_id + 1;
                entity.plan_name = planName;
                entity.plan_level = planLevel;
                entity.device_id = deviceId;
                entity.create_time = DateTime.Now; 
                entity.update_time= DateTime.Now;
                entity.plan_status = (int)PlanStatus.启用;
                entity.person_id = 1;
                //向Serv_Execution_Time添加时间信息
                ServExecutionTimeModel servExecutionTime = new ServExecutionTimeModel();
                servExecutionTime.start_time = addCreateTime;
                servExecutionTime.end_time = addEndTime;
                servExecutionTime.execution_cycle = executionCycle;
                servExecutionTime.type = (int)PlanType.设备预案;
                //向Serv_Plan_HandleItem添加默认处置选项
                if (defaultCbk != "")
                {
                    string[] defaultArray = defaultCbk.Split(',');
                    for (int i = 0; i < defaultArray.Length; i++)
                    {
                        ServPlanHandleItemModel servPlanHandleItem = new ServPlanHandleItemModel();
                        servPlanHandleItem.plan_id = entity.id;
                        servPlanHandleItem.item_type = Convert.ToInt32(defaultArray[i]);
                        if (Convert.ToInt32(defaultArray[i]) == (int)DevicePlanDefaultOptions.控制中心声光蜂鸣器开启)
                        {
                            servPlanHandleItem.ext1 = fourColorLight.ToString();
                        }
                        servPlanHandleItem.confirm_type = (int)PlanHandleTime.确警前;//确警前默认处置项
                        servPlanHandleItem.plan_type = (int)PlanType.设备预案;//设备预案
                        defaultPlanHandleItemList.Add(servPlanHandleItem);
                    }
                }
                if (cnfirmCbk != "")
                {
                    //向Serv_Plan_HandleItem添加确认处置选项
                    string[] cnfirmArray = cnfirmCbk.Split(',');
                    for (int i = 0; i < cnfirmArray.Length; i++)
                    {
                        ServPlanHandleItemModel servPlanHandleItem = new ServPlanHandleItemModel();
                        servPlanHandleItem.plan_id = entity.id;
                        servPlanHandleItem.item_type = Convert.ToInt32(cnfirmArray[i]);
                        servPlanHandleItem.confirm_type = (int)PlanHandleTime.确警后;//确警后处置项
                        servPlanHandleItem.plan_type = (int)PlanType.设备预案;//设备预案
                        cnfirmPlanHandleItemList.Add(servPlanHandleItem);
                    }
                }

                if (defaultName != "")
                {
                    //向Serv_Plan_Person添加默认处置选项中其他责任人信息
                    string[] defaultNameArray = defaultName.Split(',');
                    string[] defaultPhoneArray = defaultPhone.Split(',');
                    string[] defaultCallArray = defaultIsCall.Split(',');
                    string[] defaultMessageArray = defaultIsMessage.Split(',');
                    for (int i = 0; i < defaultNameArray.Length; i++)
                    {
                        ServPlanPersonModel servPlanPerson = new ServPlanPersonModel();
                        //servPlanPerson.item_id = (int)DevicePlanDefaultOptions.通知其他负责人;
                        servPlanPerson.plan_type = (int)PlanType.设备预案;//设备预案
                        servPlanPerson.person_name = defaultNameArray[i];
                        servPlanPerson.person_phone_num = defaultPhoneArray[i];
                        servPlanPerson.is_call = Convert.ToInt32(defaultCallArray[i]);
                        servPlanPerson.is_message = Convert.ToInt32(defaultMessageArray[i]);
                        defaultPersonList.Add(servPlanPerson);
                    }
                }
                if (cnfirmName != "")
                {
                    //向Serv_Plan_Person添加确认处置选项中其他责任人信息
                    string[] cnfirmNameArray = cnfirmName.Split(',');
                    string[] cnfirmPhoneArray = cnfirmPhone.Split(',');
                    string[] cnfirmCallArray = cnfirmIsCall.Split(',');
                    string[] cnfirmMessageArray = cnfirmIsMessage.Split(',');
                    for (int i = 0; i < cnfirmNameArray.Length; i++)
                    {
                        ServPlanPersonModel servPlanPerson = new ServPlanPersonModel();
                        //servPlanPerson.item_id = (int)DevicePlanConfirmOptions.通知其他负责人;
                        servPlanPerson.plan_type = (int)PlanType.设备预案;//设备预案
                        servPlanPerson.person_name = cnfirmNameArray[i];
                        servPlanPerson.person_phone_num = cnfirmPhoneArray[i];
                        servPlanPerson.is_call = Convert.ToInt32(cnfirmCallArray[i]);
                        servPlanPerson.is_message = Convert.ToInt32(cnfirmMessageArray[i]);
                        cnfirmPlanPersonList.Add(servPlanPerson);
                    }
                }
                
                if (cameraId != "")
                {
                    //向Serv_Plan_HandleItemCamera添加摄像头信息
                    string[] cameraArray = cameraId.Split(',');
                    for (int i = 0; i < cameraArray.Length; i++)
                    {
                        ServPlanHandleItemCameraModel ServPlanHandleItemCamera = new ServPlanHandleItemCameraModel();
                       // ServPlanHandleItemCamera.handleitem_id = (int)DevicePlanDefaultOptions.关联摄像头;
                        ServPlanHandleItemCamera.device_id = Convert.ToInt32(cameraArray[i]);//设备id
                        servPlanHandleItemCameraList.Add(ServPlanHandleItemCamera);
                    }
                }

                 bool ISResult = devicePlanBll.AddDevicePlanInfo(entity, servExecutionTime,defaultPlanHandleItemList, cnfirmPlanHandleItemList, defaultPersonList, cnfirmPlanPersonList, servPlanHandleItemCameraList);

                return Json(new { status =0, msg = ISResult }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }
        /// <summary>
        /// 根据预案id获取预案信息
        /// </summary>
        /// <param name="devicePlanId"></param>
        /// <returns></returns>
        public JsonResult GetDevicePlanInfo(int devicePlanId)
        {
            try
            {
                int planType= (int)PlanType.设备预案;//设备预案
                return Json(new { status = 0, msg = devicePlanBll.GetDevicePlanInfo(devicePlanId, planType) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }
        /// <summary>
        /// 获取设备类型
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public JsonResult GetDeviceTypeById(int Id)
        {
            try
            {
                ServDeviceInfoModel DeviceInfo = deviceInfoBll.GetDeviceNameById(Id);
                if (DeviceInfo != null)
                {
                    return Json(DeviceInfo.device_type);
                }
                else
                {
                    return Json(-1);
                }
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        //设备预案修改
        public JsonResult UpdateDevicePlanData(int devicePlanId, string planName, int planLevel, int deviceId,string addCreateTime, string addEndTime, string cameraId, string defaultCbk, string cnfirmCbk, string defaultName, string defaultPhone, string cnfirmName, string cnfirmPhone, string cnfirmIsCall, string cnfirmIsMessage, string defaultIsCall, string defaultIsMessage, int fourColorLight,string executionCycle, int planStatus)
        {
            try
            {
                ServDevicePlanModel entity = new ServDevicePlanModel();
                //确警前处置项
                List<ServPlanHandleItemModel> defaultPlanHandleItemList = new List<ServPlanHandleItemModel>();
                //确警后处置项
                List<ServPlanHandleItemModel> cnfirmPlanHandleItemList = new List<ServPlanHandleItemModel>();
                //确警前人员信息
                List<ServPlanPersonModel> defaultPersonList = new List<ServPlanPersonModel>();
                //确警后人员信息
                List<ServPlanPersonModel> cnfirmPlanPersonList = new List<ServPlanPersonModel>();
                List<ServPlanHandleItemCameraModel> servPlanHandleItemCameraList = new List<Model.ServPlanHandleItemCameraModel>();
                //向Serv_Device_Plan添加预案基础信息
                entity.id = devicePlanId;
                entity.plan_name = planName;
                entity.plan_level = planLevel;
                entity.device_id = deviceId;
                entity.create_time = DateTime.Now;
                entity.update_time = DateTime.Now;
                entity.plan_status = planStatus;
                entity.person_id = 1;
                //向Serv_Execution_Time添加时间信息
                ServExecutionTimeModel servExecutionTime = new ServExecutionTimeModel();
                servExecutionTime.relate_id = devicePlanId;
                servExecutionTime.start_time = addCreateTime;
                servExecutionTime.end_time = addEndTime;
                servExecutionTime.execution_cycle = executionCycle;
                servExecutionTime.type = (int)PlanType.设备预案;
                //向Serv_Plan_HandleItem添加默认处置选项
                if (defaultCbk != "")
                {
                    string[] defaultArray = defaultCbk.Split(',');
                    for (int i = 0; i < defaultArray.Length; i++)
                    {
                        ServPlanHandleItemModel servPlanHandleItem = new ServPlanHandleItemModel();
                        servPlanHandleItem.plan_id = entity.id;
                        servPlanHandleItem.item_type = Convert.ToInt32(defaultArray[i]);
                        if (Convert.ToInt32(defaultArray[i]) == (int)DevicePlanDefaultOptions.控制中心声光蜂鸣器开启)
                        {
                            servPlanHandleItem.ext1 = fourColorLight.ToString();
                        }
                        servPlanHandleItem.confirm_type = (int)PlanHandleTime.确警前;//确警前默认处置项
                        servPlanHandleItem.plan_type = (int)PlanType.设备预案;//设备预案
                        defaultPlanHandleItemList.Add(servPlanHandleItem);
                    }
                }
                if (cnfirmCbk != "")
                {
                    //向Serv_Plan_HandleItem添加确认处置选项
                    string[] cnfirmArray = cnfirmCbk.Split(',');
                    for (int i = 0; i < cnfirmArray.Length; i++)
                    {
                        ServPlanHandleItemModel servPlanHandleItem = new ServPlanHandleItemModel();
                        servPlanHandleItem.plan_id = entity.id;
                        servPlanHandleItem.item_type = Convert.ToInt32(cnfirmArray[i]);
                        servPlanHandleItem.confirm_type = (int)PlanHandleTime.确警后;//确警后处置项
                        servPlanHandleItem.plan_type = (int)PlanType.设备预案;//设备预案
                        cnfirmPlanHandleItemList.Add(servPlanHandleItem);
                    }
                }

                if (defaultName != "")
                {
                    //向Serv_Plan_Person添加默认处置选项中其他责任人信息
                    string[] defaultNameArray = defaultName.Split(',');
                    string[] defaultPhoneArray = defaultPhone.Split(',');
                    string[] defaultCallArray = defaultIsCall.Split(',');
                    string[] defaultMessageArray = defaultIsMessage.Split(',');
                    for (int i = 0; i < defaultNameArray.Length; i++)
                    {
                        ServPlanPersonModel servPlanPerson = new ServPlanPersonModel();
                        servPlanPerson.plan_type = (int)PlanType.设备预案;//设备预案
                        servPlanPerson.person_name = defaultNameArray[i];
                        servPlanPerson.person_phone_num = defaultPhoneArray[i];
                        servPlanPerson.is_call = Convert.ToInt32(defaultCallArray[i]);
                        servPlanPerson.is_message = Convert.ToInt32(defaultMessageArray[i]);
                        defaultPersonList.Add(servPlanPerson);
                    }
                }
                if (cnfirmName != "")
                {
                    //向Serv_Plan_Person添加确认处置选项中其他责任人信息
                    string[] cnfirmNameArray = cnfirmName.Split(',');
                    string[] cnfirmPhoneArray = cnfirmPhone.Split(',');
                    string[] cnfirmCallArray = cnfirmIsCall.Split(',');
                    string[] cnfirmMessageArray = cnfirmIsMessage.Split(',');
                    for (int i = 0; i < cnfirmNameArray.Length; i++)
                    {
                        ServPlanPersonModel servPlanPerson = new ServPlanPersonModel();
                        servPlanPerson.plan_type = (int)PlanType.设备预案;//设备预案
                        servPlanPerson.person_name = cnfirmNameArray[i];
                        servPlanPerson.person_phone_num = cnfirmPhoneArray[i];
                        servPlanPerson.is_call = Convert.ToInt32(cnfirmCallArray[i]);
                        servPlanPerson.is_message = Convert.ToInt32(cnfirmMessageArray[i]);
                        cnfirmPlanPersonList.Add(servPlanPerson);
                    }
                }

                if (cameraId != "")
                {
                    //向Serv_Plan_HandleItemCamera添加摄像头信息
                    string[] cameraArray = cameraId.Split(',');
                    for (int i = 0; i < cameraArray.Length; i++)
                    {
                        ServPlanHandleItemCameraModel ServPlanHandleItemCamera = new ServPlanHandleItemCameraModel();
                        ServPlanHandleItemCamera.device_id = Convert.ToInt32(cameraArray[i]);//设备id
                        servPlanHandleItemCameraList.Add(ServPlanHandleItemCamera);
                    }
                }

                bool ISResult = devicePlanBll.UpdateDevicePlanInfo(entity, servExecutionTime, defaultPlanHandleItemList, cnfirmPlanHandleItemList, defaultPersonList, cnfirmPlanPersonList, servPlanHandleItemCameraList);

                return Json(new { status = 0, msg = ISResult }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 获取楼内图信息
        /// </summary>
        /// <param name="deviceId"></param>
        /// <returns></returns>
        public JsonResult GetMapBuildingInfo(int deviceId)
        {
            try
            {
                JavaScriptSerializer tojson = new JavaScriptSerializer();
                List<BaseRegionConfigModel> baseRegionConfigModelList = baseMapConfigBLL.GetAllRegionConfig();
                int regionID = 0;
                if (baseRegionConfigModelList.Count > 0)
                {
                    regionID = baseRegionConfigModelList[0].id;
                }
                var maptype=baseMapConfigBLL.GetRegionConfigModelByID(regionID);
                //var maptype = baseMapConfigBLL.GetMapEngine(Server.MapPath("/ConfigFile/map/mapConfig.xml"));
                ServFloorInfoModel model = deviceInfoBll.GetMapBuildingInfo(deviceId, maptype);
                if(model!=null)
                {
                    return Json(model);
                }
                else
                {
                    return Json("");
                }
            }
             catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 修改设备预案状态
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="planStatus"></param>
        /// <returns></returns>
        public JsonResult UpdateDevicePlanStatus(int Id,string planStatus,int eventRegion)
        {
            try
            {
                bool result= devicePlanBll.UpdateDevicePlanStatus(Id, planStatus, eventRegion);
                return Json(result);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        #region  预案条例管理
        /// <summary>
        /// 获取预案条例列表
        /// </summary>
        /// <param name="pageIndex">页数</param>
        /// <param name="pageSize">每页有多少行</param>
        /// <param name="planName">预案名称</param>
        /// <param name="createTime">创建时间</param>
        /// <param name="endTime">结束时间</param>
        /// <returns></returns>
        public ActionResult GetPlanOrdinanc(int pageIndex, int pageSize, string ordinancesName,int ordinancesType, string createTime, string endTime)
        {
            ServPlanRegulationQuery servPlanRegulationQuery = new ServPlanRegulationQuery();
            if (ordinancesName != "")
            {
                servPlanRegulationQuery.reg_name = ordinancesName;
            }
            if (createTime != "")
            {
                servPlanRegulationQuery.create_time = createTime;
            }
            if (ordinancesType != -1)
            {
                servPlanRegulationQuery.reg_type = ordinancesType;
            }
            if (endTime != "")
            {
                servPlanRegulationQuery.end_time = endTime;
            }
            int totalNumber = 0;
            List<PlanRegulationModel> planRegulationList = new List<PlanRegulationModel>();
            try
            {
                planRegulationList = servPlanRegulationBLL.GetEntities(servPlanRegulationQuery, pageIndex, pageSize, out totalNumber);
                var temp = new { total = totalNumber, rows = planRegulationList.OrderByDescending(n => n.id).ToList() };
                return Json(new { status = 0, msg = temp }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 获取条例类型
        /// </summary>
        /// <returns></returns>
        public JsonResult GetOrdinanceType(int Id)
        {
            try
            {
                List<BaseEventTypeModel> EventType = baseEventTypeBLL.GetChildEventType(Id);
                return Json(new { status = 0, msg = EventType }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 删除预案条例
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public JsonResult planOrdinancById(int Id)
        {
            try
            {
                bool result = false;
                result = servPlanRegulationBLL.DeltePlanRegulation(Id);
                return Json(new { status = 0, msg = result }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 添加预案条例
        /// </summary>
        /// <param name="addRegType"></param>
        /// <param name="addRegLevel"></param>
        /// <param name="addRegName"></param>
        /// <param name="addRegKeyword"></param>
        /// <param name="addRegItems"></param>
        /// <returns></returns>
        public JsonResult AddPlanOrdinance(int addRegType, int addRegLevel, string addRegName, string addRegKeyword, string addRegItems)
        {
            try
            {
                
                //向预案条例中添加数据
                ServPlanRegulationModel PlanRegulation = new ServPlanRegulationModel();
                PlanRegulation.create_time = DateTime.Now;
                PlanRegulation.keyword = addRegKeyword;
                PlanRegulation.reg_level = addRegLevel;
                PlanRegulation.keyword = addRegKeyword;
                PlanRegulation.reg_name = addRegName;
                PlanRegulation.reg_type = addRegType;
                PlanRegulation.update_time = DateTime.Now;
                //向文件表中添加数据
                List<ServFileInfoModel> Node = JsonConvert.DeserializeObject<List<ServFileInfoModel>>(addRegItems);
                var picture = ".bmp,.jpg,.jpeg,.tiff,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF";//图片格式
                var video = ".avi,.rmvb,.rm,.asf,.divx,.mpg,.mpeg,.mpe,.wmv,.mkv,.mp4,.vob,.dat,.vcd,.svcd,.mov,.qt,.mpfg,.flv,.3gp,.xvid";//视频格式
                var excel = ".xlsx,.xls,.xlsm,.xlsb,xltx,.xltm,.xlt,.xlam,.xla";//excel格式
                List<ServFileInfoModel> ServFileInfoList = new List<ServFileInfoModel>();
                for (int i = 0; i < Node.Count; i++)
                {
                    ServFileInfoModel FileInfo = new ServFileInfoModel();
                    FileInfo.file_name = Node[i].file_name;
                    if (picture.IndexOf(Node[i].file_ext_name) > -1)
                    {
                        FileInfo.file_type = (int)EnumClass.FileType.图片;
                    }
                    else if (video.IndexOf(Node[i].file_ext_name) > -1)
                    {
                        FileInfo.file_type = (int)EnumClass.FileType.视频;
                    }

                    else if (excel.IndexOf(Node[i].file_ext_name) > -1)
                    {
                        FileInfo.file_type = (int)EnumClass.FileType.Excel;
                    }
                    else
                    {
                        FileInfo.file_type = (int)EnumClass.FileType.文件;
                    }
                    FileInfo file = new FileInfo(Server.MapPath(Node[i].file_address));
                    string timeInfo = DateTime.Now.ToString("yyyyMMdd");
                    string localPath = "/upload/planRegulations/" + timeInfo + "/";
                    string newFilePath = Server.MapPath(localPath + file.Name);
                    string localPaths = Server.MapPath(localPath);
                    if (!System.IO.Directory.Exists(localPaths))
                    {
                        System.IO.Directory.CreateDirectory(localPaths);
                    }
                    if (file.Exists)
                    {
                        file.MoveTo(newFilePath); //移动单个文件
                        FileInfo.file_address = localPath + file.Name;
                    }
                    else
                    {
                        return Json(new { status = 1, msg = "未找到上传的文件" }, JsonRequestBehavior.AllowGet);
                    }
                    FileInfo.file_ext_name = Node[i].file_ext_name;
                    FileInfo.content = Node[i].content;
                    FileInfo.create_time = Node[i].create_time;
                    ServFileInfoList.Add(FileInfo);
                }

                bool ISResult = servPlanRegulationBLL.AddPlanRegulation(PlanRegulation, ServFileInfoList);
                return Json(new { status = 0, msg = ISResult }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 修改预案条例
        /// </summary>
        /// <param name="addRegType"></param>
        /// <param name="addRegLevel"></param>
        /// <param name="addRegName"></param>
        /// <param name="addRegKeyword"></param>
        /// <param name="addRegItems"></param>
        /// <returns></returns>
        public JsonResult UpdatePlanOrdinance(int Id,int addRegType, int addRegLevel, string addRegName, string addRegKeyword, string addRegItems)
        {
            try
            {

                //向预案条例中添加数据
                ServPlanRegulationModel PlanRegulation = new ServPlanRegulationModel();
                PlanRegulation.id = Id;
                //PlanRegulation.create_time = DateTime.Now;
                PlanRegulation.keyword = addRegKeyword;
                PlanRegulation.reg_level = addRegLevel;
                PlanRegulation.keyword = addRegKeyword;
                PlanRegulation.reg_name = addRegName;
                PlanRegulation.reg_type = addRegType;
                PlanRegulation.update_time = DateTime.Now;
                //向文件表中添加数据
                List<ServFileInfoModel> Node = JsonConvert.DeserializeObject<List<ServFileInfoModel>>(addRegItems);
             
                List<ServFileInfoModel> FileInfoList = servPlanRegulationBLL.GetFileinfo(Id);
                var address = "";
                var picture = ".bmp,.jpg,.jpeg,.tiff,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF";//图片格式
                var video = ".avi,.rmvb,.rm,.asf,.divx,.mpg,.mpeg,.mpe,.wmv,.mkv,.mp4,.vob,.dat,.vcd,.svcd,.mov,.qt,.mpfg,.flv,.3gp,.xvid";//视频格式
                var excel = ".xlsx,.xls,.xlsm,.xlsb,xltx,.xltm,.xlt,.xlam,.xla";//excel格式
                List<ServFileInfoModel> ServFileInfoList = new List<ServFileInfoModel>();
                
                for (int i = 0; i < Node.Count; i++)
                {
                    ServFileInfoModel FileInfo = new ServFileInfoModel();
                    FileInfo.file_name = Node[i].file_name;
                    if (picture.IndexOf(Node[i].file_ext_name) > -1)
                    {
                        FileInfo.file_type = (int)EnumClass.FileType.图片;
                    }
                    else if (video.IndexOf(Node[i].file_ext_name) > -1)
                    {
                        FileInfo.file_type = (int)EnumClass.FileType.视频;
                    }

                    else if (excel.IndexOf(Node[i].file_ext_name) > -1)
                    {
                        FileInfo.file_type = (int)EnumClass.FileType.Excel;
                    }
                    else
                    {
                        FileInfo.file_type = (int)EnumClass.FileType.文件;
                    }
                    FileInfo file = new FileInfo(Server.MapPath(Node[i].file_address));
                    string timeInfo = DateTime.Now.ToString("yyyyMMdd");
                    string localPath = "/upload/planRegulations/" + timeInfo + "/";
                    string newFilePath = Server.MapPath(localPath + file.Name);
                    string localPaths = Server.MapPath(localPath);
                    if (!System.IO.Directory.Exists(localPaths))
                    {
                        System.IO.Directory.CreateDirectory(localPaths);
                    }
                    if (file.Exists)
                    {
                        file.MoveTo(newFilePath); //移动单个文件
                        FileInfo.file_address = localPath + file.Name;
                    }
                    else
                    {
                        return Json(new { status = 1, msg = "未找到上传的文件" }, JsonRequestBehavior.AllowGet);
                    }
                    FileInfo.file_ext_name = Node[i].file_ext_name;
                    FileInfo.content = Node[i].content;
                    FileInfo.create_time = Node[i].create_time;
                    address+= FileInfo.file_address + ",";
                    ServFileInfoList.Add(FileInfo);
                }
               
                bool ISResult = servPlanRegulationBLL.UpdatePlanRegulation(PlanRegulation, ServFileInfoList);
                if(ISResult==true)
                {
                    for (var d = 0; d < FileInfoList.Count; d++)
                    {
                        if (address.IndexOf(FileInfoList[d].file_address) < 0)
                        {
                            FileInfo file = new FileInfo(Server.MapPath(FileInfoList[d].file_address));
                            if (file.Exists)
                            {
                                file.Delete(); //删除单个文件
                            }
                        }
                    }

                }
                return Json(new { status = 0, msg = ISResult }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 获取预案条例
        /// </summary>
        /// <param name="RegId"></param>
        /// <returns></returns>
        public JsonResult  GetPlanRegulations(int RegId)
        {
            try
            {
                return Json(new { status = 0, msg = servPlanRegulationBLL.GetPlanRegulations(RegId) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        #endregion
        #region 事件预案管理
        #region  事件预案列表展示
        public ActionResult GetEventPlanList(int pageIndex, int pageSize, string planName, string createTime, string endTime,int[] eventRegion)
        {
            ServEventPlanQuery eventPlanQuery = new ServEventPlanQuery();
            if (planName != "")
            {
                eventPlanQuery.plan_name = planName;
            }
            if (createTime != "")
            {
                eventPlanQuery.create_time = createTime;
            }
            if (endTime != "")
            {
                eventPlanQuery.Endtime = endTime;
            }
            if (eventRegion != null && eventRegion.Length > 0)
            {
                eventPlanQuery.eventRegion = eventRegion;
            }
            else
            {
                eventPlanQuery.eventRegion = null;
            }
            int totalNumber = 0;
            List<EventPlanInfo> devicePlanInfoList = new List<EventPlanInfo>();
            try
            {
                devicePlanInfoList = ServEventPlanBLL.GetEntities(eventPlanQuery, pageIndex, pageSize, out totalNumber);
                var temp = new { total = totalNumber, rows = devicePlanInfoList.OrderByDescending(n => n.id).ToList() };
                return Json(new { status = 0, msg = temp }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet); 
            }
            //catch ()
            //{
            //}
        }
        #endregion
        /// <summary>
        /// 修改事件预案状态
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="planStatus"></param>
        /// <returns></returns>
        public JsonResult UpdateEventPlanStatus(int Id, string planStatus,int eventRegion)
        {
            try
            {
                bool result = ServEventPlanBLL.UpdateEventPlanStatus(Id, planStatus, eventRegion);
                return Json(new { status =0, msg = result }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 查看园区中是否存在事件预案
        /// </summary>
        /// <param name="eventRegion"></param>
        /// <returns></returns>
        public JsonResult SeeIfThePlanExists(int eventRegion)
        {
            try
            {
                bool result = ServEventPlanBLL.SeeIfThePlanExists(eventRegion);
                return Json(new { status = 0, msg = result }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 查看园区中是否存在设备预案
        /// </summary>
        /// <param name="eventRegion"></param>
        /// <returns></returns>
        public JsonResult SeeIfTheDevicePlanExists(int eventRegion)
        {
            try
            {
                bool result = devicePlanBll.SeeIfThePlanExists(eventRegion);
                return Json(new { status = 0, msg = result }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 删除事件预案信息
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public JsonResult DelEventPlanByID(string Id)
        {
            try
            {
                bool result = false;
                result = ServEventPlanBLL.DelteEventPlan(Id);
                return Json(new { status =0, msg = result }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 获取事发园区
        /// </summary>
        /// <returns></returns>
        public JsonResult GetEventRegion()
        {
            try
            {
                List<BaseRegionConfigModel> EventRegion = baseRegionConfigBLL.GetAllRegionConfig();
                return Json(new { status = 0, msg = EventRegion }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 事件预案检测时间被占用吗？
        /// </summary>
        /// <param name="eventPlanId"></param>
        /// <param name="eventTypeId"></param>
        /// <param name="regionId"></param>
        /// <param name="planTime"></param>
        /// <param name="executionCycle"></param>
        /// <param name="addEndTime"></param>
        /// <returns></returns>
        public JsonResult CheckPlanTimeOccupied(int eventPlanId, int eventTypeId, int regionId, string planTime, string executionCycle,string addEndTime)
        {
            try
            {
                List<EventPlanInfo> result = ServEventPlanBLL.CheckPlanTimeOccupied(eventPlanId, eventTypeId, regionId, planTime, executionCycle, addEndTime);
                if (result.Count()>0)
                {
                    return Json(new { status = 0, msg = result }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = 0, msg = true }, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }
        /// <summary>
        /// 添加事件预案
        /// </summary>
        /// <param name="planName">预案名称</param>
        /// <param name="eventType">事件类型</param>
        /// <param name="eventRegion">是发园区</param>
        /// <param name="planLevel">事件等级</param>
        /// <param name="addCreateTime">开始时间</param>
        /// <param name="addEndTime">结束时间</param>
        /// <param name="executionCycle">时间表达式</param>
        /// <param name="defaultCbk">确警前处置项</param>
        /// <param name="cnfirmCbk">确警前处置后</param>
        /// <param name="defaultName">确警前责任人姓名</param>
        /// <param name="defaultPhone">确警前责任人电话</param>
        /// <param name="cnfirmName">确警前后责任人姓名</param>
        /// <param name="cnfirmPhone">确警后责任人电话</param>
        /// <param name="cnfirmIsCall">是否打电话</param>
        /// <param name="cnfirmIsMessage">是否发短信</param>
        /// <param name="defaultIsCall">是否打电话</param>
        /// <param name="defaultIsMessage">是否发短信</param>
        /// <param name="fourColorLight">四色灯颜色</param>
        /// <param name="inBuilding">楼内</param>
        /// <param name="outBuilding">楼外</param>
        /// <param name="Distance">打开摄像头范围</param>
        /// <param name="outCamera">楼外打开摄像机个数</param>
        /// <param name="inCamera">楼内打开摄像机个数</param>
        /// <returns></returns>
        public JsonResult InsetEventPlanData(string planName,int eventType,int eventRegion, int planLevel, string addCreateTime, string addEndTime, string executionCycle, string defaultCbk, string cnfirmCbk, string defaultName, string defaultPhone, string cnfirmName, string cnfirmPhone, string cnfirmIsCall, string cnfirmIsMessage, string defaultIsCall, string defaultIsMessage, int fourColorLight,string inBuilding,string outBuilding,string Distance,string outCamera,string inCamera)
        {
            try
            {
                ServEventPlanModel entity = new ServEventPlanModel();
                //确警前处置项
                List<ServPlanHandleItemModel> defaultPlanHandleItemList = new List<ServPlanHandleItemModel>();
                //确警后处置项
                List<ServPlanHandleItemModel> cnfirmPlanHandleItemList = new List<ServPlanHandleItemModel>();
                //确警前人员信息
                List<ServPlanPersonModel> defaultPersonList = new List<ServPlanPersonModel>();
                //确警后人员信息
                List<ServPlanPersonModel> cnfirmPlanPersonList = new List<ServPlanPersonModel>();
                List<ServPlanHandleItemCameraModel> servPlanHandleItemCameraList = new List<Model.ServPlanHandleItemCameraModel>();
                int p_id = 1000;
                ServEventPlanModel eventPlan = ServEventPlanBLL.GetLastEventPlan();
                if (eventPlan != null)
                {
                    p_id = Convert.ToInt32(eventPlan.plan_code);
                }
                //向Serv_Event_Plan添加预案基础信息
                entity.plan_code = p_id + 1;
                entity.plan_name = planName;
                entity.plan_level = planLevel;
                entity.region_id = eventRegion;
                entity.event_type = eventType;
                entity.create_time = DateTime.Now;
                entity.update_time = DateTime.Now;
                entity.plan_status = (int)PlanStatus.启用;
                entity.person_id = 1;
                //向Serv_Execution_Time添加时间信息
                ServExecutionTimeModel servExecutionTime = new ServExecutionTimeModel();
                servExecutionTime.start_time =addCreateTime;
                servExecutionTime.end_time = addEndTime;
                servExecutionTime.execution_cycle = executionCycle;
                servExecutionTime.type = (int)PlanType.事件预案;
                //向Serv_Plan_HandleItem添加默认处置选项
                if (defaultCbk != "")
                {
                    string[] defaultArray = defaultCbk.Split(',');
                    for (int i = 0; i < defaultArray.Length; i++)
                    {

                        if (Convert.ToInt32(defaultArray[i]) == (int)EventPlanDefaultOptions.打开周围摄像头)
                        {
                            if (!string.IsNullOrEmpty(outBuilding))
                            {
                                ServPlanHandleItemModel servPlanHandleItem = new ServPlanHandleItemModel();
                                servPlanHandleItem.plan_id = entity.id;
                                servPlanHandleItem.item_type = Convert.ToInt32(defaultArray[i]);
                                servPlanHandleItem.confirm_type = (int)PlanHandleTime.确警前;//确警前默认处置项
                                servPlanHandleItem.plan_type = (int)PlanType.事件预案;//事件预案
                                servPlanHandleItem.ext2 = ((int)CameraPosition.楼外).ToString();
                                servPlanHandleItem.ext3 = Distance;
                                servPlanHandleItem.ext4 = outCamera;
                                defaultPlanHandleItemList.Add(servPlanHandleItem);

                            }
                            if (!string.IsNullOrEmpty(inBuilding))
                            {
                                ServPlanHandleItemModel servPlanHandleItem = new ServPlanHandleItemModel();
                                servPlanHandleItem.plan_id = entity.id;
                                servPlanHandleItem.item_type = Convert.ToInt32(defaultArray[i]);
                                servPlanHandleItem.confirm_type = (int)PlanHandleTime.确警前;//确警前默认处置项
                                servPlanHandleItem.plan_type = (int)PlanType.事件预案;//事件预案
                                servPlanHandleItem.ext2 = ((int)CameraPosition.楼内).ToString();
                                servPlanHandleItem.ext4 = inCamera;
                                defaultPlanHandleItemList.Add(servPlanHandleItem);
                            }
                        }
                        else
                        {
                            ServPlanHandleItemModel servPlanHandleItem = new ServPlanHandleItemModel();
                            servPlanHandleItem.plan_id = entity.id;
                            servPlanHandleItem.item_type = Convert.ToInt32(defaultArray[i]);
                            servPlanHandleItem.confirm_type = (int)PlanHandleTime.确警前;//确警前默认处置项
                            servPlanHandleItem.plan_type = (int)PlanType.事件预案;//事件预案
                            if (Convert.ToInt32(defaultArray[i]) == (int)EventPlanDefaultOptions.控制中心声光蜂鸣器开启)
                            {
                                servPlanHandleItem.ext1 = fourColorLight.ToString();
                            }
                            defaultPlanHandleItemList.Add(servPlanHandleItem);
                        }

                    }
                }
                if (cnfirmCbk != "")
                {
                    //向Serv_Plan_HandleItem添加确认处置选项
                    string[] cnfirmArray = cnfirmCbk.Split(',');
                    for (int i = 0; i < cnfirmArray.Length; i++)
                    {
                        ServPlanHandleItemModel servPlanHandleItem = new ServPlanHandleItemModel();
                        servPlanHandleItem.plan_id = entity.id;
                        servPlanHandleItem.item_type = Convert.ToInt32(cnfirmArray[i]);
                        servPlanHandleItem.confirm_type = (int)PlanHandleTime.确警后;//确警后处置项
                        servPlanHandleItem.plan_type = (int)PlanType.事件预案;//事件预案
                        cnfirmPlanHandleItemList.Add(servPlanHandleItem);
                    }
                }

                if (defaultName != "")
                {
                    //向Serv_Plan_Person添加默认处置选项中其他责任人信息
                    string[] defaultNameArray = defaultName.Split(',');
                    string[] defaultPhoneArray = defaultPhone.Split(',');
                    string[] defaultCallArray = defaultIsCall.Split(',');
                    string[] defaultMessageArray = defaultIsMessage.Split(',');
                    for (int i = 0; i < defaultNameArray.Length; i++)
                    {
                        ServPlanPersonModel servPlanPerson = new ServPlanPersonModel();
                        //servPlanPerson.item_id = (int)DevicePlanDefaultOptions.通知其他负责人;
                        servPlanPerson.plan_type = (int)PlanType.事件预案;//事件预案
                        servPlanPerson.person_name = defaultNameArray[i];
                        servPlanPerson.person_phone_num = defaultPhoneArray[i];
                        servPlanPerson.is_call = Convert.ToInt32(defaultCallArray[i]);
                        servPlanPerson.is_message = Convert.ToInt32(defaultMessageArray[i]);
                        defaultPersonList.Add(servPlanPerson);
                    }
                }
                if (cnfirmName != "")
                {
                    //向Serv_Plan_Person添加确认处置选项中其他责任人信息
                    string[] cnfirmNameArray = cnfirmName.Split(',');
                    string[] cnfirmPhoneArray = cnfirmPhone.Split(',');
                    string[] cnfirmCallArray = cnfirmIsCall.Split(',');
                    string[] cnfirmMessageArray = cnfirmIsMessage.Split(',');
                    for (int i = 0; i < cnfirmNameArray.Length; i++)
                    {
                        ServPlanPersonModel servPlanPerson = new ServPlanPersonModel();
                        //servPlanPerson.item_id = (int)DevicePlanConfirmOptions.通知其他负责人;
                        servPlanPerson.plan_type = (int)PlanType.事件预案;//事件预案
                        servPlanPerson.person_name = cnfirmNameArray[i];
                        servPlanPerson.person_phone_num = cnfirmPhoneArray[i];
                        servPlanPerson.is_call = Convert.ToInt32(cnfirmCallArray[i]);
                        servPlanPerson.is_message = Convert.ToInt32(cnfirmMessageArray[i]);
                        cnfirmPlanPersonList.Add(servPlanPerson);
                    }
                }
                bool ISResult = ServEventPlanBLL.AddEventPlanInfo(entity, servExecutionTime, defaultPlanHandleItemList, cnfirmPlanHandleItemList, defaultPersonList, cnfirmPlanPersonList);
                return Json(new { status =0, msg = ISResult }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }


        /// <summary>
        /// 根据预案id获取预案信息
        /// </summary>
        /// <param name="eventPlanId"></param>
        /// <returns></returns>
        public JsonResult GetEventPlanInfo(int eventPlanId)
        {
            try
            {
                int planType = (int)PlanType.事件预案;//设备预案
                return Json(new { status = 0, msg = ServEventPlanBLL.GetEventPlanInfo(eventPlanId, planType) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }
        /// <summary>
        /// 修改事件预案
        /// </summary>
        /// <param name="eventPlanId"></param>
        /// <param name="planName"></param>
        /// <param name="eventType"></param>
        /// <param name="eventRegion"></param>
        /// <param name="planLevel"></param>
        /// <param name="addCreateTime"></param>
        /// <param name="addEndTime"></param>
        /// <param name="executionCycle"></param>
        /// <param name="defaultCbk"></param>
        /// <param name="cnfirmCbk"></param>
        /// <param name="defaultName"></param>
        /// <param name="defaultPhone"></param>
        /// <param name="cnfirmName"></param>
        /// <param name="cnfirmPhone"></param>
        /// <param name="cnfirmIsCall"></param>
        /// <param name="cnfirmIsMessage"></param>
        /// <param name="defaultIsCall"></param>
        /// <param name="defaultIsMessage"></param>
        /// <param name="fourColorLight"></param>
        /// <param name="inBuilding"></param>
        /// <param name="outBuilding"></param>
        /// <param name="Distance"></param>
        /// <param name="outCamera"></param>
        /// <param name="inCamera"></param>
        /// <returns></returns>
        public JsonResult UpdateEventPlanData(int eventPlanId, string planName, int eventType, int eventRegion, int planLevel, string addCreateTime, string addEndTime, string executionCycle, string defaultCbk, string cnfirmCbk, string defaultName, string defaultPhone, string cnfirmName, string cnfirmPhone, string cnfirmIsCall, string cnfirmIsMessage, string defaultIsCall, string defaultIsMessage, int fourColorLight, string inBuilding, string outBuilding, string Distance, string outCamera, string inCamera,int planStatus)
        {
            try
            {
                ServEventPlanModel entity = new ServEventPlanModel();
                ServExecutionTimeModel servExecutionTime = new ServExecutionTimeModel();
                //确警前处置项
                List<ServPlanHandleItemModel> defaultPlanHandleItemList = new List<ServPlanHandleItemModel>();
                //确警后处置项
                List<ServPlanHandleItemModel> cnfirmPlanHandleItemList = new List<ServPlanHandleItemModel>();
                //确警前人员信息
                List<ServPlanPersonModel> defaultPersonList = new List<ServPlanPersonModel>();
                //确警后人员信息
                List<ServPlanPersonModel> cnfirmPlanPersonList = new List<ServPlanPersonModel>();
                //向Serv_Device_Plan添加预案基础信息
                entity.id = eventPlanId;
                //向Serv_Event_Plan添加预案基础信息
                entity.plan_name = planName;
                entity.plan_level = planLevel;
                entity.region_id = eventRegion;
                entity.event_type = eventType;
                entity.create_time = DateTime.Now;
                entity.update_time = DateTime.Now;
                entity.plan_status = planStatus;
                entity.person_id = 1;
                //向Serv_Execution_Time添加时间信息
                servExecutionTime.relate_id = entity.id;
                servExecutionTime.start_time = addCreateTime;
                servExecutionTime.end_time = addEndTime;
                servExecutionTime.execution_cycle = executionCycle;
                servExecutionTime.type = (int)PlanType.事件预案;
                //向Serv_Plan_HandleItem添加默认处置选项
                if (defaultCbk != "")
                { 
                    string[] defaultArray = defaultCbk.Split(',');
                    for (int i = 0; i < defaultArray.Length; i++)
                    {
                       
                        if (Convert.ToInt32(defaultArray[i]) == (int)EventPlanDefaultOptions.打开周围摄像头)
                        {
                            if (!string.IsNullOrEmpty(outBuilding))
                            {
                                ServPlanHandleItemModel servPlanHandleItem = new ServPlanHandleItemModel();
                                servPlanHandleItem.plan_id = entity.id;
                                servPlanHandleItem.item_type = Convert.ToInt32(defaultArray[i]);
                                servPlanHandleItem.confirm_type = (int)PlanHandleTime.确警前;//确警前默认处置项
                                servPlanHandleItem.plan_type = (int)PlanType.事件预案;//事件预案
                                servPlanHandleItem.ext2 = ((int)CameraPosition.楼外).ToString();
                                servPlanHandleItem.ext3 = Distance;
                                servPlanHandleItem.ext4 = outCamera;
                                defaultPlanHandleItemList.Add(servPlanHandleItem);

                            }
                            if (!string.IsNullOrEmpty(inBuilding))
                            {
                                ServPlanHandleItemModel servPlanHandleItem = new ServPlanHandleItemModel();
                                servPlanHandleItem.plan_id = entity.id;
                                servPlanHandleItem.item_type = Convert.ToInt32(defaultArray[i]);
                                servPlanHandleItem.confirm_type = (int)PlanHandleTime.确警前;//确警前默认处置项
                                servPlanHandleItem.plan_type = (int)PlanType.事件预案;//事件预案
                                servPlanHandleItem.ext2 = ((int)CameraPosition.楼内).ToString();
                                servPlanHandleItem.ext4 = inCamera;
                                defaultPlanHandleItemList.Add(servPlanHandleItem);
                            }
                        }
                        else
                        {
                            ServPlanHandleItemModel servPlanHandleItem = new ServPlanHandleItemModel();
                            servPlanHandleItem.plan_id = entity.id;
                            servPlanHandleItem.item_type = Convert.ToInt32(defaultArray[i]);
                            servPlanHandleItem.confirm_type = (int)PlanHandleTime.确警前;//确警前默认处置项
                            servPlanHandleItem.plan_type = (int)PlanType.事件预案;//事件预案
                            if (Convert.ToInt32(defaultArray[i]) == (int)EventPlanDefaultOptions.控制中心声光蜂鸣器开启)
                            {
                                servPlanHandleItem.ext1 = fourColorLight.ToString();
                            }
                            defaultPlanHandleItemList.Add(servPlanHandleItem);
                        }
                      
                    }
                }
                if (cnfirmCbk != "")
                {
                    //向Serv_Plan_HandleItem添加确认处置选项
                    string[] cnfirmArray = cnfirmCbk.Split(',');
                    for (int i = 0; i < cnfirmArray.Length; i++)
                    {
                        ServPlanHandleItemModel servPlanHandleItem = new ServPlanHandleItemModel();
                        servPlanHandleItem.plan_id = entity.id;
                        servPlanHandleItem.item_type = Convert.ToInt32(cnfirmArray[i]);
                        servPlanHandleItem.confirm_type = (int)PlanHandleTime.确警后;//确警后处置项
                        servPlanHandleItem.plan_type = (int)PlanType.事件预案;//设备预案
                        cnfirmPlanHandleItemList.Add(servPlanHandleItem);
                    }
                }

                if (defaultName != "")
                {
                    //向Serv_Plan_Person添加默认处置选项中其他责任人信息
                    string[] defaultNameArray = defaultName.Split(',');
                    string[] defaultPhoneArray = defaultPhone.Split(',');
                    string[] defaultCallArray = defaultIsCall.Split(',');
                    string[] defaultMessageArray = defaultIsMessage.Split(',');
                    for (int i = 0; i < defaultNameArray.Length; i++)
                    {
                        ServPlanPersonModel servPlanPerson = new ServPlanPersonModel();
                        servPlanPerson.plan_type = (int)PlanType.事件预案;
                        servPlanPerson.person_name = defaultNameArray[i];
                        servPlanPerson.person_phone_num = defaultPhoneArray[i];
                        servPlanPerson.is_call = Convert.ToInt32(defaultCallArray[i]);
                        servPlanPerson.is_message = Convert.ToInt32(defaultMessageArray[i]);
                        defaultPersonList.Add(servPlanPerson);
                    }
                }
                if (cnfirmName != "")
                {
                    //向Serv_Plan_Person添加确认处置选项中其他责任人信息
                    string[] cnfirmNameArray = cnfirmName.Split(',');
                    string[] cnfirmPhoneArray = cnfirmPhone.Split(',');
                    string[] cnfirmCallArray = cnfirmIsCall.Split(',');
                    string[] cnfirmMessageArray = cnfirmIsMessage.Split(',');
                    for (int i = 0; i < cnfirmNameArray.Length; i++)
                    {
                        ServPlanPersonModel servPlanPerson = new ServPlanPersonModel();
                        servPlanPerson.plan_type = (int)PlanType.事件预案;//设备预案
                        servPlanPerson.person_name = cnfirmNameArray[i];
                        servPlanPerson.person_phone_num = cnfirmPhoneArray[i];
                        servPlanPerson.is_call = Convert.ToInt32(cnfirmCallArray[i]);
                        servPlanPerson.is_message = Convert.ToInt32(cnfirmMessageArray[i]);
                        cnfirmPlanPersonList.Add(servPlanPerson);
                    }
                }
                bool ISResult = ServEventPlanBLL.UpdateEventPlanInfo(entity, servExecutionTime, defaultPlanHandleItemList, cnfirmPlanHandleItemList, defaultPersonList, cnfirmPlanPersonList);
                return Json(new { status = 0, message = ISResult }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, message = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }

        /// <summary>
        /// 获取条例文档
        /// </summary>
        /// <param name="eventType"></param>
        /// <returns></returns>
        public JsonResult GetPlanDocument(int eventType)
        {
           
            try
            {
                List<ServFileInfoModel> fileInfolist = servPlanRegulationBLL.GetPlanDocument(eventType);
                return Json(new { status = 0, msg = fileInfolist }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }
        //文件另存为
        public FileResult SaveDocument(string url, string extName, string fileName)
        {
           
                string str = url;
                string name = fileName;
                string ExtName =extName;
               byte[] bytes = ReadFile(str);
            return File(bytes, ExtName, name);
        }
        /// <summary>
        /// 文件转化
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public byte[] ReadFile(string fileName)
        {
            FileStream pFileStremam = null;
            byte[] pReadByte = new byte[0];
            try
            {
                pFileStremam = new FileStream(Server.MapPath(fileName),FileMode.Open,FileAccess.Read);
                BinaryReader r = new BinaryReader(pFileStremam);
                r.BaseStream.Seek(0, SeekOrigin.Begin);
                pReadByte = r.ReadBytes((int)r.BaseStream.Length);
                return pReadByte;
            }
            catch
            {
                return pReadByte;
            }
            finally
            {
                if (pFileStremam != null)
                    pFileStremam.Close();
            }
        }

        //webuploader上传文件
        public ActionResult UpLoad(string id, string name, string type, string lastModifiedDate, int size,
        HttpPostedFileBase file)
        {
            string filePathName = string.Empty;
            string localPath = Server.MapPath("/upload/Temp/");

            if (Request.Files.Count == 0)
            {
                return Json(new { jsonrpc = 2.0, error = new { code = 102, message = "保存失败" }, id = "id" });
            }

            string ex = Path.GetExtension(file.FileName);
            filePathName = Guid.NewGuid().ToString("N") + ex;
            if (!System.IO.Directory.Exists(localPath))
            {
                System.IO.Directory.CreateDirectory(localPath);
            }
            file.SaveAs(Path.Combine(localPath, filePathName));

            return Json(new
            {
                jsonrpc = "2.0",
                id = id,
                filePath = "/upload/Temp/" + filePathName,
                fileName = filePathName,
                type = type,
                exfileExtName = ex

            });

        }
        /// <summary>
        /// 删除上传文件中的预案条例文档
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public JsonResult deleteAddFileByID(string filePath)
        {
            
            try
            {
                bool result = false;
                string[] path = filePath.Split(',');
                for(var i=0;i< path.Count();i++)
                {
                    FileInfo file = new FileInfo(Server.MapPath(path[i]));
                    if (file.Exists)
                    {
                        file.Delete(); //删除单个文件
                        result = true;
                    }
                    else
                    {
                        result = false;
                    }
                }
                return Json(new { status =0, msg = result }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        #region 预案执行记录
        public ActionResult GetPlanRecordList(int pageIndex, int pageSize, string planName, int planType, string createTime, string endTime)
        {
            ServPlanRecordQuery servPlanRecordQuery = new ServPlanRecordQuery();
            //if (planName != "")
            //{
            //    servPlanRecordQuery.plan_name = planName;
            //}
            if (planType != -1)
            {
                servPlanRecordQuery.plan_type = planType;
            }
            if (createTime != "")
            {
                servPlanRecordQuery.create_time = createTime;
            }
            if (endTime != "")
            {
                servPlanRecordQuery.Endtime = endTime;
            }
            int totalNumber = 0;
            List<ServPlanRecordInfo> servPlanRecordInfoList = new List<ServPlanRecordInfo>();
            try
            {
                servPlanRecordInfoList = servPlanRecordBLL.GetEntities(servPlanRecordQuery, pageIndex, pageSize, out totalNumber);
                var temp = new { total = totalNumber, rows = servPlanRecordInfoList };
                return Json(new { status = 0, msg = temp }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
           
        }
        /// <summary>
        /// 查看处置项执行结果
        /// </summary>
        /// <param name="pid"></param>
        /// <returns></returns>

        public JsonResult GetPlanItemResult(int pid)
        {
            try
            {
                List<Model.CustomModel.PlanItemResult> PlanItemResult = servPlanRecordBLL.GetPlanItemResult(pid);
                return Json(new { status = 0, msg = PlanItemResult }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion

        /// <summary>
        /// 根据设备id获取预案信息
        /// </summary>
        /// <param name="deviceId"></param>
        /// <returns></returns>
        public JsonResult ViewRelatedPlans(int deviceId)
        {

            try
            {
                List<ServDevicePlanModel> servDevicePlanList = devicePlanBll.ViewRelatedPlans(deviceId);
                return Json(new { status = 0, msg = servDevicePlanList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }
        #endregion

        /// <summary>
        /// 批量配置预案
        /// </summary>
        /// <param name="planName"></param>
        /// <param name="planLevel"></param>
        /// <param name="deviceId"></param>
        /// <param name="addCreateTime"></param>
        /// <param name="addEndTime"></param>
        /// <param name="cameraId"></param>
        /// <param name="defaultCbk"></param>
        /// <param name="cnfirmCbk"></param>
        /// <param name="defaultName"></param>
        /// <param name="defaultPhone"></param>
        /// <param name="cnfirmName"></param>
        /// <param name="cnfirmPhone"></param>
        /// <param name="cnfirmIsCall"></param>
        /// <param name="cnfirmIsMessage"></param>
        /// <param name="defaultIsCall"></param>
        /// <param name="defaultIsMessage"></param>
        /// <param name="fourColorLight"></param>
        /// <param name="executionCycle"></param>
        /// <returns></returns>
        public JsonResult BatchAddDevicePlanData(string planName, int planLevel, string deviceId, string addCreateTime, string addEndTime, string cameraId, string defaultCbk, string cnfirmCbk, string defaultName, string defaultPhone, string cnfirmName, string cnfirmPhone, string cnfirmIsCall, string cnfirmIsMessage, string defaultIsCall, string defaultIsMessage, int fourColorLight, string executionCycle)
        {
            try
            {
               
             

                List<ServDevicePlanModel> entityList = new List<ServDevicePlanModel>(); 
                //确警前处置项
                List<ServPlanHandleItemModel> defaultPlanHandleItemList = new List<ServPlanHandleItemModel>();
                //确警后处置项
                List<ServPlanHandleItemModel> cnfirmPlanHandleItemList = new List<ServPlanHandleItemModel>();
                //确警前人员信息
                List<ServPlanPersonModel> defaultPersonList = new List<ServPlanPersonModel>();
                //确警后人员信息
                List<ServPlanPersonModel> cnfirmPlanPersonList = new List<ServPlanPersonModel>();
                List<ServPlanHandleItemCameraModel> servPlanHandleItemCameraList = new List<Model.ServPlanHandleItemCameraModel>();
                string[] deviceid = deviceId.Split(',');
                for (var a = 0; a < deviceid.Length; a++)
                {
                    ServDevicePlanModel entity = new ServDevicePlanModel();
                    int p_id = 1000;
                    ServDevicePlanModel devicePlan = devicePlanBll.GetLastDevicePlan();
                    if (devicePlan != null)
                    {
                        p_id = Convert.ToInt32(devicePlan.plan_code);
                    }
                    //向Serv_Device_Plan添加预案基础信息
                    entity.plan_code = p_id + 1;
                    entity.plan_name = planName;
                    entity.plan_level = planLevel;
                    entity.device_id = Convert.ToInt32(deviceid[a]);
                    entity.create_time = DateTime.Now;
                    entity.update_time = DateTime.Now;
                    entity.plan_status = (int)PlanStatus.启用;
                    entity.person_id = 1;
                    entityList.Add(entity);

                }
                    //向Serv_Execution_Time添加时间信息
                    ServExecutionTimeModel servExecutionTime = new ServExecutionTimeModel();
                    servExecutionTime.start_time = addCreateTime;
                    servExecutionTime.end_time = addEndTime;
                    servExecutionTime.execution_cycle = executionCycle;
                    servExecutionTime.type = (int)PlanType.设备预案;
                    //向Serv_Plan_HandleItem添加默认处置选项
                    if (defaultCbk != "")
                    {
                        string[] defaultArray = defaultCbk.Split(',');
                        for (int i = 0; i < defaultArray.Length; i++)
                        {
                            ServPlanHandleItemModel servPlanHandleItem = new ServPlanHandleItemModel();
                            //servPlanHandleItem.plan_id = entity.id;
                            servPlanHandleItem.item_type = Convert.ToInt32(defaultArray[i]);
                            if (Convert.ToInt32(defaultArray[i]) == (int)DevicePlanDefaultOptions.控制中心声光蜂鸣器开启)
                            {
                                servPlanHandleItem.ext1 = fourColorLight.ToString();
                            }
                            servPlanHandleItem.confirm_type = (int)PlanHandleTime.确警前;//确警前默认处置项
                            servPlanHandleItem.plan_type = (int)PlanType.设备预案;//设备预案
                            defaultPlanHandleItemList.Add(servPlanHandleItem);
                        }
                    }
                    if (cnfirmCbk != "")
                    {
                        //向Serv_Plan_HandleItem添加确认处置选项
                        string[] cnfirmArray = cnfirmCbk.Split(',');
                        for (int i = 0; i < cnfirmArray.Length; i++)
                        {
                            ServPlanHandleItemModel servPlanHandleItem = new ServPlanHandleItemModel();
                           // servPlanHandleItem.plan_id = entity.id;
                            servPlanHandleItem.item_type = Convert.ToInt32(cnfirmArray[i]);
                            servPlanHandleItem.confirm_type = (int)PlanHandleTime.确警后;//确警后处置项
                            servPlanHandleItem.plan_type = (int)PlanType.设备预案;//设备预案
                            cnfirmPlanHandleItemList.Add(servPlanHandleItem);
                        }
                    }

                    if (defaultName != "")
                    {
                        //向Serv_Plan_Person添加默认处置选项中其他责任人信息
                        string[] defaultNameArray = defaultName.Split(',');
                        string[] defaultPhoneArray = defaultPhone.Split(',');
                        string[] defaultCallArray = defaultIsCall.Split(',');
                        string[] defaultMessageArray = defaultIsMessage.Split(',');
                        for (int i = 0; i < defaultNameArray.Length; i++)
                        {
                            ServPlanPersonModel servPlanPerson = new ServPlanPersonModel();
                            //servPlanPerson.item_id = (int)DevicePlanDefaultOptions.通知其他负责人;
                            servPlanPerson.plan_type = (int)PlanType.设备预案;//设备预案
                            servPlanPerson.person_name = defaultNameArray[i];
                            servPlanPerson.person_phone_num = defaultPhoneArray[i];
                            servPlanPerson.is_call = Convert.ToInt32(defaultCallArray[i]);
                            servPlanPerson.is_message = Convert.ToInt32(defaultMessageArray[i]);
                            defaultPersonList.Add(servPlanPerson);
                        }
                    }
                    if (cnfirmName != "")
                    {
                        //向Serv_Plan_Person添加确认处置选项中其他责任人信息
                        string[] cnfirmNameArray = cnfirmName.Split(',');
                        string[] cnfirmPhoneArray = cnfirmPhone.Split(',');
                        string[] cnfirmCallArray = cnfirmIsCall.Split(',');
                        string[] cnfirmMessageArray = cnfirmIsMessage.Split(',');
                        for (int i = 0; i < cnfirmNameArray.Length; i++)
                        {
                            ServPlanPersonModel servPlanPerson = new ServPlanPersonModel();
                            //servPlanPerson.item_id = (int)DevicePlanConfirmOptions.通知其他负责人;
                            servPlanPerson.plan_type = (int)PlanType.设备预案;//设备预案
                            servPlanPerson.person_name = cnfirmNameArray[i];
                            servPlanPerson.person_phone_num = cnfirmPhoneArray[i];
                            servPlanPerson.is_call = Convert.ToInt32(cnfirmCallArray[i]);
                            servPlanPerson.is_message = Convert.ToInt32(cnfirmMessageArray[i]);
                            cnfirmPlanPersonList.Add(servPlanPerson);
                        }
                    }

                    if (cameraId != "")
                    {
                        //向Serv_Plan_HandleItemCamera添加摄像头信息
                        string[] cameraArray = cameraId.Split(',');
                        for (int i = 0; i < cameraArray.Length; i++)
                        {
                            ServPlanHandleItemCameraModel ServPlanHandleItemCamera = new ServPlanHandleItemCameraModel();
                            // ServPlanHandleItemCamera.handleitem_id = (int)DevicePlanDefaultOptions.关联摄像头;
                            ServPlanHandleItemCamera.device_id = Convert.ToInt32(cameraArray[i]);//设备id
                            servPlanHandleItemCameraList.Add(ServPlanHandleItemCamera);
                        }
                    }

                   bool  ISResult = devicePlanBll.BatchAddDevicePlanData(entityList, servExecutionTime, defaultPlanHandleItemList, cnfirmPlanHandleItemList, defaultPersonList, cnfirmPlanPersonList, servPlanHandleItemCameraList);
                   

                
                return Json(new { status = 0, msg = ISResult }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }

        }


    }


}
