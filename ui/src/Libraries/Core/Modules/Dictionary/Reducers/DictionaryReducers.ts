import {handleActions} from 'redux-actions';
import {DICTIONARY_ACTIONS} from "../Actions/ActionTypes";
import {IItemsList, IFSAAction} from 'Libraries/Core/Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {IDistrict, IDictionaryReduxState, IOperation} from "../Models";

export const initialState = (): IDictionaryReduxState => (
    {
        districts: {data: undefined, status: ELoadingStatus.IDLE, error: undefined},
        operations: {data: undefined, status: ELoadingStatus.IDLE, error: undefined},
    }
);    

export const dictionaryReducer = handleActions<IDictionaryReduxState, any>({
    [DICTIONARY_ACTIONS.DISTRICT_LIST_BEGIN]: 
    (state: IDictionaryReduxState) => ({
        ...state,
        districts: {
            data: undefined,
            status: ELoadingStatus.LOADING
        }
    }),
    [DICTIONARY_ACTIONS.DISTRICT_LIST_SUCCESS]: 
    (state: IDictionaryReduxState, action: IFSAAction<IItemsList<IDistrict>>) => ({
        ...state,
        districts: {
            data: action.payload,
            status: ELoadingStatus.SUCCESS,
        }
    }),
    [DICTIONARY_ACTIONS.DISTRICT_LIST_FAILURE]: 
    (state: IDictionaryReduxState, _: IFSAAction<{}>) => ({
        ...state,
        districts: {
            data: undefined,
            status: ELoadingStatus.FAILURE,
        }
    }),


    [DICTIONARY_ACTIONS.OPERATION_LIST_BEGIN]: 
    (state: IDictionaryReduxState) => ({
        ...state,
        operations: {
            data: undefined,
            status: ELoadingStatus.LOADING
        }
    }),
    [DICTIONARY_ACTIONS.OPERATION_LIST_SUCCESS]: 
    (state: IDictionaryReduxState, action: IFSAAction<IItemsList<IOperation>>) => ({
        ...state,
        operations: {
            data: action.payload,
            status: ELoadingStatus.SUCCESS,
        }
    }),
    [DICTIONARY_ACTIONS.OPERATION_LIST_FAILURE]: 
    (state: IDictionaryReduxState, _: IFSAAction<{}>) => ({
        ...state,
        operations: {
            data: undefined,
            status: ELoadingStatus.FAILURE,
        }
    })
}, initialState());



