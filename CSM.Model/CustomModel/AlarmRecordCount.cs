using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class AlarmRecordCount
    {
        /// <summary>
        /// 当天报警数据量
        /// </summary>
        public int nDay { get; set; }
        /// <summary>
        /// 本周
        /// </summary>
        public int nWeek { get; set; }
        /// <summary>
        /// 本月
        /// </summary>
        public int nMonth { get; set; }
        /// <summary>
        /// 本季度
        /// </summary>
        public int nQuarter { get; set; }
        /// <summary>
        /// 上半年
        /// </summary>
        public int fHalfMonth { get; set; }

        /// <summary>
        /// 下半年
        /// </summary>
        public int sHalfMonth { get; set; }
        /// <summary>
        /// 近一年
        /// </summary>
        public int nYear { get; set; }

    }
}
