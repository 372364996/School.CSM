



    //查看详情
function viewDetails(id,region_id ) {
        clearReportDetails();
        $("#info_dialog").dialog('open');
        //$("#detils_starttime").html("2017-03-07 15:39");

        $.ajax({
            url: "/AAC/GetReportDetailsById",
            type: "post",
            data: "reportid=" + id ,
            datatype: 'json',
            async: true,
            //beforeSend: function (XMLHttpRequest) {
            //    $('#report_dg').datagrid('loading', "正在加载...");
            //},
            success: function (data) {
                if (data.status == 1) {
                    alert("接处警详情加载出现" + data.msg + "错误请联系管理员！");
                }
                else
                    if (data.msg != null) {
                        var reportdata;//接处警详情
                        reportdata = data.msg;
                         //接警信息
                        //reportdata.report.report_text.substring(0, 15);
                        $("#detils_starttime").html(Util.changeDateFormat(reportdata.report.report_time));
                        $("#detils_person_name").html(reportdata.report.report_person_name);
                        $("#detils_report_text").html(reportdata.report.report_text.substring(0, 10) + "......");
                        document.getElementById('report_show').onclick = function () {
                            showudataReport(reportdata.report.id);
                        };//接警查看事件 showReportDetails
                        
                        if (reportdata.total > 0) {//处警条数reportdata.reportinfo.id,
                            for (var i = 0; i < reportdata.total; i++) {
                                if (reportdata.handle[i].handle_type == 2) {
                                    addHandleEndDetails(reportdata.report.id, reportdata.handle[i].id, reportdata.report.report_num, region_id);//结案详情
                                    $("#detils_handletime_end").html(Util.changeDateFormat(reportdata.handle[i].record_time));
                                    $("#detils_handle_text_end").html(reportdata.handle[i].handle_text.substring(0, 15) + "......");
                                    
                                    continue;
                                }
                                if (i == 0) {
                                    addHandleStartDetails(reportdata.report.id, reportdata.handle[0].id, reportdata.report.report_num, region_id);
                                    $("#detils_handletime_1").html(Util.changeDateFormat(reportdata.handle[0].record_time));
                                    $("#detils_handle_text_1").html(reportdata.handle[0].handle_text.substring(0, 15) + "......");
                                 
                                }
                                else {

                                    var handle_num = addHandleDetails(reportdata.report.id, reportdata.handle[i].id, reportdata.report.report_num, region_id);//添加tr
                                    $("#detils_handletime_" + handle_num).html(Util.changeDateFormat(reportdata.handle[i].record_time));
                                    $("#detils_handle_text_" + handle_num).html(reportdata.handle[i].handle_text.substring(0, 15) + "......");
                                }
                            }

                            //reportdata.handle;//处警内容
                        }
                    
                    }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("接处警详情加载出现" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    }



    function aac() {

        alert("点击");
    }

    //添加接处警详情中的处警html
    function addHandleDetails(details_reportid, details_handleid, report_num, region_id) {

        //获取详情的table
        var table = document.getElementById("details_table");
        var rows = table.rows;
        //取到最后一个tr的编号
        var tablearr = (rows[rows.length - 2].id).split("_");
        var handle_id_num = Number(tablearr[tablearr.length - 1]);

        var handlestring = '';
        
        handlestring += '<tr id="detils_handle_' + (handle_id_num + 1) + '">';
        handlestring += '<td id="detils_handle_start_td" class="vT firstTd" width="80">';
        handlestring += '<p class="aacDetilsBg-p1" style="visibility: hidden;"></p>';
        handlestring += '<div class="aacLine"><div class="aacRound"></div></div>';
        handlestring += '</td>';
        handlestring += '<td id="detils_handle_1" class="vT">';
        handlestring += '<div class="detailsDiv">';
        handlestring += '<p><span id="detils_handletime_' + (handle_id_num + 1) + '">0000-00-00 00:00:00</span>&ensp;<img src="../style/base/images/public/aacLine.png" /></p>';
        handlestring += '<div class="aacInnerTab">';
        handlestring += '<table>';
        handlestring += '<tr>';
        handlestring += '<td width="90">处警操作：</td>';
        handlestring += '<td id="detils_person_name" width="90"></td>';
        handlestring += '<td id="report_details_btn" width="60">';
        handlestring += '<div class="detils-btn detils-look"onclick="showHandleDialog(' + details_reportid + ',' + details_handleid + ',' + report_num + ')"><img src="../style/base/images/public/frame/detils-look.png" />查看</div>';
        handlestring += '</td>';
        if (Number(region_id) == Number(regionId)) {
            handlestring += '<td id="report_details_btn" width="60">';
            handlestring += '<div class="detils-btn detils-chang"onclick="readHandleInfo(' + details_reportid + ',' + details_handleid + ',' + report_num + ',' + region_id + ')"><img src="../style/base/images/public/frame/detils-chang.png" />修改</div>';
            handlestring += '</td>';
            handlestring += '<td id="report_details_btn" width="60">';
            handlestring += '<div class="detils-btn detils-delete" onclick="delHandleInfo(' + details_reportid + ',' + details_handleid + ',' + report_num + ',' + region_id + ') "><img src="../style/base/images/public/frame/detils-delete.png" />删除</div>';
            handlestring += '</td>';
        }
        else {

            handlestring += '<td id="report_details_btn" width="60">';
            handlestring += '<div class="detils-btn detils-chang"></div>';
            handlestring += '</td>';
            handlestring += '<td id="report_details_btn" width="60">';
            handlestring += '<div class="detils-btn detils-delete" ></div>';
            handlestring += '</td>';
        }
        handlestring += '</tr>';
        handlestring += '<tr>';
        handlestring += '<td class="vAlignTop">处警内容：</td>';
        handlestring += '<td  id="detils_handle_text_' + (handle_id_num + 1) + '" colspan="4" class="report-text">无</td>';
        handlestring += '</tr>';
        //handlestring += '<tr>';
        //handlestring += '<td>关联文件：</td>';
        //handlestring += '<td colspan="4">';
        //handlestring += '<div class="detils-btn detils-down" >下载</div>';
        //handlestring += '</td>';
        //handlestring += '</tr>';
        handlestring += '</table>';
        handlestring += '</div>';
        handlestring += '</div>';
        handlestring += '</td>';
        handlestring += '</tr>';
        //把新建的form添加到最后一个form后面
            $("#detils_handle_" + handle_id_num).after(handlestring);

            return (handle_id_num + 1);
    }

    //添加接处警详情中的第一条处警信息
    function addHandleStartDetails(details_reportid, details_handleid, report_num, region_id) {

        var handlestring = '';
        handlestring += '<td id="detils_handle_start" class="vT">';
        handlestring += '<div class="detailsDiv">';
        handlestring += '<p><span id="detils_handletime_1">0000-00-00 00:00:00</span>&ensp;<img src="../style/base/images/public/aacLine.png" /></p>';
        handlestring += '<div class="aacInnerTab">';
        handlestring += '<table>';
        handlestring += '<tr>';
        handlestring += '<td width="90">处警操作：</td>';
        handlestring += '<td id="detils_person_name" width="90"></td>';
        handlestring += '<td id="report_details_btn" width="60">';
        handlestring += '<div class="detils-btn detils-look" onclick="showHandleDialog(' + details_reportid + ',' + details_handleid + ',' + report_num + ')"><img src="../style/base/images/public/frame/detils-look.png" />查看</div>';
        handlestring += '</td>';
        if (Number(region_id) == Number(regionId)) {
            handlestring += '<td id="report_details_btn" width="60">';
            handlestring += '<div class="detils-btn detils-chang" onclick="readHandleInfo(' + details_reportid + ',' + details_handleid + ',' + report_num + ',' + region_id + ')"><img src="../style/base/images/public/frame/detils-chang.png" />修改</div>';
            handlestring += '</td>';
            handlestring += '<td id="report_details_btn" width="60">';
            handlestring += '<div class="detils-btn detils-delete" onclick="delHandleInfo(' + details_reportid + ',' + details_handleid + ',' + report_num + ',' + region_id + ') "><img src="../style/base/images/public/frame/detils-delete.png" />删除</div>';
            handlestring += '</td>';
        }
        else {

            handlestring += '<td id="report_details_btn" width="60">';
            handlestring += '<div class="detils-btn detils-chang" ></div>';
            handlestring += '</td>';
            handlestring += '<td id="report_details_btn" width="60">';
            handlestring += '<div class="detils-btn detils-delete" ></div>';
            handlestring += '</td>';

        }
        handlestring += '</tr>';
        handlestring += '<tr>';
        handlestring += '<td class="vAlignTop">处警内容：</td>';
        handlestring += '<td id="detils_handle_text_1" colspan="4" class="report-text">无</td>';
        handlestring += '</tr>';
        //handlestring += '<tr>';
        //handlestring += '<td>关联文件：</td>';
        //handlestring += '<td colspan="4">';
        //handlestring += '<div class="detils-btn detils-down" >下载</div>';
        //handlestring += '</td>';
        //handlestring += '</tr>';
        handlestring += '</table>';
        handlestring += '</div>';
        handlestring += '</div>';
        handlestring += '</td>';

        $("#detils_handle_start_td").after(handlestring);

    }

    //添加接处警详情中的结案html
    function addHandleEndDetails(details_reportid, details_handleid, report_num, region_id) {
        var handlestring = '';

        handlestring += '<td id="detils_handle_end"  class="vT">';
        handlestring += '<div class="detailsDiv">';
        handlestring += '<p><span id="detils_handletime_end">0000-00-00 00:00:00</span>&ensp;<img src="../style/base/images/public/aacLine.png" /></p>';
        handlestring += '<div class="aacInnerTab">';
        handlestring += '<table>';
        handlestring += '<tr>';
        handlestring += '<td width="90">结案操作：</td>';
        handlestring += '<td id="detils_person_name" width="90"></td>';
        handlestring += '<td id="report_details_btn" width="60">';
        handlestring += '<div class="detils-btn detils-look" onclick="showHandleDialog(' + details_reportid + ',' + details_handleid + ',' + report_num + ')"><img src="../style/base/images/public/frame/detils-look.png" />查看</div>';
        handlestring += '</td>';
        if (Number(region_id) == Number(regionId)) {
            handlestring += '<td id="report_details_btn" width="60">';
            handlestring += '<div class="detils-btn detils-chang" onclick="readHandleInfo(' + details_reportid + ',' + details_handleid + ',' + report_num + ',' + region_id + ')"><img src="../style/base/images/public/frame/detils-chang.png" />修改</div>';
            handlestring += '</td>';
            handlestring += '<td id="report_details_btn" width="60">';
            handlestring += '<div class="detils-btn detils-delete"onclick="delHandleInfo(' + details_reportid + ',' + details_handleid + ',' + report_num + ',' + region_id + ') "><img src="../style/base/images/public/frame/detils-delete.png" />删除</div>';
            handlestring += '</td>';
        }
        else {
            handlestring += '<td id="report_details_btn" width="60">';
            handlestring += '<div class="detils-btn detils-chang" ></div>';
            handlestring += '</td>';
            handlestring += '<td id="report_details_btn" width="60">';
            handlestring += '<div class="detils-btn detils-delete"></div>';
            handlestring += '</td>';

        }
        handlestring += '</tr>';
        handlestring += '<tr>';
        handlestring += '<td>结案内容：</td>';
        handlestring += '<td id="detils_handle_text_end" colspan="4">无</td>';
        handlestring += '</tr>';
        //handlestring += '<tr>';
        //handlestring += '<td>关联文件：</td>';
        //handlestring += '<td colspan="4">';
        //handlestring += '<div class="detils-btn detils-down" >下载</div>';
        //handlestring += '</td>';
        //handlestring += '</tr>';
        handlestring += '</table>';
        handlestring += '</div>';
        handlestring += '</div>';
        handlestring += '</td>';



        //把新建的form添加到最后一个form后面
        $("#detils_handle_end_td").after(handlestring);
    }

    //查看接警信息
    function readReportInfo(id) {
        if (id == 0) { alert("未找到对应接警信息！"); return;}
        $("#updata_dialog").dialog('open');


    }
    
    ////查看处警信息
    //function readHandleInfo(id) {

    //    $("#handle_dialog").dialog('open');

    //}

    //清空详情弹窗所有信息
    function clearReportDetails() {

        //$("#detils_starttime").html("");
        //$("#detils_person_name").html("");


        //获取详情的table
        var table = document.getElementById("details_table");
        var rows = table.rows;
        //取到最后一个tr的编号
        var tablearr = (rows[rows.length - 2].id).split("_");
        var handle_id_num = Number(tablearr[tablearr.length - 1]);
        var rowlength = rows.length;
        for (var i = 0; i < rowlength; i++) {
                if (i == 0) {//清空接警信息
                    $("#detils_starttime").html("0000-00-00 00:00:00");
                    $("#detils_person_name").html("无");
                    $("#detils_report_text").html("无");
                    $("#report_download").html('<a onclick="">下载</a>');
                    // var loadingbtn = '<input type="button" onclick="readReportInfo(' + 0 + ')" value="查看">';
                    // $("#report_details_btn").html(loadingbtn);
                    continue;
                }
                if (i == 1) {
                    if ($("#detils_handle_start").val() != undefined) {
                        $("#detils_handle_start").remove();
                    }
                    continue;
                }
                if (i == (rowlength - 1)) {//清空结案信息
                    if ($("#detils_handle_end").val() != undefined) {
                        $("#detils_handle_end").remove();
                    }
                    continue;
                }

                if ((rows[i].id).indexOf("detils_handle_") > -1) {

                    $("#" + rows[i].id).remove();
                }

            }
    }