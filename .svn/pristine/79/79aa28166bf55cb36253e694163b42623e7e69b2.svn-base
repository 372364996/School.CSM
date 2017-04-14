var videoClassify = {};

//初始化登录视频平台
videoClassify.initLogin = function () {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.InitPage();
            if (flag != 0) {
                alert("初始化登录控件失败错误码:"+flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//登出
videoClassify.DoLogout = function () {
    switch (definedVideoPlatform) {
        case 1://宇视
            videoActiveX.DoLogout();
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//多路视频播放
//参数:code数组
videoClassify.playVideo = function (codeArry) {
    switch (definedVideoPlatform) {
        case 1://宇视
            videoClassify.stopPlayVideo();
            //确定打开窗格数
            var windowNum = codeArry.length == 1 ? 1 : codeArry.length <= 4 ? 4 : codeArry.length <= 9 ? 9 : codeArry.length <= 16 ? 16 : 25;
            videoClassify.ChangeWindow(windowNum);//改变视频窗格
            for (var i = 1; i <= codeArry.length; i++) {
                var flag = videoActiveX.DoStartPlayOne(i, codeArry[i - 1]);//播放视频
                if (flag != 0) {
                    alert("第"+i+"窗格播放实况失败,错误码:" + flag);
                }
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//单路播放
videoClassify.onePlayVideo = function (windowNum, deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag1 = videoActiveX.DoStopPlay(windowNum);
            if (flag1 != 0) {
                alert("停止实况失败,错误码:" + flag1);
            }
            var flag= videoActiveX.DoStartPlayOne(windowNum, deviceCode);
            if (flag != 0) {
                alert("第"+windowNum+"窗格播放实况失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
    
}
//停止播放所有窗格的视频
videoClassify.stopPlayVideo = function () {
    switch (definedVideoPlatform) {
        case 1://宇视
            for (var i = 0; i < 25; i++) {
                var flag=videoActiveX.DoStopPlay(i + 1);
                if (flag != 0) {
                    alert("第"+(i+1)+"窗格停止实况失败,错误码:" + flag);
                }
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//停止播放一路视频
videoClassify.stopOnePlayVideo = function (winNum) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.DoStopPlay(winNum);
            if (flag != 0) {
                alert("第"+winNum+"窗格停止实况失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//开始视频回放
videoClassify.Doplayback = function (frameNum, deviceCode, start_time, end_time) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.Doplayback(frameNum, deviceCode, start_time, end_time);
            if (flag != 0) {
                alert("回放失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//暂停视频回放
videoClassify.DopausePlayback = function (frameNum) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag=videoActiveX.DopausePlayback(frameNum);
            if (flag != 0) {
                alert("暂停回放失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//继续视频回放
videoClassify.DoContinuePlayback = function (frameNum) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.DoContinuePlayback(frameNum);
            if (flag != 0) {
                alert("继续回放视频失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//设置回访速度
videoClassify.DoSetPlaybackSpeed = function (frameNum, playSpeed) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.DoSetPlaybackSpeed(frameNum, playSpeed);
            if (flag != 0) {
                alert("设置回放速度失败,错误码:" = flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//停止视频回放
videoClassify.DoStopplayback = function (winNum) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.DoStopplayback(winNum);
            if (flag != 0) {
                alert("停止视频回放失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//拖动播放
//参数：播放窗格号，播放位置（单位秒）
videoClassify.DoDragPlay = function (frameNum, timePos) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.DoDragPlay(frameNum, timePos);
            if (flag != 0) {
                alert("拖动到指定位置播放失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//改变视窗格数
videoClassify.ChangeWindow = function (windowNum) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.ChangeWindow(windowNum);
            if (flag != 0) {
                alert("改变窗格数失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//获取焦点窗格
//返回窗格号
videoClassify.GetFocusFrame = function () {
    switch (definedVideoPlatform) {
        case 1://宇视
            var windowNum = videoActiveX.GetFocusFrame();
            return windowNum;
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//获取窗格信息
//返回xml字符串
videoClassify.DoQueryFrameInfo = function (windowNum) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var frameInfoXml = videoActiveX.DoQueryFrameInfo(windowNum);
            return frameInfoXml;
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//查询是否有回放录像
//返回空表示没有
videoClassify.DoQueryPlayback = function (deviceCode, start_time, end_time) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var retStr = videoActiveX.DoQueryPlayback(deviceCode, start_time, end_time);
            return retStr;
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//将xml转换成对象
videoClassify.LoadXML = function (xmlString) {
    var xmlDoc = null;
    var xmlDomVersions = ['MSXML.2.DOMDocument.6.0', 'MSXML.2.DOMDocument.3.0', 'Microsoft.XMLDOM'];
    for (var i = 0; i < xmlDomVersions.length; i++) {
        try {
            xmlDoc = new ActiveXObject(xmlDomVersions[i]);
            xmlDoc.async = false;
            xmlDoc.loadXML(xmlString);
            break;
        } catch (e) {
        }
    }
    return xmlDoc;
}
//云台控制  
//向上(鼠标按下)
videoClassify.topDown = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 1026, 9, 9);
            if (flag != 0) {
                alert("云台控制失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
    
}
//(鼠标抬起)
videoClassify.topUp = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 1025, 9, 9);
            if (flag != 0) {
                alert("云台控制失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//右上(鼠标按下)
videoClassify.righttopDown = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 2050, 9, 9);
            if (flag != 0) {
                alert("云台控制失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//(鼠标抬起)
videoClassify.righttopUp = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 2049, 9, 9);
            if (flag != 0) {
                alert("云台控制失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//向右(鼠标按下)
videoClassify.rightDown = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 1282, 9, 9);
            if (flag != 0) {
                alert("云台控制失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//(鼠标抬起)
videoClassify.rightUp = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 1281, 9, 9);
            if (flag != 0) {
                alert("云台控制失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//右下(鼠标按下)
videoClassify.rightbottomDown = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 2052, 9, 9);
            if (flag != 0) {
                alert("云台控制失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//(鼠标抬起)
videoClassify.rightbottomUp = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 2051, 9, 9);
            if (flag != 0) {
                alert("云台控制失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//向下(鼠标按下)
videoClassify.bottomDown = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 1028, 9, 9);
            if (flag != 0) {
                alert("云台控制失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//(鼠标抬起)
videoClassify.bottomUp = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 1027, 9, 9);
            if (flag != 0) {
                alert("云台控制失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//左下(鼠标按下)
videoClassify.leftbottomDown = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 1796, 9, 9);
            if (flag != 0) {
                alert("云台控制失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//(鼠标抬起)
videoClassify.leftbottomUp = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 1795, 9, 9);
            if (flag != 0) {
                alert("云台控制失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//向左(鼠标按下)
videoClassify.leftDown = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 1284, 9, 9);
            if (flag != 0) {
                alert("云台控制失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//(鼠标抬起)
videoClassify.leftUp = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 1283, 9, 9);
            if (flag != 0) {
                alert("云台控制失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//左上(鼠标按下)
videoClassify.lefttopDown = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 1794, 9, 9);
            if (flag != 0) {
                alert("云台控制失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//(鼠标抬起)
videoClassify.lefttopUp = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 1793, 9, 9);
            if (flag != 0) {
                alert("云台控制失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//变倍放大(鼠标按下)
videoClassify.amplificationDown = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 770, 9, 9);
            if (flag != 0) {
                alert("变倍失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//(鼠标抬起)
videoClassify.amplificationUp = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 769, 9, 9);
            if (flag != 0) {
                alert("变倍失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//变倍缩小(鼠标按下)
videoClassify.shrinkDown = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 772, 9, 9);
            if (flag != 0) {
                alert("变倍失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//变倍缩小(鼠标抬起)
videoClassify.shrinkUp = function (deviceCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.sendPtzCtrlCommand(deviceCode, 771, 9, 9);
            if (flag != 0) {
                alert("变倍失败,错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//调用球机预置位
//参数：deviceCode:设备编码  presetValue:预置位值（（1-255））
//说明：调用时需要VM中提前设置好预置位
videoClassify.usePresetting = function (deviceCode,presetValue) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var flag = videoActiveX.DoUsePtzPreset(deviceCode, presetValue);
            if (flag != 0) {
                alert("调用预置位失败:错误码:" + flag);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//摄像头上大屏
//参数：pcMonitorCode大屏编码
//pcCamCode：摄像头编码
videoClassify.StartMonitorLive = function (pcMonitorCode, pcCamCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var result = videoActiveX.StartMonitorLive(pcMonitorCode, pcCamCode);
            if (result != 0) {
                alert("设备上大屏失败，错误码：" + result);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//停止上大屏
//参数：大屏编码
videoClassify.StopMonitorLive = function (pcMonitorCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var result = videoActiveX.StopMonitorLive(pcMonitorCode);
            if (result != 0) {
                alert("停止上大屏失败，错误码：" + result);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//添加上大屏论切资源
//参数：轮切名称switchName
//设备数组deviceArray---数据类型[{CameraCode:"hic2621de-8150_1",CameraName:"逸夫楼大厅入",Interval:"10"}](CameraCode为摄像头编码，CameraName为摄像头名称，Interval：轮切间隔时间)
//返回值:宇视返回轮切资源编码
videoClassify.AddSwitchResource = function (switchName, deviceArray) {
    var result;
    switch (definedVideoPlatform) {
        case 1://宇视
            var pcSwitchResInfo = "<?xml version=\"1.0\" ?><data><SwitchBaseInfo><SwitchName>" + switchName + "</SwitchName><SwitchDesc /></SwitchBaseInfo><SwitchResNum>" + deviceArray.length + "</SwitchResNum><SwitchUnitList count=\"" + deviceArray.length + "\">";
            for (var i = 0; i < deviceArray.length; i++) {
                pcSwitchResInfo += "<item><CameraCode>" + deviceArray[i].CameraCode + "</CameraCode><CameraName>" + deviceArray[i].CameraName + "</CameraName><Sequence>" + (i + 1) + "</Sequence><Interval>" + deviceArray[i].Interval + "</Interval></item>";
            }
            pcSwitchResInfo += "</SwitchUnitList></data>";
            result = videoActiveX.AddSwitchResource("iccsid", pcSwitchResInfo);
            if (result == "") {
                alert("添加视频上大屏轮切资源失败");
            }
            return result;
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
    return result;
}
//查询大屏论切资源信息
//参数：pcSwitchCode轮切资源编码
//返回值：switchResArray{witchName:"名称",SwitchCarmeraArray:[{CameraCode:"设备编码",CameraName:"设备名称",Interval:"间隔时间"}]}
videoClassify.QuerySwitchResource = function (pcSwitchCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var result = videoActiveX.QuerySwitchResource(pcSwitchCode);
            if (result == "") {
                alert("查询大屏论切资源信息失败");
                return;
            }
            var switchResArray = {};
            var switchCarmeraArray = new Array();
            var xmldoc = videoClassify.LoadXML(result);
            var SwitchName = xmldoc.getElementsByTagName("SwitchName")[0].firstChild.nodeValue;//轮切组名称
            var elements = xmldoc.getElementsByTagName("item");
            for (var i = 0; i < elements.length; i++) {
                var carmera = {};
                carmera.CameraCode = elements[i].getElementsByTagName("CameraCode")[0].firstChild.nodeValue;//设备编码
                carmera.CameraName = elements[i].getElementsByTagName("CameraName")[0].firstChild.nodeValue;//设备名称
                carmera.Interval = elements[i].getElementsByTagName("Interval")[0].firstChild.nodeValue;//轮切间隔时间
                switchCarmeraArray.push(carmera);
            }
            switchResArray.SwitchName = SwitchName;
            switchResArray.SwitchCarmeraArray = switchCarmeraArray;
            return switchResArray;
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//修改大屏轮切资源信息
//参数：pcResCode轮切资源编码
//switchName轮切名称
//deviceArray设备数组deviceArray---数据类型[{CameraCode:"hic2621de-8150_1",CameraName:"逸夫楼大厅入",Interval:"10"}](CameraCode为摄像头编码，CameraName为摄像头名称，Interval：轮切间隔时间)
videoClassify.ModifySwitchResource = function (pcResCode, switchName, deviceArray) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var pcSwitchResInfo = "<?xml version=\"1.0\" ?><data><SwitchBaseInfo><SwitchName>" + switchName + "</SwitchName><SwitchDesc /></SwitchBaseInfo><SwitchResNum>" + deviceArray.length + "</SwitchResNum><SwitchUnitList count=\"" + deviceArray.length + "\">";
            for (var i = 0; i < deviceArray.length; i++) {
                pcSwitchResInfo += "<item><CameraCode>" + deviceArray[i].CameraCode + "</CameraCode><CameraName>" + deviceArray[i].CameraName + "</CameraName><Sequence>" + (i + 1) + "</Sequence><Interval>" + deviceArray[i].Interval + "</Interval></item>";
            }
            pcSwitchResInfo += "</SwitchUnitList></data>";
            var result = videoActiveX.ModifySwitchResource(pcResCode, pcSwitchResInfo);
            if (result != 0) {
                alert("修改大屏轮切资源信息失败，错误码：" + result);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//删除大屏轮切资源
//参数：大屏轮切资源编码（添加资源的时候返回的）
videoClassify.DelSwitchResource = function (pcResCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var result = videoActiveX.DelSwitchResource(pcResCode);
            if (result != 0) {
                alert("删除大屏轮切资源失败，错误码：" + result);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//启动大屏轮切
//参数：pcMonitorCode大屏编码
//pcSwitchResCode轮切资源编码
videoClassify.StartMonitorSwitch = function (pcMonitorCode, pcSwitchResCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var result = videoActiveX.StartMonitorSwitch(pcMonitorCode, pcSwitchResCode);
            if (result != 0) {
                alert("启动大屏轮切失败，错误码：" + result);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//停止大屏轮切
//pcMonitorCode 监视器编码
videoClassify.StopMonitorSwitch = function (pcMonitorCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var result = videoActiveX.StopMonitorSwitch(pcMonitorCode);
            if (result != 0) {
                alert("启动大屏轮切失败，错误码：" + result);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
////启动窗格轮切
//参数: [IN] ulFrameID 窗格序号（1-25）
//[IN] pcSwitchResCode 轮切资源编码
//返回：成功:0
//失败：具体错误码，参考附件说明
videoClassify.StartFrameSwitch = function (ulFrameID, pcSwitchResCode) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var result = videoActiveX.StartFrameSwitch(ulFrameID, pcSwitchResCode);
            if (result != 0) {
                alert("启动窗格轮切失败，错误码：" + result);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//停止窗格轮切
//参数: [IN] ulFrameID 窗格序号（1-25）
//返回：成功: 0
//失败：具体错误码，参考附件说明
videoClassify.StopFrameSwitch = function (ulFrameID) {
    switch (definedVideoPlatform) {
        case 1://宇视
            var result = videoActiveX.StopFrameSwitch(ulFrameID);
            if (result != 0) {
                alert("停止窗格轮切失败，错误码：" + result);
            }
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//查询资源列表
videoClassify.QueryOrgResList = function (resType, resSubType, lowStart, pageSize) {
    switch (definedVideoPlatform) {
        case 1://宇视
           return videoActiveX.QueryOrgResList("iccsid", resType, resSubType, pageStart, pageSize);
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}
//获取当前选中窗格中播放视频的code
//返回设备编码
videoClassify.getCamerCodeFromActive = function () {
    switch (definedVideoPlatform) {
        case 1://宇视
            //获取当前焦点窗格
            var windowNum = videoClassify.GetFocusFrame();
            //获取窗格信息
            var frameInfoXml = videoClassify.DoQueryFrameInfo(windowNum);
            var frameInfoObj = videoClassify.LoadXML(frameInfoXml);//将xml转换成对象
            var elements = frameInfoObj.getElementsByTagName("CameraCode");
            if (elements.length == 0) {
                alert("当前窗体未播放视频");
                return;
            }
            var deviceCode = elements[0].firstChild.nodeValue;//获取当前窗格的设备code
            return deviceCode;
            break;
        case 2://海康
            break;
        case 3://博世
            break;
    }
}