var led = {};

//发送消息
led.sendMessage = function () {
    //var regionCode = $('#regionSelect option:selected').val();
    var regionCode = $(':radio[name="mainControlRegion"]:checked').attr("mainControlRegionCode");
    //var location = $('#locationSelect option:selected').val();
    var location = 1;
    if (regionCode == undefined || regionCode == null) {
        alert("请选择园区！");
        return;
    }
    var content = $("#messageMarquee").html();
    $.ajax({
        url: "/Config/SendLEDMessage",
        type: "post",
        data: { regionCode: regionCode, location: location, content: content },
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
//恢复默认
led.sendDefault = function () {
   // var regionCode = $('#regionSelect option:selected').val();
    var regionCode = $(':radio[name="mainControlRegion"]:checked').attr("mainControlRegionCode");
    // var location = $('#locationSelect option:selected').val();
    var location = 1;
    if (regionCode == undefined || regionCode == null) {
        alert("请选择园区！");
        return;
    }
    var content = "$$";
    $.ajax({
        url: "/Config/SendLEDMessage",
        type: "post",
        data: { regionCode: regionCode, location: location, content: content },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
    $("#ledMsgInput").val("");
    $("#messageMarquee").val("");
}