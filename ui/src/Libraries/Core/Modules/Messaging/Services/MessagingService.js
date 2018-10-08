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
var MessagingService = (function (_super) {
    __extends(MessagingService, _super);
    function MessagingService() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rest = _this.backendConfig.backend + "/notification";
        return _this;
    }
    MessagingService.prototype.setToken = function (messageToken) {
        return this.post(this.rest + "/set_token", messageToken);
    };
    return MessagingService;
}(AuthorizedRestService_1.AuthorizedRestService));
exports.MessagingService = MessagingService;
