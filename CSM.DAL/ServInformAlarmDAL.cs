using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using CSM.Common;

namespace CSM.DAL
{
    public class ServInformAlarmDAL : MapContext, IDataFactory<ServInformAlarmModel, ServInformAlarmQuery>
    {
        /// <summary>
        /// 新增设备告警
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int AddEntity(ServInformAlarmModel entity)
        {
            try
            {
                int id = (int)mapContext.Insert("InsertInformAlarm", entity);
                return id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改设备告警状态
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public int UpdateEntityState(DBModelStateCustom entity)
        {
            try
            {
                int res = mapContext.Update("UpdateInformAlarmState", entity);
                return res;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        
        }
        /// <summary>
        /// 根据查询条件分页获取设备告警
        /// </summary>
        /// <param name="query"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<InformAlarmCustom> GetInformAlarmPage(DefinedInformAlarmQuery query,out int totalNumber)
        {
            try
            {
                string SQL = CSM.Utils.IBatisHelper.GetRuntimeSql(mapContext, "QueryInformAlarmPage", query);
                List<InformAlarmCustom> list = mapContext.QueryForList<InformAlarmCustom>("QueryInformAlarmPage", query).ToList();
                totalNumber = mapContext.QueryForObject<int>("QueryInformAlarmCount", query);
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 根据条件获取所有设备告警
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<InformAlarmCustom> GetAllInformAlarmCondition(DefinedInformAlarmQuery query)
        {
            try
            {
                List<InformAlarmCustom> list = mapContext.QueryForList<InformAlarmCustom>("GetAllInformAlarmCondition", query).ToList();
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

        public List<ServInformAlarmModel> GetEntities(ServInformAlarmQuery query)
        {
            throw new NotImplementedException();
        }

        public List<ServInformAlarmModel> GetEntities(ServInformAlarmQuery query, int pageSize, int pageNumber, out int totalNumber)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 根据ID查询告警记录
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServInformAlarmModel GetEntity(int id)
        {
            try
            {
                return mapContext.QueryForObject<ServInformAlarmModel>("GetInformAlarmById", id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool UpdateEntity(int id, ServInformAlarmModel newentity)
        {
            throw new NotImplementedException();
        }
    }
}
