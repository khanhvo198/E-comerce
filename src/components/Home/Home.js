import Slider from "components/Slider/Slider";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Category from "../Category/Category";
import PaginationProduct from "../Pagination/PaginationProduct";
import Product from "../Product/Product";
import "./Home.css";
const Home = () => {



    const [productList, setProductList] = useState([
        {
            id: 1,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 2,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 3,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 4,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 5,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 6,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 7,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 8,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 9,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 10,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 11,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 12,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 13,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 14,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 15,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 16,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 17,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 18,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 19,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 20,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 21,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 22,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 23,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            id: 24,
            image: "https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title: "This is sample product",
            price: 29.99,
            rating: 5,
        }
    ])




    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        // Implement useEffect in order to fetch API and get productList
    })


    const indexOfLastProduct = currentPage * 16
    const indexOfFirstProduct = indexOfLastProduct - 16
    const currentProductList = productList.slice(indexOfFirstProduct, indexOfLastProduct)


    const paginate = (number) => {
        setCurrentPage(number)
    }



    return (
        <Container className="home">
            <div className="home__banner">
                <div className="home__banner--left">
                    <Slider />
                </div>
                <div className="home__banner--right">
                    <img alt="banner_image" src="https://www.anphatpc.com.vn/media/news/0812_wp4676574-4k-pc-wallpapers.jpg" />
                    <img alt="banner_image" src="https://www.anphatpc.com.vn/media/news/0812_wp4676574-4k-pc-wallpapers.jpg" />
                </div>
            </div>
            <div className="home__filter">
                Some FUNCTION to sort product, Sort by Price (Low to High and vise versa), by Rating ...
                </div>
            <div>
                <Category />
            </div>
            <div className="home__container">
                <Row className="home__row">
                    {currentProductList.map((product) => (
                        <Col xs="3" key={product.id} >
                            <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <Product
                                    image={product.image}
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
