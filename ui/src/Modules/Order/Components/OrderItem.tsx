import * as React from 'react';
import {EOrderStatus, IOrderView} from '../Models';
import {Col, Row} from 'reactstrap';
import {MdCheckBoxOutlineBlank, MdComment} from 'react-icons/md';

interface IProps {
    item: IOrderView;
    onDone: (id: string, version: number) => void;
}

export class OrderItem extends React.Component<IProps, {}> {

    handleDone = () => {
        const {item: {id, version}, onDone} = this.props;
        onDone(id, version);
    };

    render() {
        const {item: {product, count, comment, status}} = this.props;
        return (
            <Row className="order-item">
                <Col lg={1}>
                    <input
                        className="toggle"
                        type="checkbox"
                        onChange={this.handleDone}
                        checked={status === EOrderStatus.CLOSED}
                    />
                </Col>
                <Col className="order-caption">
                    {product.name}
                </Col>
                <Col className="order" lg={1}>
                    {count > 1 ? count : ''}
                </Col>
                <Col className="comment" lg={1}>
                    {comment && <MdComment/>}
                </Col>
            </Row>
        );
    }
}