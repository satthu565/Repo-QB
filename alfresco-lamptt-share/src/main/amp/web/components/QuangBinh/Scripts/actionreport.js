$(".word-export").click(function (event) {
    var getIDName = $(this).attr('id');

    var url = YAHOO.lang.substitute(Alfresco.constants.PROXY_URI_RELATIVE + "/zalu/report/1");
    $.get(url, function(data){
        $("#page-content").wordExport( "TenFileBC" + getIDName, getIDName, data);
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
            switch (getID){

                case "BCTKTaiLieuChung" :{

                    if(data.items.length == 0){
                        content = "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Không có tài liệu hiển thị<o:p></o:p></span></p>";
                    }
                    else{
                        var count = 0;
                        var DataContent = "";
                        for(i = 0;i<data.items.length;i++){
                            count ++;
                            DataContent += "<tr><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'>" + count +"</p></td><td>" + data.items[i].name + "</td><td>" + data.items[i].fo2/8 + "</td><td>" + data.items[i].fo2 + "</td><td>" + data.items[i].fo3 + "</td><td>" + data.items[i].path + "</td><td>" + data.items[i].description + "</td></tr>";
                        }
                        content = "<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 style='margin-left:5.4pt;border-collapse:collapse;border:none;mso-border-alt:solid black .5pt;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt;mso-border-insideh:.5pt solid black;mso-border-insidev:.5pt solid black;width: 100%'>" +
                        "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'><td style='width:10%;border:solid black 1.0pt;mso-border-alt:solid black .5pt;padding:0cm 5.4pt 0cm 5.4pt'><p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt'>TT<o:p></o:p></span></p></td><td style='30%; " + stylesheet + stylesheet1 +
                        "Tên phông/ sưu tập lưu trữ</span></p></td>" +
                        "<td style='width:10%; " + stylesheet + stylesheet1 +
                        "Số mét giá</span></p></td>" +
                        "<td style='width:10%; " + stylesheet + stylesheet1 +
                        "Số hộp</span></p></td>" +
                        "<td style='width:10%; " + stylesheet + stylesheet1 +
                        "Số hồ sơ</span></p></td>" +
                        "<td style='width:15%; " + stylesheet + stylesheet1 +
                        "Kho lưu trữ</span></p></td>" +
                        "<td style='width:15%; " + stylesheet + stylesheet1 +
                        "Ghi chú</span></p></td></tr>" +
                        DataContent +
                        "</table><br/>";
                    }

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
                    "<tr style='width: 100%; text-align: center'><td><p style='font-size: 14pt'><b>Thống kê tài liệu đã số hóa</b></p></td></tr>" +
                    "</table>" +
                    "<table style='width: 100%'>" +
                    "<tr><td style='width: 100%; text-align: center;'><b>___________</b></td></tr>" +
                    "</table>" +
                    "<br/>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Số lượng phông:  " + data.companyhome.fo1 + "<o:p></o:p></span></p>"  +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Tổng số mét giá tài liệu (8 hộp = 1 mét): " + data.companyhome.fo2/8 + "<o:p></o:p></span></p>"  +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Tổng số hộp: " + data.companyhome.fo2 + "<o:p></o:p></span></p>"  +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Tổng số hồ sơ: "  + data.companyhome.fo3 + "<o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Cụ thể:<o:p></o:p></span></p>" +
                    content +
                    "<p class=MsoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-indent:1.0cm'><span style='mso-bidi-font-size:13.0pt;font-weight:normal;font-size:14pt'>Tổ Số hóa tài liệu lưu trữ kính báo cáo./.</span></p>" +
                    "<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 style='width:100%;border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt'>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:88.85pt'><td valign=top style='width:60%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri;letter-spacing:-.1pt'><b>NGƯỜI LẬP</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri;letter-spacing:-.1pt'><o:p>&nbsp;</o:p></span></p></td><td valign=top style='width:60%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri'><b>CHI CỤC TRƯỞNG</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri'><o:p>&nbsp;</o:p></span></p></td></tr><tr><td></td><td></td></tr>" +
                    "</table>";
                    break;
                }
                case "BCTKTaiLieuXuongCap":{
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
                    "<tr style='width: 100%; text-align: center'><td><p style='font-size: 14pt'><b>Thống kê tài liệu hư hỏng, xuống cấp của Phông lưu trữ <dữ liệu đưa vào></b></p></td></tr>" +
                    "</table>" +
                    "<table style='width: 100%'>" +
                    "<tr><td style='width: 100%; text-align: center;'><b>___________</b></td></tr>" +
                    "</table>" +
                    "<br/>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Tên phông: <dữ liệu đưa vào><o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Số lượng mét giá: …….<o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Số lượng văn bản hư hỏng, xuống cấp: …….<o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Tổng số trang văn bản hư hỏng, xuống cấp: ………. <o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Danh mục tài liệu hư hỏng, xuống cấp:<o:p></o:p></span></p>" +
                    "<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 style='width:100%;margin-left:5.4pt;border-collapse:collapse;border:none;mso-border-alt:solid black .5pt;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt;mso-border-insideh:.5pt solid black;mso-border-insidev:.5pt solid black'>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'><td style='width:6%;border:solid black 1.0pt;mso-border-alt:solid black .5pt;padding:0cm 5.4pt 0cm 5.4pt'><p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt'>STT<o:p></o:p></span></p></td><td style='width: 6%; " + stylesheet + stylesheet1 +
                    "Hộp số</span></p></td>" +
                    "<td style='width:6%; " + stylesheet + stylesheet1 +
                    "Hồ sơ</span></p></td>" +
                    "<td style='width:10%; " + stylesheet + stylesheet1 +
                    "Số, ký hiệu văn bản</span></p></td>" +
                    "<td style='width:15%; " + stylesheet + stylesheet1 +
                    "Ngày, tháng văn bản</span></p></td>" +
                    "<td style='width:20%; " + stylesheet + stylesheet1 +
                    "Tác giả văn bản</span></p></td>" +
                    "<td style='width:20%; " + stylesheet + stylesheet1 +
                    "Trích yếu nội dung văn bản</span></p></td>" +
                    "<td style='width:6%; " + stylesheet + stylesheet1 +
                    "Tờ số</span></p></td>" +
                    "<td style='width:6%; " + stylesheet + stylesheet1 +
                    "Số trang (A4)</span></p></td></tr>" +
                    "<tr><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'>1</p></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>" +
                    "</table><br/>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-indent:1.0cm'><span style='mso-bidi-font-size:13.0pt;font-weight:normal;font-size:14pt'>Tổ Số hóa tài liệu lưu trữ kính báo cáo./.</span></p>" +
                    "<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 style='width:100%;border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt'>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:88.85pt'><td valign=top style='width:40%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri;letter-spacing:-.1pt'><b>NGƯỜI LẬP</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri;letter-spacing:-.1pt'><o:p>&nbsp;</o:p></span></p></td><td valign=top style='width:60%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri'><b>CHI CỤC TRƯỞNG</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri'><o:p>&nbsp;</o:p></span></p></td></tr><tr><td></td><td></td></tr>" +
                    "</table>"+
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt'><b><i>Ghi chú (phần này không đưa vào báo cáo):</i></b></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Mẫu báo cáo này dùng để thống kê tài liệu hư hỏng, xuống cấp của một phông tài liệu cụ thể nào đó. Tài liệu được xác định là hư hỏng, xuống cấp được căn cứ thuộc tính Tình trạng vật lý của văn bản. Nếu văn bản mới trường này để trống.</i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Đầu vào: Tên Phông lưu trữ. Tên Phông lưu trữ được chọn từ 1 danh sách có sẵn. Người dùng chỉ chọn, không cho phép nhập vào từ bàn phím.</i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Đầu ra: Báo cáo Thống kê tài liệu xuống cấp</i></span></p>";
                    break;
                }
                case "BCTKSoHoaTaiLieu" :{
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
                    "<tr style='width: 100%; text-align: center'><td><p style='font-size: 14pt'><b>Kết quả số hóa tài liệu </b></p></td></tr>" +
                    "</table>" +
                    "<table style='width: 100%'>" +
                    "<tr style='width: 100%; text-align: center'><td><p style='font-size: 14pt'><b>Từ ngày …./…./.….. đến ngày …./.…/…...</b></p></td></tr>" +
                    "</table>" +
                    "<table style='width: 100%'>" +
                    "<tr><td style='width: 100%; text-align: center;'><b>___________</b></td></tr>" +
                    "</table>" +
                    "<br/>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'><b>1. Thành phần tài liệu đưa ra số hóa</b><o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'><b>……………………………………………………………………………..</b><o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'><b>2. Thời gian thực hiện:</b><o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Từ ngày …./.…/…... đến ngày …./.…/…...<o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'><b>3. Người thực hiện </b><o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Thành viên Tổ Số hóa tài liệu lưu trữ <o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'><b>4. Kết quả đạt được</b><o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>- Tổng số trang văn bản (trang A4) được scan: …………<o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>- Tổng số văn bản được nhập dữ liệu: ………………….<o:p></o:p></span></p>" +
                    "<br/>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-indent:1.0cm'><span style='font-size: 14pt;font-weight:normal'>Tổ Số hóa tài liệu lưu trữ kính báo cáo./.</span></p>" +
                    "<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 style='width:100%;border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt'>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:88.85pt'><td valign=top style='width:40%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'></td><td valign=top style='width:60%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri'>TỔ TRƯỞNG</span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri'><o:p>&nbsp;</o:p></span></p></td></tr><tr><td></td><td></td></tr>" +
                    "</table>"+
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt'><b>Ghi chú (phần này không đưa vào báo cáo):</b></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Mẫu báo cáo này dùng để thống kê số lượng tài liệu đã được số hóa. Từng thành viên thống kê và báo cáo kết quả cho Tổ trưởng. Báo cáo thể hiện được</i><b><i> Số lượng văn bản đã được nhập dữ liệu  và  Số trang văn bản đã được scan. </i></b></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Số lượng văn bản được nhập dữ liệu căn cứ vào số lượng file (số lượng record). Số trang văn bản  được căn cứ vào trường </i><b><i>" + "Số lượng tờ" +"</i></b><i>của Văn bản.</i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Đầu vào: Thời gian bắt đầu, Thời gian kết thúc. Cả 2 thông tin này cho phép người dùng nhập vào từ bàn phím.</i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Đầu ra: Báo cáo thống kê kết quả làm việc (chung)</i></span></p>";
                    break;
                }
                case "BCTKSoHoaTaiLieuCuaTungCaNhan" :{
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
                    "<tr style='width: 100%; text-align: center'><td><p style='font-size: 14pt'><b>Kết quả số hóa tài liệu của ông/bà <tên của người thực hiện></b></p></td></tr>" +
                    "</table>" +
                    "<table style='width: 100%'>" +
                    "<tr><td style='width: 100%; text-align: center;'><b>___________</b></td></tr>" +
                    "</table>" +
                    "<br/>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'><b>1. Thành phần tài liệu đưa ra số hóa</b><o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'><b>-</b><o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'><b>2. Thời gian thực hiện:</b><o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Từ ngày …./.…/…... <dữ liệu đưa vào> đến ngày …./.…/…... <dữ liệu đưa vào><o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'><b>3. Kết quả đạt được</b><o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>- Tổng số trang văn bản (trang A4) được scan: …… trang<o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>- Tổng số văn bản được nhập dữ liệu: …………. văn bản<o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-indent:1.0cm'><span style='font-size: 14pt;font-weight:normal'>Tổ Số hóa tài liệu lưu trữ kính báo cáo./.</span></p>" +
                    "<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 style='width:100%;border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt'>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:88.85pt'><td valign=top style='width:40%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri'><b>TỔ TRƯỞNG</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri'><o:p>&nbsp;</o:p></span></p></td><td valign=top style='width:60%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri'><b>NGUỜI BÁO CÁO</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri'><o:p>&nbsp;</o:p></span></p></td></tr><tr><td></td><td></td></tr>" +
                    "<td rowspan=2 style='width:6.0cm;border:solid black 1.0pt;" +
                    "</table>"+
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt'><b><i>Ghi chú (phần này không đưa vào báo cáo):</i></b></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Mẫu báo cáo này dùng để thống kê số lượng tài liệu đã được số hóa. Báo cáo thể hiện được Số lượng văn bản đã được nhập dữ liệu  và  Số trang văn bản đã được scan của từng cá nhân (căn cứ vào tài khoản của từng người). </i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Số lượng văn bản được nhập dữ liệu căn cứ vào số lượng file (số lượng record). Số trang văn bản  được căn cứ vào trường " + "Số lượng tờ" + "của Văn bản.</i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Đầu vào</i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal;margin-left:49.65pt;'><i>+Thời gian bắt đầu, Thời gian kết thúc. Cả 2 thông tin này cho phép người dùng nhập vào từ bàn phím.</i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal;margin-left:49.65pt;'><i>+ Tên người thực hiện: Cho phép chọn trong danh sách Người dùng có sẵn, không cho phép nhập từ bàn phím.</i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Đầu ra: Báo cáo thống kê kết quả làm việc (của từng cá nhân). Tên người thực hiện trên báo cáo là tên thật của Người dùng (không sử dụng username).</i></span></p>";
                    break;
                }
                case "BCTKTaiLieuMatTatCaPhong" :{
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
                    "<tr style='width: 100%; text-align: center'><td><p style='font-size: 14pt'><b>Thống kê tài liệu có dấu chỉ các mức độ mật</b></p></td></tr>" +
                    "</table>" +
                    "<table style='width: 100%'>" +
                    "<tr><td style='width: 100%; text-align: center;'><b>___________</b></td></tr>" +
                    "</table>" +
                    "<br/><br/>" +
                    "<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 style='width:100%;border-collapse:collapse;border:none;mso-border-alt:solid black .5pt;mso-yfti-tbllook:1184;mso-padding-alt:0cm 2.85pt 0cm 2.85pt;mso-border-insideh:.5pt solid black;mso-border-insidev:.5pt solid black'>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:13.35pt'><td rowspan=2 style='width:10%;border:solid black 1.0pt;mso-border-alt:solid black .5pt;padding:0cm 2.85pt 0cm 2.85pt;height:13.35pt'><p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt;letter-spacing:-.5pt'>STT<o:p></o:p></span></p></td>" +
                    "<td rowspan=2 style='width:30%;border:solid black 1.0pt;border-left:none;mso-border-left-alt:solid black .5pt;mso-border-alt:solid black .5pt;border-left:none;mso-border-left-alt:solid black .5pt;mso-border-alt:solid black .5pt;padding:0cm 2.85pt 0cm 2.85pt;height:13.35pt'><p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt;letter-spacing:-.5pt'><b>Tên phông/ sưu tập lưu trữ</b></span></p></td>" +
                    "<td rowspan=2 style='width:10%;border:solid black 1.0pt;border-left:none;mso-border-left-alt:solid black .5pt;mso-border-alt:solid black .5pt;padding:0cm 2.85pt 0cm 2.85pt;height:13.35pt'><p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt;letter-spacing:-.5pt'><b>Số mét giá</b></span></p></td>" +
                    "<td rowspan=2 style='width:10%;border:solid black 1.0pt;border-left:none;mso-border-left-alt:solid black .5pt;mso-border-alt:solid black .5pt;padding:0cm 2.85pt 0cm 2.85pt;height:13.35pt'><p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt;letter-spacing:-.5pt'><b>Sồ hồ sơ</b></span></p></td>" +
                    "<td colspan=3 style='width:30%;border:solid black 1.0pt;border-left:none;mso-border-left-alt:solid black .5pt;mso-border-alt:solid black .5pt;padding:0cm 2.85pt 0cm 2.85pt;height:13.35pt'><p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt;letter-spacing:-.5pt'><b>Số văn bản</b></span></p></td>" +
                    "<td rowspan=2 style='width:10%;border:solid black 1.0pt;border-left:none;mso-border-left-alt:solid black .5pt;mso-border-alt:solid black .5pt;padding:0cm 2.85pt 0cm 2.85pt;height:13.35pt'><p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt;letter-spacing:-.5pt'>Ghi chú<o:p></o:p></span></p></td>" +
                    "</tr>" +
                    "<tr style='mso-yfti-irow:1'><td style='width: 10%'><p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt;letter-spacing:-.5pt'>Mật<o:p></o:p></span></p></td><td style='width: 10%'><p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt;letter-spacing:-.5pt'>Tối mật<o:p></o:p></span></p></td><td style='width: 10%'><p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt;letter-spacing:-.5pt'>Tuyệt mật<o:p></o:p></span></p></td></tr>" +
                    "<tr><td><p align=center style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt;letter-spacing:-.5pt;font-weight:normal'>1<o:p></o:p></span></p></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>" +
                    "<tr style='mso-yfti-irow:6;mso-yfti-lastrow:yes'><td colspan=2><p class=MsoNormal align=center style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt;letter-spacing:-.5pt'><b>Tổng cộng</b></span></p></td>" +
                    "<td><p class=MsoNormal align=center style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt;letter-spacing:-.5pt;font-weight:normal'>" + "&lt;tổng số mét giá&gt;" +"</span></p></td>" +
                    "<td><p class=MsoNormal align=center style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt;letter-spacing:-.5pt;font-weight:normal'>" + "&lt;tổng số hồ sơ&gt;" + "</span></p></td>" +
                    "<td><p class=MsoNormal align=center style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt;letter-spacing:-.5pt;font-weight:normal'>" + "&lt;tổng số văn bản " + "Mật" + "&gt;" +"</span></p></td>" +
                    "<td><p class=MsoNormal align=center style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt;letter-spacing:-.5pt;font-weight:normal'>" + "&lt;tổng số văn bản " + "Tối mật" + "&gt;" + "</span></p></td>" +
                    "<td><p class=MsoNormal align=center style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt;letter-spacing:-.5pt;font-weight:normal'>" + "&lt;tổng số văn bản " + "Tuyệt mật" +"&gt;" + "</span></p></td>" +
                    "<td></td>" +
                    "</tr>" +
                    "</table>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-indent:1.0cm'><span style='font-size: 14pt;font-weight:normal'>Tổ Số hóa tài liệu lưu trữ kính báo cáo./.</span></p>" +
                    "<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 style='width:100%;border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt'>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:88.85pt'><td valign=top style='width:40%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri'><b>NGƯỜI LẬP</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri'><o:p>&nbsp;</o:p></span></p></td><td valign=top style='width:60%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri'><b>CHI CỤC TRƯỞNG</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri'><o:p>&nbsp;</o:p></span></p></td></tr><tr><td></td><td></td></tr>" +
                    "</table>"+
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt'><b><i>Ghi chú (phần này không đưa vào báo cáo):</i></b></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Mẫu báo cáo này dùng để thống kê số lượng tài liệu có dấu chỉ các mức độ mật đã được số hóa (của tất cả các phông lưu trữ). </i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Đầu vào: Cơ sở dữ liệu</i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Đầu ra: Báo cáo thống kê tài liệu có dấu chỉ các mức độ mật (của tất cả tài liệu đã số hóa).</i></span></p>";
                    break;
                }
                case "BCTKTaiLieuMatTungPhong" :{
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
                    "<tr style='width: 100%; text-align: center'><td><p style='font-size: 14pt'><b>Thống kê tài liệu có dấu chỉ các mức độ mật Phông Lưu trữ &lt;dữ liệu đưa vào&gt;</b></p></td></tr>" +
                    "</table>" +
                    "<table style='width: 100%'>" +
                    "<tr><td style='width: 100%; text-align: center;'><b>___________</b></td></tr>" +
                    "</table>" +
                    "<br/>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>- Tên phông: …….</span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>- Số mét giá: …….. mét</span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>- Số văn bản có dấu " + "Mật" + ": ……. văn bản</span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>- Số văn bản có dấu " + "Tối mật" + ": ………. văn bản</span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>- Số văn bản có dấu " + "Tuyệt mật" + ": …….. văn bản</span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'><b>1. Danh mục tài liệu có dấu &ldquo;Mật&ldquo;</b></span></p>" +
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
                    "<tr><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'>1</p></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>" +
                    "</table><br/>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'><b>2. Danh mục tài liệu có dấu &ldquo;Tối mật&ldquo;, &ldquo;Tuyệt mật&ldquo;</b></span></p>" +
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
                    "<tr><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'>1</p></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>" +
                    "</table><br/>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-indent:1.0cm'><span style='font-size: 14pt;font-weight:normal'>Tổ Số hóa tài liệu lưu trữ kính báo cáo./.</span></p>" +
                    "<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 style='width:100%;border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt'>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:88.85pt'><td valign=top style='width:40%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri'><b>NGƯỜI LẬP</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri'><o:p>&nbsp;</o:p></span></p></td><td valign=top style='width:60%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri'><b>CHI CỤC TRƯỞNG</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri'><o:p>&nbsp;</o:p></span></p></td></tr><tr><td></td><td></td></tr>" +
                    "</table>"+
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt'><b><i>Ghi chú (phần này không đưa vào báo cáo):</i></b></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Mẫu báo cáo này dùng để thống kê số lượng tài liệu có dấu chỉ các mức độ mật đã được số hóa (báo cáo theo từng phông lưu trữ). </i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Độ mật của văn bản được căn cứ vào trường <b>&ldquo;Độ mật&ldquo;</b>  của văn bản. <b>&ldquo;Độ mật&ldquo;</b> gồm có 3 mức độ: Mật, Tối mật, Tuyệt mật</i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Đầu vào: Tên Phông lưu trữ. Tên Phông lưu trữ được chọn từ danh sách của tất cả các Phông đã số hóa.</i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Đầu ra: Báo cáo thống kê tài liệu có dấu chỉ các mức độ mật (của Phông lưu trữ được chọn).</i></span></p>";
                    break;
                }

                case "BCTKTaiLieuMatDenHanGiaiMat" :{
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
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Tên phông:  …<o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Số mét giá: ….<o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Tổng số hộp: …<o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Tổng số hồ sơ: …<o:p></o:p></span></p>" +
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
                    "Tờ số</span></p></td>" +
                    "<td style='width:5%; " + stylesheet + stylesheet1 +
                    "Độ mật</span></p></td>" +
                    "<td style='width:20%; " + stylesheet + stylesheet1 +
                    "Ghi chú</span></p></td></tr>" +
                    "<tr><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'>1</p></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>" +
                    "</table><br/>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-indent:1.0cm'><span style='mso-bidi-font-size:13.0pt;font-weight:normal'>Tổ Số hóa tài liệu lưu trữ kính báo cáo./.</span></p>" +
                    "<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 style='width:100%;border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt'>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:88.85pt'><td valign=top style='width:40%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri;letter-spacing:-.1pt'><b>NGƯỜI LẬP</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri;letter-spacing:-.1pt'><o:p>&nbsp;</o:p></span></p></td><td valign=top style='width:60%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri'><b>CHI CỤC TRƯỞNG</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri'><o:p>&nbsp;</o:p></span></p></td></tr><tr><td></td><td></td></tr>" +
                    "</table>"+
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt'><b><i>Ghi chú (phần này không đưa vào báo cáo):</i></b></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Mẫu báo cáo này dùng để thống kê tài liệu có dấu chỉ các mức độ mật đã đến hạn tự giải mật. </i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>-<b><i>&ldquo;Độ mật&ldquo;</b> </i></b>của văn bản được căn cứ vào trường <b><i>&ldquo;Độ mật&ldquo;</i></b> của văn bản. <b><i>Độ mật</i></b>  của văn bản gồm: Mật, Tối mật, Tuyệt mật. </i></span></p>" +
                    "<p class=MsoNormal style='margin-top:4.0pt;margin-left:1.0cm;margin-bottom:.0001pt;text-align:justify;text-indent:1.0cm'><i><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'>&#272;&#7889;i v&#7899;i tài li&#7879;u có d&#7845;u</span></i><i><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt'>&quot;M&#7853;t&quot;</span></i><i><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'>: Th&#7901;i h&#7841;n t&#7921; gi&#7843;i m&#7853;t là 40 n&#259;m<o:p></o:p></span></i></p>" +
                    "<p class=MsoNormal style='margin-top:4.0pt;margin-left:1.0cm;margin-bottom:.0001pt;text-align:justify;text-indent:1.0cm'><i><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'>&#272;&#7889;i v&#7899;i tài li&#7879;u có d&#7845;u</span></i><i><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt'>&quot;T&#7889;i m&#7853;t&quot;</span></i><i><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'>: Th&#7901;i h&#7841;n t&#7921; gi&#7843;i m&#7853;t là 60 n&#259;m<o:p></o:p></span></i></p>" +
                    "<p class=MsoNormal style='margin-top:4.0pt;margin-left:1.0cm;margin-bottom:.0001pt;text-align:justify;text-indent:1.0cm'><i><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'>&#272;&#7889;i v&#7899;i tài li&#7879;u có d&#7845;u</span></i><i><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt'>&quot;Tuy&#7879;t m&#7853;t&quot;</span></i><i><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'>: Th&#7901;i h&#7841;n t&#7921; gi&#7843;i m&#7853;t là 60 n&#259;m<o:p></o:p></span></i></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Đầu vào: Tên Phông lưu trữ. Tên Phông lưu trữ được chọn từ danh sách Phông lưu trữ, không cho phép nhập vào từ bàn phím.</i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Đầu ra: Báo cáo thống kê tài liệu có dấu chỉ các mức độ mật đến hạn tự giải mật (của từng Phông lưu trữ).</i></span></p>";
                    break;
                }

                case "MucLucHoSo" :{
                    booksToRead = "<table style='width: 100%'>" +
                    "<tr><td style='width: 40%; text-align: center;'><b>SỞ NỘI VỤ TỈNH QUẢNG BÌNH</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</b></td></tr>" +
                    "<tr><td style='width: 40%; text-align: center;'><b>CHI CỤC VĂN THƯ - LƯU TRỮ</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>Độc lập - Tự do - Hạnh phúc</b></td></tr>" +
                    "<tr><td style='width: 40%; text-align: center;'><b>___________</b></td><td style='width: 60%; text-align: center; font-style: oblique'><b>_______________________</b></td></tr>" +
                    "<tr><td style='width: 40%; text-align: center;'><b></b></td><td style='width: 60%; text-align: right; font-style: italic'>Quảng Bình, ngày …  tháng … năm 201…</td></tr>" +
                    "</table><br/>" +
                    "<table style='width: 100%'>" +
                    "<tr style='width: 100%; text-align: center'><td><p style='font-size: 16pt'><b>MỤC LỤC HỐ SƠ</b></p></td></tr>" +
                    "</table>" +
                    "<table style='width: 100%'>" +
                    "<tr style='width: 100%; text-align: center'><td><p style='font-size: 16pt'><b>Phông lưu trữ &lt;dữ liệu đầu vào&gt;</b></p></td></tr>" +
                    "</table>" +
                    "<table style='width: 100%'>" +
                    "<tr><td style='width: 100%; text-align: center;'><b>___________</b></td></tr>" +
                    "</table>" +
                    "<br/>" +
                    "<table class=MsoNormalTable border=1 cellspacing=0 cellpadding=0 style='margin-left:5.4pt;border-collapse:collapse;border:none;mso-border-alt:solid black .5pt;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt;mso-border-insideh:.5pt solid black;mso-border-insidev:.5pt solid black;width: 100%'>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'><td style='width:10%;border:solid black 1.0pt;mso-border-alt:solid black .5pt;padding:0cm 5.4pt 0cm 5.4pt'><p class=MsoNormal align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'><span style='font-size:13.0pt'>Hộp số<o:p></o:p></span></p></td><td style='10%; " + stylesheet + stylesheet1 +
                    "Hồ sơ số</span></p></td>" +
                    "<td style='width:30%; " + stylesheet + stylesheet1 +
                    "Tiêu đề hồ sơ</span></p></td>" +
                    "<td style='width:30%; " + stylesheet + stylesheet1 +
                    "Ngày tháng bắt đầu và kết thúc</span></p></td>" +
                    "<td style='width:10%; " + stylesheet + stylesheet1 +
                    "Số tờ</span></p></td>" +
                    "<td style='width:10%; " + stylesheet + stylesheet1 +
                    "Ghi chú</span></p></td></tr>" +
                    "<tr><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'>01</p></td><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'>01</p></td><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'>...</p></td><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'>&lt;ngày bắt đầu&gt; - &lt;ngày kết thúc&gt;</p></td><td></td><td></td></tr>" +
                    "<tr><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'>...</p></td><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'>...</p></td><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'>...</p></td><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'></p></td><td></td><td></td></tr>" +
                    "<tr><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'>n</p></td><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'></p></td><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'></p></td><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'></p></td><td></td><td></td></tr>" +
                    "</table><br/>" +
                    "<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 style='width:100%;border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt'>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:88.85pt'><td valign=top style='width:40%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri;letter-spacing:-.1pt'><b>NGƯỜI LẬP</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri;letter-spacing:-.1pt'><o:p>&nbsp;</o:p></span></p></td><td valign=top style='width:60%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri'><b>CHI CỤC TRƯỞNG</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri'><o:p>&nbsp;</o:p></span></p></td></tr><tr><td></td><td></td></tr>" +
                    "</table>"+
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt'><b><i>Ghi chú (phần này không đưa vào báo cáo):</i></b></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Mẫu này dùng để thống kê tất cả &ldquo;Hồ sơ&ldquo; đã nhập vào cơ sở dữ liệu &#40;theo từng Phông lưu trữ&#41;. </i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Đầu vào: Tên Phông lưu trữ. Tên Phông lưu trữ được chọn từ danh sách Phông lưu trữ, không cho phép nhập vào từ bàn phím.</i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Đầu ra: Mục lục hồ sơ (của từng Phông lưu trữ).</i></span></p>";
                    break;
                }

                case "MucLucVanBan" :{
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
                    "Ghi chú</span></p></td></tr>" +
                    "<tr><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'>01</p></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>" +
                    "<tr><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'>...</p></td><td></td><td></td><td><td></td><td></td><td></td></tr>" +
                    "<tr><td><p align=center style='margin-top:3.0pt;margin-right:0cm;margin-bottom:3.0pt;margin-left:0cm;text-align:center'>n</p></td><td></td><td></td><td><td></td><td></td><td></td></tr>" +
                    "</table><br/>" +
                    "<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 style='border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt; width:100%'>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:88.85pt'><td valign=top style='width:40%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'></td><td valign=top style='width:60%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='text-align:center'><span style='font-weight:normal; font-size:14pt'>Qu&#7843;ng Bình, ngày … tháng … n&#259;m 20…<o:p></o:p></span></p><p class=MsoNormal align=center style='text-align:center; font-size:14pt'><b>Ng&#432;&#7901;i l&#7853;p h&#7891; s&#417;</b></p><p class=MsoNormal align=center style='text-align:center'><o:p>&nbsp;</o:p></p></td></tr><tr><td></td><td></td></tr>" +
                    "</table>"+
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt'><b><i>Ghi chú (phần này không đưa vào báo cáo):</i></b></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Mẫu này dùng để thống kê tất cả <b>&ldquo;Văn bản&ldquo;</b> đã nhập vào cơ sở dữ liệu &#40;theo từng <b>Hồ sơ</b>&#41;.</i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Đầu vào: Thống kê theo từng <b>Thư mục</b>. Mỗi <b>Thư mục</b> là 1 hồ sơ. </i></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-size:12.0pt;mso-bidi-font-size:14.0pt;font-weight:normal'><i>- Đầu ra: Mục lục văn bản &#40;Mỗi <b>Thư mục</b> tương đương 1 <b>Hồ sơ</b>&#41;</i></span></p>";
                    break;
                }
            }



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

// "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes'><th style='width: 5%; " + stylesheet+"'></th><th style='width: 25%; " + stylesheet + "'></th><th colspan='3' style='width: 40%;'><b>Tình trạng xử lý</b></th></tr>" +


