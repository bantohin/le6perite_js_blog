(function app() {
    showHideHeaderButtons();

    $(document).on({
        ajaxStart: function() {
            $("#loadingBox").show();
        },
        ajaxStop: function() {
            $("#loadingBox").hide();
        }
    });

    let router = Sammy(function () {
        let baseUrl = "https://baas.kinvey.com/";
        let appId = "kid_rygdnrymg";
        let appSecret = "62388f7eecea488780b40e25928ef190";

        let authService = new AuthService(appId, appSecret);
        let requester = new Requester();
        //searchEngine(requester,authService);

        let postView = new PostView(authService);
        let postModel = new PostModel(baseUrl,appId, requester, authService);
        let postController = new PostController(postView, postModel);

        let userView = new UserView();
        let userModel = new UserModel(baseUrl,appId,requester,authService);
        let userController = new UserController(userModel,userView);

        let homeView = new HomeView();
        let homeModel = new HomeModel(baseUrl,appId,requester,authService);
        let homeController = new HomeController(homeModel,homeView);

        let commentModel = new CommentModel(baseUrl,appId,requester,authService);
        let commentController = new CommentController(commentModel, postView);

        let searchView = new SearchView();
        let searchModel = new SearchModel(baseUrl,appId,requester,authService);
        let searchController = new SearchController(searchModel,searchView);


        this.get('#/home' , function () {
            homeController.listTopPosts();
        });

        this.get('#/posts', function () {
            postController.loadPosts()
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

        this.get('#/search/:searchedWord', function () {
            searchController.loadSearchData(this.params["searchedWord"]);
            $('#searchedText').val('');
        });

        this.get('#/posts/edit/:id',function () {
            //TODO: change the url in ""
            postController.loadPost(this.params['id']);
        });

        this.get('#/posts/details/:id',function () {
            postController.viewPost(this.params['id']);
            commentController.loadComments(this.params['id'])
        });


        this.bind('editButtonClicked',function (event,data) {
            location.hash = '#/posts/edit/' + data;
        });

        this.bind('deleteCurrentPost',function (event,data) {
            postController.deletePost(data);
        });

        this.bind('readMore', function (event, data) {
            location.hash = '#/posts/details/' + data;
        });

        this.bind('addCommentClicked', function (event,data) {
            commentController.addComment(data);
        });

        this.bind('searchButtonClicked', function (event,data) {
            location.hash = '#/search/' + data;
        });

    });

    router.run('#/home');
})();