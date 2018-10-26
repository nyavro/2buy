import {findIndex} from 'lodash';
import {IOrderModified, IOrderReduxState, IOrderView} from '../Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {IAsyncData, IFSAAction, IPaginatedItems} from 'Libraries/Core/Models';
import {LIST_GROUP_ORDERS, ORDER_DONE} from '../Actions/ActionTypes';
import {createParticle, EActionState} from 'Libraries/Core/Utils/ReduxUtils';

export const initialState = (): IOrderReduxState => {
    return {
        currentOrders: {data: undefined, status: ELoadingStatus.IDLE, error: undefined}
    }
};

export const orderReducer = (prevState: IOrderReduxState = initialState(), action: IFSAAction<any>): IOrderReduxState => ({
    currentOrders: createParticle<IPaginatedItems<IOrderView>>(
        LIST_GROUP_ORDERS,
        prevState.currentOrders,
        action,
        (action: IFSAAction<IOrderModified>, prevState: IAsyncData<IPaginatedItems<IOrderView>>) => {
            if (action.type===(ORDER_DONE + EActionState.SUCCESS) && prevState.data) {
                const index = findIndex(prevState.data.items, {id: action.payload.orderId});
                return {
                    ...prevState,
                    data: {
                        ...prevState.data,
                        items: (index === -1) ?
                            prevState.data.items :
                            [...prevState.data.items.slice(0, index), ...prevState.data.items.slice(index + 1)]
                    }
                };
            }
            return prevState;
        }
    )
});