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

    loadComments(id){
        let _self = this;
        _self.model.getComments()
            .then(function (successData) {
                let sorted = successData.filter(function (data) {
                    return data.post_id == id
                })
                _self.view.listComments(sorted);
            })
            .catch(ajaxError);
    }
}