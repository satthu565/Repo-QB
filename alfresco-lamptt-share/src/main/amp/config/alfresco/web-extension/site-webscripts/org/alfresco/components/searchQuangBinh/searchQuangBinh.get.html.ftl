<@markup id="css" >
   <#-- CSS Dependencies -->
   <#include "../form/form.css.ftl"/>
   <@link href="${url.context}/res/components/QuangBinh/bootstrap/css/bootstrap.min.css" group="search"/>
</@>

<@markup id="js">
   <#-- JavaScript Dependencies -->
   <#include "../form/form.js.ftl"/>
   <@script src="${url.context}/res/components/QuangBinh/Scripts/jquery.js" group="search"/>
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
	            <div class="col-lg-4 col-md-6">
	                <div class="panel panel-default">
	                    <div class="panel-heading">
	                        <p><b>Mẫu 1 - Chung</b></p>
	                        <p>BC Thống kê tài liệu</p>
	                    </div>
	                    <a href="/share/page/reportQB-Mau1" target="_blank">
	                        <div class="panel-footer">
	                            <span class="pull-left">Báo cáo</span>
	                            <span class="glyphicon glyphicon-circle-arrow-right pull-right"></span>
	                            <div class="clearfix"></div>
	                        </div>
	                    </a>
	                </div>
	            </div>
	            <div class="col-lg-4 col-md-6">
	                <div class="panel panel-default">
	                    <div class="panel-heading">
	                        <p><b>Mẫu 2 - Cũ</b></p>
	                        <p>BC Thống kê tài liệu xuống cấp</p>
	                    </div>
	                    <a href="/share/page/reportQB-Mau2" target="_blank">
	                        <div class="panel-footer">
	                            <span class="pull-left">Báo cáo</span>
	                            <span class="glyphicon glyphicon-circle-arrow-right pull-right"></span>
	                            <div class="clearfix"></div>
	                        </div>
	                    </a>
	                </div>
	            </div>
	            <div class="col-lg-4 col-md-6">
	                <div class="panel panel-default">
	                    <div class="panel-heading">
	                        <p><b>Mẫu 3 - Chung cho cả tổ</b></p>
	                        <p>BC Thống kê số hóa tài liệu</p>
	                    </div>
	                    <a href="/share/page/reportQB-Mau3" target="_blank">
	                        <div class="panel-footer">
	                            <span class="pull-left">Báo cáo</span>
	                            <span class="glyphicon glyphicon-circle-arrow-right pull-right"></span>
	                            <div class="clearfix"></div>
	                        </div>
	                    </a>
	                </div>
	            </div>
	            <div class="col-lg-4 col-md-6">
	                <div class="panel panel-default">
	                    <div class="panel-heading">
	                        <p><b>Mẫu 4 - Từng cá nhân</b></p>
	                        <p>BC Thống kê số hóa tài liệu</p>
	                    </div>
	                    <a href="/share/page/reportQB-Mau4" target="_blank">
	                        <div class="panel-footer">
	                            <span class="pull-left">Báo cáo</span>
	                            <span class="glyphicon glyphicon-circle-arrow-right pull-right"></span>
	                            <div class="clearfix"></div>
	                        </div>
	                    </a>
	                </div>
	            </div>
	            <div class="col-lg-4 col-md-6">
	                <div class="panel panel-default">
	                    <div class="panel-heading">
	                        <p><b>Mẫu 5 - Tất cả các phông</b></p>
	                        <p>BC Thống kê tài liệu mật</p>
	                    </div>
	                    <a href="/share/page/reportQB-Mau5" target="_blank">
	                        <div class="panel-footer">
	                            <span class="pull-left">Báo cáo</span>
	                            <span class="glyphicon glyphicon-circle-arrow-right pull-right"></span>
	                            <div class="clearfix"></div>
	                        </div>
	                    </a>
	                </div>
	            </div>
	            <div class="col-lg-4 col-md-6">
	                <div class="panel panel-default">
	                    <div class="panel-heading">
	                        <p><b>Mẫu 6 - Từng phông</b></p>
	                        <p>BC Thống kê tài liệu mật</p>
	                    </div>
	                    <a href="/share/page/reportQB-Mau6" target="_blank">
	                        <div class="panel-footer">
	                            <span class="pull-left">Báo cáo</span>
	                            <span class="glyphicon glyphicon-circle-arrow-right pull-right"></span>
	                            <div class="clearfix"></div>
	                        </div>
	                    </a>
	                </div>
	            </div>
	            <div class="col-lg-4 col-md-6">
	                <div class="panel panel-default">
	                    <div class="panel-heading">
	                        <p><b>Mẫu 7 - Từng phông</b></p>
	                        <p>BC Thống kê tài liệu mật đến hạn giải mật</p>
	                    </div>
	                    <a href="/share/page/reportQB-Mau7" target="_blank">
	                        <div class="panel-footer">
	                            <span class="pull-left">Báo cáo</span>
	                            <span class="glyphicon glyphicon-circle-arrow-right pull-right"></span>
	                            <div class="clearfix"></div>
	                        </div>
	                    </a>
	                </div>
	            </div>
	            <div class="col-lg-4 col-md-6">
	                <div class="panel panel-default">
	                    <div class="panel-heading">
	                        <p><b>Mẫu 8 - Từng phông</b></p>
	                        <p>Mục lục hồ sơ</p>
	                    </div>
	                    <a href="/share/page/reportQB-Mau8" target="_blank">
	                        <div class="panel-footer">
	                            <span class="pull-left">Báo cáo</span>
	                            <span class="glyphicon glyphicon-circle-arrow-right pull-right"></span>
	                            <div class="clearfix"></div>
	                        </div>
	                    </a>
	                </div>
	            </div>
	            <div class="col-lg-4 col-md-6">
	                <div class="panel panel-default">
	                    <div class="panel-heading">
	                        <p><b>Mẫu 9 - Từng hồ sơ</b></p>
	                        <p>Mục mục văn bản</p>
	                    </div>
	                    <a href="/share/page/reportQB-Mau9" target="_blank" >
	                        <div class="panel-footer">
	                            <span class="pull-left">Báo cáo</span>
	                            <span class="glyphicon glyphicon-circle-arrow-right pull-right"></span>
	                            <div class="clearfix"></div>
	                        </div>
	                    </a>
	                </div>
	            </div>
	        </div>
	    </div>
      </div>
   </@>
</@>