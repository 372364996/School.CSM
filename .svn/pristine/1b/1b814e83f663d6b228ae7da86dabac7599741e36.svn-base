function wsChild(msg) {
    var videoPatrolDiv = $('#videoPatrolDiv').css('display');
    if (videoPatrolDiv == 'none') {

    }
    else {
        pausePlaying();
    }
    Alarm.LoadAlarm(msg)
}


/*--------报警--------*/

var Alarm = {}; //定义报警集合，存放报警相关方法与全局变量
Alarm.alarmPlan = []; //记录报警执行过的预案操作
Alarm.alarmNow = null; //记录当前处理的报警
Alarm.tempAlarmId = []; //临时未处警的报警，用来查看是否需要处警； 优点：无需反查数据库
Alarm.tempAlarmData = []; //临时未处理的报警数据，用作点击报警列表

//读取报警无操作的基准时间长TimeLong1，单位秒
Alarm.TL1 = TL1;
//读取报警无操作的基准时间长TimeLong2，单位秒
Alarm.TL2 = TL2;
Alarm.Tb = null //当前报警处理后的基准时间TBasetime
Alarm.MOKF = false//鼠标移动或键盘输入操作标志MouseOrKeyboardFlag;false:未操作，true：已操作
Alarm.firstData = ""; //存储取出的第一条数据
Alarm.vioce = "../../../../AVioceFile/alarm.mp3";
Alarm.PlanType = false; //预案类型，false：设备预案；true：事件预案，用作关闭四色灯和led
Alarm.alarmState = false;




//打开报警弹窗
Alarm.listOpen = function () {
    //显示报警列表
    $("#alarmListPop").css("display", "block");
}

//关闭报警弹窗
Alarm.listClose = function () {
    $("#alarmListPop").css("display", "none");
}
var alarmtimer;
$(document).ready(function () {
    if (NowMapType == 1) {
        alarmtimer = setInterval(getvedioPopup, 1000);
    }
    else {
        registerEvent();
    }
   
});

function getvedioPopup() {
    if (vedioPopup) {
        registerEvent();
        clearInterval(alarmtimer);
    }
}


function registerEvent()
{
    $("#scrollLeft").click(function () {
        var widLi = $("#alarmInfo li").width() + 3;
        var $left = parseInt($("#alarmInfo").css("left"));
        var lenLi = $("#alarmInfo li").length;
        if (lenLi > 6) {
            $("#alarmInfo").width(widLi * lenLi + "px");
            var maxLeft = parseInt($("#alarmInfo").width() - widLi * 6);
            $left -= widLi;
            if ($left <= -maxLeft) {
                $left = -maxLeft;
            }
            $("#alarmInfo").animate({ "left": $left + "px" }, 1000);
        }

    });
    $("#scrollRight").click(function () {
        var widLi = $("#alarmInfo li").width() + 3;
        var $left = parseInt($("#alarmInfo").css("left"));
        var lenLi = $("#alarmInfo li").length;
        if (lenLi > 6) {
            $("#alarmInfo").width(widLi * lenLi + "px");
            var maxLeft = parseInt($("#alarmInfo").width() - widLi * 6);
            $left += widLi; console.log($left);
            if ($left >= 0) { $left = 0; }
            $("#alarmInfo").animate({ "left": $left + "px" }, 1000);
        }
    });
    $("#scrollRight").mousemove(function () {
        var lenLi = $("#alarmInfo li").length;
        if (lenLi > 6) {
            $(".videoplayer-ionc2").css("cursor", "pointer");
        }
        else {
            $(".videoplayer-ionc2").css("cursor", "not-allowed");
        }
    });
    $("#scrollLeft").mousemove(function () {
        var lenLi = $("#alarmInfo li").length;
        if (lenLi > 6) {
            $(".videoplayer-ionc1").css("cursor", "pointer");
        }
        else {
            $(".videoplayer-ionc1").css("cursor", "not-allowed");
        }
    });
}

/*websocket报警监听*/
Alarm.LoadAlarm = function (alarmData) {
    //有报警消息
    //解析报警消息
    var data = alarmData.info;
    //获取告警设备信息
    var deviceData = data.deviceInfo;
    var alarmInfo = data.alarm;
    //摄像头信息
    //设备冒泡
    //Alarm.bubbleShow(deviceData.device_name, alarmInfo.alarm_time, alarmInfo.alarm_code, deviceData.is_inbuilding, deviceData.latitude, deviceData.longitude)
    var type = alarmData.type;
    //取出所有报警的id
    Alarm.saveTempId(data.alarm.id);
    //取出第一条数据
    Alarm.firstData = data;
    if (!Alarm.alarmState)//判断视频窗口是否隐藏，隐藏为非报警状态
    {
        ////打开告警弹窗
        //Alarm.playVideoOpen(deviceData, alarmInfo.alarm_time, alarmInfo.alarm_code);
        $("#alarmNum").css("display", "none");
        //报警处理第一条数据，取当前时间为基准时间，置位鼠标键盘标识，启动检测鼠标键盘检测
        setTimeout("Alarm.handleAlarmAndSet(" + type + ")", 100);
        $("#alarmInfo").html("");
    }
    else {//报警状态
        //取当前时间，判断是否超时，超时：关闭报警，清除数据  未超时：添加到报警列表
        Alarm.handleTimeout(data, type);
    }
}

//存储临时报警信息id
Alarm.saveTempId = function (data) {
    //for (var i = 0; i < data.length; i++) {
    Alarm.tempAlarmId.push(data);
    // }
}

/*取当前时间，判断是否超时，超时：关闭报警，清除数据  未超时：添加到报警列表*/
Alarm.handleTimeout = function (data, type) {//firstData为第一条数据,data为剔除第一条报警的数据
    //取出当前时间Tcurrent
    var Tc = new Date();
    //判断鼠标或键盘是否操作过
    if (!Alarm.MOKF) {//未操作过
        //判断Tc-Tb>TL1
        if (Alarm.countTimeout(Alarm.Tb, Tc, Alarm.TL1)) {//超时
            //关闭报警，清除当前显示的报警列表及数据
            Alarm.cancelAlarm(Tc);
            //再次执行报警处理
            setTimeout("Alarm.handleAlarmAndSet(" + type + ")", 100);
            //重新计算报警列表时间
            //Alarm.countListTime(Tc);
        }
        else {//未超时
            //拼装数据，对列表重新排序（倒序）
            Alarm.assembledAlarmDataToList(data, type, Tc);
            //清除当前超时的数据
            Alarm.listDataClear(Tc);
            //计算列表时间
            //Alarm.countListTime(Tc);
        }
    }
    else {//操作过
        //判断Tc-Tb>T2
        if (Alarm.countTimeout(Alarm.Tb, Tc, Alarm.TL2)) {//超时
            //关闭报警，清除当前显示的报警列表及数据
            Alarm.cancelAlarm(Tc);
            //再次执行报警处理
            setTimeout("Alarm.handleAlarmAndSet(" + type + ")", 100);
            //重新计算报警列表时间
            // Alarm.countListTime(Tc);
        }
        else {//未超时
            //拼装数据，对列表重新排序（倒序）
            Alarm.assembledAlarmDataToList(data, type, Tc);
            //清除当前超时的数据
            Alarm.listDataClear(Tc);
            //计算列表时间
            //Alarm.countListTime(Tc);
        }
    }
}

//计算是否超时，返回值result  true为超时，false为未超时
Alarm.countTimeout = function (t1, t2, long) {
    var result = false;
    var different = (t2 - t1) / 1000;
    if (different > long) {
        result = true;
    }
    else {
        result = false;
    }
    return result;
}
//发生告警关闭告警（告警监听没有关闭）
Alarm.cancelAlarm = function (Tc) {
    //关闭声光
    //Alarm.fourLampAndLedClose();
    //关闭滚动条
    $("#AlarmInfoBox").css('display', 'none');
    //回复母版页logo
    $("#logoTitle").css("display", "block");
    //$("#notPoliceNum").css("display", "block");
    //还原地图点位图标
    //setIcon();
    //更新报警状
    //MapContainer.alarm_ = false;
    //清除报警列表数据
    Alarm.listDataClear(Tc);
    //新增报警提示跳转到综合告警页面
    //$('#newwithoutforsure').html('--');
    //$('#newwithoutforsure').css('text-decoration', '');
    //$('#newwithoutforsureUL').css('display', 'none');
}

//计算列表时间
Alarm.countListTime = function (time) {//传入的时间
    //找到列表对象
    $($("#alarmInfo").find("li").each(function () {
        //获取每条报警的报警时间
        var temp = new Date($(this).find($("p[name='alarmTime']")).attr("value"));
        //取传入时间与报警时间的差值
        var long = parseInt((time - temp) / 1000);
        var text = "";
        if (long > 60) {//当时间大于60秒的时候，只显示">60"
            //long = ">60";
            text = "+" + long + "s ";
        }
        else {
            text = "+" + long + "s ";
        }
        //时间赋值给标签
        $(this).find("p[name='alarmTime']").html(text);
    }));
}

/*报警处理第一条数据，取当前时间为基准时间，置位鼠标键盘标识，启动检测鼠标键盘检测*/
Alarm.handleAlarmAndSet = function (type) {
    var data = Alarm.firstData; //data为Alarm.firstData
    //对第一条数据进行报警处理
    if (type == 1) {//设备预案
        //修改预案类型标识
        Alarm.PlanType = false;
        Alarm.handleDeviceAlarm(data);
    }
    else {//事件预案
        //修改预案类型标识
        Alarm.PlanType = true;
        Alarm.handleEventAlarm(data);
    }

    //取出当前时间作为基准时间Tbasetime
    Alarm.Tb = new Date();
    //将鼠标移动或键盘输入操作标志MouseOrKeyboardFlag置位
    Alarm.MOKF = false;
}

/*设备预案处理*/
Alarm.handleDeviceAlarm = function (data) {
    //解析报警数据
    var alarmData = data.alarm;
    var alarmCode = alarmData.alarm_code;
    var alarmId = alarmData.id;
    var alarmTime = alarmData.alarm_time;
    //摄像头信息
    var cameraInfo = data.camerasList;
    //设备信息
    var deviceInfo = data.deviceInfo;
    //附近摄像头
    var nearby = [];
    var num = 0;
    var camera = getCorrelationCamera(deviceInfo.id, "500");//500米
    if (cameraInfo >= 9)
    {
        nearby = [];
    }
    else {
        num = 9 - cameraInfo.length;
        for (var i = 0; i < cameraInfo.length; i++) {
            for (var a = 0; a < camera.length; a++) {
                if (cameraInfo[i].id == camera[a].id) {
                    camera.remove(camera[a]);
                }
            }
        }
        var cameraBox = [];
        for (var i = 0;i<camera.length; i++) {
            if (camera[i].device_type == 2 || camera[i].device_type == 4)
            {
                cameraBox.push(camera[i]);
            }
        }
        if(cameraBox.length>=num)
        {
            for(var i=0;i<cameraBox.length;i++)
            {
                if(num!=0)
                {
                    nearby.push(cameraBox[i]);
                    num = num - 1;
                }
            }
        }
        else {
            for (var i = 0; i < cameraBox.length; i++) {
                nearby.push(cameraBox[i])
            }
            num = num - cameraBox.length;
            for (var i = 0; i < camera.length; i++) {
                if (num != 0) {
                    nearby.push(camera[i]);
                    num = num - 1;
                }
            }
        }
    }
    //保存到当前处理的报警
    Alarm.alarmNow = alarmData;
    alarmInfoData = data;
    Alarm.playVideoOpen(deviceInfo, alarmData.alarm_time, alarmData.alarm_code)
    //报警信息
    var ledresult = data.ledMessage;
    $("#AlarmInfo ").html(ledresult);
    $("#logoTitle").css("display", "none");
    //$("#notPoliceNum").css("display", "none");
    $("#AlarmInfoBox").css("display", "block");
    var handle = data.hash;
    for (var key in handle) {
        //记下报警执行的预案
        Alarm.alarmPlan.push(key);
        switch (key) {
            //1.控制中心声光蜂鸣器开启，2.中控室LED信息显示，3.打开告警设备附近视频，4.相关摄像头上大屏，5.告警视频下载，6. 关联摄像头，7.通知设备网格第一负责人,8.通知其他负责人          
            case "1":
                if (data.hash[key].status == 0) {
                    if (IsMain)
                    {

                    }
                }
                break;
            case "2":
                if (data.hash[key].status == 0) {
                    if (IsMain) {

                    }
                }
                break;
            case "3":
                if (data.hash[key].status == 0) {
                    if (IsMain) {
                        var devicename = "";
                        var devicecode = "";
                        for (var i = 0; i < nearby.length; i++) {
                            devicename += nearby[i].device_name + ","
                            devicecode += nearby[i].device_code + ","
                        }
                        if (devicename != "" && devicecode != "") {
                            devicename = devicename.substring(0, devicename.length - 1);
                            devicecode = devicecode.substring(0, devicecode.length - 1);
                            var event = data.alarm.alarm_event;
                            var alarmTime = Util.changeDateFormat(data.alarm.alarm_time)
                            addAlarmScreen(devicename, devicecode, event, alarmTime);
                            addPlanItemResult(data.hash[key].planRecordId, data.hash[key].itemType, true, data.hash[key].itemid, "确警前");
                        }
                    }
                }
                break;
            case "4":
                if (data.hash[key].status == 0) {
                    if (IsMain) {
                        
                        var bigScreen = getBigscreenNum(deviceInfo.region_id);
                        var screenLen = bigScreen.length;  //取快速上大屏的个数
                        var cameraLen = cameraInfo.length;  //取摄像头的个数
                        if (screenLen != null && cameraLen != null)
                        {
                            var num = screenLen > cameraLen ? cameraLen : screenLen;//取两者较小的值
                            for (var i = 0; i < num; i++) {
                                videoClassify.StartMonitorLive(bigScreen[i].galleryCode, cameraInfo[i].device_code)
                            }
                        }
                        addPlanItemResult(data.hash[key].planRecordId, data.hash[key].itemType, true, data.hash[key].itemid, "确警前");
                    }
                }
                break;
            case "5":
                if (data.hash[key].status == 0) {
                    if (IsMain) {
                    }
                }
                break;
            case "6":
                if (data.hash[key].status == 0) {
                    Alarm.playVideo(cameraInfo, deviceInfo);
                    addPlanItemResult(data.hash[key].planRecordId, data.hash[key].itemType, true, data.hash[key].itemid, "确警前");
                }
                break;
            case "7":
                if (data.hash[key].status == 0) {
                    if (IsMain) {
                    }
                }
                break;
            case "8":
                if (data.hash[key].status == 0) {
                    if (IsMain) {
                    }
                }
                break;
            default:
        }
    }
}

/*事件预案处理*/
Alarm.handleEventAlarm = function (data) {
    //解析报警数据
    var alarmData = data.alarm;
    var alarmCode = alarmData.alarm_code;
    var alarmId = alarmData.id;
    var alarmTime = alarmData.alarm_time;
    //摄像头信息
    //var cameraInfo = data.camerasList;
    //设备信息
    var deviceInfo = data.deviceInfo;

    //保存到当前处理的报警
    Alarm.alarmNow = alarmData;
    alarmInfoData = data;
    Alarm.playVideoOpen(deviceInfo, alarmData.alarm_time, alarmData.alarm_code);

    //报警信息
    var ledresult = data.ledMessage;
    $("#AlarmInfo ").html(ledresult);
    $("#logoTitle").css("display", "none");
    //$("#notPoliceNum").css("display", "none");
    $("#AlarmInfoBox").css("display", "block");
    var handle = data.hash;
    var cameraInfo = [];
    var distance = 0;
    var outBuilding = 0;
    var inBuilding = 0;
    if (data.hash[6] != null)
    {
        for (var i = 0; i < data.hash[6].model.length; i++) {
            if (data.hash[6].model[i].ext2 == 1) {
                distance = data.hash[6].model[i].ext3;
                outBuilding = data.hash[6].model[i].ext4;
            }
            else {
                inBuilding = data.hash[6].model[i].ext4;
            }
        }
        var camera = getCorrelationCamera(deviceInfo.id, distance);
        var buildingBallMachine = [];//楼内球机
        var OutsideTheBallMachine = [];//楼外球机
        for (var i = 0; i < camera.length; i++)
        {
            if(camera[i].is_inbuilding>0 && (camera[i].device_type==2||camera[i].device_type==4))//2,4代表球机
            {
                buildingBallMachine.push(camera[i]);
                camera.remove(camera[i]);
            }
            else if (camera[i].is_inbuilding < 0 && (camera[i].device_type == 2 || camera[i].device_type == 4)) {
                OutsideTheBallMachine.push(camera[i]);
                camera.remove(camera[i]);
            }
        }
        if (buildingBallMachine.length>=inBuilding)
        {
            for(var i=0;i<buildingBallMachine.length;i++)
            {
                if (inBuilding != 0) {
                    cameraInfo.push(buildingBallMachine[i]);
                    buildingBallMachine.remove(buildingBallMachine[i]);;
                    inBuilding = inBuilding - 1;
                }
            }
        }
        else {
            for (var i = 0; i < buildingBallMachine.length; i++) {
                cameraInfo.push(buildingBallMachine[i])
            }
            inBuilding = inBuilding - buildingBallMachine.length;
            for (var i = 0; i < camera.length; i++) {
                if (camera[i].is_inbuilding > 0) {
                    if (inBuilding != 0) {
                        cameraInfo.push(camera[i]);
                        inBuilding = inBuilding - 1;
                    }
                }
            }
        }

        if (OutsideTheBallMachine.length >= outBuilding) {
            for (var i = 0; i < OutsideTheBallMachine.length; i++) {
                if (outBuilding != 0)
                {
                    cameraInfo.push(OutsideTheBallMachine[i]);
                    OutsideTheBallMachine.remove(OutsideTheBallMachine[i]);;
                    outBuilding = outBuilding - 1;
                }
            }
        }
        else {
            for (var i = 0; i < OutsideTheBallMachine.length; i++) {
                cameraInfo.push(OutsideTheBallMachine[i])
            }
            outBuilding = outBuilding - OutsideTheBallMachine.length;
            for (var i = 0; i < camera.length; i++) {
                if (camera[i].is_inbuilding< 0) {
                    if (outBuilding != 0) {
                        cameraInfo.push(camera[i]);
                        outBuilding = outBuilding - 1;
                    }
                }
            }
        }

    }
    for (var key in handle) {
        //记下报警执行的预案
        Alarm.alarmPlan.push(key);
        switch (key) {
            //1.控制中心声光蜂鸣器开启，2.中控室LED信息显示，3.相关摄像头上大屏，4.告警视频下载，5.通知设备网格第一负责人,6.打开周围摄像头 7.通知其他负责人          
            case "1":
                if (data.hash[key].status == 0) {
                    if (IsMain) {
                    }
                }
                break;
            case "2":
                if (data.hash[key].status == 0) {
                    if (IsMain) {
                    }
                }
                break;
            case "3":
                if (data.hash[key].status == 0) {
                    if (IsMain) {
                        var bigScreen = getBigscreenNum(deviceInfo.region_id)
                        //for (var i = 0; i < bigScreen.length; i++) {
                        //    for (var a = 0; a < cameraInfo.length; a++) {
                        //        mapVideo.StartMonitorLive(bigScreen[i].galleryCode, cameraInfo[a].device_code)
                        //    }
                        //}
                        var bigScreen = getBigscreenNum(deviceInfo.region_id);
                        var screenLen = bigScreen.length;  //取快速上大屏的个数
                        var cameraLen = cameraInfo.length;  //取摄像头的个数
                        if (screenLen != null && cameraLen != null) {
                            var num = screenLen > cameraLen ? cameraLen : screenLen;//取两者较小的值
                            for (var i = 0; i < num; i++) {
                                videoClassify.StartMonitorLive(bigScreen[i].galleryCode, cameraInfo[i].device_code)
                            }
                        }
                        addPlanItemResult(data.hash[key].planRecordId, data.hash[key].itemType, true, data.hash[key].itemid, "确警前");
                    }
                }
                break;
            case "4":
                if (data.hash[key].status == 0) {
                    if (IsMain) {
                        var devicename = "";
                        var devicecode = "";
                        for (var i = 0; i < cameraInfo.length; i++) {
                            devicename += cameraInfo[i].device_name + ","
                            devicecode += cameraInfo[i].device_code + ","
                        }
                        if (devicename != "" && devicecode != "") {
                            devicename = devicename.substring(0, devicename.length - 1);
                            devicecode = devicecode.substring(0, devicecode.length - 1);
                            var event = data.alarm.alarm_event;
                            var alarmTime = Util.changeDateFormat(data.alarm.alarm_time)
                            var result = addAlarmScreen(devicename, devicecode, event, alarmTime)
                            addPlanItemResult(data.hash[key].planRecordId, data.hash[key].itemType, result, data.hash[key].itemid, "确警前");
                        }
                    }
                }
                break;
            case "5":
                if (data.hash[key].status == 0) {
                    if (IsMain) {
                    }
                    break;
                }
                break;
            case "6":
                if (data.hash[key].status == 0) {
                    Alarm.playVideo(cameraInfo, deviceInfo);
                    for (var i = 0; i < data.hash[key].model.length; i++)
                    {
                        addPlanItemResult(data.hash[key].planRecordId, data.hash[key].model[i].item_type, true, data.hash[key].model[i].id, "确警前");
                    }
                }
                break;
            case "7":
                if (data.hash[key].status == 0) {
                    if (IsMain) {
                    }
                }
                break;
            default:
        }
    }

}

//拼装报警数据到列表里并保存临时报警
Alarm.assembledAlarmDataToList = function (data, type, Tc) {//Tc为当前时间
    var innerHtml = "";
    //序列化data
    var alarm = data.alarm;
    innerHtml += "<li id='alarmList_" + alarm.id + "'onclick='Alarm.listOnClick(" + alarm.id + "," + type + ")'><p value='" + Tc + "' name='alarmTime'>" + Util.translateToHMS(alarm.alarm_time) + "<p><p>" + alarm.alarm_name + "<p><p>" + data.deviceInfo.device_name + "<p></li>";
    //存储临时报警的id，用来查看是否处警
    Alarm.tempAlarmId.push(alarm.id);
    //将报警数据存到临时的队列中，用作点击报警列表
    var temp = new Object();
    temp.id = alarm.id;
    temp.data = data;
    Alarm.tempAlarmData.push(temp);
    //累加到列表里
    $("#alarmInfo").prepend(innerHtml);
    //改变报警列表中数据条数
    var lenLi = $("#alarmInfo li").length;
    if (lenLi > 0) {
        $("#alarmNum").css("display", "block");
        $("#alarmNum").text(lenLi);
    }
    else {
        $("#alarmNum").css("display", "none");
        $("#alarmNum").text("");
    }
}

//清除报警列表里的数据
Alarm.listDataClear = function (Tc) {
    //判断Tc是否有值
    if (Tc != undefined) {//有值
        //取出所有的alarmInfo下li标签里的value的time值
        $($("#alarmInfo").find("li")).each(function () {
            //获取每条报警的报警时间
            var temp = new Date($(this).find($("p[name='alarmTime']")).attr("value"));
            //判断列表里的每条报警是否超时
            if (Alarm.countTimeout(temp, Tc, Alarm.TL1)) {//超时
                //清除这条报警消息
                $(this).remove();
                //改变报警列表中数据条数
                var lenLi = $("#alarmInfo li").length;
                if (lenLi > 0) {
                    $("#alarmNum").css("display", "block");
                    $("#alarmNum").text(lenLi);
                }
                else {
                    $("#alarmNum").css("display", "none");
                    $("#alarmNum").text("");
                }
                //清除当前未处理的报警
                //Alarm.tempAlarmId.remove($(this).attr("id").splice("alarmList_"));
            }
        });
    }
    else {//没有值
        //清空所有未处理的报警
        Alarm.tempAlarmId = [];
        //清空所有的列表
        $("#alarmInfo").html("");
        //改变报警列表中数据条数
        var lenLi = $("#alarmInfo li").length;
        if (lenLi > 0) {
            $("#alarmNum").css("display", "block");
            $("#alarmNum").text(lenLi);
        }
        else {
            $("#alarmNum").css("display", "none");
            $("#alarmNum").text("");
        }
    }

}


//点击报警列表
Alarm.listOnClick = function (id, type) {
    //取出当前的时间
    var temp = new Date();
    //查找父节点并删除当前报警条目
    $("#alarmList_" + id).remove();
    //改变报警列表中数据条数
    var lenLi = $("#alarmInfo li").length;
    if (lenLi > 0) {
        $("#alarmNum").css("display", "block");
        $("#alarmNum").text(lenLi);
    }
    else {
        $("#alarmNum").css("display", "none");
        $("#alarmNum").text("");
    }
    $("#alarmInfo").animate({ "left": "0px" }, 1000);
    //获取报警信息
    //var alarm = Util.getAlarmById(id);
    var alarm = Alarm.getTempDataByAlarmId(id);
    //关闭报警
    Alarm.cancelAlarm(temp);
    //执行报警方法
    if (type == 1) {
        document.getElementById("h3c_IMOS_ActiveX").width = 1;
        document.getElementById("h3c_IMOS_ActiveX").height = 1;
        Alarm.handleDeviceAlarm(alarm);
    }
    else {
        Alarm.handleEventAlarm(alarm);
    }
    //打开列表并定位到视频位置
    //setTimeout("Alarm.listOpen()", 200);
}

//地图上报警设备冒泡显示
Alarm.bubbleShow = function (deviceName, alarmTime, alarmCode, Isinbuilding, Latitude, Longitude) {
    if ($("#mapContainer div[name=bubble]").length > 0) {
        $("#mapContainer div[name=bubble]").each(function () {
            if ($(this).css("opacity") == 0) {
                $(this).remove();
            }
        });
    }
    if ($("#mapContainer").attr("currentMapType") == 3) {
        if (Isinbuilding > 0) {
            //楼内占时不飘窗
        }
    }
    else {
        var deviceMarker = L.marker([Latitude, Longitude]);
        var Point = csm.mapContainer.latLngToContainerPoint(deviceMarker.getLatLng());
        var divHtml = "<div class='bubble' id=" + alarmCode + " name='bubble'><p>" + deviceName + "</p><p>" + Util.dateIntoHMS(alarmTime) + "</p></div>"

        $("#mapContainer").prepend(divHtml);
        $("#" + alarmCode).css("left", Point.x - 95 + "px");
        $("#" + alarmCode).css("top", Point.y + "px");
        $("#" + alarmCode).css("position", "absolute");
        $("#" + alarmCode).animate({ "opacity": "1" }, 4000);

    }

}

//关闭声光
Alarm.fourLampAndLedClose = function () {
    //$("#logoTitle").css("display", "block");
    //$("#AlarmInfoBox").css("display", "none");
    //判断是否是主客户端
    if (IsMain) {
        if (alarmInfoData != null) {
            turnOffHardware(alarmInfoData);
        }
    }
    else
    {
        if (confirm("你当前使用的非主控设备,是否强行关闭声光"))
        {
            if (alarmInfoData != null) {
                turnOffHardware(alarmInfoData);
            }
        }
    }
    ////关闭报警框
    //if (NowMapType == 1) {
    //    closeVedioPopup();
    //}
    //else {
    //    vedioPopupClose();
    //}
}



//判断当前主从客户端，假如从客户端，删除四色灯、LED等预案操作
Alarm.judgeMainClient = function (key) {
    var result = true;
    if (MianIP != LocalIP) {//判断是否是主客户端
        //False就remove掉预案操作的key
        Alarm.alarmPlan.remove(key);
        result = false;
    }
    return result;
}

//LED恢复默认显示
Alarm.LEDRestore = function () {

}

//四色灯全开
function OnOpenFourLamp() {
    //Util.OpenFourLamp("3");
}
//四色灯全关
function OnCloseFourLamp() {
    //Util.OpenFourLamp("4");
}

//打开确警页面
Alarm.confirmOpen = function () {
    var alarmflowChartBox = $('#alarmflowChartBox').css('display');
    if (alarmflowChartBox == 'none') {

    }
    else {
        $("#alarmflowChartBox").css("display", "none");
    }
    //先判断当前是否有报警
    if (Alarm.alarmNow == null) {
        toastr.error("查找当前报警失败");
        return;
    }
    else {
        var id = Alarm.alarmNow.id;
        //判断是否已经处警过;<=-1：当前已处警
        if (Alarm.tempAlarmId.indexOf(id) <=-1) {
            //打开确警信息弹窗
            Alarm.comfirmInformationOpen();
            //给确警信息框赋值
            Alarm.selectConfirmInfoById(id);
        }
        else {
            Alarm.visibleVideo(); //隐藏视频
            //打开确警弹窗
            $("#correctAlarmInfoBox").css("display", "block");
            $("#confirmAlarmname").val(PERSONINFOJSON.alias);//确警人
            $("#alarmid").val(id);
            ////构造快速查询键盘开关用 1：打开，0：关闭
            //MapSetting.keyBoardNF = 0;

        }
    }
}


//打开查看确警框
Alarm.comfirmInformationOpen = function () {
    $("#checkCorrectInfo").css("display", "block");
    Alarm.visibleVideo(); //隐藏视频
}
//根据id查找确警信息
Alarm.selectConfirmInfoById = function (alarm_id) {
    $("#checkConfirmAlarmId").html("确警信息（确警编号  " + alarm_id + "）");
    $.ajax({
        url: "/Alarm/GetAlarmByalarmIdData",
        type: "post",
        data: "alarm_id=" + alarm_id,
        datatype: 'json',
        async: false,
        success: function (data) {
            $("#checkConfirmAlarmname").val(data.confirmPersonName);
            $("#checkConfirmResult").val(data.confirmResult);
            $("#checkAlarmlocation").val(data.alarmLocation);
            $("#confirmContent").val(data.confirmAlarmText);
        }
    });
}

//确警页面确认
Alarm.confirm = function () {
    //先判断当前是否有报警
    if (Alarm.alarmNow == null) {
        toastr.error("查找当前报警失败");
        return;
    }
    else {
        var id = Alarm.alarmNow.id;
        //var personId = $("#confirmAlarmname").text();
        var personId;
        if (PERSONINFOJSON != undefined && PERSONINFOJSON != null) {
            personId = PERSONINFOJSON.ssoid;
        }
        else {
            personId = -1;
        }
        var content = $("#confirmAlarmText").val()//确警描述
        var confirmResult = $("#confirmResult option:selected").attr("id"); //确警结论
        var location = $("#Alarmlocation").val(); //确警位置
        //添加确警信息  修改确警状态
        var result=Util.updateConfirmState(id, personId, confirmResult, location, content)
        if (result) {
            ////确警成功，执行自动拨打电话功能
            //Util.GetNamePhone(id);
            //确警成功，销毁当前处理的报警
            Alarm.tempAlarmId.remove(id);
            //关闭声光
            Alarm.fourLampAndLedClose();

        }
        //关闭确警页面
        Alarm.closeConfirm();
        Alarm.openVideo(); //打开视频

    }
}
//关闭确警弹出框
Alarm.closeConfirm = function () {
    $("#correctAlarmInfoBox").css("display", "none");
    Alarm.openVideo(); //打开视频
}
//关闭确警弹出框
Alarm.closeCheckConfirm = function () {
    $("#checkCorrectInfo").css("display", "none");
    Alarm.openVideo(); //打开视频
}

//打开流程图窗体
Alarm.imgFlowOpen = function () {
    var AlarmInfoBoxdisplay = $('#correctAlarmInfoBox').css('display');
    if (AlarmInfoBoxdisplay == 'none') {

    }
    else {
        $("#correctAlarmInfoBox").css("display", "none");
    }
    var checkCorrectInfo = $('#checkCorrectInfo').css('display');
    if (checkCorrectInfo == 'none') {

    }
    else {
        $("#checkCorrectInfo").css("display", "none");
    }
    //判断当前是否有报警数据，如果没有直接返回
    if (Alarm.alarmNow == null) {
        toastr.warning("未找到报警数据");
    }
    else {
        //隐藏视频
        Alarm.visibleVideo();
        //显示流程图
        $("#alarmflowChartBox").css("display", "block");
        $("#flowChartTitle").html("");
        $("#flowChartTitle").html("预案流程图（报警编号  " + Alarm.alarmNow.id + "）");
        //调取显示流程图方法
        var eventType = Util.getEventNameByCode(Alarm.alarmNow.alarm_event);
    }
}
//关闭流程图
Alarm.imgFlowClose = function () {
    $("#alarmflowChartBox").css("display", "none");
    //打来视频
    Alarm.openVideo();
}



//根据报警id在临时报警队列中取出报警数据
Alarm.getTempDataByAlarmId = function (id) {
    var result = "";
    for (var i = 0; i < Alarm.tempAlarmData.length; i++) {
        if (Alarm.tempAlarmData[i].id == id) {
            result = Alarm.tempAlarmData[i].data;
            return result;
        }
    }
    return result;
}

//隐藏视频
Alarm.visibleVideo = function () {
    //$("#videoplayerView").css({ "width": "1px", "height": "1px" });
    $("#videoplayerView").css("display", "none");
    document.getElementById("h3c_IMOS_ActiveX").width = 1;
    document.getElementById("h3c_IMOS_ActiveX").height = 1;
   
}
//打开视频
Alarm.openVideo = function () {
    //$("#videoplayerView").css({ "width": "780px", "height": "465px" });
    $("#videoplayerView").css("display", "block");
    document.getElementById("h3c_IMOS_ActiveX").width = "100%";
    document.getElementById("h3c_IMOS_ActiveX").height = "100%";
   
}

//打开报警弹窗并播放视频
Alarm.playVideo = function (cameraList, deviceInfo) {
    document.getElementById("h3c_IMOS_ActiveX").width = "100%";
    document.getElementById("h3c_IMOS_ActiveX").height = "100%";
    var marginTop = $("#h3c_IMOS_ActiveX").css("margin-top");
    if (marginTop == "2px") {
        $("#h3c_IMOS_ActiveX").css("margin-top", "1px");
    } else {
        $("#h3c_IMOS_ActiveX").css("margin-top", "2px");
    }
    var deviceCodes = [];
    for (var i = 0; i < cameraList.length; i++) {
        deviceCodes.push(cameraList[i].device_code);
    }
    videoClassify.playVideo(deviceCodes);
}

//打开报警弹出框
Alarm.playVideoOpen = function (deviceInfo, alarm_time, alarm_code) {
    Alarm.alarmState = true;
    if (NowMapType == 1) {//超图
        if (deviceInfo.is_inbuilding < 0)//楼外
        {
            returnMainMap();
            displayAlarm();
           
            openSuperMarvedioBox(markerLayerArray, deviceInfo, alarm_time, alarm_code)
            $("#vedioPopup").css({ "width": "998px", "height": "600px" });
        }
        else {
            mapBuildingInfo(deviceInfo.is_inbuilding);
            $(".mapType-wrapper").hide();//隐藏园区
            displayAlarm();
            $("#vedioPopup").css({ "width": "998px", "height": "600px" });
            openSuperMarvedioBox(floorDeviceLayerArray, deviceInfo, alarm_time, alarm_code)
        }

    }
    else {//leaflet
        if (deviceInfo.is_inbuilding < 0)//楼外
        {
            returnMainMap();
            displayAlarm();
            
            openLeafletvedioBox(deviceLayerGroup, deviceInfo, alarm_time, alarm_code)
        }
        else {
            mapBuildingInfo(deviceInfo.is_inbuilding);
            displayAlarm();
           
            openLeafletvedioBox(floorDeviceLayerGroup, deviceInfo, alarm_time, alarm_code)
        }

    }

}

//楼内图
function mapBuildingInfo(is_inbuilding) {
    $.ajax({
        url: "/Map/GetMapBuildingInfo",
        type: "post",
        data: "is_inbuilding=" + is_inbuilding,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                if (data.msg != null) {
                    var id = data.msg.id;
                    var building_id = data.msg.building_id;
                    var point1 = data.msg.point1;
                    var point2 = data.msg.point2;
                    var floor_src_2d = data.msg.floor_src_2d;
                    if (NowMapType == 1) {//超图
                        searchVideoBuilding(id, building_id, floor_src_2d, point1, point2)
                    }
                    else {
                        lealfetVideoBuilding(id, building_id, floor_src_2d, point1, point2)
                    }
                }
                else {
                    toastr.warning("获取楼内图信息出现" + data.msg + "错误请联系管理员！");
                }
            }
            else {
                toastr.warning("获取楼内图信息出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            toastr.error("获取楼内图信息出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}

//lealfet加载楼内图
function lealfetVideoBuilding(id, building_id, floor_src_2d, point1, point2) {
    csm.mapContainer.removeLayer(csm.baseMap);//移除底图
    csm.mapContainer.removeLayer(areaLayerGroup);//移除区域的图层
    csm.mapContainer.removeLayer(deviceLayerGroup);//移除设备的图层
    $("#rightFloat").hide();//隐藏区域工具栏
    $(".map-switch").hide();//隐藏2/3维切换
    $("#floorTool").show();//显示楼内图的工具栏
    $(".floor").hide();//显示楼内图的工具栏
    resetDeviceToolIcon();//重置设备工具栏图标，都设置为激活图标
    closeOtherPopup(); //删除其他弹出框
    $(".mapType-wrapper").hide();//隐藏园区
    var imagesrc = "../images/map/buildingImage/" + building_id + "/" + floor_src_2d + ".png";
    var southwest = Mercator2latlng(point1.split(',')[0], point1.split(',')[1]);
    var northeast = Mercator2latlng(point2.split(',')[0], point2.split(',')[1]);
    var mapbounds = L.latLngBounds(southwest, northeast);
    csm.floorMap = L.imageOverlay(imagesrc, mapbounds);
    csm.floorMap.addTo(csm.mapContainer);
    csm.mapContainer.setView(mapbounds.getCenter(), 20);
    //加载楼内图的设备的加载
    addFloorDevice(id);//根据当前楼内图的id找到对应的设备

}



//打开leaflet视频框打开法式
function openLeafletvedioBox(deviceLayer, deviceInfo, alarm_time, alarm_code) {
    deviceLayer.eachLayer(function (featureLayer) {
        featureLayer.eachLayer(function (marker) {
            if (marker.id == deviceInfo.id) {
                //删除其他弹出框
                closeOtherPopup();
                vedioPopup.setLatLng(marker.getLatLng());
                //右上角报警确警按钮显示
                $("#alarmRightTop").css("display", "block");
                $("#cameraName").html(marker.device_name);
                //替换云台控制器的样式
                modifyStyle();
                //显示报警列表
                $("#alarmList").css("display", "block");
                //隐藏视频下侧按钮
                $("#videoBottom").css("display", "none");
                document.getElementById("h3c_IMOS_ActiveX").width = 1;
                document.getElementById("h3c_IMOS_ActiveX").height = 1;

            }
        });
    });
}



//打开超图视频弹框
function openSuperMarvedioBox(markerLayerInfo, deviceInfo, alarm_time, alarm_code) {
    closeInfoWin();//弹出之前先关闭其他设备或者区域的弹框
    closeVedioPopup();//关掉已有的视频的弹框
    var deviceMarker;
    for (var i = 0; i < markerLayerInfo.length; i++) {//循环超图设备图层数组，数组里面的元素是按设备类型划分的图层
        var markerLayer = markerLayerInfo[i];
        for (var j = 0; j < markerLayer.markers.length; j++) {
            var deviceMarkerInfo = markerLayer.markers[j];
            if (deviceMarkerInfo.id == deviceInfo.id) {
                deviceMarker = deviceMarkerInfo;
            }
        }
    }
    var vedioMarker = deviceMarker;
    $("#cameraName").html(vedioMarker.device_name);
    //右上角报警确警按钮显示
    $("#alarmRightTop").css("display", "block");
    //替换云台控制器的样式
    modifyStyle();
    //显示报警列表
    $("#alarmList").css("display", "block");
    //隐藏视频下侧按钮
    $("#videoBottom").css("display", "none");
    //让控件显示出来
    document.getElementById("h3c_IMOS_ActiveX").width = 1;
    document.getElementById("h3c_IMOS_ActiveX").height = 1;
    mapVideo.deviceCode = vedioMarker.device_code;
    //改变位置
    vedioPopup.lonlat = vedioMarker.getLonLat();
    vedioPopup.updateSize();
    ////添加弹窗
    vedioPopup.show();
}
//关闭报警弹出框
function AlarmPopupClose() {
    Alarm.alarmState = false;
    $("#AlarmInfoBox").css('display', 'none');
    //回复母版页logo
    $("#logoTitle").css("display", "block");
    //判断是否是主客户端
    if (IsMain) {
        if (alarmInfoData != null) {
            turnOffHardware(alarmInfoData);
        }
    }
}


//判断园区的大屏
function getBigscreenNum(regionId)
{
    var bigScreen = [];
    $.ajax({
        url: "/Map/GetBigscreenNum",
        type: "post",
        data: "regionId=" + regionId,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                bigScreen = data.msg;
            }
            else {
                toastr.warning("获取大屏信息出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            toastr.error("获取大屏信息出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
    return bigScreen;
}


//告警视屏下载
function addAlarmScreen(deviceName, deviceCode, event, alarmTime)
{
    var result=false;
    $.ajax({
        url: "/Map/AlarmScreenDownload",
        type: "post",
        data: "deviceName=" + deviceName + "&deviceCode=" + deviceCode + "&Event=" + event + "&alarmTime=" + alarmTime,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status== 0) {
                if(data.msg==true)
                {
                    //alert("告警视屏下载成功");
                    result = true;
                }
                else {
                    toastr.warning("告警视屏下载失败");
                }
            }
            else {
                toastr.warning("告警视屏下载出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            toastr.error("告警视屏下载出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
    return result;
}

//事件预案获取摄像头
function getCorrelationCamera(Id,Distance)
{
    var cameraInfo=[];
    $.ajax({
        url:"/Map/GetCorrelationCamera",
        type: "post",
        data: "Id=" + Id + "&Distance=" + Distance,
        datatype: 'json',
        async: false,
        success: function (data) {
            if(data.status==0)
            {
                cameraInfo=data.msg;
            }
            else {
                ttoastr.warning("事件预案获取摄像头出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            toastr.error("事件预案获取摄像头出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
    return cameraInfo;
}


//将预案执行记录添加到预案处置项执行结果表中

function addPlanItemResult(recordId, itemType, itemResult, handleitemId, confirmType) {
    $.ajax({
        url: "/Map/AddPlanItemResult",
        type: "post",
        data: "recordId=" + recordId + "&itemType=" + itemType + "&itemResult=" + itemResult + "&handleitemId=" + handleitemId + "&confirmType=" + confirmType,
        datatype: 'json',
        async: false,
        success: function (data) {
            if (data.status == 0) {
                
            }
            else {
                toastr.warning("预案执行记录添加出现" + data.msg + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            toastr.error("预案执行记录添加出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}

//修改样式
function modifyStyle() {
    //替换云台控制器的样式
    $("#playControllDiv").removeClass("videoplayer-round").addClass("videoplayer-round2");//外框
    $("#playTop").removeClass("playerionc1").addClass("playerionc01");//上
    $("#playBottom").removeClass("playerionc2").addClass("playerionc02");//下
    $("#playLeft").removeClass("playerionc3").addClass("playerionc03");//左
    $("#playRight").removeClass("playerionc4").addClass("playerionc04");//右
    $("#playLeftTop").removeClass("playerionc5").addClass("playerionc05");//左上
    $("#playRightTop").removeClass("playerionc6").addClass("playerionc06");//右上
    $("#playLeftBottom").removeClass("playerionc7").addClass("playerionc07");//左下
    $("#playRightBottom").removeClass("playerionc8").addClass("playerionc08");//右下
    $("#playMiddle").removeClass("playerionc9").addClass("playerionc09");//中间
}

//显示视频，隐藏确警，流程图
function displayAlarm()
{
    var AlarmInfoBoxdisplay = $('#correctAlarmInfoBox').css('display');
    if (AlarmInfoBoxdisplay == 'none') {

    }
    else {
        $("#correctAlarmInfoBox").css("display", "none");
    }
    var checkCorrectInfo = $('#checkCorrectInfo').css('display');
    if (checkCorrectInfo == 'none') {

    }
    else {
        $("#checkCorrectInfo").css("display", "none");
    }
    var alarmflowChartBox = $('#alarmflowChartBox').css('display');
    if (alarmflowChartBox == 'none') {

    }
    else {
        $("#alarmflowChartBox").css("display", "none");
    }
    Alarm.openVideo(); //打开视频

}









