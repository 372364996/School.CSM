$(document).ready(function (e) {
    //下拉框显示图片
    //$("#UnewRegionImage").msDropdown()
    addUpLoadRegionImage();
    updateUpLoadRegionImage();
    addUpLoadLogoImage();
    updateUpLoadLogoImage();
});
//保存园区
function saveRegionConfig() {
    if (!confirm("确定添加吗？")) {
        return;
    }
    //本地园区非本地园区
    var regionIsLocal = $('input[name="regionIsLocal"]:checked').val();
    if (regionIsLocal == null) {
        alert("请选择所添加的园区是本地园区还是非本地园区");
        return;
    }
    //园区名称
    var regionName = $("#regionName").val();
    if (regionName == "") {
        alert("请填写园区名称");
        return;
    }
    //园区编号
    var regionCode = $("#regionCode").val();
    if (regionCode == "") {
        alert("请填写园区编号");
        return;
    }
    //先不指定默认地图引擎（1为超图，2为dgis）
    var regionMapEngine = 0;
    //园区地图图片
    //var regionImage = $("#regionImage").val();
    //if (regionImage == "") {
    //    alert("请选择园区图片")
    //    return;
    //}
    if (RegionImageHandler.uiData.index == -1 || RegionImageHandler.uiData.index == 0) {
        alert("请上传园区图片或选择园区图片");
        return;
    }
    var regionImage = RegionImageHandler.uiData.option.value; //图片
    if (regionImage == 0) {
        if ($("#regionImageUpload").val() == "") {
            alert("请上传园区图片或选择园区图片");
            return;
        }
        else {
            regionImage = $("#regionImageUpload").val();
        }

    }
    //logo背景图片
    if (LogoImageHandler.uiData.index == -1 || LogoImageHandler.uiData.index == 0) {
        alert("请上传logo图片或选择logo图片");
        return;
    }
    var logoImage = LogoImageHandler.uiData.option.value; //图片
    if (logoImage == 0) {
        if ($("#logoImageUpload").val() == "") {
            alert("请上传logo图片或选择logo图片");
            return;
        }
        else {
            logoImage = $("#logoImageUpload").val();
        }

    }
    //园区初始地图类型，初始为0
    var initialMapType = 0;
    //ajax与后台交互
    $.ajaxFileUpload({
        url: "/Config/AddRegion",
        data: { regionCode: regionCode, regionName: regionName, mapEngine: regionMapEngine, regionType: regionIsLocal, regionImage: regionImage, initialMapType: initialMapType, logoImage: logoImage },
        sucureurl: false,
        async: true,
        datatype: "content",
        success: function (data) {
            alert(data.split('|')[1]);
            if (data.split('|')[0] == 0) {
                window.location.reload();
            }

        },
        error: function (data) {
            alert(data.split('|')[1]);
        }
    })
}
//弹出添加地图配置的窗口
function regionAddMapConfig(obj) {
    $(".maps-config").dialog('open');//窗口弹出
    var currentRegionID = $(obj).attr("regionID");//获取当前园区的id
    $("#currentRegionID").val(currentRegionID);//将园区id放在这个隐藏的控件上，保存时候插入数据库用
}
//保存地图配置
function saveMapConfig() {
    //当前配置的园区ID
    var currnetRegionID = $("#currentRegionID").val();
    //地图配置名称
    var mapConfigName = $("#map_name").val();
    if (mapConfigName == null) {
        alert("请输入地图配置的名称");
        return;
    }
    //配置地图引擎的类别
    var configMapEngine = $('input[name="configMapEngine"]:checked').val();
    if (configMapEngine == null) {
        alert("请选择要添加配置的地图引擎");
        return;
    }
    //地图类型2D/25D
    var mapType = $('input[name="mapType"]:checked').val();
    if (mapType == null) {
        alert("请选择要添加配置地图类型（2D/25D）");
        return;
    }
    //地图地址
    var mapSrc = $("#mapSrc").val();
    if (mapSrc == "") {
        alert("请填写地图地址");
        return;
    }
    //地图中心点坐标
    var mapCenter = $("#mapCenter").val();
    if (mapCenter == "") {
        alert("请填写地图中心点坐标");
        return;
    }
    if (mapCenter) {
        if (mapCenter.indexOf(',') == -1) {
            alert("地图中心点坐标请输入正确墨卡托坐标，注意“，”为英文的逗号！");
            return;
        }
        var x = mapCenter.split(',')[0];
        var y = mapCenter.split(',')[1];
        if (isNaN(x) || isNaN(y)) {
            alert("地图中心点坐标请输入正确墨卡托坐标，格式为x,y！");
            return;
        }
    }
    //地图左下角坐标
    var mapLeftBottom = $("#mapLeftBottom").val();
    if (mapLeftBottom == "") {
        alert("请填写地图左下角坐标");
        return;
    }
    if (mapLeftBottom) {
        if (mapLeftBottom.indexOf(',') == -1) {
            alert("地图左下角坐标请输入正确墨卡托坐标，注意“，”为英文的逗号！");
            return;
        }
        var x = mapLeftBottom.split(',')[0];
        var y = mapLeftBottom.split(',')[1];
        if (isNaN(x) || isNaN(y)) {
            alert("地图左下角坐标请输入正确墨卡托坐标，格式为x,y！");
            return;
        }
    }
    //地图右上角坐标
    var mapRightTop = $("#mapRightTop").val();
    if (mapRightTop == "") {
        alert("请填写地图右上角坐标");
        return;
    }
    if (mapRightTop) {
        if (mapRightTop.indexOf(',') == -1) {
            alert("地图右上角坐标请输入正确墨卡托坐标，注意“，”为英文的逗号！");
            return;
        }
        var x = mapRightTop.split(',')[0];
        var y = mapRightTop.split(',')[1];
        if (isNaN(x) || isNaN(y)) {
            alert("地图右上角坐标请输入正确墨卡托坐标，格式为x,y！");
            return;
        }
    }

    $.ajax({
        url: "/Config/AddNewMapConfig",
        data: { regionId: currnetRegionID, mapName: mapConfigName, mapEngine: configMapEngine, mapType: mapType, mapSrc: mapSrc, mapCenter: mapCenter, mapBounds: mapLeftBottom + "|" + mapRightTop },
        type: "post",
        datatype: "json",
        async: false,
        success: function (data) {
            alert(data.msg);
            if (data.state == 0) {
                window.location.reload();
            }

        },
        error: function (state, msg) {

        }
    })
}
//更新园区
function updateRegionConfig(obj) {
    var regionID = $(obj).attr("regionID");
    var regionCode = $(obj).attr("regionCode");
    var regionName = $(obj).attr("regionName");
    var regionImage = $(obj).attr("regionImage");
    var logoImage = $(obj).attr("logoImage");
    $("#UregionName").val(regionName);
    $("#UregionCode").val(regionCode);
    $("#UregionConfigID").val(regionID);
    $("#UregionImage").val(regionImage);
    UnewRegionImageHandler.set("value", '../images/map/region/regionImg/' + regionImage);//下拉框默认已有的图片
    UnewLogoImageHandler.set("value", '../images/map/region/logoImg/' + logoImage);//下拉框默认已有的图片
    $(".updateRegion").dialog('open');//窗口弹出

}
//更新园区保存
function saveUpdateRegionConfig() {
    if (!confirm("确定修改吗？")) {
        return;
    }
    var regionName = $("#UregionName").val();
    var regionCode = $("#UregionCode").val();
    var regionID = $("#UregionConfigID").val();
    //var regionImage = "";
    //var oldRegionImage = $("#UregionImage").val();
    ////新选择的园区图片
    //var newRegionImage = $("#UnewRegionImage").find("option:selected").text();
    //if (!newRegionImage) {

    //}
    //regionImage = newRegionImage == "无" ? oldRegionImage : newRegionImage;
    if (!regionName) {
        alert("区域名称不能为空");
        return;
    }
    if (UnewRegionImageHandler.uiData.index == -1 || UnewRegionImageHandler.uiData.index == 0) {
        alert("请上传园区图片或选择园区图片");
        return;
    }
    if (UnewLogoImageHandler.uiData.index == -1 || UnewLogoImageHandler.uiData.index == 0) {
        alert("请上传logo图片或选择logo图片");
        return;
    }
    //园区背景图片
    var regionImage = UnewRegionImageHandler.uiData.option.value;
    if (regionImage == 0) {
        if ($("#UnewRegionImageUpload").val() == "") {
            alert("请上传园区图片或选择园区图片");
            return;
        }
        else {
            regionImage = $("#UnewRegionImageUpload").val();
        }

    }
    if (UnewRegionImageHandler.uiData.index == -1 || UnewRegionImageHandler.uiData.index == 0) {
        alert("请上传园区图片或选择园区图片");
        return;
    }
    //园区logo图片
    var logoImage = UnewLogoImageHandler.uiData.option.value; //图片
    if (logoImage == 0) {
        if ($("#UnewLogoImageUpload").val() == "") {
            alert("请上传logo图片或选择logo图片");
            return;
        }
        else {
            logoImage = $("#UnewLogoImageUpload").val();
        }

    }
    if (!regionCode) {
        alert("区域编号不能为空");
        return;
    }
    if (regionImage == "") {
        alert("请选择园区图片")
        return;
    }
    $.ajaxFileUpload({
        url: "/Config/UpdateRegionInfo",
        data: {
            regionID: regionID, regionName: regionName, regionCode: regionCode, regionImage: regionImage, logoImage: logoImage
        },
        sucureurl: false,
        async: true,
        datatype: "content",
        success: function (data) {
            alert(data.split('|')[1]);
            if (data.split('|')[0] == 0) {
                window.location.reload();
            }

        },
        error: function (data) {
            alert(data.split('|')[1]);
        }
    })
}
//更新地图配置
function updateMapConfig(obj) {
    var mapConfigID = $(obj).attr("mapConfigID");
    var regionID = $(obj).attr("regionID");
    var mapName = $(obj).attr("mapName");
    var mapCenter = $(obj).attr("mapCenter");
    var mapBounds = $(obj).attr("mapBounds");
    var mapSrc = $(obj).attr("mapSrc");

    $("#UmapConfigID").val(mapConfigID);
    $("#Umap_name").val(mapName);
    $("#UmapCenter").val(mapCenter);
    $("#UmapLeftBottom").val(mapBounds.split('|')[0]);
    $("#UmapRightTop").val(mapBounds.split('|')[1]);
    $("#UmapSrc").val(mapSrc);

    $(".updateMapconfig").dialog('open');//窗口弹出
}
//更新地图配置保存
function saveUpdateMapConfig() {
    if (!confirm("确定修改吗？")) {
        return;
    }
    var mapConfigID = $("#UmapConfigID").val();
    var mapName = $("#Umap_name").val();
    var mapCenter = $("#UmapCenter").val();
    var mapLeftBottom = $("#UmapLeftBottom").val();
    var mapRightTop = $("#UmapRightTop").val();
    var mapSrc = $("#UmapSrc").val();

    //地图配置名称
    if (!mapName) {
        alert("请输入地图配置的名称");
        return;
    }


    //地图中心点坐标
    if (!mapCenter) {
        alert("请填写地图中心点坐标");
        return;
    }
    if (mapCenter) {
        if (mapCenter.indexOf(',') == -1) {
            alert("地图中心点坐标请输入正确墨卡托坐标，注意“，”为英文的逗号！");
            return;
        }
        var x = mapCenter.split(',')[0];
        var y = mapCenter.split(',')[1];
        if (isNaN(x) || isNaN(y)) {
            alert("地图中心点坐标请输入正确墨卡托坐标，格式为x,y！");
            return;
        }
    }
    //地图左下角坐标

    if (!mapLeftBottom) {
        alert("请填写地图左下角坐标");
        return;
    }
    if (mapLeftBottom) {
        if (mapLeftBottom.indexOf(',') == -1) {
            alert("地图左下角坐标请输入正确墨卡托坐标，注意“，”为英文的逗号！");
            return;
        }
        var x = mapLeftBottom.split(',')[0];
        var y = mapLeftBottom.split(',')[1];
        if (isNaN(x) || isNaN(y)) {
            alert("地图左下角坐标请输入正确墨卡托坐标，格式为x,y！");
            return;
        }
    }
    //地图右上角坐标
    if (!mapRightTop) {
        alert("请填写地图右上角坐标");
        return;
    }
    if (mapRightTop) {
        if (mapRightTop.indexOf(',') == -1) {
            alert("地图右上角坐标请输入正确墨卡托坐标，注意“，”为英文的逗号！");
            return;
        }
        var x = mapRightTop.split(',')[0];
        var y = mapRightTop.split(',')[1];
        if (isNaN(x) || isNaN(y)) {
            alert("地图右上角坐标请输入正确墨卡托坐标，格式为x,y！");
            return;
        }
    }
    //地图地址
    if (!mapSrc) {
        alert("请填写地图地址");
        return;
    }
    var mapBounds = mapLeftBottom + '|' + mapRightTop;
    $.ajax({
        url: "/Config/UpdateNewMapConfigInfo",
        data: {
            mapConfigID: mapConfigID, mapName: mapName, mapCenter: mapCenter, mapBounds: mapBounds, mapSrc: mapSrc
        },
        type: "post",
        datatype: "json",
        async: false,
        success: function (data) {
            alert(data.msg);
            if (data.state == 0) {
                window.location.reload();
            }
        },
        error: function (data) {
            alert(data.msg);
        }
    })
}
//删除园区
function deleteRegionConfig(obj) {
    if (!confirm("确定删除吗？")) {
        return;
    }
    var regionID = $(obj).attr("regionID");
    if (!confirm("确定要删除该地图配置")) {
        return;
    }
    $.ajax({
        url: "/Config/DeleteRegionConfig",
        data: { regionID: regionID },
        type: "post",
        datatype: "json",
        async: false,
        success: function (data) {
            alert(data.msg);
            if (data.state == 0) {
                window.location.reload();
            }
        },
        error: function (xhr, textStatus) {
            alert(data.msg);
        }
    })
}
//修改园区默认的地图引擎
function changeRegionDefaultMapEngine(obj) {
    var currentRegionID = $(obj).attr("regionID");//园区的id
    var currentMapEngine = $(obj).attr("mapEngine");//园区的地图引擎，没默认为0，超图为1，DGIS为2
    var initiaMapType = $(obj).attr("initiaMapType");//园区初始加载地图类型，没默认为0，2d为1，2.5d为2
    $("#defaultEngineRegionID").val(currentRegionID);
    $.ajax({
        url: "/Config/GetAllNewMapConfigByRegionID",
        data: { regionID: currentRegionID },
        type: "post",
        datatype: "json",
        async: false,
        success: function (data) {
            if (data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].map_engine == 1 && data[i].map_type == 1) {
                        if (currentMapEngine == 1 && initiaMapType == 1) {
                            // $("#s2d radio").attr('checked', 'true');
                            $("#s2d input[type=radio]").attr('checked', 'checked');
                        }
                        else {
                            $("#s2d input[type=radio]").attr('checked', false);
                        }
                        $("#s2d").show();
                    }
                    if (data[i].map_engine == 1 && data[i].map_type == 2) {
                        if (currentMapEngine == 1 && initiaMapType == 2) {
                            $("#s25d input[type=radio]").attr('checked', 'checked');
                        }
                        else {
                            $("#s25d input[type=radio]").attr('checked', false);
                        }
                        $("#s25d").show();
                    }
                    if (data[i].map_engine == 2 && data[i].map_type == 1) {
                        if (currentMapEngine == 2 && initiaMapType == 1) {
                            $("#d2d input[type=radio]").attr('checked', 'checked');
                        }
                        else {
                            $("#d2d input[type=radio]").attr('checked', false);
                        }
                        $("#d2d").show();
                    }
                    if (data[i].map_engine == 2 && data[i].map_type == 2) {
                        if (currentMapEngine == 2 && initiaMapType == 2) {
                            $("#d25d input[type=radio]").attr('checked', 'checked');
                        }
                        else {
                            $("#d25d input[type=radio]").attr('checked', false);
                        }
                        $("#d25d").show();
                    }
                }
                //$('.superball input[type=radio]').each(function () {
                //    if ($(this).attr("mapEngine") == currentMapEngine && $(this).attr("mapType") == initiaMapType) {
                //        $(this).attr('checked', 'checked');
                //    }
                //});
                $(".superball").dialog('open');//修改园区默认地图引擎窗口弹出
            }
            else {
                alert("当前园区暂未配置地图，请您先添加地图引擎！");
            }
        },
        error: function (data) {
            //alert(data.msg);
        }
    });

}
//保存默认地图改变
function saveDefaultMapChange() {
    if (!confirm("确定修改吗？")) {
        return;
    }
    var mapEngine = $('input[name="defaultEngine"]:checked').attr("mapEngine");
    var mapType = $('input[name="defaultEngine"]:checked').attr("mapType");
    var regionID = $("#defaultEngineRegionID").val();
    if (!mapEngine && !mapType) {
        alert("请选择默认地图！");
    }
    else {
        $.ajax({
            url: "/Config/UpdateRegionEngineAndType",
            data: {
                regionID: regionID, mapEngine: mapEngine, mapType: mapType
            },
            type: "post",
            datatype: "json",
            async: false,
            success: function (data) {
                alert(data.msg);
                if (data.state == 0) {
                    window.location.reload();
                }

            },
            error: function (data) {
                alert(data.msg);
            }
        })
    }
}
//回收已经删除的园区
function recycleRegion() {
    if (!confirm("确定恢复吗？")) {
        return;
    }
    var numRegion = 0;
    var deleteRegionIdArray = '';
    $('.recycle-frame input[type=checkbox]').each(function () {
        if ($(this).is(':checked') == true) {
            //deleteRegionIdArray.push($(this).attr("regionID"));
            deleteRegionIdArray = deleteRegionIdArray + $(this).attr("regionID") + ",";
        }
    });
    if (deleteRegionIdArray.length > 0) {
        $.ajax({
            url: "/Config/recycleRegion",
            data: { regionIdArray: deleteRegionIdArray },
            type: "post",
            datatype: "json",
            async: false,
            success: function (data) {
                alert(data.msg);
                if (data.state == 0) {
                    window.location.reload();
                }
            },
            error: function (data) {
                alert(data.msg);
            }
        });
    }
}

//更新园区背景图片
var UnewRegionImageHandler
function updateUpLoadRegionImage() {
    UnewRegionImageHandler = $("#UnewRegionImage").msDropdown({
        visibleRows: 5,
        on: {
            change: function (data, ui) {
                if (data.value == "0") {
                    $("#UnewRegionImageUpload").show();
                    $("#UnewRegionImageUploadText").show();
                }
                else {
                    $("#UnewRegionImageUpload").hide();
                    $("#UnewRegionImageUploadText").hide();
                }
            }
        }
    }).data("dd");
}
//添加园区背景图片
var RegionImageHandler
function addUpLoadRegionImage() {
    RegionImageHandler = $("#regionImage").msDropdown({
        visibleRows: 5,
        on: {
            change: function (data, ui) {
                if (data.value == "0") {
                    $("#regionImageUpload").show();
                    $("#regionImageUploadText").show();
                }
                else {
                    $("#regionImageUpload").hide();
                    $("#regionImageUploadText").hide();
                }
            }
        }
    }).data("dd");
}
//更新园区logo图片
var UnewLogoImageHandler
function updateUpLoadLogoImage() {
    UnewLogoImageHandler = $("#UnewLogoImage").msDropdown({
        visibleRows: 5,
        on: {
            change: function (data, ui) {
                if (data.value == "0") {
                    $("#UnewLogoImageUpload").show();
                    $("#UnewLogoImageUploadText").show();
                }
                else {
                    $("#UnewLogoImageUpload").hide();
                    $("#UnewLogoImageUploadText").hide();
                }
            }
        }
    }).data("dd");
}
//添加园区logo图片
var LogoImageHandler
function addUpLoadLogoImage() {
    LogoImageHandler = $("#logoImage").msDropdown({
        visibleRows: 5,
        on: {
            change: function (data, ui) {
                if (data.value == "0") {
                    $("#logoImageUpload").show();
                    $("#logoImageUploadText").show();
                }
                else {
                    $("#logoImageUpload").hide();
                    $("#logoImageUploadText").hide();
                }
            }
        }
    }).data("dd");
}

function givePathText() {
    if (!$("#mapSrc").val()) {
        alert("请填入地图地址！");
        return;
    }
    else if ($("#mapSrc").val()) {
        if (!$('input[name="configMapEngine"]:checked').val()) {
            alert("请选择地图引擎类型！");
            return;
        }
        else if ($('input[name="configMapEngine"]:checked').val()) {
            var engineType = $('input[name="configMapEngine"]:checked').val();
            if (engineType == 1) {//超图
                alert("超图服务地址，输入后请验证该地图服务可访问性！");
            }
            else {
                alert("地图图片地址：images/map/" + $("#mapSrc").val() + ",输入后请验证该地图图片是否存在！");
            }
        }

    }

}

