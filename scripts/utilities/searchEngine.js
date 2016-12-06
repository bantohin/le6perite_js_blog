function searchEngine(requester,authService) {
    $('#searchEngine').click(searchInBlog);


    function searchInBlog() {
        let searchedText = $('#searchedText').val();
        $('#searchedText').val("");


    }


    function searchByAuthor() {
        let url = "https://baas.kinvey.com/kid_rygdnrymg/posts";
        let headers = authService.getHeaders();
        requester.get(url,headers);
    }
}
