import Images from 'constants/images';
import React, { useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import './Order.css';



Order.propTypes = {

};

const exampleListOrder = [
    {
        id: '12312312',
        date: '21 Feb 2021',
        time: '12:36:21',
        total: 200,
        item: [
            {
                id: 1,
                title: '13-inch Macbook Pro - Silver',
                quantity: 1,
                price: 100,
                
            },
            {
                id: 2,
                title: '16-inch Macbook Pro - Space Gray',
                quantity: 1,
                price: 100
            }
        ]
    },
    {
        id: '12312312',
        date: '21 Feb 2021',
        time: '12:36:21',
        total: 200,
        item: [
            {
                id: 1,
                title: '13-inch Macbook Pro - Silver',
                quantity: 1,
                price: 100,
                
            },
            {
                id: 2,
                title: '16-inch Macbook Pro - Space Gray',
                quantity: 1,
                price: 100
            }
        ]
    }
]


function Order(props) {
    const [orderList,setOrderList] = useState(exampleListOrder)

    const order = orderList[0]

    return (
        <div className='order__list'>
            <Container>
                <h2 className="order__list--header">My Order</h2>
                {orderList.map((order) => (
                    <Container className="order">
                        <Row className="order__header">
                            <Col xs="9" className="header__time">
                                <p><b>Order</b> <span className="order__id">{order.id}</span></p>
                                <p className="order__date--time">Placed on {order.date} {order.time} </p>
                            </Col>
                            <Col xs="1" className="header__total" >
                                <p>200</p>
                            </Col>
                            <Col xs="2" className="header__delivered">
                                <p>Delivered</p>
                            </Col>
                        </Row>
                        {order.item.map((orderItem) => (
                            <Row className="order__detail">
                                <Col xs="2" className="item__thumbnail">
                                    <img className="item__image" src={Images.THUMBNAIL} />
                                </Col>
                                <Col xs="7"  className="item__information">
                                    <p className="item__title">{orderItem.title}</p>
                                    <p className="item__quantity">Quantity:{orderItem.quantity}</p>
                                    
                                </Col>
                                <Col xs="1" className="item__price">
                                    <p>{orderItem.price}</p>
                                </Col>

                                <Col xs="2" className="item__comment">
                                    <p>Comment</p>
                                </Col>
                            </Row>
                        ))}

                    </Container>
                ))}
            </Container>
            
        </div>
    );
}

export default Order;