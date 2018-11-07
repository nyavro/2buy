import * as React from 'react';
import NotificationPanel from 'Libraries/Core/Modules/Notification/Components/NotificationPanel';
import {RouteProps} from 'react-router';
import {ROUTES} from './RouterConsts';
import {IClientAppContext} from './Models';
import {translate} from 'react-i18next';
import {IMixedProps} from 'Libraries/Core/Models';
import {Dispatch} from 'redux';
import {MessagingListener} from 'Libraries/Core/Modules/Messaging/Components/MessagingListener';
import {Row} from 'reactstrap';
import {MdDashboard, MdExitToApp} from 'react-icons/md';
import {MainMenu} from 'Libraries/Components/MainMenu';
import {AsyncComponent} from 'Libraries/Components/AsyncComponent';
import {GroupListPage} from '../Group/Pages/GroupListPage';

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
    selected?:  { label: string, value: number };
}

interface IScary {
    label: string,
    value: number
}

export class ClientLayoutComponent extends React.Component<TProps, IState> {

    state: IState = {
    };

    menuItems = () => [
        { link: '#' + ROUTES.CAR.LIST, i18nKey: 'ClientApp:Menu.main', Icon: MdDashboard},
        { link: '#' + ROUTES.AUTH.LOGOUT, i18nKey: 'ClientApp:Menu.logout', Icon: MdExitToApp},
    ];

    handleGroupChange = (groupId: string) => {
        this.setState({groupId});
    };

    orders = {
        loader: () => import ('../Order'),
    };

    selectProduct = {
        loader: () => import ('../Product')
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
                        {
                            this.state.groupId && <AsyncComponent bundle={this.orders} {...props} groupId={this.state.groupId} selectProduct={{...this.selectProduct, props}}/>
                        }
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