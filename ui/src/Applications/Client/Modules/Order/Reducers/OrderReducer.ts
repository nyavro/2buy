import {IOrder, IOrderReduxState, IOrderView} from '../Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {IFSAAction, IItemsList} from 'Libraries/Core/Models';
import {
    LIST_ORDER, LOAD_ORDER
} from '../Actions/ActionTypes';
import {createParticle} from 'Libraries/Core/Utils/ReduxUtils';

export const initialState = (): IOrderReduxState => {
    return {
        list: {data: undefined, status: ELoadingStatus.IDLE, error: undefined},
        currentOrder: {data: undefined, status: ELoadingStatus.IDLE, error: undefined}
    }
};

export const orderReducer = (prevState: IOrderReduxState = initialState(), action: IFSAAction<any>): IOrderReduxState => ({
    currentOrder: createParticle<IOrder>(
        LOAD_ORDER,
        prevState.currentOrder,
        action
    ),
    list: createParticle<IItemsList<IOrderView>>(
        LIST_ORDER,
        prevState.list,
        action
    )
});