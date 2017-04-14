using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;

namespace CSM.BLL
{
     public class ServReportInfoBLL
    {
        DAL.ServReportInfoDAL reportinfo = new DAL.ServReportInfoDAL();
        DAL.ServPersonInfoDAL personinfo = new DAL.ServPersonInfoDAL();
        DAL.ServAreaInfoDAL areainfo = new DAL.ServAreaInfoDAL();
        DAL.ServFileInfoDAL fileinfo = new DAL.ServFileInfoDAL();
        DAL.ServReportSuspectDAL suspectinfo = new DAL.ServReportSuspectDAL();
        DAL.ServReportFileDAL reportfileinfo = new DAL.ServReportFileDAL();
        DAL.BaseReportTypeDAL reporttypeinfo = new DAL.BaseReportTypeDAL();
        DAL.ServHandleReportDAL handleinfo = new DAL.ServHandleReportDAL();
        DAL.ServArchiveInfoDAL archiveinfo = new DAL.ServArchiveInfoDAL();
        DAL.ServArchiveFileDAL archivefileinfo = new DAL.ServArchiveFileDAL();
        DAL.BaseRegionConfigDAL regioninfo = new DAL.BaseRegionConfigDAL();


        #region 接警信息   
        /// <summary>
        /// 分页查询所有接警信息
        /// </summary>
        /// <param name="query"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <param name="totalNumber"></param>
        /// <returns></returns>
        public List<CSM.Model.ServReportInfoModel> GetAllReport(CSM.Model.QueryModel.ServReportInfoQuery query, int pageNumber, int pageSize, out int totalNumber)
        {
            try
            {
                return reportinfo.GetEntities(query, pageNumber, pageSize, out totalNumber);
            }
            catch(Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 根据id获取接警信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public CSM.Model.ServReportInfoModel GetReportByID(int id)
        {
            try
            {
                return reportinfo.GetEntity(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        /// <summary>
        /// 添加接警信息
        /// </summary>
        /// <param name="report_info"></param>
        /// <param name="file_info"></param>
        /// <param name="suspect_info"></param>
        /// <returns></returns>
        public bool AddAACInfo(Model.ServReportInfoModel report_info, List<Model.ServFileInfoModel> file_info, List<Model.ServReportSuspectModel> suspect_info)
        {
            bool bl = false;
            try
            {

                bl = true;
                int report_id = reportinfo.AddEntity(report_info);//添加接警基本信息
                if (report_id > 0)
                {//判断添加是否成功
                    //List<int> fileid_list = new List<int>();
                    if (file_info.Count() > 0)
                    {//添加接警文件信息
                        foreach (Model.ServFileInfoModel filemodel in file_info)
                        {
                            int file_id = fileinfo.AddEntity(filemodel);//往文件表中写信息
                            if (file_id > 0)//判断是否成功
                            {
                                Model.ServReportFileModel reportfile = new Model.ServReportFileModel();
                                reportfile.report_id = report_id;
                                reportfile.relate_id = file_id;
                                reportfile.type = filemodel.file_type;
                                reportfile.handle_id = -1;//接警时处警id为-1
                                int reportfile_id = reportfileinfo.AddEntity(reportfile);//往接处警文件关联表中写数据
                                if (reportfile_id < 0)
                                {//判断是否成功

                                    bl = false;
                                }
                            }
                            else {
                                bl = false;
                            }
                        }
                    }

                    if (suspect_info.Count() > 0)//开始添加嫌疑人信息
                    {
                        foreach (Model.ServReportSuspectModel suspectmodel in suspect_info)
                        {
                            suspectmodel.report_id = report_id;//添加接警id信息
                            int suspect_id = suspectinfo.AddEntity(suspectmodel);
                            if (suspect_id < 0)
                            {//判断是否成功

                                bl = false;
                            }
                        }
                    }

                }
                else { bl = false; }
            }
            catch (Exception ex)
            {
                bl = false;
                throw ex;
            }
            return bl;
        }


        /// <summary>
        /// 更新接警信息
        /// </summary>
        /// <returns></returns>
        public bool UpdataReprotInfo(CSM.Model.ServReportInfoModel report_info, List<CSM.Model.CustomModel.ReportFileInfo> file_info, List<CSM.Model.ServReportSuspectModel> suspect_info)
        {
            bool bl = false;
            try
            {
                int result = reportinfo.UpdateReportInfoById(report_info);
                if (result > 0)
                {
                    if (suspect_info.Count() > 0)
                    {
                        foreach (CSM.Model.ServReportSuspectModel suspect in suspect_info)
                        {
                            if (suspect.id > 0)//判断是否是已有数据
                            {
                                int suspect_reultup = suspectinfo.UpdateReportSuspectById(suspect);
                                if (suspect_reultup < 0)
                                {
                                    return bl;
                                }
                            }
                            else
                            {

                                int suspect_reultadd = suspectinfo.AddEntity(suspect);
                                if (suspect_reultadd < 0)
                                {
                                    return bl;
                                }
                            }
                        }

                    }
                    if (file_info.Count() > 0)
                    {
                        foreach (CSM.Model.CustomModel.ReportFileInfo filemodel in file_info)
                        {

                            Model.ServFileInfoModel fileinfomodel = new Model.ServFileInfoModel();
                            fileinfomodel.id = filemodel.fileid;
                            fileinfomodel.person_id = filemodel.person_id;
                            fileinfomodel.content = filemodel.content;
                            fileinfomodel.create_time = filemodel.create_time;
                            fileinfomodel.file_address = filemodel.file_address;
                            fileinfomodel.file_ext_name = filemodel.file_ext_name;
                            fileinfomodel.file_name = filemodel.file_name;
                            fileinfomodel.file_type = filemodel.file_type;
                            fileinfomodel.ext1 = filemodel.ext1;
                            fileinfomodel.ext2 = filemodel.ext2;
                            fileinfomodel.ext3 = filemodel.ext3;
                            fileinfomodel.ext4 = filemodel.ext4;
                            fileinfomodel.ext5 = filemodel.ext5;


                            if (filemodel.file_ext_name == "-1")
                            {

                                int rfileid = DelReportFileByID(filemodel.id);
                                if (rfileid > -1)
                                {

                                    int fileid = DelFileByID(filemodel.fileid);

                                    if (fileid < 0)
                                    {
                                        return bl;
                                    }
                                }
                                else {
                                    return bl;

                                }
                            }

                            if (filemodel.fileid > 0)//判断是否是已有数据
                            {
                                int file_reultup = fileinfo.UpdateFileInfoById(fileinfomodel);
                                if (file_reultup < 0)
                                {
                                    return bl;
                                }
                            }
                            else
                            {
                                int file_reultadd = fileinfo.AddEntity(fileinfomodel);
                                if (file_reultadd < 0)
                                {
                                    return bl;
                                }
                                else {
                                    filemodel.fileid = file_reultadd;
                                }
                            }


                            Model.ServReportFileModel reportfilemodel = new Model.ServReportFileModel();
                            reportfilemodel.id = filemodel.id;
                            reportfilemodel.relate_id = filemodel.fileid;
                            reportfilemodel.report_id = filemodel.report_id;
                            reportfilemodel.handle_id = filemodel.handle_id;
                            reportfilemodel.type = filemodel.file_type;

                            if (filemodel.id > 0)//判断是否是已有数据
                            {
                                int reportfile_reultup = reportfileinfo.UpdateReportFileById(reportfilemodel);
                                if (reportfile_reultup < 0)
                                {
                                    return bl;
                                }
                            }
                            else
                            {
                                int reportfile_reultadd = reportfileinfo.AddEntity(reportfilemodel);
                                if (reportfile_reultadd < 0)
                                {
                                    return bl;
                                }

                            }

                        }
                    }
                    bl = true;
                }
                else {

                    return bl;
                }

                return bl;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }



        /// <summary>
        /// 更新接警基础信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int UpdataReportInfo(CSM.Model.ServReportInfoModel report_info)
        {
            try
            {
                return reportinfo.UpdateReportInfoById(report_info);
                 
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }



        #endregion

        #region 嫌疑人信息 
        /// <summary>
        /// 根据接警id获取嫌疑人信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public List<CSM.Model.ServReportSuspectModel> GetSuspectByReportID(int id)
        {
            try
            {
                return suspectinfo.GetEntityByreport_id(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /// <summary>
        /// 根据id删除嫌疑人信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DelSuspectByID(int id)
        {
            try
            {
                int result = suspectinfo.DeleteReportSuspectById(id);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /// <summary>
        /// 根据嫌疑人姓名查找嫌疑人信息
        /// </summary>
        /// <returns></returns>
        public List<Model.ServReportSuspectModel> GetSuspectInfoByName(string  name, int pageNumber, int pageSize, out int totalNumber)
        {
            try
            {
                return suspectinfo.GetEntitiesByName(name,pageNumber,pageSize, out totalNumber);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }



        /// <summary>
        /// 添加嫌疑人信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool AddSuspect(List<Model.ServReportSuspectModel> suspect_info,int report_id)
        {
            bool bl = false;
            try
            {
                if (suspect_info.Count() > 0)//开始添加嫌疑人信息
                {
                    foreach (Model.ServReportSuspectModel suspectmodel in suspect_info)
                    {
                        suspectmodel.report_id = report_id;//添加接警id信息
                        int suspect_id = suspectinfo.AddEntity(suspectmodel);
                        if (suspect_id < 0)
                        {//判断是否成功

                            bl = false;
                        }
                    }
                    bl = true;
                }
                return bl;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }



        #endregion

        #region 关联文件信息 
        /// <summary>
        /// 根据id删除关联文件
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DelReportFileByID(int id)
        {
            try
            {
                int result = reportfileinfo.DeleteReportFileById(id);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        /// <summary>
        /// 根据id删除文件列表信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int DelFileByID(int id)
        {
            try
            {
                int result = fileinfo.DeleteFileInfoById(id);
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 获取接处警关联文件
        /// </summary>
        public List<Model.CustomModel.ReportFileInfo> GetReportFileByreport_id(int report_id, int handleid)
        {
            try
            {
                List<Model.CustomModel.ReportFileInfo> filecustomlist = new List<Model.CustomModel.ReportFileInfo>();
                List<Model.ServReportFileModel> reportfilelist = reportfileinfo.GetEntityByreport_id(report_id);

                if (reportfilelist.Count() > 0)
                {
                    foreach (Model.ServReportFileModel reportfile in reportfilelist)
                    {
                        Model.CustomModel.ReportFileInfo filecustom = new Model.CustomModel.ReportFileInfo();
                        //if (reportfile.handle_id > 0 && handleid > 0)//处警文件
                        //{
                        //    Model.ServFileInfoModel filemodel = fileinfo.GetEntity(reportfile.relate_id);
                        //    if (filemodel != null)
                        //    {
                        //        filecustom.id = reportfile.id;//关联表id
                        //        filecustom.report_id = reportfile.report_id;//接警id
                        //        filecustom.handle_id = reportfile.handle_id;//处警id
                        //        filecustom.relate_id = reportfile.relate_id;//附件id
                        //        filecustom.type = reportfile.type;
                        //        filecustom.fileid = filemodel.id;//文件表id
                        //        filecustom.file_name = filemodel.file_name;
                        //        filecustom.file_ext_name = filemodel.file_ext_name;
                        //        filecustom.file_address = filemodel.file_address;
                        //        filecustom.create_time = filemodel.create_time;
                        //        filecustom.person_id = filemodel.person_id;
                        //        filecustom.file_type = filemodel.file_type;
                        //        filecustom.content = filemodel.content;
                        //        filecustom.ext1 = filemodel.ext1;
                        //        filecustom.ext2 = filemodel.ext2;
                        //        filecustom.ext3 = filemodel.ext3;
                        //        filecustom.ext4 = filemodel.ext4;
                        //        filecustom.ext5 = filemodel.ext5;
                        //    }
                        //    else {

                        //        filecustomlist = new List<Model.CustomModel.ReportFileInfo>();
                        //        return filecustomlist;
                        //    }

                        //}
 
                        if (reportfile.handle_id == handleid)//接警文件
                        {
                            Model.ServFileInfoModel filemodel = fileinfo.GetEntity(reportfile.relate_id);
                            if (filemodel != null)
                            {
                                filecustom.id = reportfile.id;//关联表id
                                filecustom.report_id = reportfile.report_id;//接警id
                                filecustom.handle_id = reportfile.handle_id;//处警id
                                filecustom.relate_id = reportfile.relate_id;//附件id
                                filecustom.type = reportfile.type;
                                filecustom.fileid = filemodel.id;//文件表id
                                filecustom.file_name = filemodel.file_name;
                                filecustom.file_ext_name = filemodel.file_ext_name;
                                filecustom.file_address = filemodel.file_address;
                                filecustom.create_time = filemodel.create_time;
                                filecustom.person_id = filemodel.person_id;
                                filecustom.file_type = filemodel.file_type;
                                filecustom.content = filemodel.content;
                                filecustom.ext1 = filemodel.ext1;
                                filecustom.ext2 = filemodel.ext2;
                                filecustom.ext3 = filemodel.ext3;
                                filecustom.ext4 = filemodel.ext4;
                                filecustom.ext5 = filemodel.ext5;
                            }
                            else {

                                filecustomlist = new List<Model.CustomModel.ReportFileInfo>();
                                return filecustomlist;
                            }
                            filecustomlist.Add(filecustom);
                        }
                        
                    }
                }
                return filecustomlist;

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }



        /// <summary>
        /// 根据接警id获取接处警关联文件
        /// </summary>
        public List<Model.ServReportFileModel> GetAllBaseReportFile(int report_id)
        {
            try
            {
                List<Model.CustomModel.ReportFileInfo> filecustomlist = new List<Model.CustomModel.ReportFileInfo>();
                List<Model.ServReportFileModel> reportfilelist = reportfileinfo.GetEntityByreport_id(report_id);

                return reportfilelist;

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }



        /// <summary>
        /// 添加关联文件
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public bool AddReportFile(List<Model.ServFileInfoModel> file_info, int report_id, int handle_id)
        {
            bool bl = true;
            try
            {
                if (file_info.Count() > 0)
                {//添加接警文件信息
                    foreach (Model.ServFileInfoModel filemodel in file_info)
                    {
                        int file_id = fileinfo.AddEntity(filemodel);//往文件表中写信息
                        if (file_id > 0)//判断是否成功
                        {
                            Model.ServReportFileModel reportfile = new Model.ServReportFileModel();
                            reportfile.report_id = report_id;
                            reportfile.relate_id = file_id;
                            reportfile.type = filemodel.file_type;
                            reportfile.handle_id = handle_id;//接警时处警id为-1
                            int reportfile_id = reportfileinfo.AddEntity(reportfile);//往接处警文件关联表中写数据
                            if (reportfile_id < 0)
                            {//判断是否成功

                                bl = false;
                            }
                        }
                        else {
                            bl = false;
                        }
                    }
                }
                return bl;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        #endregion

        #region 其他相关信息

        /// <summary>
        /// 获取所有人员信息
        /// </summary>
        /// <returns></returns>
        public List<CSM.Model.ServPersonInfoModel> GetAllPerson()
        {
            CSM.Model.QueryModel.ServPersonInfoQuery query = new Model.QueryModel.ServPersonInfoQuery();
            try
            {
                return personinfo.GetEntities(query);
            }
            catch (Exception ex)
            {

                throw ex;
            }
         }

        /// <summary>
        /// 根据id获取人员信息
        /// </summary>
        /// <returns></returns>
        public CSM.Model.ServPersonInfoModel GetPersonById(int id)
        {
            try
            {
                return personinfo.GetPersonInfoBySSOId(id);
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }




        /// <summary>
        /// 获取所有区域
        /// </summary>
        /// <returns></returns>
        public List<CSM.Model.ServAreaInfoModel> GetAllArea()
        {
            CSM.Model.QueryModel.ServAreaInfoQuery query = new Model.QueryModel.ServAreaInfoQuery();
            try
            {
                return areainfo.GetEntities(query);
            }

            catch (Exception ex)
            {
                throw ex;
            }

        }


        /// <summary>
        /// 根据园区id获取区域
        /// </summary>
        /// <returns></returns>
        public List<CSM.Model.ServAreaInfoModel> GetAllAreaByRegion(int regionid)
        {
            try
            { 
                return areainfo.GetAreaInfoTree(regionid);
            }

            catch (Exception ex)
            {
                throw ex;
            }
         }

        /// <summary>
        /// 根据园区id园区信息
        /// </summary>
        /// <returns></returns>
        public CSM.Model.BaseRegionConfigModel GetRegionInfoById(int regionid)
        {
            try
            {
                return regioninfo.GetEntity(regionid);
            }

            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 根据id获取区域信息
        /// </summary>
        /// <returns></returns>
        public CSM.Model.ServAreaInfoModel GetAreaByID(int id)
        {
            try
            {
                return  areainfo.GetEntity(id);
             }
            catch (Exception ex)
            {
                throw ex;
            }

        }



        /// <summary>
        /// 导出到卷宗
        /// </summary>
        /// <returns></returns>
        public bool OutArchive(Model.ServArchiveInfoModel archivemodel,List<Model.ServArchiveFileModel> archivefilelist)
        {
            bool bl = false;
            try
            {
                bl = true;
                int result = archiveinfo.AddEntity(archivemodel);
                if (result > 0)
                {

                    foreach (Model.ServArchiveFileModel archivefile in archivefilelist)
                    {
                        archivefile.archive_id = result;
                        int resultfile =  archivefileinfo.AddEntity(archivefile);
                        if (resultfile < 0)
                        {
                            bl = false;
                        }
                    }

                }
                else {

                    bl = false;
                }
                
            }
            catch (Exception ex)
            {
                bl = false;
                throw ex;
            }
            return bl;
        }
        #endregion

            #region 案件类型相关

            /// <summary>
            /// 获取所有案件类型
            /// </summary>
            /// <returns></returns>
        public List<CSM.Model.BaseReportTypeModel> GetAllReportType()
        {
            CSM.Model.QueryModel.BaseReportTypeQuery query = new Model.QueryModel.BaseReportTypeQuery();
            try
            {
                return reporttypeinfo.GetEntities(query);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /// <summary>
        /// 添加案件类型
        /// </summary>
        /// <returns></returns>
        public int AddReportType(CSM.Model.BaseReportTypeModel reporttype_model)
        {
            try
            {
                return reporttypeinfo.AddEntity(reporttype_model);
                       
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /// <summary>
        /// 修改案件类型
        /// </summary>
        /// <returns></returns>
        public int UpdataReportType(CSM.Model.BaseReportTypeModel reporttype_model)
        {
            try
            {
                return reporttypeinfo.UpdateReportTypeById(reporttype_model);

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        /// <summary>
        /// 根据id获取案件类型
        /// </summary>
        /// <returns></returns>
        public CSM.Model.BaseReportTypeModel GetReportTypeByID(int id)
        {
            try
            {
                return reporttypeinfo.GetEntity(id);
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        #endregion

        #region 处警信息

        /// <summary>
        /// 添加处警信息
        /// </summary>
        /// <returns></returns>
        public bool AddHandleInfo(Model.ServHandleReportModel handle_info, List<Model.ServFileInfoModel> file_info)
        {
            bool bl = false;
            try
            {
                int result = handleinfo.AddEntity(handle_info);//添加处警
                int handleid = result;
                Model.ServReportInfoModel reportinfo = GetReportByID(handle_info.report_id);//查询接警信息
                if (handle_info.handle_type == 1&& reportinfo.incident_status != 3) {
                    reportinfo.incident_status = (int)CSM.Common.EnumClass.IncidentStatus.处警;//案件状态
                }
                if (handle_info.handle_type == 2)
                {
                    reportinfo.incident_status = (int)CSM.Common.EnumClass.IncidentStatus.结案;//案件状态
                }
                result = UpdataReportInfo(reportinfo);//更新接警信息
                if (result > -1)
                {
                    if (file_info.Count() > 0)
                    {//添加接警文件信息
                        foreach (Model.ServFileInfoModel filemodel in file_info)
                        {
                            int file_id = fileinfo.AddEntity(filemodel);//往文件表中写信息
                            if (file_id > 0)//判断是否成功
                            {
                                Model.ServReportFileModel reportfile = new Model.ServReportFileModel();
                                reportfile.report_id = handle_info.report_id;
                                reportfile.relate_id = file_id;
                                reportfile.type = filemodel.file_type;
                                reportfile.handle_id = handleid;//接警时处警id为-1
                                int reportfile_id = reportfileinfo.AddEntity(reportfile);//往接处警文件关联表中写数据
                                if (reportfile_id < 0)
                                {//判断是否成功

                                    bl = false;
                                }
                            }
                            else {
                                bl = false;
                            }
                        }
                    }

                    bl = true;
                }
                return bl;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }



        /// <summary>
        /// 更新处警基础信息
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public int UpdataHandleInfo(CSM.Model.ServHandleReportModel handle_info)
        {
            try
            {
                return handleinfo.UpdateHandleReportById(handle_info);

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /// <summary>
        /// 根据案件编号查询处警
        /// </summary>
        /// <returns></returns>
        public List<Model.ServHandleReportModel> GetHandleInfoByReprotid(int reportid) {
            try
            {
                return handleinfo.GetEntitiesByreport_id(reportid);
            }
            catch (Exception)
            {

                throw;
            }
        }



        /// <summary>
        /// 根据处警id查询处警信息
        /// </summary>
        /// <returns></returns>
        public Model.ServHandleReportModel GetHandleInfoById(int handleid)
        {
            try
            {
                return handleinfo.GetEntity(handleid);
            }
            catch (Exception)
            {

                throw;
            }
        }



        /// <summary>
        /// 根据id删除触警结案信息
        /// </summary>
        /// <returns></returns>
        public bool DelHandleInfo(int reportid, int handleid, string apppath)
        {
            bool bl = false;
            try
            {
                //Model.ServReportInfoModel reportinfomodel = reportinfo.GetEntity(reportid);
                //string report_num = reportinfomodel.report_num;
                int result = handleinfo.DeleteHandleById(handleid);//删除处警信息
                if (result < 0)
                {
                    return bl;
                }
                List<Model.CustomModel.ReportFileInfo> reportfilelist = GetReportFileByreport_id(reportid, handleid);
                if (reportfilelist.Count() > 0)
                {
                    foreach (Model.CustomModel.ReportFileInfo reportfile in reportfilelist)
                    {

                        try {
                            string localPath = Path.Combine(apppath, reportfile.file_address);
                            if (System.IO.Directory.Exists(localPath))
                            {
                                DirectoryInfo di = new DirectoryInfo(localPath);
                                di.Delete(true);
                            }
                        }
                        catch (Exception ex) {

                            throw;

                        }
                        int reportfilereult = reportfileinfo.DeleteReportFileById(reportfile.id);
                        int fileresult = fileinfo.DeleteFileInfoById(reportfile.relate_id);

                        if (reportfilereult < 0 || fileresult < 0)
                        {

                            return bl;
                        }
                    }
                }
                bl = true;
                return bl;

            }
            catch (Exception ex)
            {
                throw ex;
            }

        }




        /// <summary>
        /// 根据接警id查询此案件是否已结案
        /// </summary>
        /// <returns>枚举IncidentStatus 1：接警 2：处警 3:结案</returns>
        public int GetIncidentStatus(int id)
        {
            try
            {

                List<Model.ServHandleReportModel> handlelist = handleinfo.GetEntitiesByreport_id(id);
                if (handlelist.Count == 0)
                {
                    return  (int)Common.EnumClass.IncidentStatus.接警;
                }
                foreach (Model.ServHandleReportModel handlemodel in handlelist)
                {

                    if (handlemodel.handle_type == 2) {

                        return (int)Common.EnumClass.IncidentStatus.结案;
                    }
                }

                return (int)Common.EnumClass.IncidentStatus.处警;
            }
            catch (Exception)
            {
                throw;
            }
        }



        #endregion

        #region 接处警全面信息
        /// <summary>
        /// 根据id删除接触警
        /// </summary>
        /// <returns></returns>
        public bool DelReportInfo(int id, string apppath)
        {
            bool bl = false;
            try
            {
                Model.ServReportInfoModel reportinfomodel = reportinfo.GetEntity(id);
                string report_num = reportinfomodel.report_num;
                int result = reportinfo.DeleteReportInfoById(id);

                if (result < 0)
                {
                    return bl;
                }
                List<Model.ServReportFileModel> reportfilelist = reportfileinfo.GetEntityByreport_id(id);
                if (reportfilelist.Count() > 0)
                {
                    foreach (Model.ServReportFileModel reportfile in reportfilelist)
                    {

                        int reportfilereult = reportfileinfo.DeleteReportFileById(reportfile.id);
                        int fileresult = fileinfo.DeleteFileInfoById(reportfile.relate_id);

                        if (reportfilereult < 0 || fileresult < 0)
                        {

                            return bl;
                        }
                    }
                }
                List<Model.ServReportSuspectModel> reportsuspectlist = suspectinfo.GetEntityByreport_id(id);
                if (reportsuspectlist.Count() > 0)
                {
                    foreach (Model.ServReportSuspectModel reportsuspect in reportsuspectlist)
                    {

                        int suspectreult = suspectinfo.DeleteReportSuspectById(reportsuspect.id);
                        if (suspectreult < 0)
                        {

                            return bl;
                        }
                    }
                }

                List<Model.ServHandleReportModel> handlelist = handleinfo.GetEntitiesByreport_id(id);
                if (reportsuspectlist.Count() > 0)
                {
                    foreach (Model.ServHandleReportModel handlemodel in handlelist)
                    {

                        int handlereult = suspectinfo.DeleteReportSuspectById(handlemodel.id);
                        if (handlereult < 0)
                        {

                            return bl;
                        }
                    }
                }


                string localPath = Path.Combine(apppath, "Upload/Report/" + report_num);
                if (System.IO.Directory.Exists(localPath))
                {
                    DirectoryInfo di = new DirectoryInfo(localPath);
                    di.Delete(true);
                }
                bl = true;
                return bl;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }

        /// <summary>
        /// 根据搜索条件获取接触警信息
        /// </summary>
        /// <returns></returns>
        public List<Model.ServReportInfoModel> SarechReportInfo(Model.QueryModel.ServReportInfoQuery reportquery, int pageNumber, int pageSize, out int totalNumber)
        {

            try
            {
                List<Model.ServReportInfoModel> reportinfoList = new List<Model.ServReportInfoModel>();

                reportinfoList = reportinfo.GetSearchReportInfo(reportquery, pageNumber, pageSize, out totalNumber);

                return reportinfoList;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }
        
         
        #endregion


    }
}




