import * as React from 'react';
import {Motion, PlainStyle, spring, Style} from "react-motion";

interface IProps {
    visible?: boolean;
    visibleStyle? : PlainStyle;
    hiddenStyle? : PlainStyle;
}

interface IState {
    hidden: Style;
    visible: Style;
}

export class SmoothComponent extends React.Component<IProps, IState> {

    config = {stiffness: 20, damping: 4};

    constructor(props:IProps) {
        super(props);
        const hidden = this.stringifyStyle(this.props.hiddenStyle || {opacity: 0, scale: 0.1});
        const visible = this.stringifyStyle(this.props.visibleStyle || {opacity: 1, scale: 1});
        this.state = {
            hidden: hidden,
            visible: visible
        }
    }

    stringifyStyle = (style: PlainStyle): Style =>
        Object.keys(style).reduce((acc: Style, key: string) => {acc[key] = spring(style[key], this.config); return acc;}, {} as Style);

    shouldComponentUpdate(props: IProps) {
        return props.visible !== this.props.visible;
    }

    render() {
        return (
            <Motion
                defaultStyle={this.props.hiddenStyle}
                style={this.props.visible ? this.state.visible : this.state.hidden}
            >
                {style =>
                    (<div className="list-actions" style={{opacity: style.opacity, transform: `scale(${style.scale})`}}>
                        {this.props.children}
                    </div>)
                }
            </Motion>
        );
    }
}