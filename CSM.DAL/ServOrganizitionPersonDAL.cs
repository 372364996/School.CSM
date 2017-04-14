using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//人员职位如何处理？组织机构下需要优先找到负责人
   
   ///人员职位新建一个组织结构
	public class ServOrganizitionPersonDAL : MapContext, IDataFactory<CSM.Model.ServOrganizitionPersonModel, ServOrganizitionPersonQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServOrganizitionPersonModel entity)  
		{
            int id = (int)mapContext.Insert("InsertOrganizitionPerson", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteOrganizitionPersonById(int id)
        {
            int result = mapContext.Delete("DeleteOrganizitionPersonById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateOrganizitionPersonById(ServOrganizitionPersonModel model)
        {

            int result = mapContext.Update("UpdateOrganizitionPerson", model);
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
        public List<ServOrganizitionPersonModel> GetEntities(ServOrganizitionPersonQuery query)
        {
            List<ServOrganizitionPersonModel> list = mapContext.QueryForList<ServOrganizitionPersonModel>("GetOrganizitionPerson", query).ToList();
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
        public List<ServOrganizitionPersonModel> GetEntities(ServOrganizitionPersonQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServOrganizitionPersonModel> list = mapContext.QueryForList<ServOrganizitionPersonModel>("OrganizitionPersonPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServOrganizitionPersonModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServOrganizitionPersonModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}