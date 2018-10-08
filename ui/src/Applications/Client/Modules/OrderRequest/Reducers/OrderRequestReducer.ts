import {IOrderRequest, IOrderRequestAccept, IOrderRequestReduxState, IOrderRequestView} from '../Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {IAsyncData, IFSAAction, IItemsList} from 'Libraries/Core/Models';
import {LIST_ORDER_REQUEST, LOAD_ORDER_REQUEST, ORDER_CREATED_EXT} from '../Actions/ActionTypes';
import {createParticle} from 'Libraries/Core/Utils/ReduxUtils';

export const initialState = (): IOrderRequestReduxState => {
    return {
        list: {data: undefined, status: ELoadingStatus.IDLE, error: undefined},
        currentDocument: {data: undefined, status: ELoadingStatus.IDLE, error: undefined}
    }
};

export const orderRequestReducer = (prevState: IOrderRequestReduxState = initialState(), action: IFSAAction<any>): IOrderRequestReduxState => ({
    currentDocument: createParticle<IOrderRequest>(
        LOAD_ORDER_REQUEST,
        prevState.currentDocument,
        action
    ),
    list: createParticle<IItemsList<IOrderRequestView>>(
        LIST_ORDER_REQUEST,
        prevState.list,
        action,
        (action: IFSAAction<IOrderRequestAccept>, prevState: IAsyncData<IItemsList<IOrderRequestView>>) => {
            if (action.type===ORDER_CREATED_EXT && prevState.data) {
                const newList = prevState.data.content.map((orderRequest) => {
                    console.log('Checking ids');
                    if(orderRequest.id==action.payload.orderRequestId) {
                        console.log('Patching', JSON.stringify(action.payload) + JSON.stringify(orderRequest));
                        return {...orderRequest, orderId: action.payload.orderId};
                    }
                    else {
                        return orderRequest;
                    }
                });
                return {...prevState, data: {...prevState.data, content: newList}};
            }
            return prevState;
        }
    )
});