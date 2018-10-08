import {AuthorizedRestService} from 'Libraries/Core/Services/AuthorizedRestService';
import {IClientService, IClient} from '../Models';

export class ClientsService extends AuthorizedRestService implements IClientService {

    getCurrent(): Promise<IClient> {
        return this.get(`${this.backendConfig.backend}/clients`);
    }

    create(client: IClient): Promise<IClient> {
        return this.post(`${this.backendConfig.backend}/clients`, client);
    }

    update(client: IClient): Promise<IClient> {
        return this.put(`${this.backendConfig.backend}/clients/${client.id}`, client);
    }
}
