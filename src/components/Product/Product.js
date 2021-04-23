import Rating from 'feature/Rating/Rating'
import { BsStarFill } from 'react-icons/bs'
import { Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap"
import "./Product.css"

const Product = (props) => {
    const { image, title, price, rating } = props
    return (
        // <Col xs="3">
        <Card className="product">
            <CardImg top width="100%" src={image} alt="Card Image" className="product__image" />
            <CardBody>
                <CardTitle className="product__title">{title}</CardTitle>
                <CardText className="product__price">{price}<span> <small>$</small></span></CardText>

                <Rating rating={rating} />
            </CardBody>
        </Card>
        // </Col>

    )


}


export default Product