import {LOAD_CLIENT} from '../Actions/ActionTypes';
import {IFSAAction} from 'Libraries/Core/Models';
import {IClient, IClientReduxState} from '../Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {createParticle} from 'Libraries/Core/Utils/ReduxUtils';

export const initialState = (): IClientReduxState => (
    {
        currentClient: {data: undefined, status: ELoadingStatus.IDLE, error: undefined}
    }
);

export const clientsReducer = (prevState: IClientReduxState = initialState(), action: IFSAAction<any>): IClientReduxState => ({
    currentClient: createParticle<IClient>(
        LOAD_CLIENT,
        prevState.currentClient,
        action
    )
});