
$(function () {
    $("#updatePwdDiv").dialog("close");
    getPersonInfo();
})
//修改密码弹窗
function updatePwdDialog() {
    $("#updatePwdDiv").dialog("open");
    clearDialogText();
}
//修改密码提交
function updatePwdBtn() {
    var oldPwd = $("#oldPwd").val();
    if (oldPwd == "") {
        alert("请输入原密码");
        $("#oldPwd")[0].focus();
        return;
    }
    var newPwd = $("#newPwd").val();
    if (newPwd == "") {
        alert("请输入新密码");
        $("#newPwd")[0].focus();
        return;
    }
    var verifyPwd = $("#verifyPwd").val();
    if (verifyPwd == "") {
        alert("请输入确认密码");
        $("#verifyPwd")[0].focus();
        return;
    }
    if (verifyPwd != newPwd) {
        alert("两次密码输入不一致请重新输入");
        $("#verifyPwd")[0].focus();
        return;
    }
    var userName = $.cookie("userName");
    $.ajax({
        url: "/PersonInfo/UpdatePwd",
        data: { userName: userName, oldPwd: oldPwd, newPwd: newPwd },
        type: "post",
        async: false,
        datatype: "json",
        success: function (data) {
            if (data.status == 1) {
                alert("密码修改错误：" + data.msg);
            }else {
                alert("修改成功");
                $("#updatePwdDiv").dialog("close");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("修改密码错误" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}

function clearDialogText() {
    $("#oldPwd").val("");
    $("#newPwd").val("");
    $("#verifyPwd").val("");
}
//获取人员信息
function getPersonInfo() {
    $.ajax({
        url: "/PersonInfo/GetPersonInfoByPersonId",
        data: { personId: PERSONINFOJSON.ssoid },
        type: "post",
        async: false,
        datatype: "json",
        success: function (data) {
            if (data.status == 1) {
                alert("获取人员信息错误：" + data.msg);
            } else {
                showPersonInfoDialog(data.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("修改密码错误" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//显示人员详细信息
function showPersonInfoDialog(personInfo) {
    /*--基础信息--*/
    $("#personName").text(personInfo.name == null ? "" : personInfo.name);//姓名
    $("#personGender").text(personInfo.genderName == null ? "" : personInfo.genderName);//性别
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
}