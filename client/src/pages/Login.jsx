import React, { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
    EyeOff, Eye,
    Loader2
} from "lucide-react"
import API from "../api/axios.js"
import useAuthStore from "../store/authStore.js"

import AuthLayout from "../components/auth/AuthLayout.jsx"

function Login() {

    const navigate = useNavigate()
    const login = useAuthStore(state => state.login)

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

            if (!token) {
                // localStorage.setItem("token", token)
                throw new Error("Invalid server response")
            }

            login(res.data.token)
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
            <form onSubmit={handleSubmit} noValidate className="space-y-5" >
                {
                    error && (
                        <div
                            role="alert"
                            className="rounded-lg border border-[#ff4d4d]/30 bg-[#ff4d4d]/10 px-4 py-3 text-sm text-[#c4342e]"
                        >
                            {error}
                        </div>
                    )
                }
                <div>
                    <label
                        htmlFor="userID"
                        className="font-mono text-[11px] tracking-widest text-[#6b6f76]"
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
                        placeholder="e.g. jaison2007"
                        className="mt-2 w-full rounded-xl bg-white border border-[#e4e4de] px-4
                        py-3 text-[#14161a] placeholder:text-[#b7b8b2] outline-none focus:border-[#2b59ff] focus:ring-[#2b59ff]/20 transition"
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="font-mono text-[11px] tracking-widest text-[#6b6f76]"
                    >
                        PASSWORD
                    </label>
                    <div className="relative mt-2" >
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="**********"
                            className="w-full rounded-lg bg-white border border-[#e4e4de] px-4 py-3 pr-11 text-[#14161a] placeholder:text-[#2b59ff]
                            outline-none focus:border-[#ab59ff] focus:ring-2 focus:ring-[#ab59ff]/20 transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-[#6b6f76]
                            hover:text-[#14161a] transition"
                        >
                            {
                                showPassword ? (
                                    <EyeOff className="w-5 h-5" strokeWidth={1.75} />
                                ) : (
                                    <Eye className="w-5 h-5" strokeWidth={1.75} />
                                )
                            }
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 rounded-lg bg-[#2b59ff] hover:bg-[#1f45d6]
                    disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 transition focus:outline-none
                    focus:ring-2 focus:ring-[#2b59ff]/40 focus:offset-2 focus:ring-offset-[#fafaf6]"
                >
                    {
                        loading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin" /> Signing in...
                            </>
                        ) : (
                            "Sign in"
                        )
                    }
                </button>
                <p className="text-center text-sm text-[#6b6f76]" >
                    New here?{" "}
                    <Link
                        to="/register"
                        className="text-[#2b59ff] hover:text-[#1f45d6] font-medium"
                    >
                        Create an account
                    </Link>
                </p>
            </form>
        </AuthLayout>
    )

}

export default Login