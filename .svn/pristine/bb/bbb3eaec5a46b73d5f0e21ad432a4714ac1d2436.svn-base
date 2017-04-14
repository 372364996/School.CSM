var csm = {};
csm.mapContainer = null;//地图容器
csm.baseMap = null;//地图的基础图层
csm.southwest = null;//西南角坐标（左下）
csm.northeast = null;//东北角坐标(右上)
csm.center = null;//地图中心
csm.serverUrl = null;
deviceLayerGroup = L.layerGroup();//所有的设备的图层
var DEVICEPLAN_ARRAY = [];
var planDeviceGroup = L.featureGroup();
var areaColor = {
    1: "#FF0000",
    2: "#EEAD0E",
    3: "#FFFF00",
    4: "#9ACD32"
};
$(document).ready(function () {
    InitMap();
    readMap2DConfig();
    LoadMap();
    planDeviceGroup.addTo(csm.mapContainer);
    csm.mapContainer.setView(csm.center, 17);
   
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
    csm.mapContainer.setView(csm.center, 17);

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
//从数据库中读取所有的设备并添加到地图上
function GetAllDevice(divice_id, regionId) {
    var inbuildingId = -1;
    for (var a = 0; a < AllDeviceInfo.length; a++) {
        if (AllDeviceInfo[a].id == divice_id) {
            inbuildingId = AllDeviceInfo[a].is_inbuilding;
        }
    }
    for (var i = 0; i < AllDeviceInfo.length; i++) {
        if (AllDeviceInfo[i].is_inbuilding)
            var deviceObj = AllDeviceInfo[i];

        //只有下面三个属性提取了，才能创建marker
        var latitude = deviceObj.latitude;
        var longitude = deviceObj.longitude;
        var device_type = deviceObj.device_type;
        var deviceMarker = null;
        if (deviceObj.id == divice_id) {
            //创建marker
            deviceMarker = L.marker([latitude, longitude]);
            csm.mapContainer.setView(deviceMarker.getLatLng());
        }
        else {
            deviceMarker = L.marker([latitude, longitude], { icon: L.icon({ iconUrl: '../images/map/deviceMapIcon/normal_image/球机.png', iconSize: [15.15, 23] }) });
        }

        //给marker赋属性
        deviceMarker.id = deviceObj.id;//主键
        deviceMarker.device_code = deviceObj.device_code; //设备编号
        deviceMarker.is_parts = deviceObj.is_parts; //复合设备
        deviceMarker.device_name = deviceObj.device_name; //设备名称
        deviceMarker.device_type = deviceObj.device_type; //设备类型
        deviceMarker.subsystem_id = deviceObj.subsystem_id; //子系统编号
        deviceMarker.longitude = deviceObj.longitude; //经度
        deviceMarker.latitude = deviceObj.latitude; // 纬度
        deviceMarker.register_time = deviceObj.register_time; //注册时间
        deviceMarker.search_code = deviceObj.search_code; //设备搜索缩写
        deviceMarker.local_longitude = deviceObj.local_longitude;//本地X轴（经度）
        deviceMarker.local_latitude = deviceObj.local_latitude;//本地Y轴（纬度）
        deviceMarker.device_status = deviceObj.device_status;//设备状态
        deviceMarker.update_status_time = deviceObj.update_status_time;//状态修改时间
        deviceMarker.cover_range = deviceObj.cover_range;//覆盖角度
        deviceMarker.camera_towards = deviceObj.camera_towards;//设备朝向
        deviceMarker.visual_range = deviceObj.visual_range;//覆盖半径
        deviceMarker.asset_code = deviceObj.asset_code;//资产编号
        deviceMarker.org_id = deviceObj.org_id;//所属部门
        deviceMarker.manufactor = deviceObj.manufactor;//厂家
        deviceMarker.asset_model = deviceObj.asset_model;//型号
        deviceMarker.create_time = deviceObj.create_time;//出厂日期
        deviceMarker.guarantee_time = deviceObj.guarantee_time;//保修期
        deviceMarker.asset_status = deviceObj.asset_status;//资产状态
        deviceMarker.asset_ip = deviceObj.asset_ip;//ip地址
        deviceMarker.port = deviceObj.port;//端口
        deviceMarker.mac_code = deviceObj.mac_code;//mac地址
        deviceMarker.serial_number = deviceObj.serial_number;//序列号
        deviceMarker.manager_id = deviceObj.manager_id;//负责人ID
        deviceMarker.is_inbuilding = deviceObj.is_inbuilding;//是否在楼内
        deviceMarker.room_id = deviceObj.room_id;//房间号
        deviceMarker.region_id = deviceObj.region_id;//园区编号
        deviceMarker.area_id = deviceObj.area_id;//区域编号
        deviceMarker.bindTooltip(deviceObj.device_name, { permanent: true, direction: 'bottom', className: 'mytooltip' });
        deviceMarker.on('click', function (e) {
            var marker = this;
            var id = marker.id;
            DEVICEPLAN_ARRAY.push(id);
            transferDeviceData(id);
        });
        //将marker添加到图层里面去
        if (deviceMarker.id == divice_id && deviceMarker.is_inbuilding == inbuildingId && deviceMarker.region_id== regionId) {
            planDeviceGroup.addLayer(deviceMarker);
        }
        else if ((deviceMarker.device_type == 1 || deviceMarker.device_type == 2 || deviceMarker.device_type == 3 || deviceMarker.device_type == 4) && deviceMarker.is_inbuilding == inbuildingId && deviceMarker.region_id== regionId) {
            planDeviceGroup.addLayer(deviceMarker);
        }

    }
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

//清空设备图层
function emptyDevice() {
    planDeviceGroup.clearLayers();
}





