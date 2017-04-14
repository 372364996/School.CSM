using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CSM.BLL;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Common;
using System.Web.Script.Serialization;

namespace CSM.Controllers
{
    public class AlarmController : BaseController
    {
        JavaScriptSerializer tojson = new JavaScriptSerializer();
        BaseMapConfigBLL baseMapConfigBLL = new BaseMapConfigBLL();
        private ServScheduleBLL servScheduleBll = new ServScheduleBLL();
        private ServAlarmRecordBLL _servAlarmRecordBll = new ServAlarmRecordBLL();
        private ServAlarmCommandBLL _servAlarmCommandBLL = new ServAlarmCommandBLL();
        private BaseEventTypeBLL _baseEventTypeBLL = new BaseEventTypeBLL();
        private ServInformAlarmBLL servInformAlarmBll = new ServInformAlarmBLL();
        private ServInformAlarmHandleRecordBLL servInformAlarmHandleRecordBll = new ServInformAlarmHandleRecordBLL();
        // GET: Alarm 列表
        public ActionResult Index()
        {
            ViewData["subSystemList"] = EnumClass.GetEnumModelList<EnumClass.SubSystem>();
            ViewData["alarmLevelList"] = EnumClass.GetEnumModelList<EnumClass.AlarmLevel>();
            ViewData["confirmAlarmStateList"] = EnumClass.GetEnumModelList<EnumClass.ConfirmAlarmState>();
            ViewData["confirmAlarmResultList"] = EnumClass.GetEnumModelList<EnumClass.ConfirmAlarmResult>();
            ViewData["region"] = servScheduleBll.GetAllRegion();
            return View();
        }
        /// <summary>
        /// 设备告警
        /// </summary>
        /// <returns></returns>
        public ActionResult InformAlarm()
        {
            ViewData["alarmLevelList"] = EnumClass.GetEnumModelList<EnumClass.AlarmLevel>();
            ViewData["region"] = servScheduleBll.GetAllRegion();
            return View();
        }

        //统计
        public ActionResult Statistics()
        {
            return View();
        }
        //应急指挥
        public ActionResult Command()
        {
            return View();
        }
        /// <summary>
        /// 获取报警列表(带查询条件)
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAlarmList(int pageIndex, int pageSize, int regionId, int confirmState, int alarmType, int alarmLevel, int[] subSystem, string startTime, string endTime)
        {
            try
            {
                int totalNumber = 0;
                List<AlarmRecordModel> list = _servAlarmRecordBll.QueryPageList(pageIndex, pageSize, regionId, confirmState, (int)EnumClass.AlarmType.设备报警, alarmLevel, subSystem, startTime.ToString(), endTime.ToString(), out totalNumber);
                //return Json(new { state = 0, message = list }, JsonRequestBehavior.AllowGet);

                // return Json(new {total= totalNumber,rows= list },JsonRequestBehavior.AllowGet);
                EasyUIDataGruidModel<List<AlarmRecordModel>> retList = new EasyUIDataGruidModel<List<AlarmRecordModel>>();
                retList.total = totalNumber;
                retList.rows = list;
                return Json(retList, JsonRequestBehavior.AllowGet);


            }
            catch (Exception ex)
            {
                //log 报警列表查询失败
                return Json(new { state = 1, message = "设备报警列表查询失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 确警
        /// </summary>
        /// <param name="alarmId"></param>
        /// <param name="ssoid"></param>
        /// <param name="confirmResult"></param>
        /// <param name="location"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        public JsonResult ConfirmAlarmMessage(int alarmId, int ssoid, int confirmResult, string location, string content)
        {
            try
            {
                bool bl = _servAlarmRecordBll.ConfirmAlarm(alarmId, ssoid, confirmResult, location, content);
                if (bl == true)
                {
                    return Json(new { state = 0, message = "确警成功！" }, JsonRequestBehavior.AllowGet);
                }
                else 
                {
                    return Json(new { state = 1, message = "确警失败！" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "确警失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 修改确警信息
        /// </summary>
        /// <param name="alarmId"></param>
        /// <param name="location"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        public JsonResult UpdateAlarmMessage(int alarmId, string location, string content)
        {
            try
            {
                bool bl = _servAlarmRecordBll.UpdateAlarm(alarmId, location, content);
                if (bl == true)
                {
                    return Json(new { state = 0, message = "修改确警信息成功！" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { state = 1, message = "修改确警信息失败！" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "修改确警信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 批量确警
        /// </summary>
        /// <param name="alarmIdArr"></param>
        /// <param name="ssoId"></param>
        /// <returns></returns>
        public JsonResult MultipleConfirmAlarm(int[] alarmIdArr, int ssoId)
        {
            try
            {
                bool bl = _servAlarmRecordBll.MultipleAlarm(alarmIdArr, ssoId);
                if (bl == true)
                {
                    return Json(new { state = 0, message = "批量确警成功" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { state = 1, message = "批量确警失败！" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "批量确警失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 根据报警ID获取预案处置项执行结果
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAlarmPlanItemRecord(int alarmId)
        {
            try
            {
                PlanItemHandledInfo model = _servAlarmRecordBll.GetPlanItemResultList(alarmId);
                return Json(model, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "获取预案处置项执行结果失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 获取最新报警预案处置项执行结果
        /// </summary>
        /// <returns></returns>
        public JsonResult GetLastAlarmPlanItemRecord()
        {
            try
            {
                PlanItemHandledInfo model = _servAlarmRecordBll.GetLastPlanItemResultList();
                return Json(model, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "获取预案处置项执行结果失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 报警信息excel导出
        /// </summary>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="confirmState"></param>
        /// <param name="alarmType"></param>
        /// <param name="subSystem"></param>
        /// <param name="alarmLevel"></param>
        /// <returns></returns>
        public FileResult ExportDeviceAlarmExcel(int regionId,string startTime, string endTime, int confirmState, int alarmType, string subSystem,int alarmLevel)
        {
            try
            {
             
             
                System.IO.MemoryStream ms = _servAlarmRecordBll.GetAllAlarmRecordCondition(regionId,startTime, endTime, confirmState, alarmType, subSystem, alarmLevel);
                return File(ms, "application/vnd.ms-excel", "事件报警统计表.xls");
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        #region 获取设备报警页面枚举
        /// <summary>
        /// 获取所有报警类型枚举
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllSubSystem()
        {
            try
            {
                List<EnumModel> subSystemList = EnumClass.GetEnumModelList<EnumClass.SubSystem>();
                // return Json(subSystemList, JsonRequestBehavior.AllowGet);
                return Json(new { state = 0, message = subSystemList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // throw ex;
                return Json(new { state = 1, message = "获取报警类型枚举失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 获取所有报警级别枚举
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllAlarmLevel()
        {
            try
            {
                List<EnumModel> alarmLevelList = EnumClass.GetEnumModelList<EnumClass.AlarmLevel>();
                //  return Json(alarmLevelList, JsonRequestBehavior.AllowGet);
                return Json(new { state = 0, message = alarmLevelList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //throw ex;
                return Json(new { state = 1, message = "获取报警级别枚举失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 获取所有确警状态枚举
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllConfirmAlarmState()
        {
            try
            {
                List<EnumModel> confirmAlarmStateList = EnumClass.GetEnumModelList<EnumClass.ConfirmAlarmState>();
                //  return Json(confirmAlarmStateList, JsonRequestBehavior.AllowGet);
                return Json(new { state = 0, message = confirmAlarmStateList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                // throw ex;
                return Json(new { state = 1, message = "获取报警级别枚举失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 获取所有确警结果枚举
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllConfirmResult()
        {
            try
            {
                List<EnumModel> confirmAlarmResultList = EnumClass.GetEnumModelList<EnumClass.ConfirmAlarmResult>();
                // return Json(confirmAlarmResultList, JsonRequestBehavior.AllowGet);
                return Json(new { state = 0, message = confirmAlarmResultList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "获取报警级别枚举失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        #endregion


        #region  查询报警统计
        public JsonResult GetAlarmNum()
        {
            try
            {
                ServAlarmRecordBLL servAlarmRecordBll = new ServAlarmRecordBLL();
                return Json(servAlarmRecordBll.GetAlarmStatistics(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "获取统计信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);

            }
        }


        #endregion

        #region GoJS的请求数据处理
        /// <summary>
        /// ajax请求的action（展示流程图）
        /// </summary>
        /// <param name="eventId">事件ID</param>
        /// <returns>返回事件对应的应急预案集合</returns>
        public ActionResult Show(string eventId)
        {
            #region 冗余代码
            //var list = _servAlarmCommandBLL.GetAlarmCommandByEventId(eventId);//根据事件ID获取对应的应急指挥

            ////列表的JSON
            //Dictionary<string, string> dictNode;//数据
            //Dictionary<string, string> dictLink; //线条

            //List<object> listnode = new List<object>();
            //List<object> listlink = new List<object>();
            //foreach (var item in list)
            //{
            //    dictNode = new Dictionary<string, string>();
            //    dictNode["key"] = item.child_node.ToString();
            //    dictNode["text"] = item.content;
            //    dictNode["color"] = item.color;

            //    listnode.Add(dictNode);//数据

            //    dictLink = new Dictionary<string, string>();
            //    dictLink["from"] = item.parent_node.ToString();
            //    dictLink["to"] = item.child_node.ToString();

            //    listlink.Add(dictLink);//线条
            //}


            //JavaScriptSerializer js = new JavaScriptSerializer();
            //string nodeJson = js.Serialize(listnode);//序列化列表
            //string linkJson = js.Serialize(listlink);//序列化线条
            #endregion
            if (string.IsNullOrEmpty(eventId))
            {
                return Json(new { status = "error", msg = "参数不能为空" });
            }
            int i;
            if (!int.TryParse(eventId, out i))
            {
                return Json(new { status = "error", msg = "参数有误" });
            }
            ServAlarmCommandModel acModel = _servAlarmCommandBLL.ShowFlowchart(Convert.ToInt32(eventId));
            return Json(new { status = "OK", data1 = acModel.nodeJson, data2 = acModel.linkJson });


        }

        /// <summary>
        /// 通过事件名称获取预案流程图
        /// </summary>
        /// <param name="eventName"></param>
        /// <returns></returns>
        public ActionResult ShowByEventName(string eventName)
        {
            if (string.IsNullOrEmpty(eventName))
            {
                return Json(new { status = "error", msg = "未找到对应事件的应急指挥流程图" });
            }
            try
            {
                ServAlarmCommandModel acModel = _servAlarmCommandBLL.ShowFlowchartByName(eventName);
                if (acModel != null)
                {
                    return Json(new { status = "OK", data1 = acModel.nodeJson, data2 = acModel.linkJson });
                }
                else
                {
                    return Json(new { status = "error", msg = "未找到对应事件的应急指挥流程图" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = "error", msg = "查询应急指挥流程图失败！" + ex.Message });
            }

        }
        /// <summary>
        /// 应急流程页面的保存按钮
        /// </summary>
        /// <param name="ModelJson">修改后的model</param>
        /// <param name="eventId">事件的ID</param>
        /// <returns></returns>
        public JsonResult Save(string ModelJson, string eventId)
        {
            if (string.IsNullOrEmpty(eventId))
            {
                return Json(new { status = "eroor", msg = "参数不能为空" });
            }
            #region 冗余代码
            ////用户点击保存按钮的时候，首先去判断是新增保存还是修改保存，
            ////所以根据事件的ID 查询一下是否有对应的预案，如果没有，则是新增的保存
            //var list = _servAlarmCommandBLL.GetAlarmCommandByEventId(Convert.ToInt32(eventId));
            ////不管是添加还是修改，先把之前先删除了，
            ////删除之前的
            //_servAlarmCommandBLL.DeleteAlarmCommandByEventId(Convert.ToInt32(eventId));
            //ServAlarmCommandModel model;
            //// ServEventAlarmCommandModel eventModel;
            //Dictionary<string, object> dicModel = (Dictionary<string, object>)new JavaScriptSerializer().DeserializeObject(ModelJson);//将model反序列化
            //object[] nodeObj = (object[])dicModel["nodeDataArray"];//读取文本信息
            //object[] linkObj = (object[])dicModel["linkDataArray"];//读取线条信息
            //Dictionary<string, object> linkDic = (Dictionary<string, object>)nodeObj[0];
            //int startKey=Convert.ToInt32(linkDic["key"]);
            //  object[] link = new object[linkObj.Length + 1];
            //if (list.Count <= 0)//表示新增
            //{

            //    Dictionary<string, object> dicobj = new Dictionary<string, object>();


            //    for (int i = 0; i < linkObj.Length; i++)
            //    {
            //        link[i+1] = linkObj[i];//转换数组
            //    }

            //    dicobj.Add("from", "0");
            //    dicobj.Add("to", startKey);
            //    link[0] = dicobj;//为第一个索引的位置赋值
            //}

            //Dictionary<string, object> nodeDict;//node
            //Dictionary<string, object> linkDict;//link
            //for (int i = 0; i < nodeObj.Length; i++)
            //{
            //    model = new ServAlarmCommandModel();
            //    nodeDict = (Dictionary<string, object>)nodeObj[i];//node
            //    if (list.Count <= 0)
            //   {
            //       linkDict = (Dictionary<string, object>)link[i]; }
            //    else
            //    {
            //        linkDict = (Dictionary<string, object>)linkObj[i];
            //   }
            //    //link
            //    model.child_node = linkDict["to"].ToString();//to
            //    model.content = nodeDict["text"].ToString();//text
            //    model.parent_node = linkDict["from"].ToString();//from
            //    model.parent_id = Convert.ToInt32(linkDict["from"]);//parent_id 
            //    model.id = Convert.ToInt32(nodeDict["key"]);//id
            //    model.color = "lightgreen";
            //    model.create_time = DateTime.Now;//创建时间
            //    model.update_time = DateTime.Now;//更新时间
            //    model.event_id = Convert.ToInt32(eventId);
            //    //先添加预案表
            //    int id = _servAlarmCommandBLL.AddEntity(model);

            //}
            #endregion

            if (_servAlarmCommandBLL.IsSaveSuccess(ModelJson, eventId))
            {
                return Json(new { status = "OK", msg = "操作成功" });
            }
            else
            {
                return Json(new { status = "error", msg = "操作失败，必要线条没有连接" });
            }

        }
        /// <summary>
        /// 根据事件ID删除对应的预案流程图
        /// </summary>
        /// <param name="eventId">事件ID</param>
        /// <returns></returns>
        public ActionResult Delete(string eventId)
        {
            if (string.IsNullOrEmpty(eventId))
            {
                return Json(new { status = "error", msg = "参数错误" });
                //throw new  ("参数错误");
            }
            //删除AlarmCommand数据表
            if (_servAlarmCommandBLL.DeleteAlarmCommandByEventId(Convert.ToInt32(eventId)) <= 0)
            {
                return Json(new { status = "error", msg = "删除AlarmCommand数据表出错" });
                // throw new Exception("删除AlarmCommand数据表出错");
            }
            return Json(new { status = "OK" });

        }
        /// <summary>
        /// 获得预案流程图
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAlarmCommandList(int pageIndex, int pageSize)
        {


            try
            {
                int totalSize = 0;//获得总数据的条数
                //分页：首先获得总共有多少条数据
                List<BaseEventTypeModel> eventTypelist =
                _baseEventTypeBLL.GetChildEventType(-1);  //获取根级事件类型
                if (eventTypelist != null && eventTypelist.Count != 0)
                {
                    totalSize = eventTypelist.Count;//获得总数据的条数
                }
                // int totalSize = eventTypelist.Count;//获得总数据的条数
                // int totalNumber = 0;
                List<CSM.Model.BaseEventTypeModel> list =
                    _servAlarmCommandBLL.GetEventtype((pageIndex - 1) * pageSize + 1, pageIndex * pageSize);
                EasyUIDataGruidModel<List<CSM.Model.BaseEventTypeModel>> retList = new EasyUIDataGruidModel<List<CSM.Model.BaseEventTypeModel>>();
                retList.total = totalSize;
                retList.rows = list;
                return Json(retList, JsonRequestBehavior.AllowGet);
                //return WriteJson("OK", "", list, null);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "流程列表查询失败！" + ex.Message }, JsonRequestBehavior.AllowGet);

            }
        }
        /// <summary>
        /// 根据父级ID获取子级事件
        /// </summary>
        /// <param name="pid"></param>
        /// <returns></returns>
        public JsonResult GetChildAlarmCommandList(int pid)
        {
            try
            {
                List<BaseEventTypeModel> modelList = _baseEventTypeBLL.GetChildEventType(pid);
                return Json(modelList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        public bool IsAlarmCommandByEventId(int eventId)
        {
            var list = _servAlarmCommandBLL.GetAlarmCommandByEventId(eventId);
            if (list.Count <= 0)//如果可以根据事件ID查询出流程图数据，则返回true,
            {
                return true;
            }
            else
                return false;
        }
        /// <summary>
        /// 根据事件id获取流程图
        /// </summary>
        /// <param name="eventId"></param>
        /// <returns></returns>
        public JsonResult GetEventNameByCode(int eventId)
        {
            var eventName = _baseEventTypeBLL.EventTypeName(eventId);
            if (string.IsNullOrEmpty(eventName))
            {
                return Json(new { status = "error", msg = "未找到对应事件的流程图" });
            }
            try
            {
                ServAlarmCommandModel acModel = _servAlarmCommandBLL.ShowFlowchartByName(eventName);
                if (acModel != null)
                {
                    return Json(new { status = "OK", data1 = acModel.nodeJson, data2 = acModel.linkJson });
                }
                else
                {
                    return Json(new { status = "error", msg = "未找到对应事件的流程图" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = "error", msg = "查询流程图失败！" + ex.Message });
            }

        }

        /// <summary>
        /// 根据事件code获取流程图 乔
        /// </summary>
        /// <param name="eventId"></param>
        /// <returns></returns>
        public JsonResult GetEventNameInfoByCode(string eventCode)
        {
            var eventName = _baseEventTypeBLL.GetEventTypeName(eventCode);
            if (string.IsNullOrEmpty(eventName))
            {
                return Json(new { status = "error", msg = "未找到对应事件的流程图" });
            }
            try
            {
                ServAlarmCommandModel acModel = _servAlarmCommandBLL.ShowFlowchartByName(eventName);
                if (acModel != null)
                {
                    return Json(new { status = "OK", data1 = acModel.nodeJson, data2 = acModel.linkJson });
                }
                else
                {
                    return Json(new { status = "error", msg = "未找到对应事件的流程图" });
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = "error", msg = "查询流程图失败！" + ex.Message });
            }

        }
        #endregion

        /// <summary>
        /// 获取前10条告警信息
        /// </summary>
        /// <returns></returns>
        public JsonResult GetFirstFewAlarm(int num)
        {
            try
            {
                List<AlarmRecordModel> list = _servAlarmRecordBll.GetFirstFewAlarm(num);
                return Json(list);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "获取前10条告警信息出现！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        //根据告警ID获取一条告警信息
        public JsonResult GetAlarmByalarmIdData(int alarm_id)
        {
            try
            {
                AlarmRecordModel alarm = _servAlarmRecordBll.GetEntity(alarm_id);
                return Json(alarm);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "获取确警信息出现！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 获取今日告警信息
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAlarmNumToday()
        {
            try
            {
                AlarmNumToday alarm = _servAlarmRecordBll.GetAlarmNumToday();
                return Json(alarm);
            }
            catch (Exception ex)
            {
                return Json(new { state = 1, message = "获取今日告警信息改出现！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        #region  设备告警
        /// <summary>
        /// 新增设备告警
        /// </summary>
        /// <param name="eventType"></param>
        /// <param name="device_code"></param>
        /// <param name="alarm_location"></param>
        /// <param name="area_id"></param>
        /// <param name="alarm_level"></param>
        /// <param name="report_time"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        public JsonResult AddInformAlarm(int eventType, string device_code, string alarm_location, int area_id, int alarm_level, string content)
        {
            try
            {
                bool bl = servInformAlarmBll.AddInformAlarm(eventType, device_code, alarm_location, area_id, alarm_level, content);
                if (bl == true)
                {
                    return Json(new { status = 0, msg = "新增设备告警成功！" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = 1, msg = "新增设备告警失败！" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "新增设备告警失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        /// <summary>
        /// 分页获取设备告警数据
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="regionId"></param>
        /// <param name="areaId"></param>
        /// <param name="alarmLevel"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="eventType"></param>
        /// <returns></returns>
        public JsonResult GetInformAlarmPage(int pageIndex, int pageSize, int regionId, int areaId, int alarmLevel, string startTime, string endTime, int eventType)
        {
            try
            {
                int totalNumber = 0;
                List<RetInformAlarmCustom> informAlarmList = servInformAlarmBll.GetInformAlarmPage(pageIndex, pageSize, regionId, areaId, alarmLevel, startTime, endTime, eventType, out totalNumber);
                EasyUIDataGruidModel<List<RetInformAlarmCustom>> retList = new EasyUIDataGruidModel<List<RetInformAlarmCustom>>();
                retList.total = totalNumber;
                retList.rows = informAlarmList;
                return Json(new { status = 0, msg = retList }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "分页获取设备告警失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 导出excel文件
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="areaId"></param>
        /// <param name="alarmLevel"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="eventType"></param>
        /// <returns></returns>
        public FileResult ExportInformAlarmExcel(int regionId, int areaId, int alarmLevel, string startTime, string endTime, int eventType)
        {
            try
            {
                System.IO.MemoryStream ms = servInformAlarmBll.GetAllInformAlarmStream(regionId, areaId, alarmLevel, startTime, endTime, eventType);
                return File(ms, "application/vnd.ms-excel", "设备告警统计表.xls");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取设备告警处理记录
        /// </summary>
        /// <param name="alarmId"></param>
        /// <returns></returns>
        public JsonResult GetInformAlarmHandleRecordByAlarmId(int alarmId)
        {
            try
            {
                List<InformAlarmHandleRecordWithPerson> list = servInformAlarmHandleRecordBll.GetInformAlarmHandleRecordListByAlarmId(alarmId);
                return Json(new { status = 0, msg = list }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "获取设备告警处理记录失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
            #region  测试
            //try
            //{
            //    string str = "";
            //    List<ServInformAlarmHandleRecordModel> list = servInformAlarmHandleRecordBll.GetInformAlarmHandleRecordListByAlarmId(alarmId);
            //    for (int i = 0; i < list.Count; i++)
            //    {
            //        str += "<tr><td class='dv-label'>List Price: </td><td>"+list[i].handle_time.ToString()+"</td><td class='dv-label'>Unit Cost:</td><td>"+ list[i].id+ "</td></tr>";
            //    }
            //    return str;

            //}
            //catch (Exception ex)
            //{
            //    return "";

            //}
            #endregion
        }
        /// <summary>
        /// 增加处理记录并修改告警记录状态
        /// </summary>
        /// <param name="alarmId"></param>
        /// <param name="context"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public JsonResult AddInformAlarmHandleRecord(int alarmId, int ssoId,string context, int status)
        {
            try
            {
                bool bl = servInformAlarmHandleRecordBll.AddInformAlarmHandleRecord(alarmId, ssoId, context, status);
                if (bl == true)
                {
                    return Json(new { status = 0, msg = "添加处理记录成功！" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = 1, msg = "添加处理记录失败！" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "添加处理记录失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        /// <summary>
        /// 根据园区ID获取区域
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public JsonResult GetAreaByRegion(int regionId)
        {
            try
            {
                List<EnumModel> list = servInformAlarmBll.GetShowAreaByRegionId(regionId);
                return Json(new { status = 0, msg = list }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "根据园区ID获取区域失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }
        #endregion

    }

}