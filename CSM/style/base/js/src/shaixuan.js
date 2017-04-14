/*    var dlNum  =$("#selectList").find("dl");
    //for (i = 0; i < dlNum.length; i++) {
     //   $(".hasBeenSelected .clearList").append("<div class=\"selectedInfor selectedShow\" style=\"display:none\"><span></span><label></label><em></em></div>");
   // }
    
    var refresh = "true";*/

// $(".listIndex label").live("click",function(){
//		var Asele=$(".listIndex").find("a");
//        var text =$(this).text();
//        var selectedShow = $(".selectedShow");
//        var textTypeIndex =$(this).parents("dl").index();//父级dl 的索引值
//        var textType =$(this).parent("dd").siblings("dt").text();//取上一层的文本
//        index = textTypeIndex;
//        $(".clearDd").show();
//        $(".selectedShow").eq(index).show();
//		$(this).find("a").addClass("selected");
//
//		$(this).find("input").attr("checked",true);
//		var infor='<div class=\"selectedInfor selectedShow\"><span>'+textType+'</span><label>'+text+'</label><em></em></div>'
//         $(".hasBeenSelected .clearList").append(infor);
//		selectedShow.eq(index).find("span").text(textType);
//        selectedShow.eq(index).find("label").text(text);
//		判断个数显示
//       var show = $(".selectedShow").length - $(".selectedShow:hidden").length;
//		if (show > 1) {
//         $(".eliminateCriteria").show();
//    	}
//       
//    });
/*	 $(".listIndex label").toggle(function(){
		 var Asele=$(".listIndex").find("a");
        var text =$(this).text();
        var selectedShow = $(".selectedShow");
        var textTypeIndex =$(this).parents("dl").index();//父级dl 的索引值
        var textType =$(this).parent("dd").siblings("dt").text();//取上一层的文本
        index = textTypeIndex;
        $(".clearDd").show();
        $(".selectedShow").eq(index).show();
		$(this).find("a").addClass("selected");

		$(this).find("input").attr("checked",true);
		var infor='<div class=\"selectedInfor selectedShow\"><span>'+textType+'</span><label>'+text+'</label><em></em></div>';
         $(".hasBeenSelected .clearList").append(infor);
		 
	},function(){
		$(this).find("a").removeClass("selected");
		$(this).find("input").attr("checked",false);
		});*/

//	 $(".listIndex label").toggle(function(){
//			 var text =$(this).text();
//        var selectedShow = $(".selectedShow");
//       var textTypeIndex =$(this).parents("dl").index();
//       var textType =$(this).parent("dd").siblings("dt").text();
//	           index = textTypeIndex -(2);
//			 $(this).find("a").addClass("selected");
//			 $(this).find("input").attr("checked",true);
//			 selectedShow.eq(index).find("span").text(textType);
//			 $(".selectedShow").eq(index).show();
//			  $(".clearDd").show();
//			  var show = $(".selectedShow").length - $(".selectedShow:hidden").length;
//			//if (show > 1) {
////					   $(".eliminateCriteria").show();
////				}
//		 },function(){
//			 $(this).find("a").removeClass("selected");
//	     	 $(this).find("input").attr("checked",false);
//			 });

    //$(".selectedShow em").live("click",function(){
    //    $(this).parents(".selectedShow").remove();
    //    var textTypeIndex =$(this).parents(".selectedShow").index();
    //    index = textTypeIndex;
    //    $("#selectList").eq(index).find("a").removeClass("selected");
	//	$("#selectList").eq(index).find("input").attr("checked",false);
        
    //  if($(".listIndex .selected").length < 2){
    //       $(".eliminateCriteria").hide();
    //    }
    //});   
    //$(".eliminateCriteria").live("click",function(){
    //    $(".selectedShow").remove();
    //    $(this).hide();
    //    $(".listIndex a ").removeClass("selected")
	//	$(".listIndex a ").prev().attr("checked",false);
    //}); 


//$(function () {
//    $(".selectedShow em").click(function () {
//        $(this).parents(".selectedShow").remove();
//        var textTypeIndex = $(this).parents(".selectedShow").index();
//        index = textTypeIndex;
//        $("#selectList").eq(index).find("a").removeClass("selected");
//        $("#selectList").eq(index).find("input").attr("checked", false);

//        if ($(".listIndex .selected").length < 2) {
//            $(".eliminateCriteria").hide();
//        }
//    });
//    $(".eliminateCriteria").click(function () {
//        $(".selectedShow").remove();
//        $(this).hide();
//        $(".listIndex a ").removeClass("selected")
//        $(".listIndex a ").prev().attr("checked", false);
//    });
//})

//$('.clearDd').show();




var okSelect = []; //已经选择好的
var oSelectList = document.getElementById('selectList');

var oClearList = $(".hasBeenSelected .clearList");
var oCustext1 = document.getElementById('custext1');
var oCustext2 = document.getElementById('custext2');
var aItemTxt = oSelectList.getElementsByTagName('a');
var isCusPrice = false;//是否自定义价格
var radioVal = '';

var sTime = "";  //查询的开始时间
var eTime = "";  //查询的结束时间

oSelectList.onclick = function (e, a) {


    var ev = e || window.event;
    var tag = ev.target || ev.srcElement;
    if (!tag) return;
    var tagName = tag.nodeName.toUpperCase();
    var infor = '';
    var aRadio = $(":radio");
    if (isCusPrice) {
        radioVal = oCustext1.value + '-' + oCustext2.value + '元';
    } else {
        radioVal = '';
    }

    if (tagName == 'INPUT') {
        if (tag.getAttribute('type').toUpperCase() == 'CHECKBOX') { //如果点击 的是 input checkbox
            var val = next(tag);
            if (tag.checked) {
                var sType = prev(parents(tag, 'dd')).innerHTML;
                val && okSelect.push(trim(val.innerHTML) + '|' + sType)
            } else {
                var sType = prev(parents(tag, 'dd')).innerHTML;
                delStr(val.innerHTML + '|' + sType, okSelect)
            }
        } else if (tag.getAttribute('type').toUpperCase() == 'BUTTON') { //如果点击的是 自定义价格按钮
            radioVal = oCustext1.value + '-' + oCustext2.value + '元';
            isCusPrice = true;

            for (var i = 0; i < aRadio.length; i++) {
                aRadio[i].checked = false;
            }
        } else if (tag.getAttribute('type').toUpperCase() == 'RADIO') {
            if (tag.name == "radioTime") {
                $("#alarmStartTime").val("");
                $("#alarmEndTime").val("");
            }
        }
    }

    if (tagName == 'A') { //如果点击 的是 A
        var oPrevInput = prev(tag);

        if (!oPrevInput) { //如果上一个节点没有则认为点击的是 '不限'
            var parent = parents(tag, 'dd');
            var aItem = parent.getElementsByTagName('label');
            if (parent.getAttribute('data-more')) {
                var allCheckbox = next(parents(parent, 'dl')).getElementsByTagName('label');
                var sType = '';
                for (var i = 0, len = allCheckbox.length; i < len; i++) {
                    sType = prev(parents(allCheckbox[i], 'dd')).innerHTML;
                    delStr(text(allCheckbox[i]) + '|' + sType, okSelect);
                    allCheckbox[i].children[0].checked = false;
                }
            }

            if (trim(prev(parent).innerHTML) == '报警时间') { //这里是直接根据 text来比较的.建议加个自定义属性作标识符
                for (var i = 0; i < aRadio.length; i++) {
                    if (aRadio[i].name == "radioTime") {
                        aRadio[i].checked = false;
                    }
                    // aRadio[i].checked = false;
                    $("#alarmStartTime").val("");
                    $("#alarmEndTime").val("");
                }
                isCusPrice = false;
                a = true;
                radioVal = '';
            } else {
                var sType = '';
                for (var i = 0, len = aItem.length; i < len; i++) {
                    sType = prev(parents(aItem[i], 'dd')).innerHTML;
                    delStr(text(aItem[i]) + '|' + sType, okSelect);
                    aItem[i].children[0].checked = false;
                }
            }
        } else {

            if (oPrevInput && oPrevInput.getAttribute('type').toUpperCase() == 'RADIO') { //radio

                isCusPrice = false;
                oPrevInput.checked = true;
                if (oPrevInput.name == "radioTime") {
                    $("#alarmStartTime").val("");
                    $("#alarmEndTime").val("");
                }
            }

            if (oPrevInput && oPrevInput.getAttribute('type').toUpperCase() == 'CHECKBOX') { //获取checkbox
                if (oPrevInput.checked) {
                    oPrevInput.checked = false;
                    var sType = prev(parents(tag, 'dd')).innerHTML;
                    delStr(tag.innerHTML + '|' + sType, okSelect);
                } else {
                    oPrevInput.checked = true;
                    var sType = prev(parents(tag, 'dd')).innerHTML;
                    okSelect.push(trim(tag.innerHTML) + '|' + sType)
                }
            }
        }
    };


    var inStartTime = $("#alarmStartTime").val();
    var inEndTime = $("#alarmEndTime").val();
    // var selectTime = $(':radio[name="radioTime"]');
    var selectTime = document.getElementsByName("radioTime");
    if (inStartTime == "" && inEndTime == "") {

        for (var i = 0; i < selectTime.length; i++) {
            if (selectTime[i].checked) {
                radioVal = next(selectTime[i]).innerHTML;
                var RadioName = SearchRadioName(selectTime[i].name);
                infor += '<div class=\"selectedInfor selectedShow\"><span>' + RadioName + '</span><label>' + radioVal + '</label><em p="2"></em></div>'
                //var timeRadio = $(':radio[name="radioTime"]:checked').val();

            }
        }
    }
    else {
        // $(':radio[name="radioTime"]').checked = false;
        for (var i = 0; i < selectTime.length; i++) {
            selectTime[i].checked = false;
        }
        if (inStartTime == "" && inEndTime != "") {
            infor += '<div class=\"selectedInfor selectedShow\"><span>' + "报警时间" + '</span><label>' + "<" + inEndTime + '</label><em p="3"></em></div>';
        } else if (inStartTime != "" && inEndTime == "") {
            infor += '<div class=\"selectedInfor selectedShow\"><span>' + "报警时间" + '</span><label>' + ">" + inStartTime + '</label><em p="3"></em></div>';
        }
        else if (inStartTime != "" && inEndTime != "") {
            infor += '<div class=\"selectedInfor selectedShow\"><span>' + "报警时间" + '</span><label>' + inStartTime + "--" + inEndTime + '</label><em p="3"></em></div>';
        }
    }

    //var selectLevel = $(':radio[name="radioLevel"]');
    var selectLevel = document.getElementsByName("radioLevel");
    for (var i = 0; i < selectLevel.length; i++) {
        if (selectLevel[i].checked) {
            radioVal = next(selectLevel[i]).innerHTML;
            var RadioName = SearchRadioName(selectLevel[i].name);
            infor += '<div class=\"selectedInfor selectedShow\"><span>' + RadioName + '</span><label>' + radioVal + '</label><em p="2"></em></div>'
            //  var timeRadio = $(':radio[name="radioTime"]:checked').val();

        }
    }
    //var selectState = $(':radio[name="radioState"]');
    var selectState = document.getElementsByName("radioState");
    for (var i = 0; i < selectState.length; i++) {
        if (selectState[i].checked) {
            radioVal = next(selectState[i]).innerHTML;
            var RadioName = SearchRadioName(selectState[i].name);
            infor += '<div class=\"selectedInfor selectedShow\"><span>' + RadioName + '</span><label>' + radioVal + '</label><em p="2"></em></div>'
            //  var timeRadio = $(':radio[name="radioTime"]:checked').val();

        }
    }
    //for (var i = 0; i < aRadio.length; i++) {
    //    if (aRadio[i].checked) {
    //        radioVal = next(aRadio[i]).innerHTML;
    //        var RadioName = SearchRadioName(aRadio[i].name);
    //        infor += '<div class=\"selectedInfor selectedShow\"><span>' + RadioName + '</span><label>' + radioVal + '</label><em p="2"></em></div>'
    //        isCusPrice = false;
    //    }


    //}



    if (a) {
        isCusPrice = false;
    }
    if (a && a == 2) {
        for (var i = 0; i < aRadio.length; i++) {
            aRadio[i].checked = false;
        }
    }

    var vals = [];
    for (var i = 0, size = okSelect.length; i < size; i++) {
        vals = okSelect[i].split('|');
        infor += '<div class=\"selectedInfor selectedShow\"><span>' + vals[1] + '</span><label>' + vals[0] + '</label><em></em></div>';

    }
    if (infor == "")
        oClearList.html("");
    else
        oClearList.html(infor);
    if (tagName != "DD")  //如果点击的地方不是空白处，开始查询
    {
        //  var sub = [];
        ////  var times = "";
        //  var level = -100;
        //  var state = -100;
        //  sTime = "";
        //  eTime = "";
        //  var timeRadio = $(':radio[name="radioTime"]:checked').val();
        //  if (timeRadio != undefined) {
        //      switch (timeRadio) {
        //          case "1": getTodayInfo(); break;
        //          case "2": getWeekInfo(); break;
        //          case "3": getMonthInfo();break;
        //          case "4": getSeasonInfo();break;
        //          case "5": getFirstHalfYearInfo(); break;
        //          case "6": getLatterHalfYearInfo(); break;
        //          case "7": getYearInfo(); break;
        //          default: break;
        //      }
        //  }
        //  else
        //  {
        //      sTime = inStartTime;
        //      eTime = inEndTime;
        //  }
        //  var levelRadio = $(':radio[name="radioLevel"]:checked').val();
        //  if (levelRadio != undefined)
        //  {
        //      level = parseInt(levelRadio);
        //  }
        //  var stateRadio = $(':radio[name="radioState"]:checked').val();
        //  if (stateRadio != undefined)
        //  {
        //      state = parseInt(stateRadio);
        //  }

        //  var ss = $('input:checkbox[name=checkbox2]:checked');
        //  for (var i = 0, size = ss.length; i < size; i++) {
        //      sub.push(parseInt(ss[i].value));
        //  }
        //  deviceAlarm.DeviceAlarmList(pageIndex, pageSize, sTime, eTime, -100, sub, level, state);
        deviceAlarm.GetDeviceAlarmList(pageIndex, pageSize);
    }



};
$('div.eliminateCriteria').click(function () {
    $(oSelectList).find('input').attr('checked', false);
    $("#alarmStartTime").val("");
    $("#alarmEndTime").val("");
    radioVal = '';
    isCusPrice = false;
    okSelect.length = 0;
    $(oSelectList).trigger('click', 1);

});

//$('.clearList').find('em').live('click', function () {
//    var self = $(this);
//    if (self.attr("p") == "3") {
//        $("#alarmStartTime").val("");
//        $("#alarmEndTime").val("");
//    }
//    var val = self.prev().html() + '|' + self.prev().prev().html();
//    var n = -1;
//    var a = this.getAttribute('p') || 1;
//    self.die('click');
//    for (var i = 0, len = aItemTxt.length; i < len; i++) {
//        var html = val.split('|')[0];
//        if (trim(aItemTxt[i].innerHTML) == html) {
//            prev(aItemTxt[i]).checked = false;
//            break;
//        }
//    };
//    delStr(val, okSelect);
//    $(oSelectList).trigger('click', a);

//});

function delStr(str, arr) { //删除数组给定相同的字符串
    var n = -1;
    for (var i = 0,
    len = arr.length; i < len; i++) {
        if (str == arr[i]) {
            n = i;
            break;
        }
    }
    n > -1 && arr.splice(n, 1);
};
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '')
};
function text(e) {
    var t = '';
    e = e.childNodes || e;
    for (var j = 0; j < e.length; j++) {
        t += e[j].nodeType != 1 ? e[j].nodeValue : text(e[j].childNodes);
    }
    return trim(t);
}

function prev(elem) {
    do {
        elem = elem.previousSibling;
    } while (elem && elem.nodeType != 1);
    return elem;
};

function next(elem) {
    do {
        elem = elem.nextSibling;
    } while (elem && elem.nodeType != 1);
    return elem;
}

function parents(elem, parents) {  //查找当前祖先辈元素需要的节点  如 parents(oDiv, 'dd') 查找 oDiv 的祖先元素为dd 的
    if (!elem || !parents) return;
    var parents = parents.toUpperCase();
    do {
        elem = elem.parentNode;
    } while (elem.nodeName.toUpperCase() != parents);
    return elem;
};


function SearchRadioName(Name) {
    var RadioName = "";
    switch (Name) {
        case "radioTime":
            RadioName = "报警时间";
            break;
        case "radioLevel":
            RadioName = "报警级别";
            break;
        case "radioState":
            RadioName = "确警状态";
            break;
    }
    return RadioName;

}





//日
function getTodayInfo() {
    var d = new Date();
    //$("#createTime").val(d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) + ' 00:00:00');
    //$("#endTime").val(d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) + ' 23:59:59');

    deviceAlarm.sTime = d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) + ' 00:00:00';
    deviceAlarm.eTime = d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (d.getDate() < 10 ? "0" + d.getDate() : d.getDate()) + ' 23:59:59';

}


//周
function getWeekInfo() {
    var d = new Date();
    var n = d.getDay();
    var start = new Date();
    var end = new Date();
    if (n == 0) {
        start.setDate(d.getDate() - 6);
        end.setDate(d.getDate() - n);
    }
    else
    {
        start.setDate(d.getDate() - n + 1);
        end.setDate(d.getDate() - n + 7);
    }

    start = start.getFullYear() + "-" + (start.getMonth() + 1 < 10 ? "0" + (start.getMonth() + 1) : start.getMonth() + 1) + "-" + (start.getDate() < 10 ? "0" + start.getDate() : start.getDate()) + ' 00:00:00';
    end = end.getFullYear() + "-" + (end.getMonth() + 1 < 10 ? "0" + (end.getMonth() + 1) : end.getMonth() + 1) + "-" + (end.getDate() < 10 ? "0" + end.getDate() : end.getDate()) + ' 23:59:59';
    //$("#createTime").val(start);
    //$("#endTime").val(end);
    deviceAlarm.sTime = start;
    deviceAlarm.eTime = end;

}

//月
function getMonthInfo() {
    var d = new Date();
    var ThisYear = d.getFullYear();
    var t_month = d.getMonth() + 1;
    var Daynum = getDaysInMonth(ThisYear, t_month);
    //$("#createTime").val(d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + '-01 00:00:00');
    //$("#endTime").val(d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (Daynum < 10 ? "0" + Daynum : Daynum) + ' 23:59:59');

    deviceAlarm.sTime = d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + '-01 00:00:00';
    deviceAlarm.eTime = d.getFullYear() + '-' + (d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1) + '-' + (Daynum < 10 ? "0" + Daynum : Daynum) + ' 23:59:59';
    //getDeviceData(pageIndex, pageSize)
}

//获取一个最后一天
function getDaysInMonth(ThisYear, t_month) {
    var count = 0
    switch (t_month) {

        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            count = 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            count = 30;
            break;
        case 2:
            if (ThisYear % 4 == 0)
                count = 29;
            else
                count = 28;
            if ((ThisYear % 100 == 0) & (ThisYear % 400 != 0))
                count = 28;
    }
    return count;
}
//获得本季度的开端月份 
function getQuarterStartMonth() {
    var nowMonth = new Date().getMonth(); //当前月 
    var quarterStartMonth = 0;
    if (nowMonth < 3) {
        quarterStartMonth = 0;
    }
    if (2 < nowMonth && nowMonth < 6) {
        quarterStartMonth = 3;
    }
    if (5 < nowMonth && nowMonth < 9) {
        quarterStartMonth = 6;
    }
    if (nowMonth > 8) {
        quarterStartMonth = 9;
    }
    return quarterStartMonth;
}

//格局化日期：yyyy-MM-dd 
function formatDate(date) {
    var myyear = date.getFullYear();
    var mymonth = date.getMonth() + 1;
    var myweekday = date.getDate();

    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
}


//获得本季度的开端日期 
function getQuarterStartDate() {
    var d = new Date();
    var nowYear = d.getYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0;
    var quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1);
    return formatDate(quarterStartDate);
}

//获得某月的天数 
function getMonthDays(myMonth) {
    var nowYear = new Date().getYear(); //当前年
    var monthStartDate = new Date(nowYear, myMonth, 1);
    var monthEndDate = new Date(nowYear, myMonth + 1, 1);
    var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
}

//或的本季度的停止日期 
function getQuarterEndDate() {
    var d = new Date();
    var nowYear = d.getYear(); //当前年
    nowYear += (nowYear < 2000) ? 1900 : 0;
    var quarterEndMonth = getQuarterStartMonth() + 2;
    var quarterStartDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth));
    return formatDate(quarterStartDate);
}

//本季
function getSeasonInfo() {
    var startSeason = getQuarterStartDate();
    var endSeason = getQuarterEndDate();
    //$("#createTime").val(startSeason + ' 00:00:00');
    //$("#endTime").val(endSeason + ' 23:59:59');

    deviceAlarm.sTime = startSeason + ' 00:00:00';
    deviceAlarm.eTime = endSeason + ' 23:59:59';

}



//上半年
function getFirstHalfYearInfo() {
    //$("#createTime").val(new Date().getFullYear() + '-01-01 00:00:00');
    //$("#endTime").val(new Date().getFullYear() + '-06-30 23:59:59');

    deviceAlarm.sTime = new Date().getFullYear() + '-01-01 00:00:00';
    deviceAlarm.eTime = new Date().getFullYear() + '-06-30 23:59:59';

}
//下半年
function getLatterHalfYearInfo() {
    //$("#createTime").val(new Date().getFullYear() + '-07-01 00:00:00');
    //$("#endTime").val(new Date().getFullYear() + '-12-31 23:59:59');

    deviceAlarm.sTime = new Date().getFullYear() + '-07-01 00:00:00';
    deviceAlarm.eTime = new Date().getFullYear() + '-12-31 23:59:59';

}
//本年
function getYearInfo() {
    //$("#createTime").val(new Date().getFullYear() + '-01-01 00:00:00');
    //$("#endTime").val(new Date().getFullYear() + '-12-31 23:59:00');

    deviceAlarm.sTime = new Date().getFullYear() + '-01-01 00:00:00';
    deviceAlarm.eTime = new Date().getFullYear() + '-12-31 23:59:00';

}