class PostController {
    constructor(view, model) {
        this.model = model;
        this.view = view;
    }

    listPosts() {
        this.model.getPosts()
            .then(function (successData) {
                this.view.showPosts(successData);
            })
            .catch(function (errorData) {
                //TODO: fill notification
            });
    }

    viewPost(id) {
        this.model.getPost()
            .then(function (successData) {
                this.view.showPost(successData);
            })
            .catch(function (errorData) {
                //TODO: fill notification
            });
    }

    createPost(data) {
        //TODO...
    }

    editPost(id, data) {
        //TODO...
    }

    deletePost(id) {
        //TODO...
    }
}
