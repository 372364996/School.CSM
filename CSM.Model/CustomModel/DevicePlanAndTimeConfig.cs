using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class DevicePlanAndTimeConfig
    {
        /// <summary>
        /// 时间配置ID
        /// </summary>
        public int time_id { get; set; }
        /// <summary>
        /// 开始时间
        /// </summary>
        public string start_time { get; set; }
        /// <summary>
        /// 结束时间
        /// </summary>
        public string end_time { get; set; }
        /// <summary>
        /// 执行周期
        /// </summary>
        public string execution_cycle { get; set; }
        /// <summary>
        /// 设备预案ID
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 设备预案code
        /// </summary>
        public int plan_code { get; set; }
        /// <summary>
        /// 设备预案名称
        /// </summary>
        public string plan_name { get; set; }
        /// <summary>
        /// 设备预案级别
        /// </summary>
        public int plan_level { get; set; }
        /// <summary>
        /// 设备ID
        /// </summary>
        public int device_id { get; set; }
        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime create_time { get; set; }
        /// <summary>
        /// 更新时间
        /// </summary>
        public DateTime update_time { get; set; }
        /// <summary>
        /// 预案状态
        /// </summary>
        public int plan_status { get; set; }
        /// <summary>
        /// 创建人ID
        /// </summary>
        public int person_id { get; set; }
        /// <summary>
        /// 备用1
        /// </summary>
        public string ext1 { get; set; }
        /// <summary>
        /// 备用2
        /// </summary>
        public string ext2 { get; set; }
        /// <summary>
        /// 备用3
        /// </summary>
        public string ext3 { get; set; }
        /// <summary>
        /// 备用4
        /// </summary>
        public string ext4 { get; set; }
        /// <summary>
        /// 备用5
        /// </summary>
        public string ext5 { get; set; }
    }
}
