
var photo_serverUrl = "../AAC/UpLoadphoto";
var file_serverUrl = "../AAC/UpLoader";
var upload_id = 0;//上传图片id
var suspectall = [];//嫌疑人信息
var fileall = [];//接警文件列表
var upLoaderFile = null;//上传文件类
var upLoaderNow = null;//上传图片类
var reporttype_data = null;//案件类型
var pageIndexAdd = 1;
var pageSizeAdd = 30; //默认初始化每页行数
var delfilepath = [];//待删文件
var autotable_report = null;//智能填表信息
$(document).ready(function () {

    delfilepath = [];
    

    $("#manager_name").multiselect({//案件负责人初始化下拉菜单
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight: 500,

    });

    $("#report_refer_person").multiselect({//案情转交人初始化下拉菜单
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight: 500,

    });

    $("#incident_area_id").multiselect({//案发的区域初始化下拉菜单
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight: 500,

    });

    $("#report_type_select").multiselect({//案发的区域初始化下拉菜单
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '220px', //选择框的长度
        maxHeight: 500,
        onChange: function (element, checked) {
            if (document.title == "接处警登记") {
                getReportByType(element[0].value);
            }
        }
    });

    CreateDocumentInfoTable();
    loadPerson();
    loadArea();
    WebUploadPhoto();
    WebUploadFile();
    $("#reporttype_dialog").dialog('close');

    if (document.title == "接处警登记") {
        $('#show_updata_dialog_register').dialog('close');
        getReportTypeData();//案件类型数据加载
        var num = getTimestamp();
        $("#report_num").val(num);//填写案件编号
        //默认设置报案时间为当前时间
        //var now_date = new Date();
        $("#report_time").val(new Date().format("yyyy-MM-dd hh:mm:ss"));//默认填写报案时间

        reportTypeLoading();//案件类型插件加载
        loadReportTypeAutoTable();


    }

    //var a = document.getElementById('report_num');
    //a.
    ////style="background-color:"#E8E6E6"
    ////$("#report_num").attr("style", "background:#E8E6E6");
    //$("#report_num").css({ "background-color": "#E8E6E6" });
});

//从后台读取人员数据
function loadPerson() {
    $.ajax({
        url: "/AAC/GetAllPerson",
        type: "post",
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("人员下拉菜单加载出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data.rows != null) {
                    var all_person = [];
                    for (var i = 0; i < data.rows.length; i++) {
                        //if (data.msg[i].status)
                        var objecturl = {
                            "label": data.rows[i].alias,
                            "value": data.rows[i].ssoid
                        };
                        all_person.push(objecturl);
                    }
                    $("#manager_name").multiselect('dataprovider', all_person);
                    $('#manager_name').multiselect('refresh');//multiselect刷新重新加载项
                    if (document.title == "接处警列表") {
                        $("#handle_person").multiselect('dataprovider', all_person);
                        $('#handle_person').multiselect('refresh');//multiselect刷新重新加载项
                    }
                    //var all_person = [];
                    var objectnull = {
                        "label": "无",
                        "value": 0
                    };
                    all_person.push(objectnull);

                    $("#report_refer_person").multiselect('dataprovider', all_person);
                    $('#report_refer_person').multiselect('refresh');//multiselect刷新重新加载项
                    if (document.title == "接处警登记") {
                        $("#report_refer_person").multiselect('select', 0);
                        $('#report_refer_person').multiselect('refresh');//multiselect刷新重新加载项
                }
                }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("读取人员数据" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}


//从后台读取区域信息
function loadArea() {
    $.ajax({
        url: "/AAC/GetAllAreaByRegion",
        type: "post",
        data: "regionid=" + regionId,
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("区域下拉菜单加载出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data.rows != null) {
                    var all_area = [];
                    for (var i = 0; i < data.rows.length; i++) {
                        //if (data.msg[i].status)
                        var objecturl = {
                            "label": data.rows[i].area_name,
                            "value": data.rows[i].id
                        };
                        all_area.push(objecturl);
                    }
                    $("#incident_area_id").multiselect('dataprovider', all_area);
                    $('#incident_area_id').multiselect('refresh');//multiselect刷新重新加载项
                }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("读取区域" + XMLHttpRequest.status + "错误请联系管理员！");

        }
    });
}



function loadDeviceAACData() {
    var VideoDatas = "";//{"id":0,"file_name":"","description":"","file_src":""};
    var pageIndexr = 1;
    // item.tb_report = null;
    $('#add_file_table_update').datagrid({
        data: VideoDatas,
        fitColumns: false,
        singleSelect: false,
        //method: 'get',
        loadMsg: '正在加载……',
        pageNumber: pageIndexr, //重点:传入当前页数
        checkbox: true,
        pagination: false, //分页控件 
        rownumbers: true, //行号
        queryParams: {},
        checkOnSelect: false,
        //onMouseOverRow: function (e, rowIndex, rowData) {
        //    Util.ChangeRowBGColor("add_file_table_update", rowIndex);
        //},
        //onMouseOutRow: function (e, rowIndex, rowData) {
        //    Util.RowOut("add_file_table_update", rowIndex);
        //},
        onClickCell: function (index, field, value) {
            onClickCell_update(index, field);
        },
        toolbar: [
            {
                iconCls: 'icon-add',
                text: '添加',
                handler: function () {
                    openVideoDgForUpdate()
                }
            },
            '-',
            {
                iconCls: 'icon-remove',
                text: '删除',
                handler: function () {
                    deleteFileByCheckboxForUpdate()
                }
            }
        ],
        columns: [[
            { field: 'id', checkbox: true },
            { field: 'file_name', title: '文件名称', width: '150', align: "center" },
            { field: 'file_src', title: '路径', width: '0', align: "center", hidden: true }
        ]],
        singleSelect: false,
        onLoadSuccess: function (data) {
        },
        onLoadError: function () {
            alert('加载接警文件列表失败');
        }
    });
}




//获取当前时间戳，作为案件编号用
function getTimestamp() {
    // 获取当前时间戳(以s为单位)
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    return timestamp;
}

//添加嫌疑人form
function addSuspectForm() {
    //获取嫌疑人div下所有form
    var suspect_div = $("#suspect_div").children("form");
    //取到最后一个form的idtr_noneReg 
    var suspect_form_id = (suspect_div[suspect_div.length - 1].id).split("_");
    var suspect_form_id_num = Number(suspect_form_id[suspect_form_id.length - 1]);
    var suspect_html = '';
    suspect_html += '<form id="suspect_info_' + (suspect_form_id_num + 1) + '" class="registerbox">';
    suspect_html += ' <table align="center">';
    //suspect_html += ' <tr><th>嫌疑人：' + (suspect_form_id_num + 1) + '</th></tr>'; 
    suspect_html += ' <p class="suspect-num">嫌疑人：' + (suspect_form_id_num + 1) + '</p>';
    //suspect_html += ' <table align="center">';
    //suspect_html += ' <table align="center">';
    suspect_html += '<tr>';
    suspect_html += '<td width="83"><span class="mandatory-star">*</span>嫌疑人姓名：</td>';
    suspect_html += '<td width="246"><input id="suspect_name_' + (suspect_form_id_num + 1) + '" type="text" class="form-control" placeholder=""></td>';
    suspect_html += '<td width="97"><span class="mandatory-star">*</span>嫌疑人性别：</td>';
    suspect_html += '<td width="246">';
    suspect_html += '<select id="suspect_gender_' + (suspect_form_id_num + 1) + '" class="form-control">';
    suspect_html += '<option value="0">男</option>';
    suspect_html += '<option value="1">女</option>';
    suspect_html += '<option value="2">未知</option>';
    suspect_html += '</select>';
    suspect_html += '</td>';
    suspect_html += '<td width="83"><span class="mandatory-star"></span>嫌疑人国籍：</td>';
    suspect_html += '<td width="246"><input id="suspect_nationality_' + (suspect_form_id_num + 1) + '" type="text" class="form-control" placeholder=""></td>';
    suspect_html += '</tr>';
    suspect_html += '<tr>';
    suspect_html += '<td width="83"><span class="mandatory-star"></span>嫌疑人特征：</td>';
    suspect_html += '<td width="246"><input id="suspect_featrue_' + (suspect_form_id_num + 1) + '" type="text" class="form-control" placeholder=""></td>';
    suspect_html += '<td width="97"><span class="mandatory-star"></span>嫌疑人证件号：</td>';
    suspect_html += '<td width="246"><input id="suspect_credential_' + (suspect_form_id_num + 1) + '" type="text" class="form-control" placeholder=""></td>';
    suspect_html += '<td><span class="mandatory-star"></span>嫌疑人照片：</td>';
    suspect_html += '<td><div  id="" class="picker" onclick="getThisID(' + (suspect_form_id_num + 1) + ');">';
    suspect_html += '选择图片';
    suspect_html += '</div><input id="suspect_phototext_' + (suspect_form_id_num + 1) + '" class="file-input" type="text">';
    suspect_html += '<a id ="suspect_close_' + (suspect_form_id_num + 1) + '" class="closeInput" style="cursor:pointer" onclick="closeSuspectForm(' + (suspect_form_id_num + 1) + ');">x</a></td>';
    //suspect_html += '<td><input type="file" name="name" id="suspect_photo_' + (suspect_form_id_num + 1) + '" accept="image/*" class="form-control" value=""><a class="closeInput" style="cursor:pointer" onclick="closeSuspectForm(' + (suspect_form_id_num + 1) + ');">x</a></td>';
    suspect_html += '</tr>';
    suspect_html += '</table>';
    suspect_html += '</form>';
    //把新建的form添加到最后一个form后面
    $("#suspect_info_" + suspect_form_id_num).after(suspect_html);
}

//销毁嫌疑人form
function closeSuspectForm(snum) {
    if (confirm("确实要删除此嫌疑人信息么？")) {

        if ($("#suspect_phototext_" + snum).val() != "" || $("#suspect_phototext_" + snum).val() != undefined || $("#suspect_phototext_" + snum).val() != null) {
            //if (!confirm("确定要上传此图片吗？")) {
            //}
            var result = "";
            var conent = 0;
            if (suspectall.length > 0) {
                for (var i = 0; i < suspectall.length; i++) {
                    if (snum == suspectall[i].id) {

                        if (document.title == "接处警登记") {
                            result = '"' + suspectall[i].url + '"';
                            suspectall.splice(i, 1);
                            conent++;
                        }
                        else if (document.title == "接处警列表") {
                            delfilepath.push(suspectall[i].url);
                           
                        }

                    }
                }

                if (conent > 0) {
                result = '[' + result + ']';               
                        deleFileTable(result)
                }
                //if (document.title == "Index" && updata_suspect) {
                //    for (var l = 0; l < updata_suspect.length; l++) {
                //        for (var i = 0; i < suspectall.length; i++) {
                //            updata_suspect.id == suspectall.fileid;
                //            delReportFileInfo(updata_suspect.id);//删除数据库嫌疑人信息
                //        }
                //    }
                //}
            }
        }
        $("#suspect_info_" + snum).remove();
    }
}



//删除数据库嫌疑人信息
function delReportFileInfo(id) {

    $.ajax({
        url: "/AAC/DelSuspectInfoByID",
        type: "post",
        data: "id=" + id,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                if (data.msg == true) {
                    alert("删除成功！");
                }
                else {
                    alert("删除失败！");
                }
            }
            else {
                alert("删除嫌疑人信息失败，报" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("删除接处警嫌疑人" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}



//获取上传图片div属性
function getThisID(div_id) {

    //var file_div_id = div_id.split("_");
    upload_id = Number(div_id);//file_div_id[file_div_id.length - 1]);

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
        pageNumber: 1, //重点:传入当前页数
        checkbox: true,
        pagination: false, //分页控件 
        rownumbers: true, //行号
        checkOnSelect: false,
        queryParams: {},
        toolbar: [
        {
            iconCls: 'icon-add',
            id: 'addfile',
            text: '上传',
            handler: function () {
            }
        },
    '-',
        {
            iconCls: 'icon-remove',
            text: '删除',
            handler: function () { deleFileItem() }
        }
        ],
        columns: [[
            { field: 'ck', checkbox: true },
            //{ field: 'id', title: '文件编号', width: '80', align: "center" },
            { field: 'file_name', title: '文件名称', width: '150', align: "center" },
            //{ field: 'content', title: '文件描述', width: '150', align: "center", editor: 'text' },
            { field: 'create_time', title: '添加时间', width: '150', align: "center" }
        ]],
        singleSelect: false,
        onLoadSuccess: function (data) {
        },
        onLoadError: function () {
            alert('加载接处警文件显示失败');
        }
    });
}


/*-------------------------------------------------------------*/
/*用途：（webuploader)上传图片
//                       
/*-------------------------------------------------------------*/
function WebUploadPhoto() {
    //var $list = $("#div" + upload_id);
    // var isUpdata = 0;
    jQuery(function () {
        var $ = jQuery,
        //存放图片
        //$list = ("#div" + upload_id),
        // 上传按钮
        //$btn = $('#ctlBtn'),
        // 优化retina, 在retina下这个值是2
        //ratio = window.devicePixelRatio || 1,
        //// 缩略图大小
        //thumbnailWidth = 100 * ratio,
        //thumbnailHeight = 100 * ratio,
        // 可能有pedding, ready, uploading, confirm, done.
        state = 'pending',
        upLoader;
        // 实例化
        upLoader = WebUploader.create({
            // 自动上传。
            auto: true,
            // swf文件路径
            swf: '../../dist/Uploader.swf',
            // 文件接收服务端。
            server: photo_serverUrl,
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '.picker',
            // 只允许选择文件，可选。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        });
        // 当有文件添加进来之前
        upLoader.on('beforeFileQueued', function (file) {
            if ($("#suspect_phototext_" + upload_id).val() == "" || $("#suspect_phototext_" + upload_id).val() == undefined || $("#suspect_phototext_" + upload_id).val() == null) {
                if (!confirm("确定要上传此图片吗？")) {
                    return false;
                }
            }
            else {

                if (!confirm("确认要覆盖已上传的图片吗？")) {
                    return false;
                }
                else {

                    var result = "";
                    var conent = 0;
                    if (suspectall.length > 0) {
                        for (var i = 0; i < suspectall.length; i++) {
                            if (upload_id == suspectall[i].id) {
                                if (document.title == "接处警登记") {
                                    result = '"' + suspectall[i].url + '"';
                                    suspectall.splice(i, 1);
                                    conent++;
                                }
                                else if (document.title == "接处警列表") {
                                    
                                    delfilepath.push(suspectall[i].url);
                                }
                            }
                        }
                        if (conent > 0) {
                        result = '[' + result + ']';
                        
                            deleFileTable(result);
                        }
                    }
                }
            }
            //upLoaderNow=upLoader;
            upLoader.reset();
        });
        //当文件上传成功把路径显示在文本框
        upLoader.on('uploadSuccess', function (file, response) {
            if (response.status == 0) {
                $("#suspect_phototext_" + upload_id).val(file.name);
                suspectall.push({
                    "id": upload_id, "fileid": file.id, "name": file.name, "url": response.filePath
                });

                alert(response.msg);
            }
            else if (response.status == 1) {
                alert(response.msg);
            }
            upLoader.removeFile(file, true);
        });
        //upLoader.on('uploadFinished', function () {
        //   // $('#photo_path').dialog('close');
        //});
        upLoader.on('uploadError', function (file) {
            alert("上传文件失败！");
            //$('#' + file.id).find('p.state').text('上传出错');
        });

    });
}


/*-------------------------------------------------------------*/
/*用途：上传文件
//                       
/*-------------------------------------------------------------*/

//var dgId = "";
//var documentType = "";
////确定上传文件的位置，即当前simp服务器的地址
//var this_host = window.location.host;
//var simp_server = 'http://' + this_host;
//var oldConent = 0;
function WebUploadFile() {
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
            pick: '#addfile'
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
                addFileTips(file, response);

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
function addFileTips(file, response) {

    var file_time = Util.getLocalTime();
    $("#addDocumentInfodg").datagrid('insertRow', {
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


//删除已上传文件
function deleFileItem() {
    var result = "";
    var conent = 0;
    var datagrid_code = "#addDocumentInfodg";
    var checkedItems = $("#addDocumentInfodg").datagrid('getChecked');
    if (document.title == "接处警登记") {

        $.each(checkedItems, function (index, item_new) {
            if (result != "")
                result += ",";
            result += '"' + item_new.file_address + '"';
            // result.push(item_new.file_address);
            conent++;
        });
        result = '[' + result + ']';
    }
    else if (document.title == "接处警列表") {

        $.each(checkedItems, function (index, item_new) {
            delfilepath.push(item_new.file_address);

        });

        var row = $("#addDocumentInfodg").datagrid('getChecked');
        if (row) {
            for (var i = 0; i < row.length; i++) {
                var rowIndex = $("#addDocumentInfodg").datagrid('getRowIndex', row[i]);
                $("#addDocumentInfodg").datagrid('deleteRow', rowIndex);
                $("#addDocumentInfodg").datagrid('reload');//删除后重新加载下
            }
        }


        return;
    }


    if (conent == 0) {
        alert("请选择要删除的关联文件");
    }
    else {
        deleFileTable(result, datagrid_code)
    }
}


//删除已添加文件的后台实现
function deleFileTable(filepath,datagrid_code) {

        $.ajax({
            url: "/AAC/DeleteAddFile",
            type: "post",
            data: "PathJson=" + filepath,
            datatype: 'json',
            async: false,
            success: function (data) {
                if (data.status == 0) {
                    if (data.msg == true) {
                        alert("删除成功！");
                    }
                    else {
                        alert("删除失败！");
                    }
                    var row = $(datagrid_code).datagrid('getChecked');
                    if (row) {
                        for (var i = 0; i < row.length; i++) {
                            var rowIndex = $(datagrid_code).datagrid('getRowIndex', row[i]);
                            $(datagrid_code).datagrid('deleteRow', rowIndex);
                            $(datagrid_code).datagrid('reload');//删除后重新加载下
                        }
                    }
                }
                else {
                    alert("事件预案条例相关文件出现" + data.msg + "错误请联系管理员！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("接处警删除已添加文件" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
   
}



//删除嫌疑人照片调用后台方法
function deleFile(filepath) {

    $.ajax({
        url: "/AAC/DeleteAddFile",
        type: "post",
        data: "PathJson=" + filepath,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                if (data.msg == true) {
                    alert("删除成功！");
                }
                else {
                    alert("删除失败！");
                }
            }
            else {
                alert("删除嫌疑人照片失败，报" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("接处警删除嫌疑人照片" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });

}


//清除表单
function clearForm() {
    delfilepath = [];
    var num = getTimestamp();
    $("#report_num").val(num);//填写案件编号
    //默认设置报案时间为当前时间
    $("#report_time").val(new Date().format("yyyy-MM-dd hh:mm:ss"));//默认填写报案时间
    $("#incident_time").val("");//案发时间
    $("#report_person_name").val("");//报案人姓名
    $("#report_person_gender").val(0);//报案人性别
    $("#incident_address").val("");//案发的地址
    $("#report_person_credential").val("");//报案人证件号
    $("#report_person_phone").val("");//联系人电话
    $("#report_person_dept").val("");//报案人单位
    $("#report_person_nationality").val("");//报案人国籍
    $("#report_text").val("");//报案的内容
    $("#report_content").val("");//备注信息
    $("#suspect_name_1").val("");//嫌疑人姓名
    $("#suspect_gender_1").val(0);//嫌疑人性别
    $("#suspect_nationality_1").val("");//嫌疑人国籍
    $("#suspect_featrue_1").val("");//嫌疑人特征
    $("#suspect_credential_1").val("");//嫌疑人证件号
    $("#suspect_phototext_1").val("");//嫌疑人照片
    $("#report_person_address").val("");//报案人住址


    var suspect_info = "";
    var suspect_all_info = $("#suspect_div").children();
    for (var i = 1; i < suspect_all_info.length; i++) {
        var url = null;
        var num_arr = (suspect_all_info[i].id).split("_");
        var num_id = Number(num_arr[num_arr.length - 1]);//嫌疑人div编号
        //关闭已添加的嫌疑人信息
        $("#suspect_info_" + num_id).remove();
    }

    var rows = $("#addDocumentInfodg").datagrid('getRows');
    if (rows) {
        var rownum = rows.length;
        for (var l = 0; l < rownum; l++) {
            var rowIndex = $("#addDocumentInfodg").datagrid('getRowIndex', rows[l]);
            $("#addDocumentInfodg").datagrid('deleteRow', rowIndex);
            $("#addDocumentInfodg").datagrid('reload');//删除后重新加载下
        }
    }

    suspectall = [];
    fileall = [];
}

//清空按钮
function clearAllInfo() {
    if (confirm("确定要清空所有数据吗？")) {
        clearForm();
    }

}

//添加接警信息
function addAACInfo() {
    var report_num = $("#report_num").val();//案件编号
    var manager_name = $("#manager_name").val();//案件负责人
    if (manager_name == undefined || manager_name == null || manager_name == "") {
        alert("请选择案件负责人");
        $("#manager_name").focus();
        return false;
    }
    var report_type = $("#report_type_select").val();//案件类型
    if (report_type == undefined || report_type == null || report_type == "") {
        alert("请添加并选择案件类型");
        $("#report_type_select").focus();
        return false;
    }
    var report_time = $("#report_time").val();//报案时间
    if (report_time == undefined || report_time == null || report_time == "") {
        alert("请选择报案时间");
        $("#report_time").focus();
        return false;
    }
    var incident_time = $("#incident_time").val();//案发时间
    if (incident_time == undefined || incident_time == null || incident_time == "") {
        alert("请选择案发时间");
        $("#incident_time").focus();
        return false;
    }
    var report_person_name = $("#report_person_name").val();//报案人姓名
    if (report_person_name == undefined || report_person_name == null || report_person_name == "") {
        alert("请填写报案人姓名");
        $("#report_person_name").focus();
        return false;
    }
    var report_person_gender = $("#report_person_gender").val();//报案人性别
    if (report_person_gender == undefined || report_person_gender == null || report_person_gender == "") {
        alert("请选择报案人性别");
        $("#report_person_gender").focus();
        return false;
    }
    var incident_area_id = $("#incident_area_id").val();//案发区域
    if (incident_area_id == undefined || incident_area_id == null || incident_area_id == "") {
        alert("请选择案发区域");
        $("#incident_area_id").focus();
        return false;
    }
    var incident_address = $("#incident_address").val();//案发的地址
    if (incident_address == undefined || incident_address == null || incident_address == "") {
        alert("请填写案发地址");
        $("#incident_address").focus();
        return false;
    }
    var report_person_credentialtype = $("#report_person_credentialtype").val();//报案人证件类型
    if (report_person_credentialtype == undefined || report_person_credentialtype == null || report_person_credentialtype == "") {
        alert("请选择报案人证件类型");
        $("#report_person_credentialtype").focus();
        return false;
    }
    var report_person_credential = $("#report_person_credential").val();//报案人证件号
    var report_person_phone = $("#report_person_phone").val();//联系人电话
    var report_person_dept = $("#report_person_dept").val();//报案人单位
    var report_person_nationality = $("#report_person_nationality").val();//报案人国籍
    var report_person_address = $("#report_person_address").val();//报案人国籍
    var report_refer_person = $("#report_refer_person").val();//案情转交人
    if (report_refer_person == undefined || report_refer_person == null || report_refer_person == "") {
        alert("请选择案情转交人");
        $("#report_refer_person").focus();
        return false;
    }
    var report_text = $("#report_text").val();//报案的内容
    var report_content = $("#report_content").val();//备注信息


    var suspect_name_1 = $("#suspect_name_1").val();//嫌疑人姓名
    if (suspect_name_1 == undefined || suspect_name_1 == null || suspect_name_1 == "") {
        alert("请输入嫌疑人姓名");
        $("#suspect_name_1").focus();
        return false;
    }
    var suspect_gender_1 = $("#suspect_gender_1").val();//嫌疑人性别
    if (suspect_gender_1 == undefined || suspect_gender_1 == null || suspect_gender_1 == "") {
        alert("请输入嫌疑人姓名");
        $("#suspect_gender_1").focus();
        return false;
    }
    if (regionId == undefined || regionId == null || regionId == "" || regionId <= 0) {
        alert("添加接警信息时获取园区错误！请联系管理员！");
        return false;
    }
    //var suspect_nationality_1 = $("#suspect_nationality_1").val();//嫌疑人国籍
    //var suspect_featrue_1 = $("#suspect_featrue_1").val();//嫌疑人特征
    //var suspect_credential_1 = $("#suspect_credential_1").val();//嫌疑人证件号
    //var json_suspect_info = { "suspect_nationality_1": suspect_nationality_1 };
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
        if (i < suspect_all_info.length - 1) { suspect_info += json_suspect_info + ","; }
        else {
            suspect_info += json_suspect_info
        }
        //.push(json_suspect_info);
    }
    suspect_info = '{"suspect_arr":[' + suspect_info + ']}';
    var addRegItems = $('#addDocumentInfodg').datagrid('getRows');
    $.ajax({
        type: "post", //这里是http类型
        url: "/AAC/AddAACInfo",
        data: "regionId=" + regionId + "&report_num=" + report_num + "&report_person_address=" + report_person_address + "&manager_name=" + manager_name + "&report_type=" + report_type + "&report_time="
            + report_time + "&incident_time=" + incident_time + "&report_person_name=" + report_person_name + "&report_person_gender=" +
            report_person_gender + "&incident_area_id=" + incident_area_id + "&incident_address=" + incident_address + "&report_person_credentialtype=" + report_person_credentialtype +
            "&report_person_credential=" + report_person_credential + "&report_person_phone=" + report_person_phone + "&report_person_dept=" + report_person_dept + "&report_person_nationality=" + report_person_nationality +
             "&report_text=" + report_text + "&report_content=" + report_content + "&report_refer_person=" + report_refer_person + "&suspect_info=" + suspect_info + "&addRegItems=" + JSON.stringify(addRegItems),
        dataType: "json", //传回来的数据类型
        async: false,
        success: function (data) {
            if (data.status == 0) {
                if (data.msg == true) {
                    alert("添加成功！");
                    clearForm();
                    // canceladd();
                    // getPlanOrdinanc(pageIndex, pageSize);

                }
                else {
                    alert("添加失败！");
                }
            }
            else {
                alert("添加接处警出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("添加接处警出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}


//智能填表，根据案件类型获取案件
function getReportByType(searchreport_type) {

    if (searchreport_type == null)
    {
        searchreport_type = -1;
    }
    var pageNumber = 30;
    var pageSize = 1;
    var searchreport_num = "";
    var searchincident_status = -1;
    var searchreport_person_name = "";
    var searchreport_person_phone = "";
    var searchstartTime = "";
    var searchendTime = "";
    $.ajax({
        url: "/AAC/GetSearchIndexItems",
        type: "post",
        data: "type=" + "1" + "&pageNumber=" + pageNumber + "&pageSize=" + pageSize + "&searchreport_type=" + searchreport_type + "&searchreport_num=" + searchreport_num + "&searchincident_status=" + searchincident_status + "&searchreport_person_name=" + searchreport_person_name + "&searchreport_person_phone=" + searchreport_person_phone + "&searchstartTime=" + searchstartTime + "&searchendTime=" + searchendTime + "&regionid=" + regionId,
        datatype: 'json',
        async: true,
        beforeSend: function (XMLHttpRequest) {
            $('#report_dg').datagrid('loading', "正在加载...");
        },
        success: function (data) {
            if (data.status == 1) {
                alert("接处警智能填表功能加载出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data.msg != null) {
                    autotable_report = data.msg.data;
                    $('#reportTypeAutoTable').datagrid('loadData', autotable_report);
                    //$('#reportTypeAutoTable').datagrid('getPager').pagination('refresh', {
                    //    //total: aacdata.total,
                    //    //pageNumber: pageIndex,
                    //    //pageSize: pageSize
                    //});
                }
            $('#reportTypeAutoTable').datagrid('loaded');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("接处警智能填表功能按案件类型查询案件信息失败！" + XMLHttpRequest.status + "错误请联系管理员！");
            $('#reportTypeAutoTable').datagrid('loaded');

        }
    });

}

//智能填表案件基础信息
function autoFillReportTable(reportrows){

    if (reportrows != null && reportrows != undefined && reportrows != ""){

        //delfilepath = [];
        //var num = getTimestamp();
        //$("#report_num").val(num);//填写案件编号
        ////默认设置报案时间为当前时间
        //$("#report_time").val(new Date().format("yyyy-MM-dd hh:mm:ss"));//默认填写报案时间
        //$("#incident_time").val("");//案发时间
        $("#report_person_name").val(reportrows.report_person_name);//报案人姓名
        $("#report_person_gender").val(reportrows.report_person_gender);//报案人性别
        $("#incident_address").val(reportrows.incident_address);//案发的地址
        $("#report_person_credential").val(reportrows.report_person_credential);//报案人证件号
        $("#report_person_phone").val(reportrows.report_person_phone);//联系人电话
        $("#report_person_dept").val(reportrows.report_person_dept);//报案人单位
        $("#report_person_nationality").val(reportrows.report_person_nationality);//报案人国籍
        $("#report_text").val(reportrows.report_text);//报案的内容
        $("#report_content").val(reportrows.report_content);//备注信息
        //$("#suspect_name_1").val("");//嫌疑人姓名
        //$("#suspect_gender_1").val(0);//嫌疑人性别
        //$("#suspect_nationality_1").val("");//嫌疑人国籍
        //$("#suspect_featrue_1").val("");//嫌疑人特征
        //$("#suspect_credential_1").val("");//嫌疑人证件号
        //$("#suspect_phototext_1").val("");//嫌疑人照片
        $("#report_person_address").val(reportrows.report_person_address);//报案人住址

        $("#report_type_select").multiselect('select', reportrows.report_type);//案件类型
        $('#report_type_select').multiselect('refresh');//multiselect刷新重新加载项
        $("#manager_name").multiselect('select', reportrows.manager_id);//案件负责人
        $('#manager_name').multiselect('refresh');//multiselect刷新重新加载项
        $("#report_refer_person").multiselect('select', reportrows.report_refer_person);//案件转交人
        $('#report_refer_person').multiselect('refresh');//multiselect刷新重新加载项
        $("#incident_area_id").multiselect('select', reportrows.incident_area_id);//案发的区域
        $('#incident_area_id').multiselect('refresh');//multiselect刷新重新加载项



    }
    else {
        alert("数据格式有问题！请联系管理员！");
    }

}



function loadReportTypeAutoTable() {
    var VideoDatas = "";
    var pageIndexr = 1;
    // item.tb_report = null;
    $('#reportTypeAutoTable').datagrid({
        data: VideoDatas,
        fitColumns: true,
        singleSelect: true,
        method: 'get',
        loadMsg: '正在加载……',
        pageNumber: pageIndexr, //重点:传入当前页数
        checkbox: true,
        pagination: false, //分页控件 
        //rownumbers: true, //行号
        queryParams: {},
        checkOnSelect: false,
        onDblClickRow: function (rowIndex, rowData) {//双击事件

            autoFillReportTable(rowData);//智能填表

        },

        columns: [[
            //{ field: 'id', checkbox: true },
            { field: 'report_num', title: '案件编号', width: '100', align: "center" },
            { field: 'report_person_name', title: '报案人姓名', width: '100', align: "center", hidden: false },
            { field: 'incident_address', title: '案发地址', width: '150', align: "center", hidden: false },
            {
                field: 'id', title: '操作', width: 100, align: "center", sortable: false,
                formatter: function (value, row, index) {
                    return '<button  id=""class="btn btn-warning btn-xs" onclick=\'showudataReportRegister("' + value + '")\'>查&ensp;&ensp;看</button> <button  id=""class="btn btn-xs btn-success")\'  onclick=\'autoFillReportTableBtn("' + index + '")\'>自动填表</button> '
                }
            }


        ]],
        onLoadSuccess: function (data) {
        },
        onLoadError: function () {
            alert('加载接警文件列表失败');
        }
    });


    //$('#suspectAutoTable').datagrid({
    //    data: VideoDatas,
    //    fitColumns: false,
    //    singleSelect: true,
    //    //method: 'get',
    //    loadMsg: '正在加载……',
    //    pageNumber: pageIndexr, //重点:传入当前页数
    //    checkbox: true,
    //    pagination: false, //分页控件 
    //    rownumbers: true, //行号
    //    queryParams: {},
    //    checkOnSelect: false,
    //    columns: [[
    //        //{ field: 'id', checkbox: true },
    //        { field: 'suspect_name', title: '嫌疑人姓名', width: '100', align: "center" },
    //        { field: 'suspect_featrue', title: '嫌疑人特征', width: '100', align: "center", hidden: false },
    //        { field: 'suspect_credential', title: '嫌疑人证件号', width: '100', align: "center", hidden: false }
    //    ]],
    //    onLoadSuccess: function (data) {
    //    },
    //    onLoadError: function () {
    //        alert('加载接警文件列表失败');
    //    }
    //});

}


//自动填表按钮
function autoFillReportTableBtn(dgindex) {

    $('#reportTypeAutoTable').datagrid('checkRow', dgindex);

    var row = $('#reportTypeAutoTable').datagrid('getChecked');
    if (row) {
        for (var i = 0; i < row.length; i++) {

            autoFillReportTable(row[i]);

        }
    }

}



//接警信息查看弹窗加载
function showudataReportRegister(report_id) {

    //delfilepath = [];//初始化需删除的文件字符串
    //updata_suspect = [];//等待更新的嫌疑人信息
    //updata_fileinfo = [];//等待更新的文件信息
   // var updata_reportinfo_show = [];//等待更新的接警信息
    //clearForm();
    clearShowFormRegister();

    $("#show_updata_dialog_register").dialog('open');
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
                   // updata_reportinfo_show = data.msg.report;
                    showupdataFormInfoRegister(data.msg.report);
                    //嫌疑人
                //    updata_suspect = data.msg.suspect;
                //    if (updata_suspect != null && updata_suspect != undefined && updata_suspect != "") {
                //        updatasuspectid = "";//初始化嫌疑人字符串
                //        for (var i = 0; i < updata_suspect.length; i++) {

                //            if (i == updata_suspect.length - 1) {
                //                updatasuspectid += updata_suspect[i].id;
                //            }

                //            else {
                //                updatasuspectid += updata_suspect[i].id + ",";
                //            }
                //            if (i > 0) {
                //                addSuspectForm();//添加嫌疑人form
                //                WebUploadPhoto();//初始化上传图片插件
                //                //$("#suspect_close_" + (i + 1)).attr("style", "display: none;");
                //            }
                //            $("#show_suspect_name_" + (i + 1)).val(updata_suspect[i].suspect_name);//嫌疑人姓名



                //            $("#show_suspect_gender_" + (i + 1)).val(genderSwitch(updata_suspect[i].suspect_gender));//嫌疑人性别
                //            $("#show_suspect_nationality_" + (i + 1)).val(updata_suspect[i].suspect_nationality);//嫌疑人国籍
                //            $("#show_suspect_featrue_" + (i + 1)).val(updata_suspect[i].suspect_featrue);//嫌疑人特征
                //            $("#show_suspect_credential_" + (i + 1)).val(updata_suspect[i].suspect_credential);//嫌疑人证件号

                //            updata_suspect[i].suspect_gender = i + 1;
                //            if (updata_suspect[i].suspect_photo != null && updata_suspect[i].suspect_photo != undefined && updata_suspect[i].suspect_photo != "" && updata_suspect[i].suspect_photo.indexOf('/') > -1) {
                //                var urlarr = updata_suspect[i].suspect_photo.split('/');
                //                var filename = urlarr[urlarr.length - 1].split('.');
                //                suspectall.push({
                //                    "id": i + 1, "fileid": updata_suspect[i].id, "name": filename[0], "url": updata_suspect[i].suspect_photo
                //                });
                //                $("#show_suspect_phototext_" + (i + 1)).val(filename[0]);//嫌疑人照片
                //            }
                //        }
                //    }

                //    //关联文件

                //    updata_fileinfo = data.msg.file;
                //    if (updata_fileinfo != null && updata_fileinfo != undefined && updata_fileinfo != "") {
                //        updatafileid = "";//先初始化字符
                //        for (var h = 0; h < updata_fileinfo.length; h++) {
                //            if (h == updata_fileinfo.length - 1) {
                //                updatafileid += updata_fileinfo[h].id + "-" + updata_fileinfo[h].fileid;
                //            }
                //            else {

                //                updatafileid += updata_fileinfo[h].id + "-" + updata_fileinfo[h].fileid + ",";
                //            }
                //            $("#show_addDocumentInfodg").datagrid('insertRow', {
                //                row: {
                //                    file_name: updata_fileinfo[h].file_name,//文件名
                //                    create_time: Util.changeDateFormat(updata_fileinfo[h].create_time),//创建时间
                //                    ext: updata_fileinfo[h].file_ext_name,//扩展名
                //                    file_address: updata_fileinfo[h].file_address,//文件地址
                //                    id: updata_fileinfo[h].id,//关联表id
                //                    fileid: updata_fileinfo[h].fileid//文件表id
                //                }
                //            });
                //        }
                //    }



                }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("接处警修改数据" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });

}


//清除表单
function clearShowFormRegister() {

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
 
    $("#show_report_person_address").val("");//报案人住址


    $("#show_manager_name").val("");//报案人住址
    $("#show_report_type_select").val("");//报案人住址

    $("#show_incident_area_id").val("");//报案人住址
    $("#show_report_refer_person").val("");//报案人住址


}



//更新接警表单的值
function showupdataFormInfoRegister(data) {
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
    $("#show_report_person_credentialtype").val(credentialtypeSwitch(data.report_person_credentialtype));//报案人证件类型
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
