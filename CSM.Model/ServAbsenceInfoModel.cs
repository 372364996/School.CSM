using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model
{
    public  class ServAbsenceInfoModel
    {
        /// <summary>
        /// id
        /// </summary>		
        public int id { set; get; }
        /// <summary>
        /// applicant_id
        /// </summary>		
        public int applicant_id { set; get; }
        /// <summary>
        /// application_time
        /// </summary>		
        public DateTime application_time { set; get; }
        /// <summary>
        /// start_time
        /// </summary>		
        public DateTime start_time { set; get; }
        /// <summary>
        /// end_time
        /// </summary>		
        public DateTime end_time { set; get; }
        /// <summary>
        /// type
        /// </summary>		
        public int type { set; get; }
        /// <summary>
        /// status
        /// </summary>		
        public int status { set; get; }
        /// <summary>
        /// reason
        /// </summary>		
        public string reason { set; get; }
        /// <summary>
        /// approval_id
        /// </summary>		
        public int approval_id { set; get; }
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
