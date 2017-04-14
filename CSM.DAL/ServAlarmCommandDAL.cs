using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
	 	//Serv_Alarm_Command
	public class ServAlarmCommandDAL : MapContext, IDataFactory<CSM.Model.ServAlarmCommandModel, ServAlarmCommandQuery>
	{
		/// <summary>
		/// 增加一条数据
		/// </summary>
		/// <param name="entity"></param>
       public int AddEntity(ServAlarmCommandModel entity)  
		{
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);
            try
            {
                int id = (int)mapContext.Insert("InsertAlarmCommand", entity);
                if (id <= 0)
                {
                    mapContext.RollBackTransaction();
                    return -1;
                }
                else
                {
                    mapContext.CommitTransaction();
                    return id;
                }
            }
            catch (Exception ex)
            {
                mapContext.RollBackTransaction();
                throw ex;
            }
		}
		/// <summary>
		/// 删除一条数据
		/// </summary>
		/// <param name="id"></param>
		public int DeleteAlarmCommandById(int id)
        {
            int result = mapContext.Delete("DeleteAlarmCommandById", id);

            return result;
        }
		
		
		/// <summary>
		/// 更新一条数据
		/// </summary>
		/// <param name="model"></param>
        public int UpdateAlarmCommandById(ServAlarmCommandModel model)
        {

            int result = mapContext.Update("UpdateAlarmCommandById", model);
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
        public List<ServAlarmCommandModel> GetEntities(ServAlarmCommandQuery query)
        {
            List<ServAlarmCommandModel> list = mapContext.QueryForList<ServAlarmCommandModel>("GetAlarmCommand", query).ToList();
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
        public List<ServAlarmCommandModel> GetEntities(ServAlarmCommandQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<ServAlarmCommandModel> list = mapContext.QueryForList<ServAlarmCommandModel>("AlarmCommandPage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }

        public ServAlarmCommandModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServAlarmCommandModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据事件ID返回对应的应急预案预案列表
        /// </summary>
        /// <param name="eventId">事件ID</param>
        /// <returns>应急预案预案集合</returns>
        public List<ServAlarmCommandModel> GetAlarmCommandByEventId(int eventId)
        {
            return
            mapContext.QueryForList<ServAlarmCommandModel>("GetAlarmCommandByEventId", eventId).ToList();
        }
        /// <summary>
        /// 更新中间表
        /// </summary>
        /// <param name="model">model</param>
        /// <returns></returns>
        //public int AddEvent_AlarmCommand(ServEventAlarmCommandModel model)
        //{
        //    int id = (int)mapContext.Insert("InsertEvent_AlarmCommand", model);
        //    return id;
        //}
        
        /// <summary>
        /// 根据事件ID删除对应的预案流程
        /// </summary>
        /// <param name="id"></param>
        public int DeleteAlarmCommandByEventId(int eventid)
        {
            int result = mapContext.Delete("DeleteAlarmCommandByEventId", eventid);

            return result;
        }
        /// <summary>
        /// 根据事件ID删除EventAlarmCommand中间表
        /// </summary>
        /// <param name="eventid"></param>
        /// <returns></returns>
        //public int DeleteEventAlarmCommand(int eventid)
        //{
        //    int result = mapContext.Delete("DeleteEventAlarmCommandByEventId", eventid);

        //    return result;
        //}
        /// <summary>
        /// 分页获取事件
        /// </summary>
        /// <returns></returns>
        public List<BaseEventTypeModel> GetEventtype(long startRowNum, long endRowNum)
        {
            AlarmPageModel apModel = new AlarmPageModel();
            apModel.startRowNum = startRowNum;
            apModel.endRowNum = endRowNum;
            try
            {
                //return mapContext.QueryForList<BaseEventTypeModel>("GetEventTypeByPage", apModel).ToList();
                return mapContext.QueryForList<BaseEventTypeModel>("GetRootEventTypeByPage", apModel).ToList();
            }
            catch (Exception ex)
            {
                //log:"不带条件查询全部事件类型失败！"+ex.message
                throw ex;
            }
        }

    }
}