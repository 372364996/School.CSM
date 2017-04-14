var Util = {};
/*--------------------------公共变量--------------------------*/
/*量词*/
Util.mQuantifier = {
    ge: '个',
    tiao: '条'
}
/*短语*/
Util.mClause = {
    addSuccess: '添加成功',
    updateSuccess: '修改成功',
    saveSuccess: '保存成功',
    addFail: '添加失败',
    updateFail: '修改失败',
    saveFail: '保存失败',
    loading: '正在加载',
    loadFail: '加载失败',
    deleteSuccess: "删除成功",
    deleteFail: "删除成功"
}
/*键盘KeyCode编码*/
Util.mKeyCode = {
    Enter: 13,
    A: 65,
    Z: 90,
    C: 67,
    D: 68,
    F: 70,
    L: 76,
    M: 77,
    N: 78,
    Q: 81,
    R: 82,
    T: 84,
    V: 86,
    W: 87,
    UP: 38,
    DOWN: 40,
    BACKSPACE: 8,
    ESC: 27,
    PLUS: 187,       //+=
    MINUS: 189,      //-_
    LESS: 188,       //,<
    GREATER: 190,   //.>
    COLON: 186,      //;:
    QUOTATION: 222,  //"'
    QUESTION: 191,   //?/
    ZERO_NUM: 48,    //数字键0
    NINE_NUM: 57,    //数字键9
    ZERO_KEY: 96,    //数字键盘0
    NINE_NUM: 105,    //数字键盘9
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    CTRL: 17
}

/*--------------------------公共方法--------------------------*/
//获取Cookie
Util.getCookie = function (cookiename) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(cookiename + "=")
        if (c_start != -1) {
            c_start = c_start + cookiename.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}
//创建Cookie
//默认两个月过期
Util.setCookie = function (cookiename, value) {
    Util.setHasExpiresTimeCookie(cookiename, value, 60);
}
//创建Cookie
//expiresTime:单位 天
Util.setHasExpiresTimeCookie = function (cookiename, value, expiresTime) {
    var exp = new Date(); //获得当前时间   
    exp.setTime(exp.getTime() + expiresTime * 24 * 60 * 60 * 1000); //换成毫秒  
    document.cookie = cookiename + "=" + escape(value) + ";path=/;expires=" + exp.toGMTString();
}
//删除Cookie
Util.delCookie = function (cookiename) {
    var date = new Date();
    date.setTime(date.getTime() - 10000);
    document.cookie = cookiename + "=a;path=/;expires=" + date.toGMTString();
}
//截取字符串
Util.cutString = function (str, len) {
    var strlen = 0;
    var s = "";
    for (var i = 0; i < str.length; i++) {
        if (str.charCodeAt(i) > 128) {
            strlen += 2;
        } else {
            strlen++;
        }
        s += str.charAt(i);
        if (strlen >= len) {
            return s;
        }
    }
    return s;
}
//生成GUID(非绝对GUID)
Util.createGUID = function () {
    var guid = "";
    for (var i = 1; i <= 32; i++) {
        var n = Math.floor(Math.random() * 16.0).toString(16);
        guid += n;
        if ((i == 8) || (i == 12) || (i == 16) || (i == 20))
            guid += "-";
    }
    return guid;
}
//检查图片是否存在
Util.checkImgExists = function (imgurl) {
    var ImgObj = new Image(); //判断图片是否存在
    ImgObj.src = imgurl;
    if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
        return 1;
    } else {
        return 0;
    }
}

//前端JS检查一个url是否可以连接
Util.checkURL = function (url) {
    var result = false;
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        complete: function (response) {
            if (response.status == 200) {
                result = true;
            }
        }
    });
    return result;
}

//后台检测url是否可用
Util.checkURL_ = function (ip, port) {
    var result = false;
    $.ajax({
        url: "/Utils/checkURL",
        data: { ip: ip, port: port },
        type: 'post',
        async: false,
        success: function (data) {
            if (data == "True") {
                result = true;
            }
            else {
                result = false;
            }
        },
        error: function () {

        }
    });
    return result;
}



//根据设备类型ID获取设备类型名称
Util.getDeviceNameByID = function (devicetypeid) {
    var result;
    switch (devicetypeid) {
        case 1:
            result = "标清固定摄像机";
            break;
        case 2:
            result = "标清云台摄像机";
            break;
        case 3:
            result = "高清固定摄像机";
            break;
        case 4:
            result = "高清云台摄像机";
            break;
        case 5:
            result = "消防手报";
            break;
        case 6:
            result = "事件手报";
            break;
        case 7:
            result = "烟感";
            break;
        case 8:
            result = "室外消防栓";
            break;
        case 9:
            result = "室内消防栓";
            break;
        case 10:
            result = "灭火器";
            break;
        case 11:
            result = "广播";
            break;
        case 12:
            result = "单项卡口";
            break;
        case 13:
            result = "双向卡口";
            break;
        case 14:
            result = "监视器";
            break;
        case 15:
            result = "门禁";
            break;
        case 16:
            result = "红外对射探测器";
            break;
        case 19:
            alarmtype = "温湿度传感器";
            break;
        default:
            break;
    }
    return result;
}
//根据子系统ID获取子系统名称
Util.getSubsysNameByID = function (subsystemid) {
    var result;
    switch (subsystemid) {
        case 1:
            result = "宇视视频子系统";
            break;
        case 2:
            result = "丛文报警子系统";
            break;
        case 3:
            result = "消防子系统";
            break;
        case 4:
            result = "停车子系统";
            break;
        case 5:
            result = "门禁子系统";
            break;
        case 6:
            result = "周界子系统";
            break;
        case 7:
            result = "智能视频分析子系统";
            break;
        case 8:
            result = "巡更子系统";
            break;
        default:
            break;
    }
    return result;
}


Util.getTimeStr = function () {
    var timestamp = "/Date(" + Date.parse(new Date()) + ")/";
    return timestamp;
}


//截取url字符串
Util.getQueryString = function (sProp) {
    var re = new RegExp("[&,?]" + sProp + "=([^\\&]*)", "i");
    var a = re.exec(document.location.search);
    if (a == null)
        return "";
    return a[1];
}




//修改加载的第几个Tab
Util.updateTab = function (a) {
    $('.MbottomR h2 span:eq(' + a + ')').addClass('current').siblings().removeClass();
    $('.MbottomR .showtext>div').eq(a).addClass('current').siblings().removeClass('current');
}



var old_value = "";
var highlightindex = -1;   //高亮

//自动完成
Util.autoComplete = function (auto, search, mylist) {
    if ($("#" + search).val() != old_value || old_value == "") {
        var autoNode = $("#" + auto);   //缓存对象（弹出框）
        var carlist = new Array();
        var n = 0;
        old_value = $("#" + search).val();
        for (i in mylist) {
            if (mylist[i].indexOf(old_value) >= 0) {
                carlist[n++] = mylist[i];
            }
        }
        if (carlist.length == 0) {
            autoNode.hide();
            return;
        }
        autoNode.empty();  //清空上次的记录
        for (i in carlist) {
            var wordNode = carlist[i];   //弹出框里的每一条内容
            var newDivNode = $("<div>").attr("id", i);    //设置每个节点的id值
            newDivNode.attr("style", "font:14px/25px arial;height:25px;padding:0 8px;cursor: pointer;");
            newDivNode.html(wordNode).appendTo(autoNode);  //追加到弹出框
            //鼠标移入高亮，移开不高亮
            newDivNode.mouseover(function () {
                if (highlightindex != -1) {
                    //原来高亮的节点要取消高亮（是-1就不需要了）
                    autoNode.children("div").eq(highlightindex).css("background-color", "white");
                }
                //记录新的高亮节点索引
                highlightindex = $(this).attr("id");
                $(this).css("background-color", "#ebebeb");
            });
            newDivNode.mouseout(function () {
                $(this).css("background-color", "white");
            });
            //鼠标点击文字上屏
            newDivNode.click(function () {
                //取出高亮节点的文本内容
                var comText = autoNode.hide().children("div").eq(highlightindex).text();
                highlightindex = -1;
                //文本框中的内容变成高亮节点的内容
                $("#" + search).val(comText);
            })
            if (carlist.length > 0) {    //如果返回值有内容就显示出来
                autoNode.show();
            } else {               //服务器端无内容返回 那么隐藏弹出框
                autoNode.hide();
                //弹出框隐藏的同时，高亮节点索引值也变成-1
                highlightindex = -1;
            }
        }
    }

    //点击页面隐藏自动补全提示框
    document.onclick = function (e) {
        var e = e ? e : window.event;
        var tar = e.srcElement || e.target;
        if (tar.id != search) {
            if ($("#" + auto).is(":visible")) {
                $("#" + auto).css("display", "none")
            }
        }
    }
}


//自动完成
function isChina(s) {
    var patrn = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi;
    if (!patrn.exec(s)) {
        return false;
    }
    else {
        return true;
    }
}
Util.autoCompleteNew = function (auto, search, mylist, Enlist) {
    var old_value = $("#" + search).attr("old_value");
    if (old_value != "" && $("#" + search).val() == old_value)
        old_value = "";
    if ($("#" + search).val() != old_value || old_value == "") {
        var autoNode = $("#" + auto);   //缓存对象（弹出框）
        var carlist = new Array();
        var n = 0;
        //old_value = $("#" + search).val();
        $("#" + search).attr("old_value", $("#" + search).val());
        if (!isChina($("#" + search).val())) {
            old_value = old_value.toUpperCase();
            for (i in Enlist) {
                if (Enlist[i] != null) {
                    if (Enlist[i].indexOf(old_value) == 0) {
                        carlist[n++] = mylist[i];
                    }
                }

            }
        }
        else {
            for (i in mylist) {
                if (mylist[i] != null) {
                    if (mylist[i].indexOf(old_value) >= 0) {
                        carlist[n++] = mylist[i];
                    }
                }

            }
        }
        if (carlist.length == 0) {
            autoNode.hide();
            return;
        }
        autoNode.empty();  //清空上次的记录
        for (i in carlist) {
            var wordNode = carlist[i];   //弹出框里的每一条内容
            var newDivNode = $("<div>").attr("id", i);    //设置每个节点的id值
            newDivNode.attr("style", "font:14px/25px arial;height:25px;padding:0 8px;cursor: pointer;");
            newDivNode.html(wordNode).appendTo(autoNode);  //追加到弹出框
            //鼠标移入高亮，移开不高亮
            newDivNode.mouseover(function () {
                if (highlightindex != -1) {
                    //原来高亮的节点要取消高亮（是-1就不需要了）
                    autoNode.children("div").eq(highlightindex).css("background-color", "white");
                }
                //记录新的高亮节点索引
                highlightindex = $(this).attr("id");
                $(this).css("background-color", "#ebebeb");
            });
            newDivNode.mouseout(function () {
                $(this).css("background-color", "white");
            });
            //鼠标点击文字上屏
            newDivNode.click(function () {
                //取出高亮节点的文本内容
                var comText = autoNode.hide().children("div").eq(highlightindex).text();
                highlightindex = -1;
                //文本框中的内容变成高亮节点的内容
                $("#" + search).val(comText);
            })
        }
        if (carlist.length > 0) {    //如果返回值有内容就显示出来
            autoNode.show();
        } else {               //服务器端无内容返回 那么隐藏弹出框
            autoNode.hide();
            //弹出框隐藏的同时，高亮节点索引值也变成-1
            highlightindex = -1;
        }
    }
    //点击页面隐藏自动补全提示框
    document.onclick = function (e) {
        var e = e ? e : window.event;
        var tar = e.srcElement || e.target;
        if (tar.id != search) {
            if ($("#" + auto).is(":visible")) {
                $("#" + auto).css("display", "none")
            }
        }
    }
}



//四色灯全开
Util.openFourLamp = function (op) {
    $.ajax({
        url: "/FourLampService/OpenFourLamp?op=" + op,
        type: "post",
        datatype: 'json',
        error: function () { alert("加载失败") },
        success: function (data) {
        }
    });
}



//
Util.getEvent_NameById = function (id) {
    var EventName = "";
    $.ajax({
        url: "/Intelligence_plan/GetEvent_Name_ByID?id=" + id,
        type: "get",
        datatype: 'text',
        async: false,
        success: function (data) {
            EventName = data;
        }
    });
    return EventName;
}

Util.getEventNameByCode = function (code) {
    var EventName = "";
    $.ajax({
        url: "/Alarm/GetEventNameByCode?code=" + code,
        type: "get",
        datatype: 'text',
        async: false,
        success: function (data) {
            EventName = data;
        }
    });
    return EventName;
}

//将/Date(.....)/转成日期 分 秒
Util.changeDateFormat = function (time) {
    if (time != null) {
        var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();;
        var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();;
        return date.getFullYear() + "-" + month + "-" + currentDate + " " + hour + ":" + minute + ":" + second;
    }
    else
        return "";
}
Util.changeDateFormats = function (time) {
    if (time != null) {
        var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();;
        var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();;
        return "" + hour + ":00";
    }
    else
        return "";
}
//日期
Util.changeToDateFormat = function (time) {
    if (time != null) {
        var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();;
        var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();;
        return date.getFullYear() + "-" + month + "-" + currentDate;
    }
    else
        return "";
}
//日期
Util.changeToDateFormatime = function (time) {
    if (time != null) {
        var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        //        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        //        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        //        var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(); ;
        //        var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds(); ;
        return date.getFullYear() + "-" + month;
    }
    else
        return "";
}
//获取本地当前时间
Util.getLocalTime = function () {
    var dateTime = new Date();
    var yy = dateTime.getFullYear();
    var MM = dateTime.getMonth() + 1 < 10 ? "0" + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1;
    var dd = dateTime.getDate() < 10 ? "0" + dateTime.getDate() : dateTime.getDate();
    var HH = dateTime.getHours() < 10 ? "0" + dateTime.getHours() : dateTime.getHours();
    var mm = dateTime.getMinutes() < 10 ? "0" + dateTime.getMinutes() : dateTime.getMinutes();
    var ss = dateTime.getSeconds() < 10 ? "0" + dateTime.getSeconds() : dateTime.getSeconds();
    var Now = yy + "-" + MM + "-" + dd + " " + HH + ":" + mm + ":" + ss;
    return Now;
}

//获取本地当天凌晨时间
Util.getLocalAMTime = function () {
    var dateTime = new Date();
    var yy = dateTime.getFullYear();
    var MM = dateTime.getMonth() + 1 < 10 ? "0" + (dateTime.getMonth() + 1) : dateTime.getMonth() + 1;
    var dd = dateTime.getDate() < 10 ? "0" + dateTime.getDate() : dateTime.getDate();
    var Now = yy + "-" + MM + "-" + dd + " 00:00:00";
    return Now;
}

//标准时间转化时、分、秒格式
Util.dateIntoHMS = function (time) {
    if (time != null) {
        var date = new Date(parseInt(time.replace("/Date(", "").replace(")/", ""), 10));
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();;
        var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();;
        return hour + ":" + minute + ":" + second;
    }
    else
        return "";
}

Util.translateToHMS = function (time) {
    if (time != null) {
        var date = new Date(time);
        var month = date.getMonth() + 1 < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
        var currentDate = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        var hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
        var minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();;
        var second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();;
        return hour + ":" + minute + ":" + second;
    }
    else
        return "";
}

Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

Util.stringDateFormat = function (strTime, format) {
    if (strTime != null) {
        var date = new Date(parseInt(strTime.replace("/Date(", "").replace(")/", ""), 10));
        return date.format(format);
    }
    else
        return "";
}








//方法contains，定义为不可枚举的属性，这样进行forin操作的时候不会遍历出来
//判断数组中是否包含某一项
Object.defineProperty(Array.prototype, "contains", {
    value: function (obj) {
        var length = this.length;
        while (length--) {
            if (this[length] == obj)
                return true;
        }
        return false;
    },
    writable: true,
    enumerable: false,
    configurable: true
});



/*删除数组中指定的值  txn 2015-6-24*/
Object.defineProperty(Array.prototype, "remove", {
    value: function (val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
            return true;
        }
        return false;
    },
    writable: true,
    enumerable: false,
    configurable: true
});

//两个number类型相乘获取精确结果
Util.accMul = function (arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    }
    catch (e) {
    }
    try {
        m += s2.split(".")[1].length
    } catch (e) {
    }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}



//RGB颜色码转换16进制   rgb(0, 153, 255) ---> #0099ff
//Util.rgbToHex = function (r, g, b) {
//    return ((r << 16) | (g << 8) | b).toString(16);
//}
Util.rgbToHex = function (rgb) {
    if (rgb.charAt(0) == '#')
        return rgb;

    var ds = rgb.split(/\D+/);
    var decimal = Number(ds[1]) * 65536 + Number(ds[2]) * 256 + Number(ds[3]);
    var s = decimal.toString(16);
    while (s.length < 6)
        s = "0" + s;
    return s;
}


//判断一个时间是否在某段时间内 格式："18:20:00"  参数 beginTime:开始时间  endTime:结束时间 nowTime:某个时间
Util.timeRange = function (beginTime, endTime, nowTime) {
    var strb = beginTime.split(":");
    if (strb.length != 3) {
        return false;
    }

    var stre = endTime.split(":");
    if (stre.length != 3) {
        return false;
    }

    var strn = nowTime.split(":");
    if (stre.length != 3) {
        return false;
    }
    var b = new Date();
    var e = new Date();
    var n = new Date();

    b.setHours(strb[0]);
    b.setMinutes(strb[1]);
    b.setSeconds(strb[2]);
    e.setHours(stre[0]);
    e.setMinutes(stre[1]);
    e.setSeconds(stre[2]);
    n.setHours(strn[0]);
    n.setMinutes(strn[1]);
    n.setSeconds(strn[2]);

    if (n.getTime() - b.getTime() > 0 && n.getTime() - e.getTime() < 0) {
        return true;
    } else {
        //alert("当前时间是：" + n.getHours() + ":" + n.getMinutes() + "，不在该时间范围内！");
        return false;
    }
}

Util.changeRowBGColor = function changeRowBGColor(dgId, rowIndex) {
    var $dg = $("#" + dgId);
    var d = $.data($dg[0], "datagrid");
    var opts = $dg.datagrid('options');

    opts.finder.getTr($dg[0], d.oldIndex)
            .removeClass("datagrid-row-selected")
            .removeClass("datagrid-row-selected-ext")
            .attr("style", d.oldStyle);
    opts.finder.getTr($dg[0], rowIndex)
            .removeClass("datagrid-row-over")
            .addClass("datagrid-row-selected-ext");
    d.oldStyle = $(opts.finder.getTr($dg[0], rowIndex)).attr("style");
    $(opts.finder.getTr($dg[0], rowIndex)).attr("style", "")
    d.oldIndex = rowIndex;
}
Util.rowOut = function rowOut(dgId, rowIndex) {
    var $dg = $("#" + dgId);
    var d = $.data($dg[0], "datagrid");
    var opts = $dg.datagrid('options');

    opts.finder.getTr($dg[0], d.oldIndex)
            .removeClass("datagrid-row-selected")
            .removeClass("datagrid-row-selected-ext")
            .attr("style", d.oldStyle);
    d.oldIndex = undefined;
    d.oldStyle = "";
}

//告警弹出框添加流程图
Util.getEventNameByCode = function (alarmEventId) {
    $.ajax({
        type: "post", url: "/Alarm/GetEventNameInfoByCode", data: { eventCode: alarmEventId },
        success: function (data) {
            if (data.status == "OK") {
                //如果成功则加载数据
                var str1 = '{"class":"go.GraphLinksModel","linkFromPortIdProperty":"fromPort","linkToPortIdProperty":"toPort","nodeDataArray":';
                var str3 = ',"linkDataArray":';
                $("#SavedModel").text(str1 + data.data1 + str3 + data.data2 + "}");
                var rand = Math.random() * 1000;
                var divid = Math.ceil(rand);

                myDiagramDivId = "div0" + divid;//

                $("#alarmflowChart").empty()//首先清除原来的div

                var $myDiagramDiv = $('<div id=div0' + divid + ' style="background-color: #FFFFFF;height:100%;width:100%;overflow:hidden"></div>')

                $("#alarmflowChart").append($myDiagramDiv);//重新添加

                Util.ShowCmd();//调用方法显示预案
            }
            else {
                //  alert("加载失败：" + data.msg);
                $("#alarmflowChart").text(data.msg);
                $("#alarmflowChart").css("color", "white");
            }

        },
        error: function () {
            alert("加载流程图失败");

        }
    });
}

var myDiagramDivId;//全局变量，存放图的divID
//显示预案的结构图
Util.ShowCmd = function () {
    var $ = go.GraphObject.make;//声明对象（全局的对象）
    var myDiagram =
      $(go.Diagram, myDiagramDivId,//创建画布，
        {
            isReadOnly: true,
            initialContentAlignment: go.Spot.Center, // 中心图内容
            "draggingTool.dragsTree": true,//禁止拖动
            "undoManager.isEnabled": true, // 启用使用撤销和重做CTRL-Y
            layout: $(go.TreeLayout, // 指定一个diagram.layout安排树
                      { angle: 90, layerSpacing: 30 })
        });

    // 前面定义的模板，为模板的各个属性赋值
    myDiagram.nodeTemplate =
       $(go.Node, "Auto",
        { width: 80, height: 50 },// the Shape will go around the TextBlock
         $(go.Shape, "RoundedRectangle", { strokeWidth: 0 },
           // Shape.fill is bound to Node.data.color
           new go.Binding("fill", "color")),
         $(go.TextBlock,
           { margin: 8 },  // some room around the text
           // TextBlock.text is bound to Node.data.key
           new go.Binding("text", "text"))
       );

    // 定义一个链接模板路线正交，没有箭头
    myDiagram.linkTemplate =
      $(go.Link,
        { routing: go.Link.Orthogonal, corner: 5 },
        $(go.Shape, { strokeWidth: 3, stroke: "#555" })); // 链接的形状

    var model = $(go.TreeModel);
    var str = document.getElementById("SavedModel").value;
    myDiagram.model = go.Model.fromJson(str);

}

Util.updateConfirmState = function (id, personId, confirmResult, location, content) {
    var result = false;
    $.ajax({
        url: "/Alarm/ConfirmAlarmMessage",
        type: "post",
        data: "alarmId=" + id + "&ssoid=" + personId + "&confirmResult=" + confirmResult + "&location=" + location + "&content=" + content,
        datatype: 'json',
        async: false,
        success: function (data) {
            alert(data.message);
            if (data.state == 0) {
                result = true;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("确警出现"+XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
    return result;
}
