import {LoginRedirectActions} from 'Libraries/Core/Actions';
import {IMessagingService, IMessagingActions, IMessageToken, IPushMessage} from '../Models';
import {createAction} from 'redux-actions';

export class MessagingActions extends LoginRedirectActions<IMessagingService, {}> implements IMessagingActions {

    setToken = (token: string) => {
        this.service.setToken({token: token});
    };

    processPushMessage = (message: IPushMessage) => {
        console.log("Message processing", JSON.stringify(message));
        console.log("With type:", message.data.type);
        this.dispatch(createAction<any>(message.data.type)(message.data));
    };
}