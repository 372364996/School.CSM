var pageIndex = 1;//起始页码
var pageSize = 30; //默认初始化每页行数
$(function () {
    $("#personInfoDialog").dialog("close");
    $("#addOrUpdatePerson").dialog("close");
    $("#personTypeDialog").dialog("close");
    $("#allocationRoleDialog").dialog("close");
    getPersonInfoGrid();
    getPersonInfoData();


    $("#extendStaff").hide();
    $("#extendTeacher").hide();
    $("#extendStudent").hide();
    $("#extendStaff2").hide();
    $("#extendTeacher2").hide();
    $("#extendStudent2").hide();
    //添加弹框
    $("#addstaff").click(function () {
        $("#addstaff").addClass("active6").siblings().removeClass("active6");
        $("#extendStaff").show();
        $("#extendTeacher").hide();
        $("#extendStudent").hide();
    })
    $("#addteacher").click(function () {
        $("#addteacher").addClass("active6").siblings().removeClass("active6");
        $("#extendStaff").hide();
        $("#extendTeacher").show();
        $("#extendStudent").hide();
    })
    $("#addstudent").click(function () {
        $("#addstudent").addClass("active6").siblings().removeClass("active6");
        $("#extendStaff").hide();
        $("#extendTeacher").hide();
        $("#extendStudent").show();
    })
    $("#staffInfo").click(function () {
        $("#staffInfo").addClass("active6").siblings().removeClass("active6");
        $("#extendStaff2").show();
        $("#extendTeacher2").hide();
        $("#extendStudent2").hide();
    })
    $("#teacherInfo").click(function () {
        $("#teacherInfo").addClass("active6").siblings().removeClass("active6");
        $("#extendStaff2").hide();
        $("#extendTeacher2").show();
        $("#extendStudent2").hide();
    })
    $("#studentInfo").click(function () {
        $("#studentInfo").addClass("active6").siblings().removeClass("active6");
        $("#extendStaff2").hide();
        $("#extendTeacher2").hide();
        $("#extendStudent2").show();
    });
    //国籍搜索
    $("#addNationality").multiselect({
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight: 200,
        onChange: function (option, checked) {
            
        },
    });
    //民族搜索
    $("#addNation").multiselect({
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight: 200,
        onChange: function (option, checked) {

        },
    });
    //阻止事件冒泡
    $("#addstaffClose").bind("click", function (event) {
        event.stopPropagation();    //  阻止事件冒泡
    })
    $("#addteacherClose").bind("click", function (event) {
        event.stopPropagation();    //  阻止事件冒泡
    })
    $("#addstudentClose").bind("click", function (event) {
        event.stopPropagation();    //  阻止事件冒泡
    })
})
var ADDORUPDATEFLAG;//新增或修改标识  1：新增。2：修改
//加载人员信息结构
function getPersonInfoGrid() {
    var _data = [];
    $("#personInfoGrid").datagrid({
        data: _data,
        fitColumns: true,
        rownumbers: true,
        pagination: true, //分页控件 
        singleSelect: true,//只允许选中一行
        toolbar: [{
            iconCls: 'icon-add ',
            text: "新增",
            handler: function () {
                addPersonInfoDialog();
            }
        }],
        columns: [[
            { field: 'PersonID', title: 'id', width: 100, align: 'center', hidden: true },
            { field: 'Name', title: '人员姓名', width: 100, align: 'center' },
            {
                field: 'GenderName', title: '性别', width: 100, align: 'center',
                formatter: function (value, rec) {
                    return value == null ? "未知" : value;
                }
            },
            { field: 'NativePlace', title: '籍贯', width: 100, align: 'center' },
            {
                field: 'Birthday', title: '生日', width: 100, align: 'center',
                formatter: function (value, rec) {
                    return Util.changeDateFormat(value);
                }
            },
            { field: 'IDCard', title: '身份证号', width: 100, align: 'center' },
            //{ field: 'subsystem_id', title: '工号', width: 100, align: 'center' },
            {
                field: 'ids', title: '操作', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    return '<button class="btn btn-primary btn-xs" onclick=\'showPersonInfo(' + row.PersonID + ')\'>查&ensp;&ensp;看</button> <button class="btn btn-warning btn-xs" onclick=\'updatePersonInfo(' + row.PersonID + ')\'>编&ensp;&ensp;辑</button>  <button class="btn btn-primary btn-xs" onclick=\'allocationRole(' + row.PersonID + ')\'>分配角色</button>'
                }
            }
        ]],
        onLoadSuccess: function (data) {

        },
        onLoadError: function () {
            alert('加载失败');
        }
    })
    $('#personInfoGrid').datagrid('getPager').pagination({//分页栏下方文字显示
        showPageList: true,
        pageNumber: pageIndex,
        pageSize: pageSize, //每页显示的记录条数，默认为10
        pageList: [5, 10, 20, 30, 50], //可以设置每页记录条数的列表
        beforePageText: '第', //页数文本框前显示的汉字   
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示{from}-{to}条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{total}条',
        onChangePageSize: function (pagesize) {
            //一页显示几条
            pageSize = pagesize;
            getPersonInfoData();
        },
        onSelectPage: function (pageindex, pagesize) {
            //下一页
            pageIndex = pageindex;
            pageSize = pagesize;
            getPersonInfoData();
        },
        onRefresh: function (pageindex, pagesize) {
            //pageIndex = pageNumber;
            // 刷新按钮
            pageIndex = pageindex;
            pageSize = pagesize;
            getPersonInfoData();
        }
    });
}
//加载人员信息数据
function getPersonInfoData() {
    var personName = $("#personName").val();
    var gender = $("#genders").val();
    $.ajax({
        url: "/PersonInfo/GetPersonInfoData",
        data: { pageIndex: pageIndex, pageSize: pageSize },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("获取人员信息错误"+data.msg);
                return;
            } else {
                $('#personInfoGrid').datagrid('loadData', data.msg);
                $('#personInfoGrid').datagrid('loaded');
                $('#personInfoGrid').datagrid('getPager').pagination('refresh', {
                    total: data.msg.total,
                    pageNumber: pageIndex,
                    pageSize: pageSize
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取人员信息出现"+XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//查询人员详细信息
function showPersonInfo(personId) {
    $.ajax({
        url: "/PersonInfo/GetPersonInfoByPersonId",
        data: { personId: personId },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("查询人员详细信息错误:"+data.msg);
                return;
            } else {
                showPersonInfoDialog(data.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("查询人员信息出现"+XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//显示人员详细信息
function showPersonInfoDialog(personInfo) {
    clearPersonInfoTool();
    $("#personInfoDialog").dialog("open");
    /*--基础信息--*/
    $("#userName").text(personInfo.name == null ? "" : personInfo.name);//姓名
    $("#userGender").text(personInfo.genderName == null ? "" : personInfo.genderName);//性别
    $("#birthday").text(personInfo.birthday == null ? "" : Util.changeDateFormat(personInfo.birthday));//生日
    $("#nation").text(personInfo.nationName == null ? "" : personInfo.nationName);//民族
    $("#hometown").text(personInfo.nativePlace == null ? "" : personInfo.nativePlace);//籍贯
    $("#blood").text(personInfo.bloodTypeName == null ? "" : personInfo.bloodTypeName);//血型
    $("#belief").text(personInfo.religionName == null ? "" : personInfo.religionName);//宗教信仰
    $("#nationality").text(personInfo.nationalityName == null ? "" : personInfo.nationalityName);//国籍
    $("#politics").text(personInfo.politicalStatusName == null ? "" : personInfo.politicalStatusName);//政治面貌
    $("#marriage").text(personInfo.marriageStatusName == null ? "" : personInfo.marriageStatusName);//婚姻状况
    $("#idCart").text(personInfo.IDCard == null ? "" : personInfo.IDCard);//身份证
    $("#phoneNum").text(personInfo.phone == null ? "" : personInfo.phone);//手机号
    $("#photoFileName").text(personInfo.photoFileName == null ? "" : personInfo.photoFileName);//照片
    /*--职工信息--*/
    if (personInfo.staffFlag == 1) {
        $("#staffDiv").show();
        $("#department").text(personInfo.orgName == null ? "" : personInfo.orgName);//部门
        $("#job_grade").text(personInfo.job_grade == null ? "" : personInfo.job_grade);//职位
        $("#start_time").text(personInfo.start_time == null ? "" : personInfo.start_time);//入职时间
        $("#work_num").text(personInfo.work_num == null ? "" : personInfo.work_num);//工号
        $("#staff_type").text(personInfo.staff_type == null || personInfo.staff_type == 0 ? "" : personInfo.staff_type);//职员类型
        $("#staff_status").text(personInfo.staff_status == null || personInfo.staff_status == 0 ? "" : personInfo.staff_status);//职工状态

        //王丹添加的js
        $("#staffInfo").addClass("active6").siblings().removeClass("active6");
        $("#staffInfo").show();
        $("#extendStaff2").show();
        $("#extendTeacher2").hide();
        $("#extendStudent2").hide();
    }
    //教师信息
    if (personInfo.teacherFlag == 1) {
        $("#teacherDiv").show();
        $("#faculty").text(personInfo.faculty == null ? "" : personInfo.faculty);//院系
        $("#level").text(personInfo.level == 0 ? "" : personInfo.level);//等级
        $("#teach_Status").text(personInfo.teach_Status == null || personInfo.teach_Status == 0 ? "" : personInfo.teach_Status);//教师状态

        //王丹添加的js
        $("#teacherInfo").addClass("active6").siblings().removeClass("active6");
        $("#teacherInfo").show();
        $("#extendStaff2").hide();
        $("#extendTeacher2").show();
        $("#extendStudent2").hide();
    }
    if (personInfo.studentFlag == 1) {
        $("#studentDiv").show();
        /*--学生信息--*/
        $("#student_num").text(personInfo.student_num == null ? "" : personInfo.student_num);//学号
        $("#student_grade").text(personInfo.student_grade == null ? "" : personInfo.student_grade);//年级
        $("#class_Name").text(personInfo.class_Name == null ? "" : personInfo.class_Name);//班级
        $("#in_time").text(personInfo.in_time == null ? "" : personInfo.in_time);//入学时间
        $("#edu_year").text(personInfo.edu_year == null ? "" : personInfo.edu_year);//教育年限
        $("#teacher_Name").text(personInfo.teacher_Name == null ? "" : personInfo.teacher_Name);//导师
        $("#staff_Name").text(personInfo.staff_Name == null ? "" : personInfo.staff_Name);//辅导员
        $("#student_type").text(personInfo.student_type == null || personInfo.student_type == 0 ? "" : personInfo.student_type);//学生类型
        $("#studentStatus").text(personInfo.studentStatus == null || personInfo.studentStatus == 0 ? "" : personInfo.studentStatus);//学生状态

        //王丹添加的js
        $("#studentInfo").addClass("active6").siblings().removeClass("active6");
        $("#studentInfo").show();
        $("#extendStaff2").hide();
        $("#extendTeacher2").hide(); //de();
        $("#extendStudent2").show();
    }

}
function clearPersonInfoTool() {
    $("#staffDiv").hide();
    $("#teacherDiv").hide();
    $("#studentDiv").hide();
    $("#staffInfo").hide();
    $("#teacherInfo").hide();
    $("#studentInfo").hide();
    $("#extendStaff2").hide();
    $("#extendTeacher2").hide();
    $("#extendStudent2").hide();
}
//同步sso人员
function synchronizationSSO() {
    $.ajax({
        url: "/PersonInfo/SynchronizationSSO",
        data: {},
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("同步sso人员信息错误:"+data.msg);
                return;
            } else {
                alert("同步完成");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("同步sso人员出现"+XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//添加人员弹窗
function addPersonInfoDialog() {
    $("#loginuser").show();
    $("#addOrUpdatePerson").dialog("open");//打开弹窗
    clearDialog();//清空弹窗内容
    ADDORUPDATEFLAG = 1;
    closeStaffTool();//清空并隐藏职工选项卡
    closeTeacherTool();//清空并关闭教师选项卡
    closeStudentTool();//清空并关闭学生选项卡
}
//修改人员信息
function updatePersonInfo(personId) {
    $.ajax({
        url: "/PersonInfo/GetPersonInfoByPersonId",
        data: { personId: personId },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("获取人员信息错误:"+data.msg);
                return;
            } else {
                updatePersonInfoDialog(data.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取人员信息出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//修改弹窗赋值
function updatePersonInfoDialog(personInfo) {
    ADDORUPDATEFLAG = 2;
    clearDialog();
    closeStaffTool();//清空并隐藏职工选项卡
    closeTeacherTool();//清空并关闭教师选项卡
    closeStudentTool();//清空并关闭学生选项卡
    $("#loginuser").hide();
    $("#addOrUpdatePerson").dialog("open");
    $("#personId").val(personInfo.personID)//人员编号
    $("#addName").val(personInfo.name == null ? "" : personInfo.name);//姓名
    $("#addEname").val(personInfo.Ename == null ? "" : personInfo.Ename);//英文名
    $("#addBirthday").val(personInfo.birthday == null ? "" : Util.changeDateFormat(personInfo.birthday));//生日
    //性别
    var gender = document.getElementById("addGender");
    for (var i = 0; i < gender.length; i++) {
        if (gender[i].value == personInfo.Gender) {
            gender[i].selected = true;
        }
    }
    //民族
    var nation = document.getElementById("addNation");
    for (var i = 0; i < nation.length; i++) {
        if (nation[i].value == personInfo.Nation) {
            nation[i].selected = true;
        }
    }

    $("#addNativePlace").val(personInfo.nativePlace == null ? "" : personInfo.nativePlace);//籍贯
    //血型
    var blood = document.getElementById("addBloodType");
    for (var i = 0; i < blood.length; i++) {
        if (blood[i].value == personInfo.BloodType) {
            blood[i].selected = true;
        }
    }
    //政治面貌
    var political = document.getElementById("addPoliticalStatus");
    for (var i = 0; i < political.length; i++) {
        if (political[i].value == personInfo.PoliticalStatus) {
            political[i].selected = true;
        }
    }
    //国籍
    var nationality = document.getElementById("addNationality");
    for (var i = 0; i < nationality.length; i++) {
        if (nationality[i].value == personInfo.Nationality) {
            nationality[i].selected = true;
        }
    }
    //婚姻状况
    var marriage = document.getElementById("MarriageStatus");
    if (personInfo.MarriageStatus != null) {
        if (personInfo.MarriageStatus) {
            marriage[1].selected = true;
        } else {
            marriage[0].selected = true;
        }
    }
    //宗教信仰
    var religion = document.getElementById("addReligion");
    for (var i = 0; i < religion.length; i++) {
        if (religion[i].value == personInfo.Religion) {
            religion[i].selected = true;
        }
    }

    $("#addIDcard").val(personInfo.IDCard == null ? "" : personInfo.IDCard);//身份证号
    $("#addPhone").val(personInfo.phone == null ? "" : personInfo.phone);//手机号
    //职工
    if (personInfo.staffFlag == 1) {
        $("#addstaffDiv").show();
        $("#addstaffDiv").attr("key", "1");
        //王丹添加的js
        $("#addstaff").addClass("active6").siblings().removeClass("active6");
        $("#addstaff").show();
        $("#extendStaff").show();
        $("#extendTeacher").hide();
        $("#extendStudent").hide();
        //部门
        var org = document.getElementById("addOrg");
        for (var i = 0; i < org.length; i++) {
            if (org[i].value == personInfo.org_id) {
                org[i].selected = true;
            }
        }
        $("#addjob_grade").val(personInfo.job_grade == null ? "" : personInfo.job_grade);//职位
        $("#addstartTime").val(personInfo.start_time);//入职时间
        $("#addWorkNO").val(personInfo.work_num);//工号
        //职员类型
        var staffType = document.getElementById("addstaff_type");
        for (var i = 0; i < staffType.length; i++) {
            if (staffType[i].value == personInfo.staff_type_id) {
                staffType[i].selected = true;
            }
        }
        //职工状态
        var staffStatus = document.getElementById("addstaff_status");
        for (var i = 0; i < staffStatus.length; i++) {
            if (staffStatus[i].value == personInfo.staff_status_id) {
                staffStatus[i].selected = true;
            }
        }
    }
    //教师
    if (personInfo.teacherFlag == 1) {
        $("#addteacherDiv").show();
        $("#addteacherDiv").attr("key", "1");
        $("#addclass_id").val(personInfo.faculty == null ? "" : personInfo.faculty);//院系

        //王丹添加的js
        $("#addteacher").addClass("active6").siblings().removeClass("active6");
        $("#addteacher").show();
        $("#extendStaff").hide();
        $("#extendTeacher").show();
        $("#extendStudent").hide();
        //等级
        var teacherLevel = document.getElementById("addlevel");
        for (var i = 0; i < teacherLevel.length; i++) {
            if (teacherLevel[i].value == personInfo.level_id) {
                teacherLevel[i].selected = true;
            }
        }
        // $("#addlevel").val(personInfo.level == 0 ? "" : personInfo.level);
        //教师状态
        var teacherStatus = document.getElementById("addTeacherstatus");
        for (var i = 0; i < teacherStatus.length; i++) {
            if (teacherStatus[i].value == personInfo.teach_status_id) {
                teacherStatus[i].selected = true;
            }
        }
    }
    //学生
    if (personInfo.studentFlag == 1) {
        $("#addstudentDiv").show();
        $("#addstudentDiv").attr("key", "1");

        //王丹添加的js
        $("#addstudent").addClass("active6").siblings().removeClass("active6");
        $("#addstudent").show();
        $("#extendStaff").hide();
        $("#extendTeacher").hide();
        $("#extendStudent").show();

        $("#addstudent_num").val(personInfo.student_num == null ? "" : personInfo.student_num);//学号
        $("#addstudent_grade").val(personInfo.student_grade == null ? "" : personInfo.student_grade);//年级
        $("#addstudentclass").val(personInfo.class_Name == null ? "" : personInfo.class_Name);//班级
        $("#addInTime").val(personInfo.in_time == null ? "" : personInfo.in_time);//入学时间
        $("#addedu_year").val(personInfo.edu_year);//教育年限
        $("#addteacher_Name").val(personInfo.teacher_Name == null ? "" : personInfo.teacher_Name);//导师
        $("#addstaff_Name").val(personInfo.staff_Name == null ? "" : personInfo.staff_Name);//辅导员
        //学生类型
        var studentType = document.getElementById("addstudent_type");
        for (var i = 0; i < studentType.length; i++) {
            if (studentType[i].value == personInfo.student_type_id) {
                studentType[i].selected = true;
            }
        }
        //学生状态
        var studentStatus = document.getElementById("addstudentStatus");
        for (var i = 0; i < studentStatus.length; i++) {
            if (studentStatus[i].value == personInfo.studentStatus_id) {
                studentStatus[i].selected = true;
            }
        }
    }
}
//清空添加修改弹窗
function clearDialog() {
    $("#addName").val("");//姓名
    $("#addEname").val("");//英文名
    $("#addBirthday").val("");//生日
    $("#addGender").val("");//性别
    //$("#addNation").val("");//民族
    $("#addNativePlace").val("");//籍贯
    $("#addBloodType").val("");//血型
    $("#addPoliticalStatus").val("");//政治面貌
    //$("#addNationality").val("");//国籍
    $("#MarriageStatus").val("");//婚姻状况
    $("#addReligion").val("");//宗教信仰
    $("#addIDcard").val("");//身份证号
    $("#addPhone").val("");//手机号
    $("#addOrg").val("");//部门
    $("#addjob_grade").val("");//职位
    $("#addstartTime").val("");//入职时间
    $("#addWorkNO").val("");//工号
    $("#addstaff_type").val("");//职员类型
    $("#addstaff_status").val("");//职工状态
    $("#addclass_id").val("");//院系
    $("#addlevel").val("");//等级
    $("#addTeacherstatus").val("");//教师状态
    $("#addstudent_num").val("");//学号
    $("#addstudent_grade").val("");//年级
    $("#addstudentclass").val("");//班级
    $("#addInTime").val("");//入学时间
    $("#addedu_year").val("");//教育年限
    $("#addteacher_Name").val("");//导师
    $("#addstaff_Name").val("");//辅导员
    $("#student_type").val("");//学生类型
    $("#addstudentStatus").val("");//学生状态
}
//点击选择人员类别弹窗
function personTypeDialog() {
    $("#personTypeDialog").dialog("open");
}
//选择人员类别确定操作
function personTypeBtn() {
    var personType;
    var personTypeSe = document.getElementById("personType");
    for (var i = 0; i < personTypeSe.length; i++) {
        if (personTypeSe[i].selected == true) {
            personType = personTypeSe[i].value;
        }
    }
    personType = Number(personType);
    switch (personType) {
        case 1://行政人员
            if ($("#addstaffDiv").css("display") == "block") {
                alert("已添加过行政人员选项卡");
                return;
            } else {
                $("#addstaffDiv").show();
                $("#addstaff").show();
                $("#addstaffDiv").attr("key", "1");
                //王丹添加的js
                $("#addstaff").addClass("active6").siblings().removeClass("active6");
                $("#extendStaff").show();
                $("#extendTeacher").hide();
                $("#extendStudent").hide();
            }
            break;
        case 2://教师
            if ($("#addteacherDiv").css("display") == "block") {
                alert("已添加过教师选项卡");
                return;
            } else {
                $("#addteacherDiv").show();
                $("#addteacher").show();
                $("#addteacherDiv").attr("key", "1");
                //王丹添加的js
                $("#addteacher").addClass("active6").siblings().removeClass("active6");
                $("#extendStaff").hide();
                $("#extendTeacher").show();
                $("#extendStudent").hide();
            }
            break;
        case 3://学生
            if ($("#addstudentDiv").css("display") == "block") {
                alert("已添加过学生选项卡");
                return;
            } else {
                $("#addstudentDiv").show();
                $("#addstudent").show();
                $("#addstudentDiv").attr("key", "1");
                //王丹添加的js
                $("#addstudent").addClass("active6").siblings().removeClass("active6");
                $("#extendStaff").hide();
                $("#extendTeacher").hide();
                $("#extendStudent").show();
            }
            break;
    }
    $("#personTypeDialog").dialog("close");
}

//修改弹窗提交
function updatePersonSubmit() {
    var personId = $("#personId").val() == "" ? 0 : $("#personId").val();
    var name = $("#addName").val();//姓名
    var ename = $("#addEname").val();//英文名
    var birthday = $("#addBirthday").val();//生日
    var gender = $("#addGender").val() == "" || $("#addGender").val() == null ? 0 : $("#addGender").val();//性别
    var nation = $("#addNation").val() == "" || $("#addNation").val() == null ? 0 : $("#addNation").val();//民族
    var nativePlace = $("#addNativePlace").val();//籍贯
    var blood = $("#addBloodType").val() == "" || $("#addBloodType").val() == null ? 0 : $("#addBloodType").val();//血型
    var political = $("#addPoliticalStatus").val() == "" || $("#addPoliticalStatus").val() == null ? 0 : $("#addPoliticalStatus").val();//政治面貌
    var nationality = $("#addNationality").val() == "" || $("#addNationality").val() == null ? 0 : $("#addNationality").val();//国籍
    var marrigae = $("#MarriageStatus").val() == "" || $("#MarriageStatus").val() == null ? 0 : $("#MarriageStatus").val();//婚姻状况
    var religion = $("#addReligion").val() == "" || $("#addReligion").val() == null ? 0 : $("#addReligion").val();//宗教信仰
    var IDcard = $("#addIDcard").val();//身份证号
    var phone = $("#addPhone").val();//手机号
    //判断是否有职工扩展
    var staffFlag = 0;
    if ($("#addstaffDiv").attr("key") == "1") {
        staffFlag = 1;
    }
    //判断是否有教师扩展
    var teacherFlag = 0;
    if ($("#addteacherDiv").attr("key") == "1") {
        teacherFlag = 1;
    }
    //判断是否有学生扩展
    var studentFlag = 0;
    if ($("#addstudentDiv").attr("key") == "1") {
        studentFlag = 1;
    }
    //职工信息
    var org = $("#addOrg").val() == "" || $("#addOrg").val() == null ? 0 : $("#addOrg").val();//部门
    var jobGrade = $("#addjob_grade").val();//职位
    var startTime = $("#addstartTime").val();//入职时间
    var worknum = $("#addWorkNO").val();//工号
    var staffType = $("#addstaff_type").val() == "" || $("#addstaff_type").val() == null ? 0 : $("#addstaff_type").val();//职员类型
    var staffStatus = $("#addstaff_status").val() == "" || $("#addstaff_status").val() == null ? 0 : $("#addstaff_status").val();//职工状态
    //教师信息
    var classId = $("#addclass_id").val();//院系
    var level = $("#addlevel").val() == "" || $("#addlevel").val() == null ? 0 : $("#addlevel").val();//等级
    var teacherStatus = $("#addTeacherstatus").val() == "" || $("#addTeacherstatus").val() == null ? 0 : $("#addTeacherstatus").val();//教师状态
    //学生信息
    var studentNum = $("#addstudent_num").val();//学号
    var studentGrade = $("#addstudent_grade").val();//年级
    var studentClass = $("#addstudentclass").val();//班级
    var inTime = $("#addInTime").val();//入学时间
    var eduYear = $("#addedu_year").val();//教育年限
    var teacherName = $("#addteacher_Name").val();//导师
    var staffName = $("#addstaff_Name").val();//辅导员
    var studentType = $("#addstudent_type").val() == "" || $("#addstudent_type").val() == null ? 0 : $("#addstudent_type").val();//学生类型
    var studentStatus = $("#addstudentStatus").val() == "" || $("#addstudentStatus").val() == null ? 0 : $("#addstudentStatus").val();//学生状态

    //修改人员信息
    if (ADDORUPDATEFLAG == 2) {
        $.ajax({
            url: "/PersonInfo/UpdatePersonInfo",
            data: { personId: personId, name: name, ename: ename, birthday: birthday, gender: gender, nation: nation, nativePlace: nativePlace, blood: blood, political: political, nationality: nationality, marrigae: marrigae, religion: religion, IDcard: IDcard, phone: phone, staffFlag: staffFlag, org: org, jobGrade: jobGrade, startTime: startTime, worknum: worknum, staffType: staffType, staffStatus: staffStatus, teacherFlag: teacherFlag, classId: classId, level: level, teacherStatus: teacherStatus, studentFlag: studentFlag, studentNum: studentNum, studentGrade: studentGrade, studentClass: studentClass, inTime: inTime, eduYear: eduYear, teacherName: teacherName, staffName: staffName, studentType: studentType, studentStatus: studentStatus },
            type: "post",
            datatype: "json",
            async: false,
            success: function (data) {
                if (data.status == 1) {
                    alert("修改人员信息错误:"+data.msg);
                    return;
                } else {
                    alert("修改完成");
                    $("#addOrUpdatePerson").dialog("close");
                    getPersonInfoData();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("修改人员信息出现"+XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    } else {//添加
        var loginName = $("#loginAdmin").val();
        if (loginName == "") {
            alert("请输入用户名");
            return;
        }
        var loginPwd = $("#loginPwd").val();
        if (loginPwd == "") {
            alert("请输入密码");
            return;
        }
        $.ajax({
            url: "/PersonInfo/AddPersonInfo",
            data: { name: name, ename: ename, birthday: birthday, gender: gender, nation: nation, nativePlace: nativePlace, blood: blood, political: political, nationality: nationality, marrigae: marrigae, religion: religion, IDcard: IDcard, phone: phone, staffFlag: staffFlag, org: org, jobGrade: jobGrade, startTime: startTime, worknum: worknum, staffType: staffType, staffStatus: staffStatus, teacherFlag: teacherFlag, classId: classId, level: level, teacherStatus: teacherStatus, studentFlag: studentFlag, studentNum: studentNum, studentGrade: studentGrade, studentClass: studentClass, inTime: inTime, eduYear: eduYear, teacherName: teacherName, staffName: staffName, studentType: studentType, studentStatus: studentStatus, loginName: loginName, loginPwd: loginPwd },
            type: "post",
            datatype: "json",
            async: false,
            success: function (data) {
                if (data.status == 1) {
                    alert("新增人员信息错误"+data.msg);
                    return;
                } else {
                    alert("添加完成");
                    $("#addOrUpdatePerson").dialog("close");
                    getPersonInfoData();
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("新增人员信息出现"+XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }
}
//关闭职工选项卡
function closeStaffTool() {
    $("#addstaffDiv").hide();//隐藏扩展标签
    $("#addstaff").hide();//隐藏职工工具栏
    $("#extendStaff").hide();//隐藏职工信息
    $("#addstaffDiv").attr("key", "0");
    $("#addOrg").val("");//部门
    $("#addjob_grade").val("");//职位
    $("#addstartTime").val("");//入职时间
    $("#addWorkNO").val("");//工号
    $("#addstaff_type").val("");//职员类型
    $("#addstaff_status").val("");//职工状态
}
//关闭教师选项卡
function closeTeacherTool() {
    $("#addteacherDiv").hide();//隐藏扩展标签
    $("#addteacher").hide();//隐藏教师工具栏
    $("#extendTeacher").hide();//隐藏教师信息
    $("#addteacherDiv").attr("key", "0");
    $("#addclass_id").val("");//院系
    $("#addlevel").val("");//等级
    $("#addTeacherstatus").val("");//教师状态
}
//关闭学生选项卡
function closeStudentTool() {
    $("#addstudentDiv").hide();//隐藏扩展标签
    $("#addstudent").hide();//隐藏学生工具栏
    $("#extendStudent").hide();//隐藏学生信息
    $("#addstudentDiv").attr("key", "0");
    $("#addstudent_num").val("");//学号
    $("#addstudent_grade").val("");//年级
    $("#addstudentclass").val("");//班级
    $("#addInTime").val("");//入学时间
    $("#addedu_year").val("");//教育年限
    $("#addteacher_Name").val("");//导师
    $("#addstaff_Name").val("");//辅导员
    $("#addstudent_type").val("");//学生类型
    $("#addstudentStatus").val("");//学生状态
}
//给人员分配角色
function allocationRole(personId) {
    $("#allocationRoleDialog").dialog("open");
    $("#rolePersonId").val(personId);
    //根据personid获取角色
    $.ajax({
        url: "/PersonInfo/GetRoleByPersonId",
        type: "post",
        data: { personId: personId },
        datatype: "json",
        async: false,
        success: function (data) {
            if (data.status == 1) {
                alert("获取角色权限错误"+data.msg);
                return;
            } else {
                $.fn.zTree.init($("#purviewTree"), settingPurview, data.msg.purviewList);
                var treeObj1 = $.fn.zTree.getZTreeObj("purviewTree");
                treeObj1.expandAll(true);
                $.fn.zTree.init($("#roleTree"), settingRole, data.msg.roleList);
                var treeObj = $.fn.zTree.getZTreeObj("roleTree");
                treeObj.expandAll(true);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取角色权限出现"+XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//Ztree配置
var settingRole = {
    check: {
        enable: true,
        autoCheckTrigger: true,
        chkStyle: "radio"
    },
    edit: {
        enable: false,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    view: {
        selectedMulti: false,
        dblClickExpand: false
    },
    data: {
        keep: {
            parent: true,
            leaf: true
        },
        key: {
            name: "role_name"
        },
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: -1
        }
    },
    callback: {
        //beforeRename: updateNodeName,//修改节点名称回掉函数
        //onDblClick: purviewDbClick,//双击节点
        //onRightClick: OnRightClick
        onCheck: ztreeReloCheck,//勾选回掉函数
        onClick: zTreeReloOnClick//点击事件回掉函数
    }
}
//Ztree配置
var settingPurview = {
    edit: {
        enable: false,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    view: {
        selectedMulti: false,
        dblClickExpand: false
    },
    data: {
        keep: {
            parent: true,
            leaf: true
        },
        key: {
            name: "purview_name"
        },
        simpleData: {
            enable: true,
            idKey: "sid",
            pIdKey: "pid",
            rootPId: -1
        }
    },
    callback: {
        //beforeRename: updateNodeName,//修改节点名称回掉函数
        //onDblClick: purviewDbClick,//双击节点
        //onRightClick: OnRightClick
        //onCheck: ztreePurviewCheck//勾选回掉函数
    }
}
//勾选角色回掉函数
function ztreeReloCheck(event, treeId, treeNode) {
    //alert(treeNode.tId + ", " + treeNode.role_name + "," + treeNode.checked);
    //显示角色下的权限
    loadPurviewTreeByRoleId(treeNode.id);
    //用户绑定角色
    var personId = $("#rolePersonId").val();
    $.ajax({
        url: "/PersonInfo/PersonBindRole",
        type: "post",
        data: { roleId: treeNode.id, personId: personId },
        datatype: "json",
        async: false,
        success: function (data) {
            if (data.status == 1) {
                alert("给人员绑定角色错误"+data.msg);
                return;
            } else {
                if (data.msg) {
                    alert("绑定角色成功");
                } else {
                    alert("绑定角色失败");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("给人员绑定角色出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}

//角色单机事件
function zTreeReloOnClick(event, treeId, treeNode) {
    loadPurviewTreeByRoleId(treeNode.id);
}
//根据角色id获取角色下的权限
function loadPurviewTreeByRoleId(roleId) {
    $.ajax({
        url: "/PersonInfo/GetPurviewTreeByRoleId",
        type: "post",
        data: { roleId: roleId },
        datatype: "json",
        async: false,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
                return;
            } else {
                $.fn.zTree.init($("#purviewTree"), settingPurview, data.msg);
                var treeObj = $.fn.zTree.getZTreeObj("purviewTree");
                treeObj.expandAll(true);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}