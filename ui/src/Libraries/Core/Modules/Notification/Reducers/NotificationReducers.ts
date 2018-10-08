import {filter} from 'lodash';
import {handleActions} from 'redux-actions';
import {ADD, REMOVE} from '../Actions/ActionTypes';
import {IFSAAction} from '../../../Models';
import {INotification, INotificationReduxState} from '../Models';

export const initialState = (): INotificationReduxState => {
    return {
        list: []
    };
};

export const notificationReducer = handleActions<INotificationReduxState, any>({
    [REMOVE]: (state: INotificationReduxState, action: IFSAAction<number>) => (
        {...state, list: filter(state.list,   ({localId}) => localId !== action.payload)}
    ),
    [ADD]: (state: INotificationReduxState, action: IFSAAction<INotification>) => (
        {...state, list: state.list.concat(action.payload)}
    ),
}, initialState());