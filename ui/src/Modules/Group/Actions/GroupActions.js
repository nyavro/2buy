"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var ActionTypes_1 = require("./ActionTypes");
var Actions_1 = require("Libraries/Core/Actions");
var ReduxUtils_1 = require("Libraries/Core/Utils/ReduxUtils");
var GroupActions = (function (_super) {
    __extends(GroupActions, _super);
    function GroupActions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupActions.prototype.getById = function (id) {
        var _this = this;
        return ReduxUtils_1.asyncDispatch(this.dispatch, ActionTypes_1.LOAD_GROUP, function () { return _this.service.getById(id); });
    };
    GroupActions.prototype.create = function (group) {
        var _this = this;
        return ReduxUtils_1.asyncDispatch(this.dispatch, ActionTypes_1.CREATE_GROUP, function () { return _this.service.create(group); });
    };
    GroupActions.prototype.join = function (groupId) {
        var _this = this;
        return ReduxUtils_1.asyncDispatch(this.dispatch, ActionTypes_1.JOIN_GROUP, function () { return _this.service.join(groupId); });
    };
    GroupActions.prototype.leave = function (groupId) {
        var _this = this;
        return ReduxUtils_1.asyncDispatch(this.dispatch, ActionTypes_1.LEAVE_GROUP, function () { return _this.service.leave(groupId); });
    };
    GroupActions.prototype["delete"] = function (groupId) {
        var _this = this;
        return ReduxUtils_1.asyncDispatch(this.dispatch, ActionTypes_1.DELETE_GROUP, function () { return _this.service["delete"](groupId); });
    };
    GroupActions.prototype.members = function (groupId) {
        var _this = this;
        return ReduxUtils_1.asyncDispatch(this.dispatch, ActionTypes_1.LOAD_MEMBERS, function () { return _this.service.members(groupId); });
    };
    GroupActions.prototype.list = function (pagination) {
        var _this = this;
        return ReduxUtils_1.asyncDispatch(this.dispatch, ActionTypes_1.LIST_GROUPS, function () { return _this.service.list(pagination); });
    };
    return GroupActions;
}(Actions_1.LoginRedirectActions));
exports.GroupActions = GroupActions;
