using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class ScheduleResultCustom
    {
        /// <summary>
        /// 主键
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 结果记录时间
        /// </summary>
        public DateTime result_time { get; set; }
        /// <summary>
        /// 结果内容
        /// </summary>
        public string result_content { get; set; }
        /// <summary>
        /// 结果扩展1
        /// </summary>
        public string result_ext1 { get; set; }
        /// <summary>
        /// 结果扩展2
        /// </summary>
        public string result_ext2 { get; set; }
        /// <summary>
        /// 结果扩展3
        /// </summary>
        public string result_ext3 { get; set; }
        /// <summary>
        /// 结果扩展4
        /// </summary>
        public string result_ext4 { get; set; }
        /// <summary>
        /// 结果扩展5
        /// </summary>
        public string result_ext5 { get; set; }
        /// <summary>
        /// 计划任务名称
        /// </summary>
        public string schedule_name { get; set; }
        /// <summary>
        /// 区域ID
        /// </summary>
        public int region_id { get; set; }
        /// <summary>
        /// 计划类型
        /// </summary>
        public int schedule_type { get; set; }
        /// <summary>
        /// 计划状态
        /// </summary>
        public int schedule_state { get; set; }
        /// <summary>
        /// 计划创建时间
        /// </summary>
        public DateTime create_time { get; set; }
        /// <summary>
        /// 计划截止时间
        /// </summary>
        public DateTime end_time { get; set; }
        /// <summary>
        /// 计划开始时间
        /// </summary>
        public DateTime start_time { get; set; }
    }
}
