import 'components/ProductDetail/CommentCard/CommentCard.scss';
import Rating from 'feature/Rating/Rating';
import React from 'react';
import Avatar from 'react-avatar';
import { Container } from 'reactstrap';
import CommentImageBlock from './CommentImageBlock/CommentImageBlock';

CommentCard.propTypes = {

};

CommentCard.defaultProps = {
    imageList: [],
}

function CommentCard(props) {
    const { username, rating, avatar, comment, imageList } = props;

    const handleImageClick = () => {

    }

    return (
        // id MUST be comment-card for correct linking from ProductCard
        <Container id='comment-card' className='comment-card'>
            <div className='comment-card__avatar-wrapper'>
                <Avatar round={true} size={50} src={avatar} />
            </div>
            <div className='comment-card__info'>
                <div>{username}</div>
                <div><Rating rating={rating} /></div>
                <div>{comment}</div>
                <div className='comment-card__image-block'>
                    <CommentImageBlock imageList={imageList} interval={false} />
                </div>

            </div>
        </Container>
    );
}

export default CommentCard;