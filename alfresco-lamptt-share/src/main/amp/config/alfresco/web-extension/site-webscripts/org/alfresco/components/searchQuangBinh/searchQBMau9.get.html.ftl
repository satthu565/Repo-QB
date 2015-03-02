<@markup id="css" >
<#-- CSS Dependencies -->
    <#include "../form/form.css.ftl"/>
    <@link href="${url.context}/res/components/QuangBinh/bootstrap/css/bootstrap.min.css" group="search"/>
    <@link href="${url.context}/res/components/QuangBinh/Style/report/9.css" group="search"/>
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
                <h4 class="text-center">MỤC LỤC VĂN BẢN</h4>
                <h4 class="text-center">Hồ sơ lưu trữ
					<span>
						<select name="" id="select-font">
                            <option value="">-Lựa chọn hồ sơ</option>
                            <#if count !=0> <#--kiểm tra data.HoSo co tồn tại hay ko-->
                                <#list data.HoSo as child>
                                    <option value="${child.Name}">${child.Name}</option>
                                </#list>
                            </#if>
                        </select>
					</span>
                </h4>
                <p class="text-center">&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;</p>
            </div>
            <div class="row">
                <div class="table-responsive ">
                    <table class="table table-striped table-bordered table-hover minhlv" id="dataTables-example">
                        <thead>
                        <tr>
                            <th class="col-md-1 text-center">TT</th>
                            <th class="col-md-1 text-center">Số, ký hiệu văn bản</th>
                            <th class="col-md-1 text-center">Ngày, tháng văn bản</th>
                            <th class="col-md-3 text-center">Tác giả văn bản</th>
                            <th class="col-md-3 text-center">Trích yếu nội dung văn bản</th>
                            <th class="col-md-1 text-center">Tờ số</th>
                            <th class="col-md-2 text-center">Ghi chú</th>
                        </tr>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="row">
                <button type="button" title="Quay về kho" class="btn btn-default">Quay trở về kho</button>
                <button type="button" title="In báo cáo ra word" class="btn btn-default word-export" id="MucLucVanBan"><span class='glyphicon glyphicon-print'></span></button>
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
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/report/9.js"></script>
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/plugins/dataTables/jquery.dataTables.js"></script>
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/plugins/dataTables/dataTables.bootstrap.js"></script>

