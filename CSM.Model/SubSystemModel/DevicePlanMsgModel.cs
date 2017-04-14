using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.Model.SubSystemModel
{
    public class DevicePlanMsgModel
    {
        /// <summary>
        /// 报警记录
        /// </summary>
        public ServAlarmRecordModel alarm { get; set; }
        
        /// <summary>
        /// 处置项结果
        /// </summary>
        public Hashtable hash { get; set; }
        /// <summary>
        /// 设备信息
        /// </summary>
        public ServDeviceInfoModel deviceInfo { get; set; }
        /// <summary>
        /// 视频下载时间配置
        /// </summary>
        public ServAlarmVideoTimeModel videoTime { get; set; }

        /// <summary>
        /// 关联摄像头信息
        /// </summary>
        public List<ServDeviceInfoModel> camerasList { get; set; }

        /// <summary>
        /// LED显示信息
        /// </summary>
        public string ledMessage { get; set; }
    }
}
