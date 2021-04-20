import "components/ProductDetail/ProductDetail.scss"
import Images from "constants/images"
import { useEffect, useState } from "react"
import { useRouteMatch } from "react-router"
import { Container, Spinner } from "reactstrap"
import CommentCard from "./CommentCard/CommentCard"
import ProductCard from "./ProductCard/ProductCard"
import RatingBlock from "./RatingBlock/RatingBlock"
import db from 'firebase/firebase.config'


const ProductDetail = () => {
    let match = useRouteMatch()

    const [productInfo, setProductInfo] = useState(null)
    const [commentList, setCommentList] = useState([])

    const exampleCommentList = [
        {
            username: 'Nohara Shinnosuke',
            rating: 4,
            avatar: Images.SHIN_AVATAR,
            comment: 'I’m so glad I didn’t listen to some of the negative reviews cuz this laptop is amazing. It has surpassed my expectations. I bought this during prime day and my daughter said aren’t you scared that the computer will not be any good I said no cuz of the return policy but I am not returning it I love it. I love it so much I gave him a name! ',
            imageList: [Images.MAC_BOOK_COMMENT_1, Images.MAC_BOOK_COMMENT_2, Images.MAC_BOOK_COMMENT_3, Images.MAC_BOOK_COMMENT_4],
        },

        {
            username: 'Kazama Tooru',
            rating: 5,
            avatar: Images.KAZAMA_AVATAR,
            comment: "This is my second Chromebook. My last was a similar 14inch HP. I did not know that all my tabs data and settings and I think even passwords and such from mu last one were just there .Being an older user and not too IT savvy this was important to me. I'll never get another PC.Only possible negative - I don't think the battery lasts quite as long as my last one. I never recommend any products to friends but I would recommend this. ",
            imageList: [],
        }
    ]

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
                        <RatingBlock ratingList={ratingList} />
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


