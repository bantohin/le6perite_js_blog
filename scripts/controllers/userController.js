class UserController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    loginUser() {
        let username = $('#login input[name=username]');
        let password = $('#login input[name=password]');
        let userObj = {username, password};
        let _self = this;

        this.model.loginUser(userObj)
            .then(function (successData) {
                console.log(successData);
                _self.view.loginUser()
            })
            .catch(function () {
                 //TODO: fill notification
            });
    }

    logoutUser() {
        let _self = this;

        this.model.logoutUser()
            .then(function (successData) {
                console.log(successData);
                _self.view.logoutUser()
            })
            .catch(function () {
                //TODO: fill notification
            });
    }

    registerUser() {
        let username = $('#register input[name=username]');
        let password = $('#register input[name=password]');
        let userObj = {username, password};
        let _self = this;

        this.model.registerUser(userObj)
            .then(function (successData) {
                console.log(successData);
                _self.view.registerUser()
            })
            .catch(function () {
                //TODO: fill notification
            });
    }
}