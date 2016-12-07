class SearchView {
    constructor() {
    }

    displayPostTitles(data) {
        $('#app').empty();
        console.log(data);
        $.get('templates/searchResults-template.html', function (template) {
            let renderedHtml = Mustache.render(template);
            $('#app').html(renderedHtml);
            for(let each of data) {
                let postTitleDiv = $('<div>');
                postTitleDiv.appendTo($('#postTitles'));
                let postTitleLink = $(`<a href="#/posts/details/${each._id}">`).text(each.title);
                postTitleLink.appendTo(postTitleDiv);
            }
        })
    }
}