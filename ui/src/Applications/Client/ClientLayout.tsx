import * as React from 'react';
import {findIndex, startsWith} from 'lodash';
import NotificationPanel from 'Libraries/Core/Modules/Notification/Components/NotificationPanel';
import {Route, RouteComponentProps, RouteProps, Switch} from 'react-router';
import OrderRequestsListPage from 'Applications/Client/Modules/OrderRequest/Pages/OrderRequestsListPage';
import {ROUTES} from './RouterConsts';
import {IClientAppContext} from './Models';
import OrderRequestCreatePage from 'Applications/Client/Modules/OrderRequest/Pages/OrderRequestCreatePage';
import {translate} from 'react-i18next';
import {IMixedProps} from 'Libraries/Core/Models';
import {Dispatch} from 'redux';
import {push} from 'react-router-redux';
import OrdersListPage from 'Applications/Client/Modules/Order/Pages/OrdersListPage';
import OrderDetailsPage from "./Modules/Order/Pages/OrderDetailsPage";
import {MessagingListener} from 'Libraries/Core/Modules/Messaging/Components/MessagingListener';
import {CriticalPage} from 'Libraries/Core/Modules/Service/Pages/CriticalPage';
import {Col, Nav, NavItem, NavLink, Row, TabContent, TabPane} from 'reactstrap';
require('./assets/nls/ru/ClientApp.json');
require('./assets/styles/Layout.styl');
import {MdDashboard, MdExitToApp} from 'react-icons/md';
import {MainMenu} from 'Libraries/Components/MainMenu';
import GroupListPage from "../../Modules/Group/Pages/GroupListPage";

interface IContextProps {
    context: IClientAppContext;
}

interface IOwnProps extends IMixedProps {
    dispatch: Dispatch<IClientAppContext>;
}

type TProps = IContextProps & IOwnProps & RouteProps;

interface IState {
    tabKey: number;
    isVisible: boolean;
}

export class ClientLayoutComponent extends React.Component<TProps, IState> {

    state = {
        tabKey: 0,
        isVisible: false
    };

    tabConfig = [
        {
            route: ROUTES.CAR.LIST,
            prefix: ROUTES.CAR.PATH,
            labelKey: "ClientApp:Tab.cars"
        },
        {
            route: ROUTES.ORDER_REQUEST.LIST,
            prefix: ROUTES.ORDER_REQUEST.PATH,
            labelKey: "ClientApp:Tab.order_requests"
        },
        {
            route: ROUTES.ORDER.LIST,
            prefix: ROUTES.ORDER.PATH,
            labelKey: "ClientApp:Tab.orders"
        }
    ];

    renderWithProps<P>(Component: React.ComponentType<RouteComponentProps<P>> | React.ComponentType<P>, props:P) {
        return () => <Component {...props}/>;
    }

    renderWithRouterProps<P>(Component: React.ComponentType<RouteComponentProps<P> & IContextProps>, layoutProps:IContextProps) {
        return (routerProps:RouteComponentProps<P>) => {
            const props = {...layoutProps, ...routerProps};
            return <Component {...props}/>;
        };
    }

    handleTabClick = (tab: number) => () => {
        this.setState({tabKey: tab});
        this.props.dispatch(push(this.tabConfig[tab].route));
    };

    componentWillReceiveProps (props: TProps) {
        const {location: {pathname}} = props;
        let index = findIndex(this.tabConfig, ({route}) => startsWith(pathname, route));
        // if (index >= 0) {
            this.setState({tabKey: index});
        // }
    };

    menuItems = () => [
        { link: '#' + ROUTES.CAR.LIST, i18nKey: 'ClientApp:Menu.main', Icon: MdDashboard},
        { link: '#' + ROUTES.AUTH.LOGOUT, i18nKey: 'ClientApp:Menu.logout', Icon: MdExitToApp},
    ];

    render() {
        const props:IContextProps = this.props;
        const {i18n} = this.props;
        return (
            <div className="layout-container">
                <MainMenu i18n={i18n} menuItems={this.menuItems()}/>
                <Row>
                    <div className="layout-panel group-panel col-xl-2">
                        <GroupListPage {...props}/>
                    </div>
                    <div className="layout-panel client-layout col-xl-6">
                        {this.state.tabKey>=0 && <Nav tabs>
                            {this.tabConfig.map(({labelKey}, index) =>
                                <NavItem key={index}>
                                    <NavLink active={index===this.state.tabKey} onClick={this.handleTabClick(index)} key={index}>
                                        {i18n.t(labelKey)}
                                    </NavLink>
                                </NavItem>
                            )}
                        </Nav>}
                        <TabContent activeTab={this.state.tabKey}>
                            <TabPane tabId={this.state.tabKey}>
                                <Row>
                                    <Col>
                                        <Switch>
                                            {/*<Route exact path={ROUTES.ROOT} render={this.renderWithProps(GroupListPage, {...props})}/>*/}
                                            {/*<Route exact path={ROUTES.CAR.LIST} render={this.renderWithProps(GroupListPage, {...props})}/>*/}
                                            {/*<Route exact path={ROUTES.ORDER_REQUEST.CREATE} render={this.renderWithRouterProps(OrderRequestCreatePage, {...props})}/>*/}
                                            {/*<Route exact path={ROUTES.ORDER_REQUEST.LIST} render={this.renderWithProps(OrderRequestsListPage, {...props})}/>*/}
                                            {/*<Route exact path={ROUTES.ORDER.LIST} render={this.renderWithProps(OrdersListPage, {...props})}/>*/}
                                            {/*<Route exact path={ROUTES.ORDER.DETAILS} render={this.renderWithRouterProps(OrderDetailsPage, {...props})}/>*/}
                                            {/*<Route exact path={ROUTES.SERVICE.ERROR} component={CriticalPage}/>*/}
                                        </Switch>
                                    </Col>
                                </Row>
                            </TabPane>
                        </TabContent>
                        <div className="layout-default">
                            <NotificationPanel/>
                            <MessagingListener context={props.context}/>
                        </div>
                    </div>
                    <div className="layout-panel group-details col-xl-3">
                        Group details
                    </div>
                </Row>
            </div>
        );
    }
}

export const ClientLayout = translate('ClientApp')(ClientLayoutComponent);