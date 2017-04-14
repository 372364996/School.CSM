//修改默认行业
function submitIndustryDefined() {
    var industryID = $("#industryDefault").children('option:selected').val();//这就是selected的值
    var industryName = $("#industryDefault").children('option:selected').text();//这就是selected的值
    $.ajax({
        url: "/Config/SetIndustryDefault",
        data: { industryID: industryID },
        type: "post",
        datatype: "json",
        async: false,
        success: function (data) {
            if (data.status == 1) {
                alert("修改默认行业配置错误:"+data.msg);
                return;
            } else {
                if (data.msg) {
                    alert("修改成功");
                    $("#nowIndustry").text(industryName);
                } else {
                    alert("修改失败");
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("修改默认行业出现"+XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}

//修改视频平台
function submitVideoPlatform() {
    var videoPlatformID = $("#videoPlatformDefault").children('option:selected').val();//这就是selected的值
    var videoPlatformName = $("#videoPlatformDefault").children('option:selected').text();//这就是selected的值
    $.ajax({
        url: "/Config/submitVideoPlatform",
        data: { videoPlatformID: videoPlatformID },
        type: "post",
        datatype: "json",
        async: false,
        success: function (data) {
            if (data.state == 1) {
                alert(data.message);
                return;
            }
            if (data) {
                alert("修改成功");
                $("#videoPlatform").text(videoPlatformName);
            } else {
                alert("修改失败");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}