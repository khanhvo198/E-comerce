import { useState } from "react"
import { AiOutlineSearch } from 'react-icons/ai'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { Form ,Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, FormGroup, Input, InputGroup, InputGroupAddon, List, Row } from "reactstrap"
import Cart from "../../feature/Cart/Cart"
import "./Header.css"
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { useDispatch, useSelector } from "react-redux"
import { signOut } from "app/UserSlice"
import NavBar from "components/NavBar/NavBar"


const Header = () => {

    const [dropdownOpen, setDropdownOpen] = useState(false)
    const toggle = () => setDropdownOpen(prevState => !prevState)
    // console.log("User: ", user)
    const user = useSelector(state => state.user)
    const [searchTerm,setSearchTerm] = useState('')
    const dispatch = useDispatch()

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
            const action = signOut()
            dispatch(action)
            history.push("/")
        }).catch((error) => {
            console.log('Logout Error: ', error)
        });
    }


    const handleOnClickSearchBar = () => {
        history.push(`/search?key=${searchTerm}`)
        setSearchTerm('')
        // console.log(searchTerm)
    }

    const handleSubmitForm = (e) => {
        history.push(`/search?key=${searchTerm}`)
        setSearchTerm('')
        e.preventDefault()


    }

    return (
        <>
        <Row className="header">
            <Col xs="2" className="header--link__brand">
                <Link to='/' style={{ textDecoration: 'none', color: 'inherit', alignSelf: 'center' }} >
                    <h3 className="header__brand">BK SHOP</h3>
                </Link>
            </Col>
            {/* <Col xs="8" className="header--search__bar">
                <InputGroup className="header--search__input">
                    <Input placeholder="Search something ..." onChange={event => setSearchTerm(event.target.value)} value={searchTerm}  />
                    <InputGroupAddon className="header--search__icon" addonType="append"
                        onClick = {handleOnClickSearchBar}
                    >
                        <AiOutlineSearch className="header--searchIcon" />
                    </InputGroupAddon>
                </InputGroup>
                <Link to="/review" style={{ color: 'inherit', textDecoration: 'none' }} >
                    <Cart />
                </Link>
            </Col> */}
            <Col md={8}>
                <Form className="header--search__form" onSubmit={handleSubmitForm}>
                    <FormGroup row className="h-100 align-self-center">
                        <Col sm={10} className="d-flex">
                            <Input className="align-self-center" placeholder="Search something ..." onChange={event => setSearchTerm(event.target.value)} value={searchTerm}/>
                            <InputGroupAddon className="header--search__icon" addonType="append"
                                onClick = {handleOnClickSearchBar}
                                style={{cursor:'pointer'}}
                            >
                                <AiOutlineSearch className="header--searchIcon" />
                            </InputGroupAddon>
                        </Col>
                        <Link to="/review" style={{ color: 'inherit', textDecoration: 'none' }} >
                                <Cart />
                        </Link>
                    </FormGroup>
                </Form>
            </Col>
            <Col xs="2" className="header--user">
                <List type="inline" className="header--user__items">
                    {user.isLogin
                        ? <Dropdown isOpen={dropdownOpen} 
                            direction="down"
                            onMouseEnter={toggle}
                            onMouseLeave={toggle}
                            >
                            <DropdownToggle style={{backgroundColor:'inherit',border:'none'}}>
                                <div className="user-info">
                                    <img src={user.photoURL} />
                                    <p>{user.userName}</p>
                                </div>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    {/* temporary */}
                                    <Link to='/account/profile' style={{textDecoration:"none",color:"inherit"}}>
                                        My Profile
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    {/* temporary */}
                                    <Link to='/account/order' style={{textDecoration:"none",color:"inherit"}}>
                                        My Order
                                    </Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <div onClick={handleLogout}>Logout</div>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        // <div className="user-info" onMouseEnter={handleOnMouseEnter} >
                        //     <img src={user.photoURL} />
                        //     <p>{user.userName}</p>
                        // </div>    
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
        <NavBar/>
        </>

    )



}


export default Header