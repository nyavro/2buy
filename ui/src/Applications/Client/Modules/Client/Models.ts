import {IAsyncData, IBackendConfig} from 'Libraries/Core/Models';
import {ICar} from 'Libraries/Core/Modules/Car/Models';

export interface IClient {
    id: string;
    firstName: string;
    lastName: string;
    middleName: string;
    phone1: string;
    phone2: string;
    phone3: string;
}

export interface IClientService {
    getCurrent(): Promise<IClient>;
    create(client:IClient): Promise<IClient>;
    update(client:IClient): Promise<IClient>;
}

export interface IClientActions {
    getCurrent(): void;
    create(client:IClient): void;
    update(client:IClient): void;
}

export interface IClientReduxState {
    currentClient: IAsyncData<IClient>;
}

export interface IClientContext {
    client: IBackendConfig;
}

/**
 * Интерфейс модуля 'Клиент'.
 *
 * @prop {IClientReduxState} [client] Модуль стейта 'Клиент'.
 */
export interface IClientModule {
    client?: IClientReduxState;
}