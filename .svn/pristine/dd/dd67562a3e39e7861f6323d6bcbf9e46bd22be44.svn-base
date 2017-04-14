var selectType = null;
var rectangle = null;//框选画出来的矩形
var circle = null;//圆选
var latlngbounds = null;//矩形的边界框
var radius = null;
var circleCenter = null;
//鼠标第一次按下去的坐标
var startlatlng = null;
//鼠标移动时的坐标
var movelatlng = null;
var markerResult = [];
$(document).ready(function () {
    $("#polygonSelect").hide();
    $("#lineDistance").hide();
    $("#areaMeasure").hide();
    $(".TipsTop ul li:nth-child(3)").css("border-right","none");
    //.TipsTop ul li:nth-child(2) {
    //    border-right: none !important;
    //}
});
//矩形选择的功能
function boxSelect(shape) {
    selectType = shape;
    markerResult = [];
    //$("#recSelect").attr("src", "../../../Content/Map/MapImages/img/direction/框选2.png");
    //设置地图不可移动拖拽
    csm.mapContainer.dragging.disable();
    csm.mapContainer.on('mousedown', boxSelectMouseDown);
    csm.mapContainer.on('mousemove', boxSelectMouseMove);
    csm.mapContainer.on('mouseup', boxSelectMouseUp);
}

//框选鼠标按下事件
function boxSelectMouseDown(e) {
    //鼠标第一次按下去获取的坐标
    startlatlng = L.latLng(e.latlng.lat, e.latlng.lng);
}
//框选鼠标移动事件
function boxSelectMouseMove(e) {
    if (startlatlng) {
        //鼠标移动的获取的坐标
        movelatlng = L.latLng(e.latlng.lat, e.latlng.lng);
        if (selectType == "rectangle") {
            //每一次移动都清除一下矩形
            if (rectangle != null) {
                //每一次移动都清除一下矩形
                csm.mapContainer.removeLayer(rectangle);

            }
            //画矩形并放在地图上
            rectangle = L.rectangle([startlatlng, movelatlng], { color: "#ff7800", weight: 2 }).addTo(csm.mapContainer);
        }
        if (selectType == "circle") {
            //每一次移动都清除一下矩形
            if (circle != null) {
                //每一次移动都清除一下矩形
                csm.mapContainer.removeLayer(circle);

            }
            //画矩形并放在地图上
            var r = startlatlng.distanceTo(movelatlng);
            circle = L.circle(startlatlng, { radius: r, color: "#ff7800", weight: 2 }).addTo(csm.mapContainer);
        }
    }
}
//框选鼠标弹起事件
function boxSelectMouseUp(e) {
    //鼠标第一次按下去的坐标
    startlatlng = null;
    //鼠标移动时的坐标
    movelatlng = null;
    //停止鼠标的移动和按下事件
    csm.mapContainer.off('mousemove');
    csm.mapContainer.off('mousedown');
    //停止鼠标的弹起事件
    csm.mapContainer.off('mouseup');
    //让地图可以移动拖拽
    csm.mapContainer.dragging.enable();
    if (selectType == "rectangle") {
        if (rectangle != null) {
            latlngbounds = rectangle.getBounds();
            //鼠标弹起后移除画的矩形
            csm.mapContainer.removeLayer(rectangle);
            rectangle = null;
            getSelectMarker();
        }
        else {

        }
    }
    if (selectType == "circle") {
        if (circle != null) {
            radius = circle.getRadius();
            circleCenter = circle.getLatLng();
            //鼠标弹起后移除画的矩形
            csm.mapContainer.removeLayer(circle);
            circle = null;
            getSelectMarker();
        }
        else {

        }
    }
}
//得到选中的marker
function getSelectMarker() {
    //获取页面地图容器的div：mapContainer的自定义类型currentMapType的值,1为2D，2为2.5D，3为楼内图
    var currentMapType = $("#mapContainer").attr("currentMapType");
    var myLayerGroup = null;//楼内图的marker图层组或者2d/2.5d的marker图层组
    if (currentMapType == 1 || currentMapType == 2) {//主图上的设备
        myLayerGroup = deviceLayerGroup;//2D图的layerGroup，在本js中
    }
    if (currentMapType == 3) {//楼内图上的设备
        myLayerGroup = floorDeviceLayerGroup;//楼内图layerGroup，在楼内图的js中
    }
    //循环图层组
    myLayerGroup.eachLayer(function (layer) {
        var featureGroup = layer;
        //如果这个图层没有被隐藏
        if (featureGroup.show == true) {
            //循环这个图层
            featureGroup.eachLayer(function (marker) {
                //得到marker额坐标
                var latlng = marker.getLatLng();
                if (selectType == "rectangle") {//如果是矩形选择
                    if (latlngbounds.contains(latlng) == true) {//如果矩形的边界中存在这个marker的位置
                        markerResult.push(marker);
                        return;
                    }
                }
                if (selectType == "circle") {//如果是圈选
                    if (circleCenter.distanceTo(latlng) <= radius) {//如果圆心距离marker的位置小于圆的半径
                        markerResult.push(marker);
                        return;
                    }
                }

            });
        }

    });
    alert(markerResult.length);
    return markerResult;
}
//清除选中
function clearSelect() {
    //停止鼠标的移动和按下事件
    csm.mapContainer.off('mousemove');
    csm.mapContainer.off('mousedown');
    //停止鼠标的弹起事件
    csm.mapContainer.off('mouseup');
    if (circle != null) {
        //每一次移动都清除一下矩形
        csm.mapContainer.removeLayer(circle);

    }
    if (rectangle != null) {
        //每一次移动都清除一下矩形
        csm.mapContainer.removeLayer(rectangle);

    }
    selectType = null;
    rectangle = null;//框选画出来的矩形
    circle = null;//圆选
    latlngbounds = null;//矩形的边界框
    radius = null;
    circleCenter = null;
    startlatlng = null;
    movelatlng = null;
    markerResult = [];

    //让地图可以移动拖拽
    csm.mapContainer.dragging.enable();
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
    csm.mapContainer.setView(csm.center, 17);
}
//返回原始级别
function initLevel() {
    csm.mapContainer.setView(csm.center, 17);
}

