using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace CSM.Model.QueryModel
{
	 	//Serv_Execution_Time
	 public class ServExecutionTimeQuery
	{
   		     
      	/// <summary>
		/// id
        /// </summary>		
        public int id{set;get;}      
		/// <summary>
		/// relate_id
        /// </summary>		
        public int relate_id{set;get;}      
		/// <summary>
		/// 设备预案：1
        ///事件预案：2
        /// </summary>		
        public int type{set;get;}      
		/// <summary>
		/// 
   
        /// </summary>		
        public DateTime start_time{set;get;}      
		/// <summary>
		/// end_time
        /// </summary>		
        public DateTime end_time{set;get;}      
		/// <summary>
		/// execution_cycle
        /// </summary>		
        public string execution_cycle{set;get;}      
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
		   
	}
}

