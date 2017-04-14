using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_SMS_Record
	public class ServSMSRecordDAL : MapContext, IDataFactory<CSM.Model.ServSMSRecordModel, ServSMSRecordQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServSMSRecordModel entity)  
		{
            int id = (int)mapContext.Insert("InsertSMSRecord", entity);
            return id;
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteSMSRecordById(int id)
        {
            int result = mapContext.Delete("DeleteSMSRecordById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateSMSRecordById(ServSMSRecordModel model)
        {

            int result = mapContext.Update("UpdateSMSRecordById", model);
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
        public List<ServSMSRecordModel> GetEntities(ServSMSRecordQuery query)
        {
            List<ServSMSRecordModel> list = mapContext.QueryForList<ServSMSRecordModel>("GetSMSRecord", query).ToList();
            return list;
        }
        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageSize">当前页数</param>
        /// <param name="pageNumber">每页显示行数</param>
        /// <param name="totalNumber">总数</param>
        /// <returns></returns>
        public List<ServSMSRecordModel> GetEntities(ServSMSRecordQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            try
            {
                //string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "DevicePlanCount", query);
                totalNumber = mapContext.QueryForObject<int>("SMSRecordCount", query);
                query.pageSize = pageSize;
                query.pageNumber = pageNumber;
                List<ServSMSRecordModel> list = mapContext.QueryForList<ServSMSRecordModel>("ServSMSRecordPage", query).ToList();
                return list;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据处置项执行记录ID获取短信记录
        /// </summary>
        /// <param name="handleRecordId"></param>
        /// <returns></returns>
        public List<ServSMSRecordModel> GetSMSRecordByHandleRecordId(int handleRecordId)
        {
            try
            {
                return mapContext.QueryForList<ServSMSRecordModel>("GetSMSRecordByHandleRecordId", handleRecordId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ServSMSRecordModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServSMSRecordModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}