import {EActionTypes} from 'Libraries/Core/Utils/ReduxUtils';

const GROUP = 'GROUP_';

export const LOAD_GROUP = GROUP + EActionTypes.LOAD_ITEM;
export const LIST_GROUPS = GROUP + EActionTypes.LOAD_LIST;
export const CREATE_GROUP = GROUP + EActionTypes.CREATE_ITEM;
export const JOIN_GROUP = GROUP + "JOIN";
export const LEAVE_GROUP = GROUP + "LEAVE";
export const DELETE_GROUP = GROUP + "DELETE";
export const LOAD_MEMBERS = GROUP + "MEMBERS" + EActionTypes.LOAD_LIST;