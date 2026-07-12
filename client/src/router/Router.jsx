import { Routes, Route } from "react-router-dom"

import Home from "../pages/Home.jsx"

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home/>} />
        </Routes>
    )
}