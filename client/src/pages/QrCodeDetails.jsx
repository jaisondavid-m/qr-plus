import React, { useEffect, useMemo, useState } from "react"
import { useParams, Link } from "react-router-dom"
import {
    ArrowLeft, ScanLine, Smartphone,
    Monitor, Tablet, Loader2
} from "lucide-react"
import API from "../api/axios.js"
import ResolveImageUrl from "../utils/resolveImageUrl.js"
import HistoryTable from "../components/analytics/HistoryTable.jsx"

const DEVICE_ICONS = {
    mobile: Smartphone,
    tablet: Tablet,
    desktop: Monitor,
}

function QrCodeDetails() {

    const { id } = useParams()
    const [detail, setDetail] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {

        let cancelled = false

        async function load() {
            try {
                const res = await API.get(`/qrcodes/${id}`)
                if (!cancelled) setDetail(res?.data?.data || null)
            } catch (err) {
                if (!cancelled) setError("Couldn't load this QR code's analytics.")
            } finally {
                if (!cancelled) setLoading(false)
            }

        }

        load()
        return () => { cancelled = false }

    }, [id])

    const deviceBreakdown = useMemo(() => {
        if (!detail?.scans) return []
        const counts = {}
        detail.scans.forEach((s) => {
            const key = s.device_type || "unknown"
            counts[key] = (counts[key] || 0) + 1
        })
        return Object.entries(counts).sort((a, b) => b[1] - a[1])
    }, [detail])

    if (loading) {
        return (
            <div className="flex items-center justify-center gap-2 py-24 text-[#6b6f76]" >
                <Loader2 className="w-4 h-4 animate-spin" /> Loading...
            </div>
        )
    }

    if (error || !detail) {
        return (
            <div className="max-w-6xl mx-auto px-6 py-10" >
                <p>{error || "QR code not found."}</p>
                <Link to="/analytics" className="text-sm text-[#2b59ff] font-medium mt-2 inline-block" >
                    Back to analytics
                </Link>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-10" >
            <Link
                to="/analytics"
                className="inline-flex items-center gap-1.5 text-sm text-[#6b6f76] hover:text-[#14161a] mb-6"
            >
                <ArrowLeft className="w-4 h-4" strokeWidth={1.75} /> Back to analytics
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8" >
                <div className="rounded-2xl bg-white border border-[#e4e4de] p-6 flex items-center gap-5" >
                    <img
                        src={ResolveImageUrl(`/qr/${detail.code}/image`)}
                        alt={`QR code ${detail.code}`}
                        className="w-24 h-24 rounded-lg border border-[#e4e4d4] p-2 bg-white shrink-0"
                    />
                    <div className="min-w-0" >
                        <span className="font-mono text-[11px] tracking-widest text-[#6b6f76]" >
                            CODE
                        </span>
                        <div className="font-mono text-sm text-[#2b59ff]" >
                            {detail.code}
                        </div>
                        <span className="font-mono text-[11px] tracking-widest text-[#6b6f76] mt-3 block" >
                            ENCODES
                        </span>
                        <div className="text-sm text-[#14171a] break-all" >
                            {detail.content}
                        </div>
                    </div>
                </div>

                <div className="rounded-2xl bg-white border border-[#e4e4de] p-6 flex flex-col justify-center" >
                    <div className="flex items-center gap-2 text-[#2b59ff]" >
                        <ScanLine className="w-5 h-5" strokeWidth={1.75} />
                        <span className="font-mono text-[11px] tracking-widest text-[#6b6f76]" >
                            TOTAL SCANS
                        </span>
                    </div>
                    <div className="font-display text-3xl font-semibold text-[#14161a] mt-2" >
                        {detail.scan_count}
                    </div>
                </div>

                <div className="rounded-2xl bg-white border border-[#e4e4de] p-6" >
                    <span className="font-mono text-[11px] tracking-widest text-[#6b6f76]" >
                        DEVICE BREAKDOWN
                    </span>
                    <div className="mt-3 space-y-2" >
                        {deviceBreakdown.length === 0 ? (
                            <span className="text-sm text-[#6b6f76]" >
                                No scans yet
                            </span>
                        ) : (
                            deviceBreakdown.map(([device, count]) => {
                                const Icon = DEVICE_ICONS[device] || Smartphone
                                return (
                                    <div
                                        key={device}
                                        className="flex items-center justify-between text-sm"
                                    >
                                        <span className="flex items-center gap-1.5 text-[#14161a] capitalize" >
                                            <Icon claassName="w-3.5 h-3.5 text-[#6b6f76]" strokeWidth={1.75} />
                                        </span>
                                        <span className="text-[#6b6f76]" >
                                            {count}
                                        </span>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-2xl bg-white border border-[#e4e4de] overflow-hidden" >
                <div className="px-6 py-5 border-b border-[#e4e4de]" >
                    <h2 className="font-display text-lg font-semibold text-[#14161a]" >
                        Scan History
                    </h2>
                </div>
                {
                    detail.scans.length === 0 ? (
                        <div className="px-6 py-12 text-center text-sm text-[#6b6f76]" >
                            No scans recorded yet.
                        </div>
                    ) : (
                        <HistoryTable
                            detail={detail}
                        />
                    )
                }
            </div>

        </div>
    )

}

export default QrCodeDetails