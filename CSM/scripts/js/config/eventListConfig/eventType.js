
var event = [];
var pageIndex = 1;
var pageSize = 30;
var _data;
var addChildPid;
var updateChildPid;
var updateChildId;
var updateRootId;

$(function () {
    $("#childEventDiv").dialog('close');
    $("#rootEventDiv").dialog('close');
    loadEventList(pageIndex, pageSize);
    GetEventList(pageIndex, pageSize);
})

//获取父级事件数据
GetEventList = function (pageIndex, pageSize) {
    $.ajax({
        url: "/Config/GetRootEventList",
        type: "post",
        data: { pageIndex: pageIndex, pageSize: pageSize },
        datatype: 'json',
        async: true,
        beforeSend: function (XMLHttpRequest) {
            $('#eventListTable').datagrid('loading', "正在加载...");
        },
        success: function (data) {
            if (data.hasOwnProperty('state')) {
                alert("事件列表加载出现" + data.message + "错误请联系管理员！");
            }
            else
                if (data != null) {
                    _data = data;
                    $('#eventListTable').datagrid('loadData', _data);
                    $('#eventListTable').datagrid('getPager').pagination('refresh',
                        {
                            total: _data.total,
                            pageNumber: pageIndex,
                            pageSize: pageSize
                        })
                }
            $('#eventListTable').datagrid('loaded');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
            $('#eventListTable').datagrid('loaded');

        }
    });
}
//加载父级事件table
loadEventList = function (pageIndex, pageSize) {

    $('#eventListTable').datagrid({
        data: _data,
        fitColumns: true,
        singleSelect: true,
        method: 'get',
        loadMsg: '正在加载……',
        remoteSort: false,
        pageNumber: pageIndex, //重点:传入当前页数
        pagination: true, //分页控件 
        rownumbers: false, //行号 
        onDblClickRow: function (rowIndex, rowData) {
            //getDeviceDefinedInfo(rowData.id);
        },
        toolbar: [
       {
           iconCls: 'icon-add',
           text: "新增事件",
           handler: function () { addRootEventBtn(); }
       }
        ],
        columns: [[
            //{ field: 'ck', checkbox: true },
            { field: 'id', title: '事件ID', width: 40, align: "center", sortable: true },
            //{ field: 'event_code', title: '事件编码', width: 70, align: "center", sortable: false },
            { field: 'event_name', title: '事件名称', width: 70, align: "center", sortable: false },
            { field: 'content', title: '事件描述', width: 70, align: "center", sortable: false },
            {
                field: 'start_time', title: '视频下载起始时间', width: 70, align: "center", sortable: false,
                formatter: function (value, rec) {
                    return "-" + value;
                }
            },
            {
                field: 'end_time', title: '视频下载结束时间', width: 70, align: "center", sortable: false,
                formatter: function (value, rec) {
                    return "+" + value;
                }
            },
              {
                  field: 'event_code', title: '事件操作', width: 50, align: "center", sortable: false,
                  formatter: function (value, row, index) {

                      return '<button  id="updateRootEventBtn" class="btn btn-xs btn-warning"  onclick=\'updateRootEventBtn(' + JSON.stringify(row) + ')\'>修&ensp;&ensp;改</button> ' + '|' + ' <button  id="deleteRootEventBtn"class="btn btn-danger btn-xs"  onclick=\'deleteRootEventBtn(' + row.id + ')\'>删&ensp;&ensp;除</button>'
                  }
              },

               //{
              //    field: 'event_id', title: '事件操作', width: 50, align: "center", sortable: false,
              //    formatter: function (value, rec) {

              //        return '<button  id="updateEvent"class="btn btn-xs btn-warning"  onclick=\'alert("修改成功");\'>修改</button> ' + '|' + ' <button  id="DeleteEvent"class="btn btn-primary btn-xs"  onclick=\'alert("删除成功");\'>删除</button>'
              //    }
              //}
        {
            field: 'event_id', title: '子级事件操作', width: 50, align: "center", sortable: false,
            formatter: function (value, row, index) {

                return '<button  id="addChildEventBtn" class="btn btn-xs btn-primary"  onclick=\'addChildEventBtn(' + row.id + ')\'>新&ensp;&ensp;增</button> ' + '|' + ' <button  id="deleteAllChildEventBtn"class="btn btn-danger btn-xs"  onclick=\'deleteAllChildEventBtn(' + row.id + ')\'>清&ensp;&ensp;空</button>'
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
                url: "/Config/GetChildEventList",
                data: { pid: row.id },
                type: "post",
                datatype: "json",
                async: false,
                success: function (data) {
                    if (data.hasOwnProperty('state')) {
                        alert("子级事件列表加载出现" + data.message + "错误请联系管理员！");
                    }
                    else
                        if (data != null) {
                            data2 = data;
                            //$('#eventTable').datagrid('loadData', data2);
                        }
                    //$('#eventTable').datagrid('loaded');
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
                    //getDeviceDefinedInfo(rowData.id);
                },
                columns: [[
            { field: 'id', title: '事件ID', width: 40, align: "center", sortable: true },
            { field: 'event_code', title: '事件编码', width: 70, align: "center", sortable: false },
            { field: 'event_name', title: '事件名称', width: 70, align: "center", sortable: false },
            { field: 'content', title: '事件描述', width: 70, align: "center", sortable: false },
             {
                 field: 'event_id', title: '事件操作', width: 70, align: "center", sortable: false,
                 formatter: function (value, row, index) {

                     return '<button  id="updateChildEventBtn" class="btn btn-xs btn-warning"  onclick=\'updateChildEventBtn(' + JSON.stringify(row) + ')\'>修改</button> ' + '|' + ' <button  id="deleteChildEventBtn" class="btn btn-danger btn-xs"  onclick=\'deleteChildEventBtn(' + row.id + ')\'>删除</button>'
                 }
             }
                ]],
                onResize: function () {
                    $('#eventListTable').datagrid('fixDetailRowHeight', index);
                }
            });
            $('#eventListTable').datagrid('fixDetailRowHeight', index);
        }
    });
    $('#eventListTable').datagrid('getPager').pagination({//分页栏下方文字显示
        showPageList: true,
        pageSize: pageSize, //每页显示的记录条数，默认为10
        pageNumber: pageIndex, //重点:传入当前页数
        pageList: [10, 20, 30, 50], //可以设置每页记录条数的列表   
        beforePageText: '第', //页数文本框前显示的汉字   
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示{from}-{to}条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{total}条',
        onChangePageSize: function (pageSize) {
            pageIndex = pageNumber;
            GetEventList(pageIndex, pageSize);
        },
        onSelectPage: function (pageNumber, pageSize) {
            GetEventList(pageNumber, pageSize);
        },
        onChangePageSize: function () {
            //选择显示条数事件
        },
        onRefresh: function (pageNumber, pageSize) {
            GetEventList(pageNumber, pageSize);
        }
    });

}

//新增父级事件按钮
addRootEventBtn = function () {

    if ($("#rootEventDiv").parent().css("display") != "block") { //判断当前确警框是否已经弹出
        $("#rootEventName").val("");
        $("#rootEventVideoStartTime").val(10);
        $("#rootEventVideoEndTime").val(10);
        $("#rootEevntContent").val("");
        $("#rootEventDiv").dialog('open');
        //  $("#rootEventOkBtn").one("click", addRootEvent);
        // $("#rootEventOkBtn").die();//解除绑定
        //$("#childEventOkBtn").unbind('click', addRootEvent);//解除绑定
        //$("#childEventOkBtn").unbind('click', updateRootEvent);//解除绑定
        $("#rootEventOkBtn").unbind('click');
        $("#rootEventOkBtn").bind('click', addRootEvent);
        $('#rootEventCancelBtn').one("click", rootEventCancelBtnClose);;
    }
}
//修改父级事件按钮
updateRootEventBtn = function (data) {
    if ($("#rootEventDiv").parent().css("display") != "block") { //判断当前确警框是否已经弹出
        updateRootId = data.id;
        $("#rootEventName").val(data.event_name);
        $("#rootEventVideoStartTime").val(data.start_time);
        $("#rootEventVideoEndTime").val(data.end_time);
        $("#rootEevntContent").val(data.content);
        $("#rootEventDiv").dialog('open');
        // $("#rootEventOkBtn").one("click", updateRootEvent);
        // $("#rootEventOkBtn").die();//解除绑定
        //$("#childEventOkBtn").unbind('click', addRootEvent);//解除绑定
        //$("#childEventOkBtn").unbind('click', updateRootEvent);//解除绑定
        $("#rootEventOkBtn").unbind('click');
        $("#rootEventOkBtn").bind('click', updateRootEvent);
        $('#rootEventCancelBtn').one("click", rootEventCancelBtnClose);;
    }
}
//删除父级事件按钮
deleteRootEventBtn = function (id) {
    $.ajax({
        url: "/Config/GetChildEventList",
        type: "post",
        data: { pid: id },
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data != null && data.length > 0) {
                alert("请先清空子级事件");
            }
            else {
                if (confirm("此操作将会删除绑定的视频下载时间配置和应急指挥流程图，是否继续？")) {
                    $.ajax({
                        url: "/Config/DeleteRootEvent",
                        type: "post",
                        data: { id: id },
                        datatype: 'json',
                        async: true,
                        success: function (data) {
                            alert(data.message);
                            if (data.state == 0) {
                                loadEventList(pageIndex, pageSize);
                                GetEventList(pageIndex, pageSize);
                            }

                        },
                        error: function (XMLHttpRequest, textStatus, errorThrown) {
                            alert(XMLHttpRequest.status + "错误请联系管理员！");
                        }
                    })
                }
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//删除指定父级事件下所有子级事件按钮
deleteAllChildEventBtn = function (id) {
    if (confirm("删除所有子级事件，是否继续？")) {
        $.ajax({
            url: "/Config/DeleteEventListByPid",
            type: "post",
            data: { pid: id },
            datatype: 'json',
            async: true,
            success: function (data) {
                alert(data.message);
                if (data.state == 0) {
                    loadEventList(pageIndex, pageSize);
                    GetEventList(pageIndex, pageSize);
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }

}
//新增子级事件按钮
addChildEventBtn = function (pid) {
    if ($("#childEventDiv").parent().css("display") != "block") { //判断当前确警框是否已经弹出
        addChildPid = pid;
        $("#childEventName").val("");
        $("#childEventCode").val("");
        $("#childEevntContent").val("");
        $("#childEventDiv").dialog('open');


        //$("#childEventOkBtn").one("click", addChildEvent);
        // $("#childEventOkBtn").die();//解除绑定
        //$("#childEventOkBtn").unbind('click', addChildEvent);//解除绑定
        //$("#childEventOkBtn").unbind('click', updateChildEvent);//解除绑定
        $("#childEventOkBtn").unbind('click');
        $("#childEventOkBtn").bind('click', addChildEvent);
        $('#childEventCancelBtn').one("click", childEventCancelBtnClose);;
    }

}
//修改子级事件按钮
updateChildEventBtn = function (data) {
    if ($("#childEventDiv").parent().css("display") != "block") { //判断当前确警框是否已经弹出
        updateChildPid = data.pid;
        updateChildId = data.id;
        $("#childEventName").val(data.event_name);
        $("#childEventCode").val(data.event_code);
        $("#childEevntContent").val(data.content);
        $("#childEventDiv").dialog('open');
        // $("#childEventOkBtn").one("click", updateChildEvent);
        // $("#childEventOkBtn").die();//解除绑定
        //$("#childEventOkBtn").unbind('click', addChildEvent);//解除绑定
        //$("#childEventOkBtn").unbind('click', updateChildEvent);//解除绑定
        $("#childEventOkBtn").unbind('click');
        $("#childEventOkBtn").bind('click', updateChildEvent);
        $('#childEventCancelBtn').one("click", childEventCancelBtnClose);
    }
}
//删除子级事件按钮
deleteChildEventBtn = function (id) {
    $.ajax({
        url: "/Config/DeleteEventById",
        type: "post",
        data: { id: id },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.message);
            if (data.state == 0) {
                loadEventList(pageIndex, pageSize);
                GetEventList(pageIndex, pageSize);
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//修改父级事件
updateRootEvent = function () {
   // var r = /^\+?[1-9][0-9]*$/;　　//正整数
    var r = /^(\+?[1-9]\d{0,2}|\+?1000)$/;
    var eventName = $("#rootEventName").val();
    var eventContent = $("#rootEevntContent").val();
    var videoStartTime = $("#rootEventVideoStartTime").val();  //需判断
    var videoEndTime = $("#rootEventVideoEndTime").val();     //需判断
    var sTimeBl = r.test(videoStartTime);
    var eTimeBl = r.test(videoEndTime);
    if (sTimeBl == false) {
        alert("请输入0-1000内正整数");
    }
    else {
        if (eTimeBl == false) {
            alert("请输入0-1000内正整数");
        } else {
            if (eventName != "") {
                $.ajax({
                    url: "/Config/UpdateRootEvent",
                    type: "post",
                    data: { eventName: eventName, eventContent: eventContent, startTime: videoStartTime, endTime: videoEndTime, id: updateRootId },
                    datatype: 'json',
                    async: true,
                    success: function (data) {
                        alert(data.message);
                        if (data.state == 0) {
                            rootEventCancelBtnClose();
                            loadEventList(pageIndex, pageSize);
                            GetEventList(pageIndex, pageSize);
                        }

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.status + "错误请联系管理员！");
                    }
                })
            }
            else {
                alert("事件名称为空！请重新输入");
            }
        }
    }

}
//新增父级事件
addRootEvent = function () {
    //var r = /^\+?[1-9][0-9]*$/;　　//正整数
    var r = /^(\+?[1-9]\d{0,2}|\+?1000)$/;

    var eventName = $("#rootEventName").val();
    var eventContent = $("#rootEevntContent").val();
    var videoStartTime = $("#rootEventVideoStartTime").val();  //需判断
    var videoEndTime = $("#rootEventVideoEndTime").val();     //需判断
    var sTimeBl = r.test(videoStartTime);
    var eTimeBl = r.test(videoEndTime);
    if (sTimeBl == false) {
        alert("请输入0-1000内正整数");
    }
    else {
        if (eTimeBl == false) {
            alert("请输入0-1000内正整数");
        } else {
            if (eventName != "" && sTimeBl == true && eTimeBl == true) {
                $.ajax({
                    url: "/Config/AddRootEvent",
                    type: "post",
                    data: { eventName: eventName, eventContent: eventContent, startTime: videoStartTime, endTime: videoEndTime },
                    datatype: 'json',
                    async: true,
                    success: function (data) {
                        alert(data.message);
                        if (data.state == 0) {
                            rootEventCancelBtnClose();
                            loadEventList(pageIndex, pageSize);
                            GetEventList(pageIndex, pageSize);
                        }

                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.status + "错误请联系管理员！");
                    }
                })
            }
            else {
                alert("事件名称为空！请重新输入");
            }
        }
    }


}
//新增子级事件
addChildEvent = function () {
    var eventName = $("#childEventName").val();
    var eventCode = $("#childEventCode").val();
    var eventContent = $("#childEevntContent").val();
    if (eventCode == "") {
        alert("事件编码为空！请重新输入");
    }
    else if (eventName == "") {
        alert("事件名称为空！请重新输入");
    }
    else if (eventName != "" && eventCode != "") {
        $.ajax({
            url: "/Config/AddChildEvent",
            type: "post",
            data: { pid: addChildPid, eventName: eventName, eventCode: eventCode, eventContent: eventContent },
            datatype: 'json',
            async: true,
            success: function (data) {
                alert(data.message);
                if (data.state == 0) {
                    childEventCancelBtnClose();
                    loadEventList(pageIndex, pageSize);
                    GetEventList(pageIndex, pageSize);
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }
}
//修改子级事件
updateChildEvent = function () {
    var eventName = $("#childEventName").val();
    var eventCode = $("#childEventCode").val();
    var eventContent = $("#childEevntContent").val();
    if (eventCode == "") {
        alert("事件编码为空！请重新输入");
    }
    else if (eventName == "") {
        alert("事件名称为空！请重新输入");
    }
    else if (eventName != "" && eventCode != "") {
        $.ajax({
            url: "/Config/UpdateChildEvent",
            type: "post",
            data: { pid: updateChildPid, id: updateChildId, eventName: eventName, eventCode: eventCode, eventContent: eventContent },
            datatype: 'json',
            async: true,
            success: function (data) {
                alert(data.message);
                if (data.state == 0) {
                    childEventCancelBtnClose();
                    loadEventList(pageIndex, pageSize);
                    GetEventList(pageIndex, pageSize);
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        })
    }
}


//rootEventDiv关闭
rootEventCancelBtnClose = function () {
    $("#rootEventDiv").dialog('close');
}
//childEventDiv关闭
childEventCancelBtnClose = function () {
    $("#childEventDiv").dialog('close');
}



