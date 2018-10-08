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
var OrderActions_1 = require("../Actions/OrderActions");
var OrderService_1 = require("../Services/OrderService");
var Enums_1 = require("Libraries/Core/Enums");
var OrdersList_1 = require("../Components/OrdersList");
var react_spinners_1 = require("react-spinners");
require('../assets/Order.styl');
require('../assets/nls/ru/Order.json');
var OrdersListPage = (function (_super) {
    __extends(OrdersListPage, _super);
    function OrdersListPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrdersListPage.prototype.componentWillMount = function () {
        this.props.actions.list();
    };
    OrdersListPage.prototype.render = function () {
        var _a = this.props, list = _a.list, actions = _a.actions;
        return (list.status === Enums_1.ELoadingStatus.SUCCESS) ?
            <OrdersList_1.OrdersList actions={actions} list={list.data}/> :
            <react_spinners_1.SyncLoader className="spinner" loading/>;
    };
    return OrdersListPage;
}(React.Component));
var mapDispatchToProps = function (dispatch, _a) {
    var context = _a.context;
    return ({
        actions: new OrderActions_1.OrderActions(OrderService_1.OrderService, context.order, dispatch)
    });
};
var mapStateToProps = function (state) {
    return {
        list: state.order.list
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(OrdersListPage);
