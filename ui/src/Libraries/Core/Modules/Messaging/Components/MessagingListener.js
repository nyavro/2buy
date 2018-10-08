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
var React = require("react");
var react_redux_1 = require("react-redux");
var MessagingActions_1 = require("../Actions/MessagingActions");
var MessagingService_1 = require("../Services/MessagingService");
var MessagingListenerComponent = (function (_super) {
    __extends(MessagingListenerComponent, _super);
    function MessagingListenerComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MessagingListenerComponent.prototype.componentDidMount = function () {
        var oneSignal = window.oneSignal;
        var actions = this.props.actions;
        oneSignal.tokenChangeHandler = actions.setToken;
        oneSignal.pushHandler = actions.processPushMessage;
    };
    MessagingListenerComponent.prototype.render = function () {
        return <div />;
    };
    return MessagingListenerComponent;
}(React.Component));
var mapDispatchToProps = function (dispatch, _a) {
    var context = _a.context;
    return ({
        actions: new MessagingActions_1.MessagingActions(MessagingService_1.MessagingService, context.messaging, dispatch)
    });
};
exports.MessagingListener = react_redux_1.connect(null, mapDispatchToProps)(MessagingListenerComponent);
