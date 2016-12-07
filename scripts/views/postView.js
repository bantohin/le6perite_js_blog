class PostView {
    constructor(authService) {
        this.authService = authService;
    }

    showPosts(posts) {
        posts.sort(function (a,b) {
            return new Date(b.date) - new Date(a.date) || Number(b.views) - Number(a.views);
        });
        let _self = this;
        $('#app').empty();
        let renderedHtml = "";
        $.get('templates/post-templates/posts-template.html',function (template) {
            for(let i = 0; i < posts.length; i++){
                let postHtml = Mustache.render(template,posts[i]);
                renderedHtml += postHtml;
                $('#app').html(renderedHtml);
            }
            for(let i = 0; i<document.getElementById('app').childNodes.length; i++){
                let element = document.getElementById('app').childNodes[i];
                let currentUserId = sessionStorage.getItem('id');
                if(posts[i]._acl.creator != currentUserId){
                    let editButton = element.getElementsByClassName("edit-button")[0];
                    let deleteButton = element.getElementsByClassName('delete-button')[0];
                    element.removeChild(editButton);
                    element.removeChild(deleteButton)
                }
            }
        });

        $.get('templates/post-templates/posts-template.html',function (template) {
            $(document).ready(function () {
                Sammy( function () {
                    let _self = this;
                    $( ".edit-button" ).click( function (ev) {
                        _self.trigger( 'editButtonClicked', $(this).attr('data-id'));
                    });
                    $( ".delete-button" ).click( function (ev) {
                        _self.trigger('deleteCurrentPost', $(this).attr('data-id'));
                    });
                    $('.readMore-button').click(function (ev) {
                        _self.trigger('readMore', $(this).attr('data-id'));
                    })
                } )
            })

        })
    }

    showPost(data) {
        this.loadCurrentPostComments(data);
    }

    listComments(comments){
        let _self = this;
        $(document).ready(function () {
            let commentsList = $('<div>');
            for(let each of comments){
                let newDiv = $('<div class="comments">');
                let p = $('<p>');
                let i = $('<i>');
                i.text(each.author);
                p.text(each.text + " by ");
                p.append(i);
                let deleteBtn = $('<input type="button" value="Delete comment"/>');
                deleteBtn.attr('my-id',each._id);
                deleteBtn.click(deleteComment);
                p.appendTo(newDiv);
                if(sessionStorage.getItem('id') == each._acl.creator){
                    deleteBtn.appendTo(newDiv);
                }
                newDiv.appendTo(commentsList);
            }


            //TODO: deleteComment() -> Model
            function deleteComment() {
                let _botonaEDis = this;
                let deleteId = $(this).attr('my-id');
                let url = "https://baas.kinvey.com/" + 'appdata/kid_rygdnrymg/comments/' + deleteId;
                let headers = _self.authService.getHeaders();
                $.ajax({
                    method: 'DELETE',
                    url: url,
                    headers: headers
                }).then(function () {
                    $(_botonaEDis.parentNode).fadeOut();
                })

            }
            _self.commentsList = commentsList
        })
    }

    loadCurrentPostComments(post){
        let _self = this;
        $('#app').empty();
        $(document).ready(function () {
            $.get('templates/post-templates/detailedPost-template.html',function (template) {
                let renderedHtml = Mustache.render(template, post);
                $('#app').html(renderedHtml);
                _self.commentsList.appendTo($('#app').find('#comments-list'));
                Sammy( function () {
                    let _self = this;
                    $( "#add-comment" ).click( function (ev) {
                        let commentText = $(".commentText").val();
                        let obj = {
                            text: commentText,
                            post_id: post._id,
                            author: sessionStorage.getItem('username')
                        };
                        _self.trigger( 'addCommentClicked', obj);
                    });
                } )

            })
        })
    }

    createPost() {
        $('#app').empty();
        $.get('templates/post-templates/postCreate-template.html', function (template) {
            let renderedHtml = Mustache.render(template);
            $('#app').html(renderedHtml);
            //CKEDITOR.replace(document.getElementById('createPost-textarea'));
        });
    }

    editPost(data) {
        $('#app').empty();
        $.get('templates/post-templates/editPost-template.html', function (template) {
            let renderedHtml = Mustache.render(template,data);
            $("#app").html(renderedHtml);
            //CKEDITOR.replace(document.getElementById('editPost-textarea'));
        })
    }
}