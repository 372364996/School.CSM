using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using CSM.DAL;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL
{
    public class BaseRegionExtendConfigBLL
    {
        /// <summary>
        /// 根据园区ID和配置类型获取配置列表
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public List<BaseRegionExtendConfigModel> GetRegionExtendConfigByRegionIdAndType(int regionId, int type)
        {
            try
            {
                BaseRegionExtendConfigDAL regionExtendConfigDal = new BaseRegionExtendConfigDAL();
                BaseRegionExtendConfigQuery query = new BaseRegionExtendConfigQuery();
                query.config_type = type;
                query.region_id = regionId;
                List<BaseRegionExtendConfigModel> regionExtendConfig = regionExtendConfigDal.GetRegionExtendConfigByRegionIdAndConfigType(query);
                return regionExtendConfig;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据园区ID和配置类型获取当前第一条配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="type"></param>
        /// <returns></returns>
        public BaseRegionExtendConfigModel GetFirstRegionExtendConfigByRegionIdAndType(int regionId, int type)
        {
            try
            {
                BaseRegionExtendConfigDAL regionExtendConfigDal = new BaseRegionExtendConfigDAL();
                BaseRegionExtendConfigQuery query = new BaseRegionExtendConfigQuery();
                query.config_type = type;
                query.region_id = regionId;
                BaseRegionExtendConfigModel regionExtendConfig = regionExtendConfigDal.GetRegionExtendConfigByRegionIdAndConfigType(query).FirstOrDefault();
                return regionExtendConfig;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
