import { addProduct, setQuantityInCart } from "feature/Cart/CartSlice";
import Rating from 'feature/Rating/Rating';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Container, Row } from 'reactstrap';
import QuantityAdder from '../QuantityAdder/QuantityAdder';
import './ProductCard.scss';

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
    const { title, commentList, numItemsSold, price, img, specification } = props
    const { brand, cpu, Ram, storage, design, size, guarantee } = specification
    const [quantity, setQuantity] = useState(1);
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();

    const getIndex = (id, cart) => {
        for (let i = 0; i < cart.length; i++) {
            if (id === cart[i].id) {
                return i
            }
        }
        return -1
    }


    const handleOnAddToCart = () => {
        const action = addProduct({ ...props, quantity });
        const index = getIndex(props.id, cart)
        const isAdd = index === -1 ? false : true

        if (isAdd) {
            const action = setQuantityInCart({ id: props.id, quantity: quantity + cart[index].quantity })
            dispatch(action)
            return
        }

        dispatch(action)
    }

    const handleOnIncrease = () => {
        setQuantity(quantity + 1)
    }

    const handleOnDecrease = () => {
        setQuantity(quantity - 1)
    }

    const rating = () => {
        const numRating = commentList.length || 10e4
        return Math.round(commentList.reduce((sum, comment) => (sum + comment.rating), 0) / numRating)
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
                            {/* href MUST be #comment-card for correct linking to CommentCard */}
                            <a href='#comment-card' className='productcard__info__rating'>
                                <div className='productcard__info__statistic__number'>{rating()}</div>
                                <Rating rating={rating()} />
                            </a>
                            <div>|</div>
                            {/* href MUST be #comment-card for correct linking to CommentCard */}
                            <a href='#comment-card' className='productcard__info__comment'><span className='productcard__info__statistic__number'>{commentList.length}</span><span>comments</span></a>
                            <div>|</div>
                            <div className='productcard__info__itemsold'><span className='productcard__info__statistic__number'>{numItemsSold}</span><span>items sold</span></div>
                        </div>
                        <div className='productcard__info__price'>{price}$</div>
                        <Container className='productcard__info__specification'>
                            <Row>
                                <Col lg='4' className='productcard__info__specification--key'>Brand:</Col>
                                <Col lg='7' className='productcard__info__specification--value'>{brand}</Col>
                            </Row>
                            <Row>
                                <Col lg='4' className='productcard__info__specification--key'>CPU:</Col>
                                <Col lg='7' className='productcard__info__specification--value'>{cpu}</Col>
                            </Row>
                            <Row>
                                <Col lg='4' className='productcard__info__specification--key'>RAM:</Col>
                                <Col lg='7' className='productcard__info__specification--value'>{Ram}</Col>
                            </Row>
                            <Row>
                                <Col lg='4' className='productcard__info__specification--key'>Storage:</Col>
                                <Col lg='7' className='productcard__info__specification--value'>{storage}</Col>
                            </Row>
                            <Row>
                                <Col lg='4' className='productcard__info__specification--key'>Design:</Col>
                                <Col lg='7' className='productcard__info__specification--value'>{design}</Col>
                            </Row>
                            <Row>
                                <Col lg='4' className='productcard__info__specification--key'>Size:</Col>
                                <Col lg='7' className='productcard__info__specification--value'>{size}</Col>
                            </Row>
                            <Row>
                                <Col lg='4' className='productcard__info__specification--key'>Guarantee:</Col>
                                <Col lg='7' className='productcard__info__specification--value'>{guarantee}</Col>
                            </Row>
                            {/* {Object.keys(specification).map((key, index) => (
                                <Row>
                                    <Col lg='4' className='productcard__info__specification--key'>{capitalize(key)}</Col>
                                    <Col lg='7' className='productcard__info__specification--value'>{specification[key]}</Col>
                                </Row>
                            ))} */}
                        </Container>
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