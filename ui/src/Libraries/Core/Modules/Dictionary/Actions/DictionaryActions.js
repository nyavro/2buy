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
var Actions_1 = require("Libraries/Core/Actions");
var ActionTypes_1 = require("./ActionTypes");
var redux_actions_1 = require("redux-actions");
var DictionaryActions = (function (_super) {
    __extends(DictionaryActions, _super);
    function DictionaryActions() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.getDistricts = function () {
            _this.dispatch(redux_actions_1.createAction(ActionTypes_1.DICTIONARY_ACTIONS.DISTRICT_LIST_BEGIN)());
            _this.service.getDistricts().then(function (data) { return _this.dispatch(redux_actions_1.createAction(ActionTypes_1.DICTIONARY_ACTIONS.DISTRICT_LIST_SUCCESS)(data)); }, function (error) { return _this.dispatch(redux_actions_1.createAction(ActionTypes_1.DICTIONARY_ACTIONS.DISTRICT_LIST_FAILURE)(error)); });
        };
        _this.getOperations = function () {
            _this.dispatch(redux_actions_1.createAction(ActionTypes_1.DICTIONARY_ACTIONS.OPERATION_LIST_BEGIN)());
            _this.service.getOperations().then(function (data) { return _this.dispatch(redux_actions_1.createAction(ActionTypes_1.DICTIONARY_ACTIONS.OPERATION_LIST_SUCCESS)(data)); }, function (error) { return _this.dispatch(redux_actions_1.createAction(ActionTypes_1.DICTIONARY_ACTIONS.OPERATION_LIST_FAILURE)(error)); });
        };
        return _this;
    }
    return DictionaryActions;
}(Actions_1.LoginRedirectActions));
exports.DictionaryActions = DictionaryActions;
