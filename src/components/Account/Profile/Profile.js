import Images from "constants/images";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { Button, Col, Container, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Table, FormGroup, Form, Label } from "reactstrap";
import "../Profile/Profile.scss";
import firebase from "firebase";
import db from "firebase/firebase.config";
import { useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
Profile.propTypes = {};

const exampleUserInfo = {
    fullname: "Nohara Shinosuke",
    email: "shinosuke@gmail.com",
    phone: "0123456789",
    gender: "Male",
    birthday: "5/5/2015",
    bookingAddress: [
        {
            fullname: "Nohara Shinosuke",
            address: "268 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh",
            phone: "0123456789",
        },
        {
            fullname: "Kazama Tooru",
            address: "267 Lý Thường Kiệt, Phường 14, Quận 10, Thành phố Hồ Chí Minh",
            phone: "0987654321",
        },
    ],
};

function Profile(props) {
    // const [userInfo, setUserInfo] = useState(exampleUserInfo)

    const [userInfo, setUserInfo] = useState({});
    const [bookingAddress, setBookingAddress] = useState({})
    const user = useSelector((state) => state.user);

    useEffect(async () => {
        // load user info
        // console.log(user.uid)
        const currentUser = await db.collection("Users").doc(user.uid).get();
        // console.log(currentUser.data())
        // setRealUser(currentUser.data())
        setUserInfo(currentUser.data());
        // console.log(currentUser.data())
    }, []);
    const [modalProfile, setModalProfile] = useState(false);
    const [modalBookingAddress, setModalBookingAddress] = useState(false)
    const [modalEditBookingAddress, setModalEditBookingAddress] = useState(false)
    const [indexOfEditAddress,setIndexOfEditAddress] = useState(0)
    const toggleEditBookingAddress = () => setModalEditBookingAddress(false)
    const toggleEditProfile = () => setModalProfile(!modalProfile);
    const toggleBookingAddress = () => {
        setModalBookingAddress({})
        setModalBookingAddress(!modalBookingAddress)
    }


    const handleEditBookingAddress = () => {
        userInfo.bookingAddress[indexOfEditAddress] = bookingAddress
        setModalEditBookingAddress(!modalEditBookingAddress)
        const userRef = db.collection("Users").doc(user.uid)
        userRef.set(userInfo)


    }

    const handleOnClickEditAddress = (index) => {
        setBookingAddress(userInfo.bookingAddress[index])
        setIndexOfEditAddress(index)
        setModalEditBookingAddress(!modalEditBookingAddress)
        console.log(bookingAddress)
    }

    const handleSaveProfile = async () => {
        const userRef = db.collection("Users").doc(user.uid)
        const doc = await userRef.get()
        userRef.set(userInfo)

        setModalProfile(!modalProfile)
    }


    const handleSaveBookingAddress = () => {
        if(!userInfo.bookingAddress) {
            userInfo.bookingAddress = []
        }
        userInfo.bookingAddress.push(bookingAddress)
        const userRef = db.collection("Users").doc(user.uid)
        userRef.set(userInfo)
        setModalBookingAddress(!modalBookingAddress)
    }

    const handleOnClickDeleteAddress = (index) => {
        // console.log(userInfo.bookingAddress[index]) 
        const userRef = db.collection("Users").doc(user.uid)
        // userInfo.bookingAddress = userInfo.bookingAddress.splice(index,1)
        
        console.log(userInfo)
        setUserInfo(userInfo.bookingAddress.splice(index,1))
        userRef.set(userInfo)
    }

    return (
        <div className="profile">
            <Container>
                <div className="profile__header">My Profile</div>
                <div className="profile__detail">
                    <Row>
                        <Col lg="3" className="profile__detail__avatar-wrapper">
                            {console.log(userInfo)}
                            <Avatar round={true} size={200} src={userInfo.photoURL} />
                            {/* <div>Change Avatar</div> */}
                        </Col>

                        <Col lg="6">
                            <Table borderless>
                                <tbody>
                                    <tr>
                                        <th scope="row">Full name:</th>
                                        <td>{userInfo.displayName}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Email:</th>
                                        <td>{userInfo.email}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Phone:</th>
                                        <td>{userInfo.phone}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Gender:</th>
                                        <td>{userInfo.gender ? userInfo.gender : ""}</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">Birthday:</th>
                                        <td>{userInfo.birthday ? userInfo.birthday : ""}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>

                        <Col lg="3">
                            <div>
                                <Button className="profile__detail__button" color="primary" onClick={toggleEditProfile}>
                                    EDIT PROFILE
                                </Button>
                            </div>
                            <div>
                                <Button className="profile__detail__button" color="primary">
                                    CHANGE PASSWORD
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </div>

                <div className="profile__header">Address Book</div>
                <div className="profile__address">
                    <Button color="primary" className="d-flex  justify-content-end"
                        onClick={toggleBookingAddress}    
                    >
                        Add address
                    </Button>
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
                                userInfo.bookingAddress ? userInfo.bookingAddress.map((info, index) => (
                                    <tr key={index}>
                                        <td>{info.fullname}</td>
                                        <td>{info.address}</td>
                                        <td>{info.phone}</td>
                                        <td>
                                            <Button color="primary" onClick={() => handleOnClickEditAddress(index)} >Edit</Button> {" | "} 
                                            <Button color="danger"  onClick={() => handleOnClickDeleteAddress(index)}>Delete </Button>
                                        </td>
                                    </tr>
                                )) : ''
                            }
                        </tbody>
                    </Table>
                </div>

                <Modal isOpen={modalProfile} toggle={toggleEditProfile}>
                    <ModalHeader toggle={toggleEditProfile}>Edit Profile</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="full-name">Full name:</Label>
                                <Input placeholder="Full name" disabled value={userInfo.displayName} />
                            </FormGroup>
                            
                            <br/>

                            <FormGroup>
                                <Label for="email">Email:</Label>
                                <Input placeholder="Email" disabled value={userInfo.email}/>
                            </FormGroup>


                            <br/>

                            <FormGroup>
                                <Label for="phone">Phone:</Label>
                                <Input type="number" placeholder="Phone" value={userInfo.phone} onChange={event => setUserInfo({...userInfo,phone:event.target.value})} />
                            </FormGroup>


                            <br/>

                            <FormGroup>
                                <Label for="gender">Gender:</Label>
                                <Input type="select" placeholder="Gender" value={userInfo.gender} onChange={event => setUserInfo({...userInfo,gender:event.target.value})}>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>    
                                    <option value="Other">Other</option>
                                </Input>
                            </FormGroup>


                            <br/>
                            <FormGroup>
                                <Label for="birthday">Birthday:</Label>
                                <Input type="date" placeholder="Birthday:"  value={userInfo.birthday} onChange={event=> setUserInfo({...userInfo, birthday:event.target.value})}   />
                            </FormGroup>
                        </Form>



                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={handleSaveProfile}>
                            Save profile
                        </Button>{" "}
                        <Button color="secondary" onClick={toggleEditProfile}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>




                <Modal isOpen={modalBookingAddress} toggle={toggleBookingAddress} >
                    <ModalHeader toggle={toggleBookingAddress}>Add Booking Address</ModalHeader>
                    <ModalBody>
                        <Form>

                            <FormGroup>
                                <Label for="full-name">Full name:</Label>
                                <Input placeholder="Full name" onChange={event => setBookingAddress({...bookingAddress, fullname: event.target.value})} />
                            </FormGroup>


                            <FormGroup>
                                <Label for="full-name">Address:</Label>
                                <Input  placeholder="Address" onChange={event => setBookingAddress({...bookingAddress, address: event.target.value})} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="full-name">Phone:</Label>
                                <Input  type="number" placeholder="Phone" onChange={event => setBookingAddress({...bookingAddress, phone: event.target.value}) }/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={handleSaveBookingAddress}>Save Address</Button>{' '}
                    <Button color="secondary" onClick={toggleBookingAddress}>Cancel</Button>
                    </ModalFooter>
                </Modal>




                <Modal isOpen={modalEditBookingAddress} toggle={toggleEditBookingAddress} >
                    <ModalHeader toggle={toggleEditBookingAddress}>Edit Booking Address</ModalHeader>
                    <ModalBody>
                        <Form>

                            <FormGroup>
                                <Label for="full-name">Full name:</Label>
                                <Input placeholder="Full name" value={bookingAddress.fullname} onChange={event => setBookingAddress({...bookingAddress, fullname: event.target.value})} />
                            </FormGroup>


                            <FormGroup>
                                <Label for="full-name">Address:</Label>
                                <Input  placeholder="Address" value={bookingAddress.address} onChange={event => setBookingAddress({...bookingAddress, address: event.target.value})} />
                            </FormGroup>

                            <FormGroup>
                                <Label for="full-name">Phone:</Label>
                                <Input  type="number" placeholder="Phone" value={bookingAddress.phone} onChange={event => setBookingAddress({...bookingAddress, phone: event.target.value}) }/>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                    <Button color="primary" onClick={handleEditBookingAddress}>Save Address</Button>{' '}
                    <Button color="secondary" onClick={toggleEditBookingAddress}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Container>
        </div>
    );
}

export default Profile;
