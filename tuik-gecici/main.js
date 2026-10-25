function nipLoaderClose() {
    setTimeout(function () { $("#nip-loader").css("display", "none"); }, 150);
}

function nipLoaderOpen() {
    $("#nip-loader").css("display", "block");
}

function arama(condition) {
    var value = "";
    if (condition)
        value = $("#idNipAramaHeaderSection").val();
    else
        value = $("#idNipAramaHeaderSection2").val();
    window.location.href = `/Home/Arama?deger=${value}`;
}

function openSideBar() {
    var left = $("#sideBar").css("left");
    var width = `-${$("#sideBar").width() - $(".nuKaSaSo-sideBar-acKapa").width()}px`;

    if (left === "0px") {
        $("#sideBar").css("left", width);
        $(".sideMenuOpenIcon").css("display", "block");
        $(".sideMenuCloseIcon").css("display", "none");
    }
    else {
        $("#sideBar").css("left", 0);
        $(".sideMenuOpenIcon").css("display", "none");
        $(".sideMenuCloseIcon").css("display", "block");
    }
}

function responsiveMenu() {
    var x = document.getElementById("mainMenuMenu2");
    if (x.className === "nav-menu") {
        x.className += " responsive";
    } else {
        x.className = "nav-menu";
    }
}

function DuzeyTable() {
    var val = $("#tableDuzey").val();
    if (val === "TÜRKİYE") {
        $("#tableIl").parent().parent().css({ "display": "none" });
        GetInformation(1, "#tabloIcerik", "");
    }
    else {
        $("#tableIl").parent().parent().css({ "display": "flex" });
        GetInformation(1, "#tabloIcerik", $("#tableIl").val());
    }
}

function DuzeyGrafik() {
    var val = $("#grafikDuzey").val();
    if (val === "TÜRKİYE") {
        $("#grafikIl").parent().parent().css({ "display": "none" });
        GetInformation(0, "#grafikIcerik", "");
    }
    else {
        $("#grafikIl").parent().parent().css({ "display": "flex" });
        GetInformation(0, "#grafikIcerik", $("#grafikIl").val());
    }
}

function resetForTabs() {
    ////////////////////////////////////////////////////////////
    $("#grafikIl").parent().parent().css({ "display": "none" });
    $("#grafikDuzey").val("TÜRKİYE");
    ////////////////////////////////////////////////////////////
    $("#tableIl").parent().parent().css({ "display": "none" });
    $("#tableDuzey").val("TÜRKİYE");
}

function runidBtnScrollToTop() {
    $("html, body").animate({ scrollTop: 0 }, "slow");
}

//download chart.js in PDF file
function downloadPDF_jsPdf(canvasId, fileName, x, y, genislik, yukseklik) {
    // jsPDF nesnesi oluşturulur.
    var doc = new jsPDF({
        orientation: 'landscape'
    });

    // cahrt.js grafiğinin bulunduğu canvas alınıyor.
    var canvas = document.getElementById(canvasId);

    // data urlsi oluşturuluyor.
    var dataURL = canvas.toDataURL('image/jpeg');
   
    // Pdf dokümanına chart.js ekleniyor.
    doc.addImage(dataURL, 'JPEG', x, y, genislik, yukseklik);

    // Dosya kaydediliyor.
    doc.save(`${fileName ?? 'chart'}.pdf`);
}

var jspdf_chartjs_bgColor = {
    id: "bgColor",
    beforeDraw: (chart, steps, options) => {
        var { ctx, width, height } = chart;
        ctx.fillStyle = options.backgroundColor;
        ctx.fillRect(0, 0, width, height);
        ctx.restore();
    }
}
////////////////////////////////////////////////////////////