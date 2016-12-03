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
        //TODO...
    }

    editPost() {
        //TODO...
    }

    deletePost() {
        //TODO...
    }
}