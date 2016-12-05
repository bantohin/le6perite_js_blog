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
        location.hash = '#/home';
    }

    registerUser() {
        $('#app').empty();
        $.get('templates/user-templates/registerUser-template.html',function (template) {
            let renderedHtml = Mustache.render(template);
            $('#app').html(renderedHtml);
        });
    }
}