using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//通知责任人的表，不是网格负责人的表
      ///网格负责人直接在勾选后的处置项
	public class ServPlanPersonDAL : MapContext, IDataFactory<CSM.Model.ServPlanPersonModel, ServPlanPersonQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServPlanPersonModel entity)  
		{
            int id = (int)mapContext.Insert("InsertPlanPerson", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeletePlanPersonById(int id)
        {
            int result = mapContext.Delete("DeletePlanPersonById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdatePlanPersonById(ServPlanPersonModel model)
        {

            int result = mapContext.Update("UpdatePlanPersonById", model);
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
        public List<ServPlanPersonModel> GetEntities(ServPlanPersonQuery query)
        {
            List<ServPlanPersonModel> list = mapContext.QueryForList<ServPlanPersonModel>("GetPlanPerson", query).ToList();
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
        public List<ServPlanPersonModel> GetEntities(ServPlanPersonQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServPlanPersonModel> list = mapContext.QueryForList<ServPlanPersonModel>("PlanPersonPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        /// <summary>
        /// 根据预案处置项ID查找预案关联责任人信息
        /// </summary>
        /// <param name="itemId"></param>
        /// <returns></returns>
        public List<ServPlanPersonModel> GetPlanPersonByItemId(int itemId)
        {
            try
            {
                return mapContext.QueryForList<ServPlanPersonModel>("GetPlanPersonByItemId", itemId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ServPlanPersonModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServPlanPersonModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据id获取其他责任人信息
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public List<ServPlanPersonModel> GetPlanPersonInfo(int itemId)
        {
            try
            {
                List<ServPlanPersonModel> list = mapContext.QueryForList<ServPlanPersonModel>("GetPlanPersonByItemId", itemId).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}