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
        console.log('pesho')
        $.get('templates/post-templates/postCreate-template.html', function (template) {
            $(document).ready(function () {
                $('#createPost-btn').click(function () {
                    console.log('check button')
                    let today = new Date();
                    let dd = today.getDate();
                    let mm = today.getMonth()+1; //January is 0!

                    let yyyy = today.getFullYear();
                    if(dd<10){
                        dd='0'+dd
                    }
                    if(mm<10){
                        mm='0'+mm
                    }
                    today = dd+'/'+mm+'/'+yyyy;
                    let postData = {
                        title: $('#createPost input[name=title]').val(),
                        text: $('#createPost textarea[name=text]').val(),
                        date: today,
                        author: sessionStorage.getItem('username'),
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
                            location.hash = "#/posts"
                        })
                        .catch(function (errorData){
                            //TODO
                        });
                });
            })

        });
    }

    editPost() {

    }

    deletePost(id) {
        let _self = this;
        this.model.deletePost(id)
            .then(function (data) {
                location.hash = '#/home';
                location.hash = '#/posts';
            })
            .catch(function (errorData) {

            })
    }
}