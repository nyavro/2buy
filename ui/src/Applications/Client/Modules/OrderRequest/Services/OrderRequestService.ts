import {AuthorizedRestService} from 'Libraries/Core/Services/AuthorizedRestService';
import {IOrderRequestService, IOrderRequest, IOrderRequestView} from '../Models';
import {IItemsList} from 'Libraries/Core/Models';

export class OrderRequestService extends AuthorizedRestService implements IOrderRequestService {

    getById(id: String): Promise<IOrderRequest> {
        return this.get(`${this.backendConfig.backend}/order_requests/${id}`);
    }

    create(orderRequest: IOrderRequest): Promise<IOrderRequest> {
        return this.post(`${this.backendConfig.backend}/order_requests/create`, orderRequest);
    }

    list(): Promise<IItemsList<IOrderRequestView>> {
        return this.get(`${this.backendConfig.backend}/order_requests/unassigned`);
    }

    cancel(id: string): Promise<IOrderRequest> {
        return this.get(`${this.backendConfig.backend}/order_requests/cancel/${id}`);
    }
}
