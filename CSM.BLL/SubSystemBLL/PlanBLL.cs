using CSM.DAL;
using CSM.Model;
using CSM.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL.SubSystemBLL
{
    public class PlanBLL
    {
        /// <summary>
        /// 增加预案处置记录
        /// </summary>
        /// <returns></returns>
        public int AddPlanRecord(int alarmRecordId, int planId, int planType)
        {
            int planRecordId = 0;
            ServPlanRecordDAL planRecordDal = new ServPlanRecordDAL();
            try
            {
                ServPlanRecordModel planRecord = new ServPlanRecordModel();
                planRecord.alarm_id = alarmRecordId;
                planRecord.plan_id = planId;
                planRecord.plan_type = planType;
                planRecord.trigger_time = DateTime.Now;
                return planRecordId = planRecordDal.AddEntity(planRecord);
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("插入预案执行记录失败！" + "报警ID：" + alarmRecordId + "预案ID：" + planId + "预案类型：" + planType + "错误信息：" + ex.Message);
                return 0;
            }
        }
    }
}
