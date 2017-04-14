using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace CSM.Model.QueryModel
{
    //Base_Relay_Config
    public class BaseRelayConfigQuery
    {

        /// <summary>
        /// id
        /// </summary>		
        public int id { set; get; }
        /// <summary>
        /// 一般为颜色
        /// </summary>		
        public string relay_content { set; get; }
        /// <summary>
        /// control_id
        /// </summary>		
        public int control_id { set; get; }
        /// <summary>
        /// 1:四色灯
        /// </summary>		
        public int relay_type { set; get; }
        /// <summary>
        /// 园区ID
        /// </summary>
        public int region_id { get; set; }
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

    }
}

