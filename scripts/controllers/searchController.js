class SearchController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    loadSearchData(data){
        let _self = this;
        let posts = []
        _self.model.getPosts()
            .then(function (posts) {
                for(let post of posts){
                    if(post.title.indexOf(data)!= -1 || post.text.indexOf(data)!= -1 || post.tags.indexOf(data)){

                    }
                }
            })
    }
}