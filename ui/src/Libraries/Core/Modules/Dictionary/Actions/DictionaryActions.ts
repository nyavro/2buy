import {LoginRedirectActions} from 'Libraries/Core/Actions';
import {DICTIONARY_ACTIONS} from './ActionTypes';
import {createAction} from 'redux-actions';
import {IDictionaryReduxState, IDictionaryService} from '../Models';

interface IDictionaryActions {
    getDistricts(): void;
    getOperations(): void;
}

export class DictionaryActions 
    extends LoginRedirectActions<IDictionaryService, IDictionaryReduxState> implements IDictionaryActions {
        getDistricts = (): void => {
            this.dispatch(createAction(DICTIONARY_ACTIONS.DISTRICT_LIST_BEGIN)());
            this.service.getDistricts().then(
                (data) => this.dispatch(createAction<any>(
                    DICTIONARY_ACTIONS.DISTRICT_LIST_SUCCESS
                )(data)),
                (error) => this.dispatch(createAction<any>(
                    DICTIONARY_ACTIONS.DISTRICT_LIST_FAILURE
                )(error))
            );
        };

        getOperations = (): void => {
            this.dispatch(createAction(DICTIONARY_ACTIONS.OPERATION_LIST_BEGIN)());
            this.service.getOperations().then(
                (data) => this.dispatch(createAction<any>(
                    DICTIONARY_ACTIONS.OPERATION_LIST_SUCCESS
                )(data)),
                (error) => this.dispatch(createAction<any>(
                    DICTIONARY_ACTIONS.OPERATION_LIST_FAILURE
                )(error))
            );
        };
}
