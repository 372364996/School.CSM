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
using CSM.Utils;

namespace CSM.BLL
{
    public class ServInformAlarmBLL
    {
        private ServInformAlarmDAL servInformAlarmDal = new ServInformAlarmDAL();
        /// <summary>
        /// 根据查询条件分页获取设备告警
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <param name="regionId"></param>
        /// <param name="areaId"></param>
        /// <param name="alarmLevel"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="eventType"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<RetInformAlarmCustom> GetInformAlarmPage(int pageIndex, int pageSize, int regionId, int areaId, int alarmLevel, string startTime, string endTime, int eventType, out int totalNumber)
        {
            try
            {
                BaseEventTypeBLL eventTypeBll = new BaseEventTypeBLL();
                BaseRegionConfigDAL baseRegionConfigDal = new BaseRegionConfigDAL();
                List<RetInformAlarmCustom> retList = new List<RetInformAlarmCustom>();
                RetInformAlarmCustom retModel = null;
                //List<BaseEventTypeModel> eventTypeList = eventTypeBll.GetAllEventType();//获取所有事件类型
                List<BaseRegionConfigModel> regionList = baseRegionConfigDal.GetAllRegionConfig();//获取所有园区配置
                //var childEventType = eventTypeList.Where(n => n.pid == eventType);//获取所有PID为eventType的子级事件
                //List<int> eventArr = new List<int>();
                //if (childEventType != null)
                //{
                //    List<BaseEventTypeModel> childEventTypeList = childEventType.ToList();
                //    for (int i = 0; i < childEventTypeList.Count(); i++)
                //    {
                //        eventArr.Add(childEventTypeList[i].id);  //先用List<int>接收
                //    }
                //}
                DefinedInformAlarmQuery query = new DefinedInformAlarmQuery();
                query.alarmLevel = alarmLevel;
                query.regionId = regionId;
                query.areaId = areaId;
                query.startTime = startTime;
                query.endTime = endTime;
                //query.eventType = eventArr.Count == 0 ? null : eventArr.ToArray();  //将List<int>转化为数组int[]
                query.eventType = eventType;
                query.pageIndex = pageIndex;
                query.pageSize = pageSize;
                List<InformAlarmCustom> informList = servInformAlarmDal.GetInformAlarmPage(query, out totalNumber); //分页获取设备报警记录
                for (int i = 0; i < informList.Count; i++)
                {
                    retModel = new RetInformAlarmCustom();
                    retModel.alarm_level = informList[i].alarm_level;
                    retModel.alarm_location = informList[i].alarm_location;
                    retModel.area_id = informList[i].area_id;
                    retModel.area_name = informList[i].area_name;
                    retModel.content = informList[i].content;
                    retModel.device_code = informList[i].device_code;
                    retModel.device_name = informList[i].device_name;
                    retModel.event_type = informList[i].event_type;
                    //var informAlarmEvent = eventTypeList.FirstOrDefault(n => n.id == informList[i].event_type); //查询当前事件
                    //if (informAlarmEvent.pid == -1)  //判断是否是父级事件
                    //{
                    //    retModel.event_name = informAlarmEvent.event_name;
                    //}
                    //else
                    //{
                    //    var rootEvent = eventTypeList.FirstOrDefault(n => n.id == informAlarmEvent.pid);//查询父级事件，目前事件只保留两级
                    //    if (rootEvent != null)   //找到父级事件
                    //    {
                    //        retModel.event_name = rootEvent.event_name;
                    //    }
                    //    else                    //未找到父级事件
                    //    {
                    //        retModel.event_name = "--";
                    //    }
                    //}
                    retModel.event_name = Enum.IsDefined(typeof(EnumClass.DeviceInformAlarmType), informList[i].event_type) ?  Enum.GetName(typeof(EnumClass.DeviceInformAlarmType), informList[i].event_type) : "--";
                    retModel.ext1 = informList[i].ext1;
                    retModel.ext2 = informList[i].ext2;
                    retModel.ext3 = informList[i].ext3;
                    retModel.ext4 = informList[i].ext4;
                    retModel.ext5 = informList[i].ext5;
                    retModel.id = informList[i].id;
                    retModel.region_id = informList[i].region_id;
                    retModel.region_name = regionList.Where(n => n.id == informList[i].region_id).FirstOrDefault() == null ? "--" : regionList.Where(n => n.id == informList[i].region_id).FirstOrDefault().region_name;
                    retModel.report_time = informList[i].report_time;
                    retModel.status = informList[i].status;
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
        /// 根据条件查询设备告警
        /// </summary>
        /// <param name="regionId"></param>
        /// <param name="areaId"></param>
        /// <param name="alarmLevel"></param>
        /// <param name="startTime"></param>
        /// <param name="endTime"></param>
        /// <param name="eventType"></param>
        /// <returns></returns>
        public System.IO.MemoryStream GetAllInformAlarmStream(int regionId, int areaId, int alarmLevel, string startTime, string endTime, int eventType)
        {
            try
            {
                BaseEventTypeBLL eventTypeBll = new BaseEventTypeBLL();
                BaseRegionConfigDAL baseRegionConfigDal = new BaseRegionConfigDAL();
                List<RetInformAlarmCustom> retList = new List<RetInformAlarmCustom>();
                RetInformAlarmCustom retModel = null;
                #region   拼接DataTable列头
                System.Data.DataTable table = new System.Data.DataTable();
                table.Columns.Add("告警编号");
                table.Columns.Add("事件名称");
                table.Columns.Add("告警设备");
                table.Columns.Add("告警位置");
                table.Columns.Add("园区名称");
                table.Columns.Add("区域名称");
                table.Columns.Add("告警时间");
                table.Columns.Add("告警级别");
                table.Columns.Add("处理状态");

                #endregion
                List<BaseRegionConfigModel> regionList = baseRegionConfigDal.GetAllRegionConfig();//获取所有园区配置
                DefinedInformAlarmQuery query = new DefinedInformAlarmQuery();
                query.alarmLevel = alarmLevel;
                query.regionId = regionId;
                query.areaId = areaId;
                query.startTime = startTime;
                query.endTime = endTime;
                query.eventType = eventType;
                List<InformAlarmCustom> informList = servInformAlarmDal.GetAllInformAlarmCondition(query); //分页获取设备报警记录
                for (int i = 0; i < informList.Count; i++)
                { 
                    System.Data.DataRow row = table.NewRow();
                    row["告警编号"] = informList[i].id;
                    row["事件名称"] = Enum.IsDefined(typeof(EnumClass.DeviceInformAlarmType), informList[i].event_type) ? Enum.GetName(typeof(EnumClass.DeviceInformAlarmType), informList[i].event_type) : " ";
                    row["告警设备"] = informList[i].device_name;
                    row["告警位置"] = informList[i].alarm_location;
                    row["园区名称"] = regionList.Where(n => n.id == informList[i].region_id).FirstOrDefault() == null ? " " : regionList.Where(n => n.id == informList[i].region_id).FirstOrDefault().region_name;
                    row["区域名称"] = informList[i].area_name;
                    row["告警时间"] = informList[i].report_time.ToString();
                    row["告警级别"] = Enum.IsDefined(typeof(EnumClass.AlarmLevel), informList[i].alarm_level) ? Enum.GetName(typeof(EnumClass.AlarmLevel), informList[i].alarm_level) : " ";
                    row["处理状态"] = Enum.IsDefined(typeof(EnumClass.InformAlarmStatus), informList[i].status) ? Enum.GetName(typeof(EnumClass.InformAlarmStatus), informList[i].status) : " ";
                    table.Rows.Add(row);
                }
                System.IO.MemoryStream ms = CSM.Utils.ExcelHelper.DataTableToExcel(table, "sheet2");
                return ms;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 新增设备告警
        /// </summary>
        /// <param name="eventType"></param>
        /// <param name="device_code"></param>
        /// <param name="alarm_location"></param>
        /// <param name="area_id"></param>
        /// <param name="alarm_level"></param>
        /// <param name="report_time"></param>
        /// <param name="content"></param>
        /// <returns></returns>
        public bool AddInformAlarm(int eventType, string device_code, string alarm_location, int area_id, int alarm_level,  string content)
        {
            try
            {
                ServInformAlarmModel model = new ServInformAlarmModel();
                model.alarm_level = alarm_level;
                model.alarm_location = alarm_location;
                model.area_id = area_id;
                model.content = content;
                model.device_code = device_code;
                model.event_type = eventType;
                model.report_time = DateTime.Now;
                model.status = (int)EnumClass.InformAlarmStatus.未处理;
                int res = servInformAlarmDal.AddEntity(model);
                if (res > 0)
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
        /// 根据园区ID获取显示区域
        /// </summary>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public List<EnumModel> GetShowAreaByRegionId(int regionId)
        {
            try
            {
                ServAreaInfoDAL servAreaInfoDal = new ServAreaInfoDAL();
                List<EnumModel> enumList = new List<EnumModel>();
                EnumModel enumModel = null;
                List<ServAreaInfoModel> areaList = servAreaInfoDal.GetAreaInfoTree(regionId);
                for (int i = 0; i < areaList.Count; i++)
                {
                    enumModel = new EnumModel();
                    enumModel.key = areaList[i].id;
                    enumModel.value = areaList[i].area_name;
                    enumList.Add(enumModel);
                }
                return enumList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
