/*================================================================弹框 start============================================================*/

$(function () {
    $(".loaded").css("display", "block");

    $(document).click(function (e) {
        e.stopPropagation();
        $(".about-frame").hide();
        $(".configure-frame").hide();
        $(".phone-popup").hide();
        $(".starts-frame").hide();
        $(".dropdownMenu").hide();
    })
    //主控园区
    $(".starts-frame .about-close").click(function (e) {
        $(".starts-frame").hide();
        e.stopPropagation();
    })
    $(".starts-frame").click(function (e) {
        e.stopPropagation();
    })
    $(".starts").click(function (e) {
        e.stopPropagation();
        $(".starts-frame").show();
        $(".about-frame").hide();
        $(".configure-frame").hide();
        $(".alarms-frame").hide();
        $(".phone-popup").hide();
        $(".dropdownMenu").hide();

    })
    //配置弹框
    $(".configure").click(function (e) {
        $(".configure-frame").show();
        $(this).tooltip("hide");
        $(".about-frame").hide();
        $(".alarms-frame").hide();
        $(".phone-popup").hide();
        $(".starts-frame").hide();
        $(".dropdownMenu").hide();
        e.stopPropagation();
    })
    $(".configure-frame").click(function (e) {
        e.stopPropagation();
    })
    $(".configure-frame .about-close").click(function (e) {
        $(".configure-frame").hide();
        e.stopPropagation();
    })
    //关于弹窗
    $(".about").click(function (e) {
        $(".about-frame").show();
        $(this).tooltip("hide");
        $(".configure-frame").hide();
        $(".alarms-frame").hide();
        $(".phone-popup").hide();
        $(".starts-frame").hide();
        $(".dropdownMenu").hide();
        e.stopPropagation();
    })
    $(".about-frame").click(function (e) {
        e.stopPropagation();
    })
    $(".about-frame .about-close").click(function (e) {
        $(".about-frame").hide();
        e.stopPropagation();
       
    })
    
    //告警弹框
    $(".alarm-panel").click(function (e) {
        $(".alarms-frame").show();
        $(this).tooltip("hide");
        $(".dropdownMenu").hide();
     
    })
    $(".alarm-panel").mouseover(function () {
        $(this).tooltip("show");
    })
    $(".alarms-frame").click(function (e) {
        e.stopPropagation();
       
    })
    $(".alarms-frame .about-close").click(function (e) {
        $(".alarms-frame").hide();
        e.stopPropagation();
    })
  
    $(".user-btn").click(function () {
        $(".dropdownMenu").show();
        $(".about-frame").hide();
        $(".configure-frame").hide();
        $(".phone-popup").hide();
        $(".alarms-frame").hide();
        $(".starts-frame").hide();
    })


    //应急电话弹窗
    //$(".phone").click(function () {
    //    $(".phone-popup").show();
    //    $(this).tooltip("hide");
    //    $(".about-frame").hide();
    //    $(".configure-frame").hide();
    //    $(".alarms-frame").hide();
    //    $(".starts-frame").hide();
    //    return false;//阻止冒泡
    //})
    //$(".phone-popup .about-close").click(function () {
    //    $(".phone-popup").hide();
    //    return false;
        
    //})

  
    //视频播放器弹框
    $(".videoplayer-frame .about-close").click(function () {
        $(".videoplayer-frame").hide();
    })
    $(".adjustCenter").click(function () {
        $(this).hide();
        $(".adjustCenter2").show();
    })
    $(".adjustCenter2").click(function () {
        $(this).hide();
        $(".adjustCenter").show();
    })

    //人工上报
    $(".manpower-frame .about-close").click(function () {
        $(".manpower-frame").dialog('close');
    })

  
    //处警弹框
    $(".aac-frame .about-close").click(function () {
        $(".aac-frame").dialog('close');
    })

    //视频下载
    $("#videoDownloadDialog .about-close").click(function () {
        $("#videoDownloadDialog").dialog('close');
    })

    //录像播放弹窗
    //$(".cameraDiv .about-close").click(function () {
    //    $(".cameraDiv").hide();
    //})
    
    //地图配置弹框
    $(".nextStep").click(function () {
        $(".mapDevice1").hide();
        $(".mapDevice2").show();
    })
    $(".upStep").click(function () {
        $(".mapDevice2").hide();
        $(".mapDevice1").show();
    })
    $(".map-window .about-close").click(function () {
        $(".map-window").dialog('close');
    })
    $(".map-window2 .about-close").click(function () {
        $(".map-window2").dialog('close');
    })
    $(".maps-config .about-close").click(function () {
        $(".maps-config").dialog('close');
    })
    $(".map-detils .about-close").click(function () {
        $(".map-detils").dialog('close');
    })
    $(".superball .about-close").click(function () {
        $(".superball").dialog('close');
    })
    $(".recycle-frame .about-close").click(function () {
        $(".recycle-frame").dialog('close');
    })
    $(".recycleBox").click(function () {
        $(".recycle-frame").dialog('open');
    })
    //$(".map_add").click(function () {
    //    $(".map-detils").dialog('open');
    //})
    $(".map_change").click(function () {
        //$(".map-window").dialog('open');
        //$(".map-detils").dialog('open');
    })
    //$(".map_delete").click(function () {
    //    $(".map-window").dialog('open');
    //    //$(".map-detils").dialog('open');
    //})
    $(".map-add").click(function () {
        $(".map-window").dialog('open');
    })
    //$(".map-view").click(function () {
    //    $(".maps-config").dialog('open');
    //})
    $(".map-box").click(function () {
        $(this).addClass("map-current").siblings().removeClass("map-current");
    })
    $(".view-more").mousemove(function () {
        $(this).next(".mapConfig").show();
    })
    $(".mapConfig").mouseleave(function () {
        $(this).hide();

    })
    $(".detilsRound1").click(function () {
        $(".detils-round1").addClass("detils-activeBg");
        $(".detils-round2").removeClass("detils-activeBg");
        $(".detilsword1").addClass("detils-activeC");
        $(".detilsword2").removeClass("detils-activeC");
        $(".detilsBottom1").show();
        $(".detilsBottom2").hide();
        $(".detils-line1").show();
        $(".detils-line2").hide();
    })
    $(".detilsRound2").click(function () {
        $(".detils-round2").addClass("detils-activeBg");
        $(".detils-round1").removeClass("detils-activeBg");
        $(".detilsword2").addClass("detils-activeC");
        $(".detilsword1").removeClass("detils-activeC");
        $(".detilsBottom2").show();
        $(".detilsBottom1").hide();
        $(".detils-line2").show();
        $(".detils-line1").hide();
    })
    $(".detils-bottom1").click(function () {
        $(".detils-bottom1").addClass("detils-activeL");
        $(".detils-bottom2").removeClass("detils-activeL");
    })
    $(".detils-bottom2").click(function () {
        $(".detils-bottom2").addClass("detils-activeL");
        $(".detils-bottom1").removeClass("detils-activeL");
    })

    //记录查看详情弹框
    $(".schedule-frame .about-close").click(function () {
        $(".schedule-frame").hide();
    })


    //视频巡更弹框
    $(".schedule-window .window-close").click(function () {
        $(".schedule-window").hide();
    })
    //预案条例弹框
    $(".ordinance-frame .ordinance-close").click(function () {
        $(".ordinance-frame").hide();
    })


    //信息弹框
    $(".info-close").click(function () {
        $(".infomen").hide();
    })
    //设备注册弹框
    $(".login-frame .about-close").click(function () {
        $(".login-frame").hide();
    })
    //视频巡更弹框复选框选中效果；
    var _input = $("input[name='someBox']:checkbox");
    _input.click(function () {
        var _check = $(this).is(":checked");
        if (_check == true) {
            $(".tr_none").show();
        } else {
            $(".tr_none").hide();
        }
    })
    //视频巡更定期模式选中效果



    //预案注册复选框选中效果；

    var _input2 = $("input[name='someBox2']:checkbox");
    var _input3 = $("input[name='someBox3']:checkbox");
    var _input4 = $("input[name='someBox4']:checkbox");
    var _input5 = $("input[name='someBox5']:checkbox");
    _input2.click(function () {
        var _check = $(this).is(":checked");
        if (_check == true) {
            $(".tr_none2").show();
        } else {
            $(".tr_none2").hide();
        }
    })
    _input3.click(function () {
        var _check = $(this).is(":checked");
        if (_check == true) {
            $(".tr_none3").show();
        } else {
            $(".tr_none3").hide();
        }
    })
    _input4.click(function () {
        var _check = $(this).is(":checked");
        if (_check == true) {
            $(".tr_none4").show();
        } else {
            $(".tr_none4").hide();
        }
    })
    _input5.click(function () {
        var _check = $(this).is(":checked");
        if (_check == true) {
            $(".tr_none5").show();
        } else {
            $(".tr_none5").hide();
        }
    })

    $(".datetime0").click(function () {
        var radio0 = $("input[value='0']:radio");
        var _check = $(this).is(":checked");
        $(".frenone0").show();
        $(".frenone1").hide();
        $(".frenone2").hide();
        $(".frenone3").hide();
        $(".frenone4").hide();
        $(".frenone").show();
        //$('#startTimeInput').attr("disabled", true);
        //$('#endTimeInput').attr("disabled", true);
    })
    $(".datetime1").click(function () {
        var radio1 = $("input[value='1']:radio");
        var _check = $(this).is(":checked");
        $(".frenone0").hide();
        $(".frenone1").show();
        $(".frenone2").hide();
        $(".frenone3").hide();
        $(".frenone4").hide();
        $(".frenone").show();
        //$('#startTimeInput').attr("disabled", false);
        //$('#endTimeInput').attr("disabled", false);
    })
    $(".datetime2").click(function () {
        var radio2 = $("input[value='2']:radio");
        var _check = $(this).is(":checked");
        $(".frenone0").hide();
        $(".frenone1").hide();
        $(".frenone2").show();
        $(".frenone3").hide();
        $(".frenone4").hide();
        $(".frenone").show();
        //$('#startTimeInput').attr("disabled", false);
        //$('#endTimeInput').attr("disabled", false);
    })
    $(".datetime3").click(function () {
        var radio3 = $("input[value='3']:radio");
        var _check = $(this).is(":checked");
        $(".frenone0").hide();
        $(".frenone1").hide();
        $(".frenone2").hide();
        $(".frenone3").show();
        $(".frenone4").hide();
        $(".frenone").show();
        //$('#startTimeInput').attr("disabled", false);
        //$('#endTimeInput').attr("disabled", false);
    })
    $(".datetime4").click(function () {
        var radio4 = $("input[value='4']:radio");
        var _check = $(this).is(":checked");
        $(".frenone0").hide();
        $(".frenone1").hide();
        $(".frenone2").hide();
        $(".frenone3").hide();
        $(".frenone4").show();
        $(".frenone").show();
        //$('#startTimeInput').attr("disabled", false);
        //$('#endTimeInput').attr("disabled", false);
    })

    //接触警
    $(".addInput").click(function () {
        $(".tr_noneReg").show();
    })

})

/*================================================================弹框 end============================================================*/
/*================================================================菜单栏 start============================================================*/
$(function () {
    /*设置页面中的子菜单*/
    $('.setUp-title').click(function () {
        var $ul = $(this).next('ul');
        $('dd').find('ul').slideUp();
        if ($ul.is(':visible')) {
            $(this).next('ul').slideUp();
        } else {
            $(this).next('ul').slideDown();
        }
    });
    /*GIS地图左侧工具栏*/
    $("#leftFloat li").mousemove(function () {
        var $ul = $(this).find(".sub-leftfloat");
        $("#leftFloat").find(".sub-leftfloat").css("display", "none");
        if ($ul.is(":visible")) {
            $(this).find(".sub-leftfloat").css("display", "none");
        } else {
            $(this).find(".sub-leftfloat").css("display", "block");
        }
    })
    $(".sub-leftfloat").mouseleave(function () {
        $(this).css("display", "none");
    })

    //GIS地图右侧园区
    $(".mainMapSwicth2").mouseenter(function () {
        $(".mapswitchBox").show();
    })
    $(".mapswitchBox").mouseleave(function () {
        $(".mapswitchBox").hide();
    })


})


/*================================================================菜单栏 end============================================================*/
/*================================================================切换流程步骤 start============================================================*/
$(function () {
    $(".nextstep1").click(function () {
        //预案管理
        $(".first-pro2").removeClass("active3");
        $(".two-pro").addClass("active3");
        $(".first-pro2").removeClass("first-pro2").addClass("first-pro");
        $(".two-pro").removeClass("two-pro").addClass("two-pro2");
        $(".basic-box").hide();
        $(".case-box").show();

        $(".config-box").hide();
        $(".alarm-pre").show();

    })
    $(".nextstep2").click(function () {
        //预案管理
        $(".first-pro2").removeClass("active3");
        $(".two-pro2").removeClass("active3");
        $(".three-pro").addClass("active3");
        $(".first-pro2").removeClass("first-pro2").addClass("first-pro");
        $(".two-pro2").removeClass("two-pro2").addClass("two-pro");
        $(".three-pro").removeClass("three-pro").addClass("three-pro2");
        $(".basic-box").hide();
        $(".case-box").hide();
        $(".suspect-box").show();

        $(".config-box").hide();
        $(".alarm-pre").hide();
        $(".alarm-after").show();
    })
    $(".nextstep3").click(function () {
        //预案管理
        $(".first-pro2").removeClass("active3");
        $(".two-pro2").removeClass("active3");
        $(".three-pro2").removeClass("active3");
        $(".four-pro").addClass("active3");
        $(".first-pro2").removeClass("first-pro2").addClass("first-pro");
        $(".two-pro2").removeClass("two-pro2").addClass("two-pro");
        $(".three-pro2").removeClass("three-pro2").addClass("three-pro");
        $(".four-pro").removeClass("four-pro").addClass("four-pro2");
        $(".basic-box").hide();
        $(".case-box").hide();
        $(".suspect-box").hide();
        $(".other-box").show();
    })



    /*视频页面的切换*/
    $(".video-ul li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    })
    $(".video-tab li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    })
    $(".video-tab li:eq(0)").click(function () {//点击楼内图
        $(".custom").show();
        $(".control").hide();
    })

    $(".video-tab li:eq(1)").click(function () {//点击设备列表
        $(".control").show();
        $(".custom").hide();
    })


    //人工上报弹框

    $(".manpower-Ul2 li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    })

    $(".manpower-Ul2 li:eq(0)").click(function () {//点击楼内图
        $(".manpower1").show();
        $(".manpower2").hide();
    })

    $(".manpower-Ul2 li:eq(1)").click(function () {//点击设备列表
        $(".manpower2").show();
        $(".manpower1").hide();
    })









    //子页面导航栏
    $(".tab-ul li").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    })

    /*地图配置页面弹框*/
    /*$(".map-add").click(function () {
        ADDUPDATEFLAG = "ADD";
        $("#regionName").val("");//园区名称
        $("#regionCode").val("");//园区编号
        document.getElementsByName('regionType')[0].checked = false;//园区类型（主或副）
        document.getElementsByName('regionType')[1].checked = false;//园区类型（主或副）
        document.getElementsByName('mapEngine')[0].checked = false;//地图引擎
        document.getElementsByName('mapEngine')[1].checked = false;//地图引擎
        document.getElementsByName('mapType')[0].checked = false;//地图类型
        document.getElementsByName('mapType')[1].checked = false;//地图类型
        $("#mapSrc").val("");//地图地址
        $("#mapCenter").val("");//地图中心点坐标
        $("#mapLeftBottom").val("");//地图左下角坐标
        $("#mapRightTop").val("");//地图右上角坐标
        $(".window-first").show();
    })*/

    $(".screen-more ").click(function () {
        $(this).hide();
        $(".alarm-screen ul").css({ "overflow": "hidden", " white-space": "wrap", "display": "block", "height": "auto" })
    })

    $(".two-submenu").click(function () {
        $(this).addClass("active4");
        $(".twomenu").show();
    })



    //综合告警页面确警前信息与确警后信息的切换
    $(".alarmpre-btn").click(function () {
        $(this).addClass("alarmactive1").removeClass("alarmactive2");
        $(".alarmnext-btn").addClass("alarmactive2").removeClass("alarmactive1");
        $(".alarmnext").css("display", "none");
        $(".alarmpre").css("display", "block");
    })
    $(".alarmnext-btn").click(function () {
        $(this).addClass("alarmactive1").removeClass("alarmactive2");
        $(".alarmpre-btn").addClass("alarmactive2").removeClass("alarmactive1");
        $(".alarmnext").css("display", "block");
        $(".alarmpre").css("display", "none");
    })

    //应急指挥
    $("#divParent .about-close").click(function () {
        $("#devicecreateLeft").addClass("devicecreate-left").removeClass("devicecreate-left2");
    })

    //接触警
    $(".register-list li").click(function () {
        $(this).addClass("registerActive").siblings().removeClass("registerActive");
    })
    $(".register-list li:eq(0)").click(function () {
        $(".registerRight_box1").show();
        $(".registerRight_box2").hide();
    })
    $(".register-list li:eq(1)").click(function () {
        $(".registerRight_box2").show();
        $(".registerRight_box1").hide();
    })


    //$(".aacBorder").hover(function () {
    //    var currentAac = $(this).children(".aacInnerTab");
    //    $(this).css({ "border": "1px solid #2aabd2", "padding": "5px 10px" })
    //    $(currentAac).show();
    //}, function () {
    //    var currentAac = $(this).children(".aacInnerTab");
    //    $(this).css({ "border": "none", "padding": "0" })
    //    $(currentAac).hide();
    //})

})

//GIS地图页面弹框
function info1() {
    $(".info1").addClass("active5").siblings().removeClass("active5");
    $(".building-tab1").show();
    $(".building-tab2").hide();
    $(".building-tab3").hide();
    $(".building-tab4").hide();
}
function info2() {
    $(".info2").addClass("active5").siblings().removeClass("active5");
    $(".building-tab2").show();
    $(".building-tab1").hide();
    $(".building-tab3").hide();
    $(".building-tab4").hide();
}

function info3() {
    $(".info3").addClass("active5").siblings().removeClass("active5");
    $(".building-tab3").show();
    $(".building-tab1").hide();
    $(".building-tab2").hide();
    $(".building-tab4").hide();
}

function info4() {
    $(".info4").addClass("active5").siblings().removeClass("active5");
    $(".building-tab4").show();
    $(".building-tab1").hide();
    $(".building-tab2").hide();
    $(".building-tab3").hide();
}
////人工上报
//function manpower() {
//    $(".manpower-frame").dialog('open');
//}

////地图配置
//function manpower() {
//    $(".manpower-frame").dialog('open');
//}
/*================================================================切换流程步骤 start============================================================*/
/*================================================================滚动条 start============================================================*/
$(function () {
    //综合告警页面滚动条
    $(".alarms-tab").mCustomScrollbar({
        scrollButtons: {
            enable: false,
            scrollType: "continuous",
            scrollSpeed: 20,
            scrollAmount: 40
        },
        horizontalScroll: false,
    });

})
/*================================================================滚动条 end============================================================*/
/*================================================================设备注册动画 start============================================================*/
$(function () {
    $(".map-img").mouseenter(function () {
        $(".one-dimension").animate({ marginLeft: '-20px' }, 400)
        $(".two-dimension").animate({ marginLeft: '40px' }, 400)
        $(".three-dimension").animate({ marginLeft: '100px' }, 400)
    })
    $(".three-dimension").mouseleave(function () {
        $(".three-dimension").animate({ marginLeft: '100px' }, 800)
        $(".two-dimension").animate({ marginLeft: '90px' }, 800)
        $(".one-dimension").animate({ marginLeft: '80px' }, 800)
    })
})
/*================================================================设备注册动画 end============================================================*/
/*================================================================接处警伸缩动画 start============================================================*/
$(function () {
    $(".expand").click(function () {
        $(".register-right").removeClass("register-right").addClass("register-right2");
        $(".registerMotion").removeClass("registerMotion").addClass("registerMotion2");
        $(".expand").hide();
        $(".shrink").show();
    })
    $(".shrink").click(function () {
        $(".register-right2").removeClass("register-right2").addClass("register-right");
        $(".registerMotion2").removeClass("registerMotion2").addClass("registerMotion");
        $(".shrink").hide();
        $(".expand").show();
    })
})




/*================================================================接处警伸缩动画 end============================================================*/
//左侧菜单栏跳转事件
$(function () {

    $('.videoSub a').each(function () {
        if ($($(this))[0].href == String(window.location))
            bgColor2();
    });
    $('.alarmSub a').each(function () {
        if ($($(this))[0].href == String(window.location))
            bgColor3();
    });
    $('.planSub a').each(function () {
        if ($($(this))[0].href == String(window.location))
            bgColor4();
    });
    $('.aacSub a').each(function () {
        if ($($(this))[0].href == String(window.location))
            bgColor5();
    });
    $('.dossierSub a').each(function () {
        if ($($(this))[0].href == String(window.location))
            bgColor6();
    });
    $('.scheduleSub a').each(function () {
        if ($($(this))[0].href == String(window.location))
            bgColor7();
    });
    $('.personSub a').each(function () {
        if ($($(this))[0].href == String(window.location))
            bgColor8();
    });
    $('.purviewSub a').each(function () {
        if ($($(this))[0].href == String(window.location))
            bgColor9();
    });
})

function bgColor2() {
    $(".slider2 .slider-icon2").css("backgroundColor", "#1d8ad0");
    $(".slider2 .slider-icon3").css("backgroundColor", "none");
    $(".slider2 .slider-icon4").css("backgroundColor", "none");
    $(".slider2 .slider-icon5").css("backgroundColor", "none");
    $(".slider2 .slider-icon6").css("backgroundColor", "none");
    $(".slider2 .slider-icon7").css("backgroundColor", "none");
    $(".slider2 .slider-icon8").css("backgroundColor", "none");
    $(".slider2 .slider-icon9").css("backgroundColor", "none");
}
function bgColor3() {
    $(".slider2 .slider-icon3").css("backgroundColor", "#1d8ad0");
    $(".slider2 .slider-icon2").css("backgroundColor", "none");
    $(".slider2 .slider-icon4").css("backgroundColor", "none");
    $(".slider2 .slider-icon5").css("backgroundColor", "none");
    $(".slider2 .slider-icon6").css("backgroundColor", "none");
    $(".slider2 .slider-icon7").css("backgroundColor", "none");
    $(".slider2 .slider-icon8").css("backgroundColor", "none");
    $(".slider2 .slider-icon9").css("backgroundColor", "none");
}
function bgColor4() {
    $(".slider2 .slider-icon4").css("backgroundColor", "#1d8ad0");
    $(".slider2 .slider-icon3").css("backgroundColor", "none");
    $(".slider2 .slider-icon2").css("backgroundColor", "none");
    $(".slider2 .slider-icon5").css("backgroundColor", "none");
    $(".slider2 .slider-icon6").css("backgroundColor", "none");
    $(".slider2 .slider-icon7").css("backgroundColor", "none");
    $(".slider2 .slider-icon8").css("backgroundColor", "none");
    $(".slider2 .slider-icon9").css("backgroundColor", "none");
}
function bgColor5() {
    $(".slider2 .slider-icon5").css("backgroundColor", "#1d8ad0");
    $(".slider2 .slider-icon3").css("backgroundColor", "none");
    $(".slider2 .slider-icon2").css("backgroundColor", "none");
    $(".slider2 .slider-icon4").css("backgroundColor", "none");
    $(".slider2 .slider-icon6").css("backgroundColor", "none");
    $(".slider2 .slider-icon7").css("backgroundColor", "none");
    $(".slider2 .slider-icon8").css("backgroundColor", "none");
    $(".slider2 .slider-icon9").css("backgroundColor", "none");
}
function bgColor6() {
    $(".slider2 .slider-icon6").css("backgroundColor", "#1d8ad0");
    $(".slider2 .slider-icon3").css("backgroundColor", "none");
    $(".slider2 .slider-icon2").css("backgroundColor", "none");
    $(".slider2 .slider-icon5").css("backgroundColor", "none");
    $(".slider2 .slider-icon4").css("backgroundColor", "none");
    $(".slider2 .slider-icon7").css("backgroundColor", "none");
    $(".slider2 .slider-icon8").css("backgroundColor", "none");
    $(".slider2 .slider-icon9").css("backgroundColor", "none");
}
function bgColor7() {
    $(".slider2 .slider-icon7").css("backgroundColor", "#1d8ad0");
    $(".slider2 .slider-icon3").css("backgroundColor", "none");
    $(".slider2 .slider-icon2").css("backgroundColor", "none");
    $(".slider2 .slider-icon5").css("backgroundColor", "none");
    $(".slider2 .slider-icon6").css("backgroundColor", "none");
    $(".slider2 .slider-icon4").css("backgroundColor", "none");
    $(".slider2 .slider-icon8").css("backgroundColor", "none");
    $(".slider2 .slider-icon9").css("backgroundColor", "none");
}
function bgColor8() {
    $(".slider2 .slider-icon8").css("backgroundColor", "#1d8ad0");
    $(".slider2 .slider-icon3").css("backgroundColor", "none");
    $(".slider2 .slider-icon2").css("backgroundColor", "none");
    $(".slider2 .slider-icon5").css("backgroundColor", "none");
    $(".slider2 .slider-icon6").css("backgroundColor", "none");
    $(".slider2 .slider-icon7").css("backgroundColor", "none");
    $(".slider2 .slider-icon4").css("backgroundColor", "none");
    $(".slider2 .slider-icon9").css("backgroundColor", "none");
}
function bgColor9() {
    $(".slider2 .slider-icon9").css("backgroundColor", "#1d8ad0");
    $(".slider2 .slider-icon3").css("backgroundColor", "none");
    $(".slider2 .slider-icon2").css("backgroundColor", "none");
    $(".slider2 .slider-icon5").css("backgroundColor", "none");
    $(".slider2 .slider-icon6").css("backgroundColor", "none");
    $(".slider2 .slider-icon7").css("backgroundColor", "none");
    $(".slider2 .slider-icon8").css("backgroundColor", "none");
    $(".slider2 .slider-icon4").css("backgroundColor", "none");
}

$(function () {
    var largeHeight = $(window).height();
    var largeWidth = $(window).width();
    if (largeWidth <= 1660) {
        $(".easyui-dialog").css("top", "100px");
    }


})

//地图右上角的园区切换
$(function () {
    var paxid = 1;
    var paxidTwo = 1;
    var mapTypeBg = 0;
    var mapTypeBgs = 0;
    mapTypeBgs = ($('.mapTypeUl li').length * 0);
    $(".mapTypeBg").css({ "width": mapTypeBgs, "transition": "width ease 1s" });
    $(".mapTypeBg").hover(function () {
        $('.mapTypeUl li').each(function () {
            //每个li往左边展开
            paxidTwo = ((paxid++) * 90)+13;
            paxidTwo = paxidTwo + "px";
            $(this).css({ "right": paxidTwo, "transition": "right ease 1s" });
            //背景底色
            mapTypeBgs = ($('.mapTypeUl li').length) * 90 + 120;
            $(".mapTypeBg").css({ "width": mapTypeBgs + "px", "transition": "width ease 1s" });
        });
    }, function () {
        $('.mapTypeUl li').each(function () {
            //每个li往右边缩回
            paxidTwo =( (paxid--) * 1)+6;
            paxidTwo = paxidTwo + "px";
            $(this).css({ "right": paxidTwo, "transition": "right ease 1s" });
            //背景底色
            mapTypeBgs = ($('.mapTypeUl li').length * 0);
            $(".mapTypeBg").css({ "width": mapTypeBgs, "transition": "width ease-in-out" });
        });
       
    })

   $(".mapTypeCard2").hover(function () {
      $(".mapType .sanwei").css({ "right": "130px", "transition": "right ease 1s" });
      $(".mapType .erwei2").css({ "right": "70px", "transition": "right ease 1s" });
       // $(".mapTypeBg2").css({ "width": "130px", "transition": "width ease 1s" })
       //背景底色
      mapTypeBgs = ($('.mapTypeCard2').length) * 65;
      $(".mapTypeBg2").css({ "width": mapTypeBgs + "px", "transition": "width ease 1s" })
      
    }, function () {
        $(".mapType .sanwei").css({ "right": "20px", "transition": "right ease 1s" });
        $(".mapType .erwei2").css({ "right": "15px", "transition": "right ease 1s" });
        $(".mapTypeBg2").css({ "width": "0px", "transition": "width ease-in-out" })
    })

})
