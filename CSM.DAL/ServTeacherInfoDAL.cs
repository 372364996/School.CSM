using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_Teacher_Info
	public class ServTeacherInfoDAL : MapContext, IDataFactory<CSM.Model.ServTeacherInfoModel, ServTeacherInfoQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServTeacherInfoModel entity)  
		{
            try
            {
                int id = (int)mapContext.Insert("InsertTeacherInfo", entity);
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
		public int DeleteTeacherInfoById(int id)
        {
            try
            {
                int result = mapContext.Delete("DeleteTeacherInfoById", id);

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
        public int UpdateTeacherInfoById(ServTeacherInfoModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateTeacherInfo", model);
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
        public List<ServTeacherInfoModel> GetEntities(ServTeacherInfoQuery query)
        {
            List<ServTeacherInfoModel> list = mapContext.QueryForList<ServTeacherInfoModel>("GetTeacherInfo", query).ToList();
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
        public List<ServTeacherInfoModel> GetEntities(ServTeacherInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServTeacherInfoModel> list = mapContext.QueryForList<ServTeacherInfoModel>("TeacherInfoPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServTeacherInfoModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServTeacherInfoModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据人员编号获取教师信息
        /// </summary>
        /// <param name="personId"></param>
        /// <returns></returns>
        public ServTeacherInfoModel GetTeacherInfoByPersonId(int personId)
        {
            try
            {
                return mapContext.QueryForObject<ServTeacherInfoModel>("GetTeacherInfoByPersonId", personId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}