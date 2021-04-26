import "components/ProductDetail/ProductDetail.scss"
import Policy from "constants/policy"
import db from 'firebase/firebase.config'
import { useEffect, useState } from "react"
import { useRouteMatch } from "react-router"
import { Container, Spinner } from "reactstrap"
import CommentCard from "./CommentCard/CommentCard"
import ProductCard from "./ProductCard/ProductCard"
import RatingBlock from "./RatingBlock/RatingBlock"
import { storage } from 'firebase/firebase.config'

const ProductDetail = () => {
    let match = useRouteMatch()

    const [productInfo, setProductInfo] = useState(null)
    const [productNotSold, setProductNotSold] = useState(false)

    useEffect(() => {
        // get product information
        const productID = match.params.id
        db.collection('Products').doc(productID).get().then((productDoc) => {
            if (productDoc.data()) {
                const storageRef = storage.ref()
                // get comment list
                db.collection('Products')
                    .doc(productDoc.id)
                    .collection('Comments')
                    .get().then((querySnapshot) => {
                        if (!querySnapshot.empty) {
                            const commentListPromise = querySnapshot.docs.map((commentDoc) => {
                                //for each comment 
                                // get user name, avatar
                                return db.collection('Users').doc(commentDoc.id).get().then((userDoc) => (
                                    // return comment
                                    {
                                        username: userDoc.data().displayName,
                                        avatar: userDoc.data().avatar,
                                        comment: commentDoc.data().comment,
                                        rating: commentDoc.data().rating,
                                        imageList: commentDoc.data().imageList,
                                    }
                                )).catch((error) => {
                                    console.log("Get user name, avatar error: ", error)
                                })
                            })

                            Promise.all(commentListPromise).then((commentList) => {
                                console.log("CommentList: ", commentList)
                                const newProductInfo = { ...productDoc.data(), id: productDoc.id, commentList: commentList }
                                console.log("ProductInfo: ", newProductInfo)
                                setProductInfo(newProductInfo)
                            })

                        } else {
                            const newProductInfo = { ...productDoc.data(), id: productDoc.id, commentList: [] }
                            console.log("ProductInfo: ", newProductInfo)
                            setProductInfo(newProductInfo)
                        }
                    }).catch((error) => {
                        console.log("Get comment list error", error)
                        const newProductInfo = { ...productDoc.data(), id: productDoc.id, commentList: [] }
                        setProductInfo(newProductInfo)
                    })
            } else {
                setProductNotSold(true)
            }
        }).catch((error) => {
            console.log('Get product error: ', error)
        })
    }, [])


    return (
        <div className='container-fluid' style={{ backgroundColor: '#f5f5f5', minHeight: '90vh' }}>
            {productNotSold
                ? <div>This product is not sold anymore </div>
                : (!productInfo ? <Spinner color='primary' /> :
                    <Container>
                        <ProductCard
                            {...productInfo}
                        />

                        <div className='detail'>
                            <div className='detail__header'>Details</div>
                            <div>{productInfo.detail}</div>
                            {/* <ul>
                                {productInfo.detail.map((element, index) => (
                                    <li>{element}</li>
                                ))}
                            </ul> */}
                        </div>

                        <div className='comment'>
                            <div className='comment__header'>Comments</div>
                            <RatingBlock
                                ratingList={Array(Policy.MAX_RATING).fill(0).map((value, index) => {
                                    return productInfo.commentList.filter((commentInfo) => commentInfo.rating === Policy.MAX_RATING - index).length
                                })}

                                maxRating={Policy.MAX_RATING}
                            />
                            {productInfo.commentList.map((commentInfo, index) => (
                                <div>
                                    <hr />
                                    <CommentCard
                                        {...commentInfo}
                                    />
                                </div>

                            ))}

                        </div>
                    </Container>)}
        </div>
    )


}


export default ProductDetail


