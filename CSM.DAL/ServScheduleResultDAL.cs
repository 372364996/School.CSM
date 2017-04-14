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
	 	//Serv_Schedule_Result
	public class ServScheduleResultDAL : MapContext, IDataFactory<CSM.Model.ServScheduleResultModel, ServScheduleResultQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServScheduleResultModel entity)  
		{
            int id = (int)mapContext.Insert("InsertScheduleResult", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteScheduleResultById(int id)
        {
            int result = mapContext.Delete("DeleteScheduleResultById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateScheduleResultById(ServScheduleResultModel model)
        {

            int result = mapContext.Update("UpdateScheduleResult", model);
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
        public List<ServScheduleResultModel> GetEntities(ServScheduleResultQuery query)
        {
            List<ServScheduleResultModel> list = mapContext.QueryForList<ServScheduleResultModel>("GetScheduleResult", query).ToList();
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
        public List<ServScheduleResultModel> GetEntities(ServScheduleResultQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServScheduleResultModel> list = mapContext.QueryForList<ServScheduleResultModel>("ScheduleResultPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }
        /// <summary>
        ///计划任务结果分页查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<ScheduleResultCustom> GetScheduleResultByPage(ServScheduleResultQuery query, out int totalNumber)
        {
            try
            {
                List<ScheduleResultCustom> list = mapContext.QueryForList<ScheduleResultCustom>("QueryScheduleResultPage", query).ToList();
                totalNumber = mapContext.QueryForObject<int>("QueryScheduleResultCount", query);
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ServScheduleResultModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServScheduleResultModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}