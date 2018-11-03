import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {IAsyncData} from 'Libraries/Core/Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {IProductContext, IProductModule, IProductView} from '../Models';
import {SyncLoader} from 'react-spinners';
import {ProductActions} from '../Actions/ProductActions';
import {ProductService} from '../Services/ProductService';
import {CustomSelect} from "../../../Libraries/Components/CustomSelect";
import {NumberPicker} from "../../../Libraries/Components/NumberPicker";

// require('../assets/Order.styl');
// require('../assets/Demo.styl');
// require('../assets/nls/ru/Order.json');

interface IOwnProps {
    context: IProductContext;
}

interface IDispatchProps {
    actions: ProductActions;
}

interface IStateProps {
    list: IAsyncData<Array<IProductView>>;
}

type TProps = IOwnProps & IDispatchProps & IStateProps;

interface IState {
    selected?: { label: string, value: number };
    count: number;
}

class SelectProductPageComponent extends React.Component<TProps, IState> {

    state: IState = {
        count: 0
    };

    componentDidMount() {
        const {list, actions} = this.props;
        if (!list.data) {
            console.log("Getting products");
            actions.list();
        }
    }

    handleChange = (id: string) => {
        console.log(`Option selected:`, id);
    };

    handleCount = (num: number) => {
        this.setState({count: num});
    };

    renderSelect = () => {
        const {list: {data}} = this.props;
        return (
            <div>
                <CustomSelect options={data} onChange={this.handleChange}/>
                <NumberPicker value={this.state.count} onSelect={this.handleCount}/>
            </div>
        );
    };

    render() {
        const {list} = this.props;
        return (list.status === ELoadingStatus.SUCCESS) ?
            this.renderSelect() :
            <SyncLoader className="spinner" loading/>
    }
}

const mapDispatchToProps = (dispatch: Dispatch<IProductModule>, {context}: IOwnProps) => ({
    actions: new ProductActions(ProductService, context.config, dispatch)
});

const mapStateToProps = (state: IProductModule) => {
    return {
        list: state.product.products
    }
};

export const SelectProductPage = connect(mapStateToProps, mapDispatchToProps)(SelectProductPageComponent);