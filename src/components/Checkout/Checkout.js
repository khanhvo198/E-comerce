import { useSelector } from "react-redux"



const Checkout = () => {

    const cart = useSelector(state => state.cart)

    return (
        <p>
            {console.log(cart)}
        </p>



    )



}



export default Checkout