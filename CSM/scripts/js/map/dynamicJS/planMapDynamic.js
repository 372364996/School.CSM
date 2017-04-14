switch (NowMapType) {
    case 1: //超图 
        //document.write('<script src="http:///support.supermap.com.cn:8090/iserver/iClient/forJavaScript/libs/SuperMap.Include.js"><\/script>');//超图线上的脚本8.1版
        document.write('<script src="../scripts/js/map/mapRootJS/SuperMap-8.1.1-14426/libs/SuperMap.Include.js"><\/script>');//本地8.1的版本
        //超图原生的js
        //document.write('<script src="../scripts/js/map/mapRootJS/SuperMap/libs/SuperMap.Include.js"><\/script>');//本地的版本
        document.write('<script src="../scripts/js/plan/map/mySuperMap.js"><\/script>');
        document.write('<script src="../scripts/js/plan/map/superMapBuilding.js"><\/script>');
        break;
    case 2: //leaflet
        //lealfet原生的js和css样式
        document.write('<script src="../scripts/js/map/mapRootJS/Leaflet_1.0/leaflet.js"><\/script>');
        document.write('<link href="../scripts/js/map/mapRootJS/Leaflet_1.0/leaflet.css" rel="stylesheet" />');
        document.write('<link href="../style/base/css/popup.css" rel="stylesheet" />');

        document.write('<script src="../scripts/js/plan/map/myleafletMap.js"><\/script>');
        document.write('<script src="../scripts/js/plan/map/leafletMapBuilding.js"><\/script>');
        break;
    default:
        break;

}