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
            let element = document.getElementById('app').childNodes[9];
            let tagsDiv = $(element).find('.tags');
            let postTags = data[2].tags;
            for (let tag of postTags) {
                let tagPara = $('<b>').text(tag + ", ");
                $(tagPara).appendTo(tagsDiv);
            }
            let element2 = document.getElementById('app').childNodes[8];
            let tagsDiv2 = $(element2).find('.tags');
            let postTags2 = data[1].tags;
            console.log(data[1]);
            for (let tag of postTags2) {
                let tagPara2 = $('<b>').text(tag + ", ");
                $(tagPara2).appendTo(tagsDiv2);
            }
            let element3 = document.getElementById('app').childNodes[7];
            let tagsDiv3 = $(element3).find('.tags');
            let postTags3 = data[0].tags;
            for (let tag of postTags3) {
                let tagPara3 = $('<b>').text(tag + ", ");
                $(tagPara3).appendTo(tagsDiv3);
            }
        })
    }
}