import * as React from 'react';
import {ToggleContext} from './Models';

interface IProps {
    activeKeys: Array<React.Key>;
}

export class ToggleLayout extends React.Component<IProps, {}> {

    render() {
        return (
            <div>
                <ToggleContext.Provider value={{activeKeys: this.props.activeKeys}}>
                    {this.props.children}
                </ToggleContext.Provider>
            </div>
        );
    }
}