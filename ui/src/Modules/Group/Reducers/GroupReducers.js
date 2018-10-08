"use strict";
exports.__esModule = true;
var Enums_1 = require("Libraries/Core/Enums");
var ActionTypes_1 = require("../Actions/ActionTypes");
var ReduxUtils_1 = require("Libraries/Core/Utils/ReduxUtils");
exports.initialState = function () {
    return {
        list: { data: undefined, status: Enums_1.ELoadingStatus.IDLE, error: undefined },
        currentGroup: { data: undefined, status: Enums_1.ELoadingStatus.IDLE, error: undefined }
    };
};
exports.groupReducer = function (prevState, action) {
    if (prevState === void 0) { prevState = exports.initialState(); }
    return ({
        currentGroup: ReduxUtils_1.createParticle(ActionTypes_1.LOAD_GROUP, prevState.currentGroup, action),
        list: ReduxUtils_1.createParticle(ActionTypes_1.LIST_GROUPS, prevState.list, action)
    });
};
