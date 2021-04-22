import { Button, Form, FormGroup, Input, InputGroup, Label } from "reactstrap"
import Images from "constants/images"
import { useSelector } from "react-redux"
import { Col, Container, Row } from "reactstrap"
import {Link} from 'react-router-dom'
import './Checkout.css'
import { useEffect, useState } from "react"
import db from "firebase/firebase.config"
const Checkout = () => {

    const cart = useSelector(state => state.cart)
    const user = useSelector(state => state.user)
    const [bookingAddressList, setBookingAddressList] = useState([{}])
    const [currentAddress, setCurrentAddress] = useState({})

    useEffect(() => {
        const fetchAddressList = async () => {
            const currentUser = await db.collection("Users").doc(user.uid).get()
            const doc = currentUser.data().bookingAddress
            setBookingAddressList(doc)
            setCurrentAddress({...doc[0]})
            // setCurrentUser({...user.data()})
            // console.log(currentUser.data().bookingAddress)
        }
        fetchAddressList()
    },[])

    const handleSelectAddress = (event) => {
        const addressSelect = event.target.value
        // console.log(addressSelect)
        const address = bookingAddressList.filter(address => address.address == addressSelect)
        // for(let i = 0 ; i < bookingAddressList.length ; i++) {
        //     if(bookingAddressList[i] ==)
        // }
        // console.log(address)
        setCurrentAddress(address[0])
        // console.log(currentAddress)
    } 

    const handleOnClickOrder = () => {

        const orderCart = cart.map((item) => (
            {
                productid: item.id,
                price:item.price,
                quantity: item.quantity
            }
        ))

        db.collection("Orders").add({
            items: orderCart,
            orderTime: Date(Date.now()),
            status: "Processing",
            userid: user.uid,
            deliverTime: "",

        })
    }



    return (
        <Container className="checkout">
            {
                cart.map( (item,index) => (
                    <Row className="checkout__item" key={index}>
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
                {/* {console.log(bookingAddressList)} */}
                <div className="information">
                    <Row className="checkout__address">
                        <Col xs='10' className="checkout__address--detail">
                                <FormGroup>
                                    <Label for="address"><b>Address:</b></Label>
                                    <Input type="select" onChange={event => handleSelectAddress(event)}>
                                        {/* {console.log(bookingAddressList)} */}
                                        {bookingAddressList.map((item,index) => (
                                            <option value={item.address}>{item.address}</option>
                                        ))}
                                    </Input>
                                </FormGroup>

                        </Col>
                        <Col xs='2' className="checkout__address-button"><Link to='/account'>Edit</Link></Col>
                    </Row>
                    <Row className="checkout__phone">
                        {console.log(currentAddress)}
                        <span><b>Phone:</b> {currentAddress.phone}</span>
                    </Row>
                    <Row className="checkout__total">
                        <span><b>Total Price: {cart?.reduce((amount,item) => amount + item.price*item.quantity, 0)}$</b></span>
                    </Row>
                    <Row className="checkout__voucher">
                        <span><b>Voucher:</b> Freeship </span>
                    </Row>
                </div>
            </Row>
            <Row className="checkout__button">
                <Button color='none' className="checkout__button--order" onClick = {handleOnClickOrder}>ORDER</Button>
            </Row>
            
        </Container>
        

    )

}




export default Checkout