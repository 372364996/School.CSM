using CSM.Common;
using CSM.DAL;
using CSM.Model;
using CSM.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL.SubSystemBLL
{
    public class VideoDownloadBLL
    {
        /// <summary>
        /// 视频下载记录
        /// </summary>
        /// <param name="handleRecordId"></param>
        /// <param name="eventId"></param>
        /// <param name="alarmTime"></param>
        /// <param name="deviceInfo"></param>
        /// <returns></returns>
        public bool VideoDownload(int handleRecordId, int eventId, DateTime alarmTime, List<ServDeviceInfoModel> deviceInfo)
        {
            try
            {
                ServAlarmVideoTimeDAL videoTimeDal = new ServAlarmVideoTimeDAL();
                ServAlarmVideoTimeModel videoTime = videoTimeDal.GetEntityByEventId(eventId);
                if (videoTime != null)
                {
                    DateTime startTime = alarmTime.AddSeconds(-videoTime.start_time);
                    DateTime endTime = alarmTime.AddSeconds(videoTime.end_time);
                    if (startTime == endTime)
                    {
                        Log4NetHelp.Info("开始下载时间与结束时间一致！请重新配置事件，事件ID：" + eventId);
                        return false;
                    }

                    //循环调用视频下载接口，
                    //记录存入视频下载表和关联表
                    if (deviceInfo != null)
                    {
                        ServVideoPlanHandleRecordDAL dal = new ServVideoPlanHandleRecordDAL();
                        for (int i = 0; i < deviceInfo.Count; i++)
                        {
                            try
                            {
                                //增加视频下载记录及报警视频关联记录
                                if (!dal.AddPlanVideoDownRecord(handleRecordId, "", DateTime.Now, deviceInfo[i].device_code, deviceInfo[i].device_name, (int)EnumClass.VideoDownLoadStatus.未开始下载, 1, endTime, startTime, (int)EnumClass.VideoDownLoadType.报警))
                                {
                                    Log4NetHelp.Info("视频下载记录写入下载记录表失败！处理记录ID：" + handleRecordId + " 设备名称：" + deviceInfo[i].device_name);
                                }
                            }
                            catch (Exception ex)
                            {
                                Log4NetHelp.Info("视频下载记录写入下载记录表失败！处理记录ID：" + handleRecordId + " 设备名称：" + deviceInfo[i].device_name + " 错误：" + ex.Message);
                            }
                        }
                    }
                    else
                    {
                        Log4NetHelp.Info("待下载摄像头数据为空！");
                    }
                    return true;
                }
                else
                {
                    Log4NetHelp.Info("根据报警事件ID未找到事件！无法找到视频下载时间配置！");
                    return false;
                }
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("处理预案视频下载失败！" + ex.Message);
                return false;
            }
        }
    }
}
