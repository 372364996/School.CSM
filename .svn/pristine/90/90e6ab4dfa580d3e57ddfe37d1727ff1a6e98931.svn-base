

$(function () {
    //获取设备列表
    getDeviceInfoList(1, 30);
    getDeviceInfoData(1, 30);
    $("#subsystem_id").change(function () {
        if ($("#subsystem_id").val() == "1") {//视频子系统
            $("#coverRangeTr").show();
            $("#cameraTowardsTr").show();
            $("#visualRangeTr").show();
            $("#jishiduolu").show();//及时回放和多路视频
            $("#daqianglishi").show();//上大墙、历史回放
        } else {
            $("#coverRangeTr").hide();
            $("#cameraTowardsTr").hide();
            $("#visualRangeTr").hide();
            $("#jishiduolu").hide();//及时回放和多路视频
            $("#daqianglishi").hide();//上大墙、历史回放
        }
    })
    $("#device_type").change(function () {
        var device_type = $("#device_type").val();
        if (device_type == 1 || device_type == 2 || device_type == 3 || device_type == 4) {//摄像头
            $("#coverRangeTr").show();
            $("#cameraTowardsTr").show();
            $("#visualRangeTr").show();
            $("#jishiduolu").show();//及时回放和多路视频
            $("#daqianglishi").show();//上大墙、历史回放
        } else {
            $("#coverRangeTr").hide();
            $("#cameraTowardsTr").hide();
            $("#visualRangeTr").hide();
            $("#jishiduolu").hide();//及时回放和多路视频
            $("#daqianglishi").hide();//上大墙、历史回放
        }
    })
})

function getDeviceInfoList(pageIndex, pageSize) {
    var _data = [];
    $("#deviceInfoListGrid").datagrid({
        data: _data,
        fitColumns: true,
        rownumbers: true,
        pagination: true, //分页控件 
        singleSelect: true,//只允许选中一行
        onDblClickRow: function (rowIndex, rowData) {
            lookDeviceInfo(rowData.id);
        },
        //toolbar: [{
        //iconCls: 'icon-add ',
        //text: "新增",
        //handler: function () { $("#addDeviceTypeDiv").dialog("open"); }
        //}],
        columns: [[
            { field: 'id', title: 'id', width: 100, align: 'center', hidden: true },
            { field: 'device_name', title: '设备名称', width: 100, align: 'center' },
            { field: 'device_code', title: '设备编号', width: 100, align: 'center' },
            { field: 'defined_device_name', title: '设备类型', width: 100, align: 'center' },
            {
                field: 'subsystem_id', title: '子系统', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    for (var i = 0; i < subSystem.length; i++) {
                        if (subSystem[i].key == value) {
                            return subSystem[i].value;
                        }
                    }
                }
            },
            {
                field: 'ids', title: '操作', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    return '<button class="btn btn-primary btn-xs" onclick=\'showUpdateDeviceDialog(' + row.id + ')\'>修&ensp;&ensp;改</button> <button class="btn btn-danger btn-xs" onclick=\'deleteDevice("' + row.device_code + '")\'>删&ensp;&ensp;除</button>'
                }
            }
        ]],
        onLoadSuccess: function (data) {

        },
        onLoadError: function () {
            alert('加载失败');
        }
    })
    $('#deviceInfoListGrid').datagrid('getPager').pagination({//分页栏下方文字显示
        showPageList: true,
        pageNumber: pageIndex,
        pageSize: pageSize, //每页显示的记录条数，默认为10
        pageList: [5, 10, 20, 30, 50], //可以设置每页记录条数的列表
        beforePageText: '第', //页数文本框前显示的汉字   
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示{from}-{to}条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{total}条',
        onChangePageSize: function (pageNumber, pageSize) {
            //一页显示几条
            getDeviceInfoData(pageNumber, pageSize);
        },
        onSelectPage: function (pageNumber, pageSize) {
            //下一页
            getDeviceInfoData(pageNumber, pageSize);
        }
    });
}
//获取设备列表
function getDeviceInfoData(pageIndex, pageSize) {
    var deviceName = $("#deviceName").val();
    var deviceCode = $("#deviceCode").val();
    var deviceType = $("#searchDeviceType").val();
    var regionId = $.cookie("mainControlRegionId");
    $.ajax({
        url: "/DeviceInfo/GetDeviceInfo",
        data: { pageIndex: pageIndex, pageSize: pageSize, deviceName: deviceName, deviceCode: deviceCode, deviceType: deviceType, regionId: regionId },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
                return;
            } else {
                $('#deviceInfoListGrid').datagrid('loadData', data.msg);
                $('#deviceInfoListGrid').datagrid('loaded');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//弹出修改窗体并赋值
function showUpdateDeviceDialog(id) {
    $.ajax({
        url: "/DeviceInfo/GetDeviceInfoById",
        data: { id: id },
        type: "post",
        datatype: "json",
        async: true,
        success: function (datamsg) {
            var data;
            if (datamsg.status == 1) {
                alert(datamsg.msg);
                return;
            } else {
                data = datamsg.msg;
            }
            $("#deviceID").val(data.id);//设备id，修改时使用
            $("#device_name").val(data.device_name);//设备名称
            $("#device_name").removeAttr("readonly")
            $("#device_code").val(data.device_code)//设备编号
            var device_type = $('#device_type option');//设备类型
            for (var i = 0; i < device_type.length; i++) {
                if (device_type[i].value == data.device_type) {
                    device_type[i].selected = true;
                }
            }
            var subsystem = $('#subsystem_id option');//子系统
            for (var i = 0; i < subsystem.length; i++) {
                if (subsystem[i].value == data.subsystem_id) {
                    subsystem[i].selected = true;
                }
            }
            $("#subsystem_id").attr("disabled", false);//子系统
            $("#device_type").attr("disabled", false);//设备类型
            //复合设备
            var is_parts = document.getElementsByName("is_parts");
            for (var i = 0; i < is_parts.length; i++) {
                if (is_parts[i].value == data.is_parts) {
                    is_parts[i].checked = true;
                }
            }
            //设备状态
            $("#device_status").val(data.device_status);
            $("#device_status").attr("disabled", false)
            //坐标
            $("#lonLat").val(data.latitude + "," + data.longitude);//2D的
            $("#lonLat25D").val(data.local_latitude + "," + data.local_longitude);//25D的
            if (data.subsystem_id == 1) {//视频子系统
                //显示覆盖角度等start
                $("#coverRangeTr").show();//覆盖角度
                $("#cameraTowardsTr").show();//设备朝向
                $("#visualRangeTr").show();//覆盖半径
                $("#jishiduolu").show();//及时回放和多路视频
                $("#daqianglishi").show();//上大墙、历史回放
                //显示覆盖角度end
                $("#cover_range").val(data.cover_range);//覆盖角度
                $("#camera_towards").val(data.camera_towards);//覆盖朝向
                $("#visual_range").val(data.visual_range);//覆盖半径
                //及时回访
                if ($("#jishihuifang").val() == data.ext1) {
                    document.getElementById("jishihuifang").checked = true;
                }
                //多路播放
                if ($("#duolubofang").val() == data.ext2) {
                    document.getElementById("duolubofang").checked = true;
                }
                //上大墙
                if ($("#shangdaqiang").val() == data.ext3) {
                    document.getElementById("shangdaqiang").checked = true;
                }
                //历史回放
                if ($("#lishihuifang").val() == data.ext4) {
                    document.getElementById("lishihuifang").checked = true;
                }
            } else {
                //隐藏覆盖角度等start
                $("#coverRangeTr").hide();//覆盖角度
                $("#cameraTowardsTr").hide();//设备朝向
                $("#visualRangeTr").hide();//覆盖半径
                $("#jishiduolu").hide();//及时回放和多路视频
                $("#daqianglishi").hide();//上大墙、历史回放
                
            }
            $(".TabFootBody").show();
            $("#deviceRegisterPopup").dialog('open');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })

}
//隐藏弹窗
function hideDeviceDialog() {
    $("#deviceRegisterPopup").dialog('close');
}
//显示复合设备下拉框
function showCompoundDiv() {
    $("#compoundDevice").show();
}
//隐藏复合设备下拉框
function closeCompoundDiv() {
    $("#compoundDevice").hide();
}
//设备注册提交
function updateDeviceCommit() {
    var deviceID = $("#deviceID").val();//设备id，修改时使用
    var device_name = $("#device_name").val();//设备名称
    if (device_name == "") {
        alert("请输入设备名称");
        return;
    }
    var device_code = $("#device_code").val();
    var device_type = $("#device_type").val();//设备类型
    if (device_type == "") {
        alert("请选择设备类型");
        return;
    }
    var subsystem_id = $("#subsystem_id").val();//子系统id
    if (subsystem_id == "") {
        alert("请选择子系统");
        return;
    }
    var device_status = $("#device_status").val();//设备状态
    if (device_status == "") {
        alert("请选择设备状态");
        return;
    }
    var cover_range = $("#cover_range").val();//覆盖角度
    if (cover_range == "") {
        alert("请选择设备覆盖角度");
        return;
    }
    var camera_towards = $("#camera_towards").val();//设备朝向
    if (camera_towards == "") {
        alert("请选择设备朝向");
        return;
    }
    var visual_range = $("#visual_range").val();//覆盖半径
    if (visual_range == "") {
        alert("请选择设备覆盖半径");
        return;
    }
    //复合设备
    var isParts = $('input[name="is_parts"]:checked').val();
    if (isParts == "") {
        alert("请选择是否复合设备");
        return;
    } else if (isParts == "0") {//复合设备部件
        isParts = $("#compoundDevice").val();
        if (isParts == "" || isParts == undefined) {
            alert("请选择复合设备部件");
        }
    }
    var jishihuifang = 0;//及时回访
    var duolubofang = 0;//多路播放
    var jishiduolu = $("#jishiduolu").css("display");
    if (jishiduolu != "none") {
        if (document.getElementById("jishihuifang").checked == true) {//选中及时回访
            jishihuifang = 1;
        }
        
        if (document.getElementById("duolubofang").checked == true) {//选中多路回放
            duolubofang = 1;
        }
    }
    var shangdaqiang = 0;
    var lishihuifang = 0;
    var daqianglishi = $("#daqianglishi").css("display");
    if (daqianglishi != "none") {
        if (document.getElementById("shangdaqiang").checked == true) {//选中上大墙
            shangdaqiang = 1;
        }
        if (document.getElementById("lishihuifang").checked == true) {//选中历史回放
            lishihuifang = 1;
        }
    }
    $.ajax({
        url: "/DeviceInfo/UpdateDeviceInfo",
        data: { deviceID: deviceID, device_name: device_name, device_code: device_code, device_type: device_type, subsystem_id: subsystem_id, device_status: device_status, cover_range: cover_range, camera_towards: camera_towards, visual_range: visual_range, isParts: isParts, jishihuifang: jishihuifang, duolubofang: duolubofang, shangdaqiang: shangdaqiang, lishihuifang: lishihuifang },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
                return;
            } else {
                if (data.msg) {
                    alert("修改成功");
                    getDeviceInfoData(1, 30);
                    $("#deviceRegisterPopup").dialog('close');
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }

    })

}
//删除设备
function deleteDevice(code) {
    if (!confirm("确定要删除吗")) {
        return;
    }
    var result = false;
    $.ajax({
        url: "/Register/DeleteDeviceByCode",
        data: { code: code },
        type: "post",
        datatype: "json",
        async: false,
        success: function (data) {
            result = data;
            if (data) {
                alert("删除成功");
                getDeviceInfoData(1, 30);
                getCameraTree();
            } else {
            }
        },
        error: function (data) {
            alert(data.responseText);
        }
    })
    return result;
}
//查看设备详细信息
function lookDeviceInfo(id) {
    $.ajax({
        url: "/DeviceInfo/GetDeviceInfoById",
        data: { id: id },
        type: "post",
        datatype: "json",
        async: true,
        success: function (datamsg) {
            var data;
            if (datamsg.status == 1) {
                alert(datamsg.msg);
                return;
            } else {
                data = datamsg.msg;
            }
            $("#deviceID").val(data.id);//设备id，修改时使用
            $("#device_name").val(data.device_name);//设备名称
            $("#device_name").attr("readonly", "readonly");
            $("#device_code").val(data.device_code)//设备编号
            var device_type = $('#device_type option');//设备类型
            for (var i = 0; i < device_type.length; i++) {
                if (device_type[i].value == data.device_type) {
                    device_type[i].selected = true;
                }
            }
            var subsystem = $('#subsystem_id option');//子系统
            for (var i = 0; i < subsystem.length; i++) {
                if (subsystem[i].value == data.subsystem_id) {
                    subsystem[i].selected = true;
                }
            }
            $("#subsystem_id").attr("disabled", true);//子系统
            $("#device_type").attr("disabled", true);//设备类型
            //复合设备
            var is_parts = document.getElementsByName("is_parts");
            for (var i = 0; i < is_parts.length; i++) {
                if (is_parts[i].value == data.is_parts) {
                    is_parts[i].checked = true;
                }
            }
            //设备状态
            $("#device_status").val(data.device_status);
            $("#device_status").attr("disabled", true);
            //坐标
            $("#lonLat").val(data.latitude + "," + data.longitude);//2D的
            $("#lonLat25D").val(data.local_latitude + "," + data.local_longitude);//25D的
            if (data.subsystem_id == 1) {//视频子系统
                //显示覆盖角度等start
                $("#coverRangeTr").show();//覆盖角度
                $("#cameraTowardsTr").show();//设备朝向
                $("#visualRangeTr").show();//覆盖半径
                $("#jishiduolu").show();//及时回放和多路视频
                $("#daqianglishi").show();//上大墙、历史回放
                //显示覆盖角度end
                $("#cover_range").val(data.cover_range);//覆盖角度
                $("#camera_towards").val(data.camera_towards);//覆盖朝向
                $("#visual_range").val(data.visual_range);//覆盖半径
                //及时回访
                if ($("#jishihuifang").val() == data.ext1) {
                    document.getElementById("jishihuifang").checked = true;
                }
                //多路播放
                if ($("#duolubofang").val() == data.ext2) {
                    document.getElementById("duolubofang").checked = true;
                }
                //上大墙
                if ($("#shangdaqiang").val() == data.ext3) {
                    document.getElementById("shangdaqiang").checked = true;
                }
                //历史回放
                if ($("#lishihuifang").val() == data.ext4) {
                    document.getElementById("lishihuifang").checked = true;
                }
            }
            $("#deviceRegisterPopup").dialog('open');
            $(".TabFootBody").hide();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}

//清空查询条件
function cleraCondition() {
    $("#deviceName").val("");
    $("#deviceCode").val("");
    getDeviceInfoData(1, 30);
}