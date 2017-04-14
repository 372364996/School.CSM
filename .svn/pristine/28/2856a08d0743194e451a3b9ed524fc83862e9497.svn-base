using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;

namespace CSM.DAL
{
    public class ServInformAlarmHandleRecordDAL : MapContext, IDataFactory<ServInformAlarmHandleRecordModel, ServInformAlarmHandleRecordQuery>
    {
        /// <summary>
        /// 添加处理记录并修改记录状态
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="alarmId"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public EventRet AddRecordAndUpdateInformAlarmStatus(ServInformAlarmHandleRecordModel entity,int alarmId,int status )
        {
            EventRet ret = new EventRet();
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            try
            {
                int eventId = AddEntity(entity);  //添加处理记录
                if (eventId > 0)
                {
                    DBModelStateCustom stateCustom = new DBModelStateCustom();
                    stateCustom.id = alarmId;
                    stateCustom.state = status;
                    int res = mapContext.Update("UpdateInformAlarmState", stateCustom);
                    if (res > 0)
                    {
                        mapContext.CommitTransaction();
                        ret.message = "添加处理记录成功，设置状态成功！";
                        ret.state = 0;
                        return ret;
                    }
                    else
                    {
                        mapContext.RollBackTransaction();
                        ret.message = "添加处理记录成功，设置状态失败！";
                        ret.state = -1;
                        return ret;
                    }
                }
                else
                {
                    mapContext.RollBackTransaction();
                    ret.message = "添加处理记录失败！";
                    ret.state = -1;
                    return ret;
                }

            }
            catch (Exception ex)
            {
                mapContext.RollBackTransaction();
                throw ex;
            }
        }
        /// <summary>
        /// 新增设备告警处理记录
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int AddEntity(ServInformAlarmHandleRecordModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertInformAlarmHandleRecord", entity);
                return id;
            }
            catch (Exception ex)
            {
                throw ex;
            }

           
        }
        /// <summary>
        /// 根据告警ID获取告警处理记录
        /// </summary>
        /// <param name="alarmId"></param>
        /// <returns></returns>
        public List<InformAlarmHandleRecordWithPerson> GetInformAlarmHandleRecordByAlarmId(int alarmId)
        {
            try
            {
                List<InformAlarmHandleRecordWithPerson> list = mapContext.QueryForList<InformAlarmHandleRecordWithPerson>("GetInformAlarmHandleRecordIncludePersonNameByAlarmId", alarmId).ToList();
                return list;
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

        public List<ServInformAlarmHandleRecordModel> GetEntities(ServInformAlarmHandleRecordQuery query)
        {
            throw new NotImplementedException();
        }

        public List<ServInformAlarmHandleRecordModel> GetEntities(ServInformAlarmHandleRecordQuery query, int pageSize, int pageNumber, out int totalNumber)
        {
            throw new NotImplementedException();
        }

        public ServInformAlarmHandleRecordModel GetEntity(int id)
        {
            throw new NotImplementedException();
        }

        public bool UpdateEntity(int id, ServInformAlarmHandleRecordModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}
