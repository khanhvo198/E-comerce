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

ProductCard.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    numComments: PropTypes.number.isRequired,
    numItemsSold: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
};

function ProductCard(props) {
    const { title, rating, numComments, numItemsSold, price, description, img } = props
    const [quantity, setQuantity] = useState(1);
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();

    const handleOnAddToCart = () => {
        const action = addProduct({ ...props, quantity });
        // console.log({action})
        dispatch(action)
    }

    const handleOnIncrease = () => {
        setQuantity(quantity + 1)
    }

    const handleOnDecrease = () => {
        setQuantity(quantity - 1)
    }

    return (
        <div>
            <Container className='productcard'>
                <Row className='justify-content-between'>
                    <Col lg='6'>
                        <Row className='justify-content-between mb-3'>
                            <Col lg='12' className='productcard__img'><img alt='macbook' src={img} /></Col>
                            <Col lg='4' className='productcard__img'><img alt='macbook' src={img} /></Col>
                            <Col lg='4' className='productcard__img'><img alt='macbook' src={img} /></Col>
                            <Col lg='4' className='productcard__img'><img alt='macbook' src={img} /></Col>
                        </Row>
                    </Col>
                    <Col className='productcard__info' lg='6'>
                        <h1>{title}</h1>
                        <div className='productcard__info__statistic'>
                            <div className='productcard__info__rating'>
                                <div>{rating}</div>
                                {[...Array(5)].map(() => (
                                    <div><AiFillStar color='red' /></div>
                                ))}
                            </div>
                            <div>|</div>
                            <div className='productcard__info__comment'>{numComments} comments</div>
                            <div>|</div>
                            <div className='productcard__info__itemsold'>{numItemsSold} items sold</div>
                        </div>
                        <h3 className='productcard__info__price'>{price}$</h3>
                        <h2 className='productcard__info__description--header'>Description:</h2>
                        <div className='productcard__info__description--text'>{description}</div>
                        <div className='productcard__info__quantity'>
                            <div>Quantity:</div>
                            <QuantityAdder quantity={quantity} maxItems={5} onIncrease={handleOnIncrease} onDecrease={handleOnDecrease} />
                        </div>
                        <Button className='productcard__info__addtocart' color='primary'
                            onClick={handleOnAddToCart}
                        >
                            ADD TO CART
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div >
    );
}

export default ProductCard;