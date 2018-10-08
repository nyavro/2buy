import * as React from 'react';
import {IOrderRequestView} from '../Models';
import {IMixedProps} from 'Libraries/Core/Models';
import {Button, Card, CardBody, CardSubtitle, CardTitle} from 'reactstrap';
import * as i18n from 'i18next';

interface IProps extends IMixedProps {
    item: IOrderRequestView;
    onViewOrder: (orderId:string) => () => void;
    onCancel: (orderRequestId:string) => () => void;
}

export const OrderRequestListItem = ({item: {id, car, date, dayPeriod, orderId}, i18n, onViewOrder, onCancel}: IProps) => {
    return <Card className="orderRequestPanel">
        <CardBody>
            <CardTitle>
                {car.manufacturer}
            </CardTitle>
            <CardSubtitle>
                {car.model}
            </CardSubtitle>
            <div>
                <div>{date}</div>
                <div>{i18n.t(`Core:DayPeriod.${dayPeriod}`)}</div>
                <div>{orderId ? i18n.t('OrderRequest:Status.providerSelected') : i18n.t('OrderRequest:Status.selectingProvider')}</div>
            </div>
            <div className="actions">
                <Button outline color="warning" onClick={onCancel(id)}>{i18n.t('OrderRequest:Action.cancel')}</Button>
                {
                    <Button outline color="success" onClick={onViewOrder(orderId)}>{i18n.t('OrderRequest:Action.viewOrder')}</Button>
                }
            </div>
            <div className="sideActions">
            </div>
        </CardBody>

    </Card>;
};