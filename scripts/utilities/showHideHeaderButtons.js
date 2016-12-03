function showHideHeaderButtons() {
    $('.header a').hide();
    $('#welcomeSpan').empty();
    if(sessionStorage.getItem('authToken')) {
        $('#home-button').show();
        $('#createPost-button').show();
        $('#posts-button').show();
        $('#logout-button').show();
        $('#welcomeSpan').text('Hello, ' + sessionStorage.getItem('username') + '!');
    }else {
        $('#home-button').show();
        $('#posts-button').show();
        $('#login-button').show();
        $('#register-button').show();
    }
}