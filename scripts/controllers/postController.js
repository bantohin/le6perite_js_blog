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

    createPost() {
        let _self = this;
        _self.view.createPost();
        $.get('templates/post-templates/postCreate-template.html', function () {
            $('#createPost-btn').on('click', function () {
                let postData = {
                    title: $('#createPost input[name=title]').val(),
                    text: $('#createPost textarea[name=content]').val(),
                    date: Date.now(),
                    author: sessionStorage.getItem('id'),
                    views: 0,
                    image: $('#createPost input[name=image]').val()
                };
                _self.model.postPost(postData)
                    .then(function () {
                        _self.model.getPosts()
                            .then(function (successData) {
                                _self.view.showPosts(successData);
                            })
                            .catch(function (errorData) {
                                //TODO
                            });
                    })
                    .catch(function (errorData){
                        //TODO
                    });
            });
        });
    }

    editPost(id, data) {
        //TODO...
    }

    deletePost(id) {
        //TODO...
    }
}