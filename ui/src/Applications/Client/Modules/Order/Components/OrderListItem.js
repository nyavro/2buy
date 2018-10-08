"use strict";
exports.__esModule = true;
var React = require("react");
var reactstrap_1 = require("reactstrap");
exports.OrderListItem = function (_a) {
    var _b = _a.item, date = _b.date, providerAddress = _b.providerAddress, providerName = _b.providerName, car = _b.car;
    return <reactstrap_1.Card>
        <reactstrap_1.CardBody>
            <reactstrap_1.CardTitle>
                {providerName || 'Исполнитель'}
            </reactstrap_1.CardTitle>
            <reactstrap_1.CardSubtitle>
                {providerAddress || 'Депутатская, 6, подъезд 2'}
            </reactstrap_1.CardSubtitle>
            <h1>{car.manufacturer}</h1>
            <div className="order-date">{date || '1 сентября, 18:30'}</div>
        </reactstrap_1.CardBody>
    </reactstrap_1.Card>;
};
