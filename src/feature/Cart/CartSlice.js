import { createSlice } from "@reduxjs/toolkit";



const CartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addProduct: (state, action) => {
            state.push(action.payload)
        }
    }
})


const {reducer, actions} = CartSlice

export const {addProduct} = actions

export default reducer