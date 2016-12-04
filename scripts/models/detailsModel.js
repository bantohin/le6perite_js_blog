class DetailsModel {
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
}
