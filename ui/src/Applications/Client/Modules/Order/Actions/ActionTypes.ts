import {EActionTypes} from 'Libraries/Core/Utils/ReduxUtils';

const ORDER = 'ORDER_';

export const LOAD_ORDER = ORDER + EActionTypes.LOAD_ITEM;
export const LIST_ORDER = ORDER + EActionTypes.LOAD_LIST;