<@markup id="css" >
   <#-- CSS Dependencies -->
   <#include "../form/form.css.ftl"/>
   <@link href="${url.context}/res/components/QuangBinh/bootstrap/css/bootstrap.min.css" group="search"/>
   <@link href="${url.context}/res/components/QuangBinh/Style/thongpv.css" group="search"/>
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
		        <h4 class="text-center">Thống kê tài liệu có dấu chỉ các mức độ mật Phông Lưu trữ
		            <SELECT class="SelectPhong">
                                        <option value="" selected>- Chọn Phông -</option>
                    					<#assign x = 0>
                    					<#list data.items as child>
                    						<#assign x=x+1>
                                            <option value="${child.name}">${child.name}</option>
                    					</#list>
                                    	</SELECT>
		        </h4>
		        <p class="text-center">&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;&macr;</p>
		    </div>
		    <div class="row">
		        <div class="panel-body">
		            <p>Tên phông:&nbsp;&nbsp;<span id="TenPhong"></span></p>
		            <p>Số mét giá:&nbsp;&nbsp;<span id="SoMet"></span> mét</p>
		            <p>Số văn bản có dấu "Mật":&nbsp;&nbsp;<span id="SoVBMat"></span></p>
		            <p>Số văn bản có dấu "Tối mật":&nbsp;&nbsp;<span id="SoVBToiMat"></span></p>
		            <p>Số văn bản có dấu "Tuyệt mật":&nbsp;&nbsp;<span id="SoVBTuyetMat"></span></p>
		        </div>
		    </div>
		    <div class="row">
		        <p><b>1. Tài liệu văn bản có dấu "Mật"</b></p>
		        <div class="table-responsive">
		            <table class="table table-bordered table-Mat" id="table-Mat">
		                <thead>
		                <tr>
		                    <th class="col-md-1 text-center">STT</th>
		                    <th class="col-md-2 text-center">Số, ký hiệu văn bản</th>
		                    <th class="col-md-2 text-center">Ngày, tháng văn bản</th>
		                    <th class="col-md-2 text-center">Tác giả văn bản</th>
		                    <th class="col-md-3 text-center">Trích yếu nội dung văn bản</th>
		                    <th class="col-md-1 text-center">Tờ số</th>
		                    <th class="col-md-1 text-center">Số trang (A4)</th>
		                </tr>
		                </thead>
                        <tbody>

                        </tbody>
		            </table>
		        </div>
		    </div>
		    <div class="row">
		        <p><b>2. Tài liệu văn bản có dấu "Tối mật", "Tuyệt mật"</b></p>
		        <div class="table-responsive">
		            <table class="table table-bordered table-Toi-Tuyet-Mat" id="table-Toi-Tuyet-Mat">
		                <thead>
		                <tr>
		                    <th class="col-md-1 text-center">STT</th>
		                    <th class="col-md-2 text-center">Số, ký hiệu văn bản</th>
		                    <th class="col-md-2 text-center">Ngày, tháng văn bản</th>
		                    <th class="col-md-2 text-center">Tác giả văn bản</th>
		                    <th class="col-md-3 text-center">Trích yếu nội dung văn bản</th>
		                    <th class="col-md-1 text-center">Tờ số</th>
		                    <th class="col-md-1 text-center">Số trang (A4)</th>
		                </tr>
		                </thead>
		                <tbody>

		                </tbody>
		            </table>
		        </div>
		    </div>
		    <div class="row">
		        <button type="button" title="Quay về kho" class="btn btn-default">Quay trở về kho</button>
		        <button type="button" title="In báo cáo ra word" class="btn btn-default word-export" id="BCTKTaiLieuMatTungPhong"><span class='glyphicon glyphicon-print'></span></button>
		    </div>
		</div>
      </div>
   </@>
</@>
<script>
    $(document).ready(function () {



    });

</script>
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/jquery.js"></script>
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/report/6.js"></script>
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/plugins/dataTables/jquery.dataTables.js"></script>
<script type="text/javascript" src="${url.context}/res/components/QuangBinh/Scripts/plugins/dataTables/dataTables.bootstrap.js"></script>

