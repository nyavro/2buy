"use strict";
exports.__esModule = true;
var ActionTypes_1 = require("./ActionTypes");
var ReduxUtils_1 = require("Libraries/Core/Utils/ReduxUtils");
var redux_actions_1 = require("redux-actions");
var LoginActions = (function () {
    function LoginActions(service, dispatch) {
        this.service = service;
        this.dispatch = dispatch;
    }
    LoginActions.prototype.login = function (credentials, onLogin) {
        var _this = this;
        return ReduxUtils_1.asyncDispatch(this.dispatch, ActionTypes_1.LOGIN_REQUEST, function () { return _this.service.login(credentials).then(function (auth) {
            onLogin(auth);
            return auth;
        }); });
    };
    LoginActions.prototype.logout = function (onLogout) {
        this.dispatch(redux_actions_1.createAction(ActionTypes_1.LOGOUT_ACTION)());
        onLogout();
    };
    return LoginActions;
}());
exports.LoginActions = LoginActions;
