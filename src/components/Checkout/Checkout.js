import { Button } from "reactstrap"
import Images from "constants/images"
import { useSelector } from "react-redux"
import { Col, Container, Row } from "reactstrap"
import {Link} from 'react-router-dom'
import './Checkout.css'
const Checkout = () => {

    const cart = useSelector(state => state.cart)

    console.log(cart)

    const item = cart[0]



    return (
        <Container className="checkout">
            {
                cart.map(item => (
                    <Row className="checkout__item">
                    <Col xs="3" className="checkout__item--image">
                        <img src={Images.THUMBNAIL} />
                    </Col>
                    <Col xs="4" className="checkout__item--detail">
                        <div className="checkout__item--title">
                            {item.title}
                        </div>
                        <div className="checkout__item--quantity">
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    </Col>
                    <Col xs="2" className="checkout__item--price">
                        <div className="price">
                            {item.price}
                        </div>
                    </Col>
                    </Row>
                ))
            }


            <Row className="checkout__information">
                <p>CHECKOUT</p>
                <div className="information">
                    <Row className="checkout__address">
                        <Col xs='6' className="checkout__address--detail"><b>Address:</b>  300/118/10 XVNT Bình Thạnh, HCM City</Col>
                        <Col xs='6' className="checkout__address-button"><Link to='/account'>Edit</Link></Col>
                    </Row>
                    <Row className="checkout__phone">
                        <span><b>Phone:</b> 09234238</span>
                    </Row>
                    <Row className="checkout__total">
                        <span><b>Total Price:</b> 200</span>
                    </Row>
                    <Row className="checkout__voucher">
                        <span><b>Voucher:</b> Freeship </span>
                    </Row>
                </div>
            </Row>
            <Row className="checkout__button">
                <Button color='none' className="checkout__button--order">ORDER</Button>
            </Row>
            
        </Container>
        

    )

}




export default Checkout