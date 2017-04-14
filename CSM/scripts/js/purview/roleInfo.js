
var ADDORUPDATEFLAG;//新增或修改标识  1：新增。2：修改
var pageIndex = 1;//起始页码
var pageSize = 30; //默认初始化每页行数
$(function () {
    $('#addRoleInfoDialog').dialog('close');
    $('#allocationPurviewDialog').dialog('close');
    $('#allocationPersonDialog').dialog('close');
    loadRoleInfoGrid();
    GetRoleGridData();
})
//加载权限列表
function loadRoleInfoGrid() {
    var _data = [];
    $("#roleInfoGrid").datagrid({
        data: _data,
        fitColumns: true,
        rownumbers: true,
        pagination: true, //分页控件 
        singleSelect: true,//只允许选中一行
        toolbar: [{
            iconCls: 'icon-add ',
            text: "新增",
            handler: function () {
                $('#addRoleInfoDialog').dialog('open');
                ADDORUPDATEFLAG=1;
            }
        }],
        columns: [[
            { field: 'id', title: 'id', width: 100, align: 'center', hidden: true },
            { field: 'role_name', title: '角色名称', width: 100, align: 'center' },
            { field: 'role_code', title: '角色编码', width: 100, align: 'center' },
            { field: 'role_describe', title: '角色描述', width: 100, align: 'center' },
            {
                field: 'ids', title: '操作', width: 100, align: 'center',
                formatter: function (value, row, index) {
                    return '<button class="btn btn-primary btn-xs" onclick=\'updateRoleInfo(' + row.id + ',"' + row.role_name + '","' + row.role_code + '","' + row.role_describe + '")\'>编&ensp;&ensp;辑</button> <button class="btn btn-warning btn-xs" style="margin-right:5px;" onclick=\'deleteRoleInfo(' + row.id + ')\'>删&ensp;&ensp;除</button><button class="btn btn-primary btn-xs" onclick=\'allocationPurview(' + row.id + ')\'>分配权限</button>'
                }
            }
        ]],
        onLoadSuccess: function (data) {

        },
        onLoadError: function () {
            alert('加载失败');
        }
    })
    $('#roleInfoGrid').datagrid('getPager').pagination({//分页栏下方文字显示
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
            GetRoleGridData();
        },
        onSelectPage: function (pageindex, pagesize) {
            //下一页
            pageIndex = pageindex;
            pageSize = pagesize;
            GetRoleGridData();
        },
        onRefresh: function (pageindex, pagesize) {
            //pageIndex = pageNumber;
            // 刷新按钮
            pageIndex = pageindex;
            pageSize = pagesize;
            GetRoleGridData();
        }
    });
}
//获取角色列表数据
function GetRoleGridData() {
    var roleName = $("#roleName").val();
    $.ajax({
        url: "/PurviewManage/GetRoleInfoPage",
        data: { pageIndex: pageIndex, pageSize: pageSize, roleName: roleName },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("获取角色列表错误"+data.msg);
                return;
            } else {
                $('#roleInfoGrid').datagrid('loadData', data.msg);
                $('#roleInfoGrid').datagrid('loaded');
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取角色列表错误出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//修改角色弹窗
function updateRoleInfo(id, roleName, roleCode, roleDescribe) {
    ADDORUPDATEFLAG = 2;
    $("#roleId").val(id);
    $("#addRoleName").val(roleName);
    $("#addRoleCode").val(roleCode);
    $("#addRoleDescribe").val(roleDescribe);
    $("#addRoleInfoDialog").dialog("open");
}
//添加或修改角色弹窗
function addOrUpdateRole() {
    var roleName = $("#addRoleName").val();
    var roleCode = $("#addRoleCode").val();
    var roleDescribe = $("#addRoleDescribe").val();
    var roleId = $("#roleId").val();
    if (ADDORUPDATEFLAG == 1) {//新增
        $.ajax({
            url: "/PurviewManage/AddRoleInfo",
            type: "post",
            data: { roleName: roleName, roleCode: roleCode, roleDescribe: roleDescribe },
            datatype: "json",
            async: false,
            success: function (data) {
                if (data.status == 1) {
                    alert("添加角色错误:"+data.msg);
                    return;
                } else {
                    if (data.msg) {
                        alert("添加成功");
                        $("#addRoleInfoDialog").dialog("close");
                        GetRoleGridData();
                    } else {
                        alert("添加失败");
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("添加角色出现"+XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    } else {
        $.ajax({
            url: "/PurviewManage/UpdateRoleInfo",
            type: "post",
            data: { id: roleId, roleName: roleName, roleCode: roleCode, roleDescribe: roleDescribe },
            datatype: "json",
            async: false,
            success: function (data) {
                if (data.status == 1) {
                    alert("修改角色错误:"+data.msg);
                    return;
                } else {
                    if (data.msg) {
                        alert("修改成功");
                        $("#addRoleInfoDialog").dialog("close");
                        GetRoleGridData();
                    } else {
                        alert("修改失败");
                    }
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("修改角色出现"+XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }
}
//删除角色
function deleteRoleInfo(id) {
    if (!confirm("删除角色会删除角色人员的绑定，确定要删除吗")) {
        return;
    }
    $.ajax({
        url: "/PurviewManage/DeleteRoleInfoById",
        type: "post",
        data: { id: id },
        datatype: "json",
        async: false,
        success: function (data) {
            if (data.status == 1) {
                alert("删除角色错误:"+data.msg);
                return;
            } else {
                if (data.msg) {
                    alert("删除成功");
                    GetRoleGridData();
                } else {
                    alert("删除失败");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("修改角色出现"+XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//给角色分配权限弹窗
function allocationPurview(id) {
    $('#allocationPurviewDialog').dialog('open');
    $("#purviewRoleId").val(id);//隐藏域赋值
    $.ajax({
        url: "/PurviewManage/GetPurviewInfoByRoleId",
        type: "post",
        data: { id: id },
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("根据角色id获取权限错误:"+data.msg);
                return;
            } else {
                $.fn.zTree.init($("#purviewTree"), setting, data.msg);
                var treeObj = $.fn.zTree.getZTreeObj("purviewTree");
                treeObj.expandAll(true);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("根据角色id获取权限出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//Ztree配置
var setting = {
    check: {
        enable: true,
        autoCheckTrigger: false,
        chkStyle: "checkbox",
        chkboxType: { "Y": "ps", "N": "ps" }
    },
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
            idKey: "sid",
            pIdKey: "pid",
            rootPId: -1
        }
    },
    callback: {
        //beforeRename: updateNodeName,//修改节点名称回掉函数
        //onDblClick: purviewDbClick,//双击节点
        //onRightClick: OnRightClick
        onCheck: ztreePurviewCheck//勾选回掉函数
    }
}
//勾选权限回掉函数
var regionId;
function ztreePurviewCheck(event, treeId, treeNode) {
    var ids = [];
    //判断当前选中的节点是否是父节点
    var ispart = treeNode.isParent;
    if (ispart == true) {
        //是父节点
        if (treeNode.level == 0) {
            //选择的是根节点
            regionId = treeNode.id;
            //获取根节点下所有的子节点
            getChildren(ids,treeNode);
        } else {
            //选择的是模块节点
            getChildren(ids,treeNode);//获取子节点
            //获取父节点
            getPartNode(ids,treeNode);
        }
    } else {
        //子节点
        ids.push(treeNode.purview_code);
        getPartNode(ids,treeNode); //获取父节点
    }
    bindRolePurview(ids,treeNode.checked)
}
//获取节点下的所有子节点ids是一个数组 返回结果数组     treeNode是选中的节点
function getChildren(ids,treeNode) {
    if (treeNode.getParentNode() != null) {
        ids.push(treeNode.purview_code);
    }
    if (treeNode.isParent) {
        for (var obj in treeNode.children) {
            getChildren(ids,treeNode.children[obj]);
        }
    }
}
//获取节点的父节点(一直获取到最高根节点)
function getPartNode(ids,treeNode) {
    if (treeNode.getParentNode() != null) {
        if (treeNode.getParentNode().level != 0) {
            ids.push(treeNode.getParentNode().purview_code);
        }
        getPartNode(ids,treeNode.getParentNode())
    } else {
        regionId = treeNode.id;
    }
}
//给角色绑定权限
function bindRolePurview(purviewCode, checkFlag) {
   
    var roleId = $("#purviewRoleId").val();
    var codeStr = "";
    for (var i = 0; i < purviewCode.length; i++) {
        if (i == purviewCode.length - 1) {
            codeStr += purviewCode[i];
        } else {
            codeStr += purviewCode[i] + ",";
        }
    }
    $.ajax({
        url: "/PurviewManage/RolePurviewBindByCheck",
        type: "post",
        data: { roleId: roleId, regionId: regionId, purviewCode: codeStr, checkFlag: checkFlag },
        datatype: "json",
        async: true,
        success: function (data) {
            if (data.status == 1) {
                alert("给角色分配权限错误:" + data.msg);
                return;
            } else {
                if (data.msg) {
                    //alert("分配权限完成");
                } else {
                    alert("分配权限失败");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("给角色分配权限出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}

function bindRolePurviewBtn() {
    var zTree = $.fn.zTree.getZTreeObj("purviewTree");
    var checkCount = zTree.getCheckedNodes(true);
    var regionId;
    var codes = [];
    var roleId = $("#purviewRoleId").val();
    for (var i = 0; i < checkCount.length; i++) {
        if (checkCount.level == 0) {
            regionId = checkCount[i].id;
        } else {
            codes.push(checkCount[i].purview_code);
        }
    }
    $.ajax({
        url: "/PurviewManage/RolePurviewBindByCheckBtn",
        type: "post",
        data: { roleId: roleId, regionId: regionId, purviewCode: codes },
        datatype: "json",
        async: false,
        success: function (data) {
            if (data.status == 1) {
                alert("给角色分配权限错误:" + data.msg);
                return;
            } else {
                if (data.msg) {
                    alert("分配权限完成");
                } else {
                    alert("分配权限失败");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("给角色分配权限出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
