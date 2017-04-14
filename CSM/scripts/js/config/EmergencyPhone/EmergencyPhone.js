var emergencyPhone = {};
var updateTreeNode; //待修改节点
var updateTreeId;  //待修改节点ID
//初始化加载
$(function () {
    $("#treeMenu").hide();
    $("#NodeDiv").hide();
    //初始化加载园区
    if ($.cookie("mainControlRegionId")) {
        var mainControlRegion = $.cookie("mainControlRegionId");
        $("#regionSelect").find("option[value=" + mainControlRegion + "]").attr("selected", true);
    }
    emergencyPhone.Init();
})
//切换园区
changeRegion = function () {
    if ($("#NodeDiv").css('display') == 'block') {
        alert("请先关闭编辑框！");
    }
    else {
        $("#treeMenu").hide();
        emergencyPhone.Init();
    }
}

emergencyPhone.Init = function () {
    var regionId = $('#regionSelect option:selected').val();  //获取被选中的园区ID
    var regionName = $('#regionSelect option:selected').text();  //获取被选中的园区名称
    $.ajax({
        url: "/Config/GetPhoneTreeByRegionId",
        type: "post", //这里是http类型
        data: { regionId: regionId, regionName: regionName },
        dataType: "json", //传回来的数据类型
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
            } else {
                //绑定树形结构的数据源
                $.fn.zTree.init($("#phoneTree"), setting, data.msg);
                var treeObj = $.fn.zTree.getZTreeObj("phoneTree");
                treeObj.expandAll(true);
                var rNodes = treeObj.getNodes();
                for (var i = 0; i < rNodes.length; i++) {
                    if (rNodes[i].pid == -1 || rNodes[i].pid == -2) {
                        rNodes[i].isParent = true;
                        rNodes[i].open = true;
                        treeObj.updateNode(rNodes[i]);
                    }
                    if (rNodes[i].isParent == true) {
                        var cNodes = rNodes[i].children;
                        if (cNodes != null) {
                            for (var j = 0; j < cNodes.length; j++) {
                                if (cNodes[j].pid == -1 || cNodes[j].pid == -2) {
                                    cNodes[j].isParent = true;
                                    cNodes[j].open = true;
                                    treeObj.updateNode(cNodes[j]);
                                }
                            }
                        }

                    }
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
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
        showTitle: showTitleForTree
    },
    data: {
        keep: {
            parent: true,
            leaf: true
        },
        key: {
            title: "phone",
            name: "name"
        },
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: -2
        }
    },
    callback: {
        //  beforeRightClick: zTreeBeforeRightClick,
        onRightClick: zTreeOnRightClick
    }
}
//显示title内容
function showTitleForTree(treeId, treeNode) {
    return treeNode.level == 2;
}
//节点右击事件
function zTreeOnRightClick(event, treeId, treeNode) {

    //选择node非空
    if (treeNode != null) {
        if ($("#NodeDiv").css('display') == "none") {
            var level = treeNode.level;
            updateTreeNode = treeNode;
            updateTreeId = treeId;
            if (level == 0) {
                //根节点
                $("#treeMenu").css({ "top": event.clientY - 50 + "px", "left": event.clientX - 100 + "px" }); //设置右键菜单的位置 
                $("#updateLi").hide();
                $("#deleteLi").hide();
                $("#addLi").show();
                $("#treeMenu").show();
                $("#updateLi").unbind("click"); //解除绑定
                $("#deleteLi").unbind("click"); //解除绑定
                $("#addLi").unbind("click"); //解除绑定
                $("#addLi").bind("click", addParentNode);//绑定事件
            }
            else if (level == 1) {
                //父节点
                $("#treeMenu").css({ "top": event.clientY - 50 + "px", "left": event.clientX - 100 + "px" }); //设置右键菜单的位置 
                $("#addLi").show();
                $("#updateLi").show();
                $("#deleteLi").show();
                $("#treeMenu").show();
                $("#addLi").unbind("click"); //解除绑定
                $("#updateLi").unbind("click"); //解除绑定
                $("#deleteLi").unbind("click"); //解除绑定
                $("#addLi").bind("click", addNode);//绑定事件
                $("#updateLi").bind("click", updateParentNode);//绑定事件
                $("#deleteLi").bind("click", deleteParentNode);//绑定事件
            }
            else if (level == 2) {
                //子节点
                $("#treeMenu").css({ "top": event.clientY - 50 + "px", "left": event.clientX - 100 + "px" }); //设置右键菜单的位置  
                $("#addLi").hide();
                $("#updateLi").show();
                $("#deleteLi").show();
                $("#treeMenu").show();
                $("#updateLi").unbind("click"); //解除绑定
                $("#deleteLi").unbind("click"); //解除绑定
                $("#updateLi").bind("click", updateNode);//绑定事件
                $("#deleteLi").bind("click", deleteNode);//绑定事件
            }
        }
        else {
            alert("请关闭编辑框！");
        }
    }
}
//测试事件
function testClick() {
    alert(updateTreeId + updateTreeNode);
}
//新增一级节点
function addParentNode() {
    // var treeObj = $.fn.zTree.getZTreeObj("phoneTree");
    var rNodes = updateTreeNode.children;
    if (rNodes == null || rNodes.length < 3) {
        $("#NodeTitle").html("新增");
        $("#NodeName").html("电话组名称：");
        $("#treeMenu").hide();
        $("#NodeDiv").show();
        $("#childNodeInput").val("");
        $("#phoneTr").hide();
        $("#ConfirmBtn").unbind("click"); //解除绑定
        $("#ConfirmBtn").bind("click", addParentNodeBtn);//绑定事件
    }
    else {
        alert("目前最多只支持两个组");
    }
}
//确定增加一级节点
function addParentNodeBtn() {
    var name = $("#childNodeInput").val();
    var regionId = $('#regionSelect option:selected').val();  //获取被选中的园区ID
    $.ajax({
        url: "/Config/AddGroupByRegionId",
        type: "post",
        data: { regionId: regionId, groupName: name },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {
                emergencyPhone.Init();
                $("#NodeDiv").hide();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })

}
//修改一级节点
function updateParentNode() {
    $("#NodeTitle").html("修改");
    $("#NodeName").html("电话组名称：");
    $("#treeMenu").hide();
    $("#NodeDiv").show();
    $("#childNodeInput").val(updateTreeNode.name);
    $("#phoneTr").hide();

    $("#ConfirmBtn").unbind("click"); //解除绑定
    $("#ConfirmBtn").bind("click", updateParentNodeBtn);//绑定事件
}
//确认修改一级节点
function updateParentNodeBtn() {
    var oldName = updateTreeNode.name;
    var newName = $("#childNodeInput").val();
    //updateTreeNode.name = name;
    //var treeObj = $.fn.zTree.getZTreeObj("phoneTree");
    //treeObj.updateNode(updateTreeNode);
    var regionId = $('#regionSelect option:selected').val();  //获取被选中的园区ID
    $.ajax({
        url: "/Config/UpdateGroupByRegionId",
        type: "post",
        data: { regionId: regionId, oldGroupName: oldName, newGroupName: newName },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {
                emergencyPhone.Init();
                $("#NodeDiv").hide();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })

}
//删除一级节点
function deleteParentNode() {
    var name = updateTreeNode.name;
    var regionId = $('#regionSelect option:selected').val();  //获取被选中的园区ID
    $.ajax({
        url: "/Config/DeleteGroupByRegionId",
        type: "post",
        data: { regionId: regionId, groupName: name },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {
                $("#treeMenu").hide();
                emergencyPhone.Init();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })

}
//新增二级节点
function addNode() {
    var cNodes = updateTreeNode.children;
    if (cNodes == null || cNodes.length < 11) {
        $("#NodeTitle").html("新增");
        $("#NodeName").html("联系人：");
        $("#treeMenu").hide();
        $("#NodeDiv").show();
        $("#phoneTr").show();
        $("#childNodeInput").val("");
        $("#phoneInput").val("");
        $("#ConfirmBtn").unbind("click"); //解除绑定
        $("#ConfirmBtn").bind("click", addNodeBtn);//绑定事件
    }
    else {
        alert("目前每个组最多只支持10个电话");
    }
}
//确定新增二级节点
function addNodeBtn() {
    var regionId = $('#regionSelect option:selected').val();  //获取被选中的园区ID
    var groupName = updateTreeNode.name;
    var name = $("#childNodeInput").val();
    var phone = $("#phoneInput").val();
    $.ajax({
        url: "/Config/AddTelePhoneByGroupName",
        type: "post",
        data: { regionId: regionId, groupName: groupName, telePhoneName: name, telePhoneNum: phone },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {
                $("#NodeDiv").hide();
                emergencyPhone.Init();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//修改二级节点
function updateNode() {
    $("#NodeTitle").html("修改");
    $("#NodeName").html("联系人：");
    $("#treeMenu").hide();
    $("#NodeDiv").show();
    $("#phoneTr").show();
    $("#childNodeInput").val(updateTreeNode.name);
    $("#phoneInput").val(updateTreeNode.phone);
    $("#ConfirmBtn").unbind("click"); //解除绑定
    $("#ConfirmBtn").bind("click", updateNodeBtn);//绑定事件

}
//确认修改二级节点
function updateNodeBtn() {
    var regionId = $('#regionSelect option:selected').val();  //获取被选中的园区ID
    var parentNode = updateTreeNode.getParentNode();
    var groupName = parentNode.name;
    var oldTelephoneName = updateTreeNode.name;
    var name = $("#childNodeInput").val();
    var phone = $("#phoneInput").val();
    $.ajax({
        url: "/Config/UpdateTelePhoneByGroupName",
        type: "post",
        data: { regionId: regionId, groupName: groupName, oldTelephoneName: oldTelephoneName, newTelephoneName: name, newTelephoneNum: phone },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {
                $("#NodeDiv").hide();
                emergencyPhone.Init();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//删除二级节点
function deleteNode() {
    var parentNode = updateTreeNode.getParentNode();
    var groupName = parentNode.name;
    var name = updateTreeNode.name;
    var regionId = $('#regionSelect option:selected').val();  //获取被选中的园区ID
    $.ajax({
        url: "/Config/DeleteTelephoneByGroupName",
        type: "post",
        data: { regionId: regionId, groupName: groupName, telePhoneName: name },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {
                $("#treeMenu").hide();
                emergencyPhone.Init();
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })

}
//隐藏节点编辑弹窗
function NodeDivCancelBtn() {
    $("#NodeDiv").hide();
}

//隐藏树编辑弹窗
function cancelTreeMenu() {
    $("#treeMenu").hide();
}