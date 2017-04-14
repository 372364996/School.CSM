using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class DeviceGroupInfoCustom
    {
        /// <summary>
        /// 设备分组id
        /// </summary>
        public int group_id { set; get; }
        /// <summary>
        /// 分组名称
        /// </summary>
        public string group_name { get; set; }
        /// <summary>
        /// 分组类型
        /// </summary>
        public int group_type { get; set; }
        /// <summary>
        /// pid
        /// </summary>
        public int pid { get; set; }
        /// <summary>
        /// 园区id
        /// </summary>
        public int region_id { get; set; }
        /// <summary>
        /// 分组状态
        /// </summary>
        public int group_status { get; set; }
        /// <summary>
        /// 设备id
        /// </summary>
        public int? device_id { get; set; }
        /// <summary>
        /// 设备名称
        /// </summary>
        public string device_name { get; set; }
        /// <summary>
        /// 设备编码
        /// </summary>
        public string device_code { get; set; }
    }
}
