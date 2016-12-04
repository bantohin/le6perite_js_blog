(function app() {
    showHideHeaderButtons();

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

        let homeView = new HomeView();
        let homeModel = new HomeModel(baseUrl,appId,requester,authService);
        let homeController = new HomeController(homeModel,homeView);

        this.get('#/home' , function () {
            homeController.listTopPosts();
        });

        this.get('#/posts', function () {
            postController.listPosts();
        });

        this.get('#/createPost',function () {
            postController.createPost();
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

        this.get('#/posts/:id',function () {
            //editController.editPost(this.params['id']);
            postController.loadPost(this.params['id']);
        });

        //this.get('#/post/:id',function () {
        //   postView.editPost(this.params['id']);//
        //});

        this.bind('editButtonClicked',function (event,data) {
            location.hash = '#/posts/' + data;
        });

        this.bind('deleteCurrentPost',function (event,data) {
            postController.deletePost(data);
        });

        this.bind('readMore', function (event, data) {
            alert('Zdr ui');
        })

    });

    router.run('#/home');
})();