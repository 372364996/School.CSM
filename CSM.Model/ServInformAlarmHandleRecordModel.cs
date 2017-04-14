using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model
{
    public class ServInformAlarmHandleRecordModel
    {
        /// <summary>
        /// 主键
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 告警ID
        /// </summary>
        public int inform_alarm_id { get; set; }
        /// <summary>
        /// 处理时间
        /// </summary>
        public DateTime handle_time { get; set; }
        /// <summary>
        /// 处理人员
        /// </summary>
        public int handle_person { get; set; }
        /// <summary>
        /// 处理内容
        /// </summary>
        public string handle_content { get; set; }
        /// <summary>
        /// 扩展1
        /// </summary>
        public string ext1 { get; set; }
        /// <summary>
        /// 扩展2
        /// </summary>
        public string ext2 { get; set; }
        /// <summary>
        /// 扩展3
        /// </summary>
        public string ext3 { get; set; }
        /// <summary>
        /// 扩展4
        /// </summary>
        public string ext4 { get; set; }
        /// <summary>
        /// 扩展5
        /// </summary>
        public string ext5 { get; set; }
    }
}
