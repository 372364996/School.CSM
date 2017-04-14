using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
using CSM.Model.CustomModel;
using static CSM.Common.EnumClass;
using CSM.Utils;

namespace CSM.DAL
{
    //Serv_Event_Plan
    public class ServEventPlanDAL : MapContext, IDataFactory<CSM.Model.ServEventPlanModel, ServEventPlanQuery>
    {
        /// <summary>
        /// 增加一条数据
        /// </summary>
        /// <param name="entity"></param>
        public int AddEntity(ServEventPlanModel entity)
        {

            try
            {
                int id = (int)mapContext.Insert("InsertServEventPlan", entity);
                return id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 删除一条数据
        /// </summary>
        /// <param name="id"></param>
        public int DeleteServEventPlanById(int id)
        {
            try
            {
                int result = mapContext.Delete("DeleteServEventPlanById", id);
                return result;
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
        public int UpdateServEventPlanById(ServEventPlanModel model)
        {
            try
            {
                int result = mapContext.Update("UpdateServEventPlanById", model);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServEventPlanModel> GetEntities(ServEventPlanQuery query)
        {

            try
            {
                List<ServEventPlanModel> list = mapContext.QueryForList<ServEventPlanModel>("GetServEventPlan", query).ToList();
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageSize">当前页数</param>
        /// <param name="pageNumber">每页显示行数</param>
        /// <param name="totalNumber">总数</param>
        /// <returns></returns>
        public List<ServEventPlanModel> GetEntities(ServEventPlanQuery query, int pageSize, int pageNumber, out int totalNumber)
        {
            try
            {
                //string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "DevicePlanCount", query);
                totalNumber = mapContext.QueryForObject<int>("EventPlanCount", query);
                query.pageSize = pageSize;
                query.pageNumber = pageNumber;
                List<ServEventPlanModel> list = mapContext.QueryForList<ServEventPlanModel>("EventPlanPage", query).ToList();
                return list;

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        /// <summary>
        /// 根据id查询
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServEventPlanModel GetEntity(int id)
        {
            try
            {
                ServEventPlanModel EventPlanInfo = mapContext.QueryForObject<ServEventPlanModel>("GetServEventPlanById", id);
                return EventPlanInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 修改预案状态
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="PlanStatus"></param>
        /// <returns></returns>
        public bool UpdateEventPlanStatus(int Id, int PlanStatus,int eventRegion)
        {
            try
            {
                ServEventPlanModel eventPlanModel = new ServEventPlanModel();
                eventPlanModel.id = Id;
                eventPlanModel.plan_status = PlanStatus;
                eventPlanModel.region_id = eventRegion;
                int result = -1;
                if (eventPlanModel.id == -1)
                {
                    result = mapContext.Update("UpdateNotAbolishedEventPlan", eventPlanModel);
                }
                else
                {
                    result = mapContext.Update("UpdateEventPlanStatus", eventPlanModel);
                }
                if (result > 0)
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

        /// <summary>
        /// 废止预案信息plan_status为-1为废止 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DelEntity(int id)
        {
            try
            {
                int result = mapContext.Delete("AbolishEventPlanById", id);
                if (result > 0)
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

        public bool UpdateEntity(int id, ServEventPlanModel newentity)
        {
            throw new NotImplementedException();
        }

        /// <summary>
        /// 查看事件类型，事发园区，预案类型，开始时间与结束时间相同的预案
        /// </summary>
        /// <param name="eventPlanId"></param>
        /// <param name="eventTypeId">事件类型</param>
        /// <param name="regionId">事发园区</param>
        /// <param name="planTime">开始时间</param>
        /// <param name="executionCycle">周期</param>
        /// <param name="endTime">结束时间</param>
        /// <returns></returns>
        public List<EventPlanInfo> CheckPlanTimeOccupied(int eventPlanId, int eventTypeId, int regionId, string planTime, string executionCycle, string endTime)
        {
            try
            {
                EventPlanInfo eventPlanInfo = new EventPlanInfo();
                List<EventPlanInfo> eventPlanInfoList = new List<EventPlanInfo>();
                eventPlanInfo.event_type = eventTypeId;
                eventPlanInfo.region_Id = regionId;
                eventPlanInfo.start_time = planTime;
                eventPlanInfo.id = eventPlanId;
                eventPlanInfo.end_time = endTime;
                eventPlanInfo.execution_cycle = executionCycle;
                eventPlanInfo.type = (int)RelateType.事件预案;
                eventPlanInfo.plan_status = (int)PlanStatus.废止;
                if (endTime == "")
                {
                    if (eventPlanId == -1)
                    {
                        string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "IsEventPlanTimeOccupied", eventPlanInfo);
                        eventPlanInfoList = mapContext.QueryForList<EventPlanInfo>("IsEventPlanTimeOccupied", eventPlanInfo).ToList();
                    }
                    else
                    {
                        eventPlanInfoList = mapContext.QueryForList<EventPlanInfo>("UpdateEventPlanTimeOccupied", eventPlanInfo).ToList();
                    }
                }
                else
                {
                    if (eventPlanId == -1)
                    {
                        eventPlanInfoList = mapContext.QueryForList<EventPlanInfo>("IsTimeSlotOccupy", eventPlanInfo).ToList();
                    }
                    else
                    {
                        eventPlanInfoList = mapContext.QueryForList<EventPlanInfo>("UpdateIsTimeSlotOccupy", eventPlanInfo).ToList();
                    }
                }

                return eventPlanInfoList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        /// <summary>
        /// 查看最后一条预案信息
        /// </summary>
        /// <returns></returns>
        public ServEventPlanModel GetLastEventPlan()
        {
            try
            {
                ServEventPlanQuery query = new ServEventPlanQuery();
                ServEventPlanModel entity = mapContext.QueryForObject<ServEventPlanModel>("GetLastEventPlan", query);
                return entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 添加设备预案信息
        /// </summary>
        /// <param name="entity"></param>
        /// <returns></returns>
        public bool AddEventPlan(EventPlanRelationInfo eventPlanRelationInfo)
        {
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            try
            {
                bool result = false;
                //向预案信息表中添加预案信息
                int planId = (int)mapContext.Insert("InsertServEventPlan", eventPlanRelationInfo.entity);
                if (planId > 0)
                {
                    result = AddRelatedInfo(planId, eventPlanRelationInfo);
                }
                else
                {
                    mapContext.RollBackTransaction();
                    result = false;
                }
                if (result == true)
                {
                    mapContext.CommitTransaction();//提交事务
                    return result;
                }
                else
                {
                    mapContext.RollBackTransaction();//事务回滚
                    return result;
                }
            }


            catch (Exception ex)
            {
                mapContext.RollBackTransaction();
                throw ex;
            }

            finally
            {

                //mapContext.CommitTransaction();
            }

        }

        /// <summary>
        /// 向预案处置项关联摄像头表，预案责任人关联表，预案处置项表表中添加相应信息
        /// </summary>
        /// <param name="Planid">预案id</param>
        /// <param name="eventPlanRelationInfo"></param>
        /// <returns></returns>
        public bool AddRelatedInfo(int Planid, EventPlanRelationInfo eventPlanRelationInfo)
        {
            bool result = false;
            try
            {

                #region 向Serv_Execution_Time添加时间信息
                eventPlanRelationInfo.servExecutionTime.relate_id = Planid;
                int TimeId = (int)mapContext.Insert("InsertServExecutionTime", eventPlanRelationInfo.servExecutionTime);
                if (TimeId > 0)
                {
                    result = true;
                }
                else
                {
                    result = false;
                }
                #endregion
                if (result == true)
                {
                    #region 向Serv_Plan_HandleItem添加默认处置选项
                    for (int i = 0; i < eventPlanRelationInfo.defaultPlanHandleItemList.Count(); i++)
                    {

                        eventPlanRelationInfo.defaultPlanHandleItemList[i].plan_id = Planid;
                        int eventHandleItemId = eventPlanRelationInfo.defaultPlanHandleItemList[i].item_type;
                        #region 向Serv_Plan_Person添加确警前其他责任人信息
                        if (eventHandleItemId == (int)EventPlanDefaultOptions.通知其他负责人)
                        {
                            int HandleId = (int)mapContext.Insert("InsertPlanHandleItem", eventPlanRelationInfo.defaultPlanHandleItemList[i]);
                            if (HandleId > 0)
                            {
                                //向Serv_Plan_Person添加确警前其他责任人信息
                                List<ServPlanPersonModel> defaultPersonlist = eventPlanRelationInfo.defaultPersonList as List<ServPlanPersonModel>;
                                for (int f = 0; f < defaultPersonlist.Count(); f++)
                                {
                                    defaultPersonlist[f].handleitem_id = HandleId;
                                }
                                int defaultPersonId = (int)mapContext.Insert("BatchAddPlanPerson", defaultPersonlist);
                                if (defaultPersonId > 0)
                                {
                                    result = true;
                                }
                                else
                                {

                                    result = false;
                                }
                            }
                            else
                            {

                                result = false;
                            }

                        }
                        #endregion
                        else
                        {
                            //向Serv_Plan_HandleItem添加默认处置选项
                            int HandleId = (int)mapContext.Insert("InsertPlanHandleItem", eventPlanRelationInfo.defaultPlanHandleItemList[i]);
                            if (HandleId > 0)
                            {
                                result = true;
                            }
                            else
                            {
                                result = false;
                            }
                        }
                    }
                    #endregion
                    if (result == true)
                    {
                        #region 向Serv_Plan_HandleItem添加确警后处置选项
                        for (int i = 0; i < eventPlanRelationInfo.cnfirmPlanHandleItemList.Count(); i++)
                        {
                            //向Serv_Plan_HandleItem添加确警后处置选项
                            eventPlanRelationInfo.cnfirmPlanHandleItemList[i].plan_id = Planid;
                            int eventHandleItemId = eventPlanRelationInfo.cnfirmPlanHandleItemList[i].item_type;
                            if (eventHandleItemId == (int)EventPlanConfirmOptions.通知其他负责人)
                            {
                                int HandleId = (int)mapContext.Insert("InsertPlanHandleItem", eventPlanRelationInfo.cnfirmPlanHandleItemList[i]);
                                if (HandleId > 0)
                                {
                                    //向Serv_Plan_Person添加确警前其他责任人信息
                                    List<ServPlanPersonModel> cnfirmPersonlist = eventPlanRelationInfo.cnfirmPlanPersonList as List<ServPlanPersonModel>;
                                    for (int f = 0; f < cnfirmPersonlist.Count(); f++)
                                    {
                                        cnfirmPersonlist[f].handleitem_id = HandleId;
                                    }
                                    int cnfirmPersonId = (int)mapContext.Insert("BatchAddPlanPerson", cnfirmPersonlist);
                                    if (cnfirmPersonId > 0)
                                    {
                                        result = true;
                                    }
                                    else
                                    {

                                        result = false;
                                    }
                                }
                                else
                                {

                                    result = false;
                                }
                            }
                            else
                            {   //向Serv_Plan_HandleItem添加确警后处置选项
                                int HandleId = (int)mapContext.Insert("InsertPlanHandleItem", eventPlanRelationInfo.cnfirmPlanHandleItemList[i]);
                                if (HandleId > 0)
                                {
                                    result = true;
                                }
                                else
                                {
                                    result = false;
                                }
                            }
                        }
                        #endregion
                    }
                }
                return result;
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 修改预案信息
        /// </summary>
        /// <param name="eventPlanRelationInfo"></param>
        /// <returns></returns>
        public bool UpdateEventPlan(EventPlanRelationInfo eventPlanRelationInfo)
        {
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            try
            {
                bool result = false;
                //修改预案信息.Insert
                string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "UpdateServEventPlanById", eventPlanRelationInfo.entity);
                int planId = (int)mapContext.Update("UpdateServEventPlanById", eventPlanRelationInfo.entity);
                if (planId > 0)
                {
                    int executionTimeId = (int)mapContext.Delete("DeleteServExecutionTime", eventPlanRelationInfo.servExecutionTime);
                    if (executionTimeId > 0)
                    {
                        ServPlanHandleItemModel servPlanHandleItemModel = new ServPlanHandleItemModel();
                        servPlanHandleItemModel.plan_id = eventPlanRelationInfo.entity.id;
                        servPlanHandleItemModel.plan_type = (int)PlanType.事件预案;
                        List<ServPlanHandleItemModel> PlanHandleItem = mapContext.QueryForList<ServPlanHandleItemModel>("GetPlanHandleItemByPlanId", servPlanHandleItemModel).ToList();
                        for (int a = 0; a < PlanHandleItem.Count(); a++)
                        {
                            if (PlanHandleItem[a].item_type == (int)EventPlanDefaultOptions.通知其他负责人 && PlanHandleItem[a].confirm_type == (int)PlanHandleTime.确警前)
                            {   //删除默认处置项中的通知其他责任人信息
                                result = DeleteRelatedInfo("DeletePlanPersonByHandleId", "DeletePlanHandleItemById", PlanHandleItem[a].id);
                                if (result == false)
                                {
                                    break;
                                }
                            }
                            else if (PlanHandleItem[a].item_type == (int)EventPlanConfirmOptions.通知其他负责人 && PlanHandleItem[a].confirm_type == (int)PlanHandleTime.确警后)
                            {
                                //删除确警后处置项中的通知其他责任人信息
                                result = DeleteRelatedInfo("DeletePlanPersonByHandleId", "DeletePlanHandleItemById", PlanHandleItem[a].id);
                                if (result == false)
                                {
                                    break;
                                }
                            }
                            else
                            {   //删除处置项
                                result = DeleteRelatedInfo("", "DeletePlanHandleItemById", PlanHandleItem[a].id);
                                if (result == false)
                                {
                                    break;
                                }
                            }
                        }
                        //添加关联信息
                        result = AddRelatedInfo(eventPlanRelationInfo.entity.id, eventPlanRelationInfo);
                    }
                    else
                    {
                        mapContext.RollBackTransaction();
                        result = false;
                    }
                }
                else
                {
                    mapContext.RollBackTransaction();
                    result = false;
                }
                if (result == true)
                {
                    mapContext.CommitTransaction();//提交事务
                    return result;
                }
                else
                {
                    mapContext.RollBackTransaction();//事务回滚
                    return result;
                }
            }


            catch (Exception ex)
            {
                mapContext.RollBackTransaction();
                throw ex;
            }

            finally
            {

                //mapContext.CommitTransaction();
            }
        }

        /// <summary>
        /// 删除Serv_Plan_Person表,Serv_Plan_HandleItem表
        /// </summary>
        /// <param name="DeleteSonData"></param>
        /// <param name="DeleteMainData"></param>
        /// <param name="Id"></param>
        /// <returns></returns>
        public bool DeleteRelatedInfo(string DeleteSonData, string DeleteMainData, int Id)
        {
            try
            {
                bool result = false;
                if (DeleteSonData != "")
                {   //删除通知其他责任人信息
                    int IsSuccess = mapContext.Delete(DeleteSonData, Id);
                    if (IsSuccess > 0)
                    {
                        //删除处置项关联信息
                        int HandleItemId = mapContext.Delete(DeleteMainData, Id);
                        if (HandleItemId > 0)
                        {
                            result = true;
                        }
                        else
                        {
                            result = false;
                        }
                    }
                    else
                    {
                        result = false;
                    }
                }
                else
                {   //删除处置项关联信息
                    int HandleItemId = mapContext.Delete(DeleteMainData, Id);
                    if (HandleItemId > 0)
                    {
                        result = true;
                    }
                    else
                    {
                        result = false;
                    }
                }

                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        /// <summary>
        /// 通过事件类型,园区ID以及时间配置查找事件预案
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<EventPlanAndTimeConfig> QueryEventPlanByEventIdAndTime(EventPlanQuery query)
        {
            try
            {
                string sql = IBatisHelper.GetRuntimeSql(mapContext, "QueryEventPlanByEventIdAndTime", query);
                return mapContext.QueryForList<EventPlanAndTimeConfig>("QueryEventPlanByEventIdAndTime", query).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 查看园区中是否存在预案
        /// </summary>
        /// <param name="eventRegion"></param>
        /// <returns></returns>
        public bool SeeIfThePlanExists(int eventRegion)
        {
            try
            {
                bool IsExists = false;
                List<ServEventPlanModel> EventPlanInfo = mapContext.QueryForList<ServEventPlanModel>("SeeIfThePlanExists", eventRegion).ToList();
                if(EventPlanInfo.Count()>0)
                {
                    IsExists = true;
                }
                return IsExists;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
