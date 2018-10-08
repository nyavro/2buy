"use strict";
exports.__esModule = true;
var React = require("react");
var ReactDOM = require("react-dom");
var redux_1 = require("redux");
var react_redux_1 = require("react-redux");
var ClientReducers_1 = require("Applications/Client/Modules/Client/Reducers/ClientReducers");
var OrderRequestReducer_1 = require("Applications/Client/Modules/OrderRequest/Reducers/OrderRequestReducer");
var OrderReducer_1 = require("Applications/Client/Modules/Order/Reducers/OrderReducer");
var GroupReducers_1 = require("Modules/Group/Reducers/GroupReducers");
var react_router_dom_1 = require("react-router-dom");
var LoginPage_1 = require("Libraries/Core/Modules/Login/Pages/LoginPage");
var react_router_redux_1 = require("react-router-redux");
var createHashHistory_1 = require("history/createHashHistory");
var LoginReducers_1 = require("Libraries/Core/Modules/Login/Reducers/LoginReducers");
var NotificationReducers_1 = require("Libraries/Core/Modules/Notification/Reducers/NotificationReducers");
var ActionTypes_1 = require("Libraries/Core/Modules/Login/Actions/ActionTypes");
require("./Applications/Client/Config");
var RouterConsts_1 = require("Applications/Client/RouterConsts");
var DictionaryReducers_1 = require("Libraries/Core/Modules/Dictionary/Reducers/DictionaryReducers");
var ClientLayout_1 = require("Applications/Client/ClientLayout");
var Config_1 = require("Applications/Client/Config");
require('Libraries/Core/assets/styles/Core.styl');
require('bootstrap/dist/css/bootstrap.min.css');
require('react-widgets/dist/css/react-widgets.css');
var react_widgets_moment_1 = require("react-widgets-moment");
var Moment = require("moment");
Moment.locale('ru');
react_widgets_moment_1["default"]();
exports.getInitialState = function () { return ({
    client: ClientReducers_1.initialState(),
    auth: LoginReducers_1.initialState(),
    dictionary: DictionaryReducers_1.initialState(),
    orderRequest: OrderRequestReducer_1.initialState(),
    notification: NotificationReducers_1.initialState(),
    order: OrderReducer_1.initialState(),
    group: GroupReducers_1.initialState()
}); };
exports.store = redux_1.createStore(function (state, action) {
    if (action.type === ActionTypes_1.LOGOUT_ACTION) {
        return exports.getInitialState();
    }
    return redux_1.combineReducers({
        client: ClientReducers_1.clientsReducer,
        auth: LoginReducers_1.loginReducer,
        dictionary: DictionaryReducers_1.dictionaryReducer,
        routing: react_router_redux_1.routerReducer,
        orderRequest: OrderRequestReducer_1.orderRequestReducer,
        order: OrderReducer_1.orderReducer,
        notification: NotificationReducers_1.notificationReducer,
        group: GroupReducers_1.groupReducer
    })(state, action);
}, redux_1.applyMiddleware(react_router_redux_1.routerMiddleware(createHashHistory_1["default"]())));
var clientContext = Config_1.ClientContext(RouterConsts_1.ROUTES.SERVICE.ERROR);
var handleLogin = function (auth) {
    localStorage.setItem('token', auth.token);
    exports.store.dispatch(react_router_redux_1.push(RouterConsts_1.ROUTES.CAR.LIST));
};
var handleLogout = function () {
    localStorage.removeItem('token');
    exports.store.dispatch(react_router_redux_1.push(RouterConsts_1.ROUTES.AUTH.LOGOUT));
};
var renderLogin = function () { return <LoginPage_1["default"] onLogin={handleLogin} onLogout={handleLogout} context={clientContext}/>; };
var renderClientLayout = function (props) { return <ClientLayout_1.ClientLayout {...props} context={clientContext} dispatch={exports.store.dispatch}/>; };
ReactDOM.render(<react_redux_1.Provider store={exports.store}>
        <react_router_dom_1.HashRouter>
            <react_router_dom_1.Switch>
                <react_router_dom_1.Route exact path={RouterConsts_1.ROUTES.AUTH.LOGIN} render={renderLogin}/>
                <react_router_dom_1.Route exact path={RouterConsts_1.ROUTES.AUTH.LOGOUT} render={renderLogin}/>
                <react_router_dom_1.Route exact path={RouterConsts_1.ROUTES.SERVICE.UNAUTHORIZED} component={renderLogin}/>
                <react_router_dom_1.Route path={RouterConsts_1.ROUTES.ROOT} render={renderClientLayout}/>
            </react_router_dom_1.Switch>
        </react_router_dom_1.HashRouter>
    </react_redux_1.Provider>, document.getElementById("root"));
