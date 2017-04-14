
$(document).ready(function () {
    //获取电脑屏幕的高
    //winHeight = $(window).height(); 
    //winWidth = $(window).width();
    //var minheight = (winHeight - 197);
    //$('#report_dg').css({
    //    height: minheight
    //})
    
    loadingShowReportdg();
    loadingShowHandledg();
    $('#handle_dialog').dialog({ modal: true });
    $('#info_dialog').dialog({ modal: true });
    $('#updata_dialog').dialog({ modal: true });
    $("#show_handle_dialog").dialog({ modal: true });
    $("#show_updata_dialog").dialog({ modal: true });
    $("#handle_dialog").dialog('close');
    $("#info_dialog").dialog('close');
    $("#updata_dialog").dialog('close');
    $('#show_handle_dialog').dialog('close');
    $('#show_updata_dialog').dialog('close');
    


    

    $("#handle_person").multiselect({//案件负责人初始化下拉菜单
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight: 150,

    });

    $("#searchreport_type").multiselect({//案件类型初始化下拉菜单
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight: 150,

    });
    lodingDataReportType();

    //var aacHeight = $(window).height();
    //var aacWidth = $(window).width();
    //aacheight = aacHeight - 227;
    //$('#report_dg').height(aacheight);

    loadDeviceAACData(pageIndex, pageSize);

    //getDeviceAACData(pageIndex, pageSize);

    createFileTable();
    webUploadHandleFile();
    
    searchReportInfo(1,30);
});

var pageIndex = 1;
var pageSize = 30; //默认初始化每页行数
var aacdata = [];
var loadingpopup;
var updata_suspect = [];//等待更新的嫌疑人信息
var updata_fileinfo= [];//等待更新的文件信息
var updata_reportinfo = [];//等待更新的接警信息
var updatafileid = "";//待更新的文件id，关联id和文件id用-隔开,每项间用,隔开
var updatasuspectid = "";//待更新嫌疑人id,每项间用,隔开
var base_reportid = 0;//接警id处警用
var base_reportnum = 0;//接警编号处警用
var updataoradd_handle = 0;//1为添加 2为修改
//点击查询按钮
function getAACDataInfo() {
    getDeviceAACData(pageIndex, pageSize);
}


//加载搜索栏案件类型下拉菜单数据
function lodingDataReportType() {

    var all_person = [];
    if (reporttypeList != null && reporttypeList != "" && reporttypeList != undefined) {

        for (var i = 0; i < reporttypeList.length; i++) {
            var objecturl = {
                "label": reporttypeList[i].type_name,
                "value": reporttypeList[i].id
            };
            all_person.push(objecturl);
        }
        $("#report_type_select").multiselect('dataprovider', all_person);
        $('#report_type_select').multiselect('refresh');//multiselect刷新重新加载项
        var objectnull = {
            "label": "无",
            "value": 0
        };
        all_person.push(objectnull);
        $("#searchreport_type").multiselect('dataprovider', all_person);
        $("#searchreport_type").multiselect('select', 0);//案件类型
        $('#searchreport_type').multiselect('refresh');//multiselect刷新重新加载项

    }
    else {


        var objectnull = {
            "label": "无",
            "value": 0
        };
        all_person.push(objectnull);
        $("#report_type_select").multiselect('dataprovider', all_person);
        $('#report_type_select').multiselect('refresh');//multiselect刷新重新加载项

        $("#searchreport_type").multiselect('dataprovider', all_person);
        $("#searchreport_type").multiselect('select', 0);//案件类型
        $('#searchreport_type').multiselect('refresh');//multiselect刷新重新加载项

    }
}


//获取生成信息列表
function loadDeviceAACData(pageIndex, pageSize) {
    /*------------------*/
    $('#report_dg').datagrid({
        data: aacdata,
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
            Util.changeRowBGColor("report_dg", rowIndex);
        },
        onMouseOutRow: function (e, rowIndex, rowData) {
            Util.rowOut("report_dg", rowIndex);
        },
        toolbar: [
        {
            iconCls: 'icon-add ',
            text: "接警",
            handler: function () { window.location.href = "/AAC/Register" }
        }
       // , '-',
       //{
       //    iconCls: 'icon-redo',
       //    text: "导出",
       //    handler: function () { drivePlanById(); }
       //}
        ],
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'region_name', title: '园区名称', width: 40, align: "center", sortable: false },
            { field: 'report_num', title: '案件编号', width: 40, align: "center", sortable: false },
            { field: 'report_type', title: '案件类型', width: 40, align: "center", sortable: false },
            { field: 'incident_area_id', title: '案发区域', width: 60, align: "center", sortable: false },
            { field: 'report_person_name', title: '报案人姓名', width: 40, align: "center", sortable: false },
            { field: 'report_person_phone', title: '联系电话', width: 80, align: "center", sortable: false },
            { field: 'report_time', title: '报案时间', width:60, align: "center", sortable: true },
            //{ field: 'incident_time', title: '案发时间', width: 70, align: "center", sortable: true },
            { field: 'incident_status', title: '案件状态', width: 40, align: "center", sortable: false },
            {
                field: 'ext1', title: '转卷宗', width: 50, align: "center", sortable: false,
                formatter: function (value, row, index) {
                    if (Number(row.region_id) == Number(regionId)) {
                        if (value == 1) {
                            return '<button  id=""class="btn btn-xs btn-success" onclick=\'outArchive("' + row.id + '")\'>转卷宗</button>'
                        }
                        else if (value == -1) {
                            return '<button  id=""class="btn btn-warning btn-xs" disabled="true")\'>转卷宗</button>'
                        }
                    }
                    else {

                        return '<button  id=""class="btn btn-warning btn-xs" disabled="true")\'>转卷宗</button>'
                    }
                }
            },
            {
                field: 'id', title: '操作', width: 100, align: "center", sortable: false,
                formatter: function (value, row, index) {
                    if (Number(row.region_id) == Number(regionId)) {
                        if (row.incident_status == "结案") {
                            return '<button  id=""class="btn btn-xs btn-success" onclick=\'viewDetails("' + value + '","' + row.region_id + '")\'>查&ensp;&ensp;看</button> <button  id=""class="btn btn-xs btn-success" disabled="true")\'>处&ensp;&ensp;警</button> <button  id=""class="btn btn-warning btn-xs" onclick=\'udataReport("' + value + '")\'>修&ensp;&ensp;改</button> <button  id="" class="btn btn-danger btn-xs" onclick=\'delAACInfo("' + value + '")\'>删&ensp;&ensp;除</button>'
                        }
                        else {
                            return '<button  id=""class="btn btn-xs btn-success" onclick=\'viewDetails("' + value + '","' + row.region_id + '")\'>查&ensp;&ensp;看</button> <button  id=""class="btn btn-xs btn-success" onclick=\'addHandle("' + value + '","' + row.report_num + '")\'>处&ensp;&ensp;警</button> <button  id=""class="btn btn-warning btn-xs" onclick=\'udataReport("' + value + '")\'>修&ensp;&ensp;改</button> <button  id="" class="btn btn-danger btn-xs" onclick=\'delAACInfo("' + value + '")\'>删&ensp;&ensp;除</button>'
                        }
                    }
                    else {
                        return '<button  id=""class="btn btn-xs btn-success" onclick=\'viewDetails("' + value + '","' + row.region_id + '")\'>查&ensp;&ensp;看</button> <button  id=""class="btn btn-xs btn-success" disabled="true")\'>处&ensp;&ensp;警</button> <button  id=""class="btn btn-warning btn-xs" disabled="true">修&ensp;&ensp;改</button> <button  id="" class="btn btn-danger btn-xs" disabled="true">删&ensp;&ensp;除</button>'
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
    $('#report_dg').datagrid('getPager').pagination({//分页栏下方文字显示
        showPageList: true,
        pageSize: pageSize, //每页显示的记录条数，默认为10
        pageNumber: pageIndex, //重点:传入当前页数
        pageList: [5, 10, 20, 30, 50], //可以设置每页记录条数的列表    
        beforePageText: '第', //页数文本框前显示的汉字   
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示{from}-{to}条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{total}条',
        onChangePageSize: function (pageNumber, pageSize) {
            //一页显示几条

            searchReportInfo(pageNumber, pageSize);
        },
        onSelectPage: function (pageNumber, pageSize) {
            //下一页

            searchReportInfo(pageNumber, pageSize);
        },
        onChangePageSize: function () {
            //选择显示条数事件

        },
        onRefresh: function (pageNumber, pageSize) {
            //pageIndex = pageNumber;
            // 刷新按钮
            searchReportInfo(pageNumber, pageSize);
        }
    });
}

//获取所有接警信息
function getDeviceAACData(pageIndex, pageSize) {
 
    $.ajax({
        url: "/AAC/GetIndexItems",
        type: "post",
        data: "pageNumber=" + pageSize + "&pageSize=" + pageIndex + "&regionid=" + regionId,// + "&createTime=" + createTime + "&endTime=" + endTime,
        datatype: 'json',
        async: true,
        beforeSend: function (XMLHttpRequest) {
            $('#report_dg').datagrid('loading', "正在加载...");
        },
        success: function (data) {
            if (data.status==1) {
                alert("接处警列表加载出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data.msg != null) {
                    aacdata = data.msg;
                    $('#report_dg').datagrid('loadData', aacdata.data);
                    $('#report_dg').datagrid('getPager').pagination('refresh', {
                        total: aacdata.total,
                        pageNumber: pageIndex,
                        pageSize: pageSize
                    });
                }
            $('#report_dg').datagrid('loaded');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("接处警列表数据加载"+XMLHttpRequest.status + "错误请联系管理员！");
            $('#report_dg').datagrid('loaded');

        }
    });



}


//接警信息修改弹窗加载
function udataReport(report_id) {

    delfilepath = [];//初始化需删除的文件字符串

    updata_suspect = [];//等待更新的嫌疑人信息
    updata_fileinfo = [];//等待更新的文件信息
    updata_reportinfo = [];//等待更新的接警信息
    clearForm();
    WebUploadPhoto();//初始化上传图片插件
    WebUploadFile();//初始化上传文件插件
    $("#updata_dialog").dialog('open');
    //获取接警信息
    $.ajax({
        url: "/AAC/GetReportAllInfoByID",
        type: "post",
        data: "id=" + report_id,
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("接警信息加载出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data.msg != null) {
                    //加载基础信息
                    updata_reportinfo = data.msg.report;
                    updataFormInfo(updata_reportinfo);
                    //嫌疑人
                    updata_suspect = data.msg.suspect;
                    if (updata_suspect != null && updata_suspect != undefined && updata_suspect != "") {
                        updatasuspectid = "";//初始化嫌疑人字符串
                        for (var i = 0; i < updata_suspect.length; i++) {
                            
                            if (i == updata_suspect.length-1) {
                                updatasuspectid += updata_suspect[i].id;
                            }

                            else {
                                updatasuspectid += updata_suspect[i].id + ",";
                            }
                            if (i > 0) {
                                addSuspectForm();//添加嫌疑人form
                                WebUploadPhoto();//初始化上传图片插件
                                //$("#suspect_close_" + (i + 1)).attr("style", "display: none;");
                            }
                            $("#suspect_name_" + (i + 1)).val(updata_suspect[i].suspect_name);//嫌疑人姓名
                            $("#suspect_gender_" + (i + 1)).val(updata_suspect[i].suspect_gender);//嫌疑人性别
                            $("#suspect_nationality_" + (i + 1)).val(updata_suspect[i].suspect_nationality);//嫌疑人国籍
                            $("#suspect_featrue_" + (i + 1)).val(updata_suspect[i].suspect_featrue);//嫌疑人特征
                            $("#suspect_credential_" + (i + 1)).val(updata_suspect[i].suspect_credential);//嫌疑人证件号

                            updata_suspect[i].suspect_gender = i + 1;
                            if (updata_suspect[i].suspect_photo != null && updata_suspect[i].suspect_photo != undefined && updata_suspect[i].suspect_photo != "" && updata_suspect[i].suspect_photo.indexOf('/') > -1) {
                                var urlarr = updata_suspect[i].suspect_photo.split('/');
                                var filename = urlarr[urlarr.length - 1].split('.');
                                suspectall.push({
                                    "id": i + 1, "fileid": updata_suspect[i].id, "name": filename[0], "url": updata_suspect[i].suspect_photo
                                });
                                $("#suspect_phototext_" + (i + 1)).val(filename[0]);//嫌疑人照片
                            }
                        }
                    }

                    //关联文件

                    updata_fileinfo = data.msg.file;
                    if (updata_fileinfo != null && updata_fileinfo != undefined && updata_fileinfo != "") {
                        updatafileid = "";//先初始化字符
                        for (var h = 0; h < updata_fileinfo.length; h++) {
                            if (h == updata_fileinfo.length - 1) {
                                updatafileid += updata_fileinfo[h].id + "-" + updata_fileinfo[h].fileid;
                            }
                            else {

                                updatafileid += updata_fileinfo[h].id + "-" + updata_fileinfo[h].fileid+",";
                            }
                            $("#addDocumentInfodg").datagrid('insertRow', {
                                row: {
                                    file_name: updata_fileinfo[h].file_name,//文件名
                                    create_time: Util.changeDateFormat(updata_fileinfo[h].create_time),//创建时间
                                    ext: updata_fileinfo[h].file_ext_name,//扩展名
                                    file_address: updata_fileinfo[h].file_address,//文件地址
                                    id: updata_fileinfo[h].id,//关联表id
                                    fileid: updata_fileinfo[h].fileid//文件表id
                                }
                            });
                        }
                    }



                }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("接处警修改数据" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });

}


//老的方法修改接警信息按钮
function udataReportold(report_id) {
   // $("#updata_dialog").dialog('close');
    updata_suspect = [];//等待更新的嫌疑人信息
    updata_fileinfo = [];//等待更新的文件信息
    updata_reportinfo = [];//等待更新的接警信息
    clearForm();
    WebUploadPhoto();//初始化上传图片插件
    WebUploadFile();//初始化上传文件插件
    $("#updata_dialog").dialog('open');
    //获取接警信息
    $.ajax({
        url: "/AAC/GetReportInfoByID",
        type: "post",
        data: "id=" + report_id ,
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("接警信息加载出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data.msg != null) {
                    updata_reportinfo = data.msg;
                    updataFormInfo(updata_reportinfo);
                }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("接处警修改数据" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });

    //获取嫌疑人信息
    $.ajax({
        url: "/AAC/GetSuspectInfoByID",
        type: "post",
        data: "id=" + report_id,
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("接警信息加载出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data.msg != null) {
                    updata_suspect = data.msg;
                    if (updata_suspect != null && updata_suspect != undefined && updata_suspect != "")
                    {
                        for (var i = 0; i < updata_suspect.length; i++) {
                            if (i > 0) {
                                addSuspectForm();//添加嫌疑人form
                                WebUploadPhoto();//初始化上传图片插件
                                //$("#suspect_close_" + (i + 1)).attr("style", "display: none;");
                            }
                            $("#suspect_name_" + (i + 1)).val(updata_suspect[i].suspect_name);//嫌疑人姓名
                            $("#suspect_gender_" + (i + 1)).val(updata_suspect[i].suspect_gender);//嫌疑人性别
                            $("#suspect_nationality_" + (i + 1)).val(updata_suspect[i].suspect_nationality);//嫌疑人国籍
                            $("#suspect_featrue_" + (i + 1)).val(updata_suspect[i].suspect_featrue);//嫌疑人特征
                            $("#suspect_credential_" + (i + 1)).val(updata_suspect[i].suspect_credential);//嫌疑人证件号

                            updata_suspect[i].suspect_gender = i + 1;
                            if (updata_suspect[i].suspect_photo != null && updata_suspect[i].suspect_photo != undefined && updata_suspect[i].suspect_photo!= ""&&updata_suspect[i].suspect_photo.indexOf('/') > -1) {
                                var urlarr = updata_suspect[i].suspect_photo.split('/');
                                var filename = urlarr[urlarr.length - 1].split('.');
                                suspectall.push({
                                    "id": i + 1, "fileid": updata_suspect[i].id, "name": filename[0], "url": updata_suspect[i].suspect_photo
                                });
                                $("#suspect_phototext_" + (i + 1)).val(filename[0]);//嫌疑人照片
                            }
                        }
                    }
                   // updataFormInfo(aacdata);
                }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("接处警获取嫌疑人" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
    //获取接处警文件
    $.ajax({
        url: "/AAC/GetReportFileByID",
        type: "post",
        data: "id=" + report_id + "&handleid=" + -1,
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("接警信息加载出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data.msg != null) {
                    updata_fileinfo = data.msg;
                    if (updata_fileinfo != null && updata_fileinfo != undefined && updata_fileinfo != "") {
                        for (var i = 0; i < updata_fileinfo.length; i++) {
                            $("#addDocumentInfodg").datagrid('insertRow', {
                                row: {
                                    file_name: updata_fileinfo[i].file_name,//文件名
                                    create_time: Util.changeDateFormat(updata_fileinfo[i].create_time),//创建时间
                                    ext: updata_fileinfo[i].file_ext_name,//扩展名
                                    file_address: updata_fileinfo[i].file_address,//文件地址
                                    id: updata_fileinfo[i].id,//关联表id
                                    fileid: updata_fileinfo[i].fileid//文件表id
                                    //file_ext_name: response.exfileExtName
                                }
                            });
                        }
                    }
                }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("接处警获取接处警文件" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });

}

//更新接警表单的值
function updataFormInfo(data) {
    $("#report_num").val(data.report_num);//填写案件编号
    //默认设置报案时间为当前时间
    $("#report_time").val(Util.changeDateFormat(data.report_time));//默认填写报案时间
    $("#incident_time").val(Util.changeDateFormat(data.incident_time));//案发时间
    $("#report_type_select").multiselect('select', data.report_type);//案件类型
    $('#report_type_select').multiselect('refresh');//multiselect刷新重新加载项
    //$("#report_type").val(data.report_type);
    $("#report_person_name").val(data.report_person_name);//报案人姓名
    $("#report_person_gender").val(data.report_person_gender);//报案人性别
    $("#incident_area_id").multiselect('select', data.incident_area_id);//案发的区域
    $('#incident_area_id').multiselect('refresh');//multiselect刷新重新加载项
    $("#incident_address").val(data.incident_address);//案发的地址
    $("#report_person_credentialtype").val(data.report_person_credentialtype);//报案人证件类型
    $("#report_person_credential").val(data.report_person_credential);//报案人证件号
    $("#report_person_phone").val(data.report_person_phone);//联系人电话
    $("#report_person_dept").val(data.report_person_dept);//报案人单位
    $("#report_person_address").val(data.report_person_address);//报案人住址
    $("#report_person_nationality").val(data.report_person_nationality);//报案人国籍
    $("#report_text").val(data.report_text);//报案的内容
    $("#report_content").val(data.report_content);//备注信息
    
    $("#manager_name").multiselect('select', data.manager_id);//案件负责人
    $('#manager_name').multiselect('refresh');//multiselect刷新重新加载项
   
    $("#report_refer_person").multiselect('select', data.report_refer_person);//案件转交人
    $('#report_refer_person').multiselect('refresh');//multiselect刷新重新加载项
    
}



//修改接警信息
function updataAACInfo() {
    //updata_reportinfo.report_num = $("#report_num").val();//案件编号
    updata_reportinfo.manager_id = $("#manager_name").val();//案件负责人
    if (updata_reportinfo.manager_id == undefined || updata_reportinfo.manager_id == null || updata_reportinfo.manager_id == "") {
        alert("请选择案件负责人");
        $("#manager_name").focus();
        return false;
    }
    updata_reportinfo.report_type = $("#report_type_select").val();//案件类型
    if (updata_reportinfo.report_type == undefined || updata_reportinfo.report_type == null || updata_reportinfo.report_type == "") {
        alert("请选择案件类型");
        $("#report_type_select").focus();
        return false;
    }
    updata_reportinfo.report_time = $("#report_time").val();//报案时间
    if (updata_reportinfo.report_time == undefined || updata_reportinfo.report_time == null || updata_reportinfo.report_time == "") {
        alert("请选择报案时间");
        $("#report_time").focus();
        return false;
    }
    updata_reportinfo.incident_time = $("#incident_time").val();//案发时间
    if (updata_reportinfo.incident_time == undefined || updata_reportinfo.incident_time == null || updata_reportinfo.incident_time == "") {
        alert("请选择案发时间");
        $("#incident_time").focus();
        return false;
    }
    updata_reportinfo.report_person_name = $("#report_person_name").val();//报案人姓名
    if (updata_reportinfo.report_person_name == undefined || updata_reportinfo.report_person_name == null || updata_reportinfo.report_person_name == "") {
        alert("请填写报案人姓名");
        $("#report_person_name").focus();
        return false;
    }
    updata_reportinfo.report_person_gender = $("#report_person_gender").val();//报案人性别
    if (updata_reportinfo.report_person_gender == undefined || updata_reportinfo.report_person_gender == null || updata_reportinfo.report_person_gender == "") {
        alert("请选择报案人性别");
        $("#report_person_gender").focus();
        return false;
    }
    updata_reportinfo.incident_area_id = $("#incident_area_id").val();//案发区域
    if (updata_reportinfo.incident_area_id == undefined || updata_reportinfo.incident_area_id == null || updata_reportinfo.incident_area_id == "") {
        alert("请选择案发区域");
        $("#incident_area_id").focus();
        return false;
    }
    updata_reportinfo.incident_address = $("#incident_address").val();//案发的地址
    if (updata_reportinfo.incident_address == undefined || updata_reportinfo.incident_address == null || updata_reportinfo.incident_address == "") {
        alert("请填写案发地址");
        $("#incident_address").focus();
        return false;
    }
    updata_reportinfo.report_person_credentialtype = $("#report_person_credentialtype").val();//报案人证件类型
    if (updata_reportinfo.report_person_credentialtype == undefined || updata_reportinfo.report_person_credentialtype == null || updata_reportinfo.report_person_credentialtype == "") {
        alert("请选择报案人证件类型");
        $("#report_person_credentialtype").focus();
        return false;
    }
    updata_reportinfo.report_person_credential = $("#report_person_credential").val();//报案人证件号
    updata_reportinfo.report_person_phone = $("#report_person_phone").val();//联系人电话
    updata_reportinfo.report_person_dept = $("#report_person_dept").val();//报案人单位
    updata_reportinfo.report_person_nationality = $("#report_person_nationality").val();//报案人国籍
    updata_reportinfo.report_person_address = $("#report_person_address").val();//报案人国籍
    updata_reportinfo.report_refer_person = $("#report_refer_person").val();//案情转交人
    if (updata_reportinfo.report_refer_person == undefined || updata_reportinfo.report_refer_person == null || updata_reportinfo.report_refer_person == "") {
        alert("请选择案情转交人");
        $("#report_refer_person").focus();
        return false;
    }
    updata_reportinfo.report_text = $("#report_text").val();//报案的内容
    updata_reportinfo.report_content = $("#report_content").val();//备注信息



    //{ "id":, "file_name":,"file_ext_name":,"file_address":,"person_id":,"create_time":,"file_type":,"content":,"ext1":,"ext2":,"ext3":,"ext4":,"ext5":,"fileid":,"report_id":,"relate_id":,"type":,"handle_id":}

    //var filelist = "";//更新文件
    //var addRegItems = $('#addDocumentInfodg').datagrid('getRows');
    //for (var l = 0; l < addRegItems.length; l++) {
    //    var tempfile = "";
    //    var tempnum = 0;
    //    //上传文件信息
    //    for (var i = 0; i < updata_fileinfo.length; i++) {

    //        if (updata_fileinfo[i].id == addRegItems[l].id) {
                
    //            tempfile = JSON.stringify(updata_fileinfo[i]);//缓存文件列表

    //            if (l == (addRegItems.length - 1)) {
    //                filelist += tempfile;
    //            }
    //            else {
    //                filelist += tempfile + "|";//需提交的文件列表
    //            }
    //            tempnum = 1;
    //            updata_fileinfo.splice(i, 1);
    //        }
       
    //    }
    //    if (tempnum == 0) {
    //        tempfile = JSON.stringify({ "id": -1, "file_name": addRegItems[l].file_name, "file_ext_name": addRegItems[l].ext, "file_address": addRegItems[l].file_address, "person_id": -1, "create_time": addRegItems[l].create_time, "file_type": -1, "content": "", "ext1": "", "ext2": "", "ext3": "", "ext4": "", "ext5": "", "fileid": -1, "report_id": -1, "relate_id": -1, "type": -1, "handle_id": -1 });

    //        if (l == (addRegItems.length - 1)) {
    //            filelist += tempfile;
    //        }
    //        else {
    //            filelist += tempfile + "|";//需提交的文件列表
    //        }
    //    }
    //}


    //if (updata_fileinfo.length > 0) {

    //    for (var u = 0; u < updata_fileinfo.length; u++) {
    //        updata_fileinfo[i].file_ext_name = -1;
    //        tempfile = JSON.stringify(updata_fileinfo[i]);//缓存文件列表
    //        if (l == (updata_fileinfo.length - 1)) {
    //            filelist += tempfile;
    //        }
    //        else {
    //            filelist += tempfile + "|";//需提交的文件列表
    //        }
    //    }

    //}


    ////嫌疑人信息
    //var suspect_info = [];
    //var suspect_all_info = $("#suspect_div").children();
    //for (var i = 0; i < suspect_all_info.length; i++) {
    //    var url = null;
    //    var num_arr = (suspect_all_info[i].id).split("_");
    //    var num_id = Number(num_arr[num_arr.length - 1]);//嫌疑人div编号
    //    var suspectid = -1;
    //    for (var l = 0; l < suspectall.length; l++) {
    //        if (Number(suspectall[l].id) == num_id)
    //        { url = suspectall[l].url; }
    //    }
    //    for (var h = 0; h < updata_suspect.length; h++) {

    //        if (num_id == updata_suspect[h].suspect_gender) {

    //            suspectid = updata_suspect[h].id;
    //            updata_suspect.splice(h, 1);
    //        }
    //    }
    //    var suspectA = "suspect_name_" + num_id;
    //    var suspectG = "suspect_gender_" + num_id;
    //    var suspectN = "suspect_nationality_" + num_id;
    //    var suspectF = "suspect_featrue_" + num_id;
    //    var suspectC = "suspect_credential_" + num_id;

    //    ////var json_suspect_info = { "id": suspectid, "report_id": updata_reportinfo.report_num, "suspect_name": $("#" + suspectA).val(), "suspect_nationality": $("#" + suspectN).val(), "suspect_gender": +$("#" + suspectG).val(), "suspect_featrue": $("#" + suspectF).val(), "suspect_photo": url, "suspect_credential": $("#" + suspectC).val() };

    //    var json_suspect_info = '{"id":' + suspectid + ',"report_id":' + updata_reportinfo.id + ',"suspect_name":"' + $("#" + suspectA).val() + '","suspect_nationality":"' + $("#" + suspectN).val() + '","suspect_gender":' + $("#" + suspectG).val() + ',"suspect_featrue":"' + $("#" + suspectF).val() + '","suspect_photo":"' + url + '","suspect_credential":" ' + $("#" + suspectC).val() + '"}';
    //    if (i < suspect_all_info.length - 1) { suspect_info += json_suspect_info + "|"; }
    //   // //suspect_info.push(json_suspect_info);
    //   else { suspect_info += json_suspect_info;}
    //}
  //  //for (var i = 0; i < suspect_info.length; i++) {
   // //    for (var h = 0; h <updata_suspect.length; h++) {

   // //        if(suspect_info[i].id == updata_suspect[h].suspect_gender){
            
   // //            suspect_info[i].id == updata_suspect[h].id;
  //  //        }
  //  //    }
  //  //}
    //  //suspect_info = '{"suspect_arr":[' + suspect_info + ']}';
    //嫌疑人信息
    var suspect_info = "";
    var suspect_all_info = $("#suspect_div").children();
    for (var i = 0; i < suspect_all_info.length; i++) {
        var url = null;
        var num_arr = (suspect_all_info[i].id).split("_");
        var num_id = Number(num_arr[num_arr.length - 1]);//嫌疑人div编号
        for (var l = 0; l < suspectall.length; l++) {
            if (Number(suspectall[l].id) == num_id) {
                url = suspectall[l].url;
            }
        }
        var suspectA = "suspect_name_" + num_id;
        var suspectG = "suspect_gender_" + num_id;
        var suspectN = "suspect_nationality_" + num_id;
        var suspectF = "suspect_featrue_" + num_id;
        var suspectC = "suspect_credential_" + num_id;

        var json_suspect_info = '{"suspect_name":"' + $("#" + suspectA).val() + '","suspect_gender":"' + $("#" + suspectG).val() + '", "suspect_nationality":"' + $("#" + suspectN).val() + '", "suspect_featrue":"' + $("#" + suspectF).val() + '", "suspect_credential":" ' + $("#" + suspectC).val() + '","url":"' + url + '"}';
        if (i < suspect_all_info.length - 1) {
            suspect_info += json_suspect_info + ",";
        }
        else {
            suspect_info += json_suspect_info
        }
        //.push(json_suspect_info);
    }
    suspect_info = '{"suspect_arr":[' + suspect_info + ']}';
    var filelist = $('#addDocumentInfodg').datagrid('getRows');
    filelist = JSON.stringify(filelist);//序列化数组
    var json_delfilepath = JSON.stringify(delfilepath);//序列化数组
    var json_reportinfo = JSON.stringify(updata_reportinfo);//序列化
    $.ajax({
        type: "post", //这里是http类型
        //url: "/AAC/UpdataReport",
        //data: "reportinfo=" + JSON.stringify(updata_reportinfo) + "&fileinfo=" + filelist + "&suspectinfo=" + suspect_info,
        url: "/AAC/UpdataReportInfo",
        data: "reportinfo=" + json_reportinfo + "&fileinfo=" + filelist + "&suspectinfo=" + suspect_info + "&oldsuspectid=" + updatasuspectid + "&oldfileid=" + updatafileid + "&delfilepath=" + json_delfilepath,
        dataType: "json", //传回来的数据类型
        async: false,
        success: function (data) {
            if (data.status == 0) {
                if (data.msg == true) {
                    alert("修改成功！");
                    var reportid = updata_reportinfo.id;
                    clearForm();  
                    updata_reportinfo = null;
                    filelist = null;
                    suspect_info = null;
                    updata_fileinfo = null;
                    searchReportInfo(pageIndex, pageSize);//更新主页列表
                    udataReport(reportid);
                    $('#updata_dialog').dialog('close');//关闭弹窗
                    // canceladd();
                    // getPlanOrdinanc(pageIndex, pageSize);

                }
                else {
                    alert("修改失败！");
                }
            }
            else {
                alert("修改接处警出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("修改接处警出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}

//删除接警信息
function delAACInfo(id) {
    if (confirm("确实要删除此条接触警的所有信息么？")) {
        $.ajax({
            url: "/AAC/DelReportInfo",
            type: "post",
            data: "id=" + id,
            datatype: 'json',
            async: true,
            success: function (data) {
                if (data.status == 1) {
                    alert("删除接警信息出现" + data.msg + "错误请联系管理员！");
                }
                else {
                    //getAACDataInfo();
                    searchReportInfo(pageIndex, pageSize);//更新主页列表
                    //udataReport(reportid);
                    alert("删除成功！");
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("删除接触警" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    }
}



//关联文件显示
function createFileTable() {
    /*------------------*/
    $('#handlefile_dg').datagrid({
        data: "",
        fitColumns: false,
        singleSelect: false,
        method: 'get',
        loadMsg: '正在加载……',
        pageNumber: 1, //重点:传入当前页数
        checkbox: true,
        pagination: false, //分页控件 
        rownumbers: true, //行号
        checkOnSelect: false,
        queryParams: {
        },
        toolbar: [
        {
            iconCls: 'icon-add',
            id: 'addhandlefile',
            text: '上传',
            handler: function () {
            }
        },
    '-',
        {
            iconCls: 'icon-remove',
            text: '删除',
            handler: function () { deleHandleFileItem() }
        }
        ],
        columns: [[
            {field: 'ck', checkbox: true},
            { field: 'file_name', title: '文件名称', width: '150', align: "center" },
            { field: 'create_time', title: '添加时间', width: '150', align: "center" }
        ]],
        singleSelect: false,
        onLoadSuccess: function (data) {
        },
        onLoadError: function () {
            alert('关联文件显示加载失败');
        }

    });
}


//删除已上传文件
function deleHandleFileItem() {
    var result = "";
    var conent = 0;
    var datagrid_code = "#handlefile_dg";
    var checkedItems = $("#handlefile_dg").datagrid('getChecked');
    if(updataoradd_handle == 1)
        {$.each(checkedItems, function (index, item_new) {
            if (result != "")
                result += ",";
            result += '"' + item_new.file_address + '"';
        // result.push(item_new.file_address);
            conent++;
    });
        result = '[' + result + ']';
}
    else if (updataoradd_handle == 2) {

            $.each(checkedItems, function (index, item_new) {
                delfilepath.push(item_new.file_address);

            });

            var row = $("#handlefile_dg").datagrid('getChecked');
            if (row) {
                for (var i = 0; i < row.length; i++) {
                    var rowIndex = $("#handlefile_dg").datagrid('getRowIndex', row[i]);
                    $("#handlefile_dg").datagrid('deleteRow', rowIndex);
                    $("#handlefile_dg").datagrid('reload');//删除后重新加载下
                }
            }
            return;
        }
    if (conent == 0) {
        alert("请选择要删除的关联文件");
    }
    else {
        deleFileTable(result,datagrid_code)
    }
}




/*-------------------------------------------------------------*/
/*用途：处警上传文件
//                       
/*-------------------------------------------------------------*/


function webUploadHandleFile() {
    jQuery(function () {
        var $ = jQuery,
        // 实例化
        upLoaders = WebUploader.create({
            // 自动上传。
            auto: true,
            // swf文件路径
            swf: '../../dist/Uploader.swf',

            // 文件接收服务端。
            server: file_serverUrl,
            chunked: false,
            fileSizeLimit: 1000 * 1024 * 1024,
            fileSingleSizeLimit: 1000 * 1024 * 1024,
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#addhandlefile'
        });
        // 当有文件添加进来之前
        upLoaders.on('beforeFileQueued', function (file) {
            if (!confirm("确定要上传此文件吗？")) {
                return false;
            }
            upLoaders.reset();
        }
                        );
        //当文件上传成功把路径显示在文本框
        upLoaders.on('uploadSuccess', function (file, response) {
            if (response.status == 0) {
                addHandleFileTips(file, response);

            }
            else if (response.status == 1) {
                alert(response.msg);
            }
            upLoaders.removeFile(file, true);
        });
        //
        upLoaders.on('uploadFinished', function () {

        });

        upLoaders.on('uploadError', function (file) {
            alert("上传失败");
        });

        //upLoaders.on('uploadComplete', function (file) {
        //    $('#' + file.id).find('.progress').fadeOut();
        //});
    });
}




//将上传成功的文件添加到关联文件中
function addHandleFileTips(file, response) {

    var file_time = Util.getLocalTime();
    $("#handlefile_dg").datagrid('insertRow', {
        row: {
            file_name: response.name,//文件名
            id: -1,//关联表id
            fileid: -1,//文件表id
            create_time: file_time,//创建时间
            ext: file.ext,//扩展名
            file_address: response.filePath//文件路径
            // file_ext_name: response.exfileExtName
        }
    });
}
//打开添加处警弹框
function addHandle(id, report_num) {
    delfilepath = [];//初始化需删除的文件字符串
    $("#handle_type_tr").attr("style", "display:;");
    updata_suspect = [];//等待更新的嫌疑人信息
    updata_fileinfo = [];//等待更新的文件信息
    updata_reportinfo = [];//等待更新的接警信息
    clearHandle();
    updataoradd_handle = 1;
    document.getElementById('handle_button').onclick = function () {
        addHandelInfo(id, report_num);
    };
    $("#handle_dialog").dialog('open');
    webUploadHandleFile();
    $("#handle_time").val(new Date().format("yyyy-MM-dd hh:mm:ss"));//默认填写报案时间
    base_reportid = id;//接警id
    base_reportnum = report_num;//处警编号
}


//查询处警详情
function readHandleInfo(reportid, handleid, reportnum, region_id) {
    document.getElementById('handle_button').onclick = function () {
        updataHandle(reportid, handleid, reportnum, region_id);
    };
    $("#handle_type_tr").attr("style", "display:none;");
    clearHandle();
    delfilepath = [];//初始化需删除的文件字符串
    updata_suspect = [];//等待更新的嫌疑人信息
    updata_fileinfo = [];//等待更新的文件信息
    updata_reportinfo = [];//等待更新的接警信息
    updataoradd_handle = 2;
    $.ajax({
        url: "/AAC/GetHandleInfo",
        type: "post",
        data: "reportid=" + reportid + "&handleid=" + handleid ,
        datatype: 'json',
        async: true,
        //beforeSend: function (XMLHttpRequest) {
        //    $('#report_dg').datagrid('loading', "正在加载...");
        //},
        success: function (data) {
            if (data.status == 1) {
                alert("加载处警详情时出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data.msg != null) {
                    clearHandle();
                    updata_reportinfo = data.msg.data;
                    $("#handle_dialog").dialog('open');
                    $("#handle_type").val(data.msg.data.handle_type);//处警类型
                   // $("#handle_person").val(data.msg.data.handle_person);//处警负责人
                    $("#handle_person").multiselect('select', data.msg.data.handle_person);
                    $('#handle_person').multiselect('refresh');//multiselect刷新重新加载项
                    $("#handle_time").val(Util.changeDateFormat(data.msg.data.handle_time));//处警时间
                    $("#handle_text").val(data.msg.data.handle_text);//处警内容
                    if (data.msg.total > 0) {
                        //关联文件

                        updata_fileinfo = data.msg.file;
                        if (updata_fileinfo != null && updata_fileinfo != undefined && updata_fileinfo != "") {
                            updatafileid = "";//先初始化字符
                            for (var h = 0; h < updata_fileinfo.length; h++) {
                                if (h == updata_fileinfo.length - 1) {
                                    updatafileid += updata_fileinfo[h].id + "-" + updata_fileinfo[h].fileid;
                                }
                                else {

                                    updatafileid += updata_fileinfo[h].id + "-" + updata_fileinfo[h].fileid + ",";
                                }
                                $("#handlefile_dg").datagrid('insertRow', {
                                    row: {
                                        file_name: updata_fileinfo[h].file_name,//文件名
                                        create_time: Util.changeDateFormat(updata_fileinfo[h].create_time),//创建时间
                                        ext: updata_fileinfo[h].file_ext_name,//扩展名
                                        file_address: updata_fileinfo[h].file_address,//文件地址
                                        id: updata_fileinfo[h].id,//关联表id
                                        fileid: updata_fileinfo[h].fileid//文件表id
                                    }
                                });
                            }
                        }
                    }
                    $('#handlefile_dg').datagrid('loaded');
                }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("加载处警信息失败！" + XMLHttpRequest.status + "错误请联系管理员！");

        }
    });

}

//清理处警弹框内容
function clearHandle() {

    $("#handle_text").val("");//清空处警内容
    webUploadHandleFile();
    $("#handle_time").val(new Date().format("yyyy-MM-dd hh:mm:ss"));//默认填写报案时间
    var rows = $("#handlefile_dg").datagrid('getRows');
    if (rows) {
        var rownum = rows.length;
        for (var l = 0; l < rownum; l++) {
            var rowIndex = $("#handlefile_dg").datagrid('getRowIndex', rows[l]);
            $("#handlefile_dg").datagrid('deleteRow', rowIndex);
            $("#handlefile_dg").datagrid('reload');//删除后重新加载下
        }
    }
}


//添加处警信息
function addHandelInfo(report_id, report_num)
{
    //var report_num = base_reportnum;
    //var report_id = base_reportid;
    var handle_type = $("#handle_type").val();//处警类型
    if (handle_type == undefined || handle_type == null || handle_type == "") {
        alert("请选择处警类型");
        $("#handle_type").focus();
        return false;
    }
    var handle_person = $("#handle_person").val();//处警负责人
    if (handle_person == undefined || handle_person == null || handle_person == "") {
        handle_person = -1;
    }
    var handle_time = $("#handle_time").val();//处警时间
    if (handle_time == undefined || handle_time == null || handle_time == "") {
        alert("请选择处警时间");
        $("#handle_time").focus();
        return false;
    }
    var handle_text = $("#handle_text").val();//处警内容
    var addhandleItems = $('#handlefile_dg').datagrid('getRows');

    $.ajax({
        type: "post", //这里是http类型
        url: "/AAC/AddHandleInfo",
        data: "report_num=" + report_num + "&report_id=" + report_id + "&handle_type=" + handle_type + "&handle_person=" + handle_person + "&handle_time=" + handle_time + "&handle_text="
        + handle_text + "&addhandleItems=" + JSON.stringify(addhandleItems),
        dataType: "json", //传回来的数据类型
        async: false,
        success: function (data) {
            if (data.status == 0) {
                if (data.msg == true) {
                    searchReportInfo(pageIndex, pageSize);//更新主页列表
                    alert("添加成功！");
                    clearForm();
                    clearHandle();
                    $("#handle_dialog").dialog('close');
                    // canceladd();
                    // getPlanOrdinanc(pageIndex, pageSize);
                }
                else {
                    alert("添加失败！");
                }
            }
            else {
                alert("添加处警出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("添加处警出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}



//删除处警信息
function delHandleInfo(reportid, handleid, reportnum, region_id) {
    if (confirm("确实要执行删除操作么？")) {
        $.ajax({
            url: "/AAC/DelHandleInfo",
            type: "post",
            data: "reportid=" + reportid + "&handleid=" + handleid,
            datatype: 'json',
            async: true,
            success: function (data) {
                if (data.status == 1) {
                    alert("删除操作出现" + data.msg + "错误请联系管理员！");
                }
                else {
                    $("#info_dialog").dialog('close');
                    viewDetails(reportid,region_id);
                    searchReportInfo(pageIndex, pageSize);//更新主页列表
                    alert("删除成功！");
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("删除接触警信息报错" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    }
}





//修改处警
function updataHandle(details_reportid, details_handleid,report_num,region_id) {

    updata_reportinfo.handle_person = $("#handle_person").val();//案件负责人
    if (updata_reportinfo.handle_person == undefined || updata_reportinfo.handle_person == null || updata_reportinfo.handle_person == "") {
            alert("请选择案件处警人");
            $("#handle_person").focus();
            return false;
        }
    updata_reportinfo.handle_time = $("#handle_time").val();//案件类型
    if (updata_reportinfo.handle_time == undefined || updata_reportinfo.handle_time == null || updata_reportinfo.handle_time == "") {
            alert("请选择处警时间");
            $("#handle_time").focus();
            return false;
        }
    updata_reportinfo.handle_text = $("#handle_text").val();//报案时间
    //if (updata_reportinfo.handle_text == undefined || updata_reportinfo.handle_text == null || updata_reportinfo.handle_text == "") {
    //        alert("请填写处警内容");
    //        $("#handle_text").focus();
    //        return false;
    //    }
    
    var filelist = $('#handlefile_dg').datagrid('getRows');
        filelist = JSON.stringify(filelist);//序列化数组
        var json_delfilepath = JSON.stringify(delfilepath);//序列化数组
        var json_handleinfo = JSON.stringify(updata_reportinfo);//序列化
        $.ajax({
            type: "post", //这里是http类型
            url: "/AAC/UpdataHandleInfo",
            data: "report_num=" + report_num + "&report_id=" + details_reportid + "&handleinfo=" + json_handleinfo + "&fileinfo=" + filelist + "&oldfileid=" + updatafileid + "&delfilepath=" + json_delfilepath,
            dataType: "json", //传回来的数据类型
            async: false,
            success: function (data) {
                if (data.status == 0) {
                    if (data.msg == true) {
                        alert("修改成功！");
                        //var reportid = updata_reportinfo.id;
                        $("#handle_dialog").dialog('close');
                        $("#info_dialog").dialog('close');
                        viewDetails(details_reportid, region_id);
                        //readHandleInfo(details_reportid, details_handleid, report_num, region_id);
                        //clearHandle();
                        // canceladd();
                        // getPlanOrdinanc(pageIndex, pageSize);                 
                        searchReportInfo(pageIndex, pageSize);//更新主页
                        

                    }
                    else {
                        alert("修改失败！");
                    }
                }
                else {
                    alert("修改接处警出现" + data.msg + "错误请联系管理员！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("修改接处警出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    
}


//加载查看处警插件
function loadingShowHandledg() {

    $('#show_handlefile_dg').datagrid({
        data: "",
        fitColumns: false,
        singleSelect: false,
        method: 'get',
        loadMsg: '正在加载……',
        pageNumber: 1, //重点:传入当前页数
        checkbox: true,
        pagination: false, //分页控件 
        rownumbers: true, //行号
        checkOnSelect: false,
        queryParams: {
        },
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'file_name', title: '文件名称', width: '150', align: "center" },
            { field: 'create_time', title: '添加时间', width: '150', align: "center" }
        ]],
        singleSelect: false,
        onLoadSuccess: function (data) {
        },
        onLoadError: function () {
            alert('关联文件显示加载失败');
        }

    });


}

//清理处警弹框内容
function clearShowHandle() {

    //$("#show_handle_type").val("");//清空处警内容
    $("#show_handle_person").val("");//清空处警内容
    $("#show_handle_text").val("");//默认填写报案时间
    $("#show_handle_time").val("");//默认填写报案时间

    var rows = $("#show_handlefile_dg").datagrid('getRows');
    if (rows) {
        var rownum = rows.length;
        for (var l = 0; l < rownum; l++) {
            var rowIndex = $("#show_handlefile_dg").datagrid('getRowIndex', rows[l]);
            $("#show_handlefile_dg").datagrid('deleteRow', rowIndex);
            $("#show_handlefile_dg").datagrid('reload');//删除后重新加载下
        }
    }
}




//打开处警查看窗口
function showHandleDialog(reportid, handleid, reportnum) {

    clearShowHandle();
    delfilepath = [];//初始化需删除的文件字符串
    updata_suspect = [];//等待更新的嫌疑人信息
    updata_fileinfo = [];//等待更新的文件信息
    updata_reportinfo = [];//等待更新的接警信息
    updataoradd_handle = 2;
    $.ajax({
        url: "/AAC/GetHandleInfo",
        type: "post",
        data: "reportid=" + reportid + "&handleid=" + handleid,
        datatype: 'json',
        async: true,
        //beforeSend: function (XMLHttpRequest) {
        //    $('#report_dg').datagrid('loading', "正在加载...");
        //},
        success: function (data) {
            if (data.status == 1) {
                alert("加载处警详情时出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data.msg != null) {
                    //clearHandle();
                    updata_reportinfo = data.msg.data;
                    $("#show_handle_dialog").dialog('open');
                    $("#show_handle_type").val(data.msg.data.handle_type);//处警类型
                    $("#show_handle_person").val(data.msg.data.ext1);//处警负责人
                    //$("#show_handle_person").multiselect('select', data.msg.data.handle_person);
                    $("#show_handle_time").val(Util.changeDateFormat(data.msg.data.handle_time));//处警时间
                    $("#show_handle_text").val(data.msg.data.handle_text);//处警内容
                    if (data.msg.total > 0) {
                        //关联文件

                        updata_fileinfo = data.msg.file;
                        if (updata_fileinfo != null && updata_fileinfo != undefined && updata_fileinfo != "") {
                            updatafileid = "";//先初始化字符
                            for (var h = 0; h < updata_fileinfo.length; h++) {
                                if (h == updata_fileinfo.length - 1) {
                                    updatafileid += updata_fileinfo[h].id + "-" + updata_fileinfo[h].fileid;
                                }
                                else {

                                    updatafileid += updata_fileinfo[h].id + "-" + updata_fileinfo[h].fileid + ",";
                                }
                                $("#show_handlefile_dg").datagrid('insertRow', {
                                    row: {
                                        file_name: updata_fileinfo[h].file_name,//文件名
                                        create_time: Util.changeDateFormat(updata_fileinfo[h].create_time),//创建时间
                                        ext: updata_fileinfo[h].file_ext_name,//扩展名
                                        file_address: updata_fileinfo[h].file_address,//文件地址
                                        id: updata_fileinfo[h].id,//关联表id
                                        fileid: updata_fileinfo[h].fileid//文件表id
                                    }
                                });
                            }
                        }
                    }
                    $('#show_handlefile_dg').datagrid('loaded');
                }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("加载处警信息失败！" + XMLHttpRequest.status + "错误请联系管理员！");

        }
    });

}



//清除表单
function clearShowForm() {
    delfilepath = [];
    $("#show_report_num").val("");//填写案件编号
    //默认设置报案时间为当前时间
    $("#show_report_time").val("");//默认填写报案时间
    $("#show_incident_time").val("");//案发时间
    $("#show_report_person_name").val("");//报案人姓名
    $("#show_report_person_gender").val("");//报案人性别
    $("#show_incident_address").val("");//案发的地址
    $("#show_report_person_credential").val("");//报案人证件号
    $("#show_report_person_phone").val("");//联系人电话
    $("#show_report_person_dept").val("");//报案人单位
    $("#show_report_person_nationality").val("");//报案人国籍
    $("#show_report_text").val("");//报案的内容
    $("#show_report_content").val("");//备注信息
    $("#show_suspect_name_1").val("");//嫌疑人姓名
    $("#show_suspect_gender_1").val("");//嫌疑人性别
    $("#show_suspect_nationality_1").val("");//嫌疑人国籍
    $("#show_suspect_featrue_1").val("");//嫌疑人特征
    $("#show_suspect_credential_1").val("");//嫌疑人证件号
    $("#show_suspect_phototext_1").val("");//嫌疑人照片
    $("#show_report_person_address").val("");//报案人住址


    $("#show_manager_name").val("");//报案人住址
    $("#show_report_type_select").val("");//报案人住址

    $("#show_incident_area_id").val("");//报案人住址
    $("#show_report_refer_person").val("");//报案人住址



    var suspect_info = "";
    var suspect_all_info = $("#show_suspect_div").children();
    for (var i = 1; i < suspect_all_info.length; i++) {
        var url = null;
        var num_arr = (suspect_all_info[i].id).split("_");
        var num_id = Number(num_arr[num_arr.length - 1]);//嫌疑人div编号
        //关闭已添加的嫌疑人信息
        $("#show_suspect_info_" + num_id).remove();
    }

    var rows = $("#show_addDocumentInfodg").datagrid('getRows');
    if (rows) {
        var rownum = rows.length;
        for (var l = 0; l < rownum; l++) {
            var rowIndex = $("#show_addDocumentInfodg").datagrid('getRowIndex', rows[l]);
            $("#show_addDocumentInfodg").datagrid('deleteRow', rowIndex);
            $("#show_addDocumentInfodg").datagrid('reload');//删除后重新加载下
        }
    }

    suspectall = [];
    fileall = [];
}


//添加嫌疑人form
function showaddSuspectForm() {
    //获取嫌疑人div下所有form
    var suspect_div = $("#show_suspect_div").children("form");
    //取到最后一个form的idtr_noneReg 
    var suspect_form_id = (suspect_div[suspect_div.length - 1].id).split("_");
    var suspect_form_id_num = Number(suspect_form_id[suspect_form_id.length - 1]);
    var suspect_html = '';
    suspect_html += '<form id="show_suspect_info_' + (suspect_form_id_num + 1) + '" class="registerbox">';
    suspect_html += ' <table align="center">';
    //suspect_html += ' <tr><th>嫌疑人：' + (suspect_form_id_num + 1) + '</th></tr>'; 
    suspect_html += ' <p class="suspect-num">嫌疑人：' + (suspect_form_id_num + 1) + '</p>';
    //suspect_html += ' <table align="center">';
    //suspect_html += ' <table align="center">';
    suspect_html += '<tr>';
    suspect_html += '<td width="83"><span class="mandatory-star">*</span>嫌疑人姓名：</td>';
    suspect_html += '<td width="246"><input id="show_suspect_name_' + (suspect_form_id_num + 1) + '" type="text" readonly=true class="form-control" placeholder=""></td>';
    suspect_html += '<td width="97"><span class="mandatory-star">*</span>嫌疑人性别：</td>';
    suspect_html += '<td width="246">';
    suspect_html += '<select id="show_suspect_gender_' + (suspect_form_id_num + 1) + '"readonly=true  class="form-control">';
    suspect_html += '<option value="0">男</option>';
    suspect_html += '<option value="1">女</option>';
    suspect_html += '<option value="2">未知</option>';
    suspect_html += '</select>';
    suspect_html += '</td>';
    suspect_html += '<td width="83"><span class="mandatory-star"></span>嫌疑人国籍：</td>';
    suspect_html += '<td width="246"><input id="show_suspect_nationality_' + (suspect_form_id_num + 1) + '"readonly=true type="text" class="form-control" placeholder=""></td>';
    suspect_html += '</tr>';
    suspect_html += '<tr>';
    suspect_html += '<td width="83"><span class="mandatory-star"></span>嫌疑人特征：</td>';
    suspect_html += '<td width="246"><input id="show_suspect_featrue_' + (suspect_form_id_num + 1) + '" readonly=true type="text" class="form-control" placeholder=""></td>';
    suspect_html += '<td width="97"><span class="mandatory-star"></span>嫌疑人证件号：</td>';
    suspect_html += '<td width="246"><input id="show_suspect_credential_' + (suspect_form_id_num + 1) + '" readonly=true  type="text" class="form-control" placeholder=""></td>';
    suspect_html += '<td><span class="mandatory-star"></span>嫌疑人照片：</td>';
    suspect_html += '<td>';
    suspect_html += '<input id="show_suspect_phototext_' + (suspect_form_id_num + 1) + '" readonly=true class="file-input" type="text"></td>';
   // suspect_html += '<a id ="suspect_close_' + (suspect_form_id_num + 1) + '" class="closeInput" style="cursor:pointer" onclick="closeSuspectForm(' + (suspect_form_id_num + 1) + ');">x</a></td>';
    //suspect_html += '<td><input type="file" name="name" id="suspect_photo_' + (suspect_form_id_num + 1) + '" accept="image/*" class="form-control" value=""><a class="closeInput" style="cursor:pointer" onclick="closeSuspectForm(' + (suspect_form_id_num + 1) + ');">x</a></td>';
    suspect_html += '</tr>';
    suspect_html += '</table>';
    suspect_html += '</form>';
    //把新建的form添加到最后一个form后面
    $("#show_suspect_info_" + suspect_form_id_num).after(suspect_html);
}

//加载查看接警插件
function loadingShowReportdg() {

    $('#show_addDocumentInfodg').datagrid({
        data: "",
        fitColumns: false,
        singleSelect: false,
        method: 'get',
        loadMsg: '正在加载……',
        pageNumber: 1, //重点:传入当前页数
        checkbox: true,
        pagination: false, //分页控件 
        rownumbers: true, //行号
        checkOnSelect: false,
        queryParams: {
        },
        columns: [[
            { field: 'ck', checkbox: true },
            { field: 'file_name', title: '文件名称', width: '150', align: "center" },
            { field: 'create_time', title: '添加时间', width: '150', align: "center" }
        ]],
        singleSelect: false,
        onLoadSuccess: function (data) {
        },
        onLoadError: function () {
            alert('关联文件显示加载失败');
        }

    });


}
//更新接警表单的值
function showupdataFormInfo(data) {
    $("#show_report_num").val(data.report_num);//填写案件编号
    //默认设置报案时间为当前时间
    $("#show_report_time").val(Util.changeDateFormat(data.report_time));//默认填写报案时间
    $("#show_incident_time").val(Util.changeDateFormat(data.incident_time));//案发时间

    $("#show_report_type_select").val(data.ext2);//案件类型

    //$("#report_type").val(data.report_type);
    $("#show_report_person_name").val(data.report_person_name);//报案人姓名
    $("#show_report_person_gender").val(genderSwitch(data.report_person_gender));//报案人性别

    $("#show_incident_area_id").val(data.ext1);//案发的区域

    $("#show_incident_address").val(data.incident_address);//案发的地址
    $("#show_report_person_credentialtype").val(credentialtypeSwitch( data.report_person_credentialtype));//报案人证件类型
    $("#show_report_person_credential").val(data.report_person_credential);//报案人证件号
    $("#show_report_person_phone").val(data.report_person_phone);//联系人电话
    $("#show_report_person_dept").val(data.report_person_dept);//报案人单位
    $("#show_report_person_address").val(data.report_person_address);//报案人住址
    $("#show_report_person_nationality").val(data.report_person_nationality);//报案人国籍
    $("#show_report_text").val(data.report_text);//报案的内容
    $("#show_report_content").val(data.report_content);//备注信息
    $("#show_manager_name").val(data.ext3);//案件负责人
    $("#show_report_refer_person").val(data.ext4);//案件转交人


}

//接警信息查看弹窗加载
function showudataReport(report_id) {

    delfilepath = [];//初始化需删除的文件字符串
    updata_suspect = [];//等待更新的嫌疑人信息
    updata_fileinfo = [];//等待更新的文件信息
    updata_reportinfo = [];//等待更新的接警信息
    clearForm();
    WebUploadPhoto();//初始化上传图片插件
    WebUploadFile();//初始化上传文件插件
    $("#show_updata_dialog").dialog('open');
    //获取接警信息
    $.ajax({
        url: "/AAC/GetReportAllInfoByID",
        type: "post",
        data: "id=" + report_id,
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("接警信息加载出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data.msg != null) {
                    //加载基础信息
                    updata_reportinfo = data.msg.report;
                    showupdataFormInfo(updata_reportinfo);
                    //嫌疑人
                    updata_suspect = data.msg.suspect;
                    if (updata_suspect != null && updata_suspect != undefined && updata_suspect != "") {
                        updatasuspectid = "";//初始化嫌疑人字符串
                        for (var i = 0; i < updata_suspect.length; i++) {

                            if (i == updata_suspect.length - 1) {
                                updatasuspectid += updata_suspect[i].id;
                            }

                            else {
                                updatasuspectid += updata_suspect[i].id + ",";
                            }
                            if (i > 0) {
                                addSuspectForm();//添加嫌疑人form
                                WebUploadPhoto();//初始化上传图片插件
                                //$("#suspect_close_" + (i + 1)).attr("style", "display: none;");
                            }
                            $("#show_suspect_name_" + (i + 1)).val(updata_suspect[i].suspect_name);//嫌疑人姓名

                            

                            $("#show_suspect_gender_" + (i + 1)).val(genderSwitch( updata_suspect[i].suspect_gender));//嫌疑人性别
                            $("#show_suspect_nationality_" + (i + 1)).val(updata_suspect[i].suspect_nationality);//嫌疑人国籍
                            $("#show_suspect_featrue_" + (i + 1)).val(updata_suspect[i].suspect_featrue);//嫌疑人特征
                            $("#show_suspect_credential_" + (i + 1)).val(updata_suspect[i].suspect_credential);//嫌疑人证件号

                            updata_suspect[i].suspect_gender = i + 1;
                            if (updata_suspect[i].suspect_photo != null && updata_suspect[i].suspect_photo != undefined && updata_suspect[i].suspect_photo != "" && updata_suspect[i].suspect_photo.indexOf('/') > -1) {
                                var urlarr = updata_suspect[i].suspect_photo.split('/');
                                var filename = urlarr[urlarr.length - 1].split('.');
                                suspectall.push({
                                    "id": i + 1, "fileid": updata_suspect[i].id, "name": filename[0], "url": updata_suspect[i].suspect_photo
                                });
                                $("#show_suspect_phototext_" + (i + 1)).val(filename[0]);//嫌疑人照片
                            }
                        }
                    }

                    //关联文件

                    updata_fileinfo = data.msg.file;
                    if (updata_fileinfo != null && updata_fileinfo != undefined && updata_fileinfo != "") {
                        updatafileid = "";//先初始化字符
                        for (var h = 0; h < updata_fileinfo.length; h++) {
                            if (h == updata_fileinfo.length - 1) {
                                updatafileid += updata_fileinfo[h].id + "-" + updata_fileinfo[h].fileid;
                            }
                            else {

                                updatafileid += updata_fileinfo[h].id + "-" + updata_fileinfo[h].fileid + ",";
                            }
                            $("#show_addDocumentInfodg").datagrid('insertRow', {
                                row: {
                                    file_name: updata_fileinfo[h].file_name,//文件名
                                    create_time: Util.changeDateFormat(updata_fileinfo[h].create_time),//创建时间
                                    ext: updata_fileinfo[h].file_ext_name,//扩展名
                                    file_address: updata_fileinfo[h].file_address,//文件地址
                                    id: updata_fileinfo[h].id,//关联表id
                                    fileid: updata_fileinfo[h].fileid//文件表id
                                }
                            });
                        }
                    }



                }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("接处警修改数据" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });

}





//检索接触警信息
function searchReportInfo(inpageIndex, inpageSize) {
    pageIndex = inpageIndex;
    pageSize = inpageSize;
    //pageSize = pageSize;
    //var planName = $("#planName").val();
    //if (planName == "全部") {
    //    planName = "";
    //}

    //园区编号
    //var searchregionId = $("#regionName").val();


    var eventRegion = [];
    var eventRegionId = $("#regionName").val();
    if (eventRegionId == -1) {
        for (var i = 0; i < $("#regionName option").length; i++) {
            if ($("#regionName option:eq(" + i + ")").val() != -1) {
                eventRegion.push($("#regionName option:eq(" + i + ")").val());
            }
        }
    }
    else {
        eventRegion.push(eventRegionId);
    }
    //案件类型
    var searchreport_type = $("#searchreport_type").val();
    //案件编号
    var searchreport_num = $("#searchreport_num").val();
    //案情状态
    var searchincident_status = $("#searchincident_status").val();
    //报案人姓名
    var searchreport_person_name = $("#searchreport_person_name").val();
    //联系电话
    var searchreport_person_phone = $("#searchreport_person_phone").val();
    //开始时间
    var searchstartTime = $("#searchstartTime").val();
    //结束时间
    var searchendTime = $("#searchendTime").val();
    $.ajax({
        url: "/AAC/GetSearchIndexItems",
        type: "post",
        data: "type=" + 0 + "&pageNumber=" + pageSize + "&pageSize=" + pageIndex + "&searchreport_type=" + searchreport_type + "&searchreport_num=" + searchreport_num + "&searchincident_status=" + searchincident_status + "&searchreport_person_name=" + searchreport_person_name + "&searchreport_person_phone=" + searchreport_person_phone + "&searchstartTime=" + searchstartTime + "&searchendTime=" + searchendTime + "&eventRegion=" + eventRegion,
        datatype: 'json',
        async: true,
        beforeSend: function (XMLHttpRequest) {
            $('#report_dg').datagrid('loading', "正在加载...");
        },
        success: function (data) {
            if (data.status == 1) {
                alert("接处警列表加载出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data.msg != null) {
                    aacdata = data.msg;
                    $('#report_dg').datagrid('loadData', aacdata.data);
                    $('#report_dg').datagrid('getPager').pagination('refresh', {
                        total: aacdata.total,
                        pageNumber: pageIndex,
                        pageSize: pageSize
                    });
                }
            $('#report_dg').datagrid('loaded');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("检索接处警信息" + XMLHttpRequest.status + "错误请联系管理员！");
            $('#report_dg').datagrid('loaded');

        }
    });


}

//转卷宗
function outArchive(id) {

    $.ajax({
        url: "/AAC/OutArchiveInfo",
        type: "post",
        data: "reportid=" + id ,
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("接处警列表加载出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data.msg != null) {              
                    alert(data.msg);
                    searchReportInfo(1,30);//更新主页列表
                }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("转卷宗时出现错误！" + XMLHttpRequest.status + "错误请联系管理员！");

        }
    });

}


//清空搜索条件
function clearSearch() {

    //getAACDataInfo();
    $("#searchreport_type").multiselect('select', 0);//案件类型
   $("#regionName").val(-1);//案件类型
   // $("#searchreport_type").val(0);//案件类型
    $("#searchreport_num").val("");//案件编号
    $("#searchincident_status").val(0);//案件类型
    $("#searchreport_person_name").val("");//报案人姓名
    $("#searchreport_person_phone").val("");//联系电话
    $("#searchstartTime").val("");//开始时间
    $("#searchendTime").val("");//结束时间

    searchReportInfo(1, 30)

}