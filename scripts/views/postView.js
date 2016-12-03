class PostView {
    constructor() {
    }

    showPosts(data) {
        $('#app').empty();
        let renderedHtml = "";
        data.forEach(
            function (entity) {
               $.get('templates/post-templates/posts-template.html',function (template) {
                   renderedHtml += Mustache.render(template,entity);
                   $('#app').html(renderedHtml);
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

    editPost() {
        //TODO...
    }

    deletePost() {
        //TODO...
    }
}