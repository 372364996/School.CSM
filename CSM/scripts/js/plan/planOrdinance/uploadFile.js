/*-------------------------------------------------------------*/
/*用途：上传文件
//                       
/*-------------------------------------------------------------*/

var dgId = "";
var documentType = "";
//确定上传文件的位置，即当前simp服务器的地址
var this_host = window.location.host;
var simp_server = 'http://' + this_host;
var oldConent = 0;
function WebUploadBase(severUrl) {
    jQuery(function () {
        var $ = jQuery,
        // 实例化
        upLoaders = WebUploader.create({
            // 自动上传。
            auto: true,
            // swf文件路径
            swf: '../../dist/Uploader.swf',

            // 文件接收服务端。
            server:severUrl, 
            chunked: false,
            fileSizeLimit: 10000 * 1024 * 1024,
            fileSingleSizeLimit: 10000 * 1024 * 1024,
            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: '#filePicker',
        });
        //当文件上传成功把路径显示在文本框
        upLoaders.on('uploadSuccess', function (file, response) {
            SuccessTips(file, response);
            upLoaders.removeFile(file, true);

        });
        //
        upLoaders.on('uploadFinished', function () {

        });

        upLoaders.on('uploadError', function (file) {
            alert("上传失败");
        });

        //upLoaders.on('uploadComplete', function (file) {
        //    $('#' + file.id).find('.progress').fadeOut();
        //});
    });
}