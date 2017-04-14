using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Newtonsoft.Json;

namespace CSM.Controllers
{
    //接处警 Alarm and Command
    public class AACController : BaseController
    {
        BLL.ServReportInfoBLL reportinfobll = new BLL.ServReportInfoBLL();
        // GET: AAC 
        //接处警列表
        public ActionResult Index()
        {
            JavaScriptSerializer tojson = new JavaScriptSerializer();
            ViewData["ReportTypeList"] = tojson.Serialize(reportinfobll.GetAllReportType());
            return View();
        }

        // 接处警登记
        public ActionResult Register()
        {
            return View();
        }
        
        // 接处警统计
        public ActionResult Statistics()
        {
            return View();
        }

        #region 接警信息

        /// <summary>
        /// 获取主页列表信息
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public JsonResult GetIndexItems(int pageNumber, int pageSize, int regionid)
        {
            try
            {
                int totalNumber = 0;
                CSM.Model.QueryModel.ServReportInfoQuery query = new Model.QueryModel.ServReportInfoQuery();
               // query.region_id = regionid;
                List<Model.ServReportInfoModel> reportinfolist = reportinfobll.SarechReportInfo(query, pageNumber, pageSize, out totalNumber);

                List<Model.CustomModel.ReportInfoCustom> infocustomlist = new List<Model.CustomModel.ReportInfoCustom>();

                foreach (Model.ServReportInfoModel reportinfo in reportinfolist)
                {
                    Model.CustomModel.ReportInfoCustom infocustom = new Model.CustomModel.ReportInfoCustom();
                    CSM.Model.ServAreaInfoModel areaall = reportinfobll.GetAreaByID(reportinfo.incident_area_id);
                    infocustom.incident_area_id = areaall.area_name;//区域名字
                    CSM.Model.BaseReportTypeModel reporttypeall = reportinfobll.GetReportTypeByID(reportinfo.report_type);
                    infocustom.report_type = reporttypeall.type_name;//案件类型

                    infocustom.id = reportinfo.id;//id
                    infocustom.incident_address = reportinfo.incident_address;//id
                    infocustom.incident_time = reportinfo.incident_time.ToString("yyyy-MM-dd hh:mm:ss");//id
                    infocustom.report_time = reportinfo.report_time.ToString("yyyy-MM-dd hh:mm:ss");//id
                    infocustom.incident_status = Enum.GetName(typeof(CSM.Common.EnumClass.IncidentStatus), reportinfo.incident_status);
                    if (infocustom.incident_status == null) { infocustom.incident_status = "未知"; }
                    infocustom.report_person_phone = reportinfo.report_person_phone;//报案人电话
                    infocustom.report_person_name = reportinfo.report_person_name;//报案人姓名
                    infocustom.report_num = reportinfo.report_num;//案件编号
                                                                  //infocustom.id = reportinfo.id;//id
                    if (reportinfo.incident_status == 3 && reportinfo.ext1 != "-1")//判断是否可以转卷宗
                    {
                        infocustom.ext1 = "-1";
                    }

                    else {

                        infocustom.ext1 = "1";

                    }
                    infocustomlist.Add(infocustom);
                }

                object data = new
                {
                    data = infocustomlist,
                    total = totalNumber
                };
                return Json(new { status = 0, msg = data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //log 接处警列表查询失败
                return Json(new { status = 1, msg = "接处警列表查询失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 根据id获取接警信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult GetReportInfoByID(int id)
        {
            try
            {
                Model.ServReportInfoModel reportinfo = reportinfobll.GetReportByID(id);
                return Json(new { status = 0, msg = reportinfo }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //log 接处警列表查询失败
                return Json(new { status = 1, msg = "获取id:" + id + "的接警信息查询失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 根据id获取接警所有相关信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult GetReportAllInfoByID(int id)
        {

            Model.ServReportInfoModel reportinfo = new Model.ServReportInfoModel();


            List<CSM.Model.ServReportSuspectModel> suspectlist = new List<Model.ServReportSuspectModel>();
            List<Model.CustomModel.ReportFileInfo> filecustomlist = new List<Model.CustomModel.ReportFileInfo>();
            try
            {
                try
                {
                    //获取接警基础信息
                    reportinfo = reportinfobll.GetReportByID(id);

                    CSM.Model.ServAreaInfoModel areaall = reportinfobll.GetAreaByID(reportinfo.incident_area_id);
                    if (areaall == null)
                    {
                        reportinfo.ext1 = "无";
                    }
                    else
                    {
                        reportinfo.ext1 = areaall.area_name;//区域名字
                    }
                
                    CSM.Model.BaseReportTypeModel reporttypeall = reportinfobll.GetReportTypeByID(reportinfo.report_type);
                    if (reporttypeall == null) {
                        reportinfo.ext2 = "无";
                    }
                    else{
                        reportinfo.ext2 = reporttypeall.type_name;//案件类型 
                    }
                     CSM.Model.ServPersonInfoModel personmodelm = reportinfobll.GetPersonById(reportinfo.manager_id);
                    if (personmodelm == null)
                    {
                        reportinfo.ext3 = "无";
                    }
                    else
                    {
                        reportinfo.ext3 = personmodelm.alias;//接警人
                    }

                       
                    if (reportinfo.report_refer_person == 0) { reportinfo.ext4 = "无"; }
                    else {
                        CSM.Model.ServPersonInfoModel personmodelr = reportinfobll.GetPersonById(reportinfo.report_refer_person);
                        reportinfo.ext4 = personmodelm.alias;//案件转交人
                    }
                }

                catch (Exception ex)
                {
                    return Json(new { status = 1, msg = "获取id:" + id + "的接警信息时，查询接警基础信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
                }

                try
                {
                    suspectlist = reportinfobll.GetSuspectByReportID(id);
                }

                catch (Exception ex)
                {
                    return Json(new { status = 1, msg = "获取id:" + id + "的接警信息时，查询嫌疑人信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
                }

                try
                {
                     filecustomlist = reportinfobll.GetReportFileByreport_id(id,-1);
                }

                catch (Exception ex)
                {
                    return Json(new { status = 1, msg = "获取id:" + id + "的接警信息时，查询关联文件信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
                }

                object data = new
                {
                    report = reportinfo,
                    suspect = suspectlist,
                    file = filecustomlist

                }; 
                     
                return Json(new { status = 0, msg = data }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //接处警列表查询失败
                return Json(new { status = 1, msg = "获取id:" + id + "的接警信息查询失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 添加接警信息
        /// </summary>
        /// <returns></returns>
        public JsonResult AddAACInfo(int regionId, string report_num, string report_person_address, int manager_name, int report_type, string report_time, string incident_time, string report_person_name, int report_person_gender, int incident_area_id, string incident_address, int report_person_credentialtype, string report_person_credential, string report_person_phone, string report_person_dept, string report_person_nationality, string report_text, string report_content, int report_refer_person, string suspect_info, string addRegItems)
        {
            try
            {
                Model.ServReportInfoModel report_info = new Model.ServReportInfoModel();
                List<Model.ServFileInfoModel> file_info = new List<Model.ServFileInfoModel>();
                List<Model.ServReportSuspectModel> suspectinfo_list = new List<Model.ServReportSuspectModel>();
                report_info.region_id = regionId;//添加园区编号
                report_info.report_num = report_num;//案件编号
                report_info.manager_id = manager_name;//接案负责人
                report_info.report_type = report_type;//案件类型
                report_info.report_time = Convert.ToDateTime(report_time);//接案时间
                report_info.incident_time = Convert.ToDateTime(incident_time);//案件发生时间
                report_info.create_time = DateTime.Now;//记录创建时间
                report_info.report_person_name = report_person_name;//报案人姓名
                report_info.report_person_gender = report_person_gender;//报案人性别
                report_info.incident_area_id = incident_area_id;//案发区域id
                report_info.incident_address = incident_address;//案发地点
                report_info.report_person_credentialtype = report_person_credentialtype;//报案人证件类型
                report_info.report_person_credential = report_person_credential;//报案人证件号
                report_info.report_person_phone = report_person_phone;//报案人电话
                report_info.report_refer_person = report_refer_person;//案件转交人id
                report_info.report_person_dept = report_person_dept;//报案人单位
                report_info.report_person_nationality = report_person_nationality;//嫌疑人国籍
                report_info.report_text = report_text;//报案的内容
                report_info.report_content = report_content;//备注信息
                report_info.report_person_address = report_person_address;//报案人住址
                report_info.incident_from_type = 1;//标示手工接警
                report_info.incident_status = (int)CSM.Common.EnumClass.IncidentStatus.接警;//案件状态
                System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();
                Model.CustomModel.ReportSuspectArr suspectlist = js.Deserialize<Model.CustomModel.ReportSuspectArr>(suspect_info);
 
                if (suspectlist.suspect_arr.Count() > 0)
                {
                    int photo = 1;
                    foreach (Model.CustomModel.ReportSuspect suspectss in suspectlist.suspect_arr)
                    {
                        Model.ServReportSuspectModel suspectmodel = new Model.ServReportSuspectModel();
                        suspectmodel.suspect_name = suspectss.suspect_name;//嫌疑人姓名
                        suspectmodel.suspect_gender = Convert.ToInt32(suspectss.suspect_gender);//嫌疑人性别
                        suspectmodel.suspect_nationality = suspectss.suspect_nationality;//嫌疑人国籍
                        suspectmodel.suspect_featrue = suspectss.suspect_featrue;//嫌疑人特征
                        suspectmodel.suspect_credential = suspectss.suspect_credential;//嫌疑人证件号

                        if (suspectss.url == null || suspectss.url == "null" || suspectss.url == "undefined" || suspectss.url == "")
                        {

                            suspectmodel.suspect_photo = null;
                        }
                        else {

                            string[] suspectss_url = (suspectss.url).Split('/');
                            string[] ext = suspectss_url[suspectss_url.Length - 1].Split('.');

                            FileInfo file = new FileInfo(Server.MapPath(suspectss.url));
                            suspectmodel.suspect_photo = "Upload/Report/" + report_num + "/" + suspectss_url[suspectss_url.Length - 1];// suspectss.url;//照片地址


                            string NewPhotoPath = Path.Combine(HttpRuntime.AppDomainAppPath, suspectmodel.suspect_photo);
                            string localPath = Path.Combine(HttpRuntime.AppDomainAppPath, "Upload/Report/" + report_num);
                            if (!System.IO.Directory.Exists(localPath))
                            {
                                System.IO.Directory.CreateDirectory(localPath);
                            }
                            if (file.Exists)
                            {
                                file.MoveTo(NewPhotoPath); //移动单个文件
                            }
                            else
                            {
                                return Json(new { status = 1, msg = "未找到上传的嫌疑人照片" }, JsonRequestBehavior.AllowGet);
                            }

                        }
                        suspectinfo_list.Add(suspectmodel);
                        photo++;
                    }
                }

                List<Model.CustomModel.ReportFile> customfile = JsonConvert.DeserializeObject<List<Model.CustomModel.ReportFile>>(addRegItems);
                string picture = ".bmp,.jpg,.jpeg,.tiff,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF";//图片格式
                string video = ".avi,.rmvb,.rm,.asf,.divx,.mpg,.mpeg,.mpe,.wmv,.mkv,.mp4,.vob,.dat,.vcd,.svcd,.mov,.qt,.mpfg,.flv,.3gp,.xvid";//视频格式
                string excel = ".xlsx,.xls,.xlsm,.xlsb,xltx,.xltm,.xlt,.xlam,.xla";//excel格式

                int filenum = 1;
                foreach (Model.CustomModel.ReportFile custommodel in customfile)
                {
                    Model.ServFileInfoModel filemodel = new Model.ServFileInfoModel();
                    filemodel.file_name = custommodel.file_name;
                    if (picture.IndexOf(custommodel.ext) > -1)
                    {
                        filemodel.file_type = (int)CSM.Common.EnumClass.FileType.图片;
                    }
                    else if (video.IndexOf(custommodel.ext) > -1)
                    {
                        filemodel.file_type = (int)CSM.Common.EnumClass.FileType.视频;
                    }

                    else if (excel.IndexOf(custommodel.ext) > -1)
                    {
                        filemodel.file_type = (int)CSM.Common.EnumClass.FileType.Excel;
                    }
                    else
                    {
                        filemodel.file_type = (int)CSM.Common.EnumClass.FileType.文件;
                    }
                    var file_url = (custommodel.file_address).Split('/');
                    string[] ext = file_url[file_url.Length - 1].Split('.');

                    FileInfo file = new FileInfo(Server.MapPath(custommodel.file_address));
                    filemodel.file_address = "Upload/Report/" + report_num + "/" + file_url[file_url.Length - 1];// suspectss.url;//照片地址



                    string NewFilePath = Path.Combine(HttpRuntime.AppDomainAppPath, filemodel.file_address);
                    string localPaths = Path.Combine(HttpRuntime.AppDomainAppPath, "Upload/Report/" + report_num);
                    if (!System.IO.Directory.Exists(localPaths))
                    {
                        System.IO.Directory.CreateDirectory(localPaths);
                    }
                    if (file.Exists)
                    {
                        file.MoveTo(NewFilePath); //移动单个文件
                    }
                    else
                    {
                        return Json(new { status = 1, msg = "未找到上传的文件" }, JsonRequestBehavior.AllowGet);
                    }

                    filemodel.file_ext_name = custommodel.ext;//扩展名
                    filemodel.create_time = Convert.ToDateTime(custommodel.create_time);//创建时间
                    filemodel.person_id = (int)CSM.Common.EnumClass.PersonID.接处警;//所有者
                                                                                 // filemodel.file_address = custommodel.file_address;//文件地址
                    file_info.Add(filemodel);
                    filenum++;
                }
                bool ISResult = reportinfobll.AddAACInfo(report_info, file_info, suspectinfo_list);//请求后台开始注册
                //bool ISResult = servPlanRegulationBLL.AddPlanRegulation(PlanRegulation, ServFileInfoList);
                return Json(new { status = 0, msg = ISResult }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 老的方法修改接警
        /// </summary>
        /// <param name="Path"></param>
        /// <returns></returns>
        public JsonResult UpdataReport(string reportinfo, string fileinfo, string suspectinfo)
        {
            bool bl = false;
            try
            {
                //System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();
                //接警基础信息
                Model.ServReportInfoModel reportmodel = JsonConvert.DeserializeObject<Model.ServReportInfoModel>(reportinfo);

                //文件信息
                List<Model.CustomModel.ReportFileInfo> customfilelist = new List<Model.CustomModel.ReportFileInfo>();
                if (fileinfo != null && fileinfo != "" && fileinfo != "undefined" && fileinfo != "null")
                {
                    string[] filestringarr = fileinfo.Split('|');

                    foreach (string filestring in filestringarr)
                    {
                        Model.CustomModel.ReportFileInfo customfile = new Model.CustomModel.ReportFileInfo();
                        customfile = JsonConvert.DeserializeObject<Model.CustomModel.ReportFileInfo>(filestring);
                        customfile.person_id = (int)CSM.Common.EnumClass.PersonID.接处警;
                        customfilelist.Add(customfile);
                        if (customfile.file_address != null && customfile.file_address != "" && customfile.file_address != "undefined" && (customfile.file_address).IndexOf("Upload/Temp/") >= 0)
                        {
                            var file_url = (customfile.file_address).Split('/');
                            string[] ext = file_url[file_url.Length - 1].Split('.');

                            FileInfo file = new FileInfo(Server.MapPath(customfile.file_address));
                            customfile.file_address = "Upload/Report/" + reportmodel.report_num + "/" + ext[ext.Length - 2] + "." + ext[ext.Length - 1];// suspectss.url;//照片地址

                            string NewFilePath = Path.Combine(HttpRuntime.AppDomainAppPath, customfile.file_address);
                            string localPaths = Path.Combine(HttpRuntime.AppDomainAppPath, "Upload/Report/" + reportmodel.report_num);
                            if (!System.IO.Directory.Exists(localPaths))
                            {
                                System.IO.Directory.CreateDirectory(localPaths);
                            }
                            if (file.Exists)
                            {
                                file.MoveTo(NewFilePath); //移动单个文件
                                customfile.file_type = GetFileTypeByExt(customfile.file_ext_name);//文件类型
                                customfile.type = customfile.file_type;
                            }
                            else
                            {
                                return Json(new { status = 1, msg = "未找到上传的文件" }, JsonRequestBehavior.AllowGet);
                            }

                        }
                    }
                }

                //嫌疑人信息
                List<Model.ServReportSuspectModel> suspectlist = new List<Model.ServReportSuspectModel>();
                if (suspectinfo != null && suspectinfo != "" && suspectinfo != "undefined" && suspectinfo != "null")
                {
                    string[] suspectstringarr = suspectinfo.Split('|');

                    foreach (string suspectstring in suspectstringarr)
                    {
                        Model.ServReportSuspectModel suspectmodel = new Model.ServReportSuspectModel();
                        suspectmodel = JsonConvert.DeserializeObject<Model.ServReportSuspectModel>(suspectstring);
                        suspectlist.Add(suspectmodel);
                        if (suspectmodel.suspect_photo != null && suspectmodel.suspect_photo != "" && suspectmodel.suspect_photo != "undefined" && (suspectmodel.suspect_photo).IndexOf("Upload/Temp/") >= 0)
                        {
                            var file_url = (suspectmodel.suspect_photo).Split('/');
                            string[] ext = file_url[file_url.Length - 1].Split('.');
                            FileInfo file = new FileInfo(Server.MapPath(suspectmodel.suspect_photo));

                            suspectmodel.suspect_photo = "Upload/Report/" + reportmodel.report_num + "/" + ext[ext.Length - 2] + "." + ext[ext.Length - 1];// suspectss.url;//照片地址

                            string NewFilePath = Path.Combine(HttpRuntime.AppDomainAppPath, suspectmodel.suspect_photo);
                            string localPaths = Path.Combine(HttpRuntime.AppDomainAppPath, "Upload/Report/" + reportmodel.report_num);
                            if (!System.IO.Directory.Exists(localPaths))
                            {
                                System.IO.Directory.CreateDirectory(localPaths);
                            }
                            if (file.Exists)
                            {
                                file.MoveTo(NewFilePath); //移动单个文件
                            }
                            else
                            {
                                return Json(new { status = 1, msg = "未找到上传的文件" }, JsonRequestBehavior.AllowGet);
                            }

                        }
                    }
                }

                //更新接处警信息
                bl = reportinfobll.UpdataReprotInfo(reportmodel, customfilelist, suspectlist);
                //CSM.Model.ServReportInfoModel report_info = js.Deserialize<Model.ServReportInfoModel>(reportinfo);
                //List<CSM.Model.CustomModel.ReportFileInfo> file_info = js.Deserialize<List < Model.CustomModel.ReportFileInfo>>(fileinfo);
                //List<CSM.Model.ServReportSuspectModel> suspect_info = js.Deserialize < List < Model.ServReportSuspectModel>>(suspectinfo);
                //// CSM.Model.ServReportInfoModel report_info = new Model.ServReportInfoModel();
                // List<CSM.Model.CustomModel.ReportFileInfo> file_info = new List<Model.CustomModel.ReportFileInfo>();
                // List<CSM.Model.ServReportSuspectModel> suspect_info = new List<Model.ServReportSuspectModel>();
                //reportinfobll.UpdataReprotInfo(report_info,file_info, suspect_info);
                return Json(new { status = 0, msg = bl }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //
                return Json(new { status = 1, msg = "修改信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        /// <summary>
        /// 修改接警
        /// </summary>
        /// <returns></returns>
        public JsonResult UpdataReportInfo(string reportinfo, string fileinfo, string suspectinfo,string oldsuspectid,string oldfileid,string delfilepath)
        {
            bool bl = false;
            try
            {
                //接警基础信息
                Model.ServReportInfoModel reportmodel = JsonConvert.DeserializeObject<Model.ServReportInfoModel>(reportinfo);
                Model.ServReportInfoModel oldreportmodel = reportinfobll.GetReportByID(reportmodel.id);

                reportmodel.ext1 = oldreportmodel.ext1;
                reportmodel.ext2 = oldreportmodel.ext2;
                reportmodel.ext3 = oldreportmodel.ext3;
                reportmodel.ext4 = oldreportmodel.ext4;
                reportmodel.ext5 = oldreportmodel.ext5;

                int result = reportinfobll.UpdataReportInfo(reportmodel);

                if (result == -1)
                {
                    return Json(new { status = 1, msg = "更新接警基础信息时报错，修改接警信息失败！" }, JsonRequestBehavior.AllowGet);

                }

                List<Model.ServFileInfoModel> file_info = new List<Model.ServFileInfoModel>();
                List<Model.ServReportSuspectModel> suspectinfo_list = new List<Model.ServReportSuspectModel>();

                string report_num = reportmodel.report_num;
                System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();
                Model.CustomModel.ReportSuspectArr suspectlist = js.Deserialize<Model.CustomModel.ReportSuspectArr>(suspectinfo);

                if (suspectlist.suspect_arr.Count() > 0)
                {
                    int photo = 1;
                    foreach (Model.CustomModel.ReportSuspect suspectss in suspectlist.suspect_arr)
                    {
                        Model.ServReportSuspectModel suspectmodel = new Model.ServReportSuspectModel();
                        suspectmodel.suspect_name = suspectss.suspect_name;//嫌疑人姓名
                        suspectmodel.suspect_gender = Convert.ToInt32(suspectss.suspect_gender);//嫌疑人性别
                        suspectmodel.suspect_nationality = suspectss.suspect_nationality;//嫌疑人国籍
                        suspectmodel.suspect_featrue = suspectss.suspect_featrue;//嫌疑人特征
                        suspectmodel.suspect_credential = suspectss.suspect_credential;//嫌疑人证件号

                        if (suspectss.url.IndexOf("Upload/Temp/") > -1)
                        {
                            string[] suspectss_url = (suspectss.url).Split('/');
                            string[] ext = suspectss_url[suspectss_url.Length - 1].Split('.');

                            FileInfo file = new FileInfo(Server.MapPath(suspectss.url));
                            suspectmodel.suspect_photo = "Upload/Report/" + report_num + "/" + suspectss_url[suspectss_url.Length - 1];// suspectss.url;//照片地址


                            string NewPhotoPath = Path.Combine(HttpRuntime.AppDomainAppPath, suspectmodel.suspect_photo);
                            string localPath = Path.Combine(HttpRuntime.AppDomainAppPath, "Upload/Report/" + report_num);
                            if (!System.IO.Directory.Exists(localPath))
                            {
                                System.IO.Directory.CreateDirectory(localPath);
                            }
                            if (file.Exists)
                            {
                                file.MoveTo(NewPhotoPath); //移动单个文件
                            }
                            else
                            {
                                return Json(new { status = 1, msg = "未找到上传的嫌疑人照片" }, JsonRequestBehavior.AllowGet);
                            }
                        }
                        else {
                            if (suspectss.url == null || suspectss.url == "null" || suspectss.url == "undefined" || suspectss.url == "")
                            {

                                suspectmodel.suspect_photo = null;
                            }
                            else {
                                suspectmodel.suspect_photo = suspectss.url;
                            }
                        }
                        suspectinfo_list.Add(suspectmodel);
                        photo++;
                    }

                    bool suspectbool = reportinfobll.AddSuspect(suspectinfo_list, reportmodel.id);
                    if (!suspectbool)
                    {
                        return Json(new { status = 1, msg = "更新嫌疑人信息时报错，修改接警信息失败！" }, JsonRequestBehavior.AllowGet);

                    }
                }

                List<Model.CustomModel.ReportFile> customfile = JsonConvert.DeserializeObject<List<Model.CustomModel.ReportFile>>(fileinfo);
                string picture = ".bmp,.jpg,.jpeg,.tiff,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF";//图片格式
                string video = ".avi,.rmvb,.rm,.asf,.divx,.mpg,.mpeg,.mpe,.wmv,.mkv,.mp4,.vob,.dat,.vcd,.svcd,.mov,.qt,.mpfg,.flv,.3gp,.xvid";//视频格式
                string excel = ".xlsx,.xls,.xlsm,.xlsb,xltx,.xltm,.xlt,.xlam,.xla";//excel格式

                int filenum = 1;
                if (customfile.Count > 0)
                {
                    foreach (Model.CustomModel.ReportFile custommodel in customfile)
                    {
                        Model.ServFileInfoModel filemodel = new Model.ServFileInfoModel();
                        filemodel.file_name = custommodel.file_name;
                        if (picture.IndexOf(custommodel.ext) > -1)
                        {
                            filemodel.file_type = (int)CSM.Common.EnumClass.FileType.图片;
                        }
                        else if (video.IndexOf(custommodel.ext) > -1)
                        {
                            filemodel.file_type = (int)CSM.Common.EnumClass.FileType.视频;
                        }

                        else if (excel.IndexOf(custommodel.ext) > -1)
                        {
                            filemodel.file_type = (int)CSM.Common.EnumClass.FileType.Excel;
                        }
                        else
                        {
                            filemodel.file_type = (int)CSM.Common.EnumClass.FileType.文件;
                        }
                        if (custommodel.file_address.IndexOf("Upload/Temp/") > -1)
                        {
                            var file_url = (custommodel.file_address).Split('/');
                            string[] ext = file_url[file_url.Length - 1].Split('.');

                            FileInfo file = new FileInfo(Server.MapPath(custommodel.file_address));
                            filemodel.file_address = "Upload/Report/" + report_num + "/" + file_url[file_url.Length - 1];// suspectss.url;//照片地址



                            string NewFilePath = Path.Combine(HttpRuntime.AppDomainAppPath, filemodel.file_address);
                            string localPaths = Path.Combine(HttpRuntime.AppDomainAppPath, "Upload/Report/" + report_num);
                            if (!System.IO.Directory.Exists(localPaths))
                            {
                                System.IO.Directory.CreateDirectory(localPaths);
                            }
                            if (file.Exists)
                            {
                                file.MoveTo(NewFilePath); //移动单个文件
                            }
                            else
                            {
                                return Json(new { status = 1, msg = "未找到上传的文件" }, JsonRequestBehavior.AllowGet);
                            }
                        }
                        else {

                            filemodel.file_address = custommodel.file_address;
                        }
                        filemodel.file_ext_name = custommodel.ext;//扩展名
                        filemodel.create_time = Convert.ToDateTime(custommodel.create_time);//创建时间
                        filemodel.person_id = (int)CSM.Common.EnumClass.PersonID.接处警;//所有者
                                                                                     // filemodel.file_address = custommodel.file_address;//文件地址
                        file_info.Add(filemodel);
                        filenum++;
                    }
                    bool filebool = reportinfobll.AddReportFile(file_info, reportmodel.id, -1);
                    if (!filebool)
                    {
                        return Json(new { status = 1, msg = "修改关联文件时报错，修改接警信息失败！" }, JsonRequestBehavior.AllowGet);

                    }
                }
                //删除旧的嫌疑人信息
                if (oldsuspectid != "")
                {

                    if (oldsuspectid.IndexOf(",") > -1)
                    {
                        string[] oldsuspectidarr = oldsuspectid.Split(',');

                        foreach (string suspectidstring in oldsuspectidarr)
                        {
                           int oldsuspects = reportinfobll.DelSuspectByID(Convert.ToInt32(suspectidstring));
                           if (oldsuspects ==-1) {
                                return Json(new { status = 1, msg = "修改嫌疑人信息时报错，删除嫌疑人信息失败！" }, JsonRequestBehavior.AllowGet);

                           }
                        }
                    }
                    else
                    {
                        int oldsuspect = reportinfobll.DelSuspectByID(Convert.ToInt32(oldsuspectid));
                        if (oldsuspect == -1)
                        {
                            return Json(new { status = 1, msg = "修改嫌疑人信息时报错，删除嫌疑人信息失败！" }, JsonRequestBehavior.AllowGet);

                        }
                    }

                }
                //删除旧的关联文件信息
                if (oldfileid != "")
                {
                    if (oldfileid.IndexOf(",") > -1)
                    {
                        string[] oldfileidarr = oldfileid.Split(',');

                        foreach (string oldfileidstring in oldfileidarr)
                        {
                            string[] fileandhangdle = oldfileidstring.Split('-');
                            int delhfiles = reportinfobll.DelReportFileByID(Convert.ToInt32(fileandhangdle[0]));
                            int delfiles = reportinfobll.DelFileByID(Convert.ToInt32(fileandhangdle[1]));
                            if (delhfiles == -1|| delfiles == -1) {

                                return Json(new { status = 1, msg = "修改关联文件时报错，删除文件信息失败！" }, JsonRequestBehavior.AllowGet);

                            }
                        }
                    }
                    else
                    {
                        string [] fileandhangdle = oldfileid.Split('-');
                        int delhfile = reportinfobll.DelReportFileByID(Convert.ToInt32(fileandhangdle[0]));
                        int delfile =  reportinfobll.DelFileByID(Convert.ToInt32(fileandhangdle[1]));
                        if (delhfile == -1 || delfile == -1)
                        {

                            return Json(new { status = 1, msg = "修改关联文件时报错，删除文件信息失败！" }, JsonRequestBehavior.AllowGet);

                        }
                    }

               }

                try
                {
                    //System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();
                    string[] filepath = js.Deserialize<string[]>(delfilepath);
                    if (filepath.Count() > 0)
                    {
                        foreach (string filestring in filepath)
                        {
                            string localPath = Path.Combine(HttpRuntime.AppDomainAppPath, filestring);
                            FileInfo file = new FileInfo(localPath);
                            if (file.Exists)
                            {
                                file.Delete(); //删除单个文件Server.MapPath(filestring)
                                bl = true;
                            }
                            else
                            {
                                bl = false;
                            }
                        }
                    }
                }
                catch (Exception ex) {

                    return Json(new { status = 1, msg = "删除文件失败！" + ex.Message }, JsonRequestBehavior.AllowGet);

                }
                //更新接处警信息
                // bl = reportinfobll.UpdataReprotInfo(reportmodel, customfilelist, suspectlist);
                bl = true;
                return Json(new { status = 0, msg = bl }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //
                return Json(new { status = 1, msg = "修改信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 根据id更新接警表案件状态
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult UpdataIncidentStatus(int reportid)
        {
            bool bl = false;
            try
            {
                int result = reportinfobll.GetIncidentStatus(reportid);
                Model.ServReportInfoModel reportmodel = reportinfobll.GetReportByID(reportid);
                reportmodel.incident_status = result;
                if (reportinfobll.UpdataReportInfo(reportmodel) > 0)
                {
                    bl = true;
                }
                return Json(new { status = 0, msg = bl }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //log 接处警列表查询失败
                return Json(new { status = 1, msg = "获取id:" + reportid + "的接警文件信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        #endregion

        #region 嫌疑人信息
        /// <summary>
        /// 根据id获取嫌疑人信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult GetSuspectInfoByID(int id)
        {
            try
            {
                List<CSM.Model.ServReportSuspectModel> suspectlist = reportinfobll.GetSuspectByReportID(id);
                return Json(new { status = 0, msg = suspectlist }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //log 接处警列表查询失败
                return Json(new { status = 1, msg = "获取id:" + id + "的嫌疑人信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        /// <summary>
        /// 根据id删除嫌疑人信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult DelSuspectInfoByID(int id)
        {
            try
            {
                int result = reportinfobll.DelSuspectByID(id);
                if (result > 0)
                {
                    return Json(new { status = 0, msg = "删除成功！" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = 1, msg = "删除失败！" }, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {
                //log 接处警列表查询失败
                return Json(new { status = 1, msg = "删除id:" + id + "的嫌疑人信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        /// <summary>
        /// 根据搜索条件获取主页列表信息
        /// </summary>
        /// <param name="type">1:主页检索用，int参数转换为名称 2：智能填表用int参数不变</param>
        /// <returns></returns>
        //public JsonResult GetSuspectInfoByName(string suspect_name, int pageNumber, int pageSize)
        //{

        //    Model.QueryModel.ServReportInfoQuery reportquery = new Model.QueryModel.ServReportInfoQuery();

        //    reportquery.pageNumber = pageNumber;
        //    reportquery.pageSize = pageSize;
        //    int totalNumber = 0;
        //    List<Model.ServReportInfoModel> reportinfoList = new List<Model.ServReportInfoModel>();
        //    try
        //    {
        //        reportinfoList = reportinfobll.SarechReportInfo(reportquery, pageNumber, pageSize, out totalNumber);

        //            object data = new
        //            {
        //                data = reportinfoList,
        //                total = totalNumber
        //            };
        //            return Json(new { status = 0, msg = data }, JsonRequestBehavior.AllowGet);


                
        //        return Json(new { status = 1, msg = "查询接警信息时type参数错误！" }, JsonRequestBehavior.AllowGet);

        //    }

        //    catch (Exception ex)
        //    {
        //        //log 接处警列表查询失败
        //        return Json(new { status = 1, msg = "接处警列表查询失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
        //    }
        //}




        #endregion

        #region 关联文件信息
        /// <summary>
        /// 根据id获取接警文件信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult GetReportFileByID(int id, int handleid)
        {
            try
            {
                List<Model.CustomModel.ReportFileInfo> filecustomlist = reportinfobll.GetReportFileByreport_id(id, handleid);
                return Json(new { status = 0, msg = filecustomlist }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //log 接处警列表查询失败
                return Json(new { status = 1, msg = "获取id:" + id + "的接警文件信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 根据id删除接警文件信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult DelReportFileByID(int id)
        {
            try
            {
                int result = reportinfobll.DelReportFileByID(id);
                if (result > 0)
                {
                    return Json(new { status = 0, msg = "删除成功！" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = 1, msg = "删除失败！" }, JsonRequestBehavior.AllowGet);
                }

            }
            catch (Exception ex)
            {
                //log 接处警列表查询失败
                return Json(new { status = 1, msg = "删除id:" + id + "的接处警关联文件失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        #endregion

        #region 其他类型

        //webuploader上传照片
        public ActionResult UpLoadphoto(string id, string name, string type, string lastModifiedDate, string size,
        HttpPostedFileBase file)
        {
            try
            {
                string filePathName = string.Empty;
                string datatime = lastModifiedDate;
                string localPath = Path.Combine(HttpRuntime.AppDomainAppPath, "Upload/Temp/");
                if (Request.Files.Count == 0)
                {
                    //return Json(new { status = 1, msg = "id为"+ id + "的图片上传失败！插件未上传文件到后台！"}, JsonRequestBehavior.AllowGet);
                    return Json(new { jsonrpc = 2.0, status = 1, code = 102, msg = "插件上传文件失败！请检查插件是否正常。", id = "id" });
                }
                string ex = Path.GetExtension(file.FileName);
                filePathName = Guid.NewGuid().ToString("N") + ex; //file.FileName;//.Split('.')[0];// Guid.NewGuid().ToString("N") + ex;
                if (!System.IO.Directory.Exists(localPath))
                {
                    System.IO.Directory.CreateDirectory(localPath);
                }

                if (!System.IO.File.Exists(Path.Combine(localPath, filePathName)))
                {
                    file.SaveAs(Path.Combine(localPath, filePathName));

                    //object info = new
                    //{
                    //    jsonrpc = "2.0",
                    //    id = id,
                    //    filePath = "/Upload/Temp/" + filePathName
                    //};
                    //return Json(new { status = 0, msg = info }, JsonRequestBehavior.AllowGet);
                    return Json(new
                    {
                        jsonrpc = "2.0",
                        status =0,
                        msg = "上传成功",
                        name = name,
                        id = id,
                        filePath = "/Upload/Temp/" + filePathName
                    });

                }
                else
                {
                    // return Json(new { status = 1, msg = "服务器中已存在该图片，请更换文件名后再试！" }, JsonRequestBehavior.AllowGet);
                    return Json(new { jsonrpc = 2.0, status = 1, code = 102, msg = "服务器上存在相同的文件，请重新命名再试！", id = "id" });
                }

            }
            catch (Exception ex)
            {
                //return Json(new { status = 1, msg = "上传图片失败！"+ ex.Message }, JsonRequestBehavior.AllowGet);
                return Json(new { jsonrpc = 2.0, status = 1, code = 102, msg = "保存中出现严重错误！", id = "id" });
            }


        }
        //webuploader上传文件
        public ActionResult UpLoader(string id, string name, string type, string lastModifiedDate, int size,
       HttpPostedFileBase file)
        {
            try
            {
                string filePathName = string.Empty;

                string localPath = Path.Combine(HttpRuntime.AppDomainAppPath, "Upload/Temp/");
                if (Request.Files.Count == 0)
                {
                    //return Json(new { status = 1, msg = "id为" + id + "的文件上传失败！插件未上传文件到后台！" }, JsonRequestBehavior.AllowGet);
                    return Json(new { jsonrpc = 2.0, status = 1, code = 102, msg = "插件上传失败！请检查插件是否正常。", id = "id" });
                }

                string ex = Path.GetExtension(file.FileName);
                filePathName = Guid.NewGuid().ToString("N") + ex;//file.FileName;//.Split('.')[0];// 
                if (!System.IO.Directory.Exists(localPath))
                {
                    System.IO.Directory.CreateDirectory(localPath);
                }


                if (!System.IO.File.Exists(Path.Combine(localPath, filePathName)))
                {
                    file.SaveAs(Path.Combine(localPath, filePathName));

                    //object info = new
                    //{
                    //    jsonrpc = "2.0",
                    //    id = id,
                    //    filePath = "/Upload/Temp/" + filePathName
                    //};
                    // return Json(new { status = 0, msg = info }, JsonRequestBehavior.AllowGet);
                    return Json(new
                    {
                        jsonrpc = "2.0",
                        status = 0,
                        msg = "上传成功",
                        name = name,
                        id = id,
                        filePath = "/Upload/Temp/" + filePathName
                    });
                }
                else
                {
                    //return Json(new { status = 1, msg = "服务器中已存在该文件，请更换文件名后再试！" }, JsonRequestBehavior.AllowGet);
                    return Json(new { jsonrpc = 2.0, status = 1, code = 102, msg = "服务器上存在相同的文件，请重新命名再试！", id = "id" });
                }

                //file.SaveAs(Path.Combine(localPath, filePathName));


            }
            catch (Exception ex)
            {
                //return Json(new { status = 1, msg = "上传文件失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
                return Json(new { jsonrpc = 2.0, status = 1, code = 102, msg = "上传文件中出现严重错误！", id = "id" });
            }
        }

        /// <summary>
        /// 获取所有人员列表
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllPerson()
        {
            try
            {
                List<Model.ServPersonInfoModel> personinfo = reportinfobll.GetAllPerson();
                Model.CustomModel.EasyUIDataGruidModel<List<Model.ServPersonInfoModel>> retList = new Model.CustomModel.EasyUIDataGruidModel<List<Model.ServPersonInfoModel>>();
                retList.total = personinfo.Count();
                retList.rows = personinfo;
                return Json(retList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //人员信息查询失败
                return Json(new { status = 1, msg = "人员信息查询失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 获取所有区域
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllArea()
        {
            try
            {
                List<Model.ServAreaInfoModel> areainfo = reportinfobll.GetAllArea();
                Model.CustomModel.EasyUIDataGruidModel<List<Model.ServAreaInfoModel>> retList = new Model.CustomModel.EasyUIDataGruidModel<List<Model.ServAreaInfoModel>>();
                retList.total = areainfo.Count();
                retList.rows = areainfo;
                return Json(retList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //获取区域失败
                return Json(new { status = 1, msg = "获取区域失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        /// <summary>
        /// 根据园区id获取所有区域
        /// </summary>
        /// <returns></returns>
        public JsonResult GetAllAreaByRegion(int regionid)
        {
            try
            {
                List<Model.ServAreaInfoModel> areainfo = reportinfobll.GetAllAreaByRegion(regionid);
                Model.CustomModel.EasyUIDataGruidModel<List<Model.ServAreaInfoModel>> retList = new Model.CustomModel.EasyUIDataGruidModel<List<Model.ServAreaInfoModel>>();
                retList.total = areainfo.Count();
                retList.rows = areainfo;
                return Json(retList, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //获取区域失败
                return Json(new { status = 1, msg = "获取区域失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        /// <summary>
        /// 删除已上传的文件
        /// </summary>
        /// <param name="Path"></param>
        /// <returns></returns>
        public JsonResult DeleteAddFile(string PathJson)
        {
            bool bl = false;
            try
            {
                System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();
                string[] Path = js.Deserialize<string[]>(PathJson);
                if (Path.Count() > 0)
                {
                    foreach (string filepath in Path)
                    {
                        FileInfo file = new FileInfo(Server.MapPath(filepath));
                        if (file.Exists)
                        {
                            file.Delete(); //删除单个文件
                            bl = true;
                        }
                        else
                        {
                            bl = false;
                        }
                    }
                }
                return Json(new { status = 0, msg = bl }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //删除文件失败
                return Json(new { status = 1, msg = "删除文件失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }

        //public ActionResult DownZip(string id, string name, string type, string lastModifiedDate, string size, HttpPostedFileBase file)
        //{
        //    try
        //    {
        //        areabll.AddservArchiveInfo();
        //        string filePathName = string.Empty;
        //        string datatime = lastModifiedDate;
        //        string localPath = Path.Combine(HttpRuntime.AppDomainAppPath, "Upload/Temp/");
        //        if (Request.Files.Count == 0)
        //        {
        //            return Json(new { status = 1, msg = "id为" + id + "的图片上传失败！插件未上传文件到后台！" }, JsonRequestBehavior.AllowGet);
        //            return Json(new { jsonrpc = 2.0, status = 1, code = 102, msg = "插件上传文件失败！请检查插件是否正常。", id = "id" });
        //        }
        //        string ex = Path.GetExtension(file.FileName);
        //        filePathName = Guid.NewGuid().ToString("N") + ex; //file.FileName;//.Split('.')[0];// Guid.NewGuid().ToString("N") + ex;
        //        if (!System.IO.Directory.Exists(localPath))
        //        {
        //            System.IO.Directory.CreateDirectory(localPath);
        //        }

        //        if (!System.IO.File.Exists(Path.Combine(localPath, filePathName)))
        //        {
        //            file.SaveAs(Path.Combine(localPath, filePathName));

        //            object info = new
        //            {
        //                jsonrpc = "2.0",
        //                id = id,
        //                filePath = "/Upload/Temp/" + filePathName
        //            };
        //            return Json(new { status = 0, msg = info }, JsonRequestBehavior.AllowGet);
        //            return Json(new
        //            {
        //                jsonrpc = "2.0",
        //                status = 0,
        //                msg = "上传成功",
        //                name = name,
        //                id = id,
        //                filePath = "/Upload/Temp/" + filePathName
        //            });

        //        }
        //        else
        //        {
        //            return Json(new { status = 1, msg = "服务器中已存在该图片，请更换文件名后再试！" }, JsonRequestBehavior.AllowGet);
        //            return Json(new { jsonrpc = 2.0, status = 1, code = 102, msg = "服务器上存在相同的文件，请重新命名再试！", id = "id" });
        //        }

        //    }
        //    catch (Exception ex)
        //    {
        //        return Json(new { status = 1, msg = "上传图片失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
        //        return Json(new { jsonrpc = 2.0, status = 1, code = 102, msg = "保存中出现严重错误！", id = "id" });
        //    }


        //}

        #endregion

        #region 处警信息

        /// <summary>
        /// 添加处警
        /// </summary>
        /// <returns></returns>
        public JsonResult AddHandleInfo(string report_num, int report_id, int handle_type, int handle_person, DateTime handle_time, string handle_text, string addhandleItems)
        {

            try
            {
                Model.ServHandleReportModel handle_info = new Model.ServHandleReportModel();
                List<Model.ServFileInfoModel> file_info = new List<Model.ServFileInfoModel>();

               int status =  reportinfobll.GetIncidentStatus(report_id);//判断案件状态
                if (status == (int)Common.EnumClass.IncidentStatus.结案)
                {
                    return Json(new { status = 1, msg = "此案件已结案！不能再进行处警或是结案操作！"}, JsonRequestBehavior.AllowGet);
                }

                handle_info.report_id = report_id;//处警编号
                handle_info.handle_type = handle_type;//处警类型 
                handle_info.handle_person = handle_person;//处警人员
                handle_info.handle_time = handle_time;//处警时间
                handle_info.handle_text = handle_text;//处警内容
                handle_info.record_time = DateTime.Now;//创建时间

                List<Model.CustomModel.ReportFile> customfile = JsonConvert.DeserializeObject<List<Model.CustomModel.ReportFile>>(addhandleItems);


                int filenum = 1;
                foreach (Model.CustomModel.ReportFile custommodel in customfile)
                {
                    Model.ServFileInfoModel filemodel = new Model.ServFileInfoModel();
                    filemodel.file_name = custommodel.file_name;

                    filemodel.file_type = GetFileTypeByExt(custommodel.ext);

                    var file_url = (custommodel.file_address).Split('/');
                    string[] ext = file_url[file_url.Length - 1].Split('.');

                    FileInfo file = new FileInfo(Server.MapPath(custommodel.file_address));
                    filemodel.file_address = "Upload/Report/" + report_num + "/" + file_url[file_url.Length - 1];// suspectss.url;//照片地址



                    string NewFilePath = Path.Combine(HttpRuntime.AppDomainAppPath, filemodel.file_address);
                    string localPaths = Path.Combine(HttpRuntime.AppDomainAppPath, "Upload/Report/" + report_num);
                    if (!System.IO.Directory.Exists(localPaths))
                    {
                        System.IO.Directory.CreateDirectory(localPaths);
                    }
                    if (file.Exists)
                    {
                        file.MoveTo(NewFilePath); //移动单个文件
                    }
                    else
                    {
                        return Json(new { status = 1, msg = "未找到上传的文件" }, JsonRequestBehavior.AllowGet);
                    }

                    filemodel.file_ext_name = custommodel.ext;//扩展名
                    filemodel.create_time = Convert.ToDateTime(custommodel.create_time);//创建时间
                    filemodel.person_id = (int)CSM.Common.EnumClass.PersonID.接处警;//所有者
                    // filemodel.file_address = custommodel.file_address;//文件地址
                    file_info.Add(filemodel);
                    filenum++;
                }
                bool ISResult = reportinfobll.AddHandleInfo(handle_info, file_info);//请求后台开始注册
                //bool ISResult = servPlanRegulationBLL.AddPlanRegulation(PlanRegulation, ServFileInfoList);
                return Json(new { status = 0, msg = ISResult }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg ="添加处警失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        /// <summary>
        /// 修改处警
        /// </summary>
        /// <returns></returns>
        public JsonResult UpdataHandleInfo(string report_num,int report_id, string handleinfo, string fileinfo, string oldfileid, string delfilepath)
        {
            bool bl = false;
            try
            {
                //接警基础信息
                Model.ServHandleReportModel handlemodel = JsonConvert.DeserializeObject<Model.ServHandleReportModel>(handleinfo);

                int result = reportinfobll.UpdataHandleInfo(handlemodel);

                if (result == -1)
                {
                    return Json(new { status = 1, msg = "更新处警基础信息时报错，修改接警信息失败！" }, JsonRequestBehavior.AllowGet);

                }

                List<Model.ServFileInfoModel> file_info = new List<Model.ServFileInfoModel>();

                //string report_num = reportmodel.report_num;
                System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();

                List<Model.CustomModel.ReportFile> customfile = JsonConvert.DeserializeObject<List<Model.CustomModel.ReportFile>>(fileinfo);
                string picture = ".bmp,.jpg,.jpeg,.tiff,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF";//图片格式
                string video = ".avi,.rmvb,.rm,.asf,.divx,.mpg,.mpeg,.mpe,.wmv,.mkv,.mp4,.vob,.dat,.vcd,.svcd,.mov,.qt,.mpfg,.flv,.3gp,.xvid";//视频格式
                string excel = ".xlsx,.xls,.xlsm,.xlsb,xltx,.xltm,.xlt,.xlam,.xla";//excel格式

                int filenum = 1;
                if (customfile.Count > 0)
                {
                    foreach (Model.CustomModel.ReportFile custommodel in customfile)
                    {
                        Model.ServFileInfoModel filemodel = new Model.ServFileInfoModel();
                        filemodel.file_name = custommodel.file_name;
                        if (picture.IndexOf(custommodel.ext) > -1)
                        {
                            filemodel.file_type = (int)CSM.Common.EnumClass.FileType.图片;
                        }
                        else if (video.IndexOf(custommodel.ext) > -1)
                        {
                            filemodel.file_type = (int)CSM.Common.EnumClass.FileType.视频;
                        }

                        else if (excel.IndexOf(custommodel.ext) > -1)
                        {
                            filemodel.file_type = (int)CSM.Common.EnumClass.FileType.Excel;
                        }
                        else
                        {
                            filemodel.file_type = (int)CSM.Common.EnumClass.FileType.文件;
                        }
                        if (custommodel.file_address.IndexOf("Upload/Temp") > -1)
                        {
                            var file_url = (custommodel.file_address).Split('/');
                            string[] ext = file_url[file_url.Length - 1].Split('.');

                            FileInfo file = new FileInfo(Server.MapPath(custommodel.file_address));
                            filemodel.file_address = "Upload/Report/" + report_num + "/" + file_url[file_url.Length - 1];// suspectss.url;//照片地址



                            string NewFilePath = Path.Combine(HttpRuntime.AppDomainAppPath, filemodel.file_address);
                            string localPaths = Path.Combine(HttpRuntime.AppDomainAppPath, "Upload/Report/" + report_num);
                            if (!System.IO.Directory.Exists(localPaths))
                            {
                                System.IO.Directory.CreateDirectory(localPaths);
                            }
                            if (file.Exists)
                            {
                                file.MoveTo(NewFilePath); //移动单个文件
                            }
                            else
                            {
                                return Json(new { status = 1, msg = "未找到上传的文件" }, JsonRequestBehavior.AllowGet);
                            }
                        }
                        else {
                            filemodel.file_address = custommodel.file_address;

                        }
                        filemodel.file_ext_name = custommodel.ext;//扩展名
                        filemodel.create_time = Convert.ToDateTime(custommodel.create_time);//创建时间
                        filemodel.person_id = (int)CSM.Common.EnumClass.PersonID.接处警;//所有者
                                                                                     // filemodel.file_address = custommodel.file_address;//文件地址
                        file_info.Add(filemodel);
                        filenum++;
                    }
                    bool filebool = reportinfobll.AddReportFile(file_info, report_id, handlemodel.id);
                    if (!filebool)
                    {
                        return Json(new { status = 1, msg = "修改关联文件时报错，修改接警信息失败！" }, JsonRequestBehavior.AllowGet);

                    }
                }
                //删除旧的关联文件信息
                if (oldfileid != "")
                {
                    if (oldfileid.IndexOf(",") > -1)
                    {
                        string[] oldfileidarr = oldfileid.Split(',');

                        foreach (string oldfileidstring in oldfileidarr)
                        {
                            string[] fileandhangdle = oldfileidstring.Split('-');
                            int delhfiles = reportinfobll.DelReportFileByID(Convert.ToInt32(fileandhangdle[0]));
                            int delfiles = reportinfobll.DelFileByID(Convert.ToInt32(fileandhangdle[1]));
                            if (delhfiles == -1 || delfiles == -1)
                            {

                                return Json(new { status = 1, msg = "修改关联文件时报错，删除文件信息失败！" }, JsonRequestBehavior.AllowGet);

                            }
                        }
                    }
                    else
                    {
                        string[] fileandhangdle = oldfileid.Split('-');
                        int delhfile = reportinfobll.DelReportFileByID(Convert.ToInt32(fileandhangdle[0]));
                        int delfile = reportinfobll.DelFileByID(Convert.ToInt32(fileandhangdle[1]));
                        if (delhfile == -1 || delfile == -1)
                        {

                            return Json(new { status = 1, msg = "修改关联文件时报错，删除文件信息失败！" }, JsonRequestBehavior.AllowGet);

                        }
                    }

                }
                //删除所有已删除文件
                try
                {
                    //System.Web.Script.Serialization.JavaScriptSerializer js = new System.Web.Script.Serialization.JavaScriptSerializer();
                    string[] filepath = js.Deserialize<string[]>(delfilepath);
                    if (filepath.Count() > 0)
                    {
                        foreach (string filestring in filepath)
                        {
                            string localPath = Path.Combine(HttpRuntime.AppDomainAppPath, filestring);
                            FileInfo file = new FileInfo(localPath);
                            //FileInfo file = new FileInfo(Server.MapPath(filestring));
                            if (file.Exists)
                            {
                                file.Delete(); //删除单个文件
                                bl = true;
                            }
                            else
                            {
                                bl = false;
                            }
                        }
                    }
                }
                catch (Exception ex)
                {

                    return Json(new { status = 1, msg = "删除文件失败！" + ex.Message }, JsonRequestBehavior.AllowGet);

                }
                //更新接处警信息
                // bl = reportinfobll.UpdataReprotInfo(reportmodel, customfilelist, suspectlist);
                bl = true;
                return Json(new { status = 0, msg = bl }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //
                return Json(new { status = 1, msg = "修改信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }



        /// <summary>
        /// 根据案件id查询处警基础信息
        /// </summary>
        /// <returns></returns>
        public JsonResult GetHandleInfoByReprotid(int reportid)
        {
            try
            {
                List<Model.ServHandleReportModel> handlelist = new List<Model.ServHandleReportModel>();
                handlelist = reportinfobll.GetHandleInfoByReprotid(reportid);
                if (handlelist.Count > 0)
                {
                    object data = new
                    {
                        data = handlelist,
                        leg = handlelist.Count
                    };
                    return Json(new { status = 0, msg = data }, JsonRequestBehavior.AllowGet);
                }
                else
                {

                    object data = new
                    {
                        data = handlelist,
                        leg = 0
                    };
                    return Json(new { status = 1, msg = data }, JsonRequestBehavior.AllowGet);

                }

            }

            catch (Exception ex)
            {

                return Json(new { status = 1, msg = "查询处警信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }



        /// <summary>
        /// 根据案件id查询处警所有信息
        /// </summary>
        /// <returns></returns>
        public JsonResult GetHandleInfo(int reportid,int handleid)
        {
            try
            {
                List<Model.CustomModel.ReportFileInfo> filecustomlist = new List<Model.CustomModel.ReportFileInfo>();
                Model.ServHandleReportModel handlemodel = new Model.ServHandleReportModel();
                handlemodel = reportinfobll.GetHandleInfoById(handleid);
                CSM.Model.ServPersonInfoModel personmodel = reportinfobll.GetPersonById(handlemodel.handle_person);
                handlemodel.ext1 = personmodel.alias;

                try
                {
                    filecustomlist = reportinfobll.GetReportFileByreport_id(reportid, handleid);
                    foreach (Model.CustomModel.ReportFileInfo filecustom in filecustomlist)
                    {
                        if (filecustom.handle_id != handleid)
                            filecustomlist.Remove(filecustom);

                    }


                }

                catch (Exception ex)
                {
                    return Json(new { status = 1, msg = "获取id:" + reportid + "的处警信息时，查询关联文件信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
                }
                if (handlemodel != null)
                {
                   object data = new
                    {
                        data = handlemodel,
                        file = filecustomlist,
                        total = filecustomlist.Count
                   };
                    return Json(new { status = 0, msg = data }, JsonRequestBehavior.AllowGet);
                }
                else 
                {
                    return Json(new { status = 1, msg = "没有查询到id:"+ handleid + "的处警信息！" }, JsonRequestBehavior.AllowGet);
                }

            }

            catch (Exception ex)
            {

                return Json(new { status = 1, msg = "查询处警信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        /// 删除触警结案信息
        /// </summary>
        /// <param name="Path"></param>
        /// <returns></returns>
        public JsonResult DelHandleInfo(int reportid, int handleid)
        {
            bool bl = false;
            try
            {
                string apppath = HttpRuntime.AppDomainAppPath;
                bl = reportinfobll.DelHandleInfo(reportid,handleid, apppath);

                int status = reportinfobll.GetIncidentStatus(reportid);//判断案件状态
                Model.ServReportInfoModel reportinfo = reportinfobll.GetReportByID(reportid);//查询接警信息
                reportinfo.incident_status = status;//案件状态
                int result = reportinfobll.UpdataReportInfo(reportinfo);//更新接警信息

                return Json(new { status = 0, msg = bl }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //删除失败
                return Json(new { status = 1, msg = "删除触警信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        #endregion

        #region 接处警全部信息

        /// 删除接触警
        /// </summary>
        /// <param name="Path"></param>
        /// <returns></returns>
        public JsonResult DelReportInfo(int id)
        {
            bool bl = false;
            try
            {
                string apppath = HttpRuntime.AppDomainAppPath;
                bl = reportinfobll.DelReportInfo(id, apppath);
                return Json(new { status = 0, msg = bl }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                //删除文件失败
                return Json(new { status = 1, msg = "删除接触警信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }




        /// <summary>
        /// 根据搜索条件获取主页列表信息
        /// </summary>
        /// <param name="type">1:主页检索用，int参数转换为名称 2：智能填表用int参数不变</param>
        /// <returns></returns>
        public JsonResult GetSearchIndexItems(int type ,int pageNumber, int pageSize, int searchreport_type, string searchreport_num, int searchincident_status, string searchreport_person_name, string searchreport_person_phone, string searchstartTime, string searchendTime,int[] eventRegion)
        {

            Model.QueryModel.ServReportInfoQuery reportquery = new Model.QueryModel.ServReportInfoQuery();

            // reportquery.region_id = regionid;
            reportquery.eventRegion = eventRegion;
            if (searchreport_type != -1)
            {
                reportquery.report_type = searchreport_type;
            }
            if (searchreport_num != "")
            {
                reportquery.report_num = searchreport_num;
            }
            if (searchincident_status != -1)
            {
                reportquery.incident_status = searchincident_status;
            }
            if (searchreport_person_name != "")
            {
                reportquery.report_person_name = searchreport_person_name;
            }
            if (searchreport_person_phone != "")
            {
                reportquery.report_person_phone = searchreport_person_phone;
            }
            if (searchstartTime != "")
            {
                reportquery.start_time = searchstartTime;
            }
            if (searchendTime != "")
            {
                reportquery.end_time = searchendTime;
            }
            reportquery.pageNumber = pageNumber;
            reportquery.pageSize = pageSize;
            int totalNumber = 0;
            List<Model.ServReportInfoModel> reportinfoList = new List<Model.ServReportInfoModel>();
            try
            {
                reportinfoList = reportinfobll.SarechReportInfo(reportquery, pageNumber, pageSize, out totalNumber);

                if (type == 0)
                {
                    try
                    {
                        CSM.Model.QueryModel.ServReportInfoQuery query = new Model.QueryModel.ServReportInfoQuery();
                        //List<Model.ServReportInfoModel> reportinfolist = reportinfobll.GetAllReport(query, pageNumber, pageSize, out totalNumber);

                        List<Model.CustomModel.ReportInfoCustom> infocustomlist = new List<Model.CustomModel.ReportInfoCustom>();

                        foreach (Model.ServReportInfoModel reportinfo in reportinfoList)
                        {
                            Model.CustomModel.ReportInfoCustom infocustom = new Model.CustomModel.ReportInfoCustom();
                            CSM.Model.ServAreaInfoModel areaall = reportinfobll.GetAreaByID(reportinfo.incident_area_id);
                            if (areaall == null)
                            {
                                infocustom.incident_area_id = "无";
                            }
                            else
                            {
                                infocustom.incident_area_id = areaall.area_name;//区域名字
                            }                          
                            CSM.Model.BaseReportTypeModel reporttypeall = reportinfobll.GetReportTypeByID(reportinfo.report_type);
                            if (reporttypeall == null)
                            {
                                infocustom.report_type = "无";
                            } 
                            else {
                              infocustom.report_type = reporttypeall.type_name;//案件类型
                            }
                            
                            infocustom.region_id = reportinfo.region_id;//园区id




                            CSM.Model.BaseRegionConfigModel regionall = reportinfobll.GetRegionInfoById(reportinfo.region_id);
                            if (regionall == null)
                            {
                                infocustom.region_name = "未知";
                            }
                            else
                            {
                                infocustom.region_name = regionall.region_name;//园区名称
                            }

                            
                            infocustom.id = reportinfo.id;//id
                            infocustom.incident_address = reportinfo.incident_address;//id
                            infocustom.incident_time = reportinfo.incident_time.ToString("yyyy-MM-dd hh:mm:ss");//id
                            infocustom.report_time = reportinfo.report_time.ToString("yyyy-MM-dd hh:mm:ss");//id
                            infocustom.incident_status = Enum.GetName(typeof(CSM.Common.EnumClass.IncidentStatus), reportinfo.incident_status);
                            if (infocustom.incident_status == null) { infocustom.incident_status = "未知"; }
                            infocustom.report_person_phone = reportinfo.report_person_phone;//报案人电话
                            infocustom.report_person_name = reportinfo.report_person_name;//报案人姓名
                            infocustom.report_num = reportinfo.report_num;//案件编号
                            if (reportinfo.incident_status == 3 && reportinfo.ext1 != "-1")//判断是否可以转卷宗
                            {

                                infocustom.ext1 = "1";
                            }

                            else {

                                infocustom.ext1 = "-1";

                            }//infocustom.id = reportinfo.id;//id                      
                            infocustomlist.Add(infocustom);
                        }

                        object data = new
                        {
                            data = infocustomlist,
                            total = totalNumber
                        };
                        return Json(new { status = 0, msg = data }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception ex)
                    {
                        //log 接处警列表查询失败
                        return Json(new { status = 1, msg = "接处警列表查询失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
                    }
                }
                else if (type == 1)
                {
                    object data = new
                    {
                        data = reportinfoList,
                        total = totalNumber
                    };
                    return Json(new { status = 0, msg = data }, JsonRequestBehavior.AllowGet);


                }
                return Json(new { status = 1, msg = "查询接警信息时type参数错误！"}, JsonRequestBehavior.AllowGet);

            }

            catch (Exception ex)
            {
                //log 接处警列表查询失败
                return Json(new { status = 1, msg = "接处警列表查询失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        /// <summary>
        /// 获取接处警详情信息
        /// </summary>
        /// <returns></returns>
        public JsonResult GetReportDetailsById(int reportid)
        {
            List<Model.ServHandleReportModel> handlelist = new List<Model.ServHandleReportModel>();
            Model.ServReportInfoModel reportinfo = new Model.ServReportInfoModel();
            try
            {
                try
                {
                    reportinfo = reportinfobll.GetReportByID(reportid);
                }
                catch (Exception ex)
                {
                    return Json(new { status = 1, msg = "查询接触警详情时获取接警信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
                }
                try
                {                  
                    handlelist = reportinfobll.GetHandleInfoByReprotid(reportid);
                }
                catch (Exception ex)
                {
                    return Json(new { status = 1, msg = "查询接触警详情时获取处警信息失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
                }

                object data = new
                {
                    report = reportinfo,
                    handle = handlelist,
                    total = handlelist.Count
                };

                return Json(new { status = 0, msg = data }, JsonRequestBehavior.AllowGet);
            }

            catch (Exception ex)
            {
                return Json(new { status = 1, msg = "接处警详情查询失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }





        #endregion

        #region 公共方法

        /// <summary>
        /// 根据文件名判断文件类型
        /// </summary>
        /// <param name="fileurl"></param>
        /// <returns></returns>
        public int GetFileTypeByExt(string fileext)
        {
            int filetype = -1;
            string picture = ".bmp,.jpg,.jpeg,.tiff,.gif,.pcx,.tga,.exif,.fpx,.svg,.psd,.cdr,.pcd,.dxf,.ufo,.eps,.ai,.raw,.WMF";//图片格式
            string video = ".avi,.rmvb,.rm,.asf,.divx,.mpg,.mpeg,.mpe,.wmv,.mkv,.mp4,.vob,.dat,.vcd,.svcd,.mov,.qt,.mpfg,.flv,.3gp,.xvid";//视频格式
            string excel = ".xlsx,.xls,.xlsm,.xlsb,xltx,.xltm,.xlt,.xlam,.xla";//excel格式
            if (picture.IndexOf(fileext) > -1)
            {
                filetype = (int)CSM.Common.EnumClass.FileType.图片;
            }
            else if (video.IndexOf(fileext) > -1)
            {
                filetype = (int)CSM.Common.EnumClass.FileType.视频;
            }

            else if (excel.IndexOf(fileext) > -1)
            {
                filetype = (int)CSM.Common.EnumClass.FileType.Excel;
            }
            else
            {
                filetype = (int)CSM.Common.EnumClass.FileType.文件;
            }

            return filetype;
        }


        /// <summary>
        /// 导出到卷宗
        /// </summary>
        /// <returns></returns>
        public JsonResult OutArchiveInfo(int reportid)
        {
            try
            {
                List<Model.ServArchiveFileModel> archivefilelist = new List<Model.ServArchiveFileModel>();
                Model.ServArchiveInfoModel archivemodel = new Model.ServArchiveInfoModel();
                List<Model.ServReportFileModel> reportfilelist = new List<Model.ServReportFileModel>();

                Model.ServReportInfoModel reportmodel = reportinfobll.GetReportByID(reportid);//查询接警信息

                if(reportmodel.ext1 == "-1")
                {
                    return Json(new { status = 1, msg = "该案件已经转过卷宗不能重复操作！" }, JsonRequestBehavior.AllowGet);
                }

                if (reportmodel.incident_status != 3)
                {
                    return Json(new { status = 1, msg = "转卷宗操作必须在案件结案后进行！" }, JsonRequestBehavior.AllowGet);
                }

                archivemodel.archive_name = "接处警" + reportmodel.report_num;
                archivemodel.alarm_id = null;
                archivemodel.archive_decription = reportmodel.report_text;
                archivemodel.archive_num = reportmodel.report_num;
                archivemodel.archive_status = 2;
                archivemodel.create_persson_id = reportmodel.manager_id;
                archivemodel.create_time = DateTime.Now;
                archivemodel.report_person = reportmodel.report_person_name;
                archivemodel.report_type = reportmodel.report_type;
                archivemodel.update_time = DateTime.Now;
                reportfilelist = reportinfobll.GetAllBaseReportFile(reportid);
                foreach (Model.ServReportFileModel reportfilemodel in reportfilelist) {

                    Model.ServArchiveFileModel archivefilemodel = new Model.ServArchiveFileModel();

                    archivefilemodel.relate_id = reportfilemodel.relate_id;
                    archivefilemodel.type = reportfilemodel.type;
                    archivefilelist.Add(archivefilemodel);
                }

               bool bl = reportinfobll.OutArchive(archivemodel, archivefilelist);

                //int result = reportinfobll.AddReportType(reporttype_model);
                if (bl)
                {
                    reportmodel.ext1 = "-1";
                    reportinfobll.UpdataReportInfo(reportmodel);
                    return Json(new { status = 0, msg = "转卷宗成功！" }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = 1, msg = "转卷宗失败！" }, JsonRequestBehavior.AllowGet);
                }

            }

            catch (Exception ex)
            {

                return Json(new { status = 1, msg = "转卷宗失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }




        #endregion

        #region 案件类型相关
        /// <summary>
        /// 获取所有案件类型
        /// </summary>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public JsonResult GetAllReportType()
        {
            Model.QueryModel.BaseReportTypeQuery reporttype_query = new Model.QueryModel.BaseReportTypeQuery();
            List<Model.BaseReportTypeModel> reporttype_list = new List<Model.BaseReportTypeModel>();
            //reportquery.pageNumber = pageNumber;
            //reportquery.pageSize = pageSize;
            int totalNumber = 0;
            try
            {
                reporttype_list = reportinfobll.GetAllReportType();


                    object data = new
                    {
                        data = reporttype_list,
                        total = totalNumber
                    };
                return Json(new { status = 0, msg = data }, JsonRequestBehavior.AllowGet);
            }

            catch (Exception ex)
            {
                
                return Json(new { status = 1, msg = "获取案件类型列表查询失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }



        /// <summary>
        /// 添加案件类型
        /// </summary>
        /// <returns></returns>
        public JsonResult AddReportType(string type_name)
        {
            Model.BaseReportTypeModel reporttype_model = new Model.BaseReportTypeModel();
            try
            {
                reporttype_model.type_name = type_name;
                int result = reportinfobll.AddReportType(reporttype_model);
                if (result > -1)
                {
                    object data = new
                    {
                        data = result
                        // id = result
                    };
                    return Json(new { status = 0, msg = data }, JsonRequestBehavior.AllowGet);
                }
                else
                {

                    return Json(new { status = 1, msg = "添加案件类型失败！"}, JsonRequestBehavior.AllowGet);

                }

            }

            catch (Exception ex)
            {

                return Json(new { status = 1, msg = "添加案件类型失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }


        /// <summary>
        /// 添加案件类型
        /// </summary>
        /// <returns></returns>
        public JsonResult UpdataReportType(int id, string type_name)
        {
            Model.BaseReportTypeModel reporttype_model = new Model.BaseReportTypeModel();
            try
            {
                reporttype_model.id = id;
                reporttype_model.type_name = type_name;
                int result = reportinfobll.UpdataReportType(reporttype_model);
                if (result > -1)
                {
                    object data = new
                    {
                        data = result
                    };
                    return Json(new { status = 0, msg = data }, JsonRequestBehavior.AllowGet);
                }
                else
                {

                    return Json(new { status = 1, msg = "修改案件类型失败！" }, JsonRequestBehavior.AllowGet);

                }

            }

            catch (Exception ex)
            {

                return Json(new { status = 1, msg = "修改案件类型失败！" + ex.Message }, JsonRequestBehavior.AllowGet);
            }
        }




        #endregion

    }
}

