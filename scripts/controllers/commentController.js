class CommentController{
    constructor(model, view){
        this.model = model;
        this.view = view
    }

    addComment(data){
        let _self = this;
        _self.model.postComment(data)
            .then(function (successData) {
                location.reload()
                //TODO: mazno vkarvane na komentar
            })
            .catch(ajaxError);
    }
}