using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class TranPlanItemResult
    {
        /// <summary>
        /// 执行记录ID
        /// </summary>
        public int itemRecordId { get; set; }
        /// <summary>
        /// 处置项名称
        /// </summary>
        public string itemName { get; set; }
        /// <summary>
        /// 处置结果
        /// </summary>
        public string itemResult { get; set; }
        /// <summary>
        /// 执行时间
        /// </summary>
        public string executeTime { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string content { get; set; }
        /// <summary>
        /// 确警前/后 EnumClass.ConfirmAlarmState
        /// </summary>
        public int confirm_type { get; set; }
    }
}
