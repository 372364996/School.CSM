using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace CSM.Model.QueryModel
{
	 	//Serv_Temp_Device
	 public class ServTempDeviceQuery
	{
   		     
      	/// <summary>
		/// id
        /// </summary>		
        public int id{set;get;}      
		/// <summary>
		/// device_code
        /// </summary>		
        public string device_code{set;get;}      
		/// <summary>
		/// device_name
        /// </summary>		
        public string device_name{set;get;}      
		/// <summary>
		/// device_type
        /// </summary>		
        public int device_type{set;get;}      
		/// <summary>
		/// subsystem_id
        /// </summary>		
        public int subsystem_id{set;get;}      
		/// <summary>
		/// search_code
        /// </summary>		
        public string search_code{set;get;}


        /// <summary>
        /// 创建时间
        /// </summary>
        public DateTime create_time { get; set; }

        /// <summary>
        /// 扩展字段1
        /// </summary>
        public string ext1 { get; set; }
        /// <summary>
        /// 扩展字段2
        /// </summary>
        public string ext2 { get; set; }
        /// <summary>
        /// 扩展字段3
        /// </summary>
        public string ext3 { get; set; }

    }
}

