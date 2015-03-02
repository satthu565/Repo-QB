$(document).ready(function(){

});
$("#selectPhong").change(displayData);
displayData();
var metgia = "", hopso = "", hoso = "", tenphong ="";
function displayData()
{
    $(".trbody").remove();
    window.dataVanBan = null;
    metgia = "", hopso = "", hoso = "", tenphong ="";
    var Phong = $("#selectPhong").val();
    tenphong = Phong;
    var url = YAHOO.lang.substitute(Alfresco.constants.PROXY_URI_RELATIVE + "zalu/report/7?name=" + Phong);
    $.get(url, function(data){
        if(data != undefined) {
            var dem = 0;
            $(".phong").html(Phong);
            if (data.Phong.fo2 != -1)
            {
                metgia = "" + data.Phong.fo2 / 8;
                hopso = "" + data.Phong.fo2;
            }
            if(data.Phong.fo3 != -1)
            {
                hoso = "" + data.Phong.fo3;
            }
            $(".metgia").html(metgia);
            $(".hopso").html(hopso);
            $(".hoso").html(hoso);
            $(".odd").remove();
            window.dataVanBan = data;
            /*for(var item in data.TaiLieu)
             {
             if(data.TaiLieu[item].DoMat == "1") {
             $(".table-minhpt").append('<tr class="trbody">' +
             '<td class="col-md-1 text-center">' + dem++ + '</td>' +
             '<td class="col-md-1 text-center">' + data.TaiLieu[item].SoKyHieuVanBan + '</td>' +
             '<td class="col-md-2 text-center">' + data.TaiLieu[item].NgayThang + '</td>' +
             '<td class="col-md-2">' + data.TaiLieu[item].TacGia + '</td>' +
             '<td class="col-md-3">' + data.TaiLieu[item].TrichYeuNoiDung + '</td>' +
             '<td class="col-md-1 text-center">' + data.TaiLieu[item].SoTrang + '</td>' +
             '<td class="col-md-1 text-center">' + data.TaiLieu[item].DoMat + '</td>' +
             '<td class="col-md-1 text-center">' + data.TaiLieu[item].GhiChu + '</td>' +
             '</tr>');
             }
             }*/
            var datatable = [];
            var HoSoMat = 0;
            if (data.TaiLieu.length > 0) {
                for (var i = 0; i < data.TaiLieu.length; i++) {
                    if ((data.TaiLieu[i].DoMat == "1")) {
                        HoSoMat++;
                        datatable.push([HoSoMat, data.TaiLieu[i].SoKyHieuVanBan, data.TaiLieu[i].NgayThang, data.TaiLieu[i].TacGia, data.TaiLieu[i].TrichYeuNoiDung, data.TaiLieu[i].ToSo, data.TaiLieu[i].DoMat,data.TaiLieu[i].GhiChu]);
                    }
                }
            }
            $('.table-minhpt').dataTable().fnDestroy();
            $('.table-minhpt thead tr').remove();
            $('.table-minhpt thead').append('<tr>' +
            '<th class="col-md-1 text-center">STT</th>' +
            '<th class="col-md-1 text-center">Số, ký hiệu văn bản</th>' +
            '<th class="col-md-2 text-center">Ngày, tháng văn bản</th>' +
            '<th class="col-md-2 text-center">Tác giả văn bản</th>' +
            '<th class="col-md-3 text-center">Trích yếu nội dung văn bản</th>' +
            '<th class="col-md-1 text-center">Tờ số</th>' +
            '<th class="col-md-1 text-center">Độ mật</th>' +
            '<th class="col-md-1 text-center">Ghi chú</th>' +
            '</tr>');
            $('.table-minhpt').dataTable({
                data: datatable,
                retrieve: datatable
            });
            $("#dataTables-example_filter").css("float","right");
            $("#dataTables-example_paginate").css("float","right");
        }
    });
}
$(".word-export").click(function (event) {
    var getIDName = $(this).attr('id');
    $("#page-content").wordExport("TenFileBC" + getIDName, getIDName, window.dataVanBan);
});

if (typeof jQuery !== "undefined" && typeof saveAs !== "undefined") {
    (function ($) {
        $.fn.wordExport = function(reportname, getID, data) {
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
            markup.each(function() {
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
            var b = "" ;
            var booksToRead;
            var stylesheet = "border:solid black 1.0pt;border-left:none;mso-border-left-alt:solid black .5pt;mso-border-alt:solid black .5pt;padding:0cm 5.4pt 0cm 5.4pt'>";
            var stylesheet1 = "<p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt'>";
            var content = "";
            var dem = 0;
            for(var item in data.TaiLieu)
            {
                if(data.TaiLieu[item].DoMat == "1") {
                    dem++;
                    content += "<tr>" +
                    "<td>" +
                    "<p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center;width: 1%'>" + dem + "</p>" +
                    "</td>" +
                    "<td>" +
                    "<p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center;width: 30%'>" + data.TaiLieu[item].SoKyHieuVanBan + "</p>" +
                    "</td>" +
                    "<td>" +
                    "<p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center;width: 5%'>" + data.TaiLieu[item].NgayThang + "</p></td>" +
                    "<td>" +
                    "<p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center;width: 30%'>" + data.TaiLieu[item].TacGia + "</p></td>" +
                    "<td>" +
                    "<p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center;width: 30%'>" + data.TaiLieu[item].TrichYeuNoiDung + "</p></td>" +
                    "<td>" +
                    "<p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center;width: 1%'>" + data.TaiLieu[item].ToSo + "</p></td>" +
                    "<td>" +
                    "<p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center;width: 1%'>" + data.TaiLieu[item].DoMat + "</p></td>" +
                    "<td>" +
                    "<p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center;width: 2%'>" + data.TaiLieu[item].GhiChu + "</p></td>" +
                    "</tr>";
                }
            }

            booksToRead = "<table style='width: 100%'>" +
            "<tr><td style='width: 40%; text-align: center;'><b>SỞ NỘI VỤ TỈNH QUẢNG BÌNH</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b></td></tr>" +
            "<tr><td style='width: 40%; text-align: center;'><b>CHI CỤC VĂN THƯ - LƯU TRỮ</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>Độc lập - Tự do - Hạnh phúc</b></td></tr>" +
            "<tr><td style='width: 40%; text-align: center;'><b>___________</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>_______________________</b></td></tr>" +
            "<tr><td style='width: 40%; text-align: center;'><b></b></td><td style='width: 60%; text-align: right; font-style: italic'>Quảng Bình, ngày …  tháng … năm 201…</td></tr>" +
            "</table>" + "<br/>" +
            "<table style='width: 100%'>" +
            "<tr style='width: 100%; text-align: center'><td><p style='font-size: 13pt'><b>BÁO CÁO</b></p></td></tr>" +
            "</table>" +
            "<table style='width: 100%'>" +
            "<tr style='width: 100%; text-align: center'><td><p style='font-size: 13pt'><b>Thống kê tài liệu có dấu chỉ các mức độ mật đến hạn tự giải mật</b></p></td></tr>" +
            "</table>" +
            "<table style='width: 100%'>" +
            "<tr style='width: 100%; text-align: center'><td><p style='font-size: 13pt'><b>thuộc Phông Lưu trữ  &lt;dữ liệu đầu vào&gt;</b></p></td></tr>" +
            "</table>" +
            "<table style='width: 100%'>" +
            "<tr><td style='width: 100%; text-align: center;'><b>___________</b></td></tr>" +
            "</table>" +
            "<br/>" +
            "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Tên phông:  "+ tenphong +"<o:p></o:p></span></p>" +
            "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Số mét giá: "+ metgia +".<o:p></o:p></span></p>" +
            "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Tổng số hộp: "+ hopso +"<o:p></o:p></span></p>" +
            "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Tổng số hồ sơ: "+ hoso +"<o:p></o:p></span></p>" +
            "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Danh mục tài liệu có dấu chỉ các mức độ mật:<o:p></o:p></span></p>" +
            "<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 style='margin-left:5.4pt;border-collapse:collapse;border:none;mso-border-alt:solid black .5pt;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt;mso-border-insideh:.5pt solid black;mso-border-insidev:.5pt solid black;width: 100%'>" +
            "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'><td style='width:5%;border:solid black 1.0pt;mso-border-alt:solid black .5pt;padding:0cm 5.4pt 0cm 5.4pt'><p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt'>STT<o:p></o:p></span></p></td><td style='15%; " + stylesheet + stylesheet1 +
            "Số, ký hiệu văn bản</span></p></td>" +
            "<td style='width:15%; " + stylesheet + stylesheet1 +
            "Ngày, tháng văn bản</span></p></td>" +
            "<td style='width:15%; " + stylesheet + stylesheet1 +
            "Tác giả văn bản</span></p></td>" +
            "<td style='width:20%; " + stylesheet + stylesheet1 +
            "Trích yếu nội dung văn bản</span></p></td>" +
            "<td style='width:5%; " + stylesheet + stylesheet1 +
            "Số tờ</span></p></td>" +
            "<td style='width:5%; " + stylesheet + stylesheet1 +
            "Độ mật</span></p></td>" +
            "<td style='width:20%; " + stylesheet + stylesheet1 +
            "Ghi chú</span></p></td></tr>" +
            content +
            "</table><br/>" +
            "<p class=MsoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-indent:1.0cm'><span style='mso-bidi-font-size:13.0pt;font-weight:normal'>Tổ Số hóa tài liệu lưu trữ kính báo cáo./.</span></p>" +
            "<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 style='width:100%;border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt'>" +
            "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:88.85pt'><td valign=top style='width:40%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri;letter-spacing:-.1pt'><b>NGƯỜI LẬP</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri;letter-spacing:-.1pt'><o:p>&nbsp;</o:p></span></p></td><td valign=top style='width:60%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri'><b>CHI CỤC TRƯỞNG</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri'><o:p>&nbsp;</o:p></span></p></td></tr><tr><td></td><td></td></tr>" +
            "</table>";

            // Aggregate parts of the file together
            var fileContent = static.mhtml.top.replace("_html_",static.mhtml.head.replace("_styles_", styles) + static.mhtml.body.replace("_body_",booksToRead)) + mhtmlBottom;

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
    };
}