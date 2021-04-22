import Product from "components/Product/Product"
import Images from "constants/images"
import db from "firebase/firebase.config"
import { useEffect, useState } from "react"
import { useParams, useRouteMatch } from "react-router"
import { Col, Container, Row } from "reactstrap"
import {Link} from 'react-router-dom'



const Search = () => {


    const match = useRouteMatch()
    const brand = match.params.brand


    const [productList,setProductList] = useState([])

    useEffect(() => {
        const fetchProductList = async () => {
            // db.collection("Products").where("brand", "==", brand).get()
            //     .then((productList) => {
            //         console.log(productList)
            //     })
            console.log(brand)
            const products = await db.collection("Products").get()
            const productFetch = []

            products.forEach((doc) => {
                if(doc.data().specification.brand == brand) {
                    productFetch.push(doc.data())
                }
            })


            // console.log(productList)
            setProductList([...productFetch])
            console.log(productList)

        }

        fetchProductList()
    }, [])

    return (
        <Container>  
            <Row>
            {
                productList.map((product) => (
                <Col xs="3" key={product.id} >
                    <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <Product
                            image={Images.MAC_BOOK_PRO}
                            title={product.title}
                            price={product.price}
                            rating={product.rating}
                        />
                    </Link>
                </Col>  
                ))
            }
            </Row>
        </Container>
    )

}



export default Search