import Images from "constants/images"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useRouteMatch } from "react-router"
import { Button, Card, Col, Container, Row } from "reactstrap"
import { addProduct } from "../../feature/Cart/CartSlice"
import ProductCard from "./ProductCard/ProductCard"
import "components/ProductDetail/ProductDetail.scss";


const ProductDetail = () => {
    let match = useRouteMatch()


    const exampleInfo = {
        id: match.params.id,
        title: 'MacBook Pro 13-inch',
        rating: 5,
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

    const [quantity, setQuantity] = useState(1)

    useEffect(() => {

        // do something to get Product Information

    })


    return (
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
            </div>
        </Container>
    )


}


export default ProductDetail


