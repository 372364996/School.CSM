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
    public class BaseMapConfigDAL : MapContext, IDataFactory<CSM.Model.BaseMapConfigModel, CSM.Model.QueryModel.BaseMapConfigQuery>
    {
        /// <summary>
        /// 新增地图配置 2016.12.01 张丰刚
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int AddEntity(BaseMapConfigModel entity)
        {
            int id = 0;
            try
            {
                id = (int)mapContext.Insert("InsertMapConfig", entity);
            }
            catch (Exception ex)
            {

                throw ex;
            }
            return id;
        }
        /// <summary>
        /// 删除地图配置 2016.12.01 张丰刚
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DelEntity(int id)
        {
            bool result = false;
            try
            {
                int num = mapContext.Delete("DeleteMapConfigById", id);
                if (num != 0)
                {
                    result = true;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return result;
        }
        /// <summary>
        /// 根据ID获取地图配置 2016.12.01 张丰刚
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <returns></returns>
        public BaseMapConfigModel GetEntity(int id)
        {
            BaseMapConfigModel model = new BaseMapConfigModel();
            try
            {
                model = mapContext.QueryForList<BaseMapConfigModel>("GetMapConfigById", id).FirstOrDefault();
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return model;
        }
        /// <summary>
        /// 修改地图配置 2016.12.01 张丰刚
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <param name="newentity">model</param>
        /// <returns></returns>
        public bool UpdateEntity(int id, BaseMapConfigModel newentity)
        {
            bool result = false;
            try
            {
                int num = mapContext.Update("UpdateMapConfig", newentity);
                if (num != 0)
                {
                    result = true;
                }
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return result;
        }

        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BaseMapConfigModel> GetEntities(BaseMapConfigQuery query)
        {
            List<BaseMapConfigModel> list = new List<BaseMapConfigModel>();
            try
            {
                list = mapContext.QueryForList<BaseMapConfigModel>("GetMapConfig", query).ToList();
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
        public List<BaseMapConfigModel> GetEntities(BaseMapConfigQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<BaseMapConfigModel> list = new List<BaseMapConfigModel>();
            try
            {
                list = mapContext.QueryForList<BaseMapConfigModel>("MapConfigPage", model).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }
        /// <summary>
        /// 按条件查询
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BaseMapConfigModel> GetMapConfigByQuery(BaseMapConfigQuery query)
        {
            List<BaseMapConfigModel> list = new List<BaseMapConfigModel>();
            try
            {
                string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "GetQueryMapConfig", query);//获取SQL语句
                list = mapContext.QueryForList<BaseMapConfigModel>("GetQueryMapConfig", query).ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }

            return list;
        }
        /// <summary>
        /// 获取当前地图配置
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public BaseMapConfigModel GetNowMapConfigByQuery(BaseMapConfigQuery query)
        {
            try
            {
                return mapContext.QueryForObject<BaseMapConfigModel>("GetNowMapConfig", query);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

    }
}
