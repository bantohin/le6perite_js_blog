function showInfo(text) {
    $("#infoBox").text(text).show();
    setTimeout(function () {
        $("#infoBox").fadeOut(function(){
            $("#infoBox").hide();
        })
    }, 2000);
}