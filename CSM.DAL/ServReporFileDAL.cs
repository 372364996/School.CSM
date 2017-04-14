using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_Report_File
	public class ServReportFileDAL : MapContext, IDataFactory<CSM.Model.ServReportFileModel, ServReportFileQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServReportFileModel entity)  
		{
            int id = (int)mapContext.Insert("InsertReportFile", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteReportFileById(int id)
        {
            int result = mapContext.Delete("DeleteReportFileById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateReportFileById(ServReportFileModel model)
        {

            int result = mapContext.Update("UpdateReportFile", model);
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
        public List<ServReportFileModel> GetEntities(ServReportFileQuery query)
        {
            List<ServReportFileModel> list = mapContext.QueryForList<ServReportFileModel>("GetReportFile", query).ToList();
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
        public List<ServReportFileModel> GetEntities(ServReportFileQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServReportFileModel> list = mapContext.QueryForList<ServReportFileModel>("ReportFilePage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServReportFileModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据接警report_id获取数据
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<ServReportFileModel> GetEntityByreport_id(int report_id)
        {
            try
            {
                return mapContext.QueryForList<ServReportFileModel>("GetReportFileByreport_id", report_id).ToList();
            }
            catch (Exception)
            {

                throw;
            }
        }
        public bool UpdateEntity(int id, ServReportFileModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}