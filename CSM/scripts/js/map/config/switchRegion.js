
$(function () {
    var paxid = 0;
    var paxidTwo = 0;
    var zIndex = 22;
    $('.mapTypeUl li').each(function (i) {
        paxidTwo = (paxid++) * 3;
        paxidTwo = paxidTwo + "px";
        zIndexs = zIndex--;
        $(this).css({ "marginRight": paxidTwo, "transition": "marginRight ease 1s", "zIndex": zIndexs });

    });
})
//主页面地图切换园区
function mainMapSwitchRegion(obj) {
    var regionID = $(obj).attr("regionID");
    var regionCode = $(obj).attr("regionCode");
    var regionName = $(obj).attr("regionName");
    var regionImage = $(obj).attr("regionImage");

    window.location.href = "/map/Index?regionID=" + regionID;
}
//设备注册页面地图切换园区
function deviceSwitchRegion(obj) {
    var regionID = $(obj).attr("regionID");
    var regionCode = $(obj).attr("regionCode");
    var regionName = $(obj).attr("regionName");
    var regionImage = $(obj).attr("regionImage");

    window.location.href = "/Config/DeviceRegistration?regionID=" + regionID;
}
//区域注册页面地图切换园区
function areaSwitchRegion(obj) {
    var regionID = $(obj).attr("regionID");
    var regionCode = $(obj).attr("regionCode");
    var regionName = $(obj).attr("regionName");
    var regionImage = $(obj).attr("regionImage");

    window.location.href = "/Config/Area?regionID=" + regionID;
}

function buildingSwitchRegion(obj) {
    var regionID = $(obj).attr("regionID");
    var regionCode = $(obj).attr("regionCode");
    var regionName = $(obj).attr("regionName");
    var regionImage = $(obj).attr("regionImage");

    window.location.href = "/Config/BuildingMap?regionID=" + regionID;
}


