import 'components/ProductDetail/RatingBlock/RatingBlock.scss';
import Rating from 'feature/Rating/Rating';
import PropTypes from 'prop-types';
import React from 'react';
import { Col, Container, Progress, Row } from 'reactstrap';

RatingBlock.propTypes = {
    ratingList: PropTypes.array.isRequired,
};

function RatingBlock(props) {
    const { ratingList } = props
    const MAX_RATING = 5
    const sumRating = ratingList.reduce((a, b) => a + b, 0)
    const averageRating = (ratingList.map((numRating, index) => (
        numRating * (MAX_RATING - index)
    )).reduce((a, b) => a + b, 0) / sumRating).toFixed(1)

    return (
        <div className='rating-block'>
            <div className='rating-block__average'>
                <Rating size={30} rating={Math.round(averageRating)} />
                <div className='rating-block__average__number'>{averageRating} out of {MAX_RATING}</div>
            </div>
            <Container className='rating-block__detail'>
                {ratingList.map((numRating, index) => {
                    const percentage = Math.round(numRating / sumRating * 100)
                    return (
                        < Row >
                            <Col lg='2'>{MAX_RATING - index} stars</Col>
                            <Col lg='8'><Progress value={percentage} /></Col>
                            <Col lg='2'>{percentage}%</Col>
                        </Row>
                    );
                })}
            </Container>
        </div >
    );
}

export default RatingBlock;