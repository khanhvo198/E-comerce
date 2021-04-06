import React from 'react';
import PropTypes from 'prop-types';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

Rating.propTypes = {

};

function Rating(props) {
    const { rating } = props;
    const MAX_RATING = 5;

    function display(rating) {
        var ratingList = [];
        for (let i = 0; i < MAX_RATING; i++) {
            if (rating === 0) {
                ratingList.push(<AiOutlineStar color='red' />)
            } else {
                ratingList.push(<AiFillStar color='red' />)
                rating -= 1
            }
        }
        return ratingList
    }

    return (
        <div>
            {display(rating).map((star, index) => (
                star
            ))}
        </div>
    );
}

export default Rating;