import * as React from 'react';
import {IOption} from 'Libraries/Components/Models';
import {CustomInput} from 'reactstrap';
import {ChangeEvent} from 'react';
import './assets/styles/CustomSelect.styl';

interface IProps {
    options: IOption[];
    placeholder: string;
    onChange: (id: string) => void;
}

interface IState {
    selected: boolean;
}

export class CustomSelect extends React.Component<IProps, IState> {

    state:IState = {selected: false};

    handleSelect = (event: ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(event.target.value);
        this.setState({selected: true});
    };

    renderOptions = () => {
        const {placeholder, options} = this.props;
        let res = options.map(({id, name}, index) => <option className="customOption" value={id} key={index}>{name}</option>);
        !this.state.selected && res.splice(0, 0, <option className="customOption">{placeholder}</option>);
        return res;
    };

    render() {
        return <CustomInput type="select" onChange={this.handleSelect} className={!this.state.selected && 'notSelected'}>
            {this.renderOptions()}
        </CustomInput>
    }
}