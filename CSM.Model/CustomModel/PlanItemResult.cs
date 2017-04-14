using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    /// <summary>
    /// 预案处置项执行结果
    /// </summary>
    public class PlanItemResult
    {
        /// <summary>
        /// 处置项执行记录ID
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 处置项ID
        /// </summary>
        public int item_id { get; set; }
        /// <summary>
        /// 处置结果
        /// </summary>
        public int item_result { get; set; }
        /// <summary>
        /// 执行时间
        /// </summary>
        public DateTime execute_time { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string content { get; set; }
        /// <summary>
        /// 确警前/后 EnumClass.ConfirmAlarmState
        /// </summary>
        public int confirm_type { get; set; }
        public string confirm_name { get; set; }

        public string result_name { get; set; }

        public string item_name { get; set; }
    }
}
