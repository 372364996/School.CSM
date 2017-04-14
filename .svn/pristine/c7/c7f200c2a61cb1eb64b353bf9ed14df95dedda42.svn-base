using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.DAL;
using CSM.Model;
using CSM.Common;
using CSM.Utils;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;

namespace CSM.BLL
{
    public class ServScheduleResultBLL
    {
        private ServScheduleResultDAL servScheduleResultDal = new ServScheduleResultDAL();
        /// <summary>
        /// 分页获取计划任务结果
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="regionId"></param>
        /// <param name="scheduleType"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<RetScheduleResult> GetScheduleResultByPage(int pageIndex, int pageSize, int regionId, int scheduleType, string startTime, string endTime, out int totalNumber)
        {
            try
            {
                List<RetScheduleResult> retResultList = new List<RetScheduleResult>();
                RetScheduleResult retScheduleModel = null;
                BaseRegionConfigDAL baseRegionConfigDal = new BaseRegionConfigDAL();
                ServScheduleResultQuery query = new ServScheduleResultQuery();
                query.endTime = endTime;
                query.pageIndex = pageIndex;
                query.pageSize = pageSize;
                query.regionId = regionId;
                query.scheduleType = scheduleType;
                query.startTime = startTime;
                List<ScheduleResultCustom> scheduleResultList = servScheduleResultDal.GetScheduleResultByPage(query, out totalNumber); //分页获取计划任务结果
                List<BaseRegionConfigModel> regionList = baseRegionConfigDal.GetAllRegionConfig();//获取所有园区配置
                for (int i = 0; i < scheduleResultList.Count; i++)
                {
                    retScheduleModel = new RetScheduleResult();
                    retScheduleModel.create_time = scheduleResultList[i].create_time;
                    retScheduleModel.end_time = scheduleResultList[i].end_time;
                    retScheduleModel.start_time = scheduleResultList[i].start_time;
                    retScheduleModel.id = scheduleResultList[i].id;
                    retScheduleModel.region_name = regionList.Where(n => n.id == scheduleResultList[i].region_id).FirstOrDefault() == null ? "--" : regionList.Where(n => n.id == scheduleResultList[i].region_id).FirstOrDefault().region_name;
                    retScheduleModel.result_content = scheduleResultList[i].result_content;
                    retScheduleModel.result_ext1 = scheduleResultList[i].result_ext1;
                    retScheduleModel.result_ext2 = scheduleResultList[i].result_ext2;
                    retScheduleModel.result_ext3 = scheduleResultList[i].result_ext3;
                    retScheduleModel.result_ext4 = scheduleResultList[i].result_ext4;
                    retScheduleModel.result_ext5 = scheduleResultList[i].result_ext5;
                    retScheduleModel.result_time = scheduleResultList[i].result_time;
                    retScheduleModel.schedule_name = scheduleResultList[i].schedule_name;
                    retScheduleModel.schedule_state = Enum.GetName(typeof(EnumClass.ScheduleState), scheduleResultList[i].schedule_state);
                    retScheduleModel.schedule_type = Enum.GetName(typeof(EnumClass.ScheduleType), scheduleResultList[i].schedule_type);
                    retResultList.Add(retScheduleModel);
                }
                return retResultList;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
    }
}
