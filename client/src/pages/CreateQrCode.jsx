import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
    QrCode, Loader2, Copy, Check,
    Download, RefreshCw,
} from "lucide-react"
import API from "../api/axios"
import ResolveImageUrl from "../utils/resolveImageUrl"
import QrPreview from "../components/auth/QrPreview.jsx"
import CreateForm from "../components/createpage/CreateForm.jsx"
import ResultPart from "../components/createpage/ResultPart.jsx"

function CreateQrCode() {

    const navigate = useNavigate()

    const [content, setContent] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [result, setResult] = useState(null)
    const [copied, setCopied] = useState(false)

    async function handleSubmit(e) {

        e.preventDefault()
        setError("")

        if (!content.trim()) {
            setError("Enter a link or some text to encode first.")
            return
        }

        setLoading(true)

        try {
            const res = await API.post("/qrcodes", {
                content: content.trim(),
            })
            const data = res?.data?.data
            setResult({
                code: data.code,
                content: data.content,
                imageUrl: ResolveImageUrl(data.image_url),
            })
        } catch (err) {

            const message = 
                err?.response?.data?.message ||
                "Couldn't generate the QR code. Try again."

            setError(message)

        } finally {
            setLoading(false)
        }

    }

    function handleCopy() {
        navigator.clipboard.writeText(result.content)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    function handleReset() {
        setContent("")
        setResult(null)
        setError("")
    }

    return (
        <div className="min-h-screen w-full font-body flex items-start justify-center px-3 pt-6 pb-4 sm:items-center bg-[#fafaf6]" >
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-slate-200 p-10" >
                <div className="flex items-center gap-2 text-[#2b59ff]" >
                    <QrCode className="w-5 h-5" strokeWidth={1.75} />
                    <span className="font-mono text-xs tracking-[0.25em]" >
                        GENERATE
                    </span>
                </div>
                <h2 className="font-body text-sm font-semibold text-[#14161a] mt-3" >
                    Create a QR code
                </h2>
                <p className="font-body text-xs sm:text-sm text-[#6b6f76] mt-2 mb-5 sm:mb-8" >
                    Paste a link or some text - we'll encode it and give you a scannable image.
                </p>
                {
                    error && (
                        <div
                            role="alert"
                            className="rounded-lg border border-[#ff4d4d]/30 bg-[#ff4d4d]/10 px-4 
                            py-3 text-sm text-[#c4342e] mb-5"
                        >
                            {error}
                        </div>
                    )
                }

                {!result ? (
                    <CreateForm
                        handleSubmit={handleSubmit}
                        content={content}
                        setContent={setContent}
                        loading={loading}
                    />
                ) : (
                    <ResultPart
                        result={result}
                        handleCopy={handleCopy}
                        handleReset={handleReset}
                        copied={copied}
                    />
                )}

            </div>
        </div>
    )

}


export default CreateQrCode