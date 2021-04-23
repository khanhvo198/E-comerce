import Slider from "components/Slider/Slider";
import Images from "constants/images";
import { database } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Category from "../Category/Category";
import PaginationProduct from "../Pagination/PaginationProduct";
import Product from "../Product/Product";
import "./Home.css";
// import firebase from "firebase/app"
import 'firebase/firestore'
const Home = () => {


    const data = [
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
    ]

    const [productList, setProductList] = useState([])

    // 
    // const [currentProductList,setCurrentProductList] = useState([])


    const [currentPage, setCurrentPage] = useState(1)


    useEffect(() => {
        // Implement useEffect in order to fetch API and get productList
        const fetchProductList = async () => {
            try {
                // const response = await productApi.getAll()
                // console.log(response)
                // setProductList(response)
                // const snapshot = await database.ref('Products').get()
                // const productListFromFireStore = []
                // snapshot.forEach(doc => {
                //     productListFromFireStore.push({id: doc.id , data:doc.data()})
                // });
                // console.log(productListFromFireStore)
                // setProductList(productListFromFireStore)


                // firebase.firestore().ref("Products").get().then((snapshot) => {
                //     console.log(snapshot.val())
                // })
                // database
                //     .ref()
                //     .child("Products")
                //     .get()
                //     .then((snapshot) => {
                //         if(snapshot.exists()) {
                //             console.log(snapshot.val())
                //         } else {
                //             console.log("No data")
                //         }
                //     })


                const snapshot = await database.collection("Products").get()
                const result = []
                snapshot.forEach(doc => {
                    result.push({ ...doc.data(), id: doc.id })
                })
                console.log(result)
                setProductList(result)

            } catch (err) {
                console.log(err)
            }
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
        <Container className="home">
            {/* {console.log(currentProductList)} */}
            <Row className="home__banner">
                <Col xs='8' className="home__banner--left pl-0 pr-0 pb-1" >
                    <Slider />
                </Col>
                <Col xs='4' className="home__banner--right pl-0 pr-0">
                    <img alt="banner_image" src="https://www.anphatpc.com.vn/media/news/0812_wp4676574-4k-pc-wallpapers.jpg" />
                    <img alt="banner_image" src="https://www.anphatpc.com.vn/media/news/0812_wp4676574-4k-pc-wallpapers.jpg" />
                </Col>
            </Row>
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
                                    image={Images.MAC_BOOK_PRO}
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
