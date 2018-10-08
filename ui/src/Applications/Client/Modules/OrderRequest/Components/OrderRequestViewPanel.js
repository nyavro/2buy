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
var _1 = require("react-i18next/");
var react_spinners_1 = require("react-spinners");
var reactstrap_1 = require("reactstrap");
var OrderRequestViewPanelComponent = (function (_super) {
    __extends(OrderRequestViewPanelComponent, _super);
    function OrderRequestViewPanelComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleCancel = function () {
            var _a = _this.props, orderRequest = _a.orderRequest, actions = _a.actions;
            actions.cancel(orderRequest.id);
        };
        return _this;
    }
    OrderRequestViewPanelComponent.prototype.render = function () {
        var _a = this.props, i18n = _a.i18n, orderRequest = _a.orderRequest;
        return (<reactstrap_1.Card>
                <reactstrap_1.CardBody>
                    <reactstrap_1.CardTitle>
                        {i18n.t('OrderRequest:View.title')}
                    </reactstrap_1.CardTitle>
                    <reactstrap_1.CardSubtitle>
                        {orderRequest.district}
                    </reactstrap_1.CardSubtitle>
                    <div>
                        {orderRequest.car.manufacturer}
                    </div>
                    <div>{orderRequest.date}</div>
                    <div>{orderRequest.dayPeriod}</div>
                    <div className="row">
                        <react_spinners_1.SyncLoader className="spinner" loading/>
                        <div>
                            {i18n.t('OrderRequest:View.searchingProvider')}
                        </div>
                    </div>
                </reactstrap_1.CardBody>
                <reactstrap_1.Button onClick={this.handleCancel}>
                    {i18n.t('OrderRequest:View.cancel')}
                </reactstrap_1.Button>
            </reactstrap_1.Card>);
    };
    return OrderRequestViewPanelComponent;
}(React.Component));
exports.OrderRequestViewPanel = _1.translate('OrderRequest')(OrderRequestViewPanelComponent);
