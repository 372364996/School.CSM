using CSM.Common;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSM.BLL
{
    public class ServArchiveInfoBLL
    {

        private CSM.DAL.ServArchiveInfoDAL servArchiveInfoDAL = new DAL.ServArchiveInfoDAL();
        private CSM.DAL.BaseReportTypeDAL baseReportTypeDAL = new DAL.BaseReportTypeDAL();
        private CSM.DAL.ServPersonInfoDAL servPersonInfoDAL = new DAL.ServPersonInfoDAL();
        private CSM.DAL.ServAlarmRecordDAL servAlarmRecordDAL = new DAL.ServAlarmRecordDAL();
        private CSM.DAL.ServArchiveFileDAL servArchiveFileDAL = new DAL.ServArchiveFileDAL();
        private CSM.DAL.ServFileInfoDAL servFileInfoDAL = new DAL.ServFileInfoDAL();
        private CSM.DAL.BaseEventTypeDAL baseEventTypeDAL = new DAL.BaseEventTypeDAL();
        private CSM.DAL.ServArhiveUpdateLogDAL servArhiveUpdateLogDAL = new DAL.ServArhiveUpdateLogDAL();
   
        /// <summary>
        /// 分页查询获取卷宗信息 
        /// </summary>
        /// <param name="servDevicePlanQuery"></param>
        /// <param name="pageSize">每页记录数</param>
        /// <param name="pageNumber">当前页码</param>
        /// <param name="totalNumber">共多少条</param>
        /// <returns></returns>
        public List<ArchiveInfo> GetEntities(ServArchiveInfoQuery servArchiveInfoQuery, int pageNumber, int pageSize, out int totalNumber)
        {
            try
            {
                List<ServArchiveInfoModel> archivelist = new List<ServArchiveInfoModel>();
                List<ArchiveInfo> archiveInfoList = new List<ArchiveInfo>();
                archivelist = servArchiveInfoDAL.GetEntities(servArchiveInfoQuery, pageNumber, pageSize, out totalNumber);
                ArchiveInfo archiveInfoModel;
                foreach (ServArchiveInfoModel item in archivelist)
                {
                    archiveInfoModel = new ArchiveInfo();
                    archiveInfoModel.id = item.id;
                    archiveInfoModel.archive_num = item.archive_num;
                    archiveInfoModel.archive_name = item.archive_name;
                    archiveInfoModel.create_time = item.create_time;
                    archiveInfoModel.update_time = item.update_time;
                    archiveInfoModel.archive_decription = item.archive_decription;
                    archiveInfoModel.report_person = item.report_person;
                    archiveInfoModel.archive_status = item.archive_status;
                    //获取卷宗类别类型
                    var u = baseReportTypeDAL.GetEntity(item.report_type);
                    archiveInfoModel.report_name = u == null ? "未知" : u.type_name;
                    //创建人
                    var a = servPersonInfoDAL.GetPersonInfoBySSOId(item.create_persson_id);
                    archiveInfoModel.create_name = a == null ? "未知" : a.alias;
                    archiveInfoModel.status_name = Enum.GetName(typeof(EnumClass.ArchiveStatus), item.archive_status);
                    archiveInfoList.Add(archiveInfoModel);

                }
                return archiveInfoList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取最后条卷宗信息
        /// </summary>
        /// <returns></returns>
        public ServArchiveInfoModel GetLastArchiveInfo()
        {
            try
            {
                ServArchiveInfoModel entity = servArchiveInfoDAL.GetLastArchiveInfo();
                return entity;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 添加卷宗条例
        /// </summary>
        /// <param name="entity"></param>
        /// <param name="fileInfo"></param>
        /// <returns></returns>
        public bool AddservArchiveInfo(string addArchiveName, int addArchiveType, int addCreatePerson, string addReportPerson, string addArchiveDescription, string addAlarmId, List<ServFileInfoModel> ServFileInfoList, int addArchiveStatus)
        {
            try
            {
                //向卷宗表中添加数据
                ServArchiveInfoModel servArchiveInfoModel = new ServArchiveInfoModel();
                servArchiveInfoModel.archive_name = addArchiveName;
                int a_id = 1000;
                ServArchiveInfoModel archiveInfo = servArchiveInfoDAL.GetLastArchiveInfo();
                if (archiveInfo != null)
                {
                    a_id = Convert.ToInt32(archiveInfo.archive_num);
                }
                servArchiveInfoModel.archive_num = (a_id + 1).ToString();
                servArchiveInfoModel.archive_status = addArchiveStatus;
                servArchiveInfoModel.report_person = addReportPerson;
                servArchiveInfoModel.report_type = addArchiveType;
                servArchiveInfoModel.archive_decription = addArchiveDescription;
                servArchiveInfoModel.create_persson_id = addCreatePerson;
                servArchiveInfoModel.create_time = DateTime.Now;
                servArchiveInfoModel.update_time = DateTime.Now;
                servArchiveInfoModel.alarm_id = addAlarmId;
                bool result = servArchiveInfoDAL.AddservArchiveInfo(servArchiveInfoModel, ServFileInfoList);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取卷宗信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ArchiveInfoList GetDossierInfo(int id)
        {

            try
            {
                //根据id 获取卷宗信息
                ServArchiveInfoModel ArchiveInfo = servArchiveInfoDAL.GetEntity(id);
                List<AlarmRecordModel> AlarmRecorInfoList = new List<AlarmRecordModel>();
                //获取报警信息
                if (ArchiveInfo != null)
                {

                    ServAlarmRecordModel AlarmRecorInfo = new ServAlarmRecordModel();
                    if (!string.IsNullOrEmpty(ArchiveInfo.alarm_id))
                    {
                        string[] alarmArray = ArchiveInfo.alarm_id.Split(',');
                        for (int i = 0; i < alarmArray.Length; i++)
                        {
                            AlarmRecordModel AlarmRecordModel = new AlarmRecordModel();
                            AlarmRecorInfo = servAlarmRecordDAL.GetEntity(Convert.ToInt32(alarmArray[i]));
                            AlarmRecordModel.id = AlarmRecorInfo.id;
                            // var e= baseEventTypeDAL.GetEntity(AlarmRecorInfo.alarm_event);
                            if (AlarmRecorInfo.alarm_event != "" && !string.IsNullOrEmpty(AlarmRecorInfo.alarm_event))
                            {
                                var e = baseEventTypeDAL.GetEntityByCode(AlarmRecorInfo.alarm_event);
                                AlarmRecordModel.alarmEvent = e == null ? "未知" : e.event_name;
                            }
                            else
                            {
                                AlarmRecordModel.alarmEvent = "未知";
                            }
                            AlarmRecordModel.alarmLocation = AlarmRecorInfo.alarm_location;
                            AlarmRecordModel.subSystem = Enum.GetName(typeof(EnumClass.SubSystem), AlarmRecorInfo.alarm_subsystem);
                            AlarmRecordModel.alarmTime = AlarmRecorInfo.alarm_time;
                            AlarmRecorInfoList.Add(AlarmRecordModel);
                        }

                    }
                }
                //获取关联文件
                List<ServArchiveFileModel> archiveFile = servArchiveFileDAL.GetArchiveFile(id);
                //获取文件信息
                List<ServFileInfoModel> FileInfoList = new List<ServFileInfoModel>();
                for (var i = 0; i < archiveFile.Count; i++)
                {
                    ServFileInfoModel fileInfo = servFileInfoDAL.GetEntity(archiveFile[i].relate_id);
                    FileInfoList.Add(fileInfo);
                }
                //获取更改日志
                List<ServArhiveUpdateLogModel> ServArhiveUpdateLogList = servArhiveUpdateLogDAL.GetArhiveUpdateLogInfo(id);
                ArchiveInfoList archiveInfoList = new ArchiveInfoList();
                ArchiveInfo archiveInfo = new Model.CustomModel.ArchiveInfo();
                archiveInfo.id = ArchiveInfo.id;
                archiveInfo.archive_num = ArchiveInfo.archive_num;
                archiveInfo.archive_name = ArchiveInfo.archive_name;
                archiveInfo.create_time = ArchiveInfo.create_time;
                archiveInfo.update_time = ArchiveInfo.update_time;
                archiveInfo.archive_decription = ArchiveInfo.archive_decription;
                archiveInfo.report_person = ArchiveInfo.report_person;
                archiveInfo.archive_status = ArchiveInfo.archive_status;
                archiveInfo.report_type = ArchiveInfo.report_type;
                archiveInfo.create_persson_id = ArchiveInfo.create_persson_id;
                //获取卷宗类别类型
                var u = baseReportTypeDAL.GetEntity(ArchiveInfo.report_type);
                archiveInfo.report_name = u == null ? "未知" : u.type_name;
                //创建人
                var a = servPersonInfoDAL.GetPersonInfoBySSOId(ArchiveInfo.create_persson_id);
                archiveInfo.create_name = a == null ? "未知" : a.alias;
                archiveInfo.status_name = Enum.GetName(typeof(EnumClass.ArchiveStatus), ArchiveInfo.archive_status);
                archiveInfo.alarm_id = ArchiveInfo.alarm_id;
                archiveInfoList.archiveInfo = archiveInfo;
                archiveInfoList.alarmRecord = AlarmRecorInfoList;
                archiveInfoList.fileInfo = FileInfoList;
                archiveInfoList.arhiveUpdateLog = ServArhiveUpdateLogList;
                return archiveInfoList;

            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 结案
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool modifyArchiveState(int id, string archiveStatus)
        {
            try
            {
                ServArchiveInfoQuery servArchiveInfo = new ServArchiveInfoQuery();
                servArchiveInfo.id = id;
                if (archiveStatus == "结案")
                {
                    servArchiveInfo.archive_status = (int)CSM.Common.EnumClass.ArchiveStatus.结案;
                }
                else if (archiveStatus == "废止")
                {
                    servArchiveInfo.archive_status = (int)CSM.Common.EnumClass.ArchiveStatus.废止;
                }

                bool result = servArchiveInfoDAL.modifyArchiveState(servArchiveInfo);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        /// <summary>
        /// 删除所有废止卷宗
        /// </summary>
        /// <returns></returns>
        public bool DeleteArchive()
        {
            try
            {

                bool result = servArchiveInfoDAL.DeleteArchive();
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改卷宗
        /// </summary>
        /// <param name="servArchiveInfoModel"></param>
        /// <param name="ServFileInfoList"></param>
        /// <param name="servArhiveUpdateLog"></param>
        /// <returns></returns>
        public bool UpdateservArchiveInfo(ServArchiveInfoModel servArchiveInfoModel, List<ServFileInfoModel> ServFileInfoList, ServArhiveUpdateLogModel servArhiveUpdateLog)
        {
            try
            {

                bool ISResult = servArchiveInfoDAL.UpdateservArchiveInfo(servArchiveInfoModel, ServFileInfoList, servArhiveUpdateLog);
                return ISResult;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 获取上传的文件信息
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public List<ServFileInfoModel> GetFileinfo(int Id)
        {
            try
            {
                List<ServFileInfoModel> fileInfoList = servArchiveInfoDAL.GetFileinfo(Id);
                return fileInfoList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 获取报警类型
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public BaseReportTypeModel GetArchiveType(int Id)
        {
            try
            {
                BaseReportTypeModel ReportType = baseReportTypeDAL.GetEntity(Id);
                return ReportType;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据类型名称查id
        /// </summary>
        /// <param name="TypeName"></param>
        /// <returns></returns>
        public int GetArchiveTypeInfo(string TypeName)
        {
            try
            {
                int reportType = 0;
                BaseReportTypeModel ReportType = baseReportTypeDAL.GetArchiveTypeInfo(TypeName);
                if (ReportType != null)
                {
                    reportType = ReportType.id;
                }
                return reportType;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 导出卷宗信息
        /// </summary>
        /// <param name="result_id"></param>
        /// <param name="archiveName"></param>
        /// <param name="archiveType"></param>
        /// <param name="archiveState"></param>
        /// <param name="starteTime"></param>
        /// <param name="endtTime"></param>
        /// <returns></returns>
        public System.IO.MemoryStream GetAllExportArchiveExcel(string result_id, string archiveName, int archiveType, int archiveState, string starteTime, string endtTime)
        {

            List<ArchiveInfo> retList = new List<ArchiveInfo>();
            #region   拼接DataTable列头
            System.Data.DataTable table = new System.Data.DataTable();
            table.Columns.Add("卷宗编号");
            table.Columns.Add("卷宗名称");
            table.Columns.Add("卷宗类别");
            table.Columns.Add("卷宗创建人");
            table.Columns.Add("报案人");
            table.Columns.Add("卷宗描述");
            table.Columns.Add("创建时间");
            table.Columns.Add("修改时间");
            table.Columns.Add("卷宗状态");
            #endregion
            try
            {
                List<ServArchiveInfoModel> list = new List<ServArchiveInfoModel>();
                if (result_id != "")
                {
                    list = servArchiveInfoDAL.GetArchiveInfo(result_id);
                }
                else
                {
                    ServArchiveInfoQuery archiveInfoQuery = new ServArchiveInfoQuery();
                    if (archiveName != "")
                    {
                        archiveInfoQuery.archive_name = archiveName;
                    }
                    archiveInfoQuery.archive_status = archiveState;
                    archiveInfoQuery.report_type = archiveType;
                    if (starteTime != "")
                    {
                        archiveInfoQuery.create_time = starteTime;
                    }
                    if (endtTime != "")
                    {
                        archiveInfoQuery.Endtime = endtTime;
                    }
                    list = servArchiveInfoDAL.GetAllArchive(archiveInfoQuery);


                }
                if (list != null)
                {
                    foreach (ServArchiveInfoModel model in list)
                    {
                        System.Data.DataRow row = table.NewRow();
                        row["卷宗编号"] = model.archive_num;
                        row["卷宗名称"] = model.archive_name;
                        //获取卷宗类别类型
                        var u = baseReportTypeDAL.GetEntity(model.report_type);
                        row["卷宗类别"] = u == null ? "未知" : u.type_name;
                        //创建人
                        var a = servPersonInfoDAL.GetPersonInfoBySSOId(model.create_persson_id);
                        row["卷宗创建人"] = a == null ? "未知" : a.alias;
                        row["报案人"] = model.report_person;
                        row["卷宗描述"] = model.archive_decription;
                        row["创建时间"] = model.create_time.ToString();
                        row["修改时间"] = model.update_time.ToString();
                        row["卷宗状态"] = Enum.GetName(typeof(EnumClass.ArchiveStatus), model.archive_status);
                        table.Rows.Add(row);
                    }
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
        /// 导入卷宗
        /// </summary>
        /// <param name="servArchiveInfoModel"></param>
        /// <returns></returns>
        public bool TheImportFile(List<ServArchiveInfoModel> servArchiveInfoModel)
        {
            try
            {
                bool result = false;
                result = servArchiveInfoDAL.TheImportFile(servArchiveInfoModel);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        //获取案件类型
        public List<BaseReportTypeModel> ReportType()
        {
            try
            {
                BaseReportTypeQuery query = new BaseReportTypeQuery();
                List<BaseReportTypeModel>  result = baseReportTypeDAL.GetEntities(query);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }



    }
}
