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
var OrderRequestService = (function (_super) {
    __extends(OrderRequestService, _super);
    function OrderRequestService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrderRequestService.prototype.getById = function (id) {
        return this.get(this.backendConfig.backend + "/order_requests/" + id);
    };
    OrderRequestService.prototype.create = function (orderRequest) {
        return this.post(this.backendConfig.backend + "/order_requests/create", orderRequest);
    };
    OrderRequestService.prototype.list = function () {
        return this.get(this.backendConfig.backend + "/order_requests/unassigned");
    };
    OrderRequestService.prototype.cancel = function (id) {
        return this.get(this.backendConfig.backend + "/order_requests/cancel/" + id);
    };
    return OrderRequestService;
}(AuthorizedRestService_1.AuthorizedRestService));
exports.OrderRequestService = OrderRequestService;
