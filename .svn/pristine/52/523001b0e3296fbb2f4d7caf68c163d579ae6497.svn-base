using CSM.Model.CustomModel;
using CSM.Utils;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;

namespace CSM.BLL
{
    public class WebSocketConfigBLL
    {
        /// <summary>
        /// 获取websocket配置
        /// </summary>
        /// <returns></returns>
        public WebSocketConfigCustom GetWebSocketInfo()
        {
            try
            {
                Configuration config = WebConfigurationManager.OpenWebConfiguration(HttpContext.Current.Request.ApplicationPath);
                AppSettingsSection app = config.AppSettings;
                WebSocketConfigCustom custom = new WebSocketConfigCustom();
                if (app.Settings["WebsocketIsOpen"] != null)
                {
                    int status = 0;
                    int.TryParse(app.Settings["WebsocketIsOpen"].Value.ToString(), out status);
                    custom.status = status;
                }
                else
                {
                    custom.status = 0;
                }

                if (app.Settings["WebsocketServer"] != null)
                {
                    custom.address = app.Settings["WebsocketServer"].Value.ToString();
                }
                else
                {
                    custom.address = "";
                }
                return custom;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改websocket状态
        /// </summary>
        /// <param name="status"></param>
        /// <returns></returns>
        public bool UpdateWebsocketStatus(int status)
        {
            try
            {

                #region 
                //Configuration config = WebConfigurationManager.OpenWebConfiguration(HttpContext.Current.Request.ApplicationPath);
                //AppSettingsSection app = config.AppSettings;
                //if (app.Settings["WebsocketIsOpen"] != null)
                //{
                //    app.Settings["WebsocketIsOpen"].Value = status.ToString();
                //}
                //else
                //{
                //    app.
                //}
                //config.Save(); 
                //return true;

                #endregion
              return   ConfigManager.UpdateOrCreateAppSetting(Common.EnumClass.ConfigurationFile.WebConfig, "WebsocketIsOpen", status.ToString());
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改websocket地址
        /// </summary>
        /// <param name="address"></param>
        /// <returns></returns>
        public bool UpdateWebsocketServer(string address)
        {
            try
            {
                #region
                //Configuration config = WebConfigurationManager.OpenWebConfiguration(HttpContext.Current.Request.ApplicationPath);
                //AppSettingsSection app = config.AppSettings;
                //if (app.Settings["WebsocketServer"] != null)
                //{
                //    app.Settings["WebsocketServer"].Value = address;
                //}
                //else
                //{

                //}
                //config.Save();
                //return true;

                #endregion
                return ConfigManager.UpdateOrCreateAppSetting(Common.EnumClass.ConfigurationFile.WebConfig, "WebsocketServer", address);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
