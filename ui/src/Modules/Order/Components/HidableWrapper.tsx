import * as React from 'react';
import {Key} from 'react';
import {Motion, PlainStyle, spring, Style} from "react-motion";

interface IProps {
    visible?: boolean;
    key: Key;
    visibleStyle: PlainStyle;
    hiddenStyle: PlainStyle;
    convertStyle?: (PlainStyle: PlainStyle) => {};
}

interface IState {
    hidden: Style;
    visible: Style;
}

export class HidableWrapper extends React.Component<IProps, IState> {

    config = {stiffness: 20, damping: 4};

    constructor(props:IProps) {
        super(props);
        const hidden = this.stringifyStyle(this.props.hiddenStyle);
        const visible = this.stringifyStyle(this.props.visibleStyle);
        this.state = {
            hidden: hidden,
            visible: visible
        }
    }

    stringifyStyle = (style: PlainStyle): Style =>
        Object.keys(style).reduce((acc: Style, key: string) => {acc[key] = spring(style[key], this.config); return acc;}, {} as Style);

    defaultConvertStyle = (style: PlainStyle) => ({opacity: style.opacity, transform: `scale(${style.scale})`})

    shouldComponentUpdate(props: IProps) {
        return props.visible !== this.props.visible;
    }

    render() {
        const convert = this.props.convertStyle || this.defaultConvertStyle;
        return (
            <Motion
                defaultStyle={this.props.hiddenStyle}
                style={this.props.visible ? this.state.visible : this.state.hidden}
            >
                {style =>
                    (<div className="list-actions" style={convert(style)}>
                        {this.props.children}
                    </div>)
                }
            </Motion>
        );
    }
}