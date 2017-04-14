using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
using CSM.Model.CustomModel;

namespace CSM.DAL
{
    //Base_Event_Type
    public class BaseEventTypeDAL : MapContext, IDataFactory<CSM.Model.BaseEventTypeModel, BaseEventTypeQuery>
    {
        /// <summary>
        /// 增加一条数据
        /// </summary>
        /// <param name="entity"></param>
        public int AddEntity(BaseEventTypeModel entity)
        {
            //int id = (int)mapContext.Insert("InsertEventType", entity);
            //return id;
            try
            {
                return (int)mapContext.Insert("InsertEventType", entity);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 添加父级事件
        /// </summary>
        /// <param name="eventName"></param>
        /// <param name="eventContent"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <returns></returns>
        public EventRet AddRootEntity(string eventName, string eventContent, int startTime, int endTime)
        {
            EventRet ret = new EventRet();
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            try
            {
                BaseEventTypeModel eventModel = new BaseEventTypeModel();
                eventModel.content = eventContent;
                eventModel.event_code = "";
                eventModel.event_name = eventName;
                eventModel.pid = -1;
                int eventId = AddEntity(eventModel);  //添加事件
                if (eventId > 0)
                {
                    ServAlarmVideoTimeModel timeModel = new ServAlarmVideoTimeModel();
                    timeModel.end_time = endTime;
                    timeModel.event_id = eventId;
                    timeModel.start_time = startTime;
                    int timeId = (int)mapContext.Insert("InsertAlarmVideoTime", timeModel);  //添加事件对应视频下载时间
                    if (timeId > 0)
                    {
                        mapContext.CommitTransaction();
                        ret.message = "事件添加成功";
                        ret.state = 0;
                        return ret;
                    }
                    else
                    {
                        mapContext.RollBackTransaction();
                        ret.message = "视频下载时间添加失败";
                        ret.state = -1;
                        return ret;
                    }
                }
                else
                {
                    mapContext.RollBackTransaction();
                    ret.message = "事件添加失败";
                    ret.state = -1;
                    return ret;
                }

            }
            catch (Exception ex)
            {
                mapContext.RollBackTransaction();
                throw ex;
            }
            finally
            {
               // mapContext.CloseConnection();
            }
        }
        /// <summary>
        /// 父级事件修改
        /// </summary>
        /// <param name="eventName"></param>
        /// <param name="eventContent"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public EventRet UpdateRootEvent(string eventName, string eventContent, int startTime, int endTime, int id)
        {
            EventRet ret = new EventRet();
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            try
            {
                BaseEventTypeModel eventModel = new BaseEventTypeModel();
                eventModel.id = id;
                eventModel.content = eventContent;
                eventModel.event_code = "";
                eventModel.event_name = eventName;
                eventModel.pid = -1;
                int eventRes = UpdateBaseEventTypeById(eventModel);
                if (eventRes > 0)
                {
                    int res = 0;
                    ServAlarmVideoTimeModel timeModel = mapContext.QueryForObject<ServAlarmVideoTimeModel>("GetAlarmVideoTimeByEventId", id); //查找事件对应视频下载时间是否存在
                    if (timeModel == null)
                    {
                        timeModel = new ServAlarmVideoTimeModel();
                        timeModel.end_time = endTime;
                        timeModel.event_id = id;
                        timeModel.start_time = startTime;
                        res = (int)mapContext.Insert("InsertAlarmVideoTime", timeModel); //不存在则添加
                    }
                    else
                    {
                        timeModel.end_time = endTime;
                        timeModel.event_id = id;
                        timeModel.start_time = startTime;
                        res = mapContext.Update("UpdateAlarmVideoTimeByEventId", timeModel);  //修改
                    }
                    if (res > 0)
                    {
                        mapContext.CommitTransaction();
                        ret.message = "事件修改成功";
                        ret.state = 0;
                        return ret;
                    }
                    else
                    {
                        mapContext.RollBackTransaction();
                        ret.message = "视频下载时间修改失败";
                        ret.state = -1;
                        return ret;
                    }
                }
                else
                {
                    mapContext.RollBackTransaction();
                    ret.message = "事件修改失败";
                    ret.state = -1;
                    return ret;
                }
            }
            catch (Exception ex)
            {
                mapContext.RollBackTransaction();
                throw ex;
            }
            finally
            {
                
              //  mapContext.CloseConnection();
            }


        }
        /// <summary>
        /// 删除父级事件
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public EventRet DeleteRootEvent(int id)
        {
            bool timebl = false;
            EventRet ret = new EventRet();
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            try
            {
                int eventRes = DeleteBaseEventTypeById(id);   //删除事件
                if (eventRes > 0)
                {
                    ServAlarmVideoTimeModel timeModel = mapContext.QueryForObject<ServAlarmVideoTimeModel>("GetAlarmVideoTimeByEventId", id); //查找事件对应视频下载时间是否存在
                    List<ServAlarmCommandModel> commandList = mapContext.QueryForList<ServAlarmCommandModel>("GetAlarmCommandByEventId", id).ToList();   //获取应急指挥流程图
                    #region 删除视频下载时间
                    if (timeModel != null)
                    {
                        int timeRes = mapContext.Delete("DeleteAlarmVideoTimeByEventId", id);  //删除事件对应视频下载时间
                        if (timeRes > 0)
                        {
                            timebl = true;
                        }
                    }
                    else
                    {
                        timebl = true;
                    }
                    #endregion
                    if (timebl == true) //判断视频下载时间删除是否成功，成功则继续删除流程图
                    {
                        #region  删除应急指挥流程图
                        if (commandList != null && commandList.Count > 0)
                        {
                            int res = mapContext.Delete("DeleteAlarmCommandByEventId", id);
                            if (res > 0)
                            {
                                mapContext.CommitTransaction();
                                ret.message = "事件删除成功";
                                ret.state = 0;
                                return ret;
                            }
                            else
                            {
                                mapContext.RollBackTransaction();
                                ret.message = "应急指挥流程图删除失败";
                                ret.state = -1;
                                return ret;
                            }
                        }
                        else   
                        {
                            mapContext.CommitTransaction();
                            ret.message = "事件删除成功";
                            ret.state = 0;
                            return ret;

                        }
                        #endregion
                    }
                    else
                    {
                        mapContext.RollBackTransaction();
                        ret.message = "视频下载时间删除失败";
                        ret.state = -1;
                        return ret;
                    }

                }
                else
                {
                    mapContext.RollBackTransaction();
                    ret.message = "事件删除失败";
                    ret.state = -1;
                    return ret;
                }
            }
            catch (Exception ex)
            {
                mapContext.RollBackTransaction();
                throw ex;
            }
            finally
            {
               // mapContext.CloseConnection();
            }
        }
        /// <summary>
        /// 删除一条数据
        /// </summary>
        /// <param name="id"></param>
        public int DeleteBaseEventTypeById(int id)
        {
            try
            {
                return mapContext.Delete("DeleteEventTypeById", id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
            //int result = mapContext.Delete("DeleteEventTypeById", id);

            //return result;
        }
        /// <summary>
        /// 根据Pid删除事件
        /// </summary>
        /// <param name="pid"></param>
        /// <returns></returns>
        public int DeleteBaseEventTypeByPid(int pid)
        {
            try
            {
                return mapContext.Delete("DeleteEventByPid", pid);
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
        public int UpdateBaseEventTypeById(BaseEventTypeModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateEventType", model);
                return result;
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
        /// 查询全部事件类型
        /// </summary>
        /// <returns></returns>
        public List<BaseEventTypeModel> GetEntities()
        {
            try
            {
                return mapContext.QueryForList<BaseEventTypeModel>("GetAllEventType", null).ToList();
            }
            catch (Exception ex)
            {
                //log:"不带条件查询全部事件类型失败！"+ex.message
                throw ex;
            }
        }

        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<BaseEventTypeModel> GetEntities(BaseEventTypeQuery query)
        {
            List<BaseEventTypeModel> list = mapContext.QueryForList<BaseEventTypeModel>("GetEventType", query).ToList();
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
        public List<BaseEventTypeModel> GetEntities(BaseEventTypeQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            PageModel model = new PageModel();
            model.pageIndex = pageNumber;
            model.pageSize = pageSize;
            List<BaseEventTypeModel> list = mapContext.QueryForList<BaseEventTypeModel>("EventTypePage", model).ToList();
            totalNumber = list.Count();
            return list.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();

        }
        /// <summary>
        /// 根据事件类型Code获取事件
        /// </summary>
        /// <param name="eventCode"></param>
        /// <returns></returns>
        public BaseEventTypeModel GetEntityByEventCode(string eventCode)
        {
            try
            {
                return mapContext.QueryForObject<BaseEventTypeModel>("GetEventTypeByEventCode", eventCode);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 通过事件名称获取事件
        /// </summary>
        /// <param name="eventName"></param>
        /// <returns></returns>
        public BaseEventTypeModel GetEntityByEventName(string eventName)
        {
            try
            {
                return mapContext.QueryForObject<BaseEventTypeModel>("GetEventTypeByEventName", eventName);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据pid获取父级事件
        /// </summary>
        /// <param name="pid"></param>
        /// <returns></returns>
        public BaseEventTypeModel GetRootEventTypeByPid(int pid)
        {
            try
            {
                return mapContext.QueryForObject<BaseEventTypeModel>("GetRootEventTypeByPid", pid);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据父级ID获取子级事件
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<BaseEventTypeModel> GetChildEventTypeById(int id)
        {
            try
            {
                return mapContext.QueryForList<BaseEventTypeModel>("GetChildEventTypeById", id).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据事件id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public BaseEventTypeModel GetEntity(int id)
        {
            //throw new NotImplementedException();
            try
            {
              return  mapContext.QueryForObject<BaseEventTypeModel>("GetEventTypeById", id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据事件Code获取事件
        /// </summary>
        /// <param name="code"></param>
        /// <returns></returns>
        public BaseEventTypeModel GetEntityByCode(string eventCode)
        {
            try
            {
                return mapContext.QueryForObject<BaseEventTypeModel>("GetEventTypeByCode", eventCode);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据事件id获取事件名称
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetEventTypeName(int id)
        {
            string eventName = "";
            BaseEventTypeModel EventTypInfo = new BaseEventTypeModel();
            try
            {
                EventTypInfo = mapContext.QueryForObject<BaseEventTypeModel>("GetEventTypeById", id);
                if (EventTypInfo != null)
                {
                    if (EventTypInfo.pid == -1)
                    {
                        eventName = EventTypInfo.event_name;
                    }
                    else
                    {
                        EventTypInfo = mapContext.QueryForObject<BaseEventTypeModel>("GetEventTypeById", EventTypInfo.pid);
                        if (EventTypInfo != null)
                        {
                            eventName = EventTypInfo.event_name;
                        }
                        else
                        {
                            eventName = "";
                        }

                    }
                    return eventName;
                }
                else
                {
                    return eventName = "";
                }


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 根据事件code获取事件名称 乔
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public string GetEventTypeNameByCode(string  code)
        {
            string eventName = "";
            BaseEventTypeModel EventTypInfo = new BaseEventTypeModel();
            try
            {
                EventTypInfo = mapContext.QueryForObject<BaseEventTypeModel>("GetEventTypeByCode", code);
                if (EventTypInfo != null)
                {
                    if (EventTypInfo.pid == -1)
                    {
                        eventName = EventTypInfo.event_name;
                    }
                    else
                    {
                        EventTypInfo = mapContext.QueryForObject<BaseEventTypeModel>("GetEventTypeById", EventTypInfo.pid);
                        if (EventTypInfo != null)
                        {
                            eventName = EventTypInfo.event_name;
                        }
                        else
                        {
                            eventName = "";
                        }

                    }
                    return eventName;
                }
                else
                {
                    return eventName = "";
                }


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 分页获取根级事件
        /// </summary>
        /// <param name="pageModel"></param>
        /// <returns></returns>
        public List<BaseEventTypeModel> GetEntitiesPage(PageModel pageModel)
        {
            try
            {
                return mapContext.QueryForList<BaseEventTypeModel>("QueryRootEventPage", pageModel).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 分页获取根级事件与视频下载时间
        /// </summary>
        /// <param name="pageModel"></param>
        /// <returns></returns>
        public List<BaseEventAndVideoTime> GetRootEventAndVideoTimePage(PageModel pageModel)
        {
            try
            {
                return mapContext.QueryForList<BaseEventAndVideoTime>("QueryRootEventAndVideoTimePage", pageModel).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 根据PID获取事件数量
        /// </summary>
        /// <param name="pid"></param>
        /// <returns></returns>
        public int GetEventCount(int pid)
        {
            try
            {
                return mapContext.QueryForObject<int>("GetEventCountByPid", pid);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据PID删除事件
        /// </summary>
        /// <param name="pid"></param>
        /// <returns></returns>
        public int DeleteEventByPid(int pid)
        {
            try
            {
                return mapContext.Delete("DeleteEventByPid", pid);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



        public bool UpdateEntity(int id, BaseEventTypeModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}