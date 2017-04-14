var csm = {};
csm.mapContainer = null;//地图容器
csm.serverUrl = null;//地图服务地址
csm.baseMap = null;//地图的基础图层
csm.southwest = null;//西南角坐标（左下）
csm.northeast = null;//东北角坐标(右上)
csm.center = null;//地图中心
csm.vectorPolygon = new SuperMap.Layer.Vector("Polygon");//超图放多边形的图层
csm.serverUrl = null;// "http:///182.92.162.3:8090/iserver/services/map-workBeiYou/rest/maps/areaBeiYou@areaBeiYou";
csm.planDeviceGroup = new SuperMap.Layer.Markers("planDeviceGroup");

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



$(document).ready(function () {
    InitMap();
    readMap2DConfig();
    LoadMap();
    //LoadPolygon();
});

function InitMap() {
    csm.mapContainer = new SuperMap.Map("mapContainer", {
        controls: [
            new SuperMap.Control.PanZoomBar(),
            new SuperMap.Control.ScaleLine(),
                    new SuperMap.Control.Navigation({
                        dragPanOptions: {
                            enableKinetic: true
                        }
                    })], allOverlays: true
    });
}

function LoadMap() {
    csm.baseMap = new SuperMap.Layer.TiledDynamicRESTLayer("district", csm.serverUrl, { transparent: true, cacheEnabled: true }, { scales: [0.00022870827440103002, 0.00032870827440103002, 0.00045741654880206004, 0.0009148330976041201, 0.0018296661952082401, 0.0036593323904164803, 0.007318664780832961, 0.010637329561665921, 0.014637329561665921] });
    //监听图层信息加载完成事件
    csm.baseMap.events.on({ "layerInitialized": addMapLayer });

}
//在图层初始化完成后才能调用addLayer()接口添加到Map上
function addMapLayer() {
    csm.mapContainer.addLayers([csm.baseMap, csm.vectorPolygon, csm.planDeviceGroup]);
    //显示地图范围
    csm.mapContainer.setCenter(csm.center, 0);
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
        var position = lonLat2Mercator(Number(longitude), Number(latitude));
        var size;
        var offset;
        var normal_image;
        //设置图标
        if (deviceObj.id == divice_id) {
             size = new SuperMap.Size(25, 41);
             offset = new SuperMap.Pixel(-(size.w / 2), -(size.h / 2));
             normal_image = '../scripts/js/map/mapRootJS/Leaflet_0.7/images/marker-icon.png';
             setTimeout("csm.mapContainer.setCenter(new SuperMap.LonLat("+position.x+", "+position.y+"), 0)", 500);

             
        }
        else {
             size = new SuperMap.Size(15.15, 23);
             offset = new SuperMap.Pixel(-(size.w / 2), -(size.h / 2));
             normal_image = '../images/map/deviceMapIcon/normal_image/球机.png';

           
        }
        var icon = new SuperMap.Icon(normal_image, size, offset);
        icon.imageDiv.text = deviceObj.device_name;
        icon.imageDiv.title = deviceObj.device_name;
        var deviceMarker = new SuperMap.Marker(new SuperMap.LonLat(position.x, position.y), icon);
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
        deviceMarker.events.on({
            "click": adddeviceMarker,
        });
        //将marker添加到图层里面去
        if (deviceMarker.id == divice_id && deviceMarker.is_inbuilding == inbuildingId && deviceMarker.region_id == regionId) {
            csm.planDeviceGroup.addMarker(deviceMarker);
        }
        else if ((deviceMarker.device_type == 1 || deviceMarker.device_type == 2 || deviceMarker.device_type == 3 || deviceMarker.device_type == 4) && deviceMarker.is_inbuilding == inbuildingId && deviceMarker.region_id == regionId) {
            csm.planDeviceGroup.addMarker(deviceMarker);
        }
    }
   setTimeout(addTitle, 1000);
}

//变化中心点位
function changePointCenter()
{
}


//初始化时给设备添加标题
function addTitle() {
    if (csm.planDeviceGroup.markers.length > 0) {
        
        for(var i=0;i<csm.planDeviceGroup.markers.length;i++)
        {
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
}

    //点击将摄像头添加到已选列表
    function adddeviceMarker()
    {
        var marker = this;
        var id = marker.id;
        transferDeviceData(id);
    }

    //清空设备图层
    function emptyDevice() {
        csm.planDeviceGroup.clearMarkers();
    }
    //将经纬度坐标转换为墨卡托平面坐标
    function lonLat2Mercator(lon, lat) {
        var lon = Number(lon);
        var lat = Number(lat);
        var mx, my;
        mx = lon * 20037508.3427892 / 180;
        my = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
        my = my * 20037508.3427892 / 180;

        var point = new SuperMap.Geometry.Point(mx, my);
        return point;
    }