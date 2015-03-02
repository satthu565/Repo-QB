function TenPhong() {
    var TenPhong = $('.SelectPhong').val();
    displayData(TenPhong);
}

$('.SelectPhong').change(TenPhong);

function displayData(TenPhong) {

    $("#TenPhong").html(TenPhong);
    $("#SoMet").html("");
    $("#SoVBMat").html("");
    $("#SoVBToiMat").html("");
    $("#SoVBTuyetMat").html("");
    var url = YAHOO.lang.substitute(Alfresco.constants.PROXY_URI_RELATIVE + "/zalu/report/6?name=" + TenPhong);
    $.get(url, function (data) {
        /*        var soTrangScan ="";
         var tongSoVB ="";*/
        if (data != undefined) {
            /*              soTrangScan = data.User.SoTrangA4;
             tongSoVB = data.User.SoVanBanNhapLieu;*/
            if (data.Phong.fo2 > 0) $("#SoMet").html(data.Phong.fo2/8);
            else {
                $("#SoMet").html("Không có mét nào");
            }
            if (data.Phong.mat2 > 0) $("#SoVBMat").html(data.Phong.mat2 + "&nbsp;văn bản");
            else {
                $("#SoVBMat").html("Không có văn bản nào");
            }
            if (data.Phong.mat3 > 0) $("#SoVBToiMat").html(data.Phong.mat3 + "&nbsp;văn bản");
            else {
                $("#SoVBToiMat").html("Không có văn bản nào");
            }
            if (data.Phong.mat4 > 0) $("#SoVBTuyetMat").html(data.Phong.mat4 + "&nbsp;văn bản");
            else {
                $("#SoVBTuyetMat").html("Không có văn bản nào");
            }
        }
        var HoSoMat = 0;
        var HoSoToiTuyetMat = 0;
        var tableMatRow = "";
        var tableToiTuyetMatRow = "";
        var contentMat = "";
        var contentTTMat = "";
        var NumberRow1 = 0;
        var TableData = new Array();

        var datatable = [];
        var datatable1 = [];
        if (data.TaiLieu.length > 0) {
            for (var i = 0; i < data.TaiLieu.length; i++) {
                if ((data.TaiLieu[i].DoMat == "2")) {
                    HoSoMat++;
                    datatable.push([HoSoMat,data.TaiLieu[i].SoKyHieuVanBan,data.TaiLieu[i].NgayThang,data.TaiLieu[i].TacGia,data.TaiLieu[i].TrichYeuNoiDung,data.TaiLieu[i].SoTrang,data.TaiLieu[i].GhiChu]);

                }
                else if ((data.TaiLieu[i].DoMat == "3") || (data.TaiLieu[i].DoMat == "4")) {
                    HoSoToiTuyetMat++;
                    datatable1.push([HoSoToiTuyetMat,data.TaiLieu[i].SoKyHieuVanBan,data.TaiLieu[i].NgayThang,data.TaiLieu[i].TacGia,data.TaiLieu[i].TrichYeuNoiDung,data.TaiLieu[i].SoTrang,data.TaiLieu[i].GhiChu]);
                }
            }

        }
        /*if( $.fn.dataTable.isDataTable( '#table-Mat' ) ){
         $('#table-Mat').dataTable({
         paging :false,
         searching: false,
         retrieve:true
         });
         }
         else{
         $('#table-Mat').dataTable({
         data: datatable
         });
         }*/
        $('#table-Mat').dataTable().fnDestroy();
        $('#table-Mat thead tr').remove();
        $('#table-Mat thead').append('<tr><th class="col-md-1 text-center">STT</th><th class="col-md-2 text-center">Số, ký hiệu văn bản</th><th class="col-md-2 text-center">Ngày, tháng văn bản</th><th class="col-md-2 text-center">Tác giả văn bản</th><th class="col-md-3 text-center">Trích yếu nội dung văn bản</th><th class="col-md-1 text-center">Tờ số</th><th class="col-md-1 text-center">Số trang (A4)</th></tr>');
        $('#table-Mat').dataTable({

            data: datatable,
            retrieve: datatable
        });
        $("#table-Mat_filter").css("float","right");
        $("#table-Mat_paginate").css("float","right");
        $('#table-Toi-Tuyet-Mat thead tr').remove();
        $('#table-Toi-Tuyet-Mat thead').append('<tr><th class="col-md-1 text-center">STT</th><th class="col-md-2 text-center">Số, ký hiệu văn bản</th><th class="col-md-2 text-center">Ngày, tháng văn bản</th><th class="col-md-2 text-center">Tác giả văn bản</th><th class="col-md-3 text-center">Trích yếu nội dung văn bản</th><th class="col-md-1 text-center">Tờ số</th><th class="col-md-1 text-center">Số trang (A4)</th></tr>');
        $('#table-Toi-Tuyet-Mat').dataTable().fnDestroy();
        $('#table-Toi-Tuyet-Mat').dataTable({
            data: datatable1,
            retrieve: datatable1
        });
        $("#table-Toi-Tuyet-Mat_filter").css("float","right");
        $("#table-Toi-Tuyet-Mat_paginate").css("float","right");
        window.data = data;

    });
}

$(".word-export").click(function (event) {
    var getIDName = $(this).attr('id');
    var data1 = window.data;
    var tenphong = $('.SelectPhong').val();
    $("#page-content").wordExport("TenFileBC" + getIDName, getIDName, data1, tenphong);
});


if (typeof jQuery !== "undefined" && typeof saveAs !== "undefined") {
    (function ($) {
        $.fn.wordExport = function (reportname, getID, data, TenPhong) {
            fileName = typeof fileName !== 'undefined' ? fileName : reportname;
            var static = {
                mhtml: {
                    top: "Mime-Version: 1.0\nContent-Base: " + location.href + "\nContent-Type: Multipart/related; boundary=\"NEXT.ITEM-BOUNDARY\";type=\"text/html\"\n\n--NEXT.ITEM-BOUNDARY\nContent-Type: text/html; charset=\"utf-8\"\nContent-Location: " + location.href + "\n\n<!DOCTYPE html>\n<html>\n_html_</html>",
                    head: "<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<style>\n_styles_\n</style>\n</head>\n",
                    body: "<body>_body_</body>"
                }
            };
            var options = {
                maxWidth: 624
            };
            // Clone selected element before manipulating it
            var markup = $(this).clone();

            // Remove hidden elements from the output
            markup.each(function () {
                var self = $(this);
                if (self.is(':hidden'))
                    self.remove();
            });

            // Embed all images using Data URLs
            var images = Array();
            var img = markup.find('img');
            for (var i = 0; i < img.length; i++) {
                // Calculate dimensions of output image
                var w = Math.min(img[i].width, options.maxWidth);
                var h = img[i].height * (w / img[i].width);
                // Create canvas for converting image to data URL
                $('<canvas>').attr("id", "jQuery-Word-export_img_" + i).width(w).height(h).insertAfter(img[i]);
                var canvas = document.getElementById("jQuery-Word-export_img_" + i);
                canvas.width = w;
                canvas.height = h;
                // Draw image to canvas
                var context = canvas.getContext('2d');
                context.drawImage(img[i], 0, 0, w, h);
                // Get data URL encoding of image
                var uri = canvas.toDataURL();
                $(img[i]).attr("src", img[i].src);
                img[i].width = w;
                img[i].height = h;
                // Save encoded image to array
                images[i] = {
                    type: uri.substring(uri.indexOf(":") + 1, uri.indexOf(";")),
                    encoding: uri.substring(uri.indexOf(";") + 1, uri.indexOf(",")),
                    location: $(img[i]).attr("src"),
                    data: uri.substring(uri.indexOf(",") + 1)
                };
                // Remove canvas now that we no longer need it
                canvas.parentNode.removeChild(canvas);
            }

            // Prepare bottom of mhtml file with image data
            var mhtmlBottom = "\n";
            for (var i = 0; i < images.length; i++) {
                mhtmlBottom += "--NEXT.ITEM-BOUNDARY\n";
                mhtmlBottom += "Content-Location: " + images[i].contentLocation + "\n";
                mhtmlBottom += "Content-Type: " + images[i].contentType + "\n";
                mhtmlBottom += "Content-Transfer-Encoding: " + images[i].contentEncoding + "\n\n";
                mhtmlBottom += images[i].contentData + "\n\n";
            }
            mhtmlBottom += "--NEXT.ITEM-BOUNDARY--";

            //TODO: load css from included stylesheet
            var styles = "";
            var a = "hello";
            var b = "";
            var booksToRead;
            var stylesheet = "border:solid black 1.0pt;border-left:none;mso-border-left-alt:solid black .5pt;mso-border-alt:solid black .5pt;padding:0cm 5.4pt 0cm 5.4pt'>";
            var stylesheet1 = "<p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt'>";
            var content = "";
            var metgia = "", tenphong = "";
            var HoSoMat = 0;
            var HoSoToiTuyetMat = 0;
            var tableMat = "";
            var tableTTMat = "";
            if (data.TaiLieu.length > 0) {
                for (var i = 0; i < data.TaiLieu.length; i++) {
                    if ((data.TaiLieu[i].DoMat == "2")) {
                        HoSoMat++;
                        tableMat += "<tr>" + "<td style='padding:2px;text-align: center'>" + HoSoMat + "</td><td style='padding:2px;text-align: center'>" + data.TaiLieu[i].SoKyHieuVanBan + "</td><td style='padding:2px;text-align: center'>" + data.TaiLieu[i].NgayThang + "</td><td style='padding:2px;text-align: center'>" + data.TaiLieu[i].TacGia + "</td><td style='padding:2px;text-align: center'>" + data.TaiLieu[i].TrichYeuNoiDung + "</td><td style='padding:2px;text-align: center'>" + data.TaiLieu[i].SoTrang + "</td><td style='padding:2px;text-align: center'></td></tr>";

                    }
                    else if ((data.TaiLieu[i].DoMat == "3") || (data.TaiLieu[i].DoMat == "4")) {
                        HoSoToiTuyetMat++;
                        tableTTMat += "<tr>" + "<td style='padding:2px;text-align: center'>" + HoSoToiTuyetMat + "</p></td><td style='padding:2px;text-align: center'>" + data.TaiLieu[i].SoKyHieuVanBan + "</td><td style='padding:2px;text-align: center'>" + data.TaiLieu[i].NgayThang + "</td><td style='padding:2px;text-align: center'>" + data.TaiLieu[i].TacGia + "</td><td style='padding:2px;text-align: center'>" + data.TaiLieu[i].TrichYeuNoiDung + "</td><td style='padding:2px;text-align: center'>" + data.TaiLieu[i].SoTrang + "</td><td style='padding:2px;text-align: center'></td></tr>";
                    }
                }
            }
            var metgia = 0;
            var soTaiLieuMat = "";
            var soTaiLieuToiMat = "";
            var soTaiLieuTuyetMat = "";

            if (data.Phong.fo2 <= 0) metgia = 0; else metgia = data.Phong.fo2 / 8;
            if (data.Phong.mat2 <= 0) soTaiLieuMat = "Không có tài liệu nào";
            else soTaiLieuMat = data.Phong.mat2 + "văn bản";
            if (data.Phong.mat3 <= 0) soTaiLieuToiMat = "Không có tài liệu nào";
            else soTaiLieuToiMat = data.Phong.mat3 + "văn bản";
            if (data.Phong.mat4 <= 0) soTaiLieuTuyetMat = "Không có tài liệu nào";
            else soTaiLieuTuyetMatMat = data.Phong.mat4 + "văn bản";

            booksToRead = "<table style='width: 100%'>" +
            "<tr><td style='width: 40%; text-align: center;'><b>SỞ NỘI VỤ TỈNH QUẢNG BÌNH</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b></td></tr>" +
            "<tr><td style='width: 40%; text-align: center;'><b>CHI CỤC VĂN THƯ - LƯU TRỮ</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>Độc lập - Tự do - Hạnh phúc</b></td></tr>" +
            "<tr><td style='width: 40%; text-align: center;'><b>___________</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>_______________________</b></td></tr>" +
            "<tr><td style='width: 40%; text-align: center;'><b></b></td><td style='width: 60%; text-align: right; font-style: italic'>Quảng Bình, ngày …  tháng … năm 201…</td></tr>" +
            "</table>" + "<br/>" +
            "<table style='width: 100%'>" +
            "<tr style='width: 100%; text-align: center'><td><p style='font-size: 14pt'><b>BÁO CÁO</b></p></td></tr>" +
            "</table>" +
            "<table style='width: 100%'>" +
            "<tr style='width: 100%; text-align: center'><td><p style='font-size: 14pt'><b>Thống kê tài liệu có dấu chỉ các mức độ mật Phông Lưu trữ :&nbsp;" + TenPhong + "</b></p></td></tr>" +
            "</table>" +
            "<table style='width: 100%'>" +
            "<tr><td style='width: 100%; text-align: center;'><b>___________</b></td></tr>" +
            "</table>" +
            "<br/>" +
            "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>- Tên phông: " + TenPhong + "</span></p>" +
            "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>- Số mét giá:" + metgia + " mét</span></p>" +
            "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>- Số văn bản có dấu Mật :  " + soTaiLieuMat + "</span></p>" +
            "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>- Số văn bản có dấu Tối mật : " + soTaiLieuToiMat + "</span></p>" +
            "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>- Số văn bản có dấu Tuyệt mật : " + soTaiLieuTuyetMat + "</span></p>" +
            "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'><b>1. Danh mục tài liệu có dấu &ldquo;Mật&rdquo;</b></span></p>" +
            "<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 style='margin-left:5.4pt;border-collapse:collapse;border:none;mso-border-alt:solid black .5pt;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt;mso-border-insideh:.5pt solid black;mso-border-insidev:.5pt solid black;width: 100%'>" +
            "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'><td style='width:10%;border:solid black 1.0pt;mso-border-alt:solid black .5pt;padding:0cm 5.4pt 0cm 5.4pt'><p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt'>STT<o:p></o:p></span></p></td><td style='15%; " + stylesheet + stylesheet1 +
            "Số, ký hiệu văn bản</span></p></td>" +
            "<td style='width:15%; " + stylesheet + stylesheet1 +
            "Ngày, tháng văn bản</span></p></td>" +
            "<td style='width:15%; " + stylesheet + stylesheet1 +
            "Tác giả văn bản</span></p></td>" +
            "<td style='width:25%; " + stylesheet + stylesheet1 +
            "Trích yếu nội dung văn bản</span></p></td>" +
            "<td style='width:10%; " + stylesheet + stylesheet1 +
            "Tờ số</span></p></td>" +
            "<td style='width:10%; " + stylesheet + stylesheet1 +
            "Ghi chú</span></p></td></tr>" +
            tableMat +
            "</table><br/>" +
            "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'><b>2. Danh mục tài liệu có dấu &ldquo;Tối mật&rdquo;, &ldquo;Tuyệt mật&rdquo;</b></span></p>" +
            "<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 style='margin-left:5.4pt;border-collapse:collapse;border:none;mso-border-alt:solid black .5pt;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt;mso-border-insideh:.5pt solid black;mso-border-insidev:.5pt solid black;width: 100%'>" +
            "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'><td style='width:10%;border:solid black 1.0pt;mso-border-alt:solid black .5pt;padding:0cm 5.4pt 0cm 5.4pt'><p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt'>STT<o:p></o:p></span></p></td><td style='15%; " + stylesheet + stylesheet1 +
            "Số, ký hiệu văn bản</span></p></td>" +
            "<td style='width:15%; " + stylesheet + stylesheet1 +
            "Ngày, tháng văn bản</span></p></td>" +
            "<td style='width:15%; " + stylesheet + stylesheet1 +
            "Tác giả văn bản</span></p></td>" +
            "<td style='width:25%; " + stylesheet + stylesheet1 +
            "Trích yếu nội dung văn bản</span></p></td>" +
            "<td style='width:10%; " + stylesheet + stylesheet1 +
            "Tờ số</span></p></td>" +
            "<td style='width:10%; " + stylesheet + stylesheet1 +
            "Ghi chú</span></p></td></tr>" +
            tableTTMat +
            "</table><br/>" +
            "<p class=MsoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-indent:1.0cm'><span style='font-size: 14pt;font-weight:normal'>Tổ Số hóa tài liệu lưu trữ kính báo cáo./.</span></p>" +
            "<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 style='width:100%;border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt'>" +
            "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:88.85pt'><td valign=top style='width:40%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri'><b>NGƯỜI LẬP</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri'><o:p>&nbsp;</o:p></span></p></td><td valign=top style='width:60%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri'><b>CHI CỤC TRƯỞNG</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri'><o:p>&nbsp;</o:p></span></p></td></tr><tr><td></td><td></td></tr>" +
            "</table>";


            // Aggregate parts of the file together
            var fileContent = static.mhtml.top.replace("_html_", static.mhtml.head.replace("_styles_", styles) + static.mhtml.body.replace("_body_", booksToRead)) + mhtmlBottom;

            // Create a Blob with the file contents
            var blob = new Blob([fileContent], {
                type: "application/msword;charset=utf-8"
            });
            saveAs(blob, fileName + ".doc");
        };
    })(jQuery);
} else {
    if (typeof jQuery === "undefined") {
        console.error("jQuery Word Export: missing dependency (jQuery)");
    }
    if (typeof saveAs === "undefined") {
        console.error("jQuery Word Export: missing dependency (FileSaver.js)");
    }
    ;
}
