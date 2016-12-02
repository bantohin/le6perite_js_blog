class PostView {
    constructor(controller) {
        this.controller = controller;
    }

    showPosts(data) {
        data.forEach(
            function (entity) {
                let div = $('<div class="post"></div>');
                div.append('<div>' + entity.author +'</div>');
                div.append('<div>' + entity.title +'</div>');
                div.append('<div>' + entity.date +'</div>');
                div.append('<div>' + entity.views +'</div>');
                div.append('<div>' + entity.image +'</div>');
                div.append('<div>' + entity.text +'</div>');
                div.appendTo('#app');
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