import {includes} from 'lodash';
import * as React from 'react';
import {Key, ReactElement, ReactText} from 'react';
import {ToggleContext} from './Models';

interface IProps {
    blockKey: Key;
}

interface IState {
    render: boolean;
}

interface IInternalProps {
    visible: boolean;
    Component: ReactElement<any> | ReactText;
}

class Toggle extends React.Component<IInternalProps, IState> {

    constructor(props: IInternalProps) {
        super(props);
        this.state = {
            render: props.visible
        };
    }

    componentWillReceiveProps(props: IInternalProps) {
        if (!this.state.render && props.visible) {
            this.setState({render: true});
        }
    }

    isElement = (child: ReactElement<any> | ReactText): child is ReactElement<any> => {
        const r = child as {key: Key};
        return r.key !== undefined;
    };

    render () {
        const {Component} = this.props;
        return this.state.render && (this.isElement(Component) ? React.cloneElement(Component, {visible: this.props.visible}) : (<div>{Component}</div>));
    }
}

export class ToggleComponent extends React.Component<IProps, {}> {

    render() {
        return (
            <ToggleContext.Consumer>
                {(context) =>
                    React.Children.map(
                        this.props.children,
                        child => (<Toggle visible={includes(context.activeKeys, this.props.blockKey)} Component={child}/>)
                    )
                }
            </ToggleContext.Consumer>
        );
    }
}