using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class DeviceGroupTreeCustom
    {
        public int id { get; set; }
        public string  name { get; set; }
        public string device_code { get; set; }
        public int sid { get; set; }
        public int pid { get; set; }
        public string icon { get; set; }
        public string iconOpen { get; set; }
        public string iconClose { get; set; }
        public int rank { get; set; }
        /// <summary>
        /// 轮切组code
        /// </summary>
        public string resSwitchCode { get; set; }
    }
}
