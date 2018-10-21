import * as React from 'react';
import {EOrderStatus, IOrderView} from '../Models';
import {Col, Row} from 'reactstrap';
import {MdCheckBox, MdCheckBoxOutlineBlank, MdComment, MdIndeterminateCheckBox} from 'react-icons/md';

interface IProps {
    item: IOrderView;
}

export class OrderItem extends React.Component<IProps, {}> {

    render() {
        const {product, count, comment, status} = this.props.item;
        let Icon = MdCheckBoxOutlineBlank;
        switch(status) {
            case EOrderStatus.CLOSED:
                Icon = MdCheckBox;
                break;
            case EOrderStatus.REJECTED:
                Icon = MdIndeterminateCheckBox;
        }
        return (
            <Row className="order-item">
                <Col className="order-caption">
                    {product.name}
                </Col>
                <Col className="order" lg={1}>
                    {count > 1 ? count : ''}
                </Col>
                <Col className="comment" lg={1}>
                    {comment && <MdComment/>}
                </Col>
                <Col className="status" lg={1}>
                    <Icon/>
                </Col>
            </Row>
        );
    }
}