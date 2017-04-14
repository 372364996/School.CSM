using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.DAL;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using CSM.Model.SubSystemModel;

namespace CSM.BLL
{
    public class LEDBLL
    {
        private BaseRegionConfigDAL baseRegionConfigDal = new BaseRegionConfigDAL();
        /// <summary>
        /// 获取全部园区配置
        /// </summary>
        /// <returns></returns>
        public List<BaseRegionConfigModel> GetAllShowRegion()
        {
            try
            {
                return baseRegionConfigDal.GetAllRegionConfig();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 发送LED信息
        /// </summary>
        /// <param name="regionCode"></param>
        /// <param name="content"></param>
        public RetMsgModel SendLEDMessage(string regionCode,int location, string content)
        {
            try
            {
                RetMsgModel retModel = new RetMsgModel();
                LEDMsgModel ledMsgModel = new LEDMsgModel();
                ledMsgModel.message = content;
                ledMsgModel.regionCode = regionCode;
                ledMsgModel.type = location;  //确警前默认中控室，确警后默认该园区户外LED
                string param = CSM.Utils.JsonHelper.ObjectToString(ledMsgModel);
                string url = System.Configuration.ConfigurationManager.AppSettings["InterfaceUrl"]+ "/api/Interface/LEDControlCommand";
                string ret = Utils.HttpHelper.PostWebRequestBandError(url, param, "application/json;charset=utf-8", Encoding.UTF8);
                if (string.IsNullOrEmpty(ret))
                {
                    retModel.status = 1;
                    retModel.message = "调用中间件LED接口返回值为空！";
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
