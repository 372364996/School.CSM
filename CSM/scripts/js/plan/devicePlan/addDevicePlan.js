$(document).ready(function () {

    $("#defaultOptionsPerson").click(function () {//默认处置项中勾选通知其他责任人复选框显示添加姓名，电话文本信息反之隐藏
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
    $("#soundLightBuzzer").click(function () {//确认处置项中勾选通知其他责任人复选框显示添加姓名，电话文本信息反之隐藏
        if (this.checked) {/*对默认是否为选中进行判断*/
            $("#fourColorLight").css("display", "block");
        } else {
            $("#fourColorLight").css("display", "none");
        }
    });

    $("#videodownload").click(function () {//确认处置项中勾选通知其他责任人复选框显示添加姓名，电话文本信息反之隐藏
        if (this.checked) {/*对默认是否为选中进行判断*/
            if ($("#associatedCameraOptions").is(':checked')) {/*对默认是否为选中进行判断*/
                $("#videodownload").prop('checked', true);
            } else {
                alert("请勾选关联摄像头后再勾选告警视频下载");
                $("#videodownload").prop('checked', false);
            }
            
        } else {
            $("#videodownload").prop('checked', false);
        }
       
    });
    $("#associatedCameraOptions").click(function () {
        if (this.checked) {/*对默认是否为选中进行判断*/
            if(document.getElementById("addSelectedCamera").options.length > 0)
            {
            }
        else{
                alert("请先在第二步关联视频中选择摄像头，否则不可以勾选关联摄像头");
                $("#associatedCameraOptions").prop('checked', false);
            }
        } else {
            if ($("#videodownload").is(':checked')) {
                if (confirm("取消关联摄像头选项后,你勾选的告警视频下载也将取消，是否继续取消选中事件！！")) {
                    $("#associatedCameraOptions").prop('checked', false);
                    $("#videodownload").prop('checked', false);
                }
                else {
                    $("#associatedCameraOptions").prop('checked', true);
                }
            }
        }
    });
    getDeviceType();//获取设备类型
    if ($.cookie("mainControlRegionId")) {
        regionId = $.cookie("mainControlRegionId")
    }
    if ($("#currentMainControlRegion").html()) {
        var regionName = $("#currentMainControlRegion").html()
        $("#addEventRegion").val(regionName);
    }
    //getEventRegion();//获取园区
    if (deviceType<0)
    {
        deviceType = $("#addEquipmentType").val();
    }
    if (regionId < 0)
    {
        if ($.cookie("mainControlRegionId")) {
            regionId = $.cookie("mainControlRegionId")
        }
    }
    getDevice(deviceType, regionId)//根据设备类型获取设备
    $("#addEquipmentType").multiselect({
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight: 300,
        onChange: function (option, checked) {
            deviceType = $("#addEquipmentType").val();
             getDevice(deviceType, regionId)//根据设备类型获取设备
             getFourColourLamp(regionId)
            var newAlarmEquipment = new Array();
            var obj = new Object();
            $.each(allDevice, function (index, Device) {
                obj = {
                    label: Device.device_name,
                    value: Device.id
                };
                newAlarmEquipment.push(obj);
            });
            $("#addAlarmEquipment").multiselect('dataprovider', newAlarmEquipment);
            $('#addAlarmEquipment').multiselect('refresh');//multiselect刷新重新加载项
            var deviceId = $("#addAlarmEquipment").val();
            getCameraInfo(regionId)//获取摄像头列表
            emptyDevice();//清空设备图层
            GetAllDevice(deviceId, regionId);//加载设备图层
            transferDeviceData(-1);//点击地图上摄像头将摄像头添加到已选摄像头列表中
            addCameraToList(cameraDevice); //刷新摄像头列表
            mapBuildingInfo();
          
        }
    });
    $("#addAlarmEquipment").multiselect({
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight:200,
        onChange: function (option, checked) {
            var deviceId = $("#addAlarmEquipment").val();
            getFourColourLamp(regionId);
            getCameraInfo(regionId)//获取摄像头列表
            emptyDevice();//清空设备图层
             GetAllDevice(deviceId, regionId);//加载设备图层
            transferDeviceData(-1);//点击地图上摄像头将摄像头添加到已选摄像头列表中
            addCameraToList(cameraDevice); //刷新摄像头列表
            mapBuildingInfo();
        },
    });
    if (DeviceId != 0)
    {
        var deviceId = DeviceId
    }
    else {
        var deviceId = $("#addAlarmEquipment").val();
    }
    getCameraInfo(regionId)//获取摄像头列表
    addCameraToList(cameraDevice);
    getFourColourLamp(regionId);
    emptyDevice();//清空设备图层
    GetAllDevice(deviceId, regionId);//加载设备图层
    transferDeviceData(-1);//点击地图上摄像头将摄像头添加到已选摄像头列表中
    mapBuildingInfo();
    $("#addEquipmentType").multiselect('select', deviceType);
    $("#addEquipmentType").val(deviceType);
    $("#addEquipmentType").multiselect("refresh");
    $("#addAlarmEquipment").multiselect('select', deviceId)
    $("#addAlarmEquipment").val(deviceId);
    $("#addAlarmEquipment").multiselect("refresh");
    if(devicePlanId==-1)
    {
         $("#addCreateTime").val("00:00:00");
       
         $("#addEndTime").val("23:59:59");
    }
    
});

var devicePlanId = devicePlanId;

var deviceType = -1;
if (DeviceType!= 0)
{
    deviceType = DeviceType;
}
var regionId = -1;
if (RegionId!=0)
{
    regionId = RegionId;
}
var allDevice;
var allDeviceType;
var cameraDevice = [];//摄像头设备集合
var cameraIdList = [];//点击的摄像头集合
var notSelectedCamera = [];//未选择的摄像头
var planStatus = 2;//预案默认启动





//预案添加、修改中确认处置选项通知其他责任人现在只有一个，变成多个，最多三个；
var index = 1;
function addResponsiblePerson(addDivId, itemId, personName, personPhone, personCall, personMessage) {
    index++;
    if (($('div[id*="' + addDivId + '" ]').length) < 3) {
        var strJSDelete = 'javascript:deleteDIV(\"' + addDivId + '\",\"' + index + '\")';
        var strJSAdd = "javascript:addResponsiblePerson(\'" + addDivId + "\',\'" + index + "\',\'" + personName + "\',\'" + personPhone + "\',\'" + personCall + "\',\'" + personMessage + "\')";
        var str = "<div id='" + addDivId + "" + index + "' itemId='" + index + "' style='margin-top:5px;'>姓名：<input class='text2' name='" + personName + "' id='" + personName + "" + index + "' type='text' style='width:50px; height:22px' />&nbsp;&nbsp; 手机：<input class='text3'style='width:85px; height:22px' name='" + personPhone + "' id='" + personPhone + "" + index + "' type='text' />&nbsp;&nbsp;&nbsp;<div class='checkbox callcheck'><label><input  name='" + personCall + "' id='" + personCall + "" + index + "' value='true'  type='checkbox'/><span>是否打电话</span></label><label><input name='" + personMessage + "' id='" + personMessage + "" + index + "' value='true'  type='checkbox' /><span>是否发短信</span></label></div>&nbsp;&nbsp;&nbsp;<a href='" + strJSDelete + "' style='Color:red;text-decoration:none;font-weight:bold'>X</a></div>";
        document.getElementById(addDivId).insertAdjacentHTML("beforeEnd", str);
    }
    else {
        alert("通知责任人最多只能添加三个联系方式！！");
    }
}

function deleteDIV(addDivId, itemId) {
    var obj = $("#" + addDivId).find("div[itemId='" + itemId + "']").remove();
}
////点击内容右边部分编号上一步，下一步切换
function transformationSteps(value) {
    if (value == "essentialInfo") {
        $("#essentialInfo").attr("class", "first-pro2 active3").siblings().removeClass("active3");//当前<li>元素高亮
        $("#associatedCamera").attr("class", "two-pro");
        $("#disposalOptions").attr("class", "three-pro");
        $("#" + value + "box").css("display", "block").siblings().css("display", "none");
    }
    else if (value == "associatedCamera") {
        $("#associatedCamera").attr("class", "two-pro2 active3").siblings().removeClass("active3");//当前<li>元素高亮
        $("#essentialInfo").attr("class", "first-pro");
        $("#disposalOptions").attr("class", "three-pro");
        $("#" + value + "box").css("display", "block").siblings().css("display", "none");
    }
    else if (value == "disposalOptions") {
        $("#disposalOptions").attr("class", "three-pro2 active3").siblings().removeClass("active3");//当前<li>元素高亮
        $("#associatedCamera").attr("class", "two-pro");
        $("#essentialInfo").attr("class", "first-pro"); //改成first-pro
        $("#" + value + "box").css("display", "block").siblings().css("display", "none");
        getOptionLength();
    }
}



function getOptionLength()
{
  if (document.getElementById("addSelectedCamera").options.length > 0) {
      var checkboxInfo = $("#defaultCheckbox input[type='checkbox']");
      for (var i=0; i < checkboxInfo.length;i++)
      {
          var checkText= $(checkboxInfo[i]).siblings().text();
          if (checkText == "关联摄像头")
          {
              $(checkboxInfo[i]).prop('checked', true);
              $(checkboxInfo[i]).on('click',function (){
                      if (this.checked) {/*对默认是否为选中进行判断*/
                          
                      } else {
                          if (confirm("取消关联摄像头选项后，您在第二项选择的摄像头都将无效，是否继续取消选中事件！"))
                          {
                              $(this).prop('checked', false);
                          }
                          else {
                              $(this).prop('checked', true);
                          }
                          
                      }
              });
          }

      }

   }
}

//检验所填信息正确性
function getInfoCorrectness()
{
    var checkflag = true;
    devicePlanId = devicePlanId;
    var planName = $('#addDevicePlanName').val();
    if (planName == "") {
        alert("请输入预案名称");
        $("#addDevicePlanName").focus();
        checkflag = false
        return false;
        
    }
    var deviceType = $("#addEquipmentType").val();
    if (deviceType == "-1" || deviceType == null) {
        alert("请选择设备类型");
        $("#addEquipmentType").focus();
        checkflag = false
        return false;
    }
    var deviceId = $("#addAlarmEquipment").val();
    if (deviceId == "-1" || deviceId==null) {
        alert("请选择报警设备");
        $("#addAlarmEquipment").focus();
        checkflag = false
        return false;
    }
    var addCreateTime = $("#addCreateTime").val();
    if (addCreateTime == "") {
        alert("请选择开始时间");
        $("#addCreateTime").focus();
        checkflag = false
        return false;
    }
    var executionCycle = "*|*|*|?"
    var startTimeStr = timeOccupancy(devicePlanId, deviceId, addCreateTime,executionCycle, "");
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
    var endTimeStr = timeOccupancy(devicePlanId, deviceId, addEndTime, executionCycle, "");
    if (endTimeStr != "") {
        alert(endTimeStr);
        checkflag = false
        return false;
    }
    //验证时间被占用没
    var timeOccupy = timeOccupancy(devicePlanId, deviceId, addCreateTime, executionCycle, addEndTime)
    if (timeOccupy != "") {
        alert(timeOccupy);
        checkflag = false
        return false;
    }
    if(checkflag==true)
    {
        transformationSteps('associatedCamera')
    }
}


//添加预案
function insetDevicePlan(devicePlanId) {
    devicePlanId = devicePlanId;
    var planName = $('#addDevicePlanName').val();
    var deviceType = $("#addEquipmentType").val();
    var fourColorLight = $("#fourColorLight").val();
    var deviceId = $("#addAlarmEquipment").val();
    var planLevel = 1;//预案级别默认值
    //var planStatus = 2;//预案默认启动
    var addCreateTime = $("#addCreateTime").val();
    var addEndTime = $("#addEndTime").val();
    var executionCycle = "*|*|*|?"
    //视频设备编号
    var cameraId = getSelectCameraCode("addSelectedCamera");
    //默认处置项
    var defaultCbk = getDefaultOptionsIds();
    //确认处置项
    var cnfirmCbk = getConfirmOptionsIds();
    //获取默认处置项中所有姓名
    var defaultName = getDefaultOptionsName();
    //获取确认处置项中所有姓名
    var cnfirmName = getConfirmOptionsName();
    //获取默认处置项中所有电话
    var defaultPhone = getDefaultOptionsPhone();
    //获取确认处置项中所有电话
    var cnfirmPhone = getConfirmOptionsPhone();
    //获取默认处置项中是否打电话
    var defaultIsCall = getDefaultOptionsIsCall();
    //获取确认处置项中是否打电话
    var cnfirmIsCall = getConfirmOptionsIsCall();
    //获取默认处置项中所有是否发短信项
    var defaultIsMessage = getDefaultOptionsIsMessage();
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
        if (defaultHandle[i] ==8) {
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
    var defaultInfo = $('#defaultOptions div[id*="chargePerson" ]');
    for (var i = 0; i < defaultInfo.length; i++) {
        var display = $('#chargePerson').css('display');
        if (display != "none")
        {
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
        if (display != "none")
        {
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
    if (devicePlanId != -1) {
        $.ajax({
            url: "/Plan/UpdateDevicePlanData",
            type: "post",
            data: "&devicePlanId=" + devicePlanId + "&planName=" + planName + "&planLevel=" + planLevel + "&deviceId=" + deviceId + "&addCreateTime=" + addCreateTime + "&addEndTime=" + addEndTime + "&cameraId=" + cameraId + "&defaultCbk=" + defaultCbk + "&cnfirmCbk=" + cnfirmCbk + "&defaultName=" + defaultName + "&defaultPhone=" + defaultPhone + "&cnfirmName=" + cnfirmName + "&cnfirmPhone=" + cnfirmPhone + "&cnfirmIsCall=" + cnfirmIsCall + "&cnfirmIsMessage=" + cnfirmIsMessage + "&defaultIsCall=" + defaultIsCall + "&defaultIsMessage=" + defaultIsMessage + "&fourColorLight=" + fourColorLight + "&executionCycle=" + executionCycle + "&planStatus=" + planStatus,
            datatype: 'json',
            async: false,
            success: function (data) {
                if (data.status == 0) {
                    if (data.msg == true) {
                        alert("设备预案修改成功！");
                        window.location.href = "/Plan/Index"
                    }
                }
                else {
                    alert("获取设备预案修改出现" + data.msg + "错误请联系管理员！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("获取设备预案修改出现"+XMLHttpRequest.status + "错误请联系管理员！")
            }
        });
    }
    else {
        $.ajax({
            url: "/Plan/InsetDevicePlanData",
            type: "post",
            data: "&planName=" + planName + "&planLevel=" + planLevel + "&deviceId=" + deviceId + "&addCreateTime=" + addCreateTime + "&addEndTime=" + addEndTime + "&cameraId=" + cameraId + "&defaultCbk=" + defaultCbk + "&cnfirmCbk=" + cnfirmCbk + "&defaultName=" + defaultName + "&defaultPhone=" + defaultPhone + "&cnfirmName=" + cnfirmName + "&cnfirmPhone=" + cnfirmPhone + "&cnfirmIsCall=" + cnfirmIsCall + "&cnfirmIsMessage=" + cnfirmIsMessage + "&defaultIsCall=" + defaultIsCall + "&defaultIsMessage=" + defaultIsMessage + "&fourColorLight=" + fourColorLight + "&executionCycle=" + executionCycle,
            datatype: 'json',
            async: false,
            success: function (data) {
                if (data.status == 0) {
                    if (data.msg == true)
                    {
                        alert("设备预案注册成功！");
                        window.location.href = "/Plan/Index"
                    }
                }
                else {
                    alert("获取设备预案注册出现" + data.msg + "错误请联系管理员！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("获取设备预案注册出现"+XMLHttpRequest.status + "错误请联系管理员！")
            }
        });
    }
}

//检测预案中时间是否被占用
function timeOccupancy(devicePlanId, deviceId,  addCreateTime, executionCycle, addEndTime) {
    var strReset = "";
    $.ajax({
        url: "/Plan/IsCheckTimeOccupied",
        type: "post",
        data: "&devicePlanId=" + devicePlanId + "&deviceId=" + deviceId +"&planTime=" + addCreateTime + "&executionCycle=" + executionCycle + "&addEndTime=" + addEndTime,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                if (data.msg == true) {
                    strReset = "";
                }
                else {
                    if (addEndTime != "") {
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


//获取设备类型
function getDeviceType() {
    $.ajax({
        url: "/Plan/GetDeviceType",
        type: "post",
        data: "",
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.hasOwnProperty('state')) {
                alert("获取设备类型出现" + data.message + "错误请联系管理员！");
            }
            else {
                allDeviceType=data;
                for (var i = 0; i < data.length; i++) {
                    $("<option value='" + data[i].id + "'>" + data[i].type_name + "</option>").appendTo('#addEquipmentType'); //动态添加Option子项
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取设备类型出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}

//根据设备类型获取设备
function getDevice(deviceType, regionId) {
    if (deviceType != null) {
        $.ajax({
            url: "/Plan/GetDevice",
            type: "post",
            data: "deviceType=" + deviceType + "&regionId=" + regionId,
            datatype: 'json',
            async: false,
            success: function (data) {
                if (data.hasOwnProperty('state')) {
                    alert("获取设备出现" + data.message + "错误请联系管理员！");
                }
                else {
                    allDevice = data;
                    $("#addAlarmEquipment").empty();
                    if (data.length < 0) {
                        $("<option value='" + -1 + "'>--请选择--</option>").appendTo('#addAlarmEquipment');
                    }
                    else {
                        for (var i = 0; i < data.length; i++) {
                            $("<option value='" + data[i].id + "'>" + data[i].device_name + "</option>").appendTo('#addAlarmEquipment'); //动态添加Option子项
                        }
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("获取设备出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    }
    else {
        alert("设备类型无基础数据，无法根据类型获取设备信息！");
    }
}


//获取摄像头列表
function getCameraInfo(regionId) {
    $.ajax({
        url: "/Plan/GetCameraInfo",
        type: "post",
        data: "regionId=" + regionId,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.hasOwnProperty('state')) {
                alert("获取摄像头出现" + data.message + "错误请联系管理员！");
            }
            else {
                cameraDevice =data;
                addCameraToList(cameraDevice);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取摄像头出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}
//添加摄像头到摄像头列表中
function addCameraToList(cameraDevice)
{
    $("#addCameraList").empty();
    notSelectedCamera = [];
    if ($("select[id='addSelectedCamera'] option").length > 0) {
        for (var i = 0; i < cameraDevice.length; i++) {
            $("select[id='addSelectedCamera'] option").each(function () {
                if($(this).val()==cameraDevice[i].id)
                {
                    cameraDevice.remove(cameraDevice[i])
                }
        });
        }
        for (var i = 0; i < cameraDevice.length; i++) {
            var deviceId = $("#addAlarmEquipment").val();
            if (cameraDevice[i].id != deviceId) {
                $("<option value='" + cameraDevice[i].id + "'>" + cameraDevice[i].device_name + "</option>").appendTo('#addCameraList'); //动态添加Option子项
                notSelectedCamera.push(cameraDevice[i]);
            }
        }

    }
    else{
        for (var i = 0; i < cameraDevice.length; i++) {
            var deviceId = $("#addAlarmEquipment").val();
            if (cameraDevice[i].id != deviceId) {
                $("<option value='" + cameraDevice[i].id + "'>" + cameraDevice[i].device_name + "</option>").appendTo('#addCameraList'); //动态添加Option子项
                notSelectedCamera.push(cameraDevice[i]);
            }
        }
    }
}

//在摄像头列表中选择摄像头归到已选摄像头列表中
$(function () {
    //移到右边  
    $("#addCamera").click(function () {
        //获取选中的选项，删除并追加给对方  
        var id = $("#addCameraList option:selected").val()
        $("#addCameraList option:selected").appendTo("#addSelectedCamera");
        for (var i = 0; i < notSelectedCamera.length;i++)
        {
            if (notSelectedCamera[i].id == id)
            {
                notSelectedCamera.remove(notSelectedCamera[i])
            }
        }
        
    });
    //移动到左边
    $("#delCamera").click(function () {
        //获取选中的选项，删除并追加给对方 
        var id = $("#addSelectedCamera option:selected").val()
        $("#addSelectedCamera option:selected").appendTo("#addCameraList");
        for(var i=0;i<cameraDevice.length;i++)
        {
            if (cameraDevice[i].id ==id) {
                notSelectedCamera.push(cameraDevice[i])
            }
        }
    });
});
//获取已选摄像头编号
function getSelectCameraCode(selectName)
{
    var selectstrsb = "";
    $("select[id='" + selectName + "'] option").each(function () {
        if (selectstrsb != "")
            selectstrsb += ",";
        selectstrsb += $(this).val();
    });
    return selectstrsb;
}

//获取选择的默认处置项checkbox的id
function getDefaultOptionsIds() {
    var ckbidstrsbmr = "";
    $("#defaultCheckbox input[type='checkbox']:checked").each(function (i) {
        if (ckbidstrsbmr != "")
            ckbidstrsbmr += ",";
        ckbidstrsbmr += $(this).val();
    });
    return ckbidstrsbmr;
}

//获取选择的确认处置项checkbox的id
function getConfirmOptionsIds() {
    var ckbidstrsbmr = "";
    $("#confirmCheckbox input[type='checkbox']:checked").each(function (i) {
        if (ckbidstrsbmr != "")
            ckbidstrsbmr += ",";
        ckbidstrsbmr += $(this).val();
    });
    return ckbidstrsbmr;
}
//获取所有默认选项中姓名
function getDefaultOptionsName() {
    var result = "";
    var txt = $('#defaultOptions div[id*="chargePerson" ]').find("input[name=chargePersonName]");
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
    var txt = $('#confirmOptions div[id*="addPerson" ]').find("input[name=personName]");
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
function getDefaultOptionsPhone() {
    var result = "";
    var txt = $('#defaultOptions div[id*="chargePerson" ]').find("input[name=chargePersonPhone]");
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
    var txt = $('#confirmOptions div[id*="addPerson" ]').find("input[name=personPhone]");
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
function getDefaultOptionsIsMessage() {
    var result = "";
    var txt = $('#defaultOptions div[id*="chargePerson" ]').find("input[name=chargeIsMessage]");
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
function getDefaultOptionsIsCall() {
    var result = "";
    var txt = $('#defaultOptions div[id*="chargePerson" ]').find("input[name=chargeIsCall]");
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
    var txt = $('#confirmOptions div[id*="addPerson" ]').find("input[name=isMessage]");
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
    var txt = $('#confirmOptions div[id*="addPerson" ]').find("input[name=isCall]");
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
function addCamerainfo()
{
    //获取选中的选项，删除并追加给对方  
    var id = $("#addCameraList option:selected").val()
    $("#addCameraList option:selected").appendTo("#addSelectedCamera");
    for (var i = 0; i < notSelectedCamera.length; i++) {
        if (notSelectedCamera[i].id ==id) {
            notSelectedCamera.remove(notSelectedCamera[i])
        }
    }
}
function delCamerainfo() {
    //获取选中的选项，删除并追加给对方  
    var id=$("#addSelectedCamera option:selected").val()
    $("#addSelectedCamera option:selected").appendTo("#addCameraList");
    for (var i = 0; i < cameraDevice.length; i++) {
        if (cameraDevice[i].id ==id ) {
            notSelectedCamera.push(cameraDevice[i])
        }
    }
}

//点击选择摄像头框去掉框中内容
function filterFocus(ele) {
    $(ele).val("");

}
//如果选择摄像头文本框中没有输入文字鼠标离开后文本框显示请输入查询摄像头名称
function filterBlur(ele) {

    if ($(ele).val() == "") {
        $(ele).val("请输入查询摄像头名称");
        var options = "";
        for (var i = 0; i < notSelectedCamera.length; i++) {
            var deviceId = $("#addAlarmEquipment").val();
            if (notSelectedCamera[i].id != 0 && notSelectedCamera[i].id != deviceId) {
                options += "<option value='" + notSelectedCamera[i].id + "'>" + notSelectedCamera[i].device_name + "</option>";
            }
        }
        if (ele.id == "serchDevice") {
            $("#addCameraList").html(options);
        }

    }
    else
    {
        var ztreeSech = "";
        var str = $(ele).val();
        var ztreedata = new Array();
        if (/^[\u4e00-\u9fa5]+$/.test(str) || /^\w+$/.test(str)) {//中文的正则表达式
            for (var i = 0; i < notSelectedCamera.length; i++) {
                ztreeSech = notSelectedCamera[i].device_name;
                if (ztreeSech.indexOf(str) >= 0) {
                    ztreedata.push(notSelectedCamera[i]);
                    }
            }
           
            if (ztreedata.length > 0) {
                var options = "";
                for (var i = 0; i < ztreedata.length; i++) {
                    var deviceId = $("#addAlarmEquipment").val();
                    if (ztreedata[i].id != 0 && ztreedata[i].id != deviceId) {
                        if (notSelectedCamera.length > 0)
                            options += "<option value='" + ztreedata[i].id + "'>" + ztreedata[i].device_name + "</option>";
                    }
                }
                $("#addCameraList").html(options);
            }
            else {
                $("#addCameraList").html("");
            }
        }
    }
}
//根据选择摄像头文本框输入的文字进行搜索摄像头
function filterKeyUp(ele) {
    var ztreeSech = "";
    var str = $(ele).val();
    var ztreedata = new Array();
    if (/^[\u4e00-\u9fa5]+$/.test(str) || /^\w+$/.test(str)) {//中文的正则表达式
        if (notSelectedCamera != null) {
            if (str != "") {
                for (var i = 0; i < notSelectedCamera.length; i++) {
                    ztreeSech = notSelectedCamera[i].device_name;
                        if (ztreeSech.indexOf(str) >= 0 ) {
                            ztreedata.push(notSelectedCamera[i]);
                        }
                }
            } else {
                var options = "";
                for (var i = 0; i < notSelectedCamera.length; i++) {
                        var deviceId = $("#addAlarmEquipment").val();
                        if (notSelectedCamera[i].id != 0 && notSelectedCamera[i].id != deviceId ) {
                            if (notSelectedCamera.length > 0)
                                options += "<option value='" + notSelectedCamera[i].id + "'>" + notSelectedCamera[i].device_name + "</option>";
                        }
                   
                }
                if (ele.id == "serchDevice") {
                    $("#addCameraList").html(options);
                }
              
            }
            if (ztreedata.length > 0) {
                var options = "";
                for (var i = 0; i < ztreedata.length; i++) {
                    var deviceId = $("#addAlarmEquipment").val();
                        if (ztreedata[i].id != 0 && ztreedata[i].id != deviceId) {
                            if (notSelectedCamera.length > 0)
                            options += "<option value='" + ztreedata[i].id + "'>" + ztreedata[i].device_name + "</option>";
                    }
                }
                if (ele.id == "serchDevice") {
                    $("#addCameraList").html(options);
                }
                
            }
            
        }
    } else {//如果选择摄像头文本框中输入的是英文则按数据库search_code的值进行匹配
        str = str.toUpperCase();
        if (notSelectedCamera != null) {
            if (str != "") {
                for (var i = 0; i < notSelectedCamera.length; i++) {
                    ztreeSech = notSelectedCamera[i].device_name;
                        if (ztreeSech.indexOf(str) >= 0 ) {
                            ztreedata.push(notSelectedCamera[i]);
                        }
                    }
            } else {
                var options = "";
                for (var i = 0; i < notSelectedCamera.length; i++) {
                        var deviceId = $("#addAlarmEquipment").val();
                        if (notSelectedCamera[i].id != 0 && notSelectedCamera[i].id != deviceId) {
                            if (notSelectedCamera.length > 0)
                                options += "<option value='" + notSelectedCamera[i].id + "'>" + notSelectedCamera[i].device_name + "</option>";
                        }
                }
                if (ele.id == "serchDevice") {
                    $("#addCameraList").html(options);
                }
            }
            if (ztreedata.length > 0) {
                var options = "";
                for (var i = 0; i < ztreedata.length; i++) {
                    var deviceId = $("#addAlarmEquipment").val();
                    if (ztreedata[i].id != 0 && ztreedata[i].id != deviceId) {
                        if (notSelectedCamera.length > 0)
                             options += "<option value='" + ztreedata[i].id + "'>" + ztreedata[i].device_name + "</option>";
                    }
                }
                if (ele.id == "serchDevice") {
                    $("#addCameraList").html(options);
                }
            }
           
        }
    }
}

//获取已添加的预案信息
function getDevicePlanInfo(devicePlanId) {
    
    $.ajax({
        url: "/Plan/GetDevicePlanInfo",
        type: "post",
        data: "devicePlanId=" + devicePlanId,
        datatype: "json",
        async: false,
        success: function (data) {
            if (data.status == 0) {
                //预案名称
                $("#addDevicePlanName").val(data.msg.entity.plan_name);
                //根据设备id获取设备类型
                var deviceType = getDeviceTypeById(data.msg.entity.device_id);
                $("#addEquipmentType").multiselect('select', deviceType);
                $("#addEquipmentType").val(deviceType);
                $("#addEquipmentType").multiselect("refresh");
                var regionId = data.msg.BaseRegionConfigInfo.id;
                planStatus = data.msg.entity.plan_status;
                getFourColourLamp(regionId);
                if ($.cookie("mainControlRegionId")) {
                    if ($.cookie("mainControlRegionId") == data.msg.BaseRegionConfigInfo.id) {
                        if ($("#currentMainControlRegion").html()) {
                            var regionName = $("#currentMainControlRegion").html()
                            $("#addEventRegion").val(regionName);
                        }
                    }
                    else {
                        $("#addEventRegion").val("未知");
                    }
                }
                getDevice(deviceType, regionId)//根据设备类型获取设备
                //重新加载设备
                var newAlarmEquipment = new Array();
                var obj = new Object();
                $.each(allDevice, function (index, Device) {
                    obj = {
                        label: Device.device_name,
                        value: Device.id
                    };
                    newAlarmEquipment.push(obj);
                });
                $("#addAlarmEquipment").multiselect('dataprovider', newAlarmEquipment);
                $('#addAlarmEquipment').multiselect('refresh');//multiselect刷新重新加载项
                $("#addAlarmEquipment").multiselect('select', data.msg.entity.device_id)
                $("#addAlarmEquipment").val(data.msg.entity.device_id);
                $("#addAlarmEquipment").multiselect("refresh");
                $("#addCreateTime").val(data.msg.servExecutionTime.start_time);
                $("#addEndTime").val(data.msg.servExecutionTime.end_time);
                var deviceId = $("#addAlarmEquipment").val();
                emptyDevice();//清空设备图层
                GetAllDevice(deviceId, regionId);//加载设备图层
                transferDeviceData(-1);//点击地图上摄像头将摄像头添加到已选摄像头列表中
                addCameraToList(cameraDevice); //刷新摄像头列表
                mapBuildingInfo();
                //默认处置项
                var defaultPlanHandleItem = [];
                defaultPlanHandleItem = data.msg.defaultPlanHandleItemList;
                $("#defaultCheckbox input[type='checkbox']").each(function () {
                    for (var i = 0; i < defaultPlanHandleItem.length; i++) {
                        if ($(this).val() == defaultPlanHandleItem[i].item_type && $(this).val() != $("#soundLightBuzzer").val()) {
                            $(this).prop('checked', true);
                        }
                        else if ($(this).val() == defaultPlanHandleItem[i].item_type && $(this).val() == $("#soundLightBuzzer").val()) {
                            $("#fourColorLight").css("display", "block");
                            $(this).prop('checked', true);
                            $("#fourColorLight").val(defaultPlanHandleItem[i].ext1)
                        }
                    }
                });
                //确认处置项
                var cnfirmPlanHandleItem = [];
                cnfirmPlanHandleItem = data.msg.cnfirmPlanHandleItemList;
                $("#confirmCheckbox input[type='checkbox']").each(function () {
                    for (var i = 0; i < cnfirmPlanHandleItem.length; i++) {
                        if ($(this).val() == cnfirmPlanHandleItem[i].item_type) {
                            $(this).prop('checked', true);
                        }
                    }
                });
                $("select[id='addCameraList'] option").each(function () {
                    for (var i = 0; i < data.msg.servPlanHandleItemCameraList.length; i++) {
                        if ($(this).val() == data.msg.servPlanHandleItemCameraList[i].device_id) {
                            $("<option value='" + $(this).val() + "'>" + $(this).text() + "</option>").appendTo("#addSelectedCamera");
                            $("#addCameraList option[value='" + $(this).val() + "']").remove();
                            for (var a = 0; a < notSelectedCamera.length; a++) {
                                if (data.msg.servPlanHandleItemCameraList[i].device_id == notSelectedCamera[a].id) {
                                    notSelectedCamera.remove(notSelectedCamera[a]);
                                }
                            }

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
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取预案信息出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });

}

//根据设备id获取设备类型
function getDeviceTypeById(Id)
{
    var deviceType = -1;
    $.ajax({
        url: "/Plan/GetDeviceTypeById",
        type: "post",
        data: "Id=" + Id,
        datatype: "json",
        async: false,
        success: function (data) {
            deviceType = data;
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取设备类型出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
    return deviceType;
}

//点击地图摄像头将点击摄像头添加到已选摄像头列表中
function transferDeviceData(cameraId) {
    var deviceId= $("#addAlarmEquipment").val();
            for(var a=0;a<notSelectedCamera.length;a++)
            {
                if(cameraId==notSelectedCamera[a].id)
                {
                    $("<option value='" + notSelectedCamera[a].id + "'>" + notSelectedCamera[a].device_name + "</option>").appendTo("#addSelectedCamera");
                    notSelectedCamera.remove(notSelectedCamera[a])
                    $("select[id='addCameraList'] option").each(function () {
                        if ($(this).val() == cameraId) {
                            $("#addCameraList option[value='" + $(this).val() + "']").remove();
                            
                        }
                    });
                }
            }
    
    $("#addSelectedCamera option[value='" + deviceId + "']").remove();

}


////失去焦点显示提示信息

function errorinfoDisplay(value) {
    var deviceId = $("#addAlarmEquipment").val();
    var addCreateTime = $("#addCreateTime").val();
    var addEndTime = $("#addEndTime").val();
    switch (value) {
        case "addDevicePlanName":
            return "预案名称不能为空"
        case "addEquipmentType":
            return "设备类型不能为空"
        case "addAlarmEquipment":
            return "设备名称不能为空"
        case "addCreateTime":
            if (addCreateTime == "") {
                return "开始时间不能为空";
            }
            var startTimeStr = timeOccupancy(devicePlanId, deviceId, addCreateTime);
            if (startTimeStr != "") {
                return (startTimeStr);
            }
        case "addEndTime":
                 var info=""
                if (addEndTime == "") {
                    info="结束时间不能为空"
                }
                var endTimeStr = timeOccupancy(devicePlanId, deviceId, addEndTime);
                if (endTimeStr != "") {
                    info=endTimeStr;
                }
             //验证时间被占用没
             var timeOccupy = verificationTimeOccupy(devicePlanId, deviceId, addCreateTime, addEndTime)
             if (timeOccupy != "") {
                 info = timeOccupy;
             }
             return info;
                
    }
}

//获取焦点信息显示

function tipinfoDisplay(value) {
    switch (value) {
        case "addDevicePlanName":
            return "请填写设备名称如：消防预案"
        case "addEquipmentType":
            return "请选择设备类型如：门禁"
        case "addAlarmEquipment":
            return "请选择设备名称 如：海康球"
        case "addCreateTime":
            return "请选择开始时间 如：00:00:00";
        case "addEndTime":
            return "请选择结束时间 如：18:00:00"
    }
}


function promptInfo(blurfocus) {
    var info = errorinfoDisplay(blurfocus);
    var device = document.getElementById(blurfocus).value;
      if (device == "" || device == 0 || device == -1) {
            var td = document.getElementById('e_' + blurfocus + '');
            td.setAttribute("class", "tip");
            document.getElementById('e_' + blurfocus + '').innerHTML = info;
            checkflag = false;
            return false;
        }
        else {
            var td = document.getElementById('e_' + blurfocus + '');
            //td.setAttribute("class", "");
            document.getElementById('e_' + blurfocus + '').innerHTML = '';
            checkflag = true
            return true;
        }
}
function Losefocus(blurfocus) {
    var val = blurfocus;
    promptInfo(val);
}

//填写信息显示
function mouseDown(onfocus) {
    var info = tipinfoDisplay(onfocus);
    var td = document.getElementById('e_' + onfocus + '');
    td.setAttribute("class", "tip");
    document.getElementById('e_' + onfocus + '').innerHTML = info;

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
                if (data.msg.length < 1) {
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














