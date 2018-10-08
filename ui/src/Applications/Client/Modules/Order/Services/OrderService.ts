import {AuthorizedRestService} from 'Libraries/Core/Services/AuthorizedRestService';
import {IOrderService, IOrder} from '../Models';
import {IItemsList} from 'Libraries/Core/Models';

export class OrderService extends AuthorizedRestService implements IOrderService {

    getById(id: String): Promise<IOrder> {
        return this.get(`${this.backendConfig.backend}/orders/${id}`);
    }

    create(order: IOrder): Promise<IOrder> {
        return this.post(`${this.backendConfig.backend}/orders`, order);
    }

    list(): Promise<IItemsList<IOrder>> {
        return this.get(`${this.backendConfig.backend}/orders`);
    }
}
