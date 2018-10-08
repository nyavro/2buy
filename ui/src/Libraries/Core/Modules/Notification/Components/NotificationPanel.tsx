import {isEmpty, includes} from 'lodash';
import * as React from 'react';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {NotificationActions} from '../Actions/NotificationActions';
import {INotification, INotificationModule} from '../Models';
import * as NotificationSystem from 'react-notification-system';
import {System} from 'react-notification-system';

interface IOwnProps {
}

interface IDispatchProps {
    actions: NotificationActions;
}

interface IStateProps {
    notifications: INotification[];
}

type TProps = IOwnProps & IDispatchProps & IStateProps;

class NotificationPanel extends React.Component<TProps, {}> {

    notificationSystem: System;

    componentWillReceiveProps(props:TProps) {
        props.notifications.forEach((item) => {
                this.notificationSystem.addNotification(item);
                props.actions.removeNotification(item.localId);
            }
        )
    }

    handleRef = (notificationSystem: System) => {
        this.notificationSystem = notificationSystem;
    };

    render() {
        return <NotificationSystem ref={this.handleRef}/>;
    }
}

const mapDispatchToProps = (dispatch: Dispatch<{}>) => ({
    actions: new NotificationActions(dispatch)
});

const mapStateToProps = (state: INotificationModule) => ({notifications: state.notification.list});

export default connect(mapStateToProps, mapDispatchToProps)(NotificationPanel);