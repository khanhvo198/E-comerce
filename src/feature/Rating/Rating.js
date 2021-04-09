import React from 'react';
import PropTypes from 'prop-types';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

Rating.propTypes = {
};

Rating.defaultProps = {
    rating: 5,
    size: 15,
}

function Rating(props) {
    const { rating, size } = props;
    const MAX_RATING = 5;

    function display(rating) {
        var ratingList = [];
        for (let i = 0; i < MAX_RATING; i++) {
            if (rating === 0) {
                ratingList.push(<AiOutlineStar size={size} color='red' />)
            } else {
                ratingList.push(<AiFillStar size={size} color='red' />)
                rating -= 1
            }
        }
        return ratingList
    }

    return (
        <div className='rating'>
            {display(rating).map((star, index) => (
                star
            ))}
        </div>
    );
}

export default Rating;