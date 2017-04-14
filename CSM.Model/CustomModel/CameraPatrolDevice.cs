using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class CameraPatrolDevice
    {
        /// <summary>
        /// 设备ID
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 设备编码
        /// </summary>
        public string device_code { get; set; }
        /// <summary>
        /// 设备类型
        /// </summary>
        public int device_type { get; set; }
        /// <summary>
        /// 设备状态
        /// </summary>
        public int device_status { get; set; }
        /// <summary>
        /// 设备名称
        /// </summary>
        public string device_name { get; set; }
        /// <summary>
        /// 排序
        /// </summary>
        public int rank { get; set; }
    }
}
