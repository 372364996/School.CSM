csm.baseMap25D = null;//2.5D的地图对象
csm.mapCenter25D = null;//2.5D的地图的中心
csm.southwest25D = null;
csm.northeast25D = null;
csm.serverUrl25D = null;
$(function () {
    readMap25DConfig();
    //如果存在2.5D的配置，并且初始化地图类型为2.5的类型，自动切换为2.5D
    if (Map25DConfig && typeof (initMapType) != "undefined" && initMapType == 2) {
        switchMapMain(25);
    }
});
//右上角切换的点击事件
function switchMap() {
    if ($("#mapContainer").attr("currentMapType") == 2) {
        csm.baseMap.addTo(csm.mapContainer);
        csm.baseMap.bringToBack();
        csm.mapContainer.setView(csm.center, 17);
        $("#mapContainer").attr("currentMapType", 1);
        // $(".mainMapSwicth").css({ "background-image": "url(../style/base/images/public/map/3wei-hover.png)" });
        //$(".sanwei span").text("2D");
    }
    else if ($("#mapContainer").attr("currentMapType") == 1) {
        if (csm.baseMap25D) {
            csm.baseMap25D.addTo(csm.mapContainer);
            csm.baseMap25D.bringToBack();
            csm.mapContainer.setView(csm.mapCenter25D, csm.mapContainer.getMaxZoom());
        }
        else {
            addMap25D();
        }
        $("#mapContainer").attr("currentMapType", 2);
        //$(".mainMapSwicth").css({ "background-image": "url(../style/base/images/public/map/2wei-hover.png)" });
        //$(".sanwei span").text("2.5D");
    }

}
//切换地图主方法
function switchMapMain(type) {
    if (type == 2) {
        $("#mapContainer").attr("currentMapType", 2);
    }
    if (type == 25) {
        $("#mapContainer").attr("currentMapType", 1);
    }
    switchMap();
    deviceSwitch();
    areaSwitch();
    //vedioPopupClose();
}
//添加2.5D的地图
function addMap25D() {
    csm.mapContainer.removeLayer(csm.baseMap);
    //csm.mapContainer.options.crs = L.CRS.Simple;
    var image = new Image();
    image.src = csm.serverUrl25D;
    csm.mapContainer.options.maxZoom = 20;
    csm.mapContainer.options.minZoom = 17;
    image.onload = function () {
        var southWest = csm.mapContainer.unproject([0, image.height], csm.mapContainer.getMaxZoom());
        var northEast = csm.mapContainer.unproject([image.width, 0], csm.mapContainer.getMaxZoom());
        var p1 = csm.mapContainer.project(southWest, csm.mapContainer.getMaxZoom());
        var p2 = csm.mapContainer.project(northEast, csm.mapContainer.getMaxZoom());
        var mapbounds = new L.LatLngBounds(southWest, northEast);
        csm.baseMap25D = L.imageOverlay(image.src, mapbounds);
        csm.mapContainer.addLayer(csm.baseMap25D);
        csm.baseMap25D.bringToBack();
        csm.mapCenter25D = mapbounds.getCenter();
        csm.mapContainer.setView(csm.mapCenter25D, csm.mapContainer.getMaxZoom());
    }
}
//切换设备的位置
function deviceSwitch() {
    deviceLayerGroup.eachLayer(function (featureLayer) {
        featureLayer.eachLayer(function (marker) {
            if ($("#mapContainer").attr("currentMapType") == 2) {//2.5维
                if (marker.local_longitude && marker.local_latitude) {
                    var p = csm.mapContainer.unproject([marker.local_latitude, marker.local_longitude], csm.mapContainer.getMaxZoom());
                    marker.setLatLng(p);
                }

            }

            else if ($("#mapContainer").attr("currentMapType") == 1) {//2维
                if (marker.longitude && marker.latitude) {
                    marker.setLatLng(L.latLng(marker.latitude, marker.longitude));
                }

            }
        });
    });
}
//切换区域的位置
function areaSwitch() {
    if ($("#mapContainer").attr("currentMapType") == 2) {//2.5维
        areaLayerGroup.eachLayer(function (featureLayer) {
            featureLayer.eachLayer(function (shape) {
                if (shape.area_25D_location) {
                    switch (shape.shapeType) {
                        case "p"://多边形
                            shape.setLatLngs(shape.area_25D_location);
                            break;
                        case "r"://矩形
                            shape.setBounds(shape.area_25D_location);
                            break;
                        case "c"://圆
                            shape.setLatLng(shape.area_25D_location[0]);
                            shape.setRadius(Number(shape.area_25D_location[1]) / 200);
                            break;
                        default:

                    }
                }
            });
        });
    }
    else if ($("#mapContainer").attr("currentMapType") == 1) {//2维
        areaLayerGroup.eachLayer(function (featureLayer) {
            featureLayer.eachLayer(function (shape) {
                if (shape.area_location) {
                    switch (shape.shapeType) {
                        case "p"://多边形
                            shape.setLatLngs(shape.area_location);
                            break;
                        case "r"://矩形
                            shape.setBounds(shape.area_location);
                            break;
                        case "c"://圆
                            shape.setLatLng(shape.area_location[0]);
                            shape.setRadius(shape.area_location[1]);
                            break;
                        default:

                    }
                }
            });
        });

    }
}

//读取配置
function readMap25DConfig() {
    if (!Map25DConfig) {//如果没有2.5d的配置，就把2.5d的图标隐藏
        //$(".mainMapSwicth").hide();
        //$(".erwei").hide();
        $(".erwei2").hide();
        return;
    }
    else {
        $(".erwei2").show();
        var bound = Map25DConfig.map_bounds;
        var center = Map25DConfig.map_center;
        var mapurl = Map25DConfig.map_src;
        if (bound) {
            csm.southwest25D = bound.split('|')[0];
            csm.northeast25D = bound.split('|')[1];
        }
        if (mapurl) {
            csm.serverUrl25D = '../images/map/' + mapurl;
        }

        csm.southwest25D = csm.mapContainer.unproject([csm.southwest25D.split(',')[0], csm.southwest25D.split(',')[1]], csm.mapContainer.getMaxZoom());

        csm.northeast25D = Mercator2latlng(csm.northeast25D.split(',')[0], csm.northeast25D.split(',')[1]);
        var mapbounds = new L.LatLngBounds(csm.southwest25D, csm.northeast25D);
    }
    //csm.mapCenter25D = mapbounds.getCenter();
}