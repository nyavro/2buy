import {memoize} from 'lodash';
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
import {SortableElement} from 'react-sortable-hoc';
import {OrderItem} from 'Modules/Order/Components/OrderItem';
import {Swipable} from 'Libraries/Components/Swipable/Swipable';
import {SwipableContainer} from 'Libraries/Components/Swipable/SwipableContainer';
import {ESwipeDirection} from "../../../Libraries/Components/Swipable/Models";
import {CSSProperties} from "react";

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

interface IItemProps {
    item: IOrderView;
    className: string;
    style: {};
    onMouseDown: (a: any) => void;
    onTouchStart: (a: any) => void;
}

interface IState {
}



class OrderListPage extends React.Component<TProps, IState> {

    minD = 150;

    state: IState = {
    };

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

    handleMouseDown = (pos: number, _: number, {pageX}: {pageX: number}) => {
        console.log(pageX);
        this.setState({
            isPressed: true,
            swipingItemIndex: pos,
            x0: pageX
        });
    };

    handleTouchStart = (key: number, pressLocation: number, e: {touches: [{pageX: number}]}) => {
        this.handleMouseDown(key, pressLocation, e.touches[0]);
    };

    handleSwipeStart = memoize((id) => (direction: ESwipeDirection) => {
        (direction === ESwipeDirection.LEFT) ? console.log('left ' + id) : console.log('right ' + id);
    });

    orderHash = (id: string, version: string) => id + "." + version;

    handleSwipeEnd = memoize((id, version) => (direction: ESwipeDirection) => {
        if (direction === ESwipeDirection.LEFT) {
            console.log('left done' + id);
        } else {
            if (direction === ESwipeDirection.RIGHT) {
                const {actions, groupId} = this.props;
                actions.close(id, groupId, version);
            }
            else {
                console.log('cancelled' + id);
            }
        }
    }, this.orderHash);

    render() {
        const {list, groupId} = this.props;
        const rightStyle: CSSProperties = {
            backgroundColor: "green"
        };
        return (list.status === ELoadingStatus.SUCCESS) ?
            <SwipableContainer className="order-list">
                {(list && list.data && list.data.items || []).map(
                    (item, i) => {
                        return (
                            <Swipable onSwipeStart={this.handleSwipeStart(item.id)}
                                      onSwipeEnd={this.handleSwipeEnd(item.id, item.version)}
                                      rightStyle={rightStyle}
                                      key={i}>
                                <OrderItem item={item}/>
                            </Swipable>
                        );
                    }
                )}
            </SwipableContainer> :
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