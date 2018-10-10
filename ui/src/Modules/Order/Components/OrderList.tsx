import {isEmpty, memoize} from 'lodash';
import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {IAsyncData, IPaginatedItems} from 'Libraries/Core/Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {IOrderContext, IOrderModule, IOrderView} from '../Models';
import {SyncLoader} from 'react-spinners';
import {convert, serverFormatFull, timeFormatShort} from 'Libraries/Core/Utils/DateUtils';
import {OrderService} from '../Services/OrderService';
import {OrderActions} from '../Actions/OrderActions';

require('../assets/Order.styl');
require('../assets/nls/ru/Order.json');

interface IOwnProps {
    context: IOrderContext;
    groupId?: string;
}

interface IDispatchProps {
    actions: OrderActions;
}

interface IStateProps {
    list: IAsyncData<IPaginatedItems<IOrderView>>;
}

type TProps = IOwnProps & IDispatchProps & IStateProps;

class OrderListPage extends React.Component<TProps, {}> {

    componentWillMount() {
        this.update(this.props.groupId);
    }

    componentWillReceiveProps(props: TProps) {
        if(props.groupId !== this.props.groupId) {
            this.update(props.groupId);
        }
    }

    update = (groupId?: string) => {
        const {list, actions} = this.props;
        if (groupId && isEmpty(list.data)) {
            console.log("Getting orders");
            actions.list(groupId, {count: 12, offset: 0, hasNextPage: false});
        }
    };

    handleOrderSelect = memoize((id: string, version: number) => () => {
        console.log(id + ":" + version);
    }, (id: string, version: number) => id + "_" + version);

    renderOrder = ({id, product, count, comment, status, version}: IOrderView, index: number) => {
        return (
            <div key={index} className="order-item">
                <div className="order-caption" onClick={this.handleOrderSelect(id, version)}>
                    {product.name}
                </div>
                <div className="order">
                    {count}
                </div>
                <div className="comment">
                    {comment}
                </div>
                <div  className="status">
                    {status}
                </div>
            </div>
        );
    };

    renderOrders = () => {
        const {list} = this.props;
        return (list && list.data && list.data.items || []).map(
            (group, index) => this.renderOrder(group, index)
        );
    };

    render() {
        const {list, groupId} = this.props;
        return (list.status === ELoadingStatus.SUCCESS) ?
            <div>{this.renderOrders()}</div> :
            (groupId ? <SyncLoader className="spinner" loading/> : <div/>)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<IOrderModule>, {context}: IOwnProps) => ({
    actions: new OrderActions(OrderService, context.order, dispatch)
});

const mapStateToProps = (state: IOrderModule) => {
    return {
        list: state.order.currentOrders
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderListPage);