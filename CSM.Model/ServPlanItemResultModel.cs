using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model
{
    //Serv_Plan_ItemResult
    public class ServPlanItemResultModel
    {

        /// <summary>
        /// id
        /// </summary>		
        public int id { set; get; }
        /// <summary>
        /// 预案执行记录ID
        /// </summary>		
        public int plan_record_id { set; get; }

        /// <summary>
        /// 预案处置项ID
        /// </summary>
        public int handleitem_id { get; set; }
        /// <summary>
        /// 预案处置项类型
        /// </summary>		
        public int item_type { set; get; }
        /// <summary>
        /// 确警前/后
        /// </summary>
        public int confirm_type { get; set; }
        /// <summary>
        /// 成功：1
        /// 失败：2
        /// 未执行：3
        /// </summary>		
        public int item_result { set; get; }
        /// <summary>
        /// execute_time
        /// </summary>		
        public DateTime execute_time { set; get; }
        /// <summary>
        /// content
        /// </summary>		
        public string content { set; get; }
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

