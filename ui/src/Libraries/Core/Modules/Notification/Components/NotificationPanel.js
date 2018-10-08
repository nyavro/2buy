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
var NotificationActions_1 = require("../Actions/NotificationActions");
var NotificationSystem = require("react-notification-system");
var NotificationPanel = (function (_super) {
    __extends(NotificationPanel, _super);
    function NotificationPanel() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleRef = function (notificationSystem) {
            _this.notificationSystem = notificationSystem;
        };
        return _this;
    }
    NotificationPanel.prototype.componentWillReceiveProps = function (props) {
        var _this = this;
        props.notifications.forEach(function (item) {
            _this.notificationSystem.addNotification(item);
            props.actions.removeNotification(item.localId);
        });
    };
    NotificationPanel.prototype.render = function () {
        return <NotificationSystem ref={this.handleRef}/>;
    };
    return NotificationPanel;
}(React.Component));
var mapDispatchToProps = function (dispatch) { return ({
    actions: new NotificationActions_1.NotificationActions(dispatch)
}); };
var mapStateToProps = function (state) { return ({ notifications: state.notification.list }); };
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(NotificationPanel);
