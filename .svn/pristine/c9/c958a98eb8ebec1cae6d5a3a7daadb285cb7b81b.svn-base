var videoActiveX = {};
videoActiveX.g_imosActivePlayer = null;//控件对象
videoActiveX.g_xmlActive = null;//xml对象
videoActiveX.serverIP = serverIP;//服务器地址
videoActiveX.port = "8800";//端口号
videoActiveX.userName = userName;//用户名
videoActiveX.pwd = userPwd;//密码

//Active控件初始化
//参数：自动登录=true;
//返回值:正常=0
videoActiveX.InitPage = function () {
    videoActiveX.g_imosActivePlayer = document.all.h3c_IMOS_ActiveX;
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    } else {
        var xmldoc;
        xmldoc = new ActiveXObject("Microsoft.XMLDOM");
        if (!xmldoc) {
            xmldoc = new ActiveXObject("MSXML2.DOMDocument.3.0");
        }
        videoActiveX.g_xmlActive = xmldoc;
        if (!videoActiveX.g_xmlActive) {
            alert("xml解析器获取错误，将导致某些功能不可用");
            return;
        }
        else {
            videoActiveX.g_xmlActive.async = "false";
        }
        //登录
        var flag = videoActiveX.DoLogin();
        var tcp = videoActiveX.g_imosActivePlayer.IMOSAX_SetSingleCfgParam('DataTransProtocol', '1');
        var tcpstream = videoActiveX.g_imosActivePlayer.IMOSAX_SetSingleCfgParam('StreamTransProtocol', '1');
        return flag;
    }
}

//设置控件属性
//参数:XML格式的控件基本属性（窗格，颜色，选中线框颜色）
//返回值:正常=0
videoActiveX.SetAttributeParam = function (setxml) {
    var flag = videoActiveX.g_imosActivePlayer.IMOSAX_SetAttributeParam(setxml);
    return flag;
}
//ActiveX登录
//返回值:正常=0
videoActiveX.DoLogin = function () {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var flag = videoActiveX.g_imosActivePlayer.IMOSAX_InitOCX(videoActiveX.serverIP, videoActiveX.port, videoActiveX.userName, videoActiveX.pwd, 1);
    return flag;
}

//ActiveX登出
videoActiveX.DoLogout = function () {
    var flag = 1;
    if (videoActiveX.g_imosActivePlayer) {
        flag = videoActiveX.g_imosActivePlayer.IMOSAX_UnregOCX();
    }
    return flag;
}

//视频播放
//参数: 播放窗格INT类型（1-25）
//返回值:正常=0
videoActiveX.DoStartPlayOne = function (frameNum, devicecode) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var flag = 1;
    try {
        flag = videoActiveX.g_imosActivePlayer.IMOSAX_StartFrameLive(frameNum, devicecode);
    } catch (e) {

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
    return videoActiveX.g_imosActivePlayer.IMOSAX_StopFrameLive(frameNum);
}
//获取当前焦点窗口
//返回值：返回当前焦点窗格序号（1-25）
videoActiveX.GetFocusFrame = function () {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var windowNum = videoActiveX.g_imosActivePlayer.IMOSAX_GetFocusFrame();
    return windowNum;
}
//更改窗格布局
videoActiveX.ChangeWindow = function (num) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var flag = videoActiveX.g_imosActivePlayer.IMOSAX_ChangeLayout(num);
    return flag;
}


//云台控制
//参数: [IN] strCamCode 摄像机编码
//[IN] ulPtzCmd 云台控制命令枚举
//[IN] ulPtzCmdPara1 用于速度时取值（1-9）
//[IN] ulPtzCmdPara2 用于速度时取值（1-9）
videoActiveX.sendPtzCtrlCommand = function (strCamCode, ulPtzCmd, ulPtzCmdPara1, ulPtzCmdPara2) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var flag = videoActiveX.g_imosActivePlayer.IMOSAX_SendPtzCtrlCommand(strCamCode, ulPtzCmd, ulPtzCmdPara1, ulPtzCmdPara2, 0)
    return flag;
}

//调用云台预置位
videoActiveX.DoUsePtzPreset = function (deviceCode, presetValue) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var flag = videoActiveX.g_imosActivePlayer.IMOSAX_UsePtzPreset(deviceCode, presetValue);
    return flag;
}
//查询是否有回放录像
videoActiveX.DoQueryPlayback = function (deviceCode, start_time, end_time) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var retStr = videoActiveX.g_imosActivePlayer.IMOSAX_QueryRecord(deviceCode, start_time, end_time);
    return retStr;
}
//视频回放
videoActiveX.Doplayback = function (frameNum, deviceCode, start_time, end_time) {
    var flag = videoActiveX.g_imosActivePlayer.IMOSAX_StartVodReplay(frameNum, deviceCode, start_time, end_time);
    return flag;
}
//暂停视频回放
videoActiveX.DopausePlayback = function (frameNum) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var flag = videoActiveX.g_imosActivePlayer.IMOSAX_PauseReplay(frameNum);
    return flag;
}
//继续视频回放
videoActiveX.DoContinuePlayback = function (frameNum) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var flag = videoActiveX.g_imosActivePlayer.IMOSAX_ResumeReplay(frameNum);
    return flag;
}
//停止视频回放
videoActiveX.DoStopplayback = function (frameNum) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var flag = videoActiveX.g_imosActivePlayer.IMOSAX_StopReplay(frameNum);
    return flag;
}
//获取当前窗格信息
videoActiveX.DoQueryFrameInfo = function (frameNum) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var strXml = videoActiveX.g_imosActivePlayer.IMOSAX_GetFrameInfo(frameNum);
    return strXml;
}
//设置回访速度
//0 /**< 16倍速后退播放*/
//1 /**< 8倍速后退播放*/
//2 /**< 4倍速后退播放*/
//3 /**< 2倍速后退播放*/
//4 /**< 正常速度后退播放*/
//5 /**< 1/2倍速后退播放*/
//6/**< 1/4倍速后退播放*/
//7 /**< 1/4倍速播放*/
//8 /**< 1/2倍速播放*/
//9 /**< 正常速度前进播放*/
//10 /**< 2倍速前进播放*/
//11 /**< 4倍速前进播放*/
//12 /**< 8倍速前进播放*/
//13 /**< 16倍速前进播放*/
videoActiveX.DoSetPlaybackSpeed = function (frameNum, playSpeed) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var flag = videoActiveX.g_imosActivePlayer.IMOSAX_SetPlaySpeed(frameNum, playSpeed);
    return flag;
}
//拖动播放
//参数：播放窗格号，播放位置（单位秒）
videoActiveX.DoDragPlay = function (frameNum, timePos) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var flag = videoActiveX.g_imosActivePlayer.IMOSAX_DragPlay(frameNum, timePos);
    return flag;
}

//查询资源列表
//参数: [IN] strOrgCode 资源父组织编码
//[IN] strXmlQueryCondition 查询条件
//[IN] strXmlQueryPageInfo 查询分页信息
//返回：xml
videoActiveX.QueryOrgResListEx = function (orgCode, DeviceType, pageIndex, pageSize) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var condition = '<?xml version="1.0" ?><data><ItemNum>2</ItemNum><QueryConditionList count="2">' +
        '<item><QueryType>256</QueryType><LogicFlag>0</LogicFlag><QueryData>' + DeviceType + '</QueryData></item>' +
        '<item><QueryType>1</QueryType><LogicFlag>6</LogicFlag><QueryData/></item>' +
        '</QueryConditionList></data>';
    var pagexml = '<?xml version="1.0" ?><data><PageRowNum>' + pageSize + '</PageRowNum><PageFirstRowNumber>' + pageIndex + '</PageFirstRowNumber><QueryCount>1</QueryCount></data>';
    var strXml = videoActiveX.g_imosActivePlayer.IMOSAX_QueryOrgResListEx(orgCode, condition, pagexml);
    return strXml;
}
//查询咨询
//参数：orgCode：组织编码
//resType：资源类型
//resSubType：资源子类型
//lowStart：起始行数
//pageSize：每页的记录个数
videoActiveX.QueryOrgResList = function (orgCode, resType, resSubType, lowStart, pageSize) {
    var strxml = videoActiveX.g_imosActivePlayer.IMOSAX_QueryOrgResList(orgCode, resType, resSubType, lowStart, pageSize);
    return strxml;
}

//启动上大屏(一个大屏对应一个摄像头)
//参数：[IN] pcMonitorCode 监视器编码
//[IN] pcCamCode 摄像机编码
//返回：成功返回0
//失败：具体错误码，参考附件说明
videoActiveX.StartMonitorLive = function (pcMonitorCode, pcCamCode) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    return videoActiveX.g_imosActivePlayer.IMOSAX_StartMonitorLive(pcMonitorCode, pcCamCode);
}
//停止上大屏
//参数: [IN] pcMonitorCode 监视器编码
videoActiveX.StopMonitorLive = function (pcMonitorCode) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    return videoActiveX.g_imosActivePlayer.IMOSAX_StopMonitorLive(pcMonitorCode);
}
//启动上大屏轮切
//参数: [IN] pcMonitorCode 监视器编码
//[IN] pcSwitchResCode 轮切资源编码
//返回：成功返回0
videoActiveX.StartMonitorSwitch = function (pcMonitorCode, pcSwitchResCode) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    return videoActiveX.g_imosActivePlayer.IMOSAX_StartMonitorSwitch(pcMonitorCode, pcSwitchResCode);
}
//停止上大屏轮切
//参数: [IN] pcMonitorCode 监视器编码
//返回：成功返回0
videoActiveX.StopMonitorSwitch = function (pcMonitorCode) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    return videoActiveX.g_imosActivePlayer.IMOSAX_StopMonitorSwitch(pcMonitorCode);
}
//查询上大屏轮切资源
//参数: [IN] pcSwitchCode 轮切资源编码
//返回：轮切资源信息，xml格式
videoActiveX.QuerySwitchResource = function (pcSwitchCode) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    var strXml = videoActiveX.g_imosActivePlayer.IMOSAX_QuerySwitchResource(pcSwitchCode);
    return strXml;
}
//添加上大屏轮切资源信息
//参数: [IN] pcOrgCode 组织编码
//[IN] pcSwitchResInfo 轮切资源信息
//返回：轮切编码
//说明：pcSwitchResInfo 轮切资源信息，xml格式
videoActiveX.AddSwitchResource = function (pcOrgCode, pcSwitchResInfo) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    return videoActiveX.g_imosActivePlayer.IMOSAX_AddSwitchResource(pcOrgCode, pcSwitchResInfo);
}
//修改上大屏轮切资源信息
//参数: [IN] pcOrgCode 组织编码
//[IN] pcSwitchResInfo 轮切资源信息
//返回：成功返回0
videoActiveX.ModifySwitchResource = function (pcResCode, pcSwitchResInfo) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    return videoActiveX.g_imosActivePlayer.IMOSAX_ModifySwitchResource(pcResCode, pcSwitchResInfo);
}
//删除上大屏轮切资源信息
//参数: [IN] pcResCode 轮切资源编码
//返回：成功返回0
videoActiveX.DelSwitchResource = function (pcResCode) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    return videoActiveX.g_imosActivePlayer.IMOSAX_DelSwitchResource(pcResCode);
}
//启动窗格轮切
//参数: [IN] ulFrameID 窗格序号（1-25）
//[IN] pcSwitchResCode 轮切资源编码
//返回：成功:0
//失败：具体错误码，参考附件说明
videoActiveX.StartFrameSwitch = function (ulFrameID, pcSwitchResCode) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    return videoActiveX.g_imosActivePlayer.IMOSAX_StartFrameSwitch(ulFrameID, pcSwitchResCode);
}
//停止窗格轮切
//参数: [IN] ulFrameID 窗格序号（1-25）
//返回：成功: 0
//失败：具体错误码，参考附件说明
videoActiveX.StopFrameSwitch = function (ulFrameID) {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    return videoActiveX.g_imosActivePlayer.IMOSAX_StopFrameSwitch(ulFrameID);
}
//获取错误码
//返回错误码
videoActiveX.GetLastError = function () {
    if (!videoActiveX.g_imosActivePlayer) {
        alert("未安装控件，请先安装后再使用本页面");
        return;
    }
    return videoActiveX.g_imosActivePlayer.IMOSAX_GetLastError();
}