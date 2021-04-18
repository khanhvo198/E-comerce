import axios from 'axios'
import queryString from 'query-string'
import firebase from 'firebase'
const axiosClient = axios.create({
    baseURL: 'http://localhost:5000',
    header: {
        'content-type': 'application/json'
    },
    paramsSerializer: params => queryString.stringify(params)
})


axiosClient.interceptors.request.use(async (config) => {
    const currentUser = firebase.auth().currentUser
    if(currentUser) {
        const token = await currentUser.getIdToken()
        config.headers.Authorization = `$Bearer ${token}`
    }
    return config
})

axiosClient.interceptors.response.use((response) => {
    if(response && response.data) {
        return response.data
    }
    return response
}, (error) => {
    throw error
})



export default axiosClient