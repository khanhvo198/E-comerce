import PaginationProduct from "components/Pagination/PaginationProduct"
import Product from "components/Product/Product"
import Images from "constants/images"
import db from "firebase/firebase.config"
import { useEffect, useState } from "react"
import { useLocation } from "react-router"
import { Link } from 'react-router-dom'
import { Col, Container, Row } from "reactstrap"
import "./Search.css"


const Search = () => {


    const useQuery = () => {
        return new URLSearchParams(useLocation().search)
    }

    const query = useQuery()

    const [productList,setProductList] = useState([])
    const [currentProductList,setCurrentProductList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        // Implement useEffect in order to fetch API and get productList
        const fetchProductList = async () => {
            try {
                const snapshot = await db.collection("Products").get()
                const searchTerm = query.get("key")
                const result = []
                snapshot.forEach(doc => {
                    result.push({ ...doc.data(), id: doc.id })

                })
                // console.log("result: ", result[0].specification.brand.toLowerCase().trim().includes(searchTerm.trim().toLowerCase()))
                console.log(searchTerm)

                const filteredData = result.filter(item => 
                    item.title.toLowerCase().trim().includes(searchTerm.toLowerCase().trim) ||
                    item.specification.brand.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
                )
                // console.log(filteredData)
                // console.log("Product List: ", result)
                // console.log(filteredData)
                setProductList(filteredData)
                // console.log(productList)
            } catch (err) {
                console.log("Get Products Error: ", err)
            }
        }
        fetchProductList()

    }, [])

    useEffect(() => {
        const indexOfLastProduct = currentPage * 16
        const indexOfFirstProduct = indexOfLastProduct - 16
        setCurrentProductList(productList.slice(indexOfFirstProduct, indexOfLastProduct))
    },[productList,currentPage])



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