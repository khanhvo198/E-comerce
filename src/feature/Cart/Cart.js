import { AiOutlineShoppingCart } from "react-icons/ai"
import { useSelector } from "react-redux"
import "./Cart.css"


const Cart = () => {

    const cart = useSelector(state => state.cart)

    // console.log(cart)
    return (
        <div className="cart">
            <AiOutlineShoppingCart className="header--cart" />
            <span className="header--cart__count">{cart.length}</span>
        </div>
        

    )


}




export default Cart