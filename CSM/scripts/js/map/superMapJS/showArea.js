var polygonLayerArray = [];
//获取全部的地块数据
function showArea() {
    for (var i = 0; i < AreaInfo.length; i++) {
        var shape = null;
        var areaObj = AreaInfo[i];
        var area_locationStr = areaObj.area_location;//从数据库中取出来2D的坐标的字符串
        var area_25D_locationStr = areaObj.area_25D_location;//从数据库中取出来25D的坐标的字符串
        var level_color = areaObj.level_color;
        var linearRing2D = getLinearRing2D(area_locationStr);
        var linearRing25D = getLinearRing25D(area_25D_locationStr);
        var polygon = null;
        var polygon25D = null;
        var strokeColor = null;
        //#FF8D8B红 #E6C62F黄 #FFAF00澄 绿#44E730
        switch (level_color) {
            case "#FFDBDB":
                strokeColor = "#FF8D8B";
                break;
            case "#FFCB66":
                strokeColor = "#FFAF00";
                break;
            case "#F5E5AD":
                strokeColor = "#E6C62F";
                break;
            case "#B5F5AD":
                strokeColor = "#44E730";
                break;
        }

        if (linearRing2D.shapeType == "r" || linearRing2D.shapeType == "p") {
            polygon = new SuperMap.Geometry.Polygon(linearRing2D);
        }
        else if (linearRing2D.shapeType == "c") {
            polygon = createCircle(linearRing2D[0], linearRing2D[1] + 20, 256, 360, 360);
        }

        if (linearRing25D) {
            if (linearRing25D.shapeType == "r" || linearRing25D.shapeType == "p") {
                polygon25D = new SuperMap.Geometry.Polygon(linearRing25D);
            }
            else if (linearRing25D.shapeType == "c") {
                polygon25D = createCircle(linearRing25D[0], linearRing25D[1] + 20, 256, 360, 360);
            }
        }
        else if (!linearRing25D) {
            polygon25D = null;
        }
        if (polygon) {
            if (areaObj.area_type == -1) {//楼
                var polygonLayer = getAreafeatuGroup(areaObj.area_type);//楼的分类
                var building_polygonLayer = getAreafeatuGroup(areaObj.area_type_id);//楼所属的功能区的分类

                var attributes = {
                    id: areaObj.id,
                    area_name: areaObj.area_name,//区域名称
                    //area_25D_location : areaObj.area_25D_location//25D坐标
                    area_level: areaObj.area_level,  //区域级别ID
                    area_type: areaObj.area_type,//区域类别ID
                    person_id: areaObj.person_id,//人员编号
                    person_name: areaObj.person_name,//人员名称
                    map_type: areaObj.map_type,//地图类型
                    is_show: areaObj.is_show,//是否显示
                    content: areaObj.content,//备注
                    grid_id: areaObj.grid_id,//网格ID
                    region_id: areaObj.region_id,//园区编号
                    area_image: areaObj.area_image,//区域的图片索引ID


                    building_id: areaObj.building_id, //楼宇ID
                    area_type_id: areaObj.area_type_id,//楼宇所属功能
                    building_name: areaObj.building_name,//建筑名称
                    alias: areaObj.alias,//别名
                    manager_id: areaObj.manager_id, //负责人ID
                    manager_name: areaObj.manager_name,//负责人姓名
                    create_time: areaObj.create_time,//建筑年代
                    building_type: areaObj.building_type,//结构类型
                    above_ground_area: areaObj.above_ground_area,  //地上面积
                    under_ground_area: areaObj.under_ground_area,//地下面积
                    floor_num: areaObj.floor_num, //楼层数
                    level_name: areaObj.level_name, //级别名称
                    level_color: areaObj.level_color,//级别的颜色
                    level_status: areaObj.level_status,//级别状态
                    polygon25D: polygon25D,
                    polygon2D: polygon
                }



                //将多边型对象转成几何要素
                var feature = new SuperMap.Feature.Vector(polygon, attributes);
                //设置样式
                feature.style = { strokeColor: strokeColor, strokeOpacity: 1, strokeWidth: 1.5, fillColor: level_color, fillOpacity: 0.8 };
                polygonLayer.addFeatures(feature);
                //building_polygonLayer.addFeatures(feature);
                //polygonLayer.redraw();

            }
            if (areaObj.area_type == 0) {//逻辑区域
                var polygonLayer = getAreafeatuGroup(areaObj.area_type);
                var attributes = {
                    id: areaObj.id,
                    area_name: areaObj.area_name,//区域名称
                    //area_25D_location : areaObj.area_25D_location,//25D坐标
                    area_level: areaObj.area_level, //区域级别ID
                    area_type: areaObj.area_type,//区域类别ID
                    person_id: areaObj.person_id,//人员编号
                    person_name: areaObj.person_name,//人员名称
                    map_type: areaObj.map_type,//地图类型
                    is_show: areaObj.is_show,//是否显示
                    content: areaObj.content,//备注
                    grid_id: areaObj.grid_id,//网格ID
                    region_id: areaObj.region_id,//园区编号
                    area_image: areaObj.area_image,//区域的图片索引ID

                    level_name: areaObj.level_name,//级别名称
                    level_color: areaObj.level_color,//级别的颜色
                    level_status: areaObj.level_status,//级别状态
                    polygon25D: polygon25D,
                    polygon2D: polygon

                }

                //将多边型对象转成几何要素
                var feature = new SuperMap.Feature.Vector(polygon, attributes);
                //设置样式
                feature.style = { strokeColor: strokeColor, strokeOpacity: 1, strokeWidth: 1.5, fillColor: level_color, fillOpacity: 0.8 };
                polygonLayer.addFeatures(feature);
                //polygonLayer.redraw();
            }
            else if (areaObj.area_type > 0) {//功能区
                var polygonLayer = getAreafeatuGroup(areaObj.area_type);
                var attributes = {
                    id: areaObj.id,
                    area_name: areaObj.area_name,//区域名称
                    //area_25D_location : areaObj.area_25D_location//25D,坐标
                    area_level: areaObj.area_level,  //区域级别ID
                    area_type: areaObj.area_type,//区域类别ID
                    person_id: areaObj.person_id,//人员编号
                    person_name: areaObj.person_name,//人员名称
                    map_type: areaObj.map_type,//地图类型
                    is_show: areaObj.is_show,//是否显示
                    content: areaObj.content,//备注
                    grid_id: areaObj.grid_id,//网格ID
                    region_id: areaObj.region_id,//园区编号
                    area_image: areaObj.area_image,//区域的图片索引ID

                    level_name: areaObj.level_name, //级别名称
                    level_color: areaObj.level_color,//级别的颜色
                    level_status: areaObj.level_status, //级别状态
                    polygon25D: polygon25D,
                    polygon2D: polygon
                }

                //将多边型对象转成几何要素
                var feature = new SuperMap.Feature.Vector(polygon, attributes);
                //设置样式
                feature.style = { strokeColor: strokeColor, strokeOpacity: 1, strokeWidth: 1.5, fillColor: level_color, fillOpacity: 0.8 };
                polygonLayer.addFeatures(feature);
                //polygonLayer.redraw();
            }

        }
    }
    var callbacks = {

        click: function (currentFeature) {
            // onFeatureSelected(currentFeature);
        }
    };

    //实例化 selectFeature 控件，调用了 onSelect 和 onUnselect 方法
    //地物被选中时调用 onSelect 方法，地物被取消选中时调用 onUnselect 方法
    var selectFeature = new SuperMap.Control.SelectFeature(polygonLayerArray, {
        onSelect: onFeatureSelected
    });
    //map上添加控件
    selectFeature.repeat = true;
    csm.mapContainer.addControl(selectFeature);
    //激活控件
    selectFeature.activate();



    //var callbacks = {
    //    click: function (currentFeature) {
    //        onFeatureSelected(currentFeature);
    //    }
    //};
    //var selectFeature = new SuperMap.Control.SelectFeature(polygonLayerArray,
    //        {
    //            callbacks: callbacks
    //        });
    //csm.mapContainer.addControl(selectFeature);
    //selectFeature.activate();


    csm.mapContainer.addLayers(polygonLayerArray);
    //得到区域图层集合中最后一个图层在地图上层级的级数
    var areaLayerIndex = csm.mapContainer.getLayerIndex(polygonLayerArray[polygonLayerArray.length - 1]);
    //将扇形的图层放到区域图层的最上面，因为不然总被区域的图层盖住
    //csm.mapContainer.setLayerIndex(semiCircleLayer, areaLayerIndex - 2);
}
//解析2D坐标字符串
function getLinearRing2D(locationStr) {
    var linearRing = null;
    if (locationStr) {
        if (locationStr.split('|').length == 2) {//矩形
            var array = locationStr.split('|');
            var southWestStr = locationStr.split("|")[0];
            var northEastStr = locationStr.split("|")[1];
            var zx = lonLat2Mercator(southWestStr.split(',')[1], southWestStr.split(',')[0]);//左下
            var ys = lonLat2Mercator(northEastStr.split(',')[1], northEastStr.split(',')[0]);//右上

            var yx = new SuperMap.Geometry.Point(ys.x, zx.y);
            var zs = new SuperMap.Geometry.Point(zx.x, ys.y);

            linearRing = new SuperMap.Geometry.LinearRing([zx, yx, ys, zs]);
            linearRing.shapeType = "r";
        }
        if (locationStr.split('|').length > 2) {//多边形
            var points = [];
            var locationArray = locationStr.split('|');
            for (var j = 0; j < locationArray.length; j++) {
                var locationStr = locationArray[j].split(',');
                var point = lonLat2Mercator(locationStr[1], locationStr[0]);
                points.push(point);
            }
            linearRing = new SuperMap.Geometry.LinearRing(points);
            linearRing.shapeType = "p";
        }
        if (locationStr.indexOf('/') != -1) {//圆
            var radius = locationStr.split('/')[0];
            var circleCenter = locationStr.split('/')[1];
            circleCenter = lonLat2Mercator(circleCenter.split(',')[1], circleCenter.split(',')[0]);
            linearRing = [circleCenter, Number(radius)];
            linearRing.shapeType = "c";
        }
    }
    return linearRing;
}

//解析25D坐标字符串
function getLinearRing25D(locationStr) {
    var linearRing = null;
    if (locationStr) {
        if (locationStr.split('|').length == 2) {//矩形
            var array = locationStr.split('|');
            var southWestStr = locationStr.split("|")[0];
            var northEastStr = locationStr.split("|")[1];
            var zx = new SuperMap.Geometry.Point(Number(southWestStr.split(',')[0]) * supermap25Dhigh, supermap25Dmultiple - Number(southWestStr.split(',')[1]) * supermap25Dhigh);//左下
            var ys = new SuperMap.Geometry.Point(Number(northEastStr.split(',')[0]) * supermap25Dhigh, supermap25Dmultiple - Number(northEastStr.split(',')[1]) * supermap25Dhigh);//右上

            var yx = new SuperMap.Geometry.Point(ys.x, zx.y);
            var zs = new SuperMap.Geometry.Point(zx.x, ys.y);

            linearRing = new SuperMap.Geometry.LinearRing([zx, yx, ys, zs]);
            linearRing.shapeType = "r";
        }
        if (locationStr.split('|').length > 2) {//多边形
            var points = [];
            var locationArray = locationStr.split('|');
            for (var j = 0; j < locationArray.length; j++) {
                var locationStr = locationArray[j].split(',');
                var point = new SuperMap.Geometry.Point(Number(locationStr[0]) * supermap25Dhigh, supermap25Dmultiple - Number(locationStr[1]) * supermap25Dhigh);
                points.push(point);
            }
            linearRing = new SuperMap.Geometry.LinearRing(points);
            linearRing.shapeType = "p";
        }
        if (locationStr.indexOf('/') != -1) {//圆
            var radius = locationStr.split('/')[0];
            var circleCenter = locationStr.split('/')[1];
            circleCenter = new SuperMap.Geometry.Point(Number(circleCenter.split(',')[0]) * supermap25Dhigh, supermap25Dmultiple - Number(circleCenter.split(',')[1]) * supermap25Dhigh);
            linearRing = [circleCenter, Number(radius)];
            linearRing.shapeType = "c";
        }
    }
    return linearRing;
}
//区域工具栏的单击事件
function areaToolClick(id) {
    var isLayerChange = false;//判断这次工具栏的点击是否有图层的显示和隐藏
    for (var i = 0; i < polygonLayerArray.length; i++) {
        var polygonLayer = polygonLayerArray[i];
        if ("area_" + polygonLayer.areaType == id && polygonLayer.show == true) {
            csm.mapContainer.removeLayer(polygonLayer);
            polygonLayer.show = false;
            var unactiveUrl = $("#" + id).attr("unactive_image");
            $("#" + id).css({ "background-image": "url(" + unactiveUrl + ")" });
            $("#" + id).attr("isShow", "0");
            isLayerChange = true;
        }
        else if ("area_" + polygonLayer.areaType == id && polygonLayer.show == false) {
            csm.mapContainer.addLayer(polygonLayer);
            polygonLayer.show = true;
            var activeUrl = $("#" + id).attr("active_image");
            $("#" + id).css({ "background-image": "url(" + activeUrl + ")" });
            $("#" + id).attr("isShow", "1");
            isLayerChange = true;
        }
    }
    if (isLayerChange == false) {
        var li_img = $("#" + id).css("background-image");
        if (li_img.indexOf('unactive_image') > 0) {
            var activeUrl = $("#" + id).attr("active_image");
            $("#" + id).css({ "background-image": "url(" + activeUrl + ")" });
            $("#" + id).attr("isShow", "1");
        }
        else if (li_img.indexOf('unactive_image') == -1) {
            var unactiveUrl = $("#" + id).attr("unactive_image");
            $("#" + id).css({ "background-image": "url(" + unactiveUrl + ")" });
            $("#" + id).attr("isShow", "0");
        }
    }


    //循环所有的右侧工具栏
    var children = $("#rightFloat").children();//区域工具栏的所有的标签
    var is1 = 0;//记录除去“全部”按钮的图层按钮为显示的个数
    var is0 = 0;//记录除去“全部”按钮的图层按钮为隐藏的个数
    $($("#rightFloat").children()).each(function () {//循环所有的右侧工具栏
        if ($(this).attr("id") != "area_all") {//判断除去“全部”的按钮
            if ($(this).attr("isShow") == 1) {//如果这个按钮的为显示状态
                is1++;
            }
            else if ($(this).attr("isShow") == 0) {//如果这个按钮的为隐藏状态
                is0++;
            }
        }
    });
    if (is1 == children.length - 1) {//如果显示的个数等去除去“全部”按钮的个数，说明都是显示
        var activeUrl = $("#area_all").attr("active_image");
        $("#area_all").css({ "background-image": "url(" + activeUrl + ")" });//把“全部”按钮设为显示图标
        $("#area_all").attr("isShow", "1");//把“全部”按钮设为显示状态
    }
    else if (is0 > 0) {//如果隐藏的个数大于0，说明有隐藏的图层
        var unActiveUrl = $("#area_all").attr("unactive_image");
        $("#area_all").css({ "background-image": "url(" + unActiveUrl + ")" });//把“全部”按钮设为隐藏图标
        $("#area_all").attr("isShow", "0");//把“全部”按钮设为隐藏状态
    }

}
function areaAllClick(obj) {
    if ($(obj).attr("isShow") == 1) {//如果“全部”的按钮是isshow是1，说明是全部都显示
        for (var i = 0; i < polygonLayerArray.length; i++) {//循环全部类型的区域图层，隐藏它们
            var polygonLayer = polygonLayerArray[i];
            if (polygonLayer.show == true) {//如果这个图层的show是显示
                csm.mapContainer.removeLayer(polygonLayer);//把它隐藏
                polygonLayer.show = false;//把它的show设为隐藏，证明它的状态是隐藏
            }
        }
        $(obj).attr("isShow", 0);//将“全部”按钮的isshow设为0.说明已经全部隐藏
        var unactiveUrl = $(obj).attr("unactive_image");//将“全部”按钮设置为未激活的图标
        $(obj).css({ "background-image": "url(" + unactiveUrl + ")" });//将全部的图标弄成未激活
        $(obj).siblings().each(function () {//循环“全部”的所有同级标签，不包“全部”这一个
            var unactiveUrl = $(this).attr("unactive_image");

            $(this).css({ "background-image": "url(" + unactiveUrl + ")" });//将全部的按钮图标弄成未激活
            $(this).attr("isShow", "0");//将所有图层的按钮的isshow属性设为0

        })
    }
    else if ($(obj).attr("isShow") == 0) {//如果“全部”的按钮是isshow是0，说明是全部都是显示
        for (var i = 0; i < polygonLayerArray.length; i++) {//循环全部类型的区域图层，显示它们
            var polygonLayer = polygonLayerArray[i];
            if (polygonLayer.show == false) {//如果这个图层的show是隐藏
                csm.mapContainer.addLayer(polygonLayer);//把它显示
                polygonLayer.show = true;//把它的show设为显示，证明它的状态是显示
            }
        }
        $(obj).attr("isShow", 1);//将“全部”按钮的isshow设为1.说明已经全部显示
        var activeUrl = $(obj).attr("active_image");
        $(obj).css({ "background-image": "url(" + activeUrl + ")" });//将“全部”按钮弄成激活
        $(obj).siblings().each(function () {//循环“全部”的所有同级标签，不包“全部”这一个
            var activeUrl = $(this).attr("active_image");
            $(this).css({ "background-image": "url(" + activeUrl + ")" });//将全部的按钮图标弄成激活
            $(this).attr("isShow", "0");//将所有图层的按钮的isshow属性设为0

        })
    }
}
//判断areaLayerGroup中是否存在对应区域类型的ID的featureGroup，如果存在则返回这个，没有则创建返回
function getAreafeatuGroup(areaType) {
    var polygonLayer = null;
    for (var i = 0; i < polygonLayerArray.length; i++) {
        var polygons = polygonLayerArray[i];
        if (polygons.areaType == areaType) {
            polygonLayer = polygons;
        }
    }
    if (!polygonLayer) {
        polygonLayer = new SuperMap.Layer.Vector("polygonLayer" + areaType);
        polygonLayer.areaType = areaType;
        polygonLayer.show = true;
        polygonLayerArray.push(polygonLayer);

    }
    return polygonLayer;
}
//圆
function createCircle(origin, radius, sides, r, angel) {
    var rR = r * Math.PI / (180 * sides);
    var rotatedAngle, x, y;
    var points = [];
    for (var i = 0; i < sides; ++i) {
        rotatedAngle = rR * i;
        x = origin.x + (radius * Math.cos(rotatedAngle));
        y = origin.y + (radius * Math.sin(rotatedAngle));
        points.push(new SuperMap.Geometry.Point(x, y));
    }
    rotatedAngle = r * Math.PI / 180;
    x = origin.x + (radius * Math.cos(rotatedAngle));
    y = origin.y + (radius * Math.sin(rotatedAngle));
    points.push(new SuperMap.Geometry.Point(x, y));

    var ring = new SuperMap.Geometry.LinearRing(points);
    ring.rotate(parseFloat(angel), origin);
    var geo = new SuperMap.Geometry.Collection([ring]);
    geo.origin = origin;
    geo.radius = radius;
    geo.r = r;
    geo.angel = angel;
    geo.sides = sides;
    geo.polygonType = "Curve";
    return geo;
}
//var simplePopup = null;
var framedCloudPolygon;
function onFeatureSelected(feature) {
    if (Alarm.alarmState) {//如果正在告警不弹窗
        alert("请在确警后再进行此操作！");
        return;
    }
    closeInfoWin();//弹出之前先关闭其他设备或者区域的弹框
    closeVedioPopup();//关掉视频的弹框
    var shape = feature;
    $("#areaPopupClose").attr("style", "display:");
    var contentHTML = $("#areaPopup").html();//{ maxWidth: 500, maxHeight: 400 });
    var lonlat = shape.geometry.getBounds().getCenterLonLat();
    framedCloudPolygon = new SuperMap.Popup.FramedCloud("polygonPopupnew", lonlat, new SuperMap.Size(375, 100), contentHTML, null, false, null, true);
    framedCloudPolygon.maxSize = SuperMap.Size(300, 500);
    framedCloudPolygon.fixedRelativePosition = true;
    simplePopup = framedCloudPolygon;
    csm.mapContainer.addPopup(framedCloudPolygon);
    var personName = shape.attributes.person_name == null ? "无" : shape.attributes.person_name;
    $("#LevelPeopleName1").html("<a>" + personName + "</a>");
    $("#LevelPeoplePhone1").html("<a>" + "无 " + "</a>");
    $("#LevelPeopleName2").html("<a>" + personName + "</a>");
    $("#LevelPeoplePhone2").html("<a>" + "无 " + "</a>");
    $("#LevelPeopleName3").html("<a>" + personName + "</a>");
    $("#LevelPeoplePhone3").html("<a>" + "无 " + "</a>");
    $("#gridPeopleNameManger").html("<a>" + personName + "</a>");
    $("#gridPeoplePhoneManger").html("<a>" + "无 " + "</a>");
    $("#gridPeopleNameInfo").html("<a>" + personName + "</a>");
    $("#gridPeoplePhoneInfo").html("<a>" + "无 " + "</a>");
    var phoneNum = getPersonInfo(shape.attributes.person_id);
    var phone = phoneNum.msg.phone == null ? "无" : phoneNum.msg.phone;
    $("#LevelPeoplePhone1").html("<a>" + phone + "</a>");
    $("#LevelPeoplePhone2").html("<a>" + phone + "</a>");
    $("#LevelPeoplePhone3").html("<a>" + phone + "</a>");
    $("#gridPeoplePhoneManger").html("<a>" + phone + "</a>");
    $("#gridPeoplePhoneInfo").html("<a>" + phone + "</a>");

    if (shape.attributes.area_type == -1) {
        $("#areaNamePopup").html(shape.attributes.area_name + "<a class='building-link' style='color:#9370DB;' onclick='floorInClick(" + shape.attributes.id + ")'>&nbsp&nbsp&nbsp&nbsp楼内图</a>");
    }
    else {
        $("#areaNamePopup").html(shape.attributes.area_name);
    }

}


//function closeInfoWin() {
//    if (simplePopup) {
//        try {
//            simplePopup.hide();
//            simplePopup.destroy();
//        }
//        catch (e) { }
//    }
//}

function getPersonInfo(id) {
    var personInfo = null;
    $.ajax({
        url: "/PersonInfo/GetPersonInfoByPersonId",
        type: "post", //这里是http类型
        data: { personId: id },
        dataType: "json", //传回来的数据类型
        async: false,
        success: function (data) {
            if (data) {
                personInfo = data;
            }
        }
    });
    return personInfo;
}

