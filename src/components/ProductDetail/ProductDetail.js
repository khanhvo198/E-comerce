import Images from "constants/images"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useRouteMatch } from "react-router"
import { Button, Card, Col, Container, Row } from "reactstrap"
import { addProduct } from "../../feature/Cart/CartSlice"
import ProductCard from "./ProductCard/ProductCard"
import "components/ProductDetail/ProductDetail.scss";
import CommentCard from "./CommentCard/CommentCard"


const ProductDetail = () => {
    let match = useRouteMatch()


    const exampleInfo = {
        id: match.params.id,
        title: 'MacBook Pro 13-inch',
        rating: 3,
        numComments: 15,
        numItemsSold: 100,
        price: 100,
        img: Images.MAC_BOOK_PRO,

        specification: {
            cpu: 'AMD Ryzen 7, 3750H, 2.30 GHz',
            Ram: '8 GB, DDR4 (2 khe), 2666 MHz',
            storage: 'SSD 512 GB M.2 PCIe',
            size: 'Dày 25.8 mm, 2.2 kg',
            design: 'Mineral Silver',
            brand: 'Asus',
            guarantee: '24 months',
        },
        details: [
            'Google Play Store: The millions of Android apps you know and love on your phone and tablet can now run on your Chrome device without compromising their speed, simplicity or security ',
            'Sleek, responsive design: Keep going comfortably with the backlit keyboard and multi-touch touchpad that supports four finger gestures set in a sleek design for moving from room to room or on the road ',
            'Binge watch while you work: Equipped with an Intel(R) processor, 14" display, stereo speakers tuned by audio experts at B&O and a long battery life to get more done while having fun ',
            'Environmentally conscious: Low halogen, mercury-free display backlights, arsenic-free display glass in this Energy Star(R) certified, EPEAT(R) Silver registered Chromebook ',
            'Dual-core Intel(R) processor: Intel(R) Celeron(R) N4000, Dual-Core, 1.1 GHz base frequency, up to 2.6 GHz burst frequency ',
            'Display: 14.0-inch diagonal HD SVA anti-glare micro-edge WLED-backlit display (1366 x 768); 82% screen to body ratio ',
            'Memory & storage: 4 GB LPDDR4-2400 SDRAM (not upgradable) and 32 GB eMMC ',
        ],
    }

    const [productInfo, setProductInfo] = useState(exampleInfo)

    const commentList = [
        {
            username: 'Nohara Shinnosuke',
            rating: 4,
            avatar: Images.SHIN_AVATAR,
            comment: 'I’m so glad I didn’t listen to some of the negative reviews cuz this laptop is amazing. It has surpassed my expectations. I bought this during prime day and my daughter said aren’t you scared that the computer will not be any good I said no cuz of the return policy but I am not returning it I love it. I love it so much I gave him a name! ',
            imageList: [],
        },

        {
            username: 'Kazama Tooru',
            rating: 5,
            avatar: Images.KAZAMA_AVATAR,
            comment: "This is my second Chromebook. My last was a similar 14inch HP. I did not know that all my tabs data and settings and I think even passwords and such from mu last one were just there .Being an older user and not too IT savvy this was important to me. I'll never get another PC.Only possible negative - I don't think the battery lasts quite as long as my last one. I never recommend any products to friends but I would recommend this. ",
            imageList: [],
        }
    ]

    useEffect(() => {

        // do something to get Product Information

    })


    return (
        <div className='container-fluid' style={{ backgroundColor: '#f5f5f5' }}>
            <Container>
                <ProductCard
                    {...productInfo}
                />

                <div className='detail'>
                    <div className='detail__header'>Details</div>
                    <ul>
                        {productInfo.details.map((element, index) => (
                            <li>{element}</li>
                        ))}
                    </ul>
                </div>

                <div className='comment'>
                    <div className='comment__header'>Comments</div>
                    {commentList.map((commentInfo, index) => (
                        <div>
                            <hr />
                            <CommentCard
                                {...commentInfo}
                            />
                        </div>

                    ))}

                </div>
            </Container>
        </div>
    )


}


export default ProductDetail


