import {isEmpty, memoize} from 'lodash';
import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {IAsyncData, IPaginatedItems} from 'Libraries/Core/Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {IGroupContext, IGroupModule, IGroupView} from '../Models';
import {SyncLoader} from 'react-spinners';
import {GroupActions} from "../Actions/GroupActions";
import {GroupService} from "../Services/GroupService";
import {convert, serverFormatFull, timeFormatShort} from "../../../Libraries/Core/Utils/DateUtils";
import {Button, Row} from "reactstrap";

require('../assets/Group.styl');
require('../assets/nls/ru/Order.json');

interface IOwnProps {
    context: IGroupContext;
    onGroupChange: (groupId: string) => void;
}

interface IDispatchProps {
    actions: GroupActions;
}

interface IStateProps {
    list: IAsyncData<IPaginatedItems<IGroupView>>;
}

interface IState {
    activeGroupId?: string;
}

type TProps = IOwnProps & IDispatchProps & IStateProps;

class GroupListPage extends React.Component<TProps, IState> {

    state: IState = {
    };

    componentWillMount() {
        if (isEmpty(this.props.list.data)) {
            console.log("Getting list");
            this.props.actions.list({});
        }
    }

    handleGroupSelect = memoize((id: string) => () => {
        console.log("Group changed: " + id);
        this.setState({activeGroupId: id});
        this.props.onGroupChange(id);
    });

    handleRefresh = () => {
        this.props.actions.list({})
    };

    renderGroups = () => {
        const {list} = this.props;
        const {activeGroupId} = this.state;
        return (list && list.data && list.data.items || []).map(
            ({id, name, lastActivity}, index) => {
                return (
                    <div key={index} className={'group-item' + (id === activeGroupId ? ' active' : '')} onClick={this.handleGroupSelect(id)}>
                        <div className="group-caption">
                            {name}
                        </div>
                        <div className="last-activity">
                            {convert(lastActivity, serverFormatFull, timeFormatShort)}
                        </div>
                    </div>
                )
            }
        );
    };

    render() {
        const {list} = this.props;
        console.log(list.status);
        return (list.status === ELoadingStatus.SUCCESS) ?
            <div>
                {this.renderGroups()}
                <Button onClick={this.handleRefresh}>Refresh</Button>
            </div> :
            <SyncLoader className="spinner" loading/>
    }
}

const mapDispatchToProps = (dispatch: Dispatch<IGroupModule>, {context}: IOwnProps) => ({
    actions: new GroupActions(GroupService, context.group, dispatch)
});

const mapStateToProps = (state: IGroupModule) => {
    return {
        list: state.group.list
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(GroupListPage);