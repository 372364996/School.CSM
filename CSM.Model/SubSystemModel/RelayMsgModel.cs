using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.SubSystemModel
{
    public class RelayMsgModel
    {
        /// <summary>
        /// 园区编码
        /// </summary>
        public string regionCode { get; set; }
        /// <summary>
        /// 控制器编号
        /// </summary>
        public int controlId { get; set; }
        /// <summary>
        /// 操作类型
        /// 1：开，0：关，3：全开，4：全关
        /// </summary>
        public int op { get; set; }
    }
}
