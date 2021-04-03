import { useEffect, useState } from "react";
import {  Row } from "reactstrap";
import Product from "../Product/Product";
import Slider from "../Slider/Slider";
import "./Home.css";
import PaginationProduct from "../Pagination/PaginationProduct";
const Home = () => {
    const [productList,setProductList] = useState([
        {
            image:"https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title:"This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            image:"https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title:"This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            image:"https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title:"This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            image:"https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title:"This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            image:"https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title:"This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            image:"https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title:"This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            image:"https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title:"This is sample product",
            price: 29.99,
            rating: 5,
        },
        {
            image:"https://media.gettyimages.com/photos/single-red-book-on-a-white-surface-picture-id173015527?s=612x612",
            title:"This is sample product",
            price: 29.99,
            rating: 5,
        }
    ])


    useEffect(() => {
        // Implement useEffect in order to fetch API and get productList
    })



    return (
        <div className="home">
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
                Some FUNCTION to sort product
            </div>
            <div className="home__container">
                <Row className="home__row">
                    {productList.map((product) => (
                        <Product 
                            image={product.image}
                            title={product.title}
                            price={product.price}
                            rating={product.rating}
                        />
                    ))}
                </Row>
            </div>
            <div className="home__pagination">
                <PaginationProduct />
            </div>
        </div>
    );
};

export default Home;
