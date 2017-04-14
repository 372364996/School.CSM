var interfaces = {}
$(function () {
    interfaces.getWebsocketInfo();
})

//获取websocket配置信息
interfaces.getWebsocketInfo = function () {
    $.ajax({
        url: "/Config/GetInterfaceAddress",
        type: "post",
        data: {},
        datatype: 'json',
        async: true,
        success: function (data) {
            if (data.status == 0) {
                $("#interfaceInput").val(data.msg);
            }
            else {
                alert(data.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }

    })
}
//修改websocket地址信息
submitInterfaceAddress = function () {
    var address = $("#interfaceInput").val();
    $.ajax({
        url: "/Config/UpdateInterfaceAddress",
        type: "post",
        data: { address: address },
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
