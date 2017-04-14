var scheduleResult = {}; //定义全局变量
var pageSize = 20; //默认初始化每页行数
var pageIndex = 1;  //默认起始页面
var _data = [];   //报警列表加载数据
//初始化加载
$(function () {
    if ($.cookie("mainControlRegionId")) {
        var mainControlRegion = $.cookie("mainControlRegionId");
        $("#regionSelect").find("option[value=" + mainControlRegion + "]").attr("selected", true);
    }
    scheduleResult.getResultList(pageIndex, pageSize);

})

//获取视频巡更列表
scheduleResult.getResultList = function (pageIndex, pageSize) {
    // var scheduleName = $("#scheduleName").val();
    var regionId = $('#regionSelect option:selected').val();
    var scheduleType = $('#scheduleTypeSelect option:selected').val();
    var startTime = $("#startTime").val();
    var endTime = $("#endTime").val();
    scheduleResult.loadScheduleResultList(pageIndex, pageSize);
    scheduleResult.queryScheduleResultList(pageIndex, pageSize, scheduleType, regionId, startTime, endTime);

}

//查询视频巡更列表
scheduleResult.queryScheduleResultList = function (pageIndex, pageSize, scheduleType, regionId, startTime, endTime) {
    $.ajax({
        url: "/Schedule/GetScheduleResultPages",
        type: "post",
        data: { pageIndex: pageIndex, pageSize: pageSize, scheduleType: scheduleType, regionId: regionId, startTime: startTime, endTime: endTime },
        datatype: 'json',
        async: true,
        beforeSend: function (XMLHttpRequest) {
            $('#resultTable').datagrid('loading', "正在加载...");
        },
        success: function (data) {
            if (data.status != 0) {
                alert("计划任务执行结果列表加载出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data.msg != null && data.msg.length > 0) {
                    _data = data.msg;
                    $('#resultTable').datagrid('loadData', _data);
                    $('#resultTable').datagrid('getPager').pagination('refresh',
                        {
                            total: _data.total,
                            pageNumber: pageIndex,
                            pageSize: pageSize
                        })
                }
                else {
                    _data = [];
                    scheduleResult.loadScheduleResultList(pageIndex, pageSize);
                }
            $('#resultTable').datagrid('loaded');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
            $('#resultTable').datagrid('loaded');

        }
    });
}
//视频巡更列表加载数据
scheduleResult.loadScheduleResultList = function (pageIndex, pageSize) {
    /*------------------*/
    $('#resultTable').datagrid({
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
        //toolbar: [
        //{
        //    iconCls: 'icon-add',
        //    text: "添加",
        //    handler: function () { cameraSchedule.addSchedule(); }
        //}
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
        //],
        columns: [[
            { field: 'ck', checkbox: true },
           // { field: 'id', title: '编号', width: 50, align: "center", sortable: true },
              { field: 'schedule_name', title: '计划任务名称', width: 70, align: "center", sortable: false },
            { field: 'region_name', title: '园区名称', width: 100, align: "center", sortable: false },
            { field: 'schedule_type', title: '任务类型', width: 100, align: "center", sortable: false },
             { field: 'schedule_state', title: '任务状态', width: 100, align: "center", sortable: false },
            {
                field: 'create_time', title: '计划创建时间', width: 100, align: "center", sortable: true,
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
                  field: 'result_time', title: '执行时间', width: 120, align: "center", sortable: true,
                  formatter: function (value, rec) {
                      return Util.changeDateFormat(value);
                  }
              },
                { field: 'result_content', title: '描述', width: 100, align: "center", sortable: false }

        ]],
        onLoadSuccess: function (data) {

        },
        onLoadError: function (data) {
            alert('加载失败');
        }

    });
    $('#resultTable').datagrid('getPager').pagination({//分页栏下方文字显示
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
            scheduleResult.getResultList(pageIndex, pageSize);
        },
        onSelectPage: function (pageNumber, pageSize) {
            //下一页
            //pageIndex = pageNumber;

            scheduleResult.getResultList(pageNumber, pageSize);
        },
        onChangePageSize: function (pageNumber, pageSize) {

        },
        onRefresh: function (pageNumber, pageSize) {
            //pageIndex = pageNumber;
            // 刷新按钮
            scheduleResult.getResultList(pageNumber, pageSize);
        }
    });
}