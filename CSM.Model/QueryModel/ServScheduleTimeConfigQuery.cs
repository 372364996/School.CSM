using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.QueryModel
{
    public class ServScheduleTimeConfigQuery
    {
        /// <summary>
        /// 主键
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 计划任务ID
        /// </summary>
        public int schedule_id { get; set; }
        /// <summary>
        /// 计划任务时间
        /// </summary>
        public string schedule_time { get; set; }
        /// <summary>
        /// 时间类型
        /// </summary>
        public int time_type { get; set; }
        /// <summary>
        /// 计划任务执行日期
        /// </summary>
        public string schedule_date { get; set; }
        /// <summary>
        /// 扩展字段1
        /// </summary>
        public string ext1 { get; set; }
        /// <summary>
        /// 扩展字段2
        /// </summary>
        public string ext2 { get; set; }
        /// <summary>
        /// 扩展字段3
        /// </summary>
        public string ext3 { get; set; }
        /// <summary>
        /// 扩展字段4
        /// </summary>
        public string ext4 { get; set; }
        /// <summary>
        /// 扩展字段5
        /// </summary>
        public string ext5 { get; set; }
    }
}
