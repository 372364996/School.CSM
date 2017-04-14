using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.QueryModel
{
    public class DevicePlanQuery
    {
        /// <summary>
        /// 设备ID
        /// </summary>
        public int deviceId { get; set; }
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
