import * as React from 'react';
import {SwipableContext, ISwipableContext, ESwipeDirection} from './Models';
import {Motion, spring} from 'react-motion';
import {CSSProperties} from 'react';

interface IProps {
    onSwipeStart?: (direction: ESwipeDirection) => void;
    onSwipeEnd?: (direction: ESwipeDirection) => void;
    rightStyle?: CSSProperties;
    leftStyle?: CSSProperties;
}

interface IState {
    isActive: boolean;
    isRight: boolean;
    isLeft: boolean;
}

interface IOwnProps {
    context: ISwipableContext;
}

const springConfig = {stiffness: 300, damping: 50};

type TProps = IProps & IOwnProps;

class SwipableComponent extends React.Component<TProps, IState> {

    state: IState = {
        isActive: false,
        isLeft: false,
        isRight: false
    };

    handleMouseDown = ({pageX, pageY}: {pageX: number, pageY: number}) => {
        const {onMouseDown} = this.props.context;
        onMouseDown(pageX, pageY);
        this.setState({
            isActive: true,
            isLeft: false,
            isRight: false
        });
    };

    componentWillReceiveProps(props: TProps) {
        const {isPressed, x0, x} = props.context;
        const {onSwipeStart, onSwipeEnd} = this.props;
        const {isActive, isRight, isLeft} = this.state;
        if(isActive && this.props.context.isPressed && !isPressed) {
            let direction = ESwipeDirection.NONE;
            if (isRight) direction = ESwipeDirection.RIGHT;
            if (isLeft) direction = ESwipeDirection.LEFT;
            onSwipeEnd && onSwipeEnd(direction);
            this.setState(
                {
                    isActive: false,
                    isRight: false,
                    isLeft: false
                }
            );
            return;
        }
        if(this.state.isActive) {
            const dx = x - x0;
            if (Math.abs(dx) > 150) {
                if (dx > 0) {
                    onSwipeStart && onSwipeStart(ESwipeDirection.RIGHT);
                    this.setState({isRight: true});
                } else {
                    onSwipeStart && onSwipeStart(ESwipeDirection.LEFT);
                    this.setState({isLeft: true});
                }
            } else {
                this.setState({isLeft: false, isRight: false});
            }
        }
    }

    handleTouchStart = (e: TouchList) => {
        this.handleMouseDown(e.item(0));
    };

    render() {
        const {isActive, isLeft, isRight} = this.state;
        const {x0, x} = this.props.context;
        const base = (isLeft ? this.props.leftStyle : isRight ? this.props.rightStyle : null) || {};
        const style = isActive ?
            {
                scale: spring(1.05, springConfig),
                shadow: spring(16, springConfig),
                x: x-x0
            }
            : {
                scale: spring(1, springConfig),
                shadow: spring(1, springConfig),
                x: 0
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
                             ...base
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