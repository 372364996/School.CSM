using CSM.BLL.SubSystemBLL;
using CSM.Model.SubSystemModel;
using CSM.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CSM.Server.Controllers.SubSystemAPI
{
    public class BusinessLogicController : ApiController
    {
        /// <summary>
        /// 逻辑层处理报警数据
        /// </summary>
        /// <param name="message"></param>
        /// <returns></returns>
        public string HandleLogicAlarmData([FromBody]InterfaceData info)
        {
            //Log4NetHelp.Info("业务层接收数据");
            BusinessLogicBLL businessLogicBll = new BusinessLogicBLL();
            bool bl = businessLogicBll.HandleBusiness(info);
            //Log4NetHelp.Info("业务层数据处理完成");
            if (bl == true)
            {
                return JsonHelper.ObjectToString(RetMsgHelper.RetMsg(1, "已接收数据"));
            }
            else
            {
                return JsonHelper.ObjectToString(RetMsgHelper.RetMsg(0, "报警数据处理失败"));
            }


        }
        /// <summary>
        /// 处理实时数据
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public string HandleLogicRealTimeData([FromBody]string info)
        {
            try
            {
                return "";
            }
            catch (Exception ex)
            {
                return "";
            }
        }
        /// <summary>
        /// 测试接口（心跳接口）
        /// </summary>
        /// <returns></returns>
        public string GetStatus()
        {
            return JsonHelper.ObjectToString(RetMsgHelper.RetMsg(1, DateTime.Now.ToString()));
        }
    }
}

