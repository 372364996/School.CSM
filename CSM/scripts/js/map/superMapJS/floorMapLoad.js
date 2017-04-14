var CDL_B1 = "http://123.56.96.237:8090/iserver/services/map-ugcv5-CDLB1/rest/maps/CDL_B1";
var CDL_F1 = "http://123.56.96.237:8090/iserver/services/map-ugcv5-CDLF1/rest/maps/CDL_F1";
var CDL_F2 = "http://123.56.96.237:8090/iserver/services/map-ugcv5-CDLF2/rest/maps/CDL_F2";
csm.floorMap = null;//楼内图对象
var floorDeviceLayerArray = [];//所有的楼内图设备的图层
csm.floorCenter = null;
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
    //floorDeviceLayerGroup.addTo(csm.mapContainer);
});
//根据图片路径、西南角坐标、东北角坐标创建楼内图对象
function LoadFloorMap(imagesrc) {
    if (imagesrc) {
        if (csm.floorMap) {
            csm.mapContainer.removeLayer(csm.floorMap);//移除底图
        }
        var a = $("#mapContainer").attr("currentMapType");
        if ($("#mapContainer").attr("currentMapType") == 1) {//当前如果是在2D地图
            csm.baseMap.setVisibility(false);//将2D地图设置为透明
            $("#mapContainer").attr("currentMapType", 3);

        }
        else if ($("#mapContainer").attr("currentMapType") == 2) {//当前如果是在25D地图
            csm.baseMap25D.setVisibility(false);//将25D地图设置为透明
            $("#mapContainer").attr("currentMapType", 3);
        }



        csm.floorMap = new SuperMap.Layer.TiledDynamicRESTLayer("district", imagesrc, { transparent: true, cacheEnabled: true });
        //var bounds = new SuperMap.Bounds(southwestLonLat.lon, southwestLonLat.lat, northeastLonLat.lon, northeastLonLat.lat);
        //floorCenter = bounds.getCenterLonLat();
        //监听图层信息加载完成事件
        csm.floorMap.events.on({ "layerInitialized": addInitialized });
    }
}
//楼内图加载异步监听事件
function addInitialized() {
    //将楼内图设置为基础图层
    csm.floorMap.isBaseLayer = true;
    //将楼内图图层放到地图容器上
    csm.mapContainer.addLayer(csm.floorMap);
    //将楼内图的图层设置为底图
    csm.mapContainer.setBaseLayer(csm.floorMap);
    //设置楼内图地图的中心
    csm.mapContainer.setCenter(csm.floorCenter, 2);
}
//楼内图按钮的单击事件
function floorInClick(id) {
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
        $("#rightFloat").hide();//隐藏区域工具栏
        $(".mapType-wrapper").hide();//隐藏2/3维切换
        $(".floorTool-num").html(html);//设置楼内图工具栏div
        $("#floorTool").show();//显示楼内图的工具栏
        resetDeviceToolIcon();//重置设备工具栏图标，都设置为激活图标
        var first = $(".floorTool-num").children(":first");
        for (var i = 0; i < markerLayerArray.length; i++) {
            csm.mapContainer.removeLayer(markerLayerArray[i]);
        }//移除楼外的设备
        for (var i = 0; i < polygonLayerArray.length; i++) {
            csm.mapContainer.removeLayer(polygonLayerArray[i]);
        }//移除楼外的区域
        closeInfoWin();//关闭地图上的一些非视频弹窗和区域的弹框
        floorNumClick(first[0]);//将楼内图工具条第一个的楼内显示出来
    }
    else {
        alert("当前楼宇暂未注册楼内图，请您先注册！");
    }

}
//点击楼层号显示楼层
function floorNumClick(obj) {
    //http:///123.56.96.237:8090/iserver/services/map-workBeiYou/rest/maps/areaBeiYou@areaBeiYou
    //var index = csm.serverUrl.indexOf("maps");
    //var floorMapUrl = csm.serverUrl.substring(0, index) + "maps/" + floor_src_2d;
    var id = obj.id;//楼内图的id
    var floorName = obj.innerText;//楼层的名字
    // http:///123.56.96.237:8090/iserver/services/map-ugcv5-ChongDeLouF3/rest/maps/崇德楼F3
    var floor_src_2d = obj.attributes["floor_src_2d"].nodeValue;//如8@F1
    var floor_src_2dNoOa = obj.attributes["floor_src_2d"].nodeValue.replace("@", "");//如8F1
    //var floorNamePinYin = codefans_net_CC2PY(floorName);//楼层名的拼音，万一楼层名叫“负一楼”
    var areaName = obj.attributes["area_name"].nodeValue;//楼层的区域名称
    //var floorMapUrl = "http:///123.56.96.237:8090/iserver/services/map-ugcv5-" + floor_src_2dNoOa + "/rest/maps/" + floor_src_2d;
    var index = csm.serverUrl.indexOf("services");
    var ip = csm.serverUrl.substring(0, index);
    var floorMapUrl = ip + "services/map-ugcv5-" + floor_src_2dNoOa + "/rest/maps/" + floor_src_2d;
    var point1 = obj.attributes["point1"].nodeValue;//左下角的坐标（超图用不到）
    var point2 = obj.attributes["point2"].nodeValue;//右上角的坐标（超图用不到）
    var southwest = new SuperMap.LonLat(point1.split(',')[1], point1.split(',')[0]);
    var northeast = new SuperMap.LonLat(point2.split(',')[1], point2.split(',')[0]);


    //if (floorMapUrl.indexOf("B1") != -1) {
    //    floorMapUrl = CDL_B1;
    //}
    //if (floorMapUrl.indexOf("F1") != -1) {
    //    floorMapUrl = CDL_F1;
    //}
    //if (floorMapUrl.indexOf("F2") != -1) {
    //    floorMapUrl = CDL_F2;
    //}

    $.ajax({
        type: "GET",
        url: floorMapUrl + ".json",
        data: null,
        success: function (data) {
            if (data) {//如果能请求成功，说明这个地图服务已发布并且能访问
                //根据返回的数据得到楼内图的中心点
                csm.floorCenter = new SuperMap.LonLat(data.center.x, data.center.y);
                //加载楼内内图
                LoadFloorMap(floorMapUrl);
                //加载楼内图的设备的加载
                addFloorDevice(obj.getAttribute("id"));//根据当前楼内图的id找到对应的设备
                $(".currentFloor").html(obj.getAttribute("building_name"));//显示当前楼内图所在区域的名称
                $(".currentFloor").html(obj.getAttribute("area_name") + floorName);//楼层所在区域+楼层名
                $(".currentID").html(obj.getAttribute("id"));//隐藏域，当前楼层的id，在上下切换的时候用
            }
            else {//能访问但请求没返回数据
                LoadFloorMap(null);
                alert("请检查" + areaName + "的" + floorName + "层的楼内图地图服务：" + floorMapUrl + "，是否可使用！");
            }
        },
        error: function (data) {//访问失败
            LoadFloorMap(null);
            alert("请检查" + areaName + "的" + floorName + "层的楼内图地图服务：" + floorMapUrl + "，是否可使用！");
        }

    });


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
    if (csm.floorMap) {
        csm.mapContainer.removeLayer(csm.floorMap);//移除楼内图
        csm.floorMap = null;
    }

    $("#floorTool").hide();//隐藏楼内图的工具栏
    for (var i = 0; i < floorDeviceLayerArray.length; i++) {
        csm.mapContainer.removeLayer(floorDeviceLayerArray[i]);
    }
    floorDeviceLayerArray = [];//清除楼内图的设备
    $("#mapContainer").attr("currentMapType", 1);//获取页面地图容器的div：mapContainer的自定义类型currentMapType的值,1为2D，2为2.5D，3为楼内图
    csm.mapContainer.setBaseLayer(csm.baseMap);//设置二维地图为主图
    csm.mapContainer.setCenter(csm.center, 2);//设置中心点的坐标
    csm.baseMap.setVisibility(true);//设置二维地图可见
    csm.mapContainer.addLayers(markerLayerArray);//加载主图的设备
    csm.mapContainer.addLayers(polygonLayerArray);//加载主图的区域
    resetDeviceToolIcon();//重置设备工具栏图标，都设置为激活图标
    $("#rightFloat").show();//显示区域工具栏
    $(".mapType-wrapper").show();//显示2/3维切换按钮
    closeInfoWin();//关闭弹窗
}
//根据楼内图的id添加楼层对应的设备
function addFloorDevice(floorid) {
    for (var i = 0; i < floorDeviceLayerArray.length; i++) {
        csm.mapContainer.removeLayer(floorDeviceLayerArray[i]);
    }
    floorDeviceLayerArray = [];
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
        var position = lonLat2Mercator(Number(longitude), Number(latitude));
        if (normal_image && is_inbuilding == floorid && enable == 1 && position) {


            //设置图标
            var size = new SuperMap.Size(15.15, 23);
            var offset = new SuperMap.Pixel(-(size.w / 2), -(size.h / 2)); //'../../Content/Map/LeaFletMap/Theme/3D_icon/register.png'
            var stateImg = null;
            if (device_status == 1) {
                stateImg = normal_image;
            }
            else {
                stateImg = error_image;
            }
            var icon = new SuperMap.Icon(stateImg, size, offset);


            var deviceMarker = new SuperMap.Marker(new SuperMap.LonLat(position.x, position.y), icon);

            //给marker赋属性
            deviceMarker.id = deviceObj.id;//主键
            deviceMarker.device_code = deviceObj.device_code; //设备编号
            deviceMarker.is_parts = deviceObj.is_parts; //复合设备
            deviceMarker.device_name = deviceObj.device_name; //设备名称
            deviceMarker.device_type = deviceObj.device_type; //设备类型
            deviceMarker.subsystem_id = deviceObj.subsystem_id; //子系统编号
            deviceMarker.longitude = position.x; //经度
            deviceMarker.latitude = position.y; // 纬度
            deviceMarker.register_time = deviceObj.register_time; //注册时间
            deviceMarker.search_code = deviceObj.search_code; //设备搜索缩写
            deviceMarker.local_longitude = 4243 - Number(deviceObj.local_longitude) * 4;//本地X轴（经度）
            deviceMarker.local_latitude = Number(deviceObj.local_latitude) * 4;//本地Y轴（纬度）
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

            if (device_type == 1 || device_type == 2 || device_type == 3 || device_type == 4) {
                deviceMarker.events.on({
                    "click": addVedioPopup,
                    "scope": deviceMarker
                });
            }
            else if (device_type > 4) {
                deviceMarker.events.on({
                    "click": deviceMarkerClick,
                    "scope": deviceMarker
                });
            }
            var markerLayer = getFloorDeviceFeatureGroup(device_type, deviceMarker.defined_device_typeid, deviceMarker.pid, is_inbuilding);
            markerLayer.addMarker(deviceMarker);
        }
    }

}
//通过设备楼型、自定义设备类型id、pid、楼内图的id返回featureLayer
function getFloorDeviceFeatureGroup(deviceType, defined_device_typeid, pid, is_inbuilding) {
    var markerLayer = null;
    for (var i = 0; i < floorDeviceLayerArray.length; i++) {
        var markers = floorDeviceLayerArray[i];
        if (markers.deviceType == deviceType) {
            markerLayer = markers;
        }
    }
    if (!markerLayer) {
        markerLayer = new SuperMap.Layer.Markers("markerLayer" + deviceType);
        markerLayer.deviceType = deviceType;
        markerLayer.userDefined = defined_device_typeid;//自定义类型ID
        markerLayer.parentID = pid;
        markerLayer.is_inbuilding = is_inbuilding;
        markerLayer.show = true;
        csm.mapContainer.addLayer(markerLayer);
        floorDeviceLayerArray.push(markerLayer);
    }
    return markerLayer;
}