csm.baseMap25D = null;//2.5D的地图对象
csm.mapCenter25D = null;//2.5D的地图的中心
csm.southwest25D = null;
csm.northeast25D = null;
csm.serverUrl25D = null;
$(function () {
    readMap25DConfig();

});
//右上角切换的点击事件
function switchMap() {
    closeInfoWin();//关闭弹窗
    if ($("#mapContainer").attr("currentMapType") == 2) {//如果当前是2.5D，设备和区域换成2D的，然后将自定义属性的换成2.5D
        for (var i = 0; i < markerLayerArray.length; i++) {//更改设备的位置
            var layer = markerLayerArray[i];
            //2D/25D切换时候，有时候图层在切换前被隐藏了，如果隐藏的话先把他显示出来
            //if (layer.show == false) {
            //    csm.mapContainer.addLayer(layer);
            //    layer.show = true;
            //}
            for (var j = 0; j < layer.markers.length; j++) {
                var marker = layer.markers[j];
                if (marker.longitude && marker.latitude) {
                    marker.lonlat = new SuperMap.LonLat(marker.longitude, marker.latitude);
                }

            }
        }
        for (var i = 0; i < polygonLayerArray.length; i++) {//更改区域的位置
            var layer = polygonLayerArray[i];
            //2D/25D切换时候，有时候图层在切换前被隐藏了，如果隐藏的话先把他显示出来
            //if (layer.show == false) {
            //    csm.mapContainer.addLayer(layer);
            //    layer.show = true;
            //}
            var features25D = [];
            var features2D = [];
            for (var j = 0; j < layer.features.length; j++) {
                var feature = layer.features[j];
                if (feature.attributes.polygon2D && feature.attributes.polygon25D) {
                    //feature.geometry = feature.attributes.polygon2D;

                    var feature2D = new SuperMap.Feature.Vector(feature.attributes.polygon2D, feature.attributes);
                    //设置样式
                    feature2D.style = feature.style;
                    features25D.push(feature);
                    features2D.push(feature2D);
                }

            }
            if (features2D.length > 0) {
                layer.addFeatures(features2D);
                layer.removeFeatures(features25D);
                features25D = [];
                features2D = [];
            }
            layer.redraw();
        }


        csm.mapContainer.setBaseLayer(csm.baseMap);
        csm.mapContainer.setCenter(csm.center, 2);
        csm.baseMap.setVisibility(true);
        csm.baseMap25D.setVisibility(false);
        $("#mapContainer").attr("currentMapType", 1);
        //$(".mainMapSwicth").css({ "background-image": "url(../style/base/images/public/map/3wei-hover.png)" });
        //$(".sanwei span").text("2D");

    }
    else if ($("#mapContainer").attr("currentMapType") == 1) {//如果当前是2D，设备和区域换成25D的，然后将自定义属性的换成2D
        for (var i = 0; i < markerLayerArray.length; i++) {
            var layer = markerLayerArray[i];
            //2D/25D切换时候，有时候图层在切换前被隐藏了，如果隐藏的话先把他显示出来
            //if (layer.show == false) {
            //    csm.mapContainer.addLayer(layer);
            //    layer.show = true;
            //}
            for (var j = 0; j < layer.markers.length; j++) {
                var marker = layer.markers[j];
                if (marker.local_longitude && marker.local_latitude) {
                    marker.lonlat = new SuperMap.LonLat(marker.local_latitude, marker.local_longitude);
                }
            }
        }
        for (var i = 0; i < polygonLayerArray.length; i++) {//更改区域的位置
            var layer = polygonLayerArray[i];
            //2D/25D切换时候，有时候图层在切换前被隐藏了，如果隐藏的话先把他显示出来
            //if (layer.show == false) {
            //    csm.mapContainer.addLayer(layer);
            //    layer.show = true;
            //}
            var features25D = [];
            var features2D = [];
            for (var j = 0; j < layer.features.length; j++) {
                var feature = layer.features[j];
                if (feature.attributes.polygon25D) {
                    //feature.geometry = feature.attributes.polygon25D;

                    var feature25D = new SuperMap.Feature.Vector(feature.attributes.polygon25D, feature.attributes);
                    //设置样式
                    feature25D.style = feature.style;
                    features25D.push(feature25D);
                    features2D.push(feature);


                }
            }
            if (features25D.length > 0) {
                layer.addFeatures(features25D);
                layer.removeFeatures(features2D);
                features25D = [];
                features2D = [];
            }

            layer.redraw();
        }

        csm.mapContainer.setBaseLayer(csm.baseMap25D);
        csm.mapContainer.setCenter(csm.mapCenter25D, 3);
        csm.baseMap.setVisibility(false);
        csm.baseMap25D.setVisibility(true);
        $("#mapContainer").attr("currentMapType", 2);
        //$(".mainMapSwicth").css({ "background-image": "url(../style/base/images/public/map/2wei-hover.png)" });
        // $(".sanwei span").text("2.5D");

    }

}
function switchMapMain(type) {
    if (type == 2) {
        $("#mapContainer").attr("currentMapType", 2);
    }
    if (type == 25) {
        $("#mapContainer").attr("currentMapType", 1);
    }
    switchMap();
    //vedioPopupClose();
}
function addMap25D() {
    if (Map25DConfig) {
        csm.baseMap25D = new SuperMap.Layer.TiledDynamicRESTLayer("district", csm.serverUrl25D, { transparent: true, cacheEnabled: true });
        //监听图层信息加载完成事件
        csm.baseMap25D.events.on({ "layerInitialized": addMapLayer25D });
    }


}
function addMapLayer25D() {
    csm.mapContainer.addLayers([csm.baseMap25D]);
    var maxExtent25D = csm.baseMap25D.getMaxExtent();//获取2.5D地图边界
    supermap25Dmultiple = Number(maxExtent25D.top);//获取高度
    showDevice();
    showArea();
    //var size = new SuperMap.Size(15.15, 23);
    //var offset = new SuperMap.Pixel(-(size.w / 2), -size.h);
    //var icon = new SuperMap.Icon('../images/map/deviceMapIcon/normal_image/报警手册.png', size, offset);
    //marker = new SuperMap.Marker(new SuperMap.LonLat(92.99999998509884 * 4, 4243 - 42.999999701976776 * 4), icon);
    //marker = new SuperMap.Marker(new SuperMap.LonLat(3000.0, 2121.5), icon);
    //marker = new SuperMap.Marker(new SuperMap.LonLat(3000.0, 2121.5), icon);
    //marker = new SuperMap.Marker(new SuperMap.LonLat(3000.0, 2121.5), icon);
    //csm.vectorMarker.addMarker(marker);
    if (Map25DConfig && initMapType == 2) {//如果初始化地图为2.5D，就切换为2.5D
        switchMapMain(25);
    }

}
//读取配置
function readMap25DConfig() {
    if (!Map25DConfig) {
        //$(".mainMapSwicth").hide();//如果没有2.5D的配置就把2,5D切换按钮隐藏
        //$(".erwei").hide();
        $(".erwei2").hide();
        return;
    }
    else {
        $(".mainMapSwicth").show();
        var bound = Map25DConfig.map_bounds;
        var center = Map25DConfig.map_center;
        var mapurl = Map25DConfig.map_src;
        if (bound) {
            csm.southwest25D = bound.split('|')[0];
            csm.northeast25D = bound.split('|')[1];
        }
        if (center) {
            csm.mapCenter25D = new SuperMap.LonLat(center.split(',')[0], center.split(',')[1]);
        }
        if (mapurl) {
            csm.serverUrl25D = mapurl;
        }
    }
}