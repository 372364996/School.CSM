var boxSelectLayer = null; //框选放要素的图层
var lineDistanceLayer = null;//线距离量算的图层
var areaMeasureLayer = null;//面积量算的图层
var circleSelect = null;//圆选工具
var polygonSelect = null;//多边形选择工具
var rectangleSelect = null;//矩形选择工具
var lineDistance = null;//线的距离量算
var areaMeasure = null;//面积的量算
var markerResult = [];//存放marker的数组

$(document).ready(function () {
    initBoxSelectLayer();//页面初始化的时候，创建选择工具，并且放到地图容器中
    $("#lineDistance").hide();
    $("#areaMeasure").hide();
    $(".TipsTop ul li:nth-child(4)").css("border-right", "none");
});
function initBoxSelectLayer() {
    boxSelectLayer = new SuperMap.Layer.Vector("boxSelectLayer");//放画出来要素的图层
    lineDistanceLayer = new SuperMap.Layer.Vector("lineDistanceLayer");//距离量算的图层
    areaMeasureLayer = new SuperMap.Layer.Vector("areaMeasureLayer");//面积量算的图层
    //圆选
    circleSelect = new SuperMap.Control.DrawFeature(boxSelectLayer, SuperMap.Handler.RegularPolygon, { handlerOptions: { sides: 50 } });
    circleSelect.events.on({ "featureadded": drawCircleCompleted });

    //多边形选
    polygonSelect = new SuperMap.Control.DrawFeature(boxSelectLayer, SuperMap.Handler.Polygon);
    polygonSelect.events.on({ "featureadded": drawPolygonCompleted });

    //线量算距离
    lineDistance = new SuperMap.Control.DrawFeature(lineDistanceLayer, SuperMap.Handler.Path, { multi: true });
    lineDistance.events.on({ "featureadded": areaLineMeasureCompleted });

    //面量算距离
    areaMeasure = new SuperMap.Control.DrawFeature(areaMeasureLayer, SuperMap.Handler.Polygon, { multi: true });
    areaMeasure.events.on({ "featureadded": areaLineMeasureCompleted });
    //将工具放到地图容器上
    csm.mapContainer.addControls([circleSelect, polygonSelect, lineDistance, areaMeasure]);


}

//选择的单击事件
function boxSelect(type) {
    //boxSelectLayer.removeAllFeatures();
    //markerResult = [];
    //circleSelect.deactivate();
    //polygonSelect.deactivate();
    clearSelect();
    if (type == 'circle') {
        circleSelect.activate();
    }
    if (type == 'polygon') {
        polygonSelect.activate();
    }
    if (type == 'rectangle') {
        drawRectangle();
    }
    if (type == 'line') {
        lineDistance.activate();
    }
    else if (type == 'area') {
        areaMeasure.activate();
    }


}
//距离量算完成事件
function areaLineMeasureCompleted(eventArgsLineDistance) {
    lineDistance.deactivate();
    areaMeasure.deactivate();
    var geometry = eventArgsLineDistance.feature.geometry,
    measureParam = new SuperMap.REST.MeasureParameters(geometry), /* MeasureParameters：量算参数类。 客户端要量算的地物间的距离或某个区域的面积*/
    myMeasuerService = new SuperMap.REST.MeasureService(csm.serverUrl); //量算服务类，该类负责将量算参数传递到服务端，并获取服务端返回的量算结果
    myMeasuerService.events.on({ "processCompleted": measureCompleted });
    myMeasuerService.events.on({ "processFailed": function (e) { alert(e.error.errorMsg) } });
    //对MeasureService类型进行判断和赋值，当判断出是LineString时设置MeasureMode.DISTANCE，否则是MeasureMode.AREA
    if (geometry.CLASS_NAME.indexOf("LineString") > -1) {
        myMeasuerService.measureMode = SuperMap.REST.MeasureMode.DISTANCE;
    } else {
        myMeasuerService.measureMode = SuperMap.REST.MeasureMode.AREA;
    }
    myMeasuerService.processAsync(measureParam); //processAsync负责将客户端的量算参数传递到服务端。


}
function measureCompleted(measureEventArgs) {
    var distance = measureEventArgs.result.distance;
    var area = measureEventArgs.result.area;
    var unit = measureEventArgs.result.unit;
    if (distance != -1) {
        distance = Math.round(distance * 100) / 100;
        alert("量算结果" + distance + "米");
    } else if (area != -1) {
        area = Math.round(area * 100) / 100;
        alert("量算结果" + area + "平方米");
    }
}
//画圆完成事件
function drawCircleCompleted(eventArgsCircle) {
    var drawCircleFeature = eventArgsCircle.feature;
    getSelectMarker(drawCircleFeature.geometry)
}
//画多边形完成事件
function drawPolygonCompleted(eventArgsPolygon) {
    var drawPolygonFeature = eventArgsPolygon.feature;
    getSelectMarker(drawPolygonFeature.geometry)
}
//绘制矩形
var movelays;
var drawBoxa;
function drawRectangle() {
    //先清除上次的显示结果
    rectangleSelect = new SuperMap.Control();
    SuperMap.Util.extend(rectangleSelect, {//Util工具类 extend指的是将复制所有的属性的源对象到目标对象
        draw: function () {
            this.box = new SuperMap.Handler.Box(rectangleSelect, { "done": this.notice }); //此句是创建一个句柄，Box是一个处理地图拖放一个矩形的事件，这个矩形显示是开始于在按下鼠标，然后移动鼠标，最后完成在松开鼠标。
            this.box.boxDivClassName = "qByBoundsBoxDiv"; //boxDivClassName用于绘制这个矩形状的图形
            this.box.activate(); //激活句柄
            drawBoxa = this.box;
        },
        //将拖动的矩形显示在地图上
        notice: function (bounds) {
            this.box.deactivate(); //处理关闭激活句柄

            var ll = csm.mapContainer.getLonLatFromPixel(new SuperMap.Pixel(bounds.left, bounds.bottom)), //getLonLatFromPixel从视口坐标获得地理坐标
                    ur = csm.mapContainer.getLonLatFromPixel(new SuperMap.Pixel(bounds.right, bounds.top));
            queryBounds = new SuperMap.Bounds(ll.lon, ll.lat, ur.lon, ur.lat);

            var feature = new SuperMap.Feature.Vector();
            feature.geometry = queryBounds.toGeometry();
            //feature.data = feadata;//定义绘制图形类型
            //feature.style = style; //覆盖物样式
            boxSelectLayer.addFeatures(feature);
            if (movelays != null) {
                boxSelectLayer.removeFeatures(movelays);
                // dialog({ id: 'newAreaPopup' }).close().remove()
                movelays = null;
                //BuildingIndex.outDrawState();
                //BuildingIndex.DrawAreaWindow(feature);
                getSelectMarker(feature.geometry);
            }
            else {
                movelays = feature;
                //BuildingIndex.outDrawState();
                //BuildingIndex.DrawAreaWindow(feature);
                getSelectMarker(feature.geometry);
            }
        }
    });
    csm.mapContainer.addControl(rectangleSelect);

}
function getSelectMarker(geometry) {
    //获取页面地图容器的div：mapContainer的自定义类型currentMapType的值,1为2D，2为2.5D，3为楼内图
    var currentMapType = $("#mapContainer").attr("currentMapType");
    var myLayerGroup = null;
    if (currentMapType == 1 || currentMapType == 2) {//主图上的设备
        myLayerGroup = markerLayerArray;//2D图的layerGroup，在本js中
    }
    if (currentMapType == 3) {//楼内图上的设备
        myLayerGroup = floorDeviceLayerArray;//楼内图layerGroup，在楼内图的js中
    }
    for (var i = 0; i < myLayerGroup.length; i++) {
        var layer = myLayerGroup[i];
        if (layer.show == true) {
            for (var j = 0; j < layer.markers.length; j++) {
                var marker = layer.markers[j];
                var markerLonlat = marker.lonlat;
                var point = new SuperMap.Geometry.Point(markerLonlat.lon, markerLonlat.lat);
                if (geometry.intersects(point)) {
                    markerResult.push(marker);
                }
            }
        }
    }
    alert(markerResult.length);
    clearSelect();
    return markerResult;
}
//清除选中
function clearSelect() {
    circleSelect.deactivate();
    polygonSelect.deactivate();
    lineDistance.deactivate();
    areaMeasure.deactivate();
    if (drawBoxa != null || drawBoxa != undefined) {
        drawBoxa.deactivate();
    }
    boxSelectLayer.removeAllFeatures();
    lineDistanceLayer.removeAllFeatures();
    areaMeasureLayer.removeAllFeatures();
    markerResult = [];
}

//放大
function zoomIn() {
    csm.mapContainer.zoomIn();
}
//缩小
function zoomOut() {
    csm.mapContainer.zoomOut();
}
//返回中心
function returnCenter() {
    csm.mapContainer.setCenter(csm.center, 2);
}
//返回原始级别
function initLevel() {
    csm.mapContainer.setCenter(csm.center, 2);
}