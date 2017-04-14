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
	 	//Serv_Video_Info
	public class ServVideoInfoDAL : MapContext, IDataFactory<CSM.Model.ServVideoInfoModel, ServVideoInfoQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServVideoInfoModel entity)  
		{
            try
            {
                int id = (int)mapContext.Insert("InsertVideoInfo", entity);
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
		public int DeleteVideoInfoById(int id)
        {
            int result = mapContext.Delete("DeleteVideoInfoById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateVideoInfoById(ServVideoInfoModel model)
        {

            int result = mapContext.Update("UpdateVideoInfo", model);
            return result;
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
        public List<ServVideoInfoModel> GetEntities(ServVideoInfoQuery query)
        {
            List<ServVideoInfoModel> list = mapContext.QueryForList<ServVideoInfoModel>("GetVideoInfo", query).ToList();
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
        public List<ServVideoInfoModel> GetEntities(ServVideoInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            try
            {
                string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "QueryVideoDownloadCount", query);
                totalNumber = mapContext.QueryForObject<int>("QueryVideoDownloadCount", query);
                List<ServVideoInfoModel> list = mapContext.QueryForList<ServVideoInfoModel>("VideoInfoPage", query).ToList();
                return list;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        /// <summary>
        /// 根据报警ID获取视频下载记录
        /// </summary>
        /// <param name="alarmId"></param>
        /// <returns></returns>
        public List<ServVideoInfoModel> GetVideoInfoByAlarmId(int alarmId)
        {
            try
            {
                return mapContext.QueryForList<ServVideoInfoModel>("GetVideoInfoByAlarmId", alarmId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        public ServVideoInfoModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServVideoInfoModel newentity)
        {
            throw new NotImplementedException();
        }
        public bool AddAllEntity(List<ServVideoInfoModel> model)
        {
            try
            {
                bool result;
                int VideoInfo = (int)mapContext.Insert("BatchAddVideoInfo", model);
                if (VideoInfo > 0)
                {
                    result = true;
                }
                else
                {

                    result = false;
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}