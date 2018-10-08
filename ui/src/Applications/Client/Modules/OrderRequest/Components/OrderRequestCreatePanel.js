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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
exports.__esModule = true;
var lodash_1 = require("lodash");
var React = require("react");
var _1 = require("react-i18next/");
var DateUtils_1 = require("Libraries/Core/Utils/DateUtils");
var Enums_1 = require("Libraries/Core/Enums");
var RouterConsts_1 = require("Applications/Client/RouterConsts");
var reactstrap_1 = require("reactstrap");
var react_widgets_1 = require("react-widgets");
var CustomSelect_1 = require("Libraries/Components/CustomSelect");
var OrderRequestCreatePanelComponent = (function (_super) {
    __extends(OrderRequestCreatePanelComponent, _super);
    function OrderRequestCreatePanelComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.handleCreateRequest = function () {
            var _a = _this.props, actions = _a.actions, notificationActions = _a.notificationActions, i18n = _a.i18n;
            actions
                .create(_this.state.orderRequest)
                .then(function () {
                notificationActions.createNotification({
                    title: i18n.t('OrderRequest:Notification.create.success.title'),
                    message: i18n.t('OrderRequest:Notification.create.success.message'),
                    level: 'info'
                });
                _this.props.actions.redirect(RouterConsts_1.ROUTES.ORDER_REQUEST.LIST);
            }, function () { return notificationActions.createNotification({
                message: i18n.t('OrderRequest:Notification.create.error.message'),
                title: i18n.t('OrderRequest:Notification.create.error.title'),
                level: 'error'
            }); });
        };
        _this.handleDistrictChange = function (districtId) {
            _this.setState({ orderRequest: __assign({}, _this.state.orderRequest, { districtId: districtId }) });
        };
        _this.handleOperationChange = function (operationId) {
            _this.setState({ orderRequest: __assign({}, _this.state.orderRequest, { operationIds: [operationId] }) });
        };
        _this.handleDateChange = function (_, dateStr) {
            _this.setState({ orderRequest: __assign({}, _this.state.orderRequest, { date: DateUtils_1.convert(dateStr, DateUtils_1.dateFormat, DateUtils_1.serverFormat) }) });
        };
        _this.handleDayPeriodChange = function (dayPeriod) {
            _this.setState({ orderRequest: __assign({}, _this.state.orderRequest, { dayPeriod: dayPeriod }) });
        };
        _this.handleTest = function () {
            _this.props.notificationActions.createNotification({
                title: 'TESt',
                message: 'test test test!!!',
                level: 'info'
            });
        };
        _this.state = {
            orderRequest: {
                carId: props.carId,
                dayPeriod: Enums_1.EDayPeriod.EVENING,
                operationIds: [],
                districtId: props.districts.content[0] && props.districts.content[0].id || null,
                date: DateUtils_1.getToday()
            }
        };
        return _this;
    }
    OrderRequestCreatePanelComponent.prototype.render = function () {
        var _a = this.props, districts = _a.districts, operations = _a.operations, i18n = _a.i18n;
        var districtsOptions = districts && districts.content || [];
        var operationsOptions = operations && operations.content || [];
        var dayPeriods = Object
            .keys(Enums_1.EDayPeriod)
            .map(function (item) { return ({ id: item, name: i18n.t("Core:DayPeriod." + item) }); });
        var isInvalid = lodash_1.isEmpty(this.state.orderRequest.operationIds);
        return (<reactstrap_1.Form className="orderRequestEdit">
                <div className="title">
                    {i18n.t('OrderRequest:Create.title')}
                </div>
                <reactstrap_1.FormGroup>
                    <reactstrap_1.Label for="districtSelect">{i18n.t('OrderRequest:Create.district.label')}</reactstrap_1.Label>
                    <CustomSelect_1.CustomSelect onChange={this.handleDistrictChange} options={districtsOptions} placeholder={i18n.t('OrderRequest:Create.district.placeholder')}/>
                </reactstrap_1.FormGroup>
                <reactstrap_1.FormGroup>
                    <reactstrap_1.Label for="operationSelect">{i18n.t('OrderRequest:Create.operation.label')}</reactstrap_1.Label>
                    <CustomSelect_1.CustomSelect onChange={this.handleOperationChange} options={operationsOptions} placeholder={i18n.t('OrderRequest:Create.operation.placeholder')}/>
                </reactstrap_1.FormGroup>
                <reactstrap_1.FormGroup>
                    <reactstrap_1.Label for="date">{i18n.t('OrderRequest:Create.date.label')}</reactstrap_1.Label>
                    <react_widgets_1.DateTimePicker onChange={this.handleDateChange} format={DateUtils_1.dateFormat} min={new Date()} time={false} placeholder={i18n.t('OrderRequest:Create.date.placeholder')}/>
                </reactstrap_1.FormGroup>
                <reactstrap_1.FormGroup>
                    <reactstrap_1.Label for="periodSelect">{i18n.t('OrderRequest:Create.period.label')}</reactstrap_1.Label>
                    <CustomSelect_1.CustomSelect onChange={this.handleDayPeriodChange} options={dayPeriods} placeholder={i18n.t('OrderRequest:Create.period.placeholder')}/>
                </reactstrap_1.FormGroup>
                <reactstrap_1.Button onClick={this.handleCreateRequest} disabled={isInvalid}>
                    {i18n.t('OrderRequest:Action.requestService')}
                </reactstrap_1.Button>
                <reactstrap_1.Button onClick={this.handleTest}>
                    Test
                </reactstrap_1.Button>
             </reactstrap_1.Form>);
    };
    return OrderRequestCreatePanelComponent;
}(React.Component));
exports.OrderRequestCreatePanelComponent = OrderRequestCreatePanelComponent;
exports.OrderRequestCreatePanel = _1.translate('OrderRequest')(OrderRequestCreatePanelComponent);
