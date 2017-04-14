using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class TempDeviceCustom
    {
        /// <summary>
		/// 主键id
        /// </summary>		
        public int id { set; get; }
        public int pId { get; set; }
        /// <summary>
        /// 设备编码
        /// </summary>		
        public string device_code { set; get; }
        /// <summary>
        /// 设备名称
        /// </summary>		
        public string name { set; get; }
        /// <summary>
        /// 设备类型
        /// </summary>		
        public int device_type { set; get; }
        /// <summary>
        /// 所属子系统
        /// </summary>		
        public int subsystem_id { set; get; }
        /// <summary>
        /// 设备搜索编码
        /// </summary>		
        public string search_code { set; get; }
        public string ip { get; set; }
        public string pip { get; set; }
    }
}
