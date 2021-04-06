import { createSlice } from "@reduxjs/toolkit";



const CartSlice = createSlice({
    name: 'cart',
    initialState: JSON.parse(localStorage.getItem('cartInfo') || "[]"),
    reducers: {
        addProduct: (state, action) => {
            state.push(action.payload)
            localStorage.setItem("cartInfo", JSON.stringify(state))
        }
    }
})


const { reducer, actions } = CartSlice

export const { addProduct } = actions

export default reducer