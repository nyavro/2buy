import {createAction} from 'redux-actions';
import {Dispatch} from 'redux';
import {IAsyncData, IFSAAction} from 'Libraries/Core/Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';

export enum EActionState {
    BEGIN = '_BEGIN',
    SUCCESS = '_SUCCESS',
    ERROR = '_ERROR'
}

export enum EActionTypes {
    CREATE_ITEM,
    LOAD_ITEM,
    UPDATE_ITEM,
    LOAD_LIST
}

export function syncDispatch<TResponse, TState>(
    dispatch: Dispatch<TState>,
    actionType: string,
    success: TResponse
) {
    dispatch(createAction<TResponse>(actionType)(success))
}

export function asyncDispatch<TResponse, TState>(
    dispatch: Dispatch<TState>,
    actionType: string,
    func: () => Promise<TResponse>
) {
    dispatch(createAction(actionType + EActionState.BEGIN)());
    return func()
        .then(
            (success: TResponse) => dispatch(createAction<TResponse>(actionType + EActionState.SUCCESS)(success))
        )
        .catch(
            (error: string) => {dispatch(createAction<string>(actionType + EActionState.ERROR)(error))}
        );
}

export function createParticle<TData>(
    type: string,
    prevState: IAsyncData<TData>,
    action: IFSAAction<any>,
    custom?: (action: IFSAAction<any>, state: IAsyncData<TData>) => IAsyncData<TData>
): IAsyncData<TData> {
    switch (action.type) {
        case type + EActionState.BEGIN:
            return {data: undefined, status: ELoadingStatus.LOADING, error: undefined};
        case type + EActionState.SUCCESS:
            return {data: action.payload, status: ELoadingStatus.SUCCESS, error: undefined};
        case type + EActionState.ERROR:
            return {data: null, status: ELoadingStatus.FAILURE, error: action.payload};
    }
    return custom ? custom(action, prevState) : prevState;
}