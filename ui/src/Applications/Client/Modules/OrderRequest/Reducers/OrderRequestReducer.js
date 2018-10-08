"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var Enums_1 = require("Libraries/Core/Enums");
var ActionTypes_1 = require("../Actions/ActionTypes");
var ReduxUtils_1 = require("Libraries/Core/Utils/ReduxUtils");
exports.initialState = function () {
    return {
        list: { data: undefined, status: Enums_1.ELoadingStatus.IDLE, error: undefined },
        currentDocument: { data: undefined, status: Enums_1.ELoadingStatus.IDLE, error: undefined }
    };
};
exports.orderRequestReducer = function (prevState, action) {
    if (prevState === void 0) { prevState = exports.initialState(); }
    return ({
        currentDocument: ReduxUtils_1.createParticle(ActionTypes_1.LOAD_ORDER_REQUEST, prevState.currentDocument, action),
        list: ReduxUtils_1.createParticle(ActionTypes_1.LIST_ORDER_REQUEST, prevState.list, action, function (action, prevState) {
            if (action.type === ActionTypes_1.ORDER_CREATED_EXT && prevState.data) {
                var newList = prevState.data.content.map(function (orderRequest) {
                    console.log('Checking ids');
                    if (orderRequest.id == action.payload.orderRequestId) {
                        console.log('Patching', JSON.stringify(action.payload) + JSON.stringify(orderRequest));
                        return __assign({}, orderRequest, { orderId: action.payload.orderId });
                    }
                    else {
                        return orderRequest;
                    }
                });
                return __assign({}, prevState, { data: __assign({}, prevState.data, { content: newList }) });
            }
            return prevState;
        })
    });
};
