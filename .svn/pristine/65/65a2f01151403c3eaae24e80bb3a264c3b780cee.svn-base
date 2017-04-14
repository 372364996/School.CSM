


//楼内图服务地址
var urll = null;// "http://123.56.96.237:8090/iserver/services.json";
var mapsdata = [];//楼内图服务地址
var csm = {};//地图全局变量
csm.baseMapBuilding = null;//楼内图
csm.mapContainer = null;//地图容器
csm.serverUrl = null;//地图服务地址
csm.baseMap = null;//地图的基础图层
csm.southwest = null;//西南角坐标（左下）
csm.northeast = null;//东北角坐标(右上)
csm.center = null;//地图中心
csm.serverBuildingUrl = null;//楼内图url
var markers;//图层
var center_floor;//楼层中心点位
//csm.serverUrl = "http://123.56.96.237:8090/iserver/services/map-ugcv5-areaBeiYouareaBeiYou/rest/maps/areaBeiYou@areaBeiYou";
//http://123.56.96.237:8090/iserver/services/map-workBeiYou/rest/maps/areaBeiYou@areaBeiYou
$(document).ready(function () {
    readMap2DConfig();
    //readMap25DConfig();
    urll = getServerUrl(csm.serverUrl);

    InitMap();//声明地图图层和控件
    LoadMap();
    getAllBuildingUrl();
    $("#floorUrl").multiselect({//初始化下拉菜单
        enableFiltering: true, //是否允许搜索，true允许,false不允许  
        nonSelectedText: "-- 请选择 --",//当没有选择时的默认的文字
        filterPlaceholder: '搜索',
        includeSelectAllOption: true,
        buttonWidth: '197px', //选择框的长度
        maxHeight: 500,

    });

});



//获取地图服务器地址
function getServerUrl(baseurl) {
    var serverurl = "";
    if (baseurl != null && baseurl != undefined && baseurl != "") {
        if (baseurl.indexOf('/') > 0) {
            var baseurlarr = baseurl.split('/');
            serverurl = "http://" + baseurlarr[2] + "/iserver/services.json";
        }
    }

    else {
        alert("地图配置读取失败！");
    }
    return serverurl;
}



function InitMap() {
    
    csm.mapContainer = new SuperMap.Map("mapContainer", {
        controls: [
                new SuperMap.Control.PanZoomBar(), //地图平移缩放控件，提供对地图的平移和缩放的控制操作，默认位于地图左上角 
                //new SuperMap.Control.ScaleLine(), //在地图添加比例尺，控件位置
                //new SuperMap.Control.LayerSwitcher(),//图层选择控件，默认在地图右上
                new SuperMap.Control.Navigation({//地图浏览控件，监听鼠标点击、平移、滚轮等事件来实现对地图的浏览操作。 
                    dragPanOptions: {
                        enableKinetic: true
                    }
                })
        ],
        allOverlays: true
    });
}

function LoadMap() {
    //基础图层
    csm.baseMap = new SuperMap.Layer.TiledDynamicRESTLayer("district2D", csm.serverUrl, { transparent: true, cacheEnabled: true });
    //监听图层信息加载完成事件
    csm.baseMap.events.on({ "layerInitialized": addMapLayer });


}
//在图层初始化完成后才能调用addLayer()接口添加到Map上
function addMapLayer() {
    //加载图层
    csm.mapContainer.addLayers([csm.baseMap]);
    //显示地图范围new SuperMap.LonLat(12952244.61, 4860210.88)
    csm.mapContainer.setCenter(csm.center, 0);
    //放大级别2
    csm.mapContainer.zoomTo(2);

}
//添加楼内图图层
function addMapBuilding() {
    if (csm.baseMapBuilding != null && csm.baseMapBuilding != undefined) {
        csm.mapContainer.removeLayer(csm.baseMapBuilding);
    }
    csm.baseMapBuilding = new SuperMap.Layer.TiledDynamicRESTLayer("districtB", csm.serverBuildingUrl, { transparent: true, cacheEnabled: true });
    //监听图层信息加载完成事件
    csm.baseMapBuilding.events.on({ "layerInitialized": addMapLayerBuilding });

}
//楼内图添加事件
function addMapLayerBuilding() {
    csm.mapContainer.addLayers([csm.baseMapBuilding]);
    csm.mapContainer.setBaseLayer(csm.baseMapBuilding);
    csm.mapContainer.setCenter(center_floor,3);//new SuperMap.LonLat(12983451.14, 4855707.47), 3);
    csm.baseMap.setVisibility(false);
    csm.baseMapBuilding.setVisibility(true);
    //放大级别2
    csm.mapContainer.zoomTo(1);
}

//获取超图发布的所有rest服务
function getAllBuildingUrl() {
    var a ="";
    $.get(urll, function (data) {
    
        for (var i = 0; i < data.length; i++) {
            if(data == null){
                alert("getBuildingUrl()方法请求超图服务失败！请检查超图服务是否正常开启！");
            }
            //瓦片发布形式修改---- 1）
            if (data[i].interfaceType == "com.supermap.services.rest.RestServlet")
            {
                var datanew = data[i];
                mapsdata.push(datanew);
            }
            //var indexnum = csm.serverUrl.indexOf("/maps/");
            //if (indexnum > 0) {
            //var serverstring = csm.serverUrl.substring(0, indexnum);
            //if (data[i].interfaceType == "com.supermap.services.rest.RestServlet" && data[i].url == serverstring) {
            //        var datanew = data[i];
            //        mapsdata.push(datanew);
            //    }
            //}
       }
    });   
}


//注册获取所有楼层超图url服务地址
function getAllFloorUrl(buildinginfo) {
    
    var bl = false;
    var all_url = [];
    var sele_allurl = [];
    //var buildingnameP = codefans_net_CC2PY(buildbuildinginfo.name);//把中文转换成拼音
    if (buildinginfo.building_id == null || buildinginfo.building_id == undefined) {
    
        alert("楼的信息获取有误，请检查getAllFloorUrl()方法是否正常！");
       // return;
    }
    //瓦片发布形式修改---- 2）buildinginfo.building_id
    for (var i = 0; i < mapsdata.length; i++) {
        if (mapsdata[i].additions != null && mapsdata[i].additions != undefined) {
            if (mapsdata[i].name.indexOf("map-ugcv5") > -1)// (mapsdata[i].name.indexOf(buildinginfo.building_id) > 0)
            {
                if (mapsdata[i].additions != null && mapsdata[i].additions != undefined && mapsdata[i].additions.length > 0) {
                    //if (mapsdata[i].additions[0].split("@")[0] == buildinginfo.building_id)//"CDL_B1")
                    //{
                        var url = mapsdata[i].url + "/maps/" + mapsdata[i].additions[0];
                        var objecturl = {
                            "label": url,
                            "value": url
                        };
                        all_url.push(objecturl);
                        bl = true;
                    //}
                }

            }
        }
    }
    //for (var i = 0; i < mapsdata.length; i++) {
    //    if (mapsdata[i].additions[0].split("@")[0] == buildinginfo.building_id)//"CDL_B1")
    //    {
    //        var url = mapsdata[i].url + "/maps/" + mapsdata[i].additions[0];
    //        var objecturl = {
    //            "label": url,
    //            "value": url
    //        };
    //        all_url.push(objecturl);
    //        bl = true;
    //    }

    //}

    if (!bl) {
        alert("没有找到编号为：" + buildinginfo.building_id +",楼名称为：" + buildinginfo.name +  "的楼层地图服务，请发布服务后再来配置！");
    }
    else {

        $("#floorUrl").multiselect('dataprovider', all_url);
        $('#floorUrl').multiselect('refresh');//multiselect刷新重新加载项
       
    }

    return bl;
}




//修改获取楼层超图url服务地址
function getUpdataUrl(buildinginfo) {

    var bl = false;
    var all_url = [];
    var sele_allurl = [];
    var urlthis = null;
    if (buildinginfo.building_id == null || buildinginfo.building_id == undefined) {

        alert("楼的信息获取有误，请检查getAllFloorUrl()方法是否正常！");

    }
    for (var i = 0; i < mapsdata.length; i++) {
        if (mapsdata[i].additions != null && mapsdata[i].additions != undefined) {
            if (mapsdata[i].name.indexOf("map-ugcv5") > -1)// (mapsdata[i].name.indexOf(buildinginfo.building_id) > 0)
            {
                if (mapsdata[i].additions != null && mapsdata[i].additions != undefined && mapsdata[i].additions.length > 0) {
                    //if (mapsdata[i].additions[0].split("@")[0] == buildinginfo.building_id)//"CDL_B1")
                    //{
                        var url = mapsdata[i].url + "/maps/" + mapsdata[i].additions[0];
                        if (mapsdata[i].additions[0] == buildinginfo.floor_src_2d) {
                            urlthis = url;
                        }
                        var objecturl = {
                            "label": url,
                            "value": url
                        };
                        all_url.push(objecturl);
                        bl = true;
                    //}
                }

            }
        }
    }
    if (!bl) {
        alert("编号为：" + buildinginfo.building_id + "的楼没有发布地图服务(如果发布了请刷新页面后再试)，请先发布该楼的地图配置后再进行修改操作！");
    }
    else {

        $("#floorUrl").multiselect('dataprovider', all_url);
       
        $('#floorUrl').multiselect('select', urlthis);//赋值
        $('#floorUrl').multiselect('refresh');//multiselect刷新重新加载项
    }

    return bl;
}
//树双击事件
function treeNodeDblClick(floorinfo) {//floor_src_2d, point1, point2) {
    var bl = false;
    for (var i = 0; i < mapsdata.length; i++) {
        if (mapsdata[i].additions != null && mapsdata[i].additions != undefined && mapsdata[i].additions.length >0) {
            if (mapsdata[i].additions[0] == floorinfo.floor_src_2d)//floorinfo.building_id + "@" +
            {
                csm.serverBuildingUrl = mapsdata[i].url + "/maps/" + mapsdata[i].additions[0];
                bl = true;
            }
        }
    }

    if (!bl) {
        alert("没有找到服务名为：" + floorinfo.floor_src_2d + ",楼编号为：" + floorinfo.building_id + "的楼层地图服务，请检查楼层配置是否正常！");
        return;
    }
    //把左下右上坐标转换为中心点位
    var centerxy = swAndneToCenter(floorinfo.point1, floorinfo.point2);
    //创建楼层中心点位坐标
    center_floor = new SuperMap.LonLat(centerxy.x, centerxy.y);
    //加载楼地图
    addMapBuilding();

}


//左下右上坐标转换为中心点坐标
function swAndneToCenter(southwest, northeast) {
    var center_x =(Number(northeast.split(',')[0]) - Number(southwest.split(',')[0]))/2 +Number(southwest.split(',')[0]);
    var center_y =(Number(northeast.split(',')[1]) - Number(southwest.split(',')[1]))/2 +Number(southwest.split(',')[1]);
    var center = {"x":center_x,"y":center_y};
    return center;
}



//将经纬度坐标转换为墨卡托平面坐标
function gpsTransMercator(lon, lat) {
    var mx, my;
    lon = Number(lon);
    lat = Number(lat);
    mx = lon * 20037508.3427892 / 180;
    my = Math.log(Math.tan((90 + lat) * Math.PI / 360)) / (Math.PI / 180);
    my = my * 20037508.3427892 / 180;
    //mx = Math.abs(mx);
    //my = Math.abs(my);
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
        $(".mainMapSwicth").hide();
        return;
    }
    else {
        $(".mainMapSwicth").show();
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
