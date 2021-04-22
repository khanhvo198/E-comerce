import db, { storage } from 'firebase/firebase.config';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Col, Container, Row } from 'reactstrap';
import CommentModal from './CommentModal/CommentModal';
import './Order.css';

Order.propTypes = {

};

function Order(props) {
    const [orderList, setOrderList] = useState([])
    const user = useSelector(state => state.user)

    useEffect(() => {
        db.collection('Orders').where('userid', '==', user.uid).get().then((querySnapshot) => {
            if (!querySnapshot.empty) {
                const orderListPromise = querySnapshot.docs.map((orderDoc) => {
                    const { items, userid, orderTime, deliverTime, status, address, phone, receiver } = orderDoc.data()
                    const itemsPromise = items.map((item) => {
                        // get item title, image
                        return db.collection('Products').doc(item.productid).get().then((productDoc) => (
                            {
                                title: productDoc.data().title,
                                img: productDoc.data().img,
                                price: item.price,
                                quantity: item.quantity,
                                productid: productDoc.id,
                            }
                        ))
                    })

                    // return order
                    return Promise.all(itemsPromise).then((newItems) => (
                        {
                            id: orderDoc.id,
                            receiver: receiver,
                            orderTime: orderTime,
                            deliverTime: deliverTime,
                            status: status,
                            address: address,
                            phone: phone,
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

    const history = useHistory()
    const handleImageClick = (productid) => {
        history.push(`/product/${productid}`)
    }

    return (
        <div className='order__list'>
            <Container>
                <h2 className="order__list--header">My Order</h2>
                {orderList.map((order) => (
                    <Container className="order">
                        <Row className="order__header">
                            <Col xs="9" className="header__time">
                                <p><b>Order</b> <span className="order__id">{order.id}</span></p>
                                <p className="order__date--time">Placed on {order.orderTime} </p>
                                <p className="order__date--address">Address: {order.address} </p>
                                <p className="order__date--receiver">Receiver: {order.receiver} </p>
                                <p className="order__date--phone">Phone: {order.phone} </p>
                            </Col>
                            <Col xs="1" className="header__total" >
                                <p><b>Total</b></p>
                                <p>
                                    {order.items.reduce((total, item) => (
                                        total + item.price * item.quantity
                                    ), 0)}$
                                </p>
                            </Col>
                            <Col xs="2">
                                <p><b>Status</b></p>
                                <p className="header__status">Delivered</p>
                            </Col>
                        </Row>
                        {order.items.map((orderItem) => (
                            <Row className="order__detail" key={orderItem.productid}>
                                <Col xs="2" className="item__thumbnail">
                                    <img
                                        className="item__image"
                                        src={orderItem.img}
                                        onClick={() => { handleImageClick(orderItem.productid) }}
                                    />
                                </Col>
                                <Col xs="7" className="item__information">
                                    <p className="item__title">{orderItem.title}</p>
                                    <p className="item__quantity">Quantity:{orderItem.quantity}</p>

                                </Col>
                                <Col xs="1" className="item__price">
                                    <p>{orderItem.price}$</p>
                                </Col>

                                <Col xs="2" className="item__comment">
                                    {/* <p>Comment</p> */}
                                    <CommentModal label='Comment' title={orderItem.title} productid={orderItem.productid} />
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