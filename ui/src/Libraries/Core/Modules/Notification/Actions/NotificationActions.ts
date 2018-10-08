import {Dispatch} from 'redux';
import {ADD, REMOVE} from './ActionTypes';
import {INotification, INotificationActions, INotificationReduxState} from '../Models';
import {Notification} from 'react-notification-system';
import {syncDispatch} from 'Libraries/Core/Utils/ReduxUtils';

const TIME_COMPONENT = 1000000;

export const DEFAULT_TIMEOUT = 5000;

export class NotificationActions implements INotificationActions {
    constructor (private dispatch: Dispatch<{}>) {}

    private count: number = 0;

    generateId = () => (((new Date()).getTime() % TIME_COMPONENT) + (this.count++)*TIME_COMPONENT);

    createNotification(notification: Notification) {
        return syncDispatch<INotification, INotificationReduxState>(
            this.dispatch,
            ADD,
            {...notification, localId: this.generateId()}
        );
    }

    removeNotification(localId: number) {
        return syncDispatch<number, INotificationReduxState>(
            this.dispatch,
            REMOVE,
            localId
        );
    }
}