import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {applyMiddleware, combineReducers, createStore, Dispatch} from 'redux';
import {Provider} from 'react-redux';
import {groupReducer, initialState as groupInitial} from 'Modules/Group/Reducers/GroupReducers'
import {orderReducer, initialState as orderInitial} from 'Modules/Order/Reducers/OrderReducers'
import {HashRouter as Router, Route, Switch} from 'react-router-dom';
import LoginPage from 'Libraries/Core/Modules/Login/Pages/LoginPage';
import {push, routerMiddleware, routerReducer} from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import {loginReducer, initialState as authInitial} from 'Libraries/Core/Modules/Login/Reducers/LoginReducers';
import {notificationReducer, initialState as notificationInitial} from 'Libraries/Core/Modules/Notification/Reducers/NotificationReducers';
import {LOGOUT_ACTION} from 'Libraries/Core/Modules/Login/Actions/ActionTypes';
import {IClientAppState} from 'Modules/Main/Models';
import './Modules/Main/Config';
import {ROUTES} from 'Modules/Main/RouterConsts';
import {dictionaryReducer, initialState as dictionaryInitial} from 'Libraries/Core/Modules/Dictionary/Reducers/DictionaryReducers';
import {ClientLayout} from 'Modules/Main/ClientLayout';
import {ClientContext} from 'Modules/Main/Config';
import {IAuth} from 'Libraries/Core/Modules/Login/Models';
import {RouteProps} from 'react-router';
require('Libraries/Core/assets/styles/Core.styl');
require('bootstrap/dist/css/bootstrap.min.css');
require('react-widgets/dist/css/react-widgets.css');

import momentLocalizer from 'react-widgets-moment';
import * as Moment from 'moment';

Moment.locale('ru');
momentLocalizer();

export const getInitialState = () => ({
    auth: authInitial(),
    dictionary: dictionaryInitial(),
    notification: notificationInitial(),
    order: orderInitial(),
    group: groupInitial()
});

export const store = createStore(
    (state: IClientAppState, action: any) => {
        if (action.type===LOGOUT_ACTION) {
            return getInitialState();
        }
        return combineReducers(
            {
                auth: loginReducer,
                dictionary: dictionaryReducer,
                routing: routerReducer,
                order: orderReducer,
                notification: notificationReducer,
                group: groupReducer
        })(state, action);
    },
    applyMiddleware(routerMiddleware(createHistory())),
);

const clientContext = ClientContext(ROUTES.SERVICE.ERROR);

const handleLogin = (auth:IAuth) => {
    localStorage.setItem('token', auth.token);
    store.dispatch(push(ROUTES.CAR.LIST));
};

const handleLogout = () => {
    localStorage.removeItem('token');
    store.dispatch(push(ROUTES.AUTH.LOGOUT));
};

const renderLogin = () => <LoginPage onLogin={handleLogin} onLogout={handleLogout} context={clientContext}/>;

const renderClientLayout = (props: RouteProps) => <ClientLayout {...props} context={clientContext} dispatch={store.dispatch}/>;

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path={ROUTES.AUTH.LOGIN} render={renderLogin}/>
                <Route exact path={ROUTES.AUTH.LOGOUT} render={renderLogin}/>
                <Route exact path={ROUTES.SERVICE.UNAUTHORIZED} component={renderLogin}/>
                <Route path={ROUTES.ROOT} render={renderClientLayout}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById("root")
);