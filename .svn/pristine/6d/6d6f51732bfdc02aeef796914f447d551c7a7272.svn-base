$(function () {
    getOrganzationTree();
    initGoJS();
})
//加载组织架构树
function getOrganzationTree() {
    $.ajax({
        url: "/PersonInfo/GetOrganzationTree",
        data: {},
        type: "post",
        dataType: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
                return;
            } else {
                $.fn.zTree.init($("#orgTree"), settingnotEdit, data.msg);
                var treeObj = $.fn.zTree.getZTreeObj("orgTree");
                treeObj.expandAll(true);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//Ztree配置
var settingnotEdit = {
    edit: {
        enable: false,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    view: {
        selectedMulti: false,
        dblClickExpand: false
    },
    data: {
        keep: {
            parent: true,
            leaf: true
        },
        key: {
            name: "org_name"
        },
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: -1
        }
    },
    callback: {
        beforeRename: updateNodeName,//修改节点名称回掉函数
        onDblClick: OrgDbClick,//双击节点
        onRightClick: OnRightClick
    }
}
//右键菜单
function OnRightClick(event, treeId, treeNode) {
    zTree = $.fn.zTree.getZTreeObj("orgTree");
    if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
        zTree.cancelSelectedNode();
        showRMenu("root", event.clientX, event.clientY);
    } else if (treeNode && !treeNode.noR) {
        zTree.selectNode(treeNode);
        showRMenu("node", event.clientX, event.clientY);
    }
}
//显示右键菜单
function showRMenu(type, x, y) {
    $("#rMenu ul").show();
    if (type == "root") {
        $("#m_del").hide();
        $("#m_check").hide();
        $("#m_unCheck").hide();
    } else {
        $("#m_del").show();
        $("#m_check").show();
        $("#m_unCheck").show();
    }
    rMenu = $("#rMenu");
    x = x - 140;
    y = y - 60;
    rMenu.css({ "top": y + "px", "left": x + "px", "visibility": "visible" });

    $("body").bind("mousedown", onBodyMouseDown);
}
//单机鼠标其他地方隐藏右键弹窗
function onBodyMouseDown(event) {
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
        rMenu.css({ "visibility": "hidden" });
    }
}
//隐藏右键弹窗
function hideRMenu() {
    if (rMenu) rMenu.css({ "visibility": "hidden" });
    $("body").unbind("mousedown", onBodyMouseDown);
}
//添加组织架构根节点
function addOrgNode() {
    hideRMenu();
    var zTree = $.fn.zTree.getZTreeObj("orgTree");
    treeNode = zTree.getSelectedNodes()[0];
    var newNode;
    if (treeNode != null) {
        treeNode.isParent = true;
        var newNodes = { org_name: "newNode1", id: 0, pid: treeNode.id, org_code: "", org_content: "", pcode: treeNode.pcode, org_type: 1, region_id: 1, ext1: "", ext2: "", ext3: "", isParent: false };
        newNode = zTree.addNodes(treeNode, newNodes);
    } else {
        var newNodes = { org_name: "newNode1", id: 0, pid: -1, org_code: "", org_content: "", pcode: "root", org_type: 1, region_id: 1, ext1: "", ext2: "", ext3: "", isParent: false };
        newNode = zTree.addNodes(null, newNodes);
    }
    zTree.editName(newNode[0]);
}
//修改节点名称确定后回掉函数
function updateNodeName(treeId, treeNode, newName) {
    if (newName == "") {
        alert("请输入名称");
        return false;
    }
    $.ajax({
        url: "/PersonInfo/UpdateOrgName",
        type: "post",
        data: { id: treeNode.id, name: newName, pid: treeNode.pid, pcode: treeNode.pcode },
        dataType: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
                return false;
            } else {
                if (data.msg) {
                    getOrganzationTree();
                    getOrganizationGoJsData(-1);
                } else {
                    alert("执行失败");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}

//修改组织架构根节点
function updateOrgRootNode() {
    hideRMenu();
    var zTree = $.fn.zTree.getZTreeObj("orgTree");
    treeNode = zTree.getSelectedNodes()[0];
    zTree.editName(treeNode);
}
//删除组织架构根节点
function deleteOrgRootNode() {
    hideRMenu();
    var zTree = $.fn.zTree.getZTreeObj("orgTree");
    treeNode = zTree.getSelectedNodes()[0];
    if (confirm("确定要删除吗")) {
        $.ajax({
            url: "/PersonInfo/DeleteOrgById",
            type: "post",
            data: { id: treeNode.id },
            dataType: "json",
            async: true,
            success: function (data) {
                if (data.status == 1) {
                    alert(data.msg);
                    return false;
                } else {
                    if (data.msg) {
                        getOrganzationTree();
                        getOrganizationGoJsData(-1);
                    } else {
                        alert("执行失败");
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    }
}
//双击Ztree节点
function OrgDbClick(event, treeId, treeNode) {
    if (treeNode.isParent) {
        getOrganizationGoJsData(treeNode.id);
    }
}
var myDiagram;//gojs加载
function initGoJS() {
    //gojs画笔
    var goJS = go.GraphObject.make;
    //构建画布
    myDiagram = goJS(go.Diagram, "OrgDiagramDiv", {
        contentAlignment: go.Spot.Center,//内容的对齐方式
        validCycle: go.Diagram.CycleDestinationTree,//确保用户只能创建树
        maxSelectionCount: 1,//用户可以选择一次只有一个部分
        layout: goJS(go.TreeLayout, {//画布里的元素布局方式
            //获取或设置结果树的样式。 必须是TreeLayout.StyleLayered，TreeLayout.StyleAlternating， TreeLayout.StyleLastParents或TreeLayout.StyleRootOnly。
            treeStyle: go.TreeLayout.StyleLastParents,
            //获取或设置如何安排树应该布局单独的树。 必须是TreeLayout.ArrangementVertical，TreeLayout.ArrangementHorizo​​ntal或TreeLayout.ArrangementFixedRoots。 默认值为TreeLayout.ArrangementVertical
            arrangement: go.TreeLayout.ArrangementHorizontal,
            // 获取或设置树生长的默认方向。默认值为0; 该值必须为以下值之一：0，90，180，270。这些值以度为单位，其中0沿着正X轴，其中90沿着正Y轴
            angle: 90,
            //层之间的距离-父节点与其子节点之间的距离。
            layerSpacing: 35,
            //获取或设置树生长的替代方向。默认值为0; 该值必须为以下值之一：0，90，180，270。这些值以度为单位，其中0沿着正X轴，其中90沿着正Y轴
            alternateAngle: 0,
            //获取或设置父节点与其子节点之间的替代距离。默认值为50。这是父节点与其第一行子节点之间的距离，以防它的子节点有多行。所述rowSpacing属性确定子节点行之间的距离。负值可能导致子节点与父节点重叠
            alternateLayerSpacing: 35,
            //获取或设置父项相对于其子项的替代对齐方式。 必须是其名称以“Alignment”开头的TreeLayout的静态常量。默认值为TreeLayout.AlignmentCenterChildren。
            alternateAlignment: go.TreeLayout.AlignmentStart,
            //获取或设置第一个子节点的替代缩进。默认值为零。该值应为非负数。当对齐方式 为AlignmentStart或AlignmentEnd时，此属性才有意义。如果由于某种原因想要在子行的开头保留空间，则使用正值非常有用。例如，如果您想假装父节点是无限深，您可以将其设置为父节点的宽度
            alternateNodeIndent: 10,
            //获取或设置此节点宽度的分数被添加到nodeIndent 以确定子节点开始处的任何间距。默认值为0.0 - 唯一的缩进由nodeIndent指定。当值为1.0时，子节点将缩进超过父节点的宽度。当对齐方式 为AlignmentStart或AlignmentEnd时，此属性才有意义
            alternateNodeIndentPastParent: 1.0,
            //获取或设置子节点之间的替代距离。 默认值为20。负值导致兄弟节点重叠
            alternateNodeSpacing: 10,
            //获取或设置节点深度的替代分数，其中子层的开始与父层的交叠。默认值为0.0 - 仅当layerSpacing为负时，图层之间才有重叠。值为1.0和零layerSpacing将导致子节点与父节点完全重叠。大于零的值可能仍然导致层之间的重叠，除非layerSpacing的值足够大。如果layerSpacing为负，则值为零可能仍允许图层之间重叠
            alternateLayerSpacingParentOverlap: 1.0,
            //获取或设置此节点的端口获取作为其FromSpot的备用点。默认值为Spot.Default。Spot.Default 的值将使TreeLayout根据父节点的TreeVertex.angle分配一个FromSpot。如果值不是NoSpot，它只是被分配。当path是PathSource时，将设置端口的ToSpot而不是FromSpot
            alternatePortSpot: new go.Spot(0.01, 1, 10, 0),
            //获取或设置子节点的端口获取作为其ToSpot的备用点默认值为Spot.Default。Spot.Default 的值将使TreeLayout根据父节点的TreeVertex.angle分配ToSpot。如果值不是NoSpot，它只是被分配。当path是PathSource时，将设置端口的FromSpot而不是ToSpot
            alternateChildPortSpot: go.Spot.Left
        }),
        "undoManager.isEnabled": true
    });
    function textStyle() {
        return { font: "20pt sans-serif", stroke: "white" };
    }
    // 定义节点模板
    myDiagram.nodeTemplate =
      goJS(go.Node, "Auto",
        // 进行排序,有节点。文本是data.name
        new go.Binding("text", "name"),
        // 绑定的一部分。layerName控制节点的层
        new go.Binding("layerName", "isSelected", function (sel) { return sel ? "Foreground" : ""; }).ofObject(),
        // 定义节点的外部形状
        goJS(go.Shape, "RoundedRectangle",
          {
              name: "SHAPE",
              //fill: graygrad, stroke: "black",
              portId: "", fromLinkable: true, toLinkable: true, cursor: "pointer"
          }),
        // 定义文本的面板显示
        goJS(go.Panel, "Table",
          {
              maxSize: new go.Size(150, 999),
              margin: new go.Margin(3, 3, 0, 3),
              defaultAlignment: go.Spot.Left
          },
          goJS(go.RowColumnDefinition, { column: 2, width: 4 }),
          goJS(go.TextBlock,  // the name
            {
                row: 0, column: 0, columnSpan: 5,
                font: "bold 15pt sans-serif",
                editable: true, isMultiline: false,
                stroke: "white", minSize: new go.Size(10, 14)
            },
            new go.Binding("text", "name").makeTwoWay()),
          goJS("TreeExpanderButton",
            { row: 4, columnSpan: 99, alignment: go.Spot.Center })
        )  // end Table Panel
      );  // end Node    // 定义模板的联系
    myDiagram.linkTemplate =
      goJS(go.Link, go.Link.Orthogonal,
        { corner: 5, relinkableFrom: true, relinkableTo: true },
        goJS(go.Shape, { strokeWidth: 2 }));  // the link shape

    getOrganizationGoJsData(-1);
}
//加载gojs数据
function getOrganizationGoJsData(pid) {
    $.ajax({
        url: "/PersonInfo/GetOrganizationGoJsData",
        data: { pid: pid },
        type: "post",
        dataType: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
                return;
            } else {
                var gojsData = {
                    "class": "go.GraphLinksModel",
                    "nodeDataArray": data.msg.nodeList,
                    "linkDataArray": data.msg.linkList
                }
                myDiagram.model = go.Model.fromJson(gojsData);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}