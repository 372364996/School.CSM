
var ADDORUPDATEFLAG;//新增或修改标识  1：新增。2：修改
var purviewId = 0;//记录树节点双击时的id；
$(function () {
    $("#addPurviewDialog").dialog("close");
    loadPurviewTree();
    loadPurviewInfoGrid(1, 30);
    GetPurviewGridData(1, 30);
})
/*--Ztree-------------------------------------------------*/
//加载权限树结构
function loadPurviewTree() {
    $.ajax({
        url: "/PurviewManage/GetPurviewTree",
        type: "post",
        data: {},
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
                return;
            } else {
                $.fn.zTree.init($("#purviewTree"), setting, data.msg);
                var treeObj = $.fn.zTree.getZTreeObj("purviewTree");
                treeObj.expandAll(true);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//Ztree配置
var setting = {
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
            name: "purview_name"
        },
        simpleData: {
            enable: true,
            idKey: "id",
            pIdKey: "pid",
            rootPId: -1
        }
    },
    callback: {
        //beforeRename: updateNodeName,//修改节点名称回掉函数
        onDblClick: purviewDbClick,//双击节点
        onRightClick: OnRightClick
    }
}

//右键菜单
function OnRightClick(event, treeId, treeNode) {
    zTree = $.fn.zTree.getZTreeObj("purviewTree");
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
    x = x - 30;
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
//添加权限
function addPurviewNode() {
    ADDORUPDATEFLAG = 1;
    hideRMenu();
    var zTree = $.fn.zTree.getZTreeObj("purviewTree");
    treeNode = zTree.getSelectedNodes()[0];
    if (treeNode != null) {
        $("#purviewpId").val(treeNode.id);
    } else{
        $("#purviewpId").val(-1);
    }
    $("#addPurviewDialog").dialog("open");
}
//修改权限
function updatePurviewNode() {
    ADDORUPDATEFLAG = 2;
    hideRMenu();
    var zTree = $.fn.zTree.getZTreeObj("purviewTree");
    treeNode = zTree.getSelectedNodes()[0];
    $("#purviewId").val(treeNode.id);
    $("#purviewpId").val(treeNode.pid);
    $("#addPurviewName").val(treeNode.purview_name);
    $("#addPurviewCode").val(treeNode.purview_code);
    $("#addPurviewUrl").val(treeNode.purview_url);
    $("#addPurviewDescribe").val(treeNode.purview_describe);
    $("#addPurviewDialog").dialog("open");
}
//删除权限
function deletePurviewNode() {
    hideRMenu();
    var zTree = $.fn.zTree.getZTreeObj("purviewTree");
    var treenode = zTree.getSelectedNodes()[0];
    var id;
    if (treenode.isParent) {//父节点
        if (!confirm("确定要删除该权限及下级权限")) {
            return;
        }else{
            id=treenode.id;
        }
    } else {//子节点
        if (!confirm("确定要删除该权限")) {
            return;
        }else{
            id=treenode.id;
        }
    }
    $.ajax({
        url: "/PurviewManage/DeletePurviewInfo",
        data: { id:id},
        type: "post",
        datatype: "json",
        async: false,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
                return;
            } else {
                if (data.msg) {
                    alert("删除成功");
                    loadPurviewTree();
                } else {
                    alert("删除失败");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//添加或修改权限
function addOrUpdatePurview() {
    var purviewName = $("#addPurviewName").val();
    if (purviewName == "" || purviewName == null) {
        alert("请输入权限名称");
        return false;
    }
    var purviewCode = $("#addPurviewCode").val();
    if (purviewCode == "" || purviewCode == null) {
        alert("请输入权限编码");
        return false;
    }
    var purviewUrl = $("#addPurviewUrl").val();
    if (purviewUrl == "" || purviewUrl == null) {
        alert("请输入权限对应页面");
        return false;
    }
    var purviewDescribe = $("#addPurviewDescribe").val();
    var pid = $("#purviewpId").val();
    var purviewId = $("#purviewId").val();
    if (ADDORUPDATEFLAG == 1) {//新增
        $.ajax({
            url: "/PurviewManage/AddPurviewInfo",
            type: "post",
            data: { purviewName: purviewName, purviewCode: purviewCode, purviewUrl: purviewUrl, purviewDescribe: purviewDescribe ,pid:pid},
            datatype: "json",
            async: false,
            success: function (data) {
                if (data.status == 1) {
                    alert(data.msg);
                    return;
                } else {
                    if (data.msg) {
                        alert("添加成功");
                        $("#addPurviewDialog").dialog("close");
                        loadPurviewTree();
                    } else {
                        alert("添加失败");
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    } else {
        $.ajax({
            url: "/PurviewManage/UpdatePurviewInfo",
            type: "post",
            data: { purviewId:purviewId,purviewName: purviewName, purviewCode: purviewCode, purviewUrl: purviewUrl, purviewDescribe: purviewDescribe, pid: pid },
            datatype: "json",
            async: false,
            success: function (data) {
                if (data.status == 1) {
                    alert(data.msg);
                    return;
                } else {
                    if (data.msg) {
                        alert("修改成功");
                        $("#addPurviewDialog").dialog("close");
                        loadPurviewTree();
                    } else {
                        alert("修改失败");
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }
}
//双击节点
function purviewDbClick(event, treeId, treeNode) {
    if (treeNode == null) {
        return;
    }
    purviewId = treeNode.id;
    GetPurviewGridData(1, 30);
}
/*--easyui-------------------------------------------------*/
//加载权限列表
function loadPurviewInfoGrid(pageIndex,pageSize) {
    var _data = [];
    $("#purviewGrid").datagrid({
        data: _data,
        fitColumns: true,
        rownumbers: true,
        pagination: true, //分页控件 
        singleSelect: true,//只允许选中一行
        columns: [[
            { field: 'id', title: 'id', width: 100, align: 'center', hidden: true },
            { field: 'purview_name', title: '权限名称', width: 100, align: 'center' },
            { field: 'purview_code', title: '权限编码', width: 100, align: 'center'},
            { field: 'purview_url', title: '权限对应地址', width: 100, align: 'center' },
            { field: 'purview_describe', title: '权限描述', width: 100, align: 'center'}
        ]],
        onLoadSuccess: function (data) {

        },
        onLoadError: function () {
            alert('加载失败');
        }
    })
    $('#purviewGrid').datagrid('getPager').pagination({//分页栏下方文字显示
        showPageList: true,
        pageNumber: pageIndex,
        pageSize: pageSize, //每页显示的记录条数，默认为10
        pageList: [5, 10, 20, 30, 50], //可以设置每页记录条数的列表
        beforePageText: '第', //页数文本框前显示的汉字   
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示{from}-{to}条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{total}条',
        onChangePageSize: function (pageNumber, pageSize) {
            //一页显示几条
            GetPurviewGridData(pageNumber, pageSize);
        },
        onSelectPage: function (pageNumber, pageSize) {
            //下一页
            GetPurviewGridData(pageNumber, pageSize);
        }
    });
}
//获取权限列表数据
function GetPurviewGridData(pageIndex, pageSize) {
    $.ajax({
        url: "/PurviewManage/GetPurviewDataById",
        data: { pageIndex: pageIndex, pageSize: pageSize,id:purviewId },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert(data.msg);
                return;
            } else {
                $('#purviewGrid').datagrid('loadData', data.msg);
                $('#purviewGrid').datagrid('loaded');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}