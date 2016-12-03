class PostModel {
    constructor(baseUrl,appKey,requester,authService){
        this._baseUrl = baseUrl;
        this._appKey = appKey;
        this._requester = requester;
        this._authService = authService;
    }

    getPost(id){
        let requestUrl =  this._baseUrl + 'appdata/' + this._appKey + "/posts/" + id;
        let requestHeaders = {
            'Authorization': 'Basic ' + btoa('kid_rygdnrymg:c24558e33f43465fb450b9ad223f3050')
        };
        return this._requester.get(requestUrl, requestHeaders);
    }

    getPosts(){
        let requestUrl =  this._baseUrl + 'appdata/' + this._appKey + "/posts";
        let requestHeaders = {
            'Authorization': 'Basic ' + btoa('kid_rygdnrymg:c24558e33f43465fb450b9ad223f3050')
        };
        return this._requester.get(requestUrl, requestHeaders);
    }

    postPost(data){
        let requestUrl =  this._baseUrl + 'appdata/' + this._appKey + "/posts";
        let requestHeaders = this._authService.getHeaders();

        return this._requester.post(requestUrl, requestHeaders,data);
    }

    deletePost(id) {
        let requestUrl =  this._baseUrl + 'appdata/' + this._appKey + "/posts/" + id;
        let requestHeaders = this._authService.getHeaders();

        return this._requester.delete(requestUrl, requestHeaders);
    }

    editPost(id) {
        let requestUrl =  this._baseUrl + 'appdata/' + this._appKey + "/posts/" + id;
        let requestHeaders = this._authService.getHeaders();

        return this._requester.put(requestUrl, requestHeaders, id);
    }

    loadPost(id){
        let requestUrl =  this._baseUrl + 'appdata/' + this._appKey + "/posts/" + id;
        let requestHeaders = this._authService.getHeaders();

        return this._requester.get(requestUrl, requestHeaders);
    }
}