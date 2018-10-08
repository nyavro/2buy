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
var OrderRequestActions_1 = require("../Actions/OrderRequestActions");
var OrderRequestService_1 = require("../Services/OrderRequestService");
var DictionaryActions_1 = require("Libraries/Core/Modules/Dictionary/Actions/DictionaryActions");
var DictionaryService_1 = require("Libraries/Core/Modules/Dictionary/Services/DictionaryService");
var Enums_1 = require("Libraries/Core/Enums");
var OrderRequestCreatePanel_1 = require("../Components/OrderRequestCreatePanel");
var NotificationActions_1 = require("Libraries/Core/Modules/Notification/Actions/NotificationActions");
var react_spinners_1 = require("react-spinners");
require('../assets/OrderRequest.styl');
require('../assets/nls/ru/OrderRequest.json');
var OrderRequestCreatePage = (function (_super) {
    __extends(OrderRequestCreatePage, _super);
    function OrderRequestCreatePage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OrderRequestCreatePage.prototype.componentWillMount = function () {
        if (this.props.districtsRequest.status === Enums_1.ELoadingStatus.IDLE) {
            this.props.dictionaryActions.getDistricts();
        }
        if (this.props.operationsRequest.status === Enums_1.ELoadingStatus.IDLE) {
            this.props.dictionaryActions.getOperations();
        }
    };
    OrderRequestCreatePage.prototype.render = function () {
        var _a = this.props, districtsRequest = _a.districtsRequest, operationsRequest = _a.operationsRequest, carId = _a.match.params.carId;
        return (lodash_1.some([districtsRequest, operationsRequest], function (_a) {
            var status = _a.status;
            return (status === Enums_1.ELoadingStatus.LOADING);
        })) ?
            <react_spinners_1.SyncLoader className="spinner" loading/> :
            (<OrderRequestCreatePanel_1.OrderRequestCreatePanel actions={this.props.actions} notificationActions={this.props.notificationActions} districts={districtsRequest.data} operations={operationsRequest.data} carId={carId}/>);
    };
    return OrderRequestCreatePage;
}(React.Component));
var mapDispatchToProps = function (dispatch, _a) {
    var context = _a.context;
    return ({
        actions: new OrderRequestActions_1.OrderRequestActions(OrderRequestService_1.OrderRequestService, context.orderRequest, dispatch),
        notificationActions: new NotificationActions_1.NotificationActions(dispatch),
        dictionaryActions: new DictionaryActions_1.DictionaryActions(DictionaryService_1.DictionaryService, context.dictionary, dispatch)
    });
};
var mapStateToProps = function (state) {
    return {
        districtsRequest: state.dictionary.districts,
        operationsRequest: state.dictionary.operations
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(OrderRequestCreatePage);
