using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//人员基础信息表
	public class ServPersonInfoDAL : MapContext, IDataFactory<CSM.Model.ServPersonInfoModel, ServPersonInfoQuery>
	{
        #region 基础增删改查
        /// <summary>
        /// 增加一条数据
        /// </summary>
        /// <param name="entity"></param>
        public int AddEntity(ServPersonInfoModel entity)  
		{
            try
            {
                int id = (int)mapContext.Insert("InsertPersonInfo", entity);
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
		public int DeletePersonInfoById(int id)
        {
            int result = mapContext.Delete("DeletePersonInfoById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdatePersonInfoById(ServPersonInfoModel model)
        {
            try
            {
                int result = mapContext.Update("UpdatePersonInfo", model);
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
        public List<ServPersonInfoModel> GetEntities(ServPersonInfoQuery query)
        {
            List<ServPersonInfoModel> list = mapContext.QueryForList<ServPersonInfoModel>("GetPersonInfo", query).ToList();
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
        public List<ServPersonInfoModel> GetEntities(ServPersonInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServPersonInfoModel> list = mapContext.QueryForList<ServPersonInfoModel>("PersonInfoPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServPersonInfoModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServPersonInfoModel newentity)
        {
            throw new NotImplementedException();
        }
        #endregion

        /// <summary>
        /// 根据ssoId获取人员信息
        /// </summary>
        /// <param name="ssoId"></param>
        /// <returns></returns>
        public ServPersonInfoModel GetPersonInfoBySSOId(int ssoId)
        {
            try
            {
                return mapContext.QueryForObject<ServPersonInfoModel>("GetPersonInfoBySSOId", ssoId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据人员编号修改人员角色
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdatePersonRoleByPersonId(ServPersonInfoModel model)
        {
            try
            {
                return mapContext.Update("UpdatePersonRoleByPersonId", model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据名称获取id
        /// </summary>
        /// <param name="personName"></param>
        /// <returns></returns>
        public ServPersonInfoModel GetPersonInfoId(string personName)
        {
            try
            {
                return mapContext.QueryForObject<ServPersonInfoModel>("GetPersonInfoId", personName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据角色id将人员绑定的角色id修改为0（删除角色时使用）
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public int UpdatePersonRoleByRoleId(int roleId)
        {
            try
            {
                return mapContext.Update("UpdatePersonRoleByRoleId", roleId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}