using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.DAL;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using CSM.Common;

namespace CSM.BLL
{
    public class ServInformAlarmHandleRecordBLL
    {
        private ServInformAlarmHandleRecordDAL informAlarmHandleRecordDal = new ServInformAlarmHandleRecordDAL();
        /// <summary>
        /// 根据告警Id查询告警记录
        /// </summary>
        /// <param name="alarmId"></param>
        /// <returns></returns>
        public List<InformAlarmHandleRecordWithPerson> GetInformAlarmHandleRecordListByAlarmId(int alarmId)
        {
            try
            {
               return  informAlarmHandleRecordDal.GetInformAlarmHandleRecordByAlarmId(alarmId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 增加处理记录并修改告警记录状态
        /// </summary>
        /// <param name="alarmId"></param>
        /// <param name="personId"></param>
        /// <param name="context"></param>
        /// <param name="status"></param>
        /// <returns></returns>
        public bool AddInformAlarmHandleRecord(int alarmId, int personId, string context,int status)
        {
            try
            {
                ServInformAlarmHandleRecordModel model = new ServInformAlarmHandleRecordModel();
                string contextUpdate = "";
                switch (status)
                {
                    case (int)EnumClass.InformAlarmStatus.处理中:contextUpdate = "[处理中]" + context;break;
                    case (int)EnumClass.InformAlarmStatus.已处理:contextUpdate = "[已处理]" + context;break;
                    default:contextUpdate = context;break;
                }
                model.handle_content = contextUpdate;
                model.handle_person = personId;
                model.handle_time = DateTime.Now;
                model.inform_alarm_id = alarmId;
                EventRet ret = informAlarmHandleRecordDal.AddRecordAndUpdateInformAlarmStatus(model, alarmId, status);
                if (ret.state == 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
