const { createSlice } = require("@reduxjs/toolkit");



const UserSlice = createSlice({
    name: 'user',
    initialState: JSON.parse(localStorage.getItem("userInfo")) || {
        isLogin: false,
        userid: "",
        userName: "",
        photoURL: "",
    },

    reducers: {
        signIn: (state, action) => {

            state.isLogin = action.payload.isLogin
            state.userName = action.payload.userName
            state.photoURL = action.payload.photoURL
            state.userid = action.payload.userid
            localStorage.setItem("userInfo", JSON.stringify(state))

        },

        signOut: (state, action) => {
            localStorage.removeItem("userInfo")
            return {
                ...state,
                isLogin: false,
                userName: "",
                photoURL: "",
                userid: "",
            }

        }
    }
})


const { reducer, actions } = UserSlice

export const { signIn, signOut } = actions
export default reducer