using CSM.Common;
using CSM.DAL;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL
{
    public class ServDevicePlanBLL
    {
        #region 设备预案管理
        private CSM.DAL.ServDevicePlanDAL servDevicePlanDAL = new CSM.DAL.ServDevicePlanDAL();
        private CSM.DAL.ServDeviceInfoDAL servDeviceInfoDAL = new ServDeviceInfoDAL();
        private CSM.DAL.ServPlanHandleItemDAL servPlanHandleItemDAL = new ServPlanHandleItemDAL();
        private CSM.DAL.ServPlanPersonDAL servPlanPersonDAL = new ServPlanPersonDAL();
        private CSM.DAL.ServPlanHandleItemCameraDAL servPlanHandleItemCameraDAL = new ServPlanHandleItemCameraDAL();
        private CSM.DAL.ServExecutionTimeDAL servExecutionTimeDAL = new ServExecutionTimeDAL();
        private CSM.DAL.BaseRegionConfigDAL baseRegionConfigDAL = new BaseRegionConfigDAL();

        /// <summary>
        /// 根据ID获取预案信息 2016.12.02 乔会会
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <returns>预案信息</returns>
        public CSM.Model.ServDevicePlanModel GetModelByID(int id)
        {
            return servDevicePlanDAL.GetEntity(id);
        }
        /// <summary>
        /// 获取所有的预案信息 2016.12.02 乔会会
        /// </summary>
        /// <returns>预案信息</returns>
        public List<ServDevicePlanModel> GetDevicePlan()
        {
            ServDevicePlanQuery servDevicePlanQuery = new ServDevicePlanQuery();
            return servDevicePlanDAL.GetEntities(servDevicePlanQuery);
        }
        /// <summary>
        /// 新增预案信息 2016.12.02 乔会会
        /// </summary>
        /// <param name="configModel"></param>
        /// <returns></returns>
        public int AddDevicePlan(ServDevicePlanModel configModel)
        {
            int id = servDevicePlanDAL.AddEntity(configModel);
            return id;
        }
        /// <summary>
        /// 修改预案信息 2016.12.02 乔会会
        /// </summary>
        /// <param name="servDevicePlanModel"></param>
        /// <returns></returns>
        public bool UpdateDevicePlan(ServDevicePlanModel servDevicePlanModel)
        {
            bool result = servDevicePlanDAL.UpdateEntity(servDevicePlanModel.id, servDevicePlanModel);
            return result;
        }
        /// <summary>
        /// 删除预案信息(预案信息只能废止) 2016.12.02 乔会会
        /// </summary>
        /// <param name="id">主键ID</param>
        /// <returns></returns>
        public bool DelteDevicePlan(int id)
        {
            try
            {
                return servDevicePlanDAL.DelEntity(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 分页查询获取设备预案 2016.12.04 乔会会
        /// </summary>
        /// <param name="servDevicePlanQuery"></param>
        /// <param name="pageSize">每页记录数</param>
        /// <param name="pageNumber">当前页码</param>
        /// <param name="totalNumber">共多少条</param>
        /// <returns></returns>
        public List<DevicePlanModel> GetEntities(ServDevicePlanQuery servDevicePlanQuery, int pageNumber, int pageSize, out int totalNumber)
        {
            try
            {
                List<ServDevicePlanModel> DevicePlanlist = new List<ServDevicePlanModel>();
                List<DevicePlanModel> devicePlanInfoList = new List<DevicePlanModel>();
                DevicePlanlist = servDevicePlanDAL.GetEntities(servDevicePlanQuery, pageSize, pageNumber, out totalNumber);
                DevicePlanModel devicePlanInfoModel;
                foreach (ServDevicePlanModel item in DevicePlanlist)
                {
                    devicePlanInfoModel = new DevicePlanModel();
                    devicePlanInfoModel.id = item.id;
                    devicePlanInfoModel.plan_code = item.plan_code;
                    devicePlanInfoModel.plan_name = item.plan_name;
                    devicePlanInfoModel.plan_level = item.plan_level;
                    //获取设备名称
                    var u = servDeviceInfoDAL.GetEntity(item.device_id);
                    devicePlanInfoModel.device_name = u == null ? "未知" : u.device_name;
                    devicePlanInfoModel.create_time = item.create_time;
                    //事发园区
                    if(u!=null)
                    {
                        var a = baseRegionConfigDAL.GetEntity(u.region_id);
                        devicePlanInfoModel.region_name = a == null ? "未知" : a.region_name;
                    }
                    else
                    {
                        devicePlanInfoModel.region_name = "未知";
                    }
                    devicePlanInfoModel.update_time = item.update_time;
                    if(item.plan_status!=(int)CSM.Common.EnumClass.PlanStatus.废止)
                    {
                        devicePlanInfoModel.planStatus = Enum.GetName(typeof(EnumClass.PlanStatus), item.plan_status);
                    }
                    //获取创建人名称
                    //var a = DeviceInfobll.GetPersonNameById(item.person_id);
                    //devicePlanInfoModel.person_name = a == null ? "未知" : a.person_name;
                    //devicePlanInfoModel.start_time = item.start_time;
                    //devicePlanInfoModel.end_time = item.end_time;
                    devicePlanInfoList.Add(devicePlanInfoModel);
                   
                }
                return devicePlanInfoList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 判断时间是不是被占用  2017/2/24 乔会会
        /// </summary>
        /// <param name="eventPlanId"></param>
        /// <param name="eventTypeId"></param>
        /// <param name="regionId"></param>
        /// <param name="planTime"></param>
        /// <param name="executionCycle"></param>
        /// <returns></returns>
        public List<DevicePlanModel> IsCheckTimeOccupied(int devicePlanId, int deviceId, string planTime, string executionCycle, string addEndTime)
        {
            try
            {
                List<DevicePlanModel> devicePlanInfoList = new List<DevicePlanModel>();
                List<DevicePlanModel> entity = servDevicePlanDAL.IsCheckTimeOccupied(devicePlanId, deviceId, planTime, executionCycle, addEndTime);
                if (entity != null)
                {
                    for (var i = 0; i < entity.Count; i++)
                    {
                        //判断数据库存在的周期表达式 是否有交集
                        if (IsExist(entity[i].execution_cycle, executionCycle))
                        {
                            devicePlanInfoList.Add(entity[i]);
                        }
                    }
                    return devicePlanInfoList;
                }
                else
                {
                    return null;
                }


            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #region 判断两个表达式是否存在交集,2017/2/24 乔会会

        /// <summary>
        /// 判断两个表达式是否存在交集 2017/2/24 乔会会
        /// </summary>
        /// <param name="expressionOne">表达式1：数据库字段</param>
        /// <param name="expressionTwo">表达式2：页面传入数据</param>
        /// <returns></returns>
        public bool IsExist(string expressionOne, string expressionTwo)
        {
            var datetimeOne = expressionOne.Split('|');
            var datetimeTwo = expressionTwo.Split('|');
            //组合所有规则返回的数值
            var yearOne = "";
            var yearTwo = "";
            if (CommaRule(datetimeOne[2]) != null)
            {
                yearOne = CommaRule(datetimeOne[2]).Concat(UnderlineRule(datetimeOne[2])).ToString();
            }
            if (CommaRule(datetimeTwo[2]) != null)
            {
                yearTwo = CommaRule(datetimeTwo[2]).Concat(UnderlineRule(datetimeTwo[2])).ToString();
            }
            //判断两个集合是否存在交集
            if (yearOne.Intersect(yearTwo).ToList().Count > 0 | datetimeOne[2] == "*" | datetimeTwo[2] == "*")
            {

                var monthOne = "";
                var monthTwo = "";
                if (CommaRule(datetimeOne[1]) != null)
                {
                    monthOne = CommaRule(datetimeOne[1]).Concat(UnderlineRule(datetimeOne[1])).ToString();
                }
                if (CommaRule(datetimeTwo[1]) != null)
                {
                    monthTwo = CommaRule(datetimeTwo[1]).Concat(UnderlineRule(datetimeTwo[1])).ToString();
                }
                if (monthOne.Intersect(monthTwo).ToList().Count > 0 | datetimeOne[1] == "*" | datetimeTwo[1] == "*")
                {
                    if (datetimeOne[0] == "*" | datetimeTwo[0] == "*" | datetimeOne[3] == "*" | datetimeTwo[3] == "*")
                    {
                        return true;
                    }
                    IEnumerable<string> dayOne = null;
                    IEnumerable<string> dayTwo = null;
                    IEnumerable<string> weekOne = null;
                    IEnumerable<string> weekTwo = null;
                    if ((datetimeOne[0] == "?" && datetimeTwo[0] == "?") | (datetimeOne[3] == "?" && datetimeTwo[3] == "?"))
                    {
                        if (CommaRule(datetimeOne[0]) != null)
                        {
                            dayOne = CommaRule(datetimeOne[0]).Concat(UnderlineRule(datetimeOne[0]));
                        }
                        if (CommaRule(datetimeTwo[0]) != null)
                        {
                            dayTwo = CommaRule(datetimeTwo[0]).Concat(UnderlineRule(datetimeTwo[0]));
                        }
                        if (CommaRule(datetimeOne[3]) != null)
                        {
                            weekOne = CommaRule(datetimeOne[3]).Concat(UnderlineRule(datetimeOne[3]));
                        }
                        if (CommaRule(datetimeTwo[3]) != null)
                        {
                            weekTwo = CommaRule(datetimeTwo[3]).Concat(UnderlineRule(datetimeTwo[3]));
                        }
                        if (dayOne.Intersect(dayTwo).ToList().Count > 0 || weekOne.Intersect(weekTwo).ToList().Count > 0)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                    else
                    {
                        if (CommaRule(datetimeOne[0]) != null)
                        {
                            dayOne = CommaRule(datetimeOne[0]).Concat(UnderlineRule(datetimeOne[0]));
                        }
                        if (CommaRule(datetimeTwo[0]) != null)
                        {
                            dayTwo = CommaRule(datetimeTwo[0]).Concat(UnderlineRule(datetimeTwo[0]));
                        }
                        if (CommaRule(datetimeOne[3]) != null)
                        {
                            weekOne = CommaRule(datetimeOne[3]).Concat(UnderlineRule(datetimeOne[3]));
                        }
                        if (CommaRule(datetimeTwo[3]) != null)
                        {
                            weekTwo = CommaRule(datetimeTwo[3]).Concat(UnderlineRule(datetimeTwo[3]));
                        }
                        foreach (var item in weekOne)
                        {
                            dayOne = dayOne.Concat(WeekToDay(item));
                        }
                        foreach (var item in weekTwo)
                        {
                            dayTwo = dayTwo.Concat(WeekToDay(item));
                        }
                        if (dayOne.Intersect(dayTwo).ToList().Count > 0)
                        {
                            return true;
                        }
                        else
                        {
                            return false;
                        }
                    }
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
        /// <summary>
        /// 按逗号规则转化 2017/2/24 乔会会
        /// </summary>
        /// <param name="str">年|月|日|周</param>
        /// <returns></returns>
        public string[] CommaRule(string str)
        {
            if (str.IndexOf(",") != -1)
            {
                var nums = str.Split(',');
                return nums;
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 按下划线规则转化 2017/2/24 乔会会
        /// </summary>
        /// <param name="str">年|月|日|周</param>
        /// <returns></returns>
        public string[] UnderlineRule(string str)
        {
            if (str.IndexOf("_") != -1)
            {
                var nums = str.Split('_');
                string[] arr = new string[] { };
                for (int i = Convert.ToInt32(nums[0]); i <= Convert.ToInt32(nums[1]); i++)
                {
                    arr[i] = i.ToString();
                }
                return arr;
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 周转日 2017/2/24 乔会会
        /// </summary>
        /// <param name="num">周</param>
        /// <returns></returns>
        public string[] WeekToDay(string num)
        {
            string[] arr = new string[] { };
            int j = 0;
            var end = Convert.ToInt32(num) * 7;
            var star = end - 6;
            for (int i = star; i <= end; i++)
            {
                arr[j] = star.ToString();
                j++;
            }
            return arr;
        }

        #endregion
      
        /// <summary>
        /// 获取最后条预案信息
        /// </summary>
        /// <returns></returns>
        public ServDevicePlanModel GetLastDevicePlan()
        {
            try
            {
                ServDevicePlanModel entity = servDevicePlanDAL.GetLastDevicePlan();
                return entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 添加预案信息
        /// </summary>
        /// <param name="entity">预案信息</param>
        /// <param name="defaultPlanHandleItemList">默认处置项</param>
        /// <param name="cnfirmPlanHandleItemList">确认处置项</param>
        /// <param name="defaultPersonList">默认处置项通知其他责任人</param>
        /// <param name="cnfirmPlanPersonList">确认处置项通知其他责任人</param>
        /// <param name="servPlanHandleItemCameraList">关联摄像头</param>
        /// <returns></returns>
        public bool AddDevicePlanInfo(ServDevicePlanModel entity, ServExecutionTimeModel servExecutionTime, List<ServPlanHandleItemModel> defaultPlanHandleItemList, List<ServPlanHandleItemModel> cnfirmPlanHandleItemList, List<ServPlanPersonModel> defaultPersonList, List<ServPlanPersonModel> cnfirmPlanPersonList, List<ServPlanHandleItemCameraModel> servPlanHandleItemCameraList)
        {
      
            bool result = false;
            try
            {
                DevicePlanRelationInfoModel devicePlanRelationInfoModel = new DevicePlanRelationInfoModel();
                devicePlanRelationInfoModel.servExecutionTime = servExecutionTime;
                devicePlanRelationInfoModel.entity = entity;
                devicePlanRelationInfoModel.defaultPlanHandleItemList = defaultPlanHandleItemList;
                devicePlanRelationInfoModel.cnfirmPlanHandleItemList = cnfirmPlanHandleItemList;
                devicePlanRelationInfoModel.cnfirmPlanPersonList = cnfirmPlanPersonList;
                devicePlanRelationInfoModel.defaultPersonList = defaultPersonList;
                devicePlanRelationInfoModel.servPlanHandleItemCameraList = servPlanHandleItemCameraList;
                result = servDevicePlanDAL.AddDevicePlan(devicePlanRelationInfoModel);
                return result;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 批量添加预案信息
        /// </summary>
        /// <param name="entity">预案信息</param>
        /// <param name="defaultPlanHandleItemList">默认处置项</param>
        /// <param name="cnfirmPlanHandleItemList">确认处置项</param>
        /// <param name="defaultPersonList">默认处置项通知其他责任人</param>
        /// <param name="cnfirmPlanPersonList">确认处置项通知其他责任人</param>
        /// <param name="servPlanHandleItemCameraList">关联摄像头</param>
        /// <returns></returns>
        public bool BatchAddDevicePlanData(List<ServDevicePlanModel> entity, ServExecutionTimeModel servExecutionTime, List<ServPlanHandleItemModel> defaultPlanHandleItemList, List<ServPlanHandleItemModel> cnfirmPlanHandleItemList, List<ServPlanPersonModel> defaultPersonList, List<ServPlanPersonModel> cnfirmPlanPersonList, List<ServPlanHandleItemCameraModel> servPlanHandleItemCameraList)
        {

            bool result = false;
            try
            {
                DevicePlanRelationInfoModel devicePlanRelationInfoModel = new DevicePlanRelationInfoModel();
                devicePlanRelationInfoModel.servExecutionTime = servExecutionTime;
                devicePlanRelationInfoModel.entityList = entity;
                devicePlanRelationInfoModel.defaultPlanHandleItemList = defaultPlanHandleItemList;
                devicePlanRelationInfoModel.cnfirmPlanHandleItemList = cnfirmPlanHandleItemList;
                devicePlanRelationInfoModel.cnfirmPlanPersonList = cnfirmPlanPersonList;
                devicePlanRelationInfoModel.defaultPersonList = defaultPersonList;
                devicePlanRelationInfoModel.servPlanHandleItemCameraList = servPlanHandleItemCameraList;
                result = servDevicePlanDAL.BatchAddDevicePlanData(devicePlanRelationInfoModel);
                return result;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取预案信息
        /// </summary>
        /// <param name="devicePlanId"></param>
        /// <param name="planType"></param>
        /// <returns></returns>
        public DevicePlanRelationInfoModel GetDevicePlanInfo(int devicePlanId,int planType)
        {
           
            try
            {
                //获取预案信息
                ServDevicePlanModel entity = servDevicePlanDAL.GetEntity(devicePlanId);
                //园区信息
                BaseRegionConfigModel regionInfo = baseRegionConfigDAL.GetRegionConfigInfo(entity.device_id);
                //获取时间信息
                ServExecutionTimeModel ServExecutionTime = servExecutionTimeDAL.GetTimeEntity(devicePlanId, planType);
                //获取处置项信息
                List<ServPlanHandleItemModel> PlanHandleItemList = servPlanHandleItemDAL.GetPlanHandleItem(devicePlanId, planType);
                //预案确警前处置项
                List<ServPlanHandleItemModel> defaultPlanHandleItemList = new List<ServPlanHandleItemModel>();
                //预案确警后处置项
                List<ServPlanHandleItemModel> cnfirmPlanHandleItemList = new List<ServPlanHandleItemModel>();
                //预案确警前责任人关联表
                List<ServPlanPersonModel> defaultPersonList = new List<ServPlanPersonModel>();
                //预案确警后责任人关联表
                List<ServPlanPersonModel> cnfirmPlanPersonList = new List<ServPlanPersonModel>();
                //获取关联摄像头信息
                List<ServPlanHandleItemCameraModel> servPlanHandleItemCameraList = new List<ServPlanHandleItemCameraModel>();
                if (PlanHandleItemList.Count()>0)
                {
                    for(var i=0;i< PlanHandleItemList.Count();i++)
                    {
                        if(PlanHandleItemList[i].item_type==(int)CSM.Common.EnumClass.DevicePlanDefaultOptions.通知其他负责人 && PlanHandleItemList[i].confirm_type == (int)CSM.Common.EnumClass.PlanHandleTime.确警前)
                        {
                            defaultPersonList = servPlanPersonDAL.GetPlanPersonInfo(PlanHandleItemList[i].id);
                        }
                        else if(PlanHandleItemList[i].item_type == (int)CSM.Common.EnumClass.DevicePlanConfirmOptions.通知其他负责人 && PlanHandleItemList[i].confirm_type == (int)CSM.Common.EnumClass.PlanHandleTime.确警后)
                        {
                            cnfirmPlanPersonList = servPlanPersonDAL.GetPlanPersonInfo(PlanHandleItemList[i].id);
                        }
                        else if(PlanHandleItemList[i].item_type == (int)CSM.Common.EnumClass.DevicePlanDefaultOptions.关联摄像头)
                        {
                            servPlanHandleItemCameraList = servPlanHandleItemCameraDAL.GetPlanHandleItemCamera(PlanHandleItemList[i].id);
                        }
                        if(PlanHandleItemList[i].confirm_type== (int)CSM.Common.EnumClass.PlanHandleTime.确警前)
                        {
                            defaultPlanHandleItemList.Add(PlanHandleItemList[i]);
                        }
                        else if(PlanHandleItemList[i].confirm_type == (int)CSM.Common.EnumClass.PlanHandleTime.确警后)
                        {
                            cnfirmPlanHandleItemList.Add(PlanHandleItemList[i]);
                        }
                    }
                }

                DevicePlanRelationInfoModel model = new DevicePlanRelationInfoModel();
                model.entity = entity;
                model.servExecutionTime = ServExecutionTime;
                model.BaseRegionConfigInfo = regionInfo;
                model.defaultPlanHandleItemList = defaultPlanHandleItemList;
                model.cnfirmPlanHandleItemList = cnfirmPlanHandleItemList;
                model.cnfirmPlanPersonList = cnfirmPlanPersonList;
                model.defaultPersonList = defaultPersonList;
                model.servPlanHandleItemCameraList = servPlanHandleItemCameraList;
                return model;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改预案信息
        /// </summary>
        /// <param name="entity">预案信息</param>
        /// <param name="defaultPlanHandleItemList">默认处置项</param>
        /// <param name="cnfirmPlanHandleItemList">确认处置项</param>
        /// <param name="defaultPersonList">默认处置项通知其他责任人</param>
        /// <param name="cnfirmPlanPersonList">确认处置项通知其他责任人</param>
        /// <param name="servPlanHandleItemCameraList">关联摄像头</param>
        /// <returns></returns>
        public bool UpdateDevicePlanInfo(ServDevicePlanModel entity, ServExecutionTimeModel executionTimeInfo, List<ServPlanHandleItemModel> defaultPlanHandleItemList, List<ServPlanHandleItemModel> cnfirmPlanHandleItemList, List<ServPlanPersonModel> defaultPersonList, List<ServPlanPersonModel> cnfirmPlanPersonList, List<ServPlanHandleItemCameraModel> servPlanHandleItemCameraList)
        {

            bool result = false;
            try
            {
                DevicePlanRelationInfoModel devicePlanRelationInfoModel = new DevicePlanRelationInfoModel();
                devicePlanRelationInfoModel.entity = entity;
                devicePlanRelationInfoModel.servExecutionTime = executionTimeInfo;
                devicePlanRelationInfoModel.defaultPlanHandleItemList = defaultPlanHandleItemList;
                devicePlanRelationInfoModel.cnfirmPlanHandleItemList = cnfirmPlanHandleItemList;
                devicePlanRelationInfoModel.cnfirmPlanPersonList = cnfirmPlanPersonList;
                devicePlanRelationInfoModel.defaultPersonList = defaultPersonList;
                devicePlanRelationInfoModel.servPlanHandleItemCameraList = servPlanHandleItemCameraList;
                result = servDevicePlanDAL.UpdateDevicePlan(devicePlanRelationInfoModel);
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
        /// <returns></returns>
        public bool UpdateDevicePlanStatus(int Id,string PlanStatus,int eventRegion)
        {
            bool result = false;
            try
            {
                if (PlanStatus== "未启用")
                {
                   int  planStatus =(int)CSM.Common.EnumClass.PlanStatus.未启用;
                    result= servDevicePlanDAL.UpdateDevicePlanStatus(Id, planStatus, eventRegion);
                }
                else if(PlanStatus =="启用")
                {
                    int planStatus =(int)CSM.Common.EnumClass.PlanStatus.启用;
                    result = servDevicePlanDAL.UpdateDevicePlanStatus(Id, planStatus, eventRegion);
                }
               
                return result;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<ServDevicePlanModel> ViewRelatedPlans(int deviceId)
        {
            try
            {
                List<ServDevicePlanModel> entity = servDevicePlanDAL.ViewRelatedPlans(deviceId);
                return entity;
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
                bool IsExists = servDevicePlanDAL.SeeIfThePlanExists(eventRegion);
                return IsExists;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #endregion
    }
}
