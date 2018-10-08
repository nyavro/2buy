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
var AuthorizedRestService_1 = require("Libraries/Core/Services/AuthorizedRestService");
var OrderService = (function (_super) {
    __extends(OrderService, _super);
    function OrderService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrderService.prototype.getById = function (id) {
        return this.get(this.backendConfig.backend + "/orders/" + id);
    };
    OrderService.prototype.create = function (order) {
        return this.post(this.backendConfig.backend + "/orders", order);
    };
    OrderService.prototype.list = function () {
        return this.get(this.backendConfig.backend + "/orders");
    };
    return OrderService;
}(AuthorizedRestService_1.AuthorizedRestService));
exports.OrderService = OrderService;
