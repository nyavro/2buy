import {IOrderReduxState, IOrderView} from '../Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {IFSAAction, IPaginatedItems} from 'Libraries/Core/Models';
import {LIST_GROUP_ORDERS} from '../Actions/ActionTypes';
import {createParticle} from 'Libraries/Core/Utils/ReduxUtils';

export const initialState = (): IOrderReduxState => {
    return {
        currentOrders: {data: undefined, status: ELoadingStatus.IDLE, error: undefined}
    }
};

export const orderReducer = (prevState: IOrderReduxState = initialState(), action: IFSAAction<any>): IOrderReduxState => ({
    currentOrders: createParticle<IPaginatedItems<IOrderView>>(
        LIST_GROUP_ORDERS,
        prevState.currentOrders,
        action
    )
});