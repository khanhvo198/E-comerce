import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../Profile/Profile.scss';
import { Button, Col, Row, Table } from 'reactstrap';
import Avatar from 'react-avatar';
import Images from 'constants/images';

Profile.propTypes = {

};

const exampleUserInfo = {
    fullname: 'Nohara Shinosuke',
    email: 'shinosuke@gmail.com',
    phone: '0123456789',
    gender: 'Male',
    birthday: '5/5/2015',
    bookingAddress: [
        {
            fullname: 'Nohara Shinosuke',
            address: '268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh',
            phone: '0123456789',
        },
        {
            fullname: 'Kazama Tooru',
            address: '267 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh',
            phone: '0987654321',
        },
    ],
}

function Profile(props) {
    const [userInfo, setUserInfo] = useState(exampleUserInfo)

    useEffect(() => {
        // load user info

    }, [userInfo])

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
                            <Col lg='3' className='profile__detail__content--key'>Full name:</Col>
                            <Col lg='9'>{userInfo.fullname}</Col>
                        </Row>
                        <Row>
                            <Col lg='3' className='profile__detail__content--key'>Email:</Col>
                            <Col lg='9'>{userInfo.email}</Col>
                        </Row>
                        <Row>
                            <Col lg='3' className='profile__detail__content--key'>Phone:</Col>
                            <Col lg='9'>{userInfo.phone}</Col>
                        </Row>
                        <Row>
                            <Col lg='3' className='profile__detail__content--key'>Gender:</Col>
                            <Col lg='9'>{userInfo.gender}</Col>
                        </Row>
                        <Row>
                            <Col lg='3' className='profile__detail__content--key'>Birthday:</Col>
                            <Col lg='9'>{userInfo.birthday}</Col>
                        </Row>
                    </div>
                    <div>
                        <Button className='profile__detail__button' color='primary'>
                            EDIT PROFILE
                        </Button>
                        <Button className='profile__detail__button' color='primary'>
                            CHANGE PASSWORD
                        </Button>
                    </div>
                </div>
            </div>


            <div className='profile__address'>
                <div className='profile__header'>Address Book</div>
                <Table hover>
                    <thead>
                        <tr>
                            <th>Full name</th>
                            <th>Address</th>
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            userInfo.bookingAddress.map((info, index) => (
                                <tr>
                                    <td>{info.fullname}</td>
                                    <td>{info.address}</td>
                                    <td>{info.phone}</td>
                                    <td><a href='#'>Edit</a></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Profile;