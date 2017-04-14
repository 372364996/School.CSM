using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
    //Base_Car_Type
    public class BaseCarTypeDAL : MapContext, IDataFactory<CSM.Model.BaseCarTypeModel, BaseCarTypeQuery>
    {
        /// <summary>
        /// 增加一条数据
        /// </summary>
        /// <param name="entity"></param>
        public int AddEntity(BaseCarTypeModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertCarType", entity);
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
        public int DeleteBaseCarTypeById(int id)
        {
            try
            {
                int result = mapContext.Delete("DeleteCarTypeById", id);
                return result;
            }
             catch (Exception ex)
            {
                throw ex;
            }
        }


        /// <summary>
        /// 更新一条数据
        /// </summary>
        /// <param name="model"></param>
        public int UpdateBaseCarTypeById(BaseCarTypeModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateCarType", model);
                return result;
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
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BaseCarTypeModel> GetEntities(BaseCarTypeQuery query)
        {
            try
            {
                List<BaseCarTypeModel> list = mapContext.QueryForList<BaseCarTypeModel>("GetCarType", query).ToList();
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
        public List<BaseCarTypeModel> GetEntities(BaseCarTypeQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            try
            {
                PageModel model = new PageModel();
                model.pageIndex = pageNumber;
                model.pageSize = pageSize;
                List<BaseCarTypeModel> list = mapContext.QueryForList<BaseCarTypeModel>("CarTypePage", model).ToList();
                totalNumber = list.Count();
                return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }



        }

        public BaseCarTypeModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, BaseCarTypeModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}