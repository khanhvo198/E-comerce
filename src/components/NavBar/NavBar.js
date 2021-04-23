import Images from 'constants/images';
import React from 'react';
import {
    Col, Container, Nav, Navbar,
    NavItem,
    NavLink, Row
} from 'reactstrap';
import './NavBar.css'
const NavBar = () => {
    return (
            <Navbar color="light" light expand="md" className="p-0">
                <Container className="p-0">
                    <Row>
                        <Nav className="mr-auto container-brand" navbar>
                            <Col xs='1'>
                                <NavLink href="/search?key=apple" className="nav-link-custom">
                                    <div className="item-container">
                                        <img src={Images.APPLE_BRAND} />
                                        {/* <p>APPLE</p> */}
                                    </div>
                                </NavLink>
                            </Col>
                            <Col xs='1'>
                                <NavLink href="/search?key=xiaomi">
                                    <div className="item-container">
                                        <img src={Images.XIAOMI_BRAND} />
                                        {/* <p>XIAOMI</p> */}
                                    </div>
                                </NavLink>
                            </Col>
                            <Col xs='1'>
                                <NavLink href="/search?key=huawei">
                                    <div className="item-container">
                                        <img src={Images.HUAWEI_BRAND} />
                                        {/* <p>HUAWEI</p> */}
                                    </div>
                                </NavLink>
                            </Col>
                            <Col xs='1'>
                                <NavLink href="/search?key=lg">
                                    <div className="item-container">
                                        <img src={Images.LG_BRAND} />
                                        {/* <p>LG</p> */}
                                    </div>
                                </NavLink>
                            </Col>
                            <Col xs='1'>
                                <NavLink href="/search?key=hp">
                                    <div className="item-container">
                                        <img src={Images.HP_BRAND} />
                                        {/* <p>HP</p> */}
                                    </div>
                                </NavLink>
                            </Col>
                            <Col xs='1'>
                                <NavLink href="/search?key=dell">
                                    <div className="item-container">
                                        <img src={Images.DELL_BRAND} />
                                        {/* <p>DELL</p> */}
                                    </div>
                                </NavLink>
                            </Col>
                            <Col xs='1'>
                                <NavLink href="/search?key=asus">
                                    <div className="item-container">
                                        <img src={Images.ASUS_BRAND} />
                                        {/* <p>ASUS</p> */}
                                    </div>
                                </NavLink>
                            </Col>
                            <Col xs='1'>
                                <NavLink href="/search?key=vaio">
                                    <div className="item-container">
                                        <img src={Images.VAIO_BRAND} />
                                        {/* <p>VAIO</p> */}
                                    </div>
                                </NavLink>
                            </Col>
                        </Nav>
                    </Row>

                </Container>
            </Navbar>
    );
}

export default NavBar;