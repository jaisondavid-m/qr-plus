import { Routes, Route, Navigate } from "react-router-dom"

import Home from "../pages/Home.jsx"
import Register from "../pages/Register.jsx"
import Login from "../pages/Login.jsx"
import CreateQrCode from "../pages/CreateQrCode.jsx"
import Test from "../pages/Test.jsx"

import PublicRoute from "./PublicRoute.jsx"
import ProtectedRoute from "./ProtectedRoute.jsx"

import AppLayout from "../components/layout/AppLayout.jsx"

export default function Router() {
    return (
        <Routes>

            <Route path="/" element={<Navigate to="/home" replace />} />

            <Route element={<PublicRoute />} >
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>

            <Route element={<ProtectedRoute />} >
                <Route element={<AppLayout/>} >
                    <Route path="/home" element={<Home />} />
                    <Route path="/create" element={<CreateQrCode />} />
                </Route>
            </Route>

            <Route path="/test" element={<Test />} />

        </Routes>
    )
}