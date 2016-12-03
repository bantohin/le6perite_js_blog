class PostModel {
    constructor(baseUrl,appKey,requester,authService){
        this._baseUrl = baseUrl;
        this._appKey = appKey;
        this._requester = requester;
        this._authService = authService;
    }

    getPost(id){
        let requestUrl =  this._baseUrl + 'appdata/' + this._appKey + "/posts/" + id;
        let requestHeaders = this._authService.getHeaders();

        return this._requester.get(requestUrl, requestHeaders);
    }

    getPosts(){
        let requestUrl =  this._baseUrl + 'appdata/' + this._appKey + "/posts";
        let requestHeaders = this._authService.getHeaders();

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

        return this._requester.delete(requestUrl, requestHeaders, id);
    }

    putPost(id) {
        let requestUrl =  this._baseUrl + 'appdata/' + this._appKey + "/posts/" + id;
        let requestHeaders = this._authService.getHeaders();

        return this._requester.put(requestUrl, requestHeaders, id);
    }
}