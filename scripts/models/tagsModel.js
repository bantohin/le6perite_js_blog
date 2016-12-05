class TagsModel{
    constructor(baseUrl,appKey,requester,authService){
        this._baseUrl = baseUrl;
        this._appKey = appKey;
        this._requester = requester;
        this._authService = authService;
    }

    getTag(id){
        //TODO: ...Get current tag posts;
    }

    postTag(data){
        let requestUrl =  this._baseUrl + 'appdata/' + this._appKey + "/tags";
        let requestHeaders = this._authService.getHeaders();

        return this._requester.put(requestUrl, requestHeaders,data);
    }
}
