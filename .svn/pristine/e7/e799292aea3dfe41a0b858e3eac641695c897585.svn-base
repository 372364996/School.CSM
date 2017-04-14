$(function () {
    getVideoDownloadList(1, 30);
    getVideoDownloadData(1, 30);
    $("#downloadStatus").change(function () {
        getVideoDownloadData(1, 30);
    })
})

function getVideoDownloadList(pageIndex, pageSize) {
    var _data = [];
    $("#cameraScheduleTable").datagrid({
        data: _data,
        fitColumns: true,
        rownumbers: true,
        pagination: true, //分页控件 
        singleSelect: true,//只允许选中一行
        onDblClickRow: function (rowIndex, rowData) {
            
        },
        //toolbar: [{
        //iconCls: 'icon-add ',
        //text: "新增",
        //handler: function () { $("#addDeviceTypeDiv").dialog("open"); }
        //}],
        columns: [[
            { field: 'id', title: 'id', width: 100, align: 'center', hidden: true },
            { field: 'video_name', title: '视频名称', width: 150, align: 'center' },
            { field: 'video_path', title: '视频路径', width: 180, align: 'center' },
            {
                field: 'video_type', title: '视频类型', width: 50, align: 'center',
                formatter: function (value, row, index) {
                    for (var i = 0; i < videoType.length; i++) {
                        if (videoType[i].key == value) {
                            return videoType[i].value;
                        }
                    }
                }
            },
            {
                field: 'video_start_time', title: '开始时间', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    return Util.changeDateFormat(value);
                }
            },
            {
                field: 'video_end_time', title: '结束时间', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    return Util.changeDateFormat(value);
                }
            },
            { field: 'device_name', title: '摄像头名称', width: 100, align: 'center' },
            { field: 'device_code', title: '摄像头编码', width: 100, align: 'center' },
            {
                field: 'download_status', title: '下载状态', width: 50, align: 'center',
                formatter: function (value, row, index) {
                    for (var i = 0; i < loadStatus.length; i++) {
                        if (loadStatus[i].key == value) {
                            return loadStatus[i].value;
                        }
                    }
                }
            },
            { field: 'content', title: '备注', width: 50, align: 'center' }//,
            //{
            //    field: 'subsystem_id', title: '开始时间', width: 100, align: 'center',
            //    formatter: function (value, row, index) {
            //        for (var i = 0; i < subSystem.length; i++) {
            //            if (subSystem[i].key == value) {
            //                return subSystem[i].value;
            //            }
            //        }
            //    }
            //},
            //{
            //    field: 'ids', title: '操作', width: 100, align: 'center',
            //    formatter: function (value, row, index) {
            //        return '<button class="btn btn-primary btn-xs" onclick=\'showUpdateDeviceDialog(' + row.id + ')\'>修改</button> <button class="btn btn-danger btn-xs" onclick=\'deleteDevice("' + row.device_code + '")\'>删除</button>'
            //    }
            //}
        ]],
        onLoadSuccess: function (data) {

        },
        onLoadError: function () {
            alert('加载失败');
        }
    })
    $('#cameraScheduleTable').datagrid('getPager').pagination({//分页栏下方文字显示
        showPageList: true,
        pageNumber: pageIndex,
        pageSize: pageSize, //每页显示的记录条数，默认为10 
        pageList: [5, 10, 20, 30, 50], //可以设置每页记录条数的列表
        beforePageText: '第', //页数文本框前显示的汉字   
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示{from}-{to}条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{total}条',
        onChangePageSize: function (pageNumber) {
            //一页显示几条
            getVideoDownloadData(pageIndex, pageNumber);
        },
        onSelectPage: function (pageNumber, pageSize) {
            //下一页
            getVideoDownloadData(pageNumber, pageSize);
        }
    });
}

//获取设备列表
function getVideoDownloadData(pageIndex, pageSize) {
    //摄像头名称
    var deviceName = $("#deviceName").val();
    //下载状态
    var downloadStatus = $("#downloadStatus").val();
    //开始时间
    var startTime = $("#startTime").val();
    //结束时间
    var endTime = $("#endTime").val();
    $.ajax({
        url: "/Video/GetVideoDownloadList",
        data: { pageIndex: pageIndex, pageSize: pageSize, deviceName: deviceName, downloadStatus: downloadStatus, startTime: startTime, endTime: endTime },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
                return;
            } else {
                $('#cameraScheduleTable').datagrid('loadData', data.msg);
                $('#cameraScheduleTable').datagrid('loaded');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}