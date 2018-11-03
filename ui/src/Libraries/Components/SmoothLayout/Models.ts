import * as React from 'react';

export interface IToggleContext {
    activeKeys: Array<React.Key>;
}

const defaultContext: IToggleContext = {
    activeKeys: []
};

export const ToggleContext = React.createContext<IToggleContext>(defaultContext);