import React from 'react';
import PropTypes from 'prop-types';
import { Col, Container, Row } from 'reactstrap';
import Images from 'constants/images';
import Avatar from 'react-avatar';
import 'components/ProductDetail/CommentCard/CommentCard.scss';
import Rating from 'feature/Rating/Rating';

CommentCard.propTypes = {

};

CommentCard.defaultProps = {
    imageList: [],
}

function CommentCard(props) {
    const { username, rating, avatar, comment, imageList } = props;
    return (
        <Container className='comment-card'>
            <div className='comment-card__avatar-wrapper'>
                <Avatar round={true} size={50} src={avatar} />
            </div>
            <div className='comment-card__info'>
                <div>{username}</div>
                <div><Rating rating={rating} /></div>
                <div>{comment}</div>
                <div>
                    {imageList.map((src, index) => (
                        <img src={src} />
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default CommentCard;