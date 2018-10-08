"use strict";
exports.__esModule = true;
var Enums_1 = require("Libraries/Core/Enums");
var ActionTypes_1 = require("../Actions/ActionTypes");
var ReduxUtils_1 = require("Libraries/Core/Utils/ReduxUtils");
exports.initialState = function () {
    return {
        list: { data: undefined, status: Enums_1.ELoadingStatus.IDLE, error: undefined },
        currentOrder: { data: undefined, status: Enums_1.ELoadingStatus.IDLE, error: undefined }
    };
};
exports.orderReducer = function (prevState, action) {
    if (prevState === void 0) { prevState = exports.initialState(); }
    return ({
        currentOrder: ReduxUtils_1.createParticle(ActionTypes_1.LOAD_ORDER, prevState.currentOrder, action),
        list: ReduxUtils_1.createParticle(ActionTypes_1.LIST_ORDER, prevState.list, action)
    });
};
