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
    public class HandleCamerasBLL
    {
        private ServPlanHandleItemCameraDAL _servPlanHandleItemCameraDal = new ServPlanHandleItemCameraDAL();
        /// <summary>
        /// 根据预案处置项ID查找摄像头信息
        /// </summary>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetCameras(int handleItemId)
        {
            try
            {
               return  _servPlanHandleItemCameraDal.GetHandledCameras(handleItemId);
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("根据处置项ID查找摄像头失败！处置项ID："+handleItemId+" 错误信息："+ex.Message);
                return null;
            }
        }
        /// <summary>
        /// 调取地图接口获取事件预案周围摄像头
        /// </summary>
        /// <param name="deviceId"></param>
        /// <param name="inNum"></param>
        /// <param name="outDistance"></param>
        /// <param name="outNum"></param>
        /// <returns></returns>
        public List<ServDeviceInfoModel> GetEventPlanCameras(int deviceId, int inNum, int outDistance, int outNum)
        {
            try
            {
                //TODO
                return null;
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("根据设备ID查找事件预案周围摄像头失败！报警设备ID：" + deviceId + " 错误信息：" + ex.Message);
                return null;
            }
        }
    }
}
