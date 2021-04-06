import { createSlice } from "@reduxjs/toolkit";



const CartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addProduct: (state, action) => {
            const item = action.payload
            const index = state.findIndex(element => item.id === element.id)
            if (index >= 0) {
                state[index].quantity += item.quantity
            } else {
                state.push(item)
            }
        }
    }
})


const { reducer, actions } = CartSlice

export const { addProduct } = actions

export default reducer