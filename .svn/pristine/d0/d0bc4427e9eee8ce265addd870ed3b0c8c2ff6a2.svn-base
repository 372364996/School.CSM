var csm = {};
csm.mapContainer = null;//地图容器
csm.floorMap = null;
$(document).ready(function () {
    InitMap();
});
//初始化地图
function InitMap() {
    csm.mapContainer = L.map('mapContainer', {
        minZoom: 17,
        maxZoom: 21,
        zoom: 21,
        doubleClickZoom: false,
        center: [0, 0]
    });
}
//点击楼层号显示楼层
function treeNodeDblClick(floorinfo) {//floor_src_2d, point1, point2) {
    //var id = obj.id;
    //var a=obj.getAttribute("floor_src_2d");
    //var url = '../images/map/buildingImage/' + floor_src_2d + '.jpg';
    //为了兼容超图，文件夹名字为building_id
    var url = '../images/map/buildingImage/' + floorinfo.building_id + '/' + floorinfo.floor_src_2d+'.png';
    var point1 = floorinfo.point1;
    var point2 = floorinfo.point2;
    var southwest = Mercator2latlng(point1.split(',')[0], point1.split(',')[1]);
    var northeast = Mercator2latlng(point2.split(',')[0], point2.split(',')[1]);

    LoadFloorMap(url, southwest, northeast);
}
//根据图片路径、西南角坐标、东北角坐标创建楼内图对象
function LoadFloorMap(imagesrc, southwest, northeast) {
    if (csm.floorMap) {
        csm.mapContainer.removeLayer(csm.floorMap);//移除底图
    }
    csm.mapContainer.options.maxZoom = 22;
    csm.mapContainer.options.minZoom = 18;
    var imagesrc = imagesrc;
    var mapbounds = L.latLngBounds(southwest, northeast);
    csm.floorMap = L.imageOverlay(imagesrc, mapbounds);
    csm.floorMap.addTo(csm.mapContainer);
    csm.floorMap.bringToBack();
    csm.mapContainer.setView(mapbounds.getCenter(), 20);
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

//判断输入的坐标是不是墨卡托坐标
function isMercator(x, y) {
    var latlng = Mercator2latlng(x, y);
    var lat = latlng.lat;
    var lng = latlng.lng;
    lat = Math.floor(lat);
    lng = Math.floor(lng);
    if (lat < -90 || lat > 90 || lng < -180 || lng > 180) {
        return false;
    }
    else if (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        return true;
    }
}