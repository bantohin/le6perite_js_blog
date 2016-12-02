sessionStorage.setItem('authToken', btoa("guest:guest"));

(function app() {
    let router = Sammy(function () {
        let baseUrl = "https://baas.kinvey.com/";
        let appId = "kid_rygdnrymg";
        let appSecret = "62388f7eecea488780b40e25928ef190";

        let authService = new AuthService(appId, appSecret);
    })
})();
