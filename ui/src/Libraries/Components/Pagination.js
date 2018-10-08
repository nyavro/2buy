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
var i18 = require("i18next");
var React = require("react");
var Pagination = (function (_super) {
    __extends(Pagination, _super);
    function Pagination() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handlePrev = function () {
            var _a = _this.props, page = _a.page, onPageChange = _a.onPageChange;
            if (page > 0) {
                onPageChange(page - 1);
            }
        };
        _this.handleNext = function () {
            var _a = _this.props, page = _a.page, onPageChange = _a.onPageChange, hasNext = _a.hasNext;
            if (hasNext) {
                onPageChange(page + 1);
            }
        };
        return _this;
    }
    Pagination.prototype.render = function () {
        var _a = this.props, page = _a.page, hasNext = _a.hasNext;
        return (<div className="pagination">
                <nav className="navigation">
                    <ul>
                        <li onClick={this.handlePrev}>
                            <a aria-label={i18.t('Common:Action.PREV')} title={i18.t('Common:Action.PREV')} className={page === 1 ? ' disabled' : ''}>
                                <img src="images/common/arrow.svg" alt={i18.t('Common:Action.PREV')} className="arrow left"/>
                            </a>
                        </li>
                        <li>{this.props.page + 1}</li>
                        <li onClick={this.handleNext}>
                            <a onClick={this.handleNext} aria-label={i18.t('Common:Action.NEXT')} title={i18.t('Common:Action.NEXT')} className={hasNext ? '' : 'disabled'}>
                                <img src="images/common/arrow.svg" alt={i18.t('Common:Action.NEXT')} className="arrow right"/>
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>);
    };
    return Pagination;
}(React.Component));
exports.Pagination = Pagination;
