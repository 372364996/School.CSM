var driverReset = {};
//初始化加载
//$(function () {
//    $("#driverResetDiv").hide();
//})
//取消按钮
//driverReset.cancel = function () {
//    $("#driverResetDiv").hide();
//}

//LED复位按钮
driverReset.closeLEDBtn = function () {
    //if ($("#driverResetDiv").css('display') == 'none') {
    //    $("#driverResetDiv").show();
    //    $("#resetConfirmBtn").unbind("click"); //解除绑定
    //    $("#resetConfirmBtn").bind("click", driverReset.closeLED);//绑定事件
    //    $("#driverResetP").html("LED复位");
    //}
    //else {
    //    alert("请先关闭当前复位窗口！");
    //}
    if (IsMain) {
        driverReset.closeLED();
    }
    else {
        if (confirm("此设备非主控，请确认是否复位LED")) {
            driverReset.closeLED();
        }
    }



}
//四色灯复位按钮
driverReset.closeRelayBtn = function () {
    //if ($("#driverResetDiv").css('display') == 'none') {
    //    $("#driverResetDiv").show();
    //    $("#resetConfirmBtn").unbind("click"); //解除绑定
    //    $("#resetConfirmBtn").bind("click", driverReset.closeRelay);//绑定事件
    //    $("#driverResetP").html("报警灯复位");
    //}
    //else {
    //    alert("请先关闭当前复位窗口！");
    //}

    // driverReset.closeRelay();
    if (IsMain) {
        driverReset.closeRelay();
    }
    else {
        if (confirm("此设备非主控，请确认是否复位LED")) {
            driverReset.closeRelay();
        }
    }



}

//全部复位按钮
driverReset.closeAllDriverBtn = function () {
    //if ($("#driverResetDiv").css('display') == 'none') {
    //    $("#driverResetDiv").show();
    //    $("#resetConfirmBtn").unbind("click"); //解除绑定
    //    $("#resetConfirmBtn").bind("click", driverReset.closeAllDriver);//绑定事件
    //    $("#driverResetP").html("全部复位");
    //}
    //else {
    //    alert("请先关闭当前复位窗口！");
    //}
    if (IsMain) {
        driverReset.closeAllDriver();
    }
    else {
        if (confirm("此设备非主控，请确认是否复位LED和报警灯")) {
            driverReset.closeAllDriver();
        }
    }
    //driverReset.closeAllDriver();



}

//LED复位
driverReset.closeLED = function () {
    //var regionCode = $('#regionResetSelect option:selected').val(); //设备组ID
    //var location = $('#locationSelect option:selected').val();
    // var regionCode = $.cookie('mainControlRegionCode');
    var regionId = $.cookie('mainControlRegionId');
    var regionCode = $(':radio[name="mainControlRegion"]:checked').attr("mainControlRegionCode");
    var location = 1;
    if (regionCode == undefined || regionCode == null) {
        alert("请选择园区！");
        return;
    }
    var content = "$$";
    $.ajax({
        url: "/Config/SendLEDMessage",
        type: "post",
        data: { regionCode: regionCode, location: location, content: content },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("LED复位" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//四色灯复位
driverReset.closeRelay = function () {
    // var regionCode = $('#regionResetSelect option:selected').val(); //设备组ID
    //var regionCode = $.cookie('mainControlRegionCode');
    var regionId = $.cookie('mainControlRegionId');
    var regionCode = $(':radio[name="mainControlRegion"]:checked').attr("mainControlRegionCode");
    if (regionCode == undefined || regionCode == null) {
        alert("请选择园区！");
        return;
    }
    var controlId = 0;
    var op = 4; //全部关闭
    $.ajax({
        url: "/Config/SendRelayMessage",
        type: "post",
        data: { regionCode: regionCode, controlId: controlId, op: op },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("报警灯复位" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}
//全部复位
driverReset.closeAllDriver = function () {
    // var regionCode = $('#regionResetSelect option:selected').val(); //设备组ID

    //var regionCode = $.cookie('mainControlRegionCode');
    var regionId = $.cookie('mainControlRegionId');
    var regionCode = $(':radio[name="mainControlRegion"]:checked').attr("mainControlRegionCode");
    if (regionCode == undefined || regionCode == null) {
        alert("请选择园区！");
        return;
    }
    var location = 1;
    var content = "$$";
    var controlId = 0;
    var op = 4; //全部关闭
    $.ajax({
        url: "/Config/SendLEDMessage",
        type: "post",
        data: { regionCode: regionCode, location: location, content: content },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("全部复位" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
    $.ajax({
        url: "/Config/SendRelayMessage",
        type: "post",
        data: { regionCode: regionCode, controlId: controlId, op: op },
        datatype: 'json',
        async: true,
        success: function (data) {
            alert(data.msg);
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
        }
    })
}

//判断当前用户是否有操作权限
driverReset.judgePurview = function (purviewCode) {
    var res = false;
    for (var pw in PURVIEWLIST) {
        if (pw.purview_code == purviewCode) {
            res = true;
            return res;
        }
    }
    return res;
}
