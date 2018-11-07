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
    status: EOrderStatus;
    version: number;
}

export interface IOrderService {
    modify(orderId: string, groupId: string, count: number, version: number, comment?: string): Promise<IOrderModified>;
    create(productId: string, count: number, groupId: string, comment?: string): Promise<IOrderView>;
    reject(orderId: string, groupId: string, version: number, comment?: string): Promise<IOrderModified>;
    close(orderId: string, groupId: string, version: number, comment?: string): Promise<IOrderModified>;
    list(groupId: string, pagination: IPagination): Promise<IPaginatedItems<IOrderView>>;
}

export interface IOrderActions {
    modify(orderId: string, groupId: string, count: number, version: number, comment?: string): void;
    create(productId: string, count: number, groupId: string, comment?: string): void;
    reject(orderId: string, groupId: string, version: number, comment?: string): void;
    close(orderId: string, groupId: string, version: number, comment?: string): void;
    list(groupId: string, pagination: IPagination): void;
}

export interface IOrderReduxState {
    currentOrders: IAsyncData<IPaginatedItems<IOrderView>>;
}

export interface IOrderContext {
    config: IBackendConfig;
}

export interface IOrderModule {
    order?: IOrderReduxState;
}