$( "#datepicker-start" ).datepicker({
    format: 'dd/mm/yyyy',
    startDate: '-3d'
});
$( "#datepicker-end" ).datepicker({
    format: 'dd/mm/yyyy',
    startDate: '-3d'
});

$('#datepicker-start').datepicker()
    .on("changeDate", function(e){
        var from = document.getElementById("datepicker-start").value;
    });

$('#datepicker-end').datepicker()
    .on("changeDate", function(e){
        var end = document.getElementById("datepicker-end").value;
        var start = document.getElementById("datepicker-start").value;
        if(start=="")alert("Bạn chưa nhập ngày bắt đầu")
        else{
            var from = document.getElementById("datepicker-start").value,
                to = document.getElementById("datepicker-end").value;
            window.date1=from;
            window.date2=to;
            displayData( user1, date1, date2 );
            }
    });

var nowTemp = new Date();
var now = new Date(nowTemp.getFullYear(), nowTemp.getMonth(), nowTemp.getDate(), 0, 0, 0, 0);
var checkin = $('#datepicker-start').datepicker({
    onRender: function(date) {
        return date.valueOf() < now.valueOf() ? 'disabled' : '';
    }
}).on('changeDate', function(ev) {
    if (ev.date.valueOf() > checkout.date.valueOf()) {
        var newDate = new Date(ev.date)
        newDate.setDate(newDate.getDate() + 1);
        checkout.setValue(newDate);
    }
    checkin.hide();
    $('#datepicker-end')[0].focus();
}).data('datepicker');
var checkout = $('#datepicker-end').datepicker({
    onRender: function(date) {
        return date.valueOf() <= checkin.date.valueOf() ? 'disabled' : '';
    }
}).on('changeDate', function(ev) {
    checkout.hide();
}).data('datepicker');


$( ".selectUser1" ).change( displaySoTrang );

var user1="";
var date1="";
var date2="";

function displaySoTrang(){

    user1 = $( ".selectUser1").val() ;
    date1 = $( "#datepicker-start").val() ;
    date2 = $( "#datepicker-end").val() ;
    displayData( user1, date1, date2 );
}

function displayData( user1, date1, date2 ){
    $( ".soTrangScan" ).html("");
    $( ".tongSoVB" ).html("");
    window.data = null;
    var url = YAHOO.lang.substitute(Alfresco.constants.PROXY_URI_RELATIVE + "zalu/report/4?user="
    + user1 + "&datefrom=" + date1 + "&dateto=" + date2 );
    $.get(url, function(data){

        if(data != undefined)
            {
                if (data.User.SoTrangA4 >= 0) $( ".soTrangScan" ).html(data.User.SoTrangA4);
                if (data.User.SoVanBanNhapLieu >= 0) $( ".tongSoVB" ).html(data.User.SoVanBanNhapLieu);
                window.data = data;
                window.url = url;
            }

    });
}


$(".word-export").click(function (event) {
    var getIDName = $(this).attr('id');

    $.get(window.url, function(data){
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

            var soTrangScan="";
            var tongSoVB="";
/*            if(data != null)*/
            {
                if (data.User.SoTrangA4 >= 0) soTrangScan = data.User.SoTrangA4;
                if (data.User.SoVanBanNhapLieu >= 0) tongSoVB = data.User.SoVanBanNhapLieu;
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
                    "<tr style='width: 100%; text-align: center'><td><p style='font-size: 14pt'><b>Kết quả số hóa tài liệu của ông/bà " + data.User.FullName + "</b></p></td></tr>" +
                    "</table>" +
                    "<table style='width: 100%'>" +
                    "<tr><td style='width: 100%; text-align: center;'><b>___________</b></td></tr>" +
                    "</table>" +
                    "<br/>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'><b>1. Thành phần tài liệu đưa ra số hóa</b><o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'><b>-</b><o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'><b>2. Thời gian thực hiện:</b><o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>Từ ngày " + date1+ " đến ngày " + date2 + " <o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'><b>3. Kết quả đạt được</b><o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>- Tổng số trang văn bản (trang A4) được scan: " + soTrangScan + " trang<o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;text-align:justify;text-indent:1.0cm'><span style='font-weight:normal;font-size: 14pt'>- Tổng số văn bản được nhập dữ liệu: " + tongSoVB + " văn bản<o:p></o:p></span></p>" +
                    "<p class=MsoNormal style='margin-top:6.0pt;margin-right:0cm;margin-bottom:6.0pt;margin-left:0cm;text-indent:1.0cm'><span style='font-size: 14pt;font-weight:normal'>Tổ Số hóa tài liệu lưu trữ kính báo cáo./.</span></p>" +
                    "<table class=MsoNormalTable border=0 cellspacing=0 cellpadding=0 style='width:100%;border-collapse:collapse;mso-yfti-tbllook:1184;mso-padding-alt:0cm 5.4pt 0cm 5.4pt'>" +
                    "<tr style='mso-yfti-irow:0;mso-yfti-firstrow:yes;height:88.85pt'><td valign=top style='width:40%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri'><b>TỔ TRƯỞNG</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri'><o:p>&nbsp;</o:p></span></p></td><td valign=top style='width:60%;padding:0cm 5.4pt 0cm 5.4pt;height:88.85pt'><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='font-size:13.0pt;mso-bidi-font-size:14.0pt;mso-fareast-font-family:Calibri'><b>NGUỜI BÁO CÁO</b></span><p class=MsoNormal align=center style='margin-top:6.0pt;text-align:center'><span style='mso-fareast-font-family:Calibri'><o:p>&nbsp;</o:p></span></p></td></tr><tr><td></td><td></td></tr>" +
                    "<td rowspan=2 style='width:6.0cm;border:solid black 1.0pt;" +
                    "</table>"

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


