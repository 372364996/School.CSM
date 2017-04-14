var videoActiveX = {};
videoActiveX.g_imosActivePlayer = null;//控件对象
videoActiveX.g_xmlActive = null;//服务器id
videoActiveX.serverIP = serverIP;//服务器地址
videoActiveX.port = "8800";//端口号
videoActiveX.userName = userName;//用户名
videoActiveX.pwd = userPwd;//密码

//初始化控件
videoActiveX.InitPage = function (autologin) {
    videoActiveX.g_imosActivePlayer = document.getElementById('h3c_IMOS_ActiveX');
    
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    if (autologin == true) {
        var flag = videoActiveX.DoLogin();
        if (flag == 0) {
            alert("视频控件登陆失败");
        }
        return flag;
    }
}
//ActiveX登录
//返回值:失败=0
videoActiveX.DoLogin = function () {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    videoActiveX.g_xmlActive = videoActiveX.g_imosActivePlayer.LogOnServer(videoActiveX.serverIP, videoActiveX.userName, videoActiveX.pwd);
    videoActiveX.IsShowTimeLine(false);//隐藏控件下册时间工具栏
    return videoActiveX.g_xmlActive;
}
//ActiveX登出
//返回值：0表示失败；1表示成功
videoActiveX.DoLogout = function () {
    var flag = 0;
    if (videoActiveX.g_imosActivePlayer) {
        flag = videoActiveX.g_imosActivePlayer.LogoffServer(videoActiveX.g_xmlActive);
    }
    return flag;
}
//视频播放
//参数: 播放窗格INT类型（1-25）
//返回值:错误=0
videoActiveX.DoStartPlayOne = function (frameNum, devicecode) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    //根据deviceCode获取设备id
    var deviceId = videoActiveX.GetCameraIDByGUID(devicecode);
    if (deviceId == 0) {
        alert("获取摄像头id失败");
        return;
    }
    var flag = 0;
    try {
        flag = videoActiveX.g_imosActivePlayer.OpenLiveWithWndNum(deviceId, frameNum - 1);
    } catch (e) {

    }
    if (flag == 0) {
        alert("播放失败");
    }
    return flag;
}
//停止视频播放
//参数；播放窗格INT类型（1-25）
videoActiveX.DoStopPlay = function (frameNum) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    videoActiveX.g_imosActivePlayer.CloseViewWithWndNum(frameNum - 1)
}
//根据摄像机GUID(设备编码code)获取摄像机ID
videoActiveX.GetCameraIDByGUID = function (guid) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var flag = videoActiveX.g_imosActivePlayer.GetCameraIDByGUIDString(videoActiveX.g_xmlActive, guid);
    return flag;
}
//更改窗格布局
//参数：1：一个窗口 2：4个窗口  3：9个窗口 （默认为一个） 没有返回值
videoActiveX.ChangeWindow = function (num) {
    var framNum = 1;
    switch (num) {
        case 4:
            framNum = 2;
            break;
        case 9:
            framNum = 3;
            break;
        case 16:
            alert("最多只能播放9路视频");
            framNum = 3;
            break;
        case 25:
            alert("最多只能播放9路视频");
            framNum = 3;
            break;
    }
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var flag = videoActiveX.g_imosActivePlayer.SetViewWndMode(framNum);
}

//是否显示录像下方的时间条
//参数  显示：true;隐藏：false
videoActiveX.IsShowTimeLine = function (show) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var flag = videoActiveX.g_imosActivePlayer.ShowRecordTimeLine(show);
    return flag;
}
//获取当前焦点窗口
//返回值：返回当前焦点窗格序号（0-8）
videoActiveX.GetFocusFrame = function () {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var windowNum = videoActiveX.g_imosActivePlayer.GetCurFocusWndNum();
    return windowNum + 1;
}
//查询资源列表
videoActiveX.resList = new Array();
videoActiveX.QueryOrgResListEx = function () {
    //查询第一个节点（根节点）
    videoActiveX.g_imosActivePlayer.GetFirstNodeForJS(videoActiveX.g_xmlActive);
    //递归查询资源
    videoActiveX.GetNodes(videoActiveX.g_imosActivePlayer.lNodeID, videoActiveX.g_imosActivePlayer.sNodeType, videoActiveX.g_imosActivePlayer.sNodeStatus);
    return videoActiveX.resList
}
//递归查询所有的子节点
//参数：nodeID--节点id
//      nodeType--节点类型
//      nodeStatus--节点状态
videoActiveX.GetNodes = function (nodeID, nodeType, nodeStatus) {
    if (nodeStatus == 1) {
        if (nodeType == 3) {
            var DevicInfo = new Object();
            DevicInfo.devicName = videoActiveX.g_imosActivePlayer.varNodeName;
            DevicInfo.devicCode = videoActiveX.g_imosActivePlayer.varNodeGUID;
            DevicInfo.devicStatus = videoActiveX.g_imosActivePlayer.sNodeStatus;
            DevicInfo.devicType = videoActiveX.g_imosActivePlayer.sNodeType;
            DevicInfo.havePtz = videoActiveX.g_imosActivePlayer.bHavePtz;
            videoActiveX.resList.push(DevicInfo);
        }
    }
    //判断是否存在下级节点
    if (videoActiveX.g_imosActivePlayer.GetFirstChildNodeForJS(nodeID)) {
        videoActiveX.GetNodes(videoActiveX.g_imosActivePlayer.lNodeID, videoActiveX.g_imosActivePlayer.sNodeType, videoActiveX.g_imosActivePlayer.sNodeStatus)
    }
    ///判断是否存在同级节点
    if (videoActiveX.g_imosActivePlayer.GetNextNodeForJS(nodeID)) {
        videoActiveX.GetNodes(videoActiveX.g_imosActivePlayer.lNodeID, videoActiveX.g_imosActivePlayer.sNodeType, videoActiveX.g_imosActivePlayer.sNodeStatus)
    }
}