using CSM.Common;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace CSM.BLL
{
   public  class ServPlanRecordBLL
    {

        private CSM.DAL.ServPlanRecordDAL servPlanRecordDAL = new CSM.DAL.ServPlanRecordDAL();
        private CSM.DAL.ServDevicePlanDAL servDevicePlanDAL = new DAL.ServDevicePlanDAL();
        private CSM.DAL.ServEventPlanDAL servEventPlanDAL = new DAL.ServEventPlanDAL();
        private CSM.DAL.ServPlanItemResultDAL servPlanItemResultDAL = new DAL.ServPlanItemResultDAL();
        private CSM.DAL.ServPlanHandleItemDAL servPlanHandleItemDAL = new DAL.ServPlanHandleItemDAL();
        /// <summary>
        /// 获取预案执行记录
        /// </summary>
        /// <param name="servPlanRecordQuery"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<ServPlanRecordInfo> GetEntities(ServPlanRecordQuery servPlanRecordQuery, int pageNumber, int pageSize, out int totalNumber)
        {
            try
            {
                List<ServPlanRecordModel> PlanRecordlist = new List<ServPlanRecordModel>();
                List<ServPlanRecordInfo> servPlanRecordInfoList = new List<ServPlanRecordInfo>();
                PlanRecordlist = servPlanRecordDAL.GetEntities(servPlanRecordQuery, pageNumber, pageSize, out totalNumber);
                ServPlanRecordInfo servPlanRecordModel;
                foreach (ServPlanRecordModel item in PlanRecordlist)
                {
                    servPlanRecordModel = new ServPlanRecordInfo();
                    servPlanRecordModel.id = item.id;
                    servPlanRecordModel.plan_id = item.plan_id;
                    servPlanRecordModel.plan_type = item.plan_type;
                    servPlanRecordModel.type_name = Enum.GetName(typeof(EnumClass.PlanType), item.plan_type);
                    if ((int)EnumClass.PlanType.事件预案== item.plan_type)
                    {
                        var u = servEventPlanDAL.GetEntity(item.plan_id);
                        servPlanRecordModel.plan_name = u == null ? "未知" : u.plan_name;
                        servPlanRecordModel.plan_code = u == null ? 0 : u.plan_code;
                    }
                    else
                    {
                        var u = servDevicePlanDAL.GetEntity(item.plan_id);
                        servPlanRecordModel.plan_name = u == null ? "未知" : u.plan_name;
                        servPlanRecordModel.plan_code = u == null ? 0 : u.plan_code;
                    }
                    servPlanRecordModel.content = item.content;
                    servPlanRecordModel.trigger_time = item.trigger_time;

                    servPlanRecordInfoList.Add(servPlanRecordModel);

                }
                return servPlanRecordInfoList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 查询处置项结果
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public List<PlanItemResult>  GetPlanItemResult(int Id)
        {
            try
            {
                List<ServPlanItemResultModel> PlanItemResultInfo = servPlanItemResultDAL.GetEntitiesByPlanRecordId(Id);
                List<PlanItemResult> ServPlanItemResultInfo = new List<PlanItemResult>();
                PlanItemResult planItemResult;
                foreach (ServPlanItemResultModel item in PlanItemResultInfo)
                {
                    planItemResult = new PlanItemResult();
                    planItemResult.id = item.id;
                    var u = servPlanHandleItemDAL.GetEntity(item.handleitem_id);
                    if(u!=null)
                    {
                        if (u.plan_type == (int)EnumClass.RelateType.事件预案)
                        {
                            if (u.confirm_type == (int)EnumClass.PlanHandleTime.确警前)
                            {
                                planItemResult.item_name = Enum.GetName(typeof(EnumClass.EventPlanDefaultOptions), item.item_type);
                            }
                            else if (u.confirm_type == (int)EnumClass.PlanHandleTime.确警后)
                            {
                                planItemResult.item_name = Enum.GetName(typeof(EnumClass.EventPlanConfirmOptions), item.item_type);
                            }
                        }
                        else if (u.plan_type == (int)EnumClass.RelateType.设备预案)
                        {
                            if (u.confirm_type == (int)EnumClass.PlanHandleTime.确警前)
                            {
                                planItemResult.item_name = Enum.GetName(typeof(EnumClass.DevicePlanDefaultOptions), item.item_type);
                            }
                            else if (u.confirm_type == (int)EnumClass.PlanHandleTime.确警后)
                            {
                                planItemResult.item_name = Enum.GetName(typeof(EnumClass.DevicePlanConfirmOptions), item.item_type);
                            }
                        }
                    }
                    planItemResult.confirm_name= Enum.GetName(typeof(EnumClass.PlanHandleTime), item.confirm_type);
                    planItemResult.item_result = item.item_result;
                    planItemResult.result_name = Enum.GetName(typeof(EnumClass.PlanItemResult), item.item_result);
                    planItemResult.execute_time = item.execute_time;
                    bool result = false;
                    for (var i=0;i< ServPlanItemResultInfo.Count;i++)
                    {
                       if(ServPlanItemResultInfo[i].item_name== planItemResult.item_name)
                        {
                            result = true;
                        }
                    }
                    if(result==false)
                    {
                        ServPlanItemResultInfo.Add(planItemResult);
                    }
                }
                return ServPlanItemResultInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 添加告警执行结果记录
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool AddPlanItemResult(ServPlanItemResultModel model)
        {
            try
            {
               
               int PlanItemResult = servPlanItemResultDAL.AddEntity(model);
               if(PlanItemResult>0)
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
