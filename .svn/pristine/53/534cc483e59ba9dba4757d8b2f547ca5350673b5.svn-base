using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
using CSM.Utils;

namespace CSM.DAL
{
    //Base_Industry
    public class BaseIndustryDAL : MapContext, IDataFactory<CSM.Model.BaseIndustryModel, BaseIndustryQuery>
    {
        /// <summary>
        /// 增加一条数据
        /// </summary>
        /// <param name="entity"></param>
        public int AddEntity(BaseIndustryModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertBaseIndustry", entity);
                return id;
            }
            catch (Exception)
            {

                throw;
            }
        }
        /// <summary>
        /// 根据ID获取行业配置
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <returns></returns>
        public BaseIndustryModel GetEntity(int id)
        {
            try
            {
                BaseIndustryModel industrymodel = mapContext.QueryForList<BaseIndustryModel>("GetBaseIndustryById", id).FirstOrDefault();
                return industrymodel;
            }
            catch (Exception)
            {

                throw;
            }
            
        }
        /// <summary>
        /// 更新行业配置
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <param name="newentity"></param>
        /// <returns></returns>
        public bool UpdateEntity(int id, BaseIndustryModel newentity)
        {
            try
            {
                bool result = false;
                int num = mapContext.Update("UpdateBaseIndustry", newentity);
                if (num != 0)
                {
                    result = true;
                }
                return result;
            }
            catch (Exception)
            {

                throw;
            }
            
        }
        /// <summary>
        /// 修改行业配置
        /// </summary>
        /// <param name="newentity"></param>
        /// <returns></returns>
        public int UpdateEntity(BaseIndustryModel newentity)
        {
            try
            {
                int num = mapContext.Update("UpdateBaseIndustry", newentity);
                return num;
            }
            catch (Exception)
            {

                throw;
            }
        }
        /// <summary>
        /// 删除行业配置
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <returns></returns>
        public bool DelEntity(int id)
        {
            try
            {
                bool result = false;
                int num = mapContext.Delete("DeleteBaseIndustryById", id);
                if (num != 0)
                {
                    result = true;
                }
                return result;
            }
            catch (Exception)
            {

                throw;
            }
            
        }
        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BaseIndustryModel> GetEntities(BaseIndustryQuery query)
        {
            try
            {
                List<BaseIndustryModel> list = mapContext.QueryForList<BaseIndustryModel>("GetBaseIndustry", query).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
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
        public List<BaseIndustryModel> GetEntities(BaseIndustryQuery query, int startnum, int endnum, out int totalNumber)
        {
            try
            {
                //string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "BaseIndustryCount", query);//获取SQL语句
                totalNumber = mapContext.QueryForObject<int>("BaseIndustryCount",query);
                query.startNum = startnum;
                query.endNum = endnum;
                List<BaseIndustryModel> list = mapContext.QueryForList<BaseIndustryModel>("BaseIndustryPage", query).ToList();
                return list;
            }
            catch (Exception)
            {

                throw;
            }
            
        }

    }
}