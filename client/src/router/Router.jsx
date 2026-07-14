import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home.jsx"
import Register from "../pages/Register.jsx"
import Test from "../pages/Test.jsx"

export default function Router() {
    return (
        <Routes>
            <Route path="/home" element={<Home/>} />
            <Route path="/" element={<Register/>} />
            <Route path="/test" element={<Test/>} />
        </Routes>
    )
}