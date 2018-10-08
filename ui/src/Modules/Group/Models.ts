import {IAsyncData, IBackendConfig, IPaginatedItems, IPagination} from 'Libraries/Core/Models';

export interface IGroupView {
    id?: string;
    name: string;
    lastActivity: string;
}

export interface IGroup extends IGroupView {
}

export interface IGroupService {
    list(pagination: IPagination): Promise<IPaginatedItems<IGroupView>>;
    create(group: IGroupView): Promise<IGroupView>;
    join(groupId: string): Promise<string>;
    leave(groupId: string): Promise<string>;
    delete(groupId: string): Promise<string>;
    members(groupId: string): Promise<IPaginatedItems<number>>;
    getById(id: string): Promise<IGroup>;
}

export interface IGroupActions {
    list(pagination: IPagination): void;
    create(group: IGroupView): void;
    join(groupId: string): void;
    leave(groupId: string): void;
    delete(groupId: string): void;
    members(groupId: string): void;
    getById(id: string): void;
}

export interface IGroupReduxState {
    currentGroup: IAsyncData<IGroup>;
    list: IAsyncData<IPaginatedItems<IGroupView>>;
}

export interface IGroupContext {
    group: IBackendConfig;
}

export interface IGroupModule {
    group?: IGroupReduxState;
}