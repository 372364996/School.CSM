
var UPDATEORADDFLAG;
var pageIndex = 1;//起始页码
var pageSize = 30; //默认初始化每页行数
var _data = [];//行业json数组
$(function () {
    $("#addIndustryDiv").dialog("close");
    $("#industryInfoDiv").dialog("close");
    loadIndustryDataGrid();
    getIndustryData();
})
//获取行业配置数据
function loadIndustryDataGrid() {
    $("#industryGrid").datagrid({
        data: _data,
        rownumbers:true,
        fitColumns: true,
        pagination: true, //分页控件 
        singleSelect: true,//只允许选中一行
        onDblClickRow: function (rowIndex, rowData) {
            //lookIndustry(rowData.id);
        },
        toolbar: [{
            iconCls: 'icon-add ',
            text: "新增",
            handler: function () { addIndustryDialog(); }
        }],
        columns: [[
            { field: 'id', title: 'id', width: 100, align: 'center', hidden: true },
            { field: 'industry_name', title: '行业名称', width: 100, align: 'center' },
            { field: 'industry_code', title: '行业编号', width: 100, align: 'center' },
            { field: 'content', title: '行业描述', width: 100, align: 'center' },

            {
                field: 'ids', title: '操作', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    return '<button class="btn btn-primary btn-xs" onclick=\'updateIndustryDialog("' + row.id + '","' + row.industry_name + '","' + row.industry_code + '","' + row.content + '")\'>修&ensp;&ensp;改</button> <button class="btn btn-danger btn-xs" onclick=\'deleteIndustryCommit("' + row.id + '")\'>删&ensp;&ensp;除</button>'
                }
            }
        ]],
        onLoadSuccess: function (data) {

        },
        onLoadError: function () {
            alert('加载失败');
        }
    })
    $('#industryGrid').datagrid('getPager').pagination({//分页栏下方文字显示
        showPageList: true,
        pageNumber: pageIndex,
        pageSize: pageSize, //每页显示的记录条数，默认为10   
        pageList: [5, 10, 20, 30, 50], //可以设置每页记录条数的列表
        beforePageText: '第', //页数文本框前显示的汉字   
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示{from}-{to}条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{total}条',
        onChangePageSize: function (pagesize) {
            //一页显示几条
            pageSize = pagesize;
            getIndustryData();
        },
        onSelectPage: function (pageindex, pagesize) {
            //下一页
            pageIndex = pageindex;
            pageSize = pagesize;
            getIndustryData();
        },
        onRefresh: function (pageindex, pagesize) {
            //pageIndex = pageNumber;
            // 刷新按钮
            pageIndex = pageindex;
            pageSize = pagesize;
            getIndustryData();
        }
    });
}
//获取行业数据
function getIndustryData() {
    $.ajax({
        url: "/Config/GetIndustry",
        data: { pageIndex: pageIndex, pageSize: pageSize },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("获取行业列表(GetIndustry)错误:" + data.msg);
                return;
            } else {
                _data = data.msg;
                $('#industryGrid').datagrid('loadData', _data);
                $('#industryGrid').datagrid('loaded');
                $('#industryGrid').datagrid('getPager').pagination('refresh', {
                    total: _data.total,
                    pageNumber: pageIndex,
                    pageSize: pageSize
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取行业列表(getIndustryData)出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//添加弹窗
function addIndustryDialog() {
    UPDATEORADDFLAG = "ADD"
    $("#industryName").val("");
    $("#industryCode").val("");
    $("#industryContent").val("");
    $("#addIndustryDiv").dialog({ title: "添加" });
    $("#addIndustryDiv").dialog("open");
}

//添加提交
function addIndustryCommit() {
    var industryName = $("#industryName").val();//行业名称
    if (industryName == "") {
        alert("请输入行业名称");
        return;
    }
    var industryCode = $("#industryCode").val();//行业编号
    if (industryCode == "") {
        alert("请输入行业编号");
        return;
    }
    var industryContent = $("#industryContent").val();//行业描述

    if (UPDATEORADDFLAG == "ADD") {
        $.ajax({
            url: "/Config/AddIndustry",
            data: { industryName: industryName, industryCode: industryCode, industryContent: industryContent },
            type: "post",
            datatype: "json",
            async: true,
            success: function (data) {
                if (data.status == 1) {
                    alert("添加行业（AddIndustry）错误:" + data.msg);
                    return;
                } else {
                    if (data.msg) {
                        alert("添加成功");
                        $("#addIndustryDiv").dialog("close");
                        getIndustryData();
                    } else {
                        alert("添加失败");
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("添加行业（addIndustryCommit）出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    } else if (UPDATEORADDFLAG == "UPDATE") {
        var industryID = $("#industryID").val();
        $.ajax({
            url: "/Config/UpdateIndustry",
            data: { industryID: industryID, industryName: industryName, industryCode: industryCode, industryContent: industryContent },
            type: "post",
            datatype: "json",
            async: true,
            success: function (data) {
                if (data.status == 1) {
                    alert("修改行业（addIndustryCommit）错误:" + data.msg);
                    return;
                } else {
                    if (data.msg) {
                        alert("修改成功");
                        $("#addIndustryDiv").dialog("close");
                        getIndustryData();
                    } else {
                        alert("修改失败");
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("修改行业（addIndustryCommit）出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }
}
//修改弹窗
function updateIndustryDialog(industryID, industry_name, industry_code, industryContent) {
    UPDATEORADDFLAG = "UPDATE"
    $("#industryID").val(industryID);//行业id
    $("#industryName").val(industry_name);//行业名称
    $("#industryCode").val(industry_code);//行业编号
    $("#industryContent").val(industryContent);//行业描述
    $("#addIndustryDiv").dialog({ title: "修改" });
    $("#addIndustryDiv").dialog("open");

}
//删除行业配置
function deleteIndustryCommit(industryID) {
    if (!confirm("确定要删除吗(删除行业将会删除行业下所有的设备类型和区域类型)")) {
        return;
    }
    $.ajax({
        url: "/Config/DeleteIndustry",
        data: { industryID: industryID },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("删除行业(DeleteIndustry)错误:" + data.msg);
                return;
            } else {
                if (data.msg) {
                    alert("删除成功");
                    getIndustryData();
                } else {
                    alert("删除失败");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("删除行业(deleteIndustryCommit)出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
