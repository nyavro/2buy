import * as React from 'react';
import {isEmpty} from 'lodash';
import {translate} from 'react-i18next/';
import {IOrderActions, IOrderView} from '../Models';
import {IMixedProps} from 'Libraries/Core/Models';
import {OrderListItem} from './OrderListItem';
import {IItemsList} from 'Libraries/Core/Models';
import {EmptyList} from 'Libraries/Components/EmptyList';

interface IProps extends IMixedProps {
    actions: IOrderActions;
    list: IItemsList<IOrderView>;
}

interface IState {
    activeOrderId?: string;
}

class OrdersListComponent extends React.Component<IProps, IState> {

    state: IState = {
        activeOrderId: null
    };

    render() {
        const {i18n, list: {content}} = this.props;
        return isEmpty(content) ?
            <EmptyList message={i18n.t('Order:List.empty')}/> :
            <div className="orders-list">
                {content.map((item: IOrderView, index) =>
                    <OrderListItem item={item} i18n={i18n} key={index}/>
                )}
            </div>;
    }
}

export const OrdersList = translate('Order')(OrdersListComponent);