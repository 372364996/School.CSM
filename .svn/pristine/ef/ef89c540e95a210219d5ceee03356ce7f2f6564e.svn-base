csm.floorMap = null;//楼内图对象
var floorDeviceLayerGroup = L.layerGroup();//所有的楼内图设备的图层
var sortAttrName = "";//排序名称
//对json进行降序排序函数
var desc = function (x, y) {
    return (x[sortAttrName] < y[sortAttrName]) ? 1 : -1
}
//对json进行升序排序函数  
var asc = function (x, y) {
    return (x[sortAttrName] > y[sortAttrName]) ? 1 : -1
}
$(document).ready(function () {
    floorDeviceLayerGroup.addTo(csm.mapContainer);
});
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
    //LeafletMap.imgOverlay.bringToBack();
    csm.mapContainer.setView(mapbounds.getCenter(), 20);
}

//楼内图按钮的单击事件
function floorInClick(id) {
    $("#mapContainer").attr("currentMapType", 3);
    var html = '';
    //通过对rank字段对楼层json进行排序
    sortAttrName = "rank";
    floorBuildingArea.sort(asc);
    for (var i = 0; i < floorBuildingArea.length; i++) {
        var floor = floorBuildingArea[i];
        if (floor.area_id == id) {
            html = html + '<li id="' + floor.id + '" rank="' + floor.rank + '" building_id="' + floor.building_id + '" building_name="' + floor.building_name + '" area_id="' + floor.area_id + '" area_name="' + floor.area_name + '" point1="' + floor.point1 + '" point2="' + floor.point2 + '" floor_src_2d="' + floor.floor_src_2d + '" onclick="floorNumClick(this)"' + '>' + floor.floor_name + '</li>';
        }
    }
    if (html) {

        csm.mapContainer.removeLayer(csm.baseMap);//移除底图
        csm.mapContainer.removeLayer(areaLayerGroup);//移除区域的图层
        csm.mapContainer.removeLayer(deviceLayerGroup);//移除设备的图层
        $("#rightFloat").hide();//隐藏区域工具栏
        $(".mapType-wrapper").hide();//隐藏2/3维切换
        $(".floorTool-num").html(html);//设置楼内图工具栏div
        $("#floorTool").show();//显示楼内图的工具栏
        resetDeviceToolIcon();//重置设备工具栏图标，都设置为激活图标


        //var first = $(".floorTool-num li:first-child");
        //var first = $(".floorTool-num").find("li").get(0);
        //var first = $(".floorTool-num").children("li").firstChild;
        var first = $(".floorTool-num").children(":first");
        floorNumClick(first[0]);

    }
    else {
        alert("当前楼宇暂未注册楼内图，请您先注册！");
    }

}
//点击楼层号显示楼层
function floorNumClick(obj) {
    var id = obj.id;
    //var a=obj.getAttribute("floor_src_2d");
    //var url = '../images/map/buildingImage/' + obj.attributes["floor_src_2d"].nodeValue + '.jpg';
    //var url = '../images/map/buildingImage/' + obj.attributes["area_name"].nodeValue + '/' + obj.attributes["floor_src_2d"].nodeValue;
    var url = '../images/map/buildingImage/' + obj.getAttribute("building_id") + '/' + obj.getAttribute("floor_src_2d") + '.png';
    var point1 = obj.attributes["point1"].nodeValue;
    var point2 = obj.attributes["point2"].nodeValue;
    //var southwest = [point1.split(',')[0], point1.split(',')[1]];
    //var northeast = [point2.split(',')[0], point2.split(',')[1]];

    var southwest = Mercator2latlng(point1.split(',')[0], point1.split(',')[1]);
    var northeast = Mercator2latlng(point2.split(',')[0], point2.split(',')[1]);

    LoadFloorMap(url, southwest, northeast);
    //$(".currentFloor").html(obj.getAttribute("building_name"));
    var floorName = obj.innerText;
    $(".currentFloor").html(obj.getAttribute("area_name") + floorName);
    $(".currentID").html(obj.getAttribute("id"));
    addFloorDevice(obj.getAttribute("id"));
}
//上一层楼
function lastFloorClick() {
    var currentID = $(".currentID").html();
    var last = $(".floorTool-num").children("#" + currentID).prev();
    if (last.length == 1) {
        floorNumClick(last[0]);
    }
    else {
        alert("已经是最上一层！");
    }
}
//下一层楼
function nextFloorClick() {
    var currentID = $(".currentID").html();
    var next = $(".floorTool-num").children("#" + currentID).next();
    if (next.length == 1) {
        floorNumClick(next[0]);
    }
    else {
        alert("已经是最下一层！");
    }
}
//返回主地图
function returnMainMap() {
    csm.mapContainer.options.maxZoom = 20;
    csm.mapContainer.options.minZoom = 17;
    csm.mapContainer.setView(csm.center, 17);
    if (csm.floorMap) {
        csm.mapContainer.removeLayer(csm.floorMap);//移除楼内图
        csm.floorMap = null;
    }
    $("#floorTool").hide();//隐藏楼内图的工具栏
    floorDeviceLayerGroup.clearLayers();//清除楼内图的设备
    $("#mapContainer").attr("currentMapType", 1);//获取页面地图容器的div：mapContainer的自定义类型currentMapType的值,1为2D，2为2.5D，3为楼内图
    csm.mapContainer.addLayer(csm.baseMap);//加载主图
    csm.mapContainer.addLayer(areaLayerGroup);//加载主图的区域
    csm.mapContainer.addLayer(deviceLayerGroup);//加载主图的设备
    resetDeviceToolIcon();//重置设备工具栏图标，都设置为激活图标
    $("#rightFloat").show();//显示区域工具栏
    $(".mapType-wrapper").show();//显示2/3维切换按钮


}
//根据楼内图的id添加楼层对应的设备
function addFloorDevice(floorid) {
    floorDeviceLayerGroup.clearLayers();
    for (var i = 0; i < AllDeviceInfo.length; i++) {
        var deviceObj = AllDeviceInfo[i];
        //只有下面三个属性提取了，才能创建marker
        var latitude = deviceObj.latitude;
        var longitude = deviceObj.longitude;
        var device_type = deviceObj.device_type;
        var normal_image = deviceObj.normal_image;
        var error_image = deviceObj.error_image;
        var device_status = deviceObj.device_status;
        var enable = deviceObj.enabled;
        var is_inbuilding = deviceObj.is_inbuilding;
        if (normal_image && is_inbuilding == floorid && enable == 1) {
            var stateImg;
            if (device_status == 1) {
                stateImg = normal_image;
            }
            else {
                stateImg = error_image;
            }
            var deviceMarker = L.marker([latitude, longitude], { icon: L.icon({ iconUrl: stateImg, iconSize: [15.15, 23] }) });
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

            deviceMarker.normal_image = deviceObj.normal_image;
            deviceMarker.error_image = deviceObj.error_image;
            deviceMarker.flash_image = deviceObj.flash_image;
            deviceMarker.popup_image = deviceObj.popup_image;
            deviceMarker.defined_device_typeid = deviceObj.defined_device_typeid;
            deviceMarker.pid = deviceObj.pid;

            deviceMarker.bindTooltip(deviceObj.device_name, { offset: L.point(0, 8), direction: 'bottom' });//必须设置offset，设置为下面显示，不然在IE10浏览器下单击marker弹出框会冲突
            //deviceMarker.on('click', deviceMarkerClick);
            if (device_type == 1 || device_type == 2 || device_type == 3 || device_type == 4) {
                deviceMarker.on('click', deviceMarkerClick);
            }
            else if (device_type > 4) {
                deviceMarker = markerBindPopup(deviceMarker);
            }
            //var mymarker = markerBindPopup(deviceMarker);
            var featureGroup = getFloorDeviceFeatureGroup(device_type, deviceMarker.defined_device_typeid, deviceMarker.pid, deviceMarker.is_inbuilding);
            //将marker添加到图层里面去
            featureGroup.addLayer(deviceMarker);
        }
    }

}
//通过设备楼型、自定义设备类型id、pid、楼内图的id返回featureLayer
function getFloorDeviceFeatureGroup(deviceType, defined_device_typeid, pid, is_inbuilding) {
    var featureGroup = null;
    floorDeviceLayerGroup.eachLayer(function (layer) {
        if (layer.deviceType == deviceType) {
            featureGroup = layer;
        }
    });
    if (!featureGroup) {
        featureGroup = L.featureGroup();
        featureGroup.deviceType = deviceType;
        featureGroup.userDefined = defined_device_typeid;//自定义类型ID
        featureGroup.parentID = pid;
        featureGroup.is_inbuilding = is_inbuilding;
        featureGroup.show = true;
        floorDeviceLayerGroup.addLayer(featureGroup);
    }
    return featureGroup;
}