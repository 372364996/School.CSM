using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
using CSM.Utils;

namespace CSM.DAL
{
	 	//Serv_Plan_Record
	public class ServPlanRecordDAL : MapContext, IDataFactory<CSM.Model.ServPlanRecordModel, ServPlanRecordQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServPlanRecordModel entity)  
		{
            int id = (int)mapContext.Insert("InsertPlanRecord", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeletePlanRecordById(int id)
        {
            int result = mapContext.Delete("DeletePlanRecordById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdatePlanRecordById(ServPlanRecordModel model)
        {

            int result = mapContext.Update("UpdatePlanRecordById", model);
            return result;
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
        public List<ServPlanRecordModel> GetEntities(ServPlanRecordQuery query)
        {
            List<ServPlanRecordModel> list = mapContext.QueryForList<ServPlanRecordModel>("GetPlanRecord", query).ToList();
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
        public List<ServPlanRecordModel> GetEntities(ServPlanRecordQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            try
            {
                string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "PlanRecordCount", query);
                totalNumber = mapContext.QueryForObject<int>("PlanRecordCount", query);
                query.pageSize = pageSize;
                query.pageNumber = pageNumber;
                string sql1 = IBatisHelper.GetRuntimeSql(this.mapContext, "PlanRecordPage", query);
                List<ServPlanRecordModel> list = mapContext.QueryForList<ServPlanRecordModel>("PlanRecordPage", query).ToList();
                return list;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ServPlanRecordModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServPlanRecordModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 通过报警ID查找预案执行记录
        /// </summary>
        /// <param name="alarmId"></param>
        /// <returns></returns>
        public ServPlanRecordModel GetEntityByAlarmId(int alarmId)
        {
            try
            {
                ServPlanRecordModel record = mapContext.QueryForObject<ServPlanRecordModel>("QueryPlanRecordByAlarmId", alarmId);
                return record;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}