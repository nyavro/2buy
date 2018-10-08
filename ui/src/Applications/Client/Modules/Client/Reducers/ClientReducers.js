"use strict";
exports.__esModule = true;
var ActionTypes_1 = require("../Actions/ActionTypes");
var Enums_1 = require("Libraries/Core/Enums");
var ReduxUtils_1 = require("Libraries/Core/Utils/ReduxUtils");
exports.initialState = function () { return ({
    currentClient: { data: undefined, status: Enums_1.ELoadingStatus.IDLE, error: undefined }
}); };
exports.clientsReducer = function (prevState, action) {
    if (prevState === void 0) { prevState = exports.initialState(); }
    return ({
        currentClient: ReduxUtils_1.createParticle(ActionTypes_1.LOAD_CLIENT, prevState.currentClient, action)
    });
};
