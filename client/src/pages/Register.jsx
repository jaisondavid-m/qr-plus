import React, { useMemo, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import {
    EyeOff, Eye,
    Loader2
} from "lucide-react"
import API from "../api/axios.js"
import PasswordStrength from "../utils/PasswordStrength.js"

import AuthLayout from "../components/auth/AuthLayout.jsx"

function Register() {

    const navigate = useNavigate()

    const [userID, setUserID] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
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
            setError("Passwords don't match yet.")
            return
        }

        setLoading(true)

        try {
            const res = await API.post("/auth/register", {
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
            subtitle="Pick a user ID and password to get started"
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
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="At least 8 characters"
                            className="w-full rounded-lg bg-white border border-[#e4e4de] px-4 py-3 pr-11 text-[#14161a] placeholder:text-[#b7b8b2] outline-none
                            focus:border-[#2b59ff] focus:ring-2 focus:ring-[#2B59FF]/20 transition"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={showPassword ? "Hide Password" : "Show password"}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B6F76] hover:text-[#14161a] transition"
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

                    {password.length > 0 && (
                        <div className="mt-2" >
                            <div className="h-1 w-full rounded-full bg-[#e4e4de] overflow-hidden" >
                                <div
                                    className="h-full rounded-full transition-all duration-300"
                                    style={{
                                        width: `${strength.pct}`,
                                        background: strength.color
                                    }}
                                />
                            </div>
                            <span
                                className="font-mono text-[11px] mt-1 inline-block"
                                style={{
                                    color: strength.color,
                                }}
                            >
                                {strength.label}
                            </span>
                        </div>
                    )}

                </div>

                <div>
                    <label
                        htmlFor="confirm"
                        className="font-mono text-[11px] tracking-widest text-[#5b6f76]"
                    >
                        CONFIRM PASSWORD
                    </label>
                    <input
                        id="confirm"
                        name="confirm"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={confirm}
                        onChange={(e) => setConfirm(e.target.value)}
                        placeholder="Repeat you password"
                        className={`mt-2 w-full rounded-lg bg-white border px-4 py-3 text-[#14161a] placeholder:text-[#b7b8b2] outline-none focus:ring-2 transition
                                ${
                                    mismatch
                                        ? "border-[#ff4d4d] focus:border-[#ff4d4d] focus:ring-[#ff4d4d]/20"
                                        : "border-[#e4e4de] focus:border-[#2b59ff] focus:ring-[#2b59ff]/20"
                                }
                            `}
                    />
                    {mismatch && (
                        <span className="text-[#c4342e] text-xs mt-1 block" >
                            Password don't match yet.
                        </span>
                    )}
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
                                <Loader2 className="w-4 h-4 animate-spin" /> Creating account...
                            </>
                        ) : (
                            "Create account"
                        )
                    }
                </button>
                <p className="text-center text-sm text-[#6b6f76]" >
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#2b59ff] hover:text-[#1f45d6] font-medium" >
                        Sign in
                    </Link>
                </p>
            </form>
        </AuthLayout>
    )

}

export default Register