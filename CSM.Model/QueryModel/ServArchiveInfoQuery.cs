using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace CSM.Model.QueryModel
{
	 	//卷宗信息表
	 public class ServArchiveInfoQuery
	{
   		     
      	/// <summary>
		/// id
        /// </summary>		
        public int id{set;get;}      
		/// <summary>
		/// archive_num
        /// </summary>		
        public string archive_num{set;get;}      
		/// <summary>
		/// archive_name
        /// </summary>		
        public string archive_name{set;get;}      
		/// <summary>
		/// create_persson_id
        /// </summary>		
        public int create_persson_id{set;get;}      
		/// <summary>
		/// 报警设备或者报警人
        /// </summary>		
        public string report_person{set;get;}      
		/// <summary>
		/// create_time
        /// </summary>		
        public string create_time{set;get;}      
		/// <summary>
		/// update_time
        /// </summary>		
        public DateTime update_time{set;get;}      
		/// <summary>
		/// archive_decription
        /// </summary>		
        public string archive_decription{set;get;}      
		/// <summary>
		/// archive_status
        /// </summary>		
        public int archive_status{set;get;}      
		/// <summary>
		/// report_type
        /// </summary>		
        public int report_type{set;get;}      
		/// <summary>
		/// ext1
        /// </summary>		
        public string ext1{set;get;}      
		/// <summary>
		/// ext2
        /// </summary>		
        public string ext2{set;get;}      
		/// <summary>
		/// ext3
        /// </summary>		
        public string ext3{set;get;}      
		/// <summary>
		/// ext4
        /// </summary>		
        public string ext4{set;get;}      
		/// <summary>
		/// ext5
        /// </summary>		
        public string ext5{set;get;}

        /// <summary>
        /// 每页条数
        /// </summary>
        public int pageSize { set; get; }
        /// <summary>
        /// 页数
        /// </summary>
        public int pageNumber { set; get; }
         public string Endtime { set; get; }
        public string alarm_id { set; get; }

    }
}

