import * as React from 'react';
import {translate} from 'react-i18next/';
import {IOrderRequestActions, IOrderRequestView} from '../Models';
import {IMixedProps} from 'Libraries/Core/Models';
import {SyncLoader} from 'react-spinners';
import {Button, Card, CardBody, CardSubtitle, CardTitle} from 'reactstrap';

interface IProps extends IMixedProps {
    actions: IOrderRequestActions;
    orderRequest: IOrderRequestView;
}

class OrderRequestViewPanelComponent extends React.Component<IProps, {}> {

    handleCancel = () => {
        const {orderRequest, actions} = this.props;
        actions.cancel(orderRequest.id);
    };

    render() {
        const {i18n, orderRequest} = this.props;
        return (
            <Card>
                <CardBody>
                    <CardTitle>
                        {i18n.t('OrderRequest:View.title')}
                    </CardTitle>
                    <CardSubtitle>
                        {orderRequest.district}
                    </CardSubtitle>
                    <div>
                        {orderRequest.car.manufacturer}
                    </div>
                    <div>{orderRequest.date}</div>
                    <div>{orderRequest.dayPeriod}</div>
                    <div className="row">
                        <SyncLoader className="spinner" loading/>
                        <div>
                            {i18n.t('OrderRequest:View.searchingProvider')}
                        </div>
                    </div>
                </CardBody>
                <Button onClick={this.handleCancel}>
                    {i18n.t('OrderRequest:View.cancel')}
                </Button>
            </Card>
        );
    }
}

export const OrderRequestViewPanel = translate('OrderRequest')(OrderRequestViewPanelComponent);