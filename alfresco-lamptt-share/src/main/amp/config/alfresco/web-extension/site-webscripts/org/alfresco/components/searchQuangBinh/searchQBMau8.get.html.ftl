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
		        <h4 class="text-center">MỤC LỤC HỒ SƠ</h4>
		        <h4 class="text-center">Phông lưu trữ
                    <SELECT class="selectFont1" style="width:auto;">
                        <option value="" selected>- Lựa chọn phông -</option>
	   					<#if count != 0>
							<#list data.items as child>
								<option value="${child.name}">${child.name}</option>
							</#list>
						</#if>
                    </SELECT>
				</h4>
		        <p class="text-center">&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;</p>
		    </div>

		    <div class="row">
		        <div class="table-responsive">
		            <table  class="table table-striped table-bordered table-hover" id="dataTables-example">
		                <thead>
		                <tr>
		                    <th class="col-md-1 text-center">Hộp số</th>
		                    <th class="col-md-1 text-center">Hồ sơ số</th>
		                    <th class="col-md-4 text-center">Tiêu đề hồ sơ</th>
		                    <th class="col-md-3 text-center">Ngày, tháng bắt đầu và kết thúc</th>
		                    <th class="col-md-1 text-center">Tờ số</th>
		                    <th class="col-md-2 text-center">Ghi chú</th>
		                </tr>
		                </thead>

		            </table>
		        </div>
		    </div>

		    <div class="row">
		        <button type="button" title="Quay về kho" class="btn btn-default">Quay trở về kho</button>
		        <button type="button" title="In báo cáo ra word" class="btn btn-default word-export" id="MucLucHoSo"><span class='glyphicon glyphicon-print'></span></button>
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
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/jquery.js"></script>
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/report/8.js"></script>
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/plugins/dataTables/jquery.dataTables.js"></script>
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/plugins/dataTables/dataTables.bootstrap.js"></script>