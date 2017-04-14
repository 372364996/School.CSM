using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//工作人员信息表
	public class ServStaffInfoDAL : MapContext, IDataFactory<CSM.Model.ServStaffInfoModel, ServStaffInfoQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServStaffInfoModel entity)  
		{
            try
            {
                int id = (int)mapContext.Insert("InsertStaffInfo", entity);
                return id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteStaffInfoById(int id)
        {
            try
            {
                int result = mapContext.Delete("DeleteStaffInfoById", id);

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
        public int UpdateStaffInfoById(ServStaffInfoModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateStaffInfo", model);
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
        public List<ServStaffInfoModel> GetEntities(ServStaffInfoQuery query)
        {
            List<ServStaffInfoModel> list = mapContext.QueryForList<ServStaffInfoModel>("GetStaffInfo", query).ToList();
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
        public List<ServStaffInfoModel> GetEntities(ServStaffInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServStaffInfoModel> list = mapContext.QueryForList<ServStaffInfoModel>("StaffInfoPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServStaffInfoModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServStaffInfoModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据人员编号查询职工信息
        /// </summary>
        /// <param name="personId"></param>
        /// <returns></returns>
        public ServStaffInfoModel GetStaffInfoByPersonId(int personId)
        {
            try
            {
                return mapContext.QueryForObject<ServStaffInfoModel>("GetStaffInfoByPersonId", personId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}