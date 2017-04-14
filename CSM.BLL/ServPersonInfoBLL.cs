using CSM.DAL;
using CSM.Model;
using CSM.Model.CustomModel;
using CSM.Utils;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using static CSM.Common.EnumClass;
using System.Configuration;
using System.Xml;
using CSM.Model.QueryModel;
using CSM.Common;

namespace CSM.BLL
{
    public class ServPersonInfoBLL
    {
        ServPersonInfoDAL servPersonInfoDAL = new ServPersonInfoDAL();
        BasePersonRelationshipDAL basePersonRelationshipDAL = new BasePersonRelationshipDAL();
        ServStudentInfoDAL servStudentInfoDAL = new ServStudentInfoDAL();
        ServStaffInfoDAL servStaffInfoDAL = new ServStaffInfoDAL();
        ServTeacherInfoDAL servTeacherInfoDAL = new ServTeacherInfoDAL();
        BaseOrganizitionInfoDAL baseOrganizationDAL = new BaseOrganizitionInfoDAL();
        ServRoleInfoDAL servRoleInfoDAL = new ServRoleInfoDAL();
        ServPurviewInfoDAL servPurviewInfoDAL = new ServPurviewInfoDAL();
        ServRolePurviewDAL servRolePurviewDAL = new ServRolePurviewDAL();
        BaseRegionConfigDAL baseRegionConfigDAL = new BaseRegionConfigDAL();
        public static readonly string personIp = ConfigurationManager.AppSettings["SSOServerIP"];
        /// <summary>
        /// 分页获取人员基础信息
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns></returns>
        public EasyUIDataGruidModel<List<ApiPersonInfoModel>> GetPersonInfo(int pageIndex, int pageSize)
        {
            try
            {
                ApiPersonInfoModel model = new ApiPersonInfoModel();
                model.PageIndex = pageIndex;
                model.PageSize = pageSize;
                string parStr = JsonHelper.ObjectToString<ApiPersonInfoModel>(model);
                string str = HttpHelper.PostWebRequestBandError("http://" + personIp + "/ApiPersonInfo/GetPersonInfoList", parStr, "application/json;charset=utf-8", Encoding.UTF8);
                EasyUIDataGruidModel<List<ApiPersonInfoModel>> personList = new EasyUIDataGruidModel<List<ApiPersonInfoModel>>();
                personList = JsonHelper.StringToObject<EasyUIDataGruidModel<List<ApiPersonInfoModel>>>(str);
                return personList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据人员id获取本系统中的人员信息
        /// </summary>
        /// <param name="personId"></param>
        /// <returns></returns>
        public ServPersonInfoModel GetPersonInfoByPersonId(int personId)
        {
            try
            {
                ServPersonInfoModel model = servPersonInfoDAL.GetPersonInfoBySSOId(personId);
                return model;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据人员id获取人员信息
        /// </summary>
        /// <param name="ssoId"></param>
        public PersonInfoCustom GetPersonInfoBySSOId(int ssoId)
        {
            try
            {
                //查询人员基础信息
                ApiPersonInfoModel apiModel = GetPostPersonInfoByPersonId(ssoId);

                //查询人员关联信息
                PersonInfoCustom personModel = new PersonInfoCustom();
                if (apiModel != null)
                {
                    personModel.personID = apiModel.PersonID;//人员编号
                    personModel.name = apiModel.Name;//姓名
                    //性别
                    personModel.genderName = apiModel.GenderName;
                    personModel.Gender = apiModel.Gender;
                    //民族
                    personModel.nationName = apiModel.NationName;
                    personModel.Nation = apiModel.Nation;
                    //生日
                    personModel.birthday = apiModel.Birthday;
                    //血型
                    personModel.bloodTypeName = apiModel.BloodTypeName;
                    personModel.BloodType = apiModel.BloodType;
                    //宗教
                    personModel.religionName = apiModel.ReligionName;
                    personModel.Religion = apiModel.Religion;
                    //籍贯
                    personModel.nativePlace = apiModel.NativePlace;
                    //国籍
                    personModel.nationalityName = apiModel.NationalityName;
                    personModel.Nationality = apiModel.Nationality;
                    //政治面貌
                    personModel.politicalStatusName = apiModel.PoliticalStatusName;
                    personModel.PoliticalStatus = apiModel.PoliticalStatus;
                    //婚姻
                    personModel.MarriageStatus = apiModel.MarriageStatus;
                    personModel.marriageStatusName = apiModel.MarriageStatus == null ? "" : ((bool)apiModel.MarriageStatus) ? "已婚" : "未婚";
                    //照片
                    personModel.photoFileName = apiModel.PhotoFileName;
                    //身份证
                    personModel.IDCard = apiModel.IDCard;
                    //证件号
                    personModel.workNO = apiModel.WorkNO;
                    //学院
                    personModel.college = apiModel.College;
                    //一卡通卡号
                    personModel.oneCardNumber = apiModel.OneCardNumber;
                    //手机号
                    personModel.phone = apiModel.Phone;
                    //人员类型
                    personModel.PersonType = apiModel.PersonType;
                    personModel.PersonTypeName = apiModel.PersonTypeName;
                    //部门
                    personModel.department = apiModel.Department;
                    personModel.DepartmentID = apiModel.DepartmentID;
                    //根据人员id查询人员类型，然后根据类型查询对应的扩展表
                    List<BasePersonRelationshipModel> relationList = basePersonRelationshipDAL.GetPersonTypeByPersonId(ssoId);
                    for (int i = 0; i < relationList.Count; i++)
                    {
                        switch (relationList[i].type_id)
                        {
                            case (int)PersonType.学生:
                                ServStudentInfoModel student = servStudentInfoDAL.GetStudentInfoByPersonId(relationList[i].person_id);
                                if (student != null)
                                {
                                    personModel.studentFlag = 1;
                                    personModel.student_num = student.student_num;
                                    personModel.student_grade = student.student_grade.ToString();
                                    personModel.class_Name = student.class_id.ToString();
                                    personModel.in_time = student.in_time == null ? "" : Convert.ToDateTime(student.in_time).ToString("yyyy-MM-dd HH:mm:ss");
                                    personModel.edu_year = student.edu_year.ToString();
                                    personModel.teacher_Name = student.teacher_id;
                                    personModel.staff_Name = student.staff_id;
                                    personModel.student_type_id = student.student_type;
                                    personModel.student_type = ((StudentType)student.student_type).ToString();
                                    personModel.studentStatus_id = student.status;
                                    personModel.studentStatus = ((StudentStatus)student.status).ToString();
                                }
                                break;
                            case (int)PersonType.教师:
                                ServTeacherInfoModel teacherModel = servTeacherInfoDAL.GetTeacherInfoByPersonId(relationList[i].person_id);
                                if (teacherModel != null)
                                {
                                    personModel.teacherFlag = 1;
                                    personModel.faculty = teacherModel.class_id.ToString();
                                    personModel.faculty = teacherModel.class_id;
                                    personModel.level = ((TeacherLevel)teacherModel.level).ToString();
                                    personModel.level_id = teacherModel.level;
                                    personModel.teach_Status = ((TeachStatus)teacherModel.status).ToString();
                                    personModel.teach_status_id = teacherModel.status;
                                }
                                break;
                            case (int)PersonType.职工:
                                ServStaffInfoModel staffInfo = servStaffInfoDAL.GetStaffInfoByPersonId(relationList[i].person_id);
                                if (staffInfo != null)
                                {
                                    personModel.staffFlag = 1;
                                    //部门
                                    personModel.org_id = staffInfo.org_id;
                                    BaseOrganizitionInfoModel orgmodel = baseOrganizationDAL.GetEntity(staffInfo.org_id);
                                    personModel.orgName = orgmodel == null ? "" : orgmodel.org_name;
                                    personModel.job_grade = staffInfo.job_grade;
                                    personModel.start_time = staffInfo.start_time == null ? "" : Convert.ToDateTime(staffInfo.start_time).ToString("yyyy-MM-dd HH:mm:ss");
                                    personModel.work_num = staffInfo.work_num;
                                    personModel.staff_type_id = staffInfo.staff_type;
                                    personModel.staff_type = ((PersonStaffType)staffInfo.staff_type).ToString();
                                    personModel.staff_status_id = staffInfo.staff_status;
                                    personModel.staff_status = ((PersonStaffStatus)staffInfo.staff_status).ToString();
                                }
                                break;
                        }
                    }
                }
                return personModel;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据人员编号查询人员基础信息
        /// </summary>
        /// <param name="personId"></param>
        /// <returns></returns>
        public ApiPersonInfoModel GetPostPersonInfoByPersonId(int personId)
        {
            try
            {
                ApiPersonInfoModel query = new ApiPersonInfoModel();
                query.PersonID = personId;
                string parStr = JsonHelper.ObjectToString<ApiPersonInfoModel>(query);
                string str = HttpHelper.PostWebRequestBandError("http://" + personIp + "/ApiPersonInfo/GetPersonByID", parStr, "application/json;charset=utf-8", Encoding.UTF8);
                ApiPersonInfoModel model = JsonHelper.StringToObject<ApiPersonInfoModel>(str);
                return model;
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }
        /// <summary>
        /// 同步sso人员
        /// </summary>
        /// <returns></returns>
        public bool SynchronizationSSO()
        {
            try
            {
                bool result = true;
                //从sso获取所有人员信息
                string str = HttpHelper.HttpGet("http://" + personIp + "/ApiPersonInfo/GetPersonList", "", "application/json;charset=utf-8");
                List<ApiPersonInfoModel> personList = JsonHelper.StringToObject<List<ApiPersonInfoModel>>(str);
                for (int i = 0; i < personList.Count; i++)
                {
                    ServPersonInfoModel model = servPersonInfoDAL.GetPersonInfoBySSOId(personList[i].PersonID);
                    if (model == null)//数据库中没有需要同步
                    {
                        ServPersonInfoModel entity = new ServPersonInfoModel();
                        entity.ssoid = personList[i].PersonID;
                        entity.status = (int)PersonState.在职;
                        entity.role_id = 0;//初始没角色权限
                        entity.alias = personList[i].Name;//别名
                        int id = servPersonInfoDAL.AddEntity(entity);
                        if (id != 0)
                        {
                            result = true;
                        }
                    }
                    else//数据库中已有
                    {
                        if (personList[i].Name != model.alias)//名称发生变化
                        {
                            ServPersonInfoModel Upmodel = new ServPersonInfoModel();
                            Upmodel.id = model.id;
                            Upmodel.role_id = model.role_id;
                            Upmodel.ssoid = model.ssoid;
                            Upmodel.status = model.status;
                            Upmodel.alias = personList[i].Name;
                            int num = servPersonInfoDAL.UpdatePersonInfoById(Upmodel);
                            if (num != 0)
                            {
                                result = true;
                            }
                        }
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
        /// 根据节点名称查询民族、性别xml
        /// </summary>
        /// <param name="nodeName">节点名称</param>
        /// <returns></returns>
        public List<PersonXmlCustom> ReadPersonXml(string nodeName)
        {
            try
            {
                List<PersonXmlCustom> list = new List<PersonXmlCustom>();
                XmlDocument xmlDoc = new XmlDocument();
                xmlDoc.Load("http://" + personIp + "/XML/SystemEnum.xml");
                XmlNodeList xnode = xmlDoc.GetElementsByTagName(nodeName);
                if (xnode == null) { return list; }
                XmlNodeList nodeList = xnode[0].ChildNodes;
                foreach (XmlNode item in nodeList)
                {
                    PersonXmlCustom personXml = new PersonXmlCustom();
                    XmlElement ex = (XmlElement)item;
                    personXml.name = ex.GetElementsByTagName("name").Item(0).InnerText;
                    personXml.code = ex.GetElementsByTagName("code").Item(0).InnerText;
                    personXml.id = ex.GetElementsByTagName("id").Item(0).InnerText;
                    personXml.remakr = ex.GetElementsByTagName("remark").Item(0).InnerText;
                    personXml.state = ex.GetElementsByTagName("state").Item(0).InnerText;
                    list.Add(personXml);
                }
                return list;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改人员信息
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool UpdatePersonInfo(PersonInfoCustom model)
        {
            try
            {
                bool result = true;
                //修改人员基础信息
                ApiPersonInfoModel personModel = new ApiPersonInfoModel();
                personModel.PersonID = model.personID;
                personModel.Name = model.name;
                personModel.EnName = model.EnName;
                personModel.Gender = model.Gender;
                personModel.Nation = model.Nation;
                personModel.Birthday = model.birthday;
                personModel.BloodType = model.BloodType;
                personModel.Religion = model.Religion;
                personModel.NativePlace = model.nativePlace;
                personModel.Nationality = model.Nationality;
                personModel.PoliticalStatus = model.PoliticalStatus;
                personModel.MarriageStatus = model.MarriageStatus;
                personModel.IDCard = model.IDCard;
                personModel.Phone = model.phone;
                string parStr = JsonHelper.ObjectToString<ApiPersonInfoModel>(personModel);
                string str = HttpHelper.PostWebRequestBandError("http://" + personIp + "/ApiPersonInfo/UpdatePersonInfo", parStr, "application/json;charset=utf-8", Encoding.UTF8);
                int result1 = JsonHelper.StringToObject<int>(str);
                if (result1 == 1)
                {
                    result = false;
                }
                List<BasePersonRelationshipModel> relationList = basePersonRelationshipDAL.GetPersonTypeByPersonId(model.personID);
                //职工扩展
                BasePersonRelationshipModel staffRelation = relationList.FirstOrDefault(n => n.type_id == (int)PersonType.职工);
                ServStaffInfoModel staffmodel = new ServStaffInfoModel();
                staffmodel.person_id = model.personID;
                staffmodel.org_id = model.org_id;
                staffmodel.job_grade = model.job_grade;
                if (model.start_time != "")
                {
                    staffmodel.start_time = Convert.ToDateTime(model.start_time);
                }
                staffmodel.work_num = model.work_num;
                staffmodel.staff_type = model.staff_type_id;
                staffmodel.staff_status = model.staff_status_id;
                if (model.staffFlag == 1)//有职工扩展
                {
                    if (staffRelation != null)//修改职工信息
                    {
                        int num = servStaffInfoDAL.UpdateStaffInfoById(staffmodel);
                        if (num == 0)
                        {
                            result = false;
                        }
                    }
                    else//新增职工扩展
                    {
                        //新增人员扩展
                        BasePersonRelationshipModel staffRelation1 = new BasePersonRelationshipModel();
                        staffRelation1.type_id = (int)PersonType.职工;
                        staffRelation1.person_id = model.personID;
                        int id1 = basePersonRelationshipDAL.AddEntity(staffRelation1);
                        if (id1 == 0)
                        {
                            result = false;
                        }
                        //新增职工信息
                        int id = servStaffInfoDAL.AddEntity(staffmodel);
                        if (id == 0)
                        {
                            result = false;
                        }
                    }
                }
                else//没有职工信息
                {
                    if (staffRelation != null)//删除职工信息
                    {
                        //删除职工关联
                        BasePersonRelationshipQuery query = new BasePersonRelationshipQuery();
                        query.person_id = model.personID;
                        query.type_id = (int)PersonType.职工;
                        int num = basePersonRelationshipDAL.DeletePersonRelationshipByPersonIdAndTypeId(query);
                        if (num == 0)
                        {
                            result = false;
                        }
                        //删除职工信息
                        num = servStaffInfoDAL.DeleteStaffInfoById(model.personID);
                        if (num == 0)
                        {
                            result = false;
                        }
                    }
                }
                //教师
                BasePersonRelationshipModel teacherRelation = relationList.FirstOrDefault(n => n.type_id == (int)PersonType.教师);
                ServTeacherInfoModel teacherModel = new ServTeacherInfoModel();
                teacherModel.person_id = model.personID;
                teacherModel.class_id = model.faculty;
                teacherModel.level = model.level_id;
                teacherModel.status = model.teach_status_id;
                if (model.teacherFlag == 1)//有教师扩展
                {
                    if (teacherRelation != null)//修改教师扩展
                    {
                        int num = servTeacherInfoDAL.UpdateTeacherInfoById(teacherModel);
                        if (num == 0)
                        {
                            result = false;
                        }
                    }
                    else//新增教师扩展
                    {
                        //新增人员教师关联
                        BasePersonRelationshipModel staffRelation1 = new BasePersonRelationshipModel();
                        staffRelation1.type_id = (int)PersonType.教师;
                        staffRelation1.person_id = model.personID;
                        int id1 = basePersonRelationshipDAL.AddEntity(staffRelation1);
                        if (id1 == 0)
                        {
                            result = false;
                        }
                        //新增教师信息
                        int id = servTeacherInfoDAL.AddEntity(teacherModel);
                        if (id == 0)
                        {
                            result = false;
                        }
                    }
                }
                else//没有教师扩展
                {
                    if (teacherRelation != null)//删除教师扩展
                    {
                        //删除人员教师关联
                        BasePersonRelationshipQuery query = new BasePersonRelationshipQuery();
                        query.person_id = model.personID;
                        query.type_id = (int)PersonType.教师;
                        int num = basePersonRelationshipDAL.DeletePersonRelationshipByPersonIdAndTypeId(query);
                        if (num == 0)
                        {
                            result = false;
                        }
                        //删除教师信息
                        num = servTeacherInfoDAL.DeleteTeacherInfoById(model.personID);
                        if (num == 0)
                        {
                            result = false;
                        }
                    }
                }
                //学生
                BasePersonRelationshipModel studentRelation = relationList.FirstOrDefault(n => n.type_id == (int)PersonType.学生);
                ServStudentInfoModel studentModel = new ServStudentInfoModel();
                studentModel.person_id = model.personID;
                studentModel.student_num = model.student_num;
                studentModel.student_grade = model.student_grade;
                studentModel.class_id = model.class_Name;
                if (model.in_time != "")
                {
                    studentModel.in_time = Convert.ToDateTime(model.in_time);
                }
                studentModel.edu_year = model.edu_year;
                studentModel.teacher_id = model.teacher_Name;
                studentModel.staff_id = model.staff_Name;
                studentModel.student_type = model.student_type_id;
                studentModel.status = model.studentStatus_id;
                if (model.studentFlag == 1)//有学生扩展
                {
                    if (studentRelation != null)//修改学生扩展
                    {
                        int num = servStudentInfoDAL.UpdateStudentInfoById(studentModel);
                        if (num == 0)
                        {
                            result = false;
                        }
                    }
                    else//新增学生扩展
                    {
                        //新增人员学生关联
                        BasePersonRelationshipModel staffRelation1 = new BasePersonRelationshipModel();
                        staffRelation1.type_id = (int)PersonType.学生;
                        staffRelation1.person_id = model.personID;
                        int id1 = basePersonRelationshipDAL.AddEntity(staffRelation1);
                        if (id1 == 0)
                        {
                            result = false;
                        }
                        //新增学生信息
                        int id = servStudentInfoDAL.AddEntity(studentModel);
                        if (id == 0)
                        {
                            result = false;
                        }
                    }
                }
                else
                {
                    if (studentRelation != null)//删除学生扩展
                    {
                        //删除人员学生关联
                        BasePersonRelationshipQuery query = new BasePersonRelationshipQuery();
                        query.person_id = model.personID;
                        query.type_id = (int)PersonType.学生;
                        int num = basePersonRelationshipDAL.DeletePersonRelationshipByPersonIdAndTypeId(query);
                        if (num == 0)
                        {
                            result = false;
                        }
                        //删除学生信息
                        num = servStudentInfoDAL.DeleteStudentInfoById(model.personID);
                        if (num == 0)
                        {
                            result = false;
                        }
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
        /// 添加人员信息
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool AddPersonInfo(PersonInfoCustom model)
        {
            try
            {
                bool result = false;
                //往sso中添加人员基础信息
                ApiPersonInfoModel personModel = new ApiPersonInfoModel();
                personModel.Name = model.name;
                personModel.EnName = model.EnName;
                personModel.Gender = model.Gender;
                personModel.Nation = model.Nation;
                personModel.Birthday = model.birthday;
                personModel.BloodType = model.BloodType;
                personModel.Religion = model.Religion;
                personModel.NativePlace = model.nativePlace;
                personModel.Nationality = model.Nationality;
                personModel.PoliticalStatus = model.PoliticalStatus;
                personModel.MarriageStatus = model.MarriageStatus;
                personModel.IDCard = model.IDCard;
                personModel.Phone = model.phone;
                personModel.Admin = model.loginAdmin;
                personModel.PassWord = model.loginPassWord;
                string parStr = JsonHelper.ObjectToString<ApiPersonInfoModel>(personModel);
                string str = HttpHelper.PostWebRequestBandError("http://" + personIp + "/ApiPersonInfo/AddPersonInfoAndAccount", parStr, "application/json;charset=utf-8", Encoding.UTF8);
                int personId = JsonHelper.StringToObject<int>(str);
                if (personId < 1)
                {
                    return false;
                }
                else
                {
                    result = true;
                }
                //添加人员信息表serv_person_info
                ServPersonInfoModel personInfoModel = new ServPersonInfoModel();
                personInfoModel.ssoid = personId;
                personInfoModel.role_id = 0;
                personInfoModel.alias= model.name;
                personInfoModel.status = 1;
                int personInfoId = servPersonInfoDAL.AddEntity(personInfoModel);
                if (personInfoId <1)
                {
                    return false;
                }
                //职工信息
                ServStaffInfoModel staffmodel = new ServStaffInfoModel();
                staffmodel.person_id = personId;
                staffmodel.org_id = model.org_id;
                staffmodel.job_grade = model.job_grade;
                if (model.start_time != "")
                {
                    staffmodel.start_time = Convert.ToDateTime(model.start_time);
                }
                staffmodel.work_num = model.work_num;
                staffmodel.staff_type = model.staff_type_id;
                staffmodel.staff_status = model.staff_status_id;
                if (model.staffFlag == 1)//有职工扩展
                {
                    //新增人员职工关联
                    BasePersonRelationshipModel staffRelation1 = new BasePersonRelationshipModel();
                    staffRelation1.type_id = (int)PersonType.职工;
                    staffRelation1.person_id = personId;
                    int id1 = basePersonRelationshipDAL.AddEntity(staffRelation1);
                    if (id1 < 1)
                    {
                        return false;
                    }
                    else
                    {
                        result = true;
                    }
                    //新增职工信息
                    int id = servStaffInfoDAL.AddEntity(staffmodel);
                    if (id < 1)
                    {
                        return false;
                    }
                    else
                    {
                        result = true;
                    }
                }
                //教师信息
                ServTeacherInfoModel teacherModel = new ServTeacherInfoModel();
                teacherModel.person_id = personId;
                teacherModel.class_id = model.faculty;
                teacherModel.level = model.level_id;
                teacherModel.status = model.teach_status_id;
                if (model.teacherFlag == 1)//有教师扩展
                {
                    //新增人员教师关联
                    BasePersonRelationshipModel staffRelation1 = new BasePersonRelationshipModel();
                    staffRelation1.type_id = (int)PersonType.教师;
                    staffRelation1.person_id = personId;
                    int id1 = basePersonRelationshipDAL.AddEntity(staffRelation1);
                    if (id1 < 1)
                    {
                        return false;
                    }
                    else
                    {
                        result = true;
                    }
                    //新增教师信息
                    int id = servTeacherInfoDAL.AddEntity(teacherModel);
                    if (id < 1)
                    {
                        return false;
                    }
                    else
                    {
                        result = true;
                    }
                }
                //学生信息
                ServStudentInfoModel studentModel = new ServStudentInfoModel();
                studentModel.person_id = personId;
                studentModel.student_num = model.student_num;
                studentModel.student_grade = model.student_grade;
                studentModel.class_id = model.class_Name;
                if (model.in_time != "")
                {
                    studentModel.in_time = Convert.ToDateTime(model.in_time);
                }
                studentModel.edu_year = model.edu_year;
                studentModel.teacher_id = model.teacher_Name;
                studentModel.staff_id = model.staff_Name;
                studentModel.student_type = model.student_type_id;
                studentModel.status = model.studentStatus_id;
                if (model.studentFlag == 1)//有学生扩展
                {
                    //新增人员学生关联
                    BasePersonRelationshipModel staffRelation1 = new BasePersonRelationshipModel();
                    staffRelation1.type_id = (int)PersonType.学生;
                    staffRelation1.person_id = personId;
                    int id1 = basePersonRelationshipDAL.AddEntity(staffRelation1);
                    if (id1 < 1)
                    {
                        return false;
                    }
                    else
                    {
                        result = true;
                    }
                    //新增学生信息
                    int id = servStudentInfoDAL.AddEntity(studentModel);
                    if (id < 1)
                    {
                        return false;
                    }
                    else
                    {
                        result = true;
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
        /// 添加超级管理员信息
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool AddSuperAdmin(ApiPersonInfoModel model)
        {
            try
            {
                bool result = false;
                string parStr = JsonHelper.ObjectToString<ApiPersonInfoModel>(model);
                string str = HttpHelper.PostWebRequestBandError("http://" + personIp + "/ApiPersonInfo/AddPersonInfoAndAccount", parStr, "application/json;charset=utf-8", Encoding.UTF8);
                int personId = JsonHelper.StringToObject<int>(str);
                if (personId == 0)
                {
                    return false;
                }
                //创建角色
                ServRoleInfoModel roleModel = new ServRoleInfoModel();
                roleModel.role_name = "超级管理员";
                roleModel.role_code = "SCJGLY";
                roleModel.role_describe = "";
                roleModel.ext1 = "-1";
                int roleId = servRoleInfoDAL.AddEntity(roleModel);
                if (roleId == 0)
                {
                    return false;
                }
                //创建角色权限关联（拥有所有权限）
                List<EnumModel> purviewList = EnumClass.GetEnumModelList<EnumClass.PurviewEnum>();
                ServRolePurviewModel purviewModel;
                for (int i = 0; i < purviewList.Count; i++)
                {
                    purviewModel = new ServRolePurviewModel();
                    purviewModel.purview_id = Convert.ToInt32(purviewList[i].key);
                    purviewModel.role_id = roleId;
                    purviewModel.region_id = 0;
                    int purviewId=servRolePurviewDAL.AddEntity(purviewModel);
                    if (purviewId == 0)
                    {
                        return false;
                    }
                }
                //创建用户
                ServPersonInfoModel personModel = new ServPersonInfoModel();
                personModel.status = 1;
                personModel.ssoid = personId;
                personModel.alias = "超级管理员";
                personModel.role_id = roleId;
                int personinfoId=AddPersonInfo(personModel);
                if (personinfoId == 0)
                {
                    return false;
                }
                result = true;
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取当前所有人员信息
        /// </summary>
        /// <returns></returns>
        public List<ServPersonInfoModel> GetPersonInfoList()
        {
            try
            {
                ServPersonInfoQuery servPersonInfoQuery = new ServPersonInfoQuery();
                List<ServPersonInfoModel> ServPersonInfo = servPersonInfoDAL.GetEntities(servPersonInfoQuery);
                return ServPersonInfo;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 获取角色树
        /// </summary>
        /// <param name="personId"></param>
        /// <returns></returns>
        public List<ServRoleInfoCustom> GetRoleAndPurviewByPersonId(int personId)
        {
            try
            {
                ServPersonInfoModel person = servPersonInfoDAL.GetPersonInfoBySSOId(personId);
                List<ServRoleInfoModel> roleList = servRoleInfoDAL.GetRoleInfo();
                List<ServRoleInfoCustom> roleCustomList = new List<ServRoleInfoCustom>();
                ServRoleInfoCustom roleCustom;
                for (int i = 0; i < roleList.Count; i++)
                {
                    roleCustom = new ServRoleInfoCustom();
                    roleCustom.id = roleList[i].id;
                    roleCustom.pid = -1;
                    roleCustom.role_code = roleList[i].role_code;
                    roleCustom.role_name = roleList[i].role_name;
                    roleCustom.role_describe = roleList[i].role_describe;
                    if (person != null)
                    {
                        if (roleList[i].id == person.role_id)
                        {
                            roleCustom.@checked = true;
                        }
                        else
                        {
                            roleCustom.@checked = false;
                        }
                    }
                    roleCustomList.Add(roleCustom);
                }
                roleCustom = new ServRoleInfoCustom();
                roleCustom.id = 0;
                roleCustom.pid = -1;
                roleCustom.role_name = "无";
                if (person != null)
                {
                    if (person.role_id == 0)
                    {
                        roleCustom.@checked = true;
                    }
                    else
                    {
                        roleCustom.@checked = false;
                    }
                }
                else
                {
                    roleCustom.@checked = false;
                }
                roleCustomList.Add(roleCustom);
                return roleCustomList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据人员id查询人员所拥有的园区权限
        /// </summary>
        /// <param name="personId"></param>
        /// <returns></returns>
        public List<ServRolePurviewModel> GetRegionPurByPersonId(int personId)
        {
            try
            {
                //查询人员
                ServPersonInfoModel person = servPersonInfoDAL.GetPersonInfoBySSOId(personId);
                List<ServRolePurviewModel> rolePruList = new List<ServRolePurviewModel>();
                if (person != null)
                {
                    if (person.role_id != 0)
                    {
                        //根据角色id获取角色所包含的园区权限
                         rolePruList = servPurviewInfoDAL.GetRoleRegionIdByRoleId(person.role_id);
                    }
                }
                return rolePruList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据人员id获取权限
        /// </summary>
        /// <param name="personId"></param>
        /// <returns></returns>
        public List<ServPurviewInfoCustom> GetPurviewByPersonId(int personId)
        {
            try
            {
                ServPersonInfoModel person = servPersonInfoDAL.GetPersonInfoBySSOId(personId);
                List<ServPurviewInfoCustom> purviewList = new List<ServPurviewInfoCustom>();
                if (person != null)
                {
                    if (person.role_id != 0)
                    {
                        //根据角色id获取角色所包含的园区权限
                        List<ServRolePurviewModel> rolePurList = servPurviewInfoDAL.GetRoleRegionIdByRoleId(person.role_id);
                        for (int i = 0; i < rolePurList.Count; i++)
                        {
                            ServRolePurviewQuery query = new ServRolePurviewQuery();
                            query.role_id = person.role_id;
                            query.region_id = rolePurList[i].region_id;
                            List<ServPurviewInfoModel> purviewList1 = servPurviewInfoDAL.GetPurviewInfoByRoleId(query);
                            for (int j = 0; j < purviewList1.Count; j++)
                            {
                                ServPurviewInfoCustom purCus = new ServPurviewInfoCustom();
                                purCus.id = purviewList1[j].id;
                                purCus.purview_code = purviewList1[j].purview_code;
                                purCus.purview_name = purviewList1[j].purview_name;
                                purCus.sid = Convert.ToInt32(purviewList1[j].purview_code + "" + rolePurList[i].region_id);
                                if (purviewList1[j].pid == -1)
                                {
                                    purCus.pid = rolePurList[i].region_id;
                                }
                                else
                                {
                                    purCus.pid = Convert.ToInt32(purviewList1[j].pid + "" + rolePurList[i].region_id);
                                }
                                purCus.region_id = rolePurList[i].region_id;
                                purviewList.Add(purCus);
                            }
                            //根据园区id获取园区信息
                            BaseRegionConfigModel regionModel = baseRegionConfigDAL.GetEntity(rolePurList[i].region_id);
                            ServPurviewInfoCustom purCus1 = new ServPurviewInfoCustom();
                            if (regionModel != null)
                            {
                                purCus1.id = regionModel.id;
                                purCus1.purview_name = regionModel.region_name;
                                purCus1.purview_code = regionModel.id;
                                purCus1.pid = -1;
                                purCus1.sid = regionModel.id;
                            }
                            else
                            {
                                purCus1.purview_name = "超级管理员";
                            }
                            purCus1.region_id = rolePurList[i].region_id;
                            purviewList.Add(purCus1);
                        }

                    }
                }
                return purviewList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据角色id获取角色下的权限
        /// </summary>
        /// <param name="roleId"></param>
        /// <returns></returns>
        public List<ServPurviewInfoCustom> GetPurviewInfoByRoleId(int roleId)
        {
            try
            {
                List<ServPurviewInfoCustom> purviewList = new List<ServPurviewInfoCustom>();
                //根据角色id获取角色所包含的园区权限
                List<ServRolePurviewModel> rolePurList = servPurviewInfoDAL.GetRoleRegionIdByRoleId(roleId);
                for (int i = 0; i < rolePurList.Count; i++)
                {
                    ServRolePurviewQuery query = new ServRolePurviewQuery();
                    query.role_id = roleId;
                    query.region_id = rolePurList[i].region_id;
                    List<ServPurviewInfoModel> purviewList1 = servPurviewInfoDAL.GetPurviewInfoByRoleId(query);
                    for (int j = 0; j < purviewList1.Count; j++)
                    {
                        ServPurviewInfoCustom purCus = new ServPurviewInfoCustom();
                        purCus.id = purviewList1[j].id;
                        purCus.purview_code = purviewList1[j].purview_code;
                        purCus.purview_name = purviewList1[j].purview_name;
                        purCus.sid = Convert.ToInt32(purviewList1[j].purview_code + "" + rolePurList[i].region_id);
                        if (purviewList1[j].pid == -1)
                        {
                            purCus.pid = rolePurList[i].region_id;
                        }
                        else
                        {
                            purCus.pid = Convert.ToInt32(purviewList1[j].pid + "" + rolePurList[i].region_id);
                        }
                        purCus.region_id = rolePurList[i].region_id;
                        purviewList.Add(purCus);
                    }
                    //根据园区id获取园区信息
                    BaseRegionConfigModel regionModel = baseRegionConfigDAL.GetEntity(rolePurList[i].region_id);
                    ServPurviewInfoCustom purCus1 = new ServPurviewInfoCustom();
                    if (regionModel != null)
                    {
                        purCus1.id = regionModel.id;
                        purCus1.purview_name = regionModel.region_name;
                        purCus1.purview_code = regionModel.id;
                        purCus1.pid = -1;
                        purCus1.sid = regionModel.id;
                    }
                    else
                    {
                        purCus1.purview_name = "超级管理员";
                    }
                    purCus1.region_id = rolePurList[i].region_id;
                    purviewList.Add(purCus1);
                }

                return purviewList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据角色id和园区id获取权限
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="regionId"></param>
        /// <returns></returns>
        public List<ServPurviewInfoModel> GetPurviewInfoByRoleIdAndRegionId(int roleId,int regionId)
        {
            try
            {
                ServRolePurviewQuery query = new ServRolePurviewQuery();
                query.role_id = roleId;
                query.region_id = regionId;
                List<ServPurviewInfoModel> purviewList = servPurviewInfoDAL.GetPurviewInfoByRoleId(query);
                return purviewList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 给人员绑定角色
        /// </summary>
        /// <param name="roleId"></param>
        /// <param name="personId"></param>
        /// <returns></returns>
        public bool PersonBindRole(int roleId, int personId)
        {
            try
            {
                bool result = false;
                ServPersonInfoModel model = new ServPersonInfoModel();
                model.ssoid = personId;
                model.role_id = roleId;
                int num = servPersonInfoDAL.UpdatePersonRoleByPersonId(model);
                if (num != 0)
                {
                    result = true;
                }
                return result;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        /// <summary>
        /// 根据名称获取人员id
        /// </summary>
        /// <param name="personName"></param>
        /// <returns></returns>
        public int GetPersonInfoId(string personName)
        {
            try
            {
                int person_id = 0;
                ServPersonInfoModel num = servPersonInfoDAL.GetPersonInfoId(personName);
                if (num != null)
                {
                    person_id = num.ssoid;
                }
                return person_id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 添加人员
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public int AddPersonInfo(ServPersonInfoModel model)
        {
            try
            {
                int id = servPersonInfoDAL.AddEntity(model);
                return id;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public bool UpdatePwd(ApiUserModel model)
        {
            try
            {
                string parStr = JsonHelper.ObjectToString<ApiUserModel>(model);
                string str = HttpHelper.PostWebRequestBandError("http://" + personIp + "/ApiPersonInfo/UpdatePassWordRetNumber", parStr, "application/json;charset=utf-8", Encoding.UTF8);
                int result = JsonHelper.StringToObject<int>(str);
                bool re = true;
                if (result == 1)
                {
                    re = false;
                }
                return re;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}
