import {IProductReduxState, IProductView} from '../Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {IAsyncData, IFSAAction} from 'Libraries/Core/Models';
import {CREATE_PRODUCT, LIST_PRODUCTS} from '../Actions/ActionTypes';
import {createParticle, EActionState} from 'Libraries/Core/Utils/ReduxUtils';

export const initialState = (): IProductReduxState => {
    return {
        products: {data: undefined, status: ELoadingStatus.IDLE, error: undefined}
    }
};

export const productReducer = (prevState: IProductReduxState = initialState(), action: IFSAAction<any>): IProductReduxState => ({
    products: createParticle<Array<IProductView>>(
        LIST_PRODUCTS,
        prevState.products,
        action,
        (action: IFSAAction<IProductView>, prevState: IAsyncData<Array<IProductView>>) => {
            if (action.type===(CREATE_PRODUCT + EActionState.SUCCESS) && prevState.data) {
                return {...prevState, data: [...prevState.data, action.payload]};
            }
            return prevState;
        }
    )
});