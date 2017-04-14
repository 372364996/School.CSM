var cameraSchedule = {}; //定义全局变量
var pageSize = 20; //默认初始化每页行数
var pageIndex = 1;  //默认起始页面
var updateId = 0;//待修改的视频轮播计划ID
var delayId = 0;//待延期的视频轮播计划ID
var delayEndTime;//待延期的视频轮播截止时间
var _data = [];   //报警列表加载数据
//初始化加载
$(function () {
    $("#configDiv").dialog('close');        //配置DIV隐藏
    $("#periodSelectTr").hide();   //时间选择框隐藏
    $("#deviceDetailDiv").dialog('close');    //设备列表DIV隐藏
    $("#delayTimeDiv").dialog('close');    //延期选择DIV隐藏
    $("#noTimeRadio").attr("checked", "checked");
    if ($.cookie("mainControlRegionId")) {
        var mainControlRegion = $.cookie("mainControlRegionId");
        $("#regionSelect").find("option[value=" + mainControlRegion + "]").attr("selected", true);
        //$("#regionConfigSelect").find("option[value=" + mainControlRegion + "]").attr("selected", true);
    }
    cameraSchedule.getScheduleList(pageIndex, pageSize);

})
//检查时间radio，如果选择小时，显示具体的下拉框
cameraSchedule.checkRadio = function () {
    var vals = $('input:radio[name="datetime"]:checked').val();
    if (vals == "1") {
        $("#periodSelectTr").show();
    }
    else {
        $("#periodSelectTr").hide();
    }

}
//获取视频巡更列表
cameraSchedule.queryScheduleListBtn = function () {
    var scheduleName = $("#scheduleName").val();
    var regionId = $('#regionSelect option:selected').val();
    var scheduleState = -100;
    var validStartTime = $("#createTime").val();
    var validEndTime = $("#endTime").val();
    //cameraSchedule.loadScheduleList(pageIndex, pageSize);
    cameraSchedule.queryScheduleList(pageIndex, pageSize, scheduleName, regionId, scheduleState, validStartTime, validEndTime);
    cameraSchedule.loadScheduleList(pageIndex, pageSize);
}
//获取视频巡更列表
cameraSchedule.getScheduleList = function (pageIndex, pageSize) {
    var scheduleName = $("#scheduleName").val();
    var regionId = $('#regionSelect option:selected').val();
    var scheduleState = -100;
    var validStartTime = $("#createTime").val();
    var validEndTime = $("#endTime").val();
    cameraSchedule.loadScheduleList(pageIndex, pageSize);
    cameraSchedule.queryScheduleList(pageIndex, pageSize, scheduleName, regionId, scheduleState, validStartTime, validEndTime);
}

//查询视频巡更列表
cameraSchedule.queryScheduleList = function (pageIndex, pageSize, scheduleName, regionId, scheduleState, validStartTime, validEndTime) {
    $.ajax({
        url: "/Schedule/GetCameraScheduleList",
        type: "post",
        data: { pageIndex: pageIndex, pageSize: pageSize, scheduleName: scheduleName, regionId: regionId, scheduleState: scheduleState, validStartTime: validStartTime, validEndTime: validEndTime },
        datatype: 'json',
        async: true,
        beforeSend: function (XMLHttpRequest) {
            $('#cameraScheduleTable').datagrid('loading', "正在加载...");
        },
        success: function (data) {
            if (data.status != 0) {
                alert("视频轮播计划列表加载出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data != null && data.msg.length > 0) {
                    _data = data.msg;
                    $('#cameraScheduleTable').datagrid('loadData', _data);
                    $('#cameraScheduleTable').datagrid('getPager').pagination('refresh',
                        {
                            total: _data.total,
                            pageNumber: pageIndex,
                            pageSize: pageSize
                        })
                    $('#cameraScheduleTable').datagrid('loaded');
                }
                else {
                    _data = [];
                    cameraSchedule.loadScheduleList(pageIndex, pageSize);
                }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
            $('#cameraScheduleTable').datagrid('loaded');

        }
    });
}
//视频巡更列表加载数据
cameraSchedule.loadScheduleList = function (pageIndex, pageSize) {
    /*------------------*/
    $('#cameraScheduleTable').datagrid({
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

        //  onClickRow: function (rowIndex, rowData) { deviceAlarm.GetAlarmPlanItemRecord(rowData.id); ShowTreeByRootEventId(rowData.rootEventId) },
        toolbar: [
        {
            iconCls: 'icon-add',
            text: "添加",
            handler: function () { cameraSchedule.addScheduleBtn(); }
        }
        //, '-',
       //{
       //    iconCls: 'icon-redo',
       //    text: "全部导出",
       //    //handler: function () { drivePlanById(); }
       //}, '-',
       //{
       //    iconCls: 'icon-redo',
       //    text: "导出",
       //    //handler: function () { drivePlanById(); }
       //}
        ],
        columns: [[
            { field: 'ck', checkbox: true },
           // { field: 'id', title: '编号', width: 50, align: "center", sortable: true },
              { field: 'schedule_name', title: '计划任务名称', width: 70, align: "center", sortable: false },
            { field: 'ext10', title: '园区名称', width: 70, align: "center", sortable: false },
            {
                field: 'create_time', title: '创建时间', width: 100, align: "center", sortable: true,
                formatter: function (value, rec) {
                    return Util.changeDateFormat(value);
                }
            },
             {
                 field: 'start_time', title: '有效时间(开始)', width: 120, align: "center", sortable: true,
                 formatter: function (value, rec) {
                     return Util.changeDateFormat(value);
                 }
             },
            {
                field: 'end_time', title: '有效时间(结束)', width: 120, align: "center", sortable: true,
                formatter: function (value, rec) {
                    return Util.changeDateFormat(value);
                }
            },
              {
                  field: 'start_execute_time', title: '执行时间', width: 70, align: "center", sortable: true

              },
             {
                 field: 'ext9', title: '周期', width: 100, align: "center", sortable: false,

                 formatter: function (value, rec) {
                     if (value == "单次") {
                         return "单次(" + rec.execute_date + ")";
                     }
                     else {
                         return value;
                     }
                 }
             },

               //{ field: 'alarmText', title: '报警内容', width: 70, align: "center", sortable: false },
                //{ field: 'group_name', title: '设备组名称', width: 70, align: "center", sortable: false },
                {
                    field: 'group_id', title: '设备查看', width: 70, align: "center", sortable: false,
                    formatter: function (value, rec) {
                        if (rec.group_name != null) {
                            return '<button type="button" class="btn btn-success btn-xs"  onclick=\'cameraSchedule.queryDevice(' + JSON.stringify(rec) + ')\'>' + rec.group_name + '</button>';;
                        }
                        else {
                            return '<button type="button" class="btn btn-success btn-xs" disabled="disabled" onclick=\'cameraSchedule.queryDevice(' + JSON.stringify(rec) + ')\'>设备组不存在</button>';;
                        }

                    }
                },
              {
                  field: 'ext2', title: '是否轮切', width: 40, align: "center", sortable: false,
                  formatter: function (value, rec) {
                      if (value == "1") {
                          return "轮巡";
                      } else if (value == "2") {
                          return "轮切";
                      }
                      else {
                          return "--";
                      }
                  }
              },
                 {
                     field: 'ext7', title: '是否过期', width: 50, align: "center", sortable: false,
                     formatter: function (value, rec) {
                         if (value == "1") {
                             return "未过期";
                         } else if (value == "2") {
                             return "已过期";
                         }
                         else {
                             return "--";
                         }
                     }
                 },
                  {
                      field: 'schedule_state', title: '状态', width: 40, align: "center", sortable: false,
                      formatter: function (value, rec) {
                          if (value == 1) {
                              // return '<button type="button" class="btn btn-success btn-xs"  onclick=\'cameraSchedule.forbidUse(' + JSON.stringify(rec) + ')\'>禁&ensp;&ensp;用</button>';;
                              return ' <img  title="已启用" style="cursor:pointer" src="../scripts/js/plugins/easyui/jquery-easyui-1.5/themes/icons/startuse.png" onclick=\'cameraSchedule.forbidUse(' + JSON.stringify(rec) + ',' + '&quot;禁用&quot;' + ')\'/>';
                          } else if (value == 0) {
                              // return '<button type="button" class="btn btn-danger btn-xs"  onclick=\'cameraSchedule.startUse(' + JSON.stringify(rec) + ')\'>启&ensp;&ensp;用</button>';;
                              return ' <img  title="已禁用" style="cursor:pointer"  src="../scripts/js/plugins/easyui/jquery-easyui-1.5/themes/icons/stopuse.png" onclick=\'cameraSchedule.startUse(' + JSON.stringify(rec) + ',' + '&quot;启用&quot;' + ')\'/>';
                          }
                          else {
                              return "--";
                          }
                      }
                  },
                  {
                      field: 'Id', title: '编辑', width: 80, align: "center", sortable: false,
                      formatter: function (value, rec) {
                          return '<button class="btn btn-xs btn-warning" type="button" onclick=\'cameraSchedule.updateScheduleBtn(' + JSON.stringify(rec) + ')\' >修&ensp;&ensp;改</button>' + '|' + '<button class="btn btn-xs btn-danger" type="button" onclick=\'cameraSchedule.deleteSchedule(' + JSON.stringify(rec) + ')\' >删&ensp;&ensp;除</button>';
                      }
                  },
                    {
                        field: 'delay', title: '延期', width: 40, align: "center", sortable: false,
                        formatter: function (value, rec) {
                            return '<button class="btn btn-xs btn-warning" type="button" onclick=\'cameraSchedule.delaySchedule(' + JSON.stringify(rec) + ')\' >延&ensp;&ensp;期</button>';
                        }
                    },
            {
                field: 'operation', title: '操作', width: 140, align: "center", sortable: false,
                formatter: function (value, rec) {
                    //disabled="true" 
                    if (rec.ext7 == "1" && rec.schedule_state == 1) {
                        if (rec.ext2 == "2") {
                            return '<button class="btn btn-xs btn-primary" type="button"  onclick=\'cameraSchedule.toVideoMonitorCircle(' + JSON.stringify(rec) + ')\' >视频监控轮切</button>';
                        } else if (rec.ext2 == "1") {
                            return '<button class="btn btn-xs btn-primary" type="button"  onclick=\'cameraSchedule.toGallery(' + JSON.stringify(rec) + ')\' >上大屏</button>' + '|' +
                                '<button class="btn btn-xs btn-primary" type="button"  onclick=\'cameraSchedule.toGridMap(' + JSON.stringify(rec) + ')\' >网格地图</button>' + '|' +
                                '<button class="btn btn-xs btn-primary" type="button" onclick=\'cameraSchedule.toVideoMonitor(' + JSON.stringify(rec) + ')\' >视频监控</button>';
                        }
                    }
                    else {
                        if (rec.ext2 == "2") {
                            return '<button class="btn btn-xs btn-primary" type="button" disabled="true"  onclick=\'cameraSchedule.toVideoMonitorCircle(' + JSON.stringify(rec) + ')\' >视频监控轮切</button>';
                        } else if (rec.ext2 == "1") {
                            return '<button class="btn btn-xs btn-primary" type="button" disabled="true"  onclick=\'cameraSchedule.toGallery(' + JSON.stringify(rec) + ')\' >上大屏</button>' + '|' +
                               '<button class="btn btn-xs btn-primary" type="button" disabled="true"  onclick=\'cameraSchedule.toGridMap(' + JSON.stringify(rec) + ')\' >网格地图</button>' + '|' +
                               '<button class="btn btn-xs btn-primary" type="button" disabled="true"   onclick=\'cameraSchedule.toVideoMonitor(' + JSON.stringify(rec) + ')\' >视频监控</button>';
                        }
                    }
                    //} else if (rec.ext7 == "2") {
                    //    if (rec.ext2 == "1") {
                    //        return '<button class="btn btn-xs btn-primary" type="button" disabled="true" onclick=\'cameraSchedule.toVideoMonitorCircle(' + JSON.stringify(rec) + ')\' >视频监控轮切</button>';
                    //    } else if (rec.ext2 == "2") {
                    //        return '<button class="btn btn-xs btn-primary" type="button" disabled="true" onclick=\'cameraSchedule.toGallery(' + JSON.stringify(rec) + ')\' >上大屏</button>' + '|' +
                    //           '<button class="btn btn-xs btn-primary" type="button" disabled="true" onclick=\'cameraSchedule.toGridMap(' + JSON.stringify(rec) + ')\' >网格地图</button>' + '|' +
                    //           '<button class="btn btn-xs btn-primary" type="button" disabled="true"  onclick=\'cameraSchedule.toVideoMonitor(' + JSON.stringify(rec) + ')\' >视频监控</button>';
                    //    }
                    //}
                }
            }
        ]],
        onLoadSuccess: function (data) {

        },
        onLoadError: function (data) {
            alert('加载失败');
        }

    });
    $('#cameraScheduleTable').datagrid('getPager').pagination({//分页栏下方文字显示
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
            cameraSchedule.getScheduleList(pageIndex, pageSize);
        },
        onSelectPage: function (pageNumber, pageSize) {
            //下一页
            //pageIndex = pageNumber;

            cameraSchedule.getScheduleList(pageNumber, pageSize);
        },
        onChangePageSize: function (pageNumber, pageSize) {

        },
        onRefresh: function (pageNumber, pageSize) {
            //pageIndex = pageNumber;
            // 刷新按钮
            cameraSchedule.getScheduleList(pageNumber, pageSize);
        }
    });
}
//启用
cameraSchedule.startUse = function (data) {
    if (confirm("确认启用？")) {
        var id = data.id;
        $.ajax({
            url: "/Schedule/UpdateScheduleState",
            type: "post",
            data: { id: id, state: 1 },
            datatype: 'json',
            async: true,
            success: function (data) {
                alert(data.msg);
                if (data.status == 0) {
                    cameraSchedule.getScheduleList(pageIndex, pageSize);
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }

}
//禁用
cameraSchedule.forbidUse = function (data) {
    if (confirm("确认禁用？")) {
        var id = data.id;
        $.ajax({
            url: "/Schedule/UpdateScheduleState",
            type: "post",
            data: { id: id, state: 0 },
            datatype: 'json',
            async: true,
            success: function (data) {
                alert(data.msg);
                if (data.status == 0) {
                    cameraSchedule.getScheduleList(pageIndex, pageSize);
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }

}
//更新计划按钮
cameraSchedule.updateScheduleBtn = function (data) {
    updateId = data.id;//视频轮播ID
    if ($("#configDiv").css('display') == 'block') {
        $("#configDiv").dialog('open');  //显示配置DIV
    }
    $("#saveBtn").unbind("click"); //解除绑定
    $("#saveBtn").bind("click", cameraSchedule.updateSchedule);//绑定事件
    //给各个元素赋值
    $("#scheduleNameInput").val(data.schedule_name);
    // $("#regionConfigSelect").find("option[value='" + data.region_id + "']").attr("selected", true); //设置选中园区
    var index = cameraSchedule.getSelectValues("#regionConfigSelect option");
    if (index == -1) {
        $("#regionConfigSelect").find("option[value=-100]").attr("selected", true); //设置选中园区
    }
    else {
        $("#regionConfigSelect").find("option[value='" + data.region_id + "']").attr("selected", true); //设置选中园区
    }
    cameraSchedule.regionChange();
    $("#deviceGroupSelect").find("option[value='" + data.group_id + "']").attr("selected", true);//设置设备组，需要多级联动
    $("#startTimeInput").val(Util.changeDateFormat(data.start_time));
    $("#endTimeInput").val(Util.changeDateFormat(data.end_time));
    $("#executeTimeInput").val(data.start_execute_time); //设置执行开始时间


    if (data.ext2 == "2") {  //轮切
        $(".tr_none").show();
        $('#singleGalleryCheckBox').prop('checked', true);  //设置是否轮巡，轮切
        // $('#galleryCodeSelect option:selected').text(data.ext3);  //设置屏编码,需要多级联动
        $("#galleryCodeSelect").find("option[value='" + data.ext3 + "']").attr("selected", true);//设置屏编码,需要多级联动
        $("#galleryInterval").val(parseInt(data.ext4));           //设置轮巡频率
    }
    else {  //轮巡
        $(".tr_none").hide();
        $('#singleGalleryCheckBox').prop('checked', false);  //设置是否轮巡，轮切

    }
    // $("input[type=radio][name=datetime]['" + parseInt(data.ext9) + "']").attr("checked", 'checked');
    // $("input[type=radio][name=datetime]['" + parseInt(data.ext9) + "']").prop("checked", 'checked'); //设置选中周期
    $("input[type=radio][name=datetime][value='" + data.cronTime.pType + "']").prop("checked", 'checked'); //设置选中周期
    if (data.cronTime.pType == 0) {
        $(".frenone0").show();
        $(".frenone").show();
        $(".frenone1").hide();
        $(".frenone2").hide();
        $(".frenone3").hide();
        $(".frenone4").hide();
        if (data.execute_date != null || data.execute_date != undefined) {
            $("#scheduleDateInput").val(data.execute_date);
        }
    }
    else if (data.cronTime.pType == 1)   //天
    {
        $(".frenone").show();
        $(".frenone0").hide();
        $(".frenone1").show();
        $(".frenone2").hide();
        $(".frenone3").hide();
        $(".frenone4").hide();
        $("input[type=radio][name=daytime][value='" + data.cronTime.cType + "']").prop("checked", 'checked');
        if (data.cronTime.cType == 1) {
            $("#daySpanInput").val(data.cronTime.span);
        }
    }
    else if (data.cronTime.pType == 2)   //周
    {
        $(".frenone").show();
        $(".frenone2").show();
        $(".frenone0").hide();
        $(".frenone1").hide();
        $(".frenone3").hide();
        $(".frenone4").hide();
        $("#weekSpanInput").val(data.cronTime.span);
        for (var i = 0; i < data.cronTime.weekDayArray.length; i++) {
            $("input[type=checkbox][name=weekCheck][value='" + data.cronTime.weekDayArray[i] + "']").attr('checked', 'true');
        }
    }
    else if (data.cronTime.pType == 3)  //月
    {
        $(".frenone").show();
        $(".frenone3").show();
        $(".frenone0").hide();
        $(".frenone1").hide();
        $(".frenone2").hide();
        $(".frenone4").hide();
        $("input[type=radio][name=monthtime][value='" + data.cronTime.cType + "']").prop("checked", 'checked');
        if (data.cronTime.cType == 1) {
            $("#fMonthSpanInput").val(data.cronTime.span);
            $("#monthDayInput").val(data.cronTime.week);
            $("#monthDayPeriodSelect").find("option[value='" + data.cronTime.order + "']").attr("selected", true);//设置前/后天
        }
        else if (data.cronTime.cType == 2) {
            $("#sMonthSpanInput").val(data.cronTime.span);
            $("#monthOrderSelect").find("option[value='" + data.cronTime.order + "']").attr("selected", true);//设置顺序
            $("#monthWeekSelect").find("option[value='" + data.cronTime.week + "']").attr("selected", true);//设置周几
        }
    }
    else if (data.cronTime.pType == 4)  //年
    {
        $(".frenone").show();
        $(".frenone4").show();
        $(".frenone0").hide();
        $(".frenone1").hide();
        $(".frenone2").hide();
        $(".frenone3").hide();
        $("#yearSpanInput").val(data.cronTime.span);
        $("input[type=radio][name=yeartime][value='" + data.cronTime.cType + "']").prop("checked", 'checked');
        if (data.cronTime.cType == 1) {
            $("#fYearMonthPeriodSelect").find("option[value='" + data.cronTime.time + "']").attr("selected", true);//设置月份
            $("#yearDayPeriodSelect").find("option[value='" + data.cronTime.order + "']").attr("selected", true);//设置月份
            $("#yearDayInput").val(data.cronTime.week);                                                          //设置第几天
        }
        else if (data.cronTime.cType == 2) {
            $("#sYearMonthPeriodSelect").find("option[value='" + data.cronTime.time + "']").attr("selected", true);//设置月份
            $("#yearOrderSelect").find("option[value='" + data.cronTime.order + "']").attr("selected", true);//设置月份
            $("#yearWeekSelect").find("option[value='" + data.cronTime.week + "']").attr("selected", true);//设置月份
        }
    }

    //if (data.ext9 == "1") {
    //    $("#periodSelectTr").show();
    //    $("#periodSelect").find("option[value='" + data.ext8 + "']").attr("selected", true); //设置周期数
    //}
    $("#contentText").val(data.content);
}
//删除计划
cameraSchedule.deleteSchedule = function (data) {
    if (confirm("是否删除计划？")) {
        var id = data.id;
        $.ajax({
            url: "/Schedule/UpdateScheduleState",
            type: "post",
            data: { id: id, state: -1 },
            datatype: 'json',
            async: true,
            success: function (data) {
                alert(data.msg);
                if (data.status == 0) {
                    cameraSchedule.getScheduleList(pageIndex, pageSize);
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }
}
//延期
cameraSchedule.delaySchedule = function (data) {
    if ($("#delayTimeDiv").css('display') == 'block') {
        $("#delayTimeDiv").dialog('open');
    }
    delayId = data.id;
    delayEndTime = Util.changeDateFormat(data.end_time);
    $("#delayTimeScheduleName").html(data.schedule_name);
}
//保存延期时间按钮
cameraSchedule.delayTimeSaveBtn = function () {
    if (delayId != 0) {
        var delayTimeRadioValue = $('input:radio[name="delayTimeRadios"]:checked').val();
        if (delayTimeRadioValue != undefined || delayTimeRadioValue != null) {
            $.ajax({
                url: "/Schedule/UpdateScheduleDeadLine",
                type: "post",
                data: { id: delayId, month: delayTimeRadioValue, endTime: delayEndTime },
                datatype: 'json',
                async: true,
                success: function (data) {
                    alert(data.msg);
                    if (data.status == 0) {
                        $("#delayTimeDiv").dialog('close'); //隐藏配置DIV
                        cameraSchedule.getScheduleList(pageIndex, pageSize);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status + "错误请联系管理员！");
                }

            })
        }
        else {
            alert("请选择延期时间！");
        }
    }
    else { alert("请选择延期的计划任务！"); }
}
//取消延期时间按钮
cameraSchedule.delayTimeCancelBtn = function () {
    $("#delayTimeDiv").dialog('close');
}
//视频监控轮切
cameraSchedule.toVideoMonitorCircle = function (rec) {
    //if (data.ext3 == "" || data.ext3 == null) {
    //    alert("未设置轮切屏编码!");
    //    return;
    //}
    //if (data.ext4 == "" || data.ext4 == null) {
    //    alert("未设置轮切间隔!");
    //    return;
    //}
    if (rec.group_id == 0) {
        alert("设备组为空！");
        return;
    }
    $.ajax({
        url: "/Schedule/GetCameraPatrolDeviceByGroupId",
        type: "post",
        data: { groupId: rec.group_id },
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0 && data.msg != null) {
                window.location.href('/Video/Index?type=switch&&groupId=' + rec.group_id);
            }
            else {
                alert(data.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })

}
//视频监控
cameraSchedule.toVideoMonitor = function (rec) {
    if (rec.group_id == 0) {
        alert("设备组为空！");
        return;
    }
    $.ajax({
        url: "/Schedule/GetCameraPatrolDeviceByGroupId",
        type: "post",
        data: { groupId: rec.group_id },
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0 && data.msg != null) {
                window.location.href('/Video/Index?type=monitor&&groupId=' + rec.group_id);
            }
            else {
                alert(data.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })

}
//上大屏
cameraSchedule.toGallery = function (data) {
    galleryControl.monitorStartLive(data);
}
//上网格地图
cameraSchedule.toGridMap = function (rec) {
    if (rec.group_id == 0) {
        alert("设备组为空！");
        return;
    }
    $.ajax({
        url: "/Schedule/GetCameraPatrolDeviceByGroupId",
        type: "post",
        data: { groupId: rec.group_id },
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0 && data.msg != null) {
                window.location.href('/Map/Index?type=monitor&&groupId=' + rec.group_id);
            }
            else {
                alert(data.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}

//添加任务按钮
cameraSchedule.addScheduleBtn = function () {
    if ($("#configDiv").css('display') == 'block') {
        $("#scheduleNameInput").val("");
        $("#startTimeInput").val("");
        $("#endTimeInput").val("");
        $("#executeTimeInput").val("");
        $("#scheduleDateInput").val("");
        //$("#regionConfigSelect").find("option[value='0']").attr("selected", true); //设置选中园区
        if ($.cookie("mainControlRegionId")) {
            var mainControlRegion = $.cookie("mainControlRegionId");
            $("#regionConfigSelect").find("option[value=" + mainControlRegion + "]").attr("selected", true);
            cameraSchedule.regionChange();
        }
        else {
            $("#regionConfigSelect").find("option[value='0']").attr("selected", true); //设置选中园区
        }
        $("input[type=radio][name=datetime][value='1']").prop("checked", 'checked'); //设置选中周期
        $(".frenone0").hide();
        $(".frenone3").hide();
        $(".frenone1").show();
        $(".frenone2").hide();
        $(".frenone4").hide();
        $(".frenone").show();
        $("#configDiv").dialog('open');  //显示配置DIV
        $("#saveBtn").unbind("click"); //解除绑定
        $("#saveBtn").bind("click", cameraSchedule.addSchedule);//绑定事件
    }
}
//添加任务确定按钮
cameraSchedule.addSchedule = function () {
    var scheduleName = $("#scheduleNameInput").val(); //计划任务名称
    var regionId = $('#regionConfigSelect option:selected').val();  //园区ID
    var deviceGroupId = $('#deviceGroupSelect option:selected').val(); //设备组ID
    var startTime = $("#startTimeInput").val();                        //开始时间
    var endTime = $("#endTimeInput").val();                            //截止时间
    var cameraPatrolType = 1;                                          //轮播方式，1:轮巡，2轮切，默认轮巡
    var timeType = $('input:radio[name="datetime"]:checked').val();    //时间间隔类型
    //var frequency = 1;                                                 //周期
    var startExecuteTime = $("#executeTimeInput").val();               //执行开始时间
    var endExecuteTime = "";                                           //执行结束时间
    var periodExpression = "";
    var galleryCode = "";                                               //屏幕编号
    var galleryInterval = 0;                                            //轮询间隔
    var contentText = $("#contentText").val();                          //描述
    var spanTime = 0;
    var scheduleDate = "";


    if (timeType == "0") {
        scheduleDate = $("#scheduleDateInput").val();
        if (scheduleDate == "" || scheduleDate == null) {
            alert("请输入执行日期！");
            return;
        }
        if (scheduleDate + " " + startExecuteTime > endTime || scheduleDate + " " + startExecuteTime < startTime) {
            alert("执行时间不在有效时间范围内！");
            return;
        }
    }
    else if (timeType == "1") {
        var daySelect = $('input:radio[name="daytime"]:checked').val();
        if (daySelect == "1") {
            var daySpanInput = $("#daySpanInput").val();
            if (daySpanInput != "" && daySpanInput != null && daySpanInput > 0) {
                periodExpression = "C/" + $("#daySpanInput").val() + "|*|*|?";
            }
            else {
                alert("请输入日期！");
                return;
            }
        } else if (daySelect == "2") {
            periodExpression = "W|*|*|?";
        }
        else if (daySelect == "3") {
            periodExpression = "H|*|*|?";
        }
        else {
            alert("请选择按天定期模式！");
            return;
        }
    }
    else if (timeType == "2") {
        var weekSpan = $("#weekSpanInput").val();
        var weekLen = $("input:checkbox[name='weekCheck']:checked").length;
        var array = new Array();
        if (weekSpan != null && weekSpan != "") {
            if (weekLen > 0) {
                periodExpression += "?|*|*|C/" + weekSpan + "@";
                //$("input[name='weekCheck'][checked]").each(function(){
                //    if (true == $(this).attr("checked")) {
                //        alert( $(this).attr('value') );
                //    }
                $("input:checkbox[name='weekCheck']:checked").each(function () {
                    array.push($(this).attr('value'));//获取所有选择的星期数
                })
                var newArr = array.join("+");
                periodExpression += newArr;  //待测试
            }
            else {
                alert("请选择重复星期！");
                return;
            }
        }
        else {
            alert("请输入间隔周数！");
            return;
        }
    }
    else if (timeType == "3") {
        var monthRadio = $('input:radio[name="monthtime"]:checked').val();
        if (monthRadio == "1") {
            var fMonthSpan = $("#fMonthSpanInput").val();
            var monthDayPeriod = $('#monthDayPeriodSelect option:selected').val();
            var monthDayInput = $("#monthDayInput").val();
            if (monthDayPeriod == "1") {
                monthDayPeriod = "F";
            }
            else if (monthDayPeriod == "5") {
                monthDayPeriod = "L";
            }
            if (fMonthSpan == "" || fMonthSpan == null || fMonthSpan < 1) {
                alert("请输入间隔月份！");
                return;
            }
            if (monthDayInput == null || monthDayInput == "" || monthDayInput < 1) {
                alert("请输入日期！");
                return;
            }
            periodExpression = monthDayPeriod + "#" + monthDayInput + "|C/" + fMonthSpan + "|*|?";
        }
        else if (monthRadio == "2") {
            var sMonthSpanInput = $("#sMonthSpanInput").val();
            var monthOrderSelect = $("#monthOrderSelect  option:selected").val();
            var monthWeekSelect = $("#monthWeekSelect  option:selected").val();
            if (sMonthSpanInput == "" || sMonthSpanInput == null || sMonthSpanInput < 1) {
                alert("请输入间隔月份！");
                return;
            }
            if (monthOrderSelect == "1") {
                monthOrderSelect = "F";
            }
            else if (monthOrderSelect == "2") {
                monthOrderSelect = "S";
            }
            else if (monthOrderSelect == "3") {
                monthOrderSelect = "T";
            }
            else if (monthOrderSelect == "4") {
                monthOrderSelect = "R";
            }
            else if (monthOrderSelect == "5") {
                monthOrderSelect = "L";
            }
            if (monthWeekSelect == "7") {
                monthWeekSelect = "W";
            }
            else if (monthWeekSelect == "8") {
                monthWeekSelect = "H";
            }
            periodExpression = "?|C/" + sMonthSpanInput + "|*|" + monthOrderSelect + "#" + monthWeekSelect;
        }
        else {
            alert("请选择按月定期模式！");
            return;
        }
    }
    else if (timeType == "4") {
        var yearSpan = $("#yearSpanInput").val();
        var yearRadio = $('input:radio[name="yeartime"]:checked').val();
        if (yearSpan != null && yearSpan != "" && yearSpan > 0) {
            if (yearRadio == "1") {
                var fYearMonthPeriodSelect = $("#fYearMonthPeriodSelect  option:selected").val();
                var yearDayPeriodSelect = $("#yearDayPeriodSelect  option:selected").val();
                var yearDayInput = $("#yearDayInput").val();
                if (yearDayPeriodSelect == "1") {
                    yearDayPeriodSelect = "F";
                }
                else if (yearDayPeriodSelect == "5") {
                    yearDayPeriodSelect = "L";
                }
                if (yearDayInput != null && yearDayInput != "" && yearDayInput > 0) {
                    periodExpression = yearDayPeriodSelect + "#" + yearDayInput + "|" + fYearMonthPeriodSelect + "|C/" + yearSpan + "|?";
                }
                else {
                    alert("请输入按年定期模式中的日期！");
                    return;
                }
            }
            else if (yearRadio == "2") {
                var sYearMonthPeriodSelect = $("#sYearMonthPeriodSelect  option:selected").val();
                var yearOrderSelect = $("#yearOrderSelect  option:selected").val();
                var yearWeekSelect = $("#yearWeekSelect  option:selected").val();
                if (yearOrderSelect == "1") {
                    yearOrderSelect = "F";
                }
                else if (yearOrderSelect == "2") {
                    yearOrderSelect = "S";
                }
                else if (yearOrderSelect == "3") {
                    yearOrderSelect = "T";
                }
                else if (yearOrderSelect == "4") {
                    yearOrderSelect = "R";
                }
                else if (yearOrderSelect == "5") {
                    yearOrderSelect = "L";
                }
                if (yearWeekSelect == "7") {
                    yearWeekSelect = "W";
                }
                else if (yearWeekSelect == "8") {
                    yearWeekSelect = "H";
                }
                periodExpression = "?|" + sYearMonthPeriodSelect + "|C/" + yearSpan + "|" + yearOrderSelect + "#" + yearWeekSelect;
            }
            else {
                alert("请选择按年定期模式！");
                return;
            }
        }
        else {
            alert("请输入间隔年数!");
            return;
        }
    }
    if ($("#singleGalleryCheckBox").is(':checked')) {
        //if ($('#singleGalleryCheckBox').attr('checked')) {
        galleryCode = $('#galleryCodeSelect option:selected').val(); //取监视器编码
        galleryInterval = $("#galleryInterval").val();
        cameraPatrolType = 2;
        if (galleryCode == null || galleryCode == "" || galleryCode == undefined) {
            alert("请选择屏幕编码！");
            return;
        }
        if (galleryInterval > 60 || galleryInterval < 1) {
            alert("请重新选择轮巡间隔！");
            return;
        }
    }
    //值校验
    if (scheduleName == null || scheduleName == "") {
        alert("请输入任务名称！");
        return;
    }
    if (regionId == null || regionId == -100) {
        alert("请选择园区！");
        return;
    }
    if (deviceGroupId == null || deviceGroupId == -100) {
        alert("请选择设备组！");
        return;
    }
    if (startTime == null || startTime == "") {
        alert("请选择有效开始时间！");
        return;
    }
    if (endTime == null || endTime == "") {
        alert("请选择有效截止时间！");
        return;
    }
    if (startExecuteTime == null || startExecuteTime == "") {
        alert("请选择开始执行时间！");
        return;
    }
    if (startExecuteTime == null || startExecuteTime == "") {
        alert("请选择执行时间！");
        return;
    }
    $.ajax({
        url: "/Schedule/AddCameraPatrolSchedule",
        type: "post",
        data: { scheduleName: scheduleName, regionId: regionId, deviceGroupId: deviceGroupId, startTime: startTime, endTime: endTime, startExecuteTime: startExecuteTime, endExecuteTime: endExecuteTime, periodExpression: periodExpression, cameraPatrolType: cameraPatrolType, galleryCode: galleryCode, galleryInterval: galleryInterval, contentText: contentText, spanTime: spanTime, scheduleDate: scheduleDate },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {

                $("#configDiv").dialog('close');  //隐藏配置DIV
                cameraSchedule.getScheduleList(pageIndex, pageSize);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }

    })
}
//修改任务确定按钮
cameraSchedule.updateSchedule = function () {
    var scheduleName = $("#scheduleNameInput").val(); //计划任务名称
    var regionId = $('#regionConfigSelect option:selected').val();  //园区ID
    var deviceGroupId = $('#deviceGroupSelect option:selected').val(); //设备组ID
    var startTime = $("#startTimeInput").val();                        //开始时间
    var endTime = $("#endTimeInput").val();                            //截止时间
    var cameraPatrolType = 1;                                          //轮播方式，1:轮切，2轮巡，默认轮切
    var startExecuteTime = $("#executeTimeInput").val();               //执行开始时间
    var endExecuteTime = "";                                           //执行结束时间
    var periodExpression = "";
    var timeType = $('input:radio[name="datetime"]:checked').val();    //时间间隔类型
    //var frequency = 0;                                                 //周期
    var galleryCode = "";                                               //屏幕编号
    var galleryInterval = 0;                                            //轮询间隔
    var contentText = $("#contentText").val();                          //描述
    //if (timeType == "1") {
    //    frequency = $('#periodSelect option:selected').val();
    //}

    var spanTime = 0;
    var scheduleDate = "";


    if (timeType == "0") {
        scheduleDate = $("#scheduleDateInput").val();
        if (scheduleDate == "" || scheduleDate == null) {
            alert("请输入执行日期！");
            return;
        }
        if (scheduleDate + " " + startExecuteTime > endTime || scheduleDate + " " + startExecuteTime < startTime) {
            alert("执行时间不在有效时间范围内！");
            return;
        }
    }
    else if (timeType == "1") {
        var daySelect = $('input:radio[name="daytime"]:checked').val();
        if (daySelect == "1") {
            var daySpanInput = $("#daySpanInput").val();
            if (daySpanInput != "" && daySpanInput != null && daySpanInput > 0) {
                periodExpression = "C/" + $("#daySpanInput").val() + "|*|*|?";
            }
            else {
                alert("请输入间隔日期！");
                return;
            }
        } else if (daySelect == "2") {
            periodExpression = "W|*|*|?";
        }
        else if (daySelect == "3") {
            periodExpression = "H|*|*|?";
        }
        else {
            alert("请选择按天定期模式！");
            return;
        }
    }
    else if (timeType == "2") {
        var weekSpan = $("#weekSpanInput").val();
        var weekLen = $("input:checkbox[name='weekCheck']:checked").length;
        var array = new Array();
        if (weekSpan != null && weekSpan != "" && weekSpan > 0) {
            if (weekLen != 0) {
                periodExpression += "?|*|*|C/" + weekSpan + "@";
                //$("input[name='weekCheck'][checked]").each(function(){
                //    if (true == $(this).attr("checked")) {
                //        alert( $(this).attr('value') );
                //    }
                $("input:checkbox[name='weekCheck']:checked").each(function () {
                    array.push($(this).attr('value'));//获取所有选择的星期数
                })
                var newArr = array.join("+");
                periodExpression += newArr;  //待测试
            }
            else {
                alert("请选择星期！");
                return;
            }
        }
        else {
            alert("请输入间隔周数！");
            return;
        }
    }
    else if (timeType == "3") {
        var monthRadio = $('input:radio[name="monthtime"]:checked').val();
        if (monthRadio == "1") {
            var fMonthSpan = $("#fMonthSpanInput").val();
            var monthDayPeriod = $('#monthDayPeriodSelect option:selected').val();
            var monthDayInput = $("#monthDayInput").val();
            if (monthDayPeriod == "1") {
                monthDayPeriod = "F";
            }
            else if (monthDayPeriod == "5") {
                monthDayPeriod = "L";
            }
            if (fMonthSpan == "" || fMonthSpan == null || fMonthSpan < 1) {
                alert("请输入间隔月份！");
                return;
            }
            if (monthDayInput == null || monthDayInput == "" || monthDayInput < 1) {
                alert("请输入日期！");
                return;
            }
            periodExpression = monthDayPeriod + "#" + monthDayInput + "|C/" + fMonthSpan + "|*|?";
        }
        else if (monthRadio == "2") {
            var sMonthSpanInput = $("#sMonthSpanInput").val();
            var monthOrderSelect = $("#monthOrderSelect  option:selected").val();
            var monthWeekSelect = $("#monthWeekSelect  option:selected").val();
            if (sMonthSpanInput == "" || sMonthSpanInput == null || sMonthSpanInput < 1) {
                alert("请输入间隔月份！");
                return;
            }
            if (monthOrderSelect == "1") {
                monthOrderSelect = "F";
            }
            else if (monthOrderSelect == "2") {
                monthOrderSelect = "S";
            }
            else if (monthOrderSelect == "3") {
                monthOrderSelect = "T";
            }
            else if (monthOrderSelect == "4") {
                monthOrderSelect = "R";
            }
            else if (monthOrderSelect == "5") {
                monthOrderSelect = "L";
            }
            if (monthWeekSelect == "7") {
                monthWeekSelect = "W";
            }
            else if (monthWeekSelect == "8") {
                monthWeekSelect = "H";
            }
            periodExpression = "?|C/" + sMonthSpanInput + "|*|" + monthOrderSelect + "#" + monthWeekSelect;
        }
        else {
            alert("请选择按月定期模式！");
            return;
        }
    }
    else if (timeType == "4") {
        var yearSpan = $("#yearSpanInput").val();
        var yearRadio = $('input:radio[name="yeartime"]:checked').val();
        if (yearSpan != null && yearSpan != "" && yearSpan > 0) {
            if (yearRadio == "1") {
                var fYearMonthPeriodSelect = $("#fYearMonthPeriodSelect  option:selected").val();
                var yearDayPeriodSelect = $("#yearDayPeriodSelect  option:selected").val();
                var yearDayInput = $("#yearDayInput").val();
                if (yearDayPeriodSelect == "1") {
                    yearDayPeriodSelect = "F";
                }
                else if (yearDayPeriodSelect == "5") {
                    yearDayPeriodSelect = "L";
                }
                if (yearDayInput != null && yearDayInput != "") {
                    periodExpression = yearDayPeriodSelect + "#" + yearDayInput + "|" + fYearMonthPeriodSelect + "|C/" + yearSpan + "|?";
                }
                else {
                    alert("请输入按年定期模式中的日期！");
                    return;
                }
            }
            else if (yearRadio == "2") {
                var sYearMonthPeriodSelect = $("#sYearMonthPeriodSelect  option:selected").val();
                var yearOrderSelect = $("#yearOrderSelect  option:selected").val();
                var yearWeekSelect = $("#yearWeekSelect  option:selected").val();
                if (yearOrderSelect == "1") {
                    yearOrderSelect = "F";
                }
                else if (yearOrderSelect == "2") {
                    yearOrderSelect = "S";
                }
                else if (yearOrderSelect == "3") {
                    yearOrderSelect = "T";
                }
                else if (yearOrderSelect == "4") {
                    yearOrderSelect = "R";
                }
                else if (yearOrderSelect == "5") {
                    yearOrderSelect = "L";
                }
                if (yearWeekSelect == "7") {
                    yearWeekSelect = "W";
                }
                else if (yearWeekSelect == "8") {
                    yearWeekSelect = "H";
                }
                periodExpression = "?|" + sYearMonthPeriodSelect + "|C/" + yearSpan + "|" + yearOrderSelect + "#" + yearWeekSelect;
            }
            else {
                alert("请选择按年定期模式！");
                return;
            }
        }
        else {
            alert("请输入间隔年数!");
            return;
        }
    }
    if ($('#singleGalleryCheckBox').is(':checked')) {
        galleryCode = $('#galleryCodeSelect option:selected').val();
        galleryInterval = $("#galleryInterval").val();
        cameraPatrolType = 2;
        if (galleryCode == null || galleryCode == "" || galleryCode == undefined) {
            alert("请选择屏幕编码！");
            return;
        }
        if (galleryInterval > 60 || galleryInterval < 1) {
            alert("请重新选择轮巡间隔！");
            return;
        }
    }
    //值校验
    if (scheduleName == null || scheduleName == "") {
        alert("请输入任务名称！");
        return;
    }
    if (regionId == null || regionId == -100) {
        alert("请选择园区！");
        return;
    }
    if (deviceGroupId == null || deviceGroupId == -100) {
        alert("请选择设备组！");
        return;
    }
    if (startTime == null || startTime == "") {
        alert("请选择开始时间！");
        return;
    }
    if (endTime == null || endTime == "") {
        alert("请选择截止时间！");
        return;
    }
    if (startExecuteTime == null || startExecuteTime == "") {
        alert("请选择执行时间！");
        return;
    }
    $.ajax({
        url: "/Schedule/UpdateCameraPatrolSchedule",
        type: "post",
        data: {
            id: updateId, scheduleName: scheduleName, regionId: regionId, deviceGroupId: deviceGroupId, startTime: startTime, endTime: endTime, startExecuteTime: startExecuteTime, endExecuteTime: endExecuteTime, periodExpression: periodExpression, cameraPatrolType: cameraPatrolType, galleryCode: galleryCode, galleryInterval: galleryInterval, contentText: contentText, spanTime: spanTime, scheduleDate: scheduleDate
        },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {
                $("#configDiv").dialog('close');  //隐藏配置DIV
                cameraSchedule.getScheduleList(pageIndex, pageSize);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }

    })
}
//园区下拉框改变事件，与设备分组联动
cameraSchedule.regionChange = function () {
    $("#deviceGroupSelect").empty(); //移除子元素
    $("#galleryCodeSelect").empty();
    var regionId = $('#regionConfigSelect option:selected').val();//获取被选中的园区ID
    if (regionId == -100 || regionId == undefined || regionId == null) {
        //alert("请选择园区！");
    }
    else {
        $.ajax({
            url: "/Schedule/GetCameraPatrolDeviceGroupInfoByRegion",
            type: "post",
            data: {
                region: regionId
            },
            datatype: 'json',
            async: false,
            success: function (data) {
                //  alert(data.msg);
                if (data.status == 0) {
                    var datas = data.msg;
                    var groupHtml = "";
                    var galleryHtml = "";
                    //拼接摄像头组下拉框html
                    if (datas.cameraGroup != null) {
                        for (var i = 0; i < datas.cameraGroup.length; i++) {
                            groupHtml += "<option value=" + datas.cameraGroup[i].key + ">" + datas.cameraGroup[i].value + "</option>";
                        }
                    }

                    //拼接大屏下拉框html
                    if (datas.gallery != null) {
                        for (var i = 0; i < datas.gallery.length; i++) {
                            galleryHtml += "<option value=" + datas.gallery[i].galleryCode + ">" + datas.gallery[i].galleryName + "</option>";
                        }
                    }
                    $("#deviceGroupSelect").append(groupHtml);
                    $("#galleryCodeSelect").append(galleryHtml);
                }
                else {
                    alert(data.msg);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }

}
//编辑取消按钮
cameraSchedule.cancel = function () {
    $("#configDiv").dialog('close');  //隐藏配置DIV
}
//查看设备组
cameraSchedule.queryDevice = function (device) {
    var group_id = device.group_id;
    $("#deviceDetailUl").empty();//先清空列表
    if ($("#deviceDetailDiv").css('display') == 'block') {
        $("#deviceDetailDiv").dialog('open');
        $("#configDiv").dialog('close');
    }
    $.ajax({
        url: "/Schedule/GetCameraPatrolDeviceByGroupId",
        type: "post",
        data: {
            groupId: group_id
        },
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data.status == 0) {
                var datas = data.msg;
                var deviceHtml = "";
                //拼接摄像头组下拉框html
                for (var i = 0; i < datas.length; i++) {
                    if (datas[i].device_type == 1 || datas[i].device_type == 3) {
                        deviceHtml += "<li class='col-xs-6'><img src='../images/groupIcon/摄像头.png'>" + datas[i].device_name + "</li>";
                    }
                    else if (datas[i].device_type == 2 || datas[i].device_type == 4) {
                        deviceHtml += "<li class='col-xs-6'><img src='../images/groupIcon/球机.png'>" + datas[i].device_name + "</li>";
                    }
                }
                $("#deviceDetailUl").append(deviceHtml);
            }
            else {
                alert(data.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//园区编辑
cameraSchedule.editorRegion = function () {
    if (confirm("是否跳转到园区编辑页面？")) {
        window.location.href = "/Config/Map";
    }
}
//设备组编辑
cameraSchedule.editorDeviceGroup = function () {
    if (confirm("是否跳转到设备组编辑页面？")) {
        window.location.href = "/Config/DeviceList";
    }
}
//获取select框下是否含有value值的选项
cameraSchedule.getSelectValues = function (selectId, values) {
    var array = new Array();
    $(selectId).each(function () {
        array.push($(this).val());
    })
    return $.inArray(values, array);
}
//日期获取焦点事件
dayRadioChange = function () {
    $("input[type=radio][name=daytime][value='1']").prop("checked", 'checked');
}
//月获取焦点事件(第一选项)
monthFirstRadioChange = function () {
    $("input[type=radio][name=monthtime][value='1']").prop("checked", 'checked');
}
//月获取焦点事件(第二选项)
monthSecondRadioChange = function () {
    $("input[type=radio][name=monthtime][value='2']").prop("checked", 'checked');
}
//年获取焦点事件(第一选项)
yearFirstRadioChange = function () {
    $("input[type=radio][name=yeartime][value='1']").prop("checked", 'checked');
}
//年获取焦点事件(第二选项)
yearSecondRadioChange = function () {
    $("input[type=radio][name=yeartime][value='2']").prop("checked", 'checked');
}



