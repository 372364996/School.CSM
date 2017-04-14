var supermap25Dmultiple = 1;// Number(4243);//2.5D地图高度
var supermap25Dhigh = Number(4);//2.5D地图倍数
var csm = {};
csm.mapContainer = null;//地图容器
csm.serverUrl = null;//地图服务地址
csm.baseMap = null;//地图的基础图层
csm.southwest = null;//西南角坐标（左下）
csm.northeast = null;//东北角坐标(右上)
csm.center = null;//地图中心
//csm.vectorPolygon = new SuperMap.Layer.Vector("Polygon");//超图放多边形的图层
//csm.vectorMarker = new SuperMap.Layer.Markers("Markers");
var semiCircleLayer = new SuperMap.Layer.Vector("semiCircle");//放扇形的图层
csm.serverUrl = null;
$(document).ready(function () {

    InitMap();
    readMap2DConfig();
    LoadMap();
});

function InitMap() {
    csm.mapContainer = new SuperMap.Map("mapContainer", {
        controls: [
                 //new SuperMap.Control.Zoom(),
                 //new SuperMap.Control.Navigation(),
                 //new SuperMap.Control.LayerSwitcher()
                 new SuperMap.Control.PanZoomBar(),
                 new SuperMap.Control.ScaleLine(),
                  new SuperMap.Control.Navigation({//地图浏览控件，监听鼠标点击、平移、滚轮等事件来实现对地图的浏览操作。 
                      dragPanOptions: {
                          enableKinetic: true
                      }
                  })
        ]
    });
    initBoxSelectLayer();
}


function LoadMap() {
    csm.baseMap = new SuperMap.Layer.TiledDynamicRESTLayer("district", csm.serverUrl, { transparent: true, cacheEnabled: true });
    //监听图层信息加载完成事件
    csm.baseMap.events.on({ "layerInitialized": addMapLayer });

}
//在图层初始化完成后才能调用addLayer()接口添加到Map上
function addMapLayer() {
    csm.mapContainer.addLayers([csm.baseMap]);
    csm.mapContainer.addLayer(semiCircleLayer);
    //显示地图范围
    csm.mapContainer.setCenter(csm.center, 2);
    //csm.mapContainer.addLayer(csm.vectorMarker);
    if (Map25DConfig) {
        addMap25D();
    }
    else {
        showDevice();
        showArea();
    }
   

    f1(initVideoPopup);
    //createVedioPopup();//创建弹窗
    //closeVedioPopup();
    //isLoadingVedio = 1;
    //videoClassify.initLogin();//初始登录播放视频平台//setTimeout(mapVideo.initLogin, 1000);// 
}


function f1(callback) {
    setTimeout(function () {
        // f1的任务代码
        callback();
    }, 300);
}
//
function LoadPolygon() {
    var linearRing = new SuperMap.Geometry.LinearRing();
    var congdeLou = "4855737.06413293,12983437.7569553|4855748.37880091,12983437.7569553|4855746.8701777,12983486.9234838|4855719.71500035,12983486.3450533|4855717.45207214,12983505.4332346|4855650.31877279,12983503.6979463|4855649.56446874,12983403.0511716|4855736.30982215,12983404.2080305|4855737.81844376,12983403.629601#";
    var lonlatArray = congdeLou.substring(0, congdeLou.length - 1).split('|');
    for (var i = 0; i < lonlatArray.length; i++) {
        var lonlat = lonlatArray[i].split(',');
        var point = new SuperMap.Geometry.Point(lonlat[1], lonlat[0]);
        linearRing.addComponent(point);
    }
    //通过线环对象组成一个多边形对象
    var polygon = new SuperMap.Geometry.Polygon(linearRing);
    var attributes = {
        name: "崇德楼"
    }
    var polygonFeature = new SuperMap.Feature.Vector(polygon, attributes);

    polygonFeature.style = { strokeColor: "#006400", strokeWidth: "2", strokeOpacity: "0.6", fillColor: "#006400", fillOpacity: "0.3" };
    csm.vectorPolygon.addFeatures(polygonFeature);
    var selectFeature = new SuperMap.Control.SelectFeature(csm.vectorPolygon, {
        callbacks: {
            over: function (currentFeature) {
                currentFeature.style.label = currentFeature.attributes.name;
                currentFeature.style.fontSize = "20";
                //currentFeature.style.fillOpacity = "0.3";
                //currentFeature.style.strokeOpacity = "0.6";
                csm.vectorPolygon.redraw();
                //setStyle(currentFeature);
                //document.getElementById("tips").innerHTML += currentFeature.attributes.name;
                //alert("悬浮"+currentFeature.attributes.ID);
            },
            out: function (currentFeature) {
                currentFeature.style.label = null;
                //currentFeature.style.fillOpacity = "0";
                //currentFeature.style.strokeOpacity = "0";
                csm.vectorPolygon.redraw();
                //document.getElementById("tips").innerHTML += currentFeature.attributes.name;
            }
        }
    });
    csm.mapContainer.addControl(selectFeature);
    selectFeature.activate();
}

//读取配置
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