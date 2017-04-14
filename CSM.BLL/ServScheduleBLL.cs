using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CSM.Model;
using CSM.Model.QueryModel;
using CSM.Model.CustomModel;
using CSM.Utils;
using CSM.DAL;
using CSM.Common;

namespace CSM.BLL
{
    public class ServScheduleBLL
    {
        private ServScheduleDAL servScheduleDal = new ServScheduleDAL();
        /// <summary>
        ///分页查询计划任务
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="scheduleName"></param>
        /// <param name="regionId"></param>
        /// <param name="scheduleState"></param>
        /// <param name="validStartTime"></param>
        /// <param name="validEndTime"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<ServScheduleModel> GetEntitiesByPage(int pageIndex, int pageSize, string scheduleName, int regionId, int scheduleType, int scheduleState, string validStartTime, string validEndTime, out int totalNumber)
        {
            try
            {
                ServScheduleQuery query = new ServScheduleQuery();
                query.eEndTime = validEndTime;
                query.pageIndex = pageIndex;
                query.pageSize = pageSize;
                query.regionId = regionId;
                query.scheduleName = scheduleName;
                query.scheduleState = scheduleState;
                query.scheduleType = scheduleType;
                query.sEndTime = validStartTime;
                List<ServScheduleModel> list = servScheduleDal.GetEntitiesByPage(query, out totalNumber);
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 分页查询获取视频巡更计划任务
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="scheduleName"></param>
        /// <param name="regionId"></param>
        /// <param name="scheduleType"></param>
        /// <param name="scheduleState"></param>
        /// <param name="validStartTime"></param>
        /// <param name="validEndTime"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<RetCameraPatrolSchedule> GetCameraPatrolSchedule(int pageIndex, int pageSize, string scheduleName, int regionId, int scheduleType, int scheduleState, string validStartTime, string validEndTime, out int totalNumber)
        {
            try
            {
                List<RetCameraPatrolSchedule> retList = new List<RetCameraPatrolSchedule>();
                RetCameraPatrolSchedule retModel = null;
                BaseRegionConfigDAL baseRegionConfigDal = new BaseRegionConfigDAL();
                ServScheduleTimeConfigDAL scheduleTimeConfigDal = new ServScheduleTimeConfigDAL();
                ServScheduleQuery query = new ServScheduleQuery();
                query.eEndTime = validEndTime;
                query.pageIndex = pageIndex;
                query.pageSize = pageSize;
                query.regionId = regionId;
                query.scheduleName = scheduleName;
                query.scheduleState = scheduleState;
                query.scheduleType = scheduleType;
                query.sEndTime = validStartTime;
                //分页获视频巡更计划任务
                List<CameraPatrolSchedule> cameraPatrolScheduleList = servScheduleDal.GetCameraPatrolScheduleByPage(query, out totalNumber);
                //获取全部园区配置
                List<BaseRegionConfigModel> regionConfigList = baseRegionConfigDal.GetAllRegionConfig();
                //查询园区名称
                for (int i = 0; i < cameraPatrolScheduleList.Count; i++)
                {
                    retModel = new RetCameraPatrolSchedule();
                    retModel.content = cameraPatrolScheduleList[i].content;
                    retModel.create_time = cameraPatrolScheduleList[i].create_time;
                    retModel.span_time = cameraPatrolScheduleList[i].span_time;
                    retModel.cronTime = CSM.Utils.TimeExpression.GetCronTimeModel(cameraPatrolScheduleList[i].period_expression);//生成时间表达式model
                    #region 查询时间配置
                    ServScheduleTimeConfigQuery timeQuery = new ServScheduleTimeConfigQuery();
                    timeQuery.schedule_id = cameraPatrolScheduleList[i].id;
                    timeQuery.time_type = 1;//查询开始时间
                    ServScheduleTimeConfigModel timeModel = scheduleTimeConfigDal.GetScheduleTimeConfigByIdAndTimeType(timeQuery).FirstOrDefault();
                    retModel.start_execute_time = timeModel == null ? "" : timeModel.schedule_time;
                    retModel.execute_date = timeModel == null ? "" : timeModel.schedule_date;
                    #endregion
                    retModel.end_execute_time = "";
                    retModel.end_time = cameraPatrolScheduleList[i].end_time;
                    retModel.ext1 = cameraPatrolScheduleList[i].ext1;
                    // retModel.ext10 = cameraPatrolScheduleList[i].ext10;
                    retModel.ext2 = cameraPatrolScheduleList[i].ext2;
                    retModel.ext3 = cameraPatrolScheduleList[i].ext3;
                    retModel.ext4 = cameraPatrolScheduleList[i].ext4;
                    retModel.ext5 = cameraPatrolScheduleList[i].ext5;
                    retModel.ext6 = cameraPatrolScheduleList[i].ext6;
                    // retModel.ext7 = cameraPatrolScheduleList[i].ext7;
                    retModel.ext8 = cameraPatrolScheduleList[i].ext8;
                    // retModel.ext9 = cameraPatrolScheduleList[i].ext9;
                    retModel.group_id = cameraPatrolScheduleList[i].group_id;
                    retModel.group_name = cameraPatrolScheduleList[i].group_name;
                    retModel.id = cameraPatrolScheduleList[i].id;
                    retModel.period_expression = cameraPatrolScheduleList[i].period_expression;
                    retModel.region_id = cameraPatrolScheduleList[i].region_id;
                    retModel.schedule_name = cameraPatrolScheduleList[i].schedule_name;
                    retModel.schedule_state = cameraPatrolScheduleList[i].schedule_state;
                    retModel.schedule_type = cameraPatrolScheduleList[i].schedule_type;
                    retModel.start_time = cameraPatrolScheduleList[i].start_time;
                    var regionModel = regionConfigList.Where(n => n.id == cameraPatrolScheduleList[i].region_id).FirstOrDefault();
                    retModel.ext10 = regionModel == null ? "" : regionModel.region_name;//备用字段10用于存储园区名称
                    retModel.ext7 = cameraPatrolScheduleList[i].end_time > DateTime.Now ? "1" : "2"; //1：未过期，2：过期
                    retModel.ext9 = retModel.cronTime.describe;//获取表达式描述
                    retList.Add(retModel);
                }
                return retList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 增加视频轮播计划任务
        /// </summary>
        /// <param name="scheduleName"></param>
        /// <param name="regionId"></param>
        /// <param name="scheduleType"></param>
        /// <param name="scheduleState"></param>
        /// <param name="endTime"></param>
        /// <param name="startTime"></param>
        /// <param name="groupId"></param>
        /// <param name="timeType"></param>
        /// <param name="frequency"></param>
        /// <param name="cameraPatrolType"></param>
        /// <param name="galleryCode"></param>
        /// <param name="galleryInterval"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        public bool AddSchedule(string scheduleName, int regionId, int scheduleType, string endTime, string startTime, int groupId, string startExecuteTime, string periodExpression, int cameraPatrolType, string galleryCode, int galleryInterval, string content,int spanTime,string scheduleDate)
        {
            try
            {
                //ServScheduleModel model = new ServScheduleModel();
                CameraScheduleCustom custom = new CameraScheduleCustom();
                custom.content = content;
                custom.create_time = DateTime.Now;
                custom.end_execute_time = "";
                custom.end_time = DateTime.Parse(endTime);
                custom.ext1 = groupId.ToString();            //摄像头组ID
                custom.ext2 = cameraPatrolType.ToString();  //轮询或者轮切
                custom.ext3 = galleryCode;                  //轮切时屏编码
                custom.ext4 = galleryInterval.ToString();         //轮切时间隔/s
                custom.period_expression = periodExpression;
                custom.region_id = regionId;
                custom.schedule_name = scheduleName;
                custom.schedule_state = (int)EnumClass.ScheduleState.启用;
                custom.schedule_type = scheduleType;
                custom.start_execute_time = startExecuteTime;
                custom.start_time = DateTime.Parse(startTime);
                custom.span_time = spanTime;
                custom.schedule_date = scheduleDate;
                return servScheduleDal.InsertCameraPatrolSchedule(custom);
                #region  旧
                //model.create_time = DateTime.Now;
                //model.start_time = DateTime.Parse(startTime);
                //model.end_time = DateTime.Parse(endTime);
                ////string executeTime = TimeExpression.ToTimeExpression(model.start_time, timeType, frequency);  //获取执行时间表达式
                //model.start_execute_time = startExecuteTime;
                //model.end_execute_time = endExecuteTime;
                //model.period_expression = periodExpression;
                //model.ext1 = groupId.ToString();            //摄像头组ID
                //model.ext2 = cameraPatrolType.ToString();  //轮询或者轮切
                //model.ext3 = galleryCode;                  //轮切时屏编码
                //model.ext4 = galleryInterval.ToString();         //轮切时间隔/s
                //model.region_id = regionId;
                //model.schedule_name = scheduleName;
                //model.schedule_state = (int)EnumClass.ScheduleState.启用;
                //model.schedule_type = (int)EnumClass.ScheduleType.视频轮播;
                //model.content = content;
                //int id = servScheduleDal.InsertCameraPatrolSchedule(model);
                //if (id > 0)
                //{
                //    return true;
                //}
                //else
                //{
                //    return false;
                //}

                #endregion
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据ID修改视频轮播计划任务
        /// </summary>
        /// <param name="id"></param>
        /// <param name="scheduleName"></param>
        /// <param name="regionId"></param>
        /// <param name="scheduleType"></param>
        /// <param name="endTime"></param>
        /// <param name="startTime"></param>
        /// <param name="groupId"></param>
        /// <param name="timeType"></param>
        /// <param name="frequency"></param>
        /// <param name="cameraPatrolType"></param>
        /// <param name="galleryCode"></param>
        /// <param name="galleryInterval"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        public bool UpdateScheduleById(int id, string scheduleName, int regionId, int scheduleType, string endTime, string startTime, int groupId, string startExecuteTime, string periodExpression, int cameraPatrolType, string galleryCode, int galleryInterval, string content, int spanTime, string scheduleDate)
        {
            try
            {
                CameraScheduleCustom custom = new CameraScheduleCustom();
                custom.id = id;
                custom.content = content;
                custom.create_time = DateTime.Now;
                custom.end_execute_time = "";
                custom.end_time = DateTime.Parse(endTime);
                custom.ext1 = groupId.ToString();            //摄像头组ID
                custom.ext2 = cameraPatrolType.ToString();  //轮询或者轮切
                custom.ext3 = galleryCode;                  //轮切时屏编码
                custom.ext4 = galleryInterval.ToString();         //轮切时间隔/s
                custom.period_expression = periodExpression;
                custom.region_id = regionId;
                custom.schedule_name = scheduleName;
                custom.schedule_state = (int)EnumClass.ScheduleState.启用;
                custom.schedule_type = scheduleType;
                custom.start_execute_time = startExecuteTime;
                custom.start_time = DateTime.Parse(startTime);
                custom.span_time = spanTime;
                custom.schedule_date = scheduleDate;
                return servScheduleDal.UpdateCameraPatrolSchedule(custom);
                #region  旧
                //ServScheduleModel model = new ServScheduleModel();
                //model.id = id;
                //model.create_time = DateTime.Now;
                //model.start_time = DateTime.Parse(startTime);
                //model.end_time = DateTime.Parse(endTime);
                ////string executeTime = TimeExpression.ToTimeExpression(model.start_time, timeType, frequency);  //获取执行时间表达式
                //model.start_execute_time = startExecuteTime;
                //model.end_execute_time = endExecuteTime;
                //model.period_expression = periodExpression;
                //model.ext1 = groupId.ToString();            //摄像头组ID
                //model.ext2 = cameraPatrolType.ToString();  //轮询或者轮切
                //model.ext3 = galleryCode;                  //轮切时屏编码
                //model.ext4 = galleryInterval.ToString();         //轮切时间隔/s
                //model.region_id = regionId;
                //model.schedule_name = scheduleName;
                //model.schedule_state = (int)EnumClass.ScheduleState.启用;
                //model.schedule_type = (int)EnumClass.ScheduleType.视频轮播;
                //model.content = content;
                //int res = servScheduleDal.UpdateCameraPatrolSchedule(model);
                //if (res > 0)
                //{
                //    return true;
                //}
                //else
                //{
                //    return false;
                //}
                #endregion

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        /// <summary>
        /// 修改计划延期时间
        /// </summary>
        /// <param name="id"></param>
        /// <param name="deadLineType"></param>
        /// <param name="endTime"></param>
        /// <returns></returns>
        public bool DelayDeadLine(int id, int delayMonth, DateTime endTime)
        {
            try
            {
                DBModelTimeCustom custom = new DBModelTimeCustom();
                //DateTime tranEndTime = DateTime.Parse(endTime);
                //custom.dt = tranEndTime.AddMonths(delayMonth);
                custom.dt = endTime.AddMonths(delayMonth);
                custom.id = id;
                int res = servScheduleDal.UpdateScheduleDeadLine(custom);
                return res > 0 ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 更新计划任务状态
        /// </summary>
        /// <param name="id"></param>
        /// <param name="state"></param>
        /// <returns></returns>
        public bool UpdateScheduleState(int id, int state)
        {
            try
            {
                DBModelStateCustom custom = new DBModelStateCustom();
                custom.id = id;
                custom.state = state;
                return servScheduleDal.UpdateScheduleState(custom);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 修改轮切资源编码
        /// </summary>
        /// <param name="id"></param>
        /// <param name="switchCode"></param>
        /// <returns></returns>
        public bool UpdateSwitchCode(int id, string switchCode)
        {
            try
            {
                GallerySwitchModel model = new GallerySwitchModel();
                model.id = id;
                model.switchCode = switchCode;
                int res = servScheduleDal.UpdateSwitchCode(model);
                return res > 0 ? true : false;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取本地园区ID以及名称
        /// </summary>
        /// <returns></returns>
        public List<EnumModel> GetLocalRegion()
        {
            List<EnumModel> enumList = new List<EnumModel>();
            EnumModel enumModel = null;
            try
            {
                BaseRegionConfigDAL baseRegionConfig = new BaseRegionConfigDAL();
                List<BaseRegionConfigModel> list = baseRegionConfig.GetBaseRegionConfigByType(0);//获取本地园区配置
                foreach (BaseRegionConfigModel model in list)
                {
                    enumModel.key = model.id;
                    enumModel.value = model.region_name;
                    enumList.Add(enumModel);
                }
                return enumList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取所有园区ID以及名称
        /// </summary>
        /// <returns></returns>
        public List<EnumModel> GetAllRegion()
        {
            List<EnumModel> enumList = new List<EnumModel>();
            EnumModel enumModel = null;
            try
            {
                BaseRegionConfigDAL baseRegionConfig = new BaseRegionConfigDAL();
                List<BaseRegionConfigModel> list = baseRegionConfig.GetAllRegionConfig();//获取本地园区配置
                foreach (BaseRegionConfigModel model in list)
                {
                    enumModel = new EnumModel();
                    enumModel.key = model.id;
                    enumModel.value = model.region_name;
                    enumList.Add(enumModel);
                }
                return enumList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据园区ID获取设备分组以及大屏配置信息
        /// </summary>
        /// <param name="region_id"></param>
        /// <returns></returns>
        public object GetDeviceGroupAndGalleryByRegion(int region_id)
        {
            try
            {
                LargeScreenBLL screenBll = new LargeScreenBLL(); 
                List<EnumModel> deviceGroup = GetCameraPatrolDeviceGroupInfoByRegion(region_id);
                // List<EnumModel> gallery = GetGalleryConfigByRegion(region_id);
                List<ScreenConfig> gallery = screenBll.GetFastGalleryConfigByRegionId(region_id);
                return new { cameraGroup = deviceGroup, gallery = gallery };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据园区ID获取视频巡更设备分组
        /// </summary>
        /// <returns></returns>
        public List<EnumModel> GetCameraPatrolDeviceGroupInfoByRegion(int region_id)
        {

            try
            {
                List<EnumModel> enumList = new List<EnumModel>();
                EnumModel enumModel = null;
                ServDeviceGroupInfoQuery query = new ServDeviceGroupInfoQuery();
                ServDeviceGroupInfoDAL dal = new ServDeviceGroupInfoDAL();
                query.device_type = (int)EnumClass.GroupDeviceType.视频;
                query.group_type = (int)EnumClass.GroupType.视频轮播;
                query.region_id = region_id;
                List<ServDeviceGroupInfoModel> list = dal.GetCameraPatrolDeviceGroupInfoByRegion(query);
                foreach (ServDeviceGroupInfoModel model in list)
                {
                    enumModel = new EnumModel();
                    enumModel.key = model.id;
                    enumModel.value = model.group_name;
                    enumList.Add(enumModel);
                }
                return enumList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取视频巡更设备分组
        /// </summary>
        /// <returns></returns>
        public List<ServDeviceGroupInfoModel> GetCameraPatrolDeviceGroupInfo()
        {
            try
            {
                ServDeviceGroupInfoQuery query = new ServDeviceGroupInfoQuery();
                ServDeviceGroupInfoDAL dal = new ServDeviceGroupInfoDAL();
                query.device_type = (int)EnumClass.GroupDeviceType.视频;
                query.group_type = (int)EnumClass.GroupType.视频轮播;
                List<ServDeviceGroupInfoModel> list = dal.GetCameraPatrolDeviceGroupInfo(query);
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据ID获取设备分组信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServDeviceGroupInfoModel GetDeviceGroupInfoByGroupId(int id)
        {
            try
            {
                ServDeviceGroupInfoDAL dal = new ServDeviceGroupInfoDAL();
                return dal.GetDeviceGroupInfoByGroupId(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据园区ID和类型获取大屏配置
        /// </summary>
        /// <returns></returns>
        public List<EnumModel> GetGalleryConfigByRegion(int regionId)
        {
            try
            {
                List<EnumModel> enumList = new List<EnumModel>();
                EnumModel enumModel = null;
                BaseRegionExtendConfigQuery query = new BaseRegionExtendConfigQuery();
                BaseRegionExtendConfigDAL dal = new BaseRegionExtendConfigDAL();
                query.config_type = (int)EnumClass.RegionExtendConfigType.大屏;
                query.region_id = regionId;
                List<BaseRegionExtendConfigModel> list = dal.GetRegionExtendConfigByRegionIdAndConfigType(query);
                foreach (BaseRegionExtendConfigModel model in list)
                {
                    enumModel = new EnumModel();
                    enumModel.key = model.id;
                    enumModel.value = model.ext1;  //取屏的编号
                    enumList.Add(enumModel);
                }
                return enumList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据设备组ID获取设备 
        /// </summary>
        /// <param name="groupId"></param>
        /// <returns></returns>
        public List<CameraPatrolDevice> GetCameraPatrolDeviceByGroupId(int groupId)
        {
            try
            {
                ServDeviceRelateDAL servDeviceRelateDal = new ServDeviceRelateDAL();
                List<CameraPatrolDevice> deviceList = servDeviceRelateDal.GetCameraPatrolDeviceByGroupId(groupId);
                return deviceList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        #region
        /// <summary>
        /// 获取资产巡检列表
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="assetType"></param>
        /// <param name="regionId"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<RetCameraPatrolSchedule> GetAssetInspectionByPage(int pageIndex, int pageSize, int assetType, int regionId, string startTime, string endTime, out int totalNumber)
        {
            try
            {
                List<RetCameraPatrolSchedule> retList = new List<RetCameraPatrolSchedule>();
                RetCameraPatrolSchedule retModel = null;
                AssetInspectionQuery query = new AssetInspectionQuery();
                ServScheduleTimeConfigDAL scheduleTimeConfigDal = new ServScheduleTimeConfigDAL();
                BaseRegionConfigDAL baseRegionConfigDal = new BaseRegionConfigDAL();
                query.assetType = assetType;
                query.endTime = endTime;
                query.pageIndex = pageIndex;
                query.pageSize = pageSize;
                query.regionId = regionId;
                query.startTime = startTime;
                List<ServScheduleModel> list = servScheduleDal.GetAssetInspectionPage(query, out totalNumber);
                //获取全部园区配置
                List<BaseRegionConfigModel> regionConfigList = baseRegionConfigDal.GetAllRegionConfig();
                for (int i = 0; i < list.Count; i++)
                {
                    retModel = new RetCameraPatrolSchedule();
                    retModel.content = list[i].content;
                    retModel.create_time = list[i].create_time;
                    retModel.cronTime = CSM.Utils.TimeExpression.GetCronTimeModel(list[i].period_expression);//生成时间表达式model
                    retModel.span_time = list[i].span_time;
                    #region 查询时间配置
                    ServScheduleTimeConfigQuery timeQuery = new ServScheduleTimeConfigQuery();
                    timeQuery.schedule_id = list[i].id;
                    timeQuery.time_type = 1;//查询开始时间
                    ServScheduleTimeConfigModel timeModel = scheduleTimeConfigDal.GetScheduleTimeConfigByIdAndTimeType(timeQuery).FirstOrDefault();
                    retModel.start_execute_time = timeModel == null ? "" : timeModel.schedule_time;
                    retModel.execute_date = timeModel == null ? "" : timeModel.schedule_date;
                    #endregion
                    retModel.id = list[i].id;
                    retModel.end_execute_time = "";
                    retModel.end_time = list[i].end_time;
                    retModel.period_expression = list[i].period_expression;
                    retModel.region_id = list[i].region_id;
                    retModel.schedule_name = list[i].schedule_name;
                    retModel.schedule_state = list[i].schedule_state;
                    retModel.schedule_type = list[i].schedule_type;
                    retModel.start_time = list[i].start_time;
                    var regionModel = regionConfigList.Where(n => n.id == list[i].region_id).FirstOrDefault();
                    retModel.ext10 = regionModel == null ? "" : regionModel.region_name;//备用字段10用于存储园区名称
                    retModel.ext7 = list[i].end_time > DateTime.Now ? "1" : "2"; //1：未过期，2：过期
                    retModel.ext9 = retModel.cronTime.describe;//获取表达式描述
                    retList.Add(retModel);
                }
                return retList;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        #endregion
    }
}
