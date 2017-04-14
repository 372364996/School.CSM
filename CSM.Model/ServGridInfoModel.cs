using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model
{
   public  class ServGridInfoModel
    {
        /// <summary>
        /// id
        /// </summary>		
        public int id { set; get; }
        /// <summary>
        /// grid_name
        /// </summary>		
        public string grid_name { set; get; }
        /// <summary>
        /// grid_code
        /// </summary>		
        public string grid_code { set; get; }
        /// <summary>
        /// grid_manager_person
        /// </summary>		
        public int grid_manager_person { set; get; }
        /// <summary>
        /// grid_info_person
        /// </summary>		
        public int grid_info_person { set; get; }
        /// <summary>
        /// first_grid_manager
        /// </summary>		
        public int first_grid_manager { set; get; }
        /// <summary>
        /// second_grid_manager
        /// </summary>		
        public int second_grid_manager { set; get; }
        /// <summary>
        /// third_grid_manager
        /// </summary>		
        public int third_grid_manager { set; get; }
        /// <summary>
        /// 目前都为平级，为以后扩展用
        /// </summary>		
        public int pid { set; get; }
        /// <summary>
        /// ext1
        /// </summary>		
        public string ext1 { set; get; }
        /// <summary>
        /// ext2
        /// </summary>		
        public string ext2 { set; get; }
        /// <summary>
        /// ext3
        /// </summary>		
        public string ext3 { set; get; }
        /// <summary>
        /// ext4
        /// </summary>		
        public string ext4 { set; get; }
        /// <summary>
        /// ext5
        /// </summary>		
        public string ext5 { set; get; }
        /// <summary>
        /// grid_image
        /// </summary>		
        public string grid_image { set; get; }
        /// <summary>
        /// 启用：1
        ///未启用：-1
        /// </summary>		
        public int grid_enabled { set; get; }
    }
}
