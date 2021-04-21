import "components/ProductDetail/ProductDetail.scss"
import Policy from "constants/policy"
import db from 'firebase/firebase.config'
import { useEffect, useState } from "react"
import { useRouteMatch } from "react-router"
import { Container, Spinner } from "reactstrap"
import CommentCard from "./CommentCard/CommentCard"
import ProductCard from "./ProductCard/ProductCard"
import RatingBlock from "./RatingBlock/RatingBlock"

const ProductDetail = () => {
    let match = useRouteMatch()

    const [productInfo, setProductInfo] = useState(null)
    const [commentList, setCommentList] = useState([])

    const [ratingList, setRatingList] = useState([5, 7, 2, 0, 2])

    useEffect(() => {
        // get product information
        const productID = match.params.id
        const productRef = db.collection('Products').doc(productID).get().then((product) => {
            const newProductInfo = { ...product.data() }
            console.log(newProductInfo)
            setProductInfo(newProductInfo)
        })
    }, [])

    useEffect(() => {
        // get comment list
        const productID = match.params.id
        const commentsRef = db.collection('Comments').where('productid', '==', productID).get().then((querySnapshot) => {
            if (!querySnapshot.empty) {
                const commentListPromise = querySnapshot.docs.map((comment) => {
                    const { userid } = comment.data()
                    return db.collection('Users').doc(userid).get().then((user) => {
                        console.log(user.data().displayName)
                        return {
                            username: user.data().displayName,
                            rating: comment.data().rating,
                            avatar: user.data().avatar,
                            comment: comment.data().comment,
                            imageList: comment.data().imageList
                        }
                    })
                })
                return Promise.all(commentListPromise)
            }
        }).then((newCommentList) => {
            console.log(newCommentList)
            setCommentList(newCommentList)
        })
    }, [])


    return (
        <div className='container-fluid' style={{ backgroundColor: '#f5f5f5' }}>
            {!productInfo ? <Spinner color='primary' /> :
                <Container>
                    <ProductCard
                        {...productInfo}
                    />

                    <div className='detail'>
                        <div className='detail__header'>Details</div>
                        <ul>
                            {productInfo.detail.map((element, index) => (
                                <li>{element}</li>
                            ))}
                        </ul>
                    </div>

                    <div className='comment'>
                        <div className='comment__header'>Comments</div>
                        <RatingBlock
                            ratingList={Array(Policy.MAX_RATING).fill(0).map((value, index) => {
                                return commentList.filter((commentInfo) => commentInfo.rating == Policy.MAX_RATING - index).length
                            })}

                            maxRating={Policy.MAX_RATING}
                        />
                        {commentList.map((commentInfo, index) => (
                            <div>
                                <hr />
                                <CommentCard
                                    {...commentInfo}
                                />
                            </div>

                        ))}

                    </div>
                </Container>}
        </div>
    )


}


export default ProductDetail


