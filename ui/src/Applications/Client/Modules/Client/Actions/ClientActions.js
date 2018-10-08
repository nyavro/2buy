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
var ClientActions = (function (_super) {
    __extends(ClientActions, _super);
    function ClientActions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClientActions.prototype.getCurrent = function () {
        var _this = this;
        return ReduxUtils_1.asyncDispatch(this.dispatch, ActionTypes_1.LOAD_CLIENT, function () { return _this.service.getCurrent(); });
    };
    ClientActions.prototype.create = function (client) {
        var _this = this;
        return ReduxUtils_1.asyncDispatch(this.dispatch, ActionTypes_1.UPDATE_CLIENT, function () { return _this.service.create(client); });
    };
    ClientActions.prototype.update = function (client) {
        var _this = this;
        return ReduxUtils_1.asyncDispatch(this.dispatch, ActionTypes_1.UPDATE_CLIENT, function () { return _this.service.update(client); });
    };
    return ClientActions;
}(Actions_1.LoginRedirectActions));
exports.ClientActions = ClientActions;
