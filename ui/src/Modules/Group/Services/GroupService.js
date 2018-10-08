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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var AuthorizedRestService_1 = require("Libraries/Core/Services/AuthorizedRestService");
var GroupService = (function (_super) {
    __extends(GroupService, _super);
    function GroupService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GroupService.prototype.getById = function (id) {
        return this.get(this.backendConfig.backend + "/group/" + id);
    };
    GroupService.prototype.create = function (group) {
        return this.post(this.backendConfig.backend + "/group/create", group).then(function (id) { return __assign({}, group, { id: id }); });
    };
    GroupService.prototype.list = function (pagination) {
        return this.post(this.backendConfig.backend + "/group/view", pagination);
    };
    GroupService.prototype.join = function (groupId) {
        return this.post(this.backendConfig.backend + "/group/join", { id: groupId });
    };
    GroupService.prototype.leave = function (groupId) {
        return this.post(this.backendConfig.backend + "/group/leave", { id: groupId });
    };
    GroupService.prototype["delete"] = function (groupId) {
        return this.post(this.backendConfig.backend + "/group/delete", { id: groupId });
    };
    GroupService.prototype.members = function (groupId) {
        return this.post(this.backendConfig.backend + "/group/members", { id: groupId });
    };
    return GroupService;
}(AuthorizedRestService_1.AuthorizedRestService));
exports.GroupService = GroupService;
