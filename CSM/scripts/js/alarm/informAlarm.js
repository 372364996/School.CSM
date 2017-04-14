var informAlarm = {}; //全局变量
var pageSize = 20; //默认初始化每页行数
var pageIndex = 1;
var _data = [];   //报警列表加载数据
//初始化加载
$(function () {
    $("#detailDiv").hide();
    informAlarm.loadInformAlarmData(pageIndex, pageSize);
    informAlarm.getInformAlarmData(pageIndex, pageSize);
    $("#exportExcel").menubutton({
        text: "导出",
        iconCls: "icon-redo",
        menu: "#excel",
    });

   
})

//获取数据
informAlarm.getInformAlarmData = function (pageIndex, pageSize) {
    var regionId = $('#regionSelect option:selected').val();  //园区ID
    var areaId = $('#areaSelect option:selected').val();  //区域ID
    var alarmLevel = $('#alarmLevelSelect option:selected').val();  //告警等级
    var createTime = $("#createTime").val();  //开始时间
    var endTime = $("#endTime").val();       //截止时间
    var eventType = -100;
    $.ajax({
        url: "/Alarm/GetInformAlarmPage",
        type: "post",
        data: { pageIndex: pageIndex, pageSize: pageSize, regionId: regionId, areaId: areaId, alarmLevel: alarmLevel, startTime: createTime, endTime: endTime, eventType: eventType },
        datatype: 'json',
        async: true,
        beforeSend: function (XMLHttpRequest) {
            $('#informAlarmTable').datagrid('loading', "正在加载...");
        },
        success: function (data) {
            if (data.status != 0) {
                alert("设备告警列表加载出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data != null) {
                    _data = data.msg;
                    $('#informAlarmTable').datagrid('loadData', _data);
                    $('#informAlarmTable').datagrid('getPager').pagination('refresh', {
                        total: _data.total,
                        pageNumber: pageIndex,
                        pageSize: pageSize
                    });
                }
            $('#informAlarmTable').datagrid('loaded');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
            $('#informAlarmTable').datagrid('loaded');

        }
    });
}

//加载列表
informAlarm.loadInformAlarmData = function (pageIndex, pageSize) {
    /*------------------*/
    $('#informAlarmTable').datagrid({
        data: _data,
        fitColumns: true,
        singleSelect: true,
        method: 'get',
        loadMsg: '正在加载……',
        remoteSort: false,
        pageNumber: pageIndex, //重点:传入当前页数
        pagination: true, //分页控件 
        rownumbers: false, //行号 
        checkOnSelect: false,
        selectOnCheck: false,
        // onMouseOverRow: function (e, rowIndex, rowData) {
        //     Util.changeRowBGColor("dg", rowIndex);
        // },
        // onMouseOutRow: function (e, rowIndex, rowData) {
        //     Util.rowOut("dg", rowIndex);
        // },
        toolbar: [
         // {
         //     iconCls: 'icon-redo',
         //     text: "全部导出",
         //     handler: function () { informAlarm.exportAllExcel(); }
         // }, '-',
         //{
         //    iconCls: 'icon-redo',
         //    text: "条件导出",
         //    handler: function () { informAlarm.exportConditionExcel(); }
         //}
         {
             id: 'exportExcel'

         }
        ],
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'id', title: '告警编号', width: 70, align: "center", sortable: true },
            { field: 'event_name', title: '事件名称', width: 100, align: "center", sortable: false },
            { field: 'device_name', title: '告警设备', width: 100, align: "center", sortable: false },
            { field: 'alarm_location', title: '告警位置', width: 100, align: "center", sortable: false },
            { field: 'region_name', title: '园区名称', width: 100, align: "center", sortable: false },
            { field: 'area_name', title: '区域名称', width: 100, align: "center", sortable: false },
            {
                field: 'report_time', title: '告警时间', width: 120, align: "center", sortable: true,
                formatter: function (value, rec) {
                    return Util.changeDateFormat(value);
                }
            },
       {
           field: 'alarm_level', title: '告警级别', width: 70, align: "center", sortable: false,
           formatter: function (value, rec) {
               switch (value) {
                   case 1: return "紧急";
                   case 2: return "高";
                   case 3: return "中";
                   case 4: return "低";
                   default: return "--";
               }
           }
       },
           {
               field: 'status', title: '处理状态', width: 70, align: "center", sortable: true,
               formatter: function (value, rec) {
                   if (value == 1) {
                       return '<button type="button" class="btn btn-danger btn-xs"  onclick=\'informAlarm.queryDetail(' + JSON.stringify(rec) + ')\'>未处理</button>';
                   } else if (value == 2) {
                       return '<button type="button" class="btn btn-success btn-xs"  onclick=\'informAlarm.queryDetail(' + JSON.stringify(rec) + ')\'>处理中</button>';
                   }
                   else if (value == 3) {
                       return '<button type="button" class="btn btn-success btn-xs" disabled="true"  onclick=\'informAlarm.queryDetail(' + JSON.stringify(rec) + ')\'>已处理</button>';
                   }
               }
           }
           //,
            //{
            //    field: 'id', title: '操作', width: 100, align: "center", sortable: false,
            //    formatter: function (value, rec) {
            //        if (value == 1) {
            //            return '<button type="button" class="btn btn-danger btn-xs"  onclick=\'cameraSchedule.forbidUse(' + JSON.stringify(rec) + ')\'>未处理</button>';
            //        } else if (value == 2) {
            //            return '<button type="button" class="btn btn-success btn-xs"  onclick=\'cameraSchedule.startUse(' + JSON.stringify(rec) + ')\'>处理中</button>';
            //        }
            //        else if (value == 3) {
            //            return '<button type="button" class="btn btn-success btn-xs" disabled="true"  onclick=\'cameraSchedule.startUse(' + JSON.stringify(rec) + ')\'>已处理</button>';
            //        }
            //    }
            //}
        ]],

        //view: detailview,
        //detailFormatter: function (index, row) {
        //    return '<div style="padding:2px"><table id="ddv-' + index + '"></table></div>';
        //},
        //onExpandRow: function (index, row) {
        //    var data2 = [];
        //    $.ajax({
        //        url: "/Alarm/GetInformAlarmHandleRecordByAlarmId",
        //        data: { alarmId: row.id },
        //        type: "post",
        //        datatype: "json",
        //        async: false,
        //        success: function (data) {
        //            if (data.status != 0) {
        //                alert("设备告警处理记录列表加载出现" + data.msg + "错误请联系管理员！");
        //            }
        //            else
        //                if (data.status == 0) {
        //                    data2 = data.msg;

        //                }

        //        },
        //        error: function (XMLHttpRequest, textStatus, errorThrown) {
        //            alert(XMLHttpRequest.status + "错误请联系管理员！");


        //        }
        //    })
        //    $("#ddv-" + index).datagrid({
        //        data: data2,
        //        singleSelect: true,
        //        fitColumns: true,
        //        onDblClickRow: function (rowIndex, rowData) {
        //            //getDeviceDefinedInfo(rowData.id);
        //        },
        //        columns: [[
        //    { field: 'id', title: '处理记录编号', width: 40, align: "center", sortable: true },
        //    { field: 'handle_person', title: '处理人', width: 70, align: "center", sortable: false },
        //    {
        //        field: 'handle_time', title: '处理时间', width: 70, align: "center", sortable: true,
        //        formatter: function (value, rec) {
        //            return Util.changeDateFormat(value);
        //        }
        //    },
        //    { field: 'handle_content', title: '描述', width: 70, align: "center", sortable: false }
        //        ]],
        //        onResize: function () {
        //            $('#informAlarmTable').datagrid('fixDetailRowHeight', index);
        //        }
        //    });
        //    $('#informAlarmTable').datagrid('fixDetailRowHeight', index);
        //}


        view: detailview,

        detailFormatter: function (index, row) {
            var data2 = [];
            var str = "";
            $.ajax({
                url: "/Alarm/GetInformAlarmHandleRecordByAlarmId",
                data: { alarmId: row.id },
                type: "post",
                datatype: "json",
                async: false,
                success: function (data) {
                    if (data.status != 0) {
                        alert("设备告警处理记录列表加载出现" + data.msg + "错误请联系管理员！");
                    }
                    else
                        if (data.status == 0) {
                            data2 = data.msg;
                        }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status + "错误请联系管理员！");
                }
            });

            str += '<table border="0" style="width:100%;" align="center"><tr>' +
                '<td align="center" width="25%">告警设备: ' + row.device_name + '</td>' +
                    '<td align="center" width="25%">事件名称: ' + row.event_name + '</td>' +
                    '<td align="center" width="25%">报警时间: ' + Util.changeDateFormat(row.report_time) + '</td>' +
            '<td align="center" width="25%">描述:已接警</td>' + '</tr> </table>';
            for (var i = 0; i < data2.length; i++) {
                str += '<table border="0" style="width:100%;" align="center"><tr>' +
                    '<td align="center" width="25%">处理记录编号: ' + data2[i].id + '</td>' +
                    '<td align="center" width="25%">处理人: ' + data2[i].alias + '</td>' +
                    '<td align="center" width="25%">处理时间: ' + Util.changeDateFormat(data2[i].handle_time) + '</td>' +
                    '<td align="center" width="25%">描述: ' + data2[i].handle_content + '</td>' + '</tr> </table>';
            }

            //str += '<div class="aacDetilsBg">'
            //    + '<form>'
            //    + '<table align="left" width="90%">'
            //    + '<tr>'
            //    + '<td class="vT firstTd" width="80" style=" vertical-align: top !important;">'
            //    + '<p class="aacDetilsBg-p1">已接警</p>'
            //    + '<div class="aacLine aacLine2"><div class="aacRound" style="margin-left:96px;margin-top: -10px;"></div></div>'
            //    + '</td>'
            //    + '<td class="vT" width="150" align="center" style=" vertical-align: top !important;">'
            //    + '<p>' + Util.changeDateFormat(row.report_time) + '&ensp;<img src="../style/base/images/public/aacLine.png" /></p>'
            //    + '</td>'
            //    + '<td  class="vT"width="400" style=" vertical-align: top !important;">'
            //    + '<div class="aacBorder">'
            //    + '<p>接警</p>'
            //    + '<div class="aacInnerTab">'
            //    + '<table>'
            //    + '<tr>'
            //    + '<td width="90">告警设备：</td>'
            //    + '<td>' + row.device_name + '</td>'
            //    + '<td width="90">事件名称：</td>'
            //    + '<td>' + row.event_name + '</td>'
            //    + '</tr>'
            //    + '</table>'
            //    + '</div>'
            //    + '</td>'
            //    + '</tr>';
            //for (var i = 0; i < data2.length; i++) {
            //    str += '<tr>'
            //     + '<td class="vT firstTd" width="80" style=" vertical-align: top !important;">';
            //    if (i == 0) {
            //        str += '<p class="aacDetilsBg-p1">处理过程</p>'
            //         + '<div class="aacLine aacLine2"><div class="aacRound" style="margin-left:96px;margin-top: -10px;"></div></div>';
            //    }
            //    else {
            //        str += '<p class="aacDetilsBg-p1  vh"></p>';
            //    }
            //    //+ '<p class="aacDetilsBg-p1">处理过程</p>'
            //    + '<div class="aacLine"><div class="aacRound" style="margin-left:96px;margin-top: -10px;"></div></div>'
            //    + '</td>'
            //    + '<td class="vT"  width="150" align="center" style=" vertical-align: top !important;">'
            //    + '<p>' + Util.changeDateFormat(data2[i].handle_time) + '&ensp;<img src="../style/base/images/public/aacLine.png" /></p>'
            //    + '</td>'
            //    + '<td class="vT"  width="400" style=" vertical-align: top !important;">'
            //    + '<div class="aacBorder">'
            //    + '<p>' + data2[i].handle_content + '</p>'
            //    + '<div class="aacInnerTab">'
            //    + '<table>'
            //    + '<tr>'
            //    + '<td width="90">记录编号：</td>'
            //    + '<td>' + data2[i].id + '</td>'
            //    + '<td width="90">处理人：</td>'
            //    + '<td>' + data2[i].alias + '</td>'
            //    + '</tr>'
            //    + '</table>'
            //    + '</div>'
            //    + '</div>'
            //    + '</td>'
            //    + '</tr>';
            //}
            // str += '</table></form></div>'

            return str;
        },
        //onExpandRow: function (index, row) {
        //    var data2 = [];
        //    $.ajax({
        //        url: "/Alarm/GetInformAlarmHandleRecordByAlarmId",
        //        data: { alarmId: row.id },
        //        type: "post",
        //        datatype: "json",
        //        async: false,
        //        success: function (data) {
        //            if (data.status != 0) {
        //                alert("设备告警处理记录列表加载出现" + data.msg + "错误请联系管理员！");
        //            }
        //            else
        //                if (data.status == 0) {
        //                    data2 = data.msg;
        //                }
        //        },
        //        error: function (XMLHttpRequest, textStatus, errorThrown) {
        //            alert(XMLHttpRequest.status + "错误请联系管理员！");
        //        }
        //    });
        //var ddv = $(this).datagrid('getRowDetail', index).find('div.ddv');
        //ddv.panel({
        //    border: false,
        //    cache: false,
        //    //href: '/Alarm/GetInformAlarmHandleRecordByAlarmId?alarmId=' + row.id,
        //    // data:data2,

        //    onLoad: function () {
        //        //for (var i = 0; i < data2.length; i++)
        //        //{

        //        //}
        //        $('#informAlarmTable').datagrid('fixDetailRowHeight', index);
        //    }
        //});
        //$('#informAlarmTable').datagrid('fixDetailRowHeight', index);
        //  }

    });
    $('#informAlarmTable').datagrid('getPager').pagination({//分页栏下方文字显示
        showPageList: true,
        pageSize: pageSize, //每页显示的记录条数，默认为10
        pageNumber: pageIndex, //重点:传入当前页数
        pageList: [5, 10, 20, 30, 50], //可以设置每页记录条数的列表    
        beforePageText: '第', //页数文本框前显示的汉字   
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示{from}-{to}条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{total}条',
        onChangePageSize: function (pageNumber, pageSize) {
            //一页显示几条

            informAlarm.getInformAlarmData(pageNumber, pageSize);
        },
        onSelectPage: function (pageNumber, pageSize) {
            //下一页

            informAlarm.getInformAlarmData(pageNumber, pageSize);
        },
        onChangePageSize: function () {
            //选择显示条数事件

        },
        onRefresh: function (pageNumber, pageSize) {
            //pageIndex = pageNumber;
            // 刷新按钮
            informAlarm.getInformAlarmData(pageNumber, pageSize);
        }
    });
}
//查询按钮
informAlarm.queryInformAlarm = function () {
    informAlarm.getInformAlarmData(pageIndex, pageSize);
}
//清空查询条件
emptyConditionInfo = function () {
    $("#createTime").val("");
    $("#endTime").val("");
    $("#regionSelect").find("option[value=-100]").attr("selected", true); //设置选中园区
    $("#areaSelect").find("option[value=-100]").attr("selected", true); //设置选中区域
    $("#alarmLevelSelect").find("option[value=-100]").attr("selected", true); //设置选中告警等级
    informAlarm.getInformAlarmData(pageIndex, pageSize);                      //获取数据
}
//改变园区下拉框选中值
regionChange = function () {
    $("#areaSelect").empty(); //移除子元素
    var regionId = $('#regionSelect option:selected').val();//获取被选中的园区ID
    $.ajax({
        url: "/Alarm/GetAreaByRegion",
        type: "post",
        data: { regionId: regionId },
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data.status == 0) {
                var datas = data.msg;
                var areaHtml = " <option value=-100>请选择</option>";
                //拼接摄像头组下拉框html
                for (var i = 0; i < datas.length; i++) {
                    areaHtml += "<option value=" + datas[i].key + ">" + datas[i].value + "</option>";
                }
            }
            else {
                alert(data.msg);
            }
            $("#areaSelect").append(areaHtml);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//设置弹出框默认值
informAlarm.queryDetail = function (data) {
    if ($("#detailDiv").css('display') == 'block' || $("#detailDiv").css('display') == 'none') {
        // $("#detailDiv").show();
        $("#detailDiv").dialog('open');
        $("#detailDiv").show();
    }
    $("#alarmIdInput").html(data.id);//设置报警ID
    $("#deviceInput").html(data.device_name);//设置设备名称
    $("#informTime").val(Util.changeDateFormat(data.report_time));
}
//保存处理记录
saveDetailBtn = function () {
    var ssoId;
    if (PERSONINFOJSON != undefined && PERSONINFOJSON != null) {
        ssoId = PERSONINFOJSON.ssoid;
    }
    else {
        ssoId = -1;
    }
    var id = $("#alarmIdInput").html();//获取报警ID
    var status = 2;
    if ($("#confirmCheckBox").is(':checked')) {
        status = 3;
    }
    var content = $("#handleContent").val();//获取报警ID
    $.ajax({
        url: "/Alarm/AddInformAlarmHandleRecord",
        type: "post",
        data: { alarmId: id, ssoId: ssoId, context: content, status: status },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {
                // $("#detailDiv").hide();  //隐藏配置DIV
                $("#detailDiv").dialog('close');
                informAlarm.getInformAlarmData(pageIndex, pageSize);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//取消保存
cancelSaveBtn = function () {
    //$("#detailDiv").hide();
    $("#detailDiv").dialog('close');
}

//导出全部excel文件
informAlarm.exportAllExcel = function () {
    informAlarm.exportExcel(-100, -100, -100, "", "", -100);
}
//导出部分excel文件
informAlarm.exportConditionExcel = function () {
    var regionId = $('#regionSelect option:selected').val();  //园区ID
    var areaId = $('#areaSelect option:selected').val();  //区域ID
    var alarmLevel = $('#alarmLevelSelect option:selected').val();  //告警等级
    var createTime = $("#createTime").val();  //开始时间
    var endTime = $("#endTime").val();       //截止时间
    var eventType = -100;
    informAlarm.exportExcel(regionId, areaId, alarmLevel, createTime, endTime, eventType);
}

//excel导出
informAlarm.exportExcel = function (regionId, areaId, alarmLevel, startTime, endTime, eventType) {
    post_blank("/Alarm/ExportInformAlarmExcel?Random=" + Math.floor(Math.random() * 100000), {
        regionId: regionId,
        areaId: areaId,
        alarmLevel: alarmLevel,
        startTime: startTime,
        endTime: endTime,
        eventType: eventType

    });
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