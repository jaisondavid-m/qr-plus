import { Navigate, Outlet } from "react-router-dom"
import useAuthStore from "../store/authStore.js"

function ProtectedRoute({ children }) {

    const { loading, isAuthenticated } = useAuthStore()

    if (loading) return null

    if (!isAuthenticated)
        return <Navigate to="/login" replace />

    return <Outlet/>

}

export default ProtectedRoute