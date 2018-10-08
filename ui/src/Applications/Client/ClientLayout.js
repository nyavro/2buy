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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var React = require("react");
var lodash_1 = require("lodash");
var NotificationPanel_1 = require("Libraries/Core/Modules/Notification/Components/NotificationPanel");
var react_router_1 = require("react-router");
var OrderRequestsListPage_1 = require("Applications/Client/Modules/OrderRequest/Pages/OrderRequestsListPage");
var RouterConsts_1 = require("./RouterConsts");
var OrderRequestCreatePage_1 = require("Applications/Client/Modules/OrderRequest/Pages/OrderRequestCreatePage");
var react_i18next_1 = require("react-i18next");
var react_router_redux_1 = require("react-router-redux");
var OrdersListPage_1 = require("Applications/Client/Modules/Order/Pages/OrdersListPage");
var OrderDetailsPage_1 = require("./Modules/Order/Pages/OrderDetailsPage");
var MessagingListener_1 = require("Libraries/Core/Modules/Messaging/Components/MessagingListener");
var CriticalPage_1 = require("Libraries/Core/Modules/Service/Pages/CriticalPage");
var reactstrap_1 = require("reactstrap");
require('./assets/nls/ru/ClientApp.json');
require('./assets/styles/Layout.styl');
var md_1 = require("react-icons/md");
var MainMenu_1 = require("Libraries/Components/MainMenu");
var GroupListPage_1 = require("../../Modules/Group/Pages/GroupListPage");
var ClientLayoutComponent = (function (_super) {
    __extends(ClientLayoutComponent, _super);
    function ClientLayoutComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            tabKey: 0,
            isVisible: false
        };
        _this.tabConfig = [
            {
                route: RouterConsts_1.ROUTES.CAR.LIST,
                prefix: RouterConsts_1.ROUTES.CAR.PATH,
                labelKey: "ClientApp:Tab.cars"
            },
            {
                route: RouterConsts_1.ROUTES.ORDER_REQUEST.LIST,
                prefix: RouterConsts_1.ROUTES.ORDER_REQUEST.PATH,
                labelKey: "ClientApp:Tab.order_requests"
            },
            {
                route: RouterConsts_1.ROUTES.ORDER.LIST,
                prefix: RouterConsts_1.ROUTES.ORDER.PATH,
                labelKey: "ClientApp:Tab.orders"
            }
        ];
        _this.handleTabClick = function (tab) { return function () {
            _this.setState({ tabKey: tab });
            _this.props.dispatch(react_router_redux_1.push(_this.tabConfig[tab].route));
        }; };
        _this.menuItems = function () { return [
            { link: '#' + RouterConsts_1.ROUTES.CAR.LIST, i18nKey: 'ClientApp:Menu.main', Icon: md_1.MdDashboard },
            { link: '#' + RouterConsts_1.ROUTES.AUTH.LOGOUT, i18nKey: 'ClientApp:Menu.logout', Icon: md_1.MdExitToApp },
        ]; };
        return _this;
    }
    ClientLayoutComponent.prototype.renderWithProps = function (Component, props) {
        return function () { return <Component {...props}/>; };
    };
    ClientLayoutComponent.prototype.renderWithRouterProps = function (Component, layoutProps) {
        return function (routerProps) {
            var props = __assign({}, layoutProps, routerProps);
            return <Component {...props}/>;
        };
    };
    ClientLayoutComponent.prototype.componentWillReceiveProps = function (props) {
        var pathname = props.location.pathname;
        var index = lodash_1.findIndex(this.tabConfig, function (_a) {
            var route = _a.route;
            return lodash_1.startsWith(pathname, route);
        });
        // if (index >= 0) {
        this.setState({ tabKey: index });
        // }
    };
    ;
    ClientLayoutComponent.prototype.render = function () {
        var _this = this;
        var props = this.props;
        var i18n = this.props.i18n;
        return (<div className="layout-container">
                <MainMenu_1.MainMenu i18n={i18n} menuItems={this.menuItems()}/>
                <reactstrap_1.Row>
                    <div className="layout-panel group-panel col-xl-2">
                        <GroupListPage_1["default"] {...props}/>
                    </div>
                    <div className="layout-panel client-layout col-xl-6">
                        {this.state.tabKey >= 0 && <reactstrap_1.Nav tabs>
                            {this.tabConfig.map(function (_a, index) {
            var labelKey = _a.labelKey;
            return <reactstrap_1.NavItem key={index}>
                                    <reactstrap_1.NavLink active={index === _this.state.tabKey} onClick={_this.handleTabClick(index)} key={index}>
                                        {i18n.t(labelKey)}
                                    </reactstrap_1.NavLink>
                                </reactstrap_1.NavItem>;
        })}
                        </reactstrap_1.Nav>}
                        <reactstrap_1.TabContent activeTab={this.state.tabKey}>
                            <reactstrap_1.TabPane tabId={this.state.tabKey}>
                                <reactstrap_1.Row>
                                    <reactstrap_1.Col>
                                        <react_router_1.Switch>
                                            <react_router_1.Route exact path={RouterConsts_1.ROUTES.ROOT} render={this.renderWithProps(GroupListPage_1["default"], __assign({}, props))}/>
                                            <react_router_1.Route exact path={RouterConsts_1.ROUTES.CAR.LIST} render={this.renderWithProps(GroupListPage_1["default"], __assign({}, props))}/>
                                            <react_router_1.Route exact path={RouterConsts_1.ROUTES.ORDER_REQUEST.CREATE} render={this.renderWithRouterProps(OrderRequestCreatePage_1["default"], __assign({}, props))}/>
                                            <react_router_1.Route exact path={RouterConsts_1.ROUTES.ORDER_REQUEST.LIST} render={this.renderWithProps(OrderRequestsListPage_1["default"], __assign({}, props))}/>
                                            <react_router_1.Route exact path={RouterConsts_1.ROUTES.ORDER.LIST} render={this.renderWithProps(OrdersListPage_1["default"], __assign({}, props))}/>
                                            <react_router_1.Route exact path={RouterConsts_1.ROUTES.ORDER.DETAILS} render={this.renderWithRouterProps(OrderDetailsPage_1["default"], __assign({}, props))}/>
                                            <react_router_1.Route exact path={RouterConsts_1.ROUTES.SERVICE.ERROR} component={CriticalPage_1.CriticalPage}/>
                                        </react_router_1.Switch>
                                    </reactstrap_1.Col>
                                </reactstrap_1.Row>
                            </reactstrap_1.TabPane>
                        </reactstrap_1.TabContent>
                        <div className="layout-default">
                            <NotificationPanel_1["default"] />
                            <MessagingListener_1.MessagingListener context={props.context}/>
                        </div>
                    </div>
                    <div className="layout-panel group-details col-xl-3">
                        Group details
                    </div>
                </reactstrap_1.Row>
            </div>);
    };
    return ClientLayoutComponent;
}(React.Component));
exports.ClientLayoutComponent = ClientLayoutComponent;
exports.ClientLayout = react_i18next_1.translate('ClientApp')(ClientLayoutComponent);
