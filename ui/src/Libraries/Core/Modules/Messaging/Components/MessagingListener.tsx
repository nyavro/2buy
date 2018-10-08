import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {IMessagingActions, IMessagingContext} from '../Models';
import {MessagingActions} from '../Actions/MessagingActions';
import {MessagingService} from '../Services/MessagingService';
import {CustomWindow} from '../custom.window';

interface IOwnProps {
    context: IMessagingContext;
}

interface IDispatchProps {
    actions: MessagingActions;
}

type TProps = IOwnProps & IDispatchProps;

declare let window: CustomWindow;

class MessagingListenerComponent extends React.Component<TProps, {}> {

    componentDidMount() {
        const oneSignal = window.oneSignal;
        const {actions} = this.props;
        oneSignal.tokenChangeHandler = actions.setToken;
        oneSignal.pushHandler = actions.processPushMessage;
    }

    render() {
        return <div/>;
    }
}

const mapDispatchToProps = (dispatch: Dispatch<{}>, {context}: IOwnProps) => ({
    actions: new MessagingActions(MessagingService, context.messaging, dispatch)
});

export const MessagingListener = connect(null, mapDispatchToProps)(MessagingListenerComponent);