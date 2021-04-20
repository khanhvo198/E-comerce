import { configureStore } from '@reduxjs/toolkit'
import CartReducer from '../feature/Cart/CartSlice'
import UserReducer from "./UserSlice"

const store = configureStore({
  reducer: {
    cart: CartReducer,
    user: UserReducer
  },
})



export default store
