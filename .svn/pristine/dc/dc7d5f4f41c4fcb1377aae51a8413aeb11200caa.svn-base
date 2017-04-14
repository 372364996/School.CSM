using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.DAL;
using CSM.Common;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using CSM.Model.SubSystemModel;

namespace CSM.BLL
{
    public class MapAlarmBLL
    {
        private delegate void SendAlarmPageDele(string url, string param, Encoding encode);
        private SendAlarmPageDele sendAlarmPageDele = null;
        private ServInformAlarmDAL servInformAlarmDal = new ServInformAlarmDAL();
        private ServDeviceInfoDAL servDeviceInfoDal = new ServDeviceInfoDAL();

        /// <summary>
        ///  新增设备告警(未含位置信息，区域信息)
        /// </summary>
        /// <param name="eventType"></param>
        /// <param name="device_code"></param>
        /// <param name="alarm_level"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        public bool AddInformAlarm(int eventType, string device_code, int alarm_level, string content)
        {
            try
            {
                ServInformAlarmModel model = new ServInformAlarmModel();
                model.alarm_level = alarm_level;
                model.alarm_location = "";//默认空，未知
                model.area_id = -1;  //默认-1，未找到
                model.content = content;
                model.device_code = device_code;
                model.event_type = eventType;
                model.report_time = DateTime.Now;
                model.status = (int)EnumClass.InformAlarmStatus.未处理;
                int res = servInformAlarmDal.AddEntity(model);
                if (res > 0)
                {
                    DeviceInfoStatusCustom custom = new DeviceInfoStatusCustom();
                    custom.deviceCode = device_code;
                    custom.deviceStatus = eventType + 3;    //枚举状态+3
                    if (servDeviceInfoDal.UpdateDeviceStatusByDeviceCode(custom) > 0)   //修改设备状态
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        ///// <summary>
        ///// 新增设备告警(含有位置信息，区域信息)
        ///// </summary>
        ///// <param name="eventType"></param>
        ///// <param name="device_code"></param>
        ///// <param name="alarm_location"></param>
        ///// <param name="area_id"></param>
        ///// <param name="alarm_level"></param>
        ///// <param name="report_time"></param>
        ///// <param name="content"></param>
        ///// <returns></returns>
        //public bool AddInformAlarm(int eventType, string device_code, string alarm_location, int area_id, int alarm_level, string content)
        //{
        //    try
        //    {
        //        ServInformAlarmModel model = new ServInformAlarmModel();
        //        model.alarm_level = alarm_level;
        //        model.alarm_location = alarm_location;
        //        model.area_id = area_id;
        //        model.content = content;
        //        model.device_code = device_code;
        //        model.event_type = eventType;
        //        model.report_time = DateTime.Now;
        //        model.status = (int)EnumClass.InformAlarmStatus.未处理;
        //        int res = servInformAlarmDal.AddEntity(model);
        //        if (res > 0)
        //        {
        //            return true;
        //        }
        //        else
        //        {
        //            return false;
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        /// <summary>
        /// 页面发送模拟报警至转发层
        /// </summary>
        /// <param name="alarmLevel"></param>
        /// <param name="deviceCode"></param>
        /// <param name="content"></param>
        /// <param name="eventCode"></param>
        /// <returns></returns>
        public bool AddDeviceAlarm(string alarmName, int alarmLevel, string deviceCode, string content, string eventCode)
        {
            try
            {
                sendAlarmPageDele = new SendAlarmPageDele(CSM.Utils.HttpHelper.PostJsonData);
                string url = System.Configuration.ConfigurationManager.AppSettings["InterfaceUrl"]+ "/api/Interface/Forward";
                ServDeviceInfoDAL deviceDal = new ServDeviceInfoDAL();
                AlarmInfoModel alarmModel = new AlarmInfoModel();
                InterfaceData data = new InterfaceData();
                ServDeviceInfoModel deviceModel = deviceDal.GetDeviceByDeviceCode(deviceCode);
                alarmModel.alarm_cache_status = 0;
                alarmModel.alarm_event = eventCode;
                alarmModel.alarm_level = alarmLevel;
                alarmModel.alarm_location = "";
                alarmModel.alarm_name = alarmName;
                alarmModel.alarm_subsystem = deviceModel.subsystem_id;
                alarmModel.alarm_text = content;
                alarmModel.alarm_time = DateTime.Now;
                alarmModel.alarm_type = (int)EnumClass.AlarmType.设备报警;
                alarmModel.code = deviceCode;
                data.data = alarmModel;
                data.dataType = 1;
                data.subSysType = deviceModel.subsystem_id;
                data.mark = "pageMoniter";
                string param = CSM.Utils.JsonHelper.ObjectToString(data);
                sendAlarmPageDele.BeginInvoke(url, param, Encoding.UTF8, null, null);
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 页面发送模拟报警至转发层
        /// </summary>
        /// <param name="alarmLevel"></param>
        /// <param name="deviceCode"></param>
        /// <param name="content"></param>
        /// <param name="eventCode"></param>
        /// <returns></returns>
        public RetMsgModel AddMapDeviceAlarm(string alarmName, int alarmLevel, string deviceCode, string content, string eventCode)
        {
            try
            {
                RetMsgModel retModel = new RetMsgModel();
                sendAlarmPageDele = new SendAlarmPageDele(CSM.Utils.HttpHelper.PostJsonData);
                string url = System.Configuration.ConfigurationManager.AppSettings["InterfaceUrl"] + "/api/Interface/Forward";
                ServDeviceInfoDAL deviceDal = new ServDeviceInfoDAL();
                AlarmInfoModel alarmModel = new AlarmInfoModel();
                InterfaceData data = new InterfaceData();
                ServDeviceInfoModel deviceModel = deviceDal.GetDeviceByDeviceCode(deviceCode);
                alarmModel.alarm_cache_status = 0;
                alarmModel.alarm_event = eventCode;
                alarmModel.alarm_level = alarmLevel;
                alarmModel.alarm_location = "";
                alarmModel.alarm_name = alarmName;
                alarmModel.alarm_subsystem = deviceModel.subsystem_id;
                alarmModel.alarm_text = content;
                alarmModel.alarm_time = DateTime.Now;
                alarmModel.alarm_type = (int)EnumClass.AlarmType.设备报警;
                alarmModel.code = deviceCode;
                data.data = alarmModel;
                data.dataType = 1;
                data.subSysType = deviceModel.subsystem_id;
                data.mark = "pageMoniter";
                string param = CSM.Utils.JsonHelper.ObjectToString(data);
                //sendAlarmPageDele.BeginInvoke(url, param, Encoding.UTF8, null, null);
                string ret = Utils.HttpHelper.PostWebRequestBandError(url, param, "application/json;charset=utf-8", Encoding.UTF8);
                if (string.IsNullOrEmpty(ret))
                {
                    retModel.status = 1;
                    retModel.message = "调用转发层返回值为空！";
                }
                else
                {
                    retModel = Utils.JsonHelper.StringToObject<RetMsgModel>(ret);
                }

                return retModel;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
