import {Notification} from 'react-notification-system';

export interface INotification extends Notification {
    localId: number;
}

export interface INotificationActions {
    createNotification(notification: Notification): void;
    removeNotification(localId: number): void;
}

export interface INotificationReduxState {
    list: INotification[];
}

/**
 * Интерфейс модуля 'Уведомления'.
 *
 * @prop {INotificationReduxState} [notifications] Модуль стейта 'Уведомления'.
 */
export interface INotificationModule {
    notification: INotificationReduxState;
}