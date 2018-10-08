"use strict";
exports.__esModule = true;
var React = require("react");
var react_i18next_1 = require("react-i18next");
var Enums_1 = require("Libraries/Core/Enums");
var md_1 = require("react-icons/md");
var reactstrap_1 = require("reactstrap");
require('../assets/styles/Critical.styl');
require('../assets/nls/ru/Critical.json');
exports.CriticalComponent = function (props) {
    var i18n = props.i18n, operationError = props.match.params.operationError;
    return <div className="critical-page">
        <div className="message">
            <md_1.MdError className="svg"/>
            <div>{i18n.t("Critical:" + operationError)}</div>
            {operationError !== Enums_1.EOperationError.accessDenied && <div>
                <div>{i18n.t('Critical:tryLater')}</div>
                <reactstrap_1.Button onClick={props.history.goBack}>{i18n.t('Critical:repeat')}</reactstrap_1.Button>
            </div>}
        </div>
    </div>;
};
exports.CriticalPage = react_i18next_1.translate('Critical')(exports.CriticalComponent);
