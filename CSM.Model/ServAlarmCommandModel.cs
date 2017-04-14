using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model
{
	 	//Serv_Alarm_Command
	 public class ServAlarmCommandModel
	{
   		     
      	/// <summary>
		/// id
        /// </summary>		
        public int id{set;get;}      
		/// <summary>
		/// 一级：-1
   
        /// </summary>		
        public int parent_id{set;get;}      
		/// <summary>
		/// image_url
        /// </summary>		
        public string image_url{set;get;}      
		/// <summary>
		/// content
        /// </summary>		
        public string content{set;get;}      
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
        /// 创建时间
        /// </summary>	
        public DateTime create_time { get; set; }
        /// <summary>
		/// 更新时间
        /// </summary>	
        public DateTime update_time { get; set; }
        /// <summary>
        /// 颜色
        /// </summary>
        public string color { get; set; }
        /// <summary>
		/// 事件ID
        /// </summary>
        public int event_id { get; set; }
        /// <summary>
		/// from
        /// </summary>
        public string parent_node { get; set; }
        /// <summary>
		/// to
        /// </summary>
        public string child_node { get; set; }
        //GoJS的数据封装
        public string nodeJson { get; set; }
        //GoJS的线条封装
        public string linkJson { get; set; }
    }
}

