using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.DAL;
using CSM.Model.QueryModel;

namespace CSM.BLL
{
    public class ServVideoDownloadBLL
    {
        ServVideoInfoDAL servVideoInfoDAL = new ServVideoInfoDAL();
        ServAlarmVideoTimeDAL servAlarmVideoTimeDAL = new ServAlarmVideoTimeDAL();
        BaseEventTypeDAL baseEventTypeBLL = new BaseEventTypeDAL();
        /// <summary>
        /// 往下载列表中插入一条数据
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool VideoDownloadWrite(ServVideoInfoModel model)
        {
            try
            {
                bool result = false;
                int id= servVideoInfoDAL.AddEntity(model);
                if (id != 0)
                {
                    result = true;
                }
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 分页获取视频下载列表
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServVideoInfoModel> GetVideoDownlonadList(ServVideoInfoQuery query,out int total)
        {
            try
            {
                List<ServVideoInfoModel> list = new List<ServVideoInfoModel>();
                list = servVideoInfoDAL.GetEntities(query,1,1,out total);
                return list;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        /// <summary>
        /// 根据事件编码获取时间信息
        /// </summary>
        /// <param name="Event"></param>
        /// <returns></returns>
        public ServAlarmVideoTimeModel GetAlarmVideoTime(string Event)
        {
            try
            {
                int event_id = -1;
                BaseEventTypeModel baseEventType = baseEventTypeBLL.GetEntityByEventCode(Event);
                if(baseEventType!=null)
                {
                    if(baseEventType.pid==-1)
                    {
                        event_id = baseEventType.id;
                    }
                    else
                    {
                        event_id = baseEventType.pid;
                    }
                }
               ServAlarmVideoTimeModel AlarmVideoTimeInfo = servAlarmVideoTimeDAL.GetEntityByEventId(event_id);
               return AlarmVideoTimeInfo;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        /// <summary>
        /// 往下载列表中插入多条数据
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool AddvideoDownload(List<ServVideoInfoModel> model)
        {
            try
            {
                bool result = false;
                result = servVideoInfoDAL.AddAllEntity(model);
                return result;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }


    }
}
