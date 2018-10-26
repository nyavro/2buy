import {EActionTypes} from 'Libraries/Core/Utils/ReduxUtils';

const ORDER = 'ORDER_';

export const CREATE_GROUP_ORDER = ORDER + EActionTypes.CREATE_ITEM;
export const MODIFY_GROUP_ORDER = ORDER + EActionTypes.UPDATE_ITEM;
export const LIST_GROUP_ORDERS = ORDER + EActionTypes.LOAD_LIST;
export const ORDER_DONE = ORDER + EActionTypes.REMOVE_ITEM;