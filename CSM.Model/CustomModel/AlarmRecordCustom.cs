using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class AlarmRecordCustom
    {
        /// <summary>
        /// id
        /// </summary>		
        public int id { set; get; }
        /// <summary>
        /// alarm_name
        /// </summary>		
        public string alarm_name { set; get; }
        /// <summary>
        /// alarm_event
        /// </summary>		
       // public int alarm_event { set; get; }

        public string  alarm_event { set; get; }
        /// <summary>
        /// alarm_location
        /// </summary>		
        public string alarm_location { set; get; }
        /// <summary>
        /// alarm_text
        /// </summary>		
        public string alarm_text { set; get; }
        /// <summary>
        /// alarm_code
        /// </summary>		
        public string alarm_code { set; get; }
        /// <summary>
        /// alarm_level
        /// </summary>		
        public int alarm_level { set; get; }
        /// <summary>
        /// alarm_time
        /// </summary>		
        public DateTime alarm_time { set; get; }
        /// <summary>
        /// alarm_cache_status
        /// </summary>		
        public int alarm_cache_status { set; get; }
        /// <summary>
        /// alarm_subsystem
        /// </summary>		
        public int alarm_subsystem { set; get; }
        /// <summary>
        /// alarm_type
        /// </summary>		
        public int alarm_type { set; get; }
        /// <summary>
        /// confirm_alarm_time
        /// </summary>		
        public DateTime confirm_alarm_time { set; get; }
        /// <summary>
        /// confirm_alarm_text
        /// </summary>		
        public string confirm_alarm_text { set; get; }
        /// <summary>
        /// confirm_person_id
        /// </summary>		
        public int confirm_state { set; get; }
        /// <summary>
        /// confirm_person_id
        /// </summary>		
        public int confirm_person_id { set; get; }
        /// <summary>
        /// confirm_result
        /// </summary>		
        public int confirm_result { set; get; }
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
        /// 园区ID
        /// </summary>
        public int region_id { get; set; }
        /// <summary>
        /// 设备名称
        /// </summary>
        public string device_name { get; set; }
    }
}
