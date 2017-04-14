using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_Plan_HandleItem
	public class ServPlanHandleItemDAL : MapContext, IDataFactory<CSM.Model.ServPlanHandleItemModel, ServPlanHandleItemQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServPlanHandleItemModel entity)  
		{
            int id = (int)mapContext.Insert("InsertPlanHandleItem", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeletePlanHandleItemById(int id)
        {
            int result = mapContext.Delete("DeletePlanHandleItemById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdatePlanHandleItemById(ServPlanHandleItemModel model)
        {

            int result = mapContext.Update("UpdatePlanHandleItemById", model);
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
        public List<ServPlanHandleItemModel> GetEntities(ServPlanHandleItemQuery query)
        {
            List<ServPlanHandleItemModel> list = mapContext.QueryForList<ServPlanHandleItemModel>("GetPlanHandleItem", query).ToList();
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
        public List<ServPlanHandleItemModel> GetEntities(ServPlanHandleItemQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServPlanHandleItemModel> list = mapContext.QueryForList<ServPlanHandleItemModel>("PlanHandleItemPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServPlanHandleItemModel GetEntity(int id)
        {
            try
            {
                return mapContext.QueryForObject<ServPlanHandleItemModel>("GetPlanHandleItemById", id);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public bool UpdateEntity(int id, ServPlanHandleItemModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据预案id获取处置项
        /// </summary>
        /// <param name="PlanId"></param>
        /// <returns></returns>
        public List<ServPlanHandleItemModel> GetPlanHandleItem(int PlanId,int planType)
        {
            try
            {
                ServPlanHandleItemModel servPlanHandleItemModel = new ServPlanHandleItemModel();
                servPlanHandleItemModel.plan_type = planType;
                servPlanHandleItemModel.plan_id = PlanId;
                List<ServPlanHandleItemModel> list = mapContext.QueryForList<ServPlanHandleItemModel>("GetPlanHandleItemByPlanId", servPlanHandleItemModel).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据预案类型，预案ID，确警前/后条件查找预案
        /// </summary>
        /// <param name="planId"></param>
        /// <param name="planType"></param>
        /// <param name="configType"></param>
        /// <returns></returns>
        public List<ServPlanHandleItemModel> GetPlanHandleItem(int planId, int planType, int configType)
        {
            try
            {
                ServPlanHandleItemModel servPlanHandleItemModel = new ServPlanHandleItemModel();
                servPlanHandleItemModel.plan_type = planType;
                servPlanHandleItemModel.plan_id = planId;
                servPlanHandleItemModel.confirm_type = configType;
                List<ServPlanHandleItemModel> list = mapContext.QueryForList<ServPlanHandleItemModel>("GetDefaultPlanHandleItemByPlanId", servPlanHandleItemModel).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 通过预案处置项类型，预案类型，预案ID获取预案处置项
        /// </summary>
        /// <param name="planId"></param>
        /// <param name="planType"></param>
        /// <param name="itemType"></param>
        /// <returns></returns>
        public ServPlanHandleItemModel GetPlanHandleItemByTypeAndId(int planId, int planType, int itemType)
        {
            try
            {
                ServPlanHandleItemModel servPlanHandleItemModel = new ServPlanHandleItemModel();
                servPlanHandleItemModel.plan_type = planType;
                servPlanHandleItemModel.plan_id = planId;
                servPlanHandleItemModel.item_type = itemType;
                ServPlanHandleItemModel retServPlanHandleItemModel = mapContext.QueryForObject<ServPlanHandleItemModel>("GetPlanHandleItemByTypeAndId",servPlanHandleItemModel);
                return retServPlanHandleItemModel;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 根据报警ID获取确警后处置项
        /// </summary>
        /// <param name="alarmId"></param>
        /// <returns></returns>
        public List<ServPlanHandleItemModel> GetConfirmPlanHandleItemByAlarmId(int alarmId)
        {
            try
            {
                return mapContext.QueryForList<ServPlanHandleItemModel>("GetConfirmPlanHandleItemByAlarmId", alarmId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
      
    }
}