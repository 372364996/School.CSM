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
    public class PlanPersonBLL
    {
        private ServPlanPersonDAL _servPlanPersonDal = new ServPlanPersonDAL();

        /// <summary>
        /// 查询预案关联人信息
        /// </summary>
        /// <param name="handleItemId"></param>
        /// <returns></returns>
        private List<ServPlanPersonModel> GetPlanPersonList(int handleItemId)
        {
            try
            {
                return _servPlanPersonDal.GetPlanPersonByItemId(handleItemId);
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("查找预案关联人失败！预案处置项ID：" + handleItemId + "错误信息：" + ex.Message);
                return null;
            }
        }
        /// <summary>
        /// 处理预案关联人
        /// </summary>
        /// <param name="handleItemId"></param>
        /// <param name="planRecordId"></param>
        /// <param name="planType"></param>
        /// <param name="confirmType"></param>
        /// <returns></returns>
        public bool HandlePlanPerson(int handleItemId, ServAlarmRecordModel alarmRecord, int handleRecordId)
        {
            try
            {
                List<ServPlanPersonModel> personList = GetPlanPersonList(handleItemId);
                if (personList != null)
                {
                    for (int i = 0; i < personList.Count; i++)
                    {
                        if (personList[i].is_message == 1)//判断是否发短信
                        {
                            //TODO调用发短信接口，并记录到数据库
                            //1：获取短信模板和短信内容(模板应该固定)
                            //2：调用发送短信接口
                            //3：将短信记录数据库(短信记录及关联记录)

                        }
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("处理预案关联人失败！预案处置项ID：" + handleItemId + "预案处置项记录ID：" + handleRecordId + "错误信息：" + ex.Message);
                return false;
            }
        }
    }
}

