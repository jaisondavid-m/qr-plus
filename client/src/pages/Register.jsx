import React, { useMemo, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import {} from "lucide-react"
import API from "../api/axios.js"
import PasswordStrength from "../utils/PasswordStrength.js"

import AuthLayout from "../components/auth/AuthLayout.jsx"

function Register() {

    const navigate = useNavigate()

    const [userID, setUserID] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")

    const strength = useMemo(() =>
        PasswordStrength(password)
    ,[password])

    const mismatch = confirm.length > 0 && confirm !== password

    async function handleSubmit(e) {
        e.preventDefault()
        setError("")

        if (!userID.trim() || !password) {
            setError("Choose a user ID and password to create your account.")
            return
        }

        if (password.length < 8) {
            setError("Use at least 8 characters for your password.")
            return
        }

        if (password !== confirm) {
            setError("Password don't match.")
            return
        }

        setLoading(true)

        try {
            const res = await API.get("/auth/register", {
                userID: userID.trim(),
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
                "Couldn't create your account. Try a different user ID."
            setError(message)
        } finally {
            setLoading(false)
        }

    }

    return (
        <AuthLayout
            mode="register"
            previewId={userID}
            eyebrow="CREATE ACCOUNT"
            title="Sign up"
            subtitle="Pick a user ID and password - your first code is next"
        >
            <form onSubmit={handleSubmit} noValidate className="space-y-5" >
                {
                    error && (
                        <div
                            role="alert"
                            className="rounded-lg border border-[#FF4D4D]/30 bg-[#FF4D4D]/10 px-4 py-3 text-sm text-[#C4342E]"
                        >
                            {error}
                        </div>
                    )
                }
                <div>
                    <label
                        htmlFor="userID"
                        className="font-mono text-[11px] tracking-widest text-[#6B6F76]"
                    >
                        USER ID
                    </label>
                    <input
                        id="userID"
                        name="userID"
                        type="text"
                        autoFocus
                        autoComplete="username"
                        value={userID}
                        onChange={(e) => setUserID(e.target.value)}
                        placeholder="e.g. jaison007"
                        className="mt-2 w-full rounded-xl bg-white border border-[#E4E4DE] px-4
                        py-3 text-[#14161A] placeholder:text-[#B7B8B2] outline-none focus:border-[#2B59FF] focus:ring-2
                        focus:ring-[#2B59FF]/20 transition"
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="font-mono text-[11px] tracking-widest text-[#6B6F76]"
                    >
                        PASSWORD
                    </label>
                    <div className="relative mt-2" >

                    </div>
                </div>
            </form>
        </AuthLayout>
    )

}

export default Register