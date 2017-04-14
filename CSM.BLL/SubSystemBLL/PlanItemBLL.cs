using CSM.Common;
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
    public class PlanItemBLL
    {

        /// <summary>
        /// 插入预案处置项执行结果
        /// </summary>
        /// <param name="confirmType"></param>
        /// <param name="handleItemId"></param>
        /// <param name="itemType"></param>
        /// <param name="planRecordId"></param>
        /// <param name="content"></param>
        public int AddItemRecord(int confirmType, int handleItemId, int result, int itemType, int planRecordId, string content)
        {
            ServPlanItemResultDAL planItemResultDal = new ServPlanItemResultDAL();
            try
            {
                ServPlanItemResultModel itemResult = new ServPlanItemResultModel();
                itemResult.confirm_type = confirmType;
                itemResult.content = content;
                itemResult.execute_time = DateTime.Now;
                itemResult.handleitem_id = handleItemId;
                itemResult.item_result = result;
                itemResult.item_type = itemType;
                itemResult.plan_record_id = planRecordId;
                int id = planItemResultDal.AddEntity(itemResult);
                return id;
            }
            catch (Exception ex)
            {
                Log4NetHelp.Error("插入预案处置项执行记录失败！" + "confirm_type：" + confirmType + "处置项ID：" + handleItemId + "处置项类型编号：" + itemType + "预案记录ID：" + planRecordId + "处置项描述：" + content + "错误信息：" + ex.Message);
                return 0;
            }
        }
    }
}
