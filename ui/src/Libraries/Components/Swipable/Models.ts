import * as React from 'react';

export enum ESwipeDirection {
    RIGHT,
    LEFT,
    NONE
}

export interface ISwipableContext {
    isPressed: boolean,
    onMouseDown: (x: number, y: number) => void;
    x0: number;
    x: number;
}

const defaultContext: ISwipableContext = {
    isPressed: false,
    onMouseDown: (x: number, y: number) => console.log(x + ' ' + y),
    x0: 0,
    x: 0
};

export const SwipableContext = React.createContext<ISwipableContext>(defaultContext);