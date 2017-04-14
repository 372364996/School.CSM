using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using CSM.Utils;

namespace CSM.DAL
{
    public class BaseRegionConfigDAL : MapContext, IDataFactory<BaseRegionConfigModel, BaseRegionConfigQuery>
    {
        /// <summary>
        /// 添加园区（普通的添加，直接添加园区）
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int AddEntity(BaseRegionConfigModel entity)
        {
            int id = 0;
            try
            {
                id = (int)mapContext.Insert("InsertBaseRegionConfig", entity);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return id;
        }
        public bool DelEntity(int id)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 得到所有的园区的配置，循环显示在前端页面 李昕
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BaseRegionConfigModel> GetEntities(BaseRegionConfigQuery query)
        {
            List<BaseRegionConfigModel> list = new List<BaseRegionConfigModel>();
            try
            {
                list = mapContext.QueryForList<BaseRegionConfigModel>("GetAllBaseRegionConfig", query).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return list;
        }
        /// <summary>
        /// 获取全部已经删除的园区
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BaseRegionConfigModel> GetDeleteRegion(BaseRegionConfigQuery query)
        {
            List<BaseRegionConfigModel> list = new List<BaseRegionConfigModel>();
            try
            {
                list = mapContext.QueryForList<BaseRegionConfigModel>("GetDeleteBaseRegionConfig", query).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return list;
        }
        /// <summary>
        /// 回收已经删除的园区
        /// </summary>
        /// <param name="regionIdArray"></param>
        /// <returns></returns>
        public bool recycleRegion(int regionById)
        {
            bool result = false;
            try
            {
                int num = mapContext.Update("RecyleRegionById", regionById);
                if (num != 0)
                {
                    result = true;
                }
            }
            catch (Exception)
            {

                throw;
            }
            return result;
        }
        /// <summary>
        /// 园区配置与地图配置的联表查询
        /// </summary>
        /// <returns></returns>
        public List<RegionConfigJoinMapConfig> getRegionAndMapConfig()
        {
            List<RegionConfigJoinMapConfig> list = new List<RegionConfigJoinMapConfig>();
            try
            {
                list = mapContext.QueryForList<RegionConfigJoinMapConfig>("RegionConfigJoinMapConfig", null).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return list;
        }
        /// <summary>
        /// 获取全部园区配置
        /// </summary>
        /// <returns></returns>
        public List<BaseRegionConfigModel> GetAllRegionConfig()
        {
            try
            {
                List<BaseRegionConfigModel> list = mapContext.QueryForList<BaseRegionConfigModel>("GetAllBaseRegionConfig", null).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }
        public List<BaseRegionConfigModel> GetEntities(BaseRegionConfigQuery query, int pageSize, int pageNumber, out int totalNumber)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据id获取园区信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public BaseRegionConfigModel GetEntity(int id)
        {
            //throw new NotImplementedException();
            try
            {
                return mapContext.QueryForObject<BaseRegionConfigModel>("GetBaseRegionConfigById", id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool UpdateEntity(int id, BaseRegionConfigModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 更新园区信息
        /// </summary>
        /// <param name="baseRegionConfigModel"></param>
        /// <returns></returns>
        public bool UpdateRegionInfo(BaseRegionConfigModel baseRegionConfigModel)
        {
            bool result = false;
            try
            {
                int num = mapContext.Update("UpdateBaseRegionConfigById", baseRegionConfigModel);
                if (num != 0)
                {
                    result = true;
                }
            }
            catch (Exception)
            {

                throw;
            }
            return result;
        }
        /// <summary>
        /// 更新园区默认地图引擎、地图类型
        /// </summary>
        /// <param name="baseRegionConfigModel"></param>
        /// <returns></returns>
        public bool UpdateRegionEngineAndType(BaseRegionConfigModel baseRegionConfigModel)
        {
            bool result = false;
            try
            {
                int num = mapContext.Update("UpdateRegionEngineAndType", baseRegionConfigModel);
                if (num != 0)
                {
                    result = true;
                }
            }
            catch (Exception)
            {

                throw;
            }
            return result;
        }
        /// <summary>
        /// 根据园区类型获取园区配置
        /// </summary>
        /// <param name="type"></param>
        /// <returns></returns>
        public List<BaseRegionConfigModel> GetBaseRegionConfigByType(int type)
        {
            try
            {
                List<BaseRegionConfigModel> list = mapContext.QueryForList<BaseRegionConfigModel>("GetBaseRegionConfigByRegionType", type).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 查询园区，添加园区时候根据园区的名称和名字对园区进行验证 李昕
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public BaseRegionConfigModel GetQueryRegionConfig(BaseRegionConfigQuery query)
        {
            BaseRegionConfigModel baseRegionConfigModel = new BaseRegionConfigModel();
            try
            {
                string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "GetQueryRegionConfig", query);//获取SQL语句
                baseRegionConfigModel = mapContext.QueryForList<BaseRegionConfigModel>("GetQueryRegionConfig", query).ToList().FirstOrDefault();

            }
            catch (Exception)
            {

                throw;
            }
            return baseRegionConfigModel;
        }
        /// <summary>
        /// 删除园区，软删除
        /// </summary>
        /// <param name="regionID"></param>
        /// <returns></returns>
        public bool DeleteRegionConfig(int regionID)
        {
            bool result = false;
            try
            {

                int num = mapContext.Update("DeleteRegionById", regionID);
                if (num != 0)
                {
                    result = true;
                }
            }
            catch (Exception)
            {

                throw;
            }
            return result;
        }
        /// <summary>
        /// 根据设备ID获取园区信息
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public BaseRegionConfigModel GetRegionConfigInfo(int deviceId)
        {
            BaseRegionConfigModel baseRegionConfigModel = new BaseRegionConfigModel();
            try
            {
                  baseRegionConfigModel = mapContext.QueryForObject<BaseRegionConfigModel>("GetRegionConfigInfo", deviceId);

            }
            catch (Exception)
            {

                throw;
            }
            return baseRegionConfigModel;
        }

        /// <summary>
        /// 分页获取园区
        /// </summary>
        /// <param name="query"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<BaseRegionConfigModel> GetRegionPages(PageModel query, out int totalNumber)
        {
            try
            {
                List<BaseRegionConfigModel> list = mapContext.QueryForList<BaseRegionConfigModel>("GetAllBaseRegionPages", query).ToList();
                totalNumber = mapContext.QueryForObject<int>("GetAllBaseRegionCount", null);
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
