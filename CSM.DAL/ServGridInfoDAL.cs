using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;

namespace CSM.DAL
{
    public class ServGridInfoDAL : MapContext, IDataFactory<CSM.Model.ServGridInfoModel, ServGridInfoQuery>
    {
        public int AddEntity(ServGridInfoModel entity)
        {
            int id = (int)mapContext.Insert("InsertGridInfo", entity);
            return id;
        }

        public int DeleteGridInfoById(int id)
        {
            int result = mapContext.Delete("DeleteGridInfoById", id);

            return result;
        }

        public int UpdateGridInfoById(ServGridInfoModel model)
        {

            int result = mapContext.Update("UpdateGridInfo", model);
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
        public List<ServGridInfoModel> GetEntities(ServGridInfoQuery query)
        {
            List<ServGridInfoModel> list = mapContext.QueryForList<ServGridInfoModel>("GeGridInfo", query).ToList();
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
        public List<ServGridInfoModel> GetEntities(ServGridInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServGridInfoModel> list = mapContext.QueryForList<ServGridInfoModel>("GridInfoPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServGridInfoModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServGridInfoModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}
