import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home.jsx"
import Test from "../pages/Test.jsx"

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/test" element={<Test/>} />
        </Routes>
    )
}