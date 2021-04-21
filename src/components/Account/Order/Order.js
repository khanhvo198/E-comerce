import Images from 'constants/images';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'reactstrap';
import './Order.css';
import db from 'firebase/firebase.config';
import { useSelector } from 'react-redux';

Order.propTypes = {

};

function Order(props) {
    const [orderList, setOrderList] = useState([])
    const user = useSelector(state => state.user)
    // const order = orderList[0]

    const toDateTime = (seconds) => new Date(seconds * 1000).toString()

    useEffect(() => {
        db.collection('Orders').where('userid', '==', user.userid).get().then((querySnapshot) => {
            if (!querySnapshot.empty) {
                const orderListPromise = querySnapshot.docs.map((order) => {
                    const { items, userid, orderTime, deliverTime, status } = order.data()
                    const itemsPromise = items.map((item) => {
                        // get item title
                        return db.collection('Products').doc(item.productid).get().then((product) => (
                            {
                                title: product.data().title,
                                price: item.price,
                                quantity: item.quantity,
                            }
                        ))
                    })

                    // return order
                    return Promise.all(itemsPromise).then((newItems) => (

                        {
                            userid: userid,
                            orderTime: orderTime,
                            deliverTime: deliverTime,
                            status: status,
                            items: newItems,
                        }
                    ))
                })

                Promise.all(orderListPromise).then((newOrderList) => {
                    setOrderList(newOrderList)
                })
            }
        })
    }, [])

    return (
        <div className='order__list'>
            <Container>
                <h2 className="order__list--header">My Order</h2>
                {orderList.map((order) => (
                    <Container className="order">
                        <Row className="order__header">
                            <Col xs="9" className="header__time">
                                <p><b>Order</b> <span className="order__id">{order.id}</span></p>
                                <p className="order__date--time">Placed on {toDateTime(order.orderTime.seconds)} </p>
                            </Col>
                            <Col xs="1" className="header__total" >
                                <p>
                                    {order.items.reduce((total, item) => (
                                        total + item.price * item.quantity
                                    ), 0)}
                                </p>
                            </Col>
                            <Col xs="2" className="header__delivered">
                                <p>Delivered</p>
                            </Col>
                        </Row>
                        {order.items.map((orderItem) => (
                            <Row className="order__detail">
                                <Col xs="2" className="item__thumbnail">
                                    <img className="item__image" src={Images.THUMBNAIL} />
                                </Col>
                                <Col xs="7" className="item__information">
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