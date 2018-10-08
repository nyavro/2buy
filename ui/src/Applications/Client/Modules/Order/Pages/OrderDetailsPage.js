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
var lodash_1 = require("lodash");
var react_redux_1 = require("react-redux");
var OrderActions_1 = require("../Actions/OrderActions");
var Enums_1 = require("Libraries/Core/Enums");
var OrderService_1 = require("../Services/OrderService");
var OrderListItem_1 = require("Applications/Client/Modules/Order/Components/OrderListItem");
var react_spinners_1 = require("react-spinners");
require('../assets/Order.styl');
require('../assets/nls/ru/Order.json');
var OrderDetailsPage = (function (_super) {
    __extends(OrderDetailsPage, _super);
    function OrderDetailsPage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrderDetailsPage.prototype.componentWillMount = function () {
        var _a = this.props, _b = _a.orderRequest, status = _b.status, data = _b.data, orderId = _a.match.params.orderId;
        if (status === Enums_1.ELoadingStatus.IDLE || !data || data.id !== orderId) {
            this.props.actions.getById(orderId);
        }
    };
    OrderDetailsPage.prototype.render = function () {
        var _a = this.props, orderRequest = _a.orderRequest, i18n = _a.i18n;
        return (lodash_1.some([orderRequest], function (_a) {
            var status = _a.status;
            return (status === Enums_1.ELoadingStatus.LOADING);
        })) ?
            <react_spinners_1.SyncLoader className="spinner" loading/> :
            (<OrderListItem_1.OrderListItem item={orderRequest.data} i18n={i18n}/>);
    };
    return OrderDetailsPage;
}(React.Component));
var mapDispatchToProps = function (dispatch, _a) {
    var context = _a.context;
    return ({
        actions: new OrderActions_1.OrderActions(OrderService_1.OrderService, context.order, dispatch)
    });
};
var mapStateToProps = function (state) {
    return {
        orderRequest: state.order.currentOrder
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(OrderDetailsPage);
