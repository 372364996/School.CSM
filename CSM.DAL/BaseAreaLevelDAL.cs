using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;

namespace CSM.DAL
{
    public class BaseAreaLevelDAL : MapContext, IDataFactory<CSM.Model.BaseAreaLevelModel, BaseAreaLevelQuery>
    {
        public int AddEntity(BaseAreaLevelModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertAreaLevel", entity);
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
        public int DelAreaLevelById(int id)
        {
            try
            {

                int result = mapContext.Delete("DeleteAreaLevelById", id);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateAreaLevelById(BaseAreaLevelModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateAreaLevel", model);
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
        public List<BaseAreaLevelModel> GetEntities(BaseAreaLevelQuery query)
        {
            try
            {
                List<BaseAreaLevelModel> list = mapContext.QueryForList<BaseAreaLevelModel>("GetBaseAreaLevel", query).ToList();
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
        /// <param name="query"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<BaseAreaLevelModel> GetPageBaseAreaLevel(BaseAreaLevelQuery query,int pageNumber, int pageSize, out int totalNumber)
        {
            try
            {
                PageModel model = new PageModel();
                model.pageIndex = pageNumber;
                model.pageSize = pageSize;
                List<BaseAreaLevelModel> list = mapContext.QueryForList<BaseAreaLevelModel>("AreaLevelPage", model).ToList();
                totalNumber = list.Count();
                return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        public BaseAreaLevelModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, BaseAreaLevelModel newentity)
        {
            throw new NotImplementedException();
        }

        public List<BaseAreaLevelModel> GetEntities(BaseAreaLevelQuery query, int pageSize, int pageNumber, out int totalNumber)
        {
            throw new NotImplementedException();
        }
    }
}
