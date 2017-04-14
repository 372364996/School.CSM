using CSM.Model.CustomModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.CustomModel
{
    public class PlanItemHandledInfo
    {
        public List<TranPlanItemResult> resultList { get; set; }  //处置项执行结果记录

        public ServAlarmRecordModel alarmRecord { get; set; }  //报警记录

        public ServAlarmVideoTimeCustom videoTime { get; set; }//视频下载播放时长

        public List<ServDeviceInfoModel> cameraList { get; set; }//关联摄像头

       // public List<PlanVideoDownLoad> videoList { get; set; }//视频下载记录
        public List<ServVideoInfoModel> videoList { get; set; }//视频下载记录

        public List<ServSMSRecordModel> beforeConfirmedPersonList { get; set; }//确警前关联人

        public List<ServSMSRecordModel> afterConfirmedPersonList { get; set; }//确警后关联人

        public List<ServSMSRecordModel> beforeConfirmedLeadList { get; set; }//确警前责任人

        public List<ServSMSRecordModel> afterConfirmedLeadList { get; set; }//确警后责任人
    }
}
