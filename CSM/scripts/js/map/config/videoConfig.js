
$(function () {
    $("#region").change(function () {
        getVideoConfig();
    })
    getVideoConfig();
})
//初始加载视频配置
function getVideoConfig() {
    var regionId = $("#region").val();
    $.ajax({
        url: "/Config/GetVideoConfig",
        data: { regionId: regionId },
        type: "post",
        datatype: "json",
        async: false,
        success: function (data) {
            if (data.status == 1) {
                alert("获取视频配置错误:" + data.msg);
            } else {
                $("#serverIP").val(data.msg.serverIP == null ? "" : data.msg.serverIP);
                $("#userName").val(data.msg.userName == null ? "" : data.msg.userName);
                $("#userPwd").val(data.msg.userPwd == null ? "" : data.msg.userPwd);
                var playform = document.getElementById("videoPlatform");
                for (var i = 0; i < playform.length; i++) {
                    if (playform[i].value == data.msg.videoPlatform) {
                        playform[i].selected = true;
                    }
                }
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取视频配置失败,错误码"+XMLHttpRequest.status);
        }
    })
}
//修改视频配置
function updateVideoConfigCommit() {
    var regionId = $("#region").val();
    var videoPlatform = $("#videoPlatform").val();
    var serverIP = $("#serverIP").val();
    if (serverIP == "" || serverIP == null) {
        alert("请填写平台地址");
        return;
    }
    var userName = $("#userName").val();
    if (userName == "" || userName == null) {
        alert("请填写用户名");
        return;
    }
    var userPwd = $("#userPwd").val();
    if (userPwd == "" || userPwd == null) {
        alert("请填写密码");
        return;
    }
    $.ajax({
        url: "/Config/UpdateVideoConfig",
        data: { videoPlatform: videoPlatform, serverIP: serverIP, userName: userName, userPwd: userPwd,regionId:regionId },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data) {
                alert("修改成功");
            } else {
                alert("修改失败");
            }
        },
        error: function (data) {
            alert(data.responseText);
        }
    })
}