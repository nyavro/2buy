import {ELoadingStatus, EOperationError} from './Enums';
import {i18n} from 'i18next';

export interface IFSAAction<P> {
    type: string;
    payload?: P;
    error?: boolean;
    meta?: any;
}

export interface IAsyncData<P> {
    data?: P;
    status?: ELoadingStatus;
    error?: string;
}

export interface ISort {
    ascending: boolean;
    ignoreCase: boolean;
    property: string;
}

export interface IPagination {
    count?: number;
    offset?: number;
    hasNextPage?: boolean;
}

export interface IPaginatedItems<T> extends IPagination {
    items: T[];
}

export interface IItemsList<P> extends IPagination {
    content: P[];
}

export interface IAction {
    title: string;
    handler: () => void;
    enabled: boolean;
    className?: string;
}

export interface IMixedProps {
    i18n: i18n;
}

export interface IBackendConfig {
    backend: string;
    errorsRoute: string;
}

export interface IErrorsHandler {
    onError: (error:IError) => void;
}

export interface IError {
    operationError: EOperationError;
    message?: string;
}
