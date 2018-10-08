import {EActionTypes} from 'Libraries/Core/Utils/ReduxUtils';

const ORDER_REQUEST = 'ORDER_REQUEST_';

export const LOAD_ORDER_REQUEST = ORDER_REQUEST + EActionTypes.LOAD_ITEM;
export const LIST_ORDER_REQUEST = ORDER_REQUEST + EActionTypes.LOAD_LIST;

export const ORDER_CREATED_EXT = 'ORDER_CREATED_' + 'EXT';