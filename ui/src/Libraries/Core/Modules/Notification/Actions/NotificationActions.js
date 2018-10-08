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
var ActionTypes_1 = require("./ActionTypes");
var ReduxUtils_1 = require("Libraries/Core/Utils/ReduxUtils");
var TIME_COMPONENT = 1000000;
exports.DEFAULT_TIMEOUT = 5000;
var NotificationActions = (function () {
    function NotificationActions(dispatch) {
        var _this = this;
        this.dispatch = dispatch;
        this.count = 0;
        this.generateId = function () { return (((new Date()).getTime() % TIME_COMPONENT) + (_this.count++) * TIME_COMPONENT); };
    }
    NotificationActions.prototype.createNotification = function (notification) {
        return ReduxUtils_1.syncDispatch(this.dispatch, ActionTypes_1.ADD, __assign({}, notification, { localId: this.generateId() }));
    };
    NotificationActions.prototype.removeNotification = function (localId) {
        return ReduxUtils_1.syncDispatch(this.dispatch, ActionTypes_1.REMOVE, localId);
    };
    return NotificationActions;
}());
exports.NotificationActions = NotificationActions;
