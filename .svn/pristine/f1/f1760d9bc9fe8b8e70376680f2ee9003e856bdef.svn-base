using CSM.Common;
using CSM.DAL;
using CSM.Model;
using CSM.Model.SubSystemModel;
using CSM.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL.SubSystemBLL
{
    public class AbstractFilter
    {
        /// <summary>
        /// 处理报警数据
        /// </summary>
        /// <param name="message">报警数据</param>
        /// <param name="mark">驱动标识</param>
        /// <param name="dataType">数据类型</param>
        /// <param name="subsystem">子系统类型</param>
        /// <returns></returns>
        protected virtual bool HandleAlarmData(object message, string mark, int dataType, int subsystem)
        {
            try
            {
                AlarmInfoModel alarmInfo = JsonHelper.StringToObject<AlarmInfoModel>(message.ToString());
                if (alarmInfo != null)
                {
                    ServAlarmRecordModel alarmRecord = new ServAlarmRecordModel();
                    ServAlarmRecordDAL alarmRecordDal = new ServAlarmRecordDAL();
                    InterfaceData data = new InterfaceData();
                    alarmRecord.alarm_cache_status = alarmInfo.alarm_cache_status;
                    alarmRecord.alarm_code = alarmInfo.code;

                    #region  旧版
                    //if (string.IsNullOrEmpty(alarmInfo.alarm_event) || alarmInfo.alarm_event == "")
                    //{
                    //    alarmRecord.alarm_event = -1;
                    //}
                    //else
                    //{
                    //    alarmRecord.alarm_event = GetBaseEventType(alarmInfo.alarm_event);
                    //}

                    #endregion

                    #region  新版
                    alarmRecord.alarm_event = alarmInfo.alarm_event;
                    #endregion
                    alarmRecord.alarm_level = alarmInfo.alarm_level;
                    alarmRecord.alarm_location = alarmInfo.alarm_location;
                    alarmRecord.alarm_name = alarmInfo.alarm_name;
                    alarmRecord.alarm_subsystem = alarmInfo.alarm_subsystem;
                    alarmRecord.alarm_text = alarmInfo.alarm_text;
                    alarmRecord.alarm_time = alarmInfo.alarm_time.ToLocalTime();
                    alarmRecord.alarm_type = alarmInfo.alarm_type;
                    alarmRecord.confirm_alarm_text = "";
                    alarmRecord.confirm_alarm_time = alarmInfo.alarm_time.ToLocalTime();//确警时间为报警时间（表示未确警）
                    alarmRecord.confirm_person_id = -1;
                    alarmRecord.confirm_result = -1;
                    alarmRecord.confirm_state = (int)EnumClass.ConfirmAlarmState.未确警;
                    int id = alarmRecordDal.AddEntity(alarmRecord);
                    if (id > 0)
                    {
                        alarmRecord.id = id;
                        // string paramData = JsonHelper.ObjectToString(alarmRecord);
                        data.data = alarmRecord;
                        data.dataType = dataType;
                        data.mark = mark;
                        data.subSysType = subsystem;
                        string jsonStr = JsonHelper.ObjectToString(data);
                        HttpHelper.PostJsonData(SubSystemRouteBLL.GetToLogicAlarmRoute(), jsonStr, Encoding.UTF8);
                        return true;
                    }
                    else
                    {
                        //log：报警数据插入数据库失败+message+mark+dataType+subsystem

                        Log4NetHelp.Info("插入报警数据失败！" + "内容：" + message.ToString() + "驱动标识：" + mark + "数据类型：" + dataType + "子系统类型：" + subsystem);
                        return false;
                    }
                }
                else
                {
                    Log4NetHelp.Info("数据体格式不正确" + message.ToString());
                    return false;
                }

            }
            catch (Exception ex)
            {
                //log：处理报警数据失败+message+mark+dataType+subsystem+ex.message
                string msgStr = JsonHelper.ObjectToString(message);
                Log4NetHelp.Error("处理报警数据失败！" + "内容：" + msgStr + "驱动标识：" + mark + "数据类型：" + dataType + "子系统类型：" + subsystem + "错误信息：" + ex.Message);
                return false;
            }
        }
        /// <summary>
        /// 处理实时数据
        /// </summary>
        /// <param name="message">实时数据</param>
        /// <param name="mark">驱动标识</param>
        /// <param name="dataType">数据类型</param>
        /// <param name="subsystem">子系统类型</param>
        /// <returns></returns>
        protected virtual bool HandleRealTimeData(string message, string mark, int dataType, int subsystem)
        {
            try
            {

                return true;
            }
            catch (Exception ex)
            {
                //log：实时数据处理失败
                return false;
            }
        }
        /// <summary>
        /// 处理同步数据
        /// </summary>
        /// <param name="message"></param>
        /// <param name="mark"></param>
        /// <param name="dataType"></param>
        /// <param name="subsystem"></param>
        /// <returns></returns>
        protected virtual bool HandleSyncData(string message, string mark, int dataType, int subsystem)
        {
            try
            {

                return true;
            }
            catch (Exception ex)
            {
                //log：同步数据处理失败
                return false;
            }
        }
        /// <summary>
        ///  处理数据型数据
        /// </summary>
        /// <param name="message"></param>
        /// <param name="mark"></param>
        /// <param name="dataType"></param>
        /// <param name="subsystem"></param>
        /// <returns></returns>
        protected virtual bool HandleData(string message, string mark, int dataType, int subsystem)
        {
            try
            {

                return true;
            }
            catch (Exception ex)
            {
                //log：数据型数据处理失败
                return false;
            }
        }
        /// <summary>
        /// 根据事件code获取事件类型ID
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        private int GetBaseEventType(string code)
        {
            try
            {
                BaseEventTypeDAL eventTypeDal = new BaseEventTypeDAL();
                BaseEventTypeModel model = eventTypeDal.GetEntityByEventCode(code);
                if (model != null)
                {
                    return model.id;
                }
                else
                {
                    Log4NetHelp.Info("根据事件code未找到对应事件类型：" + code);
                    return -1;
                }
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("根据事件code查找到事件类型失败：" + code + "消息：" + ex.Message);
                return -1;
            }
        }
    }
}
