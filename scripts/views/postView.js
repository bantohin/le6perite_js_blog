class PostView {
    constructor() {
        this.tags = []
        this.rendered = false;
        this.tagsLoaded = false;
    }

    showPosts(tags, data) {
        data.sort(function (a,b) {
            return new Date(b.date) - new Date(a.date) || Number(b.views) - Number(a.views);
        });
        let _self = this;
        $('#app').empty();
        let renderedHtml = "";
        $.get('templates/post-templates/posts-template.html',function (template) {
            for(let i = 0; i < data.length; i++){
                let postHtml = Mustache.render(template,data[i]);
                renderedHtml += postHtml;
                $('#app').html(renderedHtml);
                _self.rendered = true
            }
            for(let i = 0; i<document.getElementById('app').childNodes.length; i++){
                let element = document.getElementById('app').childNodes[i];
                let currentUserId = sessionStorage.getItem('id');
                if(data[i]._acl.creator != currentUserId){
                    let editButton = element.getElementsByClassName("edit-button")[0];
                    let deleteButton = element.getElementsByClassName('delete-button')[0];
                    element.removeChild(editButton);
                    element.removeChild(deleteButton)
                }
            }
            for (let post of document.getElementById('app').childNodes) {
                let id = $(post).attr('data-id');
                let tagsDiv = $(post).find("#tags");
                for (let tag of tags) {
                    if (tag.posts_id == id) {
                        let a = $(`<a href="#" tag-id="${tag._id}">${tag.text} </a>`).appendTo($(tagsDiv))
                        //TODO: bind button on click to show posts containing this tag
                    }
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

    loadedTags(tags){
        this.tagsLoaded = true;
        this.tags = tags;
    }
    showPost(data) {
        this.loadCurrentPostComments(data);
    }

    listComments(comments){
        let _self = this;
        $(document).ready(function () {
            let commentsList = $('<div>');
            for(let each of comments){

                let p = $('<p>');
                let i = $('<i>');
                i.text(each.author);
                p.text(each.text + " by ");
                p.append(i);
                let deleteBtn = $('<input type="button" value="Delete comment"/>');
                deleteBtn.attr('my-id',each._id);
                deleteBtn.click(deleteComment);
                p.appendTo(commentsList);
                if(sessionStorage.getItem('id') == each._acl.creator){
                    deleteBtn.appendTo(commentsList);
                }
            }

            //TODO: deleteComment() -> Model
            function deleteComment() {
                let deleteId = $(this).attr('my-id');
                let url = "https://baas.kinvey.com/" + 'appdata/kid_rygdnrymg/comments/' + deleteId;
                let headers = _self.authService.getHeaders();
                $.ajax({
                    method: 'DELETE',
                    url: url,
                    headers: headers
                }).then(function () {
                    location.reload();
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