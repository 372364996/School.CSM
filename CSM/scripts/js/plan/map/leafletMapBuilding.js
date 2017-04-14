csm.floorMap = null;//楼内图对象
var floorDeviceLayerGroup = L.layerGroup();//所有的楼内图设备的图层


$(document).ready(function () {
    // floorDeviceLayerGroup.addTo(csm.mapContainer);
});


function mapBuildingInfo() {
    var deviceId = $("#addAlarmEquipment").val();
    if (deviceId == null) {
        //alert("设备不存在无法获取对应的设备信息");
    }
    else {
        $.ajax({
            url: "/Plan/GetMapBuildingInfo",
            type: "post",
            data: "deviceId=" + deviceId,
            datatype: 'json',
            async: false,
            success: function (data) {
                if (data != "") {
                    if (data.hasOwnProperty('state')) {
                        alert("获取楼内图信息出现" + data.message + "错误请联系管理员！");
                    }
                    else {
                        var point1 = data.point1;
                        var point2 = data.point2;
                        var southwest = Mercator2latlng(point1.split(',')[0], point1.split(',')[1]);
                        var northeast = Mercator2latlng(point2.split(',')[0], point2.split(',')[1]);
                        LoadFloorMap(data.floor_src_2d, southwest, northeast);

                    }
                }
                else {
                    returnMainMap()
                }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("获取楼内图信息出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    }
}

//根据图片路径、西南角坐标、东北角坐标创建楼内图对象
function LoadFloorMap(imagesrc, southwest, northeast) {
    if (csm.floorMap) {
        csm.mapContainer.removeLayer(csm.floorMap);//移除底图
    }
    csm.mapContainer.removeLayer(csm.baseMap);//移除底图
    csm.mapContainer.options.maxZoom = 22;
    csm.mapContainer.options.minZoom = 18;
    var imagesrc = imagesrc;
    var mapbounds = L.latLngBounds(southwest, northeast);
    csm.floorMap = L.imageOverlay(imagesrc, mapbounds);
    csm.floorMap.addTo(csm.mapContainer);
    //LeafletMap.imgOverlay.bringToBack();
    csm.mapContainer.setView(mapbounds.getCenter(), 20);


}



//返回主地图
function returnMainMap() {
    if (csm.floorMap != null) {
        csm.mapContainer.options.maxZoom = 20;
        csm.mapContainer.options.minZoom = 17;
        csm.mapContainer.removeLayer(csm.floorMap);//移除楼内图
        $("#mapContainer").attr("currentMapType", 1);//获取页面地图容器的div：mapContainer的自定义类型currentMapType的值,1为2D，2为2.5D，3为楼内图
        csm.mapContainer.addLayer(csm.baseMap);//加载主图
        csm.mapContainer.setZoom(17);
        csm.mapContainer.addLayer(planDeviceGroup);//加载主图的设备
        $(".two-dimension").show();//显示2/3维切换按钮
    }
}


//隐藏设备名称
function hideText() {
    var title = $("#fontDisplayed").attr("title");
    if (title == "字体隐藏")
    {
        $("#fontDisplayed").attr("title", "字体显示");
        $("#fontDisplayed").removeClass("font-display").addClass("font-none");
        if (planDeviceGroup.getLayers().length > 0) {
            planDeviceGroup.eachLayer(function (layer) {
                if (layer.isTooltipOpen() == true) {
                    layer.closeTooltip();
                }

            });
        }
    }
    else
    {
        $("#fontDisplayed").attr("title", "字体隐藏");
        $("#fontDisplayed").removeClass("font-none").addClass("font-display");
        if (planDeviceGroup.getLayers().length > 0) {
            planDeviceGroup.eachLayer(function (layer) {
                if (layer.isTooltipOpen() == false) {
                    var tooltip = layer.getTooltip()
                    layer.openTooltip();
                }
            });
        }
    }
    
}


