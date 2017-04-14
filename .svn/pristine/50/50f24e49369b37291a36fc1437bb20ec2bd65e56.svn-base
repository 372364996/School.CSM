var AREA_REGISTER_MAP = 1;//1为2D上注册，2为2.5D上注册，3为楼内图的房间注册
var UPDATEORADDFLAG;
$(function () {
    GetAreaTree();
})
//获取左侧区域树
function GetAreaTree() {
    $.ajax({
        url: "/Register/GetAreaTree",
        data: { region_id: regionID },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            $.fn.zTree.init($("#areaTree"), setting, data);
            var treeObj = $.fn.zTree.getZTreeObj("areaTree");
            treeObj.expandAll(true);
        },
        error: function (data) {
            alert(data.responseText);
        }
    })


}
var setting = {
    edit: {
        enable: false
    },
    view: {
        dblClickExpand: false
    },
    data: {
        key: {
            name: "name",
            title: "name"
        },
        keep: {
            parent: true,
            leaf: true
        },
        simpleData: {
            enable: true,
            idKey: "sId",
            pIdKey: "pId",
            rootPId: -2
        }
    },
    callback: {
        onDblClick: clickTreeNodeArea
    }
}
//树节点的双击事件
function clickTreeNodeArea(event, treeId, treeNode) {
    if (!treeNode) {
        return null;
    }
    //xx子系统（文件夹）
    if (treeNode.id == 0) {
        return;
    }
    if (treeNode.pId == -2) {
        return;
    }

    getTreeDbclick(treeNode.id);
}
//区域注册提交
function addAreaCommit() {
    var area_id = $("#area_id").val();//修改区域id
    var area_location = $("#area_location").val();//2d坐标字符串
    var area_25D_location = $("#area_25D_location").val();//25d坐标字符串
    var area_name = $("#area_name").val();//区域名称
    var area_level = $("#area_level").val();//区域级别
    var area_type = $("#area_type").val();//区域类型
    var person_id = $("#person_id").val();//人员
    var grid_id = $("#grid_id").val();//网格ID
    var is_show = $('input[name="is_show"]:checked').val();//是否显示
    if (popupImageHandler.uiData.index == -1 || popupImageHandler.uiData.index == 0) {
        alert("请上传图片或选择图片");
        return;
    }
    var area_image = popupImageHandler.uiData.option.value; //$('#area_image').val();//图片$('#areaPopupImageUpload').val();//图片
    var content = $('#content').val();//备注
    if (area_name == "") {
        alert("请输入区域名称");
        return;
    }
    if (area_level == "") {
        alert("请选择区域级别");
        return;
    }
    if (area_type == "" || area_type == -3) {//李昕修改，因为如果行业没有配置区域类型，就不会激活选择区域类型的change事件，这样的话我加了一个option id为-3的
        alert("请选择区域类型");
        return;
    }
    if (person_id == "") {
        alert("请选择人员");
        return;
    }
    if (grid_id == "") {
        alert("请选择网格");
        return;
    }
    if (is_show == "") {
        alert("请选择是否显示");
        return;
    }
    if (area_image == 0) {
        if ($("#areaPopupImageUpload").val() == "") {
            alert("请上传图片或选择图片");
            return;
        }
        else {
            area_image = $("#areaPopupImageUpload").val();
        }

    }
    //楼宇的属性
    //var building_id = 0;//修改楼宇id
    var area_type_id = -2; //楼宇的区域类型
    var building_name = null; //建筑名称
    var alias = null; //别名
    var manager_id = -2;//责任人
    var create_time = null;//建筑年代
    var building_type = null;//结构类型
    var above_ground_area = null;//地上面积
    var under_ground_area = null;//地下面积
    var floor_num = -2;//楼层数
    //如果区域类型为楼宇
    if (area_type == -1) {
        //building_id = $("#building_id").val();//修改楼宇id
        area_type_id = $("#area_type_id").val();//楼宇的区域类型
        building_name = $("#building_name").val(); //建筑名称
        alias = $("#alias").val(); //别名
        manager_id = $("#manager_id").val();//责任人
        create_time = $("#create_time").val();//建筑年代
        building_type = $("#building_type").val();//结构类型
        above_ground_area = $("#above_ground_area").val();//地上面积
        under_ground_area = $("#under_ground_area").val();//地下面积
        floor_num = $("#floor_num").val();//楼层数
        if (!area_type_id) {
            alert("请选择楼宇的区域类型！");
            return;
        }
        if (!building_name) {
            alert("请输入建筑名称！");
            return;
        }
        if (!alias) {
            alert("请输入别名！");
            return;
        }
        if (!manager_id) {
            alert("请输入责任人！");
            return;
        }
        if (!create_time) {
            alert("请输入建筑年代！");
            return;
        }
        if (!building_type) {
            alert("请输入结构类型！");
            return;
        }
        if (!above_ground_area) {
            alert("请输入地上面积！");
            return;
        }
        if (!under_ground_area) {
            alert("请输入地下面积！");
            return;
        }
        if (!floor_num) {
            alert("请输入楼层数！");
            return;
        }
    }
    if (UPDATEORADDFLAG == "ADD") {
        var postData = {
            area_name: area_name, area_location: area_location, area_level: area_level, area_type: area_type, person_id: person_id, map_type: AREA_REGISTER_MAP, is_show: is_show, content: content, grid_id: grid_id, region_id: regionID, area_image: area_image,
            area_type_id: area_type_id, building_name: building_name, alias: alias, manager_id: manager_id, create_time: create_time, building_type: building_type, above_ground_area: above_ground_area, under_ground_area: under_ground_area, floor_num: floor_num
        };

        //提交到Serv_Area_Info表，返回id
        $.ajaxFileUpload({
            url: "/Register/AddArea",
            sucureurl: false,
            async: true,
            data: postData,
            dataType: "content",
            success: function (data) {
                if (data) {
                    alert(data.split('|')[1]);
                    $("#areaRegisterPopup").dialog('close');//隐藏弹窗
                    //刷新树结构
                    GetAreaTree();
                    getAreaInfo();
                }
                else {
                    alert("添加失败！");
                }
            },
            error: function (data) {
                alert(data.split('|')[1]);
            }
        });
    } else {
        var postData = {
            area_id: area_id, area_name: area_name, area_location: area_location, area_25D_location: area_25D_location, area_level: area_level, area_type: area_type, person_id: person_id, map_type: AREA_REGISTER_MAP, is_show: is_show, content: content, grid_id: grid_id, region_id: regionID, area_image: area_image, area_type_id: area_type_id, building_name: building_name, alias: alias, manager_id: manager_id, create_time: create_time, building_type: building_type, above_ground_area: above_ground_area, under_ground_area: under_ground_area, floor_num: floor_num
        };
        $.ajaxFileUpload({
            url: "/Register/UpdateArea",
            sucureurl: false,
            async: true,
            data: postData,
            dataType: "content",
            success: function (data) {
                if (data) {
                    alert(data.split('|')[1]);
                    $("#areaRegisterPopup").dialog('close');//隐藏弹窗
                    //刷新树结构
                    GetAreaTree();
                    getAreaInfo();
                }
                else {
                    alert("修改失败！");
                }
            },
            error: function (data) {
                alert(data.split('|')[1]);
            }
        });
    }
}
//注册2.5D区域
function RegisterArea25D(id, area_25D_location) {
    var result = false;
    $.ajax({
        url: "/Register/RegisterArea25D",
        data: { id: id, area_25D_location: area_25D_location },
        type: "post",
        datatype: "json",
        async: false,
        success: function (data) {
            if (data == true) {
                result = true;
            }
            else {
                result = false;
            }

        },
        error: function (data) {
            result = false;
        }
    });
    return result;
}

//注册区域选择区域类型下拉框的改变事件
function areaTypeChange() {
    if ($("#area_type").val() == -1) {//类型为楼宇
        $(".building").show();
        $("#areaRegisterPopup table td:nth-child(3)").css("width", "110px");
        $("#building_name").val($("#area_name").val()); //建筑名称随区域名称联动

        //建筑名称随区域名称联动
        $("#area_name").bind('input propertychange', function () {
            var areaName = $("#area_name").val();
            $("#building_name").val(areaName);
        });
        //区域名称输入完成后，鼠标离开区域名称输入框的时候，让建筑名称等于区域的名称
        $("#area_name").blur(function () {
            var areaName = $("#area_name").val();
            $("#building_name").val(areaName);
        });
    }
    else {
        $(".building").hide();
        $("#areaRegisterPopup table td:nth-child(3)").css("width", "80px");
        isBuilding = false;
    }
}

//关闭弹窗
function hideRegisterPopup() {
    $("#areaRegisterPopup").dialog('close');
    clearDrawState();//清楚地图上的区域，以及画区域的工具栏
}
//添加显示注册的弹框
function showRegisterPopup() {
    //让弹出框的div显示出来
    UPDATEORADDFLAG = "ADD";
    $("#area_id").val("");//区域id
    //$("#building_id").val("");//楼宇id
    $("#area_name").val("");//区域名称
    $("#building_name").val("");//楼宇名称
    $("#alias").val("");//别名
    $("#manager_id").val("");//负责人
    $("#create_time").val("");//建筑年代
    $("#building_type").val("");//楼宇类型
    $("#above_ground_area").val("");//地上面积
    $("#under_ground_area").val("");//地下面积
    $("#floor_num").val("");//楼层数
    $("#area_level").find("option").eq(0).prop("selected", true);
    $("#area_type").find("option").eq(0).prop("selected", true);
    $("#manager_id").find("option").eq(0).prop("selected", true);
    $("#person_id").find("option").eq(0).prop("selected", true);
    $("#area_image").find("option").eq(0).prop("selected", true);
     
    $("#areaRegisterPopup").dialog('open');
    $("#areaRegisterPopup").dialog({ title: "添加区域" });
    $("#areaRegisterPopup").show();
    selectUpLoadAreaPopup();

}
//修改区域弹窗赋值
function updateAreaDialog(data) {
    selectUpLoadAreaPopup();
    UPDATEORADDFLAG = "UPDATE";
    $("#building_name").val("");//楼宇名称
    $("#alias").val("");//别名
    $("#manager_id").val("");//负责人
    $("#create_time").val("");//建筑年代
    $("#building_type").val("");//楼宇类型
    $("#above_ground_area").val("");//地上面积
    $("#under_ground_area").val("");//地下面积
    $("#floor_num").val("");//楼层数
    $("#area_id").val(data.id);
    $("#area_location").val(data.area_locationStr);//2d区域坐标
    $("#area_25D_location").val(data.area_25D_locationStr);//25d区域坐标
    $("#area_name").val(data.area_name);//区域名称

    //区域级别
    var areaLevel = $("#area_level");
    for (var i = 0; i < areaLevel.length; i++) {
        if (areaLevel[i].value == data.area_level) {
            areaLevel[i].selected = true;
        }
    }
    //区域类型
    var areaType = document.getElementById("area_type");
    for (var i = 0; i < areaType.length; i++) {
        if (areaType[i].value == data.area_type) {
            areaType[i].selected = true;
        }
    }
    //人员
    var personId = document.getElementById("person_id");
    for (var i = 0; i < personId.length; i++) {
        if (personId[i].value == data.person_id) {
            personId[i].selected = true;
        }
    }
    //是否显示
    var isShow = document.getElementsByName("is_show");
    for (var i = 0; i < isShow.length; i++) {
        if (isShow[i].value == data.is_show) {
            isShow[i].checked = true;
        }
    }
    //弹出图片
    //var areaImage = document.getElementById("area_image");
    //for (var i = 0; i < areaImage.length; i++) {
    //    if (areaImage[i].value == data.area_image) {
    //        areaImage[i].selected = true;
    //    }
    //}
    popupImageHandler.set("value", '../images/map/areaMapIcon/popup_image/' + data.area_image);//地图弹窗图片
    //备注
    $("#content").val(data.content);
    //所属网格
    var grid = document.getElementById("grid_id");
    for (var i = 0; i < grid.length; i++) {
        if (grid[i].value == data.grid_id) {
            grid[i].selected = true;
        }
    }
    if (data.area_type == -1) {
        //楼宇区域类型
        //$("#building_id").val(data.building_id);//修改楼宇id
        var buildingArea = document.getElementById("area_type_id");
        for (var i = 0; i < buildingArea.length; i++) {
            if (buildingArea[i].value == data.area_type_id) {
                buildingArea[i].selected = true;
            }
        }
        //建筑名称
        $("#building_name").val(data.building_name);
        //别名
        $("#alias").val(data.alias);
        //责任人
        $("#manager_id").val(data.manager_id);
        //建筑年代
        $("#create_time").val(data.create_time);
        //结构类型
        $("#building_type").val(data.building_type);
        //地上面积
        $("#above_ground_area").val(data.above_ground_area);
        //地下面积
        $("#under_ground_area").val(data.under_ground_area);
        //楼层数
        $("#floor_num").val(data.floor_num);
        $(".building").show();
    } else {
        $(".building").hide();
    }
    $("#areaRegisterPopup").dialog({ title: "区域修改" });
    $("#areaRegisterPopup").dialog('open');
}
//删除区域
function deleteArea(area_id) {
    if (!confirm("确定删除吗")) {
        return;
    }
    $.ajax({
        url: "/Register/DeleteArea",
        data: { area_id: area_id },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            if (data) {
                alert("删除成功！");
                //刷新树结构
                GetAreaTree();
                getAreaInfo();
            }
            else {
                alert("删除失败！");
            }
        },
        error: function (data) {
            alert(data.responseText)
        }
    })
}
//刷新区域
function getAreaInfo() {
    $.ajax({
        url: "/Register/GetAreaInfo",
        data: { regionID: regionID },
        type: "post",
        datatype: "json",
        async: true,
        success: function (data) {
            clearAreaObj();
            AreaInfo = data;
            showAllArea();
        },
        error: function (data) {
            alert(data.responseText);
        }
    })
}
//选择上传文件时候上传popup的弹出图片
var popupImageHandler
function selectUpLoadAreaPopup() {
    popupImageHandler = $("#area_image").msDropdown({
        visibleRows: 5,
        on: {
            change: function (data, ui) {
                if (data.value == "0") {
                    $("#areaPopupImageUpload").show();
                    $("#areaPopupImageUploadText").show();
                }
                else {
                    $("#areaPopupImageUpload").hide();
                    $("#areaPopupImageUploadText").hide();
                }
            }
        }
    }).data("dd");
}
