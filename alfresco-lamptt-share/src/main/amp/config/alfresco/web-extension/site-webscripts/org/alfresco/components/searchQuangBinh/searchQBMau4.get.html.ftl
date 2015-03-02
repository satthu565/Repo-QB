<@markup id="css" >
   <#-- CSS Dependencies -->
   <#include "../form/form.css.ftl"/>
   <@link href="${url.context}/res/components/QuangBinh/bootstrap/css/bootstrap.min.css" group="search"/>
	<@link href="${url.context}/res/components/QuangBinh/Style/datepicker.css" group="search"/>
	<@link href="${url.context}/res/components/QuangBinh/Style/report/4.css" group="search"/>
</@>

<@markup id="js">
   <#-- JavaScript Dependencies -->
   <#include "../form/form.js.ftl"/>
   <@script src="${url.context}/res/components/QuangBinh/Scripts/jquery-1.11.1.min.js" group="search"></@script>
   <@script src="${url.context}/res/components/QuangBinh/Scripts/FileSaver.js" group="search"></@script>
	<@script src="${url.context}/res/components/QuangBinh/Scripts/bootstrap-datepicker.js" group="search"></@script>
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
		        <h4 class="text-center">Kết quả số hóa tài liệu của ông/bà
					<SELECT class="selectUser1" style="width:auto;">
                    <option value="" selected>- Lựa chọn tên cán bộ -</option>
					<#if count != 0>
					<#assign x = 0>
						<#list data.ListUser as child>
							<#assign x=x+1>
							<option value="${child.user}">${child.fullname}</option>
						</#list>
					</#if>
                	</SELECT>
				</h4>
		        <p class="text-center">&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;</p>
		    </div>
		    <div class="row">
		        <div class="ReportBody">
		            <p><b>1. Thành phần tài liệu đưa ra số hóa</b></p>
		            <p>...</p>
		            <p><b>2. Thời gian thực hiện</b></p>
		            <p>Từ ngày <input type="text" id="datepicker-start" placeholder=".../.../..." class="datepicker-box"/>
						đến ngày <input type="text" id="datepicker-end" placeholder=".../.../..." class="datepicker-box"/> </p>
		            <p><b>3. Kết quả đạt được</b></p>
		            <p>- Tổng số trang văn bản (trang A4) được scan: <span class="soTrangScan"></span> </p>
		            <p>- Tổng số văn bản được nhập nhiệu: <span class="tongSoVB"></span></p>
		            <button type="button" title="Quay về kho" class="btn btn-default">Quay trở về kho</button>
		            <button type="button" title="In báo cáo ra word" class="btn btn-default word-export" id="BCTKSoHoaTaiLieuCuaTungCaNhan"><span class='glyphicon glyphicon-print'></span></button>
		        </div>
		    </div>
		</div>		
      </div>
   </@>
</@>
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/report/4.js"></script>
