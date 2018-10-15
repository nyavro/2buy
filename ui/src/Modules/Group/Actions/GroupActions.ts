import {
    CREATE_GROUP,
    DELETE_GROUP,
    JOIN_GROUP,
    LEAVE_GROUP,
    LIST_GROUPS,
    LOAD_GROUP,
    LOAD_MEMBERS
} from './ActionTypes';
import {LoginRedirectActions} from 'Libraries/Core/Actions';
import {IGroup, IGroupActions, IGroupReduxState, IGroupService, IGroupView} from '../Models';
import {asyncDispatch} from 'Libraries/Core/Utils/ReduxUtils';
import {IPaginatedItems, IPagination} from 'Libraries/Core/Models';

export class GroupActions extends LoginRedirectActions<IGroupService, IGroupReduxState> implements IGroupActions {

    getById(id: string) {
        return asyncDispatch<IGroup, IGroupReduxState>(
            this.dispatch,
            LOAD_GROUP,
            () => this.service.getById(id)
        );
    }

    create(group: IGroupView) {
        return asyncDispatch<IGroupView, IGroupReduxState>(
            this.dispatch,
            CREATE_GROUP,
            () => this.service.create(group)
        );
    }

    join(groupId: string) {
        return asyncDispatch<string, IGroupReduxState>(
            this.dispatch,
            JOIN_GROUP,
            () => this.service.join(groupId)
        );
    }

    leave(groupId: string) {
        return asyncDispatch<string, IGroupReduxState>(
            this.dispatch,
            LEAVE_GROUP,
            () => this.service.leave(groupId)
        );
    }

    delete(groupId: string) {
        return asyncDispatch<string, IGroupReduxState>(
            this.dispatch,
            DELETE_GROUP,
            () => this.service.delete(groupId)
        );
    }

    members(groupId: string) {
        return asyncDispatch<IPaginatedItems<number>, IGroupReduxState>(
            this.dispatch,
            LOAD_MEMBERS,
            () => this.service.members(groupId)
        );
    }

    list(pagination?: IPagination) {
        return asyncDispatch<IPaginatedItems<IGroupView>, IGroupReduxState>(
            this.dispatch,
            LIST_GROUPS,
            () => this.service.list(pagination || {})
        );
    }
}