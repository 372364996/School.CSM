using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL.SubSystemBLL
{
    public class SubSystemRouteBLL
    {
        /// <summary>
        /// 获取往业务层发送地址
        /// </summary>
        /// <returns></returns>
        public static string GetToLogicAlarmRoute()
        {
            return GetFilterToLogicAddressConfig() + "/api/BusinessLogic/HandleLogicAlarmData";
        }

     
        /// <summary>
        /// LED反向控制接口
        /// </summary>
        /// <returns></returns>
        public static string GetLedControlRoute()
        {
            return GetInterfaceControlRoute() + "/api/Interface/LEDControlCommand";
        }
        /// <summary>
        /// 四色灯反向控制接口
        /// </summary>
        /// <returns></returns>
        public static string GetRelayControlRoute()
        {
            return GetInterfaceControlRoute() + "/api/Interface/RelayControlCommand";
        }
        /// <summary>
        /// 转发层地址
        /// </summary>
        /// <returns></returns>
        private  static string GetInterfaceControlRoute()
        {
            return System.Configuration.ConfigurationManager.AppSettings["InterfaceControl"];
        }
        /// <summary>
        /// 获取往websocket发送地址
        /// </summary>
        /// <returns></returns>
        public static string GetToWebsocketRoute()
        {
            return System.Configuration.ConfigurationManager.AppSettings["WebsocketListen"];
        }
        /// <summary>
        /// 获取业务层Address
        /// </summary>
        /// <returns></returns>
        private static string GetFilterToLogicAddressConfig()
        {
            return System.Configuration.ConfigurationManager.AppSettings["LogicIPAddress"];
        }
    }
}
