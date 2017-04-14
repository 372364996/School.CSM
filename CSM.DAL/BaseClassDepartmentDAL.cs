using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;

namespace CSM.DAL
{
    public class BaseClassDepartmentDAL : MapContext, IDataFactory<CSM.Model.BaseClassDepartmentModel, BaseClassDepartmentQuery>
    {
        public int AddEntity(BaseClassDepartmentModel entity)
        {
            int id = (int)mapContext.Insert("InsertClassDepartment", entity);
            return id;
        }
        public int DeleteClassDepartmentById(int id)
        {
            int result = mapContext.Delete("DeleteClassDepartmentById", id);

            return result;
        }

        public int UpdateClassDepartmentById(BaseClassDepartmentModel model)
        {

            int result = mapContext.Update("UpdateClassDepartmentById", model);
            return result;
        }
        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BaseClassDepartmentModel> GetEntities(BaseClassDepartmentQuery query)
        {
            List<BaseClassDepartmentModel> list = mapContext.QueryForList<BaseClassDepartmentModel>("GetBaseClassDepartment", query).ToList();
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
        public List<BaseClassDepartmentModel> GetEntities(BaseClassDepartmentQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<BaseClassDepartmentModel> list = mapContext.QueryForList<BaseClassDepartmentModel>("ClassDepartmentPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }


        public bool DelEntity(int id)
        {
            throw new NotImplementedException();
        }


        public BaseClassDepartmentModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, BaseClassDepartmentModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}
