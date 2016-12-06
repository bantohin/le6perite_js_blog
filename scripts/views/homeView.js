class HomeView {
    constructor() {
    }

    listTopPosts(data) {
        $('#app').empty();
        let renderedHtml = `<br>
            <h1>Welcome to our blog</h1>
                            <br>               
                <h2>Top three posts of the week</h2>`;
        $.get('templates/homeTemplate.html', function (template) {
            data.forEach(function(entity) {
                renderedHtml += Mustache.render(template,entity);
                $('#app').html(renderedHtml);
            });
            Sammy(function () {
                let _self = this;
                $( "#searchEngine" ).click( function (ev) {
                    let text = $("#searchedText").val()
                    _self.trigger( 'searchButtonClicked', text);
                });
            })
        })
    }
}