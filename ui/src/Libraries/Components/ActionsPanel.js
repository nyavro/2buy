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
var ActionsPanel = (function (_super) {
    __extends(ActionsPanel, _super);
    function ActionsPanel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ActionsPanel.prototype.render = function () {
        return (<div className="header">
                <h4>{this.props.title}</h4>
                <div className="actions-panel">
                    {(this.props.actions || []).map(function (action, index) { return (<reactstrap_1.Button key={index} className={action.className || ''} onClick={action.handler} disabled={!action.enabled}>
                                {action.title}
                            </reactstrap_1.Button>); })}
                </div>
            </div>);
    };
    return ActionsPanel;
}(React.Component));
exports.ActionsPanel = ActionsPanel;
