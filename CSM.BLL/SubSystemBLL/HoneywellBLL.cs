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
    public class HoneywellBLL : AbstractFilter
    {
        /// <summary>
        /// 处理霍尼韦尔子系统数据
        /// </summary>
        /// <param name="dataType"></param>
        /// <param name="message"></param>
        /// <param name="mark"></param>
        /// <returns></returns>
        public bool HandleHoneywellData(int dataType, object message, string mark)
        {
            switch (dataType)
            {
                case (int)EnumClass.HoneywellData.报警数据:
                    //
                    base.HandleAlarmData(message, mark, dataType, (int)EnumClass.SubSystem.霍尼韦尔报警子系统);
                    break;
                default: break;
            }
            return true;
        }
        /// <summary>
        /// 处理报警数据
        /// </summary>
        /// <param name="message"></param>
        /// <param name="mark"></param>
        /// <returns></returns>
        //private bool HandleAlarmData(string message,string mark)
        //{
        //    try
        //    {
        //        AlarmInfoModel alarmInfo = JsonHelper.StringToObject<AlarmInfoModel>(message);
        //        ServAlarmRecordModel alarmRecord = new ServAlarmRecordModel();
        //        ServAlarmRecordDAL alarmRecordDal = new ServAlarmRecordDAL();
        //        InterfaceData data = new InterfaceData();
        //        alarmRecord.alarm_cache_status = alarmInfo.alarm_cache_status;
        //        alarmRecord.alarm_code = alarmInfo.code;
        //        alarmRecord.alarm_event = alarmInfo.alarm_event;
        //        alarmRecord.alarm_level = alarmInfo.alarm_level;
        //        alarmRecord.alarm_location = alarmInfo.alarm_location;
        //        alarmRecord.alarm_name = alarmInfo.alarm_name;
        //        alarmRecord.alarm_subsystem = alarmInfo.alarm_subsystem;
        //        alarmRecord.alarm_text = alarmInfo.alarm_text;
        //        alarmRecord.alarm_time = alarmInfo.alarm_time;
        //        alarmRecord.alarm_type = alarmInfo.alarm_type;
        //        alarmRecord.confirm_alarm_text = "";
        //        alarmRecord.confirm_alarm_time = alarmInfo.alarm_time;//确警时间为报警时间（表示未确警）
        //        alarmRecord.confirm_person_id = -1;
        //        alarmRecord.confirm_result = -1;
        //        alarmRecord.confirm_state = (int)EnumClass.ConfirmAlarmState.未确警;
        //        int id = alarmRecordDal.AddEntity(alarmRecord);
        //        alarmRecord.id = id;
        //        string paramData = JsonHelper.JsonToString(alarmRecord);
        //        data.data = paramData;
        //        data.dataType = (int)EnumClass.HoneywellData.报警数据;
        //        data.mark = mark;
        //        data.subSysType = (int)EnumClass.SubSystem.霍尼韦尔报警子系统;
        //        return true;
        //    }
        //    catch (Exception ex)
        //    {
        //        //log：处理霍尼韦尔报警数据失败+ex.message
        //        return false;
        //    }

        //}

        //protected override bool HandleAlarmData(string message, string mark, int dataType, int subsystem)
        //{
        //    return base.HandleAlarmData(message, mark, dataType, subsystem);
        //}
    }
}
