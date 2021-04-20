import { useState } from "react"
import { AiOutlineSearch } from 'react-icons/ai'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, InputGroupAddon, List, Row } from "reactstrap"
import Cart from "../../feature/Cart/Cart"
import "./Header.css"
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


const Header = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = () => setDropdownOpen(prevState => !prevState)
    const user = firebase.auth().currentUser

    const uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            // firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            {
                provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                customParameters: { prompt: 'select_account' },
            },
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ],
        callbacks: {
            // Avoid redirects after sign-in.
            signInSuccessWithAuthResult: () => false,
        },
    };

    const history = useHistory()
    const handleLogout = () => {
        firebase.auth().signOut().then(() => {
            console.log('Logout')
            history.push("/")
        }).catch((error) => {
            console.log('Logout Error: ', error)
        });
    }

    return (

        <Row className="header">
            <Col xs="2" className="header--link__brand">
                <Link to='/' style={{ textDecoration: 'none', color: 'inherit', alignSelf: 'center' }} >
                    <h3 className="header__brand">BK SHOP</h3>
                </Link>
            </Col>
            <Col xs="8" className="header--search__bar">
                <InputGroup className="header--search__input">
                    <Input placeholder="Search something ..." />
                    <InputGroupAddon className="header--search__icon" addonType="append">
                        <AiOutlineSearch className="header--searchIcon" />
                    </InputGroupAddon>
                </InputGroup>
                <Link to="/review" style={{ color: 'inherit', textDecoration: 'none' }} >
                    {/* <AiOutlineShoppingCart className="header--cart"/>
                        <span className="header--cart__count">0</span> */}
                    <Cart />
                </Link>
            </Col>
            <Col xs="2" className="header--user">
                <List type="inline" className="header--user__items">
                    {user
                        ? <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
                            <DropdownToggle caret>
                                Avatar
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    {/* temporary */}
                                    <Link to='/account/profile'>
                                        My Profile
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    {/* temporary */}
                                    <Link to='/account/order'>
                                        My Order
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <div onClick={handleLogout}>Logout</div>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        : <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="left">
                            <DropdownToggle caret>
                                Login
                        </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>}
                </List>
            </Col>
        </Row>

    )



}


export default Header