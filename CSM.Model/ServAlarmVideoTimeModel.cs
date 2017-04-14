using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model
{
	 	//Serv_Alarm_VideoTime
	 public class ServAlarmVideoTimeModel
	{
   		     
      	/// <summary>
		/// id
        /// </summary>		
        public int id{set;get;}      
		/// <summary>
		/// event_id
        /// </summary>		
        public int event_id{set;get;}      
		/// <summary>
		/// 事件发生前秒数
        /// </summary>		
        public int start_time{set;get;}      
		/// <summary>
		/// 事件发生后秒数
        /// </summary>		
        public int end_time{set;get;}      
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

