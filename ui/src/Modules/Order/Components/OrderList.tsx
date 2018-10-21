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
import {Motion, spring} from "react-motion";
import {ISwippableProps, swipable} from 'Modules/Order/Components/SwipableHOC';
import {OrderItem} from 'Modules/Order/Components/OrderItem';

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
    // onMouseDown: (arg: any, arg1: any, arg2: any) => void;
}


//
// const SortableList = SortableContainer(({items}: IPaginatedItems<IOrderView>) => {
//     return (<div>
//         <div className="orders-panel-row">
//             {items.map((value, index) => (
//                 <SortableItem key={`item-${index}`} index={index} value={value}/>
//             ))}
//             <Right key="item-1" index={1} value={0}/>
//         </div>
//     </div>);
// });

interface IState {
    isPressed: boolean;
    swipingItemIndex: number;
    x0: number;
    dx: number;
    swipeRight: boolean;
    swipeLeft: boolean;
}

const springConfig = {stiffness: 300, damping: 50};

class OrderListPage extends React.Component<TProps, IState> {

    minD = 150;

    state: IState = {
        isPressed: false,
        swipingItemIndex: 0,
        x0: 0,
        dx: 0,
        swipeRight: false,
        swipeLeft: false
    };

    componentWillMount() {
        this.update(this.props.groupId);
    }

    componentDidMount() {
        window.addEventListener('touchmove', this.handleTouchMove);
        window.addEventListener('touchend', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    };

    handleTouchMove = (e: any) => {
        e.preventDefault();
        this.handleMouseMove(e.touches[0]);
    };

    handleMouseUp = () => {
        this.setState({isPressed: false, dx: 0, swipeRight: false, swipeLeft: false});
    };

    handleMouseMove = ({pageX}: {pageX: number}) => {
        const {isPressed, x0} = this.state;
        if (isPressed) {
            const dx = pageX - x0;
            let swipeRight = false;
            let swipeLeft = false;
            if(Math.abs(dx) > this.minD) {
                if(dx > 0) {
                    swipeRight = true;
                    console.log('swipe right');
                } else {
                    swipeLeft = true;
                    console.log('swipe left');
                }
            }
            this.setState({dx: dx, swipeRight: swipeRight, swipeLeft: swipeLeft});
        }
    };

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

    handleSwipeRight = () => {
        console.log('right');
    };

    handleSwipeLeft = () => {
        console.log('right');
    };

    SwipableItem = swipable<IItemProps>(({...props}: IItemProps) => <OrderItem {...props}/>);

    render() {
        const {list, groupId} = this.props;
        const {isPressed, swipingItemIndex, dx, swipeRight} = this.state;
        return (list.status === ELoadingStatus.SUCCESS) ?
            <div className="order-list">
                {(list && list.data && list.data.items || []).map(
                    (item, i) => {
                        const style = swipingItemIndex === i && isPressed ?
                            {
                                scale: spring(1.05, springConfig),
                                shadow: spring(16, springConfig),
                                x: dx,
                                bg: swipeRight ? 0 : 255
                            }
                            : {
                                scale: spring(1, springConfig),
                                shadow: spring(1, springConfig),
                                x: 0,//spring(topDeltaX, springConfig),
                                bg: 255
                            };
                        //
                        //
                        return (
                            <Motion style={style} key={i}>
                                {({scale, shadow, x, bg}) =>
                                    <this.SwipableItem
                                        item={item}
                                        onSwipeRight={this.handleSwipeRight}
                                        onSwipeLeft={this.handleSwipeLeft}
                                        onMouseDown={this.handleMouseDown.bind(null, i, x)}
                                        onTouchStart={this.handleTouchStart.bind(null, i, x)}
                                        className="demo8-item"
                                        style={{
                                            boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                                            transform: `translate3d(${x}px, 0, 0) scale(${scale})`,
                                            backgroundColor: `rgba(${bg}, 255, ${bg}, 1)`,
                                            WebkitTransform: `translate3d(${x}px, 0, 0) scale(${scale})`,
                                            zIndex: i === swipingItemIndex ? 99 : i,
                                        }}
                                    >
                                        {item.product.name}
                                    </this.SwipableItem>
                                }
                            </Motion>
                        );
                    }
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