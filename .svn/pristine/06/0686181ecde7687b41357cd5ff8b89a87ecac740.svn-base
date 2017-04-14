var myDiagramDivId;//全局变量，存放图的divID

//$(function () {
//    //通过类选择器获取到点击按钮的行ID
//  //  $(".button").click(function (e) {

//        //var id = $(this).attr("id");

//        //绑定的树
//        $.ajax({
//            type: "post", url: "/Alarm/Show", data: { eventId: "1" },
//            success: function (data) {
//                if (data.status == "OK") {
//                    //如果成功则加载数据
//                    var str1 = '{"class":"go.GraphLinksModel","linkFromPortIdProperty":"fromPort","linkToPortIdProperty":"toPort","nodeDataArray":';
//                    var str3 = ',"linkDataArray":';

//                    $("#mySavedModel").text(str1 + data.data1 + str3 + data.data2 + "}");
//                    // alert($("#mySavedModel").text())
//                    var rand = Math.random() * 1000;
//                    var divid = Math.ceil(rand);

//                    myDiagramDivId = "div0" + divid;//
//                    //alert(myDiagramDivId);
//                    $("#mydiv01").empty()//首先清除原来的div
//                    //var div = document.getElementsByClassName("content-table");
//                    var $myDiagramDiv = $('<div id=div0' + divid + ' style="background-color: #FFFFFF;height:100%;width:100%;overflow:hidden"></div>')

//                    $("#mydiv01").append($myDiagramDiv);//重新添加

//                    ShowCmd();//调用方法显示预案
//                }
//                else {
//                    alert("加载失败");
//                }

//            },
//            error: function () {
//                alert("加载通讯失败");

//            }
//        });//ajax结束

//   // });//点击事件结束

//});

ShowTreeByEventName = function (eventName) {
    //通过类选择器获取到点击按钮的行ID
    //  $(".button").click(function (e) {

    //var id = $(this).attr("id");

    //绑定的树
    $.ajax({
        type: "post", url: "/Alarm/ShowByEventName", data: { eventName: eventName },
        success: function (data) {
            if (data.status == "OK") {
                //如果成功则加载数据
                var str1 = '{"class":"go.GraphLinksModel","linkFromPortIdProperty":"fromPort","linkToPortIdProperty":"toPort","nodeDataArray":';
                var str3 = ',"linkDataArray":';

                $("#mySavedModel").text(str1 + data.data1 + str3 + data.data2 + "}");
                var rand = Math.random() * 1000;
                var divid = Math.ceil(rand);

                myDiagramDivId = "div0" + divid;//

                $("#mydiv01").empty()//首先清除原来的div

                var $myDiagramDiv = $('<div id=div0' + divid + ' style="background-color: #FFFFFF;height:100%;width:100%;overflow:hidden"></div>')

                //   var $myDiagramDiv = $('<div id=div0' + divid + ' style="background-color: #FFFFFF;height:300px;width:100%;overflow:hidden"></div>')

                $("#mydiv01").append($myDiagramDiv);//重新添加

                ShowCmd();//调用方法显示预案
            }
            else {
                //  alert("加载失败：" + data.msg);
                $("#mydiv01").text(data.msg);
            }

        },
        error: function () {
            alert("加载应急指挥流程图失败");

        }
    });//ajax结束

    // });//点击事件结束

}

ShowTreeByRootEventId = function (eventId) {
    //通过类选择器获取到点击按钮的行ID
    //  $(".button").click(function (e) {

    //var id = $(this).attr("id");

    //绑定的树
    $.ajax({
        type: "post", url: "/Alarm/Show", data: { eventId: eventId },
        success: function (data) {
            if (data.status == "OK") {
                if (data.data1 != null && data.data1 != "[]") {
                    //如果成功则加载数据
                    var str1 = '{"class":"go.GraphLinksModel","linkFromPortIdProperty":"fromPort","linkToPortIdProperty":"toPort","nodeDataArray":';
                    var str3 = ',"linkDataArray":';

                    $("#mySavedModel").text(str1 + data.data1 + str3 + data.data2 + "}");
                    var rand = Math.random() * 1000;
                    var divid = Math.ceil(rand);

                    myDiagramDivId = "div0" + divid;//

                    $("#mydiv01").empty()//首先清除原来的div

                    var $myDiagramDiv = $('<div id=div0' + divid + ' style="background-color: #FFFFFF;height:100%;width:100%;overflow:hidden"></div>')

                    //  var $myDiagramDiv = $('<div id=div0' + divid + ' style="background-color: #FFFFFF;height:300px;width:100%;overflow:hidden"></div>')

                    $("#mydiv01").append($myDiagramDiv);//重新添加

                    ShowCmd();//调用方法显示预案
                }
                else {
                    $("#mydiv01").text("未找到预案流程图");
                }
            }
            else {
                //  alert("加载失败：" + data.msg);
                $("#mydiv01").text(data.msg);
            }

        },
        error: function () {
            alert("  加载应急指挥流程图失败");

        }
    });//ajax结束

    // });//点击事件结束

}



//显示预案的结构图
function ShowCmd() {
    var $ = go.GraphObject.make;//声明对象（全局的对象）
    var myDiagram =
      $(go.Diagram, myDiagramDivId,//创建画布，
        {
            isReadOnly: true,
            initialContentAlignment: go.Spot.Center, // 中心图内容
            "draggingTool.dragsTree": true,//禁止拖动
            "undoManager.isEnabled": true, // 启用使用撤销和重做CTRL-Y
            layout: $(go.TreeLayout, // 指定一个diagram.layout安排树
                      { angle: 90, layerSpacing: 30 })
        });

    // 前面定义的模板，为模板的各个属性赋值
    myDiagram.nodeTemplate =
       $(go.Node, "Auto",
        //{ width: 80, height: 50 },// the Shape will go around the TextBlock
          { width: Audio, height: Audio },
         // { width: "Auto", height: "Auto" },
         $(go.Shape, "RoundedRectangle", { strokeWidth: 0 },
           // Shape.fill is bound to Node.data.color
           new go.Binding("fill", "color")),
         $(go.TextBlock,
           { margin: 8 },  // some room around the text
           // TextBlock.text is bound to Node.data.key
           new go.Binding("text", "text"))
       );

    // 定义一个链接模板路线正交，没有箭头
    myDiagram.linkTemplate =
      $(go.Link,
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // 链接的形状

    var model = $(go.TreeModel);
    var str = document.getElementById("mySavedModel").value;
    myDiagram.model = go.Model.fromJson(str);

}


