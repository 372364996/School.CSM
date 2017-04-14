using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
using static CSM.Common.EnumClass;

namespace CSM.DAL
{
    //Base_Relay_Config
    public class BaseRelayConfigDAL : MapContext, IDataFactory<CSM.Model.BaseRelayConfigModel, BaseRelayConfigQuery>
    {
        /// <summary>
        /// 增加一条数据
        /// </summary>
        /// <param name="entity"></param>
        public int AddEntity(BaseRelayConfigModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertBaseRelayConfig", entity);
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
        public int DeleteBaseRelayConfigById(int id)
        {
            try
            {
                int result = mapContext.Delete("DeleteBaseRelayConfigById", id);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        /// <summary>
        /// 更新一条数据
        /// </summary>
        /// <param name="model"></param>
        public int UpdateBaseRelayConfigById(BaseRelayConfigModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateBaseRelayConfigById", model);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 通过园区ID删除报警灯配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public int DeleteBaseRelayConfigByRegionId(int regionId)
        {
            try
            {
                int result = mapContext.Delete("DeleteBaseRelayConfigByRegionId", regionId);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据园区ID获取报警灯配置
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public List<BaseRelayConfigModel> GetAlarmLampByRegion(int regionId)
        {
            try
            {
                return mapContext.QueryForList<BaseRelayConfigModel>("GetRelayByRegionId", regionId).ToList();
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
        public List<BaseRelayConfigModel> GetEntities(BaseRelayConfigQuery query)
        {
            try
            {
                List<BaseRelayConfigModel> list = mapContext.QueryForList<BaseRelayConfigModel>("GetBaseRelayConfig", query).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<BaseRelayConfigModel> GetEntities(BaseRelayConfigQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            throw new NotImplementedException();

        }
        /// <summary>
        /// 通过继电器表ID获取配置信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public BaseRelayConfigModel GetEntity(int id)
        {
            try
            {
                return mapContext.QueryForObject<BaseRelayConfigModel>("GetBaseRelayConfigById", id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool UpdateEntity(int id, BaseRelayConfigModel newentity)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 获取四色灯
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BaseRelayConfigModel> GetFourColorLight(BaseRelayConfigQuery query)
        {
            try
            {
                query.relay_type = (int)RelayType.四色灯;
                List<BaseRelayConfigModel> list = mapContext.QueryForList<BaseRelayConfigModel>("GetFourColorLight", query).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


    }
}