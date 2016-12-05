class CommentModel{
    constructor(baseUrl,appKey,requester,authService){
        this._baseUrl = baseUrl;
        this._appKey = appKey;
        this._requester = requester;
        this._authService = authService;
    }

    postComment(data){
        let requestUrl =  this._baseUrl + 'appdata/' + this._appKey + "/comments";
        let requestHeaders = this._authService.getHeaders();

        return this._requester.post(requestUrl, requestHeaders,data);
    }
}