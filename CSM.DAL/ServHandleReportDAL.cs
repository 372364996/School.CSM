using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_Handle_Report
	public class ServHandleReportDAL : MapContext, IDataFactory<CSM.Model.ServHandleReportModel, ServHandleReportQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServHandleReportModel entity)  
		{
            int id = (int)mapContext.Insert("InsertHandleReport", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteHandleById(int id)
        {
            int result = mapContext.Delete("DeleteHandleReportById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateHandleReportById(ServHandleReportModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateHandleReport", model);
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
        public List<ServHandleReportModel> GetEntities(ServHandleReportQuery query)
        {
            List<ServHandleReportModel> list = mapContext.QueryForList<ServHandleReportModel>("GetHandleReport", query).ToList();
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
        public List<ServHandleReportModel> GetEntities(ServHandleReportQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServHandleReportModel> list = mapContext.QueryForList<ServHandleReportModel>("HandleReportPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServHandleReportModel GetEntity(int id)
        {
            ServHandleReportModel model = new ServHandleReportModel();
            try
            {
                model = mapContext.QueryForList<ServHandleReportModel>("GetHandleReportById", id).FirstOrDefault();
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return model;
        }




        /// <summary>
        /// 根据接警id获取处警信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<ServHandleReportModel> GetEntitiesByreport_id(int report_id)
        {
            try
            {
                return mapContext.QueryForList<ServHandleReportModel>("GetHandleReportByreport_id", report_id).ToList();

            }
            catch(Exception)
            {
                throw;

            }
        }


        public bool UpdateEntity(int id, ServHandleReportModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}