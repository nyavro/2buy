import {
    CREATE_GROUP_ORDER,
    LIST_GROUP_ORDERS,
    MODIFY_GROUP_ORDER, ORDER_DONE
} from './ActionTypes';
import {LoginRedirectActions} from 'Libraries/Core/Actions';
import {asyncDispatch} from 'Libraries/Core/Utils/ReduxUtils';
import {IPaginatedItems, IPagination} from 'Libraries/Core/Models';
import {IOrderActions, IOrderModified, IOrderReduxState, IOrderService, IOrderView} from "../Models";

export class OrderActions extends LoginRedirectActions<IOrderService, IOrderReduxState> implements IOrderActions {

    modify(orderId: string, groupId: string, count: number, version: number, comment?: string) {
        return asyncDispatch<IOrderModified, IOrderReduxState>(
            this.dispatch,
            MODIFY_GROUP_ORDER,
            () => this.service.modify(orderId, groupId, count, version, comment)
        );
    }

    create(productId: string, count: number, groupId: string, comment?: string) {
        return asyncDispatch<string, IOrderReduxState>(
            this.dispatch,
            CREATE_GROUP_ORDER,
            () => this.service.create(productId, count, groupId, comment)
        );
    }

    reject(orderId: string, groupId: string, version: number, comment?: string) {
        return asyncDispatch<IOrderModified, IOrderReduxState>(
            this.dispatch,
            ORDER_DONE,
            () => this.service.reject(orderId, groupId, version, comment)
        );
    }

    close(orderId: string, groupId: string, version: number, comment?: string) {
        return asyncDispatch<IOrderModified, IOrderReduxState>(
            this.dispatch,
            ORDER_DONE,
            () => this.service.close(orderId, groupId, version, comment)
        );
    }

    list(groupId: string, pagination: IPagination) {
        return asyncDispatch<IPaginatedItems<IOrderView>, IOrderReduxState>(
            this.dispatch,
            LIST_GROUP_ORDERS,
            () => this.service.list(groupId, pagination)
        );
    }
}