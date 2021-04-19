import React from 'react';
import PropTypes from 'prop-types';
import Profile from './Profile/Profile';
import { Col, Container, Row } from 'reactstrap';
import { Switch, Route, useRouteMatch, Link, Redirect } from 'react-router-dom'
import Order from './Order/Order';
import '../Account/Account.scss';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';
import SideBar from 'components/SideBar/SideBar';

Account.propTypes = {

};

Account.defaultProps = {
    isAdmin: false,
}

function Account(props) {
    const { isAdmin } = props
    const match = useRouteMatch()

    const sideItems = isAdmin
        ? [
            {
                icon: <ImProfile size={30} />,
                title: 'My Profile',
                link: `${match.url}/profile`,
            },
            {
                icon: <ImProfile size={30} />,
                title: 'My Profile',
                link: `${match.url}/profile`,
            },
            {
                icon: <ImProfile size={30} />,
                title: 'My Profile',
                link: `${match.url}/profile`,
            },
        ]
        : [
            {
                icon: <ImProfile size={30} />,
                title: 'My Profile',
                link: `${match.url}/profile`,
            },
            {
                icon: <AiOutlineShoppingCart size={30} />,
                title: 'My Order',
                link: `${match.url}/order`,
            },
        ]

    return (
        <div className='account'>
            <Row>
                <Col lg='1' className='account__nav'>
                    <SideBar sideItems={sideItems} />
                </Col>
                <Col lg='10' className='account__content'>
                    <Switch>
                        <Route path={`${match.url}/profile`}>
                            <Profile />
                        </Route>
                        <Route path={`${match.url}/order`}>
                            <Order />
                        </Route>
                        <Redirect from={`${match.url}/`} to={`${match.url}/profile`} />
                    </Switch>
                </Col>
                <Col lg='2'>
                </Col>
            </Row>
        </div>
    );
}

export default Account;