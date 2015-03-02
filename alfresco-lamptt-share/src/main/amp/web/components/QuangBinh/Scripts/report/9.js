/**
 * Created by MinhSatThu on 12/19/2014.
 */

function DisplayFont(){
    var name= $("#select-font").val();
    Showdata(name);
}
$("#select-font").change(DisplayFont)
function Showdata(name){
    var url = YAHOO.lang.substitute(Alfresco.constants.PROXY_URI_RELATIVE + "/zalu/report/9?name="+name  );
    $.get(url, function(data){
        var dem=0;
        var datatable=[];
        if(data.Items.length>0) {
            for (var i=0; i<data.Items.length;i++) {
                dem++;
                datatable.push([dem,data.Items[i].SoKyHieuVanBan,data.Items[i].NgayThangVanBan,data.Items[i].TacGia,data.Items[i].TrichYeuNoiDung,data.Items[i].SoTrang,data.Items[i].GhiChu]);
            }
        }

        $('.minhlv').dataTable().fnDestroy();
        $('.minhlv thead tr').remove();
        $('.minhlv thead').append('<tr><th class="col-md-1 text-center">STT</th><th class="col-md-2 text-center">Số, ký hiệu văn bản</th><th class="col-md-2 text-center">Ngày, tháng văn bản</th><th class="col-md-2 text-center">Tác giả văn bản</th><th class="col-md-3 text-center">Trích yếu nội dung văn bản</th><th class="col-md-1 text-center">Tờ số</th><th class="col-md-1 text-center">Ghi chú</th></tr>');
        $('.minhlv').dataTable({
            data: datatable,
            retrieve: datatable
        });
        $("#dataTables-example_filter").css("float","right");
        $("#dataTables-example_paginate").css("float","right");
    });
}

$(".word-export").click(function (event) {
    var getIDName = $(this).attr('id');
    var  data1 = window.data;
    var name= $("#select-font").val();
    var url = YAHOO.lang.substitute(Alfresco.constants.PROXY_URI_RELATIVE + "/zalu/report/9?name="+name  );
    $.get(url, function(data) {
        $("#page-content").wordExport("Báo cáo 9" , getIDName, data );
    })
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
            var dem=0;
            if (data != undefined) {
                if (data.Items.length > 0) {
                    $('.minhlv').append('<tbody>');
                    for (var i = 0; i < data.Items.length; i++) {
                        content += "<tr>" +
                        "<td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'>" + dem++ + "</p>" + "</td>" +
                        "<td>" + data.Items[i].SoKyHieuVanBan + "</td>" +
                        "<td>" + data.Items[i].NgayThangVanBan + "</td>" +
                        "<td>" + data.Items[i].TacGia + "</td>" +
                        "<td>" + data.Items[i].TrichYeuNoiDung + "</td>" +
                        "<td>" + data.Items[i].SoTrang + "</td>" +
                        "<td>" + data.Items[i].GhiChu + "</td>" +
                        "</tr>";
                    }
                    $('.minhlv').append('</tbody>');
                }
            }
            booksToRead = "<table style='width: 100%'>" +
            "<tr><td style='width: 40%; text-align: center;'><b>SỞ NỘI VỤ TỈNH QUẢNG BÌNH</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b></td></tr>" +
            "<tr><td style='width: 40%; text-align: center;'><b>CHI CỤC VĂN THƯ - LƯU TRỮ</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>Độc lập - Tự do - Hạnh phúc</b></td></tr>" +
            "<tr><td style='width: 40%; text-align: center;'><b>___________</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>_______________________</b></td></tr>" +
            "<tr><td style='width: 40%; text-align: center;'><b></b></td><td style='width: 60%; text-align: right; font-style: italic'>Quảng Bình, ngày …  tháng … năm 201…</td></tr>" +
            "</table><br/>" +
            "<table style='width: 100%'>" +
            "<tr style='width: 100%; text-align: center'><td><p style='font-size: 16pt'><b>MỤC LỤC VĂN BẢN</b></p></td></tr>" +
            "</table>" +
            "<br/>" +
            "<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 style='margin-left:5.4pt;border-collapse:collapse;border:none;mso-border-alt:solid black .5pt;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt;mso-border-insideh:.5pt solid black;mso-border-insidev:.5pt solid black;width: 100%'>" +
            "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'><td style='width:10%;border:solid black 1.0pt;mso-border-alt:solid black .5pt;padding:0cm 5.4pt 0cm 5.4pt'><p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt'>TT<o:p></o:p></span></p></td><td style='15%; " + stylesheet + stylesheet1 +
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
            "Ghi chú</span></p></td></tr>" + content +

            "</table><br/>" +
            "<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 style='border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt; width:100%'>" +
            "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:88.85pt'><td valign=top style='width:40%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'></td><td valign=top style='width:60%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='text-align:center'><span style='font-weight:normal; font-size:14pt'>Qu&#7843;ng Bình, ngày … tháng … n&#259;m 20…<o:p></o:p></span></p><p class=MsoNormal align=center style='text-align:center; font-size:14pt'><b>Ng&#432;&#7901;i l&#7853;p h&#7891; s&#417;</b></p><p class=MsoNormal align=center style='text-align:center'><o:p>&nbsp;</o:p></p></td></tr><tr><td></td><td></td></tr>" +
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