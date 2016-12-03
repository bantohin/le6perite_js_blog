
(function app() {
    let router = Sammy(function () {
        let baseUrl = "https://baas.kinvey.com/";
        let appId = "kid_rygdnrymg";
        let appSecret = "62388f7eecea488780b40e25928ef190";

        let authService = new AuthService(appId, appSecret);
        let requester = new Requester();

        let postView = new PostView();
        let postModel = new PostModel(baseUrl,appId, requester, authService);
        let postController = new PostController(postView, postModel);

        let userView = new UserView();
        let userModel = new UserModel(baseUrl,appId,requester,authService);
        let userController = new UserController(userModel,userView);

        this.get('#/home' , function () {
            //TODO...
        });

        this.get('#/posts', function () {
            postController.listPosts();
        });

        this.get('#/createPost',function () {
            postController.createPost();
        });

        this.get('#/editPost',function () {
            postController.editPost();
        });

        this.get('#/login',function () {
            userController.loginUser();
        });

        this.get('#/register',function () {
            userController.registerUser();
        });
        
        this.get('#/logout',function () {
            userController.logoutUser();
        });

        //TODO.. #/posts/id
    });

    router.run('#/login');

})();
