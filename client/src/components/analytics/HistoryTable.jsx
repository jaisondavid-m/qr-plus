import React from "react"

function HistoryTable({ detail }) {

    return (
        <table className="w-full text-sm" >
            <thead>
                <tr className="border-b border-[#e4e4de] text-left" >
                    <th className="font-mono text-[11px] tracking-widest text-[#6b6f76] px-6 py-3 font-normal" >
                        DEVICE
                    </th>
                    <th className="font-mono text-[11px] tracking-widest text-[#6b6f76] px-6 py-3 font-normal" >
                        IP ADDRESS
                    </th>
                    <th className="font-mono text-[11px] tracking-widest text-[#6b6f76] px-6 py-3 font-normal" >
                        SCANNED YET
                    </th>
                </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e4de]" >
                {detail.scans.map((s) => (
                    <tr
                        key={s.id}
                        className="hover:bg-[#fafaf6] transition"
                    >
                        <td className="px-6 py-3.5 text-[#14161a] capitalize" >
                            {s.device_type || "unknown"}
                        </td>
                        <td className="px-6 py-3.5 text-[#6b6f76] font-mono text-xs" >
                            {s.ip_address || "-"}
                        </td>
                        <td className="px-6 py-3.5 text-[#6b6f76]" >
                            {new Date(s.scanned_at).toLocaleDateString()}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default HistoryTable