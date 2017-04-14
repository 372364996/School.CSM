var UPDATEANDADDFLAG;
var pageIndex = 1;//起始页码
var pageSize = 30; //默认初始化每页行数

$(function () {
    $("#addDeviceTypeDiv").dialog("close");
    $("#lookDeviceDefinedDiv").dialog("close");
    $("#lookDevicePopupImageDiv").dialog("close");
    loadDeviceTypeDataGrid();
    getDeviceTypeData();
    $("#industryType").change(function () {
        getDeviceTypeData();
    })
})
//加载easyui框架
function loadDeviceTypeDataGrid() {
    var _data = [];
    $("#deviceTypeGrid").datagrid({
        data: _data,
        fitColumns: true,
        pagination: true, //分页控件 
        singleSelect: true,//只允许选中一行
        rownumbers: true, //行号
        selectOnCheck: false,
        checkOnSelect: false,
        onDblClickRow: function (rowIndex, rowData) {
            //getDeviceDefinedInfo(rowData.id);
        },
        toolbar: [{
            iconCls: 'icon-add',
            text: "新增",
            handler: function () { addDeviceTypeDialog(0,0,0); }
        }],
        columns: [[
            //{ field: 'ck', checkbox: true },
            { field: 'id', title: 'id', width: 100, align: 'center', hidden: true },
            { field: 'pid', title: 'pid', width: 100, align: 'center', hidden: true },
            { field: 'defined_device_name', title: '类型名称', width: 100, align: 'center' },
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
                field: 'normal_image', title: '地图正常图标', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    if (value == 0) {
                        return "无";
                    }
                    var html = '<img style="height:28px;width:20px;" src="' + value + '" alt="Alternate Text" />';
                    return html;
                }
            },
            {
                field: 'error_image', title: '地图错误图标', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    if (value == 0) {
                        return "无";
                    }
                    var html = '<img style="height:28px;width:20px;" src="' + value + '" alt="Alternate Text" />';
                    return html;
                }
            },
            {
                field: 'flash_image', title: '地图闪光图标', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    if (value == 0) {
                        return "无";
                    }
                    var html = '<img style="height:28px;width:20px;" src="' + value + '" alt="Alternate Text" />';
                    return html;
                }
            },
            {
                field: 'popup_image', title: '弹出框图片', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    if (value == 0) {
                        return "无";
                    }
                    var html = '<img style="height:20px;width:20px;" src="' + value + '" alt="Alternate Text" />';
                    return html;
                }
            },
            {
                field: 'enabled', title: '是否显示', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    if (value == 1) {
                        return "显示";
                    } else {
                        return "不显示";
                    }
                }
            },
            {
                field: 'base_device_type_id', title: '包含基础设备类型', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    //baseDeviceTypeJson()
                    if (value == 0) {
                        return "";
                    } else {
                        for (var i = 0; i < baseDeviceTypeJson.length; i++) {
                            if (value == baseDeviceTypeJson[i].key) {
                                return baseDeviceTypeJson[i].value;
                            }
                        }
                    }
                }
            },
            { field: 'defined_device_content', title: '备注', width: 100, align: 'center' },
            {
                field: 'ids', title: '操作', width: 150, align: 'center',
                formatter: function (value, row, index) {
                    return '<button class="btn btn-primary btn-xs" onclick=\'updateDeviceTypeDialog("' + row.id + '","base")\'>修&ensp;&ensp;改</button> <button class="btn btn-danger btn-xs" onclick=\'deleteDeviceTypeCommit("' + row.id + '","base")\'>删&ensp;&ensp;除</button> <button class="btn btn-primary btn-xs" onclick=\'addDeviceTypeDialog(' + row.id + ',' + row.base_device_type_id + ',' + row.enabled + ')\'>添加子级</button>'
                }
            }
        ]],
        view: detailview,
        detailFormatter: function (index, row) {
            return '<div style="padding:2px"><table id="ddv-' + index + '"></table></div>';
        },
        onExpandRow: function (index, row) {
            var data2 = [];
            $.ajax({
                url: "/Config/GetChildDeviceDefinedByPid",
                data: { pid: row.id },
                type: "post",
                datatype: "json",
                async: false,
                success: function (data) {
                    if (data.status == 1) {
                        alert("获取子设备类型错误:" + data.msg);
                        return;
                    } else {
                        data2 = data.msg;
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("获取子设备类型出现" + XMLHttpRequest.status + "错误请联系管理员！");
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
                { field: 'defined_device_name', title: '类型名称', width: 100, align: 'center' },
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
                    field: 'normal_image', title: '地图正常图标', width: 100, align: 'center',
                    formatter: function (value, row, index) {
                        if (value == 0) {
                            return "无";
                        }
                        var html = '<img style="height:28px;width:20px;" src="' + value + '" alt="Alternate Text" />';
                        return html;
                    }
                },
                {
                    field: 'error_image', title: '地图错误图标', width: 100, align: 'center',
                    formatter: function (value, row, index) {
                        if (value == 0) {
                            return "无";
                        }
                        var html = '<img style="height:28px;width:20px;" src="' + value + '" alt="Alternate Text" />';
                        return html;
                    }
                },
                {
                    field: 'flash_image', title: '地图闪光图标', width: 100, align: 'center',
                    formatter: function (value, row, index) {
                        if (value == 0) {
                            return "无";
                        }
                        var html = '<img style="height:28px;width:20px;" src="' + value + '" alt="Alternate Text" />';
                        return html;
                    }
                },
                {
                    field: 'popup_image', title: '弹出框图片', width: 100, align: 'center',
                    formatter: function (value, row, index) {
                        if (value == 0) {
                            return "无";
                        }
                        var html = '<img style="height:20px;width:20px;" src="' + value + '" alt="Alternate Text" />';
                        return html;
                    }
                },
                {
                    field: 'enabled', title: '是否显示', width: 100, align: 'center',
                    formatter: function (value, row, index) {
                        if (value == 1) {
                            return "显示";
                        } else {
                            return "不显示";
                        }
                    }
                },
                {
                    field: 'base_device_type_id', title: '包含基础设备类型', width: 100, align: 'center',
                    formatter: function (value, row, index) {
                        if (value == 0) {
                            return "";
                        } else {
                            for (var i = 0; i < baseDeviceTypeJson.length; i++) {
                                if (value == baseDeviceTypeJson[i].key) {
                                    return baseDeviceTypeJson[i].value;
                                }
                            }
                        }
                    }
                },
                { field: 'defined_device_content', title: '备注', width: 100, align: 'center' },
                {
                    field: 'ids', title: '操作', width: 122, align: 'center',
                    formatter: function (value, row, index) {
                        return '<button class="btn btn-primary btn-xs" onclick=\'updateDeviceTypeDialog("' + row.id + '","child")\'>修改</button> <button class="btn btn-danger btn-xs" onclick=\'deleteDeviceTypeCommit("' + row.id + '","child")\'>删除</button>'
                    }
                }
                ]],
                onResize: function () {
                    $('#deviceTypeGrid').datagrid('fixDetailRowHeight', index);
                }
            });
            $('#deviceTypeGrid').datagrid('fixDetailRowHeight', index);
        }
    })
    $('#deviceTypeGrid').datagrid('getPager').pagination({//分页栏下方文字显示
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
            getDeviceTypeData();
        },
        onSelectPage: function (pageindex, pagesize) {
            //下一页
            pageIndex = pageindex;
            pageSize = pagesize;
            getDeviceTypeData();
        },
        onRefresh: function (pageindex, pagesize) {
            //pageIndex = pageNumber;
            // 刷新按钮
            pageIndex = pageindex;
            pageSize = pagesize;
            getDeviceTypeData();
        }
    });
}
//获取配置数据
function getDeviceTypeData() {
    var industry = $("#industryType").val();
    $.ajax({
        url: "/Config/GetAllDeviceDefined",
        data: { industry: industry, pageIndex: pageIndex, pageSize: pageSize },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("获取设备类型配置错误:" + data.msg);
                return;
            } else {
                $('#deviceTypeGrid').datagrid('loadData', data.msg);
                $('#deviceTypeGrid').datagrid('loaded');
                $('#deviceTypeGrid').datagrid('getPager').pagination('refresh', {
                    total: data.msg.total,
                    pageNumber: pageIndex,
                    pageSize: pageSize
                });
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取设备类型配置出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//添加弹窗
var addnum = 0;
//参数:pid父节点id,baseType基础设备类型,enable显示隐藏标识
function addDeviceTypeDialog(pid,baseType,enable) {
    if (pid != 0 && baseType != 0) {
        alert("该设备类型已包含基础设备类型,无法再添加子级");
        return;
    }
    if (pid != 0) {
        //添加子节点,如果父节点是隐藏状态则子节点必须隐藏
        document.getElementsByName('enabled')[enable].checked = true;
        if (enable == 0) {
            document.getElementsByName('enabled')[0].disabled = true;
            document.getElementsByName('enabled')[1].disabled = true;
        } else {
            document.getElementsByName('enabled')[0].disabled = false;
            document.getElementsByName('enabled')[1].disabled = false;
        }
    } else {
        document.getElementsByName('enabled')[0].checked = false;//是否启用
        document.getElementsByName('enabled')[1].checked = false;
    }
    UPDATEANDADDFLAG = "ADD";
    $("#addDeviceTypeDiv").dialog("open");
    $("#lookDeviceDefinedDiv").dialog("close");
    $("#definedDevicePid").val(pid);//自定义设备pid
    $("#deviceTypeName").val("");//自定义设备类型名称
    if (addnum != 0) {
        activeImageHandler.set("selectedIndex", 0);//激活图标
        unActiveImageHandler.set("selectedIndex", 0);//未激活图标
        normalImageHandler.set("selectedIndex", 0);//地图正常图标
        errorImageHandler.set("selectedIndex", 0);//地图错误图标
        flashImageHandler.set("selectedIndex", 0);//地图闪光图标
        popupImageHandler.set("selectedIndex", 0);//弹窗框图片名称
    }
    $("#popupImageUploadShow").attr("src", "");//弹框图片缩略图
    $("#definedContent").val("");//备注
    
    var baseDeviceType = document.getElementsByName('baseDeviceType');
    for (var i = 0; i < baseDeviceType.length; i++) {
        document.getElementsByName('baseDeviceType')[i].checked = false;
    }
    $("#addDeviceTypeDiv").dialog({ title: "添加" });
    if (addnum == 0) {
        setTimeout(dropDownLoad, 100);
        addnum += 1;
    }
}
var activeImageHandler;//激活图标
var unActiveImageHandler;//未激活图标
var normalImageHandler;//地图正常图标
var errorImageHandler;//地图错误图标
var flashImageHandler;//地图闪光图标
var popupImageHandler;//地图弹窗图片
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
        }
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
    normalImageHandler = $("#normalImage").msDropdown({
        visibleRows: 5,
        on: {
            change: function (data, ui) {
                if (data.value == "1") {
                    //上传
                    $("#normalImageUpload").click();
                } else {
                    //清空展示的图片
                    var ShowImages = document.getElementById("normalImageUploadShow");
                    ShowImages.innerHTML = "";
                    //清空file的值
                    $("#normalImageUpload").val("");
                }
            }
        }
    }).data("dd");
    errorImageHandler = $("#errorImage").msDropdown({
        visibleRows: 5,
        on: {
            change: function (data, ui) {
                if (data.value == "1") {
                    //上传
                    $("#errorImageUpload").click();
                } else {
                    //清空展示的图片
                    var ShowImages = document.getElementById("errorImageUploadShow");
                    ShowImages.innerHTML = "";
                    //清空file的值
                    $("#errorImageUpload").val("");
                }
            }
        }
    }).data("dd");
    flashImageHandler = $("#flashImage").msDropdown({
        visibleRows: 5,
        on: {
            change: function (data, ui) {
                if (data.value == "1") {
                    //上传
                    $("#flashImageUpload").click();
                } else {
                    //清空展示的图片
                    var ShowImages = document.getElementById("flashImageUploadShow");
                    ShowImages.innerHTML = "";
                    //清空file的值
                    $("#flashImageUpload").val("");
                }
            }
        }
    }).data("dd");
    popupImageHandler = $("#popupImage").msDropdown({
        visibleRows: 5,
        on: {
            change: function (data, ui) {
                if (data.value == "1") {
                    //上传
                    $("#popupImageUpload").click();
                } else if (data.value == 0) {
                    $("#popupImageUploadShow").attr("src", "");
                } else if (data.value != 0) {
                    $("#popupImageUploadShow").attr("src", data.value);
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
//预览弹窗图片大图
function popupImageUpLoadValueChange(data, showId) {
    var id = data.id;
    if (data.value != "") {
        var elm = document.getElementById(id);
        if (elm.files === "undefined") return;
        var file = elm.files[0];
        if (file) {
            var reader = new FileReader();
            //将文件以Data URL形式读入页面  
            reader.readAsDataURL(file);
            reader.onload = function (e) {
                var img = document.getElementById(showId);
                img.src = this.result;
            }
        }
        //$("#" + showId).arrt("src")
    }
}
//双击弹出图片看弹出图片原图
function lookPopupImage(data) {
    $("#lookDevicePopupImage").attr("src", data.src);
    $("#lookDevicePopupImageDiv").dialog("open");
}
//添加提交
function addDeviceTypeCommit() {
    var deviceTypeName = $("#deviceTypeName").val();//自定义设备类型名称
    if (deviceTypeName == "") {
        alert("请输入自定义设备类型名称");
        return;
    }
    var activeImage = activeImageHandler.uiData.option.value; //激活图标
    if (activeImage == 1) {
        if ($("#activeImageUpload").val() == "") {
            alert("请选择上传图片(激活图标)");
            return;
        }
    }
    var unActiveImage = unActiveImageHandler.uiData.option.value; //未激活图标
    if (unActiveImage == 1) {
        if ($("#unActiveImageUpload").val() == "") {
            alert("请选择上传图片(未激活图标)");
            return;
        }
    }
    var normalImage = normalImageHandler.uiData.option.value; //地图正常图标
    if (normalImage == 1) {
        if ($("#normalImageUpload").val() == "") {
            alert("请选择上传图片(正常图标)");
            return;
        }
    }
    var errorImage = errorImageHandler.uiData.option.value; //地图错误图标
    if (errorImage == 1) {
        if ($("#errorImageUpload").val() == "") {
            alert("请选择上传图片(错误图标)");
            return;
        }
    }
    var flashImage = flashImageHandler.uiData.option.value; //地图闪光图标
    if (flashImage == 1) {
        if ($("#flashImageUpload").val() == "") {
            alert("请选择上传图片(闪光图标)");
            return;
        }
    }
    var popupImage = popupImageHandler.uiData.option.value;//地图弹窗图片
    if (popupImage == 1) {
        if ($("#popupImageUpload").val() == "") {
            alert("请选择上传图片(弹窗图片)");
            return;
        }
    }
    var enabled = $('input[name="enabled"]:checked').val();//是否启用
    if (enabled == "" || enabled == null) {
        alert("请选择是否显示");
        return;
    }
    var baseDeviceType = $('input[name="baseDeviceType"]:checked').val();//包含基础设备类型
    if (baseDeviceType == "" || baseDeviceType == null) {
        baseDeviceType = 0;
    }
    var definedContent = $("#definedContent").val();//备注
    var industryId = $("#industryType").val();//行业id
    var definedDevicePid = $("#definedDevicePid").val();//设备pid
    if (definedDevicePid != "0") {
        //添加父节点
        if (baseDeviceType == 0) {
            alert("请选择包含基础设备类型");
            return;
        }
    }
    if (UPDATEANDADDFLAG == "UPDATE") {
        var deviceDefinedID = $("#deviceDefinedID").val();
        $.ajaxFileUpload({
            url: "/Config/UpdateDeviceDefined",
            sucureurl: false,
            async: false,
            data: { deviceDefinedID: deviceDefinedID, deviceTypeName: deviceTypeName, activeImage: activeImage, unActiveImage: unActiveImage, normalImage: normalImage, errorImage: errorImage, flashImage: flashImage, popupImage: popupImage, enabled: enabled, definedContent: definedContent, baseDeviceType: baseDeviceType, industryTypeID: industryId, definedDevicePid: definedDevicePid },
            dataType: 'content',
            success: function (data) {
                if (data == 1) {
                    alert("修改成功");
                    $("#addDeviceTypeDiv").dialog("close");
                    getDeviceTypeData();
                } else if (data == 2) {
                    alert("该基础设备类型已被绑定，请选择其他设备类型");
                } else if (data == 4) {
                    alert("该类型下已有子设备类型无法绑定基础设备类型")
                } else if (data == 3) {
                    alert("修改失败");
                } else {
                    alert(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("修改设备类型出现"+XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    } else if (UPDATEANDADDFLAG == "ADD") {
        $.ajaxFileUpload({
            url: "/Config/AddDeiveDefined",
            sucureurl: false,
            async: false,
            data: { deviceTypeName: deviceTypeName, activeImage: activeImage, unActiveImage: unActiveImage, normalImage: normalImage, errorImage: errorImage, flashImage: flashImage, popupImage: popupImage, enabled: enabled, definedContent: definedContent, baseDeviceType: baseDeviceType, industryTypeID: industryId, definedDevicePid: definedDevicePid },
            dataType: 'content',
            success: function (data) {
                if (data == 1) {
                    alert("添加成功");
                    $("#addDeviceTypeDiv").dialog("close");
                    getDeviceTypeData();
                } else if (data == 2) {
                    alert("该基础设备类型已被绑定，请选择其他设备类型");
                } else if (data == 3) {
                    alert("添加失败");
                } else {
                    alert(data);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("添加自定义设备类型出现"+XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }
}

//修改弹窗
function updateDeviceTypeDialog(deviceDefinedID, flag) {
    UPDATEANDADDFLAG = "UPDATE";
    $("#lookDeviceDefinedDiv").dialog("close");
    $("#addDeviceTypeDiv").dialog({ title: "修改" });// = "修改自定义设备类型";
    $("#addDeviceTypeDiv").dialog("open");
    $.ajax({
        url: "/Config/GetDeviceDefinedByID",
        data: { deviceDefinedID: deviceDefinedID },
        type: "post",
        datatype: "json",
        async: false,
        success: function (data1) {
            if (data1.status == 1) {
                alert("获取自定义设备类型错误:" + data1.msg);
                return;
            } else {
                var data = data1.msg;
                $("#deviceDefinedID").val(deviceDefinedID);
                $("#deviceTypeName").val(data.defined_device_name);//自定义设备类型名称
                if (addnum == 0) {
                    //setTimeout(dropDownLoad, 100);
                    dropDownLoad();
                    addnum += 1;
                }
                activeImageHandler.set("value", data.active_image);//激活图标
                unActiveImageHandler.set("value", data.unactive_image);//未激活图标
                normalImageHandler.set("value", data.normal_image);//地图正常图标
                errorImageHandler.set("value", data.error_image);//地图错误图标
                flashImageHandler.set("value", data.flash_image);//地图闪光图标
                popupImageHandler.set("value", data.popup_image);//地图弹窗图片
                document.getElementsByName('enabled')[data.enabled].checked = true;//是否启用
                document.getElementsByName('enabled')[0].disabled = false;
                document.getElementsByName('enabled')[1].disabled = false;
                $("#definedContent").val(data.defined_device_content);//备注
                $("#definedDevicePid").val(data.pid);//自定义设备pid
                $("#activeImageUploadShow").html("");//激活图标
                $("#unActiveImageUploadShow").html("");//未激活图标
                $("#normalImageUploadShow").html("");//地图正常图标
                $("#errorImageUploadShow").html("");//地图错误图标
                $("#flashImageUploadShow").html("");//地图闪光图标
                $("#popupImageUploadShow").attr("src", "");//弹框图片缩略图
                //基础设备类型
                var baseDeviceType = document.getElementsByName('baseDeviceType');
                for (var i = 0; i < baseDeviceType.length; i++) {
                    //document.getElementsByName('baseDeviceType')[i].checked = false;
                    if (baseDeviceType[i].value == data.base_device_type_id) {
                        baseDeviceType[i].checked = true;
                    }
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}

//删除自定义类型
function deleteDeviceTypeCommit(deviceDefinedID, flag) {
    $("#addDeviceTypeDiv").dialog("close");
    $("#lookDeviceDefinedDiv").dialog("close");
    if (flag == "child") {
        if (!confirm("确定要删除吗")) {
            return;
        }
    } else if (flag == "base") {
        if (!confirm("确定要删除该类型及其子级")) {
            return;
        }
    }
    $.ajax({
        url: "/Config/DeleteDeviceDefined",
        data: { deviceDefinedID: deviceDefinedID },
        type: "post",
        datatype: "json",
        async: false,
        success: function (data) {
            if (data.status == 1) {
                alert("删除设备类型错误:" + data.message);
                return;
            } else {
                if (data.msg) {
                    alert("删除成功");
                    getDeviceTypeData();
                } else {
                    alert("删除失败");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("删除设备类型出现"+XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
