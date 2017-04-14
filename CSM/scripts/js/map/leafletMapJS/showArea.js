var areaLayerGroup = L.layerGroup();//所有的区域的图层
var areaLayerTempGroup = L.layerGroup();//临时图层;
var areaColor = {
    1: "#FF0000",
    2: "#EEAD0E",
    3: "#FFFF00",
    4: "#9ACD32"
};

$(document).ready(function () {
    areaLayerGroup.addTo(csm.mapContainer);
    showArea();
});
//获取全部的地块数据
function showArea() {
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
                var latlng = [latlngStr[0], latlngStr[1]];
                latlngs.push(latlng);
            }
            shape = L.polygon(latlngs, { color: "#000000", fillColor: level_color, weight: 0.5, fillOpacity: 0.75 });
            shape.shapeType = "p";
            shape.area_location = latlngs;
            shape.area_25D_location = getLocation25D(area_25D_location);
        }
        if (area_location.split('|').length == 2) {//矩形
            var array = area_location.split('|');
            var southWestStr = area_location.split("|")[0];
            var northEastStr = area_location.split("|")[1];
            var southWest = [southWestStr.split(',')[0], southWestStr.split(',')[1]];
            var northEast = [northEastStr.split(',')[0], northEastStr.split(',')[1]];
            shape = L.rectangle([southWest, northEast], { color: "#000000", fillColor: level_color, weight: 0.5, fillOpacity: 0.75 });
            shape.shapeType = "r";
            shape.area_location = [southWest, northEast];
            shape.area_25D_location = getLocation25D(area_25D_location);
        }
        if (area_location.indexOf('/') != -1) {//圆
            var radius = area_location.split('/')[0];
            var circleCenter = area_location.split('/')[1];
            circleCenter = [circleCenter.split(',')[0], circleCenter.split(',')[1]];
            shape = L.circle(circleCenter, { radius: radius, color: "#000000", fillColor: level_color, weight: 0.5, fillOpacity: 0.75 });
            shape.shapeType = "c";
            shape.area_location = [circleCenter, radius];
            shape.area_25D_location = getLocation25D(area_25D_location);
        }

        if (shape) {
            if (areaObj.area_type == -1) {//楼
                var featureGroup = getAreafeatuGroup(areaObj.area_type);//楼的分类
                var building_featureGruop = getAreafeatuGroup(areaObj.area_type_id);//楼所属的功能区的分类

                shape.id = areaObj.id;
                shape.area_name = areaObj.area_name//区域名称
                //shape.area_25D_location = areaObj.area_25D_location//25D坐标
                shape.area_level = areaObj.area_level  //区域级别ID
                shape.area_type = areaObj.area_type//区域类别ID
                shape.person_id = areaObj.person_id//人员编号
                shape.person_name = areaObj.person_name//人员名称
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
                shape.manager_name = areaObj.manager_name//负责人姓名
                shape.create_time = areaObj.create_time//建筑年代
                shape.building_type = areaObj.building_type//结构类型
                shape.above_ground_area = areaObj.above_ground_area  //地上面积
                shape.under_ground_area = areaObj.under_ground_area//地下面积
                shape.floor_num = areaObj.floor_num //楼层数

                shape.level_name = areaObj.level_name //级别名称
                shape.level_color = areaObj.level_color;//级别的颜色
                shape.level_status = areaObj.level_status //级别状态

                //shape.on('click', areaShapeClick);
                shape.bindTooltip(shape.area_name, {
                    direction: 'bottom', offset: L.point(0, 8)
                    //, permanent: true
                });
                var myShape = new areaBindPopup(shape);
                featureGroup.addLayer(myShape);
                building_featureGruop.addLayer(myShape);

            }
            if (areaObj.area_type == 0) {//逻辑区域
                var featureGroup = getAreafeatuGroup(areaObj.area_type);

                shape.id = areaObj.id;
                shape.area_name = areaObj.area_name//区域名称
                //shape.area_25D_location = areaObj.area_25D_location//25D坐标
                shape.area_level = areaObj.area_level  //区域级别ID
                shape.area_type = areaObj.area_type//区域类别ID
                shape.person_id = areaObj.person_id//人员编号
                shape.person_name = areaObj.person_name//人员名称
                shape.map_type = areaObj.map_type//地图类型
                shape.is_show = areaObj.is_show//是否显示
                shape.content = areaObj.content//备注
                shape.grid_id = areaObj.grid_id//网格ID
                shape.region_id = areaObj.region_id//园区编号
                shape.area_image = areaObj.area_image//区域的图片索引ID

                shape.level_name = areaObj.level_name //级别名称
                shape.level_color = areaObj.level_color;//级别的颜色
                shape.level_status = areaObj.level_status //级别状态

                //shape.on('click', areaShapeClick);
                shape.bindTooltip(shape.area_name, {
                    direction: 'bottom', offset: L.point(0, 8)
                    //, permanent: true
                });
                var myShape = new areaBindPopup(shape);
                featureGroup.addLayer(myShape);
            }
            else if (areaObj.area_type > 0) {//功能区
                var featureGroup = getAreafeatuGroup(areaObj.area_type);

                shape.id = areaObj.id;
                shape.area_name = areaObj.area_name//区域名称
                //shape.area_25D_location = areaObj.area_25D_location//25D坐标
                shape.area_level = areaObj.area_level  //区域级别ID
                shape.area_type = areaObj.area_type//区域类别ID
                shape.person_id = areaObj.person_id//人员编号
                shape.person_name = areaObj.person_name//人员名称
                shape.map_type = areaObj.map_type//地图类型
                shape.is_show = areaObj.is_show//是否显示
                shape.content = areaObj.content//备注
                shape.grid_id = areaObj.grid_id//网格ID
                shape.region_id = areaObj.region_id//园区编号
                shape.area_image = areaObj.area_image//区域的图片索引ID

                shape.level_name = areaObj.level_name //级别名称
                shape.level_color = areaObj.level_color;//级别的颜色
                shape.level_status = areaObj.level_status //级别状态
                //shape.on('click', areaShapeClick);
                shape.bindTooltip(shape.area_name, {
                    direction: 'bottom', offset: L.point(0, 8)
                    //, permanent: true
                });
                var myShape = new areaBindPopup(shape);
                featureGroup.addLayer(myShape);
            }
            areaLayerTempGroup.addLayer(shape);
        }
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
//区域的单击事件
function areaShapeClick(e) {
    var shape = this;
    $(".leaflet-popup-content").children().remove();//不移除的话，页面固定的div会与弹出框的div相冲突
    if (shape.area_type == -1) {
        $("#areaNamePopup").html(shape.area_name + "<a class='building-link' style='color:#9370DB;' onclick='floorInClick(" + shape.id + ")'>&nbsp&nbsp&nbsp&nbsp楼内图</a>");
    }
    else {
        $("#areaNamePopup").html(shape.area_name);
    }

    var latlng = e.latlng;
    var popup = L.popup({ maxWidth: 500, maxHeight: 400 })
                    .setLatLng(latlng)
                    .setContent($("#areaPopup").html())
                    .openOn(csm.mapContainer);
}

//区域绑定popup
function areaBindPopup(shape) {
    var myShape = shape;
    //$("#areaInfoImg").css({ "background-image": "url(" + shape.area_image + ")" });//将popup图标置换
    var personName = myShape.person_name == null ? "无" : myShape.person_name;
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



    //myShape.bindPopup($("#areaPopup").html(), { maxWidth: 500, maxHeight: 400 });
    myShape.bindPopup("", { maxWidth: 500, maxHeight: 400 });

    myShape.on('popupopen', function () {
        vedioPopupClose();
        csm.mapContainer.setView(shape.getBounds().getCenter());
        getPersonInfo(this);
       
    });
    return myShape;
}
//判断areaLayerGroup中是否存在对应区域类型的ID的featureGroup，如果存在则返回这个，没有则创建返回
function getAreafeatuGroup(areaType) {
    var featureGroup = null;
    areaLayerGroup.eachLayer(function (layer) {
        if (layer.areaType == areaType) {
            featureGroup = layer;
        }
    });
    if (!featureGroup) {
        featureGroup = L.featureGroup();
        featureGroup.areaType = areaType;
        featureGroup.show = true;
        areaLayerGroup.addLayer(featureGroup);
    }
    return featureGroup;
}
//区域工具栏的单击事件
function areaToolClick(id) {
    var isLayerChange = false;//判断这次工具栏的点击是否有图层的显示和隐藏
    areaLayerGroup.eachLayer(function (layer) {
        if ("area_" + layer.areaType == id) {
            if (layer.show == true) {
                shapeShowHide(layer, 0);
                layer.show = false;
                var unactiveUrl = $("#" + id).attr("unactive_image");
                $("#" + id).css({ "background-image": "url(" + unactiveUrl + ")" });
                $("#" + id).attr("isShow", "0");
            }
            else if (layer.show == false) {
                shapeShowHide(layer, 1);
                layer.show = true;
                var activeUrl = $("#" + id).attr("active_image");
                $("#" + id).css({ "background-image": "url(" + activeUrl + ")" });
                $("#" + id).attr("isShow", "1");
            }
            isLayerChange = true;
        }

    });
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
//“全部”的单击事件
function areaAllClick(obj) {
    if ($(obj).attr("isShow") == 1) {//如果“全部”的按钮是isshow是1，说明是全部都显示
        areaLayerGroup.eachLayer(function (layer) {//循环全部类型的区域图层，隐藏它们
            if (layer.show == true) {//如果这个图层的show是显示
                shapeShowHide(layer, 0);//把它隐藏
                layer.show = false;//把它的show设为隐藏，证明它的状态是隐藏
            }
        });
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
        areaLayerGroup.eachLayer(function (layer) {//循环全部类型的区域图层，显示它们
            if (layer.show == false) {//如果这个图层的show是隐藏
                shapeShowHide(layer, 1);//把它显示
                layer.show = true;//把它的show设为显示，证明它的状态是显示
            }
        });
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
//区域的显示和隐藏
function shapeShowHide(featureLayer, isShow) {
    if (isShow == 1) {
        areaLayerTempGroup.eachLayer(function (layer) {
            if (layer.area_type == featureLayer.areaType) {
                featureLayer.addLayer(layer);
            }
            if (layer.area_type == -1 && layer.area_type_id == featureLayer.areaType) {
                featureLayer.addLayer(layer);
            }
        });

    }
    else if (isShow == 0) {
        featureLayer.clearLayers();
    }
}
//将区域工具栏的图标重新设置一遍设置为激活的图标，在楼内图和主图切换之间调用
function resetAreaToolIcon() {
    $("#rightFloat >li").each(function () {//循环父级标签li标签
        var activeImg = $(this).attr("active_image");//获取父标签的激活图标属性
        $(this).css({ "background-image": "url(" + activeImg + ")" });//将父标签的图标换成激活的图标
    });
}

function getPersonInfo(obj) {
    var personInfo = null;
    $.ajax({
        url: "/PersonInfo/GetPersonInfoByPersonId",
        type: "post", //这里是http类型
        data: { personId: obj.person_id },
        dataType: "json", //传回来的数据类型
        async: false,
        success: function (data) {
            if (data) {
                personInfo = data;
                //var personInfo = getPersonInfo(shape.person_id);
                //if (personInfo) {
                //    $("#LevelPeopleName1").html("<a>" + personInfo.msg.name + "</a>");
                //    $("#LevelPeoplePhone1").html("<a>" + personInfo.msg.phone + "</a>");
                //    $("#LevelPeopleName2").html("<a>" + personInfo.msg.name + "</a>");
                //    $("#LevelPeoplePhone2").html("<a>" + personInfo.msg.phone + "</a>");
                //    $("#LevelPeopleName3").html("<a>" + personInfo.msg.name + "</a>");
                //    $("#LevelPeoplePhone3").html("<a>" + personInfo.msg.phone + "</a>");
                //    $("#gridPeopleNameManger").html("<a>" + personInfo.msg.name + "</a>");
                //    $("#gridPeoplePhoneManger").html("<a>" + personInfo.msg.phone + "</a>");
                //    $("#gridPeopleNameInfo").html("<a>" + personInfo.msg.name + "</a>");
                //    $("#gridPeoplePhoneInfo").html("<a>" + personInfo.msg.phone + "</a>");
                //}
                //$("#LevelPeoplePhone1").html(personInfo.msg.phone);
                //$("#LevelPeoplePhone2").html(personInfo.msg.phone);
                //$("#LevelPeoplePhone3").html(personInfo.msg.phone);
                //$("#gridPeoplePhoneManger").html(personInfo.msg.phone);
                //$("#gridPeoplePhoneInfo").html(personInfo.msg.phone);
            }
        }
    });
    //return personInfo;
    var personName = obj.person_name == null ? "无" : obj.person_name;
    var phone = personInfo.msg.phone == null ? "无" : personInfo.msg.phone;
    var htmlString = '';
    if (obj.area_type == -1) {
        //$("#areaNamePopup").html(shape.area_name + "<a class='building-link' style='color:#9370DB;' onclick='floorInClick(" + shape.id + ")'>&nbsp&nbsp&nbsp&nbsp楼内图</a>");
        htmlString = '<p id="areaNamePopup" class="building-title areaNamePopup">' + obj.area_name + '<a class="building-link" style="color:#9370DB;" onclick="floorInClick(' + obj.id + ')">&nbsp&nbsp&nbsp&nbsp楼内图</a></p>';
    }
    else {
        //$("#areaNamePopup").html(shape.area_name);
        htmlString = '<p id="areaNamePopup" class="building-title areaNamePopup">' + obj.area_name + '</p>'
    }
    htmlString = htmlString +
      '<div class="building-content">' +
    '<div id="areaInfoImg" class="building-img building-img1"></div>' +
    '<div class="building-tab"> ' +
    '  <table cellspacing="0"> ' +
    '     <tbody> ' +
    '         <tr> ' +
    '             <td width="115"> 一级网格负责人：</td> ' +
    '               <td width="95" id="LevelPeopleName1"><a href="#">' + personName + '</a></td> ' +
    '                <td>电话：</td> ' +
    '          <td width="70" id="LevelPeoplePhone1"><a>' + phone + '</a></td> ' +
    '      </tr> ' +
    '      <tr> ' +
    '         <td>二级网格负责人： </td> ' +
    '         <td id="LevelPeopleName2"><a href="#">' + personName + '</a></td> ' +
    '       <td>电话：</td> ' +
    '       <td width="73" id="LevelPeoplePhone2"><a>' + phone + '</a></td> ' +
    '  </tr> ' +
    '  <tr> ' +
    '  <td>三级网格负责人： </td> ' +
    ' <td id="LevelPeopleName3"><a href="#">' + personName + '</a></td> ' +
    '  <td>电话： </td> ' +
    '  <td id="LevelPeoplePhone3"><a>' + phone + '</a></td> ' +
    '  </tr> ' +
    '  <tr> ' +
    '<td>网&ensp;格&ensp;管&ensp;理&ensp;员： </td> ' +
    ' <td id="gridPeopleNameManger"><a href="#">' + personName + '</a></td> ' +
    '  <td>电话：</td> ' +
    '  <td id="gridPeoplePhoneManger"><a>' + phone + '</a></td> ' +
    '  </tr> ' +
    '  <tr> ' +
    '    <td id="LevelPeopleName2">网&ensp;格&ensp;信&ensp;息&ensp;员： </td> ' +
    '     <td id="gridPeopleNameInfo"><a href="#">' + personName + '</a></td> ' +
    '      <td>电话：</td> ' +
    '         <td id="gridPeoplePhoneInfo"><a>' + phone + '</a></td> ' +
    '     </tr> ' +
    '   </tbody> ' +

    '  </table> ' +
    ' </div> ' +
    '  <div class="building-info" style="display:block"> ' +
    ' <h4> ' +
    ' <span class="info1 active5" onclick="info1()">技防点位</span> ' +
    '    <span class="info2" onclick="info2()">能耗</span> ' +
    '   <span class="info3" onclick="info3()">人员</span> ' +
    '   <span class="info4" onclick="info4()">建筑信息</span> ' +
    '  </h4> ' +
    '  </div> ' +
    '  <!--技防点位--> ' +
    ' <div class="building-tab building-tab1" style="display:block"> ' +
    ' <table cellspacing="0"> ' +
    '    <tbody> ' +
    '       <tr> ' +
    '           <td>区域类型：</td> ' +
    '             <td class="tab2-td2" width="140">教学区</td> ' +
    '            <td>区域级别：</td> ' +
    '             <td class="tab2-td3">高</td> ' +
    '       </tr> ' +
    '       <tr> ' +
    '           <td>总设备数：</td> ' +
    '  <td class="tab2-td5" width="140">48</td> ' +
    '   <td></td> ' +
    '   <td></td> ' +
    '  </tr>  ' +
    '  <tr> ' +
    '    <td>消防设备：</td> ' +
    '     <td width="140">9</td> ' +
    '     <td>烟感设备：</td> ' +
    '     <td>0</td> ' +
    '  </tr>  ' +
    '    <tr> ' +

    '       <td>摄&ensp;像&ensp;机： </td> ' +
    '      <td width="140">23</td> ' +
    '      <td>其他设备：</td> ' +
    '      <td>16</td> ' +
    '   </tr> ' +
    '</tbody> ' +
    ' </table> ' +
    '  </div> ' +
    ' <!--能耗--> ' +
    '<div class="building-tab building-tab2" style="display:none"> ' +
    '  <table cellspacing="0"> ' +
    '   <tbody> ' +
    '      <tr> ' +
    '     <td>用&ensp;水&ensp;量：</td> ' +
    '   <td class="tab2-td2" width="140">357<span>（ton）</span></td> ' +
    '   <td width="70">用&ensp;电&ensp;量：</td> ' +
    '  <td class="tab2-td3">100<span>（kwh）</span></td> ' +
    '</tr> ' +
    ' <tr> ' +
    '  <td>能&ensp;&ensp;&ensp;&ensp;耗：</td> ' +
    '  <td width="70">12<span>（kg）</span></td> ' +
    ' <td>CO2排放：</td> ' +
    ' <td>34<span>（ton）</span></td> ' +
    '  </tr> ' +
    '  <tr> ' +
    '    <td>热&ensp;量&ensp;值：</td> ' +
    '    <td>23</td> ' +
    ' </tr> ' +
    ' </tbody> ' +
    '</table> ' +
    ' </div> ' +
    ' <!--人员--> ' +
    ' <div class="building-tab building-tab3" style="display:none"> ' +
    '     <table cellspacing="0"> ' +
    '       <tbody> ' +
    '         <tr> ' +
    '            <td>总&ensp;人&ensp;数：</td> ' +
    '           <td class="tab2-td2" width="140">110</td> ' +
    '          <td>男生人数：</td> ' +
    '          <td class="tab2-td3">20</td> ' +
    '  </tr> ' +
    '  <tr> ' +
    '   <td>女生人数：</td> ' +
    '   <td width="110">90</td> ' +
    '    <td>学&ensp;&ensp;&ensp;&ensp;院：</td> ' +
    '    <td>北京物资</td> ' +
    '   </tr> ' +
    '  </tbody> ' +
    ' </table> ' +
    ' </div> ' +
    '  <!--建筑信息--> ' +
    ' <div class="building-tab building-tab4" style="display:none"> ' +
    '   <table cellspacing="0"> ' +
    '     <tbody> ' +
    '      <tr> ' +
    '           <td>建设年代：</td> ' +
    '          <td class="tab2-td2" width="140">1990</td> ' +
    '           <td>面积（㎡）：</td> ' +
    '          <td class="tab2-td3">100</td> ' +
    '      </tr> ' +
    '       <tr> ' +
    '          <td>层&ensp;&ensp;&ensp;&ensp;数：</td> ' +
    '            <td>12</td> ' +
    '       </tr> ' +
    '     </tbody> ' +
    ' </table> ' +
    ' </div> ' +
    ' </div> ';
    var popup = obj.getPopup();
    popup.setContent(htmlString);
    popup.update();
}
