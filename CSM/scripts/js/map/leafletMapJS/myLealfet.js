var csm = {};
csm.mapContainer = null;//地图容器
csm.baseMap = null;//地图的基础图层
csm.southwest = null;//西南角坐标（左下）
csm.northeast = null;//东北角坐标(右上)
csm.center = null;//地图中心
csm.serverUrl = null;
//areaLayerGroup = L.layerGroup();//所有的区域的图层
//deviceLayerGroup = L.layerGroup();//所有的设备的图层
$(document).ready(function () {
    InitMap();
    readMap2DConfig();
    LoadMap();
  
});
//初始化地图
function InitMap() {
    csm.mapContainer = L.map('mapContainer', {
        contextmenu: true,
        contextmenuWidth: 140,
        minZoom: 17,
        maxZoom: 20,
        zoom: 17,
        doubleClickZoom: false,
        closePopupOnClick: false
    });
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
        csm.center = center;
    }
    if (mapurl) {
        csm.serverUrl = '../images/map/' + mapurl;
    }
    csm.southwest = Mercator2latlng(csm.southwest.split(',')[0], csm.southwest.split(',')[1]);
    csm.northeast = Mercator2latlng(csm.northeast.split(',')[0], csm.northeast.split(',')[1]);
    csm.center = Mercator2latlng(center.split(',')[0], center.split(',')[1]);
}
//加载基础图层(图片)
function LoadMap() {
    csm.mapContainer.options.maxZoom = 20;
    csm.mapContainer.options.minZoom = 17;
    var imagesrc = csm.serverUrl;
    var mapbounds = [csm.southwest, csm.northeast];
    csm.baseMap = L.imageOverlay(imagesrc, mapbounds);
    csm.baseMap.addTo(csm.mapContainer);
    //LeafletMap.imgOverlay.bringToBack();
    csm.mapContainer.setView(csm.center, 17);
    //areaLayerGroup.addTo(csm.mapContainer);
    //deviceLayerGroup.addTo(csm.mapContainer);

}
function LoadMap2() {
    //192.168.1.115/mapcache/{z}/{x}/{y}.png [40.12114012421425000, 116.63497924804545000]
    //var tileLayer = L.tileLayer('http://192.168.1.143:10/suzhoudaxue/googlemaps/roadmap/{z}/{x}/{y}.png', {
    //    //attribution: '&copy; <a href="http://www.dlax.com">鼎立安信</a> contributors',
    //    center: [31.30400, 120.63911], maxZoom: 21
    //}).addTo(csm.mapContainer);
    //L.control.scale().addTo(csm.mapContainer);
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(csm.mapContainer);
}
//将墨卡托坐标转换为经纬度
function Mercator2latlng(x, y) {
    var lat, lng;
    lng = x / 20037508.3427892 * 180;
    lat = y / 20037508.3427892 * 180;
    lat = 180 / Math.PI * (2 * Math.atan(Math.exp(lat * Math.PI / 180)) - Math.PI / 2);
    var latlng = L.latLng(lat, lng);
    return latlng;
}