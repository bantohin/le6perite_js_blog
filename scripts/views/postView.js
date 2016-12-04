class PostView {
    constructor() {
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
                let editButton = $(postHtml).children()[4];
                let deleteButton = $(postHtml).children()[5];
                let currentUserId = sessionStorage.getItem('id');
                let creatorId = data[i]._acl.creator;
                if(currentUserId != creatorId){
                }
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
        //TODO: render html
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