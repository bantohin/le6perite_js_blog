class PostView {
    constructor() {
    }

    showPosts(data) {
        let _self = this
        $('#app').empty();
        let renderedHtml = "";
        data.forEach(
            function (entity) {
               $.get('templates/post-templates/posts-template.html',function (template) {
                   renderedHtml += Mustache.render(template,entity);
                   $('#app').html(renderedHtml);
                   $(".edit-button").on('click', function () {
                       _self.editPost(entity);
                   })
               })
            }
        )
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