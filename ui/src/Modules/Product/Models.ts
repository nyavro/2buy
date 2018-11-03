import {IAsyncData, IBackendConfig} from 'Libraries/Core/Models';

export interface IProductView {
    id: string;
    name: string;
}

export interface IProductService {
    create(name: string): Promise<IProductView>;
    list(): Promise<Array<IProductView>>;
}

export interface IProductActions {
    create(name: string): void;
    list(): void;
}

export interface IProductReduxState {
    products: IAsyncData<Array<IProductView>>;
}

export interface IProductContext {
    config: IBackendConfig;
}

export interface IProductModule {
    product?: IProductReduxState;
}