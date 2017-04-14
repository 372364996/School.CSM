using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.QueryModel
{
   public  class ServReportSuspectQuery
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
        /// suspect_name
        /// </summary>		
        public string suspect_name { set; get; }
        /// <summary>
        /// suspect_nationality
        /// </summary>		
        public string suspect_nationality { set; get; }
        /// <summary>
        /// suspect_gender
        /// </summary>		
        public int suspect_gender { set; get; }
        /// <summary>
        /// suspect_featrue
        /// </summary>		
        public string suspect_featrue { set; get; }
        /// <summary>
        /// suspect_photo
        /// </summary>		
        public string suspect_photo { set; get; }
        /// <summary>
        /// suspect_credential
        /// </summary>		
        public string suspect_credential { set; get; }
    }
}
