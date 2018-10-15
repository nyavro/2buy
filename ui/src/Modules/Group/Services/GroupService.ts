import {AuthorizedRestService} from 'Libraries/Core/Services/AuthorizedRestService';
import {IGroup, IGroupService, IGroupView} from '../Models';
import {IPaginatedItems, IPagination} from 'Libraries/Core/Models';

export class GroupService extends AuthorizedRestService implements IGroupService {

    getById(id: String): Promise<IGroup> {
        return this.get(`${this.backendConfig.backend}/group/${id}`);
    }

    create(group: IGroupView): Promise<IGroupView> {
        return this.post(`${this.backendConfig.backend}/group/create`, group).then((id) => {return {...group, id: id}});
    }

    list(pagination: IPagination): Promise<IPaginatedItems<IGroupView>> {
        console.log("GroupService.list");
        return this.post(`${this.backendConfig.backend}/group/view`, pagination);
    }

    join(groupId: string): Promise<string> {
        return this.post(`${this.backendConfig.backend}/group/join`, {id: groupId});
    }

    leave(groupId: string): Promise<string> {
        return this.post(`${this.backendConfig.backend}/group/leave`, {id: groupId});
    }

    delete(groupId: string): Promise<string> {
        return this.post(`${this.backendConfig.backend}/group/delete`, {id: groupId});
    }

    members(groupId: string): Promise<IPaginatedItems<number>> {
        return this.post(`${this.backendConfig.backend}/group/members`, {id: groupId});
    }
}
