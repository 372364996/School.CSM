var masterSchedule = {};
//处理websocket推送过来的数据
masterSchedule.handleScheduleMessage = function (info) {
    //判断是否是主控
    if (!IsMain) {
        return;
    }
    //判断是否是地图页面，是否是当前园区
    if (pageUrl == "/Map" || pageUrl == "/Map/Index" || pageUrl == "/") {
        if ($.cookie("mainControlRegionId")) {
            if ($.cookie("mainControlRegionId") == info.regionId) //当前园区是需要上大屏的园区
            {
                if (info.scheduleType == 1 && info.ext2 == "2")//轮切
                {
                    mapSchedule.switchGallery(info);
                }
                else if (info.scheduleType == 1 && info.ext2 == "1")//轮巡
                {
                    mapSchedule.monitorStartLive(info);
                }
            }
            else                                               //当前园区不是需要上大屏的园区
            {
                //如果当前用户拥有上大屏园区的权限，即进行提醒
                if (masterSchedule.GetPersonRegionList(info.regionId)) {
                    masterSchedule.alertMessage(info);
                }
            }
        }
    }
    else {
        //如果当前用户拥有上大屏园区的权限，即进行提醒
        if (masterSchedule.getPersonMapAndRegionPurviewByRole(PERSONINFOJSON.role_id, info.regionId)) {
            masterSchedule.alertMessage(info);
        }
    }

}
//非地图页以及非当前园区，提示信息
masterSchedule.alertMessage = function (msg) {
    $("#AlarmInfoBox").css("display", "block");
    //根据园区id获取园区信息
    var region = getRegion(msg.regionId);
    var regionName = "";
    if (region != null) { regionName = region.region_name; }
    var TC = new Date();
    var content = "视频轮播计划:" + msg.scheduleName + "需在" + regionName + "执行";
    var info = JSON.stringify(msg);
    var text = '<div id="alertInfoDiv' + $("#alertInfoBox div[class='mCustomScrollBox mCS-light mCSB_vertical mCSB_inside']>div:eq(0)>div").length + '" class="alert alert-info alert-dismissible" role="alert" style="right:10px; width:auto;margin-bottom:5px;cursor:pointer" ><button type="button" class="close" data-dismiss="alert" aria-label="Close"value="' + TC + '" ><span aria-hidden="true">&times;</span></button><strong id="alertInfo' + $("#alertInfoBox div[class='mCustomScrollBox mCS-light mCSB_vertical mCSB_inside']>div:eq(0)>div").length + '" onclick=\'masterSchedule.switchRegion(' + (info) + ',' + (region) + ')\'>' + content + '</strong></div>';
    $("#alertInfoBox div[class='mCustomScrollBox mCS-light mCSB_vertical mCSB_inside']>div:eq(0)").append(text);
    var divText = $("#alertInfoDiv" + $("#alertInfoBox div[class='mCustomScrollBox mCS-light mCSB_vertical mCSB_inside']>div:eq(0)>div").length - 1);
    //设置定时器关闭报警提示信息弹窗
    setTimeout(function () { removeAlarmAlert(divText); }, 60000);
}
//控制显示信息弹窗消失
masterSchedule.removeScheduleAlert = function (divIdSelect) {
    $(divIdSelect).remove();
}
//切换园区与地图页面
masterSchedule.switchRegion = function (info, region) {
    masterSchedule.saveScheduleInfo(JSON.stringify(msg));
    $("#alertInfoBox").html("");
    //切换园区与地图页时，先将主控园区存入cookie
    if (region != null) {
        $.cookie('mainControlRegionId', region.id, { path: '/' });
        //$.cookie('mainControlRegionCode', region.region_code, { path: '/' });
        //$.cookie('mainControlRegionName', region.region_name, { path: '/' });
        window.location.href = "/Map/Index?regionID=" + info.regionId;
    }
}
//获取园区信息
masterSchedule.getRegion = function (regionId) {
    var region = null;
    $.ajax({
        url: "/Base/GetRegion",
        type: "post",
        data: "regionId=" + regionId,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                region = data.msg;
            }
            else {
                alert("获取园区信息出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取园区信息出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
    return region;
}
//保存当前计划任务信息
masterSchedule.saveScheduleInfo = function (scheduleInfo) {
    $.ajax({
        url: "/Base/SaveScheduleInfo",
        type: "post",
        data: "scheduleInfo=" + scheduleInfo,
        datatype: 'json',
        async: true,
        success: function (data) {

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("保存计划任务信息改出现" + XMLHttpRequest.status + "错误请联系管理员！")
        }
    });
}

//判断当前用户是否拥有该园区的控制权限
masterSchedule.GetPersonRegionList = function (regionId) {
    var regionidList = $("input[name=mainControlRegion]");
    var result = false;
    if (regionidList != null && regionidList != undefined) {
        for (var i = 0; i < regionidList.length; i++) {
            if (regionidList[i].value == regionId) {
                result = true;
            }
        }
    }
    return result;
}
//根据用户权限判断当前用户是否拥有园区以及地图页面权限
masterSchedule.GetPersonMapAndRegionPurview = function (regionId) {
    var res = false;
    if (PURVIEWLIST != null && PURVIEWLIST.length > 0) {
        for (var i = 0; i < PURVIEWLIST.length; i++) {
            if (PURVIEWLIST[i].purview_code == 2000 && PURVIEWLIST[i].region_id == regionId) {
                res = true;
                return res;
            }
        }
    }
    return res;
}
//根据用户角色判断是否拥有园区以及地图页面的权限
masterSchedule.getPersonMapAndRegionPurviewByRole = function (roleId, regionId) {
    var res = false;
    $.ajax({
        url: "/Base/GetPersonMapAndRegionPurviewByRole",
        type: "post",
        data: { roleId: roleId, regionId: regionId },
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0 && data.msg != null) {
                res = data.msg;  //返回是否有权限的布尔值
            }
            //else {
            //    alert(data.msg);
            //}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
    return res;
}
//根据设备ID查询设备信息
masterSchedule.queryDeviceGroup = function (groupId) {
    $.ajax({
        url: "/Schedule/GetCameraPatrolDeviceByGroupId",
        type: "post",
        data: { groupId: groupId },
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0 && data.msg != null) {
                var datas = data.msg;
                var deviceArr = new Array();
                for (var i = 0; i < datas.length; i++) {
                    deviceArr.push(datas[i].device_code);
                }
                monitorDeviceArr = deviceArr;
            }
            //else {
            //    alert(data.msg);
            //}
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}