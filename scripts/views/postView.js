class PostView {
    constructor(authService) {
        this.authService = authService;
        this.views = 0;
        this.sortedComments = [];
    }

    showPosts(data) {
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
    loadCurrentPostComments(post){
        let _self = this;
        let requestUrl =  "https://baas.kinvey.com/" + 'appdata/kid_rygdnrymg/comments';
        let requestHeaders = {
            'Authorization': 'Basic ' + btoa('kid_rygdnrymg:c24558e33f43465fb450b9ad223f3050')
        };

        $.ajax({
            method:"GET",
            url: requestUrl,
            headers: requestHeaders
        }).then(function (comments) {
            let sorted = comments.filter(function (data) {
                return data.post_id == post._id
            });

            _self.sortedComments = sorted;

            $('#app').empty();
            $(document).ready(function () {
                $.get('templates/post-templates/detailedPost-template.html',function (template) {
                    let renderedHtml = Mustache.render(template, post);
                    let commentsList = $('<div>');
                    for(let each of _self.sortedComments){
                        let p = $('<p>');
                        p.text(each.text);
                        let deleteBtn = $('<input type="button" value="Delete comment"/>');
                        deleteBtn.attr('my-id',each._id);
                        deleteBtn.click(deleteComment);
                        p.appendTo(commentsList);
                        if(sessionStorage.getItem('id') == each._acl.creator){
                            deleteBtn.appendTo(commentsList);
                        }
                    }
                    $('#app').html(renderedHtml);
                    commentsList.appendTo($('#app').find('#comments-list'));

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
                })
            })
        }).catch(function (error) {
            _self.sortedComments = [];
    })


}

    createPost() {
        $('#app').empty();
        $.get('templates/post-templates/postCreate-template.html', function (template) {
            let renderedHtml = Mustache.render(template);
            $('#app').html(renderedHtml);
        });
    }

    editPost(data) {
        $('#app').empty();
        $.get('templates/post-templates/editPost-template.html', function (template) {
            let renderedHtml = Mustache.render(template,data);
            $("#app").html(renderedHtml);
        })
    }
}