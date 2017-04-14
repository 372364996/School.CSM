using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_Student_Info
	public class ServStudentInfoDAL : MapContext, IDataFactory<CSM.Model.ServStudentInfoModel, ServStudentInfoQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServStudentInfoModel entity)  
		{
            try
            {
                int id = (int)mapContext.Insert("InsertStudentInfo", entity);
                return id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
		}
		/// <summary>
		/// 根据personid删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteStudentInfoById(int id)
        {
            try
            {
                int result = mapContext.Delete("DeleteStudentInfoById", id);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateStudentInfoById(ServStudentInfoModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateStudentInfo", model);
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
        public List<ServStudentInfoModel> GetEntities(ServStudentInfoQuery query)
        {
            List<ServStudentInfoModel> list = mapContext.QueryForList<ServStudentInfoModel>("GetStudentInfo", query).ToList();
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
        public List<ServStudentInfoModel> GetEntities(ServStudentInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServStudentInfoModel> list = mapContext.QueryForList<ServStudentInfoModel>("StudentInfoPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServStudentInfoModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServStudentInfoModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据人员id获取学生信息
        /// </summary>
        /// <param name="personId"></param>
        /// <returns></returns>
        public ServStudentInfoModel GetStudentInfoByPersonId(int personId)
        {
            try
            {
                return mapContext.QueryForObject<ServStudentInfoModel>("GetStudentInfoByPersonId", personId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}