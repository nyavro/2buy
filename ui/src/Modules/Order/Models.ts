import {IAsyncData, IBackendConfig, IPaginatedItems, IPagination} from 'Libraries/Core/Models';
import * as React from 'react';

export enum EOrderStatus {
    OPENED = "OPENED",
    REJECTED = "REJECTED",
    CLOSED = "CLOSED"
}

export interface IProduct {
    id: string;
    name: string;
}

export interface IOrderView {
    id: string;
    product: IProduct,
    count: number,
    comment?: string,
    status: EOrderStatus,
    version: number
}

export interface IOrderModified {
    orderId: string;
    groupId: string;
}

export interface IOrderService {
    modify(orderId: string, groupId: string, count: number, version: number, comment?: string): Promise<IOrderModified>;
    create(productIds: string[], groupId: string, comment?: string): Promise<string>;
    reject(orderId: string, groupId: string, version: number, comment?: string): Promise<IOrderModified>;
    list(groupId: string, pagination: IPagination): Promise<IPaginatedItems<IOrderView>>;
}

export interface IOrderActions {
    modify(orderId: string, groupId: string, count: number, version: number, comment?: string): void;
    create(productIds: string[], groupId: string, comment?: string): void;
    reject(orderId: string, groupId: string, version: number, comment?: string): void;
    list(groupId: string, pagination: IPagination): void;
}

export interface IOrderReduxState {
    currentOrders: IAsyncData<IPaginatedItems<IOrderView>>;
}

export interface IOrderContext {
    order: IBackendConfig;
}

export interface IOrderModule {
    order?: IOrderReduxState;
}

export interface ISwipableContext {
    isPressed: boolean,
    onMouseDown: (x: number, y: number) => void;
    x0: number;
    x: number;
}

const defaultContext: ISwipableContext = {
    isPressed: false,
    onMouseDown: (x: number, y: number) => console.log(x + ' ' + y),
    x0: 0,
    x: 0
};

export const SwipableContext = React.createContext<ISwipableContext>(defaultContext);