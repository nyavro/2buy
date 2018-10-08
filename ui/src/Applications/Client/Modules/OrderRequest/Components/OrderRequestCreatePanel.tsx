import {isEmpty} from 'lodash';
import * as React from 'react';
import {translate} from 'react-i18next/';
import {OrderRequestActions} from '../Actions/OrderRequestActions';
import {IDictionaryItem, IDistrict, IOperation} from 'Libraries/Core/Modules/Dictionary/Models';
import {IItemsList, IMixedProps} from 'Libraries/Core/Models';
import {IOrderRequest} from '../Models';
import {convert, dateFormat, getToday, serverFormat} from 'Libraries/Core/Utils/DateUtils';
import {EDayPeriod} from 'Libraries/Core/Enums';
import {ROUTES} from 'Applications/Client/RouterConsts';
import {NotificationActions} from 'Libraries/Core/Modules/Notification/Actions/NotificationActions';
import {Button, CustomInput, Form, FormGroup, Label} from 'reactstrap';
import {ChangeEvent} from 'react';
import {DateTimePicker} from 'react-widgets';
import {CustomSelect} from 'Libraries/Components/CustomSelect';

interface IProps extends IMixedProps {
    actions: OrderRequestActions;
    notificationActions: NotificationActions;
    districts: IItemsList<IDistrict>;
    operations: IItemsList<IOperation>;
    carId: string;
}

interface IState {
    orderRequest?: IOrderRequest
}

export class OrderRequestCreatePanelComponent extends React.Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state = {
            orderRequest: {
                carId: props.carId,
                dayPeriod: EDayPeriod.EVENING,
                operationIds: [],
                districtId: props.districts.content[0] && props.districts.content[0].id || null,
                date: getToday()
            }
        }
    }

    handleCreateRequest = () => {
        const {actions, notificationActions, i18n} = this.props;
        actions
            .create(this.state.orderRequest)
            .then(
                () => {
                    notificationActions.createNotification({
                        title: i18n.t('OrderRequest:Notification.create.success.title'),
                        message: i18n.t('OrderRequest:Notification.create.success.message'),
                        level: 'info'
                    });
                    this.props.actions.redirect(ROUTES.ORDER_REQUEST.LIST);
                },
                () => notificationActions.createNotification({
                    message: i18n.t('OrderRequest:Notification.create.error.message'),
                    title: i18n.t('OrderRequest:Notification.create.error.title'),
                    level: 'error'
                })
            );
    };

    handleDistrictChange = (districtId: string) => {
        this.setState({orderRequest: {...this.state.orderRequest, districtId}});
    };

    handleOperationChange = (operationId: string) => {
        this.setState({orderRequest: {...this.state.orderRequest, operationIds: [operationId]}});
    };

    handleDateChange = (_: Date, dateStr: string) => {
        this.setState({orderRequest: {...this.state.orderRequest, date: convert(dateStr, dateFormat, serverFormat)}});
    };

    handleDayPeriodChange = (dayPeriod: string) => {
        this.setState({orderRequest: {...this.state.orderRequest, dayPeriod: dayPeriod as EDayPeriod}});
    };

    handleTest = () => {
        this.props.notificationActions.createNotification({
            title: 'TESt',
            message: 'test test test!!!',
            level: 'info'
        });
    };

    render() {
        const {districts, operations, i18n} = this.props;
        const districtsOptions = districts && districts.content || [];
        const operationsOptions = operations && operations.content || [];
        const dayPeriods = Object
            .keys(EDayPeriod)
            .map((item) => ({id: item, name: i18n.t(`Core:DayPeriod.${item}`)}));
        const isInvalid = isEmpty(this.state.orderRequest.operationIds);
        return (
            <Form className="orderRequestEdit">
                <div className="title">
                    {i18n.t('OrderRequest:Create.title')}
                </div>
                <FormGroup>
                    <Label for="districtSelect">{i18n.t('OrderRequest:Create.district.label')}</Label>
                    <CustomSelect
                        onChange={this.handleDistrictChange}
                        options={districtsOptions}
                        placeholder={i18n.t('OrderRequest:Create.district.placeholder')}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="operationSelect">{i18n.t('OrderRequest:Create.operation.label')}</Label>
                    <CustomSelect
                        onChange={this.handleOperationChange}
                        options={operationsOptions}
                        placeholder={i18n.t('OrderRequest:Create.operation.placeholder')}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="date">{i18n.t('OrderRequest:Create.date.label')}</Label>
                    <DateTimePicker
                        onChange={this.handleDateChange}
                        format={dateFormat}
                        min={new Date()}
                        time={false}
                        placeholder={i18n.t('OrderRequest:Create.date.placeholder')}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="periodSelect">{i18n.t('OrderRequest:Create.period.label')}</Label>
                    <CustomSelect
                        onChange={this.handleDayPeriodChange}
                        options={dayPeriods}
                        placeholder={i18n.t('OrderRequest:Create.period.placeholder')}
                    />
                </FormGroup>
                <Button
                    onClick={this.handleCreateRequest}
                    disabled={isInvalid}>
                    {i18n.t('OrderRequest:Action.requestService')}
                </Button>
                <Button onClick={this.handleTest}>
                    Test
                </Button>
             </Form>
        );
    }
}

export const OrderRequestCreatePanel = translate('OrderRequest')(OrderRequestCreatePanelComponent);