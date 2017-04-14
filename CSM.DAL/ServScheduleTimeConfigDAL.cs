using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using CSM.Utils;
using CSM.Common;

namespace CSM.DAL
{
    public class ServScheduleTimeConfigDAL : MapContext, IDataFactory<ServScheduleTimeConfigModel, ServScheduleTimeConfigQuery>
    {
        /// <summary>
        /// 新增计划任务时间配置
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int AddEntity(ServScheduleTimeConfigModel entity)
        {
            try
            {
                return (int)mapContext.Insert("InsertScheduleTimeConfig", entity);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 通过ID获取时间配置
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServScheduleTimeConfigModel GetScheduleTimeConfigById(int id)
        {
            try
            {
                return mapContext.QueryForObject<ServScheduleTimeConfigModel>("GetScheduleTimeConfigById", id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 通过计划任务ID获取计划任务时间配置
        /// </summary>
        /// <param name="scheduleId"></param>
        /// <returns></returns>
        public List<ServScheduleTimeConfigModel> GetScheduleTimeConfigByScheduleId(int scheduleId)
        {
            try
            {
                return mapContext.QueryForList<ServScheduleTimeConfigModel>("GetTimeConfigByScheduleId", scheduleId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 通过计划任务ID以及时间类型获取计划任务时间配置
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServScheduleTimeConfigModel> GetScheduleTimeConfigByIdAndTimeType(ServScheduleTimeConfigQuery query)
        {
            try
            {
                return mapContext.QueryForList<ServScheduleTimeConfigModel>("GetScheduleTimeConfigByIdAndTimeType", query).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 更新时间配置
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int UpdateTimeConfig(ServScheduleTimeConfigModel entity)
        {
            try
            {
                return mapContext.Update("UpdateScheduleTimeConfig", entity);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据计划任务ID删除时间配置
        /// </summary>
        /// <param name="scheduleId"></param>
        /// <returns></returns>
        public int DeleteTimeConfigByScheduleId(int scheduleId)
        {
            try
            {
                return mapContext.Delete("DeleteTimeConfigByScheduleId", scheduleId);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据ID删除时间配置
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DelEntity(int id)
        {
            try
            {
               return mapContext.Delete("DeleteScheduleTimeConfigById", id) > 0 ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ServScheduleTimeConfigModel> GetEntities(ServScheduleTimeConfigQuery query)
        {
            throw new NotImplementedException();
        }

        public List<ServScheduleTimeConfigModel> GetEntities(ServScheduleTimeConfigQuery query, int pageSize, int pageNumber, out int totalNumber)
        {
            throw new NotImplementedException();
        }

        public ServScheduleTimeConfigModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServScheduleTimeConfigModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}
