class HomeView {
    constructor() {
    }

    listTopPosts(data) {
        $('#app').empty();
        $.get('templates/homeTemplate.html', function (template) {
            data.forEach(function(entity) {
                console.log(entity)
            })
        })
    }
}