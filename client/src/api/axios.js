import axios from "axios"

const API = axios.create({
    baseURL: import.meta.env.VITE_API_BACKEND_URL,
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
})

API.interceptors.request.use((config) => {

    const token = localStorage.getItem("token")

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    
    return config

})

export default API;