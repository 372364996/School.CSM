using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.DAL;
using CSM.Model;
using CSM.Model.CustomModel;

namespace CSM.BLL
{
    public class BaseEventTypeBLL
    {
        private BaseEventTypeDAL _baseEventTypeDal = new BaseEventTypeDAL();
        /// <summary>
        /// 查询全部事件类型
        /// </summary>
        /// <returns></returns>
        public List<BaseEventTypeModel> GetAllEventType()
        {
            try
            {
                return _baseEventTypeDal.GetEntities();
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
        public List<BaseEventTypeModel> GetChildEventType(int id)
        {
            try
            {
                return _baseEventTypeDal.GetChildEventTypeById(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 分页获取根级事件
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public List<BaseEventTypeModel> GetEventPages(int pageIndex, int pageSize, out int totalNumber)
        {
            try
            {
                PageModel pageModel = new PageModel();
                pageModel.pageIndex = pageIndex;
                pageModel.pageSize = pageSize;
                totalNumber = GetEventCount(-1);
                return _baseEventTypeDal.GetEntitiesPage(pageModel);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 分页获取根级事件
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public List<BaseEventAndVideoTime> GetRootEventAndVideoTimePages(int pageIndex, int pageSize, out int totalNumber)
        {
            try
            {
                PageModel pageModel = new PageModel();
                pageModel.pageIndex = pageIndex;
                pageModel.pageSize = pageSize;
                totalNumber = GetEventCount(-1);
                return _baseEventTypeDal.GetRootEventAndVideoTimePage(pageModel);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        ///  根据PID获取事件数量
        /// </summary>
        /// <param name="pid"></param>
        /// <returns></returns>
        public int GetEventCount(int pid)
        {
            try
            {
                return _baseEventTypeDal.GetEventCount(pid);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //根据PID删除事件(批量删除)
        public EventRet DeleteEventByPid(int pid)
        {
            EventRet ret = new EventRet();
            try
            {
                int count = _baseEventTypeDal.GetEventCount(pid);
                if (count > 0)
                {
                    int res = _baseEventTypeDal.DeleteEventByPid(pid);
                    if (res > 0)
                    {
                        ret.message = "删除子级事件成功";
                        ret.state = 0;
                    }
                    else
                    {
                        ret.message = "删除子级事件失败";
                        ret.state = -1;
                    }
                    return ret;
                }
                else
                {
                    ret.message = "未含有子级事件";
                    ret.state = -1;
                    return ret;
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据ID删除事件
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DeleteEventById(int id)
        {
            try
            {
                return _baseEventTypeDal.DeleteBaseEventTypeById(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 添加子级事件
        /// </summary>
        /// <param name="pid"></param>
        /// <param name="eventName"></param>
        /// <param name="eventCode"></param>
        /// <param name="eventContent"></param>
        /// <returns></returns>
        public EventRet AddChildEvent(int pid, string eventName, string eventCode, string eventContent)
        {

            EventRet ret = new EventRet();
            try
            {
                List<BaseEventTypeModel> eventList = _baseEventTypeDal.GetEntities();
                var checkCode = eventList.FirstOrDefault(n => n.event_code == eventCode);
                var checkName = eventList.FirstOrDefault(n => n.event_name == eventName);
                if (checkCode != null)
                {
                    ret.state = -1;
                    ret.message = "事件编码重复";
                    return ret;
                }
                if (checkName != null)  //校验事件名称
                {
                    ret.state = -1;
                    ret.message = "事件名称重复";
                    return ret;
                }
                BaseEventTypeModel model = new BaseEventTypeModel();
                model.content = eventContent;
                model.event_code = eventCode;
                model.event_name = eventName;
                model.pid = pid;
                int id = _baseEventTypeDal.AddEntity(model);
                if (id > 0)  //判断是否添加成功
                {
                    ret.state = 0;
                    ret.message = "事件添加成功";
                    return ret;
                }
                else
                {
                    ret.state = -1;
                    ret.message = "事件添加失败";
                    return ret;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改子级事件
        /// </summary>
        /// <param name="id"></param>
        /// <param name="eventName"></param>
        /// <param name="eventCode"></param>
        /// <param name="eventContent"></param>
        /// <returns></returns>
        public EventRet UpdateChildEvent(int pid, int id, string eventName, string eventCode, string eventContent)
        {
            EventRet ret = new EventRet();
            try
            {
                List<BaseEventTypeModel> eventList = _baseEventTypeDal.GetEntities();
                var sEvent = eventList.FirstOrDefault(n => n.id == id);  //查找自身
                if (sEvent != null)
                {
                    eventList.Remove(sEvent);  //移除自身
                }
                var checkCode = eventList.FirstOrDefault(n => n.event_code == eventCode);
                var checkName = eventList.FirstOrDefault(n => n.event_name == eventName);


                if (checkCode != null) //校验事件编码
                {
                    ret.state = -1;
                    ret.message = "事件编码重复";
                    return ret;
                }
                if (checkName != null)  //校验事件名称
                {
                    ret.state = -1;
                    ret.message = "事件名称重复";
                    return ret;
                }
                BaseEventTypeModel model = new BaseEventTypeModel();
                model.id = id;
                model.content = eventContent;
                model.event_code = eventCode;
                model.event_name = eventName;
                model.pid = pid;
                int res = _baseEventTypeDal.UpdateBaseEventTypeById(model);
                if (res > 0)  //判断是否修改成功
                {
                    ret.state = 0;
                    ret.message = "事件修改成功";
                    return ret;
                }
                else
                {
                    ret.state = -1;
                    ret.message = "事件修改失败";
                    return ret;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 新增父级事件
        /// </summary>
        /// <param name="eventName"></param>
        /// <param name="eventContent"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <returns></returns>
        public EventRet AddRootEvent(string eventName, string eventContent, int startTime, int endTime)
        {
            EventRet ret = new EventRet();
            try
            {
                List<BaseEventTypeModel> eventList = _baseEventTypeDal.GetEntities();
                var checkName = eventList.FirstOrDefault(n => n.event_name == eventName);
                if (checkName != null)
                {
                    ret.state = -1;
                    ret.message = "事件名称重复";
                    return ret;
                }
                else
                {
                    return _baseEventTypeDal.AddRootEntity(eventName, eventContent, startTime, endTime);
                }
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改父级事件
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

            try
            {
                List<BaseEventTypeModel> eventList = _baseEventTypeDal.GetEntities(); //查找全部事件
                var sEvent = eventList.FirstOrDefault(n => n.id == id);  //查找自身
                if (sEvent != null)
                {
                    eventList.Remove(sEvent);  //移除自身
                    var checkName = eventList.FirstOrDefault(n => n.event_name == eventName); //判断事件名称是否重复
                    if (checkName != null)
                    {
                        ret.state = -1;
                        ret.message = "事件名称重复";
                        return ret;
                    }
                    else
                    {
                        return _baseEventTypeDal.UpdateRootEvent(eventName, eventContent, startTime, endTime, id);
                    }
                }
                else
                {
                    ret.state = -1;
                    ret.message = "事件不存在";
                    return ret;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 删除父级事件
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public EventRet DeleteRootEvent(int id)
        {
            EventRet ret = new EventRet();
            try
            {
                BaseEventTypeModel eventModel = _baseEventTypeDal.GetEntity(id);
                if (eventModel != null)
                {
                    return _baseEventTypeDal.DeleteRootEvent(id);
                }
                else
                {
                    ret.state = -1;
                    ret.message = "事件不存在";
                    return ret;
                }
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }

        public string EventTypeName(int eventId)
        {

            try
            {
                string EventTypeName = _baseEventTypeDal.GetEventTypeName(eventId);
                return EventTypeName;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 根据code 获取名称
        /// </summary>
        /// <param name="eventCode"></param>
        /// <returns></returns>
        public string GetEventTypeName(string eventCode)
        {

            try
            {
                string EventTypeName = _baseEventTypeDal.GetEventTypeNameByCode(eventCode);
                return EventTypeName;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

    }
}

