import {LIST_ORDER_REQUEST, LOAD_ORDER_REQUEST, ORDER_CREATED_EXT} from './ActionTypes';
import {LoginRedirectActions} from 'Libraries/Core/Actions';
import {asyncDispatch} from 'Libraries/Core/Utils/ReduxUtils';
import {
    IOrderRequestReduxState,
    IOrderRequest,
    IOrderRequestActions,
    IOrderRequestService, IOrderRequestView
} from '../Models';
import {IItemsList} from 'Libraries/Core/Models';

export class OrderRequestActions extends LoginRedirectActions<IOrderRequestService, IOrderRequestReduxState> implements IOrderRequestActions {

    getById(id: string) {
        return asyncDispatch<IOrderRequest, IOrderRequestReduxState>(
            this.dispatch,
            LOAD_ORDER_REQUEST,
            () => this.service.getById(id)
        );
    }

    create(clientRequest:IOrderRequest) {
        return asyncDispatch<IOrderRequest, IOrderRequestReduxState>(
            this.dispatch,
            LOAD_ORDER_REQUEST,
            () => this.service.create(clientRequest)
        );
    }

    list() {
        return asyncDispatch<IItemsList<IOrderRequestView>, IOrderRequestReduxState>(
            this.dispatch,
            LIST_ORDER_REQUEST,
            () => this.service.list()
        );
    }

    cancel(id: string) {
        return asyncDispatch<IOrderRequest, IOrderRequestReduxState>(
            this.dispatch,
            LOAD_ORDER_REQUEST,
            () => this.service.cancel(id)
        );
    }
}