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
var OrderListItem_1 = require("./OrderListItem");
var EmptyList_1 = require("Libraries/Components/EmptyList");
var OrdersListComponent = (function (_super) {
    __extends(OrdersListComponent, _super);
    function OrdersListComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            activeOrderId: null
        };
        return _this;
    }
    OrdersListComponent.prototype.render = function () {
        var _a = this.props, i18n = _a.i18n, content = _a.list.content;
        return lodash_1.isEmpty(content) ?
            <EmptyList_1.EmptyList message={i18n.t('Order:List.empty')}/> :
            <div className="orders-list">
                {content.map(function (item, index) {
                return <OrderListItem_1.OrderListItem item={item} i18n={i18n} key={index}/>;
            })}
            </div>;
    };
    return OrdersListComponent;
}(React.Component));
exports.OrdersList = _1.translate('Order')(OrdersListComponent);
