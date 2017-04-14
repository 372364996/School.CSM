using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class MultipleConfirmAlarm
    {
        /// <summary>
        /// 报警ID
        /// </summary>
        public int alarmId { get; set; }
        /// <summary>
        /// 确警人ID
        /// </summary>
        public int ssoid { get; set; }
        /// <summary>
        /// 确警时间
        /// </summary>
        public DateTime confirmTime { get; set; } 
        /// <summary>
        /// 确警结果
        /// </summary>
        public int confirmResult { get; set; }
        /// <summary>
        /// 确警状态
        /// </summary>
        public int confirmState { get; set; }
    }
}
