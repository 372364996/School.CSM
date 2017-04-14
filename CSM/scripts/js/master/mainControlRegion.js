$(document).ready(function () {
    //var cookies = $.cookie();
    //var cookiesRegionName = $.cookie('mainControlRegionName');
    //$("#currentMainControlRegion").html(cookiesRegionName);
    var regionId = $.cookie("mainControlRegionId");
    var regionModel = document.getElementsByName("mainControlRegion");
    var regionName;
    for (var i = 0; i < regionModel.length; i++) {
        if (regionModel[i].value == regionId) {
            regionModel[i].checked = true;
            regionName = regionModel[i].attributes["mainControlRegionName"].value;
        }
    }
    $("#currentMainControlRegion").text(regionName);
    //var t1=window.setInterval(keepAliveSession, 10000);//定时执行保活session
    keepAliveSession();
});

//设置主控园区的单击按钮
function btnOkSetMainControlRegion() {
    if (!confirm("确定设置主控园区吗？")) {
        return;
    }
    var regionid = $("input[name='mainControlRegion']:checked").val();
    var regionCode = $("input[name='mainControlRegion']:checked").attr("mainControlRegionCode");
    var regionName = $("input[name='mainControlRegion']:checked").attr("mainControlRegionName");
    if (!regionid) {
        alert("请您选择一个园区，再设置主控园区！");
        return;
    }
    else {
        $.cookie('mainControlRegionId', regionid, { path: '/' });
        alert("设置主控园区成功！");
        //window.location.reload();
        var currentHtml = window.location.href;
        if (currentHtml.indexOf('/map/Index') != -1) {
            window.location.href = "/map/Index";
        }
        else {
            window.location.reload();
        }

        $(".starts-frame").hide();
    }
}

//session保活
function keepAliveSession() {
    $.ajax({
        url: "/Map/keepAliveSession",
        data: {},
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            setTimeout(keepAliveSession, 1200000);
        },
        error: function (error) {
            alert("session保活失败错误码" + error.status + "请联系管理员");
        }
    })
}