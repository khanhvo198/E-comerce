import Slider from "components/Slider/Slider";
import Images from "constants/images";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Category from "../Category/Category";
import PaginationProduct from "../Pagination/PaginationProduct";
import Product from "../Product/Product";
import "./Home.scss";
// import firebase from "firebase/app"
import 'firebase/firestore'
import Filter from "components/Filter/FIlter";
// import { database } from "firebase/firebase";
import db from "firebase/firebase.config";
const Home = () => {



    const [productList, setProductList] = useState([])

    // 
    const [currentProductList, setCurrentProductList] = useState([])


    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        // Implement useEffect in order to fetch API and get productList
        const fetchProductList = async () => {
            try {
                const snapshot = await db.collection("Products").get()
                const result = []
                snapshot.forEach(doc => {
                    result.push({ ...doc.data(), id: doc.id })

                })
                // console.log("Product List: ", result)
                setProductList(result)
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
    }, [productList, currentPage])

    // const indexOfLastProduct = currentPage * 16
    // const indexOfFirstProduct = indexOfLastProduct - 16
    // const currentProductList = (productList.slice(indexOfFirstProduct, indexOfLastProduct))
    // setCurrentProductList([...productList.slice(indexOfFirstProduct, indexOfLastProduct)])






    const paginate = (number) => {
        setCurrentPage(number)
    }

    const handleOnChangeFilter = (field) => {
        if (field === "Low to High") {
            const productListSorted = productList.sort((a, b) => a.price - b.price)
            setProductList([...productListSorted])
        } else {
            const productListSorted = productList.sort((a, b) => b.price - a.price)
            setProductList([...productListSorted])
        }
    }


    return (
        <Container className="home">
            {console.log("Current Product List: ", currentProductList)}
            {/* {console.log(currentProductList)} */}
            <Row className="home__banner">
                <Col lg='8' className="home__banner--left pl-0 pr-0 pb-1" >
                    <Slider />
                </Col>
                <Col lg='4' className="home__banner--right pl-0 pr-0">
                    <img alt="banner_image" src={Images.BANNER1} />
                    <img alt="banner_image" src={Images.BANNER2} />
                </Col>
            </Row>
            <div className="home__filter">
                <Filter
                    header="Filter by"
                    title="Price"
                    fields={["Low to High", "High to Low"]}
                    onChangeFilter={handleOnChangeFilter}
                />
            </div>
            {/* <div>
                <Category />
            </div> */}
            <div className="home__container">
                <Row className="home__row">
                    {currentProductList.map((product) => (
                        <Col key={product.id} >
                            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Product
                                    image={product.img}
                                    title={product.title}
                                    price={product.price}
                                    rating={product.rating}
                                />
                            </Link>
                        </Col>
                    ))}
                </Row>
            </div>
            <div className="home__pagination">
                <PaginationProduct
                    totalProducts={productList.length}
                    paginate={paginate}
                />
            </div>
        </Container>
    );
};

export default Home;
