import { Routes, Route, Navigate } from "react-router-dom"

import Home from "../pages/Home.jsx"
import Register from "../pages/Register.jsx"
import Login from "../pages/Login.jsx"
import CreateQrCode from "../pages/CreateQrCode.jsx"
import Test from "../pages/Test.jsx"

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/create" element={<CreateQrCode/>} />
            <Route path="/test" element={<Test/>} />
        </Routes>
    )
}