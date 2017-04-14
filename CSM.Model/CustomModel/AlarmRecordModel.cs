using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class AlarmRecordModel
    {
        /// <summary>
        /// id
        /// </summary>		
        public int id { set; get; }
        /// <summary>
        /// alarm_name
        /// </summary>		
        public string alarmName { set; get; }
        /// <summary>
        /// alarm_event
        /// </summary>		
        public string alarmEvent { set; get; }
        /// <summary>
        /// alarm_location
        /// </summary>		
        public string alarmLocation { set; get; }
        /// <summary>
        /// alarm_text
        /// </summary>		
        public string alarmText { set; get; }
        /// <summary>
        /// alarm_code
        /// </summary>		
        public string deviceName { set; get; }
        /// <summary>
        /// alarm_level
        /// </summary>		
        public string alarmLevel { set; get; }
        /// <summary>
        /// alarm_time
        /// </summary>		
        public DateTime alarmTime { set; get; }
        /// <summary>
        /// alarm_cache_status
        /// </summary>		
        public int alarmCacheStatus { set; get; }
        /// <summary>
        /// alarm_subsystem
        /// </summary>		
        public string subSystem { set; get; }
        /// <summary>
        /// alarm_type
        /// </summary>		
        public int alarmType { set; get; }
        /// <summary>
        /// confirm_alarm_time
        /// </summary>		
        public DateTime confirmAlarmTime { set; get; }
        /// <summary>
        /// confirm_alarm_text
        /// </summary>		
        public string confirmAlarmText { set; get; }
        /// <summary>
        /// confirm_person_id
        /// </summary>		
        public string confirmState { set; get; }
        /// <summary>
        /// confirm_person_id
        /// </summary>		
        public string confirmPersonName { set; get; }
        /// <summary>
        /// confirm_result
        /// </summary>		
        public string confirmResult { set; get; }
        /// <summary>
        /// 父级事件ID
        /// </summary>
        public int rootEventId { get; set; }
        /// <summary>
        /// 园区名称
        /// </summary>
        public string regionName { get; set; }
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
