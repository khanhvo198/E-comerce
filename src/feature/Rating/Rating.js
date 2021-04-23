import Policy from 'constants/policy';
import React from 'react';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

Rating.propTypes = {

};

Rating.defaultProps = {
    maxRating: Policy.MAX_RATING,
    rating: 5,
    size: 15,
    onSelect: null,
}

function Rating(props) {
    const { rating, size, onSelect, maxRating } = props

    const display = (rating) => {
        var ratingList = [];
        for (let i = 0; i < maxRating; i++) {
            if (rating === 0) {
                ratingList.push(<span onClick={() => handleIconClick(i + 1)}><AiOutlineStar size={size} color='red' /></span>)
            } else {
                ratingList.push(<span onClick={() => handleIconClick(i + 1)}><AiFillStar size={size} color='red' /></span>)
                rating -= 1
            }
        }
        return ratingList
    }

    const handleIconClick = (index) => {
        if (onSelect) {
            onSelect(index)
        }
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