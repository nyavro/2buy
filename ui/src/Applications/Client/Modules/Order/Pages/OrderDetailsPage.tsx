import * as React from 'react';
import {some} from 'lodash';
import {connect, Dispatch} from 'react-redux';
import {IClientAppContext} from '../../../Models';
import {OrderActions} from '../Actions/OrderActions';
import {IAsyncData, IMixedProps} from 'Libraries/Core/Models';
import {IOrder, IOrderModule} from '../Models';
import {RouteComponentProps} from 'react-router';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {OrderService} from "../Services/OrderService";
import {OrderListItem} from 'Applications/Client/Modules/Order/Components/OrderListItem';
import {SyncLoader} from 'react-spinners';

require('../assets/Order.styl');
require('../assets/nls/ru/Order.json');

interface IOwnProps extends IMixedProps {
    context: IClientAppContext;
}

interface IDispatchProps {
    actions: OrderActions;
}

interface IStateProps {
    orderRequest: IAsyncData<IOrder>;
}

export interface IOrderRouteProps {
    orderId?: string;
}

type TProps = IOwnProps & IDispatchProps & IStateProps & RouteComponentProps<IOrderRouteProps>;

class OrderDetailsPage extends React.Component<TProps, {}> {

    componentWillMount() {
        const {orderRequest: {status, data}, match: {params: {orderId}}} = this.props;
        if (status === ELoadingStatus.IDLE || !data || data.id !== orderId) {
            this.props.actions.getById(orderId);
        }
    }

    render() {
        const {orderRequest, i18n} = this.props;
        return (some([orderRequest], ({status}) => (status === ELoadingStatus.LOADING))) ?
            <SyncLoader className="spinner" loading/>:
            (<OrderListItem
                item={orderRequest.data}
                i18n={i18n}
            />)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<{}>, {context}: IOwnProps) => ({
    actions: new OrderActions(OrderService, context.order, dispatch),
});

const mapStateToProps = (state: IOrderModule) => {
    return {
        orderRequest: state.order.currentOrder
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailsPage);