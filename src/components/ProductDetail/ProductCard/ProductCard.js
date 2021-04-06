import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardBody, CardTitle, Row, Col, Container, Button } from 'reactstrap';
import Images from 'constants/images';
import { AiFillStar } from "react-icons/ai";
import './ProductCard.scss';
import QuantityAdder from '../QuantityAdder/QuantityAdder';
import { addProduct } from "feature/Cart/CartSlice"
import { useRouteMatch } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

// ProductCard.propTypes = {
//     id: PropTypes.number.isRequired,
//     title: PropTypes.string.isRequired,
//     rating: PropTypes.number.isRequired,
//     numComments: PropTypes.number.isRequired,
//     numItemsSold: PropTypes.number.isRequired,
//     price: PropTypes.number.isRequired,
//     description: PropTypes.string.isRequired,
//     img: PropTypes.string.isRequired,
// };

function ProductCard(props) {
    const { title, rating, numComments, numItemsSold, price, description, img } = props
    const [quantity, setQuantity] = useState(1);
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();

    const handleOnAddToCart = () => {
        const action = addProduct({ ...props, quantity });
        // console.log({action})
        dispatch(action)
        localStorage.setItem('added', true)
    }

    const handleOnIncrease = () => {
        setQuantity(quantity + 1)
    }

    const handleOnDecrease = () => {
        setQuantity(quantity - 1)
    }

    return (
        <div>
            <Container className='my-5'>
                <Row className='justify-content-between'>
                    <Col lg='6'>
                        <Row className='justify-content-between mb-3'>
                            <Col lg='12' className='px-2 mb-3'><img alt='macbook' className='img-fluid' src={img} /></Col>
                            <Col lg='4' className='px-2 mb-3'><img alt='macbook' className='img-fluid' src={img} /></Col>
                            <Col lg='4' className='px-2 mb-3'><img alt='macbook' className='img-fluid' src={img} /></Col>
                            <Col lg='4' className='px-2 mb-3'><img alt='macbook' className='img-fluid' src={img} /></Col>
                        </Row>
                    </Col>
                    <Col className='d-flex flex-column align-items-start' lg='6'>
                        <h1>{title}</h1>
                        <div style={{ display: 'flex', justifyContent: 'start' }}>
                            <div className='mx-2 d-flex'>
                                <div>{rating}</div>
                                {[...Array(5)].map(() => (
                                    <div><AiFillStar color='red' /></div>
                                ))}
                            </div>
                            <div>|</div>
                            <div className='mx-2'>{numComments} comments</div>
                            <div>|</div>
                            <div className='mx-2'>{numItemsSold} items sold</div>
                        </div>
                        <h3 className='price'>{price}$</h3>
                        <h2 className='description'>Description</h2>
                        <div className='text-left'>{description}</div>
                        <div className='d-flex align-items-center'>
                            <div className='quantity'>Quantity:</div>
                            <QuantityAdder quantity={quantity} maxItems={5} onIncrease={handleOnIncrease} onDecrease={handleOnDecrease} />
                        </div>
                        <Button color="primary"
                            onClick={handleOnAddToCart}
                            disabled={localStorage.getItem('added')}
                        >
                            Add to cart
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default ProductCard;