$(document).ready(function () {

    winHeight = $(window).height(); //获取电脑屏幕的高
    winWidth = $(window).width();
    var minheight = (winHeight - 197);
    $('#dg').css({
        height: minheight
    })
    loadPlanItemResult(pageIndex, pageSize);
    getPlanItemResult(pageIndex, pageSize);
});

var pageIndex = 1;
var pageSize = 30; //默认初始化每页行数
var plandata = [];
var loadingpopup;
//点击查询按钮
function getPlanItemResultInfo() {
    getPlanItemResult(pageIndex, pageSize)
}
//获取生成预案信息列表
function loadPlanItemResult(pageIndex, pageSize) {
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
        columns: [[
            //{ field: 'ck', checkbox: true },
            { field: 'plan_code', title: '预案编号', width: 70, align: "center", sortable: true },
            { field: 'plan_name', title: '预案名称', width: 100, align: "center", sortable: false },
            { field: 'type_name', title: '预案类型', width: 100, align: "center", sortable: false },
            { field: 'content', title: '描述', width: 100, align: "center", sortable: false },
            {
                field: 'trigger_time', title: '触发时间', width: 120, align: "center", sortable: true,
                formatter: function (value, rec) {
                    return Util.changeDateFormat(value);
                }
            },
        ]],
        view: detailview,
        detailFormatter: function (index, row) {
            return '<div style="padding:2px"><table id="ddv-' + index + '"></table></div>';
        },
        onExpandRow: function (index, row) {
            var data2 = [];
            $.ajax({
                url: "/Plan/GetPlanItemResult",
                data: { pid: row.id },
                type: "post",
                datatype: "json",
                async: false,
                success: function (data) {
                    if (data.state == 1) {
                        alert(data.message);
                        return;
                    }
                    data2 = data.msg;
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("预案结果加载出现" + XMLHttpRequest.status + "错误请联系管理员！");
                }
            })
            $("#ddv-" + index).datagrid({
                data: data2,
                singleSelect: true,
                fitColumns: true,
                onDblClickRow: function (rowIndex, rowData) {
                    //getDeviceDefinedInfo(rowData.id);
                },
                columns: [[
                { field: 'id', title: 'id', width: 100, align: 'center', hidden: true },
                { field: 'pid', title: 'pid', width: 100, align: 'center', hidden: true },
                { field: 'confirm_name', title: '确警类型', width: 200, align: 'center' },
                { field: 'item_name', title: '处置项名称', width: 200, align: 'center' },
                {
                     field: 'item_result', title: '执行结果', width: 50, align: "center", sortable: true,
                     formatter: function (value, row, index) {
                         if (row.result_name == "成功") {
                             return ' <img  style="cursor:pointer"  src="../scripts/js/plugins/easyui/jquery-easyui-1.5/themes/icons/startuse.png"/>';
                         }
                         else if (row.result_name == "失败") {
                             return ' <img   style="cursor:pointer" src="../style/base/images/public/failing.png"/>';

                         }
                         else {
                             return ' <img   style="cursor:pointer" src="../style/base/images/public/other.png"/>';
                         }
                     }
                 },
                { field: 'result_name', title: '执行结果', width: 100, align: 'center' },
               
                {
                    field: 'execute_time', title: '触发时间', width: 120, align: "center", sortable: true,
                    formatter: function (value, rec) {
                        return Util.changeDateFormat(value);
                    }
                },
               
                ]],
                onResize: function () {
                    $('#dg').datagrid('fixDetailRowHeight', index);
                }
            });
            $('#dg').datagrid('fixDetailRowHeight', index);
        }
    })
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

            getPlanItemResult(pageNumber, pageSize);
        },
        onSelectPage: function (pageNumber, pageSize) {
            //下一页

            getPlanItemResult(pageNumber, pageSize);
        },
        onChangePageSize: function () {
            //选择显示条数事件

        },
        onRefresh: function (pageNumber, pageSize) {
            //pageIndex = pageNumber;
            // 刷新按钮
            getPlanItemResult(pageNumber, pageSize);
        }
    });
}
function getPlanItemResult(pageIndex, pageSize) {
    pageSize = pageSize;
    var planName = $("#planName").val();
    if (planName == "全部") {
        planName = "";
    }
    var planType = $("#planType").val();
    var createTime = $("#createTime").val();
    var endTime = $("#endTime").val();
    $.ajax({
        url: "/Plan/GetPlanRecordList",
        type: "post",
        data: "pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&planName=" + planName + "&planType=" + planType + "&createTime=" + createTime + "&endTime=" + endTime,
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
                alert("预案结果加载出现" + data.msg + "错误请联系管理员！");
            }
            $('#dg').datagrid('loaded');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("预案结果加载出现" + XMLHttpRequest.status + "错误请联系管理员！");
            $('#dg').datagrid('loaded');

        }
    });
}












