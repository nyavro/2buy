"use strict";
exports.__esModule = true;
var redux_actions_1 = require("redux-actions");
var Enums_1 = require("Libraries/Core/Enums");
var EActionState;
(function (EActionState) {
    EActionState[EActionState["BEGIN"] = '_BEGIN'] = "BEGIN";
    EActionState[EActionState["SUCCESS"] = '_SUCCESS'] = "SUCCESS";
    EActionState[EActionState["ERROR"] = '_ERROR'] = "ERROR";
})(EActionState = exports.EActionState || (exports.EActionState = {}));
var EActionTypes;
(function (EActionTypes) {
    EActionTypes[EActionTypes["CREATE_ITEM"] = 0] = "CREATE_ITEM";
    EActionTypes[EActionTypes["LOAD_ITEM"] = 1] = "LOAD_ITEM";
    EActionTypes[EActionTypes["UPDATE_ITEM"] = 2] = "UPDATE_ITEM";
    EActionTypes[EActionTypes["LOAD_LIST"] = 3] = "LOAD_LIST";
})(EActionTypes = exports.EActionTypes || (exports.EActionTypes = {}));
function syncDispatch(dispatch, actionType, success) {
    dispatch(redux_actions_1.createAction(actionType)(success));
}
exports.syncDispatch = syncDispatch;
function asyncDispatch(dispatch, actionType, func) {
    dispatch(redux_actions_1.createAction(actionType + EActionState.BEGIN)());
    return func()
        .then(function (success) { return dispatch(redux_actions_1.createAction(actionType + EActionState.SUCCESS)(success)); })["catch"](function (error) { dispatch(redux_actions_1.createAction(actionType + EActionState.ERROR)(error)); });
}
exports.asyncDispatch = asyncDispatch;
function createParticle(type, prevState, action, custom) {
    switch (action.type) {
        case type + EActionState.BEGIN:
            return { data: undefined, status: Enums_1.ELoadingStatus.LOADING, error: undefined };
        case type + EActionState.SUCCESS:
            return { data: action.payload, status: Enums_1.ELoadingStatus.SUCCESS, error: undefined };
        case type + EActionState.ERROR:
            return { data: null, status: Enums_1.ELoadingStatus.FAILURE, error: action.payload };
    }
    return custom ? custom(action, prevState) : prevState;
}
exports.createParticle = createParticle;
