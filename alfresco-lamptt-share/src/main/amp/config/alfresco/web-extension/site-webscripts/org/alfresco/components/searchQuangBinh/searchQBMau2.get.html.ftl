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
		        <h4 class="text-center">Thống kê tài liệu hư hỏng, xuống cấp của Phông lưu trữ <p class="fontName1"></p></h4>
		        <p class="text-center">&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;</p>
		    </div>
		    <div class="row">
		        <div class="panel-body">
		            <p>Tên phông:
						<SELECT style="width: auto; height: 25px" id="SelectFont1">
                            <option value="" selected>- Lựa chọn phông -</option>
							<#if count != 0>
							<#assign x = 0>
								<#list data.AllItems as child>
									<#assign x=x+1>
										<option value="${child.name}">${child.name}</option>
								</#list>
							</#if>
                        </SELECT>
					</p>
		            <p>Số lượng mét giá: <span class="metgia"></span></p>
		            <p>Số lượng văn bản hư hỏng, xuống cấp:....</p>
		            <p>Tổng số trang văn bản hư hỏng, xuống cấp:....</p>
		        </div>
		    </div>
		    <div class="row">
		        <p><b>Danh mục tài liệu hư hỏng, xuống cấp</b></p>
		        <div class="table-responsive">
		            <table class="table table-bordered">
		                <thead>
		                <tr>
		                    <th class="col-md-1 text-center">STT</th>
		                    <th class="col-md-1 text-center">Hộp số</th>
		                    <th class="col-md-1 text-center">Hồ sơ</th>
		                    <th class="col-md-1 text-center">Số, ký hiệu văn bản</th>
		                    <th class="col-md-1 text-center">Ngày, tháng văn bản</th>
		                    <th class="col-md-1 text-center">Tác giả văn bản</th>
		                    <th class="col-md-3 text-center">Trích yếu nội dung văn bản</th>
		                    <th class="col-md-1 text-center">Tờ số</th>
		                    <th class="col-md-1 text-center">Số trang (A4)</th>
		                </tr>
		                </thead>
		                <tbody>
		                <tr>
		                    <td class="col-md-1 text-center">STT</td>
		                    <td class="col-md-1 text-center">Hộp số</td>
		                    <td class="col-md-1 text-center">Hồ sơ</td>
		                    <td class="col-md-1 text-center">Số, ký hiệu văn bản</td>
		                    <td class="col-md-1 text-center">Ngày, tháng văn bản</td>
		                    <td class="col-md-1">Tác giả văn bản</td>
		                    <td class="col-md-3">Trích yếu nội dung văn bản</td>
		                    <td class="col-md-1 text-center">Tờ số</td>
		                    <td class="col-md-1 text-center">Số trang (A4)</td>
		                </tr>
		                </tbody>
		            </table>
		        </div>
		    </div>
		    <div class="row">
		        <button type="button" title="Quay về kho" class="btn btn-default">Quay trở về kho</button>
		        <button type="button" title="In báo cáo ra word" class="btn btn-default word-export" id="BCTKTaiLieuXuongCap"><span class='glyphicon glyphicon-print'></span></button>
		    </div>
		
		</div>
      </div>
   </@>
</@>

<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/report/2.js"></script>