class UserView {
    constructor() {
    }

    loginUser() {
        $('#app').empty();
        $.get('templates/user-templates/loginUser-template.html',function (template) {
           let renderedHtml  = Mustache.render(template);
           $('#app').html(renderedHtml);
        });
        //TODO: fill notification
    }

    logoutUser() {
        $('#app').empty();
        $.get('templates/post-templates/posts-template.html', function(template){
            let renderedHtml = Mustache.render(template);
            $("#app").html(renderedHtml);
        });
        //TODO: fill notification
        //TODO: redirect to home
    }

    registerUser() {
        $('#app').empty();
        $.get('templates/user-templates/registerUser-template.html',function (template) {
            let renderedHtml = Mustache.render(template);
            $('#app').html(renderedHtml);
        });
        //TODO: fill notification
    }
}