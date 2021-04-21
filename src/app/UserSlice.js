const { createSlice } = require("@reduxjs/toolkit");



const UserSlice = createSlice({
    name: 'user',
    initialState: JSON.parse(localStorage.getItem("userInfo")) || {
        isLogin: false,
        userName: "",
        photoURL: "",
        uid: ""
    },

    reducers: {
        signIn: (state,action) => {

            state.isLogin = action.payload.isLogin
            state.userName = action.payload.userName
            state.photoURL = action.payload.photoURL
            state.uid = action.payload.uid
            localStorage.setItem("userInfo", JSON.stringify(state))

        },

        signOut: (state, action) => {
            localStorage.removeItem("userInfo")
            return {
                ...state,
                isLogin: false,
                userName: "",
                photoURL: ""
            }

        }
    }
})


const {reducer , actions} = UserSlice

export const {signIn , signOut} = actions
export default reducer