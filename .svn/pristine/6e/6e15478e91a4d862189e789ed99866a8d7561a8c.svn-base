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
using static CSM.Common.EnumClass;

namespace CSM.BLL.SubSystemBLL
{
    public class LEDHandle
    {
        private ServDeviceInfoModel _deviceInfo;
        private ServAlarmRecordModel _alarmRecord;

        private delegate void SendLEDCmdDele(string url, string message, Encoding encode);
        private SendLEDCmdDele sendLedCmdDele = new SendLEDCmdDele(HttpHelper.PostJsonData);

        public LEDHandle(ServDeviceInfoModel deviceInfo, ServAlarmRecordModel alarmRecord)
        {
            _deviceInfo = deviceInfo;
            _alarmRecord = alarmRecord;
        }
        /// <summary>
        /// 获取LED显示信息
        /// </summary>
        /// <param name="deviceInfo"></param>
        /// <param name="alarmRecord"></param>
        /// <returns></returns>
        public   string GetAlarmText()
        {
            string result = "";
            //  string alarminfo = _alarmRecord.alarm_name + "  " + (_alarmRecord.alarm_time).ToLocalTime().ToString("yyyy-MM-dd HH:mm:ss");
            string alarminfo = (_alarmRecord.alarm_time).ToLocalTime().ToString("yyyy-MM-dd HH:mm:ss");
            if (_deviceInfo == null)
            {
                result = "未找到报警设备" + "  " + _alarmRecord.alarm_code + "  " + alarminfo;
                //log4nethelp.Log4Logger.Info("未找到报警设备" + alarm.alarm_code);
            }
            else
            {
                string typename = Enum.GetName(typeof(BaseDeviceType), _deviceInfo.device_type);//获取基本设备类型名称
                //result = typename + "报警：" + Enum.GetName(typeof(EnumClass.SubSystem), _alarmRecord.alarm_subsystem) + "  " + _deviceInfo.device_name + "  " + alarminfo;
                result = typename + "报警："+ _deviceInfo.device_name + "  " + alarminfo;   //讨论后修改
            }
            return result;
        }
        /// <summary>
        /// 处理LED报警信息
        /// </summary>
        /// <param name="deviceInfo"></param>
        /// <param name="alarmRecord"></param>
        public bool HandleLedItem(string  message,string regionCode)
        {
            try
            {
                // message = GetAlarmText();
                if (!string.IsNullOrEmpty(message))
                {
                    LEDMsgModel ledMsg = new LEDMsgModel();
                    ledMsg.message = message;
                    ledMsg.type = (int)EnumClass.PlanHandleTime.确警前;
                    ledMsg.regionCode = regionCode;
                    string msg = JsonHelper.ObjectToString(ledMsg);
                    string url = SubSystemRouteBLL.GetLedControlRoute();
                    // HttpHelper.PostJsonData(url, msg, Encoding.UTF8);
                    sendLedCmdDele.BeginInvoke(url, msg, Encoding.UTF8, null, null);
                    Log4NetHelp.Info("调用LED接口成功！信息：" + msg);
                    return true;
                }
                else
                {
                    Log4NetHelp.Info("待发送至LED信息为空！");
                    return false;
                }
            }
            catch (Exception ex)
            {
                message = "";
                Log4NetHelp.Info("调用LED接口失败！" + ex.Message);
                return false;
            }
        }
    }
}
