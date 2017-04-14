var deviceLayerGroup = L.layerGroup();//所有的设备的图层
var deviceGroup = L.featureGroup();
var semiCircleGroup = L.featureGroup();//扇形的图层
var currentClickMarker = null;
$(document).ready(function () {
    //createSemiCircle();
    deviceLayerGroup.addTo(csm.mapContainer);
    semiCircleGroup.addTo(csm.mapContainer);
    showDevice();
    //将工具栏的字标签设置为不冒泡，不设置的话，点击子标签，子标签的单击事件发生后，紧接着后执行一遍它的父标签的单击事件
    $("#leftFloat li ul li").click(function (event) {
        event.stopPropagation();
    })
});
//加载全部的设备
function showDevice() {
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

        var id = deviceObj.id;
        var visual_range = deviceObj.visual_range;
        var cover_range = deviceObj.cover_range;
        var camera_towards = deviceObj.camera_towards;

        if (normal_image && is_inbuilding == -1 && enable == 1) {//-1为楼外的设备
            var stateImg;
            if (device_status == 1) {
                stateImg = normal_image;
            }
            else {
                stateImg = error_image;
            }
            var deviceMarker = L.marker([latitude, longitude], {
                icon: L.icon({ iconUrl: stateImg, iconSize: [15.15, 23] }),
                contextmenu: true,
                contextmenuInheritItems: false,
                contextmenuItems: [{
                    text: '快速查看预案',
                    callback: function (e) {
                        quickViewPlan(e.relatedTarget)

                    }
                }, {
                    text: '快速注册预案',
                    callback: function (e) {
                        fastRegistrationPlan(e.relatedTarget)
                    }
                }
                , {
                    text: '批量配置预案',
                    callback: function (e) {
                        batchConfigurationPlan(e.relatedTarget)
                    }
                }, {
                    text: '模拟告警',
                    callback: function (e) {
                        openAnalogAlarm(e.relatedTarget)
                    }
                }]
            });
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

            deviceMarker.bindTooltip(deviceObj.device_name, {
                offset: L.point(0, 8), direction: 'bottom'
                //, permanent: true
            });//必须设置offset，设置为下面显示，不然在IE10浏览器下单击marker弹出框会冲突
            if (device_type == 1 || device_type == 2 || device_type == 3 || device_type == 4) {
                var semiCircle = createSemiCircle([latitude, longitude], visual_range, cover_range, camera_towards);
                if (semiCircle) {
                    deviceMarker.semiCircle = semiCircle;
                    //deviceMarker.semiCircle.addTo(semiCircleGroup);
                }
                else if (!semiCircle) {
                    deviceMarker.semiCircle = null;
                }
                deviceMarker.on('click', deviceMarkerClick);
            }
            else if (device_type > 4) {
                deviceMarker = markerBindPopup(deviceMarker);
                //deviceMarker.on('click', deviceMarkerClick);
            }
            var featureGroup = getDeviceFeatureGroup(device_type, deviceMarker.defined_device_typeid, deviceMarker.pid);
            //将marker添加到图层里面去
            featureGroup.addLayer(deviceMarker);
        }
    }
}
//marker的显示和隐藏
function markerShowHide(featureLayer, isShow) {
    featureLayer.eachLayer(function (layer) {
        if (isShow == 1) {
            if (layer._icon.className.indexOf(" myIconClass") > 0) {
                layer._icon.className = layer._icon.className.replace(" myIconClass", "");
                if ($("#semiCircleControl").attr("isShow") == 1) {
                    if (layer.semiCircle) {
                        semiCircleGroup.addLayer(layer.semiCircle);
                    }
                }

                //layer.openTooltip();
            }
            else {
                return;
            }
        }
        else if (isShow == 0) {
            if (layer._icon.className.indexOf(" myIconClass") > 0) {
                return;
            }
            else {
                layer._icon.className = layer._icon.className + " myIconClass";
                if ($("#semiCircleControl").attr("isShow") == 1) {
                    semiCircleGroup.removeLayer(layer.semiCircle);
                }

                //layer.closeTooltip();
            }
        }

    });
    if (featureLayer.deviceType == 1 || featureLayer.deviceType == 2 || featureLayer.deviceType == 3 || featureLayer.deviceType == 4 && isShow == 0) {
        vedioPopupClose();
    }

    closeOtherPopup();

}
//判断deviceLayerGroup中是否存在对应设备类型的ID的featureGroup，如果存在则返回这个，没有则创建返回
function getDeviceFeatureGroup(deviceType, defined_device_typeid, pid) {
    var featureGroup = null;
    deviceLayerGroup.eachLayer(function (layer) {
        if (layer.deviceType == deviceType) {
            featureGroup = layer;
        }
    });
    if (!featureGroup) {
        featureGroup = L.featureGroup();
        featureGroup.deviceType = deviceType;
        featureGroup.userDefined = defined_device_typeid;//自定义类型ID
        featureGroup.parentID = pid;
        featureGroup.show = true;
        deviceLayerGroup.addLayer(featureGroup);
    }
    return featureGroup;
}
//设备工具栏的单击事件
function deviceToolClick2(id) {
    //获取页面地图容器的div：mapContainer的自定义类型currentMapType的值,1为2D，2为2.5D，3为楼内图
    var currentMapType = $("#mapContainer").attr("currentMapType");
    if (currentMapType == 1 || currentMapType == 2) {//主图上的设备
        var myLayerGroup = deviceLayerGroup;//2D图的layerGroup，在本js中
    }
    if (currentMapType == 3) {//楼内图上的设备
        var myLayerGroup = floorDeviceLayerGroup;//楼内图layerGroup，在楼内图的js中
    }
    var isLayerChange = false;//判断这次工具栏的点击是否有图层的显示和隐藏
    myLayerGroup.eachLayer(function (layer) {
        if (layer.userDefined != id && layer.parentID == id) {//点击为父设备
            var featureGroup = layer;
            if (featureGroup.show == true) {
                markerShowHide(featureGroup, 0);
                featureGroup.show = false;
                var unactiveUrl = $("#" + id).attr("unactive_image");
                $("#" + id).css({
                    "background-image": "url(" + unactiveUrl + ")"
                });
            }
            else if (featureGroup.show == false) {
                markerShowHide(featureGroup, 1);
                featureGroup.show = true;
                var activeUrl = $("#" + id).attr("active_image");
                $("#" + id).css({
                    "background-image": "url(" + activeUrl + ")"
                });
            }

            isLayerChange = true;
        }

        if (layer.userDefined == id && layer.parentID == 0) {//父设备本身为子设备
            var featureGroup = layer;
            if (featureGroup.show == true) {
                markerShowHide(featureGroup, 0);
                featureGroup.show = false;
                var unactiveUrl = $("#" + id).attr("unactive_image");
                $("#" + id).css({
                    "background-image": "url(" + unactiveUrl + ")"
                });
            }
            else if (featureGroup.show == false) {
                markerShowHide(featureGroup, 1);
                featureGroup.show = true;
                var activeUrl = $("#" + id).attr("active_image");
                $("#" + id).css({
                    "background-image": "url(" + activeUrl + ")"
                });
            }
            isLayerChange = true;
        }
        if (layer.userDefined == id && layer.parentID > 0) {//点击子设备
            var featureGroup = layer;
            if (featureGroup.show == true) {
                markerShowHide(featureGroup, 0);
                featureGroup.show = false;
                var unactiveUrl = $("#" + id).attr("unactive_image");
                $("#" + id).css({
                    "background-image": "url(" + unactiveUrl + ")"
                });
            }
            else {
                markerShowHide(featureGroup, 1);
                featureGroup.show = true;
                var activeUrl = $("#" + id).attr("active_image");
                $("#" + id).css({
                    "background-image": "url(" + activeUrl + ")"
                });
            }
            isLayerChange = true;
        }
    });

    //当地图上没有图层发生显隐性时候，工具栏的图标也发生变化
    if (isLayerChange == false) {
        var li_img = $("#" + id).css("background-image");
        if (li_img.indexOf('unactive_image') > 0) {
            var activeUrl = $("#" + id).attr("active_image");
            $("#" + id).css({
                "background-image": "url(" + activeUrl + ")"
            });
        }
        else if (li_img.indexOf('unactive_image') == -1) {
            var unactiveUrl = $("#" + id).attr("unactive_image");
            $("#" + id).css({
                "background-image": "url(" + unactiveUrl + ")"
            });
        }
    }



    //获取当前点击的pid，如果为父标签，则pid属性为0，如果为子标签pid属性大于0
    var pid = $("#" + id).attr("pid");
    if (pid > 0) {//子标签
        var unactiveNum = 0;//定义一个变量，记录未激活的图标子标签的个数
        $("#" + id).siblings().each(function () {//循环子标签的所有同级标签，不包含当前点击的这一个
            var children_img = $(this).css("background-image");//得到子标签同级标签的图标
            if (children_img.indexOf('unactive_image') > 0) {//如果同级标签的图标为未激活图标，则+1
                unactiveNum++;
            }
            else {
                return;
            }
        })
        if ($("#" + id).css("background-image").indexOf('unactive_image') > 0) {//获取当前点击的子标签的图标，如果未激活则+1
            unactiveNum++;
        }
        var childrenNum = $("#" + id).siblings().length;//获取点击子标签的同级标签的个数
        if (unactiveNum == childrenNum + 1) {//如果未激活图标的数目如果等于点击的子标签和它的同级标签的总数，说明子标签都是未激活图标
            var unactiveImg = $("#" + pid).attr("unactive_image");//得到子标签的父级标签的未激活图标属性
            $("#" + pid).css({
                "background-image": "url(" + unactiveImg + ")"
            });//将父级图标设为未激活
        }
        if (unactiveNum == 0) {//如果未激活图标数目为0，则说明都是激活图标
            var activeImg = $("#" + pid).attr("active_image");//得到子标签的父级标签的激活图标属性
            $("#" + pid).css({
                "background-image": "url(" + activeImg + ")"
            });//将父级图标设为激活图标
        }
    }
    else {//父标签：两种情况，1、没有子标签 2、有子标签
        var children = $("#" + id + " ul").children();//父级标签下的ul标签下的所有子标签
        if (children.length > 0) {//如果子标签数目大于0，有子标签
            var parent_img = $("#" + id).css("background-image");//获取父级的图标
            if (parent_img.indexOf('unactive_image') > 0) {//如果父级的图标为未激活图标
                $("#" + id + " >ul >li").each(function () {//循环父级标签下的ul标签下的所有li子标签
                    var unactiveImg = $(this).attr("unactive_image");//获取子标签的未激活图标属性
                    $(this).css({
                        "background-image": "url(" + unactiveImg + ")"
                    });//将子标签的图标换成未激活的图标
                });
            }
            if (parent_img.indexOf('unactive_image') == -1) {//如果父级的图标为激活图标
                $("#" + id + " >ul >li").each(function () {//循环父级标签下的ul标签下的所有li子标签
                    var activeImg = $(this).attr("active_image");//获取子标签的激活图标属性
                    $(this).css({
                        "background-image": "url(" + activeImg + ")"
                    });//将子标签的图标换成激活的图标
                });
            }
        }
        else {//没有子标签 
            return;
        }
    }

}
//设备工具栏的单击事件
function deviceToolClick(id) {
    //获取页面地图容器的div：mapContainer的自定义类型currentMapType的值,1为2D，2为2.5D，3为楼内图
    var currentMapType = $("#mapContainer").attr("currentMapType");
    if (currentMapType == 1 || currentMapType == 2) {//主图上的设备
        var myLayerGroup = deviceLayerGroup;//2D图的layerGroup，在本js中
    }
    if (currentMapType == 3) {//楼内图上的设备
        var myLayerGroup = floorDeviceLayerGroup;//楼内图layerGroup，在楼内图的js中
    }
    var isLayerChange = false;//判断这次工具栏的点击是否有图层的显示和隐藏
    var isShow = $("#" + id).attr("isShow");
    myLayerGroup.eachLayer(function (layer) {
        if ("device_" + layer.userDefined != id && "device_" + layer.parentID == id) {//点击为父设备
            var featureGroup = layer;
            if (featureGroup.show == true && isShow == 1) {
                markerShowHide(featureGroup, 0);
                featureGroup.show = false;
                $("#" + id).attr("isShow", 0);
                var unactiveUrl = $("#" + id).attr("unactive_image");
                $("#" + id).css({
                    "background-image": "url(" + unactiveUrl + ")"
                });
                isLayerChange = true;
            }
            else if (featureGroup.show == false && isShow == 0) {
                markerShowHide(featureGroup, 1);
                featureGroup.show = true;
                $("#" + id).attr("isShow", 1);
                var activeUrl = $("#" + id).attr("active_image");
                $("#" + id).css({
                    "background-image": "url(" + activeUrl + ")"
                });
                isLayerChange = true;
            }


        }

        if ("device_" + layer.userDefined == id && layer.parentID == 0) {//父设备本身为子设备
            var featureGroup = layer;
            if (featureGroup.show == true && isShow == 1) {
                markerShowHide(featureGroup, 0);
                featureGroup.show = false;
                $("#" + id).attr("isShow", 0);
                var unactiveUrl = $("#" + id).attr("unactive_image");
                $("#" + id).css({
                    "background-image": "url(" + unactiveUrl + ")"
                });
                isLayerChange = true;
            }
            else if (featureGroup.show == false && isShow == 0) {
                markerShowHide(featureGroup, 1);
                featureGroup.show = true;
                $("#" + id).attr("isShow", 1);
                var activeUrl = $("#" + id).attr("active_image");
                $("#" + id).css({
                    "background-image": "url(" + activeUrl + ")"
                });
                isLayerChange = true;
            }
        }
        if ("device_" + layer.userDefined == id && layer.parentID > 0) {//点击子设备
            var featureGroup = layer;
            if (featureGroup.show == true && isShow == 1) {
                markerShowHide(featureGroup, 0);
                featureGroup.show = false;
                $("#" + id).attr("isShow", 0);
                var unactiveUrl = $("#" + id).attr("unactive_image");
                $("#" + id).css({
                    "background-image": "url(" + unactiveUrl + ")"
                });
                isLayerChange = true;
            }
            else if (featureGroup.show == false && isShow == 0) {
                markerShowHide(featureGroup, 1);
                featureGroup.show = true;
                $("#" + id).attr("isShow", 1);
                var activeUrl = $("#" + id).attr("active_image");
                $("#" + id).css({
                    "background-image": "url(" + activeUrl + ")"
                });
                isLayerChange = true;
            }
        }
    });

    //当地图上没有图层发生显隐性时候，工具栏的图标也发生变化
    if (isLayerChange == false) {
        var li_img = $("#" + id).css("background-image");
        if (li_img.indexOf('unactive_image') > 0) {
            var activeUrl = $("#" + id).attr("active_image");
            $("#" + id).css({
                "background-image": "url(" + activeUrl + ")"
            });
            $("#" + id).attr("isShow", 1);
        }
        else if (li_img.indexOf('unactive_image') == -1) {
            var unactiveUrl = $("#" + id).attr("unactive_image");
            $("#" + id).css({
                "background-image": "url(" + unactiveUrl + ")"
            });
            $("#" + id).attr("isShow", 0);
        }
    }

    //获取当前点击的pid，如果为父标签，则pid属性为0，如果为子标签pid属性大于0
    var pid = $("#" + id).attr("pid");
    if (pid.split("device_")[1] > 0) {//子标签
        var unactiveNum = 0;//定义一个变量，记录未激活的图标子标签的个数
        $("#" + id).siblings().each(function () {//循环子标签的所有同级标签，不包含当前点击的这一个
            var children_isShow = $(this).attr("isShow");
            if (children_isShow == 0) {
                unactiveNum++;
            }
            else {
                return;
            }
        })
        if ($("#" + id).attr("isShow") == 0) {//获取当前点击的子标签的图标，如果未激活则+1
            unactiveNum++;
        }
        var childrenNum = $("#" + id).siblings().length;//获取点击子标签的同级标签的个数
        if (unactiveNum == childrenNum + 1) {//如果未激活图标的数目如果等于点击的子标签和它的同级标签的总数，说明子标签都是未激活图标
            var unactiveImg = $("#" + pid).attr("unactive_image");//得到子标签的父级标签的未激活图标属性
            $("#" + pid).css({
                "background-image": "url(" + unactiveImg + ")"
            });//将父级图标设为未激活
            $("#" + pid).attr("isShow", 0);
        }
        if (unactiveNum == 0) {//如果未激活图标数目为0，则说明都是激活图标
            var activeImg = $("#" + pid).attr("active_image");//得到子标签的父级标签的激活图标属性
            $("#" + pid).css({
                "background-image": "url(" + activeImg + ")"
            });//将父级图标设为激活图标
            $("#" + pid).attr("isShow", 1);
        }
    }
    else {//父标签：两种情况，1、没有子标签 2、有子标签
        var children = $("#" + id + " ul").children();//父级标签下的ul标签下的所有子标签
        if (children.length > 0) {//如果子标签数目大于0，有子标签
            //var parent_img = $("#" + id).css("background-image");//获取父级的图标
            var parent_isShow = $("#" + id).attr("isShow");//获取父级的图标
            if (parent_isShow == 0) {//如果父级的图标为未激活图标
                $("#" + id + " >ul >li").each(function () {//循环父级标签下的ul标签下的所有li子标签
                    var unactiveImg = $(this).attr("unactive_image");//获取子标签的未激活图标属性
                    $(this).css({
                        "background-image": "url(" + unactiveImg + ")"
                    });//将子标签的图标换成未激活的图标
                    $(this).attr("isShow", 0);
                });
            }
            if (parent_isShow == 1) {//如果父级的图标为激活图标
                $("#" + id + " >ul >li").each(function () {//循环父级标签下的ul标签下的所有li子标签
                    var activeImg = $(this).attr("active_image");//获取子标签的激活图标属性
                    $(this).css({
                        "background-image": "url(" + activeImg + ")"
                    });//将子标签的图标换成激活的图标
                    $(this).attr("isShow", 1);
                });
            }
        }
        else {//没有子标签 
            return;
        }
    }

}
//设备的单击事件
function deviceMarkerClick(e) {
    vedioPopupClose();
    var marker = this;
    currentClickMarker = marker;
    marker.setIcon(L.icon({ iconUrl: marker.flash_image, iconSize: [15.15, 23] }));//设置为闪光的图标
    if (marker.semiCircle && $("#semiCircleControl").attr("isShow") == 0) {//如果没有全部显示扇形，并且这个marker存在扇形
        semiCircleGroup.addLayer(marker.semiCircle);
    }
    if (marker.device_type == 1 || marker.device_type == 2 || marker.device_type == 3 || marker.device_type == 4) {
        //csm.mapContainer.closePopup();
        if (marker.device_type == 1 || marker.device_type == 3) {//固定摄像机
            $("#playControllDiv").removeClass("videoplayer-round").addClass("videoplayer-round2");//外框
            $("#playTop").removeClass("playerionc1").addClass("playerionc01");//上
            $("#playBottom").removeClass("playerionc2").addClass("playerionc02");//下
            $("#playLeft").removeClass("playerionc3").addClass("playerionc03");//左
            $("#playRight").removeClass("playerionc4").addClass("playerionc04");//右
            $("#playLeftTop").removeClass("playerionc5").addClass("playerionc05");//左上
            $("#playRightTop").removeClass("playerionc6").addClass("playerionc06");//右上
            $("#playLeftBottom").removeClass("playerionc7").addClass("playerionc07");//左下
            $("#playRightBottom").removeClass("playerionc8").addClass("playerionc08");//右下
            $("#playMiddle").removeClass("playerionc9").addClass("playerionc09");//中间
        } else {//云台
            $("#playControllDiv").removeClass("videoplayer-round2").addClass("videoplayer-round");//外框
            $("#playTop").removeClass("playerionc01").addClass("playerionc1");//上
            $("#playBottom").removeClass("playerionc02").addClass("playerionc2");//下
            $("#playLeft").removeClass("playerionc03").addClass("playerionc3");//左
            $("#playRight").removeClass("playerionc04").addClass("playerionc4");//右
            $("#playLeftTop").removeClass("playerionc05").addClass("playerionc5");//左上
            $("#playRightTop").removeClass("playerionc06").addClass("playerionc6");//右上
            $("#playLeftBottom").removeClass("playerionc07").addClass("playerionc7");//左下
            $("#playRightBottom").removeClass("playerionc08").addClass("playerionc8");//右下
            $("#playMiddle").removeClass("playerionc09").addClass("playerionc9");//中间
        }
        closeOtherPopup();
        $("#cameraName").html(marker.device_name);
        vedioPopup.setLatLng(marker.getLatLng());
        //右上角报警确警按钮隐藏
        $("#alarmRightTop").css("display", "none");
        //替换云台控制器的样式
        $("#videoRoundness").removeClass("videoplayer-function videoplayer-two").addClass("videoplayer-function videoplayer-function2 videoplayer-two");
        //隐藏报警列表
        $("#alarmList").css("display", "none");
        //显示视频下侧按钮
        $("#videoBottom").css("display", "block");
        //控件随地图的移动而移动
        var marginTop = $("#h3c_IMOS_ActiveX").css("margin-top");
        if (marginTop == "2px") {
            $("#h3c_IMOS_ActiveX").css("margin-top", "1px");
        } else {
            $("#h3c_IMOS_ActiveX").css("margin-top", "2px");
        }
        //让控件显示出来
        document.getElementById("h3c_IMOS_ActiveX").width = "100%";
        document.getElementById("h3c_IMOS_ActiveX").height = "100%";
        mapVideo.deviceCode = marker.device_code;
        //播放视频
        var deviceCodes = [];
        deviceCodes.push(marker.device_code);
        videoClassify.playVideo(deviceCodes);
    }
    //else if (marker.device_type > 4) {
    //    var myPopup = L.popup({ maxWidth: 500, maxHeight: 400 })
    //               .setLatLng(marker.getLatLng())
    //               .setContent(htmltext)
    //               .openOn(csm.mapContainer);
    //}
}
//设备绑定popup
function markerBindPopup(marker) {
    var myMarker = marker;
    if (myMarker.device_type == 1 || myMarker.device_type == 2 || myMarker.device_type == 3 || myMarker.device_type == 4) {
        //$("#cameraName").text(myMarker.device_name);
        ////myMarker.bindPopup($("#vedioPlayer").html(), { maxWidth: 1500, maxHeight: 1600, offset: L.point(0, 1) });
        //myMarker.bindPopup(vedioPopup);
        //myMarker.on('popupopen', function () {
        //    //myMarker.setIcon(L.icon({ iconUrl: myMarker.flash_image, iconSize: [15.15, 23] }));
        //    vedioPopupClose();
        //});
        //myMarker.on('popupclose', function () {
        //    //myMarker.setIcon(L.icon({ iconUrl: myMarker.normal_image, iconSize: [15.15, 23] }));
        //})
    }
    else if (myMarker.device_type > 4) {
        $("#deviceNamePopup").html(myMarker.device_name);
        if (myMarker.popup_image != 0) {
            $("#deviceInfoImg").css({
                "background-image": "url(" + myMarker.popup_image + ")"
            });//将popup图标置换

        }
        else if (myMarker.popup_image == 0) {
            $("#deviceInfoImg").css({
                "background-image": "url(../images/map/deviceMapIcon/popup_image/default-device.jpg)"
            });//将popup图标置换
        }
        myMarker.bindPopup($("#devicePopup").html(), {
            maxWidth: 1500, maxHeight: 1600, offset: L.point(0, 1), autoClose: true, autoPan: true
        });
        myMarker.on('popupopen', function () {
            vedioPopupClose();
            csm.mapContainer.setView(myMarker.getLatLng());
        });
        //myMarker.on('popupclose', function () {
        //})
    }
    return myMarker;
}
function closeOtherPopup() {
    if ($("#mapContainer").attr("currentMapType") == 1) {
        deviceLayerGroup.eachLayer(function (featureLayer) {
            featureLayer.eachLayer(function (layer) {
                layer.closePopup();
            });

        });
        areaLayerGroup.eachLayer(function (featureLayer) {
            featureLayer.eachLayer(function (layer) {
                layer.closePopup();
            });

        });

    }
    else if ($("#mapContainer").attr("currentMapType") == 2) {
        deviceLayerGroup.eachLayer(function (featureLayer) {
            featureLayer.eachLayer(function (layer) {
                layer.closePopup();
            });

        });
        areaLayerGroup.eachLayer(function (featureLayer) {
            featureLayer.eachLayer(function (layer) {
                layer.closePopup();
            });

        });
    }
    else if ($("#mapContainer").attr("currentMapType") == 3) {
        floorDeviceLayerGroup.eachLayer(function (featureLayer) {
            featureLayer.eachLayer(function (layer) {
                layer.closePopup();
            });

        });
    }
}
//将设备工具栏的图标重新设置一遍设置为激活的图标，在楼内图和主图切换之间调用
function resetDeviceToolIcon() {
    $("#leftFloat >li").each(function () {//循环父级标签li标签
        var activeImg = $(this).attr("active_image");//获取父标签的激活图标属性
        $(this).css({
            "background-image": "url(" + activeImg + ")"
        });//将父标签的图标换成激活的图标
    });
    $(".sub-leftfloat >li").each(function () {////循环父级标签下的ul标签下的所有li子标签
        var activeImgChildren = $(this).attr("active_image");//获取子标签的激活图标属性
        $(this).css({
            "background-image": "url(" + activeImgChildren + ")"
        });//将父标签的图标换成激活的图标
    });

    //重置扇形的图标
    semiCircleGroup.clearLayers();//清除扇形图层的全部的要素
    $("#semiCircleControl").attr("isShow", 0);
    var unActiveImg = $("#semiCircleControl").attr("unactive_image");//获取未激活图标属性
    $("#semiCircleControl").css({
        "background-image": "url(" + unActiveImg + ")"
    });
}
//创建扇形
//坐标,半径，覆盖角度，设备朝向
function createSemiCircle(position, visual_range, cover_range, camera_towards) {
    var starAngle = null;
    switch (camera_towards) {
        case 1://    东 ,
            starAngle = 90;
            break;
        case 2://    西,
            starAngle = 270;
            break;
        case 3://    南,
            starAngle = 180;
            break;
        case 4://    北,
            starAngle = 0;
            break;
        case 5://    东北,
            starAngle = 45;
            break;
        case 6://    西北,
            starAngle = 315;
            break;
        case 7://    东南,
            starAngle = 135;
            break;
        case 8://    西南
            starAngle = 225;
            break;
        default:

    }
    if (position && visual_range && cover_range && camera_towards) {
        //L.circle(position, { radius: Number(visual_range) })
        //    .setDirection(Number(camera_towards), Number(cover_range))
        //    .addTo(csm.mapContainer);

        //var semiCircle = L.circle(position, {
        //    color: "#000000",
        //    fillColor: "#104E8B",
        //    weight: 0.5,
        //    radius: Number(visual_range),
        //    startAngle: 0,
        //    stopAngle: 45
        //});
        var semiCircle;
        if (cover_range == 360) {
            semiCircle = L.circle(position, {
                radius: Number(visual_range),
                color: "#CCFAA8",
                fillColor: "#CCFAA8",
                fillOpacity: 0.6,
                weight: 1
            });
        }
        else {
            semiCircle = L.circle(position, {
                radius: Number(visual_range),
                color: "#104E8B",
                fillColor: "#104E8B",
                fillOpacity: 0.4,
                weight: 1
            }).setDirection(starAngle, cover_range);
        }

        return semiCircle;

    }
    else {
        return null;
    }
}
//扇形工具栏的单击事件
function semiCircleShowHide() {
    var currentMapType = $("#mapContainer").attr("currentMapType");
    if ($("#semiCircleControl").attr("isShow") == 1) {//扇形是显示的
        semiCircleGroup.clearLayers();//清除扇形图层的全部的要素
        $("#semiCircleControl").attr("isShow", 0);
        var unActiveImg = $("#semiCircleControl").attr("unactive_image");//获取未激活图标属性
        $("#semiCircleControl").css({
            "background-image": "url(" + unActiveImg + ")"
        });
    }
    else if ($("#semiCircleControl").attr("isShow") == 0) {//扇形是隐藏的
        //获取页面地图容器的div：mapContainer的自定义类型currentMapType的值,1为2D，2为2.5D，3为楼内图
        var currentMapType = $("#mapContainer").attr("currentMapType");
        if (currentMapType == 1 || currentMapType == 2) {//主图上的设备
            var myLayerGroup = deviceLayerGroup;//2D图的layerGroup，在本js中
        }
        if (currentMapType == 3) {//楼内图上的设备
            var myLayerGroup = floorDeviceLayerGroup;//楼内图layerGroup，在楼内图的js中
        }
        myLayerGroup.eachLayer(function (featureLayer) {
            if (featureLayer.deviceType == 1 || featureLayer.deviceType == 2 || featureLayer.deviceType == 3 || featureLayer.deviceType == 4) {
                featureLayer.eachLayer(function (deviceMarker) {
                    if (deviceMarker.semiCircle) {
                        deviceMarker.semiCircle.addTo(semiCircleGroup);
                    }
                });
            }
        });
        $("#semiCircleControl").attr("isShow", 1);
        var activeImg = $("#semiCircleControl").attr("active_image");//获取激活图标属性
        $("#semiCircleControl").css({
            "background-image": "url(" + activeImg + ")"
        });
    }

    function setImg(state, deviceCode) {

    }

    //if ($("#semiCircleControl").attr("isShow") == 1) {//扇形是显示的
    //    csm.mapContainer.removeLayer(semiCircleGroup);
    //    $("#semiCircleControl").attr("isShow", 0);
    //    var unActiveImg = $("#semiCircleControl").attr("unactive_image");//获取未激活图标属性
    //    $("#semiCircleControl").css({
    //        "background-image": "url(" + unActiveImg + ")"
    //    });
    //}
    //else if ($("#semiCircleControl").attr("isShow") == 0) {//扇形是隐藏的
    //    csm.mapContainer.addLayer(semiCircleGroup);
    //    $("#semiCircleControl").attr("isShow", 1);
    //    var activeImg = $("#semiCircleControl").attr("active_image");//获取激活图标属性
    //    $("#semiCircleControl").css({
    //        "background-image": "url(" + activeImg + ")"
    //    });
    //}
}

//function createSemiCircle() {
//    //L.circle(csm.center, {
//    //    radius: 500,
//    //    startAngle: 45,
//    //    stopAngle: 135
//    //}).addTo(csm.mapContainer);

//    L.circle(csm.center, { radius: 500 })
//    .setDirection(350, 360)
//    .addTo(csm.mapContainer);
//}



//快速查看预案2017/3/17 乔
function quickViewPlan(device) {
    //当前用户是否拥有这个园区的权限
    var regionidList = $("input[name=mainControlRegion]");
    var result = false;
    for (var i = 0; i < regionidList.length; i++) {
        if (regionidList[i].value == device.region_id) {
            result = true;
        }
    }
    if (result == true) {
        $.ajax({
            url: "/Plan/ViewRelatedPlans",
            type: "post",
            data: "&deviceId=" + device.id,
            datatype: 'json',
            async: false,
            success: function (data) {
                if (data.status == 0) {
                    if (data.msg.length > 0) {
                        if (confirm("以获取与该设备有关的" + data.msg.length + "条预案，你是否要跳转页面查看详情！")) {
                            window.location.href = "/Plan/Index?deviceId=" + device.id;
                        }
                    }
                    else {
                        alert("没有查到与该设备有关的预案");
                    }
                }
                else {
                    alert("快速查看预案出现" + data.msg + "错误请联系管理员！");
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("快速查看预案出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    }
    else {
        alert("你没有该设备所在园区的权限所以无法查看预案!");
    }
}

//快速注册预案2017/3/17 乔
function fastRegistrationPlan(device) {
    var regionidList = $("input[name=mainControlRegion]");
    var result = false;
    var regionId = 0;
    for (var i = 0; i < regionidList.length; i++) {
        if (regionidList[i].value == device.region_id) {
            result = true;
        }
    }
    if (result == true) {
        if ($.cookie("mainControlRegionId")) {
            regionId = $.cookie("mainControlRegionId")
        }
        if (regionId == device.region_id) {
            if (confirm("你是否要跳转到设备预案注册页面，注册与改设备有关的预案")) {
                window.location.href = "/Plan/DeviceCreate?deviceId=" + device.id + "&deviceType=" + device.device_type + "&regionId=" + device.region_id;
            }
        }
        else {
            alert("请先切换主控园区在点击该设备注册预案");
        }
    }
    else {
        alert("你没有该设备所在园区的权限所以无法查看预案!");
    }
}
//批量配置预案 乔
function batchConfigurationPlan(device) {
    var regionidList = $("input[name=mainControlRegion]");
    var result = false;
    var regionId = 0;
    for (var i = 0; i < regionidList.length; i++) {
        if (regionidList[i].value == device.region_id) {
            result = true;
        }
    }
    if (result == true) {
        if ($.cookie("mainControlRegionId")) {
            regionId = $.cookie("mainControlRegionId")
        }
        if (regionId == device.region_id) {
            var deviceType = getDeviceTypeName(device.device_type);
            if (confirm("你已选择" + deviceType + "类设备是否要跳转到设备预案批量注册页面，注册该类设备预案")) {
                window.location.href = "/Plan/DeviceBatchCreate?deviceId=" + device.id + "&deviceType=" + device.device_type + "&regionId=" + device.region_id + "&inbuildingId=" + device.is_inbuilding;
            }
        }
        else {
            alert("请先切换主控园区在点击该设备注册预案");
        }
    }
    else {
        alert("你没有该设备所在园区的权限所以无法查看预案!");
    }

}


//根据设备类型id获取设备类型名称
function getDeviceTypeName(Id) {
    var deviceType = "";
    $.ajax({
        url: "/Map/DeviceTypeName",
        type: "post",
        data: "Id=" + Id,
        datatype: "json",
        async: false,
        success: function (data) {
            if (data.status == 0) {
                deviceType = data.msg;
            }
            else {
                alert("获取设备类型名称出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取设备类型名称出现" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
    return deviceType;
}


