class TagsModel{
    constructor(baseUrl,appKey,requester,authService){
        this._baseUrl = baseUrl;
        this._appKey = appKey;
        this._requester = requester;
        this._authService = authService;
    }

    getPosts(){
        let requestUrl = this._baseUrl + "appdata/" + this._appKey + "/posts";
        let requestHeaders = {
            'Authorization': 'Basic ' + btoa('kid_rygdnrymg:c24558e33f43465fb450b9ad223f3050'),
            'Content-Type': "application/json"
        };

        return this._requester.get(requestUrl,requestHeaders);
    }

    putTag(id,data){
        let requestUrl = this._baseUrl + "appdata/" + this._appKey + "/tags/" + id;
        let requestHeaders = {
            'Authorization': 'Basic ' + btoa('kid_rygdnrymg:c24558e33f43465fb450b9ad223f3050'),
            'Content-Type': "application/json"
        };

        return this._requester.put(requestUrl,requestHeaders,data);
    }


    getTag(id){
        let requestUrl = this._baseUrl + "appdata/" + this._appKey + "/tags/" + id;
        let requestHeaders = {
            'Authorization': 'Basic ' + btoa('kid_rygdnrymg:c24558e33f43465fb450b9ad223f3050'),
            'Content-Type': "application/json"
        };

        return this._requester.get(requestUrl,requestHeaders);
    }

    getTags(){
        let requestUrl = this._baseUrl + "appdata/" + this._appKey + "/tags";
        let requestHeaders = {
            'Authorization': 'Basic ' + btoa('kid_rygdnrymg:c24558e33f43465fb450b9ad223f3050'),
            'Content-Type': "application/json"
        };

        return this._requester.get(requestUrl,requestHeaders);
    }

    postTag(data){
        let requestUrl =  this._baseUrl + 'appdata/' + this._appKey + "/tags";
        let requestHeaders = this._authService.getHeaders();

        return this._requester.post(requestUrl, requestHeaders,data);
    }
}
