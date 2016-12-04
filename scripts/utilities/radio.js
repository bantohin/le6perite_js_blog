$('#showRadio').hide();
$('#hideRadio').click(function () {
    $('#radio').hide();
    $('#showRadio').show();
    $(this).hide();
});
$('#showRadio').click(function () {
    $('#radio').show();
    $('#hideRadio').show();
    $(this).hide();
});