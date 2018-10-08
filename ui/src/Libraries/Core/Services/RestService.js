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
var Enums_1 = require("../Enums");
var TIMEOUT = 9000;
var RestService = (function () {
    function RestService() {
        var _this = this;
        this.get = function (url, headers) {
            if (headers === void 0) { headers = {}; }
            var config = { headers: headers };
            return _this.withTimeout(_this.wrapInPromise(url, config), TIMEOUT);
        };
        this.post = function (url, body, headers) {
            if (headers === void 0) { headers = {}; }
            var config = {
                method: 'POST',
                headers: __assign({}, headers, { 'Content-Type': 'application/json', 'Accept': 'application/json' }),
                body: JSON.stringify(body)
            };
            return _this.withTimeout(_this.wrapInPromise(url, config), TIMEOUT);
        };
        this.put = function (url, body, headers) {
            if (headers === void 0) { headers = {}; }
            var config = {
                method: 'PUT',
                headers: __assign({}, headers, { 'Content-Type': 'application/json', 'Accept': 'application/json' }),
                body: JSON.stringify(body)
            };
            return _this.withTimeout(_this.wrapInPromise(url, config), TIMEOUT);
        };
        this.wrapInPromise = function (url, config) {
            return new Promise(function (resolve, reject) {
                fetch(url, config)
                    .then(function (res) {
                    if (res.ok) {
                        resolve(res.json());
                    }
                    else {
                        reject(res);
                    }
                }, reject);
            });
        };
        this.withTimeout = function (promise, timeout) {
            return new Promise(function (resolve, reject) {
                setTimeout(function () { return reject(_this.timeoutError()); }, timeout);
                promise.then(resolve, function (error) { return reject(_this.getError(error)); });
            });
        };
        this.timeoutError = function () { return ({ operationError: Enums_1.EOperationError.timeout }); };
        this.getError = function (response) {
            var operationError = Enums_1.EOperationError.internalError;
            switch (response.status) {
                case 401:
                    operationError = Enums_1.EOperationError.unauthorized;
                    break;
                case 403:
                    operationError = Enums_1.EOperationError.accessDenied;
                    break;
                case 500:
                case 502:
                    operationError = Enums_1.EOperationError.internalError;
                    break;
                case 504:
                    operationError = Enums_1.EOperationError.timeout;
                    break;
            }
            return { operationError: operationError };
        };
    }
    return RestService;
}());
exports.RestService = RestService;
