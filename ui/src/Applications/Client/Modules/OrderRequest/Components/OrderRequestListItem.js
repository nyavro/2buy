"use strict";
exports.__esModule = true;
var React = require("react");
var reactstrap_1 = require("reactstrap");
exports.OrderRequestListItem = function (_a) {
    var _b = _a.item, id = _b.id, car = _b.car, date = _b.date, dayPeriod = _b.dayPeriod, orderId = _b.orderId, i18n = _a.i18n, onViewOrder = _a.onViewOrder, onCancel = _a.onCancel;
    return <reactstrap_1.Card className="orderRequestPanel">
        <reactstrap_1.CardBody>
            <reactstrap_1.CardTitle>
                {car.manufacturer}
            </reactstrap_1.CardTitle>
            <reactstrap_1.CardSubtitle>
                {car.model}
            </reactstrap_1.CardSubtitle>
            <div>
                <div>{date}</div>
                <div>{i18n.t("Core:DayPeriod." + dayPeriod)}</div>
                <div>{orderId ? i18n.t('OrderRequest:Status.providerSelected') : i18n.t('OrderRequest:Status.selectingProvider')}</div>
            </div>
            <div className="actions">
                <reactstrap_1.Button outline color="warning" onClick={onCancel(id)}>{i18n.t('OrderRequest:Action.cancel')}</reactstrap_1.Button>
                {<reactstrap_1.Button outline color="success" onClick={onViewOrder(orderId)}>{i18n.t('OrderRequest:Action.viewOrder')}</reactstrap_1.Button>}
            </div>
            <div className="sideActions">
            </div>
        </reactstrap_1.CardBody>

    </reactstrap_1.Card>;
};
