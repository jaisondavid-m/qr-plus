import React from "react"

function hashChar(str, i) {
    if (!str) return i % 2
    const code = str.charCodeAt(i % str.length) || 0
    return (code + i * 7) % 3 === 0 ? 1 : 0
} 

function QrPreview({ seed }) {
    const cells = Array.from({ length: 64 }, (_, i) => hashChar(seed, i) )
    return (
        <div className="grid grid-cols-8 gap-[3px] w-28 h-28 shrink-0" >
            {
                cells.map((on,i) => (
                    <div 
                        key={i}
                        className="rounded-[2px] transition-colors duration-300"
                        style={{
                            background: on ? "#14161A" : "#E7E7E0"
                        }}
                    />
                ))
            }
        </div>
    )
}

export default QrPreview