using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model
{
	 	//Serv_Archive_File
	 public class ServArchiveFileModel
	{
   		     
      	/// <summary>
		/// id
        /// </summary>		
        public int id{set;get;}      
		/// <summary>
		/// archive_id
        /// </summary>		
        public int archive_id{set;get;}      
		/// <summary>
		/// relate_id
        /// </summary>		
        public int relate_id{set;get;}      
		/// <summary>
		/// 文件：1
        ///下载视频：2
        /// </summary>		
        public int type{set;get;}      
		   
	}
}

