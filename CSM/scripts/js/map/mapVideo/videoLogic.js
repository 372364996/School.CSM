var mapVideo = {};
mapVideo.deviceCode;

$(function () {
    $("#videoDownloadDialog").dialog("close");
})
//云台控制  
//向上(鼠标按下)
mapVideo.topDown = function () {
    videoClassify.topDown(mapVideo.deviceCode);
}
//(鼠标抬起)
mapVideo.topUp = function () {
    videoClassify.topUp(mapVideo.deviceCode);
}
//右上(鼠标按下)
mapVideo.righttopDown = function () {
    videoClassify.righttopDown(mapVideo.deviceCode);
}
//(鼠标抬起)
mapVideo.righttopUp = function () {
    videoClassify.righttopUp(mapVideo.deviceCode);
}
//向右(鼠标按下)
mapVideo.rightDown = function () {
    videoClassify.rightDown(mapVideo.deviceCode);
}
//(鼠标抬起)
mapVideo.rightUp = function () {
    videoClassify.rightUp(mapVideo.deviceCode);
}
//右下(鼠标按下)
mapVideo.rightbottomDown = function () {
    videoClassify.rightbottomDown(mapVideo.deviceCode);
}
//(鼠标抬起)
mapVideo.rightbottomUp = function () {
    videoClassify.rightbottomUp(mapVideo.deviceCode);
}
//向下(鼠标按下)
mapVideo.bottomDown = function () {
    videoClassify.bottomDown(mapVideo.deviceCode);
}
//(鼠标抬起)
mapVideo.bottomUp = function () {
    videoClassify.bottomUp(mapVideo.deviceCode);
}
//左下(鼠标按下)
mapVideo.leftbottomDown = function () {
    videoClassify.leftbottomDown(mapVideo.deviceCode);
}
//(鼠标抬起)
mapVideo.leftbottomUp = function () {
    videoClassify.leftbottomUp(mapVideo.deviceCode);
}
//向左(鼠标按下)
mapVideo.leftDown = function () {
    videoClassify.leftDown(mapVideo.deviceCode);
}
//(鼠标抬起)
mapVideo.leftUp = function () {
    videoClassify.leftUp(mapVideo.deviceCode);
}
//左上(鼠标按下)
mapVideo.lefttopDown = function () {
    videoClassify.lefttopDown(mapVideo.deviceCode);
}
//(鼠标抬起)
mapVideo.lefttopUp = function () {
    videoClassify.lefttopUp(mapVideo.deviceCode);
}
//变倍放大(鼠标按下)
mapVideo.amplificationDown = function () {
    videoClassify.DoPtzZoomTeleDown(mapVideo.deviceCode);
}
//(鼠标抬起)
mapVideo.amplificationUp = function () {
    videoClassify.DoPtzZoomTeleUp(mapVideo.deviceCode);
}
//变倍缩小(鼠标按下)
mapVideo.shrinkDown = function () {
    videoClassify.DoPtzZoomWideDown(mapVideo.deviceCode);
}
//(鼠标抬起)
mapVideo.shrinkUp = function () {
    videoClassify.DoPtzZoomWideUp(mapVideo.deviceCode);
}

//调用球机预置位
//参数：预置位值（（1-255））
//说明：调用时需要VM中提前设置好预置位
mapVideo.usePresetting = function (presetValue) {
    videoClassify.usePresetting(mapVideo.deviceCode, presetValue);
}
//开始视频回放
mapVideo.startPlayback = function () {
    var deviceCode = videoClassify.getCamerCodeFromActive();//获取当前窗格的设备code
    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours();       //获取当前小时数(0-23)
    var m = myDate.getMinutes();     //获取当前分钟数(0-59)
    var s = myDate.getSeconds();
    var ss = myDate.getTime();//获取当前时间的毫秒数
    //当前时间
    var end_time = year + '-' + timeFormat(month) + "-" + timeFormat(date) + " " + timeFormat(h) + ':' + timeFormat(m) + ":" + timeFormat(s);
    var timeDifference = $("#timeDifference").text();//时间差
    //时间差毫秒数
    var timeDifferencess = timeDifference * 60 * 1000;
    var startTimeSS = ss - timeDifferencess;
    var newTime = new Date(startTimeSS);
    //获取当前年
    var newyear = newTime.getFullYear();
    //获取当前月
    var newmonth = newTime.getMonth() + 1;
    //获取当前日
    var newdate = newTime.getDate();
    var newh = newTime.getHours();       //获取当前小时数(0-23)
    var newm = newTime.getMinutes();     //获取当前分钟数(0-59)
    var news = newTime.getSeconds();
    //开始时间
    var start_time = newyear + '-' + timeFormat(newmonth) + "-" + timeFormat(newdate) + " " + timeFormat(newh) + ':' + timeFormat(newm) + ":" + timeFormat(news);
    //查询是否有回访录像
    var retStr = videoClassify.DoQueryPlayback(deviceCode, start_time, end_time);
    if (retStr == "") {
        alert("该摄像头没有录像");
        return;
    }
    //停止当前视频播放
    videoClassify.stopOnePlayVideo(windowNum);
    //停止当前视频回放
    var flag = videoClassify.DoStopplayback(windowNum);
    //开始回放
    videoClassify.Doplayback(windowNum, deviceCode, start_time, end_time);
}
//停止视频回放
mapVideo.stopPlayback = function () {

    var deviceCode = videoClassify.getCamerCodeFromActive();//获取当前窗格的设备code
    if (deviceCode == "" || deviceCode == null) {
        return;
    }
    //继续播放刚才视频
    videoClassify.onePlayVideo(windowNum, deviceCode);
}
//时间计算
function timeFormat(s) {
    return s < 10 ? '0' + s : s;
}
//视频回放加减时间
mapVideo.playbackTimeControll = function (flag) {
    var time = $("#timeDifference").text();
    if (flag == 0) {//时间加5
        var time1 = Number(time) + 5;
        $("#timeDifference").text(time1);
    } else {//时间减5
        if (time != 5) {
            var time2 = Number(time) - 5;
            $("#timeDifference").text(time2);
        }
    }
}
//视频暂停回放
mapVideo.pausePlayback = function () {
    //获取当前焦点窗格
    var windowNum = videoClassify.GetFocusFrame();
    var flag = $("#pauseContinue").attr("value");
    if (flag == 1) {//当前播放状态更换为暂停状态
        //更换暂停按钮
        $("#pauseContinue").removeClass("adjustCenter").addClass("adjustCenter adjustCenter2");
        //更改暂停title
        $("#pauseContinue").attr("title", "播放")
        //更新暂停value
        $("#pauseContinue").attr("value", 2);
        //暂停回放
        videoClassify.DopausePlayback(windowNum);
    } else {
        //更换暂停按钮
        $("#pauseContinue").removeClass("adjustCenter adjustCenter2").addClass("adjustCenter");
        //更改暂停title
        $("#pauseContinue").attr("title", "暂停")
        //更新暂停value
        $("#pauseContinue").attr("value", 1);
        //继续回放
        videoClassify.DoContinuePlayback(windowNum);
    }
}
//快退
mapVideo.retrogressPlayback = function () {
    //获取当前焦点窗格
    var windowNum = videoClassify.GetFocusFrame();
    //设置快进title为快退
    $("#advance").attr("title", "快进");
    //设置快进值为0
    $("#advance").attr("value", 0);
    var kuaitui = $("#retrogress").attr("value");
    var kuaituiNum = Number(kuaitui);
    switch (kuaituiNum) {
        case 0:
            $("#retrogress").attr("title", "快退");
            videoClassify.DoSetPlaybackSpeed(windowNum, 4);
            $("#retrogress").attr("value", 2);
            break;
        case 2:
            $("#retrogress").attr("title", "快退X2");
            videoClassify.DoSetPlaybackSpeed(windowNum, 3);
            $("#retrogress").attr("value", 4);
            break;
        case 4:
            $("#retrogress").attr("title", "快退X4");
            videoClassify.DoSetPlaybackSpeed(windowNum, 2);
            $("#retrogress").attr("value", 8);
            break;
        case 8:
            $("#retrogress").attr("title", "快退X8");
            videoClassify.DoSetPlaybackSpeed(windowNum, 1);
            $("#retrogress").attr("value", 16);
            break;
        case 16:
            $("#retrogress").attr("title", "快退X16");
            videoClassify.DoSetPlaybackSpeed(windowNum, 0);
            $("#retrogress").attr("value", 0);
            break;
    }
    //更换暂停按钮
    $("#pauseContinue").removeClass("adjustCenter adjustCenter2").addClass("adjustCenter");
    //更改暂停title
    $("#pauseContinue").attr("title", "暂停")
    //更新暂停value
    $("#pauseContinue").attr("value", 1);
}
//快进
mapVideo.advancePlayback = function () {
    //获取当前焦点窗格
    var windowNum = videoClassify.GetFocusFrame();
    //设置快退title为快退
    $("#retrogress").attr("title", "快退");
    //设置快退值为2
    $("#retrogress").attr("value", 0);
    var kuaijin = $("#advance").attr("value");
    var kuaijinNum = Number(kuaijin);
    switch (kuaijinNum) {
        case 0:
            $("#advance").attr("title", "快进");
            videoClassify.DoSetPlaybackSpeed(windowNum, 9);
            $("#advance").attr("value", 2);
            break;
        case 2:
            //document.getElementById("adjustRight").title = "快进X2";
            $("#advance").attr("title", "快进X2");
            var flag = videoClassify.DoSetPlaybackSpeed(windowNum, 10);
            $("#advance").attr("value", 4);
            break;
        case 4:
            $("#advance").attr("title", "快进X4");
            videoClassify.DoSetPlaybackSpeed(windowNum, 11);
            $("#advance").attr("value", 8);
            break;
        case 8:
            $("#advance").attr("title", "快进X8");
            videoClassify.DoSetPlaybackSpeed(windowNum, 12);
            $("#advance").attr("value", 16);
            break;
        case 16:
            $("#advance").attr("title", "快进X16");
            videoClassify.DoSetPlaybackSpeed(windowNum, 13);
            $("#advance").attr("value", 0);
            break;
    }
    //更换暂停按钮
    $("#pauseContinue").removeClass("adjustCenter adjustCenter2").addClass("adjustCenter");
    //更改暂停title
    $("#pauseContinue").attr("title", "暂停")
    //更新暂停value
    $("#pauseContinue").attr("value", 1);
}
//及时回放
mapVideo.timelyPlayback = function () {
    var deviceCode = videoClassify.getCamerCodeFromActive();//获取当前窗格的设备code
    if (deviceCode == "" || deviceCode == null) {
        return;
    }
    //判断该摄像头是否支持视频回放
    var result = false;
    $.ajax({
        url: "/DeviceInfo/GetDeviceInfoByDeviceCode",
        data: { code: deviceCode },
        type: "post",
        datatype: "json",
        async: false,
        success: function (data) {
            if (data.status == 1) {
                result = true;
                alert(data.msg);
            }
            if (data.msg == null) {
                result = true;
            }
            if (data.msg.ext1 == 0) {
                result = true;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
            result = true;
        }
    })
    if (result) {
        alert("该摄像头不支持及时回放");
        return;
    }
    var myDate = new Date();
    //获取当前年
    var year = myDate.getFullYear();
    //获取当前月
    var month = myDate.getMonth() + 1;
    //获取当前日
    var date = myDate.getDate();
    var h = myDate.getHours();       //获取当前小时数(0-23)
    var m = myDate.getMinutes();     //获取当前分钟数(0-59)
    var s = myDate.getSeconds();
    var ss = myDate.getTime();//获取当前时间的毫秒数
    //当前时间
    var end_time = year + '-' + timeFormat(month) + "-" + timeFormat(date) + " " + timeFormat(h) + ':' + timeFormat(m) + ":" + timeFormat(s);
    //时间差毫秒数
    var timeDifferencess = 5 * 60 * 1000;//设置及时回访时间为60分钟
    var startTimeSS = ss - timeDifferencess;
    var newTime = new Date(startTimeSS);
    //获取当前年
    var newyear = newTime.getFullYear();
    //获取当前月
    var newmonth = newTime.getMonth() + 1;
    //获取当前日
    var newdate = newTime.getDate();
    var newh = newTime.getHours();       //获取当前小时数(0-23)
    var newm = newTime.getMinutes();     //获取当前分钟数(0-59)
    var news = newTime.getSeconds();
    //开始时间
    var start_time = newyear + '-' + timeFormat(newmonth) + "-" + timeFormat(newdate) + " " + timeFormat(newh) + ':' + timeFormat(newm) + ":" + timeFormat(news);
    //查询是否有回访录像
    var retStr = videoClassify.DoQueryPlayback(deviceCode, start_time, end_time);
    if (retStr == "") {
        alert("该摄像头没有录像");
        return;
    }
    //停止当前视频播放
    videoClassify.stopOnePlayVideo(windowNum);
    //停止当前视频回放
    videoClassify.DoStopplayback(windowNum);
    //视频回放
    videoClassify.Doplayback(windowNum, deviceCode, start_time, end_time);

    //拖动播放到最后
    var flag = videoClassify.DoDragPlay(windowNum, 295);
    //回放倒退播放
    videoClassify.DoSetPlaybackSpeed(windowNum, 4);
}
//视频下载弹窗
mapVideo.downloadVideoDialog = function () {
    $("#videoDownloadDialog").dialog("open");
}
mapVideo.downloadVideoClose = function () {
    $("#videoDownloadDialog").dialog("close");
}
//下载视频(往下载队列中插入一条数据)
mapVideo.downloadVideoBtn = function () {

    var deviceCode = videoClassify.getCamerCodeFromActive();//获取当前窗格的设备code
    if (deviceCode == "" || deviceCode == null) {
        return;
    }
    var startTime = $("#downloadStartTime").val();
    if (startTime == "") {
        alert("请选择开始时间");
        return;
    }
    var endTime = $("#downloadEndTime").val();
    if (endTime == "") {
        alert("请选择结束时间");
        return;
    }
    $.ajax({
        url: "/Map/VideoDownload",
        data: { deviceCode: deviceCode, startTime: startTime, endTime: endTime },
        type: "post",
        async: true,
        success: function (data) {
            if (data.state == 1) {
                alert(data.message);
            }
            if (data == true) {
                alert("已加入到视频下载队列");
                mapVideo.downloadVideoClose();
            } else if (data == false) {
                alert("加入视频下载队列失败");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}

