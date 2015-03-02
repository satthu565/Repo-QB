<@markup id="css" >
<#-- CSS Dependencies -->
    <#include "../form/form.css.ftl"/>
    <@link href="${url.context}/res/components/QuangBinh/bootstrap/css/bootstrap.min.css" group="search"/>
</@>

<@markup id="js">
<#-- JavaScript Dependencies -->
    <#include "../form/form.js.ftl"/>
	<@script src="${url.context}/res/components/QuangBinh/Scripts/jquery-1.11.1.min.js" group="search"></@script>
    <@script src="${url.context}/res/components/QuangBinh/Scripts/FileSaver.js" group="search"></@script>
</@>

<@markup id="widgets">
    <@createWidgets group="search"/>
</@>

<@markup id="html">
    <@uniqueIdDiv>
        <#assign el=args.htmlid?html>
    <div id="${el}-body" class="search">
        <div class="container">
            <div class="row">
                <h4 class="text-center">BÁO CÁO</h4>
                <h4 class="text-center">Thống kê tài liệu đã số hóa</h4>

                <p class="text-center">&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;</p>
            </div>
            
                <#assign sophong = data.sophong>
                <#assign somet = data.sohop/8>
                <#assign sohop = data.sohop>
                <#assign sohoso = data.sohoso>
            
            <div class="row">
                <div class="panel-body">
                    <p>Số lượng phông:&nbsp;&nbsp;${sophong}</p>

                    <p>Tổng số mét giá tài liệu (8 hộp = 1 mét):&nbsp;&nbsp;${somet}</p>

                    <p>Tổng số hộp:&nbsp;&nbsp;${sohop}</p>

                    <p>Tổng số hồ sơ:&nbsp;&nbsp;${sohoso}</p>
                </div>
            </div>
            <#if count == 0>
                <div><h3>Không có dữ liệu hiển thị</h3></div>
            <#else>
                <div class="row">
                    <div class="table-responsive">
                        <br/><br/>

                        <div class="row">
                            <div class="col-lg-12">
                                <div class="panel-body">
                                    <div class="table-responsive">
                                        <table class="table table-striped table-bordered table-hover "
                                               id="dataTables-example" style="margin-top:20px">
                                            <thead>
                                            <tr>
                                                <th class="col-md-1 text-center">STT</th>
                                                <th class="col-md-3 text-center">Tên phông/ sưu tập lưu trữ</th>
                                                <th class="col-md-1 text-center">Số mét giá</th>
                                                <th class="col-md-1 text-center">Số hộp</th>
                                                <th class="col-md-1 text-center">Số hồ sơ</th>
                                                <th class="col-md-3 text-center">Kho lưu trữ</th>
                                                <th class="col-md-2 text-center">Ghi chú</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                                <#assign x = 0>
                                                <#list data.mangphong as phantu>
                                                    <#assign x=x+1>
                                                <tr>
                                                    <td class="col-md-1 text-center">${x}</td>
                                                    <td class="col-md-3">${phantu.tenphong}</td>
                                                    <td class="col-md-1 text-center">${phantu.sometgia}</td>
                                                    <td class="col-md-1 text-center">${phantu.sohop}</td>
                                                    <td class="col-md-1 text-center">${phantu.sohoso}</td>
                                                    <td class="col-md-3">${phantu.kholuutru}</td>
                                                    <td class="col-md-2">${phantu.ghichu}</td>
                                                </tr>
                                                </#list>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </#if>
            <div class="row">
                <button title="Quay về kho" type="button" class="btn btn-default">Quay trở về kho</button>
                <button type="button" title="In báo cáo ra word" class="btn btn-default word-export"
                        id="BCTKTaiLieuChung"><span class='glyphicon glyphicon-print'></span></button>
            </div>
        </div>
    </div>

    </@>
</@>
<script>
    $(document).ready(function () {
        $('#dataTables-example').dataTable();
        $("#dataTables-example_filter").css("float","right");
        $("#dataTables-example_paginate").css("float","right");
    });
</script>
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/report/1.js"></script>
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/plugins/dataTables/jquery.dataTables.js"></script>
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/plugins/dataTables/dataTables.bootstrap.js"></script>
