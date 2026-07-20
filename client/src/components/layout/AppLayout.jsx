import React from "react"
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar.jsx"
import Footer from "./Footer.jsx"

function AppLayout() {
    return (
        <div className="min-h-screen flex flex-col bg-[#fafaf6]" >
            <Navbar />
            <main className="flex justify-center w-full flex-1" >
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default AppLayout