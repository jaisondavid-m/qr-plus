import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
    ScanLine, Loader2, ArrowRight,
    QrCode,
} from "lucide-react"

import AnalyticsTable from "../components/analytics/AnalyticsTable.jsx"

import API from "../api/axios.js"

function Analytics() {

    const [codes, setCodes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {

        let cancelled = false

        async function load() {
            try {
                const res = await API.get("/qrcodes")
                if (!cancelled) setCodes(res?.data?.data || [])
            } catch (err) {
                if (!cancelled) setError("Couldn't load your QR codes.")
            } finally {
                if (!cancelled) setLoading(false)
            }
        }

        load()

        return () => { cancelled = true }

    },[])

    return (
        <div className="max-w-6xl mx-auto px-6 py-10" >
            <span className="font-mono text-xs tracking-[0.25em] text-[#3b59ff]" >
                ANALYTICS
            </span>
            <h1 className="font-display text-2xl font-semibold text-[#14161a] mt-2" >
                Your QR codes
            </h1>
            <p className="text-sm text-[#6b6f76] mt-1 mb-8" >
                Top a code to see device breakdown and scan history.
            </p>
            <div className="rounded-2xl bg-white border border-[#e4e4de] overflow-hidden" >
                {loading ? (
                    <div className="flex items-center justify-center gap-2 py-14 text-[#6b6f76]" >
                        <Loader2 className="w-4 h-4 animate-spin" /> Loading...
                    </div>
                ) : error ? (
                    <div className="px-6 py-8 text-sm text-[#c4342e]" >
                        {error}
                    </div>
                ) : codes.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 py-14 px-6 text-center" >
                        <QrCode className="w-8 h-8 text-[#b7b8b2]"  strokeWidth={1.5}/>
                        <p className="text-sm text-[#6b6f76]" >
                            No QR codes yet.
                        </p>
                    </div>
                ) : (
                    <AnalyticsTable
                        codes={codes}
                    />
                )}
            </div>
        </div>
    )

}

export default Analytics