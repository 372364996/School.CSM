using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_Report_Suspect
	public class ServReportSuspectDAL : MapContext, IDataFactory<CSM.Model.ServReportSuspectModel, ServReportSuspectQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServReportSuspectModel entity)  
		{
            int id = (int)mapContext.Insert("InsertReportSuspect", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteReportSuspectById(int id)
        {
            int result = mapContext.Delete("DeleteReportSuspectById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateReportSuspectById(ServReportSuspectModel model)
        {

            int result = mapContext.Update("UpdateReportSuspect", model);
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
        public List<ServReportSuspectModel> GetEntities(ServReportSuspectQuery query)
        {
            List<ServReportSuspectModel> list = mapContext.QueryForList<ServReportSuspectModel>("GetReportSuspect", query).ToList();
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
        public List<ServReportSuspectModel> GetEntities(ServReportSuspectQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServReportSuspectModel> list = mapContext.QueryForList<ServReportSuspectModel>("ReportSuspectPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }


        /// <summary>
        /// 根据嫌疑人姓名分页查询嫌疑人
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<ServReportSuspectModel> GetEntitiesByName(string suspect_name, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServReportSuspectModel> list = mapContext.QueryForList<ServReportSuspectModel>("GetReportSuspectByName", suspect_name).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }



        public ServReportSuspectModel GetEntity(int id)
        {
            ServReportSuspectModel model = new ServReportSuspectModel();
            try
            {
                model = mapContext.QueryForList<ServReportSuspectModel>("GetReportSuspectById", id).FirstOrDefault();
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return model;
        }


        /// <summary>
        /// 根据接处警id获取嫌疑人信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<ServReportSuspectModel> GetEntityByreport_id(int id)
        {


            ///ServReportSuspectModel model = new ServReportSuspectModel();
            try
            {
                return mapContext.QueryForList<ServReportSuspectModel>("GetReportSuspectByreport_id", id).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }

            //return model;

        }
        public bool UpdateEntity(int id, ServReportSuspectModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}