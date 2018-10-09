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

require('../assets/Group.styl');
require('../assets/nls/ru/Order.json');

interface IOwnProps {
    context: IGroupContext;
}

interface IDispatchProps {
    actions: GroupActions;
}

interface IStateProps {
    list: IAsyncData<IPaginatedItems<IGroupView>>;
}

type TProps = IOwnProps & IDispatchProps & IStateProps;

class GroupListPage extends React.Component<TProps, {}> {

    componentWillMount() {
        if (isEmpty(this.props.list.data)) {
            console.log("Getting list");
            this.props.actions.list({count: 12, offset: 0, hasNextPage: false});
        }
    }

    handleGroupSelect = memoize((id: string) => () => {
        console.log(id);
    });

    renderGroup = ({id, name, lastActivity}: IGroupView, index: number) => {
        return (
            <div key={index} className="group-item">
                <div className="group-caption" onClick={this.handleGroupSelect(id)}>
                    {name}
                </div>
                <div className="last-activity">
                    {convert(lastActivity, serverFormatFull, timeFormatShort)}
                </div>
            </div>
        );
    };

    renderGroups = () => {
        const {list} = this.props;
        return (list && list.data && list.data.items || []).map(
            (group, index) => this.renderGroup(group, index)
        );
    };

    render() {
        const {list} = this.props;
        return (list.status === ELoadingStatus.SUCCESS) ?
            <div>{this.renderGroups()}</div> :
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