using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;

namespace CSM.DAL
{
    public class BaseRegionExtendConfigDAL : MapContext, IDataFactory<BaseRegionExtendConfigModel, BaseRegionExtendConfigQuery>
    {
        /// <summary>
        /// 新增园区扩展配置
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int AddEntity(BaseRegionExtendConfigModel entity)
        {
            try
            {
                return (int)mapContext.Insert("InsertBaseRegionExtendConfig", entity);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改园区扩展配置
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int UpdateEntity(BaseRegionExtendConfigModel entity)
        {
            try
            {
                return mapContext.Update("UpdateBaseRegionExtendConfig", entity);
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

        public List<BaseRegionExtendConfigModel> GetEntities(BaseRegionExtendConfigQuery query)
        {
            throw new NotImplementedException();
        }

        public List<BaseRegionExtendConfigModel> GetEntities(BaseRegionExtendConfigQuery query, int pageSize, int pageNumber, out int totalNumber)
        {
            throw new NotImplementedException();
        }

        public BaseRegionExtendConfigModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, BaseRegionExtendConfigModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据园区ID和配置类型获取配置信息
        /// </summary>
        /// <returns></returns>
        public List<BaseRegionExtendConfigModel> GetRegionExtendConfigByRegionIdAndConfigType(BaseRegionExtendConfigQuery query)
        {
            try
            {
                List<BaseRegionExtendConfigModel> list = mapContext.QueryForList<BaseRegionExtendConfigModel>("GetRegionExtendConfigByRegionIdAndConfigType", query).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据园区id和配置类型修改园区扩展配置
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int UpdateRegionExtendConfigByRegionIdAndConfigType(BaseRegionExtendConfigModel model)
        {
            try
            {
                return mapContext.Update("UpdateBaseRegionExtendConfigByRegionIdAndConfigType", model);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
      
    }
}
