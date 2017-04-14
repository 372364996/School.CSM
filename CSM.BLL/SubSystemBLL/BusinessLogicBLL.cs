using CSM.Common;
using CSM.DAL;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using CSM.Model.SubSystemModel;
using CSM.Utils;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL.SubSystemBLL
{
    public class BusinessLogicBLL
    {

        private Hashtable hash = new Hashtable();
        /// <summary>
        /// 处理预案
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public bool HandleBusiness(InterfaceData info)
        {
            try
            {
                //  InterfaceData interfaceData = JsonHelper.StringToObject<InterfaceData>(info);
                if (info != null)
                {
                    if (info.dataType == 1)  //报警数据（默认类型1）
                    {
                        ServAlarmRecordModel alarmRecord = JsonHelper.StringToObject<ServAlarmRecordModel>(info.data.ToString());
                        if (alarmRecord != null)
                        {
                            //Log4NetHelp.Info("业务层开始处理预案！");
                            HandlePlan(alarmRecord);
                           // Log4NetHelp.Info("业务层预案处理完成！");
                        }
                        else
                        {
                            //log:报警数据转换失败
                            Log4NetHelp.Info("数据类型转换失败！数据：" + info.data.ToString());
                        }
                    }
                    else
                    {
                        //log：非报警数据
                        Log4NetHelp.Info("非报警数据");
                    }
                }
                else
                {
                    //log:HandleBusiness转换子系统数据失败
                    Log4NetHelp.Info("业务层接收数据为空");
                }
                return true;

            }
            catch (Exception ex)
            {
                //log  数据处理失败+ex.message
                Log4NetHelp.Error("预案处理出现异常！" + ex.Message);
                return false;
            }
        }

        /// <summary>
        /// 处理报警数据
        /// </summary>
        /// <param name="alarmRecord"></param>
        public void HandlePlan(ServAlarmRecordModel alarmRecord)
        {
            try
            {
                ServExecutionTimeDAL executeTimeDal = new ServExecutionTimeDAL();
                ServDeviceInfoModel deviceInfo = GetDeviceInfo(alarmRecord.alarm_code);
                BaseRegionConfigDAL baseRegionConfigDal = new BaseRegionConfigDAL();
                if (deviceInfo != null)
                {
                    BaseRegionConfigModel regionModel = baseRegionConfigDal.GetEntity(deviceInfo.region_id);//获取设备所在园区
                    int parentEventId = GetParentEvent(alarmRecord.alarm_event);  //获取父级事件ID
                    //查找设备预案
                    string alarmTime = alarmRecord.alarm_time.ToLocalTime().ToString("HH:mm:ss");
                    var devicePlans = CheckDevicePlanIsExist(deviceInfo.id, (int)EnumClass.PlanStatus.启用, alarmTime);
                    DevicePlanAndTimeConfig devicePlan = devicePlans == null ? null : devicePlans.FirstOrDefault(); //目前取第一条设备预案
                    if (devicePlan != null)
                    {
                        #region  检验时间表达式
                        //if (TimeExpression.TimePointIsExistSpan(alarmRecord.alarm_time.ToLocalTime(), devicePlan.update_time, timeModel.execution_cycle))
                        //{

                        //}
                        //else
                        //{
                        //    Log4NetHelp.Info("报警时间未在设置周期内，报警时间：" + alarmRecord.alarm_time.ToLocalTime().ToString() + " 开始时间：" + devicePlan.update_time + " 时间表达式：" + timeModel.execution_cycle);
                        //}

                        #endregion
                        List<ServPlanHandleItemModel> planHandleItemList = GetPlanHandleItem(devicePlan.id, (int)EnumClass.PlanType.设备预案, (int)EnumClass.PlanHandleTime.确警前);
                        if (planHandleItemList != null && planHandleItemList.Count != 0)
                        {
                            //执行设备预案，写入预案执行记录
                            PlanBLL planBll = new PlanBLL();
                            int planRecordId = planBll.AddPlanRecord(alarmRecord.id, devicePlan.id, (int)EnumClass.PlanType.设备预案);
                            if (planRecordId > 0)
                            {
                                List<ServDeviceInfoModel> camerasList = null;
                                string ledMessage = "";
                                HandleDevicePlanItem(planRecordId, parentEventId, regionModel, planHandleItemList, deviceInfo, alarmRecord, out camerasList, out ledMessage);
                                // Hashtable hash = HandleDevicePlanItem(planRecordId, planHandleItemList, deviceInfo, alarmRecord,out camerasList,out ledMessage);
                                if (hash != null && hash.Count != 0)
                                {
                                    WebSocketMsgModel webMsg = new WebSocketMsgModel();
                                    DevicePlanMsgModel devicePlanMsg = new DevicePlanMsgModel();
                                    devicePlanMsg.hash = hash;
                                    devicePlanMsg.alarm = alarmRecord;
                                    devicePlanMsg.deviceInfo = deviceInfo;
                                    // devicePlanMsg.videoTime = GetAlarmVideoTime(alarmRecord.alarm_event);
                                    devicePlanMsg.videoTime = GetAlarmVideoTime(parentEventId);
                                    devicePlanMsg.camerasList = camerasList;
                                    devicePlanMsg.ledMessage = ledMessage;        //用于页面显示滚动条信息
                                                                                  // string devicePlanMsgStr = JsonHelper.ObjectToString(devicePlanMsg);
                                    webMsg.info = devicePlanMsg;
                                    webMsg.type = (int)EnumClass.WebSocketMsgType.设备预案;
                                    string param = JsonHelper.ObjectToString(webMsg);
                                    HttpHelper.PostJsonData(SubSystemRouteBLL.GetToWebsocketRoute(), param, Encoding.UTF8);
                                }
                            }
                        }
                        else
                        {
                            //log:未找到相应设备预案处置项
                            Log4NetHelp.Info("未找到对应设备预案处置项：" + alarmRecord.alarm_code);
                        }

                    }
                    else
                    {
                        //log 未找到设备预案或者设备预案未启用
                        //TODO 查找事件预案
                        Log4NetHelp.Info("未找到当前时间段内配置的设备预案或者设备预案未启用,继续查找事件预案");
                        //int parentEventId = GetParentEvent(alarmRecord.alarm_event);  //获取父级事件ID
                        if (parentEventId != -1)
                        {
                            var eventPlans = CheckEventPlanIsExist(alarmTime, parentEventId, (int)EnumClass.PlanStatus.启用, regionModel.id);
                            EventPlanAndTimeConfig eventPlan = eventPlans == null ? null : eventPlans.FirstOrDefault();//目前取第一条设备预案
                            if (eventPlan != null)
                            {
                                List<ServPlanHandleItemModel> planHandleItemList = GetPlanHandleItem(eventPlan.id, (int)EnumClass.PlanType.事件预案, (int)EnumClass.PlanHandleTime.确警前);//获取事件预案处置项
                                if (planHandleItemList != null && planHandleItemList.Count != 0)
                                {
                                    //执行事件预案，写入预案执行记录
                                    PlanBLL planBll = new PlanBLL();
                                    int planRecordId = planBll.AddPlanRecord(alarmRecord.id, eventPlan.id, (int)EnumClass.PlanType.事件预案);
                                    if (planRecordId > 0)
                                    {
                                        List<ServDeviceInfoModel> camerasList = null;
                                        string ledMessage = "";
                                        HandleEventPlanItem(planRecordId, parentEventId, regionModel, planHandleItemList, deviceInfo, alarmRecord, out camerasList, out ledMessage);
                                        // Hashtable hash = HandleDevicePlanItem(planRecordId, planHandleItemList, deviceInfo, alarmRecord,out camerasList,out ledMessage);
                                        if (hash != null && hash.Count != 0)
                                        {
                                            WebSocketMsgModel webMsg = new WebSocketMsgModel();
                                            DevicePlanMsgModel devicePlanMsg = new DevicePlanMsgModel();
                                            devicePlanMsg.hash = hash;
                                            devicePlanMsg.alarm = alarmRecord;
                                            devicePlanMsg.deviceInfo = deviceInfo;
                                            //  devicePlanMsg.videoTime = GetAlarmVideoTime(alarmRecord.alarm_event);
                                            devicePlanMsg.videoTime = GetAlarmVideoTime(parentEventId);
                                            devicePlanMsg.camerasList = camerasList;
                                            devicePlanMsg.ledMessage = ledMessage;        //用于页面显示滚动条信息
                                                                                          // string devicePlanMsgStr = JsonHelper.ObjectToString(devicePlanMsg);
                                            webMsg.info = devicePlanMsg;
                                            webMsg.type = (int)EnumClass.WebSocketMsgType.事件预案;
                                            string param = JsonHelper.ObjectToString(webMsg);
                                            HttpHelper.PostJsonData(SubSystemRouteBLL.GetToWebsocketRoute(), param, Encoding.UTF8);
                                        }
                                    }
                                }
                                else
                                {
                                    Log4NetHelp.Info("未找到对应事件预案处置项，事件ID：" + alarmRecord.alarm_event + " 园区ID：" + regionModel.id + " 报警时间：" + alarmTime);
                                }
                            }
                            else
                            {
                                Log4NetHelp.Info("未找到对应事件预案，事件ID：" + alarmRecord.alarm_event + " 园区ID：" + regionModel.id + " 报警时间：" + alarmTime);
                            }
                        }
                        else
                        {
                            Log4NetHelp.Info("未找到对应事件，事件ID：" + alarmRecord.alarm_event);
                        }
                    }

                }
                else
                {
                    //log：未找到设备alarmRecord.alarm_code
                    Log4NetHelp.Info("未找到设备：" + alarmRecord.alarm_code);
                }

            }
            catch (Exception ex)
            {
                // Log4NetHelp.Error("业务层处理报警数据失败！" + ex.Message);
                Log4NetHelp.Error("业务层处理报警数据失败！" + ex.Message);
            }
        }
        /// <summary>
        /// 根据事件ID获取父级事件
        /// </summary>
        /// <returns></returns>
        //public int GetParentEvent(int eventId)
        //{
        //    try
        //    {
        //        BaseEventTypeBLL eventBll = new BaseEventTypeBLL();
        //        List<BaseEventTypeModel> eventList = eventBll.GetAllEventType();
        //        var currentEvent = eventList.Where(n => n.id == eventId).FirstOrDefault();  //获取当前事件
        //        if (currentEvent != null)
        //        {
        //            if (currentEvent.pid != -1)
        //            {
        //                var parentEvent = eventList.Where(n => n.id == currentEvent.pid).FirstOrDefault();//获取当前事件的父级事件
        //                if (parentEvent != null)
        //                {
        //                    return parentEvent.id;
        //                }
        //                else
        //                {
        //                    Log4NetHelp.Info("未找到当前事件的父级事件,事件ID：" + eventId);
        //                    return -1;
        //                }
        //            }
        //            else
        //            {
        //                return currentEvent.id;
        //            }
        //        }
        //        else
        //        {
        //            Log4NetHelp.Info("未找到当前事件,事件ID：" + eventId);
        //            return -1;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        Log4NetHelp.Info("根据当前事件ID未找到父级事件,事件ID：" + eventId + " " + ex.Message);
        //        return -1;
        //    }
        //}

        /// <summary>
        /// 根据事件ID获取父级事件
        /// </summary>
        /// <returns></returns>
        public int GetParentEvent(string eventCode)
        {
            try
            {
                BaseEventTypeBLL eventBll = new BaseEventTypeBLL();
                List<BaseEventTypeModel> eventList = eventBll.GetAllEventType();
                var currentEvent = eventList.Where(n => n.event_code == eventCode).FirstOrDefault();  //获取当前事件
                if (currentEvent != null)
                {
                    if (currentEvent.pid != -1)
                    {
                        var parentEvent = eventList.Where(n => n.id == currentEvent.pid).FirstOrDefault();//获取当前事件的父级事件
                        if (parentEvent != null)
                        {
                            return parentEvent.id;
                        }
                        else
                        {
                            Log4NetHelp.Info("未找到当前事件的父级事件,事件Code：" + eventCode);
                            return -1;
                        }
                    }
                    else
                    {
                        return currentEvent.id;
                    }
                }
                else
                {
                    Log4NetHelp.Info("未找到当前事件,事件Code：" + eventCode);
                    return -1;
                }
            }
            catch (Exception ex)
            {
                Log4NetHelp.Info("根据当前事件Code未找到父级事件,事件Code：" + eventCode + " " + ex.Message);
                return -1;
            }
        }
        /// <summary>
        /// 查找事件预案并处理
        /// </summary>
        public void HandleEventPlanItem(int planRecordId, int eventId, BaseRegionConfigModel regionModel, List<ServPlanHandleItemModel> planHandleItemList, ServDeviceInfoModel deviceInfo, ServAlarmRecordModel alarmRecord, out List<ServDeviceInfoModel> camerasList, out string ledMessage)
        {
            try
            {
                PlanItemBLL planItemBll = new PlanItemBLL();
                //ServPlanHandleItemModel handleItemModel = planHandleItemList.FirstOrDefault(n => n.item_type == (int)EnumClass.EventPlanDefaultOptions.打开周围摄像头);
                //if (handleItemModel != null)
                //{
                //    HandleCamerasBLL camerasbll = new HandleCamerasBLL();
                //    camerasList = camerasbll.GetEventPlanCameras(deviceInfo.id, int.Parse(handleItemModel.ext2), int.Parse(handleItemModel.ext3), int.Parse(handleItemModel.ext4));
                //}
                //else
                //{
                //    camerasList = null;
                //}
                camerasList = null;
                LEDHandle ledHandle = new LEDHandle(deviceInfo, alarmRecord);
                ledMessage = ledHandle.GetAlarmText();
                //单独处理打开周围摄像头
                var cameraEventList = planHandleItemList.Where(n => n.item_type == (int)EnumClass.EventPlanDefaultOptions.打开周围摄像头);
                if (cameraEventList != null && cameraEventList.Count() > 0)
                {
                    AddEventHashTable((int)EnumClass.EventPlanDefaultOptions.打开周围摄像头, new { status = 0, planRecordId = planRecordId, model = cameraEventList.ToList() });
                }
                foreach (ServPlanHandleItemModel item in planHandleItemList)
                {

                    switch (item.item_type)
                    {
                        case (int)EnumClass.EventPlanDefaultOptions.中控室LED信息显示:
                            bool ledResult = ledHandle.HandleLedItem(ledMessage, regionModel.region_code);  //处理LED
                            planItemBll.AddItemRecord((int)EnumClass.PlanHandleTime.确警前, item.id, (int)EnumClass.PlanItemResult.成功, item.item_type, planRecordId, ledMessage);
                            AddHashTable(item.item_type, new { status = 1, info = "" });
                            break;
                        case (int)EnumClass.EventPlanDefaultOptions.告警视频下载:
                            //int handleDownloadRecordId = planItemBll.AddItemRecord((int)EnumClass.PlanHandleTime.确警前, item.id, item.item_type, planRecordId, "");
                            //if (handleDownloadRecordId > 0) //插入处置项记录成功，开始执行处置项
                            //{
                            //    VideoDownloadBLL videoDownloadBll = new VideoDownloadBLL();
                            //    bool bl = videoDownloadBll.VideoDownload(handleDownloadRecordId, eventId, alarmRecord.alarm_time.ToLocalTime(), camerasList);
                            //}
                            //AddHashTable(item.item_type, new { status = 1, info = "" });
                            AddHashTable(item.item_type, new { status = 0, itemid = item.id, itemType = item.item_type, planRecordId = planRecordId });
                            break;
                        //case (int)EnumClass.EventPlanDefaultOptions.打开周围摄像头:
                        //    AddEventHashTable(item.item_type, new { status = 0, itemid = item.id, itemType = item.item_type, planRecordId = planRecordId, model = item });
                        //    break;
                        case (int)EnumClass.EventPlanDefaultOptions.控制中心声光蜂鸣器开启:
                            HandleRelayBLL handleRelayBll = new HandleRelayBLL();
                            handleRelayBll.HandleRelay(item.ext1, regionModel.region_code);
                            planItemBll.AddItemRecord((int)EnumClass.PlanHandleTime.确警前, item.id, (int)EnumClass.PlanItemResult.成功, item.item_type, planRecordId, "");
                            //  ht.Add(item.item_type, new { status = 1, info = "" });//已执行
                            AddHashTable(item.item_type, new { status = 1, info = "" });
                            break;
                        case (int)EnumClass.EventPlanDefaultOptions.相关摄像头上大屏:
                            AddHashTable(item.item_type, new { status = 0, itemid = item.id, itemType = item.item_type, planRecordId = planRecordId, info = "" });
                            break;
                        case (int)EnumClass.EventPlanDefaultOptions.通知其他负责人:
                            PlanPersonBLL planPersonBll = new PlanPersonBLL();
                            int handlePersonRecordId = planItemBll.AddItemRecord((int)EnumClass.PlanHandleTime.确警前, item.id, (int)EnumClass.PlanItemResult.失败, item.item_type, planRecordId, "暂未设置短信平台");
                            if (handlePersonRecordId > 0)  //插入处置项记录成功，开始执行处置项
                            {
                                bool bl = planPersonBll.HandlePlanPerson(item.id, alarmRecord, handlePersonRecordId);
                            }
                            // ht.Add(item.item_type, new { status = 1, info = "" });
                            AddHashTable(item.item_type, new { status = 1, info = "" });
                            break;
                        case (int)EnumClass.EventPlanDefaultOptions.通知设备网格第一负责人:
                            int firstDutyRecordId = planItemBll.AddItemRecord((int)EnumClass.PlanHandleTime.确警前, item.id, (int)EnumClass.PlanItemResult.失败, item.item_type, planRecordId, "暂未设置短信平台");
                            AddHashTable(item.item_type, new { status = 1, info = "" });
                            break;
                        default: break;
                    }
                }
            }
            catch (Exception ex)
            {
                camerasList = null;
                ledMessage = "";
                Log4NetHelp.Info("处理事件预案失败！预案执行记录ID：" + planRecordId + " " + ex.Message);
            }
        }

        /// <summary>
        /// 执行设备预案处置项
        /// </summary>
        /// <param name="itemList"></param>
        /// <returns></returns>
        public void HandleDevicePlanItem(int planRecordId, int eventId, BaseRegionConfigModel regionModel, List<ServPlanHandleItemModel> itemList, ServDeviceInfoModel deviceInfo, ServAlarmRecordModel alarmRecord, out List<ServDeviceInfoModel> camerasList, out string ledMessage)
        {
            try
            {
                PlanItemBLL planItemBll = new PlanItemBLL();
                ServPlanHandleItemModel handleItemModel = itemList.FirstOrDefault(n => n.item_type == (int)EnumClass.DevicePlanDefaultOptions.关联摄像头);
                if (handleItemModel != null)
                {
                    HandleCamerasBLL camerasbll = new HandleCamerasBLL();
                    camerasList = camerasbll.GetCameras(handleItemModel.id);
                }
                else
                {
                    camerasList = null;
                }
                LEDHandle ledHandle = new LEDHandle(deviceInfo, alarmRecord);
                ledMessage = ledHandle.GetAlarmText();

                foreach (ServPlanHandleItemModel item in itemList)
                {
                    switch (item.item_type)
                    {
                        case (int)EnumClass.DevicePlanDefaultOptions.中控室LED信息显示:
                            // string content = "";
                            // LEDHandle ledHandle = new LEDHandle(deviceInfo, alarmRecord);
                            bool ledResult = ledHandle.HandleLedItem(ledMessage, regionModel.region_code);  //处理LED
                            planItemBll.AddItemRecord((int)EnumClass.PlanHandleTime.确警前, item.id, (int)EnumClass.PlanItemResult.成功, item.item_type, planRecordId, ledMessage);
                            //if (!ht.ContainsKey(item.item_type))
                            //{
                            //    ht.Add(item.item_type, new { status = 1, info = "" });//已执行
                            //}
                            //else
                            //{
                            //    Log4NetHelp.Info("处置项重复：" + Enum.Parse(typeof(EnumClass.DevicePlanDefaultOptions), item.item_type.ToString()).ToString());
                            //}
                            AddHashTable(item.item_type, new { status = 1, info = "" });
                            break;
                        case (int)EnumClass.DevicePlanDefaultOptions.关联摄像头:

                            // ht.Add(item.item_type, new { status = 0, itemid = item.id, itemType = item.item_type, planRecordId = planRecordId });//未执行
                            AddHashTable(item.item_type, new { status = 0, itemid = item.id, itemType = item.item_type, planRecordId = planRecordId });
                            break;
                        case (int)EnumClass.DevicePlanDefaultOptions.告警视频下载:
                            int handleDownloadRecordId = planItemBll.AddItemRecord((int)EnumClass.PlanHandleTime.确警前, item.id, (int)EnumClass.PlanItemResult.成功, item.item_type, planRecordId, "");
                            if (handleDownloadRecordId > 0) //插入处置项记录成功，开始执行处置项
                            {
                                VideoDownloadBLL videoDownloadBll = new VideoDownloadBLL();
                                bool bl = videoDownloadBll.VideoDownload(handleDownloadRecordId, eventId, alarmRecord.alarm_time.ToLocalTime(), camerasList);
                            }
                            //  ht.Add(item.item_type, new { status = 1, info = "" });//已执行
                            AddHashTable(item.item_type, new { status = 1, info = "" });
                            break;
                        case (int)EnumClass.DevicePlanDefaultOptions.打开告警设备附近视频:
                            // ht.Add(item.item_type, new { status = 0, itemid = item.id, itemType = item.item_type, planRecordId = planRecordId, info = "" });//未执行
                            AddHashTable(item.item_type, new { status = 0, itemid = item.id, itemType = item.item_type, planRecordId = planRecordId, info = "" });
                            break;
                        case (int)EnumClass.DevicePlanDefaultOptions.控制中心声光蜂鸣器开启:
                            HandleRelayBLL handleRelayBll = new HandleRelayBLL();
                            handleRelayBll.HandleRelay(item.ext1, regionModel.region_code);
                            planItemBll.AddItemRecord((int)EnumClass.PlanHandleTime.确警前, item.id, (int)EnumClass.PlanItemResult.成功, item.item_type, planRecordId, "");
                            //  ht.Add(item.item_type, new { status = 1, info = "" });//已执行
                            AddHashTable(item.item_type, new { status = 1, info = "" });
                            break;
                        case (int)EnumClass.DevicePlanDefaultOptions.相关摄像头上大屏:
                            // ht.Add(item.item_type, new { status = 0, itemid = item.id, itemType = item.item_type, planRecordId = planRecordId, info = "" });//未执行
                            AddHashTable(item.item_type, new { status = 0, itemid = item.id, itemType = item.item_type, planRecordId = planRecordId, info = "" });
                            break;
                        case (int)EnumClass.DevicePlanDefaultOptions.通知其他负责人:
                            PlanPersonBLL planPersonBll = new PlanPersonBLL();
                            int handlePersonRecordId = planItemBll.AddItemRecord((int)EnumClass.PlanHandleTime.确警前, item.id, (int)EnumClass.PlanItemResult.失败, item.item_type, planRecordId, "暂未设置短信平台");
                            if (handlePersonRecordId > 0)  //插入处置项记录成功，开始执行处置项
                            {
                                bool bl = planPersonBll.HandlePlanPerson(item.id, alarmRecord, handlePersonRecordId);
                            }
                            // ht.Add(item.item_type, new { status = 1, info = "" });
                            AddHashTable(item.item_type, new { status = 1, info = "" });
                            break;
                        case (int)EnumClass.DevicePlanDefaultOptions.通知设备网格第一负责人:
                            //查找第一负责人，发送短信，记录短信记录与执行结果
                            // planItemBll.AddItemRecord((int)EnumClass.PlanHandleTime.确警前, item.id, item.item_type, planRecordId, "");
                            // ht.Add(item.item_type, new { status = 1, info = "" });
                            int dutyPersonRecordId = planItemBll.AddItemRecord((int)EnumClass.PlanHandleTime.确警前, item.id, (int)EnumClass.PlanItemResult.失败, item.item_type, planRecordId, "暂未设置短信平台");
                            AddHashTable(item.item_type, new { status = 1, info = "" });
                            break;
                        default: break;
                    }

                }
            }
            catch (Exception ex)
            {
                camerasList = null;
                ledMessage = "";
                Log4NetHelp.Info("处理设备预案失败！报警记录ID：" + planRecordId + " " + ex.Message);
            }
            // return ht;
        }
        /// <summary>
        /// 将处置项结果拼装到hashtable中
        /// </summary>
        /// <param name="item_type"></param>
        /// <param name="obj"></param>
        /// <returns></returns>
        private void AddHashTable(int item_type, object obj)
        {
            if (!hash.ContainsKey(item_type))
            {
                hash.Add(item_type, obj);
            }
            else
            {
                Log4NetHelp.Info("处置项重复：" + Enum.Parse(typeof(EnumClass.DevicePlanDefaultOptions), item_type.ToString()).ToString());
            }
            //hash.Add(item_type, obj);
        }
        /// <summary>
        /// 将事件预案处置项结果拼装到hashtable中
        /// </summary>
        /// <param name="item_type"></param>
        /// <param name="obj"></param>
        private void AddEventHashTable(int item_type, object obj)
        {
            hash.Add(item_type, obj);
        }

        /// <summary>
        /// 根据设备code查找设备
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        private ServDeviceInfoModel GetDeviceInfo(string code)
        {
            try
            {
                ServDeviceInfoDAL deviceInfoDal = new ServDeviceInfoDAL();
                return deviceInfoDal.GetEntity(code);
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("根据设备Code获取设备失败：" + code + " 错误信息：" + ex.Message);
                return null;
            }
        }
        /// <summary>
        /// 根据设备ID，报警时间，预案状态查找设备预案
        /// </summary>
        /// <param name="deviceId"></param>
        /// <param name="planTime"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        private List<DevicePlanAndTimeConfig> CheckDevicePlanIsExist(int deviceId, int status, string alarmTime)
        {
            try
            {
                ServDevicePlanDAL devicePlanDal = new ServDevicePlanDAL();
                DevicePlanQuery query = new DevicePlanQuery();
                query.alarmTime = alarmTime;
                query.deviceId = deviceId;
                query.planStatus = status;
                return devicePlanDal.QueryDevicePlanByDeviceIdAndTime(query);
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("根据设备ID，报警时间，预案状态查找设备预案失败！设备ID：" + deviceId + "报警时间：" + alarmTime + "预案状态：" + status + "错误信息：" + ex.Message);
                return null;
            }
        }
        /// <summary>
        /// 通过事件类型,园区ID以及时间配置查找事件预案
        /// </summary>
        /// <param name="alarmTime"></param>
        /// <param name="eventType"></param>
        /// <param name="planStatus"></param>
        /// <param name="regionId"></param>
        /// <returns></returns>
        private List<EventPlanAndTimeConfig> CheckEventPlanIsExist(string alarmTime, int eventType, int planStatus, int regionId)
        {
            try
            {
                ServEventPlanDAL eventPlanDal = new ServEventPlanDAL();
                EventPlanQuery query = new EventPlanQuery();
                query.alarmTime = alarmTime;
                query.eventType = eventType;
                query.planStatus = planStatus;
                query.regionId = regionId;
                return eventPlanDal.QueryEventPlanByEventIdAndTime(query);
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("根据设备ID，报警时间，预案状态查找设备预案失败！事件类型：" + eventType + "报警时间：" + alarmTime + " 园区ID：" + regionId + " 预案状态：" + planStatus + "错误信息：" + ex.Message);
                return null;
            }
        }
        /// <summary>
        /// 根据预案类型，预案ID，确警前/后条件查找预案处置项
        /// </summary>
        /// <param name="planId"></param>
        /// <param name="planType"></param>
        /// <param name="configType"></param>
        /// <returns></returns>
        private List<ServPlanHandleItemModel> GetPlanHandleItem(int planId, int planType, int configType)
        {
            try
            {
                ServPlanHandleItemDAL planHandleItemDal = new ServPlanHandleItemDAL();
                return planHandleItemDal.GetPlanHandleItem(planId, planType, configType);
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("根据预案类型，预案ID，确警前查找预案处置项失败！预案ID" + planId + "预案类型：" + planType + "确警前/后" + configType + "错误信息：" + ex.Message);
                return null;
            }
        }
        /// <summary>
        /// 根据事件ID获取视频下载时间
        /// </summary>
        /// <param name="eventId"></param>
        /// <returns></returns>
        public ServAlarmVideoTimeModel GetAlarmVideoTime(int eventId)
        {
            try
            {
                ServAlarmVideoTimeDAL alarmVideoTimeDal = new ServAlarmVideoTimeDAL();
                return alarmVideoTimeDal.GetEntityByEventId(eventId);
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("根据事件ID查找视频播放时间失败！事件ID：" + eventId + " 错误信息：" + ex.Message);
                return null;
            }
        }
    }
}
