import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
    PlusCircle, QrCode, ScanLine, TrendingUp, ArrowRight, Loader2
} from "lucide-react"
import API from "../api/axios.js"

function FinderMark({ className = "w-4 h-4" }) {
    return (
        <span className={`relative shrink-0 ${className}`} >
            <span className="absolute inset-0 rounded-[3px] border-2 border-[#14120f]/30" />
            <span className="absolute inset-[4px] bg-[#ff3b2f] rounded-[1px]" />
        </span>
    )
}

function Home() {

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

    const totalCodes = codes.length
    const totalScans = codes.reduce((sum,c) => sum + (c.scan_count || 0), 0)
    const topCode = codes.reduce((top,c) => 
    (c.scan_count || 0) > (top?.scan_count || 0) ? c : top
    ,null )

    const stats = [
        { label: "QR CODES", value: totalCodes, icon: QrCode },
        { label: "TOTAL SCANS", value: totalScans, icon: ScanLine },
        { label: "TOP CODE", value: topCode ? topCode.code : "-", icon: TrendingUp }
    ]

    return (
        <div className="max-w-6xl px-4 sm:px-6 py-8 sm:py-10" >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8" >
                <div>
                    <span className="font-mono text-xs tracking-[0.25em] text-[#2b59ff]" >
                        DASHBOARD
                    </span>
                    <h1 className="font-display text-2xl font-semibold text-[#14161a] mt-2" >
                        Welcome back
                    </h1>
                    <p className="text-sm text-[#6b6f76] mt-1" >
                        Here's what's happening with your QR codes.
                    </p>
                </div>
                <Link
                    to="/create"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#2b59ff] hover:bg-[#1f45d6]
                    text-white font-medium px-5 py-3 transition self-stretch sm:self-start justify-center"
                >
                    <PlusCircle className="w-4 h-4" strokeWidth={1.75} />
                    New QR Code
                </Link>
            </div>

            <div className=" grid grid-cols-1 sm:grid-cols-3 gap-4 my-8 px-0 sm:px-4" >
                {stats.map(({ label, value, icon: Icon }) => (

                    <div
                        key={label}
                        className="relative rounded-2xl bg-[#faf9f4] border border-[#e1ddd2] px-5 py-4 flex items-center gap-4"
                    >
                        <FinderMark className="w-3.5 h-3.5 absolute top-4 right-4" />
                        {/* <div className="w-10 h-10 rounded-xl bg-[#2b59ff]/10 flex items-center justify-center shrink-0" >
                            <Icon className="w-5 h-5 text-[#2b59ff]" strokeWidth={1.75} />
                        </div> */}
                        {/* <div className="min-w-0" > */}
                            <div className="font-mono text-[11px] tracking-widest text-[#6b6f76]" >
                                {label}
                            </div>
                            <div className="font-display text-xl font-semibold text-[#141f16] truncate" >
                                {loading ? "-" : value}
                            </div>
                        {/* </div> */}
                    </div>
                ))}
            </div>

            <div className="rounded-2xl bg-white border border-[#e4e4de] overflow-hidden" >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:px-6 py-5 border-b border-[#e4e4de]" >
                    <h2 className="font-display text-lg font-semibold text-[#14161a]" >
                        Recent QR Codes
                    </h2>
                    <Link
                        to="/analytics"
                        className="flex items-center gap-1 text-sm font-medium text-[#2b59ff] hover:text-[#1f45d6]"
                    >
                        View all <ArrowRight className="w-4 h-4" strokeWidth={1.75} />
                    </Link>
                </div>

                {
                    loading ? (
                        <div className="flex items-center justify-center gap-2 py-14 text-[#6b6f76]" >
                            <Loader2 className="w-4 h-4 animate-spin" /> Loading...
                        </div>
                    ) : error ? (
                        <div className="px-6 py-8 text-sm text-[#c4342e]" >
                            {error}
                        </div>
                    ) : codes.length === 0 ? (
                        <div className="flex flex-col items-center gap-3 py-14 text-center" >
                            <QrCode className="w-8 h-8 text-[#b7b8b2]" />
                            <p className="text-sm text-[#6b6f76]" >
                                You haven't created a QR code yet.
                            </p>
                            <Link
                                to="/create"
                                className="text-sm font-medium text-[#2b59ff] hover:text-[#1f45d6]"
                            >
                                Create your first one
                            </Link>
                        </div>  
                    ) : (
                        <ul className="divide-y divide-[#e4e4de]" >
                            {codes.slice(0,5).map((c) => (
                                <li key={c.id} > 
                                    <Link
                                        to={`/analytics/${c.id}`}
                                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-6 py-4 hover:bg-[#fafaf6] transition"
                                    >
                                        <div className="min-w-0" >
                                            <div className="font-mono text-xs text-[#2b59ff]" >{c.code}</div>
                                            <div className="text-sm text-[#14161a] truncate max-w-[220px] sm:max-w-xs" >
                                                {c.content}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-[#6b6f76] shrink-0" >
                                            <ScanLine className="w-4 h-4" strokeWidth={1.75} />
                                            {c.scan_count}
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )
                }

            </div>

        </div>
    )
}

export default Home