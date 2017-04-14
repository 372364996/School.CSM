var simulate = {};
$(function () {
    $("#mapAlarmDiv").dialog('close');
    $("#analogAlarm").dialog('close');
    $("#mapVideoAlarmDiv").dialog('close');
})

//人工上报
function manpower() {
    //$("#alarmNameInput").val("");
    //$("#deviceAlarmText").val("");
    $("#informAlarmText").val("");
    $("#mapAlarmDiv").dialog('open');

}

//打开模拟告警弹窗
function openAnalogAlarm(device) {
    var deviceName = device.device_name + "地图模拟告警";
    // $("#analogAlarm").attr("title", "模拟告警");
    $('#analogAlarm').dialog({ title: '模拟告警', modal: true });
    $("#alarmNameInput").val(deviceName);
    $("#alarmCodeInput").val(device.device_code)
    $("#deviceAlarmText").val("");
    $("#analogAlarm").dialog('open');
    $("#mapDeviceAlarmBtn").unbind("click"); //解除绑定
    $("#mapDeviceAlarmBtn").bind("click", simulate.mapDeviceAlarm);//绑定事件
    $("#cancelmapDeviceAlarmBtn").unbind("click"); //解除绑定
    $("#cancelmapDeviceAlarmBtn").bind("click", simulate.cancalanalogAlarm);//绑定事件
    $("#aboutAlarmDiv").unbind("click"); //解除绑定
    $("#aboutAlarmDiv").bind("click", simulate.cancalanalogAlarm);//绑定事件
}
//视频弹窗人工上报
//function cameraEventAlarm() {
//    document.getElementById("h3c_IMOS_ActiveX").width = 1;
//    document.getElementById("h3c_IMOS_ActiveX").height = 1;
//    var device = currentClickMarker;
//    var deviceName = device.device_name + "地图人工上报";
//    //$("#analogAlarm").attr("title", "人工上报");
//    $('#analogAlarm').dialog({ title: '人工上报', modal: true });
//    $("#alarmNameInput").val(deviceName);
//    $("#alarmCodeInput").val(device.device_code)
//    $("#deviceAlarmText").val("");
//    $("#analogAlarm").dialog('open');
//    $("#mapDeviceAlarmBtn").unbind("click"); //解除绑定
//    $("#mapDeviceAlarmBtn").bind("click", simulate.videoMapDeviceAlarm);//绑定事件
//    $("#cancelmapDeviceAlarmBtn").unbind("click"); //解除绑定
//    $("#cancelmapDeviceAlarmBtn").bind("click", simulate.cancalVideoAnalogAlarm);//绑定事件
//    $("#aboutAlarmDiv").unbind("click"); //解除绑定
//    $("#aboutAlarmDiv").bind("click", simulate.cancalVideoAnalogAlarm);//绑定事件
//}
//视频弹窗人工上报
function cameraEventAlarm() {
    var device = currentClickMarker;
    document.getElementById("h3c_IMOS_ActiveX").width = 1;
    document.getElementById("h3c_IMOS_ActiveX").height = 1;
    $("#videoAlarmNameInput").val(device.device_name + "地图人工上报");
    $("#videoAlarmCodeInput").val(device.device_code);
    $("#videoDeviceAlarmText").val("");
    $("#videoInformAlarmText").val("");
    $("#mapVideoAlarmDiv").dialog('open');

}
//视频弹窗人工上报报警
simulate.mapVideoAlarm = function () {
    var alarmLevel = $('#deviceAlarmLevelSelect option:selected').val();
    //var deviceCode = currentClickMarker.device_code;  //根据当前点击设备，获取设备code
    var deviceCode = $("#videoAlarmCodeInput").val()
    var content = $("#videoDeviceAlarmText").val();
    var eventCode = $('#videoChildEventTypeSelect option:selected').val();//获取事件类型
    var alarmName = $("#videoAlarmNameInput").val();
    if (alarmName == "" || alarmName == null) {
        alert("报警名称为空！");
        return false;
    }
    $.ajax({
        url: "/Map/DeviceAlarm",
        type: "post",
        data: { alarmName: alarmName, alarmLevel: alarmLevel, deviceCode: deviceCode, content: content, eventCode: eventCode },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {
                // $("#mapAlarmDiv").dialog('close');
                $("#mapVideoAlarmDiv").dialog('close');
                document.getElementById("h3c_IMOS_ActiveX").width = "100%";
                document.getElementById("h3c_IMOS_ActiveX").height = "100%";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//视频弹窗人工上报故障报警
simulate.mapVideoInformAlarm = function () {
    var deviceCode = currentClickMarker.device_code;  //根据当前点击设备，获取设备code
    var eventType = $('#videoInformAlarmTypeSelect option:selected').val();
    var alarmLevel = $('#videoInformAlarmLevelSelect option:selected').val();
    var content = $("#videoInformAlarmText").val();
    $.ajax({
        url: "/Map/InformAlarm",
        type: "post",
        data: { deviceCode: deviceCode, eventType: eventType, alarmLevel: alarmLevel, content: content },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {
                $("#mapVideoAlarmDiv").dialog('close');
                document.getElementById("h3c_IMOS_ActiveX").width = "100%";
                document.getElementById("h3c_IMOS_ActiveX").height = "100%";
                setImg(eventType + 3, deviceCode);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//视频弹窗取消报警
simulate.cancalVideoAlarmBtn = function () {
    $("#mapVideoAlarmDiv").dialog('close');
    document.getElementById("h3c_IMOS_ActiveX").width = "100%";
    document.getElementById("h3c_IMOS_ActiveX").height = "100%";
}
//人工上报
$(".manpower-frame .about-close").click(function () {
    $("#mapAlarmDiv").dialog('close');
})
//视频报警弹窗取消
$(function () {
    //视频报警弹窗取消
    $(".manpower-frame2 .about-close").click(function () {
        $(".manpower-frame2").dialog('close');
        document.getElementById("h3c_IMOS_ActiveX").width = "100%";
        document.getElementById("h3c_IMOS_ActiveX").height = "100%";
    })
})
//初始化加载
$(function () {
    $("#childEventTypeSelect").empty(); //移除子元素
    $("#videoChildEventTypeSelect").empty();//移除子元素
    $.ajax({
        url: "/Map/GetChildEventList",
        type: "post",
        data: { pEventId: 1 },
        datatype: 'json',
        async: true,
        success: function (data) {
            var eventHtml = "";
            if (data.status == 0) {
                for (var i = 0; i < data.msg.length; i++) {
                    eventHtml += "<option value=" + data.msg[i].event_code + ">" + data.msg[i].event_name + "</option>";
                }
                $("#childEventTypeSelect").append(eventHtml);
                $("#videoChildEventTypeSelect").append(eventHtml);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
    $("#mapAlarmDiv").dialog('close');

})
//设备告警（人工上报）
simulate.mapInformAlarm = function () {
    var deviceCode = currentClickMarker.device_code;  //根据当前点击设备，获取设备code
    var eventType = $('#informAlarmTypeSelect option:selected').val();
    var alarmLevel = $('#informAlarmLevelSelect option:selected').val();
    var content = $("#informAlarmText").val();
    $.ajax({
        url: "/Map/InformAlarm",
        type: "post",
        data: { deviceCode: deviceCode, eventType: eventType, alarmLevel: alarmLevel, content: content },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {
                $("#mapAlarmDiv").dialog('close');
                //$("#analogAlarm").dialog('close');
                setImg(eventType + 3, deviceCode);//设置图标
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}

//页面模拟设备告警（人工上报）
simulate.mapDeviceAlarm = function () {
    var alarmLevel = $('#deviceAlarmLevelSelect option:selected').val();
    //var deviceCode = currentClickMarker.device_code;  //根据当前点击设备，获取设备code
    var deviceCode = $("#alarmCodeInput").val()
    var content = $("#deviceAlarmText").val();
    var eventCode = $('#childEventTypeSelect option:selected').val();//获取事件类型
    var alarmName = $("#alarmNameInput").val();
    if (alarmName == "" || alarmName == null) {
        alert("报警名称为空！");
        return false;
    }
    $.ajax({
        url: "/Map/DeviceAlarm",
        type: "post",
        data: { alarmName: alarmName, alarmLevel: alarmLevel, deviceCode: deviceCode, content: content, eventCode: eventCode },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {
                // $("#mapAlarmDiv").dialog('close');
                $("#analogAlarm").dialog('close');
               
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//视频弹窗设备告警（人工上报）
simulate.videoMapDeviceAlarm = function () {
    var alarmLevel = $('#deviceAlarmLevelSelect option:selected').val();
    //var deviceCode = currentClickMarker.device_code;  //根据当前点击设备，获取设备code
    var deviceCode = $("#alarmCodeInput").val()
    var content = $("#deviceAlarmText").val();
    var eventCode = $('#childEventTypeSelect option:selected').val();//获取事件类型
    var alarmName = $("#alarmNameInput").val();
    if (alarmName == "" || alarmName == null) {
        alert("报警名称为空！");
        return false;
    }
    $.ajax({
        url: "/Map/DeviceAlarm",
        type: "post",
        data: { alarmName: alarmName, alarmLevel: alarmLevel, deviceCode: deviceCode, content: content, eventCode: eventCode },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {
                // $("#mapAlarmDiv").dialog('close');
                $("#analogAlarm").dialog('close');
                document.getElementById("h3c_IMOS_ActiveX").width = "100%";
                document.getElementById("h3c_IMOS_ActiveX").height = "100%";

            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}

//事件下拉框change事件
simulate.changeChildEvent = function () {
    $("#childEventTypeSelect").empty(); //移除子元素
    var parentEventType = $('#parentEventTypeSelect option:selected').val();
    if (parentEventType != undefined) {
        $.ajax({
            url: "/Map/GetChildEventList",
            type: "post",
            data: { pEventId: parentEventType },
            datatype: 'json',
            async: true,
            success: function (data) {
                var eventHtml = "";
                if (data.status == 0) {
                    for (var i = 0; i < data.msg.length; i++) {
                        eventHtml += "<option value=" + data.msg[i].event_code + ">" + data.msg[i].event_name + "</option>";
                    }
                    $("#childEventTypeSelect").append(eventHtml);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }
}
//视频人工上报下拉框change事件
simulate.changeVideoChildEvent = function () {
    $("#videoChildEventTypeSelect").empty(); //移除子元素
    var parentEventType = $('#videoParentEventTypeSelect option:selected').val();
    if (parentEventType != undefined) {
        $.ajax({
            url: "/Map/GetChildEventList",
            type: "post",
            data: { pEventId: parentEventType },
            datatype: 'json',
            async: true,
            success: function (data) {
                var eventHtml = "";
                if (data.status == 0) {
                    for (var i = 0; i < data.msg.length; i++) {
                        eventHtml += "<option value=" + data.msg[i].event_code + ">" + data.msg[i].event_name + "</option>";
                    }
                    $("#videoChildEventTypeSelect").append(eventHtml);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }
}
//关闭弹窗
simulate.cancalAlarmBtn = function () {
    $("#mapAlarmDiv").dialog('close');
}
//关闭模拟告警
simulate.cancalanalogAlarm = function () {
    $("#analogAlarm").dialog('close');
}
//关闭视频弹窗人工上报
simulate.cancalVideoAnalogAlarm = function () {
    $("#analogAlarm").dialog('close');
    document.getElementById("h3c_IMOS_ActiveX").width = "100%";
    document.getElementById("h3c_IMOS_ActiveX").height = "100%";
}