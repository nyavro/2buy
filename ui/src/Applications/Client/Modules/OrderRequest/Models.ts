import {IAsyncData, IBackendConfig, IItemsList} from 'Libraries/Core/Models';
import {EDayPeriod} from 'Libraries/Core/Enums';
import {ICar} from 'Libraries/Core/Modules/Car/Models';
import {IRedirectActions} from 'Libraries/Core/Actions/LoginRedirectActions';

export interface IOrderRequestView {
    id: string;
    date: string;
    car: ICar;
    dayPeriod: EDayPeriod;
    district: string;
    operationIds: string[];
    status: string;
    orderId?: string;
}

export interface IOrderRequest {
    carId: string;
    dayPeriod: EDayPeriod;
    districtId: string;
    operationIds: string[];
    date: string;
    orderId?: string;
}

export interface IOrderRequestAccept {
    orderId: string;
    orderRequestId: string;
}

export interface IOrderRequestService {
    list(): Promise<IItemsList<IOrderRequestView>>;
    getById(id: string): Promise<IOrderRequest>;
    create(order:IOrderRequest): Promise<IOrderRequest>;
    cancel(id: string): Promise<IOrderRequest>;
}

export interface IOrderRequestActions extends IRedirectActions {
    list(): void;
    getById(id: string): void;
    create(order:IOrderRequest): void;
    cancel(id: string): void;
}

export interface IOrderRequestReduxState {
    currentDocument: IAsyncData<IOrderRequest>;
    list: IAsyncData<IItemsList<IOrderRequestView>>;
}

export interface IOrderRequestContext {
    orderRequest: IBackendConfig;
}

/**
 * Интерфейс модуля 'Оформление заказа'.
 *
 * @prop {IOrderReduxState} [order] Модуль стейта 'Заказ'.
 */
export interface IOrderRequestModule {
    orderRequest?: IOrderRequestReduxState;
}