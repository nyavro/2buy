import {LIST_ORDER, LOAD_ORDER} from './ActionTypes';
import {LoginRedirectActions} from 'Libraries/Core/Actions';
import {
    IOrder,
    IOrderActions,
    IOrderReduxState,
    IOrderService
} from '../Models';
import {asyncDispatch} from 'Libraries/Core/Utils/ReduxUtils';
import {IItemsList} from 'Libraries/Core/Models';

export class OrderActions extends LoginRedirectActions<IOrderService, IOrderReduxState> implements IOrderActions {

    getById(id: string) {
        return asyncDispatch<IOrder, IOrderReduxState>(
            this.dispatch,
            LOAD_ORDER,
            () => this.service.getById(id)
        );
    }

    list() {
        return asyncDispatch<IItemsList<IOrder>, IOrderReduxState>(
            this.dispatch,
            LIST_ORDER,
            () => this.service.list()
        );
    }
}