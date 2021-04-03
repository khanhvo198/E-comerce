import {  Col, Input, List, Row, InputGroup, InputGroupAddon, Dropdown, DropdownMenu, DropdownItem, DropdownToggle } from "reactstrap"
import { Link } from 'react-router-dom'
import {AiOutlineShoppingCart, AiOutlineSearch} from 'react-icons/ai'
import "./Header.css"
import { useState } from "react"



const Header = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = () => setDropdownOpen(prevState => !prevState)

    return (
        <>
            <Row className="header">
                <Col xs="2" className="header--link__brand">
                    <Link to='/' style={{textDecoration:'none', color:'inherit', alignSelf:'center'}} >
                        <h3 className="header__brand">BK SHOP</h3>
                    </Link>
                </Col>
                <Col xs="8" className="header--search__bar">
                    <InputGroup className="header--search__input">
                        <Input placeholder="Search something ..."/>
                        <InputGroupAddon className="header--search__icon" addonType="append">
                            <AiOutlineSearch className="header--searchIcon" />
                        </InputGroupAddon>
                    </InputGroup>
                    <Link to="/checkout" style={{display: 'flex', color: 'inherit', textDecoration:'none'} } >
                        <AiOutlineShoppingCart className="header--cart"/>
                        <span className="header--cart__count">0</span>
                    </Link>
                </Col>
                <Col xs="2" className="header--user">
                    <List type="inline" className="header--user__items">
                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle caret>
                                Login
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>Facebook</DropdownItem>
                                <DropdownItem>Google</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>

                    </List>
                </Col>
            </Row>
        </>
    )



}


export default Header