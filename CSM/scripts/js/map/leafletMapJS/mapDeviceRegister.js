var ICONPATH = '../images/map/deviceMapIcon/normal_image/';
var moveMarker = null;//地图上注册设备，初始到地图上的marker，图标为leaflet自带的图标，若注册成功，则更换为对应设备的图标，初始的位置为地图的中心位置
var CURRENT_UPDATE_MARKER = null;//修改时候的marker对象
var deviceMarkerFeatureGroup = L.featureGroup();//存放显示所有已注册的设备marker的图层
var floorDeviceLayerGroup = L.featureGroup();//所有的楼内图设备的图层
csm.floorMap = null;
var isClickFloor = false;//楼内图设备注册，得先双击楼内图的树节点，显示楼内图，才能双击设备树的节点在上面打点
$(function () {
    deviceMarkerFeatureGroup.addTo(csm.mapContainer);
    floorDeviceLayerGroup.addTo(csm.mapContainer);
    GetAllDevice();
});
//左侧树双击后调用这个方法在地图上标注marker
function AddMoveMarker(id) {
    if ($("#mapContainer").attr("currentMapType") == 1) {
        if (moveMarker) {
            moveMarker.setLatLng(csm.center);
        }
        else {
            moveMarker = L.marker(csm.center, { draggable: true });
            moveMarker.addTo(csm.mapContainer);
            moveMarker.on('click', function (e) {
                var moveMarkerLatlng = this.getLatLng().lat + "," + this.getLatLng().lng;//当前marker的经纬度
                $("#lonLat").val(moveMarkerLatlng);
                showAddDeviceDialog();
                $("#is_inbuilding").val(-1);
            });
        }
    }

    else if ($("#mapContainer").attr("currentMapType") == 2) {
        if (moveMarker) {
            moveMarker.setLatLng(csm.mapCenter25D);
        }
        else {
            moveMarker = L.marker(csm.mapCenter25D, { draggable: true });
            moveMarker.addTo(csm.mapContainer);
            moveMarker.on('click', function (e) {
                //var moveMarkerLatlng = this.getLatLng().lat + "," + this.getLatLng().lng;//当前marker的经纬度
                if (!confirm("确定要将设备注册到该位置吗")) {
                    RemoveMoveMarker();
                    return;
                }
                var lat25D = this.getLatLng().lat;
                var lng25D = this.getLatLng().lng;
                //lat25D = csm.mapContainer.project([lat25D, lng25D], csm.mapContainer.getMaxZoom()).x;
                //lng25D = csm.mapContainer.project([lat25D, lng25D], csm.mapContainer.getMaxZoom()).y;
                var p = csm.mapContainer.project([lat25D, lng25D], csm.mapContainer.getMaxZoom());
                lat25D = p.x;
                lng25D = p.y;
                var issuccess = registerDevice25D(id, lng25D, lat25D);

                if (issuccess == true) {
                    deviceMarkerFeatureGroup.eachLayer(function (deviceMarker) {
                        if (deviceMarker.id == id) {
                            //lat25D = csm.mapContainer.unproject([lat25D, lng25D], csm.mapContainer.getMaxZoom()).lat;
                            //lng25D = csm.mapContainer.unproject([lat25D, lng25D], csm.mapContainer.getMaxZoom()).lng;
                            deviceMarker.local_longitude = lng25D;
                            deviceMarker.local_latitude = lat25D;

                            deviceMarker.setLatLng(csm.mapContainer.unproject([deviceMarker.local_latitude, deviceMarker.local_longitude], csm.mapContainer.getMaxZoom()));
                        }
                    });
                    RemoveMoveMarker();
                    LoadDeviceListTree25D();
                    //完成就从树中移除节点
                }

            });
        }
    }

    if ($("#mapContainer").attr("currentMapType") == 3) {
        if (isClickFloor == false) {
            alert("请先双击要注册设备的楼内图！");
            return;
        }
        if (moveMarker) {
            moveMarker.setLatLng(csm.mapContainer.getCenter());
        }
        else {
            moveMarker = L.marker(csm.mapContainer.getCenter(), { draggable: true });
            moveMarker.addTo(csm.mapContainer);
            moveMarker.on('click', function (e) {
                var moveMarkerLatlng = this.getLatLng().lat + "," + this.getLatLng().lng;//当前marker的经纬度
                $("#lonLat").val(moveMarkerLatlng);
                showAddDeviceDialog();
            });
        }
    }
}
//设置marker图标，在注册成功之后，marker的图标由leaflet默认的变为注册时所选择的那个图标
function SetMarkerIcon(iconName, options) {
    var latlngStr = $("#lonLat").val().split(',');//获取隐藏域上坐标的值，是双击moveMarker传上去的
    var latlng = [latlngStr[0], latlngStr[1]];
    var deviceIcon = L.icon({ iconUrl: iconName, iconSize: [15.15, 23] });//创建leaflet的icon对象
    var deviceMarker = L.marker(latlng, {
        icon: deviceIcon,
        contextmenu: true,
        contextmenuInheritItems: false,
        contextmenuItems: [{
            text: '修改',
            callback: UpdateMarker
        }, {
            text: '删除',
            callback: DeleteMarker
        }]
    });
    deviceMarker.id = options.id;//主键
    deviceMarker.device_code = options.device_code; //设备编号
    deviceMarker.is_parts = options.is_parts; //复合设备
    deviceMarker.device_name = options.device_name; //设备名称
    deviceMarker.device_type = options.device_type; //设备类型
    deviceMarker.subsystem_id = options.subsystem_id; //子系统编号
    deviceMarker.longitude = options.longitude; //经度
    deviceMarker.latitude = options.latitude; // 纬度
    deviceMarker.register_time = options.register_time; //注册时间
    deviceMarker.search_code = options.search_code; //设备搜索缩写
    deviceMarker.local_longitude = options.local_longitude;//本地X轴（经度）
    deviceMarker.local_latitude = options.local_latitude;//本地Y轴（纬度）
    deviceMarker.device_status = options.device_status;//设备状态
    deviceMarker.update_status_time = options.update_status_time;//状态修改时间
    deviceMarker.cover_range = options.cover_range;//覆盖角度
    deviceMarker.camera_towards = options.camera_towards;//设备朝向
    deviceMarker.visual_range = options.visual_range;//覆盖半径
    deviceMarker.asset_code = options.asset_code;//资产编号
    deviceMarker.org_id = options.org_id;//所属部门
    deviceMarker.manufactor = options.manufactor;//厂家
    deviceMarker.asset_model = options.asset_model;//型号
    deviceMarker.create_time = options.create_time;//出厂日期
    deviceMarker.guarantee_time = options.guarantee_time;//保修期
    deviceMarker.asset_status = options.asset_status;//资产状态
    deviceMarker.asset_ip = options.asset_ip;//ip地址
    deviceMarker.port = options.port;//端口
    deviceMarker.mac_code = options.mac_code;//mac地址
    deviceMarker.serial_number = options.serial_number;//序列号
    deviceMarker.manager_id = options.manager_id;//负责人ID
    deviceMarker.is_inbuilding = options.is_inbuilding;//是否在楼内
    deviceMarker.room_id = options.room_id;//房间号
    deviceMarker.region_id = options.region_id;//园区编号
    deviceMarker.area_id = options.area_id;//区域编号
    deviceMarker.ext1 = options.ext1;//及时回放
    deviceMarker.ext2 = options.ext2;//多路播放
    deviceMarker.ext3 = options.ext3;//上大墙
    deviceMarker.ext4 = options.ext4;//历史回放
    deviceMarker.normal_image = iconName;//添加marker成功后，传过来的icon的地址，在修改时候取消修改，可恢复到修改前的,这个不是数据库里面的字段
    deviceMarker.bindTooltip(deviceMarker.device_name);
    if ($("#mapContainer").attr("currentMapType") == 3) {//如果注册的是楼内图，就放在楼内图的featureGroup中去
        deviceMarker.addTo(floorDeviceLayerGroup);
    }
    else if ($("#mapContainer").attr("currentMapType") == 1) {//二维/2.5D就放到对应的featureLayer中去
        deviceMarker.addTo(deviceMarkerFeatureGroup);
    }
}
//将moveMarker从地图上移除
function RemoveMoveMarker() {
    //将moveMarker从地图上移除
    csm.mapContainer.removeLayer(moveMarker);
    //将moveMarker重新初始化
    moveMarker = null;
}
//从数据库中读取所有的设备并添加到地图上
function GetAllDevice() {
    //var ballIcon = L.icon({ iconUrl: ICONPATH + '球机.png', iconSize: [15.15, 23] });//创建leaflet的icon对象
    for (var i = 0; i < AllDeviceInfo.length; i++) {
        var deviceObj = AllDeviceInfo[i];
        //只有下面三个属性提取了，才能创建marker
        var latitude = deviceObj.latitude;
        var longitude = deviceObj.longitude;
        var device_type = deviceObj.device_type;
        var is_inbuilding = deviceObj.is_inbuilding;
        if (is_inbuilding == -1) {//判断为楼外的设备
            //创建marker
            var deviceMarker = L.marker([latitude, longitude], {
                icon: L.icon({ iconUrl: deviceObj.normal_image, iconSize: [15.15, 23] }),
                contextmenu: true,
                contextmenuInheritItems: false,
                contextmenuItems: [{
                    text: '修改',
                    callback: UpdateMarker
                }, {
                    text: '删除',
                    callback: DeleteMarker
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
            deviceMarker.etx1 = deviceObj.ext1;//及时回放
            deviceMarker.etx2 = deviceObj.ext2;//多路播放
            deviceMarker.etx3 = deviceObj.ext3;//上大墙
            deviceMarker.etx4 = deviceObj.ext4;//历史回放
            deviceMarker.defined_device_typeid = deviceObj.defined_device_typeid;//自定义设备类型id
            deviceMarker.defined_device_name = deviceObj.defined_device_name;//自定义设备类型名称
            deviceMarker.active_image = deviceObj.active_image;//设备显示图标
            deviceMarker.unactive_image = deviceObj.unactive_image;//设备隐藏图标
            deviceMarker.normal_image = deviceObj.normal_image;//正常图标
            deviceMarker.error_image = deviceObj.error_image;//错误图标
            deviceMarker.flash_image = deviceObj.flash_image;//闪光图标
            deviceMarker.popup_image = deviceObj.popup_image;//设备弹出图片
            deviceMarker.pid = deviceObj.pid;//自定义设备类型pid
            deviceMarker.bindTooltip(deviceMarker.device_name);
            //deviceMarker.iconName = normalImage[device_type]; //这个不是数据库里面的字段,是根据设备类型的id直接取出设备图标的完整路径，方便用
            //将marker添加到图层里面去
            deviceMarkerFeatureGroup.addLayer(deviceMarker);
        }
    }
}
//删除的时候如果从数据库删除成功，那么就从地图上移除这个设备的marker
function DeleteMarker(e) {
    var currentMarker = e.relatedTarget;
    var isDelete = deleteDevice(currentMarker.device_code);
    if (isDelete == true) {
        //deviceMarkerFeatureGroup.eachLayer(function (layer) {
        //    if (layer.device_code == currentMarker.device_code) {
        //        deviceMarkerFeatureGroup.removeLayer(layer);
        //    }

        //});
        if ($("#mapContainer").attr("currentMapType") == 3) {
            floorDeviceLayerGroup.removeLayer(currentMarker);
        }
        else {
            deviceMarkerFeatureGroup.removeLayer(currentMarker);
        }
    }
    else {
        return;
    }

}
//地图上设备右键的修改事件
function UpdateMarker(e) {
    if (CURRENT_UPDATE_MARKER) {//这样避免当修改其中一个时候没修改，又去修改另外一个
        cancelUpdate();
    }
    CURRENT_UPDATE_MARKER = e.relatedTarget;
    CURRENT_UPDATE_MARKER.dragging.enable();
    CURRENT_UPDATE_MARKER.setIcon(L.icon({ iconUrl: "../scripts/js/map/mapRootJS/Leaflet_1.0/images/marker-icon.png", iconSize: [15.15, 23] }))
    var oldOptions = {};
    oldOptions.id = CURRENT_UPDATE_MARKER.id;//主键
    oldOptions.device_code = CURRENT_UPDATE_MARKER.device_code; //设备编号
    oldOptions.is_parts = CURRENT_UPDATE_MARKER.is_parts; //复合设备
    oldOptions.device_name = CURRENT_UPDATE_MARKER.device_name; //设备名称
    oldOptions.device_type = CURRENT_UPDATE_MARKER.device_type; //设备类型
    oldOptions.subsystem_id = CURRENT_UPDATE_MARKER.subsystem_id; //子系统编号
    oldOptions.longitude = CURRENT_UPDATE_MARKER.longitude;//旧的坐标
    oldOptions.latitude = CURRENT_UPDATE_MARKER.latitude;//旧的坐标
    oldOptions.register_time = CURRENT_UPDATE_MARKER.register_time; //注册时间
    oldOptions.search_code = CURRENT_UPDATE_MARKER.search_code; //设备搜索缩写
    oldOptions.local_longitude = CURRENT_UPDATE_MARKER.local_longitude;//本地X轴（经度）
    oldOptions.local_latitude = CURRENT_UPDATE_MARKER.local_latitude;//本地Y轴（纬度）
    oldOptions.device_status = CURRENT_UPDATE_MARKER.device_status;//设备状态
    oldOptions.update_status_time = CURRENT_UPDATE_MARKER.update_status_time;//状态修改时间
    oldOptions.cover_range = CURRENT_UPDATE_MARKER.cover_range;//覆盖角度
    oldOptions.camera_towards = CURRENT_UPDATE_MARKER.camera_towards;//设备朝向
    oldOptions.visual_range = CURRENT_UPDATE_MARKER.visual_range;//覆盖半径
    oldOptions.asset_code = CURRENT_UPDATE_MARKER.asset_code;//资产编号
    oldOptions.org_id = CURRENT_UPDATE_MARKER.org_id;//所属部门
    oldOptions.manufactor = CURRENT_UPDATE_MARKER.manufactor;//厂家
    oldOptions.asset_model = CURRENT_UPDATE_MARKER.asset_model;//型号
    oldOptions.create_time = CURRENT_UPDATE_MARKER.create_time;//出厂日期
    oldOptions.guarantee_time = CURRENT_UPDATE_MARKER.guarantee_time;//保修期
    oldOptions.asset_status = CURRENT_UPDATE_MARKER.asset_status;//资产状态
    oldOptions.asset_ip = CURRENT_UPDATE_MARKER.asset_ip;//ip地址
    oldOptions.port = CURRENT_UPDATE_MARKER.port;//端口
    oldOptions.mac_code = CURRENT_UPDATE_MARKER.mac_code;//mac地址
    oldOptions.serial_number = CURRENT_UPDATE_MARKER.serial_number;//序列号
    oldOptions.manager_id = CURRENT_UPDATE_MARKER.manager_id;//负责人ID
    oldOptions.is_inbuilding = CURRENT_UPDATE_MARKER.is_inbuilding;//是否在楼内
    oldOptions.room_id = CURRENT_UPDATE_MARKER.room_id;//房间号
    oldOptions.region_id = CURRENT_UPDATE_MARKER.region_id;//园区编号
    oldOptions.area_id = CURRENT_UPDATE_MARKER.area_id;//区域编号
    oldOptions.ext1 = CURRENT_UPDATE_MARKER.ext1;//及时回放
    oldOptions.ext2 = CURRENT_UPDATE_MARKER.ext2;//多路播放
    oldOptions.ext3 = CURRENT_UPDATE_MARKER.ext3;//上大墙
    oldOptions.ext4 = CURRENT_UPDATE_MARKER.ext4;//历史回放
    CURRENT_UPDATE_MARKER.on('dblclick', function (e) {
        if ($("#mapContainer").attr("currentMapType") == 2) {//2.5维
            var p = csm.mapContainer.project(e.latlng, csm.mapContainer.getMaxZoom());
            oldOptions.local_longitude = p.y;
            oldOptions.local_latitude = p.x;
        }
        else {//2维或者楼内图
            oldOptions.longitude = e.latlng.lng;
            oldOptions.latitude = e.latlng.lat;
        }


        showUpdateDeviceDialog(oldOptions);
    });
}
//当更新弹窗取消时候的地图事件
function cancelUpdate() {
    //将修改的marker移动到它没修改前的位置
    if ($("#mapContainer").attr("currentMapType") == 2) {//2.5维
        CURRENT_UPDATE_MARKER.setLatLng([CURRENT_UPDATE_MARKER.local_latitude, CURRENT_UPDATE_MARKER.local_longitude]);
    }
    else if ($("#mapContainer").attr("currentMapType") == 1) {//2维
        CURRENT_UPDATE_MARKER.setLatLng([CURRENT_UPDATE_MARKER.latitude, CURRENT_UPDATE_MARKER.longitude]);
    }

    //将修改的marker的图标恢复到没改之前图标
    CURRENT_UPDATE_MARKER.setIcon(L.icon({ iconUrl: CURRENT_UPDATE_MARKER.normal_image, iconSize: [15.15, 23] }));
    //设置不可拖拽
    CURRENT_UPDATE_MARKER.dragging.disable();
    //注销掉双击事件
    CURRENT_UPDATE_MARKER.off('dblclick');
    CURRENT_UPDATE_MARKER = null;
}
//当更新弹窗确认时候的地图事件
function updateConfirm(newOptions) {
    //更新地图上当前修改的marker的属性
    CURRENT_UPDATE_MARKER.id = newOptions.id;//主键
    CURRENT_UPDATE_MARKER.device_code = newOptions.device_code; //设备编号
    CURRENT_UPDATE_MARKER.is_parts = newOptions.is_parts; //复合设备
    CURRENT_UPDATE_MARKER.device_name = newOptions.device_name; //设备名称
    CURRENT_UPDATE_MARKER.device_type = newOptions.device_type; //设备类型
    CURRENT_UPDATE_MARKER.subsystem_id = newOptions.subsystem_id; //子系统编号
    CURRENT_UPDATE_MARKER.longitude = newOptions.longitude; //经度
    CURRENT_UPDATE_MARKER.latitude = newOptions.latitude; // 纬度
    CURRENT_UPDATE_MARKER.register_time = newOptions.register_time; //注册时间
    CURRENT_UPDATE_MARKER.search_code = newOptions.search_code; //设备搜索缩写
    CURRENT_UPDATE_MARKER.local_longitude = newOptions.local_longitude;//本地X轴（经度）
    CURRENT_UPDATE_MARKER.local_latitude = newOptions.local_latitude;//本地Y轴（纬度）
    CURRENT_UPDATE_MARKER.device_status = newOptions.device_status;//设备状态
    CURRENT_UPDATE_MARKER.update_status_time = newOptions.update_status_time;//状态修改时间
    CURRENT_UPDATE_MARKER.cover_range = newOptions.cover_range;//覆盖角度
    CURRENT_UPDATE_MARKER.camera_towards = newOptions.camera_towards;//设备朝向
    CURRENT_UPDATE_MARKER.visual_range = newOptions.visual_range;//覆盖半径
    CURRENT_UPDATE_MARKER.asset_code = newOptions.asset_code;//资产编号
    CURRENT_UPDATE_MARKER.org_id = newOptions.org_id;//所属部门
    CURRENT_UPDATE_MARKER.manufactor = newOptions.manufactor;//厂家
    CURRENT_UPDATE_MARKER.asset_model = newOptions.asset_model;//型号
    CURRENT_UPDATE_MARKER.create_time = newOptions.create_time;//出厂日期
    CURRENT_UPDATE_MARKER.guarantee_time = newOptions.guarantee_time;//保修期
    CURRENT_UPDATE_MARKER.asset_status = newOptions.asset_status;//资产状态
    CURRENT_UPDATE_MARKER.asset_ip = newOptions.asset_ip;//ip地址
    CURRENT_UPDATE_MARKER.port = newOptions.port;//端口
    CURRENT_UPDATE_MARKER.mac_code = newOptions.mac_code;//mac地址
    CURRENT_UPDATE_MARKER.serial_number = newOptions.serial_number;//序列号
    CURRENT_UPDATE_MARKER.manager_id = newOptions.manager_id;//负责人ID
    CURRENT_UPDATE_MARKER.is_inbuilding = newOptions.is_inbuilding;//是否在楼内
    CURRENT_UPDATE_MARKER.room_id = newOptions.room_id;//房间号
    CURRENT_UPDATE_MARKER.region_id = newOptions.region_id;//园区编号
    CURRENT_UPDATE_MARKER.area_id = newOptions.area_id;//区域编号
    CURRENT_UPDATE_MARKER.ext1 = newOptions.ext1;//及时回放
    CURRENT_UPDATE_MARKER.ext2 = newOptions.ext2;//多路播放
    CURRENT_UPDATE_MARKER.ext3 = newOptions.ext3;//上大墙
    CURRENT_UPDATE_MARKER.ext4 = newOptions.ext4;//历史回放

    //设置不可拖拽
    CURRENT_UPDATE_MARKER.dragging.disable();
    //将修改的marker的图标由水滴恢复之前图标
    CURRENT_UPDATE_MARKER.setIcon(L.icon({ iconUrl: CURRENT_UPDATE_MARKER.normal_image, iconSize: [15.15, 23] }));
    //万一更改名字了，也重新更新名字
    CURRENT_UPDATE_MARKER.setTooltipContent(CURRENT_UPDATE_MARKER.device_name);
    //注销掉双击事件
    CURRENT_UPDATE_MARKER.off('dblclick');
    CURRENT_UPDATE_MARKER = null;
}
//2/2.5维切换时，切换树
function RegiterSwitchMap(switchMapType) {
    isClickFloor = false;
    switch (switchMapType) {
        case 1://2D
            if (csm.mapContainer.hasLayer(csm.baseMap25D) == true) { csm.mapContainer.removeLayer(csm.baseMap25D); }
            if (csm.mapContainer.hasLayer(csm.floorMap) == true) { csm.mapContainer.removeLayer(csm.floorMap); }
            csm.mapContainer.options.maxZoom = 20;
            csm.mapContainer.options.minZoom = 17;
            csm.baseMap.addTo(csm.mapContainer);
            csm.baseMap.bringToBack();
            csm.mapContainer.setView(csm.center, 17);
            $("#mapContainer").attr("currentMapType", 1);
            $("#doubleTree").hide(); //隐藏树的切换按钮
            $(".custom").hide();//隐藏楼内图的树的div
            $(".control").show();//显示设备的树的div
            LoadDeviceListTree();//加载设备的树
            floorDeviceLayerGroup.clearLayers();
            if (csm.mapContainer.hasLayer(deviceMarkerFeatureGroup) == false) { csm.mapContainer.addLayer(deviceMarkerFeatureGroup); }
            deviceMarkerFeatureGroup.eachLayer(function (deviceMarker) {//将设备的位置设置为2D图上的位置
                if (deviceMarker.longitude && deviceMarker.latitude) {
                    deviceMarker.setLatLng(L.latLng(deviceMarker.latitude, deviceMarker.longitude));
                }
            });
            break;
        case 2://25D
            if (!Map25DConfigId) {
                alert("当前地图没配置2.5D的地图！");
                return;
            }
            csm.mapContainer.options.maxZoom = 20;
            csm.mapContainer.options.minZoom = 17;
            if (csm.mapContainer.hasLayer(csm.baseMap) == true) { csm.mapContainer.removeLayer(csm.baseMap); }
            if (csm.mapContainer.hasLayer(csm.floorMap) == true) { csm.mapContainer.removeLayer(csm.floorMap); }
            if (csm.mapContainer.hasLayer(moveMarker) == true) {
                csm.mapContainer.removeLayer(moveMarker);
                moveMarker = null;
            }
            if (csm.baseMap25D) {
                csm.baseMap25D.addTo(csm.mapContainer);
                csm.baseMap25D.bringToBack();
                csm.mapContainer.setView(csm.mapCenter25D, csm.mapContainer.getMaxZoom());
            }
            else {
                addMap25D();
            }
            $("#mapContainer").attr("currentMapType", 2);
            $("#doubleTree").hide(); //隐藏树的切换按钮
            $(".custom").hide();//隐藏楼内图的树的div
            $(".control").show();//显示设备的树的div
            LoadDeviceListTree25D();//加载25D设备注册的树
            floorDeviceLayerGroup.clearLayers();
            if (csm.mapContainer.hasLayer(deviceMarkerFeatureGroup) == false) { csm.mapContainer.addLayer(deviceMarkerFeatureGroup); }
            deviceMarkerFeatureGroup.eachLayer(function (deviceMarker) {
                if (deviceMarker.local_longitude && deviceMarker.local_latitude) {
                    var latlng = csm.mapContainer.unproject([deviceMarker.local_latitude, deviceMarker.local_longitude], csm.mapContainer.getMaxZoom());
                    deviceMarker.setLatLng(latlng);
                }
            });
            break;
        case 3://楼内图
            if (csm.mapContainer.hasLayer(csm.baseMap) == true) { csm.mapContainer.removeLayer(csm.baseMap); }
            if (csm.mapContainer.hasLayer(csm.baseMap25D) == true) { csm.mapContainer.removeLayer(csm.baseMap25D); }
            if (csm.mapContainer.hasLayer(deviceMarkerFeatureGroup) == true) { csm.mapContainer.removeLayer(deviceMarkerFeatureGroup); }
            if (csm.mapContainer.hasLayer(moveMarker) == true) {
                csm.mapContainer.removeLayer(moveMarker);
                moveMarker = null;
            }
            csm.mapContainer.options.maxZoom = 22;
            csm.mapContainer.options.minZoom = 18;
            $("#doubleTree").show();//显示树的切换按钮
            $(".custom").show();//显示楼内图的树的div
            $(".control").hide();//隐藏设备的树的div
            LoadDeviceListTree();//加载设备的树
            loadBuildingTree();//加载楼内图的树
            $("#mapContainer").attr("currentMapType", 3);
            break;
        default:
            break;

    }
}
function floorDeviceRegister() {
    if ($("#mapContainer").attr("currentMapType") == 1) {//2D

        csm.mapContainer.removeLayer(csm.baseMap);
        csm.mapContainer.removeLayer(csm.floorMap);
    }
    if ($("#mapContainer").attr("currentMapType") == 2) {//25D

        csm.mapContainer.removeLayer(csm.baseMap25D);

    }

    $("#mapContainer").attr("currentMapType", 3);
    loadBuildingTree();
}
//点击楼层号显示楼层
function treeNodeDblClick(floorinfo) {//(id, floor_src_2d, point1, point2) {

    if (csm.mapContainer.hasLayer(moveMarker) == true) {
        csm.mapContainer.removeLayer(moveMarker);
        moveMarker = null;
    }
    var id = floorinfo.id;
    //var a=obj.getAttribute("floor_src_2d");
    //var url = '../images/map/buildingImage/' + floor_src_2d + '.jpg';
    var url = '../images/map/buildingImage/' + floorinfo.building_id + '/' + floorinfo.floor_src_2d + '.png';
    //var url = floor_src_2d;
    var point1 = floorinfo.point1;
    var point2 = floorinfo.point2;
    //var southwest = [point1.split(',')[0], point1.split(',')[1]];
    //var northeast = [point2.split(',')[0], point2.split(',')[1]];

    var southwest = Mercator2latlng(point1.split(',')[0], point1.split(',')[1]);
    var northeast = Mercator2latlng(point2.split(',')[0], point2.split(',')[1]);

    LoadFloorMap(url, southwest, northeast);
    $("#is_inbuilding").val(id);
    addFloorDevice(id);
    isClickFloor = true;//表示已经双击楼内图节点了，现在才能双击设备的节点
}
//根据楼内图的id添加楼层对应的设备
function addFloorDevice(floorid) {
    var AllDeviceInfoNew = null;
    $.ajax({
        url: "/Config/GetAllDeviceInfo",
        type: "post", //这里是http类型
        data: { regionID: regionID },
        dataType: "json", //传回来的数据类型
        async: false,
        success: function (data) {
            if (data.status == 1) {
                alert("获取已注册设备错误：" + data.msg);
                return;
            } else {
                AllDeviceInfoNew = data.msg;
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("获取地图上已注册设备出现"+XMLHttpRequest.status + "错误请联系管理员！");
        }
    });

    floorDeviceLayerGroup.clearLayers();
    for (var i = 0; i < AllDeviceInfoNew.length; i++) {
        var deviceObj = AllDeviceInfoNew[i];
        //只有下面三个属性提取了，才能创建marker
        var latitude = deviceObj.latitude;
        var longitude = deviceObj.longitude;
        var device_type = deviceObj.device_type;
        var normal_image = deviceObj.normal_image;
        var is_inbuilding = deviceObj.is_inbuilding;
        if (normal_image && is_inbuilding == floorid) {
            var deviceMarker = L.marker([latitude, longitude], {
                icon: L.icon({ iconUrl: normal_image, iconSize: [15.15, 23] }),
                contextmenu: true,
                contextmenuInheritItems: false,
                contextmenuItems: [{
                    text: '修改',
                    callback: UpdateMarker
                }, {
                    text: '删除',
                    callback: DeleteMarker
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
            });//必须设置
            //将marker添加到图层里面去
            floorDeviceLayerGroup.addLayer(deviceMarker);
        }
    }

}
//根据图片路径、西南角坐标、东北角坐标创建楼内图对象
function LoadFloorMap(imagesrc, southwest, northeast) {

    if (csm.floorMap) {
        csm.mapContainer.removeLayer(csm.floorMap);//移除底图
    }

    var imagesrc = imagesrc;
    var mapbounds = L.latLngBounds(southwest, northeast);
    csm.floorMap = L.imageOverlay(imagesrc, mapbounds);
    csm.floorMap.addTo(csm.mapContainer);
    csm.floorMap.bringToBack();
    csm.mapContainer.setView(mapbounds.getCenter(), 20);
}



