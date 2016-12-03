class UserModel {
    constructor(baseUrl, appKey, requester, authService) {
        this._baseUrl = baseUrl;
        this._appKey = appKey;
        this._requester = requester;
        this._authService = authService;
    }

    loginUser(data) {
        let requestUrl = this._baseUrl + 'user/' + this._appKey + '/login';
        let requestHeaders = this._authService.getHeaders();

        return this._requester.post(requestUrl, requestHeaders, data);
    }

    logoutUser() {
        let requestUrl = this._baseUrl + 'user/' + this._appKey + '/_logout';
        let requestHeaders = this._authService.getHeaders();

        return this._requester.post(requestUrl, requestHeaders, {});
    }

    registerUser(data) {
        let requestUrl = this._baseUrl + 'user/' + this._appKey;
        let requestHeaders = this._authService.getHeaders();
        console.log(requestHeaders);
        return this._requester.post(requestUrl, requestHeaders, data);
    }
}