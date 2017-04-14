using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
namespace CSM.DAL
{
    //Serv_Alarm_VideoTime
    public class ServAlarmVideoTimeDAL : MapContext, IDataFactory<CSM.Model.ServAlarmVideoTimeModel, ServAlarmVideoTimeQuery>
    {
        /// <summary>
        /// 增加一条数据
        /// </summary>
        /// <param name="entity"></param>
        public int AddEntity(ServAlarmVideoTimeModel entity)
        {
            int id = (int)mapContext.Insert("InsertAlarmVideoTime", entity);
            return id;
        }
        /// <summary>
        /// 删除一条数据
        /// </summary>
        /// <param name="id"></param>
        public int DeleteAlarmVideoTimeById(int id)
        {
            int result = mapContext.Delete("DeleteAlarmVideoTimeById", id);

            return result;
        }


        /// <summary>
        /// 更新一条数据
        /// </summary>
        /// <param name="model"></param>
        public int UpdateAlarmVideoTimeById(ServAlarmVideoTimeModel model)
        {

            int result = mapContext.Update("UpdateAlarmVideoTimeById", model);
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
        public List<ServAlarmVideoTimeModel> GetEntities(ServAlarmVideoTimeQuery query)
        {
            List<ServAlarmVideoTimeModel> list = mapContext.QueryForList<ServAlarmVideoTimeModel>("GetAlarmVideoTime", query).ToList();
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
        public List<ServAlarmVideoTimeModel> GetEntities(ServAlarmVideoTimeQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            try
            {

                totalNumber = mapContext.QueryForObject<int>("AlarmVideoTimeCount", query);
                query.pageSize = pageSize;
                query.pageIndex = pageNumber;
                List<ServAlarmVideoTimeModel> list = mapContext.QueryForList<ServAlarmVideoTimeModel>("AlarmVideoTimePage", query).ToList();
                return list;

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        /// <summary>
        /// 根据报警事件类型获取报警视频下载时间配置
        /// </summary>
        /// <param name="eventId"></param>
        /// <returns></returns>
        public ServAlarmVideoTimeModel GetEntityByEventId(int eventId)
        {
            try
            {
                return mapContext.QueryForObject<ServAlarmVideoTimeModel>("GetAlarmVideoTimeByEventId", eventId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public ServAlarmVideoTimeModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServAlarmVideoTimeModel newentity)
        {
            throw new NotImplementedException();
        }


    }
}
           


