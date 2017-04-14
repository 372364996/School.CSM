using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_SMS_HandleItemResult
	public class ServSMSHandleItemResultDAL : MapContext, IDataFactory<CSM.Model.ServSMSHandleItemResultModel, ServSMSHandleItemResultQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServSMSHandleItemResultModel entity)  
		{
            int id = (int)mapContext.Insert("InsertSMSHandleItemResult", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteSMSHandleItemResultById(int id)
        {
            int result = mapContext.Delete("DeleteSMSHandleItemResultById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateSMSHandleItemResultById(ServSMSHandleItemResultModel model)
        {

            int result = mapContext.Update("UpdateSMSHandleItemResultById", model);
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
        public List<ServSMSHandleItemResultModel> GetEntities(ServSMSHandleItemResultQuery query)
        {
            List<ServSMSHandleItemResultModel> list = mapContext.QueryForList<ServSMSHandleItemResultModel>("GetSMSHandleItemResult", query).ToList();
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
        public List<ServSMSHandleItemResultModel> GetEntities(ServSMSHandleItemResultQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            throw new NotImplementedException();

        }

        public ServSMSHandleItemResultModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServSMSHandleItemResultModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}