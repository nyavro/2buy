"use strict";
exports.__esModule = true;
var Enums_1 = require("Libraries/Core/Enums");
var ReduxUtils_1 = require("Libraries/Core/Utils/ReduxUtils");
var ActionTypes_1 = require("../Actions/ActionTypes");
exports.initialState = function () { return ({
    userInfo: {
        data: {
            roles: [],
            token: null,
            login: null,
            userId: null
        },
        status: Enums_1.ELoadingStatus.IDLE,
        error: null
    }
}); };
exports.loginReducer = function (prevState, action) {
    if (prevState === void 0) { prevState = exports.initialState(); }
    return ({
        userInfo: ReduxUtils_1.createParticle(ActionTypes_1.LOGIN_REQUEST, prevState.userInfo, action)
    });
};
