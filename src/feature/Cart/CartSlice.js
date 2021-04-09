import { createSlice } from "@reduxjs/toolkit";


const getIndex = (state, id) => {
    for(let i = 0; i < state.length; i++) {
        if(state[i].id === id) return i
    }
}

const CartSlice = createSlice({
    name: 'cart',
    initialState: JSON.parse(localStorage.getItem('cartInfo') || "[]"),
    reducers: {
        addProduct: (state, action) => {
            state.push(action.payload)
            localStorage.setItem("cartInfo", JSON.stringify(state))
        },

        setQuantityInCart: (state,action) => {
            const id = action.payload.id
            const quantity = action.payload.quantity
            const index = getIndex(state,id)
            state[index].quantity = quantity
            localStorage.setItem("cartInfo", JSON.stringify(state))


        },
        removeProduct: (state, action) => {
            const itemId = action.payload.id
            
            const cart = state.filter(item => item.id !== itemId)

            // state.filter(item => item.id !== itemId)
            localStorage.setItem("cartInfo", JSON.stringify(cart))
            return cart
            
        } 
    }
})


const { reducer, actions } = CartSlice

export const { addProduct, setQuantityInCart , removeProduct } = actions

export default reducer