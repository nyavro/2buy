import {
    LOAD_CLIENT,
    UPDATE_CLIENT
} from './ActionTypes';
import {LoginRedirectActions} from 'Libraries/Core/Actions';
import {IClient, IClientActions, IClientReduxState, IClientService} from '../Models';
import {asyncDispatch} from 'Libraries/Core/Utils/ReduxUtils';

export class ClientActions extends LoginRedirectActions<IClientService, IClientReduxState> implements IClientActions {

    getCurrent() {
        return asyncDispatch<IClient, IClientReduxState>(
            this.dispatch,
            LOAD_CLIENT,
            () => this.service.getCurrent()
        );
    }

    create(client:IClient) {
        return asyncDispatch<IClient, IClientReduxState>(
            this.dispatch,
            UPDATE_CLIENT,
            () => this.service.create(client)
        );
    }

    update(client:IClient) {
        return asyncDispatch<IClient, IClientReduxState>(
            this.dispatch,
            UPDATE_CLIENT,
            () => this.service.update(client)
        );
    }
}