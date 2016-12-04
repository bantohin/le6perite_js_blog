class DetailsController{
    constructor(view,model){
        this.view = view;
        this.model = model;
    }


    showDetails(postId){
        let _self = this;

        this.model.getPost(postId)
            .then(displayPostDetails)
            .catch(errorDisplayPostDetails);


        function displayPostDetails(post) {
            _self.view.showDetails(post);
        }

        function errorDisplayPostDetails(error) {
            alert();
        }
    }

}
