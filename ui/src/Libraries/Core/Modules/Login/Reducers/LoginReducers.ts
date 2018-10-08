import {IFSAAction} from 'Libraries/Core/Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {createParticle} from 'Libraries/Core/Utils/ReduxUtils';
import {LOGIN_REQUEST} from '../Actions/ActionTypes';
import {IAuth, ILoginReduxState} from '../Models';

export const initialState = (): ILoginReduxState => (
    {
        userInfo: {
            data: {
                roles: [],
                token: null,
                login: null,
                userId: null
            },
            status: ELoadingStatus.IDLE,
            error: null
        }
    });

export const loginReducer = (prevState: ILoginReduxState = initialState(), action: IFSAAction<IAuth>): ILoginReduxState => ({
    userInfo: createParticle<IAuth>(
        LOGIN_REQUEST,
        prevState.userInfo,
        action
    )
});