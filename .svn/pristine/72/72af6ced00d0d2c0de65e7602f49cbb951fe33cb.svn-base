using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;

namespace CSM.DAL
{
    public class BaseCarAlarmTypeDAL : MapContext, IDataFactory<BaseCarAlarmTypeModel, BaseCarAlarmTypeQuery>
    {
        public int AddEntity(BaseCarAlarmTypeModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertCarAlarmType", entity);
                return id;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public int DeleteCarAlarmTypeById(int id)
        {
            try
            {
                int result = mapContext.Delete("DeleteCarAlarmTypeById", id);
                return result;
            }
             catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateCarAlarmTypeById(BaseCarAlarmTypeModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateCarAreaType", model);
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
        public List<BaseCarAlarmTypeModel> GetEntities(BaseCarAlarmTypeQuery query)
        {
            try
            {
                List<BaseCarAlarmTypeModel> list = mapContext.QueryForList<BaseCarAlarmTypeModel>("GetBaseCarAlarmType", query).ToList();
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
        public List<BaseCarAlarmTypeModel> GetEntities(BaseCarAlarmTypeQuery query,  int pageNumber, int pageSize, out int totalNumber)
        {
            try
            {
                PageModel model = new PageModel();
                model.pageIndex = pageNumber;
                model.pageSize = pageSize;
                List<BaseCarAlarmTypeModel> list = mapContext.QueryForList<BaseCarAlarmTypeModel>("CarAlarmTypePage", model).ToList();
                totalNumber = list.Count();
                return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();
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

        public BaseCarAlarmTypeModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, BaseCarAlarmTypeModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}
