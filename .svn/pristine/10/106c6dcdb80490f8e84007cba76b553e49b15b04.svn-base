var UPDATEORADDFLAG;
$(function () {
    //加载楼宇树
    loadBuildingTree();
    //隐藏添加弹窗
    //$("#addFloorDiv").dialog('close');
})
//加载楼宇树
function loadBuildingTree() {
    $.ajax({
        url: "/Register/GetBuildingTree",
        type: "post", //这里是http类型
        data: { industryId: IndustryId, regionID: regionID },
        dataType: "json", //传回来的数据类型
        async: true,
        success: function (data) {
            //绑定树形结构的数据源
            $.fn.zTree.init($("#buildingTree"), setting, data);
            var treeObj = $.fn.zTree.getZTreeObj("buildingTree");
            treeObj.expandAll(true);
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
            inner: true

            //    isCopy: false,
            //isMove: true
        },
        //enable: false
    },
    view: {
        dblClickExpand: true,
        addDiyDom: addDiyDom
    },
    data: {
        keep: {
            parent: true,
            leaf: true
        },
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pId",
            rootPId: -1
        }
    },
    callback: {
        onDblClick: clickTreeNode,
        beforeDrag: beforeDrag,
        beforeDrop: beforeDrop,
        onDrop: onDrop
    }
}
//父节点显示添加楼层按钮
function addDiyDom(treeId, treeNode) {
    if (treeNode.pId != -1) {//子节点（楼层）
        var aObjchidl = $("#" + treeNode.tId + "_a");
        if ($("#diyChildBtn_" + treeNode.id).length > 0) return;
        var edit = "&nbsp;&nbsp;&nbsp;"
        edit += '<span class="operation-span">';
        edit += "<img src='../style/base/images/public/xiugai.png' id='diyUBtn_" + treeNode.id + "' title='修改楼层' onfocus='this.blur();' />" + "&nbsp;&nbsp;&nbsp;<img src='../style/base/images/public/cha.png' id='diyDBtn_" + treeNode.id + "' title='删除楼层' onfocus='this.blur();' />";
        edit += '</span>';
        aObjchidl.append(edit);
        var btnU = $("#diyUBtn_" + treeNode.id);
        var btnD = $("#diyDBtn_" + treeNode.id);
        if (btnU) btnU.bind("click", function () { updateFloorDialog(treeNode) });
        if (btnD) btnD.bind("click", function () { deleteFloorInfo(treeNode) });
    } else {//父节点（楼宇）
        var aObj = $("#" + treeNode.tId + "_a");
        if ($("#diyBtn_" + treeNode.id).length > 0) return;

        var editStr = "&nbsp;&nbsp;&nbsp;" + "<img src='../style/base/images/public/jia.png' id='diyBtn_" + treeNode.id + "' title='添加楼层' class='add-img' />";

        aObj.append(editStr);
        var btn = $("#diyBtn_" + treeNode.id);
        if (btn) btn.bind("click", function () { addFloorInfoDialog(treeNode) });
    }
};
//节点点击事件
function clickTreeNode(event, treeId, treeNode) {
    if (!treeNode) {
        return null;
    }
    //xx子系统（文件夹）
    if (treeNode.id == 0) {
        return;
    }
    if (treeNode.pId == -1) {
        return;
    }
    treeNodeDblClick(treeNode);//.floor_src_2d, treeNode.point1, treeNode.point2);
}
var dragId = null;
//拖拽前执行  
function beforeDrag(treeId, treeNodes) {
    for (var i = 0, l = treeNodes.length; i < l; i++) {
        dragId = treeNodes[i].pId;
        if (treeNodes[i].drag === false) {
            return false;
        }
    }
    return true;
}
//拖拽释放之后执行  
function beforeDrop(treeId, treeNodes, targetNode, moveType) {
    //if (targetNode.pId == treeNodes[0].pId) {
    //    var data = { id: treeNodes[0].id, targetId: targetNode.id, moveType: moveType };
    //    var confirmVal = false;
    //    return confirmVal;
    //} else {
    //    alert('亲，只能进行同级排序！');
    //    return false;
    //}
    if (dragId == -1) {
        alert("只能进行楼层排序!");
        return false;
    }
    if (targetNode.pId == dragId) {
        var parentNode = targetNode.getParentNode();
        var children = parentNode.children;
        var json2 = "";
        for (var i = 0; i < children.length; i++) {
            var node = children[i];
            rank = node.rank;
            id = node.id;
            json2 = json2 + '{id:' + id + ',' + 'rank:' + i + '},'
        }
        var data = { id: treeNodes[0].id, targetId: targetNode.id, moveType: moveType };
        return true;
    }
    else {
        alert("只能进行一个楼层排序");
        return false;
    }
}

function onDrop(event, treeId, treeNodes, targetNode, moveType) {
    if (!targetNode) {
        return;
    }
    if (targetNode.pId == dragId) {
        var parentNode = targetNode.getParentNode();
        var children = parentNode.children;
        var idrank = '';
        for (var i = 0; i < children.length; i++) {
            var node = children[i];
            var id = node.id;
            if (i == children.length - 1) {
                idrank = idrank + id;
            }
            else {
                idrank = idrank + id + ",";
            }


        }
        var building_id = targetNode.building_id;
        $.ajax({
            url: "/Register/UpdateRank",
            data: { building_id: building_id, idrank: idrank },
            type: "post",
            dataType: "json",
            async: false,
            success: function (data) {
                if (data) {
                    //alert("更新楼层顺序成功!");
                    return;
                }
                else {
                    alert("更新楼层顺序失败!");
                }
            },
            error: function (data) {
                alert("更新楼层顺序失败，请检查数据连接!");
            }
        })
    }
};
//添加楼弹出
function addFloorInfoDialog(treeNode) {
    UPDATEORADDFLAG = "ADD";
    $("#title").text("添加");
    //判断地图类别 1:超图，2：leaflet
    //清空弹窗中的数据
    $("#buildingID").val("");
    $("#buildingName").val("");
    $("#floorName").val("");
    $("#leftBottom").val("");
    $("#rightTop").val("");
    $("#floorUrl").val("");
    $("#floorImage").val("");
    $("#floorNum").val("");
    if (NowMapType == 1) {
        var bl = getAllFloorUrl(treeNode);//获取楼的所有层服务地址
        if (!bl) {
            return;
        }
        $("#superMapDiv").show();
        $("#leafletDiv").hide();
    } else {
        $("#leafletDiv").show();
        $("#superMapDiv").hide();
    }
    $("#buildingID").val(treeNode.building_id);
    $("#buildingName").val(treeNode.name);
    $("#floorID").val(0);//楼层id
    $("#addFloorDiv").dialog('open');
}
//添加楼内图
function addFloorInfoCommit() {
    var buildingID = $("#buildingID").val();
    var buildingName = $("#buildingName").val();
    var floorID = $("#floorID").val();//楼层id
    //楼层名称
    var floorName = $("#floorName").val();
    if (floorName == "") {
        alert("请输入楼层名称");
        return;
    }
    //　由于赤道半径为6378137米，则赤道周长为2*PI*r = 20037508.3427892，因此X轴的取值范围：[-20037508.3427892,20037508.3427892]。当纬度φ接近两极，即90°时，Y值趋向于无穷。因此通常把Y轴的取值范围也限定在[-20037508.3427892,20037508.3427892]之间。因此在墨卡托投影坐标系（米）下的坐标范围是：最小为(-20037508.3427892, -20037508.3427892 )到最大 坐标为(20037508.3427892, 20037508.3427892)。
    //左下角坐标
    var leftBottom = $("#leftBottom").val();
    if (leftBottom == "") {
        alert("请输入左下角坐标");
        return;
    }
    if (leftBottom) {
        if (leftBottom.indexOf(',') == -1) {
            alert("请输入正确墨卡托坐标，注意“，”为英文的逗号！");
            return;
        }
        var x = leftBottom.split(',')[0];
        var y = leftBottom.split(',')[1];
        if (isNaN(x) || isNaN(y)) {
            alert("请输入正确墨卡托坐标，格式为x,y！");
            return;
        }
        //var result = isMercator(x, y);
        //if (result == false) {
        //    alert("请输入正确墨卡托坐标！");
        //    return;
        //}
    }
    //右上角坐标
    var rightTop = $("#rightTop").val();
    if (rightTop == "") {
        alert("请输入右上角坐标");
        return;
    }
    if (rightTop) {
        if (rightTop.indexOf(',') == -1) {
            alert("请输入正确墨卡托坐标，注意“，”为英文的逗号！");
            return;
        }
        var x = rightTop.split(',')[0];
        var y = rightTop.split(',')[1];
        if (isNaN(x) || isNaN(y)) {
            alert("请输入正确墨卡托坐标，格式为x,y！");
            return;
        }
        //var result = isMercator(x, y);
        //if (result == false) {
        //    alert("请输入正确墨卡托坐标！");
        //    return;
        //}
    }
    //楼内图路径
    var floorUrl = "";
    if (UPDATEORADDFLAG == "UPDATE") {//更新
        if (NowMapType == 1) {//超图
            if (($("#floorUrl").val()).indexOf("/") > 0) {
                var arr_floorurl = $("#floorUrl").val().split("/");
                floorUrl = arr_floorurl[arr_floorurl.length - 1];
            }
            else {
                alert("路径中没有监测到/字符，请输入正确的路径！");
                return;
            }
        }
        else {//leaflet
            var floorimage = $("#floorImage").val();
            if (floorimage != "" && floorimage != null) {//如果更新的时候选择了新的图片
                floorUrl = floorimage;
            }
            else {
                floorUrl = $("#oldFloorImage").val();//没有选择，说明没有更新图片，就存入旧的
            }

        }
        //var floorimage = $("#floorImage").val();
        //if (floorimage != "" && floorimage != null) {
        //    floorUrl = $("#floorImage").val();
        //} else {
        //    floorUrl = $("#floorUrl").val();
        //}
    } else {//添加
        if (NowMapType == 1) {//超图
            if (($("#floorUrl").val()).indexOf("/")>0) {

                var arr_floorurl = $("#floorUrl").val().split("/");
                floorUrl = arr_floorurl[arr_floorurl.length - 1];
            }
            else {
                alert("路径中没有监测到/字符，请输入正确的路径！");
                return;
            }
        }
        else {//leaflet
            floorUrl = $("#floorImage").val();
        }
    }
    if (floorUrl == "") {
        if (NowMapType == 1) {
            alert("请输入路径");
            return;
        } else {
            alert("请选择图片");
            return;
        }
    }

    //楼层数
    var floorNum = $("#floorNum").val();
    if (verifyFloorNum(floorNum, buildingID, floorID)) {
        return;
    }
    if (floorNum == "") {
        alert("请输入楼层数");
        return;
    }
    var reg = /^-?[0-9]+$/;
    if (!reg.test(floorNum)) {
        alert("楼层数请输入数字");
        return;
    }

    if (UPDATEORADDFLAG == "ADD") {
        if (confirm("确定要添加楼层信息吗？")) {
            $.ajaxFileUpload({
                url: "/Register/AddFloorInfo",
                sucureurl: false,
                async: false,
                data: { floorName: floorName, leftBottom: leftBottom, rightTop: rightTop, floorUrl: floorUrl, floorNum: floorNum, buildingID: buildingID, buildingName: buildingName, nowMapType: NowMapType },
                success: function (data) {
                    if (data.indexOf("添加成功") > 0) {// == "\"添加成功\"") {
                        $("#addFloorDiv").dialog('close');;//隐藏弹窗
                        loadBuildingTree();//刷新树
                        alert("添加成功！");
                    }
                },
                error: function (data) {
                    alert(data.responseText);
                }
            })
        }
        else {
            return;
        }
    } else {
        if (confirm("确定要修改楼层信息吗？")) {
        $.ajaxFileUpload({
            url: "/Register/UpdateFloorInfo",
            sucureurl: false,
            async: false,
            data: { floorID: floorID, floorName: floorName, leftBottom: leftBottom, rightTop: rightTop, floorUrl: floorUrl, floorNum: floorNum, buildingID: buildingID, buildingName: buildingName, nowMapType: NowMapType },
            success: function (data) {
                if (data.indexOf("修改成功") > 0) {
                    alert("修改成功");
                    $("#addFloorDiv").dialog('close');//隐藏弹窗
                    loadBuildingTree();//刷新树
                } else {
                    alert("修改失败！")
                }
            },
            error: function (data) {
                alert(data.responseText);
            }
        })
        }
        else {
            return;
        }
    }
}
//验证该楼层是否已经注册
function verifyFloorNum(floorNum, buildingID, floorID) {
    var result = false;
    $.ajax({
        url: "/Register/VerifyFloorNum",
        data: { floorNum: floorNum, buildingID: buildingID, floorID: floorID },
        type: "post",
        dataType: "json",
        async: false,
        success: function (data) {
            if (data) {
                result = true;
                alert("该层已经注册，请输入其它层");
                $("#floorNum").focus();
            }
        },
        error: function (data) {
            alert(data.responseText);
        }
    })
    return result;
}
//子节点（楼层）修改弹窗
function updateFloorDialog(data) {
    UPDATEORADDFLAG = "UPDATE";
    $("#title").text("修改");
    //清空弹窗中的数据
    $("#buildingID").val("");
    $("#buildingName").val("");
    $("#floorName").val("");
    $("#leftBottom").val("");
    $("#rightTop").val("");
    $("#floorUrl").val("");
    $("#floorImage").val("");
    $("#floorNum").val("");
    $("#oldFloorImage").val("");//旧的楼内图，隐藏域
    
    //隐藏上传图片和修改路径弹窗
    if (NowMapType == 1) {//超图
        $("#leafletDiv").hide();
        $("#superMapDiv").show();
        var bl = getUpdataUrl(data);//给下拉框赋值
        if (!bl) { return; }
        //$("#floorUrl").val(data.floor_src_2d);
    } else {//leaflet
        $("#leafletDiv").show();
        $("#superMapDiv").hide();
        $("#oldFloorImage").val(data.floor_src_2d);
    }
    //$("#superMapDiv").show();
    //给弹窗赋值
    var baseBuilding = data.getParentNode().name;
    $("#buildingName").val(baseBuilding);
    $("#floorName").val(data.name);
    $("#floorID").val(data.id);
    $("#leftBottom").val(data.point1);
    $("#rightTop").val(data.point2);
    $("#floorNum").val(data.rank);
    $("#buildingID").val(data.building_id);
    $("#addFloorDiv").dialog('open');
    $("#addFloorDiv").show();
}
//删除楼层
function deleteFloorInfo(data) {
    var floorID = data.id;
    if (!confirm("确定删除吗")) {
        return;
    }
    $.ajax({
        url: "/Register/DeleteFloorInfo",
        data: { floorID: floorID },
        type: "post",
        datatype: "json",
        async: false,
        success: function (data) {
            if (data) {
                alert("删除成功");
                loadBuildingTree();//刷新树
            }
        },
        error: function (data) {
            alert(data.responseText);
        }
    })
}