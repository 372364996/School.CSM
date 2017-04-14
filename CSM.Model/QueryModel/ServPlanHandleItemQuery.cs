using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace CSM.Model.QueryModel
{
	 	//Serv_Plan_HandleItem
	 public class ServPlanHandleItemQuery
	{
   		     
      	/// <summary>
		/// id
        /// </summary>		
        public int id{set;get;}      
		/// <summary>
		/// plan_id
        /// </summary>		
        public int plan_id{set;get;}      
		/// <summary>
		/// 枚举类型，从代码中定义
        /// </summary>		
        public int item_type { set;get;}      
		/// <summary>
		/// 确警前处置项：1
       /// 确警后处置项：2
        /// </summary>		
        public int confirm_type{set;get;}      
		/// <summary>
		/// 设备预案：1
       /// 事件预案：2
        /// </summary>		
        public int plan_type{set;get;}      
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

        public string ext4 { set; get; }
        /// <summary>
        /// ext3
        /// </summary>		
        public string ext5 { set; get; }

    }
}

