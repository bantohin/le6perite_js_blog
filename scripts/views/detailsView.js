class DetailsView{
    constructor(authService){
        this.authService = authService;
        this.views = 0;
        this.sortedComments = [];
    }

    showDetails(post){
        this.views = Number(post.views);
        this.increaseViews(post);
        this.loadCurrentPostComments(post);
    }

    increaseViews(post){
        let requestUrl =  "https://baas.kinvey.com/" + 'appdata/kid_rygdnrymg/posts/' + post._id;
        let requestHeaders = {
            'Authorization': 'Basic ' + btoa('kid_rygdnrymg:c24558e33f43465fb450b9ad223f3050')
        };
        let incViews = this.views + 1;

        let dataObject = {
            author: post.author,
            date: post.date,
            image: post.image,
            text: post.text,
            title: post.title,
            views: incViews
        };

        $.ajax({
            method: "PUT",
            url: requestUrl,
            headers: requestHeaders,
            data: dataObject
        })
    }

    loadCurrentPostComments(post){
        let _self = this;
        let requestUrl =  "https://baas.kinvey.com/" + 'appdata/kid_rygdnrymg/comments';
        let requestHeaders = {
            'Authorization': 'Basic ' + btoa('kid_rygdnrymg:c24558e33f43465fb450b9ad223f3050')
        };

        $.ajax({
            method:"GET",
            url: requestUrl,
            headers: requestHeaders
        }).then(function (comments) {
            let sorted = comments.filter(function (data) {
                return data.post_id == post._id
            });

            _self.sortedComments = sorted;

            $('#app').empty();
            $(document).ready(function () {
                $.get('templates/post-templates/detailedPost-template.html',function (template) {
                    let renderedHtml = Mustache.render(template, post);
                    let commentsList = $('<div>');
                    for(let each of _self.sortedComments){
                        let p = $('<p>');
                        p.text(each.text);
                        let deleteBtn = $('<input type="button" value="Delete comment"/>');
                        deleteBtn.attr('my-id',each._id);
                        deleteBtn.click(deleteComment);
                        p.appendTo(commentsList);
                        if(sessionStorage.getItem('id') == each._acl.creator){
                            deleteBtn.appendTo(commentsList);
                        }
                    }
                    $('#app').html(renderedHtml);
                    commentsList.appendTo($('#app').find('#comments-list'));

                    function deleteComment() {
                        let deleteId = $(this).attr('my-id');
                        let url = "https://baas.kinvey.com/" + 'appdata/kid_rygdnrymg/comments/' + deleteId;
                        let headers = _self.authService.getHeaders();

                        $.ajax({
                            method: 'DELETE',
                            url: url,
                            headers: headers
                        }).then(function () {
                            location.reload();
                        })

                    }
                })
            })
        }).catch(function (error) {
            _self.sortedComments = [];
        })


    }
}
