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
var lodash_1 = require("lodash");
var redux_actions_1 = require("redux-actions");
var ActionTypes_1 = require("../Actions/ActionTypes");
exports.initialState = function () {
    return {
        list: []
    };
};
exports.notificationReducer = redux_actions_1.handleActions((_a = {},
    _a[ActionTypes_1.REMOVE] = function (state, action) { return (__assign({}, state, { list: lodash_1.filter(state.list, function (_a) {
            var localId = _a.localId;
            return localId !== action.payload;
        }) })); },
    _a[ActionTypes_1.ADD] = function (state, action) { return (__assign({}, state, { list: state.list.concat(action.payload) })); },
    _a), exports.initialState());
var _a;
