import * as React from 'react';
import {isEmpty} from 'lodash';
import {translate} from 'react-i18next/';
import {IOrderRequestActions, IOrderRequestView} from '../Models';
import {IItemsList, IMixedProps} from 'Libraries/Core/Models';
import {ROUTES} from 'Applications/Client/RouterConsts';
import {OrderRequestListItem} from './OrderRequestListItem';
import {EmptyList} from 'Libraries/Components/EmptyList';

interface IProps extends IMixedProps {
    actions: IOrderRequestActions;
    list: IItemsList<IOrderRequestView>;
}

interface IState {
    activeOrderRequestId?: string;
}

class OrderRequestsListComponent extends React.Component<IProps, IState> {

    state: IState = {
        activeOrderRequestId: null
    };

    handleViewOrder = (orderId: string) => () => {
        this.props.actions.redirect(ROUTES.ORDER.DETAILS, {orderId: orderId});
    };

    handleCancel = (orderRequestId: string) => () => {
        this.props.actions.cancel(orderRequestId);
    };

    render() {
        const {i18n, list: {content}} = this.props;
        return isEmpty(content) ?
            <EmptyList message={i18n.t('OrderRequest:List.empty')}/> :
            <div className="orderRequestsList">
                {content.map((item: IOrderRequestView, index) =>
                    <OrderRequestListItem item={item} i18n={i18n} onCancel={this.handleCancel} onViewOrder={this.handleViewOrder} key={index}/>)
                }
            </div>;
    }
}

export const OrderRequestsList = translate('OrderRequest')(OrderRequestsListComponent);