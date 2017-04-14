//初始加载
$(function () {
    videoClassify.initLogin();
    getCameraTree();
    getAllCameraTree();
    getVideoGroupGrid(1, 30);
    getVideoGroupData(1, 30);
})

//获取自定义设备分组树结构
function getCameraTree() {
    var regionId = $.cookie("mainControlRegionId");
    $.ajax({
        url: "/Video/GetDefinedGroupTree",
        type: "post", //这里是http类型
        data: { regionId: regionId },
        dataType: "json", //传回来的数据类型
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
            } else {
                //绑定树形结构的数据源
                $.fn.zTree.init($("#DeviceTree"), setting, data.msg);
                var treeObj = $.fn.zTree.getZTreeObj("DeviceTree");
                treeObj.expandAll(true);
                var sNodes = treeObj.getNodes();
                if (sNodes[0].children != null) {
                    for (var i = 0; i < sNodes[0].children.length; i++) {
                        if (sNodes[0].children[i].pid == -1) {
                            sNodes[0].children[i].isParent = true;
                            sNodes[0].children[i].open = true;
                            treeObj.updateNode(sNodes[0].children[i]);
                        }
                    }
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}

var setting = {
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false,
        drag: {
            isCopy: false,
            isMove: true,
            prev: true,
            next: true,
            inner: false
        },
    },
    view: {
        dblClickExpand: true,
        addDiyDom: addDiyDom,
        selectedMulti: false
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
            rootPId: -2
        }
    },
    callback: {
        beforeRename: zTreeBeforeRename,//修改节点名称确定后回掉函数
        beforeDrag: groupGeforeDrag,//分组节点拖拽之前
        beforeDrop: groupGeforeDrop,//分组节点拖拽完成之前调用
        onDrop: grouponDrop
    }
}
//父节点显示添加楼层按钮
function addDiyDom(treeId, treeNode) {
    if (treeNode.pid == -2) {//总节点
        var aObjchidl = $("#" + treeNode.tId + "_a");
        if ($("#diyHeadBtn_" + treeNode.id).length > 0) return;
        var editStr = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + "<img src='../style/base/images/public/jia.png' id='diyHeadBtn_" + treeNode.id + "' title='添加分组' class='add-img' />";
        aObjchidl.append(editStr);
        var btn = $("#diyHeadBtn_" + treeNode.id);
        if (btn) btn.bind("click", function () { addGroupNode(treeNode) });
    } else if (treeNode.device_code == "") {//分组节点
        var aObjchidl = $("#" + treeNode.tId + "_a");
        if ($("#diyDBtn_" + treeNode.id).length > 0) return;
        if ($("#diyUBtn_" + treeNode.id).length > 0) return;
        var edit = "&nbsp;&nbsp;&nbsp;"
        edit += '<span class="operation-span">';
        edit += "<img src='../style/base/images/public/xiugai.png' id='diyUBtn_" + treeNode.id + "' title='修改分组' onfocus='this.blur();' />" + "&nbsp;&nbsp;&nbsp;<img src='../style/base/images/public/cha.png' id='diyDBtn_" + treeNode.id + "' title='删除分组' onfocus='this.blur();' />";
        edit += '</span>';
        aObjchidl.append(edit);
        var btnU = $("#diyUBtn_" + treeNode.id);
        var btnD = $("#diyDBtn_" + treeNode.id);
        if (btnU) btnU.bind("click", function () { updateGroupNode(treeNode) });//修改分组
        if (btnD) btnD.bind("click", function () { deleteGroupNode(treeNode) });//删除分组
    } else if (treeNode.device_code != "") {
        var aObjchidl = $("#" + treeNode.tId + "_a");
        if ($("#diyDBtn1_" + treeNode.tId).length > 0) return;
        var edit = "&nbsp;&nbsp;&nbsp;"
        edit += '<span class="operation-span">';
        edit += "<img src='../style/base/images/public/cha.png' id='diyDBtn1_" + treeNode.tId + "' title='移除设备' onfocus='this.blur();' />";
        edit += '</span>';
        aObjchidl.append(edit);
        var btne = $("#diyDBtn1_" + treeNode.tId);
        if (btne) btne.bind("click", function () { deleteGroupChildNode(treeNode) });//删除分组下的设备
    }
};
//添加节点
function addGroupNode(treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("DeviceTree");
    var newNodes = { name: "newNode1", id: -3, sid: 0, pid: treeNode.sid, isParent: true, device_code: "" };
    treeNode.isParent = true;
    var newNode = zTree.addNodes(treeNode, newNodes);
    zTree.editName(newNode[0]);
}
//修改节点名称
function updateGroupNode(treeNode) {
    var zTree = $.fn.zTree.getZTreeObj("DeviceTree");
    zTree.editName(treeNode);
}
//删除节点
function deleteGroupNode(treeNode) {
    if (confirm("确定要删除该分组吗")) {
        //var zTree = $.fn.zTree.getZTreeObj("DeviceTree");
        //zTree.removeNode(treeNode);
        if (treeNode.resSwitchCode != "" && treeNode.resSwitchCode != null) {
            //删除论切组
            videoClassify.DelSwitchResource(treeNode.resSwitchCode);
        }
        var id = treeNode.id;
        $.ajax({
            url: "/Video/DeleteCarmeraGroup",
            type: "post",
            data: { id: id },
            dataType: "json",
            async: true,
            success: function (data) {
                if (data.status == 1) {
                    alert(data.msg);
                    return false;
                } else {
                    if (data.msg) {
                        getCameraTree();
                    } else {
                        alert("删除分组失败");
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }
}
//修改节点名称确定后回掉函数
function zTreeBeforeRename(treeId, treeNode, newName) {
    var groupName = newName;
    if (groupName == "") {
        alert("请输入分组名称");
        return false;
    }
    //判断是否有修改名字
    if (treeNode.id != -3) {
        if (groupName == treeNode.name) {
            return;
        }
    }
    var pid = treeNode.pid;
    var regionId = $.cookie("mainControlRegionId");
    $.ajax({
        url: "/Video/AddCarmeraGroup",
        type: "post",
        data: { id: treeNode.id, groupName: groupName, pid: pid, regionId: regionId },
        dataType: "json",
        async: true,
        success: function (data) {
            if (data.status == 2) {
                alert("该分组名称已存在，请重新输入");
                return false;
            } else if (data.status == 1) {
                alert(data.msg);
                return false;
            } else {
                if (data.msg) {
                    getCameraTree();
                } else {
                    alert("修改分组名称失败");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}
//删除分组下的设备
function deleteGroupChildNode(treeNode) {
    if (confirm("确定要移除该设备吗")) {
        var partNode = treeNode.getParentNode();
        if (partNode.resSwitchCode != "" && partNode.resSwitchCode != null) {
            var child = partNode.children;
            if (child != null) {
                if (child.length < 2) {
                    //删除论切组
                    videoClassify.DelSwitchResource(treeNode.resSwitchCode);
                    //修改组的字段ext1为空
                    $.ajax({
                        url: "/Video/UpdateGroupRegCodeById",
                        type: "post", //这里是http类型
                        data: { groupId: treeNode.pid, resCode:"" },
                        dataType: "json", //传回来的数据类型
                        async: true,
                        success: function (data) {
                            if (data.status == 1) {
                                alert(data.msg);
                            }
                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(XMLHttpRequest.status + "错误请联系管理员！");
                        }
                    });
                }
            } else {
                //删除论切组
                videoClassify.DelSwitchResource(treeNode.resSwitchCode);
            }
        }
        var deviceId = treeNode.id;
        var groupId = treeNode.pid;
        $.ajax({
            url: "/Video/RemoveDevice",
            type: "post", //这里是http类型
            data: { deviceId: deviceId, groupId: groupId },
            dataType: "json", //传回来的数据类型
            async: true,
            success: function (data) {
                if (data.status == 1) {
                    alert(data.msg);
                } else {
                    if (data.msg) {
                        getCameraTree();
                    } else {
                        alert("移除失败");
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    }
}
//获取所有的摄像头
function getAllCameraTree() {
    var regionId = $.cookie("mainControlRegionId");
    $.ajax({
        url: "/Video/GetAllCameraTree",
        type: "post", //这里是http类型
        data: { regionId: regionId },
        dataType: "json", //传回来的数据类型
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
            } else {
                //绑定树形结构的数据源
                $.fn.zTree.init($("#DeviceInfoTree"), settingCamera, data.msg);
                var treeObj = $.fn.zTree.getZTreeObj("DeviceInfoTree");
                treeObj.expandAll(true);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}

var settingCamera = {
    edit: {
        enable: true,
        drag: {
            isCopy: true,
            isMove: false,
            prev: false,
            next: false,
            inner: false
        },
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
        beforeDrag: deviceBeforeDrag,
        beforeDrop: deviceBeforeDrop
    }
}
//分组节点拖拽之前
function groupGeforeDrag(treeId, treeNodes) {
    for (var i = 0, l = treeNodes.length; i < l; i++) {
        if (treeNodes[i].device_code == "") {
            return false;//不允许拖动父节点
        }
    }
    return true;
}
//分组节点拖拽完成之前调用
function groupGeforeDrop(treeId, treeNodes, targetNode, moveType) {
    if (moveType == null || moveType == "inner") {
        return false;
    }
    for (var i = 0, l = treeNodes.length; i < l; i++) {
        if (treeNodes[i].pid != targetNode.pid) {
            return false;//只能在同一个父节点下拖动
        }
    }

}
//分组节点拖拽完成之后调用
function grouponDrop(event, treeId, treeNodes, targetNode, moveType) {
    var groupId = targetNode.pid;
    var gen = targetNode.getParentNode();
    var childNode = gen.children;
    var devices = "";
    for (var i = 0; i < childNode.length; i++) {
        if (i == childNode.length - 1) {
            devices += childNode[i].id + "|" + childNode[i].rank;
        } else {
            devices += childNode[i].id + "|" + childNode[i].rank + ",";
        }
    }
    $.ajax({
        url: "/Video/UpdateGroupDeviceRank",
        type: "post", //这里是http类型
        data: { groupId: groupId, devices: devices },
        dataType: "json", //传回来的数据类型
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
            } else {
                if (data.msg) {
                    getCameraTree();
                } else {
                    alert("更改顺序失败");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}
//设备节点拖拽之前
function deviceBeforeDrag(treeId, treeNodes) {
    for (var i = 0, l = treeNodes.length; i < l; i++) {
        if (treeNodes[i].pid == -1) {
            return false;
        }
    }
    return true;
}
//设备节点拖拽完成时
function deviceBeforeDrop(treeId, treeNodes, targetNode, moveType) {
    var groupId;
    var rank;
    switch (moveType) {
        case "prev"://成为同级前一个节点
            if (targetNode.pid == -1 || targetNode.pid == -2) {
                alert("请将摄像头拖拽到分组下");
                return false;
            } else {
                groupId = targetNode.pid;//获取父节点的id为分组id
                rank = targetNode.rank;
            }
            break;
        case "next"://成为同级后一个节点
            if (targetNode.pid == -1 || targetNode.pid == -2) {
                groupId = targetNode.id;
                if (targetNode.children != null) {
                    rank = targetNode.children[targetNode.children.length - 1].rank + 1;
                } else {
                    rank = 1;
                }
            } else {
                groupId = targetNode.getParentNode().id;//获取父节点的id为分组id
                rank = targetNode.rank + 1;
            }
            break;
    }
    var deviceId = "";
    for (var i = 0; i < treeNodes.length; i++) {
        if (i == treeNodes.length - 1) {
            deviceId += treeNodes[i].id;
        } else {
            deviceId += treeNodes[i].id + ",";
        }
    }
    //往视频平台中加入论切组
    var regCode = "";
    var children = targetNode.children;
    if (targetNode.resSwitchCode != null && targetNode.resSwitchCode != "") {
        //有轮切组  修改
        if (children != null) {
            //摄像头数量最少是2个才能修改
            var deviceArray = [];
            for (var i = 0; i < children.length; i++) {
                var device = {};
                device.CameraCode = children[i].device_code;
                device.CameraName = children[i].name;
                device.Interval = 10;
                deviceArray.push(device);
            }
            for (var i = 0; i < treeNodes.length; i++) {
                var device = {};
                device.CameraCode = treeNodes[i].device_code;
                device.CameraName = treeNodes[i].name;
                device.Interval = 10;
                deviceArray.push(device);
            }
            var result = videoClassify.ModifySwitchResource(targetNode.resSwitchCode, targetNode.name, deviceArray);
            if (result != 0) {
                return false;
            }
        }
    } else {
        //没有轮切组  添加
        if (children != null) {
            //摄像头数量最少2个才能添加轮切
            var deviceArray = [];
            //循环组下的已有的设备
            for (var i = 0; i < children.length; i++) {
                var device = {};
                device.CameraCode = children[i].device_code;
                device.CameraName = children[i].name;
                device.Interval = 10;
                deviceArray.push(device);
            }
            //循环刚加进来的设备
            for (var i = 0; i < treeNodes.length; i++) {
                var device = {};
                device.CameraCode = treeNodes[i].device_code;
                device.CameraName = treeNodes[i].name;
                device.Interval = 10;
                deviceArray.push(device);
            }
            regCode = videoClassify.AddSwitchResource(targetNode.name, deviceArray);
            if (regCode == "") {//如果没有组编码表示添加失败
                return false;
            }
        }
    }
    $.ajax({
        url: "/Video/BindGroupAndDevice",
        type: "post", //这里是http类型
        data: { deviceIds: deviceId, groupId: groupId, rank: rank, regCode: regCode },
        dataType: "json", //传回来的数据类型
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
            } else {
                if (data.msg) {
                    getCameraTree();
                } else {
                    alert("添加设备失败");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}
//加载视频分组列表
function getVideoGroupGrid(pageIndex, pageSize) {
    var _data = [];
    $("#deviceGroupGrid").datagrid({
        data: _data,
        fitColumns: true,
        rownumbers: true,
        pagination: true, //分页控件 
        singleSelect: true,//只允许选中一行
        columns: [[
            { field: 'id', title: 'id', width: 100, align: 'center', hidden: true },
            { field: 'group_name', title: '分组名称', width: 100, align: 'center' },
            {
                field: 'group_type', title: '分组类型', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    switch (value) {
                        case 1:
                            return "设备分组"
                            break;
                        case 2:
                            return "视频轮播";
                            break;
                    }
                }
            },
            {
                field: 'ids', title: '操作', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    //<button class="btn btn-primary btn-xs" onclick=\'TVWall(' + row.id + ')\'>上大屏</button><button class="btn btn-warning btn-xs" style="margin-right:5px;" onclick=\'mapSwitch(' + row.id + ')\'>地图轮播</button>
                    return ' <button class="btn btn-warning btn-xs" style="margin-right:5px;" onclick=\'videoIndexSwitch(' + row.id + ')\'>监控轮播</button> <button class="btn btn-warning btn-xs" style="margin-right:5px;" onclick=\'videoIndexOneSwitch(' + row.id + ')\'>监控轮切</button> <button class="btn btn-warning btn-xs" style="margin-right:5px;" onclick=\'mapSwitch(' + row.id + ')\'>网格地图</button> '

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
                url: "/Video/GetDeviceByGroupId",
                data: { groupId: row.id },
                type: "post",
                datatype: "json",
                async: false,
                success: function (data) {
                    if (data.status == 1) {
                        alert("获取设备错误" + data.msg);
                        return;
                    } else {
                        data2 = data.msg;
                    }

                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert("获取设备失败" + XMLHttpRequest.status + "错误请联系管理员！");
                }
            });
            $("#ddv-" + index).datagrid({
                data: data2,
                singleSelect: true,
                fitColumns: true,
                columns: [[
                    { field: 'id', title: 'id', width: 100, align: 'center', hidden: true },
                    { field: 'device_name', title: '设备名称', width: 100, align: 'center' },
                    { field: 'device_code', title: '设备编码', width: 100, align: 'center' }
                ]]
            });
            $('#deviceGroupGrid').datagrid('fixDetailRowHeight', index);
        },
        onLoadSuccess: function (data) {

        },
        onLoadError: function () {
            alert('加载失败');
        }
    })
    $('#deviceGroupGrid').datagrid('getPager').pagination({//分页栏下方文字显示
        showPageList: true,
        pageNumber: pageIndex,
        pageSize: pageSize, //每页显示的记录条数，默认为10
        pageList: [5, 10, 20, 30, 50], //可以设置每页记录条数的列表
        beforePageText: '第', //页数文本框前显示的汉字   
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示{from}-{to}条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{total}条',
        onChangePageSize: function (pageNumber, pageSize) {
            //一页显示几条
            getVideoGroupData(pageNumber, pageSize);
        },
        onSelectPage: function (pageNumber, pageSize) {
            //下一页
            getVideoGroupData(pageNumber, pageSize);
        }
    });
}
//获取视频分组
function getVideoGroupData(pageIndex, pageSize) {
    var regionId = $.cookie("mainControlRegionId");
    $.ajax({
        url: "/Video/GetVideoGroupData",
        data: { pageIndex: pageIndex, pageSize: pageSize, regionId: regionId },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("获取视频分组错误" + data.msg);
                return;
            } else {
                $('#deviceGroupGrid').datagrid('loadData', data.msg);
                $('#deviceGroupGrid').datagrid('loaded');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取视频分组失败" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//上大屏
function TVWall(groupId) {

}
//视频监控页面轮播
function videoIndexSwitch(groupId) {
    window.location.href = "/Video/Index?type=monitor&&groupId=" + groupId;
}
//监控页面轮切
function videoIndexOneSwitch(groupId) {
    window.location.href = "/Video/Index?type=switch&&groupId=" + groupId;
}
//地图页面轮播
function mapSwitch(groupId) {
    if (groupId == 0) {
        alert("设备组为空！");
        return;
    }
    $.ajax({
        url: "/Schedule/GetCameraPatrolDeviceByGroupId",
        type: "post",
        data: { groupId: groupId },
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0 && data.msg != null) {
                window.location.href('/Map/Index?type=monitor&&groupId=' + groupId);
            }
            else {
                alert(data.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}