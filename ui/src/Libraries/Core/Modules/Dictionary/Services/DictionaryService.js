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
var DictionaryService = (function (_super) {
    __extends(DictionaryService, _super);
    function DictionaryService() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DictionaryService.prototype.getOperations = function () {
        return this.get(this.backendConfig.backend + "/dicts/operation");
    };
    DictionaryService.prototype.getDistricts = function () {
        return this.get(this.backendConfig.backend + "/dicts/district");
    };
    return DictionaryService;
}(AuthorizedRestService_1.AuthorizedRestService));
exports.DictionaryService = DictionaryService;
