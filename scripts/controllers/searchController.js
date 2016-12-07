class SearchController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    loadSearchData(data){
        let _self = this;
        let posts = [];
        let requestsArray = [_self.model.getPosts(), _self.model.getTags()];
        Promise.all(requestsArray)
            .then(function ([posts, tags]){
                let results = [];
                for(let post of posts) {
                    if(post.title.indexOf(data)!= -1 || post.text.indexOf(data)!= -1 || post.author.indexOf(data) != -1){
                        results.push(post);
                    }
                }
                for(let tag of tags) {
                    if(tag.text.indexOf(data) != - 1) {
                        let tagRequestsArray = [];
                        for (let id of tag.posts_id) {
                            tagRequestsArray.push(_self.model.getPost(id));
                        }
                        Promise.all(tagRequestsArray)
                            .then(function (posts) {
                                for (let postWithTag of posts) {
                                    console.log(posts);
                                    console.log(postWithTag);
                                    results.push(postWithTag);
                                    _self.view.displayPostTitles(results);
                                }
                            })
                            .catch(ajaxError);
                    }
                }
            })
            .catch(ajaxError);
    }
}