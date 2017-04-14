using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.DAL;
using CSM.Model.QueryModel;
using CSM.Common;
using CSM.Model.CustomModel;
using System.IO;

namespace CSM.BLL
{
    public class ServAlarmRecordBLL
    {
        private ServAlarmRecordDAL _servAlarmRecordDal = new ServAlarmRecordDAL();
        private ServPersonInfoDAL servPersonInfoDAL = new ServPersonInfoDAL();
        private ServPlanRecordDAL _servPlanRecordDal = new ServPlanRecordDAL();
        /// <summary>
        /// 不带查询条件分页
        /// </summary>
        /// <param name="pageIndex">第几页</param>
        /// <param name="pageSize">每页数量</param>
        /// <param name="totalNumber">总条数</param>
        /// <returns></returns>
        public List<ServAlarmRecordModel> GetAllPageList(int pageIndex, int pageSize, out int totalNumber)
        {
            return _servAlarmRecordDal.GetEntities(pageIndex, pageSize, out totalNumber);
        }
        /// <summary>
        /// 带条件分页查询
        /// </summary>
        /// <param name="pageIndex">第几页</param>
        /// <param name="pageSize">每页数量</param>
        /// <param name="alarmCode">报警编号</param>
        /// <param name="alarmType">报警类型</param>
        /// <param name="subSystem">子系统类型</param>
        /// <param name="startTime">起始时间</param>
        /// <param name="endTime">截止时间</param>
        /// <param name="totalNumber">总条数</param>
        /// <returns></returns>
        public List<AlarmRecordModel> QueryPageList(int pageIndex, int pageSize, int regionId, int confirmState, int alarmType, int alarmLevel, int[] subSystem, string startTime, string endTime, out int totalNumber)
        {
            List<AlarmRecordModel> retList = new List<AlarmRecordModel>();
            AlarmRecordModel retModel = null;
            try
            {
                // ServDeviceInfoDAL servDeviceInfoDal = null;
                ServAlarmRecordQuery queryModel = new ServAlarmRecordQuery();
                queryModel.alarmCode = "";
                queryModel.confirmState = confirmState;
                queryModel.alarmType = alarmType;
                queryModel.alarmLevel = alarmLevel;
                queryModel.endTime = endTime;
                queryModel.pageIndex = pageIndex;
                queryModel.pageSize = pageSize;
                queryModel.startTime = startTime;
                queryModel.regionId = regionId;
                if (subSystem != null && subSystem.Length > 0)
                {
                    queryModel.subSystem = subSystem;
                }
                else
                {
                    queryModel.subSystem = null;
                }
                //   return _servAlarmRecordDal.GetEntities(queryModel, out totalNumber);
                List<AlarmRecordCustom> list = _servAlarmRecordDal.GetEntities(queryModel, out totalNumber);  //分页查询报警信息
                if (list != null)
                {
                    BaseEventTypeBLL baseEventTypeBll = new BaseEventTypeBLL();
                    List<BaseEventTypeModel> eventList = baseEventTypeBll.GetAllEventType();   //获取全部事件类型
                    foreach (AlarmRecordCustom model in list)
                    {
                        retModel = TranAlarmRecord(model, eventList);
                        retList.Add(retModel);
                    }
                }
                return retList;
            }
            catch (Exception ex)
            {
                //log BLL层查询设备报警列表失败+ex.message
                throw ex;
            }
        }
        /// <summary>
        /// 报警数据拼装
        /// </summary>
        /// <param name="sourceModel"></param>
        /// <param name="eventList"></param>
        /// <returns></returns>
        private AlarmRecordModel TranAlarmRecord(AlarmRecordCustom sourceModel, List<BaseEventTypeModel> eventList)
        {
            AlarmRecordModel retModel = new AlarmRecordModel();
            ServDeviceInfoDAL servDeviceInfoDal = new ServDeviceInfoDAL();
            BaseRegionConfigDAL baseRegionConfigDal = new BaseRegionConfigDAL();
            ServPersonInfoDAL personInfoDal = new ServPersonInfoDAL();

            List<BaseRegionConfigModel> regionList = baseRegionConfigDal.GetAllRegionConfig();//获取全部园区

            #region 查找事件  旧版
            //if (alarmEvent == null)   //判断当前事件是否存在
            //{
            //    retModel.alarmEvent = "";
            //    retModel.rootEventId = -1;
            //}
            //else
            //{
            //    if (alarmEvent.pid == -1)  //判断是否是父级事件
            //    {
            //        retModel.alarmEvent = alarmEvent.event_name;
            //        retModel.rootEventId = alarmEvent.id;
            //    }
            //    else
            //    {
            //        var rootEvent = eventList.FirstOrDefault(n => n.id == alarmEvent.pid);//查询父级事件，目前事件只保留两级
            //        if (rootEvent != null)   //找到父级事件
            //        {
            //            retModel.alarmEvent = alarmEvent.event_name + "[" + rootEvent.event_name + "]";
            //            retModel.rootEventId = rootEvent.id;
            //        }
            //        else                    //未找到父级事件
            //        {
            //            retModel.alarmEvent = "[" + rootEvent.event_name + "]";
            //            retModel.rootEventId = -1;
            //        }
            //    }

            //}

            #endregion

            #region   查找事件
            //var alarmEvent = eventList.FirstOrDefault(n => n.id == sourceModel.alarm_event); //查询当前事件
            //if (alarmEvent == null)   //判断当前事件是否存在
            //{
            //    retModel.alarmEvent = "--";
            //    retModel.rootEventId = -1;
            //}
            //else
            //{
            //    if (alarmEvent.pid == -1)  //判断是否是父级事件
            //    {
            //        retModel.alarmEvent = alarmEvent.event_name;
            //        retModel.rootEventId = alarmEvent.id;
            //    }
            //    else
            //    {
            //        var rootEvent = eventList.FirstOrDefault(n => n.id == alarmEvent.pid);//查询父级事件，目前事件只保留两级
            //        if (rootEvent != null)   //找到父级事件
            //        {
            //            retModel.alarmEvent = rootEvent.event_name;
            //            retModel.rootEventId = rootEvent.id;
            //        }
            //        else                    //未找到父级事件
            //        {
            //            retModel.alarmEvent = "--";
            //            retModel.rootEventId = -1;
            //        }
            //    }

            //}
            #endregion

            #region 查找事件  新版
            if (!string.IsNullOrEmpty(sourceModel.alarm_event) && sourceModel.alarm_event != "")
            {
                var alarmEvent = eventList.FirstOrDefault(n => n.event_code == sourceModel.alarm_event);//查找事件
                if (alarmEvent != null)
                {
                    if (alarmEvent.pid == -1)
                    {
                        retModel.alarmEvent = alarmEvent.event_name;
                        retModel.rootEventId = alarmEvent.id;
                    }
                    else
                    {
                        var rootEvent = eventList.FirstOrDefault(n => n.id == alarmEvent.pid);
                        if (rootEvent != null)   //找到父级事件
                        {
                            retModel.alarmEvent = rootEvent.event_name;
                            retModel.rootEventId = rootEvent.id;
                        }
                        else                    //未找到父级事件
                        {
                            retModel.alarmEvent = "--";
                            retModel.rootEventId = -1;
                        }
                    }
                }
                else
                {
                    retModel.alarmEvent = "--";
                    retModel.rootEventId = -1;
                }
            }
            else
            {
                retModel.alarmEvent = "--";
                retModel.rootEventId = -1;
            }
            #endregion

            // retModel.alarmEvent = eventList.Find(n => n.id == sourceModel.alarm_event) == null ? "" : eventList.Find(n => n.id == sourceModel.alarm_event).event_name;//将事件类型ID转换为事件名称

            retModel.alarmLevel = Enum.IsDefined(typeof(EnumClass.AlarmLevel), sourceModel.alarm_level) ? Enum.ToObject(typeof(EnumClass.AlarmLevel), sourceModel.alarm_level).ToString() : "";//转换报警等级
            retModel.alarmLocation = sourceModel.alarm_location;
            // retModel.alarmName = sourceModel.alarm_name;
            retModel.alarmName = sourceModel.alarm_code;//报警名称不显示，显示设备code
            retModel.alarmText = sourceModel.alarm_text;
            retModel.alarmTime = sourceModel.alarm_time;
            retModel.alarmCacheStatus = sourceModel.alarm_cache_status;
            retModel.alarmType = sourceModel.alarm_type;//设备报警
                                                        // retModel.confirmPersonName = "";//根据ssoid查找人员 需调用sso接口
            retModel.confirmPersonName = personInfoDal.GetPersonInfoBySSOId(sourceModel.confirm_person_id) == null ? "" : personInfoDal.GetPersonInfoBySSOId(sourceModel.confirm_person_id).alias;
            retModel.confirmAlarmTime = sourceModel.confirm_alarm_time;
            retModel.confirmAlarmText = sourceModel.confirm_alarm_text;
            retModel.confirmResult = Enum.IsDefined(typeof(EnumClass.ConfirmAlarmResult), sourceModel.confirm_result) ? Enum.ToObject(typeof(EnumClass.ConfirmAlarmResult), sourceModel.confirm_result).ToString() : "";
            retModel.confirmState = Enum.IsDefined(typeof(EnumClass.ConfirmAlarmState), sourceModel.confirm_state) ? Enum.ToObject(typeof(EnumClass.ConfirmAlarmState), sourceModel.confirm_state).ToString() : "";
            // retModel.deviceName = servDeviceInfoDal.GetEntity(sourceModel.alarm_code) == null ? "未知：" + sourceModel.alarm_code : servDeviceInfoDal.GetEntity(sourceModel.alarm_code).device_name;//查询设备名称
            retModel.deviceName = sourceModel.device_name == null ? "未知" : sourceModel.device_name;
            retModel.regionName = regionList.Where(n => n.id == sourceModel.region_id).FirstOrDefault() == null ? "" : regionList.Where(n => n.id == sourceModel.region_id).FirstOrDefault().region_name;
            retModel.ext1 = sourceModel.ext1;
            retModel.ext2 = sourceModel.ext2;
            retModel.ext3 = sourceModel.ext3;
            retModel.ext4 = sourceModel.ext4;
            retModel.ext5 = sourceModel.ext5;
            retModel.id = sourceModel.id;
            retModel.subSystem = Enum.IsDefined(typeof(EnumClass.SubSystem), sourceModel.alarm_subsystem) ? Enum.ToObject(typeof(EnumClass.SubSystem), sourceModel.alarm_subsystem).ToString() : "";//转换为子系统名称
            return retModel;
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="confirmState"></param>
        /// <param name="alarmType"></param>
        /// <param name="subSystem"></param>
        /// <param name="alarmLevel"></param>
        /// <returns></returns>
        public System.IO.MemoryStream GetAllAlarmRecordCondition(int regionId, string startTime, string endTime, int confirmState, int alarmType, string subSystem, int alarmLevel)
        {

            List<AlarmRecordModel> retList = new List<AlarmRecordModel>();
            #region   拼接DataTable列头
            System.Data.DataTable table = new System.Data.DataTable();
            table.Columns.Add("告警编号");
            table.Columns.Add("设备编号");
            table.Columns.Add("事件类型");
            table.Columns.Add("设备名称");
            table.Columns.Add("子系统类型");
            table.Columns.Add("报警时间");
            table.Columns.Add("报警级别");
            table.Columns.Add("确警人");
            table.Columns.Add("园区");
            table.Columns.Add("确警时间");
            table.Columns.Add("确警结果");
            table.Columns.Add("报警位置");
            table.Columns.Add("确警描述");

            #endregion
            AlarmRecordModel retModel = null;
            try
            {
                DefinedAlarmRecordQuery queryModel = new DefinedAlarmRecordQuery();
                queryModel.alarmCode = "";
                queryModel.confirmState = confirmState;
                queryModel.alarmType = alarmType;
                queryModel.alarmLevel = alarmLevel;
                queryModel.endTime = endTime;
                queryModel.startTime = startTime;
                queryModel.regionId = regionId;
                if (!string.IsNullOrEmpty(subSystem))
                {
                    if (subSystem.Contains(','))
                    {
                        string[] arr = subSystem.Split(',');
                        int[] intArr = Array.ConvertAll<string, int>(arr, n => int.Parse(n));
                        queryModel.subSystem = intArr;
                    }
                    else
                    {
                        int[] intArr = new int[] { int.Parse(subSystem) };
                        queryModel.subSystem = intArr;
                    }
                }
                else
                {
                    queryModel.subSystem = null;
                }
                List<AlarmRecordCustom> list = _servAlarmRecordDal.GetAllAlarmRecordCondition(queryModel);  //分页查询报警信息
                if (list != null)
                {
                    BaseEventTypeBLL baseEventTypeBll = new BaseEventTypeBLL();
                    List<BaseEventTypeModel> eventList = baseEventTypeBll.GetAllEventType();   //获取全部事件类型
                    foreach (AlarmRecordCustom model in list)
                    {
                        retModel = TranAlarmRecord(model, eventList);
                        System.Data.DataRow row = table.NewRow();
                        row["告警编号"] = retModel.id;
                        row["设备编号"] = retModel.alarmName;
                        row["事件类型"] = retModel.alarmEvent;
                        row["设备名称"] = retModel.deviceName;
                        row["子系统类型"] = retModel.subSystem;
                        row["报警时间"] = retModel.alarmTime.ToString();
                        row["报警级别"] = retModel.alarmLevel;
                        row["确警人"] = retModel.confirmPersonName;
                        row["园区"] = retModel.regionName;
                        row["确警时间"] = retModel.alarmTime == retModel.confirmAlarmTime ? "" : retModel.confirmAlarmTime.ToString();
                        row["确警结果"] = retModel.confirmResult;
                        row["报警位置"] = retModel.alarmLocation;
                        row["确警描述"] = retModel.confirmAlarmText;
                        table.Rows.Add(row);
                        // retList.Add(retModel);
                    }
                }
                //  System.Data.DataTable dt= CSM.Utils.ExcelHelper.ToDataTable(retList);
                // System.IO.MemoryStream ms = CSM.Utils.ExcelHelper.DataTableToExcel(dt, "sheet2");

                System.IO.MemoryStream ms = CSM.Utils.ExcelHelper.DataTableToExcel(table, "sheet2");
                // System.IO.MemoryStream ms = CSM.Utils.ExcelHelper.GetExcelStream(retList);
                return ms;
            }
            catch (Exception ex)
            {
                //log BLL层查询设备报警列表失败+ex.message
                throw ex;
            }

        }
        /// <summary>
        /// 获取最新报警预案执行结果
        /// </summary>
        /// <returns></returns>
        public PlanItemHandledInfo GetLastPlanItemResultList()
        {
            try
            {
                ServAlarmRecordModel model = _servAlarmRecordDal.GetLastAlarmRecord();
                return PlanItemResultList(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取指定报警预案执行结果
        /// </summary>
        /// <param name="alarmId"></param>
        /// <returns></returns>
        public PlanItemHandledInfo GetPlanItemResultList(int alarmId)
        {
            try
            {
                ServAlarmRecordModel model = _servAlarmRecordDal.GetEntity(alarmId);
                return PlanItemResultList(model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 查找预案处置项执行结果记录
        /// 先根据报警ID查找预案执行记录planRecordId，再通过planRecordId查找Serv_Plan_ItemResult
        /// </summary>
        /// <param name="alarmId"></param>
        /// <returns></returns>
        private PlanItemHandledInfo PlanItemResultList(ServAlarmRecordModel alarmRecord)
        {
            PlanItemHandledInfo handleInfoModel = new PlanItemHandledInfo();
            try
            {
                ServPlanRecordDAL planRecordDal = new ServPlanRecordDAL();
                ServPlanItemResultDAL planItemResultDal = new ServPlanItemResultDAL();
                ServPlanHandleItemDAL planHandleItemDal = new ServPlanHandleItemDAL();
                ServPlanHandleItemCameraDAL planHandleItemCameraDal = new ServPlanHandleItemCameraDAL();
                // ServAlarmRecordModel alarmRecord = _servAlarmRecordDal.GetEntity(alarmId);
                //查找预案执行记录
                ServPlanRecordModel planRecord = planRecordDal.GetEntityByAlarmId(alarmRecord.id);

                if (planRecord != null)
                {
                    //查找预案处置项记录
                    List<ServPlanItemResultModel> planItemRecordList = planItemResultDal.GetEntitiesByPlanRecordId(planRecord.id);
                    if (planItemRecordList != null)
                    {
                        handleInfoModel = TranPlanItemRecord(planRecord.plan_type, planItemRecordList, alarmRecord.alarm_event, alarmRecord.alarm_time);
                    }
                    else
                    {
                        //log 根据预案执行记录ID未找到预案处置项记录
                    }

                    //查找关联摄像头信息(事件预案无关联摄像头)
                    //if (planRecord.plan_type == (int)EnumClass.PlanType.事件预案)
                    //{
                    //    ServPlanHandleItemModel planHandleItemModel = planHandleItemDal.GetPlanHandleItemByTypeAndId(planRecord.plan_id, planRecord.plan_type, (int)EnumClass.EventPlanDefaultOptions.关联摄像头);
                    //    if (planHandleItemModel != null)
                    //    {
                    //        handleInfoModel.cameraList = planHandleItemCameraDal.GetHandledCameras(planHandleItemModel.id);
                    //    }
                    //}
                    if (planRecord.plan_type == (int)EnumClass.PlanType.设备预案)
                    {
                        ServPlanHandleItemModel planHandleItemModel = planHandleItemDal.GetPlanHandleItemByTypeAndId(planRecord.plan_id, planRecord.plan_type, (int)EnumClass.DevicePlanDefaultOptions.关联摄像头);
                        if (planHandleItemModel != null)
                        {
                            handleInfoModel.cameraList = planHandleItemCameraDal.GetHandledCameras(planHandleItemModel.id);
                        }
                    }
                }
                else
                {
                    //log 根据alarmId查找预案执行记录为null

                }
                handleInfoModel.alarmRecord = alarmRecord;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            return handleInfoModel;
        }
        /// <summary>
        ///预案处置项记录结果转换
        /// </summary>
        /// <param name="planType"></param>
        /// <param name="ItemList"></param>
        /// <returns></returns>
        private PlanItemHandledInfo TranPlanItemRecord(int planType, List<ServPlanItemResultModel> ItemList, string eventCode, DateTime alarmTime)
        {
            PlanItemHandledInfo handleInfoModel = new PlanItemHandledInfo();
            List<TranPlanItemResult> retList = new List<TranPlanItemResult>();
            TranPlanItemResult retModel = null;
            ServAlarmVideoTimeDAL alarmVideoTimeDal = new ServAlarmVideoTimeDAL();
            BaseEventTypeBLL baseEventTypeBll = new BaseEventTypeBLL();
            List<BaseEventTypeModel> eventList = baseEventTypeBll.GetAllEventType();   //获取全部事件类型
            #region 查找事件  旧版
            //int queryEventId = eventId;
            //var alarmEvent = eventList.FirstOrDefault(n => n.id == eventId); //查询当前事件
            //if (alarmEvent != null && alarmEvent.pid != -1)  //判断是否是父级事件
            //{
            //    var rootEvent = eventList.FirstOrDefault(n => n.id == alarmEvent.pid);//查询父级事件，目前事件只保留两级
            //    if (rootEvent != null)
            //    {
            //        queryEventId = rootEvent.id;
            //    }
            //    else
            //    {
            //        queryEventId = -1;
            //    }
            //}

            #endregion

            #region 查找事件  新版
            int queryEventId = -1;
            if (!string.IsNullOrEmpty(eventCode) && eventCode != "")
            {
                var alarmEvent = eventList.FirstOrDefault(n => n.event_code == eventCode);//查找事件
                if (alarmEvent != null)
                {
                    if (alarmEvent.pid == -1)
                    {
                        queryEventId = alarmEvent.id;
                    }
                    else
                    {
                        var rootEvent = eventList.FirstOrDefault(n => n.id == alarmEvent.pid);
                        if (rootEvent != null)   //找到父级事件
                        {
                            queryEventId = rootEvent.id;
                        }
                        else                    //未找到父级事件
                        {
                            queryEventId = -1;
                        }
                    }
                }
                else
                {
                    queryEventId = -1;
                }
            }
            else
            {
                queryEventId = -1;
            }
            #endregion
            //查询摄像头播放视频时长
            var videoTimeModel = alarmVideoTimeDal.GetEntityByEventId(queryEventId);
            handleInfoModel.videoTime = new ServAlarmVideoTimeCustom();
            handleInfoModel.videoTime.videoTimeModel = videoTimeModel;
            handleInfoModel.videoTime.videoStartTime = alarmTime.AddSeconds(-handleInfoModel.videoTime.videoTimeModel.start_time);
            handleInfoModel.videoTime.videoEndTime = alarmTime.AddSeconds(handleInfoModel.videoTime.videoTimeModel.start_time);

            foreach (ServPlanItemResultModel item in ItemList)
            {
                retModel = new TranPlanItemResult();
                retModel.itemRecordId = item.id;
                retModel.content = item.content;
                retModel.executeTime = item.execute_time.ToString();
                retModel.confirm_type = item.confirm_type;
                retModel.itemResult = Enum.IsDefined(typeof(EnumClass.PlanItemResult), item.item_result) ? Enum.ToObject(typeof(EnumClass.PlanItemResult), item.item_result).ToString() : "";

                #region  设备预案与事件预案分开处理，防止处置项类型不一致
                switch (planType)
                {
                    case (int)EnumClass.PlanType.设备预案:
                        switch (item.confirm_type)
                        {
                            case (int)EnumClass.PlanHandleTime.确警前:
                                retModel.itemName = Enum.IsDefined(typeof(EnumClass.DevicePlanDefaultOptions), item.item_type) ? Enum.ToObject(typeof(EnumClass.DevicePlanDefaultOptions), item.item_type).ToString() : "";
                                switch (item.item_type)
                                {
                                    //case (int)EnumClass.DevicePlanDefaultOptions.关联摄像头:
                                    //    //查找关联的摄像头名称以及报警时长
                                    //    ServPlanHandleItemCameraDAL planHandleItemCameraDal = new ServPlanHandleItemCameraDAL();
                                    //    handleInfoModel.cameraList = planHandleItemCameraDal.GetHandledCameras(item.handleitem_id);
                                    //    break;
                                    case (int)EnumClass.DevicePlanDefaultOptions.告警视频下载:
                                        //查找视频下载记录状态
                                        ServVideoPlanHandleRecordDAL servVideoPlanHandleRecordDal = new ServVideoPlanHandleRecordDAL();
                                        handleInfoModel.videoList = servVideoPlanHandleRecordDal.GetDownLoadVideoListByItemId(item.id);
                                        break;
                                    case (int)EnumClass.DevicePlanDefaultOptions.通知其他负责人:
                                        //查看短信记录
                                        ServSMSRecordDAL smsRecordPersomDal = new ServSMSRecordDAL();
                                        handleInfoModel.beforeConfirmedPersonList = smsRecordPersomDal.GetSMSRecordByHandleRecordId(item.id);
                                        break;
                                    case (int)EnumClass.DevicePlanDefaultOptions.通知设备网格第一负责人:
                                        //查看短信记录
                                        ServSMSRecordDAL smsRecordLeadDal = new ServSMSRecordDAL();
                                        handleInfoModel.beforeConfirmedLeadList = smsRecordLeadDal.GetSMSRecordByHandleRecordId(item.id);
                                        break;
                                    default: break;
                                }
                                break;
                            case (int)EnumClass.PlanHandleTime.确警后:
                                retModel.itemName = Enum.IsDefined(typeof(EnumClass.DevicePlanConfirmOptions), item.item_type) ? Enum.ToObject(typeof(EnumClass.DevicePlanConfirmOptions), item.item_type).ToString() : "";
                                switch (item.item_type)
                                {
                                    case (int)EnumClass.DevicePlanConfirmOptions.通知其他负责人:
                                        //查看短信记录
                                        ServSMSRecordDAL smsRecordPersomDal = new ServSMSRecordDAL();
                                        handleInfoModel.afterConfirmedPersonList = smsRecordPersomDal.GetSMSRecordByHandleRecordId(item.id);
                                        break;
                                    case (int)EnumClass.DevicePlanConfirmOptions.通知设备网格第一负责人:
                                        //查看短信记录
                                        ServSMSRecordDAL smsRecordLeadDal = new ServSMSRecordDAL();
                                        handleInfoModel.afterConfirmedLeadList = smsRecordLeadDal.GetSMSRecordByHandleRecordId(item.id);
                                        break;
                                    default: break;
                                }
                                break;
                            default: break;
                        }
                        break;
                    case (int)EnumClass.PlanType.事件预案:
                        switch (item.confirm_type)
                        {
                            case (int)EnumClass.PlanHandleTime.确警前:
                                retModel.itemName = Enum.IsDefined(typeof(EnumClass.EventPlanDefaultOptions), item.item_type) ? Enum.ToObject(typeof(EnumClass.EventPlanDefaultOptions), item.item_type).ToString() : "";
                                switch (item.item_type)
                                {
                                    //case (int)EnumClass.EventPlanDefaultOptions.关联摄像头:
                                    //    //查找关联的摄像头名称以及报警时长
                                    //    ServPlanHandleItemCameraDAL planHandleItemCameraDal = new ServPlanHandleItemCameraDAL();
                                    //    handleInfoModel.cameraList = planHandleItemCameraDal.GetHandledCameras(item.handleitem_id);
                                    //    break;
                                    case (int)EnumClass.EventPlanDefaultOptions.告警视频下载:
                                        //查找视频下载记录状态
                                        ServVideoPlanHandleRecordDAL servVideoPlanHandleRecordDal = new ServVideoPlanHandleRecordDAL();
                                        handleInfoModel.videoList = servVideoPlanHandleRecordDal.GetDownLoadVideoListByItemId(item.id);
                                        break;
                                    case (int)EnumClass.EventPlanDefaultOptions.通知其他负责人:
                                        //查看短信记录
                                        ServSMSRecordDAL smsRecordPersomDal = new ServSMSRecordDAL();
                                        handleInfoModel.beforeConfirmedPersonList = smsRecordPersomDal.GetSMSRecordByHandleRecordId(item.id);
                                        break;
                                    case (int)EnumClass.EventPlanDefaultOptions.通知设备网格第一负责人:
                                        //查找短信记录
                                        ServSMSRecordDAL smsRecordLeadDal = new ServSMSRecordDAL();
                                        handleInfoModel.beforeConfirmedLeadList = smsRecordLeadDal.GetSMSRecordByHandleRecordId(item.id);
                                        break;
                                    default: break;
                                }
                                break;
                            case (int)EnumClass.PlanHandleTime.确警后:
                                retModel.itemName = Enum.IsDefined(typeof(EnumClass.EventPlanConfirmOptions), item.item_type) ? Enum.ToObject(typeof(EnumClass.EventPlanConfirmOptions), item.item_type).ToString() : "";
                                switch (item.item_type)
                                {
                                    case (int)EnumClass.EventPlanConfirmOptions.通知其他负责人:
                                        ServSMSRecordDAL smsRecordPersomDal = new ServSMSRecordDAL();
                                        handleInfoModel.afterConfirmedPersonList = smsRecordPersomDal.GetSMSRecordByHandleRecordId(item.id);
                                        break;
                                    case (int)EnumClass.EventPlanConfirmOptions.通知设备网格第一负责人:
                                        ServSMSRecordDAL smsRecordLeadDal = new ServSMSRecordDAL();
                                        handleInfoModel.afterConfirmedLeadList = smsRecordLeadDal.GetSMSRecordByHandleRecordId(item.id);
                                        break;
                                    default: break;
                                }
                                break;
                            default: break;
                        }
                        break;
                    default: break;
                }

                #endregion

                retList.Add(retModel);
            }
            handleInfoModel.resultList = retList;
            return handleInfoModel;
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
        public bool ConfirmAlarm(int alarmId, int ssoid, int confirmResult, string location, string content)
        {
            try
            {
                ServAlarmRecordModel alarmRecord = _servAlarmRecordDal.GetEntity(alarmId);
                ServPlanRecordModel planRecord = _servPlanRecordDal.GetEntityByAlarmId(alarmId);
                if (alarmRecord != null)
                {
                    alarmRecord.alarm_location = location;
                    alarmRecord.confirm_alarm_text = content;
                    alarmRecord.confirm_alarm_time = DateTime.Now;
                    alarmRecord.confirm_person_id = ssoid;
                    if (confirmResult == (int)EnumClass.ConfirmAlarmResult.真警执行预案)
                    {
                        //执行确警后预案处置项
                        //ServAlarmRecordModel model = _servAlarmRecordDal.GetEntity(alarmId);
                        //string deviceCode = model.alarm_code;
                        //DateTime alarmTime = model.alarm_time;
                        //查找预案（获取确警后的处置项）

                        #region  确警后操作
                        HandleConfirmAlarm(alarmId, ssoid, alarmRecord, planRecord);
                        #endregion

                    }
                    alarmRecord.confirm_result = confirmResult;
                    alarmRecord.confirm_state = (int)EnumClass.ConfirmAlarmState.确警;
                    return _servAlarmRecordDal.UpdateAlarmRecordById(alarmRecord);
                }
                else
                {
                    //log未找到报警记录，确警失败！+"alarmId"=alarmId+"ssoid"=ssoid
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 处理确警后预案处置项
        /// </summary>
        /// <param name="alarmId"></param>
        public void HandleConfirmAlarm(int alarmId, int ssoId, ServAlarmRecordModel alarmRecord, ServPlanRecordModel planRecord)
        {
            try
            {
                ServPlanHandleItemDAL planHandleDal = new ServPlanHandleItemDAL();
                List<ServPlanHandleItemModel> handleList = planHandleDal.GetConfirmPlanHandleItemByAlarmId(alarmId);//根据报警ID获取确警后处置项
                if (handleList != null)
                {
                    for (int i = 0; i < handleList.Count; i++)
                    {
                        switch (handleList[i].plan_type)
                        {
                            case (int)EnumClass.PlanType.设备预案:
                                switch (handleList[i].item_type)
                                {
                                    case (int)EnumClass.DevicePlanConfirmOptions.启动户外LED信息提示系统:
                                        AddPlanItemRecord(planRecord, handleList[i].item_type, (int)EnumClass.PlanItemResult.失败, DateTime.Now, "暂无设备", handleList[i].confirm_type, handleList[i].id);
                                        break;
                                    case (int)EnumClass.DevicePlanConfirmOptions.是否转到卷宗:
                                        GotoArchive(alarmId, ssoId, alarmRecord, handleList[i].id, handleList[i].item_type);
                                        break;
                                    case (int)EnumClass.DevicePlanConfirmOptions.通知其他负责人:
                                        AddPlanItemRecord(planRecord, handleList[i].item_type, (int)EnumClass.PlanItemResult.失败, DateTime.Now, "暂无设备", handleList[i].confirm_type, handleList[i].id);
                                        break;
                                    case (int)EnumClass.DevicePlanConfirmOptions.通知设备网格第一负责人:
                                        AddPlanItemRecord(planRecord, handleList[i].item_type, (int)EnumClass.PlanItemResult.失败, DateTime.Now, "暂无设备", handleList[i].confirm_type, handleList[i].id);
                                        break;
                                    default: break;
                                }
                                break;
                            case (int)EnumClass.PlanType.事件预案:
                                switch (handleList[i].item_type)
                                {
                                    case (int)EnumClass.EventPlanConfirmOptions.启动户外LED信息提示系统:
                                        AddPlanItemRecord(planRecord, handleList[i].item_type, (int)EnumClass.PlanItemResult.失败, DateTime.Now, "暂无设备", handleList[i].confirm_type, handleList[i].id);
                                        break;
                                    case (int)EnumClass.EventPlanConfirmOptions.是否转到卷宗:
                                        GotoArchive(alarmId, ssoId, alarmRecord, handleList[i].id, handleList[i].item_type);
                                        break;
                                    case (int)EnumClass.EventPlanConfirmOptions.通知其他负责人:
                                        AddPlanItemRecord(planRecord, handleList[i].item_type, (int)EnumClass.PlanItemResult.失败, DateTime.Now, "暂无设备", handleList[i].confirm_type, handleList[i].id);
                                        break;
                                    case (int)EnumClass.EventPlanConfirmOptions.通知设备网格第一负责人:
                                        AddPlanItemRecord(planRecord, handleList[i].item_type, (int)EnumClass.PlanItemResult.失败, DateTime.Now, "暂无设备", handleList[i].confirm_type, handleList[i].id);
                                        break;
                                    default: break;
                                }
                                break;
                            default: break;
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 将报警记录转入卷宗
        /// </summary>
        /// <param name="alarmId"></param>
        private void GotoArchive(int alarmId, int ssoId, ServAlarmRecordModel alarmRecord, int handleItemId, int itemType)
        {
            try
            {

                ServVideoInfoDAL videoDal = new ServVideoInfoDAL();
                ServPlanRecordDAL planRecordDal = new ServPlanRecordDAL();
                ServArchiveInfoBLL archiveInfoBll = new ServArchiveInfoBLL();
                ServPlanItemResultDAL planItemResultDal = new ServPlanItemResultDAL();
                List<ServVideoInfoModel> videoList = videoDal.GetVideoInfoByAlarmId(alarmId);//获取下载的视频
                List<ServFileInfoModel> fileInfoList = new List<ServFileInfoModel>();
                ServFileInfoModel fileInfo = null;
                for (int i = 0; i < videoList.Count; i++)
                {
                    fileInfo = new ServFileInfoModel();
                    fileInfo.content = "确警后转入";
                    fileInfo.create_time = DateTime.Now;
                    fileInfo.file_address = videoList[i].video_path;
                    fileInfo.file_ext_name = Path.GetExtension(videoList[i].video_path);
                    fileInfo.file_name = videoList[i].video_name;
                    fileInfo.file_type = (int)EnumClass.FileType.视频;
                    fileInfo.person_id = ssoId;
                    fileInfoList.Add(fileInfo);
                }


                bool bl = archiveInfoBll.AddservArchiveInfo(alarmRecord.alarm_name, 7, ssoId, alarmRecord.alarm_code, "", alarmRecord.id.ToString(), fileInfoList, (int)EnumClass.ArchiveStatus.新建);
                //插入数据库
                ServPlanRecordModel planRecord = planRecordDal.GetEntityByAlarmId(alarmId);
                ServPlanItemResultModel result = new ServPlanItemResultModel();
                result.confirm_type = (int)EnumClass.PlanHandleTime.确警后;
                result.content = "";
                result.execute_time = DateTime.Now;
                result.handleitem_id = handleItemId;
                result.item_result = bl == true ? (int)EnumClass.PlanItemResult.成功 : (int)EnumClass.PlanItemResult.失败;
                result.item_type = itemType;
                result.plan_record_id = planRecord == null ? -1 : planRecord.id;
                planItemResultDal.AddEntity(result);  //插入处置项处理记录
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 增加预案处置项记录
        /// </summary>
        /// <param name="planRecordId"></param>
        /// <param name="itemType"></param>
        /// <param name="itemResult"></param>
        /// <param name="exeTime"></param>
        /// <param name="content"></param>
        /// <param name="confirmType"></param>
        /// <param name="handleItemId"></param>
        private void AddPlanItemRecord(ServPlanRecordModel planRecord, int itemType, int itemResult, DateTime exeTime, string content, int confirmType, int handleItemId)
        {

            try
            {
                ServPlanItemResultDAL planItemResultDal = new ServPlanItemResultDAL();
                ServPlanItemResultModel result = new ServPlanItemResultModel();
                result.confirm_type = confirmType;
                result.content = content;
                result.execute_time = exeTime;
                result.handleitem_id = handleItemId;
                result.item_result = itemResult;
                result.item_type = itemType;
                result.plan_record_id = planRecord == null ? -1 : planRecord.id;
                planItemResultDal.AddEntity(result);  //插入处置项处理记录
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改报警记录
        /// </summary>
        /// <param name="alarmId"></param>
        /// <param name="location"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        public bool UpdateAlarm(int alarmId, string location, string content)
        {
            try
            {
                ServAlarmRecordModel alarmRecord = _servAlarmRecordDal.GetEntity(alarmId);
                if (alarmRecord != null)
                {
                    alarmRecord.alarm_location = location;
                    alarmRecord.confirm_alarm_text = content;
                    return _servAlarmRecordDal.UpdateAlarmRecordById(alarmRecord);
                }
                else
                {
                    //log未找到报警记录，确警失败！+"alarmId"=alarmId+"ssoid"=ssoid
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 批量确警
        /// </summary>
        /// <param name="alarmIdArr"></param>
        /// <param name="ssoId"></param>
        /// <returns></returns>
        public bool MultipleAlarm(int[] alarmIdArr, int ssoId)
        {
            try
            {
                List<MultipleConfirmAlarm> multipleAlarmList = new List<MultipleConfirmAlarm>();
                MultipleConfirmAlarm multipleAlarm = null;
                for (int i = 0; i < alarmIdArr.Length; i++)
                {
                    multipleAlarm = new MultipleConfirmAlarm();
                    multipleAlarm.alarmId = alarmIdArr[i];
                    multipleAlarm.confirmResult = (int)EnumClass.ConfirmAlarmResult.真警不执行预案;
                    multipleAlarm.confirmState = (int)EnumClass.ConfirmAlarmState.确警;
                    multipleAlarm.confirmTime = DateTime.Now;
                    multipleAlarm.ssoid = ssoId;
                    multipleAlarmList.Add(multipleAlarm);
                }
                return _servAlarmRecordDal.MultipleConfirmAlarm(multipleAlarmList);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取最新报警记录
        /// </summary>
        /// <returns></returns>
        public ServAlarmRecordModel GetLastRecord()
        {
            try
            {
                return _servAlarmRecordDal.GetLastAlarmRecord();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 根据设备编码查找确警后预案处置项
        /// </summary>
        /// <param name="deviceCode"></param>
        /// <returns></returns>
        public List<ServPlanHandleItemModel> GetAllConfirmedPlanItem(string deviceCode)
        {
            try
            {

                return null;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取未确警信息
        /// </summary>
        /// <returns></returns>
        public List<ServAlarmRecordModel> GetNotPoliceNum()
        {
            ServAlarmRecordModel servAlarmRecordModel = new ServAlarmRecordModel();
            servAlarmRecordModel.confirm_state = (int)EnumClass.ConfirmAlarmState.未确警;
            return _servAlarmRecordDal.GetNotPoliceNum(servAlarmRecordModel);
        }

        #region  报警统计信息
        /// <summary>
        /// 获取综合报警页面统计信息
        /// </summary>
        /// <returns></returns>
        public AlarmRecordCount GetAlarmStatistics()
        {
            AlarmRecordCount alarmCount = new AlarmRecordCount();
            ServAlarmRecordDAL servAlarmRecordDal = new ServAlarmRecordDAL();
            try
            {
                alarmCount.nDay = servAlarmRecordDal.GetAlarmCount(PeriodTimeHelper.GetQueryModel(EnumClass.PeriodType.Day));
                alarmCount.nWeek = servAlarmRecordDal.GetAlarmCount(PeriodTimeHelper.GetQueryModel(EnumClass.PeriodType.Week));
                alarmCount.nMonth = servAlarmRecordDal.GetAlarmCount(PeriodTimeHelper.GetQueryModel(EnumClass.PeriodType.Month));
                alarmCount.nQuarter = servAlarmRecordDal.GetAlarmCount(PeriodTimeHelper.GetQueryModel(EnumClass.PeriodType.Quarter));
                alarmCount.fHalfMonth = servAlarmRecordDal.GetAlarmCount(PeriodTimeHelper.GetQueryModel(EnumClass.PeriodType.FHalfYear));
                alarmCount.sHalfMonth = servAlarmRecordDal.GetAlarmCount(PeriodTimeHelper.GetQueryModel(EnumClass.PeriodType.SHalfYear));
                alarmCount.nYear = servAlarmRecordDal.GetAlarmCount(PeriodTimeHelper.GetQueryModel(EnumClass.PeriodType.Year));
                return alarmCount;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        #endregion

        /// <summary>
        /// 获取报警前几条数据
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        public List<AlarmRecordModel> GetFirstFewAlarm(int num)
        {
            try
            {
                ServDeviceInfoDAL servDeviceInfoDal = new ServDeviceInfoDAL();
                List<ServAlarmRecordModel> list = _servAlarmRecordDal.GetFirstFewAlarm(num);
                List<AlarmRecordModel> alarmRecordInfo = new List<AlarmRecordModel>();
                AlarmRecordModel alarmRecordModel;

                foreach (ServAlarmRecordModel item in list)
                {
                    alarmRecordModel = new AlarmRecordModel();
                    alarmRecordModel.id = item.id;
                    alarmRecordModel.alarmName = item.alarm_name;
                    alarmRecordModel.confirmState = Enum.GetName(typeof(EnumClass.ConfirmAlarmState), item.confirm_state);
                    alarmRecordModel.alarmLocation = item.alarm_location;
                    alarmRecordModel.alarmTime = item.alarm_time;
                    alarmRecordModel.deviceName = servDeviceInfoDal.GetEntity(item.alarm_code) == null ? "未知：" + item.alarm_code : servDeviceInfoDal.GetEntity(item.alarm_code).device_name;//查询设备名称
                    alarmRecordInfo.Add(alarmRecordModel);

                }
                return alarmRecordInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //根据告警ID获取一条确警信息
        public AlarmRecordModel GetEntity(int id)
        {
            try
            {
                ServAlarmRecordModel alarm = _servAlarmRecordDal.GetEntity(id);
                AlarmRecordModel model = new AlarmRecordModel();
                model.confirmAlarmText = alarm.confirm_alarm_text;
                //创建人
                var a = servPersonInfoDAL.GetPersonInfoBySSOId(alarm.confirm_person_id);
                model.confirmPersonName = a == null ? "未知" : a.alias;
                model.confirmResult = Enum.GetName(typeof(EnumClass.ConfirmAlarmResult), alarm.confirm_result);
                model.alarmLocation = alarm.alarm_location;
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        /// <summary>
        /// 获取今日告警信息
        /// </summary>
        /// <returns></returns>
        public AlarmNumToday GetAlarmNumToday()
        {
            AlarmNumToday alarmNumTodayModel = new AlarmNumToday();
            List<ServAlarmRecordModel> servAlarmRecordInfo = _servAlarmRecordDal.GetAlarmNumToday();
            var a = 0;
            if (servAlarmRecordInfo != null)
            {

                for (var i = 0; i < servAlarmRecordInfo.Count; i++)
                {
                    if (servAlarmRecordInfo[i].confirm_state == (int)EnumClass.ConfirmAlarmState.未确警)
                    {
                        a = a + 1;
                    }
                }

            }
            alarmNumTodayModel.AlarmNum = servAlarmRecordInfo.Count();
            alarmNumTodayModel.NotSure = a;

            return alarmNumTodayModel;
        }

    }
}
