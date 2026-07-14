import React, { useEffect, useState } from "react"
import { TrendingUp } from "lucide-react"

function ScanTicker({ mode }) {

    const [count, setCount] = useState(mode === "register" ? 0 : 128)

    useEffect(() => {
        const id = setInterval(() => {
            setCount((c) => c + Math.floor(Math.random()*3))
        },2200)
    },[])

    return (
        <div className="flex items-center gap-2 font-mono text-sm text-[#14161A]" >
            <TrendingUp
                className="w-4 h-4 text-[#2B59FF]"
                strokeWidth={1.75}
            />
            <span className="font-mono" >
                {count.toLocaleString()}
            </span>
            <span className="text-[#6B6F76] text-xs tracking-widest" >
                SCANS TODAY
            </span>
        </div>
    )

}

export default ScanTicker