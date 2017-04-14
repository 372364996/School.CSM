csm.floorMap = null;//楼内图对象
//var floorDeviceLayerGroup = L.layerGroup();//所有的楼内图设备的图层
csm.center;


var urll = null;
var mapsdata = [];
$(document).ready(function () {
    urll = getServerUrl(csm.serverUrl);
    getAllBuildingUrl();
});


function mapBuildingInfo() {
    var deviceId = $("#addAlarmEquipment").val();
    if (deviceId == null) {
       // alert("设备不存在无法获取对应的设备信息");
    }
    else {
        $.ajax({
            url: "/Plan/GetMapBuildingInfo",
            type: "post",
            data: "deviceId=" + deviceId,
            datatype: 'json',
            async: false,
            success: function (data) {
                if (data != "") {
                    if (data.hasOwnProperty('state')) {
                        alert("获取楼内图信息出现" + data.message + "错误请联系管理员！");
                    }
                    else {
                        var point1 = data.point1;
                        var point2 = data.point2;
                        var url = data.floor_src_2d;
                        var titleName = url.replace(new RegExp("@"), "");
                        var building_id = data.building_id;
                        csm.center = swAndneToCenter(point1, point2);
                        var serverurl = "";
                        var bl = false;
                        for (var i = 0; i < mapsdata.length; i++) {
                            if (mapsdata[i].additions != null && mapsdata[i].additions != undefined && mapsdata[i].additions.length > 0) {
                                if (mapsdata[i].additions[0] == url)//floorinfo.building_id + "@" +
                                {
                                    serverurl = mapsdata[i].url + "/maps/" + mapsdata[i].additions[0];
                                    bl = true;
                                }
                            }
                        }

                        if (!bl) {
                            alert("没有找到服务名为：" + url + ",楼编号为：" + building_id + "的楼层地图服务，请检查楼层配置是否正常！");
                            return;
                        }
                        var imagesrc = serverurl;
                        LoadFloorMap(imagesrc);

                    }
                }
                else {
                    returnMainMap()
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("获取楼内图信息出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    }
}

//左下右上坐标转换为中心点坐标
function swAndneToCenter(southwest, northeast) {
    var center_x = (Number(northeast.split(',')[0]) - Number(southwest.split(',')[0])) / 2 + Number(southwest.split(',')[0]);
    var center_y = (Number(northeast.split(',')[1]) - Number(southwest.split(',')[1])) / 2 + Number(southwest.split(',')[1]);
    var center = { "x": center_x, "y": center_y };
    return center;
}
var MapBorderXY = "";
var roomUrl = ""; //让进入楼层后的地址 url为空 
//根据图片路径、西南角坐标、东北角坐标创建楼内图对象
function LoadFloorMap(imagesrc) {
    if (csm.floorMap) {
        csm.mapContainer.removeLayer(csm.floorMap);//移除底图
    }
    for (var i = 0; i < csm.mapContainer.layers.length; i++) {
        if (csm.mapContainer.layers[i].name == "district") {
            csm.mapContainer.layers[i].setVisibility(false);
        }
    }
    csm.floorMap = new SuperMap.Layer.TiledDynamicRESTLayer("Building", imagesrc, { transparent: true, cacheEnabled: true });
    //监听图层信息加载完成事件
    csm.floorMap.events.on({ "layerInitialized": addLayerInfo });
}
//切换楼内图
addLayerInfo = function () {
    csm.floorMap.isBaseLayer = true;
    csm.mapContainer.addLayer(csm.floorMap);
    csm.mapContainer.setBaseLayer(csm.floorMap);
    //显示地图范围
    csm.mapContainer.setCenter(new SuperMap.LonLat(csm.center.x, csm.center.y), 0);
}



//返回主地图
function returnMainMap() {
    if (csm.floorMap != null) {
        setVisibFalse();//移除楼内图
        $("#mapContainer").attr("currentMapType", 1);//获取页面地图容器的div：mapContainer的自定义类型currentMapType的值,1为2D，2为2.5D，3为楼内图
        for (var i = 0; i < csm.mapContainer.layers.length; i++) {
            if (csm.mapContainer.layers[i].name == "district") {
                csm.mapContainer.layers[i].setVisibility(true);
            }
        }
        csm.mapContainer.setBaseLayer(csm.baseMap);
        $(".two-dimension").show();//显示2/3维切换按钮
    }
}

//隐藏Building图层，用于退出楼内图
function setVisibFalse() {
    for (var i = 0; i < csm.mapContainer.layers.length; i++) {
        if (csm.mapContainer.layers[i].name == "Building") {
            csm.mapContainer.layers[i].setVisibility(false);
        }
    }
}


//隐藏设备名称
function hideText() {
    var title = $("#fontDisplayed").attr("title");
    if (title == "字体隐藏") {
        $("#fontDisplayed").attr("title", "字体显示");
        $("#fontDisplayed").removeClass("font-display").addClass("font-none");
        csm.mapContainer.removeAllPopup();
    }
    else {
        $("#fontDisplayed").attr("title", "字体隐藏");
        $("#fontDisplayed").removeClass("font-none").addClass("font-display");
        if (csm.planDeviceGroup.markers.length > 0) {
            for (var i = 0; i < csm.planDeviceGroup.markers.length; i++) {
                var contentHTML = "<div style='text-align:center;font-size:12px;font-family:微软雅黑;color:#666;height:30px;line-height:30px;background:#fff;padding:0 10px;border:1px solid #ddd;border-radius:5px;'>" + csm.planDeviceGroup.markers[i].device_name + "</div>"
                var position = lonLat2Mercator(Number(csm.planDeviceGroup.markers[i].longitude), Number(csm.planDeviceGroup.markers[i].latitude));
                var popup = new SuperMap.Popup("deviceName",
                            new SuperMap.LonLat(position.x, position.y),
                            new SuperMap.Size(100, 50),
                            contentHTML,
                            false
                    );
                popup.autoSize = true;
                csm.mapContainer.addPopup(popup);
                popup.closeOnMove = false;
            }
        }
        //csm.mapContainer.removePopup(Popup);
    }

}

//获取地图服务器地址
function getServerUrl(baseurl) {
    var serverurl = "";
    if (baseurl != null && baseurl != undefined && baseurl != "") {
        if (baseurl.indexOf('/') > 0) {
            var baseurlarr = baseurl.split('/');
            serverurl = "http://" + baseurlarr[2] + "/iserver/services.json";
        }
    }

    else {
        alert("地图配置读取失败！");
    }
    return serverurl;
}

//获取超图发布的所有rest服务
function getAllBuildingUrl() {
    var a = "";
    $.get(urll, function (data) {

        for (var i = 0; i < data.length; i++) {
            if (data == null) {
                alert("getBuildingUrl()方法请求超图服务失败！请检查超图服务是否正常开启！");
            }
            //瓦片发布形式修改---- 1）
            if (data[i].interfaceType == "com.supermap.services.rest.RestServlet") {
                var datanew = data[i];
                mapsdata.push(datanew);
            }
            //var indexnum = csm.serverUrl.indexOf("/maps/");
            //if (indexnum > 0) {
            //var serverstring = csm.serverUrl.substring(0, indexnum);
            //if (data[i].interfaceType == "com.supermap.services.rest.RestServlet" && data[i].url == serverstring) {
            //        var datanew = data[i];
            //        mapsdata.push(datanew);
            //    }
            //}
        }
    });
}