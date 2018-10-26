import {memoize} from 'lodash';
import * as React from 'react';
import {presets, spring, TransitionMotion} from 'react-motion';
import {EOrderStatus, IOrderActions, IOrderView} from '../Models';
import {IPaginatedItems} from 'Libraries/Core/Models';

require('../assets/Demo.styl');

interface IProps {
    list: IPaginatedItems<IOrderView>;
    actions: IOrderActions;
    groupId: string;
}

interface IState {
}

export default class Demo extends React.Component<IProps, IState> {

    state: IState = {};

    // actual animation-related logic
    getDefaultStyles = () => {
        return this.props.list.items.map(todo => ({data: todo, key: todo.id, style: {height: 0, opacity: 1}}));
    };

    getStyles = () => this.props.list.items.map((todo) =>
        ({
            data: todo,
            key: todo.id,
            style: {
                height: spring(60, presets.gentle),
                opacity: spring(1, presets.gentle),
            }
        })
    );

    willEnter = () => ({
        height: 0,
        opacity: 1,
    });

    willLeave = () => ({
        height: spring(0),
        opacity: spring(0),
    });

    orderHash = (id: string, version: string) => id + "." + version;

    handleDone = memoize(
        (id: string, version: number) => () => {
            const {actions, groupId} = this.props;
            actions.close(id, groupId, version);
        },
        this.orderHash
    );

    handleReject = memoize(
        (key: string) => () => {
            console.log('Reject: ' + key);
        }
    );

    render() {
        return (
            <section className="todoapp">
                <section className="main">
                    <TransitionMotion
                        defaultStyles={this.getDefaultStyles()}
                        styles={this.getStyles()}
                        willLeave={this.willLeave}
                        willEnter={this.willEnter}>
                        {styles =>
                            <ul className="todo-list">
                                {styles.map(({key, style, data: {id, version, product, status}}) =>
                                    <li key={key} style={style}>
                                        <div className="view">
                                            <input
                                                className="toggle"
                                                type="checkbox"
                                                onChange={this.handleDone(id, version)}
                                                checked={status === EOrderStatus.CLOSED}
                                            />
                                            <label>{product.name}</label>
                                            <button
                                                className="destroy"
                                                onClick={this.handleReject(key)}
                                            />
                                        </div>
                                    </li>
                                )}
                            </ul>
                        }
                    </TransitionMotion>
                </section>
            </section>
        );
    };
}