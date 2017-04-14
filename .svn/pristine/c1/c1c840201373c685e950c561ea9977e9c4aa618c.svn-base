using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;

namespace CSM.DAL
{
    public class BasePersonRelationshipDAL : MapContext, IDataFactory<CSM.Model.BasePersonRelationshipModel, CSM.Model.QueryModel.BasePersonRelationshipQuery>
    {
        #region 基础增删改查操作
        public int AddEntity(BasePersonRelationshipModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertPersonRelationship", entity);
                return id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool DelEntity(int id)
        {
            throw new NotImplementedException();
        }

        public int DeleteMapConfigById(int id)
        {
            int result = mapContext.Delete("DeletePersonRelationshipById", id);

            return result;
        }
        public int UpdateMapConfig(BasePersonRelationshipModel model)
        {

            int result = mapContext.Update("UpdatePersonRelationship", model);
            return result;
        }

        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BasePersonRelationshipModel> GetEntities(BasePersonRelationshipQuery query)
        {
            List<BasePersonRelationshipModel> list = mapContext.QueryForList<BasePersonRelationshipModel>("GetPersonRelationship", query).ToList();
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
        public List<BasePersonRelationshipModel> GetEntities(BasePersonRelationshipQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<BasePersonRelationshipModel> list = mapContext.QueryForList<BasePersonRelationshipModel>("PersonRelationshipPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public BasePersonRelationshipModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, BasePersonRelationshipModel newentity)
        {
            throw new NotImplementedException();
        }
        #endregion
        /// <summary>
        /// 根据人员id获取人员类型
        /// </summary>
        /// <param name="personId"></param>
        /// <returns></returns>
        public List<BasePersonRelationshipModel> GetPersonTypeByPersonId(int personId)
        {
            try
            {
                return mapContext.QueryForList<BasePersonRelationshipModel>("GetPersonTypeByPersonId", personId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据人员id和类型id删除人员类型绑定
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public int DeletePersonRelationshipByPersonIdAndTypeId(BasePersonRelationshipQuery query)
        {
            try
            {
                return mapContext.Delete("DeletePersonRelationshipByPersonIdAndTypeId", query);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
