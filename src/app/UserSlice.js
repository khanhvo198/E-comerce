const { createSlice } = require("@reduxjs/toolkit");



const UserSlice = createSlice({
    name: 'user',
    initialState: JSON.parse(localStorage.getItem("userInfo")) || {
        isLogin: false,
        userid: "",
        userName: "",
        photoURL: "",
        uid: ""
    },

    reducers: {
        signIn: (state, action) => {

            state.isLogin = action.payload.isLogin
            state.userName = action.payload.userName
            state.photoURL = action.payload.photoURL
<<<<<<< HEAD
            state.uid = action.payload.uid
=======
            state.userid = action.payload.userid
>>>>>>> 01c3199aa7f4d8017f1ceacaeae9d6f5c5a42a68
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