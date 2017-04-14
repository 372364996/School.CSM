using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model
{
	 	//Serv_Handle_Report
	 public class ServHandleReportModel
	{
   		     
      	/// <summary>
		/// id
        /// </summary>		
        public int id{set;get;}      
		/// <summary>
		/// report_id
        /// </summary>		
        public int report_id{set;get;}      
		/// <summary>
		/// 处警：1
        ///结案：2
        /// </summary>		
        public int handle_type{set;get;}      
		/// <summary>
		/// handle_text
        /// </summary>		
        public string handle_text{set;get;}      
		/// <summary>
		/// handle_time
        /// </summary>		
        public DateTime handle_time{set;get;}      
		/// <summary>
		/// handle_person
        /// </summary>		
        public int handle_person{set;get;}      
		/// <summary>
		/// record_time
        /// </summary>		
        public DateTime record_time{set;get;}      
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
		   
	}
}

