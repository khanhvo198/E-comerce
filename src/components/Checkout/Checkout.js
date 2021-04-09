import QuantityAdder from "components/ProductDetail/QuantityAdder/QuantityAdder";
import { useDispatch, useSelector } from "react-redux"
import { Container, Row, Col, Button } from "reactstrap"
import {setQuantity} from '../../feature/Cart/CartSlice'


const Checkout = () => {

    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch()




    const handleOnIncrease = (id, quantity) => {
        // const quantity = 100
        const action = setQuantity({id, quantity: quantity+1})
        dispatch(action)
        
    }


    const handleOnDecrease = (id) => {

    }



    return (

        
        
        <Container className="checkout">
            {console.log(cart)}
            {
                cart.map((item) => (
                    <Row className="item">
                        <Col xs="4" className="item__image">
                            <img src={item.img} />
                        </Col>
                        <Col xs="8" className="item__detail">
                            <div className="item__title">
                                {item.title}
                            </div>
                            <div className="item__quantity">
                                <QuantityAdder 
                                    quantity={item.quantity}
                                    maxItems={5}
                                    onIncrease={() => handleOnIncrease(item.id, item.quantity)}
                                    onDecrease={handleOnDecrease}
                                />
                            </div>

                            <div className="item__price">

                            </div>
                            <Button className="button_delete" color="danger">
                                Delete
                            </Button>
                        </Col>
                    </Row>
                ))
            }
            




        </Container>



    )



}



export default Checkout