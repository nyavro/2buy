import {
    CREATE_PRODUCT,
    LIST_PRODUCTS,
} from './ActionTypes';
import {LoginRedirectActions} from 'Libraries/Core/Actions';
import {asyncDispatch} from 'Libraries/Core/Utils/ReduxUtils';
import {IProductActions, IProductReduxState, IProductService, IProductView} from '../Models';

export class ProductActions extends LoginRedirectActions<IProductService, IProductReduxState> implements IProductActions {

    create(name: string) {
        return asyncDispatch<IProductView, IProductReduxState>(
            this.dispatch,
            CREATE_PRODUCT,
            () => this.service.create(name)
        );
    }

    list() {
        return asyncDispatch<Array<IProductView>, IProductReduxState>(
            this.dispatch,
            LIST_PRODUCTS,
            () => this.service.list()
        );
    }
}