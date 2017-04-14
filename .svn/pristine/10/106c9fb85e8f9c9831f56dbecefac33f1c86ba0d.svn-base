using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
using CSM.Common;
using CSM.Utils;
using CSM.Model.CustomModel;

namespace CSM.DAL
{
	 	//记录报警事件流水
	public class ServAlarmRecordDAL : MapContext, IDataFactory<CSM.Model.ServAlarmRecordModel, ServAlarmRecordQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServAlarmRecordModel entity)  
		{
            int id = (int)mapContext.Insert("InsertAlarmRecord", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteAlarmRecordById(int id)
        {
            int result = mapContext.Delete("DeleteAlarmRecordById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public bool UpdateAlarmRecordById(ServAlarmRecordModel model)
        {
            try
            {

                int res = mapContext.Update("UpdateAlarmRecord", model);
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
		
		
		
        public bool DelEntity(int id)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServAlarmRecordModel> GetEntities(ServAlarmRecordQuery query)
        {
            List<ServAlarmRecordModel> list = mapContext.QueryForList<ServAlarmRecordModel>("GetAlarmRecord", query).ToList();
            return list;
        }
        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageSize">当前页数</param>
        /// <param name="pageNumber">每页显示行数</param>
        /// <param name="totalNumber">总数</param>
        /// <returns></returns>
        public List<ServAlarmRecordModel> GetEntities(ServAlarmRecordQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServAlarmRecordModel> list = mapContext.QueryForList<ServAlarmRecordModel>("AlarmRecordPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }
        /// <summary>
        /// 不带条件分页查询设备报警
        /// </summary>
        /// <param name="pageIndex">第几页</param>
        /// <param name="pageSize">每页显示数量</param>
        /// <param name="totalNumber">总数</param>
        /// <returns></returns>
        public List<ServAlarmRecordModel> GetEntities(int pageIndex, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageIndex;
            model.pageSize = pageSize;
            List<ServAlarmRecordModel> list = mapContext.QueryForList<ServAlarmRecordModel>("AlarmRecordPage", model).ToList();
            totalNumber = mapContext.QueryForObject<int>("GetAlarmRecordCount", null);
            return list;

        }
        /// <summary>
        /// 带条件分页查询设备报警
        /// </summary>
        /// <param name="pageIndex">第几页</param>
        /// <param name="pageSize">每页显示数量</param>
        /// <param name="startTime">起始时间</param>
        /// <param name="endTime">截止时间</param>
        /// <param name="alarmCode">设备编码</param>
        /// <param name="totalNumber">总数</param>
        /// <returns></returns>
        public List<AlarmRecordCustom> GetEntities(ServAlarmRecordQuery query, out int totalNumber)
        {
           
            try
            {
               string SQL= CSM.Utils.IBatisHelper.GetRuntimeSql(mapContext,"QueryAlarmRecordPage",query);
                List<AlarmRecordCustom> list = mapContext.QueryForList<AlarmRecordCustom>("QueryAlarmRecordPage", query).ToList();
                totalNumber = mapContext.QueryForObject<int>("QueryAlarmRecordCount", query);
                return list;
            }
            catch (Exception ex)
            {
                //log:分页查询设备报警失败+ex.message
                totalNumber = 0;
                throw ex;
            }
           
        }
        /// <summary>
        /// 根据条件查询全部报警记录
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<AlarmRecordCustom> GetAllAlarmRecordCondition(DefinedAlarmRecordQuery query)
        {
            try
            {
                List<AlarmRecordCustom> list = mapContext.QueryForList<AlarmRecordCustom>("GetAllAlarmRecordCondition", query).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据报警ID查询报警记录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServAlarmRecordModel GetEntity(int id)
        {
            try
            {
                return mapContext.QueryForObject<ServAlarmRecordModel>("GetAlarmRecordById", id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取最新报警记录
        /// </summary>
        /// <returns></returns>
        public ServAlarmRecordModel GetLastAlarmRecord()
        {
            try
            {
                return mapContext.QueryForObject<ServAlarmRecordModel>("GetLastAlarmRecord", null);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        /// <summary>
        /// 批量确警
        /// </summary>
        /// <returns></returns>
        public bool MultipleConfirmAlarm(List<MultipleConfirmAlarm> list)
        {
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);
            try
            {
               // string res= IBatisHelper.GetRuntimeSql(mapContext, "BatchUpdateConfirmAlarm", list);
                int rows= mapContext.Update("BatchUpdateConfirmAlarm", list);  //返回受影响行数
                if (list.Count == rows)
                {
                    mapContext.CommitTransaction();
                    return true;
                }
                else
                {
                    mapContext.RollBackTransaction();
                    //log批量确警失败
                    throw new Exception("部分确警失败");
                }
            }
            catch (Exception ex)
            {
                mapContext.RollBackTransaction();
                throw ex;
            }
        }

        public bool UpdateEntity(int id, ServAlarmRecordModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 获取未确警条数
        /// </summary>
        /// <param name="newentity"></param>
        /// <returns></returns>
        public List<ServAlarmRecordModel> GetNotPoliceNum(ServAlarmRecordModel newentity)
        {
            try
            {
                List<ServAlarmRecordModel> list = mapContext.QueryForList<ServAlarmRecordModel>("GetNotPoliceNum", newentity).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取前几条报警
        /// </summary>
        /// <param name="num"></param>
        /// <returns></returns>
        public List<ServAlarmRecordModel> GetFirstFewAlarm(int num)
        {
            try
            {
                ServAlarmRecordModel model = new ServAlarmRecordModel();
                model.alarm_level= num;
                List<ServAlarmRecordModel> list = mapContext.QueryForList<ServAlarmRecordModel>("GetFirstFewAlarm", model).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取今日报警数
        /// </summary>
        /// <returns></returns>
        public List<ServAlarmRecordModel> GetAlarmNumToday()
        {
            try
            {
                ServAlarmRecordModel model = new ServAlarmRecordModel();
                List<ServAlarmRecordModel> list = mapContext.QueryForList<ServAlarmRecordModel>("GetAlarmNumToday", model).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #region  报警统计
        /// <summary>
        /// 获取一段时间内报警数量
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public int GetAlarmCount(TimePeriodQuery query)
        {
            try
            {
               return mapContext.QueryForObject<int>("GetAlarmCount", query);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion 
    }
}