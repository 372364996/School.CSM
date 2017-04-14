using CSM.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL
{
   public  class InterfaceAddressBLL
    {
        /// <summary>
        /// 获取中间件地址配置
        /// </summary>
        /// <returns></returns>
        public string GetInterfaceAddress()
        {
            try
            {
                return ConfigManager.ReadValueByKey(Common.EnumClass.ConfigurationFile.WebConfig, "InterfaceUrl");
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改中间件地址配置
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        public bool UpdateInterfaceAddress(string address)
        {
            try
            {
                return ConfigManager.UpdateOrCreateAppSetting(Common.EnumClass.ConfigurationFile.WebConfig, "InterfaceUrl", address);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
