using CSM.Model;
using CSM.Model.QueryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.DAL
{
    public class ServOrganizationChartDAL : MapContext, IDataFactory<CSM.Model.ServOrganizationChartModel, ServOrganizationChartModel>
    {
        /// <summary>
        /// 添加一条数据
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int AddEntity(ServOrganizationChartModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertOrganizationChart", entity);
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

        public List<ServOrganizationChartModel> GetEntities(ServOrganizationChartModel query)
        {
            throw new NotImplementedException();
        }

        public List<ServOrganizationChartModel> GetEntities(ServOrganizationChartModel query, int pageSize, int pageNumber, out int totalNumber)
        {
            throw new NotImplementedException();
        }

        public ServOrganizationChartModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServOrganizationChartModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 获取gojs关联关系
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServOrganizationChartModel> GetOrganizationChar(ServOrganizationChartQuery query)
        {
            try
            {
                return mapContext.QueryForList<ServOrganizationChartModel>("GetOrganizitionChart", query).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据child_node递归获取gojs数据
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServOrganizationChartModel> GetOrganizationCharByChildNode(ServOrganizationChartQuery query)
        {
            try
            {
                return mapContext.QueryForList<ServOrganizationChartModel>("GetOrganizationCharByChildNode", query).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据child_node修改gojs表内容
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateOrgChartByChildNode(ServOrganizationChartModel model)
        {
            try
            {
                return mapContext.Update("UpdateOrgChartByChildNode", model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据child_node删除gojs表
        /// </summary>
        /// <param name="childNode"></param>
        /// <returns></returns>
        public int DeleteOrgChartByChildNode(string childNode)
        {
            try
            {
                return mapContext.Delete("DeleteOrgChartByChildNode", childNode);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
