class PostController {
    constructor(view, model) {
        this.model = model;
        this.view = view;
    }

    loadPosts(){
        let _self = this;
        _self.model.getPosts()
            .then(function (posts) {
                _self.view.showPosts(posts)
            })
            .catch(ajaxError)
    }

    viewPost(id) {
        let _self = this;
        _self.model.getPost(id)
            .then(function (successData) {
                _self.increaseViews(successData)
            })
            .catch(ajaxError);
    }
    increaseViews(post){
        let _self = this;
        let incViews = Number(post.views) + 1;

        let dataObject = {
            author: post.author,
            date: post.date,
            image: post.image,
            text: post.text,
            title: post.title,
            views: incViews,
        };
        _self.model.increaseViews(post._id, dataObject)
            .then(function (successData) {
                _self.view.showPost(post)
            })
            .catch(ajaxError);
    }

    createPost() {
        let _self = this;
        _self.view.createPost();
        $.get('templates/post-templates/postCreate-template.html', function (template) {
            $(document).ready(function () {
                $('#createPost-btn').click(function () {
                    let newDate = new Date(Date.now());
                    newDate = ((newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' +  newDate.getFullYear());
                    let postData = {
                        title: $('#createPost input[name=title]').val(),
                        text: $('#createPost textarea[name=text]').val(),
                        date: newDate,
                        author: sessionStorage.getItem('username'),
                        views: 0,
                        image: $('#createPost input[name=image]').val(),
                    };
                    _self.model.postPost(postData)
                        .then(function () {
                            _self.model.getPosts()
                                .then(function (successData) {
                                    _self.view.showPosts(successData);
                                })
                                .catch(ajaxError);
                            showInfo("Post created.");
                            location.hash = "#/posts"
                        })
                        .catch(ajaxError);
                });
            })

        });
    }

    loadPost(id) {
        let _self = this;
        this.model.loadPost(id)
            .then(function (data) {
                _self.view.editPost(data);
                $.get( 'templates/post-templates/editPost-template.html', function (template) {
                    $(document).ready(function () {
                        let buttonEdit = $('#app').find('#edit-btn');
                        buttonEdit.click(function () {
                            let newTitle = $('#app').find('#edit-title').val();
                            let newAuthor = $('#app').find('#edit-author').attr('data-author');
                            let newText = $('#app').find('#edit-text').val();
                            let newImage = $('#app').find('#edit-image').val();
                            let newViews = $('#app').find('#edit-views').attr('data-views');
                            let newDate = new Date(Date.now());
                            newDate = ((newDate.getMonth() + 1) + '/' + newDate.getDate() + '/' +  newDate.getFullYear());
                            let dataObject = {
                                author: newAuthor,
                                title: newTitle,
                                text: newText,
                                date: newDate,
                                image: newImage,
                                views: newViews
                            };
                            _self.model.editPost(id,dataObject)
                                .then(function (data) {
                                    showInfo("Post edited.");
                                    location.hash = '#/posts';
                                 })
                                .catch(ajaxError)
                        })
                    });
                });
            })
                .catch(ajaxError);
    }

    deletePost(id) {
        let _self = this;
        let post = document.querySelectorAll(`[data-id="${id}"]`)[0];
        this.model.deletePost(id)
            .then(function (data) {
                showInfo("Post deleted.");
                $(post).fadeOut();
            })
            .catch(ajaxError)
    }
}