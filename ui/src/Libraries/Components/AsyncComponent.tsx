import * as React from 'react';
import {SyncLoader} from 'react-spinners';
import {PureComponent} from "react";

interface IProps<P> {
    bundle: {
        loader: () => Promise<{Component: React.ComponentType<any>}>;
        props?: P;
    }
}

interface IState {
    Component?: React.ComponentType<any>;
}

export class AsyncComponent<T, P> extends PureComponent<IProps<P> & T, IState> {

    state: IState = {};

    componentWillMount() {
        if(!this.state.Component) {
            this.props.bundle.loader().then(({Component}) => this.setState({Component}));
        }
    }

    render() {
        const {Component} = this.state;
        return Component ? <Component {...this.props} {...this.props.bundle.props}/> : <SyncLoader className="spinner" loading/>;
    }
}