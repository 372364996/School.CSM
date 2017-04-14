$(document).ready(function () {
    
    //winHeight = $(window).height(); //获取电脑屏幕的高
    //winWidth = $(window).width();
    //var minheight = (winHeight - 197);
    //$('#dg').css({
    //    height: minheight
    //})
    loadDossierData(pageIndex, pageSize);
    $("#exportWay").menubutton({
        text: "导出",
        iconCls: "icon-redo",
        menu: "#mm",
    });
    $("#archiveType").multiselect({//案发的区域初始化下拉菜单
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight: 500
    });
    getDossierData(pageIndex, pageSize);
    $("#dossierView").dialog('close');
    WebUploadBase('../Dossier/UpLoad');
});

var pageIndex = 1;
var pageSize = 30; //默认初始化每页行数
var archiveData = [];
var loadingpopup;
//点击查询按钮
function getDossierInfo() {
    getDossierData(pageIndex, pageSize)
}
//获取生成预案信息列表
function loadDossierData(pageIndex, pageSize) {
    /*------------------*/
    $('#dg').datagrid({
        data: archiveData,
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
            checkDossierInfo(field.id)

        },
        toolbar: [
        {
            iconCls: 'icon-add ',
            text: "注册卷宗",
            handler: function () { window.location.href = "/Dossier/DossierCreate" }
        }
        , '-',
       {
           iconCls: 'icon-remove',
           text: "批量删除",
           handler: function () { deleteArchive(); }
       }
        , '-',
       {
           id: 'exportWay'
          
       }
        , '-',
       {
           iconCls: 'icon-undo',
           id: 'filePicker',
           text: "导入",
           handler: function () {
           }
       }
        ],
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'archive_num', title: '卷宗编号', width: 60, align: "center", sortable: true },
            { field: 'archive_name', title: '卷宗名称', width: 80, align: "center", sortable: false },
            { field: 'report_name', title: '卷宗类别', width: 100, align: "center", sortable: false },
            { field: 'create_name', title: '卷宗创建人', width: 90, align: "center", sortable: false },
            { field: 'report_person', title: '报案人', width: 90, align: "center", sortable: false },
            { field: 'archive_decription', title: '卷宗描述', width: 100, align: "center", sortable: false },
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
             { field: 'status_name', title: '卷宗状态', width: 80, align: "center", sortable: false },
            {
                field: 'status', title: '修改状态', width: 100, align: "center", sortable: true,
                formatter: function (value, row, index) {
                    value = '';
                    if (-2 < row.archive_status && row.archive_status < 2) {
                        value += '&nbsp;&nbsp;<button  id=""class="btn btn-primary btn-xs" onclick=\"modifyArchiveState(' + (row.id) + ',' + '&quot;结案&quot;' + ')\">结&nbsp;&nbsp;案</button>';
                    }
                    else {
                        value += '&nbsp;&nbsp;<button  id="" class="btn btn-warning btn-xs" disabled="true">已结案</button>';
                    }
                    return value;
                }
            },
             { field: 'id', title: '操作', width: 180, align: "center", sortable: true,
                  formatter: function (value, row, index) {
                          value = '';
                          if (-2 < row.archive_status && row.archive_status < 2)
                          {
                              value += '&nbsp;&nbsp;<button  id=""class="btn btn-warning btn-xs" onclick=\"modifyArchive(' + row.id + ')">修&ensp;&ensp;改</button>';
                          }
                          else
                          {
                              value += '&nbsp;&nbsp;<button  id=""class="btn btn-warning btn-xs"  disabled="true" onclick=\"modifyArchive(' + row.id + ')">修&ensp;&ensp;改</button>';
                          }
                          if (row.archive_status != -2)
                              value += '&nbsp;&nbsp; <button class="btn btn-danger btn-xs" onclick=\"AbolishArchive(' + (row.id) + ',' + '&quot;废止&quot;' + ')\">废&ensp;&ensp;止</button>';
                          //value += '&nbsp;&nbsp;<button  class="btn btn-info btn-xs" onclick=\"dabao(' + row.archive_id + ')">打包下载</button>';
                          return value;
                  }
              },
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

            getDossierData(pageNumber, pageSize);
        },
        onSelectPage: function (pageNumber, pageSize) {
            //下一页

            getDossierData(pageNumber, pageSize);
        },
        onChangePageSize: function () {
            //选择显示条数事件

        },
        onRefresh: function (pageNumber, pageSize) {
            //pageIndex = pageNumber;
            // 刷新按钮
            getDossierData(pageNumber, pageSize);
        }
    });
}
function getDossierData(pageIndex, pageSize) {
    pageSize = pageSize;
    var archiveName = $("#archiveName").val();
    if (archiveName == "全部") {
        archiveName = "";
    }
    var archiveType = $("#archiveType").val();
    var archiveStatus = $("#archiveStatus").val();
    var createTime = $("#createTime").val();
    var endTime = $("#endTime").val();
    $.ajax({
        url: "/Dossier/GetDossierList",
        type: "post",
        data: "pageIndex=" + pageIndex + "&pageSize=" + pageSize + "&archiveName=" + archiveName + "&archiveType=" + archiveType + "&archiveStatus=" + archiveStatus + "&createTime=" + createTime + "&endTime=" + endTime,
        datatype: 'json',
        async: true,
        beforeSend: function (XMLHttpRequest) {
            $('#dg').datagrid('loading', "正在加载...");
        },
        success: function (data) {
            if (data.status == 0) {
                if (data.msg != null) {
                    archiveData = data.msg;
                    $('#dg').datagrid('loadData', archiveData);
                    $('#dg').datagrid('getPager').pagination('refresh', {
                        total: archiveData.total,
                        pageNumber: pageIndex,
                        pageSize: pageSize
                    });
                }
            } else {
                alert("卷宗列表加载出现" + data.msg + "错误请联系管理员！");
            }
            $('#dg').datagrid('loaded');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
            $('#dg').datagrid('loaded');

        }
    });
}

//清空所有废止卷宗
function deleteArchive() {
    if (confirm('确实要清空所有废止卷宗吗?')) {
        $.ajax({
            url: "/Dossier/DeleteArchive",
            type: "post",
            data: "",
            datatype: 'json',
            async: false,
            success: function (data) {
                if (data.status == 0) {
                    if (data.msg == true) {
                        alert("删除成功!");
                    }
                    else {
                        alert("删除失败!");

                    }
                    getDossierData(pageIndex, pageSize)
                }
                else {
                    alert("删除出现" + data.msg + "错误请联系管理员！");
                    getDossierData(pageIndex, pageSize)
                }
            },


            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("删除出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
        }
    }
//修改预案
function modifyArchive(Id) {
    window.location.href = "/Dossier/Modify?Id=" + Id;
}

//查看卷宗
function checkDossierInfo(Id)
{
    $.ajax({
        url: "/Dossier/GetDossierInfo",
        type: "post",
        data: "Id=" + Id,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                $("#dossierView").dialog('open');
                $("#archiveId").html(data.msg.archiveInfo.id);
                $("#archiveNum").html(data.msg.archiveInfo.archive_num);
                $("#archiveNameInfo").html(data.msg.archiveInfo.archive_name);
                $("#archiveTypeInfo").html(data.msg.archiveInfo.report_name);
                $("#archiveCreaterPerson").html(data.msg.archiveInfo.create_name);
                $("#archiveReportPerson").html(data.msg.archiveInfo.report_person);
                $("#archiveDescription").html(data.msg.archiveInfo.archive_decription);
                $("#archiveCreateTime").html(Util.changeDateFormat(data.msg.archiveInfo.create_time));
                $("#archiveUpdateTime").html(Util.changeDateFormat(data.msg.archiveInfo.update_time));
                var full_log = "";
                for (var i = 0; i < data.msg.arhiveUpdateLog.length; i++) {
                    full_log = full_log + ">>>" + data.msg.arhiveUpdateLog[i].archive_log_content;
                }
                $("#archiveLogView").html(full_log);

                $('#ViewAlarmTable').datagrid({
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
                $('#addVideoInfoView').datagrid({
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
                    { field: 'file_name', title: '文件名称', width: '200', align: "center" },
                    //{ field: 'content', title: '文件描述', width: '150', align: "center", editor: 'text' },
                    {
                        field: 'create_time', title: '上传时间', width: '200', align: "center",
                        formatter: function (value, rec) {
                            return Util.changeDateFormat(value);
                        }
                    },
                    {
                        field: 'id', title: '查看/下载', width: '200', align: "center",
                        formatter: function (value, row, index) {
                            if (!/.(gif|jpg|jpeg|png|gif|jpg|png)$/.test(row.file_ext_name)) {
                                value = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button  id='' class='btn btn-primary btn-xs' style='cursor:pointer'onclick='saveAs(&quot;" + row.file_address + "&quot;,&quot;" + row.file_ext_name + "&quot;,&quot;" + row.file_name + "&quot;)'>下载</button><iframe src='' height='0px' id='dd'  style='display:none'></iframe></label></p>";
                            }
                            else {
                                value = "<button class='btn btn-warning btn-xs' style='cursor:pointer'onclick='previewImage(&quot;" + row.file_address + "&quot;)' >预览</button>&nbsp;&nbsp;&nbsp;<button  id='' class='btn btn-primary btn-xs' style='cursor:pointer'onclick='saveAs(&quot;" + row.file_address + "&quot;,&quot;" + row.file_ext_name + "&quot;,&quot;" + row.file_name + "&quot;)'>下载</button><iframe src='' height='0px' id='dd'  style='display:none'></iframe></label></p>";
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
                alert("获取卷宗信息出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取卷宗信息出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}

//结案按钮
function modifyArchiveState(id, archiveStatus) {
    if (confirm('确实要结案吗?')) {
        $.ajax({
            url: "/Dossier/modifyArchiveState",
            type: "post",
            data: "&Id=" + id+"&archiveStatus="+archiveStatus,
            datatype: 'json',
            async: false,
            success: function (data) {
                if (data.status == 0) {
                    if (data.msg == true) {
                        alert("结案成功!");
                    }
                    else {
                        alert("结案失败!");
                       
                    }
                    getDossierData(pageIndex, pageSize)
                }
                else {
                    alert("结案出现" + data.msg + "错误请联系管理员！");
                    getDossierData(pageIndex, pageSize)
                }
            },


            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("结案出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    }
}

//废止
function AbolishArchive(id, archiveStatus) {
    if (confirm('确实要废止此预案吗?')) {
        $.ajax({
            url: "/Dossier/modifyArchiveState",
            type: "post",
            data: "&Id=" + id + "&archiveStatus=" + archiveStatus,
            datatype: 'json',
            async: false,
            success: function (data) {
                if (data.status == 0) {
                    if (data.msg == true) {
                        alert("废止成功!");
                    }
                    else {
                        alert("废止失败!");
                      
                    }
                    getDossierData(pageIndex, pageSize)
                }
                else {
                    alert("废止出现" + data.msg + "错误请联系管理员！");
                    getDossierData(pageIndex, pageSize)
                }
            },


            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("废止出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    }
}

//浏览图片
function previewImage(ImgUrl) {
    window.open(ImgUrl);
}

//下载文件
function saveAs(imgUrl, extName, fileName) {
    $("#dd").attr("src", "/Dossier/SaveDocument?url=" + imgUrl + '&extName=' + extName + '&fileName=' + fileName);
}

//全部导出
function unconditionalExportFile()
{
    if (confirm("你确定要导出全部卷宗吗？"))
    {
        exportArchiveExcel("", -1, -1, "", "")
    }

}

//条件导出
function conditionalExportFile()
{
    var archiveName = $("#archiveName").val();
    var archiveType = $("#archiveType").val();
    var archiveStatus = $("#archiveStatus").val();
    var createTime = $("#createTime").val();
    var endTime = $("#endTime").val();
    var html = "";
    if (confirm("你确定要导出卷宗吗？"))
    {
        exportArchiveExcel(archiveName, archiveType, archiveStatus, createTime, endTime);
    }
}

function exportArchiveExcel(archiveName, archiveType, archiveStatus, createTime, endTime)
{
    /*获取复选框被选中的值*/
    var result = "";
    var checkedItems = $('#dg').datagrid('getChecked');
    $.each(checkedItems, function (index, item_new) {
        if (result != "")
            result += ",";
        result += item_new.id;
    });
    post_blank("/Dossier/ExportArchiveExcel?Random=" + Math.floor(Math.random() * 100000), {
        result_id: result,
        archiveName: archiveName,
        archiveType: archiveType,
        archiveState: archiveStatus,
        starteTime: createTime,
        endtTime: endTime
 });
}

//往后台传递html字符串
function post_blank(URL, PARAMS) {
    var temp = document.createElement("form");
    temp.action = URL;
    temp.method = "post";
    //temp.target = "_blank";
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

//导出Excel模板
function exportTemplate()
{
    post_blank("/Dossier/ExportTemplate?Random=" + Math.floor(Math.random() * 100000));
}

//将上传成功的文件添加到关联文件中
function SuccessTips(file, response) {
    var data = response;

    if (data != null) {
        if (!/.(xlsx|xls|xlsm|xlsb|xltx|xlt|xlam|xla)$/.test(data.exfileExtName)) {
            alert("请上传Excel文档！")
        }
        else {
            $.ajax({
                url: "/Dossier/UploadSetSqlData",
                type: "post",
                data: "filePath=" + data.filePath,
                datatype: 'json',
                async: true,
                success: function (data) {
                    if (data.status == 0) {
                        if (data.msg == true) {
                            alert("导入成功!");
                        }
                        getDossierData(pageIndex, pageSize)
                    }
                    else {
                        alert("导入卷宗出现" + data.msg + "错误请联系管理员！");
                        getDossierData(pageIndex, pageSize)
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("导入卷宗出现" + XMLHttpRequest.status + "错误请联系管理员！");
                }
            });
        }
    }
    else {
        alert("上传失败！");

    }
}






