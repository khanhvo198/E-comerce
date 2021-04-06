import Images from "constants/images"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useRouteMatch } from "react-router"
import { Button, Card, Col, Container, Row } from "reactstrap"
import { addProduct } from "../../feature/Cart/CartSlice"
import ProductCard from "./ProductCard/ProductCard"


const ProductDetail = () => {
    let match = useRouteMatch()


    const exampleInfo = {
        id: match.params.id,
        price: 29.99,
        rating: 5,
    }

    const [productInfo, setProductInfo] = useState(exampleInfo)

    useEffect(() => {

        // do something to get Product Information

    })


    const dispatch = useDispatch()


    const handleOnClick = () => {
        const action = addProduct(productInfo);
        // console.log({action})
        dispatch(action)
    }



    return (
        <div>
            <ProductCard
                title={'MacBook Pro 13-inch'}
                numStars={5}
                numComments={15}
                numItemsSold={100}
                price={100}
                img={Images.MAC_BOOK_PRO}
                description={'Macbook sieu ben sieu dep Macbook sieu ben sieu dep'.repeat(10)}
            />
            <Button color="primary"
                onClick={handleOnClick}
            >
                Add to cart
            </Button>
        </div>
    )


}


export default ProductDetail


