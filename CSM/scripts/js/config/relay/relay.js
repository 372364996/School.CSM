var relay = {};
var pageSize = 20; //默认初始化每页行数
var pageIndex = 1;  //默认起始页面
var _data = [];
var addRegionId;//添加时园区ID
var updateRegionId;//修改时园区ID
var updateId;//修改时报警灯ID

$(function () {
    $("#relayConfigDiv").dialog('close');
    relay.loadList(pageIndex, pageSize);
    relay.queryList(pageIndex, pageSize);
})

//查询园区列表
relay.queryList = function (pageIndex, pageSize) {
    $.ajax({
        url: "/Config/GetRegionPages",
        type: "post",
        data: { pageIndex: pageIndex, pageSize: pageSize },
        datatype: 'json',
        async: true,
        beforeSend: function (XMLHttpRequest) {
            $('#relayListTable').datagrid('loading', "正在加载...");
        },
        success: function (data) {
            if (data.status != 0) {
                alert("园区列表加载出现" + data.msg + "错误请联系管理员！");
            }
            else
                if (data != null && data.msg.rows.length > 0) {
                    _data = data.msg;
                    $('#relayListTable').datagrid('loadData', _data);
                    $('#relayListTable').datagrid('getPager').pagination('refresh',
                        {
                            total: _data.total,
                            pageNumber: pageIndex,
                            pageSize: pageSize
                        })
                    $('#relayListTable').datagrid('loaded');
                }
                else {
                    _data = [];
                    relay.loadList(pageIndex, pageSize);
                }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
            $('#relayListTable').datagrid('loaded');

        }
    });
}
//视频巡更列表加载数据
relay.loadList = function (pageIndex, pageSize) {
    /*------------------*/
    $('#relayListTable').datagrid({
        data: _data,
        fitColumns: true,
        singleSelect: true,
        method: 'get',
        loadMsg: '正在加载……',
        remoteSort: false,
        pageNumber: pageIndex, //重点:传入当前页数
        pagination: true, //分页控件 
        //rownumbers: false, //行号 
        checkOnSelect: false,
        selectOnCheck: false,
        columns: [[
            //{ field: 'ck', checkbox: true },
            { field: 'id', title: '编号', width: 50, align: "center", sortable: true },
              { field: 'region_name', title: '园区名称', width: 70, align: "center", sortable: false },
            { field: 'region_code', title: '园区编码', width: 70, align: "center", sortable: false },
            {
                field: 'Sd', title: '报警灯编辑', width: 70, align: "center", sortable: false,
                formatter: function (value, rec) {
                    // return '<button type="button" class="btn btn-success btn-xs"  onclick=\'cameraSchedule.forbidUse(' + JSON.stringify(rec) + ')\'>禁用</button>';
                    return '<button class="btn btn-xs btn-primary" type="button" onclick=\'relay.addRelay(' + JSON.stringify(rec) + ')\'>新&ensp;&ensp;增</button>' + '|' + '<button class="btn btn-xs btn-danger" type="button" onclick=\'relay.deleteRelayByRegionId(' + JSON.stringify(rec) + ')\' >删&ensp;&ensp;除</button>';
                }
            },
            {
                field: 'Id', title: '操作', width: 70, align: "center", sortable: false,
                formatter: function (value, rec) {
                    return '<button class="btn btn-xs btn-success" type="button" onclick=\'relay.sendAllRelayClose(' + JSON.stringify(rec) + ')\' >全&ensp;&ensp;关</button>' + '|' + '<button class="btn btn-xs btn-danger" type="button" onclick=\'relay.sendAllRelayOpen(' + JSON.stringify(rec) + ')\' >全&ensp;&ensp;开</button>';
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
                url: "/Config/GetAlarmLampByRegionId",
                data: { regionId: row.id },
                type: "post",
                datatype: "json",
                async: false,
                success: function (data) {
                    if (data.status != 0) {
                        alert("报警灯列表加载出现" + data.msg + "错误请联系管理员！");
                    }
                    else
                        if (data != null && data.msg.length > 0) {
                            data2 = data.msg;
                        }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(XMLHttpRequest.status + "错误请联系管理员！");
                    //$('#eventTable').datagrid('loaded');

                }
            })
            $("#ddv-" + index).datagrid({
                data: data2,
                singleSelect: true,
                fitColumns: true,
                onDblClickRow: function (rowIndex, rowData) {

                },
                columns: [[
            { field: 'id', title: '编号', width: 50, align: "center", sortable: false },
            { field: 'relay_content', title: '颜色', width: 50, align: "center", sortable: false },
            { field: 'control_id', title: '控制器编号', width: 50, align: "center", sortable: false },
            {
                field: 'Id', title: '编辑', width: 50, align: "center", sortable: false,
                formatter: function (value, rec) {
                    return '<button class="btn btn-xs btn-warning" type="button" onclick=\'relay.updateRelay(' + JSON.stringify(rec) + ')\' >修&ensp;&ensp;改</button>' + '|' + '<button class="btn btn-xs btn-danger" type="button" onclick=\'relay.deleteRelayById(' + JSON.stringify(rec) + ')\' >删&ensp;&ensp;除</button>';
                }
            },
             {
                 field: 'Sd', title: '操作', width: 50, align: "center", sortable: false,
                 formatter: function (value, rec) {
                     return '<button  class="btn btn-xs btn-success"  onclick=\'relay.sendRelayClose(' + JSON.stringify(rec) + ')\'>关&ensp;&ensp;闭</button> ' + '|' + ' <button   class="btn btn-danger btn-xs"  onclick=\'relay.sendRelayOpen(' + JSON.stringify(rec) + ')\'>打&ensp;&ensp;开</button>';
                 }
             }
                ]],
                onResize: function () {
                    $('#relayListTable').datagrid('fixDetailRowHeight', index);
                }
            });
            $('#relayListTable').datagrid('fixDetailRowHeight', index);
        }

    });
    $('#relayListTable').datagrid('getPager').pagination({//分页栏下方文字显示
        showPageList: true,
        pageSize: pageSize, //每页显示的记录条数，默认为10
        pageNumber: pageIndex, //重点:传入当前页数
        beforePageText: '第', //页数文本框前显示的汉字   
        afterPageText: '页    共 {pages} 页',
        pageList: [10, 20, 30, 50], //可以设置每页记录条数的列表   
        displayMsg: '当前显示{from}-{to}条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{total}条',
        onChangePageSize: function (pageSize) {
            pageIndex = pageNumber;
            //一页显示几条
            relay.getList(pageIndex, pageSize);
        },
        onSelectPage: function (pageNumber, pageSize) {
            //下一页
            //pageIndex = pageNumber;

            relay.getList(pageNumber, pageSize);
        },
        onChangePageSize: function (pageNumber, pageSize) {

        },
        onRefresh: function (pageNumber, pageSize) {
            //pageIndex = pageNumber;
            // 刷新按钮
            relay.getList(pageNumber, pageSize);
        }
    });
}
//列表新增报警灯按钮
relay.addRelay = function (data) {
    if ($("#relayConfigDiv").css('display') == 'block') {
        $("#regionCodeInput").html(data.region_code);
        $("#relayColorInput").val("");
        $("#controlInput").val("");
        addRegionId = data.id;
        $("#relayConfigDiv").dialog('open');  //显示配置DIV
        $("#confirmBtn").unbind("click"); //解除绑定
        $("#confirmBtn").bind("click", relay.addRelayBtn);//绑定事件
    }
}
//确定添加报警灯按钮事件
relay.addRelayBtn = function () {
    var regionCode = $("#regionCodeInput").html();
    var regionId = addRegionId;
    var relayColor = $("#relayColorInput").val();
    var controlId = $("#controlInput").val();
    if (relayColor == null || relayColor == "") {
        alert("请填入报警灯颜色！");
        return;
    }
    if (controlId == null || controlId == "") {
        alert("请填入报警灯控制器编号！");
        return;
    }
    if (controlId >=65535) {
        alert("请填入小于65535的报警灯控制器编号！");
        return;
    }
    $.ajax({
        url: "/Config/AddAlarmLamp",
        type: "post",
        data: { regionId: regionId, controlId: controlId, color: relayColor },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {
                $("#relayConfigDiv").dialog('close');  //隐藏配置DIV
                relay.queryList(pageIndex, pageSize);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }

    })
}
//通过园区ID删除报警灯配置
relay.deleteRelayByRegionId = function (data) {
    var regionId = data.id;
    if (confirm("是否删除该园区下所有报警灯配置？")) {
        $.ajax({
            url: "/Config/DeleteAlarmLampByRegionId",
            type: "post",
            data: { regionId: regionId },
            datatype: 'json',
            async: true,
            success: function (data) {
                alert(data.msg);
                if (data.status == 0) {
                    relay.queryList(pageIndex, pageSize);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }
}
//全部关闭
relay.sendAllRelayClose = function (data) {
    var regionCode = data.region_code;
    var controlId = 0;
    var op = 4;
    $.ajax({
        url: "/Config/SendRelayMessage",
        type: "post",
        data: { regionCode: regionCode, controlId: controlId, op: op },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//全部打开
relay.sendAllRelayOpen = function (data) {
    var regionCode = data.region_code;
    var controlId = 0;
    var op = 3;
    $.ajax({
        url: "/Config/SendRelayMessage",
        type: "post",
        data: { regionCode: regionCode, controlId: controlId, op: op },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}

//列表修改报警灯按钮
relay.updateRelay = function (data) {
    if ($("#relayConfigDiv").css('display') == 'block') {
        $("#regionCodeInput").html(data.ext3);
        $("#relayColorInput").val(data.relay_content);
        $("#controlInput").val(data.control_id);
        updateId = data.id;
        updateRegionId = data.region_id
        $("#relayConfigDiv").dialog('open');  //显示配置DIV
        $("#confirmBtn").unbind("click"); //解除绑定
        $("#confirmBtn").bind("click", relay.updateRelayBtn);//绑定事件
    }
}
//修改报警灯确认按钮
relay.updateRelayBtn = function () {

    var regionId = updateRegionId;
    var id = updateId;
    var relayColor = $("#relayColorInput").val();
    var controlId = $("#controlInput").val();
    if (relayColor == null || relayColor == "") {
        alert("请填入报警灯颜色！");
        return;
    }
    if (controlId == null || controlId == "") {
        alert("请填入报警灯控制器编号！");
        return;
    }
    if (controlId >= 100) {
        alert("请填入小于100的报警灯控制器编号！");
        return;
    }
    $.ajax({
        url: "/Config/UpdateAlarmLamp",
        type: "post",
        data: { id: id, regionId: regionId, controlId: controlId, color: relayColor },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
            if (data.status == 0) {
                $("#relayConfigDiv").dialog('close');  //隐藏配置DIV
                relay.queryList(pageIndex, pageSize);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }

    })

}
//通过ID删除报警灯配置
relay.deleteRelayById = function (data) {
    var id = data.id;
    if (confirm("是否删除该报警灯配置？")) {
        $.ajax({
            url: "/Config/DeleteAlarmLampById",
            type: "post",
            data: { id: id },
            datatype: 'json',
            async: true,
            success: function (data) {
                alert(data.msg);
                if (data.status == 0) {
                    relay.queryList(pageIndex, pageSize);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }
}
//报警灯关闭
relay.sendRelayClose = function (data) {
    var regionCode = data.ext3;
    var controlId = data.control_id;
    var op = 0;
    $.ajax({
        url: "/Config/SendRelayMessage",
        type: "post",
        data: { regionCode: regionCode, controlId: controlId, op: op },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//报警灯打开
relay.sendRelayOpen = function (data) {
    var regionCode = data.ext3;
    var controlId = data.control_id;
    var op = 1;
    $.ajax({
        url: "/Config/SendRelayMessage",
        type: "post",
        data: { regionCode: regionCode, controlId: controlId, op: op },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//关闭配置弹窗
relay.cancel = function () {
    $("#relayConfigDiv").dialog('close');  //显示配置DIV
}

