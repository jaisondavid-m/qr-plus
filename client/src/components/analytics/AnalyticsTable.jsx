import React from "react"
import { Link } from "react-router-dom"
import {
    ScanLine, ArrowRight
} from "lucide-react"

function AnalyticsTable({ codes }) {

    return (
        <table className="w-full text-sm" >
            <thead>
                <tr className="border-b border-[#e4e4de] text-left" >
                    <th className="font-mono text-[11px] tracking-widest text-[#6b6f76] px-6 py-3 font-normal" >
                        CODE
                    </th>
                    <th className="font-mono text-[11px] tracking-widest text-[#6b6f76] px-6 py-3 font-normal" >
                        CONTENT
                    </th>
                    <th className="font-mono text-[11px] tracking-widest text-[#6b6f76] px-6 py-3 font-normal" >
                        SCANS
                    </th>
                    <th className="font-mono text-[11px] tracking-widest text-[#6b6f76] px-6 py-3 font-normal" >
                        CREATED
                    </th>
                    <th className="px-6 py-3" />
                </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e4de]" >
                {codes.map((c) => (
                    <tr
                        key={c.id}
                        className="hover:bg-[#fafaf6] transition"
                    >
                        <td className="px-6 py-4 font-mono text-[#2b59ff]" >{c.code}</td>
                        <td className="px-6 py-4 text-[#14161a] max-w-xs truncate" >
                            {c.content}
                        </td>
                        <td className="px-6 py-4" >
                            <span className="inline-flex items-center gap-1 text-[#14161a]" >
                                <ScanLine className="w-3.5 h-3.5 text-[#6b6f76]" strokeWidth={1.75} />
                                {c.scan_count}
                            </span>
                        </td>
                        <td className="px-6 py-4 text-[#6b6f76]" >
                            {new Date(c.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right" >
                            <Link
                                to={`/analytics/${c.id}`}
                                className="inline-flex items-center gap-1 text-[#2b59ff] hover:text-[#1f45d6] font-medium"
                            >
                                Details <ArrowRight className="w-5 h-5" strokeWidth={1.75} />
                            </Link>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}


export default AnalyticsTable