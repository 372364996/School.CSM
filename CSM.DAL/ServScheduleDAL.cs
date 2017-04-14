using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
using CSM.Model.CustomModel;
namespace CSM.DAL
{
    //Serv_Schedule
    public class ServScheduleDAL : MapContext, IDataFactory<CSM.Model.ServScheduleModel, ServScheduleQuery>
    {
        /// <summary>
        /// 增加一条数据
        /// </summary>
        /// <param name="entity"></param>
        public int AddEntity(ServScheduleModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertSchedule", entity);
                return id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 删除一条数据
        /// </summary>
        /// <param name="id"></param>
        public int DeleteScheduleById(int id)
        {
            int result = mapContext.Delete("DeleteScheduleById", id);

            return result;
        }


        /// <summary>
        /// 更新一条数据
        /// </summary>
        /// <param name="model"></param>
        public int UpdateScheduleById(ServScheduleModel model)
        {
            try
            {
                string sql = CSM.Utils.IBatisHelper.GetRuntimeSql(mapContext, "UpdateSchedule", model);
                int result = mapContext.Update("UpdateSchedule", model);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        /// <summary>
        /// 修改计划任务截止时间
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateScheduleDeadLine(DBModelTimeCustom model)
        {
            try
            {
                int res = mapContext.Update("UpdateScheduleDeadLine", model);
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public bool DelEntity(int id)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServScheduleModel> GetEntities(ServScheduleQuery query)
        {
            List<ServScheduleModel> list = mapContext.QueryForList<ServScheduleModel>("GetSchedule", query).ToList();
            return list;
        }
        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<ServScheduleModel> GetEntities(ServScheduleQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServScheduleModel> list = mapContext.QueryForList<ServScheduleModel>("SchedulePage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }
        /// <summary>
        /// 分页查询计划任务
        /// </summary>
        /// <param name="query"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<ServScheduleModel> GetEntitiesByPage(ServScheduleQuery query, out int totalNumber)
        {
            try
            {
                List<ServScheduleModel> list = mapContext.QueryForList<ServScheduleModel>("QuerySchedulePage", query).ToList();
                totalNumber = mapContext.QueryForObject<int>("QueryScheduleCount", query);
                return list;
            }
            catch (Exception ex)
            {
                totalNumber = 0;
                throw ex;
            }
        }

        /// <summary>
        /// 分页查询视频巡更计划任务
        /// </summary>
        /// <param name="query"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<CameraPatrolSchedule> GetCameraPatrolScheduleByPage(ServScheduleQuery query, out int totalNumber)
        {
            try
            {
                string SQL = CSM.Utils.IBatisHelper.GetRuntimeSql(mapContext, "QueryCameraPatrolSchedulePage", query);
                List<CameraPatrolSchedule> list = mapContext.QueryForList<CameraPatrolSchedule>("QueryCameraPatrolSchedulePage", query).ToList();
                totalNumber = mapContext.QueryForObject<int>("QueryScheduleCount", query);
                return list;
            }
            catch (Exception ex)
            {
                totalNumber = 0;
                throw ex;
            }
        }
        /// <summary>
        /// 修改计划任务状态
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool UpdateScheduleState(DBModelStateCustom model)
        {
            try
            {
                int res = mapContext.Update("UpdateScheduleState", model);
                if (res > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 新增视频轮播计划任务
        /// </summary>
        /// <param name="custom"></param>
        /// <returns></returns>
        public bool InsertCameraPatrolSchedule(CameraScheduleCustom custom)
        {
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            ServScheduleTimeConfigDAL timeConfigDal = new ServScheduleTimeConfigDAL();
            try
            {
                ServScheduleModel schedule = new ServScheduleModel();
                schedule.content = custom.content;
                schedule.create_time = custom.create_time;
                schedule.end_time = custom.end_time;
                schedule.ext1 = custom.ext1;
                schedule.ext10 = custom.ext10;
                schedule.ext2 = custom.ext2;
                schedule.ext3 = custom.ext3;
                schedule.ext4 = custom.ext4;
                schedule.ext5 = custom.ext5;
                schedule.ext6 = custom.ext6;
                schedule.ext7 = custom.ext7;
                schedule.ext8 = custom.ext8;
                schedule.ext9 = custom.ext9;
                schedule.period_expression = custom.period_expression;
                schedule.region_id = custom.region_id;
                schedule.schedule_name = custom.schedule_name;
                schedule.schedule_state = custom.schedule_state;
                schedule.schedule_type = custom.schedule_type;
                schedule.start_time = custom.start_time;
                schedule.span_time = custom.span_time;
                int scheduleId = AddEntity(schedule);
                if (scheduleId > 0)
                {
                    ServScheduleTimeConfigModel timeModel = new ServScheduleTimeConfigModel();
                    timeModel.schedule_id = scheduleId;
                    timeModel.schedule_time = custom.start_execute_time;
                    timeModel.schedule_date = custom.schedule_date;
                    timeModel.time_type = 1;//开始时间
                    if (timeConfigDal.AddEntity(timeModel) > 0)
                    {
                        mapContext.CommitTransaction();
                        return true;
                    }
                    else
                    {
                        mapContext.RollBackTransaction();
                        return false;
                    }
                }
                else
                {
                    mapContext.RollBackTransaction();
                    return false;
                }
            }
            catch (Exception ex)
            {
                mapContext.RollBackTransaction();
                throw ex;
            }
        }
        /// <summary>
        /// 更新视频轮播计划任务
        /// </summary>
        /// <param name="custom"></param>
        /// <returns></returns>
        public bool UpdateCameraPatrolSchedule(CameraScheduleCustom custom)
        {
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            ServScheduleTimeConfigDAL timeConfigDal = new ServScheduleTimeConfigDAL();
            try
            {
                ServScheduleModel schedule = new ServScheduleModel();
                schedule.id = custom.id;
                schedule.content = custom.content;
                schedule.create_time = custom.create_time;
                schedule.end_time = custom.end_time;
                schedule.ext1 = custom.ext1;
                schedule.ext10 = custom.ext10;
                schedule.ext2 = custom.ext2;
                schedule.ext3 = custom.ext3;
                schedule.ext4 = custom.ext4;
                schedule.ext5 = custom.ext5;
                schedule.ext6 = custom.ext6;
                schedule.ext7 = custom.ext7;
                schedule.ext8 = custom.ext8;
                schedule.ext9 = custom.ext9;
                schedule.period_expression = custom.period_expression;
                schedule.region_id = custom.region_id;
                schedule.schedule_name = custom.schedule_name;
                schedule.schedule_state = custom.schedule_state;
                schedule.schedule_type = custom.schedule_type;
                schedule.start_time = custom.start_time;
                schedule.span_time = custom.span_time;
                int res = UpdateScheduleById(schedule);
                if (res > 0)
                {
                    ServScheduleTimeConfigModel timeModel = timeConfigDal.GetScheduleTimeConfigByScheduleId(custom.id).FirstOrDefault(); //获取第一个视频轮播计划任务时间配置
                    //如果未找到当前时间配置，则新增时间配置记录；找到时间配置，进行更新操作
                    if (timeModel != null)
                    {
                        timeModel.schedule_time = custom.start_execute_time;
                        timeModel.schedule_date = custom.schedule_date;
                        if (timeConfigDal.UpdateTimeConfig(timeModel) > 0)
                        {
                            mapContext.CommitTransaction();
                            return true;
                        }
                        else
                        {
                            mapContext.RollBackTransaction();
                            return false;
                        }
                    }
                    else
                    {
                        timeModel = new ServScheduleTimeConfigModel();
                        timeModel.schedule_id = custom.id;
                        timeModel.schedule_time = custom.start_execute_time;
                        timeModel.schedule_date = custom.schedule_date;
                        timeModel.time_type = 1;//开始时间
                        if (timeConfigDal.AddEntity(timeModel) > 0)
                        {
                            mapContext.CommitTransaction();
                            return true;
                        }
                        else
                        {
                            mapContext.RollBackTransaction();
                            return false;
                        }
                    }
                }
                else
                {
                    mapContext.RollBackTransaction();
                    return false;
                }
            }
            catch (Exception ex)
            {
                mapContext.RollBackTransaction();
                throw ex;
            }
        }
        /// <summary>
        /// 删除视频轮播计划任务
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DeleteCameraPatrolSchedule(int id)
        {
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            ServScheduleTimeConfigDAL timeConfigDal = new ServScheduleTimeConfigDAL();
            try
            {
                if (DeleteScheduleById(id) > 0)
                {
                    if (timeConfigDal.DeleteTimeConfigByScheduleId(id) > 0)
                    {
                        mapContext.CommitTransaction();
                        return true;
                    }
                    else
                    {
                        mapContext.RollBackTransaction();
                        return false;
                    }
                }
                else
                {
                    mapContext.RollBackTransaction();
                    return false;
                }
            }
            catch (Exception ex)
            {
                mapContext.RollBackTransaction();
                throw ex;
            }
        }
        /// <summary>
        /// 分页获取资产巡检
        /// </summary>
        /// <param name="query"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<ServScheduleModel> GetAssetInspectionPage(AssetInspectionQuery query, out int totalNumber)
        {
            try
            {
                string sql = CSM.Utils.IBatisHelper.GetRuntimeSql(mapContext, "QueryAssetInspectionPage", query);
                List<ServScheduleModel> list = mapContext.QueryForList<ServScheduleModel>("QueryAssetInspectionPage", query).ToList();
                totalNumber = mapContext.QueryForObject<int>("QueryAssetInspectionCount", query);
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /// <summary>
        /// 修改轮切资源编码
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateSwitchCode(GallerySwitchModel model)
        {
            try
            {
                return mapContext.Update("UpdateSwitchCode", model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ServScheduleModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServScheduleModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}