import {IBackendConfig} from 'Libraries/Core/Models';

export interface IMessageToken {
    token: string;
}

export interface IPushMessage {
    data: {
        type: string;
        [key:string]:any;
    }
}

export interface IMessagingService {
    setToken(messageToken:IMessageToken): Promise<{}>;
}

export interface IMessagingActions {
    setToken(token:string): void;
    processPushMessage(message: IPushMessage): void;
}

export interface IMessagingContext {
    messaging: IBackendConfig;
}
