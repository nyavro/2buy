import {isEmpty, includes} from 'lodash';
import * as React from 'react';
import {Key, ReactElement, ReactText} from "react";
import {Motion, spring} from "react-motion";

interface IProps {
    activeKeys: Key[];
}

interface IState {
    activeChild?: number;
}

export class Accordeon extends React.Component<IProps, IState> {

    state: IState = {};

    componentDidMount() {
        if(!isEmpty(this.props.children)) {
            this.setState({activeChild: 0});
        }
    }

    isElement = (child: ReactElement<any> | ReactText): child is ReactElement<any> => {
        const r = child as {key: Key};
        return r.key !== undefined;
    };

    render() {
        console.log('active keys ' + this.props.activeKeys);
        return (
            <div className="accordeon">
                {React.Children.map(
                    this.props.children,
                    child => {
                        return this.isElement(child) ? (
                            React.cloneElement(child, {
                                visible: includes(this.props.activeKeys, child.key)
                            })
                        ) : <div className="accordeonItem">{child}</div>
                    }
                )}
            </div>
        );
    }
}