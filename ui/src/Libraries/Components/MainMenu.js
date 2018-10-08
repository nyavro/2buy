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
var md_1 = require("react-icons/md");
var reactstrap_1 = require("reactstrap");
var react_responsive_1 = require("react-responsive");
require('./assets/styles/MainMenu.styl');
var MainMenu = (function (_super) {
    __extends(MainMenu, _super);
    function MainMenu() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            showSidebar: false
        };
        _this.handleSidebarControlButton = function () {
            _this.setState({ showSidebar: !_this.state.showSidebar });
        };
        _this.renderMenuItems = function () {
            var _a = _this.props, i18n = _a.i18n, menuItems = _a.menuItems;
            return menuItems.map(function (_a, index) {
                var link = _a.link, i18nKey = _a.i18nKey, Icon = _a.Icon;
                return (<reactstrap_1.NavItem key={index}>
                <reactstrap_1.NavLink id={"navItem-" + name + "-" + index} className="text-uppercase" href={link}>
                    <Icon className="menuIcon"/>
                    <span className="menuItem">{i18n.t("" + i18nKey)}</span>
                </reactstrap_1.NavLink>
            </reactstrap_1.NavItem>);
            });
        };
        return _this;
    }
    MainMenu.prototype.render = function () {
        return (<div className="mainMenu">
                <div>
                    <react_responsive_1["default"] minWidth={992}>
                        <reactstrap_1.Nav className="col-sm-12 col-md-6 col-md-offset-3">
                            {this.renderMenuItems()}
                        </reactstrap_1.Nav>
                    </react_responsive_1["default"]>
                    <react_responsive_1["default"] maxWidth={992}>
                        <reactstrap_1.Nav className="col-sm-12 col-md-6 col-md-offset-3">
                            <reactstrap_1.NavItem>
                                <reactstrap_1.Button outline onClick={this.handleSidebarControlButton}>
                                    <md_1.MdClearAll size={25}/>
                                </reactstrap_1.Button>
                            </reactstrap_1.NavItem>
                        </reactstrap_1.Nav>
                    </react_responsive_1["default"]>
                </div>
                <react_responsive_1["default"] maxWidth={992}>
                    <reactstrap_1.Nav className={this.state.showSidebar ? 'cr-sidebar cr-sidebar-open' : 'cr-sidebar'} vertical>
                        <div className="header">
                            <md_1.MdClose onClick={this.handleSidebarControlButton} className="btn"/>
                        </div>
                        {this.renderMenuItems()}
                    </reactstrap_1.Nav>
                </react_responsive_1["default"]>
            </div>);
    };
    return MainMenu;
}(React.Component));
exports.MainMenu = MainMenu;
