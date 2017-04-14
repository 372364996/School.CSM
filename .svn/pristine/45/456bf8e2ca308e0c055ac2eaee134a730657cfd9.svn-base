using CSM.BLL;
using CSM.Common;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Model.QueryModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CSM.Controllers
{
    public class PersonInfoController : BaseController
    {
        BaseOrganizationBLL baseOrganizationBLL = new BaseOrganizationBLL();
        ServPersonInfoBLL servPersonInfoBLL = new ServPersonInfoBLL();
        public ActionResult PersonManage()
        {
            ViewData["GenderList"] = servPersonInfoBLL.ReadPersonXml("GenderList");//性别
            ViewData["NationList"] = servPersonInfoBLL.ReadPersonXml("NationList");//民族
            ViewData["ReligionList"] = servPersonInfoBLL.ReadPersonXml("ReligionList");//宗教信仰
            ViewData["BloodTypeList"] = servPersonInfoBLL.ReadPersonXml("BloodTypeList");//血型
            ViewData["NativeLanguageList"] = servPersonInfoBLL.ReadPersonXml("NativeLanguageList");//母语
            ViewData["NationalityList"] = servPersonInfoBLL.ReadPersonXml("NationalityList");//国籍
            ViewData["PoliticalStatusList"] = servPersonInfoBLL.ReadPersonXml("PoliticalStatusList");//政治面貌
            BaseOrganizitionInfoQuery query = new BaseOrganizitionInfoQuery();
            query.region_id = 1;
            query.org_type = 1;
            List<BaseOrganizitionInfoModel> orgList = baseOrganizationBLL.GetOrganizationTree(query);
            ViewData["orgList"] = orgList;//部门
            ViewData["staffType"] = EnumClass.GetEnumModelList<EnumClass.PersonStaffType>();//职工类型
            ViewData["staffStatus"] = EnumClass.GetEnumModelList<EnumClass.PersonStaffStatus>();//职工状态
            ViewData["studentType"] = EnumClass.GetEnumModelList<EnumClass.StudentType>();//学生类型
            ViewData["studentStatus"] = EnumClass.GetEnumModelList<EnumClass.StudentStatus>();//学生状态
            ViewData["teachStatus"] = EnumClass.GetEnumModelList<EnumClass.TeachStatus>();//教师状态
            ViewData["teachLevel"] = EnumClass.GetEnumModelList<EnumClass.TeacherLevel>();//教师等级
            return View();
        }
        public ActionResult OrganizationManage()
        {
            return View();
        }

        public ActionResult IndividualInfo()
        {
            return View();
        }
        #region 组织架构
        /// <summary>
        /// 获取组织架构树列表 
        /// </summary>
        /// <returns></returns>
        public JsonResult GetOrganzationTree()
        {
            try
            {
                BaseOrganizitionInfoQuery query = new BaseOrganizitionInfoQuery();
                query.region_id = 1;
                query.org_type = 1;
                List<BaseOrganizitionInfoModel> orgList = baseOrganizationBLL.GetOrganizationTree(query);
                return Json(new { status = 0, msg = orgList });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 修改组织架构名称
        /// </summary>
        /// <param name="id"></param>
        /// <param name="name"></param>
        /// <param name="pid"></param>
        /// <returns></returns>
        public JsonResult UpdateOrgName(int id, string name, int pid, string pcode)
        {
            try
            {
                bool result = baseOrganizationBLL.UpdateOrgNameOrAddOrg(id, name, pid, pcode);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 删除组织架构以及子节点
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public JsonResult DeleteOrgById(int id)
        {
            try
            {
                bool result = baseOrganizationBLL.DeleteOrganizationById(id);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 获取组织架构gojs框架数据
        /// </summary>
        /// <param name="pid"></param>
        /// <returns></returns>
        public JsonResult GetOrganizationGoJsData(int pid)
        {
            try
            {
                GoJSModel model = baseOrganizationBLL.GetOrganizationGoJsData(pid);
                return Json(new { status = 0, msg = model });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        #endregion

        #region 人员管理
        /// <summary>
        /// 获取基础人员信息
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public JsonResult GetPersonInfoData(int pageIndex, int pageSize)
        {
            try
            {
                EasyUIDataGruidModel<List<ApiPersonInfoModel>> personList = servPersonInfoBLL.GetPersonInfo(pageIndex, pageSize);
                return Json(new { status = 0, msg = personList });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 根据人员id获取人员信息
        /// </summary>
        /// <param name="personId"></param>
        /// <returns></returns>
        public JsonResult GetPersonInfoByPersonId(int personId)
        {
            try
            {
                PersonInfoCustom perosnInfo = servPersonInfoBLL.GetPersonInfoBySSOId(personId);
                return Json(new { status = 0, msg = perosnInfo });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 同步sso人员数据
        /// </summary>
        /// <returns></returns>
        public JsonResult SynchronizationSSO()
        {
            try
            {
                bool result = servPersonInfoBLL.SynchronizationSSO();
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        //修改人员信息
        public JsonResult UpdatePersonInfo(int personId, string name, string ename, string birthday, int gender, int nation, string nativePlace, int blood, int political, int nationality, int marrigae, int religion, string IDcard, string phone, int staffFlag, int org, string jobGrade, string startTime, string worknum, int staffType, int staffStatus, int teacherFlag, string classId, int level, int teacherStatus, int studentFlag, string studentNum, string studentGrade, string studentClass, string inTime, string eduYear, string teacherName, string staffName, int studentType, int studentStatus)
        {
            try
            {
                PersonInfoCustom personInfo = new PersonInfoCustom();
                personInfo.personID = personId;
                personInfo.name = name;
                personInfo.EnName = ename;
                personInfo.birthday = birthday;
                personInfo.Gender = gender;
                personInfo.Nation = nation;
                personInfo.nativePlace = nativePlace;
                personInfo.BloodType = blood;
                personInfo.PoliticalStatus = political;
                personInfo.Nationality = nationality;
                personInfo.MarriageStatus = marrigae == 1 ? false : true;//(marrigae==1?true:false);
                personInfo.Religion = religion;
                personInfo.IDCard = IDcard;
                personInfo.phone = phone;
                personInfo.staffFlag = staffFlag;
                personInfo.org_id = org;
                personInfo.job_grade = jobGrade;
                personInfo.start_time = startTime;
                personInfo.work_num = worknum;
                personInfo.staff_type_id = staffType;
                personInfo.staff_status_id = staffStatus;
                personInfo.teacherFlag = teacherFlag;
                personInfo.faculty = classId;
                personInfo.level_id = level;
                personInfo.teach_status_id = teacherStatus;
                personInfo.studentFlag = studentFlag;
                personInfo.student_num = studentNum;
                personInfo.student_grade = studentGrade;
                personInfo.class_Name = studentClass;
                personInfo.in_time = inTime;
                personInfo.edu_year = eduYear;
                personInfo.teacher_Name = teacherName;
                personInfo.staff_Name = staffName;
                personInfo.student_type_id = studentType;
                personInfo.studentStatus_id = studentStatus;
                bool result = servPersonInfoBLL.UpdatePersonInfo(personInfo);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        //新增人员信息
        public JsonResult AddPersonInfo(string name, string ename, string birthday, int gender, int nation, string nativePlace, int blood, int political, int nationality, int marrigae, int religion, string IDcard, string phone, int staffFlag, int org, string jobGrade, string startTime, string worknum, int staffType, int staffStatus, int teacherFlag, string classId, int level, int teacherStatus, int studentFlag, string studentNum, string studentGrade, string studentClass, string inTime, string eduYear, string teacherName, string staffName, int studentType, int studentStatus, string loginName, string loginPwd)
        {
            try
            {
                PersonInfoCustom personInfo = new PersonInfoCustom();
                personInfo.name = name;
                personInfo.EnName = ename;
                personInfo.birthday = birthday;
                personInfo.Gender = gender;
                personInfo.Nation = nation;
                personInfo.nativePlace = nativePlace;
                personInfo.BloodType = blood;
                personInfo.PoliticalStatus = political;
                personInfo.Nationality = nationality;
                personInfo.MarriageStatus = marrigae == 1 ? true : false;//(marrigae==1?true:false);
                personInfo.Religion = religion;
                personInfo.IDCard = IDcard;
                personInfo.phone = phone;
                personInfo.staffFlag = staffFlag;
                personInfo.org_id = org;
                personInfo.job_grade = jobGrade;
                personInfo.start_time = startTime;
                personInfo.work_num = worknum;
                personInfo.staff_type_id = staffType;
                personInfo.staff_status_id = staffStatus;
                personInfo.teacherFlag = teacherFlag;
                personInfo.faculty = classId;
                personInfo.level_id = level;
                personInfo.teach_status_id = teacherStatus;
                personInfo.studentFlag = studentFlag;
                personInfo.student_num = studentNum;
                personInfo.student_grade = studentGrade;
                personInfo.class_Name = studentClass;
                personInfo.in_time = inTime;
                personInfo.edu_year = eduYear;
                personInfo.teacher_Name = teacherName;
                personInfo.staff_Name = staffName;
                personInfo.student_type_id = studentType;
                personInfo.studentStatus_id = studentStatus;
                personInfo.loginAdmin = loginName;
                personInfo.loginPassWord = loginPwd;
                bool result = servPersonInfoBLL.AddPersonInfo(personInfo);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 根据人员id获取角色和角色下的权限
        /// </summary>
        /// <param name="personId"></param>
        /// <returns></returns>
        public JsonResult GetRoleByPersonId(int personId)
        {
            try
            {
                List<ServRoleInfoCustom> roleList = servPersonInfoBLL.GetRoleAndPurviewByPersonId(personId);
                List<ServPurviewInfoCustom> purviewList = servPersonInfoBLL.GetPurviewByPersonId(personId);
                return Json(new { status = 0, msg = new { roleList = roleList, purviewList = purviewList } });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 根据角色id获取角色下的权限
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public JsonResult GetPurviewTreeByRoleId(int roleId)
        {
            try
            {
                List<ServPurviewInfoCustom> purviewList = servPersonInfoBLL.GetPurviewInfoByRoleId(roleId);
                return Json(new { status = 0, msg = purviewList });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        /// <summary>
        /// 绑定人员角色
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="personId"></param>
        /// <returns></returns>
        public JsonResult PersonBindRole(int roleId,int personId)
        {
            try
            {
                bool result = servPersonInfoBLL.PersonBindRole(roleId, personId);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
        #endregion
        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="userName"></param>
        /// <param name="oldPwd"></param>
        /// <param name="newPwd"></param>
        /// <returns></returns>
        public JsonResult UpdatePwd(string userName,string oldPwd,string newPwd)
        {
            try
            {
                ApiUserModel model = new ApiUserModel();
                model.UserName = userName;
                model.OldPassWord = oldPwd;
                model.NewPassWord = newPwd;
                bool result = servPersonInfoBLL.UpdatePwd(model);
                return Json(new { status = 0, msg = result });
            }
            catch (Exception ex)
            {
                return Json(new { status = 1, msg = ex.Message });
            }
        }
    }
}