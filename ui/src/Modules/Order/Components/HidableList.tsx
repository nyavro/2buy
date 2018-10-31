import {isEmpty, findIndex} from 'lodash';
import * as React from 'react';
import {Key, ReactElement, ReactText} from "react";
import {Motion, presets, spring, TransitionMotion, TransitionPlainStyle, TransitionStyle} from "react-motion";
import {OrderItem} from "./OrderItem";
import {IOrderView} from "../Models";
import {IPaginatedItems} from "../../../Libraries/Core/Models";

interface IProps {
    visible: boolean;
    list: IPaginatedItems<IOrderView>;
    onDone: (id: string, version: number) => void;
}

interface IState {

}

export class HidableList extends React.Component<IProps, IState> {

    state: IState = {};

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

    willEnter = (styleThatEntered: TransitionStyle) => {
        console.log('entering ' + styleThatEntered.key);
        return {
            height: 0,
            opacity: 1,
        }
    };

    willLeave = (styleThatEntered: TransitionStyle) => {
        console.log('leaving ' + styleThatEntered.key);
        return {
            height: spring(0),
            opacity: spring(0),
        }
    };

    interpolate = (previousInterpolatedStyles?: Array<TransitionPlainStyle>) => {
        console.log('interpolate' + previousInterpolatedStyles.length);
        const n = findIndex(previousInterpolatedStyles, (item) => item.style.height < 60);
        if (n >= 0) {
            const res = [...previousInterpolatedStyles];
            res[n].style = {height: res[n].style.height + 15, opacity: res[n].style.opacity + 0.25};
            return res;
        }
        return previousInterpolatedStyles;
    };

    render() {
        return (
            <TransitionMotion
                defaultStyles={this.getDefaultStyles()}
                styles={this.interpolate}
                willLeave={this.willLeave}
                willEnter={this.willEnter}
                key="list"
            >
                {styles =>
                    <ul className="todo-list">
                        {styles.map(({key, style, data}) =>
                            <li key={key} style={style}>
                                <div className="view">
                                    <OrderItem item={data} onDone={this.props.onDone}/>
                                </div>
                            </li>
                        )}
                    </ul>
                }
            </TransitionMotion>
        );
    }
}