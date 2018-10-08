import * as React from "react";
import {IAction} from "../Core/Models";
import {Button} from 'reactstrap';

interface IProps {
    title: string;
    actions?: IAction[];
}

export class ActionsPanel extends React.Component<IProps, {}> {

    render() {
        return (
            <div className="header">
                <h4>{this.props.title}</h4>
                <div className="actions-panel">
                    {(this.props.actions || []).map(
                        (action, index) => (
                            <Button key={index} className={action.className || ''} onClick={action.handler} disabled={!action.enabled}>
                                {action.title}
                            </Button>
                        )
                    )}
                </div>
            </div>
        );
    }
}