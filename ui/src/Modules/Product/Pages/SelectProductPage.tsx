import * as React from 'react';
import {connect, Dispatch} from 'react-redux';
import {IAsyncData} from 'Libraries/Core/Models';
import {ELoadingStatus} from 'Libraries/Core/Enums';
import {IProductContext, IProductModule, IProductView} from '../Models';
import {SyncLoader} from 'react-spinners';
import {ProductActions} from '../Actions/ProductActions';
import {ProductService} from '../Services/ProductService';
import {CustomSelect} from 'Libraries/Components/CustomSelect'
import {NumberPicker} from 'Libraries/Components/NumberPicker'
import {Button, Col, Row} from "reactstrap";
import {MdCancel, MdCheckCircle} from "react-icons/md";

interface IOwnProps {
    context: IProductContext;
    onCancel: () => void;
    onOK: (productId: string, count: number) => void;
}

interface IDispatchProps {
    actions: ProductActions;
}

interface IStateProps {
    list: IAsyncData<Array<IProductView>>;
}

type TProps = IOwnProps & IDispatchProps & IStateProps;

interface IState {
    selected?: string;
    count: number;
}

class SelectProductPageComponent extends React.Component<TProps, IState> {

    state: IState = {
        count: 1
    };

    componentDidMount() {
        const {list, actions} = this.props;
        if (!list.data) {
            console.log("Getting products");
            actions.list();
        }
    }

    handleChange = (id: string) => {
        this.setState({selected: id});
    };

    handleCount = (num: number) => {
        this.setState({count: num});
    };

    handleOK = () => {
        const {selected, count} = this.state;
        if (!!selected) {
            this.props.onOK(selected, count);
        }
    };

    renderSelect = () => {
        const {list: {data}} = this.props;
        return (
            <div>
                <Row>
                    <Col lg={9} md={9}>
                        <CustomSelect options={data} onChange={this.handleChange}/>
                    </Col>
                    <Col lg={3} md={3}>
                        <NumberPicker value={this.state.count} onSelect={this.handleCount}/>
                    </Col>
                </Row>
                <Row className="list-actions">
                    <Button onClick={this.handleOK} enabled={!!this.state.selected && this.state.count > 0} className="action">
                        <MdCheckCircle className="icon"/>
                    </Button>
                    <Button onClick={this.props.onCancel} className="action">
                        <MdCancel className="icon"/>
                    </Button>
                </Row>
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