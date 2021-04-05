import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useRouteMatch } from "react-router"
import { Button } from "reactstrap"
import { addProduct } from "../../feature/Cart/CartSlice"



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
        <>
            <p>This is detail of {match.params.id} </p>
            <Button color="primary"
            onClick={handleOnClick}
            >
                Add to cart
            </Button>
        </>
    )


}


export default ProductDetail


