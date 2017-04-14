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
    //Serv_Plan_ItemResult
    public class ServPlanItemResultDAL : MapContext, IDataFactory<CSM.Model.ServPlanItemResultModel, ServPlanItemResultQuery>
    {
        /// <summary>
        /// 增加一条数据
        /// </summary>
        /// <param name="entity"></param>
        public int AddEntity(ServPlanItemResultModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertPlanItemResult", entity);
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
        public int DeletePlanItemResultById(int id)
        {
            int result = mapContext.Delete("DeletePlanItemResultById", id);

            return result;
        }


        /// <summary>
        /// 更新一条数据
        /// </summary>
        /// <param name="model"></param>
        public int UpdatePlanItemResultById(ServPlanItemResultModel model)
        {

            int result = mapContext.Update("UpdatePlanItemResultById", model);
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
        public List<ServPlanItemResultModel> GetEntities(ServPlanItemResultQuery query)
        {
            List<ServPlanItemResultModel> list = mapContext.QueryForList<ServPlanItemResultModel>("GetPlanItemResult", query).ToList();
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
        public List<ServPlanItemResultModel> GetEntities(ServPlanItemResultQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServPlanItemResultModel> list = mapContext.QueryForList<ServPlanItemResultModel>("PlanItemResultPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        /// <summary>
        /// 通过预案执行记录ID查找预案处置项记录
        /// </summary>
        /// <param name="planId"></param>
        /// <returns></returns>
        public List<ServPlanItemResultModel> GetEntitiesByPlanRecordId(int planRecordId)
        {
            try
            {
                return mapContext.QueryForList<ServPlanItemResultModel>("QueryPlanItemRecordByPlanRecordId", planRecordId).ToList();

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public ServPlanItemResultModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServPlanItemResultModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}