import * as React from 'react';

interface IProps {
    visible?: boolean;
}

export class ToggleItem extends React.Component<IProps, {}> {

    render() {
        return this.props.visible && this.props.children;
    }
}