class CommentsView {
    constructor(){
    }

    showComments(data) {
        console.log(data);
        $.get('templates/detailedPost-template.html',function (template) {
            let commentDiv = $(template).find('#comments-list');
        })
    }
}