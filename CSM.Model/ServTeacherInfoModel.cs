using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model
{
	 	//Serv_Teacher_Info
	 public class ServTeacherInfoModel
	{
   		     
      	/// <summary>
		/// id
        /// </summary>		
        public int id{set;get;}      
		/// <summary>
		/// person_id
        /// </summary>		
        public int person_id{set;get;}      
		/// <summary>
		/// staff_id
        /// </summary>		
        public int staff_id{set;get;}      
		/// <summary>
		/// class_id
        /// </summary>		
        public string class_id {set;get;}      
		/// <summary>
		/// 讲师：1
        ///高级讲师：2
        ///副教授：3
       /// 教授：4
   
        /// </summary>		
        public int level{set;get;}      
		/// <summary>
		/// status
        /// </summary>		
        public int status{set;get;}      
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

