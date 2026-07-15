import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
    EyeOff, Eye,
    Loader2
} from "lucide-react"
import API from "../api/axios.js"

import AuthLayout from "../components/auth/AuthLayout.jsx"

function Login() {

    const navigate = useNavigate()

    const [userID, setUserID] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    async function handleSubmit(e) {

        e.preventDefault()

        setError("")

        if (!userID.trim() || !password) {
            setError("Enter your user ID and password to continue")
            return
        }

        setLoading(true)

        try {
            const res = await API.post("/auth/login", {
                user_id: userID.trim(),
                password,
            })
            const token = res?.data?.token

            if (token) {
                localStorage.setItem("token", token)
            }

            navigate("/home")

        } catch (err) {

            const message = 
                err?.response?.data?.message ||
                "Couldn't sign you in. Check your credentials and try again."
            setError(message)
             
        } finally {
            setLoading(false)
        }

    }

    return (
        <AuthLayout
            mode="login"
            previewId={userID}
            eyebrow="AUTHENTICATE"
            title="Sign in"
            subtitle="Enter your credentials to reach your home"
        >

        </AuthLayout>
    )

}

export default Login