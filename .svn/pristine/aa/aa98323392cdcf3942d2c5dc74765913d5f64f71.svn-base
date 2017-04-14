

var params;
$(document).ready(function () {
    toastr.options.positionClass ='toast-bottom-right';
});
var alarmInfoData;//告警数据
var vioce = "sounds/alarm.mp3";
function wsMaster(msg) {
     getAlarmNumToday();
    //根据园区id获取园区信息
    var regionName = getRegion(msg.info.deviceInfo.region_id)
    if ($.cookie("mainControlRegionId")) {
        if (msg.info.deviceInfo.region_id != $.cookie("mainControlRegionId")) {
            //当前用户是否拥有这个园区的权限
            var regionidList = $("input[name=mainControlRegion]");
            var result = false;
            for (var i = 0; i < regionidList.length; i++) {
                if (regionidList[i].value == msg.info.deviceInfo.region_id) {
                    result = true;
                }
            }
            if (result == true)
            {
                var TC = new Date();
                var content = "设备" + msg.info.deviceInfo.device_name + "在" + regionName + "产生报警";
                var info = JSON.stringify(msg);
                var text = '<div  id="alertInfoDiv' + $("#alertInfoBox div[class='mCustomScrollBox mCS-light mCSB_vertical mCSB_inside']>div:eq(0)>div").length + '" class="alert alert-info alert-dismissible" role="alert" style="right:10px; width:auto;margin-bottom:5px;cursor:pointer" ><button type="button" class="close" data-dismiss="alert" aria-label="Close"value="' + TC + '" ><span aria-hidden="true">&times;</span></button><strong style="white-space:nowrap;" id="alertInfo' + $("#alertInfoBox div[class='mCustomScrollBox mCS-light mCSB_vertical mCSB_inside']>div:eq(0)>div").length + '" onclick=\'switchPark(' + (info) + ')\'>' + content + '</strong></div>';
                $("#alertInfoBox div[class='mCustomScrollBox mCS-light mCSB_vertical mCSB_inside']>div:eq(0)").append(text);
                var divText = $("#alertInfoDiv" + $("#alertInfoBox div[class='mCustomScrollBox mCS-light mCSB_vertical mCSB_inside']>div:eq(0)>div").length - 1);
                //设置定时器关闭报警提示信息弹窗
                setTimeout(function () { removeAlarmAlert(divText); }, 1200000);
            }
            
        }
        else {
            openVioce();
            var ledresult = msg.info.ledMessage;
            alarmInfoData = msg.info;
            $("#AlarmInfo ").html(ledresult);
            $("#AlarmInfo").data(msg);
            $("#logoTitle").css("display", "none");
            $("#AlarmInfoBox").css("display", "block");
        }
    }
}
//控制报警显示信息弹窗消失
function removeAlarmAlert(divIdSelect) {
    $(divIdSelect).remove();
}

//切换园区
function switchPark(msg) {
        if (confirm("你是否要切换园区查看报警！"))
        {
            SaveAlarmInfo(JSON.stringify(msg));
            $("#alertInfoBox").html("");
            var regionid = msg.info.deviceInfo.region_id;
            $.cookie('mainControlRegionId', regionid, { path: '/' });
            window.location.href = "/map/Index?regionID=" + regionid;
        }
}

//打开报警音频
openVioce = function () {
    var content = "<embed height='1' width='1' id='alarm_vioce' src=" + vioce + " type='audio/mpeg'></embed>";
    $("#voiceDiv").html(content);
}

//获取未确警数量
function notPoliceNum() {
    $.ajax({
        url: "/Base/NotPoliceNum",
        type: "post",
        data: "",
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.hasOwnProperty('state')) {
                toastr.warning("获取未确警数改出现" + data.message + "错误请联系管理员！");
            }
            else {
                if (data != null) {
                    $("#alarmsNum").text("");// 清空数据
                    $("#alarmsNum").append(data.length);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            toastr.error("获取未确警数改出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}
//配置中关闭LED
function closeLED() {
    $("#logoTitle").css("display", "block");
    $("#AlarmInfoBox").css("display", "none");
    if (IsMain) {
        if (alarmInfoData != null) {
            turnOffHardware(alarmInfoData);
        }
    }
    else {
        if(confirm("你当前使用的非主控设备,是否强行关闭LED与声光"))
        {
            if (alarmInfoData != null) {
                turnOffHardware(alarmInfoData);
            }
        }
    }
    ////关闭报警框
    //if (NowMapType == 1) {
    //    closeVedioPopup();
    //}
    //else {
    //    vedioPopupClose();
    //}
    //Alarm.alarmState = false;
}
    //关闭LED，四色灯
    function turnOffHardware(alarmInfo)
    {
        var regionCode;
        var regionModel = document.getElementsByName("mainControlRegion");
        var regionId = alarmInfo.deviceInfo.region_id;
        for (var i = 0; i < regionModel.length; i++) {
            if (regionModel[i].value == regionId) {
                regionCode = $(regionModel[i]).attr("mainControlRegionCode");
                break;
            }
        }
        if (alarmInfo.hash[2] != null) {
            var location = 1;
            var content = "$$";
            $.ajax({
                url: "/Config/SendLEDMessage",
                type: "post",
                data: { regionCode: regionCode, location: location, content: content },
                datatype: 'json',
                async: true,
                success: function (data) {
                    toastr.success(data.msg);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    toastr.error("LED复位" + XMLHttpRequest.status + "错误请联系管理员！");
                }
            })
        }
        if (alarmInfo.hash[1] != null) {
            var controlId = 0;
            var op = 4; //全部关闭
            $.ajax({
                url: "/Config/SendRelayMessage",
                type: "post",
                data: { regionCode: regionCode, controlId: controlId, op: op },
                datatype: 'json',
                async: true,
                success: function (data) {
                    toastr.success(data.msg);
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    toastr.error("报警灯复位" + XMLHttpRequest.status + "错误请联系管理员！");
                }
            })
        }
    }

  



//获取前10条告警信息
function getServAlarmRecord() {
    $(".alarms-frame").show();
    var num = 10;//条数
    $.ajax({
        url: "/Alarm/GetFirstFewAlarm",
        type: "post",
        data: "num=" + num,
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data.hasOwnProperty('state')) {
                toastr.warning("获取告警信息改出现" + data.message + "错误请联系管理员！");
            }
            else {
                if (data != null) {
                    value = "";
                    var b = 0;
                    for (var i = 0; i < data.length; i++) {
                        var a = i + 1;
                        value += "<table width='100%' height='100%'><tr><td align='left'  class='alarms-left' width='170'>" + a + "、状态：<span class='alarm-orange'>" + data[i].confirmState + "</span></td>"
                        value += "<td align='right' class='alarms-right'>时间：" + Util.changeDateFormat(data[i].alarmTime) + "</td></tr>"
                        value += "<tr><td align='left'  class='alarms-left'>&nbsp;&nbsp;设备名称：<span class='alarm-black'>" + data[i].deviceName + "</span></td><td align='right' class='alarms-blue'></td></tr></table>"

                        if (data[i].confirmState == "未确警") {
                            b = b + 1;
                        }
                    }
                    $("#alarmInfoList div div").eq(0).html(value);
                    getAlarmNumToday()
                    //$("#num").html(data.length);
                    //$("#notSurePoliceNum").html(b);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            toastr.error("获取告警信息改出现" + XMLHttpRequest.status + "错误请联系管理员！")
        }
    });
}


//获取今日告警数量与未确警数量
function getAlarmNumToday() {
    $.ajax({
        url: "/Alarm/GetAlarmNumToday",
        type: "post",
        data: "",
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data.hasOwnProperty('state')) {
                toastr.warning("获取今日告警信息改出现" + data.message + "错误请联系管理员！");
            }
            else {
                if (data != null) {
                    $("#num").html(data.AlarmNum);
                    $("#notSurePoliceNum").html(data.NotSure);
                    $("#alarmNumToday").html(data.NotSure);
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            toastr.error("获取今日告警信息改出现" + XMLHttpRequest.status + "错误请联系管理员！")
        }
    });
}
//非地图页面点击报警信息，跳转到地图页面，并展示报警信息
function jumpPage() {
    if (pageUrl == "/Map" || pageUrl == "/Map/Index" || pageUrl == "/") {

    }
    else {
        var msg = $("#AlarmInfo").data(); //123
        SaveAlarmInfo(JSON.stringify(msg))
        window.location.href = "/Map/Index";
    }
}

//保存报警信息
function SaveAlarmInfo(AlarmInfo) {
    $.ajax({
        url: "/Base/SaveAlarmInfo",
        type: "post",
        data: "AlarmInfo=" + AlarmInfo,
        datatype: 'json',
        async: true,
        success: function (data) {

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            toastr.error("保存告警信息改出现" + XMLHttpRequest.status + "错误请联系管理员！")
        }
    });
}
//读取报警信息
function ReadAlarmInfo() {
    var AlarmInfodata = "";
    $.ajax({
        url: "/Map/ReadAlarmInfo",
        type: "post",
        data: "",
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.hasOwnProperty('state')) {
                toastr.warning("获取告警信息改出现" + data.message + "错误请联系管理员！");
            }
            else {
                if (data != "") {
                    AlarmInfodata = JSON.parse(data);
                }

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            toastr.error("保存告警信息改出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
    return AlarmInfodata;
}

//点击logo跳转到地图页
function jumpMapPage() {
    window.location.href = "/Map/Index";
}


//获取园区信息
function getRegion(regionId) {
    var regionName = "";
    $.ajax({
        url: "/Base/GetRegion",
        type: "post",
        data: "regionId=" + regionId,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {

                regionName = data.msg.region_name
            }
            else {
                toastr.warning("获取园区信息出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            toastr.error("获取园区信息出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
    return regionName;
}






