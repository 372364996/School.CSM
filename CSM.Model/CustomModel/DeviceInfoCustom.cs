using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class DeviceInfoCustom
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { set; get; }
        /// <summary>
        /// 设备编号
        /// </summary>
        public string device_code { get; set; }
        /// <summary>
        /// 复合设备
        /// </summary>
        public int is_parts { get; set; }
        /// <summary>
        /// 设备名称
        /// </summary>
        public string device_name { get; set; }
        /// <summary>
        /// 设备类型
        /// </summary>
        public int device_type { get; set; }
        /// <summary>
        /// 子系统编号
        /// </summary>
        public int subsystem_id { get; set; }
        /// <summary>
        /// 2D经度
        /// </summary>
        public string longitude { get; set; }
        /// <summary>
        /// 2D纬度
        /// </summary>
        public string latitude { get; set; }
        /// <summary>
        /// 注册时间
        /// </summary>
        public DateTime register_time { get; set; }
        /// <summary>
        /// 设备搜索缩写
        /// </summary>
        public string search_code { get; set; }
        /// <summary>
        /// 25D本地X轴（经度）
        /// </summary>
        public string local_longitude { get; set; }
        /// <summary>
        /// 25D本地Y轴（纬度）
        /// </summary>
        public string local_latitude { get; set; }
        /// <summary>
        /// 设备状态
        /// </summary>
        public int device_status { get; set; }
        /// <summary>
        /// 状态修改时间
        /// </summary>
        public DateTime update_status_time { get; set; }
        /// <summary>
        /// 覆盖角度
        /// </summary>
        public int cover_range { get; set; }
        /// <summary>
        /// 设备朝向
        /// </summary>
        public int camera_towards { get; set; }
        /// <summary>
        /// 覆盖半径
        /// </summary>
        public int visual_range { get; set; }
        /// <summary>
        /// 资产编号
        /// </summary>
        public string asset_code { get; set; }
        /// <summary>
        /// 所属部门
        /// </summary>
        public int org_id { get; set; }
        /// <summary>
        /// 厂家
        /// </summary>
        public string manufactor { get; set; }
        /// <summary>
        /// 型号
        /// </summary>
        public string asset_model { get; set; }
        /// <summary>
        /// 出厂日期
        /// </summary>
        public DateTime create_time { get; set; }
        /// <summary>
        /// 保修期
        /// </summary>
        public DateTime guarantee_time { get; set; }
        /// <summary>
        /// 资产状态
        /// </summary>
        public int asset_status { get; set; }
        /// <summary>
        /// ip地址
        /// </summary>
        public string asset_ip { get; set; }
        /// <summary>
        /// 端口
        /// </summary> 
        public string port { get; set; }
        /// <summary>
        /// mac地址
        /// </summary>
        public string mac_code { get; set; }
        /// <summary>
        /// 序列号
        /// </summary>
        public string serial_number { get; set; }
        /// <summary>
        /// 负责人ID
        /// </summary>
        public int manager_id { get; set; }
        /// <summary>
        /// 是否在楼内
        /// </summary>
        public int is_inbuilding { get; set; }
        /// <summary>
        /// 房间号
        /// </summary>
        public int room_id { get; set; }
        /// <summary>
        /// 园区编号
        /// </summary>
        public int region_id { get; set; }
        /// <summary>
        /// 区域编号
        /// </summary>
        public int area_id { get; set; }
        /// <summary>
        /// 及时回放
        /// </summary>
        public string ext1 { get; set; }
        /// <summary>
        /// 多路播放
        /// </summary>
        public string ext2 { get; set; }
        /// <summary>
        /// 上大墙
        /// </summary>
        public string ext3 { get; set; }
        /// <summary>
        /// 历史回放
        /// </summary>
        public string ext4 { get; set; }
        /// <summary>
        /// 自定义设备类型id
        /// </summary>
        public int defined_device_typeid { get; set; }
        /// <summary>
        /// 自定义设备类型名称
        /// </summary>
        public string defined_device_name { get; set; }
        /// <summary>
        /// 是否显示
        /// </summary>
        public int enabled { get; set; }
        /// <summary>
        /// 激活图标
        /// </summary>
        public string active_image { get; set; }
        /// <summary>
        /// 未激活图标
        /// </summary>
        public string unactive_image { get; set; }
        /// <summary>
        /// 地图正常图标
        /// </summary>
        public string normal_image { get; set; }
        /// <summary>
        /// 地图错误图标
        /// </summary>
        public string error_image { get; set; }
        /// <summary>
        /// 地图闪光图标
        /// </summary>
        public string flash_image { get; set; }
        /// <summary>
        /// 弹出框图片
        /// </summary>
        public string popup_image { get; set; }
        /// <summary>
        /// 自定义父类id
        /// </summary>
        public int pid { get; set; }
        /// <summary>
        /// 自定义类型id
        /// </summary>
        public int definedId { get; set; }
        /// <summary>
        /// 行业id
        /// </summary>
        public int industry_id { get; set; }


    }
}
