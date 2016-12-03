class UserController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    loginUser() {
        let _self = this;
        _self.view.loginUser();

        $.get('templates/user-templates/loginUser-template.html',function (template) {
           let button = $('#app').find('#login-btn');

           $(button).on('click', function (template) {
               let username = $('#app').find('#login input[name=username]').val();
               let password = $('#app').find('#login input[name=password]').val();
               let userObj = {username: username, password: password};

               _self.model.loginUser(userObj)
                   .then(function (successData) {
                       sessionStorage.setItem('authToken',successData._kmd.authtoken);
                       sessionStorage.setItem('username',successData.username);
                       sessionStorage.setItem('id',successData._id);
                       //TODO: go to Home
                   })
                   .catch(function (errorData) {
                       //TODO: fill notification
                   });
           })
        });
    }

    logoutUser() {
        let _self = this;

        this.model.logoutUser()
            .then(function (successData) {
                console.log(successData);
                _self.view.logoutUser()
            })
            .catch(function (errorData) {
                //TODO: fill notification
            });
    }

    registerUser() {
        let _self = this;
        _self.view.registerUser()

        $.get('templates/user-templates/loginUser-template.html',function (template) {
            let button = $( '#app' ).find( '#register-btn' );
            $( button ).on( 'click', function () {
                alert()
                let username = $( '#app' ).find( '#register input[name=username]' ).val();
                let password = $( '#app' ).find( '#register input[name=password]' ).val();
                let userObj = {username: username, password: password};

                _self.model.registerUser( userObj )
                    .then( function (successData) {
                        console.log( successData );
                    } )
                    .catch( function () {
                        //TODO: fill notification
                    } );
            });
        });
    }
}