using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;

namespace CSM.DAL
{
    public class BaseProvinceCityDAL : MapContext, IDataFactory<CSM.Model.BaseProvinceCityModel, BaseProvinceCityQuery>
    {
        public int AddEntity(BaseProvinceCityModel entity)
        {
            int id = (int)mapContext.Insert("InsertProvinceCity", entity);
            return id;
        }

        public bool DelEntity(int id)
        {
            throw new NotImplementedException();
        }
        public int DeleteProvinceCityById(int id)
        {
            int result = mapContext.Delete("DeleteProvinceCityById", id);

            return result;
        }

        public int UpdateProvinceCityById(BaseProvinceCityModel model)
        {

            int result = mapContext.Update("UpdateProvinceCity", model);
            return result;
        }
        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BaseProvinceCityModel> GetEntities(BaseProvinceCityQuery query)
        {
            List<BaseProvinceCityModel> list = mapContext.QueryForList<BaseProvinceCityModel>("GetBaseProvinceCity", query).ToList();
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
        public List<BaseProvinceCityModel> GetEntities(BaseProvinceCityQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<BaseProvinceCityModel> list = mapContext.QueryForList<BaseProvinceCityModel>("ProvinceCityPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public BaseProvinceCityModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, BaseProvinceCityModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}
