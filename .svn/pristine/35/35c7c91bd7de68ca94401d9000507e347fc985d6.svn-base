using CSM.DAL;
using CSM.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL
{
    public  class BaseRegionConfigBLL
    {
        private CSM.DAL.BaseRegionConfigDAL baseRegionConfigDAL = new CSM.DAL.BaseRegionConfigDAL();
        ServRolePurviewDAL servRolePurviewDAL = new ServRolePurviewDAL();
        /// <summary>
        /// 获取全部园区配置
        /// </summary>
        /// <returns></returns>
        public List<BaseRegionConfigModel> GetAllRegionConfig()
        {
            try
            {
                List<BaseRegionConfigModel> list = baseRegionConfigDAL.GetAllRegionConfig();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }
        /// <summary>
        /// 根据园区id获取园区信息
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public BaseRegionConfigModel GetRegionConfigById(int regionId)
        {
            try
            {
                return baseRegionConfigDAL.GetEntity(regionId);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据园区id集合获取园区集合（baseController专用）
        /// </summary>
        /// <param name="rolePruList"></param>
        /// <returns></returns>
        public List<BaseRegionConfigModel> GetRegionConfig(List<ServRolePurviewModel> rolePruList)
        {
            try
            {
                List<BaseRegionConfigModel> regionList = new List<BaseRegionConfigModel>();
                for (int i = 0; i < rolePruList.Count; i++)
                {
                    BaseRegionConfigModel model = GetRegionConfigById(rolePruList[i].region_id);
                    if (model != null)
                    {
                        regionList.Add(model);
                    }
                    else
                    {
                        //删除
                        servRolePurviewDAL.DeleteRolePurviewByRegionId(rolePruList[i].region_id);
                    }
                }
                return regionList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
