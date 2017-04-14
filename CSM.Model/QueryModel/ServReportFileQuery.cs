using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.QueryModel
{
    public class ServReportFileQuery
    {

        /// <summary>
        /// id
        /// </summary>		
        public int id { set; get; }
        /// <summary>
        /// report_id
        /// </summary>		
        public int report_id { set; get; }
        /// <summary>
        /// relate_id
        /// </summary>		
        public int relate_id { set; get; }
        /// <summary>
        /// 可关联附件类型
        ///文件：1
        ///下载视频：2
        /// </summary>		
        public int type { set; get; }
        /// <summary>
        /// -1:接警
        ///其他：处警
        /// </summary>		
        public int handle_id { set; get; }
    }
}
