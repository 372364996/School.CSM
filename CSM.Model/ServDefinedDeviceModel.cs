using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model
{
    public class ServDefinedDeviceModel
    {
        /// <summary>
        /// 主键id
        /// </summary>
        public int id { set; get; }
        /// <summary>
        /// 自定义类型名称
        /// </summary>
        public string defined_device_name { get; set; }
        /// <summary>
        /// 是否启用
        /// </summary>
        public int enabled { get; set; }
        /// <summary>
        /// 激活图标
        /// </summary>
        public string active_image { set; get; }
        /// <summary>
        /// 未激活图标
        /// </summary>
        public string unactive_image { set; get; }
        /// <summary>
        /// 地图正常图标
        /// </summary>
        public string normal_image { set; get; }
        /// <summary>
        /// 地图错误图标
        /// </summary>
        public string error_image { set; get; }
        /// <summary>
        /// 地图闪光图标
        /// </summary>
        public string flash_image { set; get; }
        /// <summary>
        /// 弹出框图片
        /// </summary>
        public string popup_image { set; get; }
        /// <summary>
        /// 备注
        /// </summary>
        public string defined_device_content { get; set; }
        /// <summary>
        /// 绑定pid
        /// </summary>
        public int pid { get; set; }
        /// <summary>
        /// 行业id
        /// </summary>
        public int industry_id { get; set; }
        /// <summary>
        /// 关联的基础设备类型id
        /// </summary>
        public int base_device_type_id { get; set; }
        public string ext1 { get; set; }

        public string ext2 { get; set; }

        public string ext3 { get; set; }

        public string ext4 { get; set; }
        public string ext5 { get; set; }




    }
}
