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
    public class HandleRelayBLL
    {
        private delegate void SendRelayCmdDele(string url, string message, Encoding encode);
        private SendRelayCmdDele sendRelayCmdDele = new SendRelayCmdDele(HttpHelper.PostJsonData);
        /// <summary>
        /// 处理四色灯
        /// </summary>
        /// <param name="relayId"></param>
        /// <returns></returns>
        public bool HandleRelay(string  relayId,string regionCode)
        {
            try
            {
                int id = int.Parse(relayId);
                //查找四色灯信息
                BaseRelayConfigModel baseRelayConfigModel = GetRelayConfigById(id);
                 RelayMsgModel relayMsg = new RelayMsgModel();
                relayMsg.regionCode = regionCode;
                relayMsg.controlId = baseRelayConfigModel.control_id;
                relayMsg.op = (int)EnumClass.Operation.打开;
                string message = JsonHelper.ObjectToString(relayMsg);
                // HttpHelper.PostJsonData(SubSystemRouteBLL.GetRelayControlRoute(), message, Encoding.UTF8);
                sendRelayCmdDele.BeginInvoke(SubSystemRouteBLL.GetRelayControlRoute(), message, Encoding.UTF8, null, null);
                Log4NetHelp.Info("调用四色灯接口成功！信息：" + message);
                return true;
            }
            catch (Exception ex)
            {
                Log4NetHelp.Info("调用四色灯接口失败！控制编号："+relayId + ex.Message);
                return false;
            }
        }
        /// <summary>
        /// 通过四色灯继电器ID查找设备信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        private BaseRelayConfigModel GetRelayConfigById(int id)
        {
            try
            {
                BaseRelayConfigDAL baseRelayConfigDal = new BaseRelayConfigDAL();
                return  baseRelayConfigDal.GetEntity(id);
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("通过ID查找四色灯信息失败！ID："+id+" 错误信息："+ex.Message);
                return null;
            }
        }
    }
}
