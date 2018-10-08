import {IAsyncData, IBackendConfig, IItemsList} from 'Libraries/Core/Models';

/**
 * Элемент справочника.
 */
export interface IDictionaryItem {
    id: string;
    name: string;
}

// Модель словаря района
export interface IDistrict extends IDictionaryItem {
}

// Модель операций
export interface IOperation extends IDictionaryItem {
}

export interface IDictionaryService {
    getOperations(): Promise<IItemsList<IOperation>>;
    getDistricts(): Promise<IItemsList<IDistrict>>;
}

export interface IDictionaryContext {
    dictionary: IBackendConfig;
}

export interface IDictionaryReduxState {
    districts: IAsyncData<IItemsList<IDistrict>>;
    operations: IAsyncData<IItemsList<IOperation>>;
}

export interface IDictionaryModule {
    dictionary: IDictionaryReduxState
}