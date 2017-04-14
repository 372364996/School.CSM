var websocket = {};
//初始化加载
$(function () {
    websocket.getWebsocketInfo();
    websocket.changeStatus();
})
//获取websocket配置信息
websocket.getWebsocketInfo = function () {
    $.ajax({
        url: "/Config/GetWebsocketInfo",
        type: "post",
        data: {},
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data.status == 0) {
                $("#websocketInput").val(data.msg.address);
                if (data.msg.status == 1) {
                    $('#websocketStatus').switchbutton({
                        checked: true,
                    })
                }
                else {
                    $('#websocketStatus').switchbutton({
                        checked: false,
                    })
                }
            }
            else {
                alert(data.msg + "\r\n" + "请重新刷新页面！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }

    })
}
//修改websocket地址信息
submitWebsocket = function () {
    var websocketServer = $("#websocketInput").val();
    $.ajax({
        url: "/Config/ChangeWebsocketServer",
        type: "post",
        data: { address: websocketServer },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg + "\r\n" + "请重新刷新页面！");
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }

    })
}

//修改websocket状态
websocket.changeStatus = function () {
    $('#websocketStatus').switchbutton({
        onChange: function (checked) {
            //打开
            if (checked == true) {
                $.ajax({
                    url: "/Config/ChangeWebsocketStatus",
                    type: "post",
                    data: { status: 1 },
                    datatype: 'json',
                    async: true,
                    success: function (data) {
                        alert(data.msg + "\r\n" + "请重新刷新页面！");
                        if (data.status != 0) {
                            $('#websocketStatus').switchbutton({
                                checked: false,
                            })
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.status + "错误请联系管理员！");
                    }

                })
            }
                //关闭
            else if (checked == false) {
                $.ajax({
                    url: "/Config/ChangeWebsocketStatus",
                    type: "post",
                    data: { status: 0 },
                    datatype: 'json',
                    async: true,
                    success: function (data) {
                        alert(data.msg + "\r\n" + "请重新刷新页面！");
                        if (data.status != 0)
                        {
                            $('#websocketStatus').switchbutton({
                                checked: true,
                            })
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.status + "错误请联系管理员！");
                    }

                })
            }
        }
    })
}
