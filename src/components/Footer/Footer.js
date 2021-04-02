import { Col, List, ListInlineItem, Row } from "reactstrap"
import {AiOutlineFacebook} from 'react-icons/ai'
import "./Footer.css"




const Footer = () => {
    return (

        <>
            <Row className="footer--container">
                <Col xs="8" className="footer--left__container">
                    <List type="inline" className="footer--left">
                        <ListInlineItem>About</ListInlineItem>
                        <ListInlineItem>Contact</ListInlineItem>
                        <ListInlineItem>Pricing</ListInlineItem>
                    </List>
                    <p>©Copyright 2021 BK Shop</p>
                </Col>
                <Col xs="4">
                    <AiOutlineFacebook className="footer-icon"/>
                </Col>
            </Row>
        </>
    )


}


export default Footer