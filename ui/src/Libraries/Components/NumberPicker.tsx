import {parseInt} from 'lodash';
import * as React from 'react';
import {Button, Input} from 'reactstrap';
import {ChangeEvent} from 'react';
import './assets/styles/NumberPicker.styl';

interface IProps {
    value: number;
    min?: number;
    max?: number;
    onSelect: (newValue: number) => void;
}

export class NumberPicker extends React.Component<IProps> {

    static defaultProps = {
        min: 0,
        max: 10
    };

    handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
        const {min, max, onSelect} = this.props;
        onSelect(Math.max(Math.min(parseInt(event.target.value), max), min));
    };

    handleUp = () => {
        const {onSelect, value} = this.props;
        onSelect(value + 1);
    };

    handleDown = () => {
        const {onSelect, value} = this.props;
        onSelect(value - 1);
    };

    render() {
        return (
            <div className="number-picker">
                <div className="ctrl">
                    <div className="down">
                        <Button disabled={this.props.value === this.props.min} onClick={this.handleDown}>&minus;</Button>
                    </div>
                </div>
                <div className="ctrl">
                    <div className="number-input">
                        <Input type="text" onChange={this.handleSelect} value={this.props.value}/>
                    </div>
                </div>
                <div className="ctrl">
                    <div className="up">
                        <Button disabled={this.props.value === this.props.max} onClick={this.handleUp}>+</Button>
                    </div>
                </div>
            </div>
        );
    }
}