import Filter from 'components/Filter/FIlter';
import db, { storage } from 'firebase/firebase.config';
import { current } from 'immer';
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
    const filterFields = ["Last 1 orders", "Last 2 orders", "Last 3 orders", "Last 5 orders", "Last 15 orders", "Last 30 orders", "All"]
    const [currentField, setCurrentField] = useState(filterFields[0])

    useEffect(() => {
        const limit = extractLimit(currentField)
        const orderRef = limit === Infinity
            ? db.collection('Orders').where('userid', '==', user.uid)
            : db.collection('Orders').where('userid', '==', user.uid).limit(limit)

        // how to sort by time ???
        orderRef.get().then((querySnapshot) => {
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
    }, [currentField])

    const history = useHistory()
    const handleImageClick = (productid) => {
        history.push(`/product/${productid}`)
    }

    const handleFilterChange = (field) => {
        setCurrentField(field)
    }

    const extractLimit = (field) => {
        if (field === "Last 1 orders") return 1
        else if (field === "Last 2 orders") return 2
        else if (field === "Last 3 orders") return 3
        else if (field === "Last 5 orders") return 5
        else if (field === "Last 15 orders") return 15
        else if (field === "Last 30 orders") return 30
        else if (field === "All") return Infinity
    }

    const statusColor = (status) => {
        if (status === 'pending') return 'red'
        else if (status === 'processing') return 'orange'
        else if (status === 'delivered') return 'green'
        else if (status === 'cancelled') return 'gray'
    }

    return (
        <div className='order__list'>
            <Container>
                <h2 className="order__list--header">My Order</h2>
                <Filter
                    header="Show"
                    title={filterFields[0]}
                    fields={filterFields}
                    onChangeFilter={handleFilterChange}
                />
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
                                <p className="header__status" style={{ color: `${statusColor(order.status.toLowerCase())}` }}>{order.status.toLowerCase()}</p>
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
                                    {(order.status === 'delivered') &&
                                        <CommentModal label='Comment' title={orderItem.title} productid={orderItem.productid} />}
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