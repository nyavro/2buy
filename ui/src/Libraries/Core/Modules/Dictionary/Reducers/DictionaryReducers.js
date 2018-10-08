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
var redux_actions_1 = require("redux-actions");
var ActionTypes_1 = require("../Actions/ActionTypes");
var Enums_1 = require("Libraries/Core/Enums");
exports.initialState = function () { return ({
    districts: { data: undefined, status: Enums_1.ELoadingStatus.IDLE, error: undefined },
    operations: { data: undefined, status: Enums_1.ELoadingStatus.IDLE, error: undefined }
}); };
exports.dictionaryReducer = redux_actions_1.handleActions((_a = {},
    _a[ActionTypes_1.DICTIONARY_ACTIONS.DISTRICT_LIST_BEGIN] = function (state) { return (__assign({}, state, { districts: {
            data: undefined,
            status: Enums_1.ELoadingStatus.LOADING
        } })); },
    _a[ActionTypes_1.DICTIONARY_ACTIONS.DISTRICT_LIST_SUCCESS] = function (state, action) { return (__assign({}, state, { districts: {
            data: action.payload,
            status: Enums_1.ELoadingStatus.SUCCESS
        } })); },
    _a[ActionTypes_1.DICTIONARY_ACTIONS.DISTRICT_LIST_FAILURE] = function (state, _) { return (__assign({}, state, { districts: {
            data: undefined,
            status: Enums_1.ELoadingStatus.FAILURE
        } })); },
    _a[ActionTypes_1.DICTIONARY_ACTIONS.OPERATION_LIST_BEGIN] = function (state) { return (__assign({}, state, { operations: {
            data: undefined,
            status: Enums_1.ELoadingStatus.LOADING
        } })); },
    _a[ActionTypes_1.DICTIONARY_ACTIONS.OPERATION_LIST_SUCCESS] = function (state, action) { return (__assign({}, state, { operations: {
            data: action.payload,
            status: Enums_1.ELoadingStatus.SUCCESS
        } })); },
    _a[ActionTypes_1.DICTIONARY_ACTIONS.OPERATION_LIST_FAILURE] = function (state, _) { return (__assign({}, state, { operations: {
            data: undefined,
            status: Enums_1.ELoadingStatus.FAILURE
        } })); },
    _a), exports.initialState());
var _a;
