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
var react_i18next_1 = require("react-i18next");
var reactstrap_1 = require("reactstrap");
var Enums_1 = require("Libraries/Core/Enums");
var react_spinners_1 = require("react-spinners");
var avatar = require('../assets/images/avatar.svg');
var LoginFormComponent = (function (_super) {
    __extends(LoginFormComponent, _super);
    function LoginFormComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleSubmit = function () {
            var credentials = _this.state;
            var _a = _this.props, actions = _a.actions, onLogin = _a.onLogin;
            actions.login(credentials, onLogin);
        };
        _this.handleLoginChange = function (event) {
            _this.setState({ login: event.target.value });
        };
        _this.handlePasswordChange = function (event) {
            _this.setState({ password: event.target.value });
        };
        return _this;
    }
    LoginFormComponent.prototype.componentDidMount = function () {
        var _a = this.props, actions = _a.actions, onLogout = _a.onLogout;
        actions.logout(onLogout);
    };
    LoginFormComponent.prototype.render = function () {
        var _a = this.props, i18n = _a.i18n, userInfoRequest = _a.userInfoRequest;
        var isLoading = userInfoRequest.status === Enums_1.ELoadingStatus.LOADING;
        return <reactstrap_1.Row className="login">
            <reactstrap_1.Col md={4} lg={3}>
                <reactstrap_1.Card body>
                    <reactstrap_1.Form onSubmit={this.handleSubmit}>
                        <div className="text-center">
                            <img src={avatar} className="avatar" alt="logo"/>
                        </div>
                        <reactstrap_1.Fade in={userInfoRequest.status === Enums_1.ELoadingStatus.FAILURE || isLoading}>
                            <div className="status">
                                <div className="barLoader">{userInfoRequest.status === Enums_1.ELoadingStatus.FAILURE ? i18n.t("Login:Form.Error." + userInfoRequest.error) : <react_spinners_1.BarLoader loading/>}</div>
                            </div>
                        </reactstrap_1.Fade>
                        <reactstrap_1.FormGroup>
                            <reactstrap_1.Label for={i18n.t("Login:Form.Login.label")}>{i18n.t("Login:Form.Login.label")}</reactstrap_1.Label>
                            <reactstrap_1.Input type='text' placeholder={i18n.t('Login:Form.Login.placeholder')} onChange={this.handleLoginChange} disabled={isLoading}/>
                        </reactstrap_1.FormGroup>
                        <reactstrap_1.FormGroup>
                            <reactstrap_1.Label for={i18n.t("Login:Form.Password.label")}>{i18n.t("Login:Form.Password.label")}</reactstrap_1.Label>
                            <reactstrap_1.Input type='password' placeholder={i18n.t('Login:Form.Password.placeholder')} onChange={this.handlePasswordChange} disabled={isLoading}/>
                        </reactstrap_1.FormGroup>
                        <hr />
                        <reactstrap_1.Button outline color="primary" block disabled={isLoading} onClick={this.handleSubmit}>
                            {i18n.t('Login:Form.Submit.label')}
                        </reactstrap_1.Button>
                    </reactstrap_1.Form>
                </reactstrap_1.Card>
            </reactstrap_1.Col>
        </reactstrap_1.Row>;
    };
    return LoginFormComponent;
}(React.Component));
exports.LoginFormComponent = LoginFormComponent;
exports.LoginForm = react_i18next_1.translate('Login')(LoginFormComponent);
