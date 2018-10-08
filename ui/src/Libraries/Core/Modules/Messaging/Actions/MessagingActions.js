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
var Actions_1 = require("Libraries/Core/Actions");
var redux_actions_1 = require("redux-actions");
var MessagingActions = (function (_super) {
    __extends(MessagingActions, _super);
    function MessagingActions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.setToken = function (token) {
            _this.service.setToken({ token: token });
        };
        _this.processPushMessage = function (message) {
            console.log("Message processing", JSON.stringify(message));
            console.log("With type:", message.data.type);
            _this.dispatch(redux_actions_1.createAction(message.data.type)(message.data));
        };
        return _this;
    }
    return MessagingActions;
}(Actions_1.LoginRedirectActions));
exports.MessagingActions = MessagingActions;
