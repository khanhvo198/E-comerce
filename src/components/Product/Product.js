import { Card, CardBody, CardImg, CardTitle, CardText, Col } from "reactstrap"
import { BsStarFill } from 'react-icons/bs'
import "./Product.css"

const Product = ({ image, title, price, rating }) => {
    return (
        <Col xs="3">
            <Card className="product">
                <CardImg top width="100%" src={image} alt="Card Image" className="product__image" />
                <CardBody>
                    <CardTitle className="product__title">{title}</CardTitle>
                    <CardText className="product__price">{price}<span> <small>VNĐ</small></span></CardText>

                    <div className="product__rating">
                        {
                            Array(rating).fill().map((_, i) => (
                                <p><BsStarFill /></p>
                            ))
                        }
                    </div>
                </CardBody>
            </Card>
        </Col>

    )


}


export default Product