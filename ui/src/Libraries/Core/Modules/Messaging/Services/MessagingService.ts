import {IMessageToken, IMessagingService} from '../Models';
import {AuthorizedRestService} from 'Libraries/Core/Services/AuthorizedRestService';

export class MessagingService extends AuthorizedRestService implements IMessagingService {

    private readonly rest = `${this.backendConfig.backend}/notification`;

    setToken (messageToken:IMessageToken) {
        return this.post(`${this.rest}/set_token`, messageToken);
    }
}
