class TagsController {
    constructor(model){
        this.model = model;
    }

    getTags(){
        let _self = this;
        $.get('templates/post-templates/postCreate-template.html', function (template) {
            $( document ).ready( function () {
                let postTags = $( '#createPost input[name=tags]' ).val();
                postTags = postTags.split(',');
                let iWasHere = false;
                _self.model.getTags()
                    .then(function (tags) {
                        for(let each of postTags) {
                            let text = each;
                            let newId = _self.model.getPosts().then(function (posts) {
                                let currentPost = posts[posts.length - 1];
                                let currentPostId = currentPost._id;
                                let data = {
                                    text: text,
                                    posts_id: currentPostId
                                };
                                _self.model.postTag(data);
                            });
                        }
                    });
            })
        })
    }
}
