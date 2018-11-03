import * as React from 'react';
import {presets, spring, TransitionMotion} from "react-motion";

interface WithId {
    id: number | string;
}

interface IProps<T> {
    className: string;
    visible?: boolean;
    list: Array<T & WithId>;
    customRender: (item: T) => JSX.Element;
}

export class SmoothList<T, P> extends React.Component<IProps<T & P>, {}> {

    getDefaultStyles = () => {
        return this.props.list.map(item => ({data: item, key: item.id + '', style: {height: 0, opacity: 0}}));
    };

    getStyles = () => this.props.list.map(item =>
        ({
            data: item,
            key: item.id + '',
            style: {
                height: spring(this.props.visible ? 60 : 0, presets.gentle),
                opacity: spring(this.props.visible ? 1 : 0, presets.gentle),
            }
        })
    );

    render() {
        return (
            <TransitionMotion
                defaultStyles={this.getDefaultStyles()}
                styles={this.getStyles()}
            >
                {styles =>
                    <ul className={this.props.className}>
                        {styles.map(({key, style, data}) =>
                            <li key={key} style={style}>
                                {this.props.customRender(data)}
                            </li>
                        )}
                    </ul>
                }
            </TransitionMotion>
        );
    }
}