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
        title: 'MacBook Pro 13-inch',
        rating: 5,
        numComments: 15,
        numItemsSold: 100,
        price: 100,
        img: Images.MAC_BOOK_PRO,
        description: 'Macbook sieu ben sieu dep Macbook sieu ben sieu dep'.repeat(10),
    }

    const [productInfo, setProductInfo] = useState(exampleInfo)

    const [quantity, setQuantity] = useState(1)

    useEffect(() => {

        // do something to get Product Information

    })


    return (
        <div>
            <ProductCard
                {...productInfo}
            />
        </div>
    )


}


export default ProductDetail


