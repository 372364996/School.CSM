


//案件类型列表加载
function reportTypeLoading() {

    /*------------------*/
    $('#reporttype_updata').datagrid({
        data: "",
        //data: [
        //     { id: 'value11', type_name: 'value12' },
        //     { id: 'value21', type_name: 'value22' }
        //],
        fitColumns: false,//设置为 true，则会自动扩大或缩小列的尺寸以适应网格的宽度并且防止水平滚动。
        singleSelect: true,//	设置为 true，则只允许选中一行。
        method: 'get',//请求远程数据的方法（method）类型。
        loadMsg: '正在加载……',//当从远程站点加载数据时，显示的提示消息
        //pageNumber: 1, //重点:传入当前页数
        checkbox: true,
        pagination: false, //分页控件 
        rownumbers: true, //行号
        checkOnSelect: false,
        //queryParams: {},//当请求远程数据时，发送的额外参数。
        //toolbar: [
        //    {
        //        iconCls: 'icon-add',
        //        text: '上传',
        //        handler: function () {
        //        }
        //    }],
        columns: [[
            //{field: 'clk', checkbox: true},
            //{field: 'id', title: '文件编号', width: '50', align: "center", sortable: false },
            { field: 'type_name', title: '案件类型', width: '150', align: "center", editor: "text", sortable: false },
            {
                field: 'id', title: '操作', width: 100, align: "center", sortable: false,
                formatter: function (value, row, index) {
                    return '<input type="button" class="btn btn-xs btn-primary" onclick=\'settingEditors("' + index + '")\' value="编辑"><input type="button" class="btn btn-warning btn-xs" onclick=\'reportTypeUpdat("' + index + '"\,"' + row.id + '"\,"' + row.type_name + '")\' value="修改">'//'<button  id=""class="btn btn-xs btn-success" onclick=\'reportTypeEditors("' + index + '")\'>修&ensp;&ensp;改</button>'
                }
            }
        ]],
        onLoadSuccess: function (data) { },
        onLoadError: function () { alert('加载失败'); }
    });

    $('#reporttype_updata').datagrid('reload');



}

var lastIndex;//案件类型编辑上一行
function settingEditors(rowIndex) {
    if (lastIndex != rowIndex) {
        $('#reporttype_updata').datagrid('endEdit', lastIndex);
        $('#reporttype_updata').datagrid('beginEdit', rowIndex);
        // setEditing(rowIndex);
    }
    else {

        $('#reporttype_updata').datagrid('beginEdit', rowIndex);
    }
    lastIndex = rowIndex;
}




//修改当前行的信息
function reportTypeUpdat(index, id, type_name) {
    $('#reporttype_updata').datagrid('endEdit', index);
    lastIndex = index;
    var row;
    var rows = $("#reporttype_updata").datagrid('getRows');
    if (rows) {
        var rownum = rows.length;
        for (var l = 0; l < rownum; l++) {
            var rowIndex = $("#reporttype_updata").datagrid('getRowIndex', rows[l]);
            if (rowIndex == index) {
                row = rows[l];
                break;
            }
        }
    }
    if (row) {
        if (confirm("确实要修改此案件类型的名称么？")) {


            if (row.type_name == undefined || row.type_name == null || row.type_name == "") {
                alert("请输入案件类型格式不正确！");
                return false;
            }
            $.ajax({
                url: "/AAC/UpdataReportType",
                type: "post",
                data: "id=" + id + "&type_name=" + row.type_name,
                datatype: 'json',
                async: true,
                beforeSend: function (XMLHttpRequest) {
                    $('#reporttype_updata').datagrid('loading', "正在加载...");
                },
                success: function (data) {
                    if (data.status == 1) {
                        alert("修改案件类型时出现" + data.msg + "错误请联系管理员！");
                    }
                    else
                        if (data.msg != null) {
                            if (data.msg.data > -1) {
                                //$("#reporttype_updata").datagrid('insertRow', {
                                //    row: {
                                //        id: data.msg.data,//文件名
                                //        type_name: type_name//关联表id
                                //    }
                                //});
                                getReportTypeData();
                                alert("案件类型修改成功！");

                            }
                            else {

                                alert("案件类型修改失败！");
                                $('#reporttype_updata').datagrid('updateRow', {
                                    index: index,
                                    row: {
                                        id: id,
                                        type_name: type_name
                                    }
                                });
                                $('#reporttype_updata').datagrid('updateRow', index);
                            }
                        }
                    $('#reporttype_updata').datagrid('loaded');
                    // reportTypeEditors();//设置所有行为编辑状态

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("接处警修改案件类型" + XMLHttpRequest.status + "错误请联系管理员！");
                    $('#reporttype_updata').datagrid('updateRow', {
                        index: index,
                        row: {
                            id: id,
                            type_name: type_name
                        }
                    });
                    $('#reporttype_updata').datagrid('updateRow', index);
                }
            });
        }

        else {
            $('#reporttype_updata').datagrid('updateRow', {
                index: index,
                row: {
                    id: id,
                    type_name: type_name
                }
            });
            $('#reporttype_updata').datagrid('updateRow', index);
        }
    }
    else {
        $('#reporttype_updata').datagrid('updateRow', {
            index: index,
            row: {
                id: id,
                type_name: type_name
            }
        });
        $('#reporttype_updata').datagrid('updateRow', index);
    }
}

//获取所有案类型信息
function getReportTypeData() {

    $.ajax({
        url: "/AAC/GetAllReportType",
        type: "post",
        datatype: 'json',
        async: true,
        //beforeSend: function (XMLHttpRequest) {
        //    $('#reporttype_updata').datagrid('loading', "正在加载...");
        //},
        success: function (data) {
            if (data.status == 1) {
                alert("案件类型列表加载出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data.msg != null) {
                    reporttype_data = data.msg.data;
                    var all_person = [];
                    if (reporttype_data != null && reporttype_data != "") {

                        for (var i = 0; i < reporttype_data.length; i++) {
                            //if (data.msg[i].status)
                            var objecturl = {
                                "label": reporttype_data[i].type_name,
                                "value": reporttype_data[i].id
                            };
                            all_person.push(objecturl);
                        }
                        $("#report_type_select").multiselect('dataprovider', all_person);
                        $('#report_type_select').multiselect('refresh');//multiselect刷新重新加载项
                        getReportByType($("#report_type_select").val());
                    }
                    //if (document.title == "接处警列表") {
                    //    lodingDataReportType();
                    //}
                }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("接处警获取案件类型" + XMLHttpRequest.status + "错误请联系管理员！");

        }
    });

}





//案件类型列表加载信息
function reportTypeDataLoading() {

    $('#reporttype_updata').datagrid('loadData', reporttype_data);
    $('#reporttype_updata').datagrid('loaded');
}

//添加案件类型按钮
function addReportType() {
    if (confirm("确实要添加此条案件类型么？")) {
        var type_name = $("#type_name").val();//案件类型
        if (type_name == undefined || type_name == null || type_name == "") {
            alert("请输入案件类型！");
            $("#type_name").focus();
            return false;
        }
        $.ajax({
            url: "/AAC/AddReportType",
            type: "post",
            data: "type_name=" + type_name,
            datatype: 'json',
            async: true,
            //beforeSend: function (XMLHttpRequest) {
            //    $('#reporttype_updata').datagrid('loading', "正在加载...");
            //},
            success: function (data) {
                if (data.status == 1) {
                    alert("案件类型列表加载出现" + data.msg + "错误请联系管理员！");
                }
                else
                    if (data.msg != null) {
                        if (data.msg.data > -1) {
                            $("#reporttype_updata").datagrid('insertRow', {
                                row: {
                                    id: data.msg.data,//文件名
                                    type_name: type_name//关联表id
                                }
                            });
                            getReportTypeData();
                            alert("案件类型添加成功！");
                        }
                        else {

                            alert("案件类型添加失败！");
                        }
                    }
                $('#reporttype_updata').datagrid('loaded');
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("接处警添加案件类型" + XMLHttpRequest.status + "错误请联系管理员！");
                $('#reporttype_updata').datagrid('loaded');

            }
        });
    }
}


//配置案件类型按钮
function reportTypeUpdata() {
    $("#reporttype_dialog").dialog('open');
    reportTypeDataLoading();//加载内容
    $('#reporttype_updata').datagrid('loaded');
}
