class PostController {
    constructor(view, model) {
        this.model = model;
        this.view = view;
    }

    listPosts() {
        let _self = this;
        _self.model.getPosts()
            .then(function (successData) {
                _self.view.showPosts(successData);
            })
            .catch(function (errorData) {
                //TODO: fill notification
            });
    }

    viewPost(id) {
        let _self = this;
        _self.model.getPost()
            .then(function (successData) {
                _self.view.showPost(successData);
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