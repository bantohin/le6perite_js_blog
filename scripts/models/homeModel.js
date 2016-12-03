class HomeModel {
    constructor(baseUrl, appKey, requester, authService) {
        this._baseUrl = baseUrl;
        this._appKey = appKey;
        this._requester = requester;
        this._authService = authService;
    }

    getTopPosts() {
        let requestUrl = this._baseUrl + 'appdata/' + this._appKey + '/posts';
        let requestHeaders = this._authService.getHeaders();

        return this._requester.get(requestUrl, requestHeaders);
    }
}