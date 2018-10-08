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
var ClientsService = (function (_super) {
    __extends(ClientsService, _super);
    function ClientsService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ClientsService.prototype.getCurrent = function () {
        return this.get(this.backendConfig.backend + "/clients");
    };
    ClientsService.prototype.create = function (client) {
        return this.post(this.backendConfig.backend + "/clients", client);
    };
    ClientsService.prototype.update = function (client) {
        return this.put(this.backendConfig.backend + "/clients/" + client.id, client);
    };
    return ClientsService;
}(AuthorizedRestService_1.AuthorizedRestService));
exports.ClientsService = ClientsService;
