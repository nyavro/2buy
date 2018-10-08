import * as React from "react";
import {LoginForm} from '../Components/LoginForm';
import {IAsyncData} from 'Libraries/Core/Models';
import {LoginActions} from "../Actions/LoginActions";
import {Dispatch} from "redux";
import {LoginService} from "../Services/LoginService";
import {IAuth, ILoginContext, ILoginModule} from '../Models';
import {connect} from 'react-redux';
require('../assets/styles/Login.styl');
require('../assets/nls/ru/Login.json');

/**
 * @prop {(auth:IAuth)=>{}} onLogin Колбек после успешного логина.
 * @prop {()=>{}} onLogout Колбек после логаута.
 */
interface IOwnProps {
    onLogin: (auth:IAuth) => void;
    onLogout: () => void;
    context: ILoginContext;
}

interface IDispatchProps {
    actions: LoginActions;
}

interface IStateProps {
    userInfoRequest: IAsyncData<IAuth>;
}

type TProps = IOwnProps & IDispatchProps & IStateProps;

class LoginPage extends React.Component<TProps, {}> {

    render() {
        return <div className="loginPage">
            <LoginForm {...this.props}/>
        </div>;
    }
}

const mapDispatchToProps = (dispatch: Dispatch<{}>, {context}: IOwnProps) => ({
    actions: new LoginActions(new LoginService(context), dispatch)
});

const mapStateToProps = (state: ILoginModule) => ({userInfoRequest: state.auth.userInfo});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);