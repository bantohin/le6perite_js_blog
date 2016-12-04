function ajaxError(response) {
    let errorMsg = JSON.stringify(response);
    if (response.readyState === 0)
        errorMsg = "Cannot connect due to network error.";
    if (response.responseJSON &&
        response.responseJSON.description)
        errorMsg = response.responseJSON.description;
    showError(errorMsg);
}

function showError(text) {
    $("#errorBox").text(text).show();
    setTimeout(function () {
        $("#errorBox").fadeOut(function(){
            $("#errorBox").hide();
        })
    }, 3000);
}