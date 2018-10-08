import * as React from 'react';
import {IOrderView} from '../Models';
import {IMixedProps} from 'Libraries/Core/Models';
import {Card, CardBody, CardSubtitle, CardText, CardTitle} from 'reactstrap';

interface IProps extends IMixedProps {
    item: IOrderView;
}

export const OrderListItem = ({item: {date, providerAddress, providerName, car}}: IProps) => {
    return <Card>
        <CardBody>
            <CardTitle>
                {providerName || 'Исполнитель'}
            </CardTitle>
            <CardSubtitle>
                {providerAddress || 'Депутатская, 6, подъезд 2'}
            </CardSubtitle>
            <h1>{car.manufacturer}</h1>
            <div className="order-date">{date || '1 сентября, 18:30'}</div>
        </CardBody>
    </Card>;
};