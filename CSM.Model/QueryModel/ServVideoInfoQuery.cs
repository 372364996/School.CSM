using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace CSM.Model.QueryModel
{
    //Serv_Video_Info
    public class ServVideoInfoQuery
    {

        /// <summary>
        /// id
        /// </summary>		
        public int id { set; get; }
        /// <summary>
        /// video_name
        /// </summary>		
        public string video_name { set; get; }
        /// <summary>
        /// video_path
        /// </summary>		
        public string video_path { set; get; }
        /// <summary>
        /// video_type
        /// </summary>		
        public int video_type { set; get; }
        /// <summary>
        /// video_start_time
        /// </summary>		
        public string video_start_time { set; get; }
        /// <summary>
        /// video_end_time
        /// </summary>		
        public string video_end_time { set; get; }
        /// <summary>
        /// device_code
        /// </summary>		
        public string device_code { set; get; }


        public string device_name { get; set; }
        /// <summary>
        /// 视频下载状态
        /// </summary>
        public int download_status { get; set; }
        /// <summary>
        /// platform_id
        /// </summary>		
        public int platform_id { set; get; }
        /// <summary>
        /// create_time
        /// </summary>		
        public DateTime create_time { set; get; }
        /// <summary>
        /// content
        /// </summary>		
        public string content { set; get; }
        public int pageIndex { get; set; }
        public int pageSize { get; set; }
        /// <summary>
        /// ext1
        /// </summary>		
        public string ext1 { set; get; }
        /// <summary>
        /// ext2
        /// </summary>		
        public string ext2 { set; get; }
        /// <summary>
        /// ext3
        /// </summary>		
        public string ext3 { set; get; }
        /// <summary>
        /// ext4
        /// </summary>		
        public string ext4 { set; get; }
        /// <summary>
        /// ext5
        /// </summary>		
        public string ext5 { set; get; }

    }
}

