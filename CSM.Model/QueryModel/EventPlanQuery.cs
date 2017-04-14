using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.QueryModel
{
    public class EventPlanQuery
    {
        /// <summary>
        /// 事件类型
        /// </summary>
        public int eventType { get; set; }
        /// <summary>
        /// 园区ID
        /// </summary>
        public int regionId { get; set; }
        /// <summary>
        /// 报警时间
        /// </summary>
        public string alarmTime { get; set; }
        /// <summary>
        /// 预案状态
        /// </summary>
        public int planStatus { get; set; }
    }
}
