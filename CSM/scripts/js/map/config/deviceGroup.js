
$(function () {
    //加载树结构
    getCameraTree();
})
//加载树结构
function getCameraTree() {
    var regionId = $.cookie("mainControlRegionId");
    $.ajax({
        url: "/DeviceInfo/GetDeviceGroupInfo",
        type: "post", //这里是http类型
        data: { regionId:regionId,pageType: 0 },
        dataType: "json", //传回来的数据类型
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
                return;
            } else {
                //绑定树形结构的数据源
                $.fn.zTree.init($("#deviceGroupTree"), setting, data.msg);
                var treeObj = $.fn.zTree.getZTreeObj("deviceGroupTree");
                treeObj.expandAll(true);
                var sNodes = treeObj.getNodes();
                for (var i = 0; i < sNodes.length; i++) {
                    if (sNodes[i].pid == -1) {
                        sNodes[i].isParent = true;
                        sNodes[i].open = true;
                        treeObj.updateNode(sNodes[i]);
                    }
                }
            }
        }
    });
}

var setting = {
    edit: {
        drag: {
            isCopy: false,
            isMove: true,
        },
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    view: {
        dblClickExpand: false
    },
    data: {
        keep: {
            parent: true,
            leaf: true
        },
        simpleData: {
            enable: true,
            idKey: "sid",
            pIdKey: "pid",
            rootPId: -1
        }
    },
    callback: {
        onDblClick: renewalDataGrid,
        // onClick: renewalDataGrid,
        beforeDrag: zTreeBeforeDrag,//鼠标拖拽
        beforeDrop: zTreeBeforeDrop//拖拽放下
    }
}
/**移动知识节点前处理*/
function zTreeBeforeDrag(treeId, treeNodes) {
    for (var i = 0, l = treeNodes.length; i < l; i++) {
        if (treeNodes[i].pid == -1) {
            //alert("不能拖拽设备组");
            return false;
        }
    }
    return true;
}
/**拖拽释放之后结束前执行  */
function zTreeBeforeDrop(treeId, treeNodes, targetNode, moveType) {
    if (targetNode.pid != -1) {
        alert("只能拖动到设备组下");
        return false;
    }
    if (!confirm("确定将设备添加到" + targetNode.name + "下吗")) {
        return false;
    }
    var result = addDeviceGroupRelate(treeNodes, targetNode);
    return result;
}
//将设备和组绑定
function addDeviceGroupRelate(treeNodes, targetNode) {
    var result = false;
    var deviceIds = "";
    var id = targetNode.id;
    for (var i = 0; i < treeNodes.length; i++) {
        if (treeNodes.length == 1) {
            deviceIds = treeNodes[i].id;
        } else if (i == treeNodes[i].length - 1) {
            deviceIds = deviceIds + treeNodes[i].id;
        } else {
            deviceIds = deviceIds + "," + treeNodes[i].id;
        }
    }
    $.ajax({
        url: "/DeviceInfo/AddDeviceGroupRelate",
        data: { deviceIds: deviceIds, id: id },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
                return false;
            } else {
                if (data.msg) {
                    getCameraTree();
                    result = true;
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
    return result;
}
//点击刷新右侧列表
function renewalDataGrid(event, treeId, treeNode) {
    if (treeNode == null) {
        return;
    }
    if (treeNode.pid == -1) {//点击的是父节点，展示父节点下所有的设备
        $.ajax({
            url: "/DeviceInfo/GetDeviceInfoByGroupId",
            data: { groupId: treeNode.id },
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
    } else {
        //展示子节点
        $("#deviceName").val(treeNode.name);
        $("#deviceCode").val(treeNode.device_code);
        getDeviceInfoData(1, 30);
    }
}
//添加分组弹窗
function addGroupDialog() {
    $("#treeName").val("");
    $("#addTreeNodeDialog").dialog("open");
}
//添加分组
function addGroupCommit() {
    var name = $("#treeName").val();
    if (name == "" || name == null) {
        alert("请输入分组名称");
        return;
    }
    var type = $("#groupType").val();
    $.ajax({
        url: "/DeviceInfo/AddDeviceGroup",
        data: { name: name, type: type },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
            } else {
                if (data.msg) {
                    getCameraTree();
                    $("#addTreeNodeDialog").dialog("close");
                }else {
                    alert("添加失败");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
