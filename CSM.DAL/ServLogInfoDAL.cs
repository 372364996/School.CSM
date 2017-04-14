using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//系统日志记录表
	public class ServLogInfoDAL : MapContext, IDataFactory<CSM.Model.ServLogInfoModel, ServLogInfoQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServLogInfoModel entity)  
		{
            int id = (int)mapContext.Insert("InsertLogInfo", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteLogInfoById(int id)
        {
            int result = mapContext.Delete("DeleteLogInfoById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateLogInfoById(ServLogInfoModel model)
        {

            int result = mapContext.Update("UpdateLogInfo", model);
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
        public List<ServLogInfoModel> GetEntities(ServLogInfoQuery query)
        {
            List<ServLogInfoModel> list = mapContext.QueryForList<ServLogInfoModel>("GetLogInfo", query).ToList();
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
        public List<ServLogInfoModel> GetEntities(ServLogInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServLogInfoModel> list = mapContext.QueryForList<ServLogInfoModel>("LogInfoPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServLogInfoModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServLogInfoModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}