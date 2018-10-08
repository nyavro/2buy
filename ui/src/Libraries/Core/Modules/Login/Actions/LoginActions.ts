import {Dispatch} from 'redux';
import {LOGIN_REQUEST, LOGOUT_ACTION} from './ActionTypes';
import {IAuth, ICredentials, ILoginActions, ILoginReduxState, ILoginService} from '../Models';
import {asyncDispatch} from 'Libraries/Core/Utils/ReduxUtils';
import {createAction} from 'redux-actions';

export class LoginActions implements ILoginActions {
    constructor (private service: ILoginService, private dispatch: Dispatch<{}>) {}

    login (credentials:ICredentials, onLogin: (auth:IAuth) => void) {
        return asyncDispatch<IAuth, ILoginReduxState>(
            this.dispatch,
            LOGIN_REQUEST,
            () => this.service.login(credentials).then(
                (auth: IAuth) => {
                    onLogin(auth);
                    return auth;
                }
            )
        );
    }

    logout (onLogout: () => void) {
        this.dispatch(createAction(LOGOUT_ACTION)());
        onLogout();
    }
}