import QuantityAdder from "components/ProductDetail/QuantityAdder/QuantityAdder";
import Images from "constants/images";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap"
import { setQuantityInCart, removeProduct } from '../../feature/Cart/CartSlice'

import './Review.css'
const Review = () => {

    const [subtotal, setSubtotal] = useState(0)
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()


    useEffect(() => {
        const subtotal = cart?.reduce((amount, item) => amount + item.price * item.quantity, 0)
        setSubtotal(subtotal)
    }, [cart])


    const getIndex = (id, cart) => {
        for (let i = 0; i < cart.length; i++) {
            if (id === cart[i].id) {
                return i
            }
        }
        return -1
    }


    const handleOnIncrease = (id, quantity) => {
        // const quantity = 100
        const index = getIndex(id, cart)
        const action = setQuantityInCart({ id, quantity: Math.min(cart[index].instock, quantity + 1) })
        dispatch(action)

    }


    const handleOnDecrease = (id, quantity) => {
        const action = setQuantityInCart({ id, quantity: quantity - 1 })
        dispatch(action)
    }


    const handleOnDelete = (id) => {
        const action = removeProduct({ id })
        console.log(action)
        dispatch(action)
    }





    return (
        <Container className="review">
            {/* {console.log(cart)} */}
            <h1 className="review__title">Review Your Bag</h1>
            <Row>
                <Col md="9" >
                    {cart.map((item) => (
                        <div key={item.id}>
                            <hr />
                            <Row className="item">
                                <Col xs="4" className="item__image">
                                    <img src={cart[getIndex(item.id, cart)].img} className="w-100" alt="This is an product" />
                                </Col>
                                <Col xs="8" className="item__detail">
                                    <div className="item__top">
                                        <div className="item__title">
                                            {item.title}
                                        </div>
                                        <div className="item__price">
                                            {item.price}
                                        </div>
                                    </div>

                                    <div className="item__quantity">
                                        <QuantityAdder
                                            quantity={item.quantity}
                                            maxItems={5}
                                            onIncrease={() => handleOnIncrease(item.id, item.quantity)}
                                            onDecrease={() => handleOnDecrease(item.id, item.quantity)}
                                        />
                                    </div>
                                    <div className="item__delete">
                                        <Button className="button__delete"
                                            color="none"
                                            onClick={() => handleOnDelete(item.id)}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>

                    ))}
                </Col>


                <Col md="3">
                    <div className="fixed">
                        <div className="subtotal">
                            <p className="subtotal__title">Subtotal</p>
                            <p className="subtotal__price">{subtotal}</p>
                        </div>
                        <div className="shipping">
                            <p className="shipping__title">Shipping:</p>
                            <p className="shipping__price">FREE</p>
                        </div>
                        <hr />
                        <div className="total">
                            <p className="total__title">Total</p>
                            <p className="total__price">{subtotal}</p>
                        </div>
                        <div className="voucher">
                            <p>You have voucher?</p>
                            <p>Click here</p>
                        </div>

                        <div className="review__checkout">
                            <Link to='/checkout' className={{ textDecoration: 'none', color: 'inherit', }}>
                                <Button className="review__button">Checkout</Button>
                            </Link>
                            <Link to='#' className={{ textDecoration: 'none', color: 'inherit' }}>
                                <Button className="review__pay">Pay with installments</Button>
                            </Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )



}



export default Review