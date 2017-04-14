using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_Execution_Time
	public class ServExecutionTimeDAL : MapContext, IDataFactory<CSM.Model.ServExecutionTimeModel, ServExecutionTimeQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServExecutionTimeModel entity)  
		{
		    try
		    {
            int id = (int)mapContext.Insert("InsertServExecutionTime", entity);
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
		public int DeleteServExecutionTimeById(int id)
        {
            try
            {
            int result = mapContext.Delete("DeleteServExecutionTimeById", id);
            return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateServExecutionTimeById(ServExecutionTimeModel model)
        {
            try
            {
            int result = mapContext.Update("UpdateServExecutionTimeById", model);
            return result;
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
        public List<ServExecutionTimeModel> GetEntities(ServExecutionTimeQuery query)
        {
           try
            {
            List<ServExecutionTimeModel> list = mapContext.QueryForList<ServExecutionTimeModel>("GetServExecutionTime", query).ToList();
            return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageSize">当前页数</param>
        /// <param name="pageNumber">每页显示行数</param>
        /// <param name="totalNumber">总数</param>
        /// <returns></returns>
        public List<ServExecutionTimeModel> GetEntities(ServExecutionTimeQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
           throw new NotImplementedException();

        }
        /// <summary>
        /// 根据id查询
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServExecutionTimeModel GetEntity(int id)
        {
            try
            {
                ServExecutionTimeModel ExecutionTimeInfo = mapContext.QueryForObject<ServExecutionTimeModel>("GetServExecutionTimeById", id);
                return ExecutionTimeInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ServExecutionTimeModel GetTimeEntity(int eventPlanId,int planType)
        {
            try
            {
                ServExecutionTimeQuery query = new ServExecutionTimeQuery();
                query.relate_id = eventPlanId;
                query.type = planType;
                ServExecutionTimeModel ExecutionTimeInfo = mapContext.QueryForObject<ServExecutionTimeModel>("GetTimeInfoById", query);
                return ExecutionTimeInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool UpdateEntity(int id, ServExecutionTimeModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}