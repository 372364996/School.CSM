var regionName = null;
var regionId = null;
var regionCode = null;
$(document).ready(function () {
    if ($.cookie("mainControlRegionName")) {
        regionName = $.cookie("mainControlRegionName");
    }
    if ($.cookie("mainControlRegionId")) {
        regionId = $.cookie("mainControlRegionId");
    }
    if ($.cookie("mainControlRegionCode")) {
        regionCode = $.cookie("mainControlRegionCode");
    }
    
});


//性别解析
function genderSwitch(genderint) {

    var genderstring = "";

    switch (Number(genderint)) {
        case 0:
            genderstring = "男";
            break;
        case 1:
            genderstring = "女";
            break;
        case 2:
            genderstring = "未知";
            break;


    }
    return genderstring;
}

//证件类型解析
function credentialtypeSwitch(typeint) {

    var typestring = "";

    switch (Number(typeint)) {
        case 0:
            typestring = "其他";
            break;
        case 1:
            typestring = "身份证";
            break;
        case 2:
            typestring = "护照";
            break;
        case 3:
            typestring = "学生证";
            break;
        case 4:
            typestring = "教师证";
            break;
        case 5:
            typestring = "军官证";
            break;

    }
    return typestring;
}
