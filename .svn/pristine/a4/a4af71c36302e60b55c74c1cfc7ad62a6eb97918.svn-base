using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//接警信息表
	public class ServReportInfoDAL : MapContext, IDataFactory<CSM.Model.ServReportInfoModel, ServReportInfoQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServReportInfoModel entity)  
		{
            int id = (int)mapContext.Insert("InsertReportInfo", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteReportInfoById(int id)
        {
            int result = mapContext.Delete("DeleteReportInfoById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateReportInfoById(ServReportInfoModel model)
        {

            int result = mapContext.Update("UpdateReportInfo", model);
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
        public List<ServReportInfoModel> GetEntities(ServReportInfoQuery query)
        {
            List<ServReportInfoModel> list = mapContext.QueryForList<ServReportInfoModel>("GetReportInfo", query).ToList();
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
        public List<ServReportInfoModel> GetEntities(ServReportInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServReportInfoModel> list = mapContext.QueryForList<ServReportInfoModel>("GetReportInfo", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }


        /// <summary>
        /// 条件分页查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageSize">每页条数</param>
        /// <param name="pageNumber">页数</param>
        /// <param name="totalNumber">总数</param>
        /// <returns></returns>
        public List<Model.ServReportInfoModel> GetSearchReportInfo(ServReportInfoQuery query, int pageSize, int pageNumber, out int totalNumber)
        {

            try
            {
                //string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "DevicePlanCount", query);
                totalNumber = mapContext.QueryForObject<int>("ReportInfoCount", query);
                query.pageSize = pageSize;
                query.pageNumber = pageNumber;
                string sql =CSM.Utils.IBatisHelper.GetRuntimeSql(this.mapContext, "SearchReportInfoPage", query);
                List<Model.ServReportInfoModel> list = mapContext.QueryForList<Model.ServReportInfoModel>("SearchReportInfoPage", query).ToList();
                return list;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public ServReportInfoModel GetEntity(int id)
        {

            ServReportInfoModel model = new ServReportInfoModel();
            try
            {
                model = mapContext.QueryForList<ServReportInfoModel>("GetReportInfoById", id).FirstOrDefault();
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return model;
        }

        public bool UpdateEntity(int id, ServReportInfoModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}