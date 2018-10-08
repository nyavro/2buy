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
var reactstrap_1 = require("reactstrap");
require("./assets/styles/CustomSelect.styl");
var CustomSelect = (function (_super) {
    __extends(CustomSelect, _super);
    function CustomSelect() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = { selected: false };
        _this.handleSelect = function (event) {
            _this.props.onChange(event.target.value);
            _this.setState({ selected: true });
        };
        _this.renderOptions = function () {
            var _a = _this.props, placeholder = _a.placeholder, options = _a.options;
            var res = options.map(function (_a, index) {
                var id = _a.id, name = _a.name;
                return <option className="customOption" value={id} key={index}>{name}</option>;
            });
            !_this.state.selected && res.splice(0, 0, <option className="customOption">{placeholder}</option>);
            return res;
        };
        return _this;
    }
    CustomSelect.prototype.render = function () {
        return <reactstrap_1.CustomInput type="select" onChange={this.handleSelect} className={!this.state.selected && 'notSelected'}>
            {this.renderOptions()}
        </reactstrap_1.CustomInput>;
    };
    return CustomSelect;
}(React.Component));
exports.CustomSelect = CustomSelect;
