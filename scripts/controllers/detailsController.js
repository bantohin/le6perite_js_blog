class DetailsController{
    constructor(view,model){
        this.view = view;
        this.model = model;
    }


    showDetails(postId){
        let _self = this;

        this.model.getPost(postId)
            .then(displayPostDetails)
            .catch(ajaxError);


        function displayPostDetails(post) {
            _self.view.showDetails(post);
        }
    }

}
