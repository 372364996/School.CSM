var csm = {};//地图全局变量
var BuildingIndex = {}; //画图工具全局变量
var operationControl = 0;//操作控制标记，用于表示操作类型，0：无操作 1：2D设备注册 2：2D设备修改 3：2.5D设备注册 4：2.5D设备修改 5：楼内图设备注册 6：楼内图设备修改
var infowin = null;//弹窗
var featureMove;//移动图层容器
var drawCompleted1, drawPolygonDou;//画图控件
var selectFeature;//选择控件
csm.dragFeature;//mark移动事件
csm.mapContainer = null;//地图容器
csm.serverUrl = null;//地图服务地址
csm.baseMap = null;//地图的基础图层
csm.southwest = null;//西南角坐标（左下）
csm.northeast = null;//东北角坐标(右上)
csm.center = null;//地图中心
var markers;//图层
var drawBoxa;
var movelays = null;
var vec;
var drawPolygonYuan, drawPolygonDou;//定义事件
BuildingIndex.ImageProperties = []; //存储画图坐标用
var vecs = []; // 定义个用来放已经画好的区域数组
var bigvecs = []; // 定义个用来放已经画好的大物理区域数组
var markers, MoveVectorLayer, vectorLayer,areaLayer;//各种图层
//csm.serverUrl = "http://123.56.96.237:8090/iserver/services/map-ugcv5-areaBeiYouareaBeiYou/rest/maps/areaBeiYou@areaBeiYou";
var area_id = 0;//区域id给2.5D注册用

csm.baseMap25D = null;//2.5D的地图对象
csm.mapCenter25D = null;//2.5D的地图的中心
csm.southwest25D = null;
csm.northeast25D = null;
csm.serverUrl25D = null;
//csm.serverUrl25 = "http://123.56.96.237:8090/iserver/services/map-ugcv5-wz25wz25/rest/maps/wz25@wz25";
var supermap25Dmultiple = Number(4243);//2.5D地图高度
var supermap25Dhigh = Number(4);//2.5D地图倍数


$(document).ready(function () {
    readMap2DConfig();
    readMap25DConfig();

    InitMap();//声明地图图层和控件
    LoadMap();
});


function InitMap() {
    markers = new SuperMap.Layer.Markers("Markers"); //添加的markers图层
    MoveVectorLayer = new SuperMap.Layer.Vector("MoveVectorLayer"); //声明一个一个矢量图层MoveVectorLayer控件，来呈现设备注册的移动点位 
    vectorLayer = new SuperMap.Layer.Vector("vectorLayer"); //声明一个矢量图层 vectorLayer 控件，用来呈现画面要素
    areaLayer = new SuperMap.Layer.Vector("areaLayer"); //声明一个矢量图层 vectorLayer 控件，用来呈现画面要素
    //vectorPolygon = new SuperMap.Layer.Vector("Polygon");//超图放多边形的图层
    //几何圆查询
    drawPolygonYuan = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.RegularPolygon, { handlerOptions: { sides: 50 } });
    drawPolygonYuan.events.on({ "featureadded": drawCompletedYuan });
    //多边形查询
    drawPolygonDou = new SuperMap.Control.DrawFeature(vectorLayer, SuperMap.Handler.Polygon);
    drawPolygonDou.events.on({ "featureadded": drawCompletedDuo });

    var callbacks = {
        //click: function (currentFeature) {
        //    areaLClick(currentFeature); //左键
        //},
        rightclick: function (currentFeature) {
            areaRClick(currentFeature); //右键
        }
    };
    selectFeature = new SuperMap.Control.SelectFeature(areaLayer, {
        callbacks: callbacks,
        hover: false
    });
    //map.addControl(selectFeature);

    csm.mapContainer = new SuperMap.Map("mapContainer", {
        controls: [
                new SuperMap.Control.PanZoomBar(), //地图平移缩放控件，提供对地图的平移和缩放的控制操作，默认位于地图左上角 
                new SuperMap.Control.ScaleLine(), //在地图添加比例尺，控件位置
                //new SuperMap.Control.LayerSwitcher(),//图层选择控件，默认在地图右上
                new SuperMap.Control.Navigation({//地图浏览控件，监听鼠标点击、平移、滚轮等事件来实现对地图的浏览操作。 
                    dragPanOptions: {
                        enableKinetic: true
                    }
                }),
                drawPolygonYuan, drawPolygonDou, selectFeature
        ],
        allOverlays: true
    });
}

function LoadMap() {
    selectFeature.activate();//选择事件，右键激活
    //基础图层
    csm.baseMap = new SuperMap.Layer.TiledDynamicRESTLayer("district2D", csm.serverUrl, { transparent: true, cacheEnabled: true });
    //监听图层信息加载完成事件
    csm.baseMap.events.on({ "layerInitialized": addMapLayer });


}
//在图层初始化完成后才能调用addLayer()接口添加到Map上
function addMapLayer() {
    //加载图层
    csm.mapContainer.addLayers([csm.baseMap,markers, MoveVectorLayer, vectorLayer, areaLayer]);
    //csm.baseMap25D = new SuperMap.Layer.TiledDynamicRESTLayer("district25D", csm.serverUrl25D, { transparent: true, cacheEnabled: true });

    csm.mapContainer.setCenter(csm.center, 0);
    //csm.baseMap25D.events.on({ "layerInitialized": addMapLayer25D });
    //显示地图范围
    //csm.mapContainer.setCenter(new SuperMap.LonLat(12952244.61, 4860210.88), 0);
    ////放大级别2
    csm.mapContainer.zoomTo(2);
    //showAllArea();//展示所有区域
    //addMap25D();
    showAllArea();//展示所有区域
}


//添加2.5D地图
function add25DBaseMap() {

        csm.baseMap25D = new SuperMap.Layer.TiledDynamicRESTLayer("district25D", csm.serverUrl25D, { transparent: true, cacheEnabled: true });

        //监听图层信息加载完成事件
        csm.baseMap25D.events.on({ "layerInitialized": addMapLayer25D });

}



//监听图层信息加载完成事件 
function addMapLayer25D() {
    csm.mapContainer.addLayers([csm.baseMap25D]);
    csm.mapContainer.setBaseLayer(csm.baseMap25D);
    csm.mapContainer.setCenter(csm.mapCenter25D, 2);//new SuperMap.LonLat(12983451.14, 4855707.47), 3);
    csm.baseMap.setVisibility(false);
    csm.baseMap25D.setVisibility(true);
    //放大级别2
    csm.mapContainer.zoomTo(3);
    csm.mapContainer.setLayerIndex(csm.baseMap25D, 0);

    var maxExtent25D = csm.baseMap25D.getMaxExtent();//获取2.5D地图边界
    supermap25Dmultiple = Number(maxExtent25D.top);//获取高度
    //csm.mapContainer.addLayers([csm.baseMap25D, markers, MoveVectorLayer, vectorLayer, areaLayer]);
    //显示地图范围new SuperMap.LonLat(12952244.61, 4860210.88)
    //csm.mapContainer.setCenter(csm.center, 0);
    //csm.mapContainer.zoomTo(2);//放大级别2
    //csm.baseMap25D.setVisibility(false);
    //showAllArea();//展示所有区域
}


//初始加载
$(function () {


});


//显示全部的区域
showAllArea = function () {

    for (var i = 0; i < AreaInfo.length; i++) {
        var shape = null;
        var areaObj = AreaInfo[i];
        var area_location = "";
        var isLoding = 0;//判断是否加载
       // var area_25D_location = areaObj.area_25D_location;
        switch (Number($("#mapContainer").attr("currentMapType"))) {
            case 1://2D
                if (areaObj.area_location == null || areaObj.area_location == undefined) {
                    isLoding = -1;//不加载
                    break;
                }
                area_location = areaObj.area_location;//如果是2D加载2D区域
                break;
            case 2://2.5D
                if (areaObj.area_25D_location == null || areaObj.area_25D_location == undefined) {
                    isLoding = -1;//不加载
                    break;
                }
                area_location = areaObj.area_25D_location;//如果是2.5D加载2.5D区域
                break;
            default:
                alert("地图类型错误，报错方法showAllArea()中第一个switch请查看错误参数。");
                break;

        }
        if (isLoding == -1) { continue; }//判断是否加载
        //如果区域为空跳过
        if (area_location == null || area_location == undefined || area_location == "") {
            continue; 
        }
        var level_color = areaObj.level_color;
        var latlngs = [];
        var points = [];//点位数组
        if (area_location.split('|').length > 2) {//多边形
            var latlngArray = area_location.split('|');
            for (var j = 0; j < latlngArray.length; j++) {
                var latlngStr = latlngArray[j].split(',');
                switch (Number($("#mapContainer").attr("currentMapType"))) {
                    case 1://2D
                        var m = gpsTransMercator(latlngStr[1], latlngStr[0])
                        points.push(new SuperMap.Geometry.Point(m.mx, m.my));
                        break;
                    case 2://2.5D
                        mx = Number(latlngStr[0]) * supermap25Dhigh;
                        my = supermap25Dmultiple - Number(latlngStr[1]) * supermap25Dhigh;
                        points.push(new SuperMap.Geometry.Point(mx, my));
                        break;
                    default:
                        alert("地图类型错误，报错方法showAllArea()中第二个switch请查看错误参数。");
                        break;
                }

            }
            var linearRings = new SuperMap.Geometry.LinearRing(points);
            var region = new SuperMap.Geometry.Polygon(linearRings);
        }
        if (area_location.split('|').length == 2) {//矩形
            var array = area_location.split('|');
            var southWestStr = area_location.split("|")[0];
            var northEastStr = area_location.split("|")[1];

            switch (Number($("#mapContainer").attr("currentMapType"))) {
                case 1://2D
                    var southWest = gpsTransMercator(southWestStr.split(',')[1], southWestStr.split(',')[0]);;//[southWestStr.split(',')[0], southWestStr.split(',')[1]];
                    var northEast = gpsTransMercator(northEastStr.split(',')[1], northEastStr.split(',')[0]);//[northEastStr.split(',')[0], northEastStr.split(',')[1]];
                    points.push(new SuperMap.Geometry.Point(southWest.mx, southWest.my));
                    points.push(new SuperMap.Geometry.Point(southWest.mx, northEast.my));
                    points.push(new SuperMap.Geometry.Point(northEast.mx, northEast.my));
                    points.push(new SuperMap.Geometry.Point(northEast.mx, southWest.my));
                    break;
                case 2://2.5D
                    var sw_mx = Number(southWestStr.split(',')[0]) * supermap25Dhigh;
                    var sw_my = supermap25Dmultiple - Number(southWestStr.split(',')[1]) * supermap25Dhigh;
                    var ne_mx = Number(northEastStr.split(',')[0]) * supermap25Dhigh;
                    var ne_my = supermap25Dmultiple - Number(northEastStr.split(',')[1]) * supermap25Dhigh;
                    points.push(new SuperMap.Geometry.Point(sw_mx, sw_my));
                    points.push(new SuperMap.Geometry.Point(sw_mx, ne_my));
                    points.push(new SuperMap.Geometry.Point(ne_mx, ne_my));
                    points.push(new SuperMap.Geometry.Point(ne_mx, sw_my));
                    break;
                default:
                    alert("地图类型错误，报错方法showAllArea()中第三个switch请查看错误参数。");
                    break;
            }

            var linearRings = new SuperMap.Geometry.LinearRing(points);
            var region = new SuperMap.Geometry.Polygon(linearRings);
        }
        if (area_location.indexOf('/') != -1) {//圆
            var radius = area_location.split('/')[0];
            var circleCenter = area_location.split('/')[1];
            switch (Number($("#mapContainer").attr("currentMapType"))) {
                case 1://2D
                    var m = gpsTransMercator(circleCenter.split(',')[1], circleCenter.split(',')[0]);
                    var origin = new SuperMap.Geometry.Point(m.mx, m.my);
                    break;
                case 2://2.5D
                    var m_x = Number(circleCenter.split(',')[0]) * supermap25Dhigh;
                    var m_y = supermap25Dmultiple - Number(circleCenter.split(',')[1]) * supermap25Dhigh;
                    var origin = new SuperMap.Geometry.Point(m_x, m_y);
                    break;
                default:
                    alert("地图类型错误，报错方法showAllArea()中第四个switch请查看错误参数。");
                    break;
            }

            var sides = 50;
            var region = new SuperMap.Geometry.Polygon.createRegularPolygon(origin, radius, sides, 360);
        }

        var attributes = {
            id: areaObj.id,
            name: areaObj.area_name,
            type: areaObj.area_type,
            level: areaObj.level_name,
            content:areaObj.content
        }
        vec = new SuperMap.Feature.Vector(region, attributes);
        vec.style = { fillColor: level_color, fillOpacity: 0.5, strokeWidth: 0.3 };
        areaLayer.addFeatures(vec);
    }
    areaLayer.redraw();
   // changeShape();
}

//区域右键事件
function areaRClick(currentFeature) {
    closeInfoWin();//关闭右键窗口
    //组织需要嵌入的HTML字符串表达 
    var contentHTML = '<div class="ball-frame rightball">';
    contentHTML += ' <div><button class="btn btn-default" onclick="UpdateArea(' + currentFeature.data.id + ');">修改</button></div>';
    contentHTML += '<div><button class="btn btn-default"  onclick="DeleteArea(' + currentFeature.data.id + ');">删除</button></div></div>';
    var x ;
    var y ;

    var centerLonLat = currentFeature.geometry.bounds.getCenterLonLat();//获取中心点位
    x = centerLonLat.lon;
    y = centerLonLat.lat;
    var lonLat = new SuperMap.LonLat(Number(x), Number(y))//定义位置信息
    var popwin = new SuperMap.Popup.Anchored("chicken",
    lonLat,
    new SuperMap.Size(120, 50),//窗体大小
    contentHTML,
    null,
    false,
    null);
    infowin = popwin;
    csm.mapContainer.addPopup(popwin);

}
//修改区域信息
function UpdateArea(id) {
    closeInfoWin();//关闭右键窗口
    hideRegisterPopup();//隐藏弹窗
    var shape;
    for (var i = 0; i < AreaInfo.length; i++) {
        if (AreaInfo[i].id == id) {

            shape = AreaInfo[i];
        }
    }
    var oldOptions = {
    };
    oldOptions.id = shape.id;
    oldOptions.area_name = shape.area_name//区域名称
    oldOptions.area_locationStr = shape.area_location;//坐标的字符串
    oldOptions.area_location = shape.area_location;//2d坐标
    oldOptions.area_25D_locationStr = shape.area_25D_location;//25d坐标的字符串
    oldOptions.area_25D_location = shape.area_25D_location;//25D坐标
    oldOptions.area_level = shape.area_level;  //区域级别ID
    oldOptions.area_type = shape.area_type; //区域类别ID
    oldOptions.person_id = shape.person_id; //人员编号
    oldOptions.map_type = shape.map_type;//地图类型
    oldOptions.is_show = shape.is_show;//是否显示
    oldOptions.content = shape.content;//备注
    oldOptions.grid_id = shape.grid_id;//网格ID
    oldOptions.region_id = shape.region_id;//园区编号
    oldOptions.area_image = shape.area_image;//区域的图片索引ID


    oldOptions.level_name = shape.level_name //级别名称
    oldOptions.level_color = shape.level_color;//级别的颜色
    oldOptions.level_status = shape.level_status;//级别状态
    if (shape.area_type == -1) {
        oldOptions.building_id = shape.building_id //楼宇ID
        oldOptions.area_type_id = shape.area_type_id//楼宇所属功能区
        oldOptions.building_name = shape.building_name//建筑名称
        oldOptions.alias = shape.alias//别名
        oldOptions.manager_id = shape.manager_id //负责人ID
        oldOptions.create_time = shape.create_time//建筑年代
        oldOptions.building_type = shape.building_type//结构类型
        oldOptions.above_ground_area = shape.above_ground_area  //地上面积
        oldOptions.under_ground_area = shape.under_ground_area//地下面积
        oldOptions.floor_num = shape.floor_num //楼层数
    }
    updateAreaDialog(oldOptions);

}
//删除区域
function DeleteArea(id) {
    closeInfoWin();//关闭右键窗口
    hideRegisterPopup();//隐藏弹窗
    deleteArea(id);//调取删除方法
    markers.clearMarkers();//清除图层上所有标注点
}

//清楚地图上的区域，以及画区域的工具栏
function clearDrawState() {
    vectorLayer.removeAllFeatures();//清除所有绘制要素

}

//关闭右键菜单
function closeInfoWin() {
    if (infowin) {
        try {
            infowin.hide();
            infowin.destroy();
        }
        catch (e) { }
    }

}


    //绘制矩形
function drawRectangle() {
    if (Number($("#mapContainer").attr("currentMapType")) == 2) {
        alert("2.5D地图不可使用此工具！请先在左侧的区域列表中双击区域名进行画区域操作！");
        return;
    }
    $("#areaRegisterPopup").hide();//清除前一个窗口
        //先清除上次的显示结果
        control = new SuperMap.Control();
        var feadata = {
            type : 3 //1：圆形 2：多边形 3：矩形

        }
        SuperMap.Util.extend(control, {//Util工具类 extend指的是将复制所有的属性的源对象到目标对象
            draw: function () {
                this.box = new SuperMap.Handler.Box(control, { "done": this.notice }); //此句是创建一个句柄，Box是一个处理地图拖放一个矩形的事件，这个矩形显示是开始于在按下鼠标，然后移动鼠标，最后完成在松开鼠标。
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
                feature.data = feadata;//定义绘制图形类型
                //feature.style = style; //覆盖物样式
                vectorLayer.addFeatures(feature);
                if (movelays != null) {
                    vectorLayer.removeFeatures(movelays);
                    // dialog({ id: 'newAreaPopup' }).close().remove()
                    movelays = null;
                    BuildingIndex.outDrawState();
                    BuildingIndex.DrawAreaWindow(feature);
                }
                else {
                    movelays = feature;
                    BuildingIndex.outDrawState();
                    BuildingIndex.DrawAreaWindow(feature);
                }



            }
        });
        csm.mapContainer.addControl(control);

    }


    //画圆BuildingIndex.drawGeometryYuan
function drawCircle() {
    if (Number($("#mapContainer").attr("currentMapType")) == 2) {
        alert("2.5D地图不可使用此工具！请先在左侧的区域列表中双击区域名进行画区域操作！");
        return;
    }
        $("#areaRegisterPopup").hide();//清除前一个窗口
        if (drawBoxa == null || drawBoxa == undefined) {
            drawPolygonDou.deactivate();
        }
        else {
            drawPolygonDou.deactivate();
            drawBoxa.deactivate();
        }
        //$("#drawyuanxing").css("top", "0px");
        drawPolygonYuan.activate();
    }

    //画多边形
function drawPolygon() {
    if (Number($("#mapContainer").attr("currentMapType")) == 2) {
        alert("2.5D地图不可使用此工具！请先在左侧的区域列表中双击区域名进行画区域操作！");
        return;
    }
        $("#areaRegisterPopup").hide();//清除前一个窗口
        if (drawBoxa == null || drawBoxa == undefined) {
            drawPolygonYuan.deactivate();
        }
        else {
            drawPolygonYuan.deactivate();
            drawBoxa.deactivate();
        }
        drawPolygonDou.activate();
    }

    //圆形处理事件
    function drawCompletedYuan(drawGeometryArgs) {
        var feadata = {
            type: 1 //1：圆形 2：多边形 3：矩形
        }
        drawGeometryArgs.feature.data = feadata;
        BuildingIndex.DrawAreaWindow(drawGeometryArgs.feature);
    }
    //多边形处理事件
    function drawCompletedDuo(drawGeometryArgs) {
        var feadata = {
            type: 2 //1：圆形 2：多边形 3：矩形
        }
        drawGeometryArgs.feature.data = feadata;
        BuildingIndex.DrawAreaWindow(drawGeometryArgs.feature);
    }
    //退出画图模式
    BuildingIndex.outDrawState = function () {
        //document.getElementById("map_canvas").style.cursor = "default";
        if (drawBoxa == null || drawBoxa == undefined) {
            drawPolygonYuan.deactivate(); //退出画圆模式,还原鼠标样式
            drawPolygonDou.deactivate(); //退出画多边形模式,还原鼠标样式
        } else {
            drawPolygonYuan.deactivate(); //退出画圆模式,还原鼠标样式
            drawPolygonDou.deactivate(); //退出画多边形模式,还原鼠标样式
            drawBoxa.deactivate();
        }
    }

    //绘制完后弹出添加区域窗口
    BuildingIndex.DrawAreaWindow = function (feature){
        var latlngStr;//临时缓存
        var radius;//圆的半径
        var latlon = "";//点位集合
        if ($("#mapContainer").attr("currentMapType") == 1) {//2维
            switch ( Number(feature.data.type)) {//判断画的圆、多边形还是矩形//1：圆形 2：多边形 3：矩形
                case 1://圆
                    //Mercator2latlng();
                    latlngStr = feature.geometry.bounds.getCenterLonLat();//获取中心点位
                    radius = feature.geometry.bounds.getWidth()/2;//获取宽度
                    var m = Mercator2latlng(latlngStr.lon, latlngStr.lat);
                    latlon = radius + '/' + m.lat + ',' + m.lon;
                    break;
                case 2://多边形
                    latlngStr = feature.geometry.getVertices();
                    
                    for (var i = 0; i < latlngStr.length; i++) {
                        var m = Mercator2latlng(latlngStr[i].x, latlngStr[i].y);
                        latlon += m.lat + ',' + m.lon;
                        if (i < latlngStr.length - 1) {
                            latlon += "|";
                        }
                    }
                    //latlngStr = bounds.getSouthWest().lat + ',' + bounds.getSouthWest().lng + '|' + bounds.getNorthEast().lat + ',' + bounds.getNorthEast().lng;
                    break;
                case 3://矩形
                    latlngStr = feature.geometry.getVertices();
                    if (latlngStr.length == 4) {
                        var m = Mercator2latlng(latlngStr[0].x, latlngStr[0].y);
                        var n = Mercator2latlng(latlngStr[2].x, latlngStr[2].y);
                        latlon = m.lat + ',' + m.lon + '|' + n.lat + ',' + n.lon;
                    }
                    else {
                        alert("超图BuildingIndex.DrawAreaWindow方法报错：矩形点不等于4个，请检查画矩形的方法是否异常！");

                    }
                   // latlngStr = bounds.getSouthWest().lat + ',' + bounds.getSouthWest().lng + '|' + bounds.getNorthEast().lat + ',' + bounds.getNorthEast().lng;
                    break;
                default:
                      alert("地图类型错误，报错方法BuildingIndex.DrawAreaWindow()请检查错误参数。");
                    break;
            }
            $("#area_location").val(latlon);
            showRegisterPopup();//弹出窗口
        }

        else if ($("#mapContainer").attr("currentMapType") == 2) {//2.5维
            switch (Number(feature.data.type)) {//判断画的圆、多边形还是矩形//1：圆形 2：多边形 3：矩形
                case 1://圆
                    latlngStr = feature.geometry.bounds.getCenterLonLat();//获取中心点位
                    radius = feature.geometry.bounds.getWidth() / 2;//获取宽度
                    var m_x = Number(latlngStr.lon) / supermap25Dhigh;
                    var m_y = (supermap25Dmultiple - Number(latlngStr.lat)) / supermap25Dhigh;
                    // var m = Mercator2latlng(latlngStr.lon, latlngStr.lat);
                    // latlon = radius + '/' + m.lat + ',' + m.lon;
                    latlon = radius + '/' + m_x + ',' + m_y;
                    break;
                case 2://多边形
                    latlngStr = feature.geometry.getVertices();
                    for (var i = 0; i < latlngStr.length; i++) {
                        //var m = Mercator2latlng(latlngStr[i].x, latlngStr[i].y);
                        var mx = Number(latlngStr[i].x) / supermap25Dhigh;
                        var my = (supermap25Dmultiple - Number(latlngStr[i].y)) / supermap25Dhigh;
                        latlon += mx + ',' + my;
                        if (i < latlngStr.length - 1) {
                            latlon += "|";
                        }
                    }
                    break;
                case 3://矩形
                    latlngStr = feature.geometry.getVertices();
                    if (latlngStr.length == 4) {
                        var sw_x = Number(latlngStr[0].x) / supermap25Dhigh;
                        var sw_y = (supermap25Dmultiple - Number(latlngStr[0].y)) / supermap25Dhigh;
                        var ne_x = Number(latlngStr[2].x) / supermap25Dhigh;
                        var ne_y = (supermap25Dmultiple - Number(latlngStr[2].y)) / supermap25Dhigh;
                        //var m = Mercator2latlng(latlngStr[0].x, latlngStr[0].y);
                        //var n = Mercator2latlng(latlngStr[2].x, latlngStr[2].y);
                        latlon = sw_x + ',' + sw_y + '|' + ne_x + ',' + ne_y;
                    }
                    else {
                        alert("超图BuildingIndex.DrawAreaWindow方法报错：矩形点不等于4个，请检查画矩形的方法是否异常！");

                    }
                    // latlngStr = bounds.getSouthWest().lat + ',' + bounds.getSouthWest().lng + '|' + bounds.getNorthEast().lat + ',' + bounds.getNorthEast().lng;
                    break;
                default:
                    alert("地图类型错误，报错方法BuildingIndex.DrawAreaWindow()请检查错误参数。");
                    break;
            }           
            
            if (!confirm("确定要将区域注册到该位置吗")) {
                clearDrawState();
                return;
            }
            var isbool = RegisterArea25D(area_id, latlon);//注册区域
            
            if (isbool) {
                GetAreaTree();//更新树
                getAreaInfo();//重新画区域
                //showAllArea();//更新所有绘制要素
                alert("2.5D区域注册成功！");
            }
            else {

                alert("2.5D区域注册失败！,报错位置为 BuildingIndex.DrawAreaWindow()中的RegisterArea25D()方法调用！");

            }
            //showRegisterPopup();//弹出窗口
        }

    
    }

    //清理绘制图层
    function clearDrawState() {

        vectorLayer.removeAllFeatures();//清除所有绘制要素
        BuildingIndex.outDrawState();//取消所有事件
    }

    //清理区域
    function clearAreaObj() {
        vectorLayer.removeAllFeatures();//清除所有绘制要素
        areaLayer.removeAllFeatures();//清除所有绘制要素
        BuildingIndex.outDrawState();//取消所有事件
    }




//树的双击事件
function getTreeDbclick(id) {
    if ($("#mapContainer").attr("currentMapType") == 2) {//2.5维
        markers.clearMarkers();
        var lonlat;
        for (var l = 0; l < AreaInfo.length; l++) {
            if (id == AreaInfo[l].id) {

                if (AreaInfo[l].area_25D_location == null || AreaInfo[l].area_25D_location == undefined||AreaInfo[l].area_25D_location=="") {

                    if (AreaInfo[l].area_location.split('|').length > 2) {//多边形
                        area_id = id;
                        drawPolygon();
                    }
                    if (AreaInfo[l].area_location.split('|').length == 2) {//矩形
                        area_id = id;
                        drawRectangle();
                    }
                    if (AreaInfo[l].area_location.indexOf('/') != -1) {//圆
                        area_id = id;
                        drawCircle();
                    }

                }
                else {

                    for (var i = 0; i < vec.layer.features.length; i++) {
                        if (id == vec.layer.features[i].data.id) {
                            //创建marker
                            var x;
                            var y;
                            lonlat = vec.layer.features[i].geometry.bounds.getCenterLonLat();//获取中心点位
                            x = lonlat.lon;
                            y = lonlat.lat;
                            var icon = "../scripts/js/map/mapRootJS/SuperMap/theme/images/cluster2.png";
                            var size = new SuperMap.Size(41, 46);
                            var offset = new SuperMap.Pixel(-(size.w / 2.4), -(size.h / 1.1));
                            var eicon = new SuperMap.Icon(icon, size, offset);
                            eicon.imageDiv.text = vec.layer.features[i].data.name;
                            eicon.imageDiv.title = vec.layer.features[i].data.name;
                            var deviceMarker = new SuperMap.Marker(new SuperMap.LonLat(Number(x), Number(y)), eicon);
                            //deviceMarker.events.on({
                            //    "rightclick": deviceRightPopup,
                            //    "scope": deviceMarker            graphicXOffset: -(41/2.4),
                            //graphicYOffset: -(46 / 1.1)
                            //});
                            markers.addMarker(deviceMarker);
                        }
                    }
                }

            }

        }
    }
    else if ($("#mapContainer").attr("currentMapType") == 1) {//2维
        markers.clearMarkers(); //if (markers.markers.length > 0) { markers.clearMarkers(); }//如果图层中存在marker点清除
        var lonlat;
        for (var i = 0; i < vec.layer.features.length; i++) {

            if (id == vec.layer.features[i].data.id) {
                //创建marker
                var x;
                var y;
                lonlat = vec.layer.features[i].geometry.bounds.getCenterLonLat();//获取中心点位
                x = lonlat.lon;
                y = lonlat.lat;
                var icon = "../scripts/js/map/mapRootJS/SuperMap/theme/images/cluster2.png";
                var size = new SuperMap.Size(41, 46);
                var offset = new SuperMap.Pixel(-(size.w / 2.4), -(size.h / 1.1));
                var eicon = new SuperMap.Icon(icon, size, offset);
                eicon.imageDiv.text = vec.layer.features[i].data.name;
                eicon.imageDiv.title = vec.layer.features[i].data.name;
                var deviceMarker = new SuperMap.Marker(new SuperMap.LonLat(Number(x), Number(y)), eicon);
                markers.addMarker(deviceMarker);
            }
        }

    }
}

//页面调用地图切换方法
function RegiterSwitchMap() {
    //if (Number($("#mapContainer").attr("currentMapType")) == 1 && csm.serverUrl25D == null && csm.serverUrl25D == undefined && csm.serverUrl25D == "")
    //{
    //    alert("未配置2.5D地图参数，请配置后再访问！");
    //    return;
    //}
    clearAreaObj();//清除所有绘制要素和事件
    markers.clearMarkers();//清除marker
    switchMapType();
}

//地图切换方法
function switchMapType() {

    //isClickFloor = false;
    //MoveVectorLayer.removeAllFeatures();//清除移动图层数据
    switch (Number($("#mapContainer").attr("currentMapType"))) {
        case 2://2D
            //markers.clearMarkers();new SuperMap.LonLat(12952244.61, 4860210.88)
            csm.mapContainer.setBaseLayer(csm.baseMap);
            csm.mapContainer.setCenter(csm.center, 2);
            csm.baseMap.setVisibility(true);
            csm.baseMap25D.setVisibility(false);
            $("#mapContainer").attr("currentMapType", 1);
            $("#areatools").attr("style", "display:;");
            $(".mainMapSwicth").css({ "background-image": "url(../style/base/images/public/map/3wei-hover.png)" });

            GetAreaTree();//加载树
            showAllArea();
            break;
        case 1://2.5Dnew SuperMap.LonLat(3000.0, 2121.5)
            //if (csm.serverUrl25D != null && csm.serverUrl25D != undefined && csm.serverUrl25D != "") {
                add25DBaseMap();
                //csm.mapContainer.setBaseLayer(csm.baseMap25D);
                //csm.mapContainer.setCenter(csm.mapCenter25D, 3);
                // csm.baseMap.setVisibility(false);
                //csm.baseMap25D.setVisibility(true);
                $("#areatools").attr("style", "display: none;");
                $("#mapContainer").attr("currentMapType", 2);
                $(".mainMapSwicth").css({ "background-image": "url(../style/base/images/public/map/2wei-hover.png)" });
                GetAreaTree();//加载树
                showAllArea();
            //}

            //else {

            //    alert("未配置2.5D地图参数，请配置后再访问！");
            //    return;
            //}
            break;
        default:
            alert("地图类型错误！报错方法RegiterSwitchMap()请检查返回值！");
            break;
    }


}


    //将经纬度坐标转换为墨卡托平面坐标
    function gpsTransMercator(lon, lat) {
        var mx, my;
        lon = Number(lon);
        lat = Number(lat);
        mx = lon * 20037508.3427892 / 180;
        my = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
        my = my * 20037508.3427892 / 180;
        var m = { "mx": mx, "my": my };
        return m;
    }
    //将墨卡托平面坐标转换为经纬度
    function Mercator2latlng(x, y) {
        var lat, lon;
        x = Number(x);
        y = Number(y);
        lon = x / 20037508.3427892 * 180;
        lat = y / 20037508.3427892 * 180;
        lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
        var lonlat = { "lon": lon, "lat": lat };
        return lonlat;
    }

    //创建EventUtil对象监听右键事件，关闭右键菜单用
    var EventUtil = {
        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            }
            else if (element.attachEvent) {
                element.attachEvent("on" + type, handler);
            }
        },
        getEvent: function (event) {
            return event ? event : window.event;
        },
        //取消事件的默认行为
        preventDefault: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },
        stopPropagation: function (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        }
    };
    EventUtil.addHandler(window, "load", function (event) {
        EventUtil.addHandler(document, "click", function (event) {
            closeInfoWin();
        });
    });


    //读取2D配置
    function readMap2DConfig() {

        var bound = Map2DConfig.map_bounds;
        var center = Map2DConfig.map_center;
        var mapurl = Map2DConfig.map_src;
        if (bound) {
            csm.southwest = bound.split('|')[0];
            csm.northeast = bound.split('|')[1];
        }
        if (center) {
            csm.center = new SuperMap.LonLat(center.split(',')[0], center.split(',')[1]);
        }
        if (mapurl) {
            csm.serverUrl = mapurl;
        }
    }

    //读取2.5D配置
    function readMap25DConfig() {
        if (!Map25DConfig) {
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
            if (center) {
                csm.mapCenter25D = new SuperMap.LonLat(center.split(',')[0], center.split(',')[1]);
            }
            if (mapurl) {
                csm.serverUrl25D = mapurl;
            }
        }
    }