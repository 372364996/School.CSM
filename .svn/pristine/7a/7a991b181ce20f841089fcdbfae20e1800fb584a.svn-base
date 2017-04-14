using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
using CSM.Utils;
using IBatisNet.DataMapper;
using IBatisNet.DataMapper.Scope;
using IBatisNet.DataMapper.MappedStatements;

namespace CSM.DAL
{
    public class BaseNewMapConfigDAL : MapContext, IDataFactory<CSM.Model.BaseNewMapConfigModel, CSM.Model.QueryModel.BaseNewMapConfigQuery>
    {
        /// <summary>
        /// 新增地图配置 2017.2.28李昕
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int AddEntity(BaseNewMapConfigModel entity)
        {
            int id = 0;
            try
            {
                id = (int)mapContext.Insert("InsertBaseNewMapConfig", entity);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return id;
        }

        /// <summary>
        /// 删除地图配置
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DelEntity(int id)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        ///
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <returns></returns>
        public BaseNewMapConfigModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <param name="newentity">model</param>
        /// <returns></returns>
        public bool UpdateEntity(int id, BaseNewMapConfigModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 更新地图配置信息
        /// </summary>
        /// <returns></returns>
        public bool UpdateNewMapConfigInfo(BaseNewMapConfigModel baseNewMapConfigModel)
        {
            bool result = false;
            try
            {
                int num = mapContext.Update("UpdateBaseNewMapConfigById", baseNewMapConfigModel);
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
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BaseNewMapConfigModel> GetEntities(BaseNewMapConfigQuery query)
        {
            List<BaseNewMapConfigModel> list = new List<BaseNewMapConfigModel>();
            try
            {
                list = mapContext.QueryForList<BaseNewMapConfigModel>("GetBaseNewMapConfig", query).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
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
        public List<BaseNewMapConfigModel> GetEntities(BaseNewMapConfigQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            throw new NotImplementedException();

        }
        /// <summary>
        /// 按条件查询
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BaseNewMapConfigModel> GetMapConfigByQuery(BaseNewMapConfigQuery query)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据园区id、地图引擎类型、地图类型获取当前地图配置，添加地图引擎的时候后端当前园区是否添加过此配置
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public BaseNewMapConfigModel GetQueryMapConfigByQuery(BaseNewMapConfigQuery query)
        {
            try
            {
                return mapContext.QueryForObject<BaseNewMapConfigModel>("GetQueryNewMapConfig", query);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 根据园区ID获取地图配置 2016.03.01 李昕,点击园区查看详情时候使用
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <returns></returns>
        public List<BaseNewMapConfigModel> GetAllNewMapConfigByRegionID(int regionID)
        {
            List<BaseNewMapConfigModel> modelList = new List<BaseNewMapConfigModel>();
            try
            {
                modelList = mapContext.QueryForList<BaseNewMapConfigModel>("GetAllNewMapConfigByRegionID", regionID).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return modelList;
        }
        /// <summary>
        /// 通过园区id、地图引擎、地图类型删除
        /// </summary>
        /// <param name="query"></param>
        public void deleteNewMapConfig(BaseNewMapConfigQuery query)
        {
            try
            {
                int num = mapContext.Delete("DeleteBaseNewMapConfigByRegionIdEngineType", query);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 通过园区id删除该园区的所有的地图配置
        /// </summary>
        /// <param name="regionId"></param>
        public void deleteNewMapConfigByRegionId(int regionId)
        {
            try
            {
                int num = mapContext.Delete("DeleteBaseNewMapConfigByRegionId", regionId);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

    }
}
