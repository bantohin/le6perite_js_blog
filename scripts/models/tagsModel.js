class TagsModel{
    constructor(baseUrl,appKey,requester,authService){
        this.baseUrl = baseUrl;
        this.appKey = appKey;
        this.requester = requester;
        this.authService = authService;
    }


    getTags(){
        let requestUrl = this.baseUrl + "appdata/" + this.appKey + "/tags";
        let requestHeaders = {
            'Authorization': 'Basic ' + btoa('kid_rygdnrymg:c24558e33f43465fb450b9ad223f3050')
        };

        return this.requester.get(requestUrl,requestHeaders);
    }

    getPosts(){
        let requestUrl = this.baseUrl + "appdata/" + this.appKey + "/posts";
        let requestHeaders = {
            'Authorization': 'Basic ' + btoa('kid_rygdnrymg:c24558e33f43465fb450b9ad223f3050')
        };

        return this.requester.get(requestUrl,requestHeaders);
    }

    putTag(id,data){
        let requestUrl = this.baseUrl + "appdata/" + this.appKey + "/tags/" + id;
        let requestHeaders = this.authService.getHeaders();

        return this.requester.put(requestUrl,requestHeaders,data);
    }

    postTag(data){
        let requestUrl = this.baseUrl + "appdata/" + this.appKey + "/tags";
        let requestHeaders = this.authService.getHeaders();

        return this.requester.post(requestUrl,requestHeaders,data);
    }
}
