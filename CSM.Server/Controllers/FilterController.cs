using CSM.BLL.SubSystemBLL;
using CSM.Common;
using CSM.Model.SubSystemModel;
using CSM.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CSM.Server.Controllers
{
    public class FilterController : ApiController
    {
        /// <summary>
        /// 处理转发层数据
        /// </summary>
        /// <param name="info"></param>
        /// <returns></returns>
        public string HandleSystemData([FromBody]InterfaceData info)
        {
            //Log4NetHelp.Info("过滤层接收数据");
            FilterBLL filterBll = new FilterBLL();
            bool bl = filterBll.HandleSystemData(info);
           // Log4NetHelp.Info("过滤层数据处理完成");
            if (bl == true)
            {
                return JsonHelper.ObjectToString(RetMsgHelper.RetMsg(1, "已接收数据"));
            }
            else
            {
                return JsonHelper.ObjectToString(RetMsgHelper.RetMsg(0, "数据处理失败"));
            }
        }
        /// <summary>
        /// 测试接口（心跳接口）
        /// </summary>
        /// <returns></returns>
        public string Status()
        {
            return JsonHelper.ObjectToString(RetMsgHelper.RetMsg(1, DateTime.Now.ToString()));
        }
    }
}
