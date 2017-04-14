using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
   public  class InformAlarmCustom
    {
        /// <summary>
        /// /主键
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 事件类型
        /// </summary>
        public int event_type { get; set; }
        /// <summary>
        /// 设备编码
        /// </summary>
        public string device_code { get; set; }
        /// <summary>
        /// 设备名称
        /// </summary>
        public string device_name { get; set; }
        /// <summary>
        /// 告警位置
        /// </summary>
        public string alarm_location { get; set; }
        /// <summary>
        /// 园区ID
        /// </summary>
        public int region_id { get; set; }
        /// <summary>
        /// 区域ID
        /// </summary>
        public int area_id { get; set; }
        /// <summary>
        /// 园区名称
        /// </summary>
        public string area_name { get; set; }
        /// <summary>
        /// 告警等级
        /// </summary>
        public int alarm_level { get; set; }
        /// <summary>
        /// 告警时间
        /// </summary>
        public DateTime report_time { get; set; }
        /// <summary>
        /// 告警状态
        /// </summary>
        public int status { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string  content { get; set; }
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
