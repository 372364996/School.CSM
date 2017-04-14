$(document).ready(function () {

    winHeight = $(window).height(); //获取电脑屏幕的高
    winWidth = $(window).width();
    //var minheight = (winHeight - 197);
    //$('#dg').css({
    //    height: minheight
    //})
    if (winWidth <= 1440) {
        eventlistHeight = winHeight - 233;
    }
    else {
        eventlistHeight = winHeight - 193;
    }
    $('#dg').height(eventlistHeight);
    loadEventPlanData(pageIndex, pageSize);
    getEventPlanData(pageIndex, pageSize);
});

var pageIndex = 1;
var pageSize = 30; //默认初始化每页行数
var plandata = [];
var loadingpopup;
//点击查询按钮
function getEventPlanInfo() {
    getEventPlanData(pageIndex, pageSize)
}
//获取生成预案信息列表
function loadEventPlanData(pageIndex, pageSize) {
    /*------------------*/
    $('#dg').datagrid({
        data: plandata,
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
        onMouseOverRow: function (e, rowIndex, rowData) {
            Util.changeRowBGColor("dg", rowIndex);
        },
        onMouseOutRow: function (e, rowIndex, rowData) {
            Util.rowOut("dg", rowIndex);
        },
        toolbar: [
        {
            iconCls: 'icon-add ',
            text: "注册事件预案",
            handler: function () { window.location.href = "/Plan/EventCreate" }
        }
        , '-',
       {
           iconCls: 'icon-remove',
           text: "批量删除",
           handler: function () { eventPlanById(); }
       }
         , '-',
       {
           iconCls: 'icon-startuse',
           text: "一键启用",
           handler: function () { AKeyModificationEventPlan(-1, "启用") }
       }
        , '-',
       {
           iconCls: 'icon-stopuse',
           text: "一键禁用",
           handler: function () { AKeyModificationEventPlan(-1, "未启用"); }
       }
        ],
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'plan_code', title: '预案编号', width: 70, align: "center", sortable: true },
            { field: 'plan_name', title: '预案名称', width: 100, align: "center", sortable: false },
            { field: 'event_name', title: '事件类型', width: 100, align: "center", sortable: false },
            { field: 'region_name', title: '事发园区', width: 100, align: "center", sortable: false },
            {
                field: 'create_time', title: '创建时间', width: 120, align: "center", sortable: true,
                formatter: function (value, rec) {
                    return Util.changeDateFormat(value);
                }
            },
            {
                field: 'update_time', title: '修改时间', width: 120, align: "center", sortable: true,
                formatter: function (value, rec) {
                    return Util.changeDateFormat(value);
                }
            },
           {
               field: 'planStatus', title: '是否启用', width: 70, align: "center", sortable: true,
               formatter: function (value, row, index) {
                   if (row.region_name == $("#currentMainControlRegion").html()) {
                       if (row.planStatus != "启用") {
                           return ' <img  title="已禁用" style="cursor:pointer"  src="../scripts/js/plugins/easyui/jquery-easyui-1.5/themes/icons/stopuse.png" onclick=\'updateEventPlanStatus(' + (row.id) + ',' + '&quot;启用&quot;' + ')\'/>';
                       }
                       else {
                           return ' <img  title="已启用" style="cursor:pointer" src="../scripts/js/plugins/easyui/jquery-easyui-1.5/themes/icons/startuse.png" onclick=\'updateEventPlanStatus(' + (row.id) + ',' + '&quot;未启用&quot;' + ')\'/>';

                       }
                   } else {
                       if (row.planStatus != "启用") {
                           return ' <img  title="已禁用" style="cursor:not-allowed"  src="../scripts/js/plugins/easyui/jquery-easyui-1.5/themes/icons/stopuse.png" disabled="true"/>';
                       }
                       else {
                           return ' <img  title="已启用" style="cursor:not-allowed" src="../scripts/js/plugins/easyui/jquery-easyui-1.5/themes/icons/startuse.png" disabled="true" />';

                       }

                   }
               }
           },
            {
                field: 'id', title: '操作', width: 100, align: "center", sortable: false,
                formatter: function (value, row, index) {
                    if (row.region_name == $("#currentMainControlRegion").html())
                    {
                        return '<button  id="updataEventPlan"class="btn btn-warning btn-xs" onclick=\'updataEventPlanById("' + value + '")\'>修&ensp;改</button> <button  id="deleteEventPlan" class="btn btn-danger btn-xs" onclick=\'deleteEventPlanById("' + value + '")\'>删&ensp;&ensp;除</button>'
                    }
                    else {
                        return '<button  id="updataEventPlan"class="btn btn-warning btn-xs" disabled="true" onclick=\'updataEventPlanById("' + value + '")\'>修&ensp;改</button> <button  id="deleteEventPlan" disabled="true" class="btn btn-danger btn-xs" onclick=\'deleteEventPlanById("' + value + '")\'>删&ensp;&ensp;除</button>'
                    }

                }
            }
        ]],
        onLoadSuccess: function (data) {

        },
        onLoadError: function () {
            alert('加载失败');
        }

    });
    $('#dg').datagrid('getPager').pagination({//分页栏下方文字显示
        showPageList: true,
        pageSize: pageSize, //每页显示的记录条数，默认为10
        pageNumber: pageIndex, //重点:传入当前页数
        pageList: [5, 10, 20, 30, 50], //可以设置每页记录条数的列表    
        beforePageText: '第', //页数文本框前显示的汉字   
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示{from}-{to}条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{total}条',
        onChangePageSize: function (pageNumber, pageSize) {
            //一页显示几条

            getEventPlanData(pageNumber, pageSize);
        },
        onSelectPage: function (pageNumber, pageSize) {
            //下一页

            getEventPlanData(pageNumber, pageSize);
        },
        onChangePageSize: function () {
            //选择显示条数事件

        },
        onRefresh: function (pageNumber, pageSize) {
            //pageIndex = pageNumber;
            // 刷新按钮
            getEventPlanData(pageNumber, pageSize);
        }
    });
}
function getEventPlanData(pageIndex, pageSize) {
    pageSize = pageSize;
    var planName = $("#planName").val();
    if (planName == "全部") {
        planName = "";
    }
    var eventRegion = [];
    var eventRegionId = $("#regionName").val();
    if (eventRegionId == -1)
    {
        for(var i=0;i<$("#regionName option").length;i++)
        {
            if($("#regionName option:eq("+i+")").val()!=-1)
            {
                eventRegion.push($("#regionName option:eq(" + i + ")").val());
            }
        }
    }
    else {
        eventRegion.push(eventRegionId);
    }
    var createTime = $("#createTime").val();
    var endTime = $("#endTime").val();
    $.ajax({
        url: "/Plan/GetEventPlanList",
        type: "post",
        data: "pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&planName=" + planName + "&createTime=" + createTime + "&endTime=" + endTime + "&eventRegion=" +eventRegion,
        datatype: 'json',
        async: true,
        beforeSend: function (XMLHttpRequest) {
            $('#dg').datagrid('loading', "正在加载...");
        },
        success: function (data) {
            if (data.status == 0) {
                if (data.msg != null) {
                    plandata = data.msg;
                    $('#dg').datagrid('loadData', plandata);
                    $('#dg').datagrid('getPager').pagination('refresh', {
                        total: plandata.total,
                        pageNumber: pageIndex,
                        pageSize: pageSize
                    });
                }
            } else {
                alert("事件预案列表加载出现" + data.msg + "错误请联系管理员！");
            }
            $('#dg').datagrid('loaded');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("事件预案列表加载出现"+XMLHttpRequest.status + "错误请联系管理员！");
            $('#dg').datagrid('loaded');

        }
    });
}

//删除
function eventPlanById() {
    var result = "";
    var conent = 0;
    var msg = true
    var checkedItems = $('#dg').datagrid('getChecked');
    $.each(checkedItems, function (index, item_new) {
        if (result != "")
            result += ",";
        result += item_new.id;
        if (item_new.region_name != $("#currentMainControlRegion").html())
        {
            alert("" + item_new.plan_code + "预案事发园区与当前园区不相同不能删除该条预案");
            msg=false;
            
        }
        conent++;
    });
    if (msg == false)
    {
        return false;
    } else {
        if (conent == 0) {
            alert("请选择要删除的条目");
        }
        else {
            deleteEventPlanById(result)
        }
    }
}
//删除预案
function deleteEventPlanById(result) {
    if (confirm('确实要删除吗?')) {
        $.ajax({
            url: "/Plan/DelEventPlanByID",
            type: "post",
            data: "Id=" + result,
            datatype: 'json',
            async: false,
            success: function (data) {
                if (data.status == 0) {
                    if (data.msg == true) {
                            alert("删除成功！");
                            getEventPlanData(pageIndex, pageSize)
                    }
                    else {
                        alert("删除失败！");

                    }
                }
                else {
                    alert("事件预案删除出现" + data.msg + "错误请联系管理员！");
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("事件预案列表加载出现"+XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    }
}
//修改预案
function updataEventPlanById(planId) {
    window.location.href = "/Plan/EventPlanModify?Id=" + planId;
}
//日
function getTodayPlanInfo() {
    var d = new Date();
    $("#createTime").val(d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) + ' 00:00:00');
    $("#endTime").val(d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) + ' 23:59:59');
    getEventPlanData(pageIndex, pageSize)
}


//周
function getWeekPlanInfo() {
    var d = new Date();
    var n = d.getDay();
    var start = new Date();
    var end = new Date();
    if (n == 0) {
        start.setDate(d.getDate() - 6);
        end.setDate(d.getDate() - n);
    }
    else {
        start.setDate(d.getDate() - n + 1);
        end.setDate(d.getDate() - n + 7);
    }
    start = start.getFullYear() + "-" + (start.getMonth() + 1 < 10 ? "0" + (start.getMonth() + 1) : start.getMonth() + 1) + "-" + (start.getDate() < 10 ? "0" + start.getDate() : start.getDate()) + ' 00:00:00';
    end = end.getFullYear() + "-" + (end.getMonth() + 1 < 10 ? "0" + (end.getMonth() + 1) : end.getMonth() + 1) + "-" + (end.getDate() < 10 ? "0" + end.getDate() : end.getDate()) + ' 23:59:59';
    $("#createTime").val(start);
    $("#endTime").val(end);
    getDevicePlanData(pageIndex, pageSize)
}



//月
function getMonthPlanInfo() {
    var d = new Date();
    var ThisYear = d.getFullYear();
    var t_month = d.getMonth() + 1;
    var Daynum = getDaysInMonth(ThisYear, t_month);
    $("#createTime").val(d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + '-01 00:00:00');
    $("#endTime").val(d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (Daynum < 10 ? "0" + Daynum : Daynum) + ' 23:59:59');
    getEventPlanData(pageIndex, pageSize)
}

//获取一个最后一天
function getDaysInMonth(ThisYear, t_month) {
    var count = 0
    switch (t_month) {

        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            count = 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            count = 30;
            break;
        case 2:
            if (ThisYear % 4 == 0)
                count = 29;
            else
                count = 28;
            if ((ThisYear % 100 == 0) & (ThisYear % 400 != 0))
                count = 28;
    }
    return count;
}
//获得本季度的开端月份 
function getQuarterStartMonth() {
    var nowMonth = new Date().getMonth(); //当前月 
    var quarterStartMonth = 0;
    if (nowMonth < 3) {
        quarterStartMonth = 0;
    }
    if (2 < nowMonth && nowMonth < 6) {
        quarterStartMonth = 3;
    }
    if (5 < nowMonth && nowMonth < 9) {
        quarterStartMonth = 6;
    }
    if (nowMonth > 8) {
        quarterStartMonth = 9;
    }
    return quarterStartMonth;
}

//格局化日期：yyyy-MM-dd 
function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();

    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
}


//获得本季度的开端日期 
function getQuarterStartDate() {
    var d = new Date();
    var nowYear = d.getYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0;
    var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
    return formatDate(quarterStartDate);
}

//获得某月的天数 
function getMonthDays(myMonth) {
    var nowYear = new Date().getYear(); //当前年
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
}

//或的本季度的停止日期 
function getQuarterEndDate() {
    var d = new Date();
    var nowYear = d.getYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0;
    var quarterEndMonth = getQuarterStartMonth() + 2;
    var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
    return formatDate(quarterStartDate);
}

//本季
function getSeasonPlanInfo() {
    var startSeason = getQuarterStartDate();
    var endSeason = getQuarterEndDate();
    $("#createTime").val(startSeason + ' 00:00:00');
    $("#endTime").val(endSeason + ' 23:59:59');
    getEventPlanData(pageIndex, pageSize)
}



//获得半年的开端日期 
function getHalfYearStartDate() {
    var d = new Date();
    var nowYear = d.getYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0;
    var quarterStartDate = new Date(nowYear, getYearStartMonth(), 1);
    return formatDate(quarterStartDate);
}

//获得半的开端月份 
function getYearStartMonth() {
    var nowMonth = new Date().getMonth(); //当前月 
    var quarterStartMonth = 0;
    if (nowMonth < 6) {
        quarterStartMonth = 0;
    }
    if (6< nowMonth && nowMonth < 12) {
        quarterStartMo6nth = 7;
    }
    return quarterStartMonth;
}

//或的半的停止日期 
function getHalfYearEndDate() {
    var d = new Date();
    var nowYear = d.getYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0;
    var quarterEndMonth = getYearStartMonth() + 5;
    var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
    return formatDate(quarterStartDate);
}

//半年
function getHalfYearPlanInfo() {
    var startSeason = getHalfYearStartDate();
    var endSeason = getHalfYearEndDate();
    $("#createTime").val(startSeason + ' 00:00:00');
    $("#endTime").val(endSeason + ' 23:59:59');
    getEventPlanData(pageIndex, pageSize)
}
//本年
function getYearPlanInfo() {
    $("#createTime").val(new Date().getFullYear() + '-01-01 00:00:00');
    $("#endTime").val(new Date().getFullYear() + '-12-31 23:59:00');
    getEventPlanData(pageIndex, pageSize)
}
//清空条件
function emptyConditionInfo() {
    $("#planName").val("")
    $("#createTime").val("");
    $("#endTime").val("");
    $("#regionName").val(-1);
}

//修改预案状态
function updateEventPlanStatus(devicePlanId, planStatus) {
    if (planStatus == "启用") {

        if (confirm("是否要启用此事件预案")) {
            ModificationEventPlanStatus(devicePlanId, planStatus)

        }
    }
    else {
        if (confirm("是否要禁用此事件预案")) {
            ModificationEventPlanStatus(devicePlanId, planStatus)
        }

    }

}
//修改预案状态
function ModificationEventPlanStatus(EventPlanId, planStatus) {
    if ($.cookie("mainControlRegionId")) {
        var eventRegion = $.cookie("mainControlRegionId")
    }
    $.ajax({
        url: "/Plan/UpdateEventPlanStatus",
        type: "post",
        data: "Id=" + EventPlanId + "&planStatus=" + planStatus + "&eventRegion=" + eventRegion,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                if (data.msg == true) {
                    alert("状态修改成功！");
                    getEventPlanData(pageIndex, pageSize)
                }
                else {
                    alert("状态修改失败！");
                }

            }
            else {
                alert("修改预案状态出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("修改预案状态出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}

//一键修改预案状态
function AKeyModificationEventPlan(eventPlanId, planStatus) {
    if (planStatus == "启用") {

        if (confirm("是否要一键启用当前园区的所有事件预案")) {
            ModificationEventPlan(eventPlanId, planStatus)

        }
    }
    else {
        if (confirm("是否要一键禁用当前园区的所有事件预案")) {
             ModificationEventPlan(eventPlanId, planStatus)
        }

    }

}

//一键修改预案状态
function ModificationEventPlan(EventPlanId, planStatus) {
    if ($.cookie("mainControlRegionId")) {
        var eventRegion = $.cookie("mainControlRegionId")
    }
    var isExists = seeIfThePlanExists();
    if (isExists == true)
    {
 $.ajax({
        url: "/Plan/UpdateEventPlanStatus",
        type: "post",
        data: "Id=" + EventPlanId + "&planStatus=" + planStatus + "&eventRegion=" + eventRegion,
        datatype: 'json',
        async: false,
        success: function (data) {
            if(data.status==0)
            {
                if(data.msg==true)
                {
                        if (planStatus == "启用") {
                            alert("事件预案一键启用成功");
                        }
                        else {
                            alert("事件预案一键禁用成功！");
                        }
                        getEventPlanData(pageIndex, pageSize)
                }
                else {
                    if (planStatus == "启用") {
                        alert("事件预案一键启用失败");
                    }
                    else {
                        alert("事件预案一键禁用失败！");
                    }
                    getEventPlanData(pageIndex, pageSize)
                }

            }
            else {
                    if (planStatus == "启用") {
                        alert("事件预案一键启用出现" + data.message + "错误请联系管理员！");
                    }
                    else {
                        alert("事件预案一键禁用出现" + data.message + "错误请联系管理员！");
                    }

            }
          
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (planStatus == "启用") {
                alert("事件预案一键启用出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
            else {
                alert("事件预案一键禁用出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }

        }
    });
    }
    else {
        alert("当前园区不存在预案");
    }
    
   
}
//查看预案是否存在
function seeIfThePlanExists()
{
    var isExists = false;
     if ($.cookie("mainControlRegionId")) {
        var eventRegion = $.cookie("mainControlRegionId")
    }
    $.ajax({
        url: "/Plan/SeeIfThePlanExists",
        type: "post",
        data: "&eventRegion=" + eventRegion,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                if (data.msg==true) {
                   isExists=true
                }
            }
            else {
                alert("查看预案是否存在出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("查看预案是否存在出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
    return isExists;
}