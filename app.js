sessionStorage.setItem('authToken', btoa("guest:guest"));

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

        this.get('#/home' , function () {
            //TODO:...

        });
        
        this.get('#/posts', function () {
            postController.listPosts();
        });

        this.get('#/createPost',function () {
            //TODO:...
        });

        this.get('#/login',function () {
            //TODO:...
        });

        this.get('#/register',function () {
            //TODO:...
        });
        
        this.get('#/logout',function () {
            //TODO:...
        })

        //TODO.. #/posts/id
    });

    router.run('#/home');

})();
