using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
using CSM.Model.CustomModel;
using CSM.Utils;
using static CSM.Common.EnumClass;

namespace CSM.DAL
{
    //Serv_Device_Plan
    public class ServDevicePlanDAL : MapContext, IDataFactory<CSM.Model.ServDevicePlanModel, ServDevicePlanQuery>
    {
        /// <summary>
        /// 增加一条数据
        /// </summary>
        /// <param name="entity"></param>
        public int AddEntity(ServDevicePlanModel entity)
        {
            int id = (int)mapContext.Insert("InsertDevicePlan", entity);
            return id;
        }
        /// <summary>
        /// 删除一条数据
        /// </summary>
        /// <param name="id"></param>
        public int DeleteDevicePlanById(int id)
        {
            int result = mapContext.Delete("DeleteDevicePlanById", id);

            return result;
        }


        /// <summary>
        /// 更新一条数据
        /// </summary>
        /// <param name="model"></param>
        public int UpdateDevicePlanById(ServDevicePlanModel model)
        {

            int result = mapContext.Update("UpdateDevicePlanById", model);
            return result;
        }


        /// <summary>
        /// 废止预案信息plan_status为-1为废止  2016.12.06 乔会会
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool DelEntity(int id)
        {
            try
            {
                int result = mapContext.Delete("AbolishDevicePlanById", id);
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
        /// 查询全部
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<ServDevicePlanModel> GetEntities(ServDevicePlanQuery query)
        {
            List<ServDevicePlanModel> list = mapContext.QueryForList<ServDevicePlanModel>("GetDevicePlan", query).ToList();
            return list;
        }
        /// <summary>
        /// 分页查询
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageSize">每页条数</param>
        /// <param name="pageNumber">页数</param>
        /// <param name="totalNumber">总数</param>
        /// <returns></returns>
        public List<ServDevicePlanModel> GetEntities(ServDevicePlanQuery query, int pageSize, int pageNumber, out int totalNumber)
        {

            try
            {
                string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "DevicePlanCount", query);
                totalNumber = mapContext.QueryForObject<int>("DevicePlanCount", query);
                query.pageSize = pageSize;
                query.pageNumber = pageNumber;
                string sql1 = IBatisHelper.GetRuntimeSql(this.mapContext, "DevicePlanPage", query);
                List<ServDevicePlanModel> list = mapContext.QueryForList<ServDevicePlanModel>("DevicePlanPage", query).ToList();
                return list;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据预案id获取预案信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServDevicePlanModel GetEntity(int id)
        {
            try
            {
                ServDevicePlanModel DevicePlanInfo = mapContext.QueryForObject<ServDevicePlanModel>("GetDevicePlanById", id);
                return DevicePlanInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool UpdateEntity(int id, ServDevicePlanModel newentity)
        {
            throw new NotImplementedException();
        }
        /// <summary>
        /// 查看时间是否被占用
        /// </summary>
        /// <param name="deviceId"></param>
        /// <param name="planTime"></param>
        /// <returns></returns>
        public List<DevicePlanModel> IsCheckTimeOccupied(int devicePlanId, int deviceId, string planTime, string executionCycle, string endTime)
        {
            try
            {
                DevicePlanModel devicePlanInfo = new DevicePlanModel();
                List<DevicePlanModel> devicePlanInfoList = new List<DevicePlanModel>();
                devicePlanInfo.device_id = deviceId;
                devicePlanInfo.start_time = planTime;
                devicePlanInfo.id = devicePlanId;
                devicePlanInfo.end_time = endTime;
                devicePlanInfo.execution_cycle = executionCycle;
                devicePlanInfo.type = (int)RelateType.设备预案;
                devicePlanInfo.plan_status = (int)PlanStatus.废止;
                if (endTime == "")
                {
                    if (devicePlanId == -1)
                    {
                        string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "IsTimeOccupied", devicePlanInfo);
                        devicePlanInfoList = mapContext.QueryForList<DevicePlanModel>("IsTimeOccupied", devicePlanInfo).ToList();
                    }
                    else
                    {
                        devicePlanInfoList = mapContext.QueryForList<DevicePlanModel>("UpdateIsTimeOccupied", devicePlanInfo).ToList();
                    }
                }
                else
                {
                    if (devicePlanId == -1)
                    {
                        devicePlanInfoList = mapContext.QueryForList<DevicePlanModel>("IsVerificationTimeOccupy", devicePlanInfo).ToList();
                    }
                    else
                    {
                        devicePlanInfoList = mapContext.QueryForList<DevicePlanModel>("UpdateVerificationTimeOccupy", devicePlanInfo).ToList();
                    }
                }

                return devicePlanInfoList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 查看设备预案是否存在  封传波  2016-12-22
        /// </summary>
        /// <param name="deviceId">设备ID</param>
        /// <param name="planTime">时间</param>
        /// <param name="status">状态</param>
        /// <returns></returns>
        public ServDevicePlanModel CheckDevicePlanIsExist(int deviceId, string planTime, int status)
        {
            try
            {
                ServDevicePlanModel devicePlanModel = new ServDevicePlanModel();
                devicePlanModel.device_id = deviceId;
                //devicePlanModel.start_time = planTime;
                devicePlanModel.plan_status = status;
                devicePlanModel = mapContext.QueryForObject<ServDevicePlanModel>("DevicePlanIsExist", devicePlanModel);
                return devicePlanModel;
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
        public ServDevicePlanModel GetLastDevicePlan()
        {
            try
            {
                ServDevicePlanQuery query = new ServDevicePlanQuery();

                ServDevicePlanModel entity = mapContext.QueryForObject<ServDevicePlanModel>("GetLastDevicePlan", query);
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
        public bool AddDevicePlan(DevicePlanRelationInfoModel devicePlanRelationInfoModel)
        {
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            try
            {
                bool result = false;
                //向预案信息表中添加预案信息
                int planId = (int)mapContext.Insert("InsertDevicePlan", devicePlanRelationInfoModel.entity);
                if (planId > 0)
                {
                    result = AddRelatedInfo(planId, devicePlanRelationInfoModel);
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
        /// 修改预案信息
        /// </summary>
        /// <param name="devicePlanRelationInfoModel"></param>
        /// <returns></returns>
        public bool UpdateDevicePlan(DevicePlanRelationInfoModel devicePlanRelationInfoModel)
        {
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            try
            {
                bool result = false;
                //修改预案信息.Insert
                string sql = IBatisHelper.GetRuntimeSql(this.mapContext, "UpdatePartDevicePlanById", devicePlanRelationInfoModel.entity);
                int planId = (int)mapContext.Update("UpdatePartDevicePlanById", devicePlanRelationInfoModel.entity);
                if (planId > 0)
                {
                    int executionTimeId = (int)mapContext.Delete("DeleteServExecutionTime", devicePlanRelationInfoModel.servExecutionTime);
                    if (executionTimeId > 0)
                    {
                        ServPlanHandleItemModel servPlanHandleItemModel = new ServPlanHandleItemModel();
                        servPlanHandleItemModel.plan_id = devicePlanRelationInfoModel.entity.id;
                        servPlanHandleItemModel.plan_type = (int)PlanType.设备预案;
                        List<ServPlanHandleItemModel> PlanHandleItem = mapContext.QueryForList<ServPlanHandleItemModel>("GetPlanHandleItemByPlanId", servPlanHandleItemModel).ToList();
                        for (int a = 0; a < PlanHandleItem.Count(); a++)
                        {
                            if (PlanHandleItem[a].item_type == (int)DevicePlanDefaultOptions.通知其他负责人 && PlanHandleItem[a].confirm_type == (int)PlanHandleTime.确警前)
                            {   //删除默认处置项中的通知其他责任人信息
                                result = DeleteRelatedInfo("DeletePlanPersonByHandleId", "DeletePlanHandleItemById", PlanHandleItem[a].id);
                                if (result == false)
                                {
                                    break;
                                }
                            }
                            else if (PlanHandleItem[a].item_type == (int)DevicePlanConfirmOptions.通知其他负责人 && PlanHandleItem[a].confirm_type == (int)PlanHandleTime.确警后)
                            {
                                //删除确警后处置项中的通知其他责任人信息
                                result = DeleteRelatedInfo("DeletePlanPersonByHandleId", "DeletePlanHandleItemById", PlanHandleItem[a].id);
                                if (result == false)
                                {
                                    break;
                                }
                            }
                            else if (PlanHandleItem[a].item_type == (int)DevicePlanDefaultOptions.关联摄像头 && PlanHandleItem[a].confirm_type == (int)PlanHandleTime.确警前)
                            {
                                //删除默认处置项中的摄像头信息
                                result = DeleteRelatedInfo("DeletePlanHandleItemCameraHandleId", "DeletePlanHandleItemById", PlanHandleItem[a].id);
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
                        result = AddRelatedInfo(devicePlanRelationInfoModel.entity.id, devicePlanRelationInfoModel);
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
        /// 删除Serv_Plan_Person表,Serv_Plan_HandleItem表, Serv_Plan_HandleItemCamera表对应信息
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
                {   //删除通知其他责任人信息或者关联摄像头
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
        /// 向预案处置项关联摄像头表，预案责任人关联表，预案处置项表表中添加相应信息
        /// </summary>
        /// <param name="Planid">预案id</param>
        /// <param name="devicePlanRelationInfoModel"></param>
        /// <returns></returns>
        public bool AddRelatedInfo(int Planid, DevicePlanRelationInfoModel devicePlanRelationInfoModel)
        {
            bool result = false;
            try
            {
                #region 向Serv_Execution_Time添加时间信息
                devicePlanRelationInfoModel.servExecutionTime.relate_id = Planid;
                int TimeId = (int)mapContext.Insert("InsertServExecutionTime", devicePlanRelationInfoModel.servExecutionTime);
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
                    for (int i = 0; i < devicePlanRelationInfoModel.defaultPlanHandleItemList.Count(); i++)
                    {

                        devicePlanRelationInfoModel.defaultPlanHandleItemList[i].plan_id = Planid;
                        int deviceHandleItemId = devicePlanRelationInfoModel.defaultPlanHandleItemList[i].item_type;
                        #region 向Serv_Plan_Person添加确警前其他责任人信息
                        if (deviceHandleItemId == (int)DevicePlanDefaultOptions.通知其他负责人)
                        {
                            int HandleId = (int)mapContext.Insert("InsertPlanHandleItem", devicePlanRelationInfoModel.defaultPlanHandleItemList[i]);
                            if (HandleId > 0)
                            {
                                //向Serv_Plan_Person添加确警前其他责任人信息
                                List<ServPlanPersonModel> defaultPersonlist = devicePlanRelationInfoModel.defaultPersonList as List<ServPlanPersonModel>;
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

                        #region 向Serv_Plan_HandleItemCamera添加摄像头信息
                        else if (deviceHandleItemId == (int)DevicePlanDefaultOptions.关联摄像头)
                        {
                            int HandleId = (int)mapContext.Insert("InsertPlanHandleItem", devicePlanRelationInfoModel.defaultPlanHandleItemList[i]);
                            if (HandleId > 0)
                            {
                                //向Serv_Plan_HandleItemCamera添加摄像头信息
                                List<ServPlanHandleItemCameraModel> Cameralist = devicePlanRelationInfoModel.servPlanHandleItemCameraList as List<ServPlanHandleItemCameraModel>;
                                for (int f = 0; f < Cameralist.Count(); f++)
                                {
                                    Cameralist[f].handleitem_id = HandleId;
                                }
                                if (Cameralist.Count > 0)
                                {
                                    int CameraId = (int)mapContext.Insert("BatchAddPlanHandleItemCamera", Cameralist);
                                    if (CameraId > 0)
                                    {
                                        result = true;
                                    }
                                    else
                                    {

                                        result = false;
                                    }
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
                            int HandleId = (int)mapContext.Insert("InsertPlanHandleItem", devicePlanRelationInfoModel.defaultPlanHandleItemList[i]);
                            if (HandleId > 0)
                            {
                                result = true;
                            }
                            else
                            {
                                result = false;
                                break;
                            }
                        }
                    }
                    #endregion
                    if (result == true)
                    {
                        #region 向Serv_Plan_HandleItem添加确警后处置选项
                        for (int i = 0; i < devicePlanRelationInfoModel.cnfirmPlanHandleItemList.Count(); i++)
                        {
                            //向Serv_Plan_HandleItem添加确警后处置选项
                            devicePlanRelationInfoModel.cnfirmPlanHandleItemList[i].plan_id = Planid;
                            int deviceHandleItemId = devicePlanRelationInfoModel.cnfirmPlanHandleItemList[i].item_type;
                            if (deviceHandleItemId == (int)DevicePlanConfirmOptions.通知其他负责人)
                            {
                                int HandleId = (int)mapContext.Insert("InsertPlanHandleItem", devicePlanRelationInfoModel.cnfirmPlanHandleItemList[i]);
                                if (HandleId > 0)
                                {
                                    //向Serv_Plan_Person添加确警前其他责任人信息
                                    List<ServPlanPersonModel> cnfirmPersonlist = devicePlanRelationInfoModel.cnfirmPlanPersonList as List<ServPlanPersonModel>;
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
                                int HandleId = (int)mapContext.Insert("InsertPlanHandleItem", devicePlanRelationInfoModel.cnfirmPlanHandleItemList[i]);
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
        /// 修改预案状态
        /// </summary>
        /// <param name="Id"></param>
        /// <param name="PlanStatus"></param>
        /// <returns></returns>
        public bool UpdateDevicePlanStatus(int Id, int PlanStatus,int eventRegion)
        {
            try
            {
                ServDevicePlanQuery devicePlanQuery = new ServDevicePlanQuery();
                devicePlanQuery.id = Id;
                devicePlanQuery.plan_status = PlanStatus;
                devicePlanQuery.region_id = eventRegion;
                int result = -1;
                if (devicePlanQuery.id == -1)
                {
                    result = mapContext.Update("UpdateNotAbolishedDevicePlan", devicePlanQuery);
                }
                else
                {
                    result = mapContext.Update("UpdateDevicePlanStatus", devicePlanQuery);
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
        /// 根据时间和设备ID获取设备预案
        /// </summary>
        /// <param name="query"></param>
        /// <returns></returns>
        public List<DevicePlanAndTimeConfig> QueryDevicePlanByDeviceIdAndTime(DevicePlanQuery query)
        {
            try
            {
                string sql = IBatisHelper.GetRuntimeSql(mapContext, "QueryDevicePlanByDeviceIdAndTime", query);
                return mapContext.QueryForList<DevicePlanAndTimeConfig>("QueryDevicePlanByDeviceIdAndTime", query).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据设备id获取相关预案
        /// </summary>
        /// <param name="deviceId"></param>
        /// <returns></returns>
        public List<ServDevicePlanModel> ViewRelatedPlans(int deviceId)
        {
            try
            {
               
                return mapContext.QueryForList<ServDevicePlanModel>("ViewRelatedPlans", deviceId).ToList();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 批量添加预案
        /// </summary>
        /// <param name="devicePlanRelationInfoModel"></param>
        /// <returns></returns>
        public bool BatchAddDevicePlanData(DevicePlanRelationInfoModel devicePlanRelationInfoModel)
        {
            mapContext.BeginTransaction(System.Data.IsolationLevel.ReadUncommitted);//创建事务
            try
            {
                bool result = false;
                //向预案信息表中添加预案信息
                for (var i = 0; i < devicePlanRelationInfoModel.entityList.Count(); i++)
                {
                    int planId = (int)mapContext.Insert("InsertDevicePlan", devicePlanRelationInfoModel.entityList[i]);
                    if (planId > 0)
                    {
                        result = AddRelatedInfo(planId, devicePlanRelationInfoModel);
                    }
                    else
                    {
                        mapContext.RollBackTransaction();
                        result = false;
                    }
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
            /// 查看园区中是否存在预案
            /// </summary>
            /// <param name="eventRegion"></param>
            /// <returns></returns>
        public bool SeeIfThePlanExists(int eventRegion)
        {
            try
            {
                bool IsExists = false;
                List<ServDevicePlanModel> devicePlanInfo = mapContext.QueryForList<ServDevicePlanModel>("SeeIfTheDevicePlanExists", eventRegion).ToList();
                if (devicePlanInfo.Count() > 0)
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



