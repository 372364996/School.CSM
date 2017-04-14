using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class RegionConfigJoinMapConfig
    {
        /// <summary>
        /// 园区id（园区表主键，地图配置表外键）
        /// </summary>
        public int region_config_id { set; get; }
        /// <summary>
        /// 园区类型 0本地 1非本地
        /// </summary>
        public int region_type { set; get; }
        /// <summary>
        /// 园区名称
        /// </summary>
        public string region_name { set; get; }
        /// <summary>
        /// 园区编号
        /// </summary>
        public string region_code { set; get; }
        /// <summary>
        /// 园区默认地图引擎 0为未默认，1超图  2 DGIS
        /// </summary>
        public int region_map_engine { set; get; }
        /// <summary>
        /// 园区的图片，切换园区按钮的背景，为地址索引
        /// </summary>
        public int region_image { set; get; }
        /// <summary>
        /// logo图片(扩展4)
        /// </summary>
        public string logo_image { get; set; }
        /// <summary>
        /// 地图配置的id
        /// </summary>
        public int map_config_id { set; get; }
        /// <summary>
        /// 地图配置的名称
        /// </summary>
        public string map_name { set; get; }
        /// <summary>
        /// 地图引擎 1为超图 2为 DGIS
        /// </summary>
        public int map_engine { set; get; }
        /// <summary>
        /// 地图类型 1为2D 2为2.5D
        /// </summary>
        public int map_type { set; get; }
        /// <summary>
        /// 初始默认加载。0：初始不加载 1：初始加载
        /// </summary>
        public int main_show { set; get; }
        /// <summary>
        /// 地图中心
        /// </summary>
        public string map_center { set; get; }
        /// <summary>
        /// 地图边界
        /// </summary>
        public string map_bounds { set; get; }
        /// <summary>
        /// 地图地址
        /// </summary>
        public string map_src { set; get; }
    }
}
