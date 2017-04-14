using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;

namespace CSM.DAL
{
    public class ServAbsenceInfoDAL : MapContext, IDataFactory<CSM.Model.ServAbsenceInfoModel, ServAbsenceInfoQuery>
    {
        public int AddEntity(ServAbsenceInfoModel entity)
        {
            int id = (int)mapContext.Insert("InsertAbsenceInfo", entity);
            return id;
        }

        public bool DelEntity(int id)
        {
            throw new NotImplementedException();
        }
        public int DeleteAbsenceInfoById(int id)
        {
            int result = mapContext.Delete("DeleteAbsenceInfoById", id);

            return result;
        }

        public int UpdateAbsenceInfoById(ServAbsenceInfoModel model)
        {

            int result = mapContext.Update("UpdateAbsenceInfo", model);
            return result;
        }
        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServAbsenceInfoModel> GetEntities(ServAbsenceInfoQuery query)
        {
            List<ServAbsenceInfoModel> list = mapContext.QueryForList<ServAbsenceInfoModel>("GetServAbsenceInfo", query).ToList();
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
        public List<ServAbsenceInfoModel> GetEntities(ServAbsenceInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServAbsenceInfoModel> list = mapContext.QueryForList<ServAbsenceInfoModel>("AbsenceInfoPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServAbsenceInfoModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServAbsenceInfoModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}
