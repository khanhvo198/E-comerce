import QuantityAdder from "components/ProductDetail/QuantityAdder/QuantityAdder";
import Images from "constants/images";
import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col, Button } from "reactstrap"
import {setQuantityInCart} from '../../feature/Cart/CartSlice'

import './Checkout.css'
const Checkout = () => {

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()




    const handleOnIncrease = (id, quantity) => {
        // const quantity = 100
        const action = setQuantityInCart({id, quantity: quantity+1})
        dispatch(action)
        
    }


    const handleOnDecrease = (id) => {

    }



    return (

        
        
        <Container className="checkout">
            {/* {console.log(cart)} */}
             
                <h1 className="checkout__title">Review Your Bag</h1>
                <Col xs="9" >
                    {cart.map((item) => (
                        <div>
                            <hr />
                            <Row className="item">
                                <Col xs="4" className="item__image">
                                    <img src={Images.THUMBNAIL} className="w-100" />
                                </Col>
                                <Col xs="8" className="item__detail">
                                    <div className="item__top">
                                        <div className="item__title">
                                            {item.title}
                                        </div>
                                        <div className="item__price">
                                            {item.price } 
                                        </div>
                                    </div>

                                    <div className="item__quantity">
                                        <QuantityAdder 
                                            quantity={item.quantity}
                                            maxItems={5}
                                            onIncrease={() => handleOnIncrease(item.id, item.quantity)}
                                            onDecrease={handleOnDecrease}
                                        />
                                    </div>
                                    <div className="item__delete">
                                        <Button className="button__delete" color="none">Remove</Button>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                        
                    ))}
                </Col>

                <Col xs="3">

                </Col>
                
        </Container>



    )



}



export default Checkout