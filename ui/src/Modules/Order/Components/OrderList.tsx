import * as React from 'react';
import {Key} from 'react';
import {PlainStyle} from 'react-motion';
import {IOrderActions, IOrderView} from '../Models';
import {IPaginatedItems} from 'Libraries/Core/Models';
import {Button} from "reactstrap";
import {MdAdd, MdClear} from "react-icons/md";
import {Accordeon} from "./Accordeon";
import {HidableList} from "./HidableList";
import {HidableActions} from "./HidableActions";
import {HidablePanel} from "./HidablePanel";
import {HidableWrapper} from "./HidableWrapper";

require('../assets/Demo.styl');

interface IProps {
    list: IPaginatedItems<IOrderView>;
    actions: IOrderActions;
    groupId: string;
}

interface IState {
    activeKeys: Key[];
}

export class OrderList extends React.Component<IProps, IState> {

    state: IState = {
        activeKeys: ['actions', 'list']
    };

    // actual animation-related logic

    orderHash = (id: string, version: string) => id + "." + version;

    handleAdd = () => {
        console.log('add');
        this.setState({
            activeKeys: ['app', 'actions']
        })
    };

    handleCancel = () => {
        console.log('cancel');
        this.setState({
            activeKeys: ['list', 'actions']
        })
    };

    handleDone = (id: string, version: number) => {
        const {actions, groupId} = this.props;
        actions.close(id, groupId, version);
    };

    render() {
        return (
            <section className="orders-list">
                <Accordeon activeKeys={this.state.activeKeys}>
                    <HidableList key="list" visible list={this.props.list} onDone={this.handleDone}/>
                    <HidableWrapper
                        hiddenStyle={{opacity: 0, scale: 0.1}}
                        visibleStyle={{opacity: 1, scale: 1}}
                        key="app"
                    >
                        Here
                    </HidableWrapper>
                    <HidableWrapper
                        hiddenStyle={{opacity: 0, scale: 0.1}}
                        visibleStyle={{opacity: 1, scale: 1}}
                        key="actions"
                    >
                        <div className="action">
                            <Button onClick={this.handleAdd}>
                                <MdAdd className="add-btn"/>
                            </Button>
                            <Button onClick={this.handleCancel}>
                                <MdClear className="cancel-btn"/>
                            </Button>
                        </div>
                    </HidableWrapper>
                </Accordeon>
            </section>
        );
    };
}