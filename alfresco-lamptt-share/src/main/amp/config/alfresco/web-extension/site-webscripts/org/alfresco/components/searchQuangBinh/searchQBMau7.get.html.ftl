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
		        <h4 class="text-center">Thống kê tài liệu có dấu chỉ các mức độ mật đến hạn tự giải mật</h4>
		        <h4 class="text-center">thuộc Phông Lưu trữ
					<span>
						<select id="selectPhong">
							<option value="">-Lựa chọn phông-</option>
							<#if count != 0>
								<#list data.items as child>
									<option value='${child.name}'>${child.name}</option>
								</#list>
							</#if>
						</select>
					<span>
				</h4>
		        <p class="text-center">&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;</p>
		    </div>
		    <div class="row">
		        <div class="panel-body">
		            <p>Tên phông:&nbsp;<span class="phong"></span></p>
		            <p>Số mét giá:&nbsp;<span class="metgia"></span> mét</p>
		            <p>Tổng số hộp:&nbsp;<span class="hopso"></span></p>
		            <p>Tổng số hồ sơ:&nbsp;<span class="hoso"></span></p>
		        </div>
		    </div>
		    <div class="row">
		        <p><b>Danh mục tài liệu có dấu chỉ mức độ mật đến hạn tự giải mật</b></p>
		        <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover table-minhpt" id="dataTables-example" style="margin-top:20px">
		                <thead>
							<tr>
								<th class="col-md-1 text-center">STT</th>
								<th class="col-md-1 text-center">Số, ký hiệu văn bản</th>
								<th class="col-md-2 text-center">Ngày, tháng văn bản</th>
								<th class="col-md-2 text-center">Tác giả văn bản</th>
								<th class="col-md-3 text-center">Trích yếu nội dung văn bản</th>
								<th class="col-md-1 text-center">Tờ số</th>
								<th class="col-md-1 text-center">Độ mật</th>
								<th class="col-md-1 text-center">Ghi chú</th>
							</tr>
		                </thead>
		                <tbody>
		                </tbody>
		            </table>
		        </div>
		    </div>
		    <div class="row">
		        <button type="button" title="Quay về kho" class="btn btn-default">Quay trở về kho</button>
		        <button type="button" title="In báo cáo ra word" class="btn btn-default word-export" id="BCTKTaiLieuMatDenHanGiaiMat"><span class='glyphicon glyphicon-print'></span></button>
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
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/report/7.js"></script>
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/plugins/dataTables/jquery.dataTables.js"></script>
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/plugins/dataTables/dataTables.bootstrap.js"></script>