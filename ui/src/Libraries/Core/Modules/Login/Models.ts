import {IAsyncData, IBackendConfig} from 'Libraries/Core/Models';

export enum ERole {
    ROLE_CLIENT = 'ROLE_CLIENT',
    ROLE_PROVIDER = 'ROLE_PROVIDER',
    ROLE_ADMIN = 'ROLE_ADMIN',
    ROLE_MANAGER = 'ROLE_MANAGER'
}

export interface ICredentials {
    password: string;
    login: string;
}

export interface IAuth {
    roles: ERole[];
    token: string;
    login: string;
    userId: string;
}

export interface ILoginService {
    login(credentials:ICredentials): Promise<IAuth>;
}

export interface ILoginActions {
    login(credentials:ICredentials, onLogin: (auth:IAuth) => void): void;
    logout(onLogout: () => void): void;
}

export interface ILoginReduxState {
    userInfo: IAsyncData<IAuth>;
}

export interface ILoginContext {
    config: IBackendConfig;
}

/**
 * Интерфейс модуля 'Логин'.
 *
 * @prop {ILoginReduxState} [auth] Модуль стейта 'Логин'.
 */
export interface ILoginModule {
    auth: ILoginReduxState;
}