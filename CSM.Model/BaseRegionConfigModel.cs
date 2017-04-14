using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model
{
    public class BaseRegionConfigModel
    {
        /// <summary>
        /// 主键
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 园区编码
        /// </summary>
        public string region_code { get; set; }
        /// <summary>
        /// 园区名称
        /// </summary>
        public string region_name { get; set; }
        /// <summary>
        /// 地图引擎
        /// </summary>
        public int map_engine { get; set; }
        /// <summary>
        /// 园区类型
        /// </summary>
        public int region_type { get; set; }
        /// <summary>
        /// 是否显示isShow(扩展1)
        /// </summary>
        public int is_show { get; set; }
        /// <summary>
        /// 园区图片(扩展2)
        /// </summary>
        public string region_image { get; set; }
        /// <summary>
        /// 初始地图加载类型(扩展3)
        /// </summary>
        public int initial_map_type { get; set; }
        /// <summary>
        /// logo图片(扩展4)
        /// </summary>
        public string logo_image { get; set; }
        /// <summary>
        /// 扩展5
        /// </summary>
        public string ext5 { get; set; }
    }
}
