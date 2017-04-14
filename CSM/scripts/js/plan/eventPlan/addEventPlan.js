$(document).ready(function () {

    $("#defaultCheckboxPerson").click(function () {//默认处置项中勾选通知其他责任人复选框显示添加姓名，电话文本信息反之隐藏
        if (this.checked) {/*对默认是否为选中进行判断*/
            $("#chargePerson").css("display", "block");
        } else {
            $("#chargePerson").css("display", "none");
        }
    });
    $("#confirmationOptionsPerson").click(function () {//确认处置项中勾选通知其他责任人复选框显示添加姓名，电话文本信息反之隐藏
        if (this.checked) {/*对默认是否为选中进行判断*/
            $("#addPerson").css("display", "block");
        } else {
            $("#addPerson").css("display", "none");
        }
    });
    $("#soundLightBuzzer").click(function () {
        if (this.checked) {/*对默认是否为选中进行判断*/
            $("#fourColorLight").css("display", "block");
        } else {
            $("#fourColorLight").css("display", "none");
        }
    });

    $("#soundLightBuzzer").click(function () {
        if (this.checked) {/*对默认是否为选中进行判断*/
            $("#fourColorLight").css("display", "block");
        } else {
            $("#fourColorLight").css("display", "none");
        }
    });

    $("#defaultCheckbox td> label>input[name='someBox2']").click(function () {//打开周围摄像头未勾选禁用告警视频下载与相关摄像头上大屏
        if (this.checked) {/*对默认是否为选中进行判断*/
            for(var i=0;i< $("#defaultCheckbox td> label").length;i++)
            {
                if($("#defaultCheckbox td> label:eq("+i+")>span").html()=="告警视频下载" ||$("#defaultCheckbox td> label:eq("+i+")>span").html()=="相关摄像头上大屏")
                {
                    $("#defaultCheckbox td> label:eq(" + i + ")>input").attr("disabled", false);
                }
            }
        }
        else {
            for (var i = 0; i < $("#defaultCheckbox td> label").length; i++) {
                if ($("#defaultCheckbox td> label:eq(" + i + ")>span").html() == "告警视频下载" || $("#defaultCheckbox td> label:eq(" + i + ")>span").html() == "相关摄像头上大屏") {
                    $("#defaultCheckbox td> label:eq(" + i + ")>input").attr("disabled", true);
                    $("#defaultCheckbox td> label:eq(" + i + ")>input").prop('checked', false);
                    $("#defaultCheckbox td> label:eq(" + i + ")>input").attr('title', "必须勾选打开周围摄像头后此项才可用");
                }
            }
        }
    });

    determineWhetherToUse();
    getEventType();//获取事发类型
    //getEventRegion();//获取事发园区
    var eventType = $("#addEventType").val();
    getPlanDocument(eventType)
    $("#addEventType").multiselect({
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight: 500,
        onChange: function (option, checked) {
            var eventType = $("#addEventType").val();
            getPlanDocument(eventType);
            $('#fileInfoTitle').html("");
            var text = $("#addEventType").find("option:selected").text();
            $('#fileInfoTitle').append(text);
            
        },
    });
    var eventType = $("#addEventType").val();
    getPlanDocument(eventType);
    var regionId = 0;
    if ($.cookie("mainControlRegionId")) {
         regionId = $.cookie("mainControlRegionId")
    }
   if ($("#currentMainControlRegion").html()) {
   var regionName = $("#currentMainControlRegion").html()
   $("#addEventRegion").val(regionName);
    }
    getFourColourLamp(regionId);
    $('#fileInfoTitle').html("");
    var text = $("#addEventType").find("option:selected").text();
    $('#fileInfoTitle').append(text);
    if (EventPlanId == -1) {
        $("#addCreateTime").val("00:00:00");
        $("#addEndTime").val("23:59:59");
    }
});

var EventPlanId = eventPlanId;
var planStatus =2;//预案状态默认启用

//预案添加、修改中确认处置选项通知其他责任人现在只有一个，变成多个，最多三个；
var index = 1;
function addResponsiblePerson(addDivId, itemId, personName, personPhone, personCall, personMessage) {
    index++;
    if (($('div[id*="' + addDivId + '" ]').length) < 3) {
        var strJSDelete = 'javascript:deleteDIV(\"' + addDivId + '\",\"' + index + '\")';
        var strJSAdd = "javascript:addResponsiblePerson(\'" + addDivId + "\',\'" + index + "\',\'" + personName + "\',\'" + personPhone + "\',\'" + personCall + "\',\'" + personMessage + "\')";
        var str = "<div id='" + addDivId + "" + index + "' itemId='" + index + "'style='margin-top:5px;'><label> 姓名： <input type='text' class='form-control wh120'  name='" + personName + "' id='" + personName + "" + index + "' type='text' /></label> <label>手机： <input class='form-control wh120'  name='" + personPhone + "' id='" + personPhone + "" + index + "' type='text' /></label><label  class='ml20'>&nbsp;<input  name='" + personCall + "' id='" + personCall + "" + index + "' value='true'  type='checkbox'/><span>是否打电话</span></label><label  class='ml20'>&nbsp;<input name='" + personMessage + "' id='" + personMessage + "" + index + "' value='true'  type='checkbox' /><span>是否发短信</span></label>&nbsp;<a href='" + strJSDelete + "' style='Color:red;text-decoration:none;font-weight:bold'>X</a></div>";
        document.getElementById(addDivId).insertAdjacentHTML("beforeEnd", str);
    }
    else {
        alert("通知责任人最多只能添加三个联系方式！！");
    }
}


function deleteDIV(addDivId, itemId) {
    var obj = $("#" + addDivId).find("div[itemId='" + itemId + "']").remove();
}

//判断是否可用
function determineWhetherToUse()
{
    if ($("#defaultCheckbox td> label>input[name='someBox2']").is(':checked'))
    {
        for (var i = 0; i < $("#defaultCheckbox td> label").length; i++) {
            if ($("#defaultCheckbox td> label:eq(" + i + ")>span").html() == "告警视频下载" || $("#defaultCheckbox td> label:eq(" + i + ")>span").html() == "相关摄像头上大屏") {
                $("#defaultCheckbox td> label:eq(" + i + ")>input").attr("disabled", false);
            }
        }
    }
    else {
        for (var i = 0; i < $("#defaultCheckbox td> label").length; i++) {
            if ($("#defaultCheckbox td> label:eq(" + i + ")>span").html() == "告警视频下载" || $("#defaultCheckbox td> label:eq(" + i + ")>span").html() == "相关摄像头上大屏") {
                $("#defaultCheckbox td> label:eq(" + i + ")>input").attr("disabled", true);
                $("#defaultCheckbox td> label:eq(" + i + ")>input").prop('checked', false);
                $("#defaultCheckbox td> label:eq(" + i + ")>input").attr('title', "必须勾选打开周围摄像头后此项才可用");
            }
        }
    }
}


//添加预案
function insetEventPlan(eventPlanId, itemId) {
    eventPlanId = eventPlanId;
    var planName = $('#addPlanName').val();
    if (planName == "") {
        alert("请输入预案名称");
        $("#addPlanName").focus();
        checkflag = false
        return false;

    }
    var eventType = $("#addEventType").val();
    if (eventType == "-1" || eventType == null) {
        alert("请选择事件类型");
        $("#addEventType").focus();
        checkflag = false
        return false;
    }
    if ($.cookie("mainControlRegionId")) {
         var eventRegion = $.cookie("mainControlRegionId")
    }
    //var eventRegion = $("#addEventRegion").val();
    //if (eventRegion == "-1" || eventRegion == null) {
    //    alert("请选择事发园区");
    //    $("#addEventRegion").focus();
    //    checkflag = false
    //    return false;
    //}
    var planLevel = $("#addPlanLevel").val();
    if (planLevel == "-1" || planLevel == null) {
        alert("请选择事件级别");
        $("#addPlanLevel").focus();
        checkflag = false
        return false;
    }
    var fourColorLight = $("#fourColorLight").val();
    var addCreateTime = $("#addCreateTime").val();
    if (addCreateTime == "") {
        alert("请选择开始时间");
        $("#addCreateTime").focus();
        checkflag = false
        return false;
    }
    var executionCycle="*|*|*|?"
    var startTimeStr = timeOccupancy(eventPlanId, eventType, eventRegion, addCreateTime, executionCycle, "");
    if (startTimeStr != "") {
        alert(startTimeStr);
        checkflag = false
        return false;
    }
    var addEndTime = $("#addEndTime").val();
    if (addEndTime == "") {
        alert("请选择结束时间");
        $("#addEndTime").focus();
        checkflag = false
        return false;
    }
    var endTimeStr = timeOccupancy(eventPlanId, eventType, eventRegion, addCreateTime, executionCycle, "");
    if (endTimeStr != "") {
        alert(endTimeStr);
        checkflag = false
        return false;
    }
    //验证时间被占用没
    var timeOccupy = timeOccupancy(eventPlanId, eventType, eventRegion, addCreateTime, executionCycle, addEndTime)
    if (timeOccupy != "") {
        alert(timeOccupy);
        checkflag = false
        return false;
    }

    //默认处置项
    var defaultCbk = getdefaultCheckboxIds();
    var inBuilding="";//楼内处置项编号
    var Distance="";//摄像头显示范围
    var inCamera="";//楼内要打开的摄像头个数
    var outBuilding="";//楼外处置项编号
    var outCamera="";//楼外要打开的摄像头个数
    var reg = new RegExp("^[0-9]*$");
    if (defaultCbk.indexOf(itemId) > -1)
    {
        if($("input[id='inBuilding']").is(':checked'))
        {
             inBuilding = $("input[id='inBuilding']").attr('value');
             inCamera = $("#inCamera").val();
             if (inCamera == "") {
                 $("#inCamera").val(4)
                 inCamera=$("#inCamera").val();
             }
             if (!reg.test(inCamera)) {
                 alert("请输入数字!");
                 $("#inCamera").focus();
                 return false;
             }
        }
        if ($("input[id='outBuilding']").is(':checked'))
        {
            outBuilding = $("input[id='outBuilding']").attr('value');
            outCamera = $("#outCamera").val();
            if (outCamera == "") {
                $("#outCamera").val(5)
                outCamera=$("#outCamera").val();
            }
            if (!reg.test(outCamera)) {
                alert("请输入数字!");
                $("#outCamera").focus();
                return false;
            }
            Distance = $("#Distance").val();
            if (Distance == "") {
                $("#Distance").val(50)
                Distance=$("#Distance").val();
            }
            if (!reg.test(Distance)) {
                alert("请输入数字!");
                $("#Distance").focus();
                return false;
            }
            
        }
    }

    //确认处置项
    var cnfirmCbk = getConfirmOptionsIds();
    //获取默认处置项中所有姓名
    var defaultName = getdefaultCheckboxName();
    //获取确认处置项中所有姓名
    var cnfirmName = getConfirmOptionsName();
    //获取默认处置项中所有电话
    var defaultPhone = getdefaultCheckboxPhone();
    //获取确认处置项中所有电话
    var cnfirmPhone = getConfirmOptionsPhone();
    //获取默认处置项中是否打电话
    var defaultIsCall = getdefaultCheckboxIsCall();
    //获取确认处置项中是否打电话
    var cnfirmIsCall = getConfirmOptionsIsCall();
    //获取默认处置项中所有是否发短信项
    var defaultIsMessage = getdefaultCheckboxIsMessage();
    //获取确认处置项中所有是否发短信项
    var cnfirmIsMessage = getConfirmOptionsIsMessage();
    //正则表达式验证邮箱和手机号格式
    var strReg = "";
    var r;
    var x;
    //手机号格式
    strReg = /^0?(13[0-9]|15[012356789]|18[0236789])[0-9]{8}$/;
    var confirmHandle = [];
    confirmHandle = cnfirmCbk.split(",")
    for (var i = 0; i < confirmHandle.length; i++) {
        if (confirmHandle[i] == 4) {
            if (cnfirmName == "" && cnfirmPhone == "") {
                alert("请将确认选项中通知其他责任人信息补全或取消通知其他责任人选项");
                return;
            }
            else if (cnfirmPhone == "") {
                alert("请将确认选项中通知其他责任人信息补全或取消通知其他责任人选项");
                return;
            }

        }

    }
    var defaultHandle = [];
    defaultHandle = defaultCbk.split(",")
    for (var i = 0; i < defaultHandle.length; i++) {
        if (defaultHandle[i] == 8) {
            if (defaultName == "" && defaultPhone == "") {
                alert("请添加默认选项中通知其他责任人姓名和电话或取消通知其他责任人选项");
                return;
            }
            else if (defaultPhone == "") {
                alert("请添加默认选项中通知其他责任人电话或取消通知其他责任人选项");
                return;
            }
        }

    }
    var defaultInfo = $('#defaultCheckbox div[id*="chargePerson" ]');
    for (var i = 0; i < defaultInfo.length; i++) {
        var display = $('#chargePerson').css('display');
        if (display != "none") {
            var a = i + 1
            var Phone = $(defaultInfo).find("input[name=chargePersonPhone]")[i].value
            var Name = $(defaultInfo).find("input[name=chargePersonName]")[i].value;
            x = strReg.test(Phone);
            if (!x && Phone != "") {
                alert("" + $(defaultInfo).find("input[name=chargePersonName]")[i].value + "手机号格式都错误!");
                return false;
            }
            else if (Phone == "" && Name != "") {
                alert("请输入" + $(defaultInfo).find("input[name=chargePersonName]")[i].value + "的手机号!");
                return false;
            }

            else if (Phone == "" && Name == "") {
                alert("请输入第" + a + "行姓名与手机号信息或删除该行!");
                return false;
            }
            else if (Name == "") {
                alert("请输入第" + a + "行姓名信息或删除该行!");
                return false;
            }
        }
    }
    var cnfirmInfo = $('#confirmOptions div[id*="addPerson" ]');
    for (var i = 0; i < cnfirmInfo.length; i++) {
        var display = $('#addPerson').css('display');
        if (display != "none") {
            var a = i + 1
            var Phone = $(cnfirmInfo).find("input[name=personPhone]")[i].value;
            var Name = $(cnfirmInfo).find("input[name=personPhone]")[i].value;
            r = strReg.test(Phone);
            if (!r && Phone != "") {
                alert("" + $(cnfirmInfo).find("input[name=personName]")[i].value + "手机号格式都错误!");
                return false;
            }
            else if (Phone == "" && Name != "") {
                alert("请输入" + $(defaultInfo).find("input[name=chargePersonName]")[i].value + "的手机号!");
                return false;
            }

            else if (Phone == "" && Name == "") {
                alert("请输入第" + a + "行姓名与手机号信息或删除该行!");
                return false;
            }
            else if (Name == "") {
                alert("请输入第" + a + "行姓名信息或删除该行!");
                return false;
            }
        }

    }
    if (eventPlanId != -1) {
        $.ajax({
            url:"/Plan/UpdateEventPlanData",
            type: "post",
            data: "&eventPlanId=" + eventPlanId + "&planName=" + planName + "&eventType=" + eventType + "&eventRegion=" + eventRegion + "&planLevel=" + planLevel + "&addCreateTime=" + addCreateTime + "&addEndTime=" + addEndTime + "&executionCycle=" + executionCycle + "&defaultCbk=" + defaultCbk + "&cnfirmCbk=" + cnfirmCbk + "&defaultName=" + defaultName + "&defaultPhone=" + defaultPhone + "&cnfirmName=" + cnfirmName + "&cnfirmPhone=" + cnfirmPhone + "&cnfirmIsCall=" + cnfirmIsCall + "&cnfirmIsMessage=" + cnfirmIsMessage + "&defaultIsCall=" + defaultIsCall + "&defaultIsMessage=" + defaultIsMessage + "&fourColorLight=" + fourColorLight + "&inBuilding=" + inBuilding + "&outBuilding=" + outBuilding + "&Distance=" + Distance + "&outCamera=" + outCamera + "&inCamera=" + inCamera + "&planStatus=" + planStatus,
            datatype: 'json',
            async: false,
            success: function (data) {
                if (data.status == 0) {
                    alert("事件预案修改成功！");
                    window.location.href = "/Plan/EventList"
                }
                else {
                    alert("获取事件预案修改出现" + data.msg + "错误请联系管理员！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("获取事件预案修改出现"+XMLHttpRequest.status + "错误请联系管理员！")
            }
        });
    }
    else {
       // var planStatus = 2;//预案默认启动
        $.ajax({
            url: "/Plan/InsetEventPlanData",
            type: "post",
            data: "&planName=" + planName + "&eventType=" + eventType + "&eventRegion=" + eventRegion + "&planLevel=" + planLevel + "&addCreateTime=" + addCreateTime + "&addEndTime=" + addEndTime + "&executionCycle=" + executionCycle + "&defaultCbk=" + defaultCbk + "&cnfirmCbk=" + cnfirmCbk + "&defaultName=" + defaultName + "&defaultPhone=" + defaultPhone + "&cnfirmName=" + cnfirmName + "&cnfirmPhone=" + cnfirmPhone + "&cnfirmIsCall=" + cnfirmIsCall + "&cnfirmIsMessage=" + cnfirmIsMessage + "&defaultIsCall=" + defaultIsCall + "&defaultIsMessage=" + defaultIsMessage + "&fourColorLight=" + fourColorLight + "&inBuilding=" + inBuilding + "&outBuilding=" + outBuilding + "&Distance=" + Distance + "&outCamera=" + outCamera + "&inCamera=" + inCamera,
            datatype: 'json',
            async: false,
            success: function (data) {
                if (data.status == 0) {
                        alert("事件预案注册成功！");
                        window.location.href = "/Plan/EventList"
                }
                else {
                    alert("获取事件预案注册出现" + data.ms + "错误请联系管理员！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("获取事件预案修改出现"+XMLHttpRequest.status + "错误请联系管理员！")
            }
        });
    }
}

//检测预案中时间是否被占用
function timeOccupancy(eventPlanId, eventTypeId, regionId, addCreateTime, executionCycle, addEndTime) {
    var strReset="";
    $.ajax({
        url: "/Plan/CheckPlanTimeOccupied",
        type: "post",
        data: "&eventPlanId=" + eventPlanId + "&eventTypeId=" + eventTypeId + "&regionId=" + regionId + "&planTime=" + addCreateTime + "&executionCycle=" + executionCycle + "&addEndTime=" + addEndTime,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                if (data.msg == true) {
                    strReset ="";
                }
                else
                {
                    if (addEndTime != "")
                    {
                        strReset += "你选择的时间段" + addCreateTime + "~" + addEndTime + "已经被以下时间段占用 ";
                    }
                    else {
                        strReset += "你选择的时间" + addCreateTime + "已经被以下时间段占用 ";
                    }
                    for (var i = 0; i < data.msg.length; i++) {
                        strReset += i + 1 + "、时间段" + data.msg[i].start_time + "~" + data.msg[i].end_time + "  ";
                    }
                }
            }
            else {
                strReset = "查看时间是否被占用出现" + data.msg + "错误请联系管理员！";
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            strReset = "查看时间是否被占用出现" + XMLHttpRequest.status + "错误请联系管理员！";
        }
    });
    return strReset;
}





//获取事件类型
function getEventType() {
    var  Id=-1;//事件类型pid=-1
    $.ajax({
        url: "/Plan/GetOrdinanceType",
        type: "post",
        data: "Id="+Id,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                if (data.msg.length < 1) {
                    $("<option value='-1'>请选择</option>").appendTo('#addEventType'); //动态添加Option子项
                }
                else {
                    for (var i = 0; i < data.msg.length; i++) {
                        $("<option value='" + data.msg[i].id + "'>" + data.msg[i].event_name + "</option>").appendTo('#addEventType'); //动态添加Option子项
                    }
                }
            }
            else {
                alert("获取事件类型出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取事件类型出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}
//获取事发园区
function getEventRegion() {
    $.ajax({
        url: "/Plan/GetEventRegion",
        type: "post",
        data: "",
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                if (data.msg.length < 1)
                {
                    $("<option value='-1'>请选择</option>").appendTo('#addEventRegion'); //动态添加Option子项
                }
                else {
                    for (var i = 0; i < data.msg.length; i++) {
                        $("<option value='" + data.msg[i].id + "'>" + data.msg[i].region_name + "</option>").appendTo('#addEventRegion'); //动态添加Option子项
                    }
                }

            }
            else {
                alert("获取事件园区出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取事件园区出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}





//获取选择的默认处置项checkbox的id
function getdefaultCheckboxIds() {
    var ckbidstrsbmr = "";
    $("#defaultCheckbox td> label>input[type='checkbox']:checked").each(function (i) {
        if (ckbidstrsbmr != "")
            ckbidstrsbmr += ",";
        ckbidstrsbmr += $(this).val();
    });
    return ckbidstrsbmr;
}

//获取选择的确认处置项checkbox的id
function getConfirmOptionsIds() {
    var ckbidstrsbmr = "";
    $("#confirmCheckbox td> label>input[type='checkbox']:checked").each(function (i) {
        if (ckbidstrsbmr != "")
            ckbidstrsbmr += ",";
        ckbidstrsbmr += $(this).val();
    });
    return ckbidstrsbmr;
}
//获取所有默认选项中姓名
function getdefaultCheckboxName() {
    var result = "";
    var txt = $('#defaultCheckbox div[id*="chargePerson" ]').find("input[name=chargePersonName]");
    for (var i = 0; i < txt.length; i++) {
        var s = $(txt[i]).val();
        if (s != "-1")
            result += s + ",";
    }
    if (result.length > 0)
        result = result.substring(0, result.length - 1);
    return result;
}
//获取所有确认选项中姓名
function getConfirmOptionsName() {
    var result = "";
    var txt = $('#confirmCheckbox div[id*="addPerson" ]').find("input[name=personName]");
    for (var i = 0; i < txt.length; i++) {
        var s = $(txt[i]).val();
        if (s != "-1")
            result += s + ",";
    }
    if (result.length > 0)
        result = result.substring(0, result.length - 1);
    return result;
}

//获取所有默认选项中电话
function getdefaultCheckboxPhone() {
    var result = "";
    var txt = $('#defaultCheckbox div[id*="chargePerson" ]').find("input[name=chargePersonPhone]");
    for (var i = 0; i < txt.length; i++) {
        var s = $(txt[i]).val();
        if (s != "-1")
            result += s + ",";
    }
    if (result.length > 0)
        result = result.substring(0, result.length - 1);
    return result;
}
//获取所有确认选项中电话
function getConfirmOptionsPhone() {
    var result = "";
    var txt = $('#confirmCheckbox div[id*="addPerson" ]').find("input[name=personPhone]");
    for (var i = 0; i < txt.length; i++) {
        var s = $(txt[i]).val();
        if (s != "-1")
            result += s + ",";
    }
    if (result.length > 0)
        result = result.substring(0, result.length - 1);
    return result;
}
//获取所有默认选项发短信
function getdefaultCheckboxIsMessage() {
    var result = "";
    var txt = $('#defaultCheckbox div[id*="chargePerson" ]').find("input[name=chargeIsMessage]");
    for (var i = 0; i < txt.length; i++) {
        if (($(txt[i]).is(':checked')) == true) {
            $(txt[i]).val(1);
        }
        else {
            $(txt[i]).val(0);
        }
        var s = $(txt[i]).val();
        if (s != "-1")
            result += s + ",";
    }
    if (result.length > 0)
        result = result.substring(0, result.length - 1);
    return result;
}
//获取所有默认项打电话项
function getdefaultCheckboxIsCall() {
    var result = "";
    var txt = $('#defaultCheckbox div[id*="chargePerson" ]').find("input[name=chargeIsCall]");
    for (var i = 0; i < txt.length; i++) {
        if (($(txt[i]).is(':checked')) == true) {
            $(txt[i]).val(1);
        }
        else {
            $(txt[i]).val(0);
        }
        var s = $(txt[i]).val();
        if (s != "-1")
            result += s + ",";
    }
    if (result.length > 0)
        result = result.substring(0, result.length - 1);
    return result;
}

//获取所有确认选项是否发短信
function getConfirmOptionsIsMessage() {
    var result = "";
    var txt = $('#confirmCheckbox div[id*="addPerson" ]').find("input[name=isMessage]");
    for (var i = 0; i < txt.length; i++) {
        if (($(txt[i]).is(':checked')) == true) {
            $(txt[i]).val(1);
        }
        else {
            $(txt[i]).val(0);
        }
        var s = $(txt[i]).val();
        if (s != "-1")
            result += s + ",";
    }
    if (result.length > 0)
        result = result.substring(0, result.length - 1);
    return result;
}
//获取所有确认选项中是否打电话
function getConfirmOptionsIsCall() {
    var result = "";
    var txt = $('#confirmCheckbox div[id*="addPerson" ]').find("input[name=isCall]");
    for (var i = 0; i < txt.length; i++) {
        if (($(txt[i]).is(':checked')) == true) {
            $(txt[i]).val(1);
        }
        else {
            $(txt[i]).val(0);
        }
        var s = $(txt[i]).val();
        if (s != "-1")
            result += s + ",";
    }
    if (result.length > 0)
        result = result.substring(0, result.length - 1);
    return result;
}


//点击选择摄像头框去掉框中内容
function filterFocus(ele) {
    $(ele).val("");

}


//获取已添加的预案信息
function getEventPlanInfo(eventPlanId) {

    $.ajax({
        url: "/Plan/GetEventPlanInfo",
        type: "post",
        data: "eventPlanId=" + eventPlanId,
        datatype: "json",
        async: false,
        success: function (data) {
            if(data.status==0)
            {
                //预案名称
                $("#addPlanName").val(data.msg.entity.plan_name);
                $("#addEventType").multiselect('select', data.msg.entity.event_type);
                $("#addEventType").val(data.msg.entity.event_type);
                planStatus = data.msg.entity.plan_status;
                $("#addEventType").multiselect("refresh");
                $('#fileInfoTitle').html("");
                var text = $("#addEventType").find("option:selected").text();
                $('#fileInfoTitle').append(text);
                var eventType = $("#addEventType").val();
                getPlanDocument(eventType);
                if ($.cookie("mainControlRegionId")) {
                    if( $.cookie("mainControlRegionId")==data.msg.entity.region_id)
                    {
                        if ($("#currentMainControlRegion").html()) {
                            var regionName = $("#currentMainControlRegion").html()
                            $("#addEventRegion").val(regionName);
                        }
                    }
                    else {
                        $("#addEventRegion").val("未知");
                }
                }
                var regionId = data.msg.entity.region_id;
                getFourColourLamp(regionId);
                $("#addPlanLevel").val(data.msg.entity.plan_level);
                $("#addCreateTime").val(data.msg.servExecutionTime.start_time);
                $("#addEndTime").val(data.msg.servExecutionTime.end_time);
                //默认处置项
                var defaultPlanHandleItem = [];
                defaultPlanHandleItem = data.msg.defaultPlanHandleItemList;
                $("#defaultCheckbox td> label>input[type='checkbox']").each(function () {
                    for (var i = 0; i < defaultPlanHandleItem.length; i++) {
                        if ($(this).val() == defaultPlanHandleItem[i].item_type && $(this).val() != $("#soundLightBuzzer").val()) {
                            $(this).prop('checked', true);
                            $(this).attr("disabled", false);
                        }
                        else if ($(this).val() == defaultPlanHandleItem[i].item_type && $(this).val() == $("#soundLightBuzzer").val()) {
                            $("#fourColorLight").css("display", "block");
                            $(this).prop('checked', true);
                            $("#fourColorLight").val(parseInt(defaultPlanHandleItem[i].ext1))
                        }
                       if ($(this).val() == defaultPlanHandleItem[i].item_type && $(this).val() == $("#openCamera").val()) {
                           $("#openRulesInfo").css("display", "block");
                           $(this).prop('checked', true);
                           if($("#inBuilding").val()==parseInt(defaultPlanHandleItem[i].ext2))
                           {
                               $("#inBuilding").prop('checked', true);
                               $("#inCamera").val(parseInt(defaultPlanHandleItem[i].ext4));
                           }
                           if ($("#outBuilding").val() == parseInt(defaultPlanHandleItem[i].ext2)) {
                               $("#outBuilding").prop('checked', true);
                               $("#Distance").val(parseInt(defaultPlanHandleItem[i].ext3));
                               $("#outCamera").val(parseInt(defaultPlanHandleItem[i].ext4));
                           }
                          
                        }
                    }

                });
                determineWhetherToUse();
                //确认处置项
                var cnfirmPlanHandleItem = [];
                cnfirmPlanHandleItem = data.msg.cnfirmPlanHandleItemList
                $("#confirmCheckbox td> label>input[type='checkbox']").each(function () {
                    for (var i = 0; i < cnfirmPlanHandleItem.length; i++) {
                        if ($(this).val() == cnfirmPlanHandleItem[i].item_type) {
                            $(this).prop('checked', true);
                        }
                    }
                });
                //默认处置项通知其他责任人
                if (data.msg.defaultPersonList.length != 0) {
                    $("#chargePerson").css("display", "block");
                    $("#chargePersonName").val(data.msg.defaultPersonList[0].person_name);
                    $("#chargePersonPhone").val(data.msg.defaultPersonList[0].person_phone_num);
                    if (data.msg.defaultPersonList[0].is_call == true) {
                        $("#chargeIsCall").attr("checked", true);
                    }
                    else {
                        $("#chargeIsCall").attr("checked", false);
                    }
                    if (data.msg.defaultPersonList[0].is_message == true) {
                        $("#chargeIsMessage").attr("checked", true);
                    }
                    else {
                        $("#chargeIsMessage").attr("checked", false);
                    }
                    for (var i = 1; i < data.msg.defaultPersonList.length; i++) {
                        addResponsiblePerson("chargePerson", "", "chargePersonName", "chargePersonPhone", "chargeIsCall", "chargeIsMessage")
                        $("#chargePersonName" + index).val(data.msg.defaultPersonList[i].person_name);
                        $("#chargePersonPhone" + index).val(data.msg.defaultPersonList[i].person_phone_num);
                        if (data.msg.defaultPersonList[i].is_call == true) {
                            $("#chargeIsCall" + index).attr("checked", true);
                        }
                        else {
                            $("#chargeIsCall" + index).attr("checked", false);
                        }
                        if (data.msg.defaultPersonList[i].is_message == true) {
                            $("#chargeIsMessage" + index).attr("checked", true);
                        }
                        else {
                            $("#chargeIsMessage" + index).attr("checked", false);
                        }
                    }
                }
                else {
                    $("#chargePersonName").val();
                    $("#chargePersonPhone").val();
                    $("#chargeIsCall" + index).attr("checked", false)
                    $("#chargeIsMessage" + index).attr("checked", false);
                }
                //确认处置项通知其他责任人
                if (data.msg.cnfirmPlanPersonList.length != 0) {
                    $("#addPerson").css("display", "block");
                    $("#personName").val(data.msg.cnfirmPlanPersonList[0].person_name);
                    $("#personPhone").val(data.msg.cnfirmPlanPersonList[0].person_phone_num);
                    if (data.msg.cnfirmPlanPersonList[0].is_call == true) {
                        $("#isCall").attr("checked", true);
                    }
                    else {
                        $("#isCall").attr("checked", false);
                    }
                    if (data.msg.cnfirmPlanPersonList[0].is_message == true) {
                        $("#isMessage").attr("checked", true);
                    }
                    else {
                        $("#isMessage").attr("checked", false);
                    }
                    for (var i = 1; i < data.msg.cnfirmPlanPersonList.length; i++) {
                        addResponsiblePerson("addPerson", "", "personName", "personPhone", "isCall", "isMessage")
                        $("#personName" + index).val(data.msg.cnfirmPlanPersonList[i].person_name);
                        $("#personPhone" + index).val(data.msg.cnfirmPlanPersonList[i].person_phone_num);
                        if (data.msg.cnfirmPlanPersonList[i].is_call == true) {
                            $("#isCall" + index).attr("checked", true);
                        }
                        else {
                            $("#isCall" + index).attr("checked", false);
                        }
                        if (data.msg.cnfirmPlanPersonList[i].is_message == true) {
                            $("#isMessage" + index).attr("checked", true);
                        }
                        else {
                            $("#isMessage" + index).attr("checked", false);
                        }
                    }
                }
                else {
                    $("#personName").val();
                    $("#personPhone").val();
                    $("#isCall" + index).attr("checked", false)
                    $("#isMessage" + index).attr("checked", false);
                }
            }
            else {
                alert("获取预案信息出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取预案信息出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });

}



//根据事件获取上传文档
function getPlanDocument(eventType)
{
    $.ajax({
        url: "/Plan/GetPlanDocument",
        type: "post",
        data: "eventType=" + eventType,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                $('#eventPlanText').html("");
                for (var i = 0; i < data.msg.length; i++) {
                    var info = "<p><span>" + (i + 1) + "、" + data.msg[i].file_name + "</span><label>" + Util.changeDateFormat(data.msg[i].create_time) + "";
                    if (!/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(data.msg[i].file_ext_name))
                    {
                        info += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='downloads' style='cursor:pointer' onclick='saveAs(&quot;" + data.msg[i].file_address + "&quot;,&quot;" + data.msg[i].file_ext_name + "&quot;,&quot;" + data.msg[i].file_name + "&quot;)' >下载</span><iframe src='' height='0px' id='dd'  style='display:none'></iframe></label></p>";
                    }
                    else
                    {
                        info += "<span class='downloads' style='cursor:pointer'onclick='previewImage(&quot;" + data.msg[i].file_address + "&quot;)' >预览</span><span class='downloads' style='cursor:pointer' onclick='saveAs(&quot;" + data.msg[i].file_address + "&quot;,&quot;" + data.msg[i].file_ext_name + "&quot;,&quot;" + data.msg[i].file_name + "&quot;)'>下载</span><iframe src='' height='0px' id='dd'  style='display:none'></iframe></label></p>";
                    }
                    
                    $('#eventPlanText').append(info);
                }
            }
            else {
                alert("获取相关文档" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取相关文档" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}

//浏览图片
function previewImage(ImgUrl) {
    window.open(ImgUrl);
}

//下载文件
function saveAs(imgUrl, extName, fileName) {
    $("#dd").attr("src", "/Plan/SaveDocument?url=" + imgUrl + '&extName=' + extName + '&fileName=' + fileName);
}

//取消
function cancelEventModify()
{
    window.location.href = "/Plan/EventList"
}


//获取事发园区
function getFourColourLamp(regionId) {
    $.ajax({
        url: "/Plan/getFourColourLamp",
        type: "post",
        data: "regionId=" + regionId,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                if (data.msg.length < 1) {
                    $("#fourColorLight").html("");
                    $("<option value='-1'>无</option>").appendTo('#fourColorLight'); //动态添加Option子项
                }
                else {
                    $("#fourColorLight").html("");
                    for (var i = 0; i < data.msg.length; i++) {
                        $("<option value='" + data.msg[i].id + "'>" + data.msg[i].relay_content + "</option>").appendTo('#fourColorLight'); //动态添加Option子项
                    }
                }

            }
            else {
                alert("获取四色灯出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取四色灯出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}


























