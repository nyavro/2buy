"use strict";
exports.__esModule = true;
var RestService_1 = require("Libraries/Core/Services/RestService");
var Enums_1 = require("../../../Enums");
var LoginService = (function () {
    function LoginService(context) {
        var _this = this;
        this.login = function (credentials) {
            return _this.restService.post(_this.baseUrl + "/auth", credentials).then(function (response) { return response; }, function (response) {
                //TODO: Прокинуть код ошибки авторизации с бека.
                //Пока понимаем internalError как неправильный логин/пароль
                throw response.operationError === Enums_1.EOperationError.internalError ?
                    'badCredentials' :
                    'serviceUnavailable';
            });
        };
        this.restService = new RestService_1.RestService();
        this.baseUrl = context.login.backend;
    }
    return LoginService;
}());
exports.LoginService = LoginService;
