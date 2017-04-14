using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_Org_Location
	public class ServOrgLocationDAL : MapContext, IDataFactory<CSM.Model.ServOrgLocationModel, ServOrgLocationQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServOrgLocationModel entity)  
		{
            int id = (int)mapContext.Insert("InsertOrgLocation", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteOrgLocationById(int id)
        {
            int result = mapContext.Delete("DeleteOrgLocationById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateOrgLocationById(ServOrgLocationModel model)
        {

            int result = mapContext.Update("UpdateOrgLocation", model);
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
        public List<ServOrgLocationModel> GetEntities(ServOrgLocationQuery query)
        {
            List<ServOrgLocationModel> list = mapContext.QueryForList<ServOrgLocationModel>("GetOrgLocation", query).ToList();
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
        public List<ServOrgLocationModel> GetEntities(ServOrgLocationQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServOrgLocationModel> list = mapContext.QueryForList<ServOrgLocationModel>("OrgLocationPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServOrgLocationModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServOrgLocationModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}