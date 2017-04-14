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
    public class BaseAreaTypeDAL : MapContext, IDataFactory<CSM.Model.BaseAreaTypeModel, BaseAreaTypeQuery>
    {
        /// <summary>
        /// 添加区域类型
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int AddEntity(BaseAreaTypeModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertAreaType", entity);
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
        /// <summary>
        /// 根据id删除区域类型
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteAreaTypeById(BaseAreaTypeModel model)
        {
            try
            {
                
                int num = mapContext.Delete("DeleteAreaTypeById", model);
                return num;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 修改区域类型
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateAreaType(BaseAreaTypeModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateAreaType", model);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BaseAreaTypeModel> GetEntities(BaseAreaTypeQuery query)
        {
            try
            {
                List<BaseAreaTypeModel> list = mapContext.QueryForList<BaseAreaTypeModel>("GetBaseAreaType", query).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="query">查询条件</param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<BaseAreaTypeModel> GetPageBaseAreaLevel(BaseAreaTypeQuery query, out int total)
        {
            try
            {
                total = mapContext.QueryForObject<int>("GetAreaTypeCount", query.industryId);
                List<BaseAreaTypeModel> list = mapContext.QueryForList<BaseAreaTypeModel>("AreaTypePage", query).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<BaseAreaTypeModel> GetEntities(BaseAreaTypeQuery query, int pageSize, int pageNumber, out int totalNumber)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据id获取自定义区域类型
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public BaseAreaTypeModel GetEntity(int id)
        {
            try
            {
                return mapContext.QueryForObject<BaseAreaTypeModel>("GetBaseAreaTypeById", id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取地图右侧区域工具栏
        /// </summary>
        /// <param name="industry_id">行业id</param>
        /// <returns></returns>
        public List<BaseAreaTypeModel> GetAreaTypeTool(int industry_id)
        {
            try
            {
                return mapContext.QueryForList<BaseAreaTypeModel>("GetAreaTypeTool", industry_id).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public bool UpdateEntity(int id, BaseAreaTypeModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}
