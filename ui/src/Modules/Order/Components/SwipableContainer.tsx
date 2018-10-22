import * as React from 'react';
import {SwipableContext, ISwipableContext} from "../Models";

interface IProps {
}

interface IState extends ISwipableContext {

}

export class SwipableContainer extends React.Component<IProps, IState> {

    state: IState = {
        isPressed: false,
        onMouseDown: (x: number, _: number) => {
            this.setState({isPressed: true, x0: x, x: x});
        },
        x0: 0,
        x: 0
    };

    componentDidMount() {
        window.addEventListener('touchmove', this.handleTouchMove);
        window.addEventListener('touchend', this.handleMouseUp);
        window.addEventListener('mousemove', this.handleMouseMove);
        window.addEventListener('mouseup', this.handleMouseUp);
    };

    handleTouchMove = (e: any) => {
        e.preventDefault();
        this.handleMouseMove(e.touches[0]);
    };

    handleMouseUp = () => {
        console.log("Up");
        this.setState({isPressed: false, x0: 0, x: 0});
    };

    handleMouseMove = ({pageX}: {pageX: number}) => {
        const {isPressed} = this.state;
        if (isPressed) {
            this.setState({x: pageX});
        }
    };

    render() {
        return (
            <SwipableContext.Provider value={this.state}>
                {this.props.children}
            </SwipableContext.Provider>
        )
    }
}