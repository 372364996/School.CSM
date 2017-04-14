
var ADDUPDATEFLAG;//修改删除标识
//第一个下一步：选择地图
function isSelectMap() {
    var mapEngine = $('input[name="mapEngine"]:checked').val();//地图引擎
    if (mapEngine == null) {
        alert("请选择地图引擎");
        return;
    }
    var mapType = $('input[name="mapType"]:checked').val();//地图类型
    if (mapType == null) {
        alert("请选择地图类型");
        return;
    }
    if (mapType == 2) {
        $("#regionTypeDiv").hide();
        $('input[name="regionType"][value=2]').prop("checked", "checked");
    }
    else {
        $("#regionTypeDiv").show();
    }

    $(".first2-pro").removeClass("first2-pro").addClass("first2-pro2");
    $(".two2-pro").removeClass("two2-pro").addClass("two2-pro2");
    $(".first2-pro2 span").removeClass("active3");
    $(".two2-pro2 span").addClass("active3");
    $(".three2-pro span").removeClass("active3");
    $(".map-form").hide();
    $(".map-form2").show();
    $(".map-form3").hide();
}
//第二个下一步：园区信息
function isSelectRegion() {
    var regionName = $("#regionName").val();//园区名称
    if (regionName == "") {
        alert("请填写园区名称");
        return;
    }
    var regionCode = $("#regionCode").val();//园区编号
    if (regionCode == "") {
        alert("请填写园区编号")
        return;
    }
    var regionType = $('input[name="regionType"]:checked').val();//园区类型（主或副）
    var mapType = $('input[name="mapType"]:checked').val();//地图类型
    if (mapType != 2) {
        if (regionType == null) {
            alert("请选择园区类型");
            return;
        }
    }

    $(".first2-pro").removeClass("first2-pro").addClass("first2-pro2");
    $(".two2-pro2").removeClass("two2-pro2").addClass("two2-pro");
    $(".three2-pro").removeClass("three2-pro").addClass("three2-pro2");
    $(".first2-pro2 span").removeClass("active3");
    $(".two2-pro span").removeClass("active3");
    $(".three2-pro2 span").addClass("active3");
    $(".map-form").hide();
    $(".map-form2").hide();
    $(".map-form3").show();
}
//添加或修改地图配置
function addMapConfig() {
    var mapEngine = $('input[name="mapEngine"]:checked').val();//地图引擎
    if (mapEngine == null) {
        alert("请选择地图引擎");
        return;
    }
    var mapType = $('input[name="mapType"]:checked').val();//地图类型
    if (mapType == null) {
        alert("请选择地图类型");
        return;
    }
    var regionName = $("#regionName").val();//园区名称
    if (regionName == "") {
        alert("请填写园区名称");
        return;
    }
    var regionCode = $("#regionCode").val();//园区编号
    if (regionCode == "") {
        alert("请填写园区编号")
        return;
    }
    var regionType = $('input[name="regionType"]:checked').val();//园区类型（主或副）
    if (mapType != 2) {
        if (regionType == null) {
            alert("请选择园区类型");
            return;
        }
    }
    else if (mapType == 2) {
        regionType = 2;
    }

    var mapSrc = $("#mapSrc").val();//地图地址
    if (mapSrc == "") {
        alert("请填写地图地址");
        return;
    }
    var mapCenter = $("#mapCenter").val();//地图中心点坐标
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
    var mapLeftBottom = $("#mapLeftBottom").val();//地图左下角坐标
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
    var mapRightTop = $("#mapRightTop").val();//地图右上角坐标
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
    var mapConfigID = $("#mapConfigID").val();
    if (ADDUPDATEFLAG == "ADD") {
        $.ajax({
            url: "/Config/AddMapConfig",
            data: { regionName: regionName, regionCode: regionCode, regionType: regionType, mapEngine: mapEngine, mapType: mapType, mapSrc: mapSrc, mapCenter: mapCenter, mapLeftBottom: mapLeftBottom, mapRightTop: mapRightTop },//IsLoad: IsLoad
            type: "post",
            datatype: "json",
            async: false,
            success: function (data) {
                alert(data.message);
                if (data.result) {
                    window.location.reload();
                }

            },
            error: function (xhr, textStatus) {

            }
        })
    } else if (ADDUPDATEFLAG == "UPDATE") {
        $.ajax({
            url: "/Config/UpdateMapConfig",
            data: { mapConfigID: mapConfigID, regionName: regionName, regionCode: regionCode, regionType: regionType, mapEngine: mapEngine, mapType: mapType, mapSrc: mapSrc, mapCenter: mapCenter, mapLeftBottom: mapLeftBottom, mapRightTop: mapRightTop },//IsLoad: IsLoad
            type: "post",
            datatype: "json",
            async: false,
            success: function (data) {
                alert(data.message);
                if (data.result) {
                    window.location.reload();
                }

            },
            error: function (xhr, textStatus) {

            }
        })
    }
}
//修改地图配置
function updateMapConfigDialog(obj) {
    ADDUPDATEFLAG = "UPDATE";
    var configID = $(obj).attr("name");
    $(':radio[name="regionType"]').attr("checked", false);
    $(':radio[name="mapEngine"]').attr("checked", false);
    $(':radio[name="mapType"]').attr("checked", false);
    $.ajax({
        url: "/Config/GetMapConfigByID",
        data: { id: configID },
        type: "post",
        datatype: "json",
        async: false,
        success: function (data) {
            $("#mapConfigID").val(data.id);
            $("#regionName").val(data.region_name);//园区名称
            $("#regionCode").val(data.region_code);//园区编号
            document.getElementsByName('regionType')[data.region_type - 1].checked = true;//园区类型（主或副）
            document.getElementsByName('mapEngine')[data.map_engine - 1].checked = true;//地图引擎
            document.getElementsByName('mapType')[data.map_type - 1].checked = true;//地图类型
            $("#mapSrc").val(data.map_src);//地图地址
            $("#mapCenter").val(data.map_center);//地图中心点坐标
            $("#mapLeftBottom").val(data.map_bounds.split('|')[0]);//地图左下角坐标
            $("#mapRightTop").val(data.map_bounds.split('|')[1]);//地图右上角坐标
            $("#window-first").show();
            $("#window-two").hide();
            $("#window-three").hide();
        },
        error: function (xhr, textStatus) {

        }
    })
}


//删除地图配置
function deleteMapConfig(obj) {
    var configID = $(obj).attr("name");
    if (!confirm("确定要删除该地图配置")) {
        return;
    }
    $.ajax({
        url: "/Config/DelteMapConfig",
        data: { id: configID },
        type: "post",
        datatype: "json",
        async: false,
        success: function (data) {
            if (data) {
                alert("删除成功");
                window.location.reload();
            } else {
                alert("删除失败");
            }
        },
        error: function (xhr, textStatus) {

        }
    })
}
//搜索的单击事件
function mapConfigSearch() {
    alert("后续版本将支持，敬请期待！");
}

function givePathText() {
    alert("images/map/" + $("#mapSrc").val());
}
