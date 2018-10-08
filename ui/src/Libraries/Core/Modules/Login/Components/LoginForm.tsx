import * as React from 'react';
import {IAuth, ICredentials, ILoginActions} from '../Models';
import {IAsyncData, IMixedProps} from '../../../Models';
import {translate} from 'react-i18next';
import {Button, Card, Col, Fade, Form, FormGroup, Input, Label, Row} from 'reactstrap';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {ChangeEvent} from 'react';
import {BarLoader} from 'react-spinners';
const avatar = require('../assets/images/avatar.svg');

interface IProps extends IMixedProps {
    onLogin: (auth:IAuth) => void;
    onLogout: () => void;
    actions: ILoginActions;
    userInfoRequest: IAsyncData<IAuth>;
}

interface IState extends ICredentials {
}

export class LoginFormComponent extends React.Component<IProps, IState> {

    componentDidMount () {
        const {actions, onLogout} = this.props;
        actions.logout(onLogout);
    }

    handleSubmit = () => {
        const credentials = this.state;
        const {actions, onLogin} = this.props;
        actions.login(credentials, onLogin);
    };

    handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({login: event.target.value});
    };

    handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
        this.setState({password: event.target.value});
    };

    render() {
        const {i18n, userInfoRequest} = this.props;
        const isLoading = userInfoRequest.status===ELoadingStatus.LOADING;
        return <Row className="login">
            <Col md={4} lg={3}>
                <Card body>
                    <Form onSubmit={this.handleSubmit}>
                        <div className="text-center">
                            <img
                                src={avatar}
                                className="avatar"
                                alt="logo"
                            />
                        </div>
                        <Fade in={userInfoRequest.status===ELoadingStatus.FAILURE || isLoading}>
                            <div className="status">
                                <div className="barLoader">{userInfoRequest.status===ELoadingStatus.FAILURE ? i18n.t(`Login:Form.Error.${userInfoRequest.error}`) : <BarLoader loading/>}</div>
                            </div>
                        </Fade>
                        <FormGroup>
                            <Label for={i18n.t("Login:Form.Login.label")}>{i18n.t("Login:Form.Login.label")}</Label>
                            <Input type='text' placeholder={i18n.t('Login:Form.Login.placeholder')} onChange={this.handleLoginChange} disabled={isLoading}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for={i18n.t("Login:Form.Password.label")}>{i18n.t("Login:Form.Password.label")}</Label>
                            <Input type='password' placeholder={i18n.t('Login:Form.Password.placeholder')} onChange={this.handlePasswordChange} disabled={isLoading}/>
                        </FormGroup>
                        <hr/>
                        <Button
                            outline
                            color="primary"
                            block
                            disabled={isLoading}
                            onClick={this.handleSubmit}>
                            {i18n.t('Login:Form.Submit.label')}
                        </Button>
                    </Form>
                </Card>
            </Col>
        </Row>
    }
}

export const LoginForm = translate('Login')(LoginFormComponent);