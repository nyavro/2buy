import * as React from 'react';
import {Key} from 'react';
import {IOrderActions, IOrderView} from '../Models';
import {IPaginatedItems} from 'Libraries/Core/Models';
import {Button} from 'reactstrap';
import {MdAdd} from 'react-icons/md';
import {AsyncComponent} from 'Libraries/Components/AsyncComponent';
import {ToggleLayout} from 'Libraries/Components/SmoothLayout/ToggleLayout';
import {ToggleComponent} from 'Libraries/Components/SmoothLayout/ToggleComponent';
import {SmoothComponent} from 'Libraries/Components/SmoothLayout/SmoothComponent';
import {OrderItem} from './OrderItem';
import {SmoothList} from 'Libraries/Components/SmoothLayout/SmoothList';

require('../assets/Demo.styl');

interface IProps {
    list: IPaginatedItems<IOrderView>;
    actions: IOrderActions;
    groupId: string;
    selectProduct: {
        loader: () => Promise<{Component: React.ComponentType<any>}>
    };
}

interface IState {
    activeKeys: Key[];
}

export class OrderList extends React.Component<IProps, IState> {

    state: IState = {
        activeKeys: ['actions', 'list', 'add']
    };

    handleAdd = () => {
        console.log('add');
        this.setState({
            activeKeys: ['app']
        })
    };

    handleCancel = () => {
        console.log('cancel');
        this.setState({
            activeKeys: ['list', 'actions', 'add']
        })
    };

    handleDone = (id: string, version: number) => {
        const {actions, groupId} = this.props;
        actions.close(id, groupId, version);
    };

    handleSelect = (productId: string, productName: string) => {
        console.log(productId + ":" + productName);
        this.setState({
            activeKeys: ['list', 'actions']
        })
    };

    renderItem = (item: IOrderView) => (
        <div className="view">
            <OrderItem item={item} onDone={this.handleDone}/>
        </div>
    );

    handleCreate = (productId: string, count: number) => {
        this.props.actions.create(productId, count, this.props.groupId, '');
        this.setState({
            activeKeys: ['list', 'actions']
        })
    };

    handleCancelCreate = () => {
        this.setState({
            activeKeys: ['list', 'actions']
        });
    };

    render() {
        return (
            <section className="orders-list">
                <ToggleLayout activeKeys={this.state.activeKeys}>
                    <ToggleComponent blockKey="list">
                        <SmoothList list={this.props.list.items} customRender={this.renderItem} className="todo-list"/>
                    </ToggleComponent>
                    <ToggleComponent blockKey="app">
                        <SmoothComponent>
                            <AsyncComponent bundle={this.props.selectProduct} onOK={this.handleCreate} onCancel={this.handleCancelCreate}/>
                        </SmoothComponent>
                    </ToggleComponent>
                    <ToggleComponent blockKey="actions">
                        <SmoothComponent>
                            <div className="action">
                                <Button onClick={this.handleAdd}>
                                    <MdAdd className="icon"/>
                                </Button>
                            </div>
                        </SmoothComponent>
                    </ToggleComponent>
                </ToggleLayout>
            </section>
        );
    };
}