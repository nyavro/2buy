import {AuthorizedRestService} from 'Libraries/Core/Services/AuthorizedRestService';
import {IProductService} from '../Models';

export class ProductService extends AuthorizedRestService implements IProductService {

    create(name: string) {
        return this.post(
            `${this.backendConfig.backend}/order`, {name: name}
        ).then((id) => ({id: id, name: name}));
    }

    list() {
        return this.post(`${this.backendConfig.backend}/product/view`);
    }
}
