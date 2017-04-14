$(document).ready(function () {
    getPersonInfo();//获取卷宗创建人
    $("#addCreatePerson").multiselect({
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight: 500
    });
    CreateDocumentInfoTable();
    CreateAlarmTable();
    dgId = 'AddAssociatedInfotable';
    WebUploadBase('../Dossier/UpLoad');
    $('#alarm-dlg').dialog('close');
    $("#addArchiveType").multiselect({//案发的区域初始化下拉菜单
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight: 500
    });
});
//卷宗修改——打开修改卷宗的dialog
var archive_instance = new Object();

var archiveId = archiveId;
var dgId;
var pageIndex = 1;
var pageSize = 30; //默认初始化每页行数
//添加预案
function addDossier(archiveId) {
    archiveId = archiveId;
    var addArchiveName = $("#addArchiveName").val();
    if (addArchiveName == "")
    {
        alert("请输入卷宗名称");
        $("#addArchiveName").focus();
        return false;
    }
    var addArchiveType = $("#addArchiveType").val();
    if (addArchiveType ==-1) {
        alert("请输入卷宗类型");
        $("#addArchiveType").focus();
        return false;
    }
    var addArchiveTypeText = $("#addArchiveType").find("option:selected").text();
    var addCreatePerson = $("#addCreatePerson").val();
    if (addCreatePerson =="") {
        alert("请输入卷宗创建人");
        $("#addCreatePerson").focus();
        return false;
    }
    var addCreatePersonText = $("#addCreatePerson").find("option:selected").text();
    var addReportPerson = $("#addReportPerson").val();
    if (addReportPerson == "") {
        alert("请输入报案人");
        $("#addReportPerson").focus();
        return false;
    }
  
    if (archiveId != -1) {
        var archiveNum = $("#addArchiveNum").val();
        if ($("#addNewArchiveDescription").val() == "")
        {
            alert("卷宗新增描述不能为空！");
            $("#addNewArchiveDescription").focus();
            return false;

        }
        var addArchiveDescription = $("#addArchiveDescription").val() +$("#addNewArchiveDescription").val();
        var addAlarmId = GetAddAlarmId();
        var addAssociatedInfo = $('#AddAssociatedInfotable').datagrid('getRows');
        var addArchiveStatus = 0;//新建
        //变更记录
        var change_time = Util.getLocalTime();
        var change_log = archiveNum + "号卷宗" + "在" + change_time + "作出如下变更：";
        if (archive_instance.archive_name != addArchiveName) change_log = change_log + "卷宗名称由'" + archive_instance.archive_name + "'变更为'" + addArchiveName + "';";
        if (archive_instance.archive_keywords != addArchiveTypeText) change_log = change_log + "卷宗类别由'" + archive_instance.archive_keywords + "'变更为'" + addArchiveTypeText + "';";
        if (archive_instance.archive_creater != addCreatePersonText) change_log = change_log + "卷宗创建人由'" + archive_instance.archive_creater + "'变更为'" + addCreatePersonText + "';";
        if (archive_instance.archive_people != addReportPerson) change_log = change_log + "报案人由'" + archive_instance.archive_people + "'变更为'" + addReportPerson + "';";
        if (archive_instance.archive_description != addArchiveDescription) change_log = change_log + "卷宗描述由'" + archive_instance.archive_description + "'变更为'" + addArchiveDescription + "';";
        if (archive_instance.alarm_id != addAlarmId) change_log = change_log + "关联报警由编号为'" + archive_instance.alarm_id + "'变更为'" + addAlarmId + "';";
        change_log = change_log;


        $.ajax({
            url: "/Dossier/UpdateDossierData",
            type: "post",
            data: "&archiveId=" + archiveId + "&archiveNum=" + archiveNum + "&addArchiveName=" + addArchiveName + "&addArchiveType=" + addArchiveType + "&addCreatePerson=" + addCreatePerson + "&addReportPerson=" + addReportPerson + "&addArchiveDescription=" + addArchiveDescription + "&addAlarmId=" + addAlarmId + "&addAssociatedInfo=" + JSON.stringify(addAssociatedInfo) + "&addArchiveStatus=" + addArchiveStatus + "&addArchiveLog=" + change_log,
            datatype: 'json',
            async: false,
            success: function (data) {
                if (data.status == 0) {
                    if (data.msg == true) {
                        alert("卷宗修改成功！");
                        window.location.href = "/Dossier/Index"
                    }
                }
                else {
                    alert("卷宗修改出现" + data.msg + "错误请联系管理员！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("卷宗修改出现" + XMLHttpRequest.status + "错误请联系管理员！")
            }
        });
    }
    else {
        var addArchiveDescription = $("#addArchiveDescription").val();
        var addAlarmId = GetAddAlarmId();
        var addAssociatedInfo = $('#AddAssociatedInfotable').datagrid('getRows');
        var addArchiveStatus = 0;//新建
        $.ajax({
            url: "/Dossier/InsetDossierData",
            type: "post",
            data:"&addArchiveName=" + addArchiveName + "&addArchiveType=" + addArchiveType + "&addCreatePerson=" + addCreatePerson + "&addReportPerson=" + addReportPerson + "&addArchiveDescription=" + addArchiveDescription + "&addAlarmId=" + addAlarmId + "&addAssociatedInfo=" + JSON.stringify(addAssociatedInfo) + "&addArchiveStatus=" + addArchiveStatus,
            datatype: 'json',
            async: false,
            success: function (data) {
                if (data.status == 0) {
                    if (data.msg == true) {
                        alert("卷宗注册成功！");
                        window.location.href = "/Dossier/Index"
                    }
                }
                else {
                    alert("卷宗注册出现" + data.msg + "错误请联系管理员！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("卷宗注册出现" + XMLHttpRequest.status + "错误请联系管理员！")
            }
        });
    }
}
 //卷宗生成——关联告警——获取最终添加的告警编号
function GetAddAlarmId() {
    //最终添加的告警编号
    var archive_alarm_string = [];
    var addedItems = $('#AddAlarmInfo').datagrid('getRows');
    $.each(addedItems, function (index, item) {
        archive_alarm_string.push(item.id);
    });

    return archive_alarm_string;
}

//卷宗生成——关联告警——删掉选中的告警
function DeleteAlarmIdByCheckbox() {
    var row = $("#AddAlarmInfo").datagrid('getChecked');
    if (row) {
        for (var i = 0; i < row.length; i++) {
            var rowIndex = $("#AddAlarmInfo").datagrid('getRowIndex', row[i]);
            if (confirm('你确定要删除关联的告警信息吗？')) {
                $("#AddAlarmInfo").datagrid('deleteRow', rowIndex);
                $("#AddAlarmInfo").datagrid('reload');//删除后重新加载下
            }
        }
    }
}

//卷宗生成——关联告警——打开添加告警的dialog并加载数据
function OpenAlarmDg() {
    $('#alarm-dlg').dialog('open');
    //卷宗生成——关联告警——获取告警信息
    loadAlarmData(1, 10);
    getAlarmData(1, 10);
}


//获取生成预案信息列表
function loadAlarmData(pageIndex, pageSize) {
    /*------------------*/
    $('#alarm_data_to_add').datagrid({
        data: [],
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
            Util.changeRowBGColor("alarm_data_to_add", rowIndex);
        },
        onMouseOutRow: function (e, rowIndex, rowData) {
            Util.rowOut("alarm_data_to_add", rowIndex);
        },
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'id', title: '报警编号', width: 50, align: "center", sortable: true },
            { field: 'alarmName', title: '设备编号', width: 70, align: "center", sortable: false },
            { field: 'alarmEvent', title: '事件类型', width: 100, align: "center", sortable: false },
            { field: 'deviceName', title: '设备名称', width: 100, align: "center", sortable: false },
            { field: 'subSystem', title: '子系统类型', width: 70, align: "center", sortable: false },
            {
                field: 'alarmTime', title: '报警时间', width: 120, align: "center", sortable: true,
                formatter: function (value, rec) {
                    return Util.changeDateFormat(value);
                }
            },
            { field: 'alarmLevel', title: '报警级别', width: 70, align: "center", sortable: false },
            { field: 'confirmPersonName', title: '确警人', width: 70, align: "center", sortable: false },
            { field: 'confirmResult', title: '确警结果', width: 100, align: "center", sortable: false },
            { field: 'alarmLocation', title: '报警位置', width: 100, align: "center", sortable: false },
            
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
             { field: 'confirmAlarmText', title: '确警描述', width: 100, align: "center", sortable: false },
             {
                 field: 'confirmState', title: '确警状态', width: 70, align: "center", sortable: false,
                 formatter: function (value, rec) {
                     if (rec.confirmState == "确警") {
                         return '已确警';
                     } else if (rec.confirmState == "未确警") {
                         return '未确警';
                     }

                 }
             },
            
              
        ]],
        onLoadSuccess: function (data) {

        },
        onLoadError: function () {
            alert('加载失败');
        }

    });
    $('#alarm_data_to_add').datagrid('getPager').pagination({//分页栏下方文字显示
        showPageList: true,
        pageSize: pageSize, //每页显示的记录条数，默认为10
        pageNumber: pageIndex, //重点:传入当前页数
        pageList: [5, 10, 20, 30, 50], //可以设置每页记录条数的列表    
        beforePageText: '第', //页数文本框前显示的汉字   
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示{from}-{to}条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{total}条',
        onChangePageSize: function (pageNumber, pageSize) {
            //一页显示几条

            getAlarmData(pageNumber, pageSize);
        },
        onSelectPage: function (pageNumber, pageSize) {
            //下一页

            getAlarmData(pageNumber, pageSize);
        },
        onChangePageSize: function () {
            //选择显示条数事件

        },
        onRefresh: function (pageNumber, pageSize) {
            //pageIndex = pageNumber;
            // 刷新按钮
            getAlarmData(pageNumber, pageSize);
        }
    });
}
function getAlarmData(pageIndex, pageSize) {
    var alarm_level = $("#alarm_level").val();
    if (alarm_level == -1) {
        alarm_level = -100;
    }
    var alarm_state = $("#alarm_state").val();
    if (alarm_state ==-1) {
        alarm_state = -100;
    }
    var StartTime = $("#StartTime").val();
    if (StartTime == "") {
        StartTime = "";
    }
    var EndTime = $("#EndTime").val();
    if (EndTime == "") {
        EndTime = "";
    }
    $.ajax({
        url: "/Dossier/GetAlarmData",
        type: "post",
        data: "pageindex=" + pageIndex + "&pagesize=" + pageSize + "&alarm_level=" + alarm_level + "&alarm_state=" + alarm_state + "&StartTime=" + StartTime + "&EndTime=" + EndTime,
        datatype: 'json',
        async: true,
        beforeSend: function (XMLHttpRequest) {
            $('#alarm_data_to_add').datagrid('loading', "正在加载...");
        },
        success: function (data) {
            if (data.status == 0) {
                if (data.msg != null) {
                    plandata = data.msg;
                    $('#alarm_data_to_add').datagrid('loadData', plandata);
                    $('#alarm_data_to_add').datagrid('getPager').pagination('refresh', {
                        total: plandata.total,
                        pageNumber: pageIndex,
                        pageSize: pageSize
                    });
                }
            } else {
                alert("报警信息加载出现" + data.msg + "错误请联系管理员！");
            }
            $('#alarm_data_to_add').datagrid('loaded');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
            $('#alarm_data_to_add').datagrid('loaded');

        }
    });
}








//关联文件显示
function CreateDocumentInfoTable() {
    /*------------------*/
    $('#AddAssociatedInfotable').datagrid({
        data: "",
            fitColumns: false,
            singleSelect: false,
            method: 'get',
            loadMsg: '正在加载……',
            pageNumber: pageIndex, //重点:传入当前页数
            checkbox: true,
            pagination: false, //分页控件 
            rownumbers: true, //行号
            checkOnSelect: false,
            queryParams: {
            },
            toolbar: [
            {
                iconCls: 'icon-add',
                id: 'filePicker',
                text: '上传',
                handler: function () {  }
                },
            '-',
        {
                iconCls: 'icon-remove',
                text: '删除',
                handler: function () { deleteFile() }
                }
            ],
            columns: [[
            { field: 'ck', checkbox: true },
            { field: 'file_name', title: '文件名称', width: '200', align: "center" },
            { field: 'content', title: '文件描述', width: '250', align: "center", editor: 'text' },
            { field: 'create_time', title: '添加时间', width: '200', align: "center" }
            ]],
            singleSelect: false,
            onLoadSuccess: function (data) {
            },
            onLoadError: function () {
                alert('加载失败');
                }

            });
}

//将上传成功的文件添加到关联文件中
function SuccessTips(file, response) {

    var file_time = Util.getLocalTime();
    $("#" + dgId).datagrid('insertRow', {
        row: {
            file_name: file.name,
            content: '',
            create_time: file_time,
            file_address: response.filePath,
            file_ext_name: response.exfileExtName
        }

    });

}

//删除关联文件
function deleteFile() {
    if (archiveId == -1) {
        var result = "";
        var conent = 0;
        var checkedItems = $("#" + dgId).datagrid('getChecked');
        $.each(checkedItems, function (index, item_new) {
            if (result != "")
                result += ",";
            result += item_new.file_address;
            conent++;
        });
        if (conent == 0) {
            alert("请选择要删除的关联文件");
        }
        else {
            deleteAddFileByID(result)
        }
    }
    else {
        //删除修改上传的关联文件
        var row = $("#" + dgId).datagrid('getChecked');
        if (row) {
            for (var i = 0; i < row.length; i++) {
                var rowIndex = $("#" + dgId).datagrid('getRowIndex', row[i]);
                if (confirm('确实要删除吗?')) {
                    $("#" + dgId).datagrid('deleteRow', rowIndex);
                    $("#" + dgId).datagrid('reload');//删除后重新加载下
                }
            }
        }
    }
}


    //删除临时文件中的关联文件
    function deleteAddFileByID(result) {
        if (confirm('确实要删除吗?')) {
            $.ajax({
                url: "/Dossier/deleteAddFileByID",
                type: "post",
                data: "filePath=" + result,
                datatype: 'json',
                async: false,
                success: function (data) {
                    if (data.status == 0) {
                        if (data.msg == true) {
                            alert("删除成功！");
                            var row = $("#" + dgId).datagrid('getChecked');
                            if (row) {
                                for (var i = 0; i < row.length; i++) {
                                    var rowIndex = $("#" + dgId).datagrid('getRowIndex', row[i]);
                                    $("#" + dgId).datagrid('deleteRow', rowIndex);
                                    $("#" + dgId).datagrid('reload');//删除后重新加载下
                                }
                            }
                        }
                        else {
                            alert("删除失败！");
                        }
                    }
                    else {
                        alert("相关文件出现" + data.msg + "错误请联系管理员！");
                    }

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("相关文件出现" +XMLHttpRequest.status + "错误请联系管理员！");
                }
            });
        }
    }
    //告警信息
    function CreateAlarmTable() {
        $('#AddAlarmInfo').datagrid({
            toolbar: "#toolbar",
            data: "",
            fitColumns: false,
            singleSelect: false,
            method: 'get',
            loadMsg: '正在加载……',
            pageNumber: pageIndex, //重点:传入当前页数
            checkbox: true,
            checkOnSelect: false,
            onMouseOverRow: function (e, rowIndex, rowData) {
                Util.ChangeRowBGColor("AddedAlarmTable", rowIndex);
            },
            onMouseOutRow: function (e, rowIndex, rowData) {
                Util.RowOut("AddedAlarmTable", rowIndex);
            },
            pagination: false, //分页控件 
            rownumbers: true, //行号
            queryParams: {
            },
            toolbar: [{
                iconCls: 'icon-add',
                text: '添加',
                handler: function () { OpenAlarmDg() }
            }, '-', {
                iconCls: 'icon-remove',
                text: '删除',
                handler: function () { DeleteAlarmIdByCheckbox(); }
            }],
            columns: [[
                { field: 'ck', checkbox: true },
                { field: 'id', title: '报警编号', width: '120', align: "center" },
                { field: 'alarmEvent', title: '报警事件', width: '150', align: "center" },
                { field: 'alarmLocation', title: '报警位置', width: '150', align: "center" },
                { field: 'subSystem', title: '子系统类型', width: '200', align: "center" },
                {
                    field: 'alarmTime', title: '报警时间', width: '200', align: "center",
                    formatter: function (value, rec) {
                        return Util.changeDateFormat(value);
                    }
                }
            ]],
            singleSelect: false,
            onLoadSuccess: function (data) {
            },
            onLoadError: function () {
                alert('加载失败');
            }
        });
    }

    //获取卷宗创建人
    function getPersonInfo() {
        $.ajax({
            url: "/Dossier/GetPersonInfo",
            type: "post",
            data: "",
            datatype: 'json',
            async: false,
            success: function (data) {
                if (data.status == 0) {
                    $("#addCreatePerson").html("");
                    for (var i = 0; i < data.msg.length; i++) {
                        $("<option value='" + data.msg[i].ssoid + "'>" + data.msg[i].alias + "</option>").appendTo('#addCreatePerson'); //动态添加Option子项
                    }
                }
                else {
                    alert("获取卷宗创建人出现" + data.msg + "错误请联系管理员！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("获取卷宗创建人出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    }


    //卷宗生成——关联告警——将在添加告警dialog中选择的告警添加到卷宗页面，并关闭dialog
    function addAlarmIdByCheckbox() {
        var AddedAlarmAlarm = $('#AddAlarmInfo').datagrid('getRows');
        var checkedItems = $('#alarm_data_to_add').datagrid('getChecked');
        $.each(checkedItems, function (index, item_new) {
            //双循环去重
            var same_count = 0;
            $.each(AddedAlarmAlarm, function (index, item_added) {
                if (item_new.id == item_added.id) {
                    same_count++;
                    alert(item_new.id + "号该报警已被添加。");
                }
            });

            if (same_count == 0) {
                $('#AddAlarmInfo').datagrid('insertRow', {
                    index: index,
                    row: {
                        id: item_new.id,
                        alarmEvent: item_new.alarmEvent,
                        alarmLocation: item_new.alarmLocation,
                        subSystem: item_new.subSystem,
                        alarmTime: item_new.alarmTime
                    }
                });
            }
        });

        $('#alarm-dlg').dialog('close');
    }

    //卷宗生成——关联告警——关掉添加告警的dialog，并清空其中填写的数据
    function closeAlarmDialog() {
        $("#alarm_level").val(-1);
        $("#alarm_state").val(-1);
        $("#StartTime").val("");
        $("#EndTime").val("");
        $('#alarm-dlg').dialog('close');
    }

    //取消
    function cancelDossierModify() {
        window.location.href = "/Dossier/Index"
    }



    //获取已添加的卷宗
    function checkDossierInfo(Id) {
        $.ajax({
            url: "/Dossier/GetDossierInfo",
            type: "post",
            data: "Id=" + Id,
            datatype: 'json',
            async: false,
            success: function (data) {
                if (data.status == 0) {
                    archive_instance.archive_id = data.msg.archiveInfo.id;
                    archive_instance.archive_number = data.msg.archiveInfo.archive_num;
                    archive_instance.archive_name = data.msg.archiveInfo.archive_name;
                    archive_instance.archive_creater = data.msg.archiveInfo.create_name;
                    archive_instance.archive_people = data.msg.archiveInfo.report_person;
                    archive_instance.archive_description = data.msg.archiveInfo.archive_decription;
                    archive_instance.archive_keywords = data.msg.archiveInfo.report_name;
                    archive_instance.alarm_id = data.msg.archiveInfo.alarm_id;

                    $("#addArchiveId").val(data.msg.archiveInfo.id);
                    $("#addArchiveNum").val(data.msg.archiveInfo.archive_num);
                    $("#addArchiveName").val(data.msg.archiveInfo.archive_name);
                    $("#addArchiveType").multiselect('select', data.msg.archiveInfo.report_type)
                    $("#addArchiveType").val(data.msg.archiveInfo.report_type);
                    $("#addArchiveType").multiselect("refresh");
                   // $("#addArchiveType").val(data.msg.archiveInfo.report_type);
                    $("#addCreatePerson").multiselect('select', data.msg.archiveInfo.create_persson_id);
                    $("#addCreatePerson").val(data.msg.archiveInfo.create_persson_id);
                    $("#addCreatePerson").multiselect("refresh");
                    $("#addReportPerson").val(data.msg.archiveInfo.report_person);
                    $("#addArchiveDescription").html(data.msg.archiveInfo.archive_decription);
                    var full_log = "";
                    for (var i = 0; i < data.msg.arhiveUpdateLog.length; i++) {
                        full_log = full_log + ">>>" + data.msg.arhiveUpdateLog[i].archive_log_content;
                    }
                    $("#archiveLogUpdate").html(full_log);

                    $('#AddAlarmInfo').datagrid({
                        data: data.msg.alarmRecord,
                        fitColumns: false,
                        singleSelect: false,
                        method: 'get',
                        loadMsg: '正在加载……',
                        pageNumber: pageIndex, //重点:传入当前页数
                        checkbox: true,
                        pagination: false, //分页控件 
                        rownumbers: true, //行号
                        queryParams: {},
                        checkOnSelect: false,
                        columns: [[
                       { field: 'ck', checkbox: true },
                       { field: 'id', title: '报警编号', width: '100', align: "center" },
                       { field: 'alarmEvent', title: '报警事件', width: '120', align: "center" },
                       { field: 'alarmLocation', title: '报警位置', width: '150', align: "center" },
                       { field: 'subSystem', title: '子系统类型', width: '200', align: "center" },
                       {
                           field: 'alarmTime', title: '报警时间', width: '200', align: "center",
                           formatter: function (value, rec) {
                               return Util.changeDateFormat(value);
                           }
                       }
                        ]],
                        singleSelect: false,
                        onLoadSuccess: function (data) {
                        },
                        onLoadError: function () {
                            alert('加载失败');
                        }
                    });
                    $('#AddAssociatedInfotable').datagrid({
                        data: data.msg.fileInfo,
                        fitColumns: false,
                        singleSelect: false,
                        method: 'get',
                        loadMsg: '正在加载……',
                        pageNumber: pageIndex, //重点:传入当前页数
                        checkbox: true,
                        pagination: false, //分页控件 
                        rownumbers: true, //行号
                        queryParams: {},
                        checkOnSelect: false,
                        columns: [[
                        { field: 'ck', checkbox: true },
                        { field: 'id', title: '文件编号', width: '200', align: "center" },
                        { field: 'file_name', title: '文件名称', width: '200', align: "center" },
                        { field: 'content', title: '文件描述', width: '150', align: "center", editor: 'text' },
                        {
                            field: 'create_time', title: '上传时间', width: '200', align: "center",
                            formatter: function (value, rec) {
                                return Util.changeDateFormat(value);
                            }
                        },
                        ]],
                        singleSelect: false,
                        onLoadSuccess: function (data) {
                        },
                        onLoadError: function () {
                            alert('加载失败');
                        }
                    });
                }
                else {
                    alert("获取卷宗信息出现" + data.msg + "错误请联系管理员！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("获取卷宗信息出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    }
