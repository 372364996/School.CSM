using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class ServAlarmVideoTimeCustom
    {
        /// <summary>
        /// 报警下载时间配置
        /// </summary>
        public ServAlarmVideoTimeModel videoTimeModel { get; set; }
        /// <summary>
        /// 播放开始时间
        /// </summary>
        public DateTime videoStartTime { get; set; }
        /// <summary>
        /// 播放结束时间
        /// </summary>
        public DateTime videoEndTime { get; set; }
    }
}
