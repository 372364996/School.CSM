using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.QueryModel
{
    public class ServDeviceInfoQuery
    {
        public int id { set; get; }
        public string device_code { get; set; }
        public int is_parts { get; set; }
        public string device_name { get; set; }

        public int device_type { get; set; }

        public int subsystem_id { get; set; }

        public string longitude { get; set; }
        public string latitude { get; set; }

        public string register_time { get; set; }


        public string search_code { get; set; }
        public string local_longitude { get; set; }
        public string local_latitude { get; set; }
        public int device_status { get; set; }
        public string update_status_time { get; set; }
        public int cover_range { get; set; }
        public int camera_towards { get; set; }
        public int visual_range { get; set; }
        public string asset_code { get; set; }
        public int org_id { get; set; }
        public string manufactor { get; set; }
        public string asset_model { get; set; }
        public string create_time { get; set; }
        public string guarantee_time { get; set; }
        public int asset_status { get; set; }
        public string asset_ip { get; set; }
        public string port { get; set; }
        public string mac_code { get; set; }
        public string serial_number { get; set; }
        public int manager_id { get; set; }
        public int is_inbuilding { get; set; }
        public int room_id { get; set; }
        public int region_id { get; set; }
        public int area_id { get; set; }

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
        /// <summary>
        /// 每页条数
        /// </summary>
        public int pageSize { set; get; }
        /// <summary>
        /// 页数
        /// </summary>
        public int pageIndex { set; get; }

        public int industryId { set; get; }
    }
}
