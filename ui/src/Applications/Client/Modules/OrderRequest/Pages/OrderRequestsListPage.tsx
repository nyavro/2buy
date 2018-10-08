import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {OrderRequestActions} from '../Actions/OrderRequestActions';
import {OrderRequestService} from '../Services/OrderRequestService';
import {IAsyncData, IItemsList} from 'Libraries/Core/Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {IOrderRequestContext, IOrderRequestModule, IOrderRequestView} from '../Models';
import {OrderRequestsList} from '../Components/OrderRequestsList';
import {SyncLoader} from 'react-spinners';
require('../assets/OrderRequest.styl');
require('../assets/nls/ru/OrderRequest.json');

interface IOwnProps {
    context: IOrderRequestContext;
}

interface IDispatchProps {
    actions: OrderRequestActions;
}

interface IStateProps {
    list: IAsyncData<IItemsList<IOrderRequestView>>;
}

type TProps = IOwnProps & IDispatchProps & IStateProps;

class OrdersRequestsListPage extends React.Component<TProps, {}> {

    componentWillMount() {
        this.props.actions.list();
    }

    render() {
        const {list, actions} = this.props;
        return (list.status === ELoadingStatus.SUCCESS) ?
            <OrderRequestsList actions={actions} list={list.data}/> :
            <SyncLoader className="spinner" loading/>
    }
}

const mapDispatchToProps = (dispatch: Dispatch<IOrderRequestModule>, {context}: IOwnProps) => ({
    actions: new OrderRequestActions(OrderRequestService, context.orderRequest, dispatch)
});

const mapStateToProps = (state: IOrderRequestModule) => {
    return {
        list: state.orderRequest.list
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersRequestsListPage);