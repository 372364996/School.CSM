$(document).ready(function () {
    loadPlanOrdinanc(pageIndex, pageSize);
    getPlanOrdinanc(pageIndex, pageSize);
    getOrdinanceType();
    $("#ordinancesType").multiselect({
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight: 500
    });
    $("#addDocumentInfo").dialog('close');
    $("#dlgregchakan").dialog('close');

});
var dgId;
var pageIndex = 1;
var pageSize = 30; //默认初始化每页行数
var plandata = [];
var PlanRegulations = -1;
var loadingpopup;

var allEventType;
//点击查询按钮
function getDevicePlanInfo() {
    getPlanOrdinanc(pageIndex, pageSize)
}
//获取生成预案信息列表
function loadPlanOrdinanc(pageIndex, pageSize) {
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
        onDblClickRow: function (index, field, value) {
            checRegulations(field.id)
           
        },
        toolbar: [
        {
            iconCls: 'icon-add ',
            text: "添加预案条例",
            handler: function () { addPlanRegulations() }
        }
        ],
        columns: [[
            //{ field: 'ck', checkbox: true },
            //{ field: 'reg_id', title: '条例编号', width: 70, align: "center", sortable: true },
            { field: 'reg_name', title: '条例名称', width: 100, align: "center", sortable: false },
            { field: 'reg_typeName', title: '条例类型', width: 100, align: "center", sortable: false },
            { field: 'reg_levelName', title: '条例等级', width: 100, align: "center", sortable: false },
            //{ field: 'file_name', title: '文件名称', width: 100, align: "center", sortable: false },
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
            { field: 'keyword', title: '关键字', width: 100, align: "center", sortable: false },

            {
                field: 'id', title: '操作', width: 100, align: "center", sortable: false,
                formatter: function (value, row, index) {
                    return '<button  id="updataDevicePlan"class="btn btn-warning btn-xs" onclick=\'getPlanRegulations("' + value + '")\'>修&ensp;&ensp;改</button> <button  id="deleteDevicePlan" class="btn btn-danger btn-xs" onclick=\'deleteplanOrdinancById("' + value + '")\'>删&ensp;&ensp;除</button>'
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

            getPlanOrdinanc(pageNumber, pageSize);
        },
        onSelectPage: function (pageNumber, pageSize) {
            //下一页

            getPlanOrdinanc(pageNumber, pageSize);
        },
        onChangePageSize: function () {
            //选择显示条数事件

        },
        onRefresh: function (pageNumber, pageSize) {
            //pageIndex = pageNumber;
            // 刷新按钮
            getPlanOrdinanc(pageNumber, pageSize);
        }
    });
}
function getPlanOrdinanc(pageIndex, pageSize) {
    pageSize = pageSize;
    var ordinancesName = $("#ordinancesName").val();
    var ordinancesType = $("#ordinancesType").val();
    if (ordinancesType == null)
    {
        ordinancesType=-1
    }
    if (ordinancesName == "全部") {
        ordinancesName = "";
    }
    var createTime = $("#createTime").val();
    var endTime = $("#endTime").val();
    $.ajax({
        url: "/Plan/GetPlanOrdinanc",
        type: "post",
        data: "pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&ordinancesName=" + ordinancesName + "&ordinancesType=" + ordinancesType + "&createTime=" + createTime + "&endTime=" + endTime,
        datatype: 'json',
        async: true,
        beforeSend: function (XMLHttpRequest) {
            $('#dg').datagrid('loading', "正在加载...");
        },
        success: function (data) {
            if (data.status == 0)
            {
                if (data.msg != null) {
                    plandata = data.msg;
                    $('#dg').datagrid('loadData', plandata);
                    $('#dg').datagrid('getPager').pagination('refresh', {
                        total: plandata.total,
                        pageNumber: pageIndex,
                        pageSize: pageSize
                    });
                }
            } else
            {
                alert("预案条例列表加载出现" + data.msg + "错误请联系管理员！");
            }
            $('#dg').datagrid('loaded');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("预案条例列表加载出现"+XMLHttpRequest.status + "错误请联系管理员！");
            $('#dg').datagrid('loaded');

        }
    });
}

//删除预案条例
function deleteplanOrdinancById(result) {
    if (result == 0) {
        alert("请选择要删除的条目");
    }
    else {
        if (confirm('确实要删除吗?')) {
            $.ajax({
                url: "/Plan/planOrdinancById",
                type: "post",
                data: "Id=" + result,
                datatype: 'json',
                async: false,
                success: function (data) {
                    if (data.status == 0) {
                        if (data.msg == true) {
                            alert("删除成功！");
                            getPlanOrdinanc(pageIndex, pageSize)
                        }
                    }
                    else {
                        alert("删除预案条例出现" + data.msg + "错误请联系管理员！");
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("删除预案条例出现" + XMLHttpRequest.status + "错误请联系管理员！");
                }
            });
        }
    }
}


//清空条件
function emptyConditionInfo() {
    $("#ordinancesName").val("");
    $("#ordinancesType").multiselect('select', -1);
    $("#ordinancesType").val(-1);
    $("#ordinancesType").multiselect("refresh");
    $("#createTime").val("");
    $("#endTime").val("");
}
//修改预案状态
function updateDevicePlanStatus(devicePlanId, planStatus) {
    $.ajax({
        url: "/Plan/UpdateDevicePlanStatus",
        type: "post",
        data: "Id=" + devicePlanId + "&planStatus=" + planStatus,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.hasOwnProperty('state')) {
                alert("修改预案状态出现" + data.message + "错误请联系管理员！");
            }
            if (data == true) {
                alert("状态修改成功！");
                getPlanOrdinanc(pageIndex, pageSize)
            }
            else if (data == false) {
                alert("状态修改失败！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("修改预案状态出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}


//根据条例类型
function getOrdinanceType() {
        pid =-1;
        $.ajax({
            url: "/Plan/GetOrdinanceType",
            type: "post",
            data: "Id=" + pid,
            datatype: 'json',
            async: false,
            success: function (data) {
                if(data.status==0)
                {
                        $("#ordinancesType").empty();
                        $("<option value='" + -1 + "'>全部</option>").appendTo('#ordinancesType');
                            for (var i = 0; i < data.msg.length; i++) {
                                $("<option value='" + data.msg[i].id + "'>" + data.msg[i].event_name + "</option>").appendTo('#ordinancesType'); //动态添加Option子项
                            }
                }
                else
                {
                    alert("获取条例类型出现" + data.msg + "错误请联系管理员！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("获取条例类型出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
}


//添加预案条例
function addPlanOrdinance()
{
    var addRegType = $("#addEventType").val();
    if (addRegType == "-1" || addRegType == null) {
        alert("请选择条例类型");
        $("#addEventType").focus();
        return false;
    }
    var addRegLevel = $("#addRegLevel").val();
    if (addRegLevel == "-1" || addRegLevel == null) {
        alert("请选择条例级别");
        $("#addRegLevel").focus();
        return false;
    }
    var addRegName = $("#addRegName").val();
    if (addRegName == "" ) {
        alert("请选择条例名称");
        $("#addRegName").focus();
        return false;
    }
    var addRegKeyword = $("#addRegKeyword").val();
    var addRegItems = $('#addDocumentInfodg').datagrid('getRows');
    if (addRegItems.length==0)
    {
        alert("请上传关联文件");
        return false;
    }
    $.ajax({
        type: "post", //这里是http类型
        url: "/Plan/AddPlanOrdinance",
        data: "&addRegType=" + addRegType + "&addRegLevel=" + addRegLevel + "&addRegName=" + addRegName + "&addRegKeyword=" + addRegKeyword + "&addRegItems=" + JSON.stringify(addRegItems),
        dataType: "json", //传回来的数据类型
        async: false,
        success: function (data) {
            if (data.status == 0) {
                if (data.msg==true) {
                    alert("添加成功！");
                    canceladd();
                    getPlanOrdinanc(pageIndex, pageSize);

                }
                else {
                    alert("添加失败！");
                }
            }
            else {
                alert("添加预案条例出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("添加预案条例出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}

//弹出添加预案条例弹框
function addPlanRegulations()
{
    $("#upDocumentInfo").dialog('close');
    $("#addDocumentInfo").dialog('open');
    dgId ='addDocumentInfodg';
    WebUploadBase('../Plan/UpLoad');
    getEventType();
    $("#addEventType").multiselect({
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight: 500,
    });
    var newAlarmEquipment = new Array();
    var obj = new Object();
    $.each(allEventType, function (index, EventType) {
        obj = {
            label: EventType.event_name,
            value: EventType.id
        };
        newAlarmEquipment.push(obj);
    });
    $("#addEventType").multiselect('dataprovider', newAlarmEquipment);
    $('#addEventType').multiselect('refresh');//multiselect刷新重新加载项
    CreateDocumentInfoTable();
}



//获取事件类型
function getEventType() {
    var Id = -1;//事件类型pid=-1
    $.ajax({
        url: "/Plan/GetOrdinanceType",
        type: "post",
        data: "Id=" + Id,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                allEventType = data.msg;
                if (data.msg.length < 1) {
                    
                    if (dgId == "addDocumentInfodg")
                    {
                        $("<option value='-1'>请选择</option>").appendTo('#addEventType'); //动态添加Option子项
                    }
                    else {
                        $("<option value='-1'>请选择</option>").appendTo('#upRegType'); //动态添加Option子项
                    }
                   
                }
                else {
                    for (var i = 0; i < data.msg.length; i++) {
                        if (dgId =="addDocumentInfodg")
                        {
                            $("<option value='" + data.msg[i].id + "'>" + data.msg[i].event_name + "</option>").appendTo('#addEventType'); //动态添加Option子项
                        }
                        else {
                            $("<option value='" + data.msg[i].id + "'>" + data.msg[i].event_name + "</option>").appendTo('#upRegType'); //动态添加Option子项
                        }
                       
                    }
                }
            }
            else {
                alert("获取条例类型出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取条例类型出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}

//关联文件显示
function CreateDocumentInfoTable() {
    /*------------------*/
    $('#addDocumentInfodg').datagrid({
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
            //{ field: 'id', title: '文件编号', width: '80', align: "center" },
            { field: 'file_name', title: '文件名称', width: '150', align: "center" },
            { field: 'content', title: '文件描述', width: '150', align: "center", editor: 'text' },
            { field: 'create_time', title: '添加时间', width: '150', align: "center" }
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
function SuccessTips(file, response)
{
    
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
function deleteFile()
{
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
//删除临时文件中的关联文件
function  deleteAddFileByID(result)
{
    if (confirm('确实要删除吗?'))
    {
        $.ajax({
            url: "/Plan/deleteAddFileByID",
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
                    alert("删除相关文件出现" + data.msg + "错误请联系管理员！");
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("删除相关文件出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    }
}


//获取预案条例
function  getPlanRegulations(Id)
{
    $("#filePicker").remove();
    PlanRegulations = Id;
    canceladd();
    $("#addDocumentInfo").dialog('close');
    $("#upDocumentInfo").dialog('open');
    dgId = 'upDocumentInfodg';
    WebUploadBase('../Plan/UpLoad');
    getEventType();
    $("#upRegType").multiselect({
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight: 500,
    });
    $.ajax({
        url: "/Plan/GetPlanRegulations",
        type: "post",
        data: "RegId=" + Id,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                //$("#reg_id").val(data.msg.id);
                $("#upRegType").multiselect('select', data.msg.reg_type);
                $("#upRegType").val(data.msg.reg_type);
                $("#upRegType").multiselect("refresh");
                $("#upRegName").val(data.msg.reg_name);
                $("#upRegLevel").val(data.msg.reg_level);
                $("#upRegkeyword").val(data.msg.keyword);
                var file = data.msg.FileInfoList;
                $('#upDocumentInfodg').datagrid({
                    data: file,
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
                    toolbar: [
                    {
                        id: 'filePicker',
                        iconCls: 'icon-add',
                        text: '上传',
                        handler: function () { }
                    },
                    '-',
                    {
                       
                        iconCls: 'icon-remove',
                        text: '删除',
                       handler: function () { delUpFileInfo() }
                    }
                    ],
                    columns: [[
                    { field: 'ck', checkbox: true },
                    { field: 'file_name', title: '文件名称', width: '100', align: "center" },
                    { field: 'content', title: '文件描述', width: '150', align: "center", editor: 'text' },
                    {
                        field: 'create_time', title: '添加时间', width: '200', align: "center",
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
            else {
                alert("获取条例出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取条例出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}
//删除修改上传的关联文件
function delUpFileInfo()
{
    var row = $("#" + dgId).datagrid('getChecked');
    if (row) {
        for (var i = 0; i < row.length; i++) {
            var rowIndex = $("#" + dgId).datagrid('getRowIndex', row[i]);
            $("#" + dgId).datagrid('deleteRow', rowIndex);
            $("#" + dgId).datagrid('reload');//删除后重新加载下
        }
    }
}

//修改预案条例
function updatePlanOrdinance() {
    var upRegType = $("#upRegType").val();
    if (upRegType == "-1" || upRegType == null) {
        alert("请选择条例类型");
        $("#upRegType").focus();
        return false;
    }
    var upRegLevel = $("#upRegLevel").val();
    if (upRegLevel == "-1" || upRegLevel == null) {
        alert("请选择条例级别");
        $("#upRegLevel").focus();
        return false;
    }
    var upRegName = $("#upRegName").val();
    if (upRegName == "") {
        alert("请选择条例名称");
        $("#upRegName").focus();
        return false;
    }
    var upRegkeyword = $("#upRegkeyword").val();
    var addRegItems = $('#upDocumentInfodg').datagrid('getRows');
    if (addRegItems.length==0) {
        alert("请上传关联文件");
        return false;
    }
    $.ajax({
        type: "post", //这里是http类型
        url: "/Plan/UpdatePlanOrdinance",
        data: "&Id=" + PlanRegulations + "&addRegType=" + upRegType + "&addRegLevel=" + upRegLevel + "&addRegName=" + upRegName + "&addRegKeyword=" + upRegkeyword + "&addRegItems=" + JSON.stringify(addRegItems),
        dataType: "json", //传回来的数据类型
        async: false,
        success: function (data) {
            if (data.status == 0) {
                if (data.msg == true) {
                    alert("修改成功！");
                    $("#upDocumentInfo").dialog('close');
                    getPlanOrdinanc(pageIndex, pageSize);

                }
                else {
                    alert("修改失败！");
                }
            }
            else {
                alert("修改预案条例出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("修改预案条例出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}


//查看预案条例
function checRegulations(Id)
{
    $.ajax({
        url: "/Plan/GetPlanRegulations",
        type: "post",
        data: "RegId=" + Id,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                $("#dlgregchakan").dialog('open');
                $("#chakanreg_id").html(data.msg.id);
                $("#chakanreg_type").html(data.msg.reg_typeName);
                $("#chakanreg_level").html(data.msg.reg_levelName);
                $("#chakanreg_name").html(data.msg.reg_name);
                $("#chakanreg_keyword").html(data.msg.keyword);
                $("#chakanreg_create_time").html(Util.changeDateFormat(data.msg.create_time));
                $("#chakanreg_update_time").html(Util.changeDateFormat(data.msg.update_time));
                $('#redDocument').datagrid({
                    data: data.msg.FileInfoList,
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
                    { field: 'file_name', title: '文件名称', width: '100', align: "center" },
                    { field: 'content', title: '文件描述', width: '150', align: "center", editor: 'text' },
                    {
                        field: 'create_time', title: '上传时间', width: '150', align: "center",
                        formatter: function (value, rec) {
                            return Util.changeDateFormat(value);
                        }
                    },
                    { field: 'id', title: '查看/下载', width: '100', align: "center",
                    formatter: function (value, row, index) {
                        if (!/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(row.file_ext_name)) {
                            value = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='downloads' style='cursor:pointer'onclick='saveAs(&quot;" + row.file_address + "&quot;,&quot;" + row.file_ext_name + "&quot;,&quot;" + row.file_name + "&quot;)'>下载</span><iframe src='' height='0px' id='dd'  style='display:none'></iframe></label></p>";
                        }
                        else {
                            value = "<span class='downloads' style='cursor:pointer'onclick='previewImage(&quot;" + row.file_address + "&quot;)' >预览</span>&nbsp;&nbsp;&nbsp;<span class='downloads' style='cursor:pointer'onclick='saveAs(&quot;" + row.file_address + "&quot;,&quot;" + row.file_ext_name + "&quot;,&quot;" + row.file_name + "&quot;)'>下载</span><iframe src='' height='0px' id='dd'  style='display:none'></iframe></label></p>";
                        }
                        return value;
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
            else {
                alert("获取条例出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取条例出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}

//浏览图片
function previewImage(ImgUrl) {
    window.open(ImgUrl);
}

//下载文件
function saveAs(imgUrl, extName, fileName) {
    $("#dd").attr("src", "/Plan/SaveDocument?url=" + imgUrl + '&extName=' + extName + '&fileName=' + fileName);
}
//取消修改
function cancelChange() {
    $("#upDocumentInfo").dialog('close');

}
//取消添加
function canceladd() {
    
    $("#addRegName").val("");
    $("#addRegLevel").val(1);
    $("#addRegKeyword").val("");
    getEventType();
    $("#addEventType").multiselect({
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight: 500,
    });
    var newAlarmEquipment = new Array();
    var obj = new Object();
    $.each(allEventType, function (index, EventType) {
        obj = {
            label: EventType.event_name,
            value: EventType.id
        };
        newAlarmEquipment.push(obj);
    });
    $("#addreg_filename").val("");
    if (!($("#addDocumentInfodg").parent().is(":hidden")))
    {
        $('#addDocumentInfodg').datagrid('loadData', { total: 0, rows: [] });
    }
    $("#addDocumentInfo").dialog('close');
}







    

   