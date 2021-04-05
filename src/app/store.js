import { configureStore } from '@reduxjs/toolkit'
import CartReducer from '../feature/Cart/CartSlice'



const store =  configureStore({
  reducer: {
    cart: CartReducer
  },
})



export default store
