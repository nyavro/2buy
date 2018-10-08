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
var OrderRequestActions_1 = require("../Actions/OrderRequestActions");
var OrderRequestService_1 = require("../Services/OrderRequestService");
var Enums_1 = require("Libraries/Core/Enums");
var OrderRequestsList_1 = require("../Components/OrderRequestsList");
var react_spinners_1 = require("react-spinners");
require('../assets/OrderRequest.styl');
require('../assets/nls/ru/OrderRequest.json');
var OrdersRequestsListPage = (function (_super) {
    __extends(OrdersRequestsListPage, _super);
    function OrdersRequestsListPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrdersRequestsListPage.prototype.componentWillMount = function () {
        this.props.actions.list();
    };
    OrdersRequestsListPage.prototype.render = function () {
        var _a = this.props, list = _a.list, actions = _a.actions;
        return (list.status === Enums_1.ELoadingStatus.SUCCESS) ?
            <OrderRequestsList_1.OrderRequestsList actions={actions} list={list.data}/> :
            <react_spinners_1.SyncLoader className="spinner" loading/>;
    };
    return OrdersRequestsListPage;
}(React.Component));
var mapDispatchToProps = function (dispatch, _a) {
    var context = _a.context;
    return ({
        actions: new OrderRequestActions_1.OrderRequestActions(OrderRequestService_1.OrderRequestService, context.orderRequest, dispatch)
    });
};
var mapStateToProps = function (state) {
    return {
        list: state.orderRequest.list
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(OrdersRequestsListPage);
