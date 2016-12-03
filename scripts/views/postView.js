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
                renderedHtml += Mustache.render(template,data[i]);
                $('#app').html(renderedHtml);
            }
        });

        $.get('templates/post-templates/posts-template.html',function (template) {
            $(document).ready(function () {
                Sammy( function () {
                    let _self = this;
                    $( ".edit-button" ).click( function (ev) {
                        _self.trigger( 'editButtonClicked', $(this).attr('data-id'));
                    })
                    $( ".delete-button" ).click( function (ev) {
                        _self.trigger('deleteCurrentPost', $(this).attr('data-id'));
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
        $.get('templates/post-templates/editPost-template.html', function (template) {
            let renderedHtml = Mustache.render(template);
            $("#app").html(renderedHtml);
        })
    }

    deletePost() {
        //TODO...
    }
}