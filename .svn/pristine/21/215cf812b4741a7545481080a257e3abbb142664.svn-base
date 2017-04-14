using CSM.Model.QueryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;

namespace CSM.DAL
{
    public class ServRoleInfoDAL : MapContext, IDataFactory<CSM.Model.ServRoleInfoModel, ServRoleInfoQuery>
    {
        public int AddEntity(ServRoleInfoModel entity)
        {
            try
            {
                return (int)mapContext.Insert("InsertRoleInfo", entity);
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

        public List<ServRoleInfoModel> GetEntities(ServRoleInfoQuery query)
        {
            throw new NotImplementedException();
        }

        public List<ServRoleInfoModel> GetEntities(ServRoleInfoQuery query, int pageSize, int pageNumber, out int totalNumber)
        {
            throw new NotImplementedException();
        }

        public ServRoleInfoModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServRoleInfoModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 按条件分页查询角色
        /// </summary>
        /// <param name="query"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        public List<ServRoleInfoModel> GetRoleInfoPage(ServRoleInfoQuery query,out int total)
        {
            try
            {
                string sql1 = CSM.Utils.IBatisHelper.GetRuntimeSql(this.mapContext, "GetRoleInfoPageCount", query);
                total = mapContext.QueryForObject<int>("GetRoleInfoPageCount", query);
                string sql = CSM.Utils.IBatisHelper.GetRuntimeSql(this.mapContext, "GetRoleInfoPage", query);
                return mapContext.QueryForList<ServRoleInfoModel>("GetRoleInfoPage", query).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据id修改角色
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateRoleInfoById(ServRoleInfoModel model)
        {
            try
            {
                return mapContext.Update("UpdateRoleInfo", model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据id删除角色
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteRoleInfoById(int id)
        {
            try
            {
                return mapContext.Delete("DeleteRoleInfo", id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取所有的角色
        /// </summary>
        /// <returns></returns>
        public List<ServRoleInfoModel> GetRoleInfo()
        {
            try
            {
                return mapContext.QueryForList<ServRoleInfoModel>("GetRoleInfo", 0).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
