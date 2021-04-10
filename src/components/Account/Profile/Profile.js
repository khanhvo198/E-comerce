import React from 'react';
import PropTypes from 'prop-types';
import '../Profile/Profile.scss';
import { Col, Row } from 'reactstrap';
import Avatar from 'react-avatar';
import Images from 'constants/images';

Profile.propTypes = {

};

function Profile(props) {
    return (
        <div className='profile'>
            <div className='profile__detail'>
                <div className='profile__header'>My Profile</div>
                <div className='d-flex'>
                    <div className='profile__detail__avatar-wrapper'>
                        <Avatar round={true} size={150} src={Images.SHIN_AVATAR} />
                    </div>
                    <div className='profile__detail__content'>
                        <Row>
                            <Col>Full name:</Col>
                            <Col>Nohara Shinosuke</Col>
                        </Row>
                        <Row>
                            <Col>Email:</Col>
                            <Col>shinosuke@gmail.com</Col>
                        </Row>
                        <Row>
                            <Col>Phone:</Col>
                            <Col>0123456789</Col>
                        </Row>
                        <Row>
                            <Col>Gender:</Col>
                            <Col>Nohara Shinosuke</Col>
                        </Row>
                        <Row>
                            <Col>Birthday:</Col>
                            <Col>Nohara Shinosuke</Col>
                        </Row>
                    </div>
                    <div>Button</div>
                </div>
            </div>
            <div className='profile__address'>
                <div className='profile__header'>Address Book</div>
            </div>
        </div>
    );
}

export default Profile;