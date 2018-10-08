import {IAsyncData, IBackendConfig, IItemsList} from 'Libraries/Core/Models';
import {ICar} from 'Libraries/Core/Modules/Car/Models';

export interface IOrderView {
    id: string;
    orderRequestId: string;
    providerName: string;
    providerAddress: string;
    date: string;
    car: ICar;
}

export interface IOrder extends IOrderView {
}

export interface IOrderService {
    list(): Promise<IItemsList<IOrder>>;
    getById(id: string): Promise<IOrder>;
    // update(order:IOrder): Promise<IOrder>;
    // cancel(id: string): Promise<IOrder>;
}

export interface IOrderActions {
    list(): void;
    getById(id: string): void;
    // update(order:IOrder): void;
    // cancel(id: string): void;
}

export interface IOrderReduxState {
    currentOrder: IAsyncData<IOrder>;
    list: IAsyncData<IItemsList<IOrderView>>;
}

export interface IOrderContext {
    order: IBackendConfig;
}

/**
 * Интерфейс модуля 'Заказ'.
 *
 * @prop {IOrderReduxState} [order] Модуль стейта 'Заказ'.
 */
export interface IOrderModule {
    order?: IOrderReduxState;
}