var largeScreen = {};
var currentRegionId;//当前园区ID
var ConfigId = 0;//大屏配置主键ID
var _data = null;  //当前数据缓存



$(function () {
    largeScreen.Init();
})

//切换园区事件
largeScreen.changeRegion = function () {
    if (confirm("切换园区前是否保存当前配置！\r\n点击确定，保存;点击取消，不保存")) {
        largeScreen.save(1);
    }
    else {
        largeScreen.showRegionConfig();
    }

}
//根据当前园区ID显示大屏配置
largeScreen.showRegionConfig = function () {
    var regionId = $('#regionSelect option:selected').val();
    $.ajax({
        type: "post", //这里是http类型
        url: "/Config/GetGalleryByRegionId",
        type: "post",
        data: { regionId: regionId },
        datatype: 'json',
        async: true,
        success: function (data) {
            currentRegionId = regionId;
            _data = data;
            if (data.msg != null && data.status == 0) {
                ConfigId = data.msg.id;  //赋值当前记录ID
                $("#rowInput").val(data.msg.row);
                $("#columnInput").val(data.msg.column);
                $("#widthInput").val(data.msg.width);
                $("#heightInput").val(data.msg.height);
                // _data = data;
                // largeScreen.showScreenHtml(data);
                largeScreen.showScreenHtml();
            }
            else {
                ConfigId = 0;
                $("#rowInput").val("");
                $("#columnInput").val("");
                $("#widthInput").val("");
                $("#heightInput").val("");
                $("#galleryDiv").html("");
            }

        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
            $("#regionSelect").find("option[value='" + currentRegionId + "']").attr("selected", true);//设置成上一次选择园区
        }
    })
}
//初始化加载
largeScreen.Init = function () {
    $.ajax({
        type: "post", //这里是http类型
        url: "/Config/GalleryInit",
        type: "post",
        data: {},
        datatype: 'json',
        async: true,
        success: function (data) {
            _data = data;
            if (data.msg != null && data.status == 0) {
                ConfigId = data.msg.id;  //赋值当前记录ID

                $("#rowInput").val(data.msg.row);
                $("#columnInput").val(data.msg.column);
                $("#widthInput").val(data.msg.width);
                $("#heightInput").val(data.msg.height);
                // _data = data;
                //largeScreen.showScreenHtml(data);
                largeScreen.showScreenHtml();
            }
            else {
                ConfigId = 0;
                $("#rowInput").val("");
                $("#columnInput").val("");
                $("#widthInput").val("");
                $("#heightInput").val("");
                $("#galleryDiv").html("");
            }
            currentRegionId = $('#regionSelect option:selected').val();
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert(XMLHttpRequest.status + "错误请联系管理员！");
            currentRegionId = $('#regionSelect option:selected').val();
        }
    })
}
//保存配置,1:切换园区时保存；2:保存按钮保存
largeScreen.save = function (saveType) {
    var code = "";
    var galleryCode = "";
    var galleryName = "";
    var galleryType = "";
    var row = parseInt($("#rowInput").val());
    var column = parseInt($("#columnInput").val());
    var width = parseInt($("#widthInput").val());
    var height = parseInt($("#heightInput").val());
    if (column == null || column < 1) {
        alert("电视墙屏幕列数不得为空!");
        return;
    }
    else {
        if (column > 20) {
            alert("电视墙屏幕列数最高不得超过20列，若实际超过20列请联系开发人员");
            return;
        }
    }
    if (row == null || row < 1) {
        alert("电视墙屏幕行数不得为空!");
        return;
    }
    else {
        if (row > 10) {
            alert("电视墙屏幕行数最高不得超过10行，若实际超过10行请联系开发人员");
            return;
        }
    }
    if (width == null || width < 1) {
        alert("电视墙单屏幕宽不得为空!");
        return;
    }
    else {
        if (width > 3072) {
            alert("电视墙屏幕行数最高不得超过3072像素,若实际超过3072像素请联系开发人员");
            return;
        }
    }
    if (height == null || height < 1) {
        alert("电视墙单屏幕高不得为空!");
        return;
    }
    else {
        if (height > 2048) {
            alert("电视墙屏幕行数最高不得超过2048像素,若实际超过2048像素请联系开发人员");
            return;
        }
    }
    $("#galleryDiv li").each(function () {

        if (code == "") {
            code = $(this).attr("id");
            galleryCode = $(this).find('select').val();
            galleryName = $(this).find("#galleryList").find("option:selected").text();
            galleryType = $(this).find("#galleryTypeList").find("option:selected").val();
        } else {
            code += "," + $(this).attr("id");
            galleryCode += "," + $(this).find('select').val();
            galleryName += "," + $(this).find("#galleryList").find("option:selected").text();
            galleryType += "," + $(this).find("#galleryTypeList").find("option:selected").val();
        }
    });
    //新增大屏配置
    if (ConfigId == 0) {
        $.ajax({
            type: "post", //这里是http类型
            url: "/Config/AddGalleryConfig",
            dataType: "json", //传回来的数据类型
            data: { regionId: currentRegionId, column: column, row: row, width: width, height: height, code: code, galleryCode: galleryCode, galleryName: galleryName, type: galleryType },
            async: false,
            success: function (data) {
                alert(data.msg);
                //切换园区时保存
                if (saveType == 1) {
                    if (data.status > 0) {
                        ConfigId = data.status;//对当前配置ID赋值
                        largeScreen.showRegionConfig();
                    }
                    else {
                        $("#regionSelect").find("option[value='" + currentRegionId + "']").attr("selected", true);//设置成上一次选择园区
                    }
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    }
        //修改大屏配置
    else {
        $.ajax({
            type: "post", //这里是http类型
            url: "/Config/UpdateGalleryConfig",
            dataType: "json", //传回来的数据类型
            data: { configId: ConfigId, regionId: currentRegionId, column: column, row: row, width: width, height: height, code: code, galleryCode: galleryCode, galleryName: galleryName, type: galleryType },
            async: false,
            success: function (data) {
                alert(data.msg);
                //切换园区时保存
                if (saveType == 1) {
                    if (data.status == 0) {
                        largeScreen.showRegionConfig();
                    }
                    else {
                        $("#regionSelect").find("option[value='" + currentRegionId + "']").attr("selected", true);//设置成上一次选择园区
                    }
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    }
}
//保存配置
largeScreen.saveBtn = function () {
    largeScreen.save(2);
}
//显示园区配置
largeScreen.showScreenHtml = function () {
    var row = $("#rowInput").val();
    var column = $("#columnInput").val();
    var matrixHtml = "";
    if (row >= 0 && column >= 0) {
        var htmlGallery = "";//单个gallery的html代码
        //拼接单个显示器的html代码
        htmlGallrry = "<select id='galleryList' ><option value=''>无绑定</option>";
        if (_data != null && _data.msg != null) {
            for (var i = 0; i < _data.msg.galleryList.length; i++) {
                htmlGallrry += "<option value=" + _data.msg.galleryList[i].galleryCode + ">" + _data.msg.galleryList[i].galleryName + "</option>";
            }
        }
        htmlGallrry += "</select>";
        htmlGallrry += "<select id='galleryTypeList' ><option value='0' >用途默认</option><option value='1'>快速上大屏</option><option value='2'>不可更换</option></select>";
        //拼接多个显示器
        for (var i = 1; i <= row; i++) {
            matrixHtml += "<ul>";
            for (var j = 1; j <= column; j++) {
                matrixHtml += "<li class='aa' id=" + i + "-" + j + ">" + htmlGallrry + "</li>";
            }
            matrixHtml += "</ul>";
        }
        $("#galleryDiv").html(matrixHtml);
        //对显示器内元素赋值
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                var idc = i + "-" + j;
                var index = (i - 1) * column + j;
                if (_data != null && _data.msg != null && _data.msg.screenList != null && index <= _data.msg.screenList.length) {
                    if (_data.msg.screenList[index - 1].galleryCode != '' && _data.msg.screenList[index - 1].galleryCode != undefined) {
                        $("#" + idc + "").find('#galleryList').val(_data.msg.screenList[index - 1].galleryCode); //初始化大屏绑定的通道
                        $("#" + idc + "").find('#galleryTypeList').val(_data.msg.screenList[index - 1].galleryType); //初始化大屏类型
                        //$("#" + idc + "").find('#galleryList').find("option[value='" + _data.msg.screenList[index - 1].galleryCode + "']").attr("selected", true);//设置设备组，需要多级联动.val(_data.msg.screenList[index - 1].galleryCode); //初始化大屏绑定的通道
                        //$("#" + idc + "").find('#galleryTypeList').find("option[value='" + _data.msg.screenList[index - 1].galleryType + "']").attr("selected", true); //初始化大屏类型
                    }
                }
            }
        }

    }
    // $("#galleryDiv").html(matrixHtml);
}
//修改行列，改变大屏监视器布局事件
largeScreen.changeRowOrColumn = function () {
    var row = $("#rowInput").val();
    var column = $("#columnInput").val();
    if (column == "" || column < 1) {
        alert("电视墙屏幕列数不得为空!");
        return;
    }
    else {
        if (column > 20) {
            alert("电视墙屏幕列数最高不得超过20列，若实际超过20列请联系开发人员");
            return;
        }
    }
    if (row == "" || row < 1) {
        alert("电视墙屏幕行数不得为空!");
        return;
    }
    else {
        if (row > 10) {
            alert("电视墙屏幕行数最高不得超过10行，若实际超过10行请联系开发人员");
            return;
        }
    }
    largeScreen.showScreenHtml();
}