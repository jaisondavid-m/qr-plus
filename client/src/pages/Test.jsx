import React, { useEffect, useState } from "react"
import API from "../api/axios.js"

function Test() {

    const [loading, setLoading] = useState(true)
    const [health, setHealth] = useState(null)
    const [error, setError] = useState("")

    const checkHealth = async () => {
        try {
            const res = await API.get("/health")
            setHealth(res.data)
        } catch(err) {
            setError(
                err.response?.data?.message ||
                err.message ||
                "Failed to connect to backend"
            )
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        checkHealth()
    },[])

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4" >
            <div className="w-full max-w-md rounded-2xl bg-white shadow-xl p-8" >
                <h1 className="text-3xl font-bold text-center text-slate-800 mb-6" >
                    Backend Health Check
                </h1>
                {
                    loading ? (
                        <div className="flex flex-col items-center gap-4" >
                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" ></div>
                            <p className="text-slate-600" >
                                Checking Backend...
                            </p>
                        </div>  
                    ) : error ? (
                        <div className="rounded-lg border border-red-200 bg-red-50 p-5" >
                            <h2 className="text-xl font-semibold text-gray-600 mb-1" >
                                Backend is offline currently
                            </h2>
                            <p className="text-red-500" >
                                {error}
                            </p>
                        </div>
                    ) : (
                        <div className="rounded-lg border border-green-200 bg-green-50 p-5 space-y-4" >
                            <div className="flex items-center justify-between" >
                                <span className="font-medium text-slate-700" >Status</span>
                                <span className="rounded-full bg-green-600 px-2 py-1 text-sm font-medium text-white" >
                                    {health.status}
                                </span>
                            </div>
                            <div className="flex items-center justify-between" >
                                <span className="font-medium text-slate-700">
                                    Message
                                </span>
                                <span className="text-slate-600" >
                                    {health.message}
                                </span>
                            </div>
                            <div className="flex items-center justify-between" >
                                <span className="font-medium text-slate-700" >
                                    HTTP code
                                </span>
                                <span className="font-semibold text-green-600" >
                                    {health.code}
                                </span>
                            </div>
                            <div className="mt-6 rounded-lg bg-green-600 p-3 text-center text-white font-semibold" >
                                Backend Connected Successfully
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )

}

export default Test