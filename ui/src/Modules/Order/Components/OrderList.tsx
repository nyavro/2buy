import {isEmpty, memoize} from 'lodash';
import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {IAsyncData, IPaginatedItems} from 'Libraries/Core/Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {EOrderStatus, IOrderContext, IOrderModule, IOrderView} from '../Models';
import {SyncLoader} from 'react-spinners';
import {OrderService} from '../Services/OrderService';
import {OrderActions} from '../Actions/OrderActions';
import {Button, Col, Row} from "reactstrap";
import {
    MdCheckBox, MdCheckBoxOutlineBlank, MdComment, MdDashboard, MdExitToApp,
    MdIndeterminateCheckBox
} from 'react-icons/md';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';

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

const Right = SortableElement((_) =>
    (<div className="right-catcher"/>)
);

const SortableItem = SortableElement(({value}) =>
    {
        const {id, version, product, count, comment, status} = value;
        let Icon = MdCheckBoxOutlineBlank;
        switch(status) {
            case EOrderStatus.CLOSED:
                Icon = MdCheckBox;
                break;
            case EOrderStatus.REJECTED:
                Icon = MdIndeterminateCheckBox;
        }
        return (
            <Row className="order-item">
                <Col className="order-caption">
                    {product.name}
                </Col>
                <Col className="order" lg={1}>
                    {count > 1 ? count : ''}
                </Col>
                <Col className="comment" lg={1}>
                    {comment && <MdComment/>}
                </Col>
                <Col className="status" lg={1}>
                    <Icon/>
                </Col>
            </Row>
        );
    }
);

const SortableList = SortableContainer(({items}: IPaginatedItems<IOrderView>) => {
    return (<div>
        <div className="orders-panel-row">
            {items.map((value, index) => (
                <SortableItem key={`item-${index}`} index={index} value={value}/>
            ))}
            <Right key="item-1" index={1} value={0}/>
        </div>
    </div>);
});

class OrderListPage extends React.Component<TProps, {}> {

    componentWillMount() {
        this.update(this.props.groupId);
    }

    componentWillReceiveProps(props: TProps) {
        if(props.groupId !== this.props.groupId) {
            this.update(props.groupId);
        }
    }

    onSortEnd = (v: any) => {
        const {oldIndex, newIndex} = v;
        console.log('Old: ' + oldIndex + ' New: ' + newIndex);
    };

    update = (groupId?: string) => {
        const {list, actions} = this.props;
        console.log("OrderList set groupId: " + groupId);
        if (groupId) {
            console.log("Getting orders");
            actions.list(groupId, {count: 12, offset: 0, hasNextPage: false});
        }
    };

    handleOrderSelect = memoize((id: string, version: number) => () => {
        console.log(id + ":" + version);
    }, (id: string, version: number) => id + "_" + version);

    handleRefresh = () => {
        this.update(this.props.groupId);
    };

    render() {
        const {list, groupId} = this.props;
        return (list.status === ELoadingStatus.SUCCESS) ?
            <div className="order-list">
                {(list && list.data && list.data.items || []).map(
                    (item) => <SortableList lockAxis="x" axis="x" items={[item]} onSortEnd={this.onSortEnd}/>
                )}
                <Button onClick={this.handleRefresh}>Refresh</Button>
            </div> :
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