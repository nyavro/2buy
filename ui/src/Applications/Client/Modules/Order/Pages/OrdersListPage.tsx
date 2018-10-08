import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {OrderActions} from '../Actions/OrderActions';
import {OrderService} from '../Services/OrderService';
import {IAsyncData} from 'Libraries/Core/Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {IOrderContext, IOrderModule, IOrderView} from '../Models';
import {OrdersList} from '../Components/OrdersList';
import {IItemsList} from 'Libraries/Core/Models';
import {SyncLoader} from 'react-spinners';
require('../assets/Order.styl');
require('../assets/nls/ru/Order.json');

interface IOwnProps {
    context: IOrderContext;
}

interface IDispatchProps {
    actions: OrderActions;
}

interface IStateProps {
    list: IAsyncData<IItemsList<IOrderView>>;
}

type TProps = IOwnProps & IDispatchProps & IStateProps;

class OrdersListPage extends React.Component<TProps, {}> {

    componentWillMount() {
        this.props.actions.list();
    }

    render() {
        const {list, actions} = this.props;
        return (list.status === ELoadingStatus.SUCCESS) ?
            <OrdersList actions={actions} list={list.data}/> :
            <SyncLoader className="spinner" loading/>
    }
}

const mapDispatchToProps = (dispatch: Dispatch<IOrderModule>, {context}: IOwnProps) => ({
    actions: new OrderActions(OrderService, context.order, dispatch)
});

const mapStateToProps = (state: IOrderModule) => {
    return {
        list: state.order.list
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersListPage);