using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class DeviceModel
    {
        /// <summary>
        /// 设备编码
        /// </summary>
        public string deviceCode { get; set; }
        /// <summary>
        /// 设备名称
        /// </summary>
        public string deviceName { get; set; }
        /// <summary>
        /// 设备类型
        /// </summary>
        public string typeName { get; set; }
        /// <summary>
        /// 子系统类型
        /// </summary>
        public int subsystemId { get; set; }
        /// <summary>
        /// 服务器地址
        /// </summary>
        public string serverIp { get; set; }
    }
}
