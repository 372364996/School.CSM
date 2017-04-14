using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;

namespace CSM.DAL
{
    public class BaseReportTypeDAL : MapContext, IDataFactory<CSM.Model.BaseReportTypeModel, BaseReportTypeQuery>
    {
        public int AddEntity(BaseReportTypeModel entity)
        {
            int id = (int)mapContext.Insert("InsertReportType", entity);
            return id;
        }

        public bool DelEntity(int id)
        {
            throw new NotImplementedException();
        }
        public int DeleteReportTypeById(int id)
        {
            int result = mapContext.Delete("DeleteReportTypeById", id);

            return result;
        }

        public int UpdateReportTypeById(BaseReportTypeModel model)
        {

            int result = mapContext.Update("UpdateReportType", model);
            return result;
        }
        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BaseReportTypeModel> GetEntities(BaseReportTypeQuery query)
        {
            List<BaseReportTypeModel> list = mapContext.QueryForList<BaseReportTypeModel>("GetBaseReportType", query).ToList();
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
        public List<BaseReportTypeModel> GetEntities(BaseReportTypeQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<BaseReportTypeModel> list = mapContext.QueryForList<BaseReportTypeModel>("ReportTypePage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        /// <summary>
        /// 根据id 获取名称
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public BaseReportTypeModel GetEntity(int id)
        {
            try
            {
                BaseReportTypeModel ReportTypInfo = mapContext.QueryForObject<BaseReportTypeModel>("GetBaseReportTypeById", id);
                return ReportTypInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


             /// <summary>
             /// 根据名称获取id
             /// </summary>
             /// <param name="name"></param>
             /// <returns></returns>
        public BaseReportTypeModel GetArchiveTypeInfo(string name)
        {
            try
            {
                BaseReportTypeModel ReportTypInfo = mapContext.QueryForObject<BaseReportTypeModel>("GetArchiveTypeInfo", name);
                return ReportTypInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool UpdateEntity(int id, BaseReportTypeModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}
