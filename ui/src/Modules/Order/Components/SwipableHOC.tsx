import * as React from 'react';

require('../assets/Order.styl');
require('../assets/nls/ru/Order.json');

export interface ISwippableProps {
    onSwipeRight: () => void;
    onSwipeLeft: () => void;
}

export interface IToSwipeProps {

}

export const swipable = <T extends IToSwipeProps>(WrappedComponent: React.ComponentType<T>) =>
    class Swipable extends React.Component<ISwippableProps & T, {}> {
        static displayName = `withOnChangeString(${WrappedComponent.displayName || WrappedComponent.name})`;

        handleMouseDown = ({pageX}: {pageX: number}) => {
            console.log('Hey! ' + pageX);
        };

        handleTouchStart = (e: TouchList) => {
            this.handleMouseDown(e.item(0));
        };

        render() {
            // onTouchStart={this.handleTouchStart}>
            return (
                <div onMouseDown={this.handleMouseDown}>
                    <WrappedComponent
                        {...this.props}
                    />
                </div>
            );
        }
    };
