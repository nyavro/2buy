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
var OrderRequestActions = (function (_super) {
    __extends(OrderRequestActions, _super);
    function OrderRequestActions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrderRequestActions.prototype.getById = function (id) {
        var _this = this;
        return ReduxUtils_1.asyncDispatch(this.dispatch, ActionTypes_1.LOAD_ORDER_REQUEST, function () { return _this.service.getById(id); });
    };
    OrderRequestActions.prototype.create = function (clientRequest) {
        var _this = this;
        return ReduxUtils_1.asyncDispatch(this.dispatch, ActionTypes_1.LOAD_ORDER_REQUEST, function () { return _this.service.create(clientRequest); });
    };
    OrderRequestActions.prototype.list = function () {
        var _this = this;
        return ReduxUtils_1.asyncDispatch(this.dispatch, ActionTypes_1.LIST_ORDER_REQUEST, function () { return _this.service.list(); });
    };
    OrderRequestActions.prototype.cancel = function (id) {
        var _this = this;
        return ReduxUtils_1.asyncDispatch(this.dispatch, ActionTypes_1.LOAD_ORDER_REQUEST, function () { return _this.service.cancel(id); });
    };
    return OrderRequestActions;
}(Actions_1.LoginRedirectActions));
exports.OrderRequestActions = OrderRequestActions;
