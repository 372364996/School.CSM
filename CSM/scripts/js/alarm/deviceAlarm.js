var deviceAlarm = {};  //定义全局变量
var pageSize = 20; //默认初始化每页行数
var pageIndex = 1;
var _data = [];   //报警列表加载数据
var alarmClickId = null;  //被选中报警记录ID
var planRecordData = null;//预案执行记录


deviceAlarm.sTime = "";
deviceAlarm.eTime = "";
//var subsys = [];


//初始化加载
$(function () {
    $("#cameraDiv").hide();//隐藏视频播放窗体
    // $("#cameraDiv").css({ "width": "1px", "height": "1px" });//设置宽高
    // alarmVideo.initLogin();//初始化登录
    if ($.cookie("mainControlRegionId")) {
        var mainControlRegion = $.cookie("mainControlRegionId");
        $("input[name='radioRegion'][value='" + mainControlRegion + "']").attr("checked", true);
    }
    var allheight = $(".alarm-left").height();
    var bottomheight = $(".alarmleftbottom").height();
    var bigneedheight = allheight - bottomheight - 65;
    var smallneedheight = allheight - bottomheight - 35 - $(".alarm-screen").height() - 110;
    $('#alarmLeftTop').css({
        height: bigneedheight
    })
    $("#alarmRecord").css({
        height: smallneedheight
    })
    deviceAlarm.loadDeviceAlarmList(pageIndex, pageSize);
    deviceAlarm.GetDeviceAlarmList(pageIndex, pageSize);
    deviceAlarm.GetAlarmCount();
    $("#exportExcel").menubutton({
        text: "导出",
        iconCls: "icon-redo",
        menu: "#excel",
    });

})


deviceAlarm.GetDeviceAlarmList = function (pageIndex, pageSize) {
    //var alarmStartTime = $("#alarmStartTime").val();
    //var alarmEndTime = $("#alarmEndTime").val();

    //var alarmType = -100;
    //var subSystem = [];
    //var alarmLevel = -100;
    //var confirmState = -100;
    //deviceAlarm.DeviceAlarmList(pageIndex, pageSize, alarmStartTime, alarmEndTime, alarmType, subSystem, alarmLevel, confirmState);
    var sub = [];
    //  var times = "";
    var level = -100;
    var state = -100;
    var regionId = -100;
    deviceAlarm.sTime = "";
    deviceAlarm.eTime = "";
    var timeRadio = $(':radio[name="radioTime"]:checked').val();
    if (timeRadio != undefined) {
        switch (timeRadio) {
            case "1": getTodayInfo(); break;
            case "2": getWeekInfo(); break;
            case "3": getMonthInfo(); break;
            case "4": getSeasonInfo(); break;
            case "5": getFirstHalfYearInfo(); break;
            case "6": getLatterHalfYearInfo(); break;
            case "7": getYearInfo(); break;
            default: break;
        }
        //$("#alarmStartTime").val(deviceAlarm.sTime);
        //$("#alarmEndTime").val(deviceAlarm.eTime);
    }
    else {
        deviceAlarm.sTime = $("#alarmStartTime").val();
        deviceAlarm.eTime = $("#alarmEndTime").val();
    }
    var levelRadio = $(':radio[name="radioLevel"]:checked').val();
    if (levelRadio != undefined) {
        level = parseInt(levelRadio);
    }
    var stateRadio = $(':radio[name="radioState"]:checked').val();
    if (stateRadio != undefined) {
        state = parseInt(stateRadio);
    }

    var ss = $('input:checkbox[name=checkbox2]:checked');
    for (var i = 0, size = ss.length; i < size; i++) {
        sub.push(parseInt(ss[i].value));
    }
    var regionRadio = $(':radio[name="radioRegion"]:checked').val();
    if (regionRadio != undefined) {
        regionId = parseInt(regionRadio);
    }
    deviceAlarm.DeviceAlarmList(pageIndex, pageSize, regionId, deviceAlarm.sTime, deviceAlarm.eTime, -100, sub, level, state);

}

//查询报警列表
deviceAlarm.DeviceAlarmList = function (pageIndex, pageSize, regionId, alarmStartTime, alarmEndTime, alarmType, subSystem, alarmLevel, confirmState) {

    //var alarmStartTime = $("#alarmStartTime").val();
    //var alarmEndTime = $("#alarmEndTime").val();

    //var alarmType = -100;
    //var subSystem = [];
    //var alarmLevel = -100;
    //var confirmState = -100;
    $.ajax({
        url: "/Alarm/GetAlarmList",
        type: "post",
        // data: "pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&alarmCode=" + alarmCode + "&alarmType=" + alarmType + "&alarmLevel" + alarmLevel + "&subSystem=" + subSystem + "&startTime=" + alarmStartTime + "&endTime=" + alarmEndTime,
        data: {
            pageIndex: pageIndex, pageSize: pageSize, regionId: regionId, confirmState: confirmState, alarmType: alarmType, alarmLevel: alarmLevel, subSystem: subSystem, startTime: alarmStartTime, endTime: alarmEndTime
        },
        datatype: 'json',
        async: true,
        beforeSend: function (XMLHttpRequest) {
            $('#alarmRecord').datagrid('loading', "正在加载...");
        },
        success: function (data) {
            if (data.hasOwnProperty('state')) {
                alert("设备报警列表加载出现" + data.message + "错误请联系管理员！");
            }
            else
                if (data != null) {
                    _data = data;
                    $('#alarmRecord').datagrid('loadData', _data);
                    $('#alarmRecord').datagrid('getPager').pagination('refresh',
                        {
                            total: _data.total,
                            pageNumber: pageIndex,
                            pageSize: pageSize
                        })
                    //  deviceAlarm.loadDeviceAlarmList(pageIndex, pageSize);
                }
            $('#alarmRecord').datagrid('loaded');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
            $('#alarmRecord').datagrid('loaded');

        }
    });
}
//报警列表加载数据
deviceAlarm.loadDeviceAlarmList = function (pageIndex, pageSize) {
    /*------------------*/
    $('#alarmRecord').datagrid({
        data: _data,
        fitColumns: true,
        singleSelect: true,
        method: 'get',
        loadMsg: '正在加载……',
        remoteSort: false,
        pageNumber: pageIndex, //重点:传入当前页数
        pagination: true, //分页控件 
        //rownumbers: false, //行号 
        checkOnSelect: false,
        selectOnCheck: false,

        onClickRow: function (rowIndex, rowData) {
            deviceAlarm.GetAlarmPlanItemRecord(rowData.id); ShowTreeByRootEventId(rowData.rootEventId)
        },
        toolbar: [
        {
            iconCls: 'icon-ok',
            text: "批量确警",
            handler: function () {
                deviceAlarm.multipleConfirmAlarm();
            }
        }
        , '-',
         {
             id: 'exportExcel'

         }
       //{
       //    iconCls: 'icon-redo',
       //    text: "全部导出",
       //    handler: function () { deviceAlarm.exportAllExcel(); }
       //}, '-',
       //{
       //    iconCls: 'icon-redo',
       //    text: "条件导出",
       //    handler: function () { deviceAlarm.exportConditionExcel(); }
       //}
        ],
        columns: [[
            {
                field: 'ck', checkbox: true
            },
            {
                field: 'id', title: '报警编号', width: 50, align: "center", sortable: true
            },
            //{ field: 'alarmName', title: '报警名称', width: 70, align: "center", sortable: false },
              {
                  field: 'alarmName', title: '设备编号', width: 70, align: "center", sortable: false
              },
            {
                field: 'alarmEvent', title: '事件类型', width: 100, align: "center", sortable: false
            },
            {
                field: 'deviceName', title: '设备名称', width: 100, align: "center", sortable: false
            },
             {
                 field: 'subSystem', title: '子系统类型', width: 70, align: "center", sortable: false
             },
            {
                field: 'alarmTime', title: '报警时间', width: 120, align: "center", sortable: true,
                formatter: function (value, rec) {
                    return Util.changeDateFormat(value);
                }
            },
             {
                 field: 'alarmLevel', title: '报警级别', width: 70, align: "center", sortable: false
             },

               //{ field: 'alarmText', title: '报警内容', width: 70, align: "center", sortable: false },
                {
                    field: 'confirmPersonName', title: '确警人', width: 70, align: "center", sortable: false
                },

                   {
                       field: 'regionName', title: '园区', width: 50, align: "center", sortable: false
                   },
                  {
                      field: 'confirmAlarmTime', title: '确警时间', width: 120, align: "center", sortable: true,
                      formatter: function (value, rec) {
                          if (value == rec.alarmTime) {
                              return "--";
                          }
                          else {
                              return Util.changeDateFormat(value);
                          }

                      }
                  },
                    {
                        field: 'confirmResult', title: '确警结果', width: 80, align: "center", sortable: false
                    },
                    {
                        field: 'alarmLocation', title: '报警位置', width: 70, align: "center", sortable: false
                    },

                     {
                         field: 'confirmAlarmText', title: '确警描述', width: 70, align: "center", sortable: false
                     },
                     {
                         field: 'confirmState', title: '确警状态', width: 70, align: "center", sortable: false,
                         formatter: function (value, rec) {
                             if (rec.confirmState == "确警") {
                                 // return '<button class="btn btn-xs btn-warning" type="button" onclick=\'deviceAlarm.updateAlarm("' + rec.id + '")\' >修改</button>';
                                 return '<button type="button" class="btn btn-success btn-xs" disabled="true">已确警</button>';
                             } else if (rec.confirmState == "未确警") {
                                 //  return '<button class="btn btn-xs btn-primary" type="button"  onclick=\'deviceAlarm.confirmAlarm("' + rec.id + '")\'  >确警</button> <button class="btn btn-xs btn-warning" type="button" onclick=\'deviceAlarm.updateAlarm("' + rec.id + '")\' >修改</button>';
                                 return '<button type="button" class="btn btn-danger btn-xs" onclick=\'deviceAlarm.confirmAlarm(' + JSON.stringify(rec) + ')\'>确&ensp;&ensp;警</button>';
                             }

                         }
                     },
            {
                field: 'Id', title: '操作', width: 100, align: "center", sortable: false,
                formatter: function (value, rec) {
                    if (rec.confirmState == "确警") {
                        temp = rec;
                        return '<button class="btn btn-xs btn-warning" type="button" onclick=\'deviceAlarm.updateAlarm(' + JSON.stringify(rec) + ')\' >修&ensp;&ensp;改</button>';
                        // return '<button class="btn btn-xs btn-warning" type="button" onclick=\'deviceAlarm.updateAlarm(' + JSON.stringify(rec) + ')\' >修改</button> '+'|' + ' <button class="btn btn-xs btn-primary" type="button" onclick=\'deviceAlarm.AddArchive(' + JSON.stringify(rec) + ')\' >加入卷宗</button>';
                    } else if (rec.confirmState == "未确警") {
                        temp = rec;
                        return '<button class="btn btn-xs btn-warning" type="button" disabled="true" onclick=\'deviceAlarm.updateAlarm(' + rec.id + ')\' >修&ensp;&ensp;改</button>';
                        // return '<button class="btn btn-xs btn-primary" type="button"  onclick=\'deviceAlarm.confirmAlarm("' + rec.id + '")\'  >确警</button> <button class="btn btn-xs btn-warning" type="button" onclick=\'deviceAlarm.updateAlarm("' + rec.id + '")\' >修改</button>';
                        //  return '<button class="btn btn-xs btn-warning" type="button" onclick=\'deviceAlarm.updateAlarm(' + JSON.stringify(rec) + ')\' disabled="true">修改</button> ' + '|' + ' <button class="btn btn-xs btn-primary" type="button" onclick=\'deviceAlarm.AddArchive(' + JSON.stringify(rec) + ')\' >加入卷宗</button>';
                    }
                    // return '<button class="btn btn-xs btn-warning" type="button" onclick=\'deviceAlarm.updateAlarm("' + rec.id + '")\' >修改</button>';
                }
            }
        ]],
        onLoadSuccess: function (data) {

        },
        onLoadError: function (data) {
            alert('加载失败');
        }

    });
    $('#alarmRecord').datagrid('getPager').pagination({//分页栏下方文字显示
        showPageList: true,
        pageSize: pageSize, //每页显示的记录条数，默认为10
        pageNumber: pageIndex, //重点:传入当前页数
        beforePageText: '第', //页数文本框前显示的汉字   
        afterPageText: '页    共 {pages} 页',
        pageList: [10, 20, 30, 50], //可以设置每页记录条数的列表   
        displayMsg: '当前显示{from}-{to}条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{total}条',
        onChangePageSize: function (pageSize) {
            pageIndex = pageNumber;
            //一页显示几条
            deviceAlarm.GetDeviceAlarmList(pageIndex, pageSize);
        },
        onSelectPage: function (pageNumber, pageSize) {
            //下一页
            //pageIndex = pageNumber;

            deviceAlarm.GetDeviceAlarmList(pageNumber, pageSize);
        },
        onChangePageSize: function (pageNumber, pageSize) {

        },
        onRefresh: function (pageNumber, pageSize) {
            //pageIndex = pageNumber;
            // 刷新按钮
            deviceAlarm.GetDeviceAlarmList(pageNumber, pageSize);
        }
    });
}
//确警弹窗
deviceAlarm.confirmAlarm = function (alarm) {
    if ($("#confirmAlarmDialog").parent().css("display") != "block") { //判断当前确警框是否已经弹出
        $("#alarmId").html(alarm.id);
        $("#confirmPerson").html(PERSONINFOJSON.alias);//确警人
        $('#confirmAlarmDialog').dialog('open');
        $("#confirmResult").attr("disabled", false);
        //$("#confirmResult").find("option[value=2]").attr("selected", true);//初始化设置为不执行预案
        $("#confirmResult").val("真警不执行预案").attr("selected", true);;//初始化设置为不执行预案
        // $("#confirmResult option[text='真警不执行预案']").attr("selected", true);
        $("#confirmLocation").val("");
        $("#confirmContent").val("");
        //$('#btnOk').unbind("click", deviceAlarm.updateAlarmed);
        //$('#btnOk').unbind("click", deviceAlarm.confirmAlarm);
        //$('#btnOk').click(deviceAlarm.confirmAlarmed);
        //$('#btnCancel').removeAttr("click").click(deviceAlarm.cancelConfirmAlarm);
        // $("#alarmBtnOk").one("click", deviceAlarm.confirmAlarmed);
        // $("#alarmBtnOk").removeAttr("click").click(deviceAlarm.confirmAlarmed);
        $("#alarmBtnOk").unbind("click"); //解除绑定
        $("#alarmBtnOk").bind("click", deviceAlarm.confirmAlarmed);
        $('#alarmBtnCancel').removeAttr("click").click(deviceAlarm.cancelConfirmAlarm);
    }
}
//修改确警信息弹窗
deviceAlarm.updateAlarm = function (alarm) {
    if ($("#confirmAlarmDialog").parent().css("display") != "block") { //判断当前确警框是否已经弹出
        //if ($('#confirmAlarmDialog').)
        $("#alarmId").html(alarm.id);
        $("#confirmPerson").html(alarm.confirmPersonName);//确警人
        $("#confirmResult").val(alarm.confirmResult).attr("disabled", "disabled");

        //$("#confirmResult option[text='" + alarm.confirmResult + "']").attr("selected", true);
        //$("#confirmResult").attr("disabled", "disabled");
        $("#confirmLocation").val(alarm.alarmLocation);
        $("#confirmContent").val(alarm.confirmAlarmText);
        $('#confirmAlarmDialog').dialog('open');
        //$('#btnOk').unbind("click", deviceAlarm.confirmAlarmed);
        //$('#btnOk').unbind("click", deviceAlarm.updateAlarm);
        //$('#btnOk').click(deviceAlarm.updateAlarmed);
        //$('#btnCancel').removeAttr("click").click(deviceAlarm.cancelConfirmAlarm);
        //$("#alarmBtnOk").one("click", deviceAlarm.updateAlarmed);
        //$("#alarmBtnOk").removeAttr("click").click(deviceAlarm.updateAlarmed);
        $("#alarmBtnOk").unbind("click"); //解除绑定
        $("#alarmBtnOk").bind("click", deviceAlarm.updateAlarmed);
        $('#alarmBtnCancel').removeAttr("click").click(deviceAlarm.cancelConfirmAlarm);
    }
}
//确警弹框确警按钮
deviceAlarm.confirmAlarmed = function () {
    //var personId = 1;  //需要取ssoid
    var personId;
    if (PERSONINFOJSON != undefined && PERSONINFOJSON != null) {
        personId = PERSONINFOJSON.ssoid;
    }
    else {
        personId = -1;
    }

    var alarmId = $("#alarmId").text();
    var confirmResult = $("#confirmResult option:selected").attr("id");
    //var confirmResult = $("#confirmResult option:selected").val();
    var confirmLocation = $("#confirmLocation").val();
    var confirmContent = $("#confirmContent").val();
    $.ajax({
        url: "/Alarm/ConfirmAlarmMessage",
        type: "post",
        data: "alarmId=" + alarmId + "&ssoid=" + personId + "&confirmResult=" + confirmResult + "&location=" + confirmLocation + "&content=" + confirmContent,
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.message);
            if (data.state == 0) {
                $('#confirmAlarmDialog').dialog('close');
                //deviceAlarm.loadDeviceAlarmList(pageIndex, pageSize);
                deviceAlarm.GetDeviceAlarmList(pageIndex, pageSize);
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })


}
//修改确警框
deviceAlarm.updateAlarmed = function () {

    var alarmId = $("#alarmId").text();
    var confirmLocation = $("#confirmLocation").val();
    var confirmContent = $("#confirmContent").val();
    $.ajax({
        url: "/Alarm/UpdateAlarmMessage",
        type: "post",
        data: "alarmId=" + alarmId + "&location=" + confirmLocation + "&content=" + confirmContent,
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.message);
            if (data.state == 0) {
                $('#confirmAlarmDialog').dialog('close');
                //deviceAlarm.loadDeviceAlarmList(pageIndex, pageSize);
                deviceAlarm.GetDeviceAlarmList(pageIndex, pageSize);
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })

}
//确警弹框取消按钮
deviceAlarm.cancelConfirmAlarm = function () {
    $('#confirmAlarmDialog').dialog('close');
}

//多选确警按钮
deviceAlarm.multipleConfirmAlarm = function () {
    // var ssoId = 1;
    if (PERSONINFOJSON != undefined && PERSONINFOJSON != null) {
        var ssoId = PERSONINFOJSON.ssoid;
    }
    else {
        var ssoId = -1;
    }

    var result = [];
    var count = 0;
    var checkedItems = $("#alarmRecord").datagrid("getChecked");
    $.each(checkedItems, function (index, item) {
        if (item.confirmState == "未确警") {
            result.push(item.id);
            count++;
        }
    });
    if (count == 0) {
        alert("请选择要确警的条目");
    }
    else {
        if (confirm("您选择的报警为真警，不执行预案，是否继续？")) {
            $.ajax({
                url: "/Alarm/MultipleConfirmAlarm",
                type: "post",
                // data: "alarmIdArr=" + result + "&ssoId=" + ssoId,
                data: {
                    alarmIdArr: result, ssoId: ssoId
                },
                datatype: 'json',
                async: true,
                success: function (data) {
                    alert(data.message);
                    if (data.state == 0) {
                        // deviceAlarm.loadDeviceAlarmList(1, pageSize);
                        deviceAlarm.GetDeviceAlarmList(1, pageSize);
                    }

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status + "错误请联系管理员！");
                }
            })
        }
    }
}
//获取最新一条报警预案执行记录
deviceAlarm.GetLastAlarmPlanItemRecord = function () {
    $.ajax({
        url: "/Alarm/GetLastAlarmPlanItemRecord",
        type: "post",
        data: "",
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data != "") {
                deviceAlarm.setPlanAlarmInfo(data);
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//根据报警ID获取预案执行记录
deviceAlarm.GetAlarmPlanItemRecord = function (alarmId) {
    alarmClickId = alarmId;
    $.ajax({
        url: "/Alarm/GetAlarmPlanItemRecord",
        type: "post",
        data: {
            alarmId: alarmId
        },
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data != "") {
                planRecordData = data;//给预案记录赋值
                deviceAlarm.setPlanAlarmInfo(data, alarmId);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//加载预案执行记录结果
deviceAlarm.setPlanAlarmInfo = function (data, alarmId) {
    if (alarmClickId == alarmId) //如果当前点击项等于查询返回报警记录
    {
        //var beforeAlarm = "";
        //var afterAlarm = "";
        //var relateCamera = "";

        //$("#beforeAlarm").empty();
        //$("#afterAlarm").empty();
        //$("#relateCamera").empty();
        //if (data.alarmRecord != undefined && data.alarmRecord != null) {
        //    $("#planAlarmId").html(data.alarmRecord.id);
        //    $("#planAlarmTime").html(Util.changeDateFormat(data.alarmRecord.alarm_time));
        //}
        //if (data.resultList != undefined && data.resultList != null) {


        //    for (var i = 0; i < data.resultList.length; i++) {
        //        switch (data.resultList[i].confirm_type) {
        //            case 1://确警前
        //                beforeAlarm += "<tr><td>" + data.resultList[i].itemName + "</td><td>" + data.resultList[i].executeTime + "</td><td>" + data.resultList[i].itemResult + "</td></tr>";
        //                break;
        //            case 2://确警后
        //                afterAlarm += "<tr><td>" + data.resultList[i].itemName + "</td><td>" + data.resultList[i].executeTime + "</td><td>" + data.resultList[i].itemResult + "</td></tr>";
        //                break;
        //            default: break;
        //        }
        //    }

        //    if (data.cameraList != undefined && data.cameraList != null) {

        //        for (var i = 0; i < data.cameraList.length; i++) {
        //            relateCamera += "<tr><td>" + data.cameraList[i].device_name + "</td></tr>";
        //        }
        //    }
        //    $("#beforeAlarm").html(beforeAlarm);
        //    $("#afterAlarm").html(afterAlarm);
        //    $("#relateCamera").html(relateCamera);
        //}

        var beforeConfirmedAlarm = "";
        var afterConfirmedAlarm = "";
        var relateCamera = "";
        var downLoadCamera = "";

        if (data.cameraList != undefined && data.cameraList != null && data.cameraList.length != 0) {
            for (var i = 0, size = data.cameraList.length; i < size; i++) {
                if (data.cameraList[i].device_status != 1) {
                    relateCamera += '<li class="col-xs-3" style="color:#F00" >' + data.cameraList[i].device_name + '</li>';
                }
                else {
                    relateCamera += '<li class="col-xs-3" onclick=\'deviceAlarm.playCamera(' + JSON.stringify(data.cameraList[i]) + ',' + JSON.stringify(data.alarmRecord) + ',' + JSON.stringify(data.videoTime) + ')\'>' + data.cameraList[i].device_name + '</li>';
                }
            }
        }
        else {
            relateCamera = "当前报警未绑定相关摄像头";
        }
        if (data.videoList != undefined && data.videoList != null && data.videoList.length != 0) {
            for (var i = 0, size = data.videoList.length; i < size; i++) {
                if (data.videoList[i].download_status != 1) {
                    downLoadCamera += '<li class="col-xs-3"  style="color:#F00"  onclick=\'deviceAlarm.playVideo(' + JSON.stringify(data.videoList[i]) + ')\'>' + data.videoList[i].device_name + '</li>';
                }
                else {
                    downLoadCamera += '<li class="col-xs-3" onclick=\'deviceAlarm.playVideo(' + JSON.stringify(data.videoList[i]) + ')\'>' + data.videoList[i].device_name + '</li>';
                }
            }
        }
        else {
            downLoadCamera = "当前报警无视频下载记录";
        }
        //新加
        var resultData = [];
        if (data.resultList != undefined && data.resultList != null) {
            for (var i = 0; i < data.resultList.length; i++) {
                var result = false;
                if (resultData.length != 0) {
                    for (var a = 0; a < resultData.length; a++) {
                        if (resultData[a].itemName == data.resultList[i].itemName) {
                            result = true;
                        }
                    }
                }
                if (result == false) {
                    resultData.push(data.resultList[i]);
                }
            }
        }
       
        if (resultData.length>0) {
            for (var i = 0, size = resultData.length; i < size; i++) {
                var className = 'defeat';
                if (resultData[i].itemResult == "成功") {
                    className = 'success';
                }
                switch (resultData[i].confirm_type) {

                    case 1: beforeConfirmedAlarm += "<div class='alarm-box1 heightAuto'><table border='0'><tr><td align='left' width='162' class='alarm-result'><b>执行结果：</b><span class='" + className + "'>" + resultData[i].itemResult + "</span></td>"
                                                 + "<td align='right'>" + resultData[i].executeTime + "</td></tr><tr>"
                                                 + "<td align='left' colspan='2'>处置项：<span>" + resultData[i].itemName + "</span></td>"
                                                 + "</tr></table></div>";
                        break;
                    case 2: afterConfirmedAlarm += "<div class='alarm-box1'><table border='0'><tr><td align='left' width='162' class='alarm-result'><b>执行结果：</b><span class='" + className + "'>" + resultData[i].itemResult + "</span></td>"
                                                + "<td align='righ'>" + resultData[i].executeTime + "</td></tr><tr>"
                                                + "<td align='left' colspan='2'>处置项：<span>" + resultData[i].itemName + "</span></td>"
                                                + "</tr></table></div>";
                        break;
                    default: break;
                }
            }
        }
        //执行记录
        //if (data.resultList != undefined && data.resultList != null) {
        //    for (var i = 0, size = data.resultList.length; i < size; i++) {
        //        var className = 'defeat';
        //        if (data.resultList[i].itemResult == "成功") {
        //            className = 'success';
        //        }
        //        switch (data.resultList[i].confirm_type) {

        //            case 1: beforeConfirmedAlarm += "<div class='alarm-box1 heightAuto'><table border='0'><tr><td align='left' width='162' class='alarm-result'><b>执行结果：</b><span class='" + className + "'>" + data.resultList[i].itemResult + "</span></td>"
        //                                         + "<td align='right'>" + data.resultList[i].executeTime + "</td></tr><tr>"
        //                                         + "<td align='left' colspan='2'>处置项：<span>" + data.resultList[i].itemName + "</span></td>"
        //                                         + "</tr></table></div>";
        //                break;
        //            case 2: afterConfirmedAlarm += "<div class='alarm-box1'><table border='0'><tr><td align='left' width='162' class='alarm-result'><b>执行结果：</b><span class='" + className + "'>" + data.resultList[i].itemResult + "</span></td>"
        //                                        + "<td align='righ'>" + data.resultList[i].executeTime + "</td></tr><tr>"
        //                                        + "<td align='left' colspan='2'>处置项：<span>" + data.resultList[i].itemName + "</span></td>"
        //                                        + "</tr></table></div>";
        //                break;
        //            default: break;
        //        }
        //        //switch (data.resultList[i].confirm_type) {

        //        //    case 1: beforeConfirmedAlarm += "<div class='alarm-box1 heightAuto'><table border='0'><tr><td align='left' width='162' class='alarm-result'><b>执行结果：</b><span class='success'>" +data.resultList[i].itemResult + "</span></td>"
        //        //                                 + "<td align='right'>" +data.resultList[i].executeTime + "</td></tr><tr>"
        //        //                                 + "<td align='left' colspan='2'>处置项：<span>" +data.resultList[i].itemName + "</span></td>"
        //        //                                 + "</tr></table></div>";
        //        //        break;
        //        //    case 2: afterConfirmedAlarm += "<div class='alarm-box1'><table border='0'><tr><td align='left' width='162' class='alarm-result'><b>执行结果：</b><span class='success'>" +data.resultList[i].itemResult + "</span></td>"
        //        //                                + "<td align='righ'>" +data.resultList[i].executeTime + "</td></tr><tr>"
        //        //                                + "<td align='left' colspan='2'>处置项：<span>" +data.resultList[i].itemName + "</span></td>"
        //        //                                + "</tr></table></div>";
        //        //        break;
        //        //    default: break;
        //        //    }
        //    }
        //}
        $("#videoCheckBack").html("视频回查（报警编号  " + alarmId + "）");
        $("#videoDownLoad").html("视频下载（报警编号  " + alarmId + "）");
        $("#planRecord").html("预案执行记录（报警编号  " + alarmId + "）");
        $("#planFlowChart").html("预案流程图（报警编号  " + alarmId + "）");
        if (data.videoTime != null && data.videoTime != undefined && data.videoTime.videoTimeModel != undefined && data.videoTime.videoTimeModel != null) {
            $("#videoCheckBackTime").html("录像起止时间（-" + data.videoTime.videoTimeModel.start_time + "，" + data.videoTime.videoTimeModel.end_time + "）");
            $("#videoDownLoadTime").html("视频起止时间（-" + data.videoTime.videoTimeModel.start_time + "，" + data.videoTime.videoTimeModel.end_time + "）");
        }
        else {
            $("#videoCheckBackTime").html("当前报警事件未设置时间");
            $("#videoDownLoadTime").html("当前报警事件未设置时间");
        }
        $("#videoCheckBackCamera").html(relateCamera);
        $("#videoDownLoadCamera").html(downLoadCamera);
        $("#beforeConfirmAlarm").html(beforeConfirmedAlarm);
        $("#afterConfirmAlarm").html(afterConfirmedAlarm);
    }

}


//获取报警统计数量
deviceAlarm.GetAlarmCount = function () {
    $.ajax({
        url: "/Alarm/GetAlarmNum",
        type: "post",
        data: "",
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data.hasOwnProperty('state')) {
                alert(data.message);
            }
            else {
                if (data != null) {
                    $("#Day").html(data.nDay);
                    $("#Week").html(data.nWeek);
                    $("#Month").html(data.nMonth);
                    $("#Quarter").html(data.nQuarter);
                    $("#FHalfMonth").html(data.fHalfMonth);
                    $("#SHalfMonth").html(data.sHalfMonth);
                    $("#Year").html(data.nYear);
                }
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//加入卷宗操作
deviceAlarm.AddArchive = function (record) {
    alert("正在开发中");

}

//播放下载视频
deviceAlarm.playVideo = function (video) {
    // alert(video);
    if (video.download_status == 1) {
        var b = '/';
        var url = window.location.host;
        if (video.download_status == 1) {
            if (video.video_path != "") {
                var path = "http://" + VideoDownLoadPath + "/" + video.video_path.replace(/\\/g, b);
                //var path = "http://192.168.6.253:12002/" + video.video_path.replace(/\\/g, b);
                window.open(path, '', 'width=1000,height=600');
            } else {
                alert("该文件不存在！");
            }
        }
        else {
            alert("视频未下载完成！");
        }
    }
    else {
        alert("视频未下载完成或下载失败！");
    }


}
//播放本地录像
deviceAlarm.playCamera = function (camera, alarmRecord, videoTime) {
    if (camera.ext4 != 1) {
        alert("该摄像头不支持录像播放");
        return;
    }
    if (camera.device_status != 1) {
        alert("设备状态异常");
        return;
    }
    var activeXhtml = "";
    switch (definedVideoPlatform) {
        case 1://宇视
            activeXhtml = '<object classid="clsid:067A4418-EBAC-4394-BFBE-8C533BA6503A" id="h3c_IMOS_ActiveX" events="true" height="100%" width="100%"></object>';
            break;
        case 2://海康
            break;
        case 3://博世
            activeXhtml = '<object classid="clsid:{B430599E-D328-4713-8DD4-DB0E93947BF0}" id="h3c_IMOS_ActiveX" events="true" height="100%" width="100%"></object>';
            break;
    }
    $("#videoPlayTitle").html("录像播放  [报警时间：" + Util.changeDateFormat(alarmRecord.alarm_time) + "]");
    $("#cameraDiv").show();//打开视频播放窗体

    //var vedioPopuptHtml = '<div class="videoplayer-title">' +
    //    '<b id="cameraName">'+camera.device_name+'</b>' +
    //    '<div class="about-close" onclick="vedioPopupClose();AlarmPopupClose()"></div>' +
    //'</div>' +
    //'<div class="videoplayer-content">' +
    //    '<div class="videoplayer-top">' +
    //        '<div class="videoplayer-view" id="videoplayerView">' +
    //        activeXhtml +
    //        '</div></dvi></div>';
    var sTime = videoTime.videoStartTime;
    var eTime = videoTime.videoEndTime;

    var startTime = Util.changeDateFormat(videoTime.videoStartTime);
    var endTime = Util.changeDateFormat(videoTime.videoEndTime);
    $("#cameraDiv").attr("title", camera.device_name);
    $("#videoplayerView").html(activeXhtml);
    var array = new Array();
    array.push(camera.device_code);
    //array.push("6347d8d91921681203X0");
    alarmVideo.initLogin();
    alarmVideo.playVideo(array);
    alarmVideo.startPlayback(startTime, endTime);
    //alarmVideo.startPlayback(startTime.)
    $("#cameraDiv").show();//打开视频播放窗体
    //$("#cameraDiv").css({
    //    "width": "800px", "height": "475px"
    //});
}

////关闭视频播放
//deviceAlarm.stopPlayCamera = function () {
//    alarmVideo.stopPlayback();
//    $("#cameraDiv").hide();
//}

//录像播放弹窗
$(function () {
    $(".cameraDiv .about-close").click(function () {
        alarmVideo.stopPlayback();
        $(".cameraDiv").hide();
        //$("#cameraDiv").css({
        //    "width": "1px", "height": "1px"
        //});
    })
})
//$("#cameraDiv .about-close").click(function () {
//    alarmVideo.stopPlayback();
//    //$(".cameraDiv").hide();
//    $("#cameraDiv").css({
//        "width": "1px", "height": "1px"
//    });
//})
//全部导出
deviceAlarm.exportAllExcel = function () {
    deviceAlarm.exportExcel("", "", -100, null, -100, -100, -100);
}
//按条件导出
deviceAlarm.exportConditionExcel = function () {
    var sub = [];
    var subStr;
    var level = -100;
    var state = -100;
    var alarmType = -100;
    var regionId = -100;
    deviceAlarm.sTime = "";
    deviceAlarm.eTime = "";
    var timeRadio = $(':radio[name="radioTime"]:checked').val();
    if (timeRadio != undefined) {
        switch (timeRadio) {
            case "1": getTodayInfo(); break;
            case "2": getWeekInfo(); break;
            case "3": getMonthInfo(); break;
            case "4": getSeasonInfo(); break;
            case "5": getFirstHalfYearInfo(); break;
            case "6": getLatterHalfYearInfo(); break;
            case "7": getYearInfo(); break;
            default: break;
        }
    }
    else {
        deviceAlarm.sTime = $("#alarmStartTime").val();
        deviceAlarm.eTime = $("#alarmEndTime").val();
    }
    var levelRadio = $(':radio[name="radioLevel"]:checked').val();
    if (levelRadio != undefined) {
        level = parseInt(levelRadio);
    }
    var stateRadio = $(':radio[name="radioState"]:checked').val();
    if (stateRadio != undefined) {
        state = parseInt(stateRadio);
    }
    var regionRadio = $(':radio[name="radioRegion"]:checked').val();
    if (regionRadio != undefined) {
        regionId = parseInt(regionRadio);
    }
    var ss = $('input:checkbox[name=checkbox2]:checked');
    for (var i = 0, size = ss.length; i < size; i++) {
        sub.push(parseInt(ss[i].value));
    }
    subStr = sub.join(",");
    deviceAlarm.exportExcel(deviceAlarm.sTime, deviceAlarm.eTime, -100, subStr, level, state, regionId);
}
//excel导出
deviceAlarm.exportExcel = function (alarmStartTime, alarmEndTime, alarmType, subSystem, alarmLevel, confirmState, regionId) {
    post_blank("/Alarm/ExportDeviceAlarmExcel?Random=" + Math.floor(Math.random() * 100000), {
        startTime: alarmStartTime,
        endTime: alarmEndTime,
        confirmState: confirmState,
        alarmType: alarmType,
        subSystem: subSystem,
        alarmLevel: alarmLevel,
        regionId: regionId
    });
    //$.ajax({
    //    url: "/Alarm/ExportDeviceAlarmExcel",
    //    type: "post",
    //    data: { startTime: startTime, endTime: endTime, confirmState: confirmState, alarmType: alarmType, subSystem: subSystem, alarmLevel: alarmLevel },
    //    datatype: 'json',
    //    async: true,
    //    success: function (data) {
    //        if (data.hasOwnProperty('state')) {
    //            alert(data.message);
    //        }
    //        else {
    //            if (data != null) {
    //                $("#Day").html(data.nDay);
    //                $("#Week").html(data.nWeek);
    //                $("#Month").html(data.nMonth);
    //                $("#Quarter").html(data.nQuarter);
    //                $("#FHalfMonth").html(data.fHalfMonth);
    //                $("#SHalfMonth").html(data.sHalfMonth);
    //                $("#Year").html(data.nYear);
    //            }
    //        }

    //    },
    //    error: function (XMLHttpRequest, textStatus, errorThrown) {
    //        alert(XMLHttpRequest.status + "错误请联系管理员！");
    //    }
    //})
    alert("正在处理，请等待页面加载完成！");
}

//往后台传递html字符串
function post_blank(URL, PARAMS) {
    var temp = document.createElement("form");
    temp.action = URL;
    temp.method = "post";
    temp.target = "_blank";
    temp.style.display = "none";
    for (var x in PARAMS) {
        var opt = document.createElement("textarea");
        opt.name = x;
        opt.value = PARAMS[x];
        temp.appendChild(opt);
    }
    document.body.appendChild(temp);
    temp.submit();
    return temp;
}

