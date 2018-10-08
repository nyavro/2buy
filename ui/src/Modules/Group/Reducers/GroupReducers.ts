import {IGroup, IGroupReduxState, IGroupView} from '../Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {IFSAAction, IPaginatedItems} from 'Libraries/Core/Models';
import {
    LIST_GROUPS,
    LOAD_GROUP
} from '../Actions/ActionTypes';
import {createParticle} from 'Libraries/Core/Utils/ReduxUtils';

export const initialState = (): IGroupReduxState => {
    return {
        list: {data: undefined, status: ELoadingStatus.IDLE, error: undefined},
        currentGroup: {data: undefined, status: ELoadingStatus.IDLE, error: undefined}
    }
};

export const groupReducer = (prevState: IGroupReduxState = initialState(), action: IFSAAction<any>): IGroupReduxState => ({
    currentGroup: createParticle<IGroup>(
        LOAD_GROUP,
        prevState.currentGroup,
        action
    ),
    list: createParticle<IPaginatedItems<IGroupView>>(
        LIST_GROUPS,
        prevState.list,
        action
    )
});