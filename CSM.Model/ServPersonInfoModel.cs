using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model
{
    //人员基础信息表
    public class ServPersonInfoModel
    {

        /// <summary>
        /// id
        /// </summary>		
        public int id { set; get; }
        /// <summary>
        /// status
        /// </summary>		
        public int status { set; get; }
        /// <summary>
        /// ssoid
        /// </summary>		
        public int ssoid { set; get; }
        /// <summary>
        /// role_id
        /// </summary>		
        public int role_id { set; get; }
        public string alias { get; set; }
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

    }
}

