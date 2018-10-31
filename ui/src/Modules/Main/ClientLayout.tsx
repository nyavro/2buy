import * as React from 'react';
import {findIndex, startsWith} from 'lodash';
import NotificationPanel from 'Libraries/Core/Modules/Notification/Components/NotificationPanel';
import {RouteComponentProps, RouteProps} from 'react-router';
import {ROUTES} from './RouterConsts';
import {IClientAppContext} from './Models';
import {translate} from 'react-i18next';
import {IMixedProps} from 'Libraries/Core/Models';
import {Dispatch} from 'redux';
import {push} from 'react-router-redux';
import {MessagingListener} from 'Libraries/Core/Modules/Messaging/Components/MessagingListener';
import {Row} from 'reactstrap';
import {MdDashboard, MdExitToApp} from 'react-icons/md';
import {MainMenu} from 'Libraries/Components/MainMenu';
import GroupListPage from "../Group/Pages/GroupListPage";
import OrderList from '../Order/Pages/OrderListPage';

require('./assets/nls/ru/ClientApp.json');
require('./assets/styles/Layout.styl');

interface IContextProps {
    context: IClientAppContext;
}

interface IOwnProps extends IMixedProps {
    dispatch: Dispatch<IClientAppContext>;
}

type TProps = IContextProps & IOwnProps & RouteProps;

interface IState {
    groupId?: string;
}

export class ClientLayoutComponent extends React.Component<TProps, IState> {

    state: IState = {
    };

    renderWithProps<P>(Component: React.ComponentType<RouteComponentProps<P>> | React.ComponentType<P>, props:P) {
        return () => <Component {...props}/>;
    }

    renderWithRouterProps<P>(Component: React.ComponentType<RouteComponentProps<P> & IContextProps>, layoutProps:IContextProps) {
        return (routerProps:RouteComponentProps<P>) => {
            const props = {...layoutProps, ...routerProps};
            return <Component {...props}/>;
        };
    }

    // componentWillReceiveProps (props: TProps) {
        // const {location: {pathname}} = props;
        // let index = findIndex(this.tabConfig, ({route}) => startsWith(pathname, route));
        // if (index >= 0) {
        //     this.setState({tabKey: index});
        // }
    // };

    menuItems = () => [
        { link: '#' + ROUTES.CAR.LIST, i18nKey: 'ClientApp:Menu.main', Icon: MdDashboard},
        { link: '#' + ROUTES.AUTH.LOGOUT, i18nKey: 'ClientApp:Menu.logout', Icon: MdExitToApp},
    ];

    handleGroupChange = (groupId: string) => {
        this.setState({groupId});
    };

    render() {
        const props:IContextProps = this.props;
        const {i18n} = this.props;
        return (
            <div className="layout-container">
                <MainMenu i18n={i18n} menuItems={this.menuItems()}/>
                <Row>
                    <div className="col-xl-2 layout-panel group-panel">
                        <GroupListPage {...props} onGroupChange={this.handleGroupChange}/>
                    </div>
                    <div className="layout-panel client-layout col-xl-6">
                        <OrderList {...props} groupId={this.state.groupId}/>
                    </div>
                    <div className="layout-panel group-details col-xl-3">

                    </div>
                </Row>
                <NotificationPanel/>
                <MessagingListener context={props.context}/>
            </div>
        );
    }
}

export const ClientLayout = translate('ClientApp')(ClientLayoutComponent);