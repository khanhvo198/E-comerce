import Product from "components/Product/Product"
import Images from "constants/images"
import db from "firebase/firebase.config"
import { useEffect, useState } from "react"
import { useParams, useRouteMatch } from "react-router"
import { Col, Container, Row } from "reactstrap"
import {Link} from 'react-router-dom'
import PaginationProduct from "components/Pagination/PaginationProduct"
import "./Search.css"


const Search = () => {


    const match = useRouteMatch()
    const brand = match.params.brand


    const [productList,setProductList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

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

    const indexOfLastProduct = currentPage * 16
    const indexOfFirstProduct = indexOfLastProduct - 16
    const currentProductList = (productList.slice(indexOfFirstProduct, indexOfLastProduct))

    const paginate = (number) => {
        setCurrentPage(number)
    }

    return (
        <Container>  
            <Row>
            {
                currentProductList.map((product) => (
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
            <Row className="search__pagination">
                <PaginationProduct
                    totalProducts={productList.length}
                    paginate={paginate}

                />
            </Row>

        </Container>
    )

}



export default Search