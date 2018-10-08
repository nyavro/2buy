"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var React = require("react");
var LoginForm_1 = require("../Components/LoginForm");
var LoginActions_1 = require("../Actions/LoginActions");
var LoginService_1 = require("../Services/LoginService");
var react_redux_1 = require("react-redux");
require('../assets/styles/Login.styl');
require('../assets/nls/ru/Login.json');
var LoginPage = (function (_super) {
    __extends(LoginPage, _super);
    function LoginPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LoginPage.prototype.render = function () {
        return <div className="loginPage">
            <LoginForm_1.LoginForm {...this.props}/>
        </div>;
    };
    return LoginPage;
}(React.Component));
var mapDispatchToProps = function (dispatch, _a) {
    var context = _a.context;
    return ({
        actions: new LoginActions_1.LoginActions(new LoginService_1.LoginService(context), dispatch)
    });
};
var mapStateToProps = function (state) { return ({ userInfoRequest: state.auth.userInfo }); };
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(LoginPage);
