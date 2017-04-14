var assetInspection = {};
var pageSize = 20; //默认初始化每页行数
var pageIndex = 1;  //默认起始页面
var delayId;  //延期计划ID
var delayEndTime;//待延期的截止时间
var updateId = 0;//待修改的计划ID
var _data = [];   //报警列表加载数据

//初始化加载
$(function () {
    $("#assetConfigDiv").dialog('close');//关闭配置弹窗
    $("#delayTimeDiv").dialog('close');
    if ($.cookie("mainControlRegionId")) {
        var mainControlRegion = $.cookie("mainControlRegionId");
        $("#regionSelectQuery").find("option[value=" + mainControlRegion + "]").attr("selected", true);
        $("#regionConfigSelect").find("option[value=" + mainControlRegion + "]").attr("selected", true);
    }
    assetInspection.getScheduleList(pageIndex, pageSize);
})



//获取视频巡更列表
assetInspection.queryScheduleListBtn = function () {
    //var assetType = $('#scheduleTypeSelectQuery option:selected').val();
    var assetType = 2;
    var regionId = $('#regionSelectQuery option:selected').val();
    var validStartTime = $("#startTime").val();
    var validEndTime = $("#endTime").val();
    assetInspection.queryScheduleList(pageIndex, pageSize, assetType, regionId, validStartTime, validEndTime);
    assetInspection.loadScheduleList(pageIndex, pageSize);
}
//获取资产巡检列表
assetInspection.getScheduleList = function (pageIndex, pageSize) {
    //var assetType = $('#scheduleTypeSelectQuery option:selected').val();
    var assetType = 2;
    var regionId = $('#regionSelectQuery option:selected').val();
    var validStartTime = $("#startTime").val();
    var validEndTime = $("#endTime").val();
    assetInspection.loadScheduleList(pageIndex, pageSize);
    assetInspection.queryScheduleList(pageIndex, pageSize, assetType, regionId, validStartTime, validEndTime);
    //assetInspection.queryScheduleList(pageIndex, pageSize, assetType, regionId, validStartTime, validEndTime);
}

//查询资产巡检列表
assetInspection.queryScheduleList = function (pageIndex, pageSize, assetType, regionId, validStartTime, validEndTime) {
    $.ajax({
        url: "/Schedule/GetAssetInspectionList",
        type: "post",
        data: { pageIndex: pageIndex, pageSize: pageSize, assetType: assetType, regionId: regionId, startTime: validStartTime, endTime: validEndTime },
        datatype: 'json',
        async: true,
        beforeSend: function (XMLHttpRequest) {
            $('#assetScheduleTable').datagrid('loading', "正在加载...");
        },
        success: function (data) {
            if (data.status != 0) {
                alert("资产巡检计划列表加载出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data != null && data.msg.length > 0) {
                    _data = data.msg;
                    $('#assetScheduleTable').datagrid('loadData', _data);
                    $('#assetScheduleTable').datagrid('getPager').pagination('refresh',
                        {
                            total: _data.total,
                            pageNumber: pageIndex,
                            pageSize: pageSize
                        })
                    $('#assetScheduleTable').datagrid('loaded');
                }
                else {
                    _data = [];
                    assetInspection.loadScheduleList(pageIndex, pageSize);
                }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
            $('#assetScheduleTable').datagrid('loaded');

        }
    });
}
//视频巡更列表加载数据
assetInspection.loadScheduleList = function (pageIndex, pageSize) {
    /*------------------*/
    $('#assetScheduleTable').datagrid({
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
            handler: function () { assetInspection.addScheduleBtn(); }
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
            //{ field: 'id', title: '编号', width: 50, align: "center", sortable: true },
                { field: 'schedule_name', title: '巡检名称', width: 100, align: "center", sortable: false },
            { field: 'ext10', title: '园区名称', width: 100, align: "center", sortable: false },

            {
                field: 'schedule_type', title: '巡检类型', width: 100, align: "center", sortable: true,
                formatter: function (value, rec) {
                    if (value == 2) {
                        return "质保期巡检";
                    }
                    else if (value == 3) {
                        return "离线设备巡检";
                    }
                    else {
                        return "--";
                    }
                }
            },
            {
                field: 'create_time', title: '创建时间', width: 100, align: "center", sortable: true,
                formatter: function (value, rec) {
                    return Util.changeDateFormat(value);
                }
            },
             {
                 field: 'start_time', title: '有效时间(开始)', width: 100, align: "center", sortable: true,
                 formatter: function (value, rec) {
                     return Util.changeDateFormat(value);
                 }
             },
            {
                field: 'end_time', title: '有效时间(结束)', width: 100, align: "center", sortable: true,
                formatter: function (value, rec) {
                    return Util.changeDateFormat(value);
                }
            },
              {
                  field: 'start_execute_time', title: '执行时间', width: 70, align: "center", sortable: true

              },
             {
                 field: 'ext9', title: '周期', width: 120, align: "center", sortable: false,
                 formatter: function (value, rec) {
                     if (value == "单次") {
                         return "单次(" + rec.execute_date + ")";
                     }
                     else {
                         return value;
                     }
                 }
             },
                 {
                     field: 'ext7', title: '是否过期', width: 70, align: "center", sortable: false,
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
                      field: 'schedule_state', title: '状态', width: 70, align: "center", sortable: false,
                      formatter: function (value, rec) {
                          if (value == 1) {
                              //return '<button type="button" class="btn btn-success btn-xs"  onclick=\'assetInspection.forbidUse(' + JSON.stringify(rec) + ')\'>禁&ensp;&ensp;用</button>';;
                              return ' <img  title="已启用" style="cursor:pointer" src="../scripts/js/plugins/easyui/jquery-easyui-1.5/themes/icons/startuse.png" onclick=\'assetInspection.forbidUse(' + JSON.stringify(rec) + ',' + '&quot;禁用&quot;' + ')\'/>';
                          } else if (value == 0) {
                              //  return '<button type="button" class="btn btn-danger btn-xs"  onclick=\'assetInspection.startUse(' + JSON.stringify(rec) + ')\'>启&ensp;&ensp;用</button>';;
                              return ' <img  title="已禁用" style="cursor:pointer"  src="../scripts/js/plugins/easyui/jquery-easyui-1.5/themes/icons/stopuse.png" onclick=\'assetInspection.startUse(' + JSON.stringify(rec) + ',' + '&quot;启用&quot;' + ')\'/>';
                          }
                          else {
                              return "--";
                          }
                      }
                  },
                  {
                      field: 'Id', title: '编辑', width: 100, align: "center", sortable: false,
                      formatter: function (value, rec) {
                          return '<button class="btn btn-xs btn-warning" type="button" onclick=\'assetInspection.updateScheduleBtn(' + JSON.stringify(rec) + ')\' >修&ensp;&ensp;改</button>' + '|' + '<button class="btn btn-xs btn-danger" type="button" onclick=\'assetInspection.deleteSchedule(' + JSON.stringify(rec) + ')\' >删&ensp;&ensp;除</button>';
                      }
                  },
                    {
                        field: 'delay', title: '延期', width: 100, align: "center", sortable: false,
                        formatter: function (value, rec) {
                            return '<button class="btn btn-xs btn-warning" type="button" onclick=\'assetInspection.delaySchedule(' + JSON.stringify(rec) + ')\' >延&ensp;&ensp;期</button>';
                        }
                    }

        ]],
        onLoadSuccess: function (data) {

        },
        onLoadError: function (data) {
            alert('加载失败');
        }

    });
    $('#assetScheduleTable').datagrid('getPager').pagination({//分页栏下方文字显示
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
            assetInspection.getScheduleList(pageIndex, pageSize);
        },
        onSelectPage: function (pageNumber, pageSize) {
            //下一页
            //pageIndex = pageNumber;

            assetInspection.getScheduleList(pageNumber, pageSize);
        },
        onChangePageSize: function (pageNumber, pageSize) {

        },
        onRefresh: function (pageNumber, pageSize) {
            //pageIndex = pageNumber;
            // 刷新按钮
            assetInspection.getScheduleList(pageNumber, pageSize);
        }
    });
}
//添加任务按钮
assetInspection.addScheduleBtn = function () {
    if ($("#assetConfigDiv").css('display') == 'block') {
        $("#startTimeInput").val("");
        $("#endTimeInput").val("");
        $("#executeTimeInput").val("");
        $("#scheduleNameInput").val("");
        //$("#regionConfigSelect").find("option[value='0']").attr("selected", true); //设置选中园区
        if ($.cookie("mainControlRegionId")) {
            var mainControlRegion = $.cookie("mainControlRegionId");
            $("#regionConfigSelect").find("option[value=" + mainControlRegion + "]").attr("selected", true);
        }
        $("input[type=radio][name=datetime][value='1']").prop("checked", 'checked'); //设置选中周期
        $(".frenone0").hide();
        $(".frenone3").hide();
        $(".frenone1").show();
        $(".frenone2").hide();
        $(".frenone4").hide();
        $(".frenone").show();
        $("#assetConfigDiv").dialog('open');  //显示配置DIV
        $("#saveBtn").unbind("click"); //解除绑定
        $("#saveBtn").bind("click", assetInspection.addSchedule);//绑定事件
    }
}


//提交添加任务按钮
assetInspection.addSchedule = function () {
    var scheduleName = $("#scheduleNameInput").val(); //计划任务名称
    var regionId = $('#regionConfigSelect option:selected').val();  //园区ID
    //var scheduleType = $('#scheduleTypeSelect option:selected').val();   //巡检类型
    var scheduleType = 2;   //巡检类型
    var startTime = $("#startTimeInput").val();                        //开始时间
    var endTime = $("#endTimeInput").val();                            //截止时间
    var timeType = $('input:radio[name="datetime"]:checked').val();    //时间间隔类型
    var startExecuteTime = $("#executeTimeInput").val();               //执行开始时间
    var periodExpression = "";
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
            if (fMonthSpan == "" || fMonthSpan == null) {
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

    //值校验
    if (scheduleName == null || scheduleName == "") {
        alert("请输入任务名称！");
        return;
    }
    if (regionId == null || regionId == -100) {
        alert("请选择园区！");
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
    $.ajax({
        url: "/Schedule/AddAssetInspectionSchedule",
        type: "post",
        data: { scheduleName: scheduleName, regionId: regionId, scheduleType: scheduleType, startTime: startTime, endTime: endTime, startExecuteTime: startExecuteTime, periodExpression: periodExpression, contentText: contentText, spanTime: spanTime, scheduleDate: scheduleDate },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {
                $("#assetConfigDiv").dialog('close');  //隐藏配置DIV
                assetInspection.getScheduleList(pageIndex, pageSize);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }

    })
}
//禁用
assetInspection.forbidUse = function (data) {
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
                    assetInspection.getScheduleList(pageIndex, pageSize);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }

}
//启用
assetInspection.startUse = function (data) {
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
                    assetInspection.getScheduleList(pageIndex, pageSize);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }
}
//更新按钮
assetInspection.updateScheduleBtn = function (data) {
    updateId = data.id;//视频轮播ID
    if ($("#assetConfigDiv").css('display') == 'block') {
        $("#assetConfigDiv").dialog('open');  //显示配置DIV
    }
    $("#saveBtn").unbind("click"); //解除绑定
    $("#saveBtn").bind("click", assetInspection.updateSchedule);//绑定事件
    //给各个元素赋值
    $("#scheduleNameInput").val(data.schedule_name);
    // $("#regionConfigSelect").find("option[value='" + data.region_id + "']").attr("selected", true); //设置选中园区
    var res = assetInspection.getSelectValues("#regionConfigSelect option", data.region_id);  //判断被选中园区是否在select下拉框内
    if (res == -1) {
        $("#regionConfigSelect").find("option[value=-100]").attr("selected", true); //设置选中园区
    }
    else {
        $("#regionConfigSelect").find("option[value='" + data.region_id + "']").attr("selected", true); //设置选中园区
    }
    //$("#scheduleTypeSelect").find("option[value='" + data.schedule_type + "']").attr("selected", true); //设置选中类型
    $("#startTimeInput").val(Util.changeDateFormat(data.start_time));//设置有效期结束时间
    $("#endTimeInput").val(Util.changeDateFormat(data.end_time));//设置有效期开始时间
    $("#executeTimeInput").val(data.start_execute_time); //设置执行开始时间
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
        $(".frenone0").hide();
        $(".frenone2").show();
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
    $("#contentText").val(data.content);
}
//提交更新巡检任务按钮
assetInspection.updateSchedule = function () {
    var scheduleName = $("#scheduleNameInput").val(); //计划任务名称
    var regionId = $('#regionConfigSelect option:selected').val();  //园区ID
    //var scheduleType = $('#scheduleTypeSelect option:selected').val();   //巡检类型
    var scheduleType = 2;//巡检类型
    var startTime = $("#startTimeInput").val();                        //开始时间
    var endTime = $("#endTimeInput").val();                            //截止时间
    var timeType = $('input:radio[name="datetime"]:checked').val();    //时间间隔类型
    var startExecuteTime = $("#executeTimeInput").val();               //执行开始时间
    var periodExpression = "";
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
    //值校验
    if (scheduleName == null || scheduleName == "") {
        alert("请输入任务名称！");
        return;
    }
    if (regionId == null || regionId == -100) {
        alert("请选择园区！");
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
    $.ajax({
        url: "/Schedule/UpdateAssetInspectionSchedule",
        type: "post",
        data: { id: updateId, scheduleName: scheduleName, regionId: regionId, scheduleType: scheduleType, startTime: startTime, endTime: endTime, startExecuteTime: startExecuteTime, periodExpression: periodExpression, contentText: contentText, spanTime: spanTime, scheduleDate: scheduleDate },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {
                $("#assetConfigDiv").dialog('close');  //隐藏配置DIV
                assetInspection.getScheduleList(pageIndex, pageSize);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }

    })
}
//延期按钮
assetInspection.delaySchedule = function (data) {
    if ($("#delayTimeDiv").css('display') == 'block') {
        $("#delayTimeDiv").dialog('open');
    }
    delayId = data.id;
    delayEndTime = Util.changeDateFormat(data.end_time);
    $("#delayTimeScheduleName").html(data.schedule_name);
}
//提交延期按钮
assetInspection.delayTimeSaveBtn = function () {
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
                        assetInspection.getScheduleList(pageIndex, pageSize);
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
//取消延期按钮
assetInspection.delayTimeCancelBtn = function () {
    $("#delayTimeDiv").dialog('close');
}
//删除计划任务按钮
assetInspection.deleteSchedule = function (data) {
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
                    assetInspection.getScheduleList(pageIndex, pageSize);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }
}
//编辑园区
assetInspection.editorRegion = function () {
    if (confirm("是否跳转到园区编辑页面？")) {
        window.location.href = "/Config/Map";
    }
}
//获取select框下是否含有value值的选项
assetInspection.getSelectValues = function (selectId, values) {
    var array = new Array();
    $(selectId).each(function () {
        array.push($(this).val());
    })
    //$("#regionConfigSelect option").each(function () {
    //    array.push(parseInt($(this).val()));
    //})
    // var index = $.inArray(7, array)
    return $.inArray(values, array);
}

//隐藏配置窗体
assetInspection.cancel = function () {
    $("#assetConfigDiv").dialog('close');  //隐藏配置DIV
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
