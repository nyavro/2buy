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
var Enums_1 = require("Libraries/Core/Enums");
var react_spinners_1 = require("react-spinners");
var GroupActions_1 = require("../Actions/GroupActions");
var GroupService_1 = require("../Services/GroupService");
require('../assets/Order.styl');
require('../assets/nls/ru/Order.json');
var GroupListPage = (function (_super) {
    __extends(GroupListPage, _super);
    function GroupListPage() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleGroupSelect = function (id) { return function () {
            console.log(id);
        }; };
        _this.renderGroups = function () {
            var list = _this.props.list;
            return (list && list.data && list.data.items || []).map(function (_a, index) {
                var id = _a.id, name = _a.name;
                return <div key={index} onClick={_this.handleGroupSelect(id)}>{name}</div>;
            });
        };
        return _this;
    }
    GroupListPage.prototype.componentWillMount = function () {
        this.props.actions.list({ count: 12, offset: 0, hasNextPage: false });
    };
    GroupListPage.prototype.render = function () {
        var list = this.props.list;
        return (list.status === Enums_1.ELoadingStatus.SUCCESS) ?
            <div>{this.renderGroups()}</div> :
            <react_spinners_1.SyncLoader className="spinner" loading/>;
    };
    return GroupListPage;
}(React.Component));
var mapDispatchToProps = function (dispatch, _a) {
    var context = _a.context;
    return ({
        actions: new GroupActions_1.GroupActions(GroupService_1.GroupService, context.group, dispatch)
    });
};
var mapStateToProps = function (state) {
    return {
        list: state.group.list
    };
};
exports["default"] = react_redux_1.connect(mapStateToProps, mapDispatchToProps)(GroupListPage);
