"use strict";
exports.__esModule = true;
var react_router_redux_1 = require("react-router-redux");
var pathToRegexp = require('path-to-regexp');
var LoginRedirectActions = (function () {
    function LoginRedirectActions(serviceConstructor, backendConfig, dispatch) {
        var _this = this;
        this.serviceConstructor = serviceConstructor;
        this.backendConfig = backendConfig;
        this.dispatch = dispatch;
        this.redirect = function (pattern, params) {
            //TODO: вместо pathToRegexp перейти на метод generatePath 'react-router', когда он появится в npm (в исходниках на github-e уже есть)
            var path = params ? pathToRegexp.compile(pattern)(params) : pattern;
            // const path = generatePath(pattern, params);
            _this.dispatch(react_router_redux_1.push(path));
        };
        this.service = new serviceConstructor(backendConfig, {
            onError: function (error) {
                _this.redirect(backendConfig.errorsRoute, { operationError: error.operationError });
            }
        });
    }
    return LoginRedirectActions;
}());
exports.LoginRedirectActions = LoginRedirectActions;
