using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_Event_RelateRegulation
	public class ServEventRelateRegulationDAL : MapContext, IDataFactory<CSM.Model.ServEventRelateRegulationModel, ServEventRelateRegulationQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServEventRelateRegulationModel entity)  
		{
            int id = (int)mapContext.Insert("InsertEventRelateRegulation", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteEventRelateRegulationById(int id)
        {
            int result = mapContext.Delete("DeleteEventRelateRegulationById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateEventRelateRegulationById(ServEventRelateRegulationModel model)
        {

            int result = mapContext.Update("UpdateEventRelateRegulation", model);
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
        public List<ServEventRelateRegulationModel> GetEntities(ServEventRelateRegulationQuery query)
        {
            List<ServEventRelateRegulationModel> list = mapContext.QueryForList<ServEventRelateRegulationModel>("GetEventRelateRegulation", query).ToList();
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
        public List<ServEventRelateRegulationModel> GetEntities(ServEventRelateRegulationQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServEventRelateRegulationModel> list = mapContext.QueryForList<ServEventRelateRegulationModel>("EventRelateRegulationPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServEventRelateRegulationModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServEventRelateRegulationModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}