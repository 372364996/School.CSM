using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace CSM.Model.QueryModel
{
	 	//Base_Industry
	 public class BaseIndustryQuery
	{
   		     
      	/// <summary>
		/// id
        /// </summary>		
        public int id{set;get;}      
		/// <summary>
		/// industry_code
        /// </summary>		
        public string industry_code{set;get;}      
		/// <summary>
		/// industry_name
        /// </summary>		
        public string industry_name{set;get;}      
		/// <summary>
		/// content
        /// </summary>		
        public string content{set;get;}
        /// <summary>
        /// 分页开始条数
        /// </summary>
        public int startNum { set; get; }
        /// <summary>
        /// 分页结束条数
        /// </summary>
        public int endNum { set; get; }

    }
}

