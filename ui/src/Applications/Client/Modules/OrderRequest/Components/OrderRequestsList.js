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
var _1 = require("react-i18next/");
var RouterConsts_1 = require("Applications/Client/RouterConsts");
var OrderRequestListItem_1 = require("./OrderRequestListItem");
var EmptyList_1 = require("Libraries/Components/EmptyList");
var OrderRequestsListComponent = (function (_super) {
    __extends(OrderRequestsListComponent, _super);
    function OrderRequestsListComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            activeOrderRequestId: null
        };
        _this.handleViewOrder = function (orderId) { return function () {
            _this.props.actions.redirect(RouterConsts_1.ROUTES.ORDER.DETAILS, { orderId: orderId });
        }; };
        _this.handleCancel = function (orderRequestId) { return function () {
            _this.props.actions.cancel(orderRequestId);
        }; };
        return _this;
    }
    OrderRequestsListComponent.prototype.render = function () {
        var _this = this;
        var _a = this.props, i18n = _a.i18n, content = _a.list.content;
        return lodash_1.isEmpty(content) ?
            <EmptyList_1.EmptyList message={i18n.t('OrderRequest:List.empty')}/> :
            <div className="orderRequestsList">
                {content.map(function (item, index) {
                return <OrderRequestListItem_1.OrderRequestListItem item={item} i18n={i18n} onCancel={_this.handleCancel} onViewOrder={_this.handleViewOrder} key={index}/>;
            })}
            </div>;
    };
    return OrderRequestsListComponent;
}(React.Component));
exports.OrderRequestsList = _1.translate('OrderRequest')(OrderRequestsListComponent);
