import {AuthorizedRestService} from 'Libraries/Core/Services/AuthorizedRestService';
import {IOrderService} from '../Models';
import {IPagination} from 'Libraries/Core/Models';

export class OrderService extends AuthorizedRestService implements IOrderService {

    modify(orderId: string, groupId: string, count: number, version: number, comment?: string) {
        return this.put(
            `${this.backendConfig.backend}/order/modify`,
            {
                orderId: orderId,
                groupId: groupId,
                count: count,
                version: version,
                comment: comment
            }
        ).then((_) => ({groupId: groupId, orderId: orderId}));
    }

    create(productIds: string[], groupId: string, comment?: string) {
        return this.post(
            `${this.backendConfig.backend}/order/create`,
            {
                productIds: productIds,
                groupId: groupId,
                comment: comment
            }
        ).then((_) => groupId);
    }

    reject(orderId: string, groupId: string, version: number, comment?: string) {
        return this.put(
            `${this.backendConfig.backend}/order/reject`,
            {
                orderId: orderId,
                groupId: groupId,
                version: version,
                comment: comment
            }
        ).then((_) => ({groupId: groupId, orderId: orderId}));
    }

    close(orderId: string, groupId: string, version: number, comment?: string) {
        return this.put(
            `${this.backendConfig.backend}/order/close`,
            {
                orderId: orderId,
                groupId: groupId,
                version: version,
                comment: comment
            }
        ).then((_) => ({groupId: groupId, orderId: orderId}));
    }

    list(groupId: string, pagination: IPagination) {
        console.log("order/view");
        return this.post(
            `${this.backendConfig.backend}/order/view`,
            {
                groupId: groupId,
                pagination: pagination
            }
        );
    }
}
