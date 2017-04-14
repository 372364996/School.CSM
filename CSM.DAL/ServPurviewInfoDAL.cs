using CSM.Model.QueryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Utils;

namespace CSM.DAL
{
    public class ServPurviewInfoDAL : MapContext, IDataFactory<CSM.Model.ServPurviewInfoModel, ServPurviewInfoQuery>
    {
        public int AddEntity(ServPurviewInfoModel entity)
        {
            try
            {
                return (int)mapContext.Insert("InsertPuriviewInfo", entity);
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
        
        public List<ServPurviewInfoModel> GetEntities(ServPurviewInfoQuery query)
        {
            try
            {
                return mapContext.QueryForList<ServPurviewInfoModel>("GetPurviewInfo", query).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ServPurviewInfoModel> GetEntities(ServPurviewInfoQuery query, int pageSize, int pageNumber, out int totalNumber)
        {
            throw new NotImplementedException();
        }

        public ServPurviewInfoModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServPurviewInfoModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据权限编码查找权限
        /// </summary>
        /// <param name="purview_code"></param>
        /// <returns></returns>
        public ServPurviewInfoModel GetPurviewByPurviewCode(string purview_code)
        {
            try
            {
                return mapContext.QueryForObject<ServPurviewInfoModel>("GetPurviewByPurviewCode", purview_code);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改权限
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdatePurviewInfo(ServPurviewInfoModel model)
        {
            try
            {
                return mapContext.Update("UpdatePuriviewInfo", model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据id删除权限以及子集权限
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeletePurviewAndChildById(int id)
        {
            try
            {
                return mapContext.Delete("DeletePurviewAndChildById", id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 分页带条件id查询权限
        /// </summary>
        /// <param name="query"></param>
        /// <param name="total"></param>
        /// <returns></returns>
        public List<ServPurviewInfoModel> GetPurviewInfoPageById(ServPurviewInfoQuery query,out int total)
        {
            try
            {
                string sql= IBatisHelper.GetRuntimeSql(this.mapContext, "GetPurviewInfoPageCount", query);
                total = mapContext.QueryForObject<int>("GetPurviewInfoPageCount", query);
                string sql1 = IBatisHelper.GetRuntimeSql(this.mapContext, "GetPurviewInfoPageById", query);
                return mapContext.QueryForList<ServPurviewInfoModel>("GetPurviewInfoPageById", query).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据角色id和园区id获取角色下的权限
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public List<ServPurviewInfoModel> GetPurviewInfoByRoleId(ServRolePurviewQuery query)
        {
            try
            {
                return mapContext.QueryForList<ServPurviewInfoModel>("GetPurviewInfoByRoleId", query).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据角色id获取角色所拥有的园区id
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public List<ServRolePurviewModel> GetRoleRegionIdByRoleId(int roleId)
        {
            try
            {
                return mapContext.QueryForList<ServRolePurviewModel>("GetRegionIdByRoleId", roleId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
