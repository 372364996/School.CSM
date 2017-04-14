using CSM.BLL;
using CSM.Common;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using CSM.Utils;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CSM.Controllers
{

    public class DossierController : BaseController
    {
        ServArchiveInfoBLL servArchiveInfoBLL = new ServArchiveInfoBLL();
        ServPersonInfoBLL servPersonInfoBLL = new ServPersonInfoBLL();
        ServAlarmRecordBLL servAlarmRecordBll = new ServAlarmRecordBLL();
        

        public object NPOIHelper { get; private set; }

        // GET: Dossier
        public ActionResult Index()
        {
            ViewData["BaseReportType"] = servArchiveInfoBLL.ReportType();
            return View();
        }
        public ActionResult DossierCreate()
        {
            ViewData["BaseReportType"] = servArchiveInfoBLL.ReportType();
            return View();
        }

        public ActionResult Modify()
        {
            ViewData["BaseReportType"] = servArchiveInfoBLL.ReportType();
            string ModifyDossierId = Request.QueryString["Id"];
            if (string.IsNullOrEmpty(ModifyDossierId))
                ModifyDossierId = "0";
            ViewData["Id"] = ModifyDossierId;
            return View();
        }

        #region 卷宗管理
        /// <summary>
        /// 获取卷宗列表
        /// </summary>
        /// <param name="pageIndex">页数</param>
        /// <param name="pageSize">每页有多少行</param>
        /// <param name="planName">预案名称</param>
        /// <param name="createTime">创建时间</param>
        /// <param name="endTime">结束时间</param>
        /// <returns></returns>
        public ActionResult GetDossierList(int pageIndex, int pageSize, string archiveName, int archiveType, int archiveStatus, string createTime, string endTime)
        {
            ServArchiveInfoQuery archiveInfoQuery = new ServArchiveInfoQuery();
            if (archiveName != "")
            {
                archiveInfoQuery.archive_name = archiveName;
            }
            archiveInfoQuery.archive_status = archiveStatus;
            archiveInfoQuery.report_type = archiveType;
            if (createTime != "")
            {
                archiveInfoQuery.create_time = createTime;
            }
            if (endTime != "")
            {
                archiveInfoQuery.Endtime = endTime;
            }
            int totalNumber = 0;
            List<ArchiveInfo> archiveInfoList = new List<ArchiveInfo>();
            try
            {
                archiveInfoList = servArchiveInfoBLL.GetEntities(archiveInfoQuery, pageIndex, pageSize, out totalNumber);
                var temp = new { total = totalNumber, rows = archiveInfoList.OrderByDescending(n => n.id).ToList() };
                return Json(new { status = 0, msg = temp }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 获取卷宗创建人
        /// </summary>
        /// <returns></returns>
        public JsonResult GetPersonInfo()
        {
            try
            {
                List<ServPersonInfoModel> result = servPersonInfoBLL.GetPersonInfoList();
                return Json(new { status = 0, msg = result }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        //webuploader上传文件
        public ActionResult UpLoad(string id, string name, string type, string lastModifiedDate, int size,
        HttpPostedFileBase file)
        {
            string filePathName = string.Empty;
            string localPath = Server.MapPath("/upload/Temp/");

            if (Request.Files.Count == 0)
            {
                return Json(new { jsonrpc = 2.0, error = new { code = 102, message = "保存失败" }, id = "id" });
            }

            string ex = Path.GetExtension(file.FileName);
            filePathName = Guid.NewGuid().ToString("N") + ex;
            if (!System.IO.Directory.Exists(localPath))
            {
                System.IO.Directory.CreateDirectory(localPath);
            }
            file.SaveAs(Path.Combine(localPath, filePathName));

            return Json(new
            {
                jsonrpc = "2.0",
                id = id,
                filePath = "/upload/Temp/" + filePathName,
                fileName = filePathName,
                type = type,
                exfileExtName = ex

            });

        }
        /// <summary>
        /// 删除上传文件中的卷宗关联文档
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public JsonResult deleteAddFileByID(string filePath)
        {

            try
            {
                bool result = false;
                string[] path = filePath.Split(',');
                for (var i = 0; i < path.Count(); i++)
                {
                    FileInfo file = new FileInfo(Server.MapPath(path[i]));
                    if (file.Exists)
                    {
                        file.Delete(); //删除单个文件
                        result = true;
                    }
                    else
                    {
                        result = false;
                    }
                }
                return Json(new { status = 0, msg = result }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 查询告警信息
        /// </summary>
        /// <param name="pageindex">查询第几页</param>
        /// <param name="pagesize">一页显示的数据条数</param>
        /// <param name="alarm_level">查询的告警等级</param>
        /// <param name="alarm_state">查询的告警状态</param>
        /// <param name="StartTime">开始时间</param>
        /// <param name="EndTime">结束时间</param>
        /// <returns>返回符合查询条件的告警列表</returns>
        public ActionResult GetAlarmData(int pageindex, int pagesize, int alarm_level, int alarm_state, string StartTime, string EndTime)
        {
            try
            {
                int totalNumber = 0;
                List<AlarmRecordModel> list = servAlarmRecordBll.QueryPageList(pageindex, pagesize, -100, alarm_state, (int)EnumClass.AlarmType.设备报警, alarm_level, null, StartTime, EndTime, out totalNumber);
                EasyUIDataGruidModel<List<AlarmRecordModel>> retList = new EasyUIDataGruidModel<List<AlarmRecordModel>>();
                retList.total = totalNumber;
                retList.rows = list;
                return Json(new { status = 0, msg = retList }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 卷宗信息添加
        /// </summary>
        /// <param name="addArchiveName"></param>
        /// <param name="addArchiveType"></param>
        /// <param name="addCreatePerson"></param>
        /// <param name="addReportPerson"></param>
        /// <param name="addArchiveDescription"></param>
        /// <param name="addAlarmId"></param>
        /// <param name="addAssociatedInfo"></param>
        /// <param name="addArchiveStatus"></param>
        /// <returns></returns>
        public JsonResult InsetDossierData(string addArchiveName, int addArchiveType, int addCreatePerson, string addReportPerson, string addArchiveDescription, string addAlarmId, string addAssociatedInfo, int addArchiveStatus)
        {
            try
            {

                //向文件表中添加数据
                List<ServFileInfoModel> Node = JsonConvert.DeserializeObject<List<ServFileInfoModel>>(addAssociatedInfo);
                var picture = ".bmp,.jpg,.jpeg,.tiff,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF";//图片格式
                var video = ".avi,.rmvb,.rm,.asf,.divx,.mpg,.mpeg,.mpe,.wmv,.mkv,.mp4,.vob,.dat,.vcd,.svcd,.mov,.qt,.mpfg,.flv,.3gp,.xvid,.ts";//视频格式
                var excel = ".xlsx,.xls,.xlsm,.xlsb,xltx,.xltm,.xlt,.xlam,.xla";//excel格式
                List<ServFileInfoModel> ServFileInfoList = new List<ServFileInfoModel>();
                for (int i = 0; i < Node.Count; i++)
                {
                    ServFileInfoModel FileInfo = new ServFileInfoModel();
                    FileInfo.file_name = Node[i].file_name;
                    if (picture.IndexOf(Node[i].file_ext_name) > -1)
                    {
                        FileInfo.file_type = (int)EnumClass.FileType.图片;
                    }
                    else if (video.IndexOf(Node[i].file_ext_name) > -1)
                    {
                        FileInfo.file_type = (int)EnumClass.FileType.视频;
                    }

                    else if (excel.IndexOf(Node[i].file_ext_name) > -1)
                    {
                        FileInfo.file_type = (int)EnumClass.FileType.Excel;
                    }
                    else
                    {
                        FileInfo.file_type = (int)EnumClass.FileType.文件;
                    }

                    FileInfo file = new FileInfo(Server.MapPath(Node[i].file_address));
                    string timeInfo = DateTime.Now.ToString("yyyyMMdd");
                    string localPath = "/upload/dossier/" + timeInfo + "/";
                    string newFilePath = Server.MapPath(localPath + file.Name);
                    string localPaths = Server.MapPath(localPath);
                    if (!System.IO.Directory.Exists(localPaths))
                    {
                        System.IO.Directory.CreateDirectory(localPaths);
                    }
                    if (file.Exists)
                    {
                        file.MoveTo(newFilePath); //移动单个文件
                        FileInfo.file_address = localPath + file.Name;
                    }
                    else
                    {
                        return Json(new { status = 1, msg = "未找到上传的文件" }, JsonRequestBehavior.AllowGet);
                    }

                    FileInfo.file_ext_name = Node[i].file_ext_name;
                    FileInfo.content = Node[i].content;
                    FileInfo.create_time = Node[i].create_time;
                    ServFileInfoList.Add(FileInfo);
                }
                bool ISResult = servArchiveInfoBLL.AddservArchiveInfo(addArchiveName, addArchiveType, addCreatePerson, addReportPerson, addArchiveDescription, addAlarmId, ServFileInfoList, addArchiveStatus);
                return Json(new { status = 0, msg = ISResult }, JsonRequestBehavior.AllowGet);

            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 获取卷宗信息
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public JsonResult GetDossierInfo(int Id)
        {
            try
            {
                return Json(new { status = 0, msg = servArchiveInfoBLL.GetDossierInfo(Id) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 结案/废止
        /// </summary>
        /// <param name="Id"></param>
        /// <returns></returns>
        public JsonResult modifyArchiveState(int Id, string archiveStatus)
        {
            try
            {
                return Json(new { status = 0, msg = servArchiveInfoBLL.modifyArchiveState(Id, archiveStatus) }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 删除所有废止卷宗
        /// </summary>
        /// <returns></returns>
        public JsonResult DeleteArchive()
        {
            try
            {
                bool ISResult = servArchiveInfoBLL.DeleteArchive();
                return Json(new { status = 0, msg = ISResult }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        //文件另存为
        public FileResult SaveDocument(string url, string extName, string fileName)
        {

            string str = url;
            string name = fileName;
            string ExtName = extName;
            byte[] bytes = ReadFile(str);
            return File(bytes, ExtName, name);
        }
        /// <summary>
        /// 文件转化
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        public byte[] ReadFile(string fileName)
        {
            FileStream pFileStremam = null;
            byte[] pReadByte = new byte[0];
            try
            {
                pFileStremam = new FileStream(Server.MapPath(fileName), FileMode.Open, FileAccess.Read);
                BinaryReader r = new BinaryReader(pFileStremam);
                r.BaseStream.Seek(0, SeekOrigin.Begin);
                pReadByte = r.ReadBytes((int)r.BaseStream.Length);
                return pReadByte;
            }
            catch
            {
                return pReadByte;
            }
            finally
            {
                if (pFileStremam != null)
                    pFileStremam.Close();
            }
        }

        /// <summary>
        /// 修改卷宗信息
        /// </summary>
        /// <param name="archiveId"></param>
        /// <param name="addArchiveName"></param>
        /// <param name="addArchiveType"></param>
        /// <param name="addCreatePerson"></param>
        /// <param name="addReportPerson"></param>
        /// <param name="addArchiveDescription"></param>
        /// <param name="addAlarmId"></param>
        /// <param name="addAssociatedInfo"></param>
        /// <param name="addArchiveStatus"></param>
        /// <param name="addArchiveLog"></param>
        /// <returns></returns>
        public JsonResult UpdateDossierData(int archiveId, string archiveNum, string addArchiveName, int addArchiveType, int addCreatePerson, string addReportPerson, string addArchiveDescription, string addAlarmId, string addAssociatedInfo, int addArchiveStatus, string addArchiveLog)
        {
            try
            {
                //向卷宗表中添加数据
                ServArchiveInfoModel servArchiveInfoModel = new ServArchiveInfoModel();
                servArchiveInfoModel.archive_name = addArchiveName;
                servArchiveInfoModel.id = archiveId;
                servArchiveInfoModel.archive_num = archiveNum;
                servArchiveInfoModel.archive_status = addArchiveStatus;
                servArchiveInfoModel.report_person = addReportPerson;
                servArchiveInfoModel.report_type = addArchiveType;
                servArchiveInfoModel.archive_decription = addArchiveDescription;
                servArchiveInfoModel.create_persson_id = addCreatePerson;
                servArchiveInfoModel.create_time = DateTime.Now;
                servArchiveInfoModel.update_time = DateTime.Now;
                servArchiveInfoModel.alarm_id = addAlarmId;
                //向文件表中添加数据
                List<ServFileInfoModel> Node = JsonConvert.DeserializeObject<List<ServFileInfoModel>>(addAssociatedInfo);
                //根据卷宗id 获取关联文件信息
                List<ServFileInfoModel> FileInfoList = servArchiveInfoBLL.GetFileinfo(archiveId);
                var picture = ".bmp,.jpg,.jpeg,.tiff,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF";//图片格式
                var video = ".avi,.rmvb,.rm,.asf,.divx,.mpg,.mpeg,.mpe,.wmv,.mkv,.mp4,.vob,.dat,.vcd,.svcd,.mov,.qt,.mpfg,.flv,.3gp,.xvid,.ts";//视频格式
                var excel = ".xlsx,.xls,.xlsm,.xlsb,xltx,.xltm,.xlt,.xlam,.xla";//excel格式
                List<ServFileInfoModel> ServFileInfoList = new List<ServFileInfoModel>();
                var address = "";
                for (int i = 0; i < Node.Count; i++)
                {
                    ServFileInfoModel FileInfo = new ServFileInfoModel();
                    FileInfo.file_name = Node[i].file_name;
                    if (picture.IndexOf(Node[i].file_ext_name) > -1)
                    {
                        FileInfo.file_type = (int)EnumClass.FileType.图片;
                    }
                    else if (video.IndexOf(Node[i].file_ext_name) > -1)
                    {
                        FileInfo.file_type = (int)EnumClass.FileType.视频;
                    }

                    else if (excel.IndexOf(Node[i].file_ext_name) > -1)
                    {
                        FileInfo.file_type = (int)EnumClass.FileType.Excel;
                    }
                    else
                    {
                        FileInfo.file_type = (int)EnumClass.FileType.文件;
                    }
                    FileInfo file = new FileInfo(Server.MapPath(Node[i].file_address));
                    string timeInfo = DateTime.Now.ToString("yyyyMMdd");
                    string localPath = "/upload/dossier/" + timeInfo + "/";
                    string newFilePath = Server.MapPath(localPath + file.Name);
                    string localPaths = Server.MapPath(localPath);
                    if (!System.IO.Directory.Exists(localPaths))
                    {
                        System.IO.Directory.CreateDirectory(localPaths);
                    }
                    if (file.Exists)
                    {
                        file.MoveTo(newFilePath); //移动单个文件
                        FileInfo.file_address = localPath + file.Name;
                    }
                    else
                    {
                        return Json(new { status = 1, msg = "未找到上传的文件" }, JsonRequestBehavior.AllowGet);
                    }
                    FileInfo.file_ext_name = Node[i].file_ext_name;
                    FileInfo.content = Node[i].content;
                    FileInfo.create_time = Node[i].create_time;
                    address += FileInfo.file_address + ",";
                    ServFileInfoList.Add(FileInfo);
                }

                //向日志表里添加信息
                ServArhiveUpdateLogModel servArhiveUpdateLog = new ServArhiveUpdateLogModel();
                servArhiveUpdateLog.archive_id = archiveId;
                servArhiveUpdateLog.archive_log_content = addArchiveLog;
                servArhiveUpdateLog.log_create_time = DateTime.Now;
                bool ISResult = servArchiveInfoBLL.UpdateservArchiveInfo(servArchiveInfoModel, ServFileInfoList, servArhiveUpdateLog);
                if (ISResult == true)
                {
                    for (var d = 0; d < FileInfoList.Count; d++)
                    {
                        if (address.IndexOf(FileInfoList[d].file_address) < 0)
                        {
                            FileInfo file = new FileInfo(Server.MapPath(FileInfoList[d].file_address));
                            if (file.Exists)
                            {
                                file.Delete(); //删除单个文件
                            }
                        }
                    }

                }
                return Json(new { status = 0, msg = ISResult }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 导出卷宗
        /// </summary>
        /// <param name="result_id"></param>
        /// <param name="archiveName"></param>
        /// <param name="archiveType"></param>
        /// <param name="archiveState"></param>
        /// <param name="starteTime"></param>
        /// <param name="endtTime"></param>
        /// <returns></returns>
        public FileResult ExportArchiveExcel(string result_id, string archiveName, int archiveType, int archiveState, string starteTime, string endtTime)
        {
            try
            {


                System.IO.MemoryStream ms = servArchiveInfoBLL.GetAllExportArchiveExcel(result_id, archiveName, archiveType, archiveState, starteTime, endtTime);
                return File(ms, "application/vnd.ms-excel", "卷宗信息表.xls");
            }
            catch (Exception ex)
            {
                throw ex;

            }
        }
        /// <summary>
        /// 导出模板
        /// </summary>
        /// <returns></returns>
        public FileResult ExportTemplate()
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
                System.IO.MemoryStream ms= CSM.Utils.ExcelHelper.DataTableToExcel(table, "sheet2");
                return File(ms, "application/vnd.ms-excel", "卷宗信息表.xls");
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        /// <summary>
        /// 上传
        /// </summary>
        /// <param name="filePath">路径</param>
        /// <returns></returns>
        public JsonResult UploadSetSqlData(string filePath)
        {

            filePath = filePath.Replace("\\\\", "\\");
            if (filePath == "")
            {
                return Json("路径为空,请重试,若重复报此信息,请联系开发人员");
            }

            int inde = 0;//记录加载到了第几条
            List<ServArchiveInfoModel> archiveList = new List<ServArchiveInfoModel>();
            try
            {
                DataTable dt = new DataTable();
                ServArchiveInfoModel archive;
                string newFilePath = Server.MapPath(filePath);
                dt = ExcelHelper.ImportExcelFile(newFilePath);
                for (int i = 0; i < dt.Rows.Count; i++)
                {
                    inde++;
                    archive = new ServArchiveInfoModel();
                    archive.archive_num= dt.Rows[i]["卷宗编号"] + "";
                    archive.archive_name = dt.Rows[i]["卷宗名称"] + "";
                    string type_name=dt.Rows[i]["卷宗类别"] + "";
                    archive.report_type = servArchiveInfoBLL.GetArchiveTypeInfo(type_name);
                    archive.report_person = dt.Rows[i]["报案人"] + "";
                    string personName= dt.Rows[i]["卷宗创建人"] + "";
                    archive.create_persson_id = servPersonInfoBLL.GetPersonInfoId(personName);
                    archive.archive_decription = dt.Rows[i]["卷宗描述"] + "";
                    archive.archive_status=(int)EnumClass.ArchiveStatus.新建;
                    string create_time = dt.Rows[i]["创建时间"] + "";
                    if (create_time != "" && create_time != null)
                    {
                        archive.create_time = getStringToDate(create_time);
                    }
                    else
                    {
                        archive.create_time = DateTime.Now;
                    }
                    string latest_time = dt.Rows[i]["修改时间"] + "";
                    if (latest_time != "" && latest_time!=null)
                    {
                        archive.update_time = getStringToDate(latest_time);
                    }
                    else
                    {
                        archive.update_time = DateTime.Now;
                    }

                    archiveList.Add(archive);

                }
                bool result = servArchiveInfoBLL.TheImportFile(archiveList);
                return Json(new { status = 0, msg = result }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                if (ex.Source == "CSM.Utils")
                {

                    return Json(new { status = 1, msg = ex.Message });
                }
                if (inde == 1)
                {
                    return Json(new { status = 1, msg = "导入错误，请查看表头列名称是否按标准取名，或者第一行数据是否按照要求填写,更正完后请重新导入。" }, JsonRequestBehavior.AllowGet);
                }
                else if (inde == 0)
                {
                    return Json(new { status = 1, msg ="导入错误，请联系开发人员" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = 1, msg = "导入错误，请查看第" + inde + "行数据是否按照要求填写" }, JsonRequestBehavior.AllowGet);
                }
               
            }
        }

        /// <summary>
        /// 日期转换
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        private DateTime getStringToDate(string value)
        {
            DateTime time = new DateTime();
            if (value.IndexOf("/") > 0)
            {
                if (value.IndexOf(" ") >= 0)
                {
                    value = value.Substring(0, value.IndexOf(" "));
                }
                string[] arr = value.Split('/');
                if (arr[0].Length < 4)
                {
                    time = Convert.ToDateTime("20" + arr[2] + "/" + arr[0] + "/" + arr[1]);
                }
                else
                {
                    time = Convert.ToDateTime(value);
                }
            }
            else
            {
                time = Convert.ToDateTime(value);
            }

            return time;
        }
        #endregion
    }
}

