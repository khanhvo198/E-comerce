import React from 'react';
import PropTypes from 'prop-types';
import Profile from './Profile/Profile';
import { Col, Container, Row } from 'reactstrap';
import { Switch, Route, useRouteMatch, Link, Redirect } from 'react-router-dom'
import Order from './Order/Order';
import '../Account/Account.scss';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { ImProfile } from 'react-icons/im';

Account.propTypes = {

};

function Account(props) {
    const match = useRouteMatch()
    return (
        <div className='account'>
            <Row>
                <Col lg='2'>
                    <div className='account__nav--profile'>
                        <Link to={`${match.url}/profile`}>
                            <ImProfile size={30} />
                            <span>My Profile</span>
                        </Link>
                    </div>
                    <div className='account__nav--order'>
                        <Link to={`${match.url}/order`}>
                            <AiOutlineShoppingCart size={30} />
                            <span>My Order</span>
                        </Link>
                    </div>
                </Col>
                <Col lg='10'>
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