using CSM.Model.QueryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.CustomModel;

namespace CSM.DAL
{
    public class ServRolePurviewDAL : MapContext, IDataFactory<CSM.Model.ServRolePurviewModel, ServRolePurviewQuery>
    {
        public int AddEntity(ServRolePurviewModel entity)
        {
            try
            {
                return (int)mapContext.Insert("InsertRolePuriview", entity);
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

        public List<ServRolePurviewModel> GetEntities(ServRolePurviewQuery query)
        {
            throw new NotImplementedException();
        }

        public List<ServRolePurviewModel> GetEntities(ServRolePurviewQuery query, int pageSize, int pageNumber, out int totalNumber)
        {
            throw new NotImplementedException();
        }

        public ServRolePurviewModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServRolePurviewModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据角色id删除角色权限绑定
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public int DeleteRolePurviewByRoleId(int roleId)
        {
            try
            {
                return mapContext.Delete("DeleteRolePurviewByRoleId", roleId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据角色id查询角色权限绑定
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public List<ServRolePurviewModel> GetRolePurviewByRoleId(int roleId)
        {
            try
            {
                return mapContext.QueryForList<ServRolePurviewModel>("GetRolePurviewByRoleId", roleId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据角色id和权限id获取角色权限绑定
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public ServRolePurviewModel GetRolePurviewByRoleIdAndPurviewId(ServRolePurviewModel query)
        {
            try
            {
                return mapContext.QueryForObject<ServRolePurviewModel>("GetRolePurviewByRoleIdAndPurviewId", query);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据角色id和权限id删除角色权限绑定
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public int DeleteRolePurviewByRoleIdAndPurviewId(ServRolePurviewModel query)
        {
            try
            {
                return mapContext.Delete("DeleteRolePurviewByRoleIdAndPurviewId", query);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据角色ID和园区ID获取权限（封传波）
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServRolePurviewModel> GetRolePurviewByRoleIdAndRegionId(ServRolePurviewQuery query)
        {
            try
            {
                return mapContext.QueryForList<ServRolePurviewModel>("GetRolePurviewByRoleIdAndRegionId", query).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 根据园区id删除园区的角色权限
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public int DeleteRolePurviewByRegionId(int regionId)
        {
            try
            {
                return mapContext.Delete("DeleteRolePurviewByRegionId", regionId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
