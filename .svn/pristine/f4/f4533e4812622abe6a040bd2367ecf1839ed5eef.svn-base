using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;

namespace CSM.DAL
{
    public class BaseOrganizitionInfoDAL : MapContext, IDataFactory<CSM.Model.BaseOrganizitionInfoModel, BaseOrganizitionInfoQuery>
    {
        public int AddEntity(BaseOrganizitionInfoModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertOrganizitionInfo", entity);
                return id;
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
        public int DeleteOrganizitionInfoById(int id)
        {
            int result = mapContext.Delete("DeleteOrganizitionInfoById", id);

            return result;
        }

        public int UpdateOrganizitionInfoById(BaseAreaLevelModel model)
        {

            int result = mapContext.Update("UpdateOrganizitionInfoById", model);
            return result;
        }
        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BaseOrganizitionInfoModel> GetEntities(BaseOrganizitionInfoQuery query)
        {
            List<BaseOrganizitionInfoModel> list = mapContext.QueryForList<BaseOrganizitionInfoModel>("GetBaseOrganizitionInfo", query).ToList();
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
        public List<BaseOrganizitionInfoModel> GetEntities(BaseOrganizitionInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<BaseOrganizitionInfoModel> list = mapContext.QueryForList<BaseOrganizitionInfoModel>("OrganizitionInfoPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public BaseOrganizitionInfoModel GetEntity(int id)
        {
            try
            {
                return mapContext.QueryForObject<BaseOrganizitionInfoModel>("GetBaseOrganizitionInfoById", id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool UpdateEntity(int id, BaseOrganizitionInfoModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据园区id和组织类型获取组织架构
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BaseOrganizitionInfoModel> GetOrganizationByOrgTypeAndRegionId(BaseOrganizitionInfoQuery query)
        {
            try
            {
                return mapContext.QueryForList<BaseOrganizitionInfoModel>("GetOrganizationByOrgTypeAndRegionId", query).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 修改组织架构名称和编码
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateOrganizationName(BaseOrganizitionInfoModel model)
        {
            try
            {
                return mapContext.Update("UpdateOrganizationName", model);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据id删除组织架构以及组织架构子集
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteOrganizationAndChildById(int id)
        {
            try
            {
                return mapContext.Delete("DeleteOrganizationAndChildById", id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
