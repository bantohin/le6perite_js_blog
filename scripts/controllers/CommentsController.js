class CommentsController {
    constructor(view, model) {
        this.model = model;
        this.view = view;
    }

    listComments() {
        let _self = this;
        _self.model.getComments()
            .then(function (successData) {
                _self.view.showComments(successData);
            })
            .catch(function (errorData) {
                //TODO: fill notification
            });
    }

    createComment() {
        let _self = this;
        _self.view.createComment();
        $.get('templates/comment-templates/commentCreate-template.html', function (template) {
            $(document).ready(function () {
                $('#createPost-btn').click(function () {
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
                    let commentData = {
                        post_id: a,
                        text: a,
                        author: a
                    };
                    _self.model.postComment(commentData)
                        .then(function () {
                            _self.model.getComments()
                                .then(function (successData) {
                                    _self.view.showComments(successData);
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

    loadComment(id) {
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
                                    location.hash = '#/posts';
                                })
                                .catch(function (errorData) {
                                    alert('WOHO');
                                })
                        })
                    });
                });
            })
            .catch(function (errorData) {
                alert();
            });
    }

    deletePost(id) {
        let _self = this;
        this.model.deletePost(id)
            .then(function (data) {
                location.reload();
            })
            .catch(function (errorData) {

            })
    }
}