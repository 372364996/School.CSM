using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Utils
{
    public class RetMsgHelper
    {
        /// <summary>
        /// 返回格式化消息体
        /// </summary>
        /// <param name="statusCode"></param>
        /// <param name="message"></param>
        /// <returns></returns>
        public static CSM.Model.SubSystemModel.RetMsgModel RetMsg(int statusCode,string message)
        {
            CSM.Model.SubSystemModel.RetMsgModel retModel = new Model.SubSystemModel.RetMsgModel();
            retModel.status = statusCode;
            retModel.message = message;
            return retModel;
        }
    }
}
