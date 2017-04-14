var myDiagramDivId;//全局变量，存放图的divID
var myPaletteDivId;
var myDiagram;
var EVENTID;//事件ID
var deviceAlarm = {};
var _data = [];
var pageIndex = 1;
var pageSize = 10;
var isReadOnly = true;

var EVENTNAME = "";

$(function () {
    winHeight = $(window).height(); //获取电脑屏幕的高
    winWidth = $(window).width();//获取电脑屏幕的宽
    //小高小宽
    var minheight = (winHeight - 110);
    // var minwidth = (winWidth - 180);
    $('#eventTable').css({ height: minheight })
    //$('#eventTable').css({ width: minwidth })
    //初始化
    ShowAlarmCommandList(pageIndex, pageSize);
    GetAlarmCommandList(pageIndex, pageSize);
    //保存按钮
    $("#SaveButton").click(function () {

        // document.getElementById("mySavedModel").value = myDiagram.model.toJson();
        var ModelJson = myDiagram.model.toJson();
        $.ajax({
            type: "post", url: "/Alarm/Save", data: { ModelJson: ModelJson, eventId: EVENTID },
            success: function (data) {
                if (data.status == "OK") {
                    alert("操作成功");
                    window.location.href = "/Alarm/Command";//刷新
                    //$('#eventTable').datagrid('getPager')
                }
                else if (data.status == "error") {
                    alert("操作失败：" + data.msg);
                }
                else {
                    alert("操作失败");
                }

            },
            error: function () {
                alert("操作通讯失败");
            }
        });
        myDiagram.isModified = false;
    });
    //取消按钮
    $("#ExcButton").click(function () {
        updateAlarm(EVENTID, EVENTNAME);
    });




});

//显示预案的流程图
function ShowCmd() {
    var $ = go.GraphObject.make;//声明对象（全局的对象）
    myDiagram =
      $(go.Diagram, myDiagramDivId,//创建画布，
        {
            isReadOnly: isReadOnly,//锁定
            initialContentAlignment: go.Spot.Center,
            allowDrop: true,  // must be true to accept drops from the Palette
            "LinkDrawn": showLinkLabel,  // this DiagramEvent listener is defined below
            "LinkRelinked": showLinkLabel,
            "animationManager.duration": 800, // slightly longer than default (600ms) animation
            "undoManager.isEnabled": true, // enable undo & redo

            layout: $(go.TreeLayout, // 指定一个diagram.layout安排树
                      { angle: 90, layerSpacing: 35 })
        });

    // when the document is modified, add a "*" to the title and enable the "Save" button
    myDiagram.addDiagramListener("Modified", function (e) {
        var button = document.getElementById("SaveButton");
        if (button) button.disabled = !myDiagram.isModified;
        var idx = document.title.indexOf("*");
        if (myDiagram.isModified) {
            if (idx < 0) document.title += "*";
        } else {
            if (idx >= 0) document.title = document.title.substr(0, idx);
        }
    });


    function nodeStyle() {
        return [
             new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
            {
                // the Node.location is at the center of each node
                locationSpot: go.Spot.Center,

                mouseEnter: function (e, obj) { showPorts(obj.part, true); },
                mouseLeave: function (e, obj) { showPorts(obj.part, false); }
            }
        ];
    }


    function makePort(name, spot, output, input) {
        // the port is basically just a small circle that has a white stroke when it is made visible
        return $(go.Shape, "Circle",
                 {
                     fill: "transparent",
                     stroke: null,  // this is changed to "white" in the showPorts function
                     desiredSize: new go.Size(8, 8),
                     alignment: spot, alignmentFocus: spot,  // align the port on the main Shape
                     portId: name,  // declare this object to be a "port"
                     fromSpot: spot, toSpot: spot,  // declare where links may connect at this port
                     fromLinkable: output, toLinkable: input,  // declare whether the user may draw links to/from here
                     cursor: "pointer"  // show a different cursor to indicate potential link point
                 });
    }


    var lightText = 'whitesmoke';

    myDiagram.nodeTemplateMap.add("",  // the default category
      $(go.Node, "Spot", nodeStyle(),
        // the main object is a Panel that surrounds a TextBlock with a rectangular Shape
        $(go.Panel, "Auto",
         // $(go.Shape, "Rectangle",   //修改形状
         $(go.Shape, "RoundedRectangle",
            { fill: "#00A9C9", stroke: null },
            new go.Binding("figure", "figure")),
          $(go.TextBlock,
            {
                font: "bold 11pt Helvetica, Arial, sans-serif",
                stroke: lightText,
                margin: 8,
                maxSize: new go.Size(160, NaN),
                wrap: go.TextBlock.WrapFit,
                editable: true
            },
            new go.Binding("text").makeTwoWay())
        ),
        // four named ports, one on each side:
        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, true, true),
        makePort("R", go.Spot.Right, true, true),
        makePort("B", go.Spot.Bottom, true, false)
      ));
    //alert

    myDiagram.nodeTemplateMap.add("Start",
      $(go.Node, "Spot", nodeStyle(),
        $(go.Panel, "Auto",
        //  $(go.Shape, "Circle",  //修改形状
         $(go.Shape, "RoundedRectangle",
          // { minSize: new go.Size(40, 40), fill: "#79C900", stroke: null }),
              { minSize: new go.Size(40, 40), fill: "#00A9C9", stroke: null }), //修改颜色
          $(go.TextBlock, "Start",
            { font: "bold 11pt Helvetica, Arial, sans-serif", stroke: lightText },
            new go.Binding("text"))
        ),
        // three named ports, one on each side except the top, all output only:
        makePort("L", go.Spot.Left, true, false),
        makePort("R", go.Spot.Right, true, false),
        makePort("B", go.Spot.Bottom, true, false)
      ));

    myDiagram.nodeTemplateMap.add("End",
      $(go.Node, "Spot", nodeStyle(),
        $(go.Panel, "Auto",
         // $(go.Shape, "Circle",  //修改形状
         $(go.Shape, "RoundedRectangle",
            //{ minSize: new go.Size(40, 40), fill: "#DC3C00", stroke: null }),
             { minSize: new go.Size(40, 40), fill: "#00A9C9", stroke: null }),  //修改颜色
          $(go.TextBlock, "End",
            { font: "bold 11pt Helvetica, Arial, sans-serif", stroke: lightText },
            new go.Binding("text"))
        ),
        // three named ports, one on each side except the bottom, all input only:
        makePort("T", go.Spot.Top, false, true),
        makePort("L", go.Spot.Left, false, true),
        makePort("R", go.Spot.Right, false, true)
      ));

    myDiagram.linkTemplate =
      $(go.Link,  // the whole link panel
        {
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            corner: 5, toShortLength: 4,
            relinkableFrom: true,
            relinkableTo: true,
            reshapable: true,
            resegmentable: true,
            // mouse-overs subtly highlight links:
            mouseEnter: function (e, link) { link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)"; },
            mouseLeave: function (e, link) { link.findObject("HIGHLIGHT").stroke = "transparent"; }
        },
        new go.Binding("points").makeTwoWay(),
        $(go.Shape,  // the highlight shape, normally transparent
          { isPanelMain: true, strokeWidth: 8, stroke: "transparent", name: "HIGHLIGHT" }),
        $(go.Shape,  // the link path shape
          { isPanelMain: true, stroke: "gray", strokeWidth: 2 }),
        $(go.Shape,  // the arrowhead
          { toArrow: "standard", stroke: null, fill: "gray" }),
        $(go.Panel, "Auto",  // the link label, normally not visible
          { visible: false, name: "LABEL", segmentIndex: 2, segmentFraction: 0.5 },
          new go.Binding("visible", "visible").makeTwoWay(),
          $(go.Shape, "RoundedRectangle",  // the label shape
            { fill: "#F8F8F8", stroke: null }),
          $(go.TextBlock, "Yes",  // the label
            {
                textAlign: "center",
                font: "10pt helvetica, arial, sans-serif",
                stroke: "#333333",
                editable: true
            },
            new go.Binding("text").makeTwoWay())
        )
      );
    function showLinkLabel(e) {
        var label = e.subject.findObject("LABEL");
        if (label !== null) label.visible = (e.subject.fromNode.data.figure === "Diamond");
    }

    // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
    myDiagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
    myDiagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;

    load();  // load an initial diagram from some JSON text

    // initialize the Palette that is on the left side of the page
    myPalette =
      $(go.Palette, myPaletteDivId,  // must name or refer to the DIV HTML element
        {
            "animationManager.duration": 800, // slightly longer than default (600ms) animation
            nodeTemplateMap: myDiagram.nodeTemplateMap,  // share the templates used by myDiagram
            model: new go.GraphLinksModel([  // specify the contents of the Palette
              { category: "Start", text: "开始", key: "1" },
              { text: "内容" },
              //{ text: "选择", figure: "Diamond", key: "3" },
              { text: "选择", key: "3" },
              { category: "End", text: "结尾", key: "4" }
            ])
        });

}

// 展示的样式
function showPorts(node, show) {
    var diagram = node.diagram;
    if (!diagram || diagram.isReadOnly || !diagram.allowLink) return;
    node.ports.each(function (port) {
        port.stroke = (show ? "white" : null);
    });
}

//加载
function load() {
    myDiagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
}




//查看预案
function showAlarm(eventId, eventName) {
    isReadOnly = true;
    $("#devicecreateLeft").addClass("devicecreate-left2").removeClass("devicecreate-left");
    $("#devicecreateRight").addClass("devicecreate-right2").removeClass("devicecreate-right");
    //$("#divParent").html("<div class='about-close2' onclick='qqq()'></div>");
    //初始化
    ShowAlarmCommandList(pageIndex, pageSize);
    GetAlarmCommandList(pageIndex, pageSize);
    //var row = $('#eventTable').datagrid('getSelected');
    //var id = row.id;
    EVENTNAME = eventName;
    $("#eventNameLabel").html(EVENTNAME);
    EVENTID = eventId;//为全局变量赋值
    //绑定的树
    $.ajax({
        type: "post", url: "/Alarm/Show", data: { eventId: eventId },
        success: function (data) {
            if (data.status == "OK") {
                //如果成功则加载数据
                var str1 = '{"class":"go.GraphLinksModel","linkFromPortIdProperty":"fromPort","linkToPortIdProperty":"toPort","nodeDataArray":';
                var str3 = ',"linkDataArray":';

                $("#mySavedModel").text(str1 + data.data1 + str3 + data.data2 + "}");
                //alert($("#mySavedModel").text())
                var rand = Math.random() * 1000;
                var divid = Math.ceil(rand);

                myDiagramDivId = "div0" + divid;//流程图
                myPaletteDivId = "div" + divid;//副图
                $("#myDiagramDiv").empty();//首先清除原来的div
                $("#myPaletteDiv").empty();
                //var div = document.getElementsByClassName("content-table");
                var $myDiagramDiv = $('<div id=div0' + divid + ' style="height:600px;width:95%"></div>')//流程图div

                var $myPaletteDiv = $('<div id=' + myPaletteDivId + ' style="height:80px;width:600px"></div>');//幅图

                //var $button = $('<button id="SaveButton" class="btn btn-success btn-xs">保存</button>');
                //$myPaletteDiv.append($button);
                $("#myDiagramDiv").append($myDiagramDiv);//重新添加

                $("#myPaletteDiv").append($myPaletteDiv);//重新添加

                $("#btnDiv").css("display", "none");
                $("#divParent").css("display", "none");

                //$("#myPaletteDiv").css("display","none");
                //$("#divParent p").css("display", "none");
                //$("#divParent").css({height:10})
                //$("divParent").empty("");
                //$("divParent").html("<div class='about-close2' onclick='qqq()'></div>");
                //$("#divParent").css("display", "");
                //$("#divParent").css("display", "");
                //alert(myDiagramDivId);
                ShowCmd();//调用方法显示预案
            }
            else {
                alert("加载失败");
            }

        },
        error: function () {
            alert("加载通讯失败");

        }
    });//ajax结束
}
//修改或者新增预案
function updateAlarm(eventId, eventName) {
    isReadOnly = false;
    EVENTNAME = eventName;
    $("#eventNameLabel").html(EVENTNAME);

    EVENTID = eventId;
    $("#devicecreateLeft").addClass("devicecreate-left2").removeClass("devicecreate-left");
    $("#devicecreateRight").addClass("devicecreate-right2").removeClass("devicecreate-right");

    //$("#divParent").html("<p>可以选择的元素：</p><div id='myPaletteDiv' style='height:15%;width:100%'></div><div class='about-close2' onclick='qqq()'></div>");
    //$("#divParent p").css("display", "");
    //$("#myPaletteDiv").css("display", "");
    //初始化
    ShowAlarmCommandList(pageIndex, pageSize);
    GetAlarmCommandList(pageIndex, pageSize);
    $.ajax({
        type: "post", url: "/Alarm/Show", data: { eventId: eventId },
        success: function (data) {
            if (data.status == "OK") {
                //如果成功则加载数据
                var str1 = '{"class":"go.GraphLinksModel","linkFromPortIdProperty":"fromPort","linkToPortIdProperty":"toPort","nodeDataArray":';
                var str3 = ',"linkDataArray":';

                $("#mySavedModel").text(str1 + data.data1 + str3 + data.data2 + "}");
                //alert($("#mySavedModel").text())
                var rand = Math.random() * 1000;
                var divid = Math.ceil(rand);

                myDiagramDivId = "div0" + divid;//流程图
                myPaletteDivId = "div" + divid;//副图
                $("#myDiagramDiv").empty();//首先清除原来的div
                $("#myPaletteDiv").empty();
                //var div = document.getElementsByClassName("content-table");
                var $myDiagramDiv = $('<div class="myDiagramDiv" id=div0' + divid + '></div>')//流程图div

                var $myPaletteDiv = $('<div id=' + myPaletteDivId + ' style="height:80px;width:100%"></div>');//幅图
                var $button = $('<button id="SaveButton" class="btn btn-success btn-xs">保存</button>');
                $myPaletteDiv.append($button);
                $("#myDiagramDiv").append($myDiagramDiv);//重新添加
                $("#myPaletteDiv").append($myPaletteDiv);//重新添加
                $("#divParent").css("display", "");
                $("#btnDiv").css("display", "");
                //alert(myDiagramDivId);
                ShowCmd();//调用方法显示预案
            }
            else {
                alert("加载失败" + data.msg);
            }

        },
        error: function () {
            alert("加载通讯失败");

        }
    });//ajax结束
}
//删除预案流程图
function deleteAlarm(eventId) {
    //var row = $('#dg').datagrid('getSelected');
    //var id = row.id;
    if (confirm("删除应急指挥流程图，是否继续？"))
    {
        $.ajax({
            type: "post", url: "/Alarm/Delete", data: { eventId: eventId },
            success: function (data) {
                if (data.status == "OK") {
                    alert("删除成功");
                    window.location.href = "/Alarm/Command";//刷新
                }
                else {
                    alert("删除失败");
                }
            },
            error: function () {
                alert("通讯失败");
            }
        });
    }
}

GetAlarmCommandList = function (pageIndex, pageSize) {
    var _data;
    $.ajax({
        url: "/Alarm/GetAlarmCommandList",
        type: "post",
        data: { pageIndex: pageIndex, pageSize: pageSize },
        datatype: 'json',
        async: true,
        beforeSend: function (XMLHttpRequest) {
            $('#eventTable').datagrid('loading', "正在加载...");
        },
        success: function (data) {
            if (data.hasOwnProperty('state')) {
                alert("应急指挥流程图列表加载出现" + data.message + "错误请联系管理员！");
            }
            else
                if (data != null) {
                    _data = data;
                    $('#eventTable').datagrid('loadData', _data);
                    $('#eventTable').datagrid('getPager').pagination('refresh',
                        {
                            total: _data.total,
                            pageNumber: pageIndex,
                            pageSize: pageSize
                        })

                }
            $('#eventTable').datagrid('loaded');
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
            $('#eventTable').datagrid('loaded');

        }
    });
}



ShowAlarmCommandList = function (pageIndex, pageSize) {
    /*------------------*/
    $('#eventTable').datagrid({
        data: _data,
        fitColumns: true,
        singleSelect: true,
        method: 'get',
        loadMsg: '正在加载……',
        remoteSort: false,
        pageNumber: pageIndex, //重点:传入当前页数
        pagination: true, //分页控件 
        rownumbers: false, //行号 
        // onClickRow: function () { showAlarm() },
        // toolbar: [
        //{
        //    iconCls: 'icon-add',
        //    text: "新增事件",
        //    handler: function () { alert("新增成功"); }
        //}
        // ],
        columns: [[
            //{ field: 'ck', checkbox: true },
            { field: 'id', title: '事件ID', width: 40, align: "center", sortable: true },
            //{ field: 'event_code', title: '事件编码', width: 70, align: "center", sortable: false },
            { field: 'event_name', title: '事件名称', width: 70, align: "center", sortable: false },
            { field: 'content', title: '事件描述', width: 70, align: "center", sortable: false },
             {
                 field: 'Id', title: '流程图操作', width: 80, align: "center", sortable: false,
                 formatter: function (value, row, index) {

                     // alert(row.event_id);
                     if (row.event_id <= 0) {
                         //  return '<button  id="addAlarmCommand"class="btn btn-primary btn-xs" onclick=\'updateAlarm(' + row.id + ',' + row.event_name + ')\'>新增</button>'
                         return '<button  id="addAlarmCommand"class="btn btn-primary btn-xs" onclick=\'updateAlarm(' + row.id + ',"' + row.event_name + '")\'>新增</button>'
                     }
                     else {
                         // return '<button  id="updataAlarmCommand"class="btn btn-xs btn-warning"  onclick=\'showAlarm(' + row.id + ',' + row.event_name + ')\'>查&ensp;&ensp;看</button> ' + '|' + ' <button  id="updataAlarmCommand"class="btn btn-primary btn-xs"  onclick=\'updateAlarm(' + row.id + ',' + row.event_name + ')\'>修&ensp;&ensp;改</button> ' + '|' + ' <button  id="deleteAlarmCommand" class="btn btn-danger btn-xs" style="display" onclick=\'deleteAlarm(' + row.id + ')\'>删&ensp;&ensp;除</button>'
                         return '<button  id="updataAlarmCommand"class="btn btn-xs btn-warning"  onclick=\'showAlarm(' + row.id + ',"' + row.event_name + '")\'>查&ensp;&ensp;看</button> ' + '|' + ' <button  id="updataAlarmCommand"class="btn btn-primary btn-xs"  onclick=\'updateAlarm(' + row.id + ',"' + row.event_name + '")\'>修&ensp;&ensp;改</button> ' + '|' + ' <button  id="deleteAlarmCommand" class="btn btn-danger btn-xs" style="display" onclick=\'deleteAlarm(' + row.id + ')\'>删&ensp;&ensp;除</button>'
                     }//else end

                 }
             }
              //{
              //    field: 'event_id', title: '事件操作', width: 50, align: "center", sortable: false,
              //    formatter: function (value, rec) {

              //        return '<button  id="updateEvent"class="btn btn-xs btn-warning"  onclick=\'alert("修改成功");\'>修改</button> ' + '|' + ' <button  id="DeleteEvent"class="btn btn-primary btn-xs"  onclick=\'alert("删除成功");\'>删除</button>'
              //    }
              //}
        ]],
        view: detailview,
        detailFormatter: function (index, row) {
            return '<div style="padding:2px"><table id="ddv-' + index + '"></table></div>';
        },
        onExpandRow: function (index, row) {
            var data2 = [];
            $.ajax({
                url: "/Alarm/GetChildAlarmCommandList",
                data: { pid: row.id },
                type: "post",
                datatype: "json",
                async: false,
                //success: function (data) {
                //    data2 = data;
                //},
                //error: function () {

                //}
                success: function (data) {
                    if (data.hasOwnProperty('state')) {
                        alert("子级事件列表加载出现" + data.message + "错误请联系管理员！");
                    }
                    else
                        if (data != null) {
                            data2 = data;
                            //$('#eventTable').datagrid('loadData', data2);
                            $('#eventTable').datagrid('getPager').pagination({
                                total: _data.total,
                                pageNumber: pageIndex,
                                pageSize: pageSize
                            })
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
                ]],
                onResize: function () {
                    $('#eventTable').datagrid('fixDetailRowHeight', index);
                }
            });
            $('#eventTable').datagrid('fixDetailRowHeight', index);
        }

    });
    $('#eventTable').datagrid('getPager').pagination({//分页栏下方文字显示
        showPageList: true,
        pageSize: pageSize, //每页显示的记录条数，默认为10
        pageNumber: pageIndex, //重点:传入当前页数
        pageList: [10, 20, 30, 50], //可以设置每页记录条数的列表   
        beforePageText: '第', //页数文本框前显示的汉字   
        afterPageText: '页    共 {pages} 页',
        displayMsg: '当前显示{from}-{to}条&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;共{total}条',
        onChangePageSize: function (pageSize) {
            //一页显示几条
            pageIndex = pageNumber;
            GetAlarmCommandList(pageIndex, pageSize);
        },
        onSelectPage: function (pageNumber, pageSize) {
            //下一页
            //pageIndex = pageNumber;
            GetAlarmCommandList(pageNumber, pageSize);
        },
        onChangePageSize: function () {
            //选择显示条数事件
        },
        onRefresh: function (pageNumber, pageSize) {
            // GetLogData(1, 10)
            //pageIndex = pageNumber;
            GetAlarmCommandList(pageNumber, pageSize);
        }
    });
}

function qqq() {
    $("#devicecreateRight").addClass("devicecreate-right").removeClass("devicecreate-right2");
    $("#devicecreateLeft").addClass("devicecreate-left").removeClass("devicecreate-left2");
    ShowAlarmCommandList(pageIndex, pageSize);
    GetAlarmCommandList(pageIndex, pageSize);

}