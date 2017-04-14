using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.QueryModel
{
    public class BaseNewMapConfigQuery
    {
        /// <summary>
        /// 主键ID
        /// </summary>
        public int id { set; get; }
        /// <summary>
        /// 园区id
        /// </summary>
        public int region_id { get; set; }
        /// <summary>
        /// 地图名称
        /// </summary>
        public string map_name { get; set; }
        /// <summary>
        /// 地图引擎
        /// </summary>
        public int map_engine { get; set; }
        /// <summary>
        /// 地图类别（2D/25D）
        /// </summary>
        public int map_type { get; set; }
        /// <summary>
        /// 地图地址
        /// </summary>
        public string map_src { get; set; }
        /// <summary>
        /// 地图中心点
        /// </summary>
        public string map_center { get; set; }
        /// <summary>
        /// 地图边框点
        /// </summary>
        public string map_bounds { get; set; }


        public string ext1 { get; set; }

        public string ext2 { get; set; }

        public string ext3 { get; set; }

        public string ext4 { get; set; }
        public string ext5 { get; set; }

        public string ext6 { get; set; }

        public string ext7 { get; set; }

        public string ext8 { get; set; }

        public string ext9 { get; set; }
        public string ext10 { get; set; }
    }
}
