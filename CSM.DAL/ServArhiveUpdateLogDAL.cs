using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_Arhive_UpdateLog
	public class ServArhiveUpdateLogDAL : MapContext, IDataFactory<CSM.Model.ServArhiveUpdateLogModel, ServArhiveUpdateLogQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServArhiveUpdateLogModel entity)  
		{
            int id = (int)mapContext.Insert("InsertArhiveUpdateLog", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteArhiveUpdateLogById(int id)
        {
            int result = mapContext.Delete("DeleteArhiveUpdateLogById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateArhiveUpdateLogById(ServArhiveUpdateLogModel model)
        {

            int result = mapContext.Update("UpdateArhiveUpdateLog", model);
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
        public List<ServArhiveUpdateLogModel> GetEntities(ServArhiveUpdateLogQuery query)
        {
            List<ServArhiveUpdateLogModel> list = mapContext.QueryForList<ServArhiveUpdateLogModel>("GetArhiveUpdateLog", query).ToList();
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
        public List<ServArhiveUpdateLogModel> GetEntities(ServArhiveUpdateLogQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServArhiveUpdateLogModel> list = mapContext.QueryForList<ServArhiveUpdateLogModel>("ArhiveUpdateLogPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServArhiveUpdateLogModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServArhiveUpdateLogModel newentity)
        {
            throw new NotImplementedException();
        }
        public List<ServArhiveUpdateLogModel> GetArhiveUpdateLogInfo(int arhiveId)
        {
            try
            {
                List<ServArhiveUpdateLogModel> list = mapContext.QueryForList<ServArhiveUpdateLogModel>("GetArhiveUpdateLogInfo", arhiveId).ToList();
                return list;
            }
            catch(Exception ex)
            {
                throw ex;
            }
           
        }
    }
}