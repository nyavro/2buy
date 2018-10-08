import * as React from 'react';
import {some} from 'lodash';
import {connect, Dispatch} from 'react-redux';
import {OrderRequestActions} from '../Actions/OrderRequestActions';
import {OrderRequestService} from '../Services/OrderRequestService';
import {IOrderModule} from 'Applications/Client/Modules/Order/Models';
import {DictionaryActions} from 'Libraries/Core/Modules/Dictionary/Actions/DictionaryActions';
import {DictionaryService} from 'Libraries/Core/Modules/Dictionary/Services/DictionaryService';
import {IAsyncData, IItemsList} from 'Libraries/Core/Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {IDictionaryModule, IDistrict, IOperation} from 'Libraries/Core/Modules/Dictionary/Models';
import {OrderRequestCreatePanel} from '../Components/OrderRequestCreatePanel';
import {NotificationActions} from 'Libraries/Core/Modules/Notification/Actions/NotificationActions';
import {RouteComponentProps} from 'react-router';
import {IClientAppContext} from '../../../Models';
import {SyncLoader} from 'react-spinners';
require('../assets/OrderRequest.styl');
require('../assets/nls/ru/OrderRequest.json');

interface IOwnProps {
    context: IClientAppContext;
}

interface IDispatchProps {
    actions: OrderRequestActions;
    notificationActions: NotificationActions;
    dictionaryActions: DictionaryActions;
}

interface IStateProps {
    districtsRequest: IAsyncData<IItemsList<IDistrict>>;
    operationsRequest: IAsyncData<IItemsList<IOperation>>;
}

interface ICarRouteProps {
    carId?: string;
}

type TProps = IOwnProps & IDispatchProps & IStateProps & RouteComponentProps<ICarRouteProps>;

class OrderRequestCreatePage extends React.Component<TProps, {}> {

    componentWillMount() {
        if (this.props.districtsRequest.status === ELoadingStatus.IDLE) {
            this.props.dictionaryActions.getDistricts();
        }
        if (this.props.operationsRequest.status === ELoadingStatus.IDLE) {
            this.props.dictionaryActions.getOperations();
        }
    }

    render() {
        const {districtsRequest, operationsRequest, match: {params: {carId}}} = this.props;
        return (some([districtsRequest, operationsRequest], ({status}) => (status === ELoadingStatus.LOADING))) ?
            <SyncLoader className="spinner" loading/>:
            (<OrderRequestCreatePanel
                actions={this.props.actions}
                notificationActions={this.props.notificationActions}
                districts={districtsRequest.data}
                operations={operationsRequest.data}
                carId={carId}
            />)
    }
}

const mapDispatchToProps = (dispatch: Dispatch<{}>, {context}: IOwnProps) => ({
    actions: new OrderRequestActions(OrderRequestService, context.orderRequest, dispatch),
    notificationActions: new NotificationActions(dispatch),
    dictionaryActions: new DictionaryActions(DictionaryService, context.dictionary, dispatch)
});

const mapStateToProps = (state: IOrderModule & IDictionaryModule) => {
    return {
        districtsRequest: state.dictionary.districts,
        operationsRequest: state.dictionary.operations,
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderRequestCreatePage);