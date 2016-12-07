class SearchView {
    constructor() {
    }

    displayPostTitles(data) {
        $('#app').empty();
        $.get('templates/searchResults-template.html', function (template) {
            let renderedHtml = Mustache.render(template);
            $('#app').html(renderedHtml);
            if(data.length == 0) {
                $('#postTitles').append($('<span>').text('Sorry, nothing was found. Try again with different keywords.'))
            }
            else {
                for(let each of data) {
                    let postTitleDiv = $('<div>');
                    postTitleDiv.appendTo($('#postTitles'));
                    let postTitleLink = $(`<a href="#/posts/details/${each._id}">`).text(each.title);
                    postTitleLink.appendTo(postTitleDiv);
                }
            }
        })
    }
}