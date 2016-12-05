class TagsController {
    constructor(model){
        this.model = model;
    }

    getTags(){
        let _self = this;
        $.get('templates/post-templates/postCreate-template.html', function (template) {
            $( document ).ready( function () {
                        let tags = $( '#createPost input[name=tags]' ).val();
                        tags = tags.split(',');
                        let requests = [];
                        for(let each of tags){
                            requests.push(_self.model.postTag({text:each}));
                        }
                        Promise.all(requests).then(function (request) {
                            console.log(request);
                        })
            })
        })
    }
}
