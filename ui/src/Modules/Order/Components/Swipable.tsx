import * as React from 'react';
import {SwipableContext, ISwipableContext} from "../Models";
import {Motion, spring} from "react-motion";

interface IProps {
    onSwipeRight: () => void;
    onSwipeLeft: () => void;
}

interface IState {
    isActive: boolean;
}

interface IOwnProps {
    context: ISwipableContext;
}

const springConfig = {stiffness: 300, damping: 50};

type TProps = IProps & IOwnProps;

class SwipableComponent extends React.Component<TProps, IState> {

    state: IState = {
        isActive: false
    };

    handleMouseDown = ({pageX, pageY}: {pageX: number, pageY: number}) => {
        const {onMouseDown} = this.props.context;
        onMouseDown(pageX, pageY);
        this.setState({
            isActive: true
        });
    };

    componentWillReceiveProps(props: TProps) {
        const {isPressed, x0, x} = props.context;
        const {onSwipeRight, onSwipeLeft} = this.props;
        if(this.props.context.isPressed && !isPressed) {
            this.setState({isActive: false});
            return;
        }
        if(this.state.isActive) {
            const dx = x - x0;
            if (Math.abs(dx) > 150) {
                if (dx > 0) {
                    onSwipeRight();
                } else {
                    onSwipeLeft();
                }
            }
        }
    }

    handleTouchStart = (e: TouchList) => {
        this.handleMouseDown(e.item(0));
    };

    render() {
        const {isActive} = this.state;
        const {x0, x} = this.props.context;
        const style = isActive ?
            {
                scale: spring(1.05, springConfig),
                shadow: spring(16, springConfig),
                x: x-x0
            }
            : {
                scale: spring(1, springConfig),
                shadow: spring(1, springConfig),
                x: 0,//spring(topDeltaX, springConfig),
            };
        return (
            <Motion style={style}>
                {({scale, shadow, x}) =>
                    <div className="swipable"
                         onMouseDown={this.handleMouseDown}
                         style={{
                             boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                             transform: `translate3d(${x}px, 0, 0) scale(${scale})`,
                             WebkitTransform: `translate3d(${x}px, 0, 0) scale(${scale})`,
                             zIndex: isActive ? 99 : 1,
                         }}
                    >
                        {this.props.children}
                    </div>
                }
            </Motion>
        );
    }
}

export class Swipable extends React.Component<IProps, {}> {

    render() {
        return (
            <SwipableContext.Consumer>
                {(context) => <SwipableComponent {...this.props} context={context}/>}
            </SwipableContext.Consumer>
        )
    }
}