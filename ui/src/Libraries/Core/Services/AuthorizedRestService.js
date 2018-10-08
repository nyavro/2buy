"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var RestService_1 = require("./RestService");
var AuthorizedRestService = (function () {
    function AuthorizedRestService(backendConfig, errorsHandler) {
        var _this = this;
        this.backendConfig = backendConfig;
        this.errorsHandler = errorsHandler;
        this.restService = new RestService_1.RestService();
        this.fetchData = function (method) { return function (url, body, headers) {
            if (body === void 0) { body = null; }
            if (headers === void 0) { headers = {}; }
            return (_this.restService[method](url, body, __assign({}, headers, { 'token': localStorage.getItem('token') }))
                .then(function (res) { return res; }, _this.errorsHandler.onError));
        }; };
        this.get = function (url, headers) {
            if (headers === void 0) { headers = {}; }
            return (_this.restService
                .get(url, __assign({}, headers, { 'token': localStorage.getItem('token') }))
                .then(function (res) { return res; }, _this.errorsHandler.onError));
        };
        this.post = this.fetchData('post');
        this.put = this.fetchData('put');
    }
    return AuthorizedRestService;
}());
exports.AuthorizedRestService = AuthorizedRestService;
