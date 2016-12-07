class HomeView {
    constructor() {
        this.tags = [];
    }

    listTopPosts(data) {
        let _self = this;
        (function getTags() {
            let requestUrl = "https://baas.kinvey.com/" + "appdata/" + "kid_rygdnrymg" + "/tags";
            let requestHeaders = {
                'Authorization': 'Basic ' + btoa('kid_rygdnrymg:c24558e33f43465fb450b9ad223f3050')
            };
            $.ajax({
                method: "GET",
                url: requestUrl,
                headers: requestHeaders
            }).then(function (tags) {
                _self.tags = tags;
                everything();
            })
        })();

        function everything() {
            $( '#app' ).empty();
            let renderedHtml = `<br>
            <h1 id="welcome-blog">Welcome to our blog</h1>
                            <br>  
                            <br>
                            <br>
                <h2 id="week-posts">Top three posts of the week:</h2>`;
            $.get( 'templates/homeTemplate.html', function (template) {
                for (let each of data) {
                    renderedHtml += Mustache.render( template, each );
                    $( '#app' ).html( renderedHtml );
                }
                let divs = document.getElementsByClassName('tags-div');
                for(let each of divs){
                    for (let tag of _self.tags) {
                        if(tag.posts_id.includes($(each).attr('this-id'))){
                            let p = $('<a class="tags">');
                            p.text(tag.text);
                            p.attr('href','#/search/' + tag.text);
                            p.appendTo(each);
                        }
                    }
                }
            } );
        }
            Sammy(function () {
                let _self = this;
                $( "#searchEngine" ).click( function (ev) {
                    let text = $("#searchedText").val();
                    _self.trigger( 'searchButtonClicked', text);
                });
            })
    }
}