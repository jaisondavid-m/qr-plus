import { Navigate, Outlet } from "react-router-dom"
import useAuthStore from "../store/authStore.js"

function PublicRoute({ children }) {

    const { loading, isAuthenticated } = useAuthStore()

    if (loading) return null

    if (isAuthenticated)
        return <Navigate to="/home" replace />

    return <Outlet/>

}

export default PublicRoute