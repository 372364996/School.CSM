var ADDANDUPDATEFLAG;
var pageIndex = 1;//起始页码
var pageSize = 30; //默认初始化每页行数
$(function () {
    $("#addAreaTypeDiv").dialog("close");
    loadAraeTypeGrid();
    getAreaTypeData();
    $("#industryType").change(function () {
        getAreaTypeData();
    })
})
//加载easyui框架
function loadAraeTypeGrid() {
    var _data = [];
    $("#areaTypeGrid").datagrid({
        data: _data,
        fitColumns: true,
        pagination: true, //分页控件 
        singleSelect: true,
        remoteSort: false,
        rownumbers: true, //行号 
        checkOnSelect: false,
        selectOnCheck: false,
        toolbar: [{
            iconCls: 'icon-add',
            text: "新增",
            handler: function () { addAreaTypeDialog(); }
        }],
        columns: [[
             //{ field: 'ck', checkbox: true },
            //{ field: 'id', title: 'id', width: 100, align: 'center', hidden: true, checkbox: true },
            { field: 'type_name', title: '类型名称', width: 100, align: 'center' },
            {
                field: 'active_image', title: '激活图标', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    if (value == 0) {
                        return "无";
                    }
                    var html = '<img style="height:20px;width:20px;" src="' + value + '" alt="Alternate Text" />';
                    return html;
                }
            },
            {
                field: 'unactive_image', title: '未激活图标', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    if (value == 0) {
                        return "无";
                    }
                    var html = '<img style="height:20px;width:20px;" src="' + value + '" alt="Alternate Text" />';
                    return html;
                }
            },
            {
                field: 'type_status', title: '是否启用', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    if (value == 1) {//1可用    2不可用
                        return "显示";
                    } else {
                        return "不显示";
                    }
                }
            },
            { field: 'content', title: '备注', width: 100, align: 'center' },
            {
                field: 'idd', title: '操作', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    return '<button class="btn btn-primary btn-xs" onclick=\'updateAreaTypeDialog(' + row.id + ',"' + row.type_name + '","' + row.active_image + '","' + row.unactive_image + '",' + row.type_status + ',"' + row.content + '")\'>修&ensp;&ensp;改</button> <button class="btn btn-danger btn-xs" onclick=\'deleteAreaTypeCommit("' + row.id + '")\'>删&ensp;&ensp;除</button>'
                }
            }

        ]]
    })
    $('#areaTypeGrid').datagrid('getPager').pagination({//分页栏下方文字显示
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
            getAreaTypeData();
        },
        onSelectPage: function (pageindex, pagesize) {
            //下一页
            pageIndex = pageindex;
            pageSize = pagesize;
            getAreaTypeData();
        },
        onRefresh: function (pageindex, pagesize) {
            //pageIndex = pageNumber;
            // 刷新按钮
            pageIndex = pageindex;
            pageSize = pagesize;
            getAreaTypeData();
        }
    });
}
//获取数据
function getAreaTypeData() {
    var industryID = $("#industryType").val();
    $.ajax({
        url: "/Config/GetAllAreaType",
        data: { industryID: industryID,pageIndex:pageIndex,pageSize:pageSize },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("获取区域类型错误:"+data.msg);
                return;
            } else {
                $('#areaTypeGrid').datagrid('loadData', data.msg);
                $('#areaTypeGrid').datagrid('loaded');
                $('#areaTypeGrid').datagrid('getPager').pagination('refresh', {
                    total: data.total,
                    pageNumber: pageIndex,
                    pageSize: pageSize
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取区域类型出现"+XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}


//添加提交
function addAreaTypeCommit() {
    var areaTypeName = $("#areaTypeName").val();//自定义设备类型名称
    if (areaTypeName == "") {
        alert("请输入类型名称");
        return;
    }
    var activeImage = activeImageHandler.uiData.option.value; //激活图标
    if (activeImage == 1) {
        if ($("#activeImageUpload").val() == "") {
            alert("请选择上传图片(激活图标)");
        }
    }
    var unActiveImage = unActiveImageHandler.uiData.option.value; //未激活图标
    if (unActiveImage == 1) {
        if ($("#unActiveImageUpload").val() == "") {
            alert("请选择上传图片(未激活图标)");
        }
    }
    var typeStatus = $('input[name="typeStatus"]:checked').val();//是否启用
    if (typeStatus == "" || typeStatus == null) {
        alert("请选择是否启用");
        return;
    }
    var content = $("#content").val();//备注
    var industryID = $("#industryType").val();//行业id
    if (ADDANDUPDATEFLAG == "ADD") {
        $.ajaxFileUpload({
            url: "/Config/AddAreaType",
            sucureurl: false,
            async: true,
            data: { areaTypeName: areaTypeName, activeImage: activeImage, unActiveImage: unActiveImage, typeStatus: typeStatus, content: content, industryID: industryID },
            success: function (data) {
                if (data == 1) {
                    alert("添加成功");
                    getAreaTypeData();
                    $("#addAreaTypeDiv").dialog("close");
                } else if(data==0) {
                    alert("添加失败");
                } else {
                    alert(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("添加区域类型出现"+XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    } else if (ADDANDUPDATEFLAG == "UPDATE") {
        var areaTypeID = $("#areaTypeID").val();//id
        $.ajaxFileUpload({
            url: "/Config/UpdateAreaType",
            sucureurl: false,
            async: true,
            data: { areaTypeID: areaTypeID, areaTypeName: areaTypeName, activeImage: activeImage, unActiveImage: unActiveImage, typeStatus: typeStatus, content: content },
            success: function (data) {
                if (data == 1) {
                    alert("修改成功");
                    getAreaTypeData();
                    $("#addAreaTypeDiv").dialog("close");
                } else if (data==0) {
                    alert("修改失败");
                } else {
                    alert(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("修改区域类型出现"+XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }
}
//添加弹窗
var addnum = 0;
function addAreaTypeDialog() {
    ADDANDUPDATEFLAG = "ADD";
    $("#areaTypeName").val("");//自定义设备类型名称
    document.getElementsByName('typeStatus')[0].checked = false;//是否启用
    document.getElementsByName('typeStatus')[1].checked = false;
    $("#content").val("");//备注
    $("#addAreaTypeDiv").dialog({ title: "添加" });
    $("#addAreaTypeDiv").dialog("open");
    if (addnum != 0) {
        activeImageHandler.set("selectedIndex", 0);//激活图标
        unActiveImageHandler.set("selectedIndex", 0);//未激活图标
    }
    if (addnum == 0) {
        setTimeout(dropDownLoad, 100);
        addnum += 1;
    }
}
//修改弹窗
function updateAreaTypeDialog(areaID, type_name, active_image, unactive_image, type_status, content) {
    ADDANDUPDATEFLAG = "UPDATE";
    $("#areaTypeID").val(areaID);//id
    $("#areaTypeName").val(type_name);//自定义设备类型名称 
    document.getElementsByName('typeStatus')[type_status - 1].checked = true;//是否启用
    $("#content").val(content);//备注
    $("#addAreaTypeDiv").dialog({ title: '修改' });

    $("#addAreaTypeDiv").dialog("open");
    if (addnum == 0) {
        dropDownLoad();
        addnum += 1;
    }
    activeImageHandler.set("value", active_image);//激活图标
    unActiveImageHandler.set("value", unactive_image);//未激活图标
    $("#activeImageUploadShow").html("");//激活图标
    $("#unActiveImageUploadShow").html("");//未激活图标
}
var activeImageHandler;//激活图标
var unActiveImageHandler;//未激活图标
//执行下拉框图片插件
function dropDownLoad() {
    activeImageHandler = $("#activeImage").msDropdown({
        visibleRows: 5,
        on: {
            change: function (data, ui) {
                if (data.value == "1") {
                    //上传
                    $("#activeImageUpload").click();
                } else {
                    //清空展示的图片
                    var ShowImages = document.getElementById("activeImageUploadShow");
                    ShowImages.innerHTML = "";
                    //清空file的值
                    $("#activeImageUpload").val("");
                }
            }
        }//, useSprite: 'selectImage'
    }).data("dd");
    unActiveImageHandler = $("#unActiveImage").msDropdown({
        visibleRows: 5,
        on: {
            change: function (data, ui) {
                if (data.value == "1") {
                    //上传
                    $("#unActiveImageUpload").click();
                } else {
                    //清空展示的图片
                    var ShowImages = document.getElementById("unActiveImageUploadShow");
                    ShowImages.innerHTML = "";
                    //清空file的值
                    $("#unActiveImageUpload").val("");
                }
            }
        }
    }).data("dd");
}
//file值改变事件
function upLoadValueChange(data, showId) {
    var id = data.id;
    if (data.value != "") {
        showImage(id, showId);
    }
}
//预览图片
function showImage(ImageName, showId) {
    //检验是否为图像文件
    var elm = document.getElementById(ImageName);
    if (elm.files === "undefined") return;
    var file = elm.files[0];

    if (file) {
        var reader = new FileReader();
        //将文件以Data URL形式读入页面  
        reader.readAsDataURL(file);
        reader.onload = function (e) {
            var img = document.createElement("img");
            img.src = this.result;
            img.width = 18;
            img.height = 18;
            var ShowImages = document.getElementById(showId);
            ShowImages.innerHTML = "";
            ShowImages.appendChild(img);
        }
    }
}
//删除
function deleteAreaTypeCommit(areaTypeID) {
    if (!confirm("确定要删除该区域类型吗")) {
        return;
    }
    var industryID = $("#industryType").val();//行业id
    $.ajax({
        url: "/Config/DeleteAreaType",
        data: { areaTypeID: areaTypeID, industryID: industryID },
        type: "post",
        datatype: "json",
        async: false,
        success: function (data) {
            if (data.status == 1) {
                alert("删除区域类型错误:"+data.msg);
                return;
            } else {
                if (data.msg) {
                    alert("删除成功");
                    getAreaTypeData();
                } else {
                    alert("删除失败");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("删除区域类型出现"+XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}