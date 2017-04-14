var AREA_REGISTER_MAP = -1;//-1为2D上注册，0为2.5D上注册，1为楼内图的房间注册
var POLYGON_TYPE = -1;//0为矩形、1为多边形、2为圆
var SHAPFEATUREGROUP = L.featureGroup();//SHAPFEATUREGROUP.clearLayers();
var AREA_ID_25D = -1;//注册2.5D区域的时候，那条数据的id
var SHAPE_25D = null;
var areaCenterFlag = null;//点击区域，区域中心显示旗帜
$(function () {
    SHAPFEATUREGROUP.addTo(csm.mapContainer);
    showAllArea();
    csm.mapContainer.contextmenu.disable();
    //csm.mapContainer.on("click", function () {
    //    SHAPFEATUREGROUP.eachLayer(function (layer) {
    //        layer.contextmenu.hide();
    //    });
    //})
    //
});
var AREADRAWING = {
};
AREADRAWING.TYPE = -1;//画的类型
AREADRAWING.STARPOINT = null;//鼠标按下起始点
AREADRAWING.MOVEPOINT = null;//鼠标移动点
AREADRAWING.MOVERECTANGLE = null;//鼠标移动过程中的矩形
AREADRAWING.MOVEPOLYGON = null;//鼠标移动过程中的多边形
AREADRAWING.MOVECIRCLE = null;//鼠标移动过程中的圆
AREADRAWING.LATLNGARRAY = [];//坐标数组
//地图鼠标按下事件
function mapMouseDown(e) {
    AREADRAWING.STARPOINT = e.latlng;
}
//地图鼠标移动事件
function mapMouseMove(e) {
    if (AREADRAWING.TYPE == 0) {//矩形
        if (AREADRAWING.STARPOINT) {
            AREADRAWING.MOVEPOINT = e.latlng;
            if (AREADRAWING.MOVERECTANGLE) {
                SHAPFEATUREGROUP.removeLayer(AREADRAWING.MOVERECTANGLE);
            }
            AREADRAWING.MOVERECTANGLE = L.rectangle([AREADRAWING.STARPOINT, AREADRAWING.MOVEPOINT], { color: "#ff7800", weight: 1, fillOpacity: 0.5 }).addTo(SHAPFEATUREGROUP);
        }
    }
    if (AREADRAWING.TYPE == 2) {//圆
        var r = 0;
        if (AREADRAWING.STARPOINT) {
            AREADRAWING.MOVEPOINT = e.latlng;
            if (AREADRAWING.MOVECIRCLE) {

                SHAPFEATUREGROUP.removeLayer(AREADRAWING.MOVECIRCLE);
            }
            r = AREADRAWING.STARPOINT.distanceTo(AREADRAWING.MOVEPOINT);
            AREADRAWING.MOVECIRCLE = L.circle(AREADRAWING.STARPOINT, r, { color: "#ff7800", weight: 1, fillOpacity: 0.5 }).addTo(SHAPFEATUREGROUP);
        }
    }
}
//地图鼠标弹起事件(画圆/矩形完成)
function mapMouseUp(e) {
    document.getElementById("mapContainer").style.cursor = "default";
    csm.mapContainer.off('mousedown');
    csm.mapContainer.off('mousemove');
    csm.mapContainer.off('mouseup');
    if ($("#mapContainer").attr("currentMapType") == 2) {//2.5维
        if (AREADRAWING.TYPE == 0) {
            if (AREADRAWING.MOVERECTANGLE) {
                //var latlngs = AREADRAWING.MOVERECTANGLE.getLatLngs(); getBounds
                var bounds = AREADRAWING.MOVERECTANGLE.getBounds();
                var southWestPoint = csm.mapContainer.project(bounds.getSouthWest(), csm.mapContainer.getMaxZoom());
                var northEastPoint = csm.mapContainer.project(bounds.getNorthEast(), csm.mapContainer.getMaxZoom());

                var latlngStr = southWestPoint.x + ',' + southWestPoint.y + '|' + northEastPoint.x + ',' + northEastPoint.y;
                $("#area_25D_location").val(latlngStr);
            }
            csm.mapContainer.dragging.enable();

        }
        if (AREADRAWING.TYPE == 2) {
            if (AREADRAWING.MOVECIRCLE) {
                var latlng = AREADRAWING.MOVECIRCLE.getLatLng();
                var radius = AREADRAWING.MOVECIRCLE.getRadius();
                var p = csm.mapContainer.project(latlng, csm.mapContainer.getMaxZoom());
                var latlngStr = radius + '/' + p.x + ',' + p.y;
                $("#area_25D_location").val(latlngStr);
            }
            csm.mapContainer.dragging.enable();
        }
        if (confirm('是否确认？')) {
            var isSuccess = RegisterArea25D(AREA_ID_25D, $("#area_25D_location").val());
            if (isSuccess == true) {
                alert("添加成功！");
                var area_25D_location = getLocation25D($("#area_25D_location").val());
                if (AREADRAWING.TYPE == 0 && area_25D_location) {
                    SHAPE_25D.setBounds(area_25D_location);
                    SHAPE_25D.area_25D_location = area_25D_location;
                    SHAPE_25D.redraw();
                }
                else if (AREADRAWING.TYPE == 2 && area_25D_location) {
                    SHAPE_25D.setLatLng(area_25D_location[0]);
                    SHAPE_25D.setRadius(area_25D_location[1]);
                    SHAPE_25D.area_25D_location = area_25D_location;
                    SHAPE_25D.area_25D_locationStr = latlngStr;
                    SHAPE_25D.redraw();

                }
                clearDrawState();
                //csm.mapContainer.removeLayer(SHAPFEATUREGROUP);
                //SHAPFEATUREGROUP.addTo(csm.mapContainer);

            }

        }
        else {
            clearDrawState();
        }

    }
    else if ($("#mapContainer").attr("currentMapType") == 1) {//2维
        if (AREADRAWING.TYPE == 0) {
            if (AREADRAWING.MOVERECTANGLE) {
                //var latlngs = AREADRAWING.MOVERECTANGLE.getLatLngs(); getBounds
                var bounds = AREADRAWING.MOVERECTANGLE.getBounds();
                var latlngStr = bounds.getSouthWest().lat + ',' + bounds.getSouthWest().lng + '|' + bounds.getNorthEast().lat + ',' + bounds.getNorthEast().lng;
                $("#area_location").val(latlngStr);
            }
            csm.mapContainer.dragging.enable();

        }
        if (AREADRAWING.TYPE == 2) {
            if (AREADRAWING.MOVECIRCLE) {
                var latlng = AREADRAWING.MOVECIRCLE.getLatLng();
                var radius = AREADRAWING.MOVECIRCLE.getRadius();
                var latlngStr = radius + '/' + latlng.lat + ',' + latlng.lng;
                $("#area_location").val(latlngStr);
            }
            csm.mapContainer.dragging.enable();
        }
        showRegisterPopup();
    }
    csm.mapContainer.dragging.enable();

}
//地图鼠标单击事件
function mapMouseClick(e) {
    AREADRAWING.LATLNGARRAY.push(e.latlng);
    if (AREADRAWING.MOVEPOLYGON) {
        AREADRAWING.MOVEPOLYGON.setLatLngs(AREADRAWING.LATLNGARRAY);
    }
    else {
        AREADRAWING.MOVEPOLYGON = L.polygon(AREADRAWING.LATLNGARRAY, { color: "#9400D3", weight: 1, fillOpacity: 0.5 }).addTo(SHAPFEATUREGROUP);
    }
}
//地图鼠标双击事件(画多边形完成)
function mapMouseDoubleClick() {
    csm.mapContainer.off('mousedown');
    csm.mapContainer.off('mousemove');
    csm.mapContainer.off('mouseup');
    csm.mapContainer.off('dblclick');
    csm.mapContainer.off('click');
    document.getElementById("mapContainer").style.cursor = "default";
    //禁用地图的双击放大的功能
    csm.mapContainer.doubleClickZoom.disable();
    if ($("#mapContainer").attr("currentMapType") == 1) {//2维
        if (AREADRAWING.MOVEPOLYGON) {
            var latlngs = AREADRAWING.MOVEPOLYGON.getLatLngs()[0];//1.0版本
            //var latlngs = AREADRAWING.MOVEPOLYGON.getLatLngs();//0.7版本
            var latlngStr = "";
            for (var i = 0; i < latlngs.length; i++) {
                var latlng = latlngs[i];
                var lat = latlng.lat;
                var lng = latlng.lng;
                if (i == latlngs.length - 1) {
                    latlngStr += lat + ',' + lng;
                }
                else {
                    latlngStr += lat + ',' + lng + "|"
                }

            }
        }
        $("#area_location").val(latlngStr);
        showRegisterPopup();
    }
    if ($("#mapContainer").attr("currentMapType") == 2) {//2.5维
        if (AREADRAWING.MOVEPOLYGON) {
            //var latlngs = AREADRAWING.MOVEPOLYGON.getLatLngs()[0];//1.0版本
            var latlngs = AREADRAWING.MOVEPOLYGON.getLatLngs();
            var latlngStr = "";
            for (var i = 0; i < latlngs.length; i++) {
                var latlng = latlngs[i];
                //var lat = latlng.lat;
                //var lng = latlng.lng;
                var p = csm.mapContainer.project(latlng, csm.mapContainer.getMaxZoom());
                if (i == latlngs.length - 1) {
                    latlngStr += p.x + ',' + p.y;
                }
                else {
                    latlngStr += p.x + ',' + p.y + "|"
                }

            }
        }
        $("#area_25D_location").val(latlngStr);
        if (confirm('是否确认？')) {
            var isSuccess = RegisterArea25D(AREA_ID_25D, $("#area_25D_location").val());
            if (isSuccess == true) {
                alert("添加成功！");
                var area_25D_location = getLocation25D($("#area_25D_location").val());
                if (area_25D_location) {
                    SHAPE_25D.setLatLngs(latlngs);
                    SHAPE_25D.area_25D_location = area_25D_location;
                    SHAPE_25D.area_25D_locationStr = latlngStr;
                    SHAPE_25D.redraw();
                    clearDrawState();
                    //csm.mapContainer.removeLayer(SHAPFEATUREGROUP);
                    //SHAPFEATUREGROUP.addTo(csm.mapContainer);
                }
            }
        }
        else {
            clearDrawState();
        }
    }
    csm.mapContainer.dragging.enable();
}
//画多边形
drawPolygon = function () {

    clearDrawState();
    csm.mapContainer.dragging.disable();
    document.getElementById("mapContainer").style.cursor = "crosshair";
    AREADRAWING.TYPE = 1;
    AREADRAWING.STARPOINT = null;
    AREADRAWING.STARPOINT = null;
    AREADRAWING.MOVEPOLYGON = null;
    csm.mapContainer.on('click', mapMouseClick);
    csm.mapContainer.on('dblclick', mapMouseDoubleClick);
}
//画矩形
drawRectangle = function () {
    clearDrawState();
    csm.mapContainer.dragging.disable();
    document.getElementById("mapContainer").style.cursor = "crosshair";

    AREADRAWING.TYPE = 0;
    AREADRAWING.STARPOINT = null;
    AREADRAWING.STARPOINT = null;
    AREADRAWING.MOVERECTANGLE = null;
    csm.mapContainer.on('mousedown', mapMouseDown);
    csm.mapContainer.on('mousemove', mapMouseMove);
    csm.mapContainer.on('mouseup', mapMouseUp);

}
//画圆
drawCircle = function () {
    document.getElementById("mapContainer").style.cursor = "crosshair";
    //    BuildingIndex.outDrawState();
    csm.mapContainer.dragging.disable();
    AREADRAWING.TYPE = 2;
    AREADRAWING.STARPOINT = null;
    AREADRAWING.MOVERECTANGLE = null;
    csm.mapContainer.on('mousedown', mapMouseDown);
    csm.mapContainer.on('mousemove', mapMouseMove);
    csm.mapContainer.on('mouseup', mapMouseUp);
}
//清除画的状态
clearDrawState = function () {
    document.getElementById("mapContainer").style.cursor = "default";
    csm.mapContainer.dragging.enable();
    if (AREADRAWING.MOVERECTANGLE) {
        SHAPFEATUREGROUP.removeLayer(AREADRAWING.MOVERECTANGLE);
    }
    if (AREADRAWING.MOVECIRCLE) {
        SHAPFEATUREGROUP.removeLayer(AREADRAWING.MOVECIRCLE);
    }
    if (AREADRAWING.MOVEPOLYGON) {
        SHAPFEATUREGROUP.removeLayer(AREADRAWING.MOVEPOLYGON);
    }
    AREADRAWING.TYPE = -1;
    AREADRAWING.STARPOINT = null;
    AREADRAWING.STARPOINT = null;
    AREADRAWING.MOVERECTANGLE = null;
    AREADRAWING.MOVECIRCLE = null;
    AREADRAWING.MOVEPOLYGON = null;
    AREADRAWING.LATLNGARRAY = [];

    var AREA_ID_25D = -1;//注册2.5D区域的时候，那条数据的id
    var SHAPE_25D = null;
}
//显示全部的区域
showAllArea = function () {
    for (var i = 0; i < AreaInfo.length; i++) {
        var shape = null;
        var areaObj = AreaInfo[i];
        var area_location = areaObj.area_location;
        var area_25D_location = areaObj.area_25D_location;
        var level_color = areaObj.level_color;
        var latlngs = [];
        if (area_location.split('|').length > 2) {//多边形
            var latlngArray = area_location.split('|');
            for (var j = 0; j < latlngArray.length; j++) {
                var latlngStr = latlngArray[j].split(',');
                //var latlng = [latlngStr[0], latlngStr[1]];
                var latlng = L.latLng(latlngStr[0], latlngStr[1]);
                latlngs.push(latlng);
            }
            shape = L.polygon(latlngs, {
                color: level_color, weight: 1, fillOpacity: 0.5,
                contextmenu: true,
                contextmenuInheritItems: false,
                contextmenuItems: [{
                    text: '修改信息',
                    callback: UpdateArea
                },
                //{
                //    text: '修改形状',
                //    callback: UpdateShape
                //},
                {
                    text: '删除',
                    callback: DeleteArea
                }]
            });
            shape.shapeType = "p";
            shape.area_locationStr = area_location;
            shape.area_location = latlngs;
            shape.area_25D_locationStr = area_25D_location;
            shape.area_25D_location = getLocation25D(area_25D_location);
        }
        if (area_location.split('|').length == 2) {//矩形
            var array = area_location.split('|');
            var southWestStr = area_location.split("|")[0];
            var northEastStr = area_location.split("|")[1];
            var southWest = [southWestStr.split(',')[0], southWestStr.split(',')[1]];
            var northEast = [northEastStr.split(',')[0], northEastStr.split(',')[1]];
            shape = L.rectangle([southWest, northEast], {
                color: level_color, weight: 1, fillOpacity: 0.5,
                contextmenu: true,
                contextmenuInheritItems: false,
                contextmenuItems: [{
                    text: '修改',
                    callback: UpdateArea
                }, {
                    text: '删除',
                    callback: DeleteArea
                }]
            });
            shape.shapeType = "r";
            shape.area_locationStr = area_location;
            shape.area_location = [southWest, northEast];
            shape.area_25D_locationStr = area_25D_location;
            shape.area_25D_location = getLocation25D(area_25D_location);
        }
        if (area_location.indexOf('/') != -1) {//圆
            var radius = area_location.split('/')[0];
            var circleCenter = area_location.split('/')[1];
            circleCenter = [circleCenter.split(',')[0], circleCenter.split(',')[1]];
            shape = L.circle(circleCenter, {
                radius: radius, color: level_color, weight: 1, fillOpacity: 0.5,
                contextmenu: true,
                contextmenuInheritItems: false,
                contextmenuItems: [{
                    text: '修改',
                    callback: UpdateArea
                }, {
                    text: '删除',
                    callback: DeleteArea
                }]
            });
            shape.shapeType = "c";
            shape.area_locationStr = area_location;
            shape.area_location = [circleCenter, radius];
            shape.area_25D_locationStr = area_25D_location;
            shape.area_25D_location = getLocation25D(area_25D_location);
        }

        if (shape) {
            if (areaObj.area_type == -1) {//楼
                //var featureGroup = getAreafeatuGroup(areaObj.area_type);//楼的分类
                //var building_featureGruop = getAreafeatuGroup(areaObj.area_type_id);//楼所属的功能区的分类

                shape.id = areaObj.id;
                shape.area_name = areaObj.area_name//区域名称
                //shape.area_location = areaObj.area_location;
                //shape.area_25D_location = areaObj.area_25D_location//25D坐标
                shape.area_level = areaObj.area_level  //区域级别ID
                shape.area_type = areaObj.area_type//区域类别ID
                shape.person_id = areaObj.person_id//人员编号
                shape.map_type = areaObj.map_type//地图类型
                shape.is_show = areaObj.is_show//是否显示
                shape.content = areaObj.content//备注
                shape.grid_id = areaObj.grid_id//网格ID
                shape.region_id = areaObj.region_id//园区编号
                shape.area_image = areaObj.area_image//区域的图片索引ID

                shape.building_id = areaObj.building_id //楼宇ID
                shape.area_type_id = areaObj.area_type_id//楼宇所属功能
                shape.building_name = areaObj.building_name//建筑名称
                shape.alias = areaObj.alias//别名
                shape.manager_id = areaObj.manager_id //负责人ID
                shape.create_time = areaObj.create_time//建筑年代
                shape.building_type = areaObj.building_type//结构类型
                shape.above_ground_area = areaObj.above_ground_area  //地上面积
                shape.under_ground_area = areaObj.under_ground_area//地下面积
                shape.floor_num = areaObj.floor_num //楼层数

                shape.level_name = areaObj.level_name //级别名称
                shape.level_color = areaObj.level_color;//级别的颜色
                shape.level_status = areaObj.level_status //级别状态

                //shape.bindTooltip(shape.area_name);
                //featureGroup.addLayer(shape);
                //building_featureGruop.addLayer(shape);

            }
            if (areaObj.area_type == 0) {//逻辑区域
                //var featureGroup = getAreafeatuGroup(areaObj.area_type);

                shape.id = areaObj.id;
                shape.area_name = areaObj.area_name//区域名称
                //shape.area_location = areaObj.area_location;
                //shape.area_25D_location = areaObj.area_25D_location//25D坐标
                shape.area_level = areaObj.area_level  //区域级别ID
                shape.area_type = areaObj.area_type//区域类别ID
                shape.person_id = areaObj.person_id//人员编号
                shape.map_type = areaObj.map_type//地图类型
                shape.is_show = areaObj.is_show//是否显示
                shape.content = areaObj.content//备注
                shape.grid_id = areaObj.grid_id//网格ID
                shape.region_id = areaObj.region_id//园区编号
                shape.area_image = areaObj.area_image//区域的图片索引ID

                shape.level_name = areaObj.level_name //级别名称
                shape.level_color = areaObj.level_color;//级别的颜色
                shape.level_status = areaObj.level_status //级别状态

                //shape.bindTooltip(shape.area_name);
                featureGroup.addLayer(shape);
            }
            else if (areaObj.area_type > 0) {//功能区
                //var featureGroup = getAreafeatuGroup(areaObj.area_type);

                shape.id = areaObj.id;
                shape.area_name = areaObj.area_name//区域名称
                //shape.area_location = areaObj.area_location;
                //shape.area_25D_location = areaObj.area_25D_location//25D坐标
                shape.area_level = areaObj.area_level  //区域级别ID
                shape.area_type = areaObj.area_type//区域类别ID
                shape.person_id = areaObj.person_id//人员编号
                shape.map_type = areaObj.map_type//地图类型
                shape.is_show = areaObj.is_show//是否显示
                shape.content = areaObj.content//备注
                shape.grid_id = areaObj.grid_id//网格ID
                shape.region_id = areaObj.region_id//园区编号
                shape.area_image = areaObj.area_image//区域的图片索引ID
                shape.level_name = areaObj.level_name //级别名称
                shape.level_color = areaObj.level_color;//级别的颜色
                shape.level_status = areaObj.level_status //级别状态

                //shape.bindTooltip(shape.area_name);

            }
            SHAPFEATUREGROUP.addLayer(shape);
            //areaLayerTempGroup.addLayer(shape);
        }
    }
    changeShape();
}
//修改区域
function UpdateArea(e) {
    //if ($("#mapContainer").attr("currentMapType") == 2) {
    //    alert("请在2维对应的区域进行删除！");
    //    return;
    //}
    var shape = e.relatedTarget;
    var relatedTarget = this;
    var oldOptions = {
    };
    oldOptions.id = shape.id;
    oldOptions.area_name = shape.area_name//区域名称
    oldOptions.area_locationStr = shape.area_locationStr;//坐标的字符串
    oldOptions.area_location = shape.area_location;//2d坐标
    oldOptions.area_25D_locationStr = shape.area_25D_locationStr;//25d坐标的字符串
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
//修改形状
function UpdateShape(e) {
    var shape = e.relatedTarget;
    switch (shape.shapeType) {
        case "p"://多边形
            //$("#drawpolygon").removeAttr("disabled");
            //$("#drawcircle").attr("disabled", true);
            //$("#drawrectangle ").attr("disabled", true);
            $("#drawpolygon").show();
            $("#drawcircle").hide();
            $("#drawrectangle ").hide();
            break;
        case "r"://矩形
            $("#drawpolygon").hide();
            $("#drawcircle").hide();
            $("#drawrectangle").show();
            break;
        case "p"://圆
            $("#drawpolygon").hide();
            $("#drawcircle").show();
            $("#drawrectangle").hide();
            break;
        default:
            break;

    }

    if ($("#mapContainer").attr("currentMapType") == 2) {//2.5维

    }
    else if ($("#mapContainer").attr("currentMapType") == 1) {//2维

    }
}
//删除区域
function DeleteArea(e) {
    //if ($("#mapContainer").attr("currentMapType") == 2) {
    //    alert("请在2维对应的区域进行删除！");
    //    return;
    //}
    if ($("#mapContainer").attr("currentMapType") == 2) {//2.5维
        alert("请注意！删除时，2D所对应的该区域也会删除！");
    }
    var shape = e.relatedTarget;
    deleteArea(shape.id);

}
//清楚地图上区域的对象
function clearAreaObj() {
    SHAPFEATUREGROUP.clearLayers();
}










//2/2.5维切换时，切换树
function RegiterSwitchMap(type) {
    if (type == 2) {
        $("#mapContainer").attr("currentMapType", 2);
    }
    if (type == 25) {
        $("#mapContainer").attr("currentMapType", 1);
    }
    clearDrawState();
    switchMap();
    changeShape();
}
//2/25切换改变形状
function changeShape() {
    if ($("#mapContainer").attr("currentMapType") == 2) {//2.5维
        //$("#drawpolygon").attr("disabled", true);
        //$("#drawcircle").attr("disabled", true);
        //$("#drawrectangle").attr("disabled", true);
        $("#drawpolygon").hide();
        $("#drawcircle").hide();
        $("#drawrectangle").hide();
        SHAPFEATUREGROUP.eachLayer(function (shape) {
            if (shape.area_25D_location) {
                switch (shape.shapeType) {
                    case "p"://多边形
                        shape.setLatLngs(shape.area_25D_location);
                        break;
                    case "r"://矩形
                        shape.setBounds(shape.area_25D_location);
                        break;
                    case "c"://圆
                        shape.setLatLng(shape.area_25D_location[0]);
                        shape.setRadius(shape.area_25D_location[1] / 200);
                        break;

                    default:

                }
            }
        });

    }
    else if ($("#mapContainer").attr("currentMapType") == 1) {//2维
        $("#drawpolygon").show();
        $("#drawcircle").show();
        $("#drawrectangle").show();
        SHAPFEATUREGROUP.eachLayer(function (shape) {
            if (shape.area_location) {
                switch (shape.shapeType) {
                    case "p"://多边形
                        shape.setLatLngs(shape.area_location);
                        break;
                    case "r"://矩形
                        shape.setBounds(shape.area_location);
                        break;
                    case "c"://圆


                        shape.setLatLng(shape.area_location[0]);
                        shape.setRadius(shape.area_location[1]);
                        break;

                    default:

                }
            }
        });
    }
}
//树的双击事件{ icon: L.icon({ iconUrl: "../style/base/images/public/flag2.png", iconSize: [20, 20], iconAnchor: [5, 15] }) }
function getTreeDbclick(id) {
    if ($("#mapContainer").attr("currentMapType") == 2) {//2.5维
        SHAPFEATUREGROUP.eachLayer(function (shape) {
            if (shape.id == id) {
                if (!shape.area_25D_location) {
                    if (areaCenterFlag) {
                        csm.mapContainer.removeLayer(areaCenterFlag);
                        areaCenterFlag = null;
                    }
                    AREA_ID_25D = shape.id;
                    SHAPE_25D = shape;
                    switch (shape.shapeType) {
                        case "p"://多边形
                            //$("#drawpolygon").removeAttr("disabled");
                            //$("#drawcircle").attr("disabled", true);
                            //$("#drawrectangle ").attr("disabled", true);
                            $("#drawpolygon").show();
                            $("#drawcircle").hide();
                            $("#drawrectangle ").hide();
                            break;
                        case "r"://矩形
                            $("#drawpolygon").hide();
                            $("#drawcircle").hide();
                            $("#drawrectangle").show();
                            break;
                        case "p"://圆
                            $("#drawpolygon").hide();
                            $("#drawcircle").show();
                            $("#drawrectangle").hide();
                            break;

                        default:

                    }
                }
                else {
                    $("#drawpolygon").hide();
                    $("#drawcircle").hide();
                    $("#drawrectangle").hide();
                    AREA_ID_25D = -1;//注册2.5D区域的时候，那条数据的id
                    SHAPE_25D = null;
                    var bound = shape.getBounds();
                    var shapeCenter = bound.getCenter();
                    if (!areaCenterFlag) {
                        areaCenterFlag = L.marker(shapeCenter).addTo(csm.mapContainer);
                    }
                    else {
                        areaCenterFlag.setLatLng(shapeCenter);
                    }

                }
            }

        });
    }
    else if ($("#mapContainer").attr("currentMapType") == 1) {//2维
        SHAPFEATUREGROUP.eachLayer(function (shape) {
            if (shape.id == id) {
                var bound = shape.getBounds();
                var shapeCenter = bound.getCenter();
                if (!areaCenterFlag) {
                    areaCenterFlag = L.marker(shapeCenter).addTo(csm.mapContainer);
                }
                else {
                    areaCenterFlag.setLatLng(shapeCenter);
                }


            }
        });

    }
}
//解析坐标字符串
function getLocation25D(area_25D_locationStr) {
    var area_25D_location = null;
    if (area_25D_locationStr) {
        if (area_25D_locationStr.split('|').length == 2) {//矩形
            var array = area_25D_locationStr.split('|');
            var southWestStr = area_25D_locationStr.split("|")[0];
            var northEastStr = area_25D_locationStr.split("|")[1];

            var southWest = [southWestStr.split(',')[0], southWestStr.split(',')[1]];
            var northEast = [northEastStr.split(',')[0], northEastStr.split(',')[1]];
            southWest = csm.mapContainer.unproject(southWest, csm.mapContainer.getMaxZoom());
            northEast = csm.mapContainer.unproject(northEast, csm.mapContainer.getMaxZoom());
            area_25D_location = [southWest, northEast];
            area_25D_locationStr = area_25D_locationStr;
            //SHAPE_25D.setBounds([southWest, northEast]);

        }
        if (area_25D_locationStr.split('|').length > 2) {//多边形
            var latlngs = [];
            var latlngArray = area_25D_locationStr.split('|');
            for (var j = 0; j < latlngArray.length; j++) {
                var latlngStr = latlngArray[j].split(',');
                //var latlng = [latlngStr[0], latlngStr[1]];
                var p = [latlngStr[0], latlngStr[1]];
                latlng = csm.mapContainer.unproject(p, csm.mapContainer.getMaxZoom());
                latlngs.push(latlng);
            }
            area_25D_location = latlngs;
            area_25D_locationStr = area_25D_locationStr;
            //SHAPE_25D.setLatLngs(latlngs);
        }
        if (area_25D_locationStr.indexOf('/') != -1) {//圆
            var radius = area_25D_locationStr.split('/')[0];
            var circleCenter = area_25D_locationStr.split('/')[1];
            circleCenter = [circleCenter.split(',')[0], circleCenter.split(',')[1]];
            circleCenter = csm.mapContainer.unproject(circleCenter, csm.mapContainer.getMaxZoom());
            //SHAPE_25D.setLatLng(circleCenter);
            //SHAPE_25D.setRadius(radius);
            area_25D_location = [circleCenter, radius];
            area_25D_locationStr = area_25D_locationStr;
        }
    }
    return area_25D_location;
}

