import React from "react"
import { QrCode } from "lucide-react"

function Footer() {
    return (
        <footer
            className="w-full border-t border-[#e4e4de] bg-white"
        >   
            <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center 
            justify-center gap-3" >
                <div className="flex items-center gap-2 text-[#6b6f76]" >
                    <QrCode className="w-4 h-4 text-[#2b59ff]" strokeWidth={1.75} />
                    <span className="font-mono text-xs tracking-widest" >
                        QR-PLUS &copy; {new Date().getFullYear()}
                    </span>
                </div>
                <span className="text-xs text-[#6b6f76]" >
                    Generate, share and track every scan.
                </span>
            </div>
        </footer>
    )
}

export default Footer